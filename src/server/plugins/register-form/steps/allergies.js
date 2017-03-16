import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'any-allergies': Joi.boolean().required()
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
        any: { required: '!!Please tell us if you have any allergies' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Do you have any allergies?';
const key = 'allergies';
const slug = 'allergies';

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
