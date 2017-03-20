import Joi from 'joi';

import { postHandlerFactory, getHandlerFactory, dependsOnBoolean } from './common';
import previouslyRegisteredStep from './previously-registered';
import registeredNameStep from './registered-name';

const schema = Joi.object().keys({
  'first-name': Joi.string().label('First name').meta({ componentType: 'textbox' }),
  'middle-names': Joi.string().allow('').optional().label('Middle names').meta({ componentType: 'textbox' }),
  'last-name': Joi.string().label('Last name').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
}).or('first-name', 'middle-names', 'last-name');

const title = 'What was your previous name?';
const key = 'registeredNameDetails';
const slug = 'registered-name-details';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

const checkApplies = (cookieData) => {
  const registered = dependsOnBoolean(previouslyRegisteredStep, 'previously-registered')(cookieData);
  const incorrect = dependsOnBoolean(registeredNameStep, 'registered-name-correct', false)(cookieData);

  if (registered && incorrect) {
    return true;
  } else {
    return false;
  }
};

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers,
  checkApplies,
};
