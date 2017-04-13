const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3001;
const isDevelopment = process.env.NODE_ENV === 'development';

const baseEntry = [
  'babel-polyfill',
  './src/client/assets/San Francisco/San Francisco.css',
  'normalize.css',
  './src/client/assets/reset.css',
  './src/client/index.jsx',
];
const developmentEntry = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server',
];
const productionEntry = [];
const entry = [...(isDevelopment ? developmentEntry : productionEntry), ...baseEntry];

const basePlugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new HtmlWebpackPlugin({
    template: 'src/client/index.html',
    inject: 'body',
    favicon: 'src/client/assets/favicon.ico',
    minify: { collapseWhitespace: true },
  }),
];
const developmentPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];
const productionPlugins = [
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
];
const plugins = [...basePlugins, ...(isDevelopment ? developmentPlugins : productionPlugins)];

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  devtool: isDevelopment ? 'eval-source-map' : false,
  resolve: { extensions: ['.js', '.jsx'] },
  plugins,
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'eslint-loader', enforce: 'pre' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, options: { babelrc: false, presets: [['env', { modules: false }], 'stage-0', 'react'], plugins: ['react-hot-loader/babel'] } },
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      { test: /\.(jpe?g|png)$/, loader: 'file-loader', options: { name: 'assets/[name].[ext]' }, include: /assets/ },
      { test: /\.otf$/, loader: 'url-loader', options: { limit: 10000 } },
    ],
  },
  devServer: {
    port,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
};
