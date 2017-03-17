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
const slug = 'date-of-birth';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers
};
