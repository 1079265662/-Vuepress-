---
title: v-model 修饰符
date: 2021-06-18
cover: https://tva4.sinaimg.cn/large/005INI3Xly8grgw6y5tcij31ie0u0e4y.jpg
tags:
 - Vue
categories: Vue

---

::: tip 介绍

Vue中 v-model的三个修饰符<br>
:::

<!-- more -->

![7275569-98ed4f27758aa67b.png](https://tva4.sinaimg.cn/large/005INI3Xly8grino7rzf8j30p00anq3q.jpg)

## v-model 修饰符

在使用v-model绑定单行文本框时，还能用以下修饰符来实现某些需求

<font size=5>v-model的常用修饰符有以下几种</font>

1. lazy
2. number
3. trim
4. debounce（在Vue2.0后被移除）

## .lazy 修饰符

在默认情况下，`v-model` 在input事件中同步输入框的值与数据。

在添加了lazy之后，会把 `oninput` 事件改成 `onchange` 事件(失去焦点时候触发)

> 以下是核心代码

```vue
<input type="text" v-model.lazy="msg">
```

> 本例全部代码

```vue
<template>
  <div id="app">
    <input type="text" v-model.lazy="msg">
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  }
}
</script>
```

![7275569-6beeff14f77751a8](https://i.loli.net/2021/06/12/fuiackAZPQWjoMy.gif)

* 可以看到，input框输入的内容并不会实时更新到p标签里。因为这里使用了 `lazy` 修饰符，把 `oninput` 事件改成 `onchange` 事件。

## .number 修饰符

`number` 修饰符会把 `v-model` 的值转换成数值类型。

> 以下是核心代码

```vue
<input type="text" v-model.number="msg">
```

> 以下是本例全部代码

```vue
<template>
  <div id="app">
    <input type="text" v-model.number="msg">
    <p>{{msg}} : {{typeof(msg)}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  }
}
</script>
```

![1](https://i.loli.net/2021/06/13/Br9id8wKlQAxcDO.gif)

* 需要注意的是，如果输入的第一个字是字符串，那`number`这个修饰符就不会生效。
   输入的第一个只能是数字或者小数点或者是正负号。
* 从上图可以看到，如果一开始输入的是数字，后面跟着字符串。再`number`的转换后，会把后面的字符串删掉。

## .trim 修饰符

`trim`的作用是过滤用户输入时首尾的空格字符。

> 以下是核心代码

```vue
<input type="text" v-model.trim="msg">
```

> 以下是本例全部代码

```
<template>
  <div id="app">
    <input type="text" v-model.trim="msg">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  watch: {
    msg(newValue) {
      console.log(newValue);
    }
  }
}
</script>
```

![2](https://i.loli.net/2021/06/13/19WfVlO4Fv5I237.gif)

* 这里用了 `watch` 来监听 `msg` ，每当 `msg` 的值有更新，就会在控制台输出更新后的值。

* 从控制台可以看到，我们在值的前后输入空格，通过 `trim` 转换后得到的新值首位的空格都是被清除了。

  

><font size=5>[本文章转自](https://www.jianshu.com/p/ca4991611cd5)</font>

