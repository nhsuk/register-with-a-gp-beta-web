import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {
    id: 'alreadyRegisteredWithGP',
    label: '',
    type: 'multiple-choice',
    children: [
      { label: 'Yes' },
      { label: 'No' },
    ],
  },
];

const schema = Joi.object().keys({
  'alreadyRegisteredWithGP': Joi.boolean().truthy('Yes').falsy('No').required(),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you already registered with a GP?';
const key = 'alreadyRegisteredWithGP';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, 'previousAddress')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
