'use strict';
import Glue from 'glue';
import Path from 'path';
import Dotenv from 'dotenv';
import webpackConfig from '../client/webpack.config.babel.js';
Dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3333;
const manifest = {
  server: {
    app: {
      slogan: 'Register with a GP Beta',
      env: env,
      debug: env === 'development',
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
                args: [{log: '*', response: '*'}]
              }, {
                module: 'good-console'
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
        register: './hello-world',
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
  manifest.registrations.push(
    {
      plugin: {
        register: './plugins/webpack-config',
        options: webpackConfig
      }
    }
  );
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
