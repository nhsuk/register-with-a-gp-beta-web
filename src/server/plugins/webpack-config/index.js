import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

exports.register = function(server, config, next) {
  if (server.settings.app.debug) {
    config.entry.main.push('webpack-hot-middleware/client?/__webpack_hmr');
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    config.module.loaders = [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ];

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
      publicPath: '/__webpack_hmr',
      hot: true
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
