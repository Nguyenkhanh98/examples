const { alias, configPaths } = require('react-app-rewire-alias');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');

const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
  disableEsLint,
  useBabelRc,
  overrideDevServer,
} = require('customize-cra');

module.exports = {
  webpack: override(
    useBabelRc(),
    process.env.NODE_ENV === 'production'
        && addWebpackPlugin(
          new TerserPlugin({
            // sourceMap: false,
            terserOptions: {
              output: {
                comments: false,
              },
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          }),
        ),
    process.env.NODE_ENV === 'production'
        && addWebpackPlugin(
          new CleanWebpackPlugin(),
        ),
    addWebpackPlugin(
      new Dotenv(),
    ),
    alias(configPaths('./base.tsconfig.json')),

  ),
  paths(paths, env) {
    // eslint-disable-next-line no-param-reassign
    paths.appBuild = path.resolve( path.join(__dirname, '../server/src', 'statics'));
    return paths;
  },
  devServer: overrideDevServer((config) => ({
    ...config,
    host: '0.0.0.0',
  })),
};
