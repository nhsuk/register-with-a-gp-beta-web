import JoiBase from 'joi';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiNHSNumber);

const schema = Joi.object().keys({
  'nhs-number-known': Joi.boolean().required()
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
        any: { required: '!!Please tell us if you know your NHS number' },
      },
    }),
  'submit': Joi.any().optional().strip(),
});

const title = 'Do you know your NHS number?';
const key = 'nhsNumber';
const slug = 'nhs-number';

const details = {
  summary: 'How to find your NHS number',
  content: 'An NHS number is a 10 digit number, for example: <strong>943 476 5919</strong><br>You can find your NHS number:<ul><li><a href="javascript:return false;">online</a></li><li>on a printed prescription</li><li>on a letter from your GP or a hospital</li><li>on your NHS medical card if you have one</li></ul>',
  position: 'below'
};

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps, details),
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
