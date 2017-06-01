import Joi from 'joi';

import previouslyRegisteredStep from './previously-registered';
import { postHandlerFactory, getHandlerFactory, dependsOnBoolean, dataTransformer } from './common';

const schema = Joi.object().keys({
  'gpCode': Joi.string().required(),
  'gpName': Joi.string().required(),
  'gpAddress': Joi.string().allow('').optional(),
  'submit': Joi.any().optional().strip()
});

const title = 'What is the name and address of your current GP practice?';
const key = 'currentGP';
const slug = 'current-gp';
const template = 'register-form/current-gp';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(
      key, title, schema, prevSteps, undefined, undefined, undefined, template
  ),
  POST: (prevSteps, nextSteps) => postHandlerFactory(
      key, title, schema, prevSteps, nextSteps, {undefined, template, dataTransformer}
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
