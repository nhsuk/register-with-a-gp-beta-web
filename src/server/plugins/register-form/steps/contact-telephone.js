import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';


const schema = Joi.object().keys({
  'telephone': Joi.string().max(20).label('Telephone').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your telephone number?';
const key = 'telephone';
const slug = 'contact-telephone';

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
