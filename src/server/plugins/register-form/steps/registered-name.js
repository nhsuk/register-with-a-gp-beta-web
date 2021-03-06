import Joi from 'joi';
import { postHandlerFactory, getHandlerFactory, dependsOnBoolean, dataTransformer } from './common';
import previouslyRegisteredStep from './previously-registered';

const schema = Joi.object().keys({
  'registered-name-correct': Joi.boolean().required()
    .meta({
      componentType: 'radio-horizontal',
      children: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: 'Please answer this question' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you registered at {{ data.previouslyRegistered.gpName | default(data.previouslyRegistered.manualGPName) }} with this name?';
const key = 'registeredName';
const slug = 'registered-name';
const beforeTemplate = '_includes/current-name.njk';
const template = 'register-form/registered-name.njk';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(
      key, title, schema, prevSteps, undefined, beforeTemplate, undefined, template
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
