import Path from 'path';
const os = require('os');
const _ = require('lodash');


const disallowAll = {
  '*': ['/']
};

// object representing a robots.txt that allows everything:
const allowAll = {
  '*': []
};

export const robotTextOptions = {
  verbose: true,
  envs: {
    production: allowAll,
    '*': disallowAll
  },
  env: process.env.NODE_ENV ? process.env.NODE_ENV : '*'
};


// get the appropriate robot environment for an incoming HTTP request:
const getEnv = (request, options) => {
	// if they defined a set of 'hosts', try to find a match for the host that sent this request:
  if (options.hosts !== undefined) {
    if (options.hosts[request.info.host] !== undefined) {
      return options.hosts[request.info.host];
    }
  }
	// if no envs list was defined or this env doesn't exist, use the '*' wildcard env:
  if (options.envs === undefined || options.envs[options.env] === undefined) {
    return options.envs['*'];
  }
	// return the env we found:
  return options.envs[options.env];
};


export function robotTextHandler(request, reply, options) {
  // render the robot.txt:
  let first = true;
  let robotText = _.reduce(getEnv(request, options), (memo, disallowList, userAgent) => {
    memo += `${first ? '' : os.EOL}User-agent: ${userAgent}`;
    first = false;
    if (typeof disallowList === 'string') {
      memo += `${os.EOL}Disallow: ${disallowList}`;
      return memo;
    }
    if (disallowList.length === 0) {
      memo += `${os.EOL}Disallow:`;
      return memo;
    }
    _.each(disallowList, (disallowPath) => {
      memo += `${os.EOL}Disallow: ${disallowPath}`;
    });
    return memo;
  }, '');
  robotText += os.EOL;
  return reply(robotText).type('text/plain');
}


exports.register = function(server, options, next) {
  const robotTextpluginOptions = _.defaultsDeep(options, robotTextOptions);

  server.route({
    path: '/robots.txt',
    method: 'GET',
    config: {
      auth: false,
      id: 'robot.txt',
    },
    handler: (request, reply) =>{
      robotTextHandler(request, reply, robotTextpluginOptions);
    }
  });
  next();


  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: [
          './compiled/',
          Path.join(server.settings.app.repo_root, 'node_modules/nhsuk-frontend/dist/assets/')
        ],
        listing: server.settings.app.debug
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: [
          Path.join(server.settings.app.repo_root, 'src/server/static/')
        ],
        listing: server.settings.app.debug
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'StaticFilesConfig',
  version: '1.0.0',
  dependencies: 'inert'
};
