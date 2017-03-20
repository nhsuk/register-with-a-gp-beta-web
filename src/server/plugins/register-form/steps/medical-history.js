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
  handlers,
};
