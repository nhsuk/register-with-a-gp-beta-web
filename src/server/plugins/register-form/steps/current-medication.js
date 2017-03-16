import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'current-medication': Joi.boolean().required()
    .meta({
      componentType: 'multiple-choice',
      children: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!!Please tell us if you’re currently taking any medication' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you taking any medication?';
const key = 'currentMedication';
const slug = 'current-medication';

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
