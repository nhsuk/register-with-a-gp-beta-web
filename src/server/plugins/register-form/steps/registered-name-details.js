import Joi from 'joi';
import _ from 'lodash';

import { postHandlerFactory, getHandlerFactory, dependsOnBoolean } from './common';
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
  const registered = _.get(cookieData, 'previouslyRegistered') === undefined;
  const incorrect = dependsOnBoolean(registeredNameStep, 'registered-name-correct', false)(cookieData);
  return !!(registered && incorrect);
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
