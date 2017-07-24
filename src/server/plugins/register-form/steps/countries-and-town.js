import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';
import COUNTRIES from '../../../../shared/lib/countries';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'country': Joi.string().max(50).label('Country')
		.meta({
  componentType: 'dropdown' ,
  children: COUNTRIES,
}),
  'town': Joi.string().max(50).label('Town or City').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'Where were you born?';
const key = 'countryAndTown';
const slug = 'country-and-town';

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
