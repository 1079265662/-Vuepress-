---
title: JS的es6 es7 新特性
date: 2021-07-13
cover: https://i.loli.net/2021/07/20/oUWIJPh4GSgMzXi.jpg
tags:
 - JavaScript
categories: JavaScript
---

::: tip 介绍
JS的es6 es7的一些经典新特性 <br>
:::

<!-- more -->

## 属性名和属性值 赋值es6规则

* 如果属性名 属性值 两者名称一致 可以简写一个名

>属性名属性值一致 赋值 老方法

属性名 : 属性值00000 

```js
info : info
```

> es6规则 可以简写成一个

```js
info  // 属性名 和 导入的熟悉值名称一样 可以省略一个
```

## 键值对 es6规则 (Vue `methods` es6函数方法声明)规则

* es6提供了 函数方法声明的简写 更方便使用函数方法声明

>对象函数方法键值对 老写法

```js
方法名: function(){
}
```

> es6键值对函数方法新写法

```js
//省去了function
方法名(){ 
}
```

### Vue `methods` es6函数方法声明

> 老方法的 `methods:`函数方法声明 `async` 函数方法

```js
方法名 : async function(){

}
```

> es6 的`methods:`函数方法声明 `async` 函数方法

```js
//省去了 : 和 function
async 方法名(){ 

}
```

## es6的动态属性名(键)

* es6支持动态绑定属性名(键) 可以通过三元表达式 来动态切换属性名(键)

> 演示案例

* 直接用字符串 绑定动态属性名
  * 通过字符串绑定的动态属性名 就是直接命名 

```js
// 创建一个 控制动态属性名的状态位
const flag = true

const obj = {
// 创建三元表达式 动态切换属性名 (字符串直接动态绑定属性名)
[flag ? 'msg' : 'info']: '动态属性名字符串直接绑定'
}
```

* 通过变量方式 绑定动态属性名
  * 通过变量绑定的动态属性名 变量里的内容 才是真正的属性名

```js
// 创建一个 控制动态属性名的状态位
const flag = true
// 创建动态绑定属性名的变量
const msg = 'mag'
const info = 'info'

const obj = {
// 创建三元表达式 动态切换属性名 (通过对象方式 绑定对象内容为属性名)
[flag ? msg : info]: '动态属性名字符串直接绑定'
}
```



