import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';

import { postHandlerFactory, getHandlerFactory, dependsOnBoolean,} from './common';
import previouslyRegisteredStep from './previously-registered';
import registeredAddressStep from './registered-address';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'address1': Joi.string().allow('').max(50).label('Address').meta({ componentType: 'textbox', ariaLabel: 'Address line 1' }),
  'address2': Joi.string().allow('').max(50).meta({ componentType: 'textbox', ariaLabel: 'Address line 2' }),
  'address3': Joi.string().allow('').max(50).meta({ componentType: 'textbox',ariaLabel: 'Address line 3' }),
  'locality': Joi.string().allow('').max(100).required().label('Town or City').meta({ componentType: 'textbox',ariaLabel: 'Town or City'  }),
  'postcode': Joi.postcode().uppercase().options({
    language: {
      string: {
        regex: { base: 'Please enter a postcode' },
      },
    },
  }).label('Postcode').meta({ componentType: 'textbox', variant: 'short',ariaLabel: 'Postcode' }),
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
  return registered && incorrect;
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
