import JoiBase from 'joi';
import JoiPostcode from 'joi-postcode';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import _ from 'lodash';

const Joi = JoiBase
  .extend(JoiPostcode)
  .extend(JoiNHSNumber);


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

export function getHandlerFactory(
  key,
  title,
  schema,
  template = 'register-form/step') {
  return (request, reply) => {
    request.log(['cookie'], request.state.data);
    const stepData = _.get(request, `state.data.${key}`, {});

    return reply.view(template, {
      fields: getFieldData(schema),
      stepData,
      title,
    });
  };
}

export function getNextStep(nextSteps, cookieData) {
  for (let currentStep of nextSteps) {
    const check = _.get(currentStep, 'checkApplies', () => true);
    if (check(cookieData)) {
      return currentStep.key;
    }
  }
  return 'end';
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

export function postHandlerFactory(
  key,
  title,
  schema,
  nextSteps,
  template = 'register-form/step') {
  return (request, reply) => {
    // if form valid then redirect to next step
    validate(request.payload, schema)
      .then(value => {
        const newData = Object.assign({}, request.state.data, {[key]: value});
        const nextStep = getNextStep(nextSteps, newData);
        return reply
          .redirect(request.aka(`register-form:${nextStep}`))
          .state('data', newData);
      })
      .catch(err => {
        request.log(['error'], err);
        const stepErrors = {};

        _.each(err.details, (error) => {
          stepErrors[error.path] = {
            message: error.message,
            label: error.context.key,
          };
        });

        return reply.view(template, {
          fields: getFieldData(schema),
          stepData: err._object,
          title,
          stepErrors,
        });
      });
  };
}
