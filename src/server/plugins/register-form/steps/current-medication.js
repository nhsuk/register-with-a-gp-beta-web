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
  POST: postHandlerFactory(key, fields, title, schema, 'allergies')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
