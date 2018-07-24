const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');


//const CompressionPlugin = require("compression-webpack-plugin");//极限压缩，需要服务端配合开启gzip

const HtmlWebpackPlugin = require('html-webpack-plugin');
//common.entry.vendor = ['react','react-dom'];
//common.optimization = {
//    splitChunks: {
//        chunks: "all",
//            minChunks: 1,
//            minSize: 0,
//            cacheGroups: {
//            vendor: {
//                test: "vendor",
//                name: "vendor"
//            }
//        }
//    }
//};
//const cp = new CompressionPlugin({
//    asset: "[path].gz[query]",
//    algorithm: "gzip",
//    test: /\.js$|\.css$/,
//    threshold: 10240,
//    minRatio: 0.8
//});
//common.plugins.push(cp);
//common.plugins.push(new HtmlWebpackPlugin({
//    title:'水利资金绩效考核系统',
//    filename:'index.html',
//    template:'./web/index.html'
//}));
module.exports = merge(common, {
    mode: 'production'
});
