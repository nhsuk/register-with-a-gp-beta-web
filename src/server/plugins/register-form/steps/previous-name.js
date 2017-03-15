import Joi from 'joi';
import alreadyRegisteredWithAGPStep from './current-gp';
import {
  postHandlerFactory,
  getHandlerFactory,
  dependsOnBoolean
} from './common';

const schema = Joi.object().keys({
  'first-name': Joi.string().label('First name').meta({ componentType: 'textbox' }),
  'middle-names': Joi.string().allow('').optional().label('Middle names').meta({ componentType: 'textbox' }),
  'last-name': Joi.string().label('Last name').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
}).or('first-name', 'middle-names', 'last-name');

const title = 'Are you registered with a different name?';
const key = 'previousName';

const handlers = {
  GET: getHandlerFactory(key, title, schema),
  POST: nextStep => postHandlerFactory(key, title, schema, nextStep)
};

const checkApplies = dependsOnBoolean(
  alreadyRegisteredWithAGPStep, 'alreadyRegisteredWithGP');

/**
 * @type Step
 */
export default {
  key,
  title,
  schema,
  handlers,
  checkApplies
};
