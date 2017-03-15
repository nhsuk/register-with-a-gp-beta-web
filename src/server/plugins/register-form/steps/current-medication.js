import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'medication', label: 'Current Medication', type: 'textbox'},
];

const schema = Joi.object().keys({
  'medication': Joi.string().max(200),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you taking any medication?';
const key = 'medication';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: nextStep => postHandlerFactory(key, fields, title, schema, nextStep)
};

/**
 * @type Step
 */
export default {
  key,
  title,
  fields,
  schema,
  handlers
};
