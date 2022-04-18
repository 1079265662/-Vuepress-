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

## 结构赋值数组方式简单结构

* 如果需要结构的数据很少 可以通过数组方式结构

![image-20210819203952979](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210819203952979.png)

* 以上只有两组数据 就可以用数组方式 结构赋值
  * 按数组顺序 结构该两组数据 对应其索引值(下标)

```js
      // err 和 succ 对应两个返回的数据 对应其索引值(下标)
      const [err, succ] = await uni.requestPayment(payParams)
```

##  二次结构赋值方法使用案例 (方法1)

* 适合两层对象中 获取指定数据
* 利用二次结构指定对象 获取对象里面相应的对象的数据 (两层对象)

```js
  let demo = {二层对象:{获取二层对象指定的数据}} = 结构的一层对象
```

* 二次结构后的数据 可以再其他作用域直接调用

```js
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
  // 打印结构后的所有数据
	console.log(demo)
```

## 二次结构赋值方法使用案例 (方法2)

* 也可以通过获取对象的方法 来实现二次结构赋值

```js
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
  // 打印结构后的所有数据
	console.log(demo)
```

## 普通结构赋值方法使用案例

* 只有一层对象 获取指定数据
* 直接结构指定对象 获取指定数据即可

```js
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
```

### 给结构的数据起名

* 数据结构后 可以再次给结构的数据命名

```js
    // 结构传来的参数id 给结构id改名叫ids
	getItem ({ id: ids }) {
       console.log(ids); // 值和结构id的值一样
    },
```

