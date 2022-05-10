---
title: JS实用小技巧
date: 2022-05-10
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

* `?.`就算原数据没有 也不回报错 会返回`undefined` 而不是直接报错

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
      console.log(err) // null
 	  console.log(succ); // {......}
```

## 声明方法结构传值

疑问: 有时候我们会封装一些通用方法 通用方法如果需要传参过多 会导致非常难管理 有些参数我不想传 想用默认值 我们可不可以指定传参呢 

解答: 我们可以给方法传入对象`Object` 然后再声明的方法中解构对象 这样就可以实现我们 按需传值 而非传统的无序排列传参

```js
// 声明一个通用方法
/**
 * @example this.$addNull(array,name,id)
 * @author 刘凯利
 * @function 添加空的可选值 id为0
 * @param {Object} obj 参数合集
 * @param {Array} obj.array 要添加的数组
 * @param {String} obj.id 渲染id
 * @param {String} obj.name 名称
 */
export default function addNull (obj) {
  // 结构传参的对象
  const { array, id, name  } = obj
  ... 方法干的事情
}

// 外部使用该方法
addNull({
    // 传递array 参数
    array: [2333,3333],
    // 不想传id 直接传name
    name: '不传id'
})
```

* 通过方法内 解构参数对象 实现按需传参的需求
