import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const fields = [
  {id: 'first-name', label: 'First name', type: 'textbox'},
  {id: 'middle-names', label: 'Middle names', type: 'textbox'},
  {id: 'last-name', label: 'Last name', type: 'textbox'}
];

const schema = Joi.object().keys({
  'first-name': Joi.string().label('First name'),
  'middle-names': Joi.string().allow('').optional(),
  'last-name': Joi.string().label('Last name'),
  'submit': Joi.any().optional().strip()
}).or('first-name', 'middle-names', 'last-name');

const title = 'What is your name?';
const key = 'name';


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
