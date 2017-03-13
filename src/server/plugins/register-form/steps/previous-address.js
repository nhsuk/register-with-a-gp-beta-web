import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const fields = [
  {id: 'address1', label: 'Address', type: 'textbox'},
  {id: 'address2', label: '', type: 'textbox'},
  {id: 'address3', label: '', type: 'textbox'},
  {id: 'locality', label: 'Town or City', type: 'textbox'},
  {id: 'postcode', label: 'Post Code', type: 'textbox'}
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

const title = 'Are you registered with a different address?';
const key = 'previousAddress';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, 'previousName')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
