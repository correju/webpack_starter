const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const APP_DIR = path.resolve(__dirname, 'src')
const TEST_DIR = path.resolve(__dirname, 'test')

console.log(APP_DIR)
module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: APP_DIR + 'dist/'
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        loader:'eslint-loader',
        enforce: "pre",
        include: [APP_DIR, TEST_DIR],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test:/\.(scss|sass)$/,
        loader: ExtractTextPlugin(
          'style-loader!css-loader!sass-loader?sourceMap'
        )
      },
      {
        test:/\.css$/,
        loader: ExtractTextPlugin(
          'style-loader!css-loader?sourceMap'
        )
      },
      {
        test: /\.(mp4|png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },
  devServer: {
    inline: true,
    port: 8080,
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}