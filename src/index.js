import './style.css';
import './index.less';
// resolve 解析后，直接引入bootstrap
import 'bootstrap'
console.log("测试1111");

// let str = require('./a.js');
// console.log(str+'1');

// let fn = () =>{
//     console.log('es6函数写法')
// };
// fn();

// @loge
// class A{ // new A() a =1;
//     a = 122;
// }

// let a = new A();
// console.log(a.a);

// function loge(target) {
//     console.log(target);
//     console.log('23333');
// }

import $ from 'jquery';
console.log(window.$, 'jQuery')

// 打包图片
// 1）在js中创建图片来引入
import bgimg from './2.png'; // 引入图片并返回新的图片地址
// import webpack from 'webpack';
let image = new Image();
console.log(image);
image.src = bgimg;
document.body.appendChild(image);
//2) 在css中引入图片
import './style.css';

// express
// 默认访问的路径http://localhost:8081 webpack-dev-serer服务路径 => 3000端口 --》跨域
// let xhr = new XMLHttpRequest(); // 创建Ajax对象

// 1）对应方法一：
// xhr.open('GET','/api/user',true); // 建立GET请求，/api开头经代理后被替换为空，从而与server.js中的'/user'一致
// 2）对应方法二：
// xhr.open('GET','/user',true);
// xhr.onload = function(){
//     console.log(xhr.response); // 设置回调
// }

// xhr.send(); // 发送Ajax请求


// 环境变量配置
let url="";
if(DEV == 'dev'){
    url = 'http://localhost:8081'
}else{
    url = 'http://www.baidu.com'
}
console.log(DEV);
console.log(EXPRESSION);
console.log(url);


// 时间插件moment
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn'); // 设置语言

let r = moment().endOf('day').fromNow();
console.log(r);

// webpack自带优化功能 测试
import calc from './test'
console.log(calc.sum(1,2));
// import 在生产环境下 可以自动去掉用不到的代码
// tree-shaking 把没用的到的代码 自动删除掉

// let calc = require('./test')
// console.log(calc.default.sum(1,2)); // 采用require方式，sum在default中
// ES6 模块会把结果放到default中
// require 引入不能像import一样在生产环境下去除多余代码，故推荐使用import引入

// scope hosting 作用域提升
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
console.log(d, '--------------------') // webpack打包时 自动简化 省略中间代码，返回最终结果

// 抽离公共代码 测试
// console.log('抽离公共代码 测试')
// import './a.js'
// import './b.js'
// console.log('./index.js')
// import jquery from 'jquery';
// console.log(jquery)

// 懒加载 测试
let button = document.createElement('button');
button.innerHTML = 'Hello';
button.addEventListener('click',function(){
    import('./source.js').then(data=>{
        console.log(data.default);
    });
});
document.body.appendChild(button);

// 热更新 测试
import str from './source';
console.log(str);
if(module.hot){
    module.hot.accept('./source',()=>{
        let str = require('./source')
        console.log(str)
    })
}