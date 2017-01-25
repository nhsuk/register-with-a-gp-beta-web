import Path from 'path';
import Nunjucks from 'nunjucks';
import fs from 'fs';

const webpackAssetsPath = '../../../client/webpack-assets.json';
const webpackAssets = require(webpackAssetsPath);

function readJson(path) {
  const text = fs.readFileSync(require.resolve(path), 'utf8');
  return JSON.parse(text);
}

exports.register = function(server, options, next) {

  const debug = server.settings.app.debug;
  const engineConfig = {
    engines: {
      nunjucks: {
        compile: function (src, options) {
          if (debug) {
            // return a special compile function that
            // loads the latest webpack bundle on
            // every request
            return function (context) {
              const data = readJson(webpackAssetsPath);
              options.environment.addGlobal('jsBundle', data.main.js);
              const template = Nunjucks.compile(src, options.environment);
              return template.render(context);
            };
          }
          const template = Nunjucks.compile(src, options.environment);
          return function (context) {
            return template.render(context);
          };
        },
        prepare: function (options, next) {
          options.compileOptions.environment = Nunjucks.configure(options.path, {
            watch: debug,
            noCache: debug
          });
          options.compileOptions.environment.addGlobal('jsBundle', webpackAssets.main.js);
          return next();
        }
      }
    },
    path: Path.join(__dirname, '../../templates'),
    isCached: !debug
  };
  server.root.views(engineConfig);
  next();
};

exports.register.attributes = {
  name: 'NunjucksConfig',
  version: '1.0.0',
  dependencies: 'vision'
};

