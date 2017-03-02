import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'day', label: 'Day'},
  {id: 'month', label: 'Month'},
  {id: 'year', label: 'Year'}
];

const schema = Joi.object().keys({
  'day': Joi.number().integer().min(1).max(31).required(),
  'month': Joi.number().integer().min(1).max(12).required(),
  'year': Joi.number().integer().min(1885).max(2025).required(),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your date of birth?';
const key = 'dateOfBirth';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, 'address')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
