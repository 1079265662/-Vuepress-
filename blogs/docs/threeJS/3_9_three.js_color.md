---
title: three.js 之 color颜色
date: 2022-09-07
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209071641591.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 color 颜色<br>
:::

<!-- more -->

## color介绍

* [Color](https://threejs.org/docs/index.html?q=color#api/zh/math/Color) 作为three.js颜色数学库
  * 支持css字符串风格、十六进制风格、RGB( 255,0,0 )、RGB( 1, 0, 0 )

```js
// 生成 0~1的 RGB( 1, 0, 0 )风格的颜色 Math.random()默认范围是0-1
const color = new THREE.Color(Math.random(), Math.random(), Math.random()) // const color7 = new THREE.Color( 1, 0, 0 );
const color3 = new THREE.Color("rgb(255, 0, 0)");
const color2 = new THREE.Color( 0xff0000 );
const color1 = new THREE.Color('#ff3040');
```

