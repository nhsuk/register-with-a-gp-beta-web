import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'previously-armed': Joi.boolean().required()
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
        any: { required: '!Please tell us if you served in the armed forces' },
      },
    }),
  'submit': Joi.any().optional().strip()
});

const title = 'Have you served in the armed forces?';
const key = 'previouslyArmed';
const slug = 'previously-armed';

const details = {
  summary: 'Why am I being asked this question?',
  content: 'If you’ve served for at least one day in the armed forces (as a regular or a reservist) you’re entitled to priority care for any conditions relating to that time. <br><br>Telling your new GP practice about your service will: <ul><li>start the transfer of your medical records from the Ministry of Defence</li><li>help you benefit from special services, like prosthetics and mental health</li></ul>',
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
