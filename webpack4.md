> 基础-视频教程：[webpack4.x模块化打包工具视频教程](https://www.bilibili.com/video/av55918263?p=5)
>
> 进阶-视频教程：

**webpack简单介绍：**

本质上，*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

四个**核心概念**：

- 入口(entry)
- 输出(output)
- loader：实现非js文件的打包，比如css, img, html等，通过loader功能
- 插件(plugins)：有效地打包压缩css/img/html等文件

loader和plugins配合使用。

更多👉：[官方文档](https://www.webpackjs.com/concepts/)



#### 1.全局安装

```js
npm/cnpm install webpack -g
npm/cnpm install webpack-cli -g
```

或者

```
npm/cnpm install webpack webpack-cli -g
```

#### 2. 项目初始化，生成`package.json`

- 进入项目目录`project_dir`
- 执行`npm init`，一路回车，默认即可
- 项目文件夹下，会生成文件夹`node_modules`和文件`package.json`

#### 3. 局部安装

- 在项目目录下打开`cmd`
- 执行命令：

```
npm/cnpm install webpack webpack-cli -S
```

#### 4. 打包测试

webpack4打包命令为：`webpack`

```
D:\wpack>webpack
```

默认entry：`src/index.js`

默认output：`dist/main.js`

默认打包模式为生成环境`production`

开发模式（不压缩格式）：`webpack --mode development`

生产模式（压缩格式）：`webpack --mode production`

#### 5. **基本配置**: `webpack.config.js`

**5.1 webpack.config.js配置**

```js
const path = require('path');

module.exports = {
    mode: "production", // 两种模式：production和development，默认prodcution
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }
};
```

其中，`mode`模式设置，亦可在`package.json`中设置，选一种方法即可。

**5.2 package.json配置**

在`package.json`文件中可以进行一些配置，比如：

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  }
```

配置为如下：

```json
  "scripts": {
        // test等脚本名字随意自定义
        "test": "echo \"Error: no test specified\" && exit 1",
        // 定义一个build脚本，指定config文件名称，可以更改配置文件的名字，例如改为webpack.config.my.js
        "build": "webpack --config webpack.config.js"
        // mode设置，webpack.config.js中设置过mode后，此处可不用重复设置
        "start": "webpack --mode development",
  }
```

执行脚本：

```
npm run build
```

#### 6 安装本地服务器（dev-server）：

在项目目录下执行命令：`npm/cnpm install webpack-dev-server -S`

**`webpack.config.js`中相关配置：**

```js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main2.js'
    },
    // 配置dev-server
    devServer: {
        contentBase:"./dist",
        // 本地服务器打包后文件保存路径
        inline:true,
        // 实时刷新开启
        port: 3000,
        // 端口设置
        progress: true,
        // 打包进度条开启
        compress: true,
        // 启动压缩
        open: true,
        // 自动打开浏览器
    }
};
```

`devServer`中还有很多配置项目，如`port`端口等。

**`package.json`中相关配置：**添加`dev`脚本，通过执行`npm run dev`实现自动打开浏览器并在更新`js`文件后自动刷新浏览器

```json
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --config webpack.config.js",
      "start": "webpack --mode development",
      // 定义一个dev脚本，启动服务器
      "dev": "webpack-dev-server --open --inline"
  },
```

`dev`脚本说明：

```
webpack-dev-server："启动webpack本地服务器"
--open: "自动打开浏览器"
--inline: "更新js后实时刷新浏览器"
```

#### 7. loader配置

**7.1 测试无loader时的打包**

首先在`/src`下创建一个`style.css`文件，然后在入口文件`index.js`中引入，方法如下：

```js
import './style.css';
```

保存后，`dev-server`自动打包并刷新，但会报错，如下：

```cmd
Version: webpack 4.41.2
Time: 28ms
Built at: 2019-12-15 3:04:36 PM
   Asset     Size  Chunks             Chunk Names
main2.js  366 KiB    main  [emitted]  main
Entrypoint main = main2.js
[./src/index.js] 200 bytes {main} [built]
[./src/style.css] 274 bytes {main} [built] [failed] [1 error]
    + 32 hidden modules

ERROR in ./src/style.css 1:4
Module parse failed: Unexpected token (1:4)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> body{
|     background-color: orange;
| }
 @ ./src/index.js 6:0-21
i ｢wdm｣: Failed to compile.
```

原因为：没有相应的loader。

**7.2 配置loader**

> loader列表： [参考文章](https://blog.csdn.net/keliyxyz/article/details/51649429)

根据loader列表，找到对应的loader并下载安装（注意在项目目录下）。

安装常用的loader：

```cmd
cnpm install style-loader css-loader -S
cnpm install less less-loader -S
cnpm install file-loader -S
```

配置`webpack.config.js`：

```js
    devServer: {
        contentBase:"./dist",
        // 本地服务器路径
        inline:true,
        // 实时刷新开启
    },
    module: {
        rules: [
            // 配置打包css文件的loader，use定义使用到的loader，注意顺序
          	{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // 配置图片的loader
            { test: /\.(jpg|png|jpeg)$/, use: ['file-loader'] }
            // 根据需要配置其他文件的loader
        ]
  }
```

**注意**：`style-loader`必须放在`css-loader`前面，执行有顺序（链式传递），否则报错。

**从上到下、从右至左，顺序执行。**

rule的另一种丰富配置：

```js
{ test: /\.(css|less)$/, use: [
                {
                    loader: "style-loader",
                    options: {
						// 此处可以进行其他设置
                    }
                },
                    'css-loader', // 解析@import路径
                    'less-loader' // 把less解析为css
                ]
            },
```

如上rule的执行顺序为：`less-loader > css-loader > style-loader > options`

#### 8. 插件plugins

插件在`webpack.config.js`中不区分顺序。

**8.1 Html文件处理**

，打包`html`文件，安装插件（注意在项目目录下安装）：

```
cnpm install html-webpack-plugin -S
```

配置`webpack.config.js`：

```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ...

	module: {
        rules: [
            // 配置loader
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(jpg|png|jpeg)$/, use: ['file-loader'] }
        ]
    },
    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 打包前的html文件
            filename: "index.html", // 打包后的html文件名
            minify: {
                removeAttributeQuotes: true, // 去除引号
                removeComments: true, // 去除注意
                removeEmptyAttributes: true,// 去除空属性
                collapseWhitespace: true // 去除空格
            }
        })
    ]
```

**8.2 样式抽离**

安装抽离css插件：

```
cnpm install --save-dev mini-css-extract-plugin
```

配置`webpack.config.js`：

```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// ...

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
            { test: /\.(jpg|png|jpeg)$/, use: ['file-loader'] }
// ...

    plugins: [
        // ...
        // 添加css抽离插件
        new MiniCssExtractPlugin({
            filename: "main.css", // 设置文件，css抽离为main.css文件中
        })
    ]
```

抽离出的`main.css`没有被压缩，需安装插件：

```
cnpm install --save-dev terser-webpack-plugin // 压缩js
cnpm install --save-dev optimize-css-assets-webpack-plugin  // 压缩抽离的css
```

注意：以上两个插件需配合使用，同时配置，如只配置css插件，则js不会被压缩。

并配置：

```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 此处省略...
module.exports = {
    mode: "production", //此处必须设置为production模式，否则抽离的css文件不会被压缩
    // 此处省略...
    optimization: { // 优化项
        minimizer: [
            // 同时实现js文件的压缩，与css抽离压缩插件同时配合使用，替代uglify
            new TerserJSPlugin({}),
            // 压缩抽离后的css文件，此优化仅在production模式有效，development模式下不压缩
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module:{
        // 此处省略...
    },
    plugins:{
        // 此处省略...
    }
}
```

优化项配置完成后，抽离的css文件和js文件即可正常同时被压缩。

#### 9. JS语法转化

使用babel模块。

> 官网：[BABEL](http://babel.docschina.org/)

安装基础loader：

```
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

安装转化class定义的对象的loader：

```
npm install --save-dev @babel/plugin-proposal-class-properties
```

安装转化装饰器用法的loader：

```
npm install --save-dev @babel/plugin-proposal-decorators
```

配置`webpack.config.js`：

```js
// 此处省略...
module.exports = {
// 此处省略...
    rules: [
            // 此处省略...
            // js语法转化
            {test: /\.js$/, use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [  // 参考文档配置
                      // '@babel/plugin-proposal-object-rest-spread',
                      ["@babel/plugin-proposal-decorators", { "legacy": true }],
                      ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                  ]
                }
              }
            }
        ]
}
```

如有需要其他babel-loader，可通过官网查找安装并配置。
#### 10. 图片处理
1> 在js中创建图片来引入:
```js
import bgimg from './2.png'; // 引入图片并返回新的图片地址
let image = new Image();
console.log(image);
image.src = bgimg;
document.body.appendChild(image);
```
2> 在CSS中引入图片:
```css
body{
    background-color: yellow;
    background-image: url("2.png");
}
div{
    background-image: url('./1.jpg');
    width: 500px;
    height: 700px;
}
```
然后由js导入：
```js
import './style.css';
```
3> html中img标签引入图片：
```js
{ test: /\.(jpg|png|jpeg)$/, use: {
                loader: 'file-loader',
                options:{
                    esModule: false, // 此处必须加，否则无法压缩图片路径
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
```
#### 11. 指定路径
1> 单独位img路径添加域名前缀：
```js
{ test: /\.(jpg|png|jpeg)$/, use: {
                loader: 'file-loader',
                options:{
                    esModule: false,
                    outputPath: '/img/',  // 存放在img文件夹下
                    publicPath: 'htpp://localhost' // 路径前添加域名，此时/img/文件夹失效；
                }
            } },
```
故，其他文件可进行类似单独设置。
2> 为img/css/js等文件统一添加域名前缀：
```js
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash:8].js',  // bundle-[hash].js 给文件名增加hash值,[hash:8]显示前8位
        publicPath: 'http://localhost'  // 为所有路径添加域名前缀
    },
```
3>为css指定存放文件夹：
```js
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/main.css", // css抽离为main.css文件中,并存放只dist/css文件夹下
        })
    ]
```
#### 12. 多页面打包
1> 多入口entry、多出口output设置：
```js
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
        filename: '[name].js', // 仍可以加hash值
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://localhost'
    },
```
2> html-webpack-plugin设置：
```js
plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            chunks: ['home'], // 多页面打包设置，对应入口js
        }),
        // 多页面打包，多个new，单页面可以引入多个入口js
        new HtmlWebpackPlugin({
            template: "./other.html",
            filename: "other.html",
            chunks: ['other', 'home'], // 多页面打包设置，对应入口js, 先引入home再other
        }),
    ]
```
#### 13. 配置source-map
tips：source-map会明显增加打包时间。
需要安装的包：
`@babel/core @babel/preset-env babel-loader webpack-dev-server`
设置：
```js
module.exports = {
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    // 对应多出口
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    }
    // 1）源码映射，单独生成一个sourcemap文件，出错时会直接提示报错行
    // devtool: 'source-map', // 大而全的设置
    // 2）源码映射，不会产生单独的文件，单会直接显示错误的行列
    // devtool: 'eval-source-map',
    // 3) 不会产生列，但是会生成一个单独的映射文件
    // devtool: 'cheap-module-source-map', // 产生后可以保留起来
    // 4) 不会产生文件，集成再打包后的文件中，也不会产生列
    devtool: 'cheap-module-source-map', // 产生后可以保留起来
}
```
ps：以上4个方法貌似都生成map文件了。。。
#### 14. watch实时打包
设置如下：
```js
module.exports = {
    devtool: 'cheap-module-source-map', // 产生后可以保留起来
    // 开启监控，实时打包设置
    watch: true,
    watchOptions:{ // 设置监控选项
        poll: 1000, // 每秒查询1000次
        aggregateTimeout: 500, // 防抖，ctrl+s后多久开始打包
        ignored: /node_modules/, // 忽略不需要监控的文件夹
    },
    devServer: {}
}
```
#### 15. 常用插件（3个）
安装：
```js
cnpm install --save-dev clean-webpack-plugin
cnpm install --save-dev copy-webpack-plugin
```
1) cleanwebpackPlugin -- 打包前清除dist目录
2) copywebpackPlugin -- copy目录中的文件到指定目录
3) bannerPlugin -- 版权声明插件，webpack内部插件，无需安装
引入：
```js
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack"); // 内置bannerPlugin插件

plugins:[
    new CleanWebpackPlugin(), // 先删除dist目录再打包，不用填参数
    new CopyWebpackPlugin([ // 可以设置多组from to
        {from:'doc', to:'./'}
    ]),
    new webpack.BannerPlugin("Make 2019 by Hanoso"), // 声明版权信息
]
```
ps：常用插件应该不止这3个。。。
#### 16. webpack跨域问题 [未验证成功]
**跨域**：请求端和响应端域名/端口不一致，即为跨域。

1） 方法一：配置代理
首先在项目根目录创建`server.js`服务端文件：
```js
// express
let express = require("express");   // 引入express
let app = express(); // 创建app服务
// /api/user, /test/user，请求路径中的mock被替换为空
app.get('/user',(req,res)=>{ // 请求req响应res，get请求路径/user
    res.json({name:'Hanoso666'}) // 返回的响应json
})
app.listen(3000); // 监听3000端口
```
然后在入口文件`index.js`中配置前端请求js：
```js
// express
// 默认访问的路径http://localhost:8081 webpack-dev-serer服务路径 => 3000端口 --》跨域
let xhr = new XMLHttpRequest(); // 创建Ajax对象
xhr.open('GET','/api/user',true); // 建立GET请求 /mock/api/user, /mock/test/user
xhr.onload = function(){
    console.log(xhr.response); // 设置回调
}
xhr.send(); // 发送Ajax请求
```
在`webpack.config.js`中配置`devServer`代理：
```js
devServer{
            // 配置代理
        proxy:{
            '/api': {
                // webpack默认首页打开未8081端口，配置target转至3000端口，与
                // server.js端口保持一致，从而解决跨域问题
                target: 'http://localhost:3000',
                pathRewrite: {'^/api':''}, // 将请求路径中开头/api替换为空
                // 请求端路径/api/user，实际情况不确定，可以有很多写法，如/test/user, /new/user等等，为避免重复设置，可将前端请求路径统一以/mock开头，如/mock/api/user, /mock/test/user, /mock/new/user, 然后将/mock替换为空，server.js中去掉/mock
            }
        }
}
```
结果：启动dev和server.js后，访问http://localhost:8081即可经代理实现server.js响应
2）方法二：不需要写server.js，只模拟前端数据
在`devServer`中设置：
```js
devServer{
        before(app){ // 提供方法，钩子
            app.get('/user',(req,res)=>{ // 路径与index.js请求路径一致即可
                res.json({name:'Hanoso2020'})
            })
        }
}
```
3）方法三：有服务端，不用代理来处理，并由webpack来启动==> 中间件 【验证失败】
在`server.js`中配置：
```js
let express = require("express");
let app = express();
let webpack = require('webpack');
// 中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');
let compailer = webpack(config); // 启动server.js时启动webpack，由服务器端启动前端

app.use(middle(compailer));

app.get('/user',(req,res)=>{
    res.json({name:'Hanoso-middle'});
});

app.listen(3000);
```
