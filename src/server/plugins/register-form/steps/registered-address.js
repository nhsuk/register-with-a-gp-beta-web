import Joi from 'joi';

import { postHandlerFactory, getHandlerFactory, dependsOnBoolean, dataTransformer } from './common';
import previouslyRegisteredStep from './previously-registered';

const schema = Joi.object().keys({
  'registered-address-correct': Joi.boolean().required()
    .meta({
      componentType: 'multiple-choice',
      children: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!!Please tell us if you’re registered with with this address' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you registered at {{ data.currentGP.gpName | default(data.manualGPAddress.gpName) }}  with this address?';
const key = 'registedAddress';
const slug = 'registered-address';
const beforeTemplate = '_includes/current-address.njk';
const template = 'register-form/registered-address.njk';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(
      key, title, schema, prevSteps, undefined, undefined, undefined, template
  ),
  POST: (prevSteps, nextSteps) => postHandlerFactory(
      key, title, schema, prevSteps, nextSteps, {beforeTemplate, template, dataTransformer}
  ),
};

const checkApplies = dependsOnBoolean(previouslyRegisteredStep, 'previously-registered');

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
