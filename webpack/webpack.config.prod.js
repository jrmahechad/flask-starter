const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');


module.exports = merge(common, {
  bail: true,
  mode: 'production',
  stats: 'errors-only',
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].min.temp.css',
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
        test: /\.s?css/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
});
