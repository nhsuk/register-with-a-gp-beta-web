import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'email': Joi.string().email().allow('').optional().label('Email').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your email address?';
const key = 'email';
const slug = 'contact-email';

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
