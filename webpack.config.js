var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
];

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      test: /bundle\.js?$/
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ]);
};

var config  = {
  entry: {
    bundle: path.join(__dirname, 'client', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: "/static/",
    filename: '[name].js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.(png|gif)$/,
        loader: 'url-loader?name=[name]@[hash].[ext]&limit=5000'
      }, {
        test: /\.(pdf|ico|jpg|eot|otf|woff|ttf|mp4|webm)$/,
        loader: 'file-loader?name=[name]@[hash].[ext]'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      '#app': path.join(__dirname, 'client'),
      '#c': path.join(__dirname, 'client', 'components'),
    }
  }
};

module.exports = config;
