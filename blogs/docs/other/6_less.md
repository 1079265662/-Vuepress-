---
title: less样式预处理.md
date: 2021-08-07
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-3z5629.jpg
tags:
 - JavaScript
 - Vue
 - less
categories: JavaScript
---

::: tip 介绍
css扩展语言之一 less<br>
:::

<!-- more -->

## less 样式预处理介绍

[less样式预处理的官网](https://less.bootcss.com/)

* less是类似于scss的css扩展语言之一
* sass和less大部分规则一致
* less支持写法嵌套
* 支持变量: less是`@` sass使用的是`$`
* sass混入(导出)全局样式 `@mixin`  接收混入(导入)全局样式是 `@include`



## less深度选择器 `/deep/` (Vue2)

* sass中 deep方法是 `::v-deep` 而 less里面的方法是 `/deep/`
* 通常用覆盖组件(或者插件) 自带的样式 进行自定义样式设置

![image-20210722150940103](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/yXEb8o9jCKWNxma.png)

## less 自定义变量 `@`

*  less 自定义变量是 `@`
*  sass的定义变量是 `$`

![image-20210721084039748](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/Gz1fBLJ2qMpeY6R.png)

#### 导入less的自定义变量

> 手动引入使用其中的变量

* less文件 导入到Vue中 如果用到 `@` 需要在前面添加 `~`
  * 如果你不用`@` 直接 `../` 就不需要 `~`

```vue
<template>
  <!-- 一级路由出口 -->
  <router-view />
  <div class="test">我是测试文字</div>
</template>

<style lang="less" scoped>
// 引入我们定义了less变化的文件
// ~线不能丢
@import "~@/styles/variables.less";
.test {
  color: @xtxColor;
}
</style>
```

#### 自动化引入less变量

> 解决方案：使用vue-cli的style-resoures-loader插件来完成自动注入到每个vue组件中style标签中

* 通过安装第三方插件 实现无需引入 直接在Vue组件中调用less变量 就能使用less变量

(1) 在当前项目下执行一下命令`vue add style-resources-loader`，添加一个vue-cli的插件

* 这是脚手架插件 需要在生成的 `vue.config.js`文件中添加配置

![01.png](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/005INI3Xly8gspqruow10j30z50gb41t.jpg)

(2) 安装完毕后会在`vue.config.js`中自动添加配置，并且注入 如下：

* `vue.config.js`文件中添加配置

```js
// node.js导入路径的实例化方法
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 配置哪些文件需要自动导入
        // 导入less自定义变量的less文件
        path.join(__dirname, './src/styles/variables.less')
      ]
    }
  }
}

```

(3) <font color =#ff3040>配置后需要重启 </font>

总结：

1. 通过vue脚手架的插件，可以辅助自动化导入less文件
2. 后续其他组件在使用less变量时，就不再需要手动导入了

## less的函数样式方法(less混入)

* less支持css函数方法 相当于js代码中的函数方法 这样写的话 方便重用
* less默认函数方法需要导入 但是可以通过Vue插件 实现自动导入 无需导入 直接使用即可(需要重启)

> 设置less样式函数文件

* 通常我们会把less函数样式单独封装在一个less文件中

![image-20210722152452049](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/cyAj4YfBFe27LC1.png)

* 这时候 我们只需要`@import`导入即可使用 

### 自动化引入less函数样式方法(less混入)

* 如果安装了 vue-cli的style-resoures-loader插件(详见 less自定义变量) 
  * 直接配置 less函数样式方法的less文件即可
  * <font color =#ff3040>配置后需要重启 </font>

```js
// node.js导入路径的实例化方法
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 配置哪些文件需要自动导入
        // 导入less函数样式方法(less混入)的less文件
        path.join(__dirname, './src/styles/mixins.less')
      ]
    }
  }
}

```

## less里面的选择器 `&`

* `&` 在less中有两种意思

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

### less 中的 `&` 使用方法

* `&`交集选择器写法 (`&`没有空格)

```css
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

```css
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



## less 中的 `~`  和 `>`

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
  



## Vue3的深度选择器 `:deep()` (Vue3)

* 深度选择器通常作用于修改封装好组件的样式 覆盖组件之前的样式
* Vue3的深度选择器 `:deep(类名)`

```js
  // Vue3中深度选择器使用规则 :deep(类名)
   :deep(.xtx-carousel) {
    height: 380px;
   }
```



