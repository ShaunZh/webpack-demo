const webpack = require('webpack');
const path = require('path');

// 用于在build之前清除需要重新生成的文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 将打包后的js、css、img文件插入到html模板文件中，生成最终的html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  module: {
    rules:[
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    }) 
  ]
};
