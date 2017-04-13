import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'email': Joi.string().email().allow('').max(254).optional().label('Email').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your email address?';
const key = 'email';
const slug = 'contact-email';

const details = {
  summary: 'Why should I provide an email address?',
  content: '{{ CURRENT_PRACTICE.name }} may need to get in touch with you to complete your registration.',
  position: 'below'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, details),
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
  handlers,
  details
};
