/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require("./webpack.config.common");


module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-[contenthash:8].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style-[contenthash:8].css'
    })
  ]
})
