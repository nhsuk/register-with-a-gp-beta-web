import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'allergies', label: 'Please enter your allergy details', type: 'textbox'},
];

const schema = Joi.object().keys({
  'allergies': Joi.string().max(200),
  'submit': Joi.any().optional().strip()
});

const title = 'Do you have any allergies?';
const key = 'allergies';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, 'summary')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
