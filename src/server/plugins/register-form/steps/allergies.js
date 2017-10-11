import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'any-allergies': Joi.boolean().required()
    .meta({
      componentType: 'allergies-nested-radio',
      nestedFieldVisibleValue: 'true',
      nestedField: 'allergies',
      children: [
        { label: 'Yes', value: 'true', show_nested_fields:true},
        { label: 'No', value: 'false', show_nested_fields:false},
      ],
      variant: 'radio',
      fieldset: true,
      legendText:'Do you have any allergies?',
      legendClass: 'legend-hidden',
      fieldsetEnd: true
    })
    .options({
      language: {
        any: {
          required: 'Please answer this question'
        },
      },
    }),
  'allergies': Joi.when('any-allergies', {
    is: true,
    then: Joi.string().max(200).allow('').options({
      language: {
        key: 'Allergies ',
      },
    })
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
