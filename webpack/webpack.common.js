const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Path = require('path');

module.exports = {
  entry: {
    main: Path.resolve(__dirname, '../src/js/main.js'),
  },
  output: {
    path: Path.join(__dirname, '../appengine/static/'),
    filename: '[name].min.temp.js',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*.css', '*.js', '*.map'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/,
        type: 'asset',
      },
    ],
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {},
};
