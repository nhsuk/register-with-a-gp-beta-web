import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'current-medication': Joi.boolean().required()
    .meta({
      componentType: 'current-medication-radio',
      nestedFieldVisibleValue: 'true',
      nestedField: 'medications',
      children: [
        { label: 'Yes', value: 'true', show_nested_fields:true},
        { label: 'No', value: 'false', show_nested_fields:false},
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: {
          required: 'Please answer this question'
        },
      },
    }),
  'medications': Joi.when('current-medication', {
    is: true,
    then: Joi.string().max(200).allow('').options({
      language: {
        key: 'Medications ',
      },
    }).meta({
      componentType: 'textbox',
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
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps, details),
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
