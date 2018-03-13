const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || 'development'
const DEBUG = process.env.DEBUG || false


// Base

const webpackConfig = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'tableschema-ui.js',
    library: 'tableschemaUI',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({NODE_ENV, DEBUG}),
  ],
}


// Development

if (NODE_ENV === 'development') {
  webpackConfig.mode = 'development'
  webpackConfig.devServer = {hot: true}
  webpackConfig.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([webpackConfig.output.path]),
  )
}


// Production

if (NODE_ENV === 'production') {
  webpackConfig.mode = 'production'
  webpackConfig.output.filename = 'tableschema-ui.min.js'
}


// System

module.exports = webpackConfig
