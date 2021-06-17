const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js?[hsah:8]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options:{
            presets:['@babel/preset-env']
          }
        }
      },
      {
        test: /.\s[ac]ss$/i,
        use: [
          {
            // inject CSS to page
            loader: 'style-loader'
          }
          , {
            // translates CSS into CommonJS modules
            loader: 'css-loader'
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]

      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'f2e-toDoList',
      template: './src/index.html',
      filename: 'main.html',
      chunks: ['vendor', 'app']
    }),
    new Dotenv() 
  ],
  devtool: 'source-map',
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 5600,
    stats: {
      colors: true,
      hash: true,
    }
  }
}