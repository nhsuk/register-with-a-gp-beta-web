import Path from 'path';
import _ from 'lodash';
import cookies from '../../config/cookies';
import practiceLookup from '../../../shared/lib/practice-lookup';
import {getLatestUncompletedStep} from '../register-form/steps/common.js';

const fs = require('fs');

function practiceHandler(request, reply) {
  if (request.params.practice) {
    const practice = practiceLookup.getPractice(request.params.practice);

    if (typeof practice !== 'undefined') {
      return reply
        .redirect(request.aka('start'))
        .state('practice', request.params.practice);
    }
  }

  reply
    .view('practices', {
      practices: practiceLookup.getPractices(),
      showNotifications: true
    });
}

export function InvalidCookie(reply) {
  reply.unstate('data');
}

const defaultPracticeStartTemplate = 'practices/start/default.njk';
const defaultPracticeEndTemplate = 'practices/end/default.njk';

export function getPracticeStartTemplate(request) {
  const practice = request.params.practice;
  if (practice){
    const practiceTemplateName = 'practices/start/' + practice;
    const appSettings = request.server.settings.app;
    const practiceTemplate = Path.join(appSettings.templatePath, practiceTemplateName + '.njk');
    if (fs.existsSync(practiceTemplate)){
      return practiceTemplateName;
    }
  }

  return defaultPracticeStartTemplate;
}

export function getPracticeEndTemplate(request) {
  const practice = request.params.practice;
  if (practice){
    const practiceTemplateName = 'practices/end/' + practice;
    const appSettings = request.server.settings.app;
    const practiceTemplate = Path.join(appSettings.templatePath, practiceTemplateName + '.njk');
    if (fs.existsSync(practiceTemplate)){
      return practiceTemplateName;
    }
  }

  return defaultPracticeEndTemplate;
}

function startHandler(request, reply) {
  InvalidCookie(reply);
  const practice = request.params.practice;
  const practiceData = practiceLookup.getPractice(practice);
  const practiceStartTemplate = getPracticeStartTemplate(request);
  if (typeof practiceData !== 'undefined') {
    reply
      .view(practiceStartTemplate, {showNotifications: true, firstStep: '/' + practice + '/register/nhs-number'});
  } else {
    reply.redirect(request.aka(''));
  }
}

function endHandler(request, reply) {
  const practiceEndTemplate = getPracticeEndTemplate(request);
  if (request.params.practice) {
    const practice = practiceLookup.getPractice(request.params.practice);
    if (typeof practice !== 'undefined') {
      return reply
        .view(practiceEndTemplate, {
          practice,
        });
    }
  }

  return reply.view(practiceEndTemplate);
}

function stepMissingHandler(request, reply) {
  const practice = request.params.practice;
  const practiceData = practiceLookup.getPractice(practice);
  if(typeof practiceData === 'undefined'){
    return reply.redirect('/');
  }
  const latestUncompletedStep = getLatestUncompletedStep(request.state.data);
  return reply.redirect('/' + practice + '/register/' + latestUncompletedStep.slug);
}

exports.register = function(server, options, next) {
  const routeConfig = {
    state: cookies.enableCookies,
  };

  const stateConfig = cookies.encryptedCookies(!server.settings.app.debug);
  stateConfig.path = server.realm.modifiers.route.prefix || '/';

  server.state('practice', stateConfig);

  server.route({
    method: 'GET',
    config: _.merge({}, routeConfig, {id: 'choose'}),
    path: '/',
    handler: practiceHandler,
  });

  server.route({
    method: 'GET',
    config: _.merge({}, routeConfig, {id: 'start'}),
    path: '/{practice}/start',
    handler: startHandler,
  });

  server.route({
    method: 'GET',
    config: _.merge({}, routeConfig, {id: 'end'}),
    path: '/registration-submitted/{practice?}',
    handler: endHandler,
  });

  server.route({
    method: 'GET',
    path: '/{practice}',
    handler: stepMissingHandler
  });

  server.route({
    method: 'GET',
    path: '/{practice}/',
    handler: stepMissingHandler
  });

  server.route({
    method: 'GET',
    path: '/{practice}/register',
    handler: stepMissingHandler
  });

  server.route({
    method: 'GET',
    path: '/{practice}/register/',
    handler: stepMissingHandler
  });

  next();
};

exports.register.attributes = {
  name: 'IndexRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
