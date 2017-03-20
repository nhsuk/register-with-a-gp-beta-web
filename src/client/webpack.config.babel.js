import Path from 'path';
import Webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SassImportOnce from 'node-sass-import-once';

export default {
  entry: {
    main: [
      Path.join(__dirname, './js/vendor/polyfills/details.polyfill.js'),
      Path.join(__dirname, './js'),
      Path.join(__dirname, './styles')
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new AssetsPlugin({
      path: Path.join(__dirname, './compiled'),
      prettyPrint: true
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new Webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: ['style-loader', 'css-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            }, {
              loader: 'resolve-url-loader',
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                importer: SassImportOnce,
                importOnce: {
                  index: true,
                  css: true
                },
                includePaths: [
                  Path.resolve(__dirname, '../../node_modules'),
                ]
              },
            }],
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)$/i,
        loader: 'file-loader'
      }
    ],
  },
  output: {
    filename: '[name].bundle.[hash].js',
    path: Path.join(__dirname, './compiled/'),
    publicPath: '/assets/'
  }
};
