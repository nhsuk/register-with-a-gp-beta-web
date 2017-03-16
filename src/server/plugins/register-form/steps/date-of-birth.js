import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'day': Joi.number().integer().min(1).max(31).required().label('Day').meta({ componentType: 'textbox' }),
  'month': Joi.number().integer().min(1).max(12).required().label('Month').meta({ componentType: 'textbox' }),
  'year': Joi.number().integer().min(1885).max(2025).required().label('Year').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your date of birth?';
const key = 'dateOfBirth';

const handlers = {
  GET: getHandlerFactory(key, title, schema),
  POST: nextStep => postHandlerFactory(key, title, schema, nextStep)
};

/**
 * @type Step
 */
export default {
  key,
  title,
  schema,
  handlers
};
