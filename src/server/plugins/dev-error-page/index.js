import errorMiddleware from 'hapi-dev-error-page';

exports.register = function(server, config, next) {
  server.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) {
      return errorMiddleware(request, reply);
    }
    reply.continue();
  });
  next();
};


exports.register.attributes = {
  name: 'DevErrorPage',
  version: '1.0.0'
};
