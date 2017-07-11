import _ from 'lodash';
import https from 'https';
import cookies from '../../config/cookies';
import naturalSort from 'javascript-natural-sort';


const TIMEOUT = 1;


function getAddresses(postcode, housenumber = '', timeout=TIMEOUT) {
  return new Promise((resolve, reject) => {
    const cleaned = postcode.replace(/\s+/g, '').toLowerCase();
    const cleanedhousenumber = housenumber.replace(' ', '%20');
    const request = https.get({
      host: process.env.POSTCODE_API_HOST,
      path: `/v2/uk/${ cleaned }/${ cleanedhousenumber }/?api-key=${ process.env.POSTCODE_API_KEY }&format=true`
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
          /* eslint-disable no-console */
          console.log({'addresslookuperror': {'url': process.env.POSTCODE_API_HOST+ `/v2/uk/${ cleaned }/${ housenumber }/?api-key=${ process.env.POSTCODE_API_KEY }&format=true`, 'message': err }});
          /* eslint-enable no-console */
          reject(err);
        });
      } else {
        resolve([]);
      }
    });
    request.setTimeout(timeout, () => {
      /* eslint-disable no-console */
      request.log({'addresslookuperror': {'url': process.env.POSTCODE_API_HOST+ `/v2/uk/${ cleaned }/${ housenumber }/?api-key=${ process.env.POSTCODE_API_KEY }&format=true`, 'message': 'timeout'}});
      /* eslint-enable no-console */
      request.abort();
      reject();
    });
  });
}


exports.getAddresses = getAddresses;


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
  const routeConfig = {
    state: cookies.disableCookies,
  };
  if (options.exposeEndpoint) {
    server.route({
      method: 'POST',
      config: _.merge({}, routeConfig, {id: 'address'}),
      path: '/address',
      handler: addressLookuptHandler
    });
  }

  next();
};

exports.register.attributes = {
  name: 'AddressLookupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
