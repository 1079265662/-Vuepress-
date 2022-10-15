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

## 颜色随机

* [Mesh](https://threejs.org/docs/index.html?q=Mesh#api/zh/objects/Mesh) 网格中有两个参数 `Mesh( geometry : BufferGeometry, material : Material )`
  * geometry —— （可选）[BufferGeometry](https://threejs.org/docs/index.html?q=Geo#api/zh/core/BufferGeometry)的实例，默认值是一个新的`BufferGeometry`。这个是是面片、线或点几何体的有效表述 (比如 立方体 三角体 球体等)
  * material —— （可选）一个[Materials](https://threejs.org/docs/index.html?q=Material#api/zh/constants/Materials)，或是一个包含有Material的数组，默认是一个新的[MeshBasicMaterial](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/MeshBasicMaterial) 这个可以是贴图 也可以是纯色[Color](https://threejs.org/docs/index.html?q=Color#api/zh/math/Color) `material `数组可以根据几何体的面 进行设置

### **颜色随机的方法**

*  **RGB( 1, 0, 0 )风格的随机颜色**

```tsx
// 生成 0~1的 RGB( 1, 0, 0 )风格的颜色 Math.random()默认范围是0-1
const color = new THREE.Color(Math.random(), Math.random(), Math.random()) // const color7 = new THREE.Color( 1, 0, 0 );
```

* **十六进制的随机颜色**

```tsx
// 十六进制的随机颜色
const color = new THREE.Color(Math.random() * 0xffffff)
```

### **立方体的随机颜色**

* 设置[BoxGeometry](https://threejs.org/docs/index.html?q=BoxGeometry#api/zh/geometries/BoxGeometry) 六个面的随机颜色 通过[MeshBasicMaterial](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial) 基础材质设置六个面的随机颜色

```tsx
  // 创建一个立方体
  const sphere = new THREE.BoxGeometry(2, 2, 2)
  // 声明随机色数组
  const mats = []
  // 循环创建随机色
  for (let index = 0; index < sphere.groups.length; index++) {
    // 创建十六进制的随机色
    const color = new THREE.Color(Math.random() * 0xffffff)
    // 生成基础网格材质 并设置颜色
    const material = new THREE.MeshBasicMaterial({ color })
    // 把随机的颜色材质添加到数组中
    mats.push(material)
  }
  // 创建一个网格
  const sphereMesh = new THREE.Mesh(sphere, mats)
  // 把网格添加到场景中
  scene.add(sphereMesh)
```

