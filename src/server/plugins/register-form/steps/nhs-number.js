import JoiBase from 'joi';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiNHSNumber);

const fields = [
  {id: 'nhsNumber', label: 'NHS Number', type: 'textbox'},
];

const schema = Joi.object().keys({
  'nhsNumber': Joi.string().nhsnumber(),
  'submit': Joi.any().optional().strip(),
});

const title = 'What is your NHS Number?';
const key = 'nhsNumber';

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
