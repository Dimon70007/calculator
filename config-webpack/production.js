const webpack = require('webpack');
const Merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { join } = require('path');
const bootstrapEntryPoints = require('../webpack.bootstrap.config');
// const glob = require('glob');
const CommonConfig = require('./common');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

const extractCss = new ExtractTextPlugin({
  filename: '/css/[name].css',
  disable: false,
  allChunks: true,
});

const templateLessConf = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      importLoaders: 1,
      sourceMap: true,
      '-minimize': true,
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
    },
  },
];

const cssConfig = extractCss.extract({
  fallback: 'style-loader',
  use: templateLessConf.slice(0, -1),
});

const sassConfig = extractCss.extract({
  fallback: 'style-loader',
  use: [
    ...(templateLessConf.slice(0, -1)),
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
});

const lessConfig = extractCss.extract({
  fallback: 'style-loader',
  use: templateLessConf,
});
const path = join(__dirname, '../dist');
const bootstrapConf = bootstrapEntryPoints.prod;
const publicPath = '/calculator/dist/';

module.exports = Merge(CommonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    // library: 'Calculator',
    path,
    filename: '[name].bundle.js', // '[name].bundle.js',
    publicPath,
    sourceMapFilename: '[name].map', // '[name].map', by default [file].map
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
      'react-mathjax',
    ],
    app: [
      // 'font-awesome-loader',
      // bootstrapEntryPoints.prod,
      // 'tether',
      './src/index.js',
    ],
    bootstrap: bootstrapConf,
    mathjs: 'mathjs',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
            ['env', { modules: false }],
              'stage-0',
              'react',
            ],
            plugins: [
              'transform-runtime',
            ],
            // comments: false,
          },
        },
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
                speed: 4,
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
    extractCss,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_URL: JSON.stringify(publicPath),
      },
    }),
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'ADVANCED',
      },
      concurrency: 3,
    }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   mangle: false,
    //   sourceMap: false,
    // }),
  ],
});
