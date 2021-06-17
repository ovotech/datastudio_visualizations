const path = require("path");
const webpack = require("webpack");

module.exports = require("./webpack.config");

module.exports.output.path = path.resolve(__dirname, "./dist_dev");
