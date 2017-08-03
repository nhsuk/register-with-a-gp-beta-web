/**
 * @type Step
 */
import Joi from 'joi';
import {getFieldData} from './common';
import { validate } from './common';

const schema = Joi.object().keys({
  'has-item': Joi.boolean().required()
    .meta({
      componentType: 'radio-horizontal',
      children: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!Please tell us if you served in the armed forces' },
      },
    }),
  'items': Joi.array().items(Joi.string()).meta({ componentType: 'nested'}).single().label('Items'),
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
    validate(request.payload, schema).then(value => {
      console.log('----');
      console.log(value);
    }).catch(err => {
      console.log(err);
    });
    return reply.view(template, {
      fields: getFieldData(schema),
      data: request.state.data,
      cid: request.state.cid,
      initial_obj:Joi.number().meta({componentType: 'numeric'}),
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
