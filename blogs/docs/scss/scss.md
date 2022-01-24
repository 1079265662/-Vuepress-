---
title: scss在Vue中的学习
date: 2022-01-24
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/banner_6.jpg
tags:
 - Vue
 - scss
 - My project
categories: Vue
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

## scss的深度选择器

* sass中替换原类名 deep(深度选择器)
  * sass中 deep方法是 `::v-deep` 而 less里面的方法是 `/deep/`

![image-20210706214001467](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/WIbiCK6arP4HT13.png)

## scss的自定义变量

* sass的定义变量是 `$` 而less 定义变量是 `@`

![image-20210621202020367](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/NCdPoaOgJQmHEL9.png)

## scss文件的导入

* sass的导入自己文件方式 `@import '路径';` 没有from

  

```scss
@import "./element-ui.scss";
@import "./sidebar.scss";
@import "./btn.scss";
```

* 如果用到 `@` 需要在前面添加 `~`
  * 如果你不用`@` 直接 `../`或者`./` 就不需要 `~`

```scss
// sass导入样式文件时候 需要在@前面加一个 ~符号
@import '~@/styles/mixin.scss';
// 但是 如果你用 ../ 或者./ 就不需要加 
@import '../styles/mixin';
```

## js导入scss

* 普通js文件导入scss就不需要携带@ 直接`import`即可

```js
import './styles/main.scss'
```

## sass的混入

* <font color=#ff3040>注意: 混入的`@mixin`一般需要通过`@import`导入或注册全局样式 否则不同的scss文件混入是无法一起使用的</font>
* sass混入(导出)全局样式 `@mixin` 接收(导入)全局样式是 `@include`

![image-20210621202711224](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/9OnxNqmYL2etDAo.png)

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

  * css3特有的选择器，A>B 表示选择A元素的所有子B元素。
  * 与 A B的区别在于，A B 选择所有后代元素，而A>B只选择一代。

## 在项目中使用全局变量

* 我们在做项目的时候规范一点的话都会用到scss提供的全局变量的颜色 这样有利于页面的颜色的统一性 并且后期迭代十分的方便 上文介绍了

> 第一步 创建一个scss全局变量文件 `common.scss`

```scss
// 全局颜色变量
$theme-color: #ff3040;
$demo-color: #41b883;
```

> 第二步 vue.config.js中配置scss全局变量

* <font color =#ff3040>注意: 必须安装脚手架 并且脚手架需要是Vue cil4版本 其他版本可能不适用</font>
* <font color =#ff3040>注意: 如果你没有`vue.config.js`文件 你直接在根路径手动创建一个即可</font>

![image-20220124145406718](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220124145406718.png)

```js
module.exports = {
  devServer: {
    open: true
  },
  css: {
    loaderOptions: {
      scss: {
        // 导入全局变量
        prependData: `@import "./src/styles/common";`
      }
    }
  }
}

```

> 第三步 重启 重启 重启

* 关键 必须重启

> 第四步 在vue文件中调用即可

```scss
.demoSize {
  color: $theme-color;
}
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

## 参考文献

[sass与scss的区别](https://blog.csdn.net/baozhuona/article/details/78570683)

[vue-cli4配置scss全局变量](https://blog.csdn.net/qq_23447231/article/details/109139195)

[vue-cli4.x 使用 scss 并配置全局变量使用](https://blog.csdn.net/weixin_44463883/article/details/109675792)