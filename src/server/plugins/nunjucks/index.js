import Path from 'path';
import Nunjucks from 'nunjucks';
import fs from 'fs';
import formatDate from './functions';

const webpackAssetsPath = '../../../client/webpack-assets.json';
const webpackAssets = require(webpackAssetsPath);

function readJson(path) {
  const text = fs.readFileSync(require.resolve(path), 'utf8');
  return JSON.parse(text);
}

function addGlobals(environment, isDebug = false) {
  const data = isDebug ? readJson(webpackAssetsPath) : webpackAssets;

  const globals = {
    jsBundle: data.main.js,
    cssBundle: data.main.css,
    asset_path: filename => `/${filename}`,
    formatDate: formatDate
  };
  Object.entries(globals).map(([name, value]) => environment.addGlobal(name, value));
}

exports.register = function(server, options, next) {

  const debug = server.settings.app.debug;
  const engineConfig = {
    engines: {
      njk: {
        compile: function (src, options) {
          if (debug) {
            // return a special compile function that
            // loads the latest webpack bundle on
            // every request
            return function (context) {
              addGlobals(options.environment, debug);
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
          addGlobals(options.compileOptions.environment);
          return next();
        }
      }
    },
    path: [
      Path.join(server.settings.app.repo_root, 'src/server/templates/'),
      Path.join(server.settings.app.repo_root, 'node_modules/nhsuk-frontend/src/templates'),
    ],
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

