import ServiceLookup from '../../../shared/lib/service-lookup';

var Plugin = {};
Plugin.register = function(server, options, next) {
  server.ext('onPreResponse', function (request, reply) {
    if(ServiceLookup.getService() == "true"){
      return reply.view('service-down');
    } else {
      reply.continue();
    }
  });
  next();
};

Plugin.register.attributes = {
  name: 'serviceUpDown',
  version: '0.1'
};

module.exports = Plugin;