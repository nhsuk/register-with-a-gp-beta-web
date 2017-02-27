import Joi from 'joi';
import _ from 'lodash';

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
    // TODO: if data already valid and not ?edit=1 then automatically redirect to next step
    request.log(['cookie'], request.state.data);
    const stepData = _.get(request, `state.data.${key}`, {});
    return reply
      .view(template, {fields, stepData, title});
  };
}

export function postHandlerFactory(
  key,
  fields,
  title,
  schema,
  nextStep) {
  return (request, reply) => {
    // if form valid then redirect to next step
    validate(request.payload, schema)
      .then(value => {
        return reply
          .redirect(request.aka(`register-form:${nextStep}`))
          .state('data', _.merge({}, request.state.data, {[key]: value}));
      })
      .catch(err => {
        request.log(['error'], err);
        return reply
          .redirect(request.aka(`register-form:${key}`));
      });
  };
}
