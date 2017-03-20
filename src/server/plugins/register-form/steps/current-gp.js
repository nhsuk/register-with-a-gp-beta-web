import Joi from 'joi';

import previouslyRegisteredStep from './previously-registered';
import { postHandlerFactory, getHandlerFactory, dependsOnBoolean } from './common';

const schema = Joi.object().keys({
  'practice-details': Joi.string().max(200).label('Current GP')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'What is the name and address of your current GP practice?';
const key = 'currentGP';
const slug = 'current-gp';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
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
