---
title: JS的二次结构赋值使用方法
date: 2021-07-31
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-dpkloo.jpg
tags:
 - JavaScript
categories: JavaScript
---

::: tip 介绍
JS的二次结构赋值使用方法 <br>
:::

<!-- more -->

##  二次结构赋值方法使用案例 (方法1)

* 适合两层对象中 获取指定数据
* 利用二次结构指定对象 获取对象里面相应的对象的数据 (两层对象)

```js
  let demo = {二层对象:{获取二层对象指定的数据}} = 结构的一层对象
```

* 二次结构后的数据 可以再其他作用域直接调用

```js
  <script>
    // 设置一个需要结构赋值的对象
    const ret  = {
      result:{
      account: "admin1",
      avatar: "123333",
      id: "1422096022109622274",
      mobile: "13411111111",
      token: "34567",
      birthday: null,
      cityCode: null,
      gender: null,
      nickname: null,
      profession: null,
      provinceCode: null
      }
    }
    // 利用二次结构赋值 ret对象中result对象里面的不带null的值(两层)
   let demo = {result:{id, avatar, account, mobile, token}} = ret
   // 打印二次结构后的数据 可以再其他作用域直接调用
    console.log(id, avatar, account, mobile, token);
  </script>
```

## 二次结构赋值方法使用案例 (方法2)

* 也可以通过获取对象的方法 来实现二次结构赋值

```js
  <script>
    // 设置一个需要结构赋值的对象
    const ret  = {
      result:{
      account: "admin1",
      avatar: "123333",
      id: "1422096022109622274",
      mobile: "13411111111",
      token: "34567",
      birthday: null,
      cityCode: null,
      gender: null,
      nickname: null,
      profession: null,
      provinceCode: null
      }
    }
    // 通过获取对象的方法 来实现二次结构赋值
   let demo = {{id, avatar, account, mobile, token}} = ret.result
   // 打印二次结构后的数据 可以再其他作用域直接调用
    console.log(id, avatar, account, mobile, token);
  </script>
```

## 普通结构赋值方法使用案例

* 只有一层对象 获取指定数据
* 直接结构指定对象 获取指定数据即可

```js
  <script>
    // 设置一个需要结构赋值的对象
    const ret  = {
      account: "admin1",
      avatar: "123333",
      id: "1422096022109622274",
      mobile: "13411111111",
      token: "34567",
      birthday: null,
      cityCode: null,
      gender: null,
      nickname: null,
      profession: null,
      provinceCode: null
    }
    // 普通结构赋值直接获取即可
   let demo = {id, avatar, account, mobile, token} = ret
   // 打印二次结构后的数据 可以再其他作用域直接调用
    console.log(id, avatar, account, mobile, token);
  </script>
```

