import AssetsPlugin from 'assets-webpack-plugin';
import Path from 'path';

export default {
  entry: Path.join(__dirname, './js/app.js'),

  devtool: 'source-map',
  plugins: [
    new AssetsPlugin({
      path: __dirname,
      prettyPrint: true
    })
  ],
  output: {
    filename: '[name].bundle.[hash].js',
    path: Path.join(__dirname, './compiled/')
  }
};
