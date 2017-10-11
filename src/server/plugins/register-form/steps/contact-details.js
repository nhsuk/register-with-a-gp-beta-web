import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'bestPhone': Joi.string().required().max(20).label('Best phone number')
    .meta({
      componentType: 'tel',
      fieldset: true,
      legendText:'How can GP practice contact you?',
      legendClass: 'legend-hidden'
    }).options({
      language: {
        any: {
          empty: 'Please enter a phone number'
        },
      },
    }),
  'backUpPhone': Joi.string().allow('').max(20).label('Back-up phone number (optional)').meta({ componentType: 'tel' }),
  'email': Joi.string().email().allow('').max(254).optional().label('Email (optional)')
    .meta({ 
      componentType: 'textbox',
      fieldsetEnd: true 
     }),
  'submit': Joi.any().optional().strip()
});

const title = 'How can {{ CURRENT_PRACTICE.name }} contact you?';
const key = 'contactDetails';
const slug = 'contact-details';

const details = {
  summary: 'Why GPs ask this?',
  content: '{{ CURRENT_PRACTICE.name }} may need to contact you to complete your registration.',
  position: 'below'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, details),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps, details),
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
