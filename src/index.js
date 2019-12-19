import './style.css';
import './index.less';

let str = require('./a.js');
console.log(str+'1');

let fn = () =>{
    console.log('es6函数写法')
};
fn();

@loge
class A{ // new A() a =1;
    a = 122;
}

let a = new A();
console.log(a.a);

function loge(target) {
    console.log(target);
    console.log('23333');
}

import $ from 'jquery';
console.log(window.$, 'jQuery')

// 打包图片
// 1）在js中创建图片来引入
import bgimg from './2.png'; // 引入图片并返回新的图片地址
import webpack from 'webpack';
let image = new Image();
console.log(image);
image.src = bgimg;
document.body.appendChild(image);
//2) 在css中引入图片
// import './style.css';

// express
// 默认访问的路径http://localhost:8081 webpack-dev-serer服务路径 => 3000端口 --》跨域
let xhr = new XMLHttpRequest(); // 创建Ajax对象

// 1）对应方法一：
// xhr.open('GET','/api/user',true); // 建立GET请求，/api开头经代理后被替换为空，从而与server.js中的'/user'一致
// 2）对应方法二：
xhr.open('GET','/user',true);
xhr.onload = function(){
    console.log(xhr.response); // 设置回调
}

xhr.send(); // 发送Ajax请求
