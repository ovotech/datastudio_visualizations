const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("./webpack.config");

module.exports.output.path = path.resolve(__dirname, "./dev");

module.exports.devServer = {
  contentBase: path.resolve(__dirname, "./dev"),
};

module.exports.plugins = [
  ...module.exports.plugins,
  new webpack.NormalModuleReplacementPlugin(/@google\/dscc/, (resource) => {
    resource.request = "./dev-google-dscc";
  }),
  ...Array.from(Object.keys(module.exports.entry)).map(
    (entry) =>
      new HtmlWebpackPlugin({
        filename: `${entry}.html`,
        template: "src/dev.html.ejs",
        templateParameters: {
          entry,
        },
        inject: false,
      })
  ),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "src/dev.index.html.ejs",
    templateParameters: {
      entries: Array.from(Object.keys(module.exports.entry)),
    },
    inject: false,
  }),
];
