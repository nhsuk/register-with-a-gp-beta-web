import JoiBase from 'joi';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiNHSNumber);

const schema = Joi.object().keys({
  'nhs-number-known': Joi.boolean().required()
    .meta({
      componentType: 'nhs-number-radio',
      nestedFields: [
        {
          'label': 'NHS number',
          'key': 'nhs-number',
        },
      ],
      nestedFieldVisibleValue: true,
      children: [
        { label: 'Yes', value: true, show_nested_fields:true},
        { label: 'No', value: false, show_nested_fields:false},
      ],
      variant: 'radio',
      legendText:'Do you know your NHS number?',
      legendClass: 'legend-hidden'
    })
    .options({
      language: {
        any: {
          required: 'Please answer this question'
        },
      },
    }),
  'nhs-number': Joi.when('nhs-number-known', {
    is: true,
    then: Joi.string().nhsnumber().required().options({
      language: {
        any: {
          empty: 'Please answer this question'
        },
      },
    }),
  }),
  'submit': Joi.any().optional().strip(),
});

const title = 'Do you know your NHS number?';
const key = 'nhsNumber';
const slug = 'nhs-number';
const extraInfo = 'NHS numbers are 10 digits long, for example <strong>943 476 5919</strong>.<br>Find it on prescriptions or doctor/hospital letters or call your old GP.';

const details = {
  summary: 'Why GPs ask this?',
  content: 'Your NHS number helps GPs find your medical records more easily.',
  position: 'below'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, details, null,  extraInfo),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps, details, extraInfo),
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
