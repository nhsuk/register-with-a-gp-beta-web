import _ from 'lodash';
import https from 'https';
import cookies from '../../config/cookies';
import naturalSort from 'javascript-natural-sort';


const TIMEOUT = 10000;


function getAddresses(postcode, housenumber = '', timeout=TIMEOUT) {
  return new Promise((resolve, reject) => {
    const request = https.get({
      host: process.env.POSTCODE_API_HOST,
      path: `/v2/uk/${ postcode }/${ housenumber }/?api-key=${ process.env.POSTCODE_API_KEY }&format=true`
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
          resolve(body);
        });
        response.on('error', (err) => {
          request.log({'addresslookuperror': {'url': process.env.POSTCODE_API_HOST+ `/v2/uk/${ postcode }/${ housenumber }/?api-key=${ process.env.POSTCODE_API_KEY }&format=true`, 'message': err }});
          reject(err);
        });
      } else {
        resolve([]);
      }
    });
    request.setTimeout(timeout, () => {
      request.log({'addresslookuperror': {'url': process.env.POSTCODE_API_HOST+ `/v2/uk/${ postcode }/${ housenumber }/?api-key=${ process.env.POSTCODE_API_KEY }&format=true`, 'message': 'timeout'}});
      request.abort();
      reject();
    });
  });
}


exports.getAddresses = getAddresses;


function addressLookupHandler(request, reply) {
  const postcode = request.payload.postcode;
  const housenumber = request.payload.housenumber; 
  const cleaned = postcode.replace(/\s+/g, '').toLowerCase();
  const cleanedhousenumber = housenumber.replace(' ', '%20');

  getAddresses(cleaned, cleanedhousenumber)
    .then(addresses => {
      reply(addresses);
    })
    .catch(err => {
      request.log(['error'], err);
      reply([]);
    });
}


exports.register = function(server, options, next) {
  const routeConfig = assign(
    {},
    { state: cookies.enableCookies },
    { plugins: { crumb: true } }
  );  
  server.route({
    method: 'POST',
    config: _.merge({}, routeConfig, {id: 'addressAPI'}),
    path: '/address',
    plugins: {
      // route specific options
      crumb: {}
    },
    handler: addressLookupHandler
  });
  next();
};

exports.register.attributes = {
  name: 'AddressLookupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
