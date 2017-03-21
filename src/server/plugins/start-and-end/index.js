import _ from 'lodash';
import cache from '../../config/cache';
import cookies from '../../config/cookies';
import practiceLookup from '../../../shared/lib/practice-lookup';

function practiceHandler(request, reply) {
  if (request.state.practice) {
    return reply.redirect(request.aka('start'));
  }

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

function startHandler(request, reply) {
  if (request.state.practice) {
    reply.view('start');
  } else {
    reply.redirect(request.aka('choose'));
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

exports.register = function(server, options, next) {
  const statelessConfig = {
    state: cookies.enableCookies,
    cache: cache.notCacheable,
  };

  const stateConfig = cookies.encryptedCookies(!server.settings.app.debug);
  stateConfig.path = server.realm.modifiers.route.prefix || '/';

  server.state('practice', stateConfig);

  server.route({
    method: 'GET',
    config: _.merge({}, statelessConfig, {id: 'choose'}),
    path: '/{practice?}',
    handler: practiceHandler,
  });

  server.route({
    method: 'GET',
    config: _.merge({}, statelessConfig, {id: 'start'}),
    path: '/start',
    handler: startHandler,
  });

  server.route({
    method: 'GET',
    config: _.merge({}, statelessConfig, {id: 'end'}),
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
