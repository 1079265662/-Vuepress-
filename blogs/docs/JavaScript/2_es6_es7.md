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

## 展开运算符 (扩展运算符)

* [...](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 三个点（...）真名叫`展开运算符`或 `扩展运算符`，是在ES6中新增加的内容，它可以在函数调用/数组构造时，将数组表达式或者`String`在语法层面展开；还可以在构造字面量对象时将对象表达式按照`key`-`value`的方式展开。
* 只要能被[for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)迭代(渲染)的内容 都可以使用 展开运算符 ([Symbol ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)唯一的标识符 和 [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)数字类型除外)
* 被展开的东西，就是一段用逗号分隔的代码，那么从`语法层面`，展开的内容可以放在任何它可以存在的地方。

### **字符串展开**

* 字符串可以用`...`展开，展开成逗号分割的元素集合。

```js
  const str = "abc"
  console.log(...str) // a b c

  // 等同于
  console.log('a', 'b', 'c');
```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/905656d5-6002-46a0-bd57-f656c0c0b7ed.png)

### **数组展开**

* 数组也支持[for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 迭代那也能被展开

```js
  const arr = [1, 2, 3]
  const Json = [
    {
      name: '小王',
      old: '13'
    },
    {
      name: '小绿',
      old: '16'
    }
  ]
  console.log(...arr) // 1 2 3
  console.log(...Json) // {name: '小王', old: '13'} {name: '小绿', old: '16'}
```

### **展开对象内容**

* 如果对象通过以上数组 字符串 方式直接展开会报错 不能使用扩展用算符展开 对象的`key`: `value` 的形式

```js
const Obj = {
  name : 'keke',
  age: 12
}

// 直接扩展对象
console.log(...Obj)
// 相当于这样写
console.log(name : 'keke',age: 12) // 哪里有这样写的变量 肯定会报错
```

* 会被浏览器报错

![image-20220712201835921](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220712201835921.png)

* 正确写法 需要用`{}`包起来`key`: `value` 的形式

```js
// 正确的写法
console.log({...Obj})
// 相当于
console.log({name : 'keke',age: 12})
```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/f1483584-8bb5-4644-84c5-c5a329e06ee4.png)

* 对象结构常用于Vue中的赋值 某些数据直接赋值可能会导致数据出现双向绑定问题(比如父子传值) 所以可以使用这种方式进行对象的结构 (当然前提是对象格式)
* 展开运算符对于 对象来说通常是用作混入的方法

### **展开运算符的混入(拼接)**

* 通过`...`展开运算符 可以混入多个对象 
* 如果存在相同`key`键名(属性名) 取新添加的`key`键名(属性名)
* <font color =#ff3040>混入对象的时候 外层一定要有`{}` 从展开的层面理解为`{key: value, key: value}`</font>

> 单个对象的混入

```js
  const Obj = {
    name: '小刘',
    old: '18'
  }

  // 单个对象的混入
  console.log({ ...Obj, ...{ hobby: '学习' } }) // {name: '小刘', old: '18', hobby: '学习'}
```

> 多个对象的混入

```js
  const Obj = {
    name: '小刘',
    old: '18'
  }

  const Obj2 = {
    hobby: '学习',
    girl: '没有'
  }
  // 多个对象的混入
  console.log({ ...Obj, ...Obj2 }) // {name: '小刘', old: '18', hobby: '学习', girl: '没有'}
```

### **展开内容的存放**

* 展开的内容可以放在任何它可以存在的地方，这是**展开运算符**的精华所在。
* 上面我们已经说了，被`...`展开的东西，就是一段用逗号分隔的代码，那么从语法层面，展开的内容可以放在任何它可以存在的地方。

> 展开后存放在 数组中

* 字符串通过`...`展开后 存放在数组中

```js
const str = "abc"
const strArr = [...str]
// 通过数组 储存展开运算符的数据
console.log(strArr) // ['a', 'b', 'c']
```

![img](http://java18.cn/upload/20220407/a5adca7d-377d-4c7e-b57a-afc7cd3429ce.png)

> 展开后存放在 对象中

* 普通函数[function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)方法的传参中 也可以使用`...`展开后的内容

```js
// 声明扩展内容
const str = "123"
// 声明方法
function add(num1,num2,num3){
  console.log((num1 - 0) + (num2 - 0) + (num3 - 0))
}
// 通过展开运算符进行传参
add(...str) // 6
```

### **作用到浅拷贝**

* 

### **报错参考**

* 当你语法错误或 展开了无法展开的内容([Symbol ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)唯一的标识符) 会报

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/ffbad3c0-5633-4d96-b1c9-2aa9fc88ef9f.png)

* 当你试图展开`Number`类型的数据 或 直接展开对象 会报

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/43857ef0-79d2-4789-9d3d-8d6b6260729d.png)

![image-20220712201334357](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220712201334357.png)

 

## 给方法设置默认值



## 参考文献

[展开运算符](http://java18.cn/detailPage?id=2c9ec65b7fee4db0017ffef1d5a90023)

[[ES6就是ES2015 的主要内容 ](https://www.cnblogs.com/lanyueff/p/6252275.html)](https://www.cnblogs.com/lanyueff/p/6252275.html#:~:text=%E5%9B%A0%E4%B8%BA%E5%BD%93%E5%89%8D%E7%89%88%E6%9C%AC%E7%9A%84ES6%E6%98%AF%E5%9C%A82015%E5%B9%B4%E5%8F%91%E5%B8%83%E7%9A%84%EF%BC%8C%E6%89%80%E4%BB%A5%E5%8F%88%E7%A7%B0ECMAScript%202015%E3%80%82,%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8CES6%E5%B0%B1%E6%98%AFES2015%E3%80%82%20%E8%99%BD%E7%84%B6%E7%9B%AE%E5%89%8D%E5%B9%B6%E4%B8%8D%E6%98%AF%E6%89%80%E6%9C%89%E6%B5%8F%E8%A7%88%E5%99%A8%E9%83%BD%E8%83%BD%E5%85%BC%E5%AE%B9ES6%E5%85%A8%E9%83%A8%E7%89%B9%E6%80%A7%EF%BC%8C%E4%BD%86%E8%B6%8A%E6%9D%A5%E8%B6%8A%E5%A4%9A%E7%9A%84%E7%A8%8B%E5%BA%8F%E5%91%98%E5%9C%A8%E5%AE%9E%E9%99%85%E9%A1%B9%E7%9B%AE%E5%BD%93%E4%B8%AD%E5%B7%B2%E7%BB%8F%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8ES6%E4%BA%86%E3%80%82)
