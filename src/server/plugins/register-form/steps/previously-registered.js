import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'previously-registered': Joi.boolean().required()
    .meta({
      componentType: 'nested-gp-lookup',
      nestedFieldVisibleValue: 'true',
      children: [
        { label: 'Yes', value: 'true', show_nested_fields:true},
        { label: 'No', value: 'false', show_nested_fields:false},
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
