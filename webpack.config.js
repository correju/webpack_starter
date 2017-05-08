const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const APP_DIR = path.resolve(__dirname, 'src')
const APP_DIST = path.resolve(__dirname, 'dist')
const TEST_DIR = path.resolve(__dirname, 'test')

var NODE_ENV  = (process.env.NODE_ENV  || 'development')
var isProd = (NODE_ENV === 'production')

let plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new ExtractTextPlugin({
    filename: 'css/index.css'
  })
]

if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  }))
}

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    filename: 'bundle.js',
    path: APP_DIST
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [APP_DIR, TEST_DIR],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [APP_DIR, TEST_DIR],
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin(
          'style-loader!css-loader!sass-loader?sourceMap'
        )
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
  devtool: isProd ? false : 'inline-source-map',
  plugins
}
