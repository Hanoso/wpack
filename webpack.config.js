const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); // 必须加{}
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development", // 两种模式：production和development，默认production
    // 单入口
    // entry: './src/index.js',
    // 多入口
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    // 对应多出口
    output: {
        // 单出口设置
        // filename: 'bundle-[hash:8].js',  // bundle-[hash].js 给文件名增加hash值,[hash:8]显示前8位
        // path: path.resolve(__dirname, 'dist'),
        // 多出口设置, [name]代表多入口变量名home,other，逐一打包
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://localhost'
    },
    // 1）源码映射，单独生成一个sourcemap文件，出错时会直接提示报错行
    // devtool: 'source-map', // 大而全的设置
    // 2）源码映射，不会产生单独的文件，单会直接显示错误的行列
    // devtool: 'eval-source-map',
    // 3) 不会产生列，但是会生成一个单独的映射文件
    // devtool: 'cheap-module-source-map', // 产生后可以保留起来
    // 4) 不会产生文件，集成再打包后的文件中，也不会产生列
    devtool: 'cheap-module-source-map', // 产生后可以保留起来
    // 开启监控，实时打包设置
    watch: true,
    watchOptions:{ // 设置监控选项
        poll: 1000, // 每秒查询1000次
        aggregateTimeout: 500, // 防抖，ctrl+s后多久开始打包
        ignored: /node_modules/, // 忽略不需要监控的文件夹
    },
    devServer: {
        contentBase:"./dist", // 本地服务器路径
        inline:true, // 实时刷新开启
        // port: 3000, // 端口设置，本地默认8081
        progress: true, // 打包进度条开启
        // compress: true, // 启动压缩
        // open: true, // 自动打开浏览器
        // 配置代理
        // 1）方法一：与server.js配合
        // proxy:{
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         pathRewrite: {'^/api':''}
        //     }
        // },
        // 2) 方法二：只模拟前端数据，不需要server.js
        // before(app){ // 提供方法，钩子
        //     app.get('/user',(req,res)=>{
        //         res.json({name:'Hanoso2020'})
        //     })
        // }
    },
    optimization: { // 优化项
        minimizer: [
            // 压缩js文件，使用css抽离压缩插件时，必须同时配置此项
            new TerserJSPlugin({}),
            // 压缩抽离后的css文件，此优化仅在production模式有效，development模式下不压缩
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            // 从上到下、从右至左，顺序执行
            // 方法一：简单设置
            // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 方法二：丰富配置
            // { test: /\.(css|less)$/, use: [
            //     {
            //         loader: "style-loader",
            //         options: {} // 此处进行其他可选配置
            //     },
            //         'css-loader', // 解析@import路径
            //         'less-loader' // 把less解析为css
            //     ]
            // },
            // 方法三： 使用抽离
            { test: /\.css$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', // 解析@import路径
                ]
            },
            { test: /\.less$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', // 解析@import路径
                    'less-loader' // 把less解析为css
                ]
            },
            { test: /\.(jpg|png|jpeg)$/, use: {
                loader: 'file-loader',
                options:{
                    esModule: false,
                    outputPath: '/img/',
                    // publicPath: 'htpp://localhost' // 为图片路径增加域名
                }
            } },
            { test: /\.html$/, use: {
                loader: 'html-loader',
                options: {
                    attrs: [':src', ':data-src'],
                    minimize:true
                }
            } },
            // { test: /\.html$/, use: 'html-withimg-loader' },
            // js语法转化
            {test: /\.js$/, use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [
                      // '@babel/plugin-proposal-object-rest-spread',
                      ["@babel/plugin-proposal-decorators", { "legacy": true }],
                      ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                  ]
                }
              }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            chunks: ['home'], // 多页面打包设置，对应入口js
            minify: {
                removeAttributeQuotes: true, // 去除引号
                removeComments: true, // 去除注意
                removeEmptyAttributes: true,// 去除空属性
                collapseWhitespace: true // 去除空格
            },
            // 会在js文件名后增加hash值，例如bundle.js?08f9c052058b07e47a97。如output中已设置，此处可省略
            // hash: true
        }),
        // 多页面打包，多个new
        new HtmlWebpackPlugin({
            template: "./other.html",
            filename: "other.html",
            chunks: ['other', 'home'], // 多页面打包设置，对应入口js, 先引入home再other
            minify: {
                removeAttributeQuotes: true, // 去除引号
                removeComments: true, // 去除注意
                removeEmptyAttributes: true,// 去除空属性
                collapseWhitespace: true // 去除空格
            },
            // 会在js文件名后增加hash值，例如bundle.js?08f9c052058b07e47a97。如output中已设置，此处可省略
            // hash: true
        }),
        new MiniCssExtractPlugin({
            filename: "css/main.css", // css抽离为main.css文件中
        }),
        new CleanWebpackPlugin(), // 先删除dist目录再打包
        new CopyWebpackPlugin([
            {from:'doc', to:'./'}
        ]),
        new webpack.BannerPlugin("Make 2019 by Hanoso"), // 声明版权信息
    ]
};