import _ from 'lodash';
import https from 'https';
import cookies from '../../config/cookies';
import naturalSort from 'javascript-natural-sort';
import steps from '../register-form/steps/index';

const TIMEOUT = 10000;

export function getNextSlugByKey(steps,key){
  let stepKey = 0;
  for (let i = 0; i < steps.length; i++){
    const step = steps[i];
    if(step.key === key){
      stepKey = i;
      return steps[stepKey +1].slug;
    }
  }
}

function getAddresses(postcode, housenumber = '', timeout=TIMEOUT) {
  housenumber = encodeURIComponent(housenumber);
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

  getAddresses(postcode, housenumber)
    .then(addresses => {
      if(addresses.length === 0){
        addresses = getAddresses(postcode, '');
      }
      reply(addresses);
    })
    .catch(err => {
      request.log(['error'], err);
      reply([]);
    });
}

function addressPostHandler(request, reply) {

  const address1 = request.payload.address1;
  const address2 = request.payload.address2;
  const address3 = request.payload.address3;
  const town = request.payload.town;
  const county = request.payload.county;
  const postcode = request.payload.postcode;
  const housenumber = request.payload.housenumber;
  const address =  {
    address1: address1,
    address2: address2,
    address3: address3,
    locality: joinStrStripEmpty([town, county]),
    postcode: postcode
  };
  let data = request.state.data;
  data.address = address;
  data.addressLookup = { postcode: postcode, housenumber: housenumber };
  const practice = request.params.practice;
  const To = '/' + practice + '/register/' + getNextSlugByKey(steps,'addressLookup');
  return reply
    .redirect(To)
    .state('data', data);
}
function joinStrStripEmpty(vals) {
  return _.join(_.compact(_.map(vals, x => _.trim(x))), ', ');
}
exports.register = function(server, options, next) {
  const { assign } = Object;
  const routeConfig = assign(
    {},
    { state: cookies.enableCookies },
    {plugins: {crumb: true }}
  );
  server.route({
    method: 'POST',
    config: _.merge({}, routeConfig, {id: 'addressAPI'}),
    path: '/{practice}/address',
    handler: addressLookupHandler
  });
  server.route({
    method: 'POST',
    config: _.merge({}, routeConfig, {id: 'addressSaveAPI'}),
    path: '/{practice}/addresspost',
    handler: addressPostHandler
  });
  next();
};

exports.register.attributes = {
  name: 'AddressLookupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
