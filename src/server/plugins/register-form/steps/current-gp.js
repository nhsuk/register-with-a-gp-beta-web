import Joi from 'joi';

import previouslyRegisteredStep from './previously-registered';
import { postHandlerFactory, getHandlerFactory, dependsOnBoolean, dataTransformer } from './common';

const schema = Joi.object().keys({
  'gp-code': Joi.string().required(),
  'gp-name': Joi.string().required(),
  'gp-address': Joi.string().allow('').optional(),
  'submit': Joi.any().optional().strip()
});

const title = 'What is the name and address of your current GP practice?';
const key = 'currentGP';
const slug = 'current-gp';
const template = "register-form/current-gp";

const handlers = {
  GET: (prevSteps) => getHandlerFactory(
      key, title, schema, prevSteps, null, null, null, template
  ),
  POST: (prevSteps, nextSteps) => postHandlerFactory(
      key, title, schema, prevSteps, nextSteps, {null, template, dataTransformer}
  ),
};

const checkApplies = dependsOnBoolean(previouslyRegisteredStep, 'previously-registered');

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers,
  checkApplies
};
