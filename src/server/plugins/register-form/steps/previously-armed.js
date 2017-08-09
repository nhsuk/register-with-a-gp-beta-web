/**
 * @type Step
 */
import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'previously-armed': Joi.boolean().required()
    .meta({
      componentType: 'armed-radio-horizontal',
      nestedFields: [
        {
          'label': 'Service or staff number',
          'key': 'armedStaffNumber',
        },
        {
          'label': 'Day',
          'key': 'day',
        },
        {
          'label': 'Month',
          'key': 'month',
        },
        {
          'label': 'Year',
          'key': 'year',
        }
      ],
      nestedFieldVisibleValue: true,
      children: [
        { label: 'Yes', value: true},
        { label: 'No', value: false},
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!Please tell us if you served in the armed forces' },
      },
    }),
  'armedStaffNumber': Joi.when('previously-armed', {is: true, then:Joi.string()}),
  'day': Joi.when('previously-armed', {is: true, then:Joi.number().integer().min(1).max(31).required()}),
  'month': Joi.when('previously-armed', {is: true, then:Joi.number().integer().min(1).max(12).required()}),
  'year': Joi.when('previously-armed', {is: true, then:Joi.number().integer().min(1885).max(2025).required()}),
  'submit': Joi.any().optional().strip()
});


const title = 'Have you served in the armed forces?';
const key = 'previouslyArmed';
const slug = 'previously-armed';

const details = {
  summary: 'Why am I being asked this question?',
  content: 'If you’ve served for at least one day in the armed forces (as a regular or a reservist) you’re entitled to priority care for any conditions relating to that time. <br><br>Telling your new GP practice about your service will: <ul><li>start the transfer of your medical records from the Ministry of Defence</li><li>help you benefit from special services, like prosthetics and mental health</li></ul>',
  position: 'below'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, details),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

export default {
  key,
  slug,
  title,
  schema,
  handlers
};
