import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'bestPhone': Joi.string().required().max(20).label('Best phone number').meta({ componentType: 'numeric' }),
  'backUpPhone': Joi.string().allow('').max(20).label('Back-up phone number (optional)').meta({ componentType: 'numeric' }),
  'email': Joi.string().email().allow('').max(254).optional().label('Email address (optional)').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'How can {{ CURRENT_PRACTICE.name }} contact you?';
const key = 'contactDetails';
const slug = 'contact-details';

const details = {
  summary: 'Why am I being asked this question?',
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
