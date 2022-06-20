---
title: scss在Vue中的学习
date: 2022-01-24
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/banner_6.jpg
tags:
 - Vue
 - scss
 - My project
categories: Css
---

::: tip 介绍
scss css扩展语言在Vue项目中的使用<br>
:::

<!-- more -->

## 如何在Vue中使用scss

* 强烈建议使用脚手架(Vue cil) 安装scss 我[这里](https://liukaili.netlify.app/blogs/docs/vue_mobile_projects/1_webpack.html)有记录如何安装脚手架 通过脚手架来安装scss 如果自己安装的话 极容易安装错误版本 导致报错
* <font color=#ff3040>注意: 本文都是scss 只是写错了写成sass 请自行修改阅读</font>

## scss的常用特性

> scss 原称 sass 是css扩展语言之一 scss 和 sass 是一样的只要语法不同 

1. sass和less大部分规则一致
2. sass支持写法嵌套
3. 支持变量: less是`@` sass使用的是`$`
4. sass混入(导出)全局样式 `@mixin`  接收混入(导入)全局样式是 `@include`

> scss和sass的区别

* 异同：简言之可以理解scss是sass的一个升级版本，完全兼容sass之前的功能，又有了些新增能力。语法形式上有些许不同，最主要的就是sass是靠缩进表示嵌套关系，scss是花括号

```scss
//sass 太费眼了
.father
    width:100px;
    .son
        width:50px;
//scss 适合我这种眼瘸手残患者
.father{
    width:100px;
    .son{
        width:50px;
    }
}       
```

## Vue2 scss的深度选择器

* sass中替换原类名 deep(深度选择器)
  * sass中 deep方法是 `::v-deep` 而 less里面的方法是 `/deep/`

![image-20210706214001467](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/WIbiCK6arP4HT13.png)

## Vue3 scss的深度选择器

* Vue3深度选择器是.:deep(类名)
* <font color =#ff3040>注意: 不要在()前面加空格</font>

```css
:deep(.hvr-sweep-to-top:before) {
  background: red;
}
```

## scss的自定义变量

* scss的定义变量是 `$` 而less 定义变量是 `@`

![image-20210621202020367](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/NCdPoaOgJQmHEL9.png)

* scss变量支持数组定义 常用来进行遍历操作 无需`[]` 通过

```scss
$users:"list1" ,'list2', 'list3' ;
```

## scss中使用calc带入变量

* 需求: 用css3中的`calc`计算属性 使用scss变量 进行计算 `calc(100vh - #{scss变量})`

```scss
$widthScss: 20px;

width: calc(100% - #{$widthScss});
```



## scss的选择器 &

* `&` 在scss中有两种意思

  * 交集选择器 

    * 交集选择器是 两个类名同时存在时候 才能触发该样式

    ```css
    .classone.classtwo {background:#090} /** 当两个类名同时存在时候 才能触发该样式 **/
    ```

  * 后代选择器

    * 后代选择器是元素的后代 无论子元素还是孙元素 都会变为同一个设置样式

    ```css
    ul em a {color:red;}  /** 这里ul里面的 em a 标签 都会变为红色  **/
    ```



>  scss中的 `&` 具体使用

* `&`交集选择器写法 (`&`没有空格)

```scss
/**
当两个类名同时存在的时候 触发 background:#090这个样式 
**/
.classone {
 background:#000
  &.classtwo { 
  background:#090
  }
}
```

* `&`后代选择器 (`&`有空格)

```scss
/**
ul标签里面的 em 和 a标签 样式全部
**/
ul {
 background:#000
  &. em a{ 
	color:red;
  }
}
```

* 通常我们会在使用伪类选择器`:after`和鼠标移入`:hover`中使用`&` (`&`没有空格)

```scss
/**
.classone鼠标移入后 改变颜色 :after使用同理
**/
.classone {
 background:#000
  &:hover { 
  background:#090
  }
}
```

## scss中的 ~  和 >

* scss中的`~`和`>`和css中是一样的 他是css的原生属性

* **css中`~`是:**

  * 为所有相同的父元素中位于 p 元素之后的所有 ul 元素设置背景：

  ```css
  p~ul{
  　　background:#ff0000;
  
  }
  
   <p>快乐生活</p>
  <ul>
  
  　　<li>生活</li>
  　　<li>生活</li>
  　　<li>生活</li>
  </ul>
  ```

* **css中`>`是:**

  * css3特有的选择器，.class1 > .class2 表示选择A元素的所有子B元素。
  * 与 .class1 .class2 的区别在于，.class1 .class2 选择所有后代元素，而A>B只选择一代。

## scss函数

* scss函可以通过`@function`定义一个函数 搭配`@if`判断 `@each` 循环遍历 或者 `@for`循环遍历

```scss
//函数的定义
@function show(){
	@return yellow   // 返回一个黄色的颜色
}
// 函数的使用 和普通中的语言函数使用一样
header{
	background-color:show();
}

```

## scss的方法

* scss中控制命令指的是`@if`、`@each`、`@for`和`@while`具有一定的逻辑判断和循环遍历能力

### **scss判断 `@if`**

* `@if` 指令是一个 SassScript，它可以根据条件来处理样式块，如果条件为 true 返回一个样式块，反之 false 返回另一个样式块。在 Sass 中除了 `@if` 之，还可以配合 `@else if` 和 `@else` 一起使用。
* `@mixin` 混入可以进行传参 需要设置其默认值 `@mixin 混入名称($变量名: 默认值)`

```scss
//SCSS
@mixin blockOrHidden($boolean: true) { // 进行传参 $变量名: 默认值
  @if $boolean {
    color: red;
  } @else {
     color: blue;
  }
}
// 不进行传参
.block {
  @include blockOrHidden();
}
// 进行传参
.hidden{
  @include blockOrHidden(false);
}

```

* 进行运算符判断 scss没有 `===`全等 只有 双等`==`

```scss
$score:70;
@if $score >60{
	body{
		background-color:green;
	}
}
```

### **遍历语句`@each`和数组的定义`$`**

* scss的变量`$`支持定义数组 无需`[]` 

```scss
$users:list1 list2 list3 ;
@each $user in $users {   
	body-#{$user}{   //  #{$user} 类似 es6的模板字符串的写法  `${name}`
		background: red;
	}
}
```

* 用`@each`批量修改

```scss
$list: adam john wynn mason kuroir;// 声明一个scss数组

@mixin author-images {
    @each $author in $list {
        .photo-#{$author} {
            // 通过scss遍历图的路径地址
            background: url("/images/avatars/#{$author}.png") no-repeat;
        }
    }
}

.author-bio {
    @include author-images;
}
```

## scss继承

* 继承是 SASS 中非常重要的一个特性，可以通过 `@extend` 指令在选择器之间复用 CSS 属性，并且不会产生冗余的代码。
* 需要通过`%`声明要继承的css内容 然后通过`@extend`进行继承

```scss
// 这段代码不会被输出到最终生成的CSS文件，因为它没有被任何代码所继承。
%other-styles {
  display: flex;
  flex-wrap: wrap;
}
// 下面代码会正常输出到生成的CSS文件，因为它被其接下来的代码所继承。
%message-common {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}
 
.message {
  @extend %message-common;
}
 
.success {
  @extend %message-common;
  border-color: green;
}
 
.error {
  @extend %message-common;
  border-color: red;
}
 
.warning {
  @extend %message-common;
  border-color: yellow;
}

```

关于`@extend`有两个要点应该知道:

* 跟混合器相比，继承生成的css代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的css体积更小。牢记这一点可以提高站点的速度。
  继承遵从css层叠的规则。当两个不同的css规则应用到同一个html元素上时，并且这两个不同的css规则对同一属性的修饰存在不同的值，css层叠规则会决定应用哪个样式。相当直观:通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出。
* 混合器本身不会引起css层叠的问题，因为混合器把样式直接放到了css规则中，而继承存在样式层叠的问题。被继承的样式会保持原有定义位置和选择器权重不变。通常来说这并不会引起什么问题，但是知道这点总没有坏处。

## sass的混入

* <font color=#ff3040>注意: 混入的`@mixin`一般需要通过`@import` 或者`@use`导入 导入或注册全局样式 否则不同的scss文件混入是无法一起使用的</font>
* sass混入(导出)全局样式 `@mixin` 接收(导入)全局样式是 `@include`

![image-20220323122134536](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220323122134536.png)

### 混入传参

* `@mixin` 混入可以进行传参 需要设置其默认值 `@mixin 混入名称($变量名: 默认值)`

```scss
//SCSS
@mixin blockOrHidden($boolean: true) { // 进行传参 $变量名: 默认值
  @if $boolean {
    color: red;
  } @else {
     color: blue;
  }
}
// 不进行传参
.block {
  @include blockOrHidden();
}
// 进行传参
.hidden{
  @include blockOrHidden(false);
}

```



## scss的导入方式

* scss导入分为 `@import`导入 和 `@use`导入

> @use 和 @import的区别在于：

* 不管使用了多少次样式表，`@use` 都只会引入和执行一次。
* 与`@import`不一样的地方是 `@use`有命名空间`as` 而且只在当前样式表中生效
* `@use`适合作为全局scss来使用 比如设置全局变量`$` 和 全局混入`@mixin`

### **导入方式 `@import`**

`@import`适合作为非全局scss引用和单scss导入 并且不能使用命名空间`as`

* 需要导入的scss文件

```scss
// 变量
$errorColro: #ff3040;
$radius: 20px;
// 混入
@mixin rounded {
  .box {
    color: $errorColro;
    border-radius: $radius;
  }
}

```

* 导入scss 使用全局变量`$` 和 全局混入`@mixin`

```scss
<style lang="scss" scoped>
// 导入scss文件
@import '~@/styles/setting';
// 使用scss混入
@include rounded;
</style>
```

![image-20220323122134536](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220323122134536.png)

### **导入方式 `@use `**

`@use`适合作为全局scss引用 和多scss文件引入 不会因为重名而造成覆盖 因为`@use`可以使用命名空间`as` 不会造成冲突(原理和Vue3 组合api一样)

* 需要导入的scss文件

```scss
// 变量
$errorColro: #ff3040;
$radius: 20px;
// 混入
@mixin rounded {
  .box {
    color: $errorColro;
    border-radius: $radius;
  }
}

```

* 导入scss 使用全局变量`$` 和 全局混入`@mixin` 

> 使用命名空间

* 使用`as`给其设置命名空间 使用`@mixin` 或者 `$`变量时候需要携带命名空间

```scss
<style lang="scss" scoped>
@use '~@/styles/config.scss' as three;
// 使用@mixin混入
@include three.rounded;
.control {
    // 使用scss变量
  color: three.$errorColro;
}
</style>
```

> 不使用命名空间

* 也可以不设置命名空间(重名会被覆盖) 给其设置`*`取消命名空间设置 用法和`@import`一样

```scss
<style lang="scss" scoped>
// 不设置命名空间  用法和@import一样
@use '~@/styles/config.scss' as *;
@include rounded;
.control {
  color: $errorColro;
}
</style>
```

### **js导入scss**

* 普通js文件导入scss就不需要携带@ 直接`import`即可

```js
import './styles/main.scss'
```

## 在项目中使用全局变量

* 全局scss导入分为 `@import`导入 和 `@use`导入
  *  `@use`导入更适合全局scss变量 和 全局scss混入
* <font color =#ff3040>sass-loader 的版本不同 所对应的全局变量属性名也不同 详细看版本问题的记录</font>

### **使用 `@use`导入作为全局scss**

*  `@use`更适合作为全局scss 因为`@use` 只会引入和执行一次。
* `@use`可以导入多个全局scss 但是只能存在一个默认命名空间`*` 多个`scss`全局scss需要单独设置其命名空间

> 第一步 创建一个scss全局变量文件

* 创建一个默认命名空间`*`的全局scss  `config.scss`

```scss
$errorColro: red;
$fontSize: 21px;
@mixin rounded {
  .boxD {
    font-size: $fontSize;
    background: yellow;
  }
}

```

* 创建一个带有命名空间的全局scss `setting.scss`

```scss
$errorColro: blue;
$fontSize: 21px;
@mixin rounded {
  .boxN {
    font-size: $fontSize;
    background: green;
  }
}

```

> 第二步 vue.config.js中配置scss全局

* <font color =#ff3040>注意: 必须安装脚手架 并且脚手架需要是Vue cil4 5版本 其他版本可能不适用</font>
* <font color =#ff3040>注意: 如果你没有`vue.config.js`文件 你直接在根路径手动创建一个即可</font>

![image-20220124145406718](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220124145406718.png)

* `@use`可以导入多个全局scss 但是只能存在一个默认命名空间`*` 多个`scss`全局scss需要单独设置其命名空间

```scss
module.exports = {
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 导入sass全局
        // 第一个全局scss是默认命名空间
        // 第二个全局scss是具备命名空间
        additionalData:
          `
           @use "./src/styles/setting.scss" as *;
           @use "./src/styles/config.scss" as three;
           
          `
      }
    }
  }
}

```

> 第三步 重启 重启 重启

* 关键 必须重启

> 第四步 在vue文件使用

* 具备命名空间的全局scss 需要添加命名空间的名称才能调用 而默认不需要
* 混入的类名不可以重名 如果类名重名依旧会导致覆盖

```vue
<template>
  <div class="default boxD">
    我是默认命名空间
  </div>
  <div class="name boxN">
    我是命名空间
  </div>
</template>
<script>
export default {
  name: 'ContRol'
}
</script>
<style lang="scss" scoped>
// 设置继承属性
%box {
  width: 300px;
  height: 200px;
}
// 默认命名空间的混入
@include rounded;
// 默认命名空间的混入
@include three.rounded;
// 命名空间的混入
.default {
  // 继承
  @extend %box;
  color: three.$errorColro;
}
// 命名空间的全局scss
.name {
  // 继承
  @extend %box;
  color: $errorColro;
}
</style>

```

* 效果图如下

![image-20220620191734047](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220620191734047.png)

## scss定义变量

* `!global`全局声明 我们可以通过`!global`在局部作用域中去定义一个全局都可以使用的变量**。**同样也可以通过`!default`在局部作用域中去覆盖一个全局变量的值

```scss
#main {
  $width: 5em !global;
  width: $width;
}
 
#sidebar {
  // 同样可以使用$width全局变量
  width: $width;
}
```

- `!default` !default表示默认值。降低变量的优先级。如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值

```scss
$color: #fff !default;
```

## scss注释

* Sass 除了支持标准的 CSS 多行注释` /* */`，还提供了单行注释` //`。前者会被完整输出到编译后的 CSS 文件中，而后者则不会。

```scss
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. 
 * 这块注释内容会出现在生成的css中*/
body { color: black; }
 
// These comments are only one line long each.
// They won't appear in the CSS output,
// since they use the single-line comment syntax.
// 这块注释内容不会出现在生成的css中
a { color: green; /* 这块注释内容也不会出现在生成的css中(在线的会。。？) */}

```

* 编译后

```css
/* This comment is
 * several lines long.
 * since it uses the CSS comment syntax,
 * it will appear in the CSS output. 
 * 这块注释内容会出现在生成的css中*/
body { color: black; }
 
a { color: green; }

```

## 在项目中导入通用样式

* 上面我们介绍了全局变量 那么我们做项目的时候 肯定也少不了通用样式 有时候多个页面用相同的样式 你还复制粘贴 多捞哦 通用样式配合全局变量舒服的一

> 第一步 设置通用样式的文件 `main.scss`

* 我们要配合全局变量来食用

```scss
.demoSize {
  color: $theme-color; /** 注意这个是全局变量 **/
}
```

> 第二步 在入口文件`main.js`中导入

![image-20220124150155345](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220124150155345.png)

* 我们在入口文件中 用`import`导入全局scss文件即可

```js
// 在main.js中导入全局css
import './styles/main.scss'
```

## 项目中使用全局scss

* 通常可以把清浮动 设置字体超出隐藏的样式设置为全局样式 方便调用

> 创建全局sass

* 通常在`styles`文件夹下面创建

```scss
// 全局scss
body {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
```

> 导入全局sacc

* 在Vue的入口文件`main.js`导入全局scss即可

```js
// 到入全局样式
import '@/styles/index.scss'
```

## 导入字体库

* 通过`@font-face` 设置路径`src` 和 名称`font-family`

```css
@font-face {
  font-family: "斗鱼追光体";
  src: url("./font/douyuFont-2.otf");
}
.demo{
	font-family: "斗鱼追光体"
}
```

## 清除默认样式

* npm下载清除默认样式包

```bash
npm i reset-css
```

* 在Vue的入口文件`main.js`中导入

```js
// 导入清除默认样式css
import 'reset-css'
```

## **sass-loader 版本问题**

* sass-loader v8以前的版本 属性名为 `data`
* sass-loader v8到v10的版本 属性名为 `prependData`
* sass-loader v10以后的版本 属性名为 `additionalData`

![image-20220330184039951](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220330184039951.png)



## 参考文献

[sass与scss的区别](https://blog.csdn.net/baozhuona/article/details/78570683)

[vue-cli4配置scss全局变量](https://blog.csdn.net/qq_23447231/article/details/109139195)

[vue-cli4.x 使用 scss 并配置全局变量使用](https://blog.csdn.net/weixin_44463883/article/details/109675792)

[sass-loder版本问题](https://www.cnblogs.com/xzybk/p/14379861.html)

[Sass/Scss中使用calc带入变量](https://blog.csdn.net/mouday/article/details/107769157?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-107769157-blog-103187855.pc_relevant_paycolumn_v3&spm=1001.2101.3001.4242.1&utm_relevant_index=3)

[SCSS 模块化 @use](https://lesscode.work/sections/621c2d75d20c1.html)

[【笔记】SASS学习](https://iseeu.blog.csdn.net/article/details/114012482?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-114012482-blog-107544235.pc_relevant_antiscanv2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-114012482-blog-107544235.pc_relevant_antiscanv2&utm_relevant_index=9)
