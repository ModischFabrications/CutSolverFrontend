// const webpack = require('webpack');

process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
    lintOnSave: false,
}

// module.exports = {
//     configureWebpack: config => {
//         return {
//             plugins: [
//                 new webpack.DefinePlugin({
//                     'APP_VERSION': JSON.stringify(require('./package.json').version),
//                 })
//             ]
//         }
//     },
// }
