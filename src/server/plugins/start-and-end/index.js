import _ from 'lodash';
import cookies from '../../config/cookies';
import practiceLookup from '../../../shared/lib/practice-lookup';
import {getLatestUncompletedStep} from '../register-form/steps/common.js';

function practiceHandler(request, reply) {
/*
  if (request.state.practice) {
    return reply.redirect(request.aka('start'));
  }
*/
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
    });
}

export function InvalidCookie(reply) {
  reply.unstate('data');
}

function startHandler(request, reply) {
  InvalidCookie(reply);
  const practice = request.params.practice;
  const practiceData = practiceLookup.getPractice(practice);
  if (typeof practiceData !== 'undefined') {
    reply.view('start');
  } else {
    reply.redirect(request.aka(''));
  }
}

function endHandler(request, reply) {
  if (request.params.practice) {
    const practice = practiceLookup.getPractice(request.params.practice);

    if (typeof practice !== 'undefined') {
      return reply
        .view('end', {
          practice,
        });
    }
  }

  return reply.view('end');
}

function stepMissingHandler(request, reply) {
  const practice = request.params.practice;
  const latestUncompletedStep = getLatestUncompletedStep(request.state.data);
  console.log(latestUncompletedStep);
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
