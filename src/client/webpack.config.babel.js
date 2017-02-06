import Path from 'path';
import Webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  entry: {
    main: [Path.join(__dirname, './js'), Path.join(__dirname, './styles')],
  },
  devtool: 'source-map',
  plugins: [
    new AssetsPlugin({
      path: __dirname,
      prettyPrint: true
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new Webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  output: {
    filename: '[name].bundle.[hash].js',
    path: Path.join(__dirname, './compiled/'),
    publicPath: '/static/compiled/'
  }
};
