import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'day', label: 'Day', type: 'textbox'},
  {id: 'month', label: 'Month', type: 'textbox'},
  {id: 'year', label: 'Year', type: 'textbox'}
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
