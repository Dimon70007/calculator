const webpack = require('webpack');
const Merge = require('webpack-merge');
const { join } = require('path');
const bootstrapEntryPoints = require('../webpack.bootstrap.config');
// const glob = require('glob');
const CommonConfig = require('./common');

const lessDev = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      importLoaders: 1,
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
      sourceComments: true,
    },
  },
];

const sassConfig = [
  ...lessDev.slice(0, -1),
  {
    loader: 'sass-loader', // compiles Sass to CSS
    options: {
      sourceMap: true,
    },
  },
];

const cssConfig = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
    },
  },
];

const lessConfig = lessDev;

const path = join(__dirname, '../dist');
const bootstrapConf = bootstrapEntryPoints.dev;
const publicPath = '/dist/';

module.exports = Merge(CommonConfig, {
  devtool: 'inline-source-map',
  output: {
    // library: 'Calculator',
    path,
    pathinfo: true,
    filename: '[name].bundle.js',
    publicPath,
    sourceMapFilename: '[name].map',
  },
  entry: {
    commons: [
      'babel-polyfill',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-devtools-extension',
      'redux-thunk',
    ],
    app: [
      'webpack-hot-middleware/client',
      // bundle the client for hot reloading
      'react-hot-loader/patch',
      // activate HMR for React
      './src/index.js',
    ],
    bootstrap: bootstrapConf,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
              ['env', { modules: false }],
                'stage-0',
                'react',
              ],
              plugins: [
                'transform-runtime',
                // 'react-hot-loader/babel',
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: [
          'file-loader?name=[name].[ext]&limit=10000&outputPath=imgs/',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              pngquant: {
                optimizationLevel: 7,
                interlaced: false,
                quality: '65-90',
                speed: 9,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: cssConfig,
      },
      {
        test: /\.less$/,
        use: lessConfig,
      },
      {
        test: /\.scss$/,
        use: sassConfig,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PUBLIC_URL: JSON.stringify(publicPath),
      },
    }),
  ],
});
