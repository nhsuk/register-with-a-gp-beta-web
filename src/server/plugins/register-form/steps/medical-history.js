import Joi from 'joi';

import { postHandlerFactory, getHandlerFactory } from './common';

const schema = Joi.object().keys({
  'medical-history': Joi.string().max(200).allow('').optional()
    .label('Add any health concerns you want the GP to know about')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Your health';
const key = 'medicalHistory';
const slug = 'medical-history';
const details = {
  summary: 'Examples of things to tell the GP',
  content: '<ul><li>any hospital visits</li><li>any medical conditions like asthma or diabetes</li><li>any health issues you`ve talked to a doctor about',
  position: 'above'
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
};
