import _ from 'lodash';
import cookies from '../../config/cookies';
import elasticsearch from './elasticsearch';

const env = process.env.NODE_ENV || 'development';

if (env === 'development'){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}


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
        const hits = response.hits.hits;
        resolve(hits);
      }
    );
  });
}


exports.getGPList = getGPList;


function gpLookupHandler(request, reply) {
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
