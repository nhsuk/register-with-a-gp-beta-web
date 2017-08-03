/**
 * @type Step
 */
import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory, getFieldData} from './common';
import { validate } from './common';

const schema = Joi.object().keys({
  'name': Joi.string().required().max(20).label('Name').meta({ componentType: 'tel' }),
  'submit': Joi.any().optional().strip()
});

const title = 'Nested Fields Prototype';
const key = 'nestedPrototype';
const slug = 'nested-prototype';

const details = {
  summary: 'Test Nested Field',
};

export function getNestedHandler(
  key,
  title,
  schema,
  prevSteps,
  details,
  beforeTemplate,
  extraInfo = '',
  template = 'register-form/step') {
  return (request, reply) => {
    return reply.view(template, {
      fields: getFieldData(schema),
      data: request.state.data,
      cid: request.state.cid,
      beforeTemplate,
      key,
      title,
      details,
      extraInfo
    });
  };
}

export function postNestedHandler(
	key,
	title,
	schema,
    template = 'register-form/nested-field',
) {
  return (request, reply) => {
    console.log(request.payload.name);
    return reply.view(template, {
      fields: getFieldData(schema),
      data: request.state.data,
      cid: request.state.cid,
      key,
      title,
    });
  };
}

const handlers = {
  GET: (prevSteps) => getNestedHandler(key, title, schema, prevSteps, details, null),
  POST: (prevSteps, nextSteps) => postNestedHandler(key, title, schema),
};

export default {
  key,
  slug,
  title,
  schema,
  handlers,
  details
};
