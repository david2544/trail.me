/**
 * COMMON WEBPACK CONFIGURATION
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',

    // Merge with env dependent settings
    ...options.output,
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        include: [/app/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.ts(x?)$/, // Transform typescript files with ts-loader
        exclude: /node_modules/,
        use: options.tsLoaders,
      },
      {
        // Preprocess our own .css files
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // enable HMR only in dev
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              // enable css modules and hash the files
              modules: { localIdentName: '[local]___[hash:base64:5]' },
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new MiniCssExtractPlugin({
      // hash files only in production. Helps with HMR for css
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    // Run typescript checker
    new ForkTsCheckerWebpackPlugin(),
  ]),
  resolve: {
    extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'],
    alias: {
      '@app': path.resolve(process.cwd(), './app'),
      '@pages': path.resolve(process.cwd(), './app/pages'),
      '@utils': path.resolve(process.cwd(), './app/utils'),
      '@Layout': path.resolve(process.cwd(), './app/Layout'),
      '@store': path.resolve(process.cwd(), './app/store'),
      '@common': path.resolve(process.cwd(), './app/common'),
      '@images': path.resolve(process.cwd(), './assets/images'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
