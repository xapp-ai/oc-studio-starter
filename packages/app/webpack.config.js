/*! Copyright (c) 2022, XAPP AI */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  context: __dirname,
  mode: "production",
  entry: "./src/index.ts",
  externals: [
    nodeExternals(),
    "aws-sdk",
    "coffee-script",
    "vm2",
    "isolated-vm",
  ],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    // This is for node-fetch compatibility
    mainFields: ["main", "module"],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, "lib"),
    filename: "index.js",
  },
  target: "node",
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ],
};
