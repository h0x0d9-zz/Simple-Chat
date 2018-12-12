const NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  mode: NODE_ENV,
  entry: [
    'babel-polyfill',
    `${__dirname}/src/index.js`,
  ],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/assets`,
    publicPath: '/assets/',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
};
