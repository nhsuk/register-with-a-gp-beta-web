import JoiBase from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';
import FullDateValidator from '../../../../shared/lib/joi-full-date-validator';

const Joi = JoiBase.extend(FullDateValidator);

const schema = Joi.object().keys({
  'day': Joi.number().integer().min(1).max(31).required().label('Day')
  .meta({ componentType: 'numeric',
          fieldset: true,
          legendText:'What is your date of birth?',
          legendClass: 'legend-hidden' })
  .options({
      language: {
        number: {
          base: 'Please enter a valid day using numbers only',
          min: 'Please enter a valid day',
          max: 'Please enter a valid day'

      }
    }
  }),
  'month': Joi.number().integer().min(1).max(12).required().label('Month').meta({ componentType: 'numeric' }).options({
    language: {
      number: {
        base: 'Please enter a valid month using numbers only',
        min: 'Please enter a valid month',
        max: 'Please enter a valid month'
      }
    }
  }),
  'year': Joi.number().integer().min(1885).max(2025).required().label('Year')
  .meta({ 
    componentType: 'numeric',
    fieldsetEnd: true })
  .options({
    language: {
      number: {
        base: 'Please enter a valid year using numbers only',
        min: 'Please enter a year after 1885',
        max: 'Please enter a valid year'
      }
    }
  }),
  'submit': Joi.any().optional().strip()
}).fulldate();

const title = 'What is your date of birth?';
const key = 'dateOfBirth';
const slug = 'date-of-birth';
const defails = {
  hint: 'For example, 31 3 1980'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, defails),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps, defails),
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
