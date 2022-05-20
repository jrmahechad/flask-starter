const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  output: {
    publicPath: 'http://0.0.0.0:9000/static/',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
    new ESLintPlugin({
      context: Path.resolve(__dirname, '../src'),
      extensions: 'js',
    }),
    new StylelintPlugin({
      context: Path.resolve(__dirname, '../src'),
      files: '**/*.scss',
    }),
  ],
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  devServer: {
    client: {
      logging: 'error',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    hot: false,
    port: 9000,
    proxy: {
      '/': {
        target: 'http://gae:8000',
        changeOrigin: true,
      },
    },
  },
});
