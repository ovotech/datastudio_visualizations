const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("./webpack.config");

module.exports.output.path = path.resolve(__dirname, "./local_dev/dist");

module.exports.plugins = [
  ...module.exports.plugins,
  new webpack.NormalModuleReplacementPlugin(/@google\/dscc/, (resource) => {
    resource.request = "../local_dev/dev-google-dscc";
  }),
  ...Array.from(Object.keys(module.exports.entry)).map(
    (entry) =>
      new HtmlWebpackPlugin({
        filename: `${entry}.html`,
        template: "local_dev/dev.html.ejs",
        templateParameters: {
          entry,
        },
        inject: false,
      })
  ),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "local_dev/dev.index.html.ejs",
    templateParameters: {
      entries: Array.from(Object.keys(module.exports.entry)),
    },
    inject: false,
  }),
];
