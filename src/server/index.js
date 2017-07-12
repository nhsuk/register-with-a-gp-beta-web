'use strict';
import Glue from 'glue';
import Path from 'path';
import Dotenv from 'dotenv';
import Hoek from 'hoek';
Dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3333;
const debug = env === 'development';
const templatePath = Path.join(__dirname, 'templates');

const manifest = {
  server: {
    app: {
      slogan: 'Register with a GP Beta',
      env: env,
      debug: debug,
      templatePath:templatePath,
      repo_root: Path.join(__dirname, '../../'),
    }
  },
  connections: [
    {
      port: port,
      routes: {
        security: !debug,
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
                args: [{error: '*'}]
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
        register: 'crumb',
        options: {
          key: 'csrf',
          autoGenerate: false,
          cookieOptions: {
            path: '/',
            isSecure: !debug
          }
        }
      }
    },
    {
      plugin: {
        register: './plugins/register-form',
        options: {},
      }
    },
    {
      plugin: {
        register: './plugins/getaddressio',
        options: {exposeEndpoint: false}
      }
    },
    {
      plugin: {
        register: './plugins/gp-lookup',
        options: {exposeEndpoint: true}
      }
    },
    {
      plugin: {
        register: 'blipp',
        options: {}
      }
    },
    {
      plugin: {
        register: './plugins/metrics',
        options: {}
      }
    },
    {
      plugin: {
        register: './plugins/service',
        options: {}
      }
    },
    {
      plugin: {
        register: './plugins/widget',
        options: {}
      }
    }
  ]

};

if (env === 'development') {
  const webpackConfig = require('../client/webpack.config.babel.js').default;
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
} else {
  Hoek.merge(manifest.registrations, [
    {
      plugin: {
        register: 'hapi-error',
        options: {
          templateName: 'error-page'
        }
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
