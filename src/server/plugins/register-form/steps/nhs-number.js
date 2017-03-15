import JoiBase from 'joi';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiNHSNumber);

const schema = Joi.object().keys({
  'nhs-number': Joi.string().nhsnumber().options({ language: { string: { nhsnumber: '!!Please enter a valid NHS number' } } }).meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip(),
});

const title = 'What is your NHS Number?';
const key = 'nhs-number';

const handlers = {
  GET: getHandlerFactory(key, title, schema),
  POST: nextStep => postHandlerFactory(key, title, schema, nextStep)
};

/**
 * @type Step
 */
export default {
  key,
  title,
  schema,
  handlers
};
