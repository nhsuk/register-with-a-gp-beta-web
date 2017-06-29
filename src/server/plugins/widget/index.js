import _ from 'lodash';
import cookies from '../../config/cookies';
import practiceLookup from '../../../shared/lib/practice-lookup';

function widgetHandler(request, reply) {
  const practice=request.params.practice;
  if (practice) {
    const practiceData = practiceLookup.getPractice(request.params.practice);
    if (typeof practiceData !== 'undefined') {
      return reply
        .view('layouts/widget', {
          practiceData,
        });
    } else {
      reject('Not a valid Practice name');
    }
  } else {
    reject('No Practice name');
  }
}
exports.register = function(server, options, next) {
  const routeConfig = {
    state: cookies.disableCookies,
  };
  server.route({
    config: _.merge({}, routeConfig, {id: 'widget'}),
    method: 'GET',
    path: '/{practice}/widget',
    handler: widgetHandler
  });
  next();
};

exports.register.attributes = {
  name: 'widgetRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
