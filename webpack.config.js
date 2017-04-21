const config = {
  entry: './main.js',
  output: {
    filename: 'es6Bundle.js'
  },
  module: {
    loaders: [
      {
        test : /\.js/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js',], 
  },
};

module.exports = config;
