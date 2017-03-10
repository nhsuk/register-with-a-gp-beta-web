'use strict';
import Glue from 'glue';
import Path from 'path';
import Dotenv from 'dotenv';
import webpackConfig from '../client/webpack.config.babel.js';
import Hoek from 'hoek';
Dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3333;
const debug = env === 'development';

const manifest = {
  server: {
    app: {
      slogan: 'Register with a GP Beta',
      env: env,
      debug: debug,
      repo_root: Path.join(__dirname, '../../'),
    }
  },
  connections: [
    {
      port: port,
      routes: {
        files: {
          relativeTo: Path.join(__dirname, '../client')
        }
      }
    }
  ],
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{log: '*', response: '*', error: '*', request: '*'}]
              }, {
                module: 'good-console',
              },
              'stdout']
          }
        }
      }
    },
    {
      plugin: {
        register: 'vision',
        options: {}
      }
    },
    {
      plugin: {
        register: 'inert',
        options: {}
      }
    },
    {
      plugin: {
        register: 'akaya',
        options: {}
      }
    },
    {
      plugin: {
        register: './plugins/nunjucks',
        options: {}
      }
    },
    {
      plugin: {
        register: './plugins/static-files',
        options: {}
      }
    },
    {
      plugin: {
        register: './plugins/start-and-end',
        options: {}
      }
    },
    {
      plugin: {
        register: './plugins/register-form',
        options: {},
        routes: {
          prefix: '/register'
        }
      }
    },
    {
      plugin: {
        register: './plugins/getaddressio',
        options: {}
      }
    },
    {
      plugin: {
        register: 'blipp',
        options: {}
      }
    }
  ]

};

if (env === 'development') {
  Hoek.merge(manifest.registrations, [
    {
      plugin: {
        register: './plugins/webpack-config',
        options: webpackConfig
      }
    },
    {
      plugin: {
        register: './plugins/dev-error-page',
        options: {},
      }
    }
  ]);
}

const options = {
  relativeTo: __dirname
};

const server = Glue.compose(manifest, options);

function start() {
  return new Promise((resolve, reject) => {
    server.then(
      (instance) => {
        instance.start((err) => {
          if (err) {
            throw err;
          }
          instance.log('info', 'Server running at: ' + instance.info.uri);
          resolve(instance);
        });
      },
      (err) => {
        reject(err);
      }
    );
  });
}

if (!module.parent) {
  start();
} else {
  exports.start = start;
}

exports.stop = (server) => {
  return new Promise((resolve, reject) => {
    server.stop((err) =>{
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
