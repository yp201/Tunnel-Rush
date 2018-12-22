const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var TEMPLATE_PATH = path.resolve(ROOT_PATH, './src/index.html');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  // devtool: 'inline-source-map',
  devtool: 'source-map',

  // devServer: {
  //   contentBase: './output'
  // },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
            title: 'Tunnel Rush',
            template: TEMPLATE_PATH,  
            inject: 'body'
        })
  ],
  // output: {
  //   path: path.resolve(__dirname),
  //   filename: 'bundle.js'
  //   // path: './bundle/'

  // },
  output: {
      path: path.resolve('./bundle/'),
      filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
