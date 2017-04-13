const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

const isDevelopment = process.env.NODE_ENV === 'development';

const baseEntry = ['babel-polyfill'];
const developmentEntry = ['./src/server/index.development.js'];
const productionEntry = ['./src/server/index.production.js'];
const entry = [...baseEntry, ...(isDevelopment ? developmentEntry : productionEntry)];

const basePlugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.IgnorePlugin(/node_modules/),
];
const developmentPlugins = [];
const productionPlugins = [
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
];
const plugins = [...basePlugins, ...(isDevelopment ? developmentPlugins : productionPlugins)];

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
  devtool: false,
  target: 'node',
  externals: [webpackNodeExternals()],
  node: {
    __dirname: false,
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins,
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'eslint-loader', enforce: 'pre' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, options: { babelrc: false, presets: [['env', { modules: false }], 'stage-0', 'react'] } },
    ],
  },
};
