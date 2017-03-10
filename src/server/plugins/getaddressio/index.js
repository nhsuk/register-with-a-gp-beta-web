import _ from 'lodash';
import https from 'https';
import cache from '../../config/cache';
import cookies from '../../config/cookies';
import naturalSort from 'javascript-natural-sort';


function getAddresses(postcode) {
  return new Promise((resolve, reject) => {
    const cleaned = postcode.replace(/\s+/g, '').toLowerCase();
    https.get({
      host: process.env.POSTCODE_API_HOST,
      path: `/v2/uk/${ cleaned }/?api-key=${ process.env.POSTCODE_API_KEY }&format=true`
    }, function(response) {
      if (response.statusCode === 200 && response.statusMessage === 'OK') {
        let body = '';
        response.on('data', (d) => {
          body += d;
        });
        response.on('end', () => {
          const addresses = JSON.parse(body).Addresses;
          addresses.sort(naturalSort);
          resolve(addresses);
        });
      } else {
        reject();
      }
    });
  });
}


function addressLookuptHandler(request, reply) {
  getAddresses(request.payload.postcode)
    .then(addresses => {
      reply(addresses);
    })
    .catch(err => {
      request.log(['error'], err);
      reply([]);
    });
}


exports.register = function(server, options, next) {
  const statelessConfig = {
    state: cookies.disableCookies,
    cache: cache.cacheable
  };

  server.route({
    method: 'POST',
    config: _.merge({}, statelessConfig, {id: 'address'}),
    path: '/address',
    handler: addressLookuptHandler
  });

  next();
};

exports.register.attributes = {
  name: 'AddressLookupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
