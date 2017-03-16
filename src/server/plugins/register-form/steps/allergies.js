import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'allergies': Joi.string().max(200).label('Allergies')
    .meta({
      componentType: 'textbox',
      variant: 'large',
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Do you have any allergies?';
const key = 'allergies';
const slug = 'allergies-details';

const handlers = {
  GET: getHandlerFactory(key, title, schema),
  POST: nextStep => postHandlerFactory(key, title, schema, nextStep)
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
