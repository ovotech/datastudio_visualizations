const fs = require("fs");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GenerateJsonFilePlugin = require("generate-json-file-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const entry = {
  cubism: path.resolve(__dirname, "./src/cubism.js"),
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
              esModule: true,
              modules: {
                namedExport: true,
                exportGlobals: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(variables\.scss)$/,
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
              esModule: true,
              modules: {
                namedExport: true,
                exportGlobals: true,
                compileType: "icss",
              },
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /\.(variables\.scss)$/,
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
              esModule: true,
              modules: {
                namedExport: true,
                exportGlobals: true,
                compileType: "module",
              },
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new GenerateJsonFilePlugin({
      filename: "manifest.json",
      value: () => ({
        name: "Kaluza Visualizations",
        organization: "Kaluza",
        description: "Visualizations by Kaluza",
        logoUrl:
          "https://storage.googleapis.com/orion-sre-datastudio-viz-dev/kaluza.png",
        organizationUrl: "https://kaluza.com",
        supportUrl: "https://kaluza.com",
        privacyPolicyUrl: "https://www.kaluza.com/privacy-policy/",
        termsOfServiceUrl: "https://www.kaluza.com/terms-conditions/",
        packageUrl:
          "https://storage.googleapis.com/orion-sre-datastudio-viz-dev/",
        devMode: true,
        components: Array.from(Object.keys(entry)).map((entry) =>
          JSON.parse(
            fs.readFileSync(path.join(__dirname, `src/${entry}.manifest.json`))
          )
        ),
      }),
    }),
    ...Array.from(Object.keys(entry)).map(
      (entry) =>
        new GenerateJsonFilePlugin({
          filename: `${entry}-config.json`,
          value: () =>
            JSON.parse(
              fs.readFileSync(path.join(__dirname, `src/${entry}-config.json`))
            ),
        })
    ),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "assets/*.*"),
          to: "[name][ext]",
        },
      ],
    }),
  ],
};
