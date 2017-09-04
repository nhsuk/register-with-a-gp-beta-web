import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const schema = Joi.object().keys({
  'previously-registered': Joi.boolean().required()
    .meta({
      componentType: 'nested-gp-lookup',
      nestedFieldVisibleValue: 'true',
      hiddenSummaryPage: true,
      children: [
        { label: 'Yes', value: 'true', show_nested_fields:true},
        { label: 'No', value: 'false', show_nested_fields:false},
      ],
      variant: 'radio',
    })
    .options({
      language: {
        any: { required: '!!Please tell us if you’re registered with a GP' },
      },
    }),
  'gpName': Joi.alternatives()
    .when('previously-registered', {
      is: false,
      then: Joi.string().allow(''),
    })
    .when('previously-registered', {
      is: true,
      then:Joi.string().max(50).required().options({
        language: {
          key: ' ',
          any: { empty: 'Please type a GP name' },
        },
      }),
    }),
  'gpAddress': Joi.when('previously-registered', {is: false, then:Joi.string().allow('').optional()}),
  'manualGPName': Joi.alternatives()
    .when('previously-registered', {
      is: false,
      then: Joi.string().allow(''),
    })
    .when('gpName', {
      is: '',
      then: Joi.string().required().options({
        language: {
          key: ' ',
          any: { empty: ' ', required: ' ' },
          string: {
            regex: {base: ' '},
          },
        },
      }),
      otherwise: Joi.string().allow('').max(50)
    }),
  'address1': Joi.string().allow('').max(50),
  'address2': Joi.string().allow('').max(50),
  'address3': Joi.string().allow('').max(50),
  'locality': Joi.string().allow('').max(100),
  'postcode': Joi.alternatives()
    .when('previously-registered', {
      is: false,
      then: Joi.string().allow(''),
    })
    .when('gpName', {
      is: '',
      then: Joi.postcode().uppercase().options({
        language: {
          key: ' ',
          any: { empty: ' ', required: ' ' },
          string: {
            regex: {base: ' '},
          },
        },
      }),
      otherwise: Joi.string().allow('')
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Are you already registered with a GP?';
const key = 'previouslyRegistered';
const slug = 'previously-registered';


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
