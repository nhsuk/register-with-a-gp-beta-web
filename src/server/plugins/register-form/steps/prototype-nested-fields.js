/**
 * @type Step
 */
import Joi from 'joi';
import {getFieldData} from './common';
import { validate } from './common';

const schema = Joi.object().keys({
  'has_item': Joi.boolean().required()
    .meta({
      componentType: 'radio-horizontal',
      children: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
      variant: 'radio',
    }),
  'items': Joi.any().label('Items').when('has_item', {is: true, then: Joi.array().items(Joi.string()).meta({ componentType: 'nested'}).single().required()}),
  'submit': Joi.any().optional().strip()
});

const title = 'Do you have items?';
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
  template = 'register-form/nested-field') {
  return (request, reply) => {
    return reply.view(template, {
      fields: getFieldData(schema),
      data: request.state.data,
      cid: request.state.cid,
      showLog: false,
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
    let is_valid = false;
    let validation_response = {};
    const showLog = true;
    validate(request.payload, schema).then(value => {
      is_valid = true;
      validation_response = JSON.stringify(value);
    }).catch(err => {
      is_valid = false;
      validation_response = JSON.stringify(err);
    });
    return reply.view(template, {
      fields: getFieldData(schema),
      data: request.state.data,
      cid: request.state.cid,
      initial_obj:Joi.number().meta({componentType: 'numeric'}),
      is_valid: is_valid,
      showLog: showLog,
      validation_response:validation_response,
      key,
      title,
    });
  };
}

const handlers = {
  GET: (prevSteps) => getNestedHandler(key, title, schema, prevSteps, details, null),
  POST: () => postNestedHandler(key, title, schema),
};

export default {
  key,
  slug,
  title,
  schema,
  handlers,
  details
};
