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
let compailer = webpack(config);

app.use(middle(compailer));

app.get('/user',(req,res)=>{
    res.json({name:'Hanoso-middle'});
});

app.listen(3000);