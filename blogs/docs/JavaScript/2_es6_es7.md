---
title: JS的es6 es7 新特性
date: 2022-07-12
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-286rwm-min.jpg
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

## es6的动态属性名(键)

* es6支持动态绑定属性名(键) 可以通过三元表达式 来动态切换属性名(键)

> 演示案例

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

## 动态方法

* 通过三元表达式配合[匿名函数](https://zh.javascript.info/var#iife)进行方法的动态判断

```js
  let name = '小刘'
  let age = 18
  let saySome = true

  // 方法A
  function sayName (name, age) {
    console.log(`我叫${name}`)
  }
  // 方法B
  function sayOld (name, age) {
    console.log(`今年${age}岁`)
  }

  // 根据三元表达式 进行方法的动态
  const ret = (saySome ? sayName : sayOld)(name, age)
```

## 给方法设置默认值

* 在es6中可以给方法在形参中设置默认值` (参数 = 默认值)` 代替之前的[|| 逻辑或赋值 ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)参数[虚](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)值(`undefined`)时赋值
* <font color =#ff3040>注意: 不能省略括号 箭头函数只有一个参数的时候 可省略括号 但是赋值默认值的情况 不可省略</font>

```js
// es6之前使用默认值的方法
  const animal = type => {
  // 判断type是否为虚值 如果是那么赋值一个默认值
    type = type || 'cat'
    console.log(type)
  }
  animal() // 通过 || 判断为虚值(undefined)时候赋值为cat

// es6给方法设置默认值
  const animal = (type = 'cat') => { // 注意: 不能省略括号 (箭头函数只有一个参数的时候 可省略括号 但是赋值默认值的情况 不可省略)
    console.log(type)
  }
  animal() // cat
```



## 参考文献

[展开运算符](http://java18.cn/detailPage?id=2c9ec65b7fee4db0017ffef1d5a90023)

[ES6就是ES2015 的主要内容 ](https://www.cnblogs.com/lanyueff/p/6252275.html#:~:text=%E5%9B%A0%E4%B8%BA%E5%BD%93%E5%89%8D%E7%89%88%E6%9C%AC%E7%9A%84ES6%E6%98%AF%E5%9C%A82015%E5%B9%B4%E5%8F%91%E5%B8%83%E7%9A%84%EF%BC%8C%E6%89%80%E4%BB%A5%E5%8F%88%E7%A7%B0ECMAScript%202015%E3%80%82,%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8CES6%E5%B0%B1%E6%98%AFES2015%E3%80%82%20%E8%99%BD%E7%84%B6%E7%9B%AE%E5%89%8D%E5%B9%B6%E4%B8%8D%E6%98%AF%E6%89%80%E6%9C%89%E6%B5%8F%E8%A7%88%E5%99%A8%E9%83%BD%E8%83%BD%E5%85%BC%E5%AE%B9ES6%E5%85%A8%E9%83%A8%E7%89%B9%E6%80%A7%EF%BC%8C%E4%BD%86%E8%B6%8A%E6%9D%A5%E8%B6%8A%E5%A4%9A%E7%9A%84%E7%A8%8B%E5%BA%8F%E5%91%98%E5%9C%A8%E5%AE%9E%E9%99%85%E9%A1%B9%E7%9B%AE%E5%BD%93%E4%B8%AD%E5%B7%B2%E7%BB%8F%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8ES6%E4%BA%86%E3%80%82)
