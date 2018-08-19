const path = require('path');

module.exports = {
  entry: {
    main: './app/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}