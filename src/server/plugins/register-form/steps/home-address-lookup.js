import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'address1': Joi.string().max(50).required().meta({ componentType: 'hidden' }).options({
    language: {
      any: {
        empty: 'Address is not allowed to be empty'
      },
      string: {
        max: 'Address length must be less than or equal to 50 characters long'
      }
    }
  }),
  'address2': Joi.string().allow('').max(50).meta({ componentType: 'hidden' }).options({
    language: {
      string: {
        max: 'Address length must be less than or equal to 50 characters long'
      }
    }
  }),
  'address3': Joi.string().allow('').max(50).meta({ componentType: 'hidden' }).options({
    language: {
      string: {
        max: 'Address length must be less than or equal to 50 characters long'
      }
    }
  }),
  'town': Joi.string().max(50).required().meta({ componentType: 'hidden' }).options({
    language: {
      any: {
        empty: 'Town is not allowed to be empty'
      },
      string: {
        max: 'Town length must be less than or equal to 50 characters long'
      }
    }
  }),
  'county': Joi.string().allow('').max(50).meta({ componentType: 'hidden' }).options({
    language: {
      string: {
        max: 'County length must be less than or equal to 50 characters long'
      }
    }
  }),
  'houseNumber': Joi.string().allow('').max(50)
    .label('House number/ name (optional)')
    .meta({ componentType: 'textbox' }),
  'postcode': Joi.postcode().required().uppercase().options({
    language: {
      any: {
        required: 'Please enter a postcode'
      },
      string: {
        regex: { base: 'must be a valid UK postcode' },
      },
    },
  }).label('Postcode').meta({ componentType: 'textbox', variant: 'short' }),

  'submit': Joi.any().optional().strip(),
});

const title = 'What is your address?';
const key = 'addressLookup';
const slug = 'home-address-lookup';
const template = 'register-form/address-lookup';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, undefined, undefined, undefined, template),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps, undefined, undefined,{ beforeTemplate:undefined, template, dataTransformer:undefined }),
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
