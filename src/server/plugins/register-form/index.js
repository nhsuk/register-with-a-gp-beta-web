import cache from '../../config/cache';
import cookies from '../../config/cookies';
import steps from './steps';

exports.register = function(server, options, next) {
  const cookiesNoCacheConfig = {
    cache: cache.notCacheable,
    state: cookies.enableCookies
  };

  const stateConfig = cookies.encryptedCookies(!server.settings.app.debug);
  stateConfig.path = server.realm.modifiers.route.prefix || '/';

  const {assign} = Object;

  const routeConfig = assign(
    {},
    cookiesNoCacheConfig,
    {plugins: {crumb: true}}
  );

  server.state('data', stateConfig);

  steps.forEach((step, index, arr) => {
    const nextSteps = arr.slice(index + 1);
    const prevSteps = arr.slice(0, index);

    server.log(step.key);
    server.route({
      config: assign({}, routeConfig, {id: `register-form:${step.key}`}),
      method: 'GET',
      path: `/${step.slug}`,
      handler: step.handlers.GET(prevSteps)
    });

    server.route({
      config: routeConfig,
      method: 'POST',
      path: `/${step.slug}`,
      handler: step.handlers.POST(prevSteps, nextSteps)
    });

  });

  next();
};

exports.register.attributes = {
  name: 'RegistrationFormRoutes',
  version: '1.0.0',
  dependencies: ['NunjucksConfig', 'crumb']
};
