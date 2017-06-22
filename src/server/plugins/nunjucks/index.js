import Path from 'path';
import Nunjucks from 'nunjucks';
import _ from 'lodash';

import getFilters from './filters';
import PracticeLookup from '../../../shared/lib/practice-lookup';
import LoadFile from '../../../shared/lib/load-file';
import {getSlugById} from '../register-form/steps/common';

const webpackAssetsPath = Path.resolve(__dirname, '../../../client/compiled/webpack-assets.json');
const webpackAssets = require(webpackAssetsPath);

const COMPONENTS_PATH = '_components/';
const COMPONENT_EXT = 'njk';

Nunjucks.installJinjaCompat();

function addGlobals(environment, isDebug = false) {
  const data = isDebug ? LoadFile.readJson(webpackAssetsPath) : webpackAssets;

  const globals = {
    jsBundle: data.main.js,
    cssBundle: data.main.css,
    asset_path: filename => `/${filename}`,
  };
  Object.entries(globals).map(([name, value]) => environment.addGlobal(name, value));
}

function addFilters(env) {
  Object.entries(getFilters(env)).forEach(([name, value]) => {
    env.addFilter(name, value);
  });
}

function ComponentExtension(env) {
  this.tags = ['component'];

  this.parse = function parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);

    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args);
  };

  this.run = function run(context, data, args) {
    const name = typeof args === 'undefined' ? data.name : data;
    const ctx = typeof args === 'undefined' ? data.context : args;

    let result = '';

    try {
      result = env.render(`${COMPONENTS_PATH}${name}.${COMPONENT_EXT}`, ctx);
    } catch (e) {
      if (e.message.indexOf('template not found') > -1) {
        result = `Component '${name}' does not exist`;
      } else {
        result = e.message;
      }
      // TODO: use app logger if there is one
      // console.error(result);
    }

    return new Nunjucks.runtime.SafeString(result);
  };
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
          addFilters(options.compileOptions.environment);
          options.compileOptions.environment.addExtension('ComponentExtension', new ComponentExtension(options.compileOptions.environment));
          return next();
        }
      }
    },
    path: [
      Path.join(server.settings.app.repo_root, 'src/server/templates/'),
      Path.join(server.settings.app.repo_root, 'node_modules/nhsuk-frontend/src/templates'),
    ],
    isCached: !debug,
    context: function (request) {
      const context = {
        REQUEST_AKA: function(id) {
          return '/' + request.params.practice + '/register/' + getSlugById(id);
        },
        ENV_VALUE: function(name) {
          if(process.env[name] === 'undefined'){
            return '';
          } else {
            return process.env[name];
          }
        }
      };

      if (_.has(request, 'state')) {
        if (!request.state) {
          return {};
        }

        const practice = PracticeLookup.getPractice(request.params.practice);

        if (typeof practice !== 'undefined') {
          context['serviceTitle'] = `Register with ${practice.name}`;
          context['CURRENT_PRACTICE'] = practice;
        }
      }

      return context;
    },
  };
  const nunjucksEnv = server.root.views(engineConfig);
  server.expose('nunjucksEnv', nunjucksEnv);
  next();
};

exports.register.attributes = {
  name: 'NunjucksConfig',
  version: '1.0.0',
  dependencies: 'vision'
};
