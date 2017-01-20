'use strict';

const Glue = require('glue');

const manifest = {
  server: {
    app: {
      slogan: 'Register with a GP Beta'
    }
  },
  connections: [
    { port: 3000, host: 'localhost' }
  ],
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            myConsoleReporter: [
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
        register: './routes',
        options: {}
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

server
  .then((instance) => {
    instance.start((err) => {

      if (err) {
        throw err;
      }
      instance.log('info', 'Server running at: ' + instance.info.uri);
    });
  },
  (err) =>{
    throw err;
  });
