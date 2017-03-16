import Boom from 'boom';

exports.register = function(server, options, next) {
  server.ext('onRequest', function (request, reply) {
    const allowed =
      request.headers['x-forwarded-proto'] === 'https' ||
      request.connection.info.protocol === 'https';
    if (!allowed) {
      request.log(
        ['security'],
        'http request rejected. load balancer is misconfigured'
      );
      reply(Boom.forbidden());
      return;
    }
    reply.continue();
  });

  next();
};

exports.register.attributes = {
  name: 'DisableHTTP',
  version: '1.0.0',
  dependencies: 'inert'
};
