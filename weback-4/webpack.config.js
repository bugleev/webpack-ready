const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

const loadPresets = require("./build-utils/presets/loadPresets");
const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => webpackMerge(
  {
    mode,
    output: {
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.jpe?g$|png/,
          use: "url-loader"
        }
      ]
    },
    plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin()]
  },
  modeConfig({ mode, presets }),
  loadPresets({ mode, presets })
);
