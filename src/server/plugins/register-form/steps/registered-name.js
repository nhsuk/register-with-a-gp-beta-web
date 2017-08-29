import Joi from 'joi';
import _ from 'lodash';

import { postHandlerFactory, getHandlerFactory, dataTransformer } from './common';

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
        any: { required: '!!Please tell us if you’re registered with with this name' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you registered at {{ data.currentGP.gpName | default(data.manualGPAddress.gpName) }} with this name?';
const key = 'registeredName';
const slug = 'registered-name';
const beforeTemplate = '_includes/current-name.njk';
const template = 'register-form/registered-name.njk';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(
      key, title, schema, prevSteps, undefined, undefined, undefined, template
  ),
  POST: (prevSteps, nextSteps) => postHandlerFactory(
      key, title, schema, prevSteps, nextSteps, {beforeTemplate, template, dataTransformer}
  ),
};

const checkApplies = (cookieData) => {
  return _.get(cookieData, 'previouslyRegistered') === undefined;
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
