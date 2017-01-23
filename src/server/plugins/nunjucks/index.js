import Path from 'path';
import Nunjucks from 'nunjucks';

exports.register = function(server, options, next) {

  const engineConfig = {
    engines: {
      nunjucks: {
        compile: function (src, options) {
          const template = Nunjucks.compile(src, options.environment);
          return function (context) {
            return template.render(context);
          };
        },
        prepare: function (options, next) {
          options.compileOptions.environment = Nunjucks.configure(options.path, {watch: false});
          return next();
        }
      }
    },
    path: Path.join(__dirname, '../../templates')
  };
  server.root.views(engineConfig);
  next();
};

exports.register.attributes = {
  name: 'NunjucksConfig',
  version: '1.0.0',
  dependencies: 'vision'
};

