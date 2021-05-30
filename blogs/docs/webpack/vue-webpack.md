---
title: Vue脚手架webpack部分搭建
date: 2021-5-30
cover: https://pan.zealsay.com/zealsay/cover/3.jpg
tags:
 - Vue
 - webpack
categories: webpack
---

::: tip 介绍
Vue脚手架webpack部分搭建<br>
:::

<!-- more -->

## 基本介绍

> webpack要解决什么问题？前端工程化
>
> 脚手架可以解决前端工程化的问题，但是这是表象，其实脚手架的底层靠的是webpack这个工具。

- [中文官网](https://www.webpackjs.com/)
- [英文官网](https://webpack.js.org/)

> webpack 是一个现代 JavaScript 应用程序的静态模块打包器。
>
> webpack用于上线之前的代码打包（编译、文件的压缩、合并等操作）
>
> 编译：把Vue、js、less等相关的代码转换为浏览器能认识的原生代码
>
> 压缩：代码中空格、回车换行、注释、变量名称等信息的优化，优化之后代码体积变小，提高网络传输效率
>
> 合并：多个文件合并为一个，减少网络请求的次数。

![image-20210120085323562.png](https://i.loli.net/2021/05/30/fg5tzYFIZSeQiDK.png)

> 总结：webpack是一个打包工具（代码的编译、压缩、合并、优化等操作）

## 初始化项目

> 目标：创建一个基本的网站项目

- mydemo
  - index.html
  - src/js/index.js

> 总结：上线之前，需要对js文件进行压缩处理（去掉注释、回车换行、控制等信息）

## 基于命令行用法

> 目标：熟悉Webpack命令行基本打包用法

- 初始化项目

```bash
npm init -y
```

- 安装依赖包

```bash
npm install webpack webpack-cli -D
```

- 判断安装成功的标志

```bash
.\node_modules\.bin\webpack -v
# npx是Node中自带的一个命令行命令，它可以自动再node_modules\.bin命令中查找要执行的命令
npx webpack -v
```

![image-20210120092152510.png](https://i.loli.net/2021/05/30/IqUf7ky1KMCneNa.png)

- 打包

```bash
.\node_modules\.bin\webpack --entry 要打包的文件名称 -o 打包后的文件路径
// 或者(npx是node环境自带的命令,作用是：自动从当前项目的跟目录中的node_modules\.bin目录中查找要执行的命令)
# npx webpack --entry 要打包的文件名称 -o 打包后的文件路径
npx webpack --entry ./src/js/index.js -o ./src/js/
```

- [打包命令详解](https://webpack.js.org/api/cli/)



## 基于配置文件用法

> 目标：熟悉命令行打包写法不够灵活，所以可以采用配置文件提前把打包的规则设置好，然后通过配置好的规则进行打包操作，并且可以配置各种复杂的打包场景。

- 入口文件
- 出口文件
- 加载器
- 插件

### 入口和出口文件配置

> 目标：熟悉webpack配置文件的基本配置步骤

- 在项目的跟路径中创建一个配置文件`webpack.config.js`
- 使用配置文件
  - --config 可以指定配置文件名称（默认名称是webpack.config.js）
  - 如果配置文件名称不是webpack.config.js，必须指定（ --config 配置文件名称）

```bash
npx webpack
# 上面的命令等效于下面的命令（因为默认的配置文件名称就是webpack.config.js）
npx webpack --config webpack.config.js

# 如果配置文件名称不是webpack.config.js，如果是webpack.config.dev.js，必须添加--config选项
npx webpack --config webpack.config.dev.js
```

- 文件基本配置

```js
const path = require('path')

module.exports = {
  // 配置入口文件名称（指定入口文件（告诉webpack你要打包那个文件））
  entry: './src/js/index.js',
  // 配置生成的打包后的文件（告诉webpack打包后的文件放到哪里）
  output: {
    // 打包好的文件放置的目录位置
    path: path.join(__dirname, 'dist'),
    // 打包后的文件名称
    filename: 'index.min.js'
  }
}
```

> 总结：
>
> 1. 通过配置文件方式打包（webpack命令执行时，会读取配置文件，根据配置文件的规则进行打包）
> 2. 配置文件有一个默认名称webpack.config.js，如果使用的就是默认名称，那么打包时可以直接使用npx webpack即可，但是如果配置文件名称不是webpac.confg.js，那么需要制定配置选项--config，（npx webpack --config 自定义的配置文件名称）

### 加载器

> 目标：熟悉加载器的基本配置规则和作用

- 关于加载器作用分析(webpack最终打包时，处理的各种类型的文件需要通过加载器实现)
- 不同类型的文件需要通过不同的加载器进行处理，处理之后会变成另一种类型的资源。

![image-20210120112518164.png](https://i.loli.net/2021/05/30/NTczstqZACdM84Q.png)

- CSS文件类型的处理（安装相关依赖包）
  - css-loader 把css文件转化js模块
  - style-loader 把css-loader的处理结果添加到页面

```bash
npm install style-loader css-loader -D
```

- 配置css加载器

```js
module: {
  rules: [
    {
      // 配置加载器处理文件的匹配规则（匹配以.css结尾的文件）
      test: /\.css$/,
      // 上面匹配的文件交给如下的加载器处理
      // 如下加载器处理文件的规则是：从右向左
      // use的作用：配置加载器（用于处理test匹配的文件的内容）
      // css-loader 加载器作用：把css文件内容变成js代码
      // style-loader 加载器的作用：把css代码添加到html页面中
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

> 总结：打包时，会把css代码打包到js文件里面
>
> 1. css-loader负责把css文件的内容转换成js代码
> 2. style-loader把js中的css代码添加到HTML页面的head里面



### 插件

> 目标：熟悉插件的基本配置规则
>
> 应用场景之一：清除目录中所有文件
>
> [clean-webpack-plugin](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder)

- 安装依赖包

```bash
npm install clean-webpack-plugin -D
```

- 导入

```bash
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
```

- 配置插件

```js
plugins: [
  new CleanWebpackPlugin()
]
```

> 总结：用于清理目录中原有的内容
>
> 1. 先安装插件依赖包，然后导出，最后配置插件
> 2. 除了加载器之外的独立功能一般都由插件来处理

## 常用配置

> 使用更多的加载器和更多的插件解决更多特定的问题（处理各种类型的资源）

### 配置自动生成网页模板

> 配置自定义模板：根据模板自动生成一个相应文件并且自动添加js文件的引用
>
> 插件的作用：根据模板文件自动生成一个页面文件，并且自动添加打包后的js文件的链接
>
> [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

- 安装依赖包

```bash
# webpack4
html-webpack-plugin@4 -D
# webpack5
npm install html-webpack-plugin -D
```

- 导入

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
```

- 插件配置

```js
plugins: [
  new HtmlWebpackPlugin({
    template: './index.html'
  })
]
```

> 总结：
>
> 1. 根据indexhtm页面模板生成一个打包的index.html并且自动添加js文件的引入
> 2. 插件使用：先安装，再导入，最后配置插件

### 配置本地服务器

> 配置本地服务器环境【方便调试：修改代码保存后自动刷新浏览器】
>
> [webpack-dev-server](https://github.com/webpack/webpack-dev-server#readme)

- 安装依赖包

```bash
npm install webpack-dev-server -D
```

- webpack配置文件

```js
devServer: {
    // 调试网站的跟路径
    contentBase: path.join(__dirname, 'dist'),
    // 本地服务的端口
    port: 9000
}
```

- 基本启动方式

```bash
npx webpack serve --config webpack.config.dev.js
```

- package.json文件配置
  - 给运行的命令起一个别名，方便运行命令是简化操作
  - dev表示开发调试
  - build表示打包上线

```json
"scripts": {
  "serve": "npx webpack serve --config webpack.config.dev.js",
  "build": "npx webpack --config webpack.config.dev.js"
},
```

> 总结：
>
> 1. 开发阶段运行 npx webpack serve --config webpack.config.dev.js (如果自定义配置文件名称，必须添加--config选项并指定文件名称)
> 2. 可以在package.json文件中，配置命令的别名
>    1. 开发运行的命令 npm run serve
>    2. 打包上线的命令 npm run build

### 配置less加载器

> 配置less加载器

- 安装依赖包

```bash
npm install less-loader less -D
```

- 配置less加载器

```js
{
  // 处理less文件
  test: /\.less$/,
  // loader处理流程：从右向左
  // less-loader作用：把less文件代码编译为css代码
  use: ['style-loader', 'css-loader', 'less-loader']
}
```

> 总结：
>
> 1. less加载器需要两个依赖包（less-loader内部依赖less）
> 2. 比css处理流程多一个加载器less-loader

### 配置图片加载器

> 目标：实现图片资源的处理
>
> file-loader 将图片移动到dist目录(或者outputPath定义的目录)下并返回一个相对于dist的路径	
>
> url-loader 默认使用file-loader移动图书文件，但是多了一个功能：如果图片文件的大小很小，那么可以把图片转换为base64格式的图片

- 安装依赖包

```bash
npm install url-loader file-loader -D
```

- webpack配置文件：配置图片加载器

```js
{
    // 匹配各种类型的图片资源
    test:/\.(png|jpg|gif|jpeg|svg)$/,
    use:[
      {
        // 依赖的loader（url-loader内部依赖的file-loader）
        loader: "url-loader",
        // 加载器的配置选项
        options: {
          // 图片文件名称的生成规则（重命名图片的文件名称）
          // name表示图片的原始名称
          // hash:5表示随机生成一个5位的字符串拼接到文件名称后面
          // ext表示图片的后缀
          // logo.473ab.png
          name: "[name].[hash:5].[ext]",
          // 如果图片的大小小于1k，就转化为base64格式图片
          // 推荐小图片转换base64
          limit: 5 * 1024, // size <= 5k
          // 图片生成后放置的目录名称
          outputPath: "imgs"
        }
      }
    ]
 }
```

- 图片可以转化为base64形式的数据
  - base64编码会是图片体积变大（缺点）
  - 所以一般我们把小图片转化为base64，但是大图片不建议转化
  - 好处是减少网页的请求次数，提高加载效率

> 总结：
>
> 1. file-loader负责移动图片
> 2. ul-loader内部基于file-loader移动图片，但是可以转换图片为base64格式的数据
> 3. 关于base64格式的图书优缺点

### 配置js加载器

> 目标：实现ES6+编译环境配置
>
> [Babel](https://babeljs.io/) 是一个 JavaScript 编译器，能将 ES6 语法转为 ES5 语法，让你使用最新的语言特性而不用担心兼容性问题，把采用 ES6 编写的代码转换成目前已经支持良好的 ES5 代码。

- 安装依赖包
  - babel-loader 是webpack需要的包（加载器）
  - @babel/core 是babel的核心包，提供转换操作
  - @babel/preset-env 是转换的规则（那些ES6的语法需要做转换）

```bash
npm i babel-loader @babel/core @babel/preset-env -D
```

- webpack配置文件：配置js加载器

```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  //打包除这个文件之外的文件
  exclude: path.join(__dirname, './node_modules')
}
```

- babel配置文件（.babelrc 在项目的跟目录创建文件）
  - 用于设置babel的转换规则

```
{
  "presets": ["@babel/preset-env"]
}
```

> 总结：
>
> 1. ES6+语法需要经过Babel的编译，才可以再早期的浏览器中运行
> 2. webpack依赖babel-loader，babel-loader依赖@babel/core，@babel/core依赖@babel/preset-env

### 配置Vue加载器

> 目标：配置vue编译环境

- 安装依赖包

```bash
npm install vue-loader vue-template-compiler -D
npm install vue -S
```

- webpack配置文件：配置vue加载器

```js
{
  test: /\.vue$/,
  loader: 'vue-loader'
}
```

- 配置Vue插件

```js
// 导入插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 配置插件
plugins: [
  new VueLoaderPlugin()
]
```

> 总结：
>
> 1. 支持Vue单文件组件开发
> 2. 配置Vue单文件加载器，并且需要配置插件

## webpack项目发布

> 目标：实现打包环境配置

- 关于打包模式
  - development 开发模式打包 打包速度快 没做优化处理
  - production 生产模式打包 打不速度慢 做了一些优化处理，压缩

```js
// 导出的是给webpack使用的配置
module.exports = {
  mode: 'development'
} 
```

- 命令配置
  - dev命令表示开发阶段
    - npx webpack-dev-server
    - npx webpack serve
    - --open的作用：自动打开浏览器
  - build命令表示上线阶段

```json
"scripts": {
    "dev": "npx webpack-dev-server --open",
    "dev1": "npx webpack serve --open"
    "build": "npx webpack --config webpack.config.js"
},
```

> 总结：通过package.json配置开发和打包命令的别名



## 总结

- webpack是什么？是一个打包工具
- webpack基本使用：命令行用法；配置文件用法
- webpack配置文件的核心配置
  - 入口配置
  - 出口配置
  - 加载器配置
  - 插件配置
  - devServer:本地服务器环境，并且可以自动刷新浏览器
- webpack常用配置
  - css加载器
  - less加载器
  - 图片加载器
  - js加载器
  - vue加载器
  - 清除文件的插件
  - 生成模板页面的插件
  - dev-serve服务

> 总结：最终希望徒手配置vue单文件组件的环境。





