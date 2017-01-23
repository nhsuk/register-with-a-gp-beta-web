const Path = require('path');
const Nunjucks = require('nunjucks');

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index', {
        message:'Hello, world!',
        title: 'hello from nunjucks'
      });
    }
  });

  server.views({
    engines: {
      nunjucks: {
        compile: function (src, options) {
          const template = Nunjucks.compile(src, options.environment);
          return function (context) {
            return template.render(context);
          };
        },
        prepare: function (options, next) {
          options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });
          return next();
        }
      }
    },
    path: Path.join(__dirname, 'templates')
  });


  next();
};

exports.register.attributes = {
  pkg: {
    'name': 'IndexRoute',
    'version': '1.0.0'
  }
};
