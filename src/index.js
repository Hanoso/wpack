console.log("入口文件");
console.log("打包");
console.log("练习配置config");
console.log("dev-server自动刷新测试55");
console.log("打包css文件测试");
import './style.css';
import './index.less'

let str = require('./a.js');
console.log(str+'1');

let fn = () =>{
    console.log('es6函数写法')
};
fn();

@loge
class A { // new A() a =1;
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
let image = new Image();
console.log(image);
image.src = bgimg;
document.body.appendChild(image);
//2) 在css中引入图片
import './style.css';
