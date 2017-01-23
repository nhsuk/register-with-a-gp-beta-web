'use strict';
import Glue from 'glue';
import chokidar from 'chokidar';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const manifest = {
  server: {
    app: {
      slogan: 'Register with a GP Beta'
    }
  },
  connections: [
    { port: port, host: 'localhost' }
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
        register: './plugins/nunjucks',
        options: {}
      }
    },
    {
      plugin: {
        register: './index',
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
          if (env === 'development') {
            hotReload(instance);
          }
          resolve(instance);
        });
      },
      (err) => {
        reject(err);
      }
    );
  });
}

function hotReload(instance) {
  const watcher = chokidar.watch('.');
  watcher.on('ready', () => {
    watcher.on('all', () => {
      instance.log('info', 'Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
      });
    });
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

