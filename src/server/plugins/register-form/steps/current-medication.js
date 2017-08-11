import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'current-medication': Joi.boolean().required()
    .meta({
      componentType: 'current-medication-radio',
      nestedFieldVisibleValue: 'true',
      initialNestedFieldCount: 2,
      nestedFields: [
        {
          'label': 'Medication',
          'key': 'medication',
        }
      ],
      children: [
        { label: 'Yes', value: 'true', show_nhs_number_input:'true'},
        { label: 'No', value: 'false', show_nhs_number_input:'false'},
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!!Please tell us if you’re currently taking any medication' },
      },
    }),
  'medication': Joi.when('current-medication', {is: true, then: Joi.array().items(Joi.string().max(200)).min(0)}),
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
