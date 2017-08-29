import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'houseNumber': Joi.string().allow('').max(50)
    .label('House number/ name (optional)')
    .meta({ componentType: 'textbox' }),
  'postcode': Joi.postcode().required().uppercase().options({
    language: {
      string: {
        regex: { base: 'must be a valid UK postcode' },
      },
    },
  }).label('Postcode').meta({ componentType: 'textbox', variant: 'short' }),
  'address1': Joi.string().max(50).required().meta({ componentType: 'hidden' }),
  'address2': Joi.string().allow('').max(50).meta({ componentType: 'hidden' }),
  'address3': Joi.string().allow('').max(50).meta({ componentType: 'hidden' }),
  'town': Joi.string().max(50).required().meta({ componentType: 'hidden' }),
  'county': Joi.string().max(50).required().meta({ componentType: 'hidden' }),
  
  'submit': Joi.any().optional().strip(),
});

const title = 'What is your address?';
const key = 'addressLookup';
const slug = 'home-address-lookup';
const template = 'register-form/address-lookup';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, undefined, undefined, undefined, template),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers
};
