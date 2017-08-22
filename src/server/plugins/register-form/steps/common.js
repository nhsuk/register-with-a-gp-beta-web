import JoiBase from 'joi';
import JoiPostcode from 'joi-postcode';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import JoiFullDate from '../../../../shared/lib/joi-full-date-validator';
import _ from 'lodash';
import steps from './index';
import ua from 'universal-analytics';
let params = {};

const Joi = JoiBase
  .extend(JoiPostcode)
  .extend(JoiNHSNumber)
  .extend(JoiFullDate);


export function validate(rawData, schemaDefinition) {
  return new Promise((resolve, reject) => {
    Joi.validate(rawData, schemaDefinition, {
      abortEarly: false,
      language: {
        key: '{{!key}} ',
        any: {
          empty: 'cannot be blank',
          required: '!!Please tell us {{!key}}',
        },
        base: {
          number: 'must be a number',
        },
        string: {
          min: 'must be at least {{limit}} characters',
          max: 'must be less than {{limit}} characters',
          length: 'must be {{limit}} characters',
        },
      },
    }, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

export function getFieldData(schema) {
  const fields = [];

  _.each(schema._inner.children, (field) => {
    const fieldData = {
      id: field.key,
      label: field.schema._flags.label,
    };

    _.each(field.schema._meta[0], (value, key) => {
      fieldData[key] = value;
    });

    fields.push(fieldData);
  });

  return fields;
}

export function getPrevStep(prevSteps, cookieData, request) {
  // loop in reverse
  for (let i = prevSteps.length - 1; i >= 0; i--) {
    const step = prevSteps[i];
    const check = _.get(step, 'checkApplies', () => true);
    const practice = request.params.practice;

    if (check(cookieData, 'prev')) {
      return '/' + practice + '/register/' + step.slug;
    }
  }
}

export function getNextStep(nextSteps, cookieData) {
  for (let currentStep of nextSteps) {
    const check = _.get(currentStep, 'checkApplies', () => true);
    if (check(cookieData, 'next')) {
      return currentStep.key;
    }
  }
  return 'end';
}

export function getNextSlug(nextSteps, cookieData) {
  for (let currentStep of nextSteps) {
    const check = _.get(currentStep, 'checkApplies', () => true);
    if (check(cookieData, 'next')) {
      return currentStep.slug;
    }
  }
  return 'end';
}

export function getSlugByKey(key){
  for (let step of steps) {
    if(step.key == key) {
      return step.slug;
    }
  }
}

export function getlastCompletedStep(cookieData) {
  if (cookieData){
    let lastCompletedStep = null;
    _.each(steps, (s,i) => {
      const stepData = _.get(cookieData, `${s.key}`, false);
      const check = _.get(s, 'checkApplies', () => stepData);
      if (check(cookieData, 'next')){
        lastCompletedStep = steps[i];
      }
    });
    return lastCompletedStep;
  }
}

export function getLatestUncompletedStep(cookieData) {
  const lastCompletedStep = getlastCompletedStep(cookieData);
  if (lastCompletedStep){
    const lastCompletedStepIndex = _.findIndex(steps, (s) => {
      return s.key === lastCompletedStep.key;
    });

    const nextSteps = steps.slice(lastCompletedStepIndex + 1);
    const nextStepKey = getNextStep(nextSteps, cookieData);
    return _.find(steps, (s) => {
      return nextStepKey === s.key;
    });
  }else{
    return steps[0];
  }
}

export function checkStepCompletedBefore(requestedStepKey, latestUncompletedStep){
  const requestedStepIndex = _.findIndex(steps, (s) => {
    return s.key === requestedStepKey;
  });

  const latestUncompletedStepIndex = _.findIndex(steps, (s) => {
    return s.key === latestUncompletedStep.key;
  });

  return latestUncompletedStepIndex >= requestedStepIndex;
}

export function getHandlerFactory(
  key,
  title,
  schema,
  prevSteps,
  details,
  beforeTemplate,
  extraInfo = '',
  template = 'register-form/step') {
  return (request, reply) => {
    const latestUncompletedStep = getLatestUncompletedStep(request.state.data);
    const practice = request.params.practice;
    if (!checkStepCompletedBefore(key, latestUncompletedStep)){
      return reply.redirect('/' + practice + '/register/' + latestUncompletedStep.slug);
    }else{
      const stepData = _.get(request, `state.data.${key}`, {});
      const prevStep = getPrevStep(prevSteps, request.state.data, request);

      return reply.view(template, {
        fields: getFieldData(schema),
        data: request.state.data,
        cid: request.state.cid,
        beforeTemplate,
        stepData,
        key,
        title,
        prevStep,
        details,
        extraInfo
      });
    }
  };
}

/**
 * Helper `checkApplies` for the common case of depending on
 * a Yes/No question before asking subsequent questions.
 * @param {Step} step - a registration step
 * @param {string} path - where to look in the saved cookie data
 * @param {boolean} [toBe=true] check to see if value at path equals
 * @returns {Function}
 */
export function dependsOnBoolean(step, path, toBe = true) {
  return function (cookieData) {
    return _.get(cookieData, `${step.key}.${path}`, false) === toBe;
  };
}
/**
 * default transformer for old state data and new submitted data
 *
 * will take old cookie data and the current step name and submitted
 * value from the POST and merge them.
 * @param key
 * @param value
 * @param stateData
 * @param template
 * @returns {*} - new cookie data which can then be saved to the state
 */
function dataTransformer(key, value, stateData, template = {}) {
  return Object.assign(template, stateData, {[key]: value});
}

export function postHandlerFactory(
  key,
  title,
  schema,
  prevSteps,
  nextSteps,
  {
    beforeTemplate = undefined,
    template = 'register-form/step',
    transformData = dataTransformer
  } = {}
) {
  return (request, reply) => {
    // if form valid then redirect to next step
    validate(request.payload, schema)
      .then(value => {
        const newData = transformData(key, value, request.state.data);
        const nextSlug = getNextSlug(nextSteps, newData);
        const practice = request.params.practice;
        return reply
//          .redirect(request.aka(`register-form:${nextStep}`))
          .redirect('/' + practice + '/register/' + nextSlug)
          .state('data', newData);
      })
      .catch(err => {
        request.log(['error'], err);
        const stepErrors = {};
        const prevStep = getPrevStep(prevSteps, request.state.data, request);
        let events = [];
        _.each(err.details, (error) => {
          stepErrors[error.path] = {
            message: error.message,
            label: error.context.key,
          };
          params = {
            ec: 'Validation Error',
            ea: error.context.key,
            el: error.message,
            ev: 1,
            dp: error.path
          };
          events.push(params);
        });
        return reply.view(template, {
          fields: getFieldData(schema),
          data: request.state.data,
          cid: request.state.cid,
          stepData: err._object,
          beforeTemplate,
          key,
          title,
          stepErrors,
          prevStep,
          gaEvents: params
        });
      });
  };
}
