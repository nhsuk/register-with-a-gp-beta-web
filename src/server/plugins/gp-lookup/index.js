import _ from 'lodash';
import https from 'https';
import http from 'http';
import cookies from '../../config/cookies';

const env = process.env.NODE_ENV || 'development';
const GPLookupAPIURL = process.env.GP_LOOKUP_API_URL || env === 'development' && 'localhost';
const GPLookupAPIPort = process.env.GP_Lookup_API_Port || env === 'development' && 9393;
const GPLookupAPISSL = process.env.GPLookupAPISSL === '1';
const TIMEOUT = 10000;

if (env === 'development'){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}


let httpOrHttps;
if (GPLookupAPISSL) {
  httpOrHttps = https;
} else {
  httpOrHttps = http;
}


function getGPList(keywords, timeout=TIMEOUT) {
  return new Promise((resolve, reject) => {
    const request = httpOrHttps.get({
      host: GPLookupAPIURL,
      path: `/practices?search=${keywords.toLowerCase()}`,
      port: GPLookupAPIPort,
      method : 'GET'
    }, function(response) {
      let body = '';
      response.on('data', (d) => {
        body += d;
      });
      response.on('end', () => {
        resolve(body);
      });
      response.on('error', (err) => {
        reject(err);
      });
    });
    request.setTimeout(timeout, () => {
      request.abort();
      reject();
    });
  });
}


exports.getGPList = getGPList;


function gpLookuptHandler(request, reply) {
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
      handler: gpLookuptHandler
    });
  }

  next();
};

exports.register.attributes = {
  name: 'GPLookupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
