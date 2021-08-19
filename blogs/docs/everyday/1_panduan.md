---
title: JS实用小技巧
date: 2021-08-18
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-o3lpzl.jpg
tags:
 - JavaScript
categories: JavaScript
---

::: tip 介绍
JS日常总结的使用小技巧 <br>
:::

<!-- more -->



## 通过二元判断对象中是否存在的数据

* 可以通过二元表达式 判断对象中是否存在该数据 进行一些特殊判断操作

> 假设如果 succ对象中 存在confirm数据 则进行一些操作

```js
    if(succ?.confirm){
	// 如果 succ对象中存在confirm数据 则进行一些操作
    }
```

## 结构赋值数组方式简单结构

* 如果需要结构的数据很少 可以通过数组方式结构

![image-20210819203952979](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210819203952979.png)

* 以上只有两组数据 就可以用数组方式 结构赋值
  * 按数组顺序 结构该两组数据 对应其索引值(下标)

```js
      // err 和 succ 对应两个返回的数据 对应其索引值(下标)
      const [err, succ] = await uni.requestPayment(payParams)
```

