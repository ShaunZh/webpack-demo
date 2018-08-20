const webpack = require('webpack');
const path = require('path');

// 用于在build之前清除需要重新生成的文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 将打包后的js、css、img文件插入到html模板文件中，生成最终的html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const VENOR = ["faker",
  "lodash",
  "react",
  "react-dom",
  "react-input-range",
  "react-redux",
  "redux",
  "redux-form",
  "redux-thunk",
  "react-router"
]

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENOR
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    port: 8081
  },
  module: {
    rules:[
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new CleanWebpackPlugin(['dist/bundle.*.js', 'dist/manifest.*.js'],  {
      verbose: true,
      dry:false
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin('css/[name].[contenthash].css'),
    // 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJsPlugin()
  ]
};
