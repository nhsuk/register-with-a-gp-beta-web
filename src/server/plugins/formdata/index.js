import FormData from '../../../shared/lib/form-data';

function redirectHandler(request, reply) {
  const secret = request.params.secret;
  const query = request.query;
  if(secret === process.env.FORM_FEED_SECRET){
    const Data = FormData.getFormData();
    reply
      .redirect(query['url'])
      .state('data', Data );
  }
}

exports.register = function(server, options, next) {

  server.route({
    method: 'GET',
    path: '/fakeform/{secret}',
    handler: redirectHandler,
  });

  next();
};

exports.register.attributes = {
  name: 'FakeForm',
  version: '1.0.0'
};
