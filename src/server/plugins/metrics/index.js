var Plugin = {};
Plugin.register = function(server, options, next) {
  server.ext('onRequest', function (request, reply) {
    request.headers['x-req-start'] = (new Date()).getTime();
    return reply.continue();
  });
  server.ext('onPreResponse', function (request, reply) {
    if(!request.response.isBoom){
      var start = parseInt(request.headers['x-req-start']);
      var end = (new Date()).getTime();
      request.response
        .header('x-req-start', start)
        .header('x-res-end', end)
        .header('x-response-time', end - start);
      request.response
        .header('Content-Security-Policy', 'default-src \'self\'; child-src https://*.fonts.net; style-src \'self\' \'unsafe-inline\' fast.fonts.net; font-src fast.fonts.net');
      request.log(['response'],
        JSON.stringify({
          url: request.raw.req.url,
          start: request.response.headers['x-req-start'],
          end: request.response.headers['x-res-end'],
          time: request.response.headers['x-response-time'],
          status: request.response.statusCode
        })
      );
    }
    return reply.continue();
  });
  next();
};

Plugin.register.attributes = {
  name: 'metrics',
  version: '0.1'
};

module.exports = Plugin;