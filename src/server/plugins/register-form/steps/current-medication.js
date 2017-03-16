import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'medication': Joi.string().max(200).label('Current medication')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you taking any medication?';
const key = 'medication';
const slug = 'current-medication-details';

const handlers = {
  GET: getHandlerFactory(key, title, schema),
  POST: nextStep => postHandlerFactory(key, title, schema, nextStep)
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
