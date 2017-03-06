import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const fields = [
  {id: 'address1', label: ''},
  {id: 'address2', label: ''},
  {id: 'address3', label: ''},
  {id: 'locality', label: 'Town or City'},
  {id: 'postcode', label: 'Post Code'}
];

const schema = Joi.object().keys({
  'address1': Joi.string().allow('').max(50),
  'address2': Joi.string().allow('').max(50),
  'address3': Joi.string().allow('').max(50),
  'locality': Joi.string().allow('').max(100).required(),
  'postcode': Joi.postcode().uppercase(),
  'submit': Joi.any().optional().strip(),
})
  .or('address1', 'address2', 'address3');

const title = 'What is your address?';
const key = 'address';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, 'email')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
