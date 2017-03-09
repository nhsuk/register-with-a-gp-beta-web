import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'first-name', label: 'First name'},
  {id: 'middle-names', label: 'Middle names'},
  {id: 'last-name', label: 'Last name'}
];

const schema = Joi.object().keys({
  'first-name': Joi.string().allow('').optional(),
  'middle-names': Joi.string().allow('').optional(),
  'last-name': Joi.string().allow('').optional(),
  'submit': Joi.any().optional().strip()
}).or('first-name', 'middle-names', 'last-name');

const title = 'Are you registered with a different name?';
const key = 'previousName';
const nextStep = 'nhsNumber';


const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, nextStep)
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];