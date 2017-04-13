import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'previously-armed': Joi.boolean().required()
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
        any: { required: '!Please tell us if you served in the armed forces' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Have you served in the armed forces?';
const key = 'previouslyArmed';
const slug = 'previously-armed';

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
