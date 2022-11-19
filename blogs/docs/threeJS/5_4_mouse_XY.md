---
title: three.js 屏幕坐标系转换
date: 2022-11-16
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211161553849.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
JS/Css坐标转换three.js需求的设备坐标<br>
:::

<!-- more -->

## JS/Css中的坐标

* 通过JS`mousemove`或者其他时间监听获取的`X Y`坐标 是基于屏幕的坐标系 他没有负数 是相对于全局（屏幕）的 `X Y`坐标
* 在three.js中需要把JS获取到的坐标轴转换为设备坐标

![image-20221116153720839](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211161537865.png)

## 进行设备坐标转换

* 通过 `当前JS/Css坐标 / 屏幕的大小 * 2 - 1 ` 求-1到1坐标
  * `当前JS/Css坐标 / 屏幕的大小 - 0.5`  求-0.5到0.5坐标 (设备坐标的一半)
  * `Y`轴需要反转`-`一下 因为在JS/CSS坐标中`Y`轴是反的
  

```js
// 创建二维向量 用于记录鼠标的位置
    const mouse = new THREE.Vector2()
    window.addEventListener('mousemove', ({ clientX, clientY }) => {
      // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
      mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
      mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的
    })
```

