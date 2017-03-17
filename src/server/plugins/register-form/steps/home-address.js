import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

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
  }).label('Post Code').meta({ componentType: 'textbox', variant: 'short' }),
  'submit': Joi.any().optional().strip(),
})
  .or('address1', 'address2', 'address3');

const title = 'What is your address?';
const key = 'address';
const slug = 'home-address-manual';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
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
