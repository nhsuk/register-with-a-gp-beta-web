import Webpack from 'webpack';
import Path from 'path';
import Process from 'process';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

exports.register = function(server, options, next) {
  if (server.settings.app.debug) {
    const webpackConfigPath = Path.resolve(Path.join(Process.cwd(), options));
    const config = require(webpackConfigPath).default;
    config.entry.push('webpack-hot-middleware/client?/__webpack_hmr');
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    const compiler = Webpack(config);

    const devMiddleware = WebpackDevMiddleware(compiler, {
      publicPath: '/static/compiled/'
    });
    server.ext('onRequest', (request, reply) => {
      devMiddleware(request.raw.req, request.raw.res, (err) => {
        if (err) {
          return reply(err);
        }
        reply.continue();
      });
    });

    const hotMiddleware = WebpackHotMiddleware(compiler, {
      log: () => {
      },
      reload: true,
      publicPath: '/__webpack_hmr'
    });
    server.ext('onRequest', (request, reply) => {
      hotMiddleware(request.raw.req, request.raw.res, (err) => {
        if (err) {
          return reply(err);
        }
        reply.continue();
      });
    });

    server.expose('compiler', compiler);
  }
  next();
};

exports.register.attributes = {
  name: 'WebpackConfig',
  version: '1.0.0',
  dependencies: 'inert'
};
