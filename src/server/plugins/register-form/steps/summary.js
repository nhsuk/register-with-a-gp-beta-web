import _ from 'lodash';
import Joi from 'joi';
import ChangeCase from 'change-case';

import sendEmail from '../../../../shared/lib/send-exchange-email';
import practiceLookup from '../../../../shared/lib/practice-lookup';
import { validate } from './common';

const schema = Joi.object().keys({
  'submit': Joi.any().optional().strip()
});


const title = 'Check your details';
const key = 'summary';
const slug = 'confirm-details';
const nextStep = 'end';


export function summaryGetHandler(request, reply) {
  if (process.env.NODE_ENV === 'development') {
    request.log(['cookie'], request.state.data);
  }
  const practice = request.params.practice;
  if(request.state.hasOwnProperty('data')){
    const data = _.get(request, 'state.data', {});
    if(data.hasOwnProperty('medicalHistory')){
      return reply
        .view('register-form/summary', {data, title})
        .unstate('fromSummaryTo', { path: '/' });
    } else {
      return reply
        .redirect('/' + practice + '/register/nhs-number');
    }
  } else {
    return reply
      .redirect('/' + practice + '/register/nhs-number');
  }
}

async function renderTemplate(env, context) {
  return await env.render(
    'email/registration-summary-html.njk',
    context
  );
}

export function emailGP(practiceKey, emailText) {
  return new Promise((resolve, reject) => {
    const practiceData = practiceLookup.getPractice(practiceKey);

    if (typeof practiceData !== 'undefined') {
      const envKey = ChangeCase.constantCase(practiceData.key);
      const emailAddress = process.env[`GP_EMAIL_${envKey}`];

      if (emailAddress) {
        sendEmail(emailAddress, emailText, 'Patient registration')
          .then(resolve)
          .catch(reject);
      } else {
        reject(`There is no environment variable set for '${practiceKey}'. It should have a key of '${envKey}'.`);
      }
    } else {
      reject(`'${practiceKey}' was not found in the list of practices`);
    }
  });
}

export function summaryPostHandler(request, reply) {
  validate(request.payload, schema)
    .then(async () => {
      const data = _.get(request, 'state.data', {});
      const practice = request.params.practice || '';

      const emailText = await renderTemplate(
        request.server.plugins.NunjucksConfig.nunjucksEnv,
        {data: data});
      emailGP(practice, emailText)
        .then(() => {
          return reply
            .redirect(request.aka(nextStep, {
              params: {
                practice,
              },
            }))
            .unstate('data')
            .unstate('practice');
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      request.log(['error'], err);
      return reply
        .redirect(request.aka(key));
    });
}

const handlers = {
  GET: () => summaryGetHandler,
  POST: () => summaryPostHandler
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
