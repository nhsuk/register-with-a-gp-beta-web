import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'telephone', label: 'Telephone', type: 'textbox'},
];

const schema = Joi.object().keys({
  'telephone': Joi.string().max(20).allow('').optional(),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your telephone number?';
const key = 'telephone';

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
