import Joi from 'joi';

import previouslyRegisteredStep from './previously-armed';
import { postHandlerFactory, getHandlerFactory, dependsOnBoolean } from './common';

const schema = Joi.object().keys({
  'armedStaffNumber': Joi.string().meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});


const title = 'What was your service or staff number?';
const key = 'armedStaffNumber';
const slug = 'armed-staff-number';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

const checkApplies = dependsOnBoolean(previouslyRegisteredStep, 'previously-armed');

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
