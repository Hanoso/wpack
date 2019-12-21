// express
// 1）方法一：代理
// let express = require("express");

// let app = express();

// app.get('/user',(req,res)=>{
//     res.json({name:'Hanoso666'})
// })

// app.listen(3000);


// 3）方法三：中间件
let express = require("express");
let app = express();
let webpack = require('webpack');
// 中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');
let compiler = webpack(config);

app.use(middle(compiler, {
    publicPath: config.output.publicPath,
}));

app.get('/user',(req,res)=>{
    res.json({name:'Hanoso-middle'});
});

app.listen(3000); // 端口可按需配置

// const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');

// const app = express();
// const config = require('./webpack.config.js');
// const compiler = webpack(config);

// // Tell express to use the webpack-dev-middleware and use the webpack.config.js
// // configuration file as a base.
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }));

// // Serve the files on port 3000.
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!\n');
// });