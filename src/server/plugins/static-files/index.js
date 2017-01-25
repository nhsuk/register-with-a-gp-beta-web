exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: '.',
        listing: server.settings.app.debug
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'StaticFilesConfig',
  version: '1.0.0',
  dependencies: 'inert'
};
