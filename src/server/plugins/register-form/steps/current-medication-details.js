import Joi from 'joi';

import {postHandlerFactory, getHandlerFactory, dependsOnBoolean} from './common';
import medicationStep from './current-medication';

const schema = Joi.object().keys({
  'medication': Joi.string().max(200).label('Current medication')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'List your regular medicines';
const key = 'medicationDetails';
const slug = 'current-medication-details';

const handlers = {
  GET: getHandlerFactory(key, title, schema),
  POST: nextStep => postHandlerFactory(key, title, schema, nextStep)
};

const checkApplies = dependsOnBoolean(medicationStep, 'current-medication');

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
