import Path from 'path';
import _ from 'lodash';
import cookies from '../../config/cookies';
import practiceLookup from '../../../shared/lib/practice-lookup';

const fs = require('fs');

function practiceHandler(request, reply) {
  // if (request.state.practice) {
  //   return reply.redirect(request.aka('start'));
  // }

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
  const practice = request.state.practice;
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
  const practice = request.state.practice;
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
  const practiceStartTemplate = getPracticeStartTemplate(request);
  if (request.state.practice) {
    reply.view(practiceStartTemplate, {showNotifications: true, firstStep: '/register/nhs-number'});
  } else {
    reply.redirect(request.aka('choose'));
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
    path: '/{practice?}',
    handler: practiceHandler,
  });

  server.route({
    method: 'GET',
    config: _.merge({}, routeConfig, {id: 'start'}),
    path: '/start',
    handler: startHandler,
  });

  server.route({
    method: 'GET',
    config: _.merge({}, routeConfig, {id: 'end'}),
    path: '/registration-submitted/{practice?}',
    handler: endHandler,
  });

  next();
};

exports.register.attributes = {
  name: 'IndexRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
