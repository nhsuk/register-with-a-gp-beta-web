
function redirectHandler(request, reply) {
  const toGo = request.params.toGo;
  const practice = request.params.practice;
  reply
    .redirect('/' + practice + '/register/' + toGo)
    .state('fromSummaryTo', toGo, { path: '/'} );
}

exports.register = function(server, options, next) {

  server.route({
    method: 'GET',
    path: '/{practice}/redirect/{toGo}',
    handler: redirectHandler,
  });

  next();
};

exports.register.attributes = {
  name: 'Redirect',
  version: '1.0.0'
};
