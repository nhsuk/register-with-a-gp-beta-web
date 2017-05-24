import Joi from 'joi';

import { postHandlerFactory, getHandlerFactory } from './common';

const schema = Joi.object().keys({
  'history-chosen': Joi.array().items(Joi.string()).single()
    .meta({
      componentType: 'multiple-choice',
      children: [
        { label: 'Asthma', value: 'Asthma' },
        { label: 'Cancer', value: 'Cancer' },
        { label: 'Chronic obstructive pulmonary diseases (COPD), such as emphysema or chronic  bronchitis', value: 'Chronic obstructive pulmonary diseases (COPD), such as emphysema or chronic  bronchitis' },
        { label: 'Diabetes', value: 'Diabetes' },
        { label: 'Disabilities, including physical and learning disabilities', value: 'Disabilities, including physical and learning disabilities' },
        { label: 'Epilepsy', value: 'Epilepsy' },
        { label: 'Heart disease', value: 'Heart disease' },
        { label: 'High blood pressure', value: 'High blood pressure' },
        { label: 'Mental health issues, such as depression', value: 'Mental health issues, such as depression' },
        { label: 'Stroke or transient ischaemic attack (TIA)', value: 'Stroke or transient ischaemic attack (TIA)' },
        { label: 'Thyroid problems', value: 'Thyroid problems' },
      ],
      variant: 'checkbox',
      hint: 'Select all that apply'
    }),
  'medical-history': Joi.string().max(200).allow('').optional()
    .label('I`ve had a serious condition or illness that isn`t listed')
    .meta({
      componentType: 'disclosure',
      variant: 'large',
    }),
  'medical-history-details': Joi.string().max(200).allow('').optional()
    .label('Is there anything else you need to tell the GP about your health?')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),

  'submit': Joi.any().optional().strip()
});

const title = 'Have you had any medical conditions?';
const key = 'medicalHistory';
const slug = 'medical-history';

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
