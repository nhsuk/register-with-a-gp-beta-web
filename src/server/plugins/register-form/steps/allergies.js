import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'any-allergies': Joi.boolean().required()
    .meta({
      componentType: 'allergies-nested-radio',
      nestedFieldVisibleValue: 'true',
      nestedFields: [
        {
          'label': 'Allergies',
          'key': 'allergies',
        },
        {
          'label': 'Allergies',
          'key': 'allergies',
        }
      ],
      addRowLabel: 'Add another allergy',
      children: [
        { label: 'Yes', value: 'true', show_nested_fields:true},
        { label: 'No', value: 'false', show_nested_fields:false},
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!!Please tell us if you’re currently taking any medication' },
      },
    }),
  'allergies': Joi.when('any-allergies', {
    is: true,
    then: Joi.array().items(Joi.string().max(200).min(2)).required().options({
      language: {
        key: 'A allergy item ',
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
