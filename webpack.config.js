const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  // Here the application starts executing and webpack starts bundling
  entry: "./src/client/index.js", //프론트앤드 사이드 시작 js 파일
  // the target directory and the filename for the bundled output
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  /*
    Module loaders are transformations that are applied on the source code
    of a module. We pass all the js file through babel-loader to transform JSX
    to Javascript. CSS files are passed through css-loaders and style-loaders
    to load and bundle CSS files.
  */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // Configurations for the webpack-dev-server which will be described in coming section.
  devServer: {
    port: 3000,
    open: true, //dev 서버 실행시 자동 브라우저에서 오픈
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  /*
     clean-webpack-plugin is a webpack plugin to remove the build folder(s) before building.
     html-webpack-plugin simplifies creation of HTML files to serve your webpack bundles.
     It loads the template (public/index.html) and injects the output bundle.
  */
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
