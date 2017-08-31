import _ from 'lodash';
import cookies from '../../config/cookies';
import elasticsearch from './elasticsearch';
import {getMockedGPLookupData} from '../../../__tests__/helpers/index';

function getGPList(keywords) {
  return new Promise((resolve) => {
    const query = {
      query: {
        multi_match: {
          query: keywords,
          fields: ['name^3', 'address^2', 'practitioners.name']
        }
      }
    };

    elasticsearch.search(
      'practice',
      query,
      (error, response) =>{
        let results = [];
        if (response.hits){
          results = response.hits.hits;
        }
        resolve(results);
      }
    );
  });
}


exports.getGPList = getGPList;


function gpLookupHandler(request, reply) {

  // fixme: Our current test framework(jest) not working with codeceptJS,
  // that's the reason implemeted this logic. it is mocking data for acceptance tests.
  if (process.env.ACCEPTANCE_TEST){
    const gpsData = getMockedGPLookupData();
    reply(gpsData);
    return;
  }

  getGPList(request.query.search)
    .then(gps => {
      reply(gps);
    })
    .catch(err => {
      request.log(['error'], err);
      reply([]);
    });
}


exports.register = function(server, options, next) {
  const routeConfig = {
    state: cookies.disableCookies,
  };
  if (options.exposeEndpoint) {
    server.route({
      method: 'GET',
      config: _.merge({}, routeConfig, {id: 'gp-lookup-api'}),
      path: '/gp-lookup',
      handler: gpLookupHandler
    });
  }

  next();
};

exports.register.attributes = {
  name: 'GPLookupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
