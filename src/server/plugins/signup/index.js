function signupHandler(request, reply) {
  reply
    .view('signup.njk');
}

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/signup',
    handler: signupHandler,
  });

  next();
};

exports.register.attributes = {
  name: 'SignupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};

