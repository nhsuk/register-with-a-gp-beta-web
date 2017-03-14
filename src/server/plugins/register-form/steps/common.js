import JoiBase from 'joi';
import JoiPostcode from 'joi-postcode';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import _ from 'lodash';

const Joi = JoiBase
  .extend(JoiPostcode)
  .extend(JoiNHSNumber);


export function validate(rawData, schemaDefinition) {
  return new Promise((resolve, reject) => {
    Joi.validate(rawData, schemaDefinition, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

export function getHandlerFactory(
  key,
  fields,
  title,
  schema,
  template = 'register-form/step') {
  return (request, reply) => {
    request.log(['cookie'], request.state.data);
    const stepData = _.get(request, `state.data.${key}`, {});
    return reply
      .view(template, {fields, stepData, title});
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
  fields,
  title,
  schema,
  nextSteps) {
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
        return reply
          .redirect(request.aka(`register-form:${key}`));
      });
  };
}
