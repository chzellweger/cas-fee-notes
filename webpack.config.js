const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index/index.js',
    add: './src/add/add.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),

    new ExtractTextPlugin({filename: '[name].css'}),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'add.html',
      template: './src/add/add.html',
      chunks: ['add']
    })
  ]
}
