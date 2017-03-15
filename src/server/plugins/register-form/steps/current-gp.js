import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {
    id: 'previously-registered',
    label: '',
    type: 'multiple-choice',
    children: [
      { label: 'Yes' },
      { label: 'No' },
    ],
  },
];

const schema = Joi.object().keys({
  'previously-registered': Joi.boolean().truthy('Yes').falsy('No').required().label('if you’re registered with a GP'),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you already registered with a GP?';
const key = 'previously-registered';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: nextStep => postHandlerFactory(key, fields, title, schema, nextStep)
};

/**
 * @type Step
 */
export default {
  key,
  title,
  fields,
  schema,
  handlers
};
