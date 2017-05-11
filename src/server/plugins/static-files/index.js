import Path from 'path';


exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: [
          './compiled/',
          Path.join(server.settings.app.repo_root, 'node_modules/nhsuk-frontend/dist/assets/')
        ],
        listing: server.settings.app.debug
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: [
          Path.join(server.settings.app.repo_root, 'src/server/static/')
        ],
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
