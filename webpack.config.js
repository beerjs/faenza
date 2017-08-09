const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: './assets/src/js/drunkboy.js',
  output: {
    filename: 'assets/dist/bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.scss$/, 
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
              ]
            }
          },
          'sass-loader'
        ] 
      },
    ]
  },
  plugins: [

    // Uglify all the script files
    new UglifyJSPlugin(),

    // Start browser sync server with proxy
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 8088,
        proxy: 'http://localhost:8080/'
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )

  ]
};
