import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'gender': Joi.string().required()
    .meta({
      componentType: 'multiple-choice',
      children: [
        { label: 'Female', value: 'Female' },
        { label: 'Male', value: 'Male' },
        { label: 'Other', value: 'Not male or female' },
      ],
      variant: 'radio',
      legendText : 'What is your sex?',
      legendClass : 'legend-hidden'
    })
    .options({
      language: {
        any: {
          required: 'Please answer this question'
        },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your sex?';
const key = 'gender';
const slug = 'gender-or-sex';

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
