var path = require("path");
var { TsConfigPathsPlugin } = require('awesome-typescript-loader');

function resolve(dir){
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    // 'polyfills': './src/polyfills.ts',
    'index': './src/index.ts',
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, './dist'),
    libraryTarget: "umd",
    library: "aaa-list-diff"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      new TsConfigPathsPlugin(/* { configFileName, compiler } */)
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
    ]
  }
}
