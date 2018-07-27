/*
 * 2018/6/27
 * administractor
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除已经build过的文件

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: path.resolve(__dirname, './web/src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './web/build/')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0'],
                        plugins: ["transform-decorators-legacy","transform-decorators"]//为mobx添加修饰器配置
                    }
                },
                include: path.resolve(__dirname, './web'),
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: {loader: 'eslint-loader'},
                include: path.resolve(__dirname, './web'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
                include: path.resolve(__dirname, './web'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
                include: path.resolve(__dirname, './web'),
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 128,
                            name:'resource/[name][hash:8].[ext]'
                        }
                    }
                ],
                include: path.resolve(__dirname, './web'),
                exclude: /node_modules/
            },
            {
                test: /\.(htm|html)$/i,//处理html中的图片
                use: ['html-withimg-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new CleanWebpackPlugin(['./web/build']),//清除build目录中已经build过的文件
        new webpack.LoaderOptionsPlugin({
            test: /\.(js|jsx)$/,
            options:{
                eslint: './.eslintrc'
            }
        }),
        new HtmlWebpackPlugin({
            title:'水利资金绩效考核系统',
            filename:'index.html',
            template:'./web/index.html',
            favicon:'./web/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: "index.bundle.css"
        })
    ]
};