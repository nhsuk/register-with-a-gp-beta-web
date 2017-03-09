import _ from 'lodash';
import Joi from 'joi';
import sendEmail from '../../../../shared/lib/send-exchange-email';
import {validate} from './common';

const schema = Joi.object().keys({
  'submit': Joi.any().optional().strip()
});


const title = 'Summary';
const key = 'summary';
const nextStep = 'end';


function summaryGetHandler(request, reply) {
  request.log(['cookie'], request.state.data);
  const data = _.get(request, 'state.data', {});
  return reply
    .view('register-form/summary', {data, title});
}

async function renderTemplate(env, context) {
  return await env.render(
    'email/registration-summary.njk',
    context
  );
}

export function emailGP(emailText) {
  return sendEmail(
    process.env.EMAIL_USERNAME,  //TODO - Get GP email from API
    emailText,
    'Patient registration'
  );
}

function summaryPostHandler(request, reply) {
  validate(request.payload, schema)
    .then(async value => {
      const data = _.get(request, 'state.data', {});

      const emailText = await renderTemplate(
        request.server.plugins.NunjucksConfig.nunjucksEnv,
        {data: data});

      emailGP(emailText)
        .then(() => {
          return reply
            .redirect(request.aka(nextStep))
            .state('data', _.merge({}, request.state.data, {[key]: value}));
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      request.log(['error'], err);
      return reply
        .redirect(request.aka(`register-form:${key}`));
    });
}

const handlers = {
  GET: summaryGetHandler,
  POST: summaryPostHandler
};

exports.options = {
  title,
  schema,
  handlers
};

export default [key, exports.options];
