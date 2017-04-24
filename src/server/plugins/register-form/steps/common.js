import JoiBase from 'joi';
import JoiPostcode from 'joi-postcode';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import JoiFullDate from '../../../../shared/lib/joi-full-date-validator';
import _ from 'lodash';

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

    if (check(cookieData, 'prev')) {
      return request.aka(`register-form:${step.key}`);
    }
  }
  return;
}

export function getPrevStepKey(prevSteps, cookieData) {
  // loop in reverse
  for (let i = prevSteps.length - 1; i >= 0; i--) {
    const step = prevSteps[i];
    const check = _.get(step, 'checkApplies', () => true);

    if (check(cookieData)) {
      return step.key;
    }
  }
  return;
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

export function getValidStep(requestedStepKey, prevSteps, request){
  const requestedStepData = _.get(request, `state.data.${requestedStepKey}`, false);
  if (requestedStepData){
    return requestedStepKey;
  }

  const prevStepKey = getPrevStepKey(prevSteps, request.state.data);
  const prevStepData = _.get(request, `state.data.${prevStepKey}`, false);
  if (prevStepData){
    return requestedStepKey;
  }

  return;
}

export function getHandlerFactory(
  key,
  title,
  schema,
  prevSteps,
  details,
  beforeTemplate,
  template = 'register-form/step') {
  return (request, reply) => {
    const firstRegirsterFormStepKey = 'name';
    const validStep = getValidStep(key, prevSteps, request);
    if (!validStep && firstRegirsterFormStepKey != key){
      reply.redirect(request.aka(`register-form:${firstRegirsterFormStepKey}`));
    }else {
      const stepData = _.get(request, `state.data.${key}`, {});
      const prevStep = getPrevStep(prevSteps, request.state.data, request);

      return reply.view(template, {
        fields: getFieldData(schema),
        data: request.state.data,
        beforeTemplate,
        stepData,
        title,
        prevStep,
        details
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
        const nextStep = getNextStep(nextSteps, newData);
        return reply
          .redirect(request.aka(`register-form:${nextStep}`))
          .state('data', newData);
      })
      .catch(err => {
        request.log(['error'], err);
        const stepErrors = {};
        const prevStep = getPrevStep(prevSteps, request.state.data, request);

        _.each(err.details, (error) => {
          stepErrors[error.path] = {
            message: error.message,
            label: error.context.key,
          };
        });

        return reply.view(template, {
          fields: getFieldData(schema),
          data: request.state.data,
          stepData: err._object,
          beforeTemplate,
          title,
          stepErrors,
          prevStep,
        });
      });
  };
}
