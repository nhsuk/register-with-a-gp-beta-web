import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'current-medication': Joi.boolean().required()
    .meta({
      componentType: 'current-medication-radio',
      nestedFieldVisibleValue: 'true',
      nestedFields: [
        {
          'label': 'Medication',
          'key': 'medications',
        },
        {
          'label': 'Medication',
          'key': 'medications',
        }
      ],
      addRowLabel: 'Add another medication',
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
  'medications': Joi.when('current-medication', {
    is: true,
    then: Joi.array().items(Joi.string().max(200).min(2)).required().options({
      language: {
        key: 'A medication item ',
      },
    })
  }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you taking any medication?';
const key = 'currentMedication';
const slug = 'current-medication';
const details = {
  summary: 'Why am I being asked this?',
  content: 'Letting your new GP know about your medication will help them while they wait for your medical records to transfer.',
  position: 'below'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, details),
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
