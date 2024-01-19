// const webpack = require('webpack');

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  lintOnSave: false,
  publicPath: "./",

  configureWebpack: {
    // everything for webpack.config.js
    module: {
      rules: [
        {
          test: /\.md$/,
          use: "raw-loader",
        },
      ],
    },
  },
};
