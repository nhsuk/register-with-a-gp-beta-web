import _ from 'lodash';
import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory, dependsOnBoolean, propertyIsExists} from './common';
import previouslyRegisteredStep from './previously-registered';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'gpName': Joi.string().max(50).required().label('GP practice name').meta({ componentType: 'textbox' }),
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

const title = 'What is the address of your current GP practice?';
const key = 'manualGPAddress';
const slug = 'enter-gp-address';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

const checkApplies = (cookieData) => {
  const registered = dependsOnBoolean(previouslyRegisteredStep, 'previously-registered')(cookieData);
  const isGPSelected = propertyIsExists(cookieData, 'previouslyRegistered.gpCode');
  return registered && !isGPSelected;
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
  checkApplies
};
