const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

//const AutoDllPlugin = require('autodll-webpack-plugin');//分离第三方库插件

common.plugins.push(new webpack.HotModuleReplacementPlugin());
//common.plugins.push(new AutoDllPlugin({
//    inject: true,
//    debug: true,
//    filename: '[name].min.js',
//    path: 'lib',
//    entry: {
//        vendor: [
//            'react',
//            'react-dom',
//            'antd'
//        ]
//    }
//}));

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "./web/build"), //定位静态资源到web目录
        open: false, //是否自动打开浏览器
        host: 'localhost',//默认localhost
        port: 8000,
        compress:true,//虚拟服务代码压缩,加快开发流程和优化
        hot: true,//true,webpack4会自动添加HMR插件
    }
});
