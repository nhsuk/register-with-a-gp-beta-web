import Joi from 'joi';

import { postHandlerFactory, getHandlerFactory } from './common';

const schema = Joi.object().keys({
  'history-chosen': Joi.array().items(Joi.string()).single()
    .meta({
      componentType: 'multiple-choice',
      children: [
        { label: 'Asthma', value: 'Asthma' },
        { label: 'Cancer', value: 'Cancer' },
        { label: 'Lung disease, like bronchitis or emphysema', value: 'Lung disease, like bronchitis or emphysema' },
        { label: 'Diabetes', value: 'Diabetes' },
        { label: 'Disabilities, including physical and learning disabilities', value: 'Disabilities, including physical and learning disabilities' },
        { label: 'Epilepsy', value: 'Epilepsy' },
        { label: 'Heart disease', value: 'Heart disease' },
        { label: 'High blood pressure', value: 'High blood pressure' },
        { label: 'Mental health issues, like depression', value: 'Mental health issues, like depression' },
        { label: 'Stroke or mini-stroke', value: 'Stroke or mini-stroke' },
        { label: 'Thyroid problems', value: 'Thyroid problems' },
      ],
      variant: 'checkbox',
      hint: 'Select all that apply'
    }),
  'medical-history': Joi.string().max(200).allow('')
    .label('I have a condition not listed above')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'medical-history-details': Joi.string().max(200).allow('')
    .label('I had major surgery').meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Have you ever had any of these conditions?';
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
