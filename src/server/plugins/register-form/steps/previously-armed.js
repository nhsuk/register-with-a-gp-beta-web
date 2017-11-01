/**
 * @type Step
 */
import JoiBase from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';
import FullDateValidator from '../../../../shared/lib/joi-full-date-validator';

const Joi = JoiBase.extend(FullDateValidator);

const schema = Joi.object().keys({
  'previously-armed': Joi.boolean().required()
    .meta({
      componentType: 'armed-radio-horizontal',
      nestedFieldVisibleValue: true,
      nestedFields: [
        {
          'label': 'Service or staff number',
          'key': 'armedStaffNumber'
        },
        {
          'label': 'Day',
          'key': 'day',
          'class' : 'form-line'
        },
        {
          'label': 'Month',
          'key': 'month',
          'class' : 'form-line'
        },
        {
          'label': 'Year',
          'key': 'year',
          'class' : 'form-line'
        }
      ],
      children: [
        { label: 'Yes', value: true, show_nested_fields:true},
        { label: 'No', value: false, show_nested_fields:false},
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: 'Please answer this question' },
      },
    }),
  'armedStaffNumber': Joi.when('previously-armed', {
    is: true,
    then:Joi.string()
  }),
  'day': Joi.when('previously-armed', {is: true, then:Joi.number().integer().min(1).max(31).required()}),
  'month': Joi.when('previously-armed', {is: true, then:Joi.number().integer().min(1).max(12).required()}),
  'year': Joi.when('previously-armed', {is: true, then:Joi.number().integer().min(1885).max(2025).required()}),
  'submit': Joi.any().optional().strip()
}).fulldate();


const title = 'Have you served in the armed forces?';
const key = 'previouslyArmed';
const slug = 'previously-armed';

const details = {
  summary: 'Why GPs ask this?',
  content: 'Knowing about your time in the armed forces helps GPs get your military medical records. <br>You could also get priority care for health issues relating to your service.',
  position: 'below'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, details),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps, details),
};

export default {
  key,
  slug,
  title,
  schema,
  handlers
};
