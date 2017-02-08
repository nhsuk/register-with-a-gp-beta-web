exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.view('index', {
        message:'Hello, template context!',
        title: 'hello from nunjucks',
        time: Date.now()
      });
    }
  });
  next();
};

exports.register.attributes = {
  name: 'IndexRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
