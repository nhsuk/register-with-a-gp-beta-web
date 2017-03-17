import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'first-name': Joi.string().label('First name').meta({ componentType: 'textbox' }),
  'middle-names': Joi.string().allow('').optional().label('Middle names').meta({ componentType: 'textbox' }),
  'last-name': Joi.string().label('Last name').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
}).or('first-name', 'middle-names', 'last-name');

const title = 'What is your name?';
const key = 'name';
const slug = 'name';

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
