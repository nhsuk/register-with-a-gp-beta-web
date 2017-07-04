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

const robotOptions = {
  verbose: true,
  envs: {
    production: allowAll,
    '*': disallowAll
  },
  env: process.env.NODE_ENV ? process.env.NODE_ENV : '*'
};


exports.register = function(server, options, next) {
  const pluginOptions = _.defaultsDeep(options, robotOptions);
  // get the appropriate robot environment for an incoming HTTP request:
  const getEnv = (request) => {
    // if they defined a set of 'hosts', try to find a match for the host that sent this request:
    if (pluginOptions.hosts !== undefined) {
      if (pluginOptions.hosts[request.info.host] !== undefined) {
        return pluginOptions.hosts[request.info.host];
      }
    }
    // if no envs list was defined or this env doesn't exist, use the '*' wildcard env:
    if (pluginOptions.envs === undefined || pluginOptions.envs[pluginOptions.env] === undefined) {
      return pluginOptions.envs['*'];
    }
    // return the env we found:
    return pluginOptions.envs[pluginOptions.env];
  };

  server.route({
    path: '/robots.txt',
    method: 'GET',
    config: {
      auth: false
    },
    handler: (request, reply) => {
      // render the robot.txt:
      let first = true;
      let robotText = _.reduce(getEnv(request), (memo, disallowList, userAgent) => {
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
      reply(robotText).type('text/plain');
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
