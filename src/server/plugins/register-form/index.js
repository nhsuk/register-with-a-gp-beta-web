import _slug from 'slug';

import cache from '../../config/cache';
import cookies from '../../config/cookies';
import steps from './steps';

const slugify = (str) => {
  return _slug(str, {lower: true});
};

exports.register = function(server, options, next) {
  const cookiesNoCacheConfig = {
    cache: cache.notCacheable,
    state: cookies.enableCookies
  };
  const stateConfig = cookies.encryptedCookies(!server.settings.app.debug);
  stateConfig.options.path = server.realm.modifiers.route.prefix || '/';

  const {assign} = Object;

  const routeConfig = assign({},
    cookiesNoCacheConfig,
    {plugins: { crumb: true }}
  );

  server.state(stateConfig.name, stateConfig.options);

  steps.forEach(([key, options]) => {
    server.route({
      config: assign({}, routeConfig, {id: `register-form:${key}`}),
      method: 'GET',
      path: `/${slugify(options.title)}`,
      handler: options.handlers.GET
    });

    server.route({
      config: routeConfig,
      method: 'POST',
      path: `/${slugify(options.title)}`,
      handler: options.handlers.POST
    });

  });

  next();
};

exports.register.attributes = {
  name: 'RegistrationFormRoutes',
  version: '1.0.0',
  dependencies: ['NunjucksConfig', 'crumb']
};
