var path = require("path");
var { TsConfigPathsPlugin } = require('awesome-typescript-loader');

function resolve(dir){
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    'index': './src/index.ts',
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, './dist'),
    library: "aaa-list-diff",
    libraryTarget: "umd"    
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
