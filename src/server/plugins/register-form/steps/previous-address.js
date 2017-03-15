import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory, dependsOnBoolean} from './common';
import previouslyRegisteredStep from './previously-registered';

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
  }).label('Post Code').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip(),
})
  .or('address1', 'address2', 'address3');

const title = 'Are you registered with a different address?';
const key = 'previousAddress';

const handlers = {
  GET: getHandlerFactory(key, title, schema),
  POST: nextStep => postHandlerFactory(key, title, schema, nextStep)
};

const checkApplies = dependsOnBoolean(previouslyRegisteredStep, 'previously-registered');

/**
 * @type Step
 */
export default {
  title,
  schema,
  handlers,
  checkApplies
};
