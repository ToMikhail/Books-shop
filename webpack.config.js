const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  name: "browser",
  mode: "development",

  devServer: {
    port: 9000,
    // hot: true,
    static: {
      directory: path.join(__dirname, "./dist"),
    },
  },
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "books-shop",
      template: path.resolve(__dirname, "./src/template.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    // применять изменения только при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),

    new CopyPlugin({
      patterns: [
        { from: __dirname +  '/src/assets/images', to: "src/assets/images" },
      ],
    }),
  ],

  module: {
    rules: [
      //JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      //images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        // loader: 'file-loader',
        // options:{
        // name: '/images/[sha512:hash:base64:7].[ext]',
        //   outputPath :  '/images/',
        // }
      },

      // fonts и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },

      // CSS, PostCSS, Sass
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },

      // JSON
      // {
      //   test: /\.json$/i,
      //   type: "asset/resource",
      // },
    ],
  },
};
