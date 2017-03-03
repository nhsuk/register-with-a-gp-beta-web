import JoiBase from 'joi';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiNHSNumber);

const fields = [
  {id: 'nhsNumber', label: 'NHS Number'},
];

const schema = Joi.object().keys({
  'nhsNumber': Joi.string().nhsnumber(),
  'submit': Joi.any().optional().strip(),
});

const title = 'What is your NHS Number?';
const key = 'nhsNumber';

const handlers = {
  GET: getHandlerFactory(key, fields, title, schema),
  POST: postHandlerFactory(key, fields, title, schema, 'medication')
};

exports.options = {
  title,
  fields,
  schema,
  handlers
};

export default [key, exports.options];
