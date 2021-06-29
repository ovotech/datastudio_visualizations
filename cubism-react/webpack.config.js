const fs = require("fs");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entry = {
  static_data: [path.resolve(__dirname, "./demos/static_data/index.js")],
  raw_graph: [path.resolve(__dirname, "./demos/raw_graph/index.js")],
  streaming: [path.resolve(__dirname, "./demos/streaming/index.js")],
};

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: true,
                exportGlobals: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./demos/dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "demos/dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...Array.from(Object.keys(entry)).map(
      (entry) =>
        new HtmlWebpackPlugin({
          filename: `${entry}.html`,
          chunks: [entry],
        })
    ),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "demos/index.html"),
      templateParameters: {
        entries: Array.from(Object.keys(entry)),
      },
      inject: false,
    }),
  ],
};
