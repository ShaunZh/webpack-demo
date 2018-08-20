const path = require('path');

module.exports = {
  entry: {
    main: './app/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build/'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20000,
              name: 'images/[name].[hash].[ext]'
            }

          }
        ]
      }
    ]
  }
}