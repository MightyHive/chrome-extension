// *****
// Based on https://github.com/alicoding/react-webpack-babel
// *****
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popupApp: './src/popup/popup.jsx',
    backgroundScript: './src/background-page/background.js',
    reportScript: './src/full-report/report.jsx',
    optionsScript: './src/options/options.jsx',
    contentScript: './src/content-script/content-script.js',
    injectedScript: './src/injected-script/injected.js',
  },
  output: {
    publicPath: './',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?importLoaders=1'],
        exclude: ['node_modules'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=compressed',
        }),
        exclude: ['node_modules'],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
    ],
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: './assets',
        ignore: ['.DS_Store', '/**/.DS_Store'],
      },
      {
        from: './src/manifest.json',
        to: './',
        ignore: ['.DS_Store', '/**/.DS_Store'],
      },
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      files: {
        css: ['style.css'],
      },
      chunks: ['popupApp'],
      filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/full-report/full-report.html',
      files: {
        css: ['style.css'],
      },
      chunks: ['reportScript'],
      filename: 'full-report.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/options/options.html',
      files: {
        css: ['style.css'],
      },
      chunks: ['optionsScript'],
      filename: 'options.html',
    }),
  ],
};
