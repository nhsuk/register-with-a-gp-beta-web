import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'email': Joi.string().email().max(254).optional().label('Email address').meta({ componentType: 'textbox' }),
  'bestPhone': Joi.string().required().max(20).label('Best phone number').meta({ componentType: 'textbox' }),
  'backUpPhone': Joi.string().allow('').max(20).label('Back-up phone number').meta({ componentType: 'textbox' }),
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
