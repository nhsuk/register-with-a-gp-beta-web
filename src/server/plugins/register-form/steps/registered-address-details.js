import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import _ from 'lodash';

import { postHandlerFactory, getHandlerFactory, dependsOnBoolean, propertyIsExists } from './common';
import previouslyRegisteredStep from './previously-registered';
import registeredAddressStep from './registered-address';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'address1': Joi.string().allow('').max(50).label('Address').meta({ componentType: 'textbox' }),
  'address2': Joi.string().allow('').max(50).meta({ componentType: 'textbox' }),
  'address3': Joi.string().allow('').max(50).meta({ componentType: 'textbox' }),
  'locality': Joi.string().allow('').max(100).required().label('Town or City').meta({ componentType: 'textbox' }),
  'postcode': Joi.postcode().uppercase().options({
    language: {
      string: {
        regex: { base: 'must be a valid UK postcode' },
      },
    },
  }).label('Postcode').meta({ componentType: 'textbox', variant: 'short' }),
  'submit': Joi.any().optional().strip(),
})
  .or('address1', 'address2', 'address3');

const title = 'What was your address?';
const key = 'registeredAddressDetails';
const slug = 'registered-address-manual';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

const checkApplies = (cookieData) => {
  const registered = dependsOnBoolean(previouslyRegisteredStep, 'previously-registered')(cookieData);
  const incorrect = dependsOnBoolean(registeredAddressStep, 'registered-address-correct', false)(cookieData);
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
