import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'any-allergies': Joi.boolean().required()
    .meta({
      componentType: 'radio-horizontal',
      children: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!!Please tell us if you have any allergies' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Do you have any allergies?';
const key = 'allergies';
const slug = 'allergies';

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
