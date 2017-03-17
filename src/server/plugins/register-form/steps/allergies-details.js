import Joi from 'joi';

import {postHandlerFactory, getHandlerFactory, dependsOnBoolean} from './common';
import allergiesStep from './allergies';

const schema = Joi.object().keys({
  'allergies': Joi.string().max(200).label('Allergies')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'List your allergies';
const key = 'allergiesDetails';
const slug = 'allergies-details';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

const checkApplies = dependsOnBoolean(allergiesStep, 'any-allergies');

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
