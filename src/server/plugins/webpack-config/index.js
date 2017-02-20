import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import SassImportOnce from 'node-sass-import-once';

exports.register = function(server, config, next) {
  if (server.settings.app.debug) {
    config.entry.main.push('webpack-hot-middleware/client?/__webpack_hmr');
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());
    config.plugins.push(new Webpack.LoaderOptionsPlugin({
      debug: true
    }));

    config.module.loaders = [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'resolve-url-loader'
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              importer: SassImportOnce,
              importOnce: {
                index: true,
                css: true
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)$/i,
        loader: 'file-loader',
        query: {
          publicPath: `${server.info.uri}/assets/`
        }
      }
    ];

    const compiler = Webpack(config);

    const devMiddleware = WebpackDevMiddleware(compiler, {
      publicPath: '/assets/'
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
