import Joi from 'joi';
import { postHandlerFactory, getHandlerFactory, dependsOnBoolean,  propertyIsExists } from './common';
import previouslyRegisteredStep from './previously-registered';
import registeredNameStep from './registered-name';


const schema = Joi.object().keys({
  'firstName': Joi.string().max(100).label('First name').meta({ componentType: 'textbox' }),
  'middleNames': Joi.string().allow('').max(100).optional().label('Middle names').meta({ componentType: 'textbox' }),
  'lastName': Joi.string().max(100).label('Last name').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
}).or('firstName', 'middleNames', 'lastName');

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
  const isGPSelected = propertyIsExists(cookieData, 'previouslyRegistered.gpCode');
  return registered && incorrect && !isGPSelected;
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
