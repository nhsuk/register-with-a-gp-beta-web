import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'previously-registered': Joi.boolean().truthy('Yes').falsy('No').required()
    .meta({
      componentType: 'multiple-choice',
      children: [
        { label: 'Yes' },
        { label: 'No' },
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!!Please tell us if you’re registered with a GP' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you already registered with a GP?';
const key = 'previouslyRegistered';
const slug = 'previously-registered';

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
