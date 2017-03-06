import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'telephone', label: 'Telephone'},
];

const schema = Joi.object().keys({
  'telephone': Joi.string().max(20),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your telephone number?';
const key = 'telephone';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, 'alreadyRegisteredWithGP')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
