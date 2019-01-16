/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.css$|\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      inject: true
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../static/*'), to: path.resolve(__dirname, '../dist/'), ignore: ['.*'] }
    ]),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, "../"),
      dry: false,
      verbose: true
    }),
  ]
}