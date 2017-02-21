import _ from 'lodash';
import cache from '../../config/cache';
import cookies from '../../config/cookies';

function redirectToStart(request, reply) {
  reply.redirect('/start');
}

function startHandler(request, reply) {
  reply.view('index', {
    message:'Hello, template context!',
    title: 'hello from nunjucks',
    time: Date.now()
  });
}

exports.register = function(server, options, next) {
  const statelessConfig = {
    state: cookies.disableCookies,
    cache: cache.cacheable
  };

  server.route({
    method: 'GET',
    config: statelessConfig,
    path: '/',
    handler: redirectToStart
  });

  server.route({
    method: 'GET',
    config: _.merge({}, statelessConfig, {id: 'start'}),
    path: '/start',
    handler: startHandler
  });

  next();
};

exports.register.attributes = {
  name: 'IndexRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
