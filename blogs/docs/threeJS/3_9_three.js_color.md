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

[Color](https://threejs.org/docs/index.html?q=color#api/zh/math/Color) 作为three.js颜色数学库

* 支持css字符串风格、十六进制风格、RGB( 255,0,0 )、RGB( 1, 0, 0 ), HSL

* three.js 内部默认使用的是RGB风格颜色, 如果使用非RGB颜色, 那么three.js会自动转换成RGB风格颜色

  ![image-20230325160534836](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202303251605871.png)

```js
// 创建RGB风格颜色
const color = new THREE.Color(1, 1, 1)

// 如果使用非RGB颜色, 那么three.js会自动转换成RGB风格颜色
const color = new THREE.Color('#ff3040') // 字符串风格
const color = new THREE.Color(0x00577) // 十六进制风格
const color = new THREE.Color(255, 0, 0) // 其他RGB风格

```

three.js的color属性参数: 
* `.isColor`判断是否是颜色属性
* `.r` 红色通道的值在0到1之间。默认值为1。
* `.g` 绿色通道的值在0到1之间。默认值为1。
* `.b` 蓝色通道的值在0到1之间。默认值为1。

### 修改颜色

.[setHex](https://threejs.org/docs/index.html#api/zh/math/Color.setHex) 修改十六进制的颜色

.[setHSL](https://threejs.org/docs/index.html#api/zh/math/Color.setHSL) 修改HLS值颜色

.[setRGB](https://threejs.org/docs/index.html#api/zh/math/Color.setRGB) 修改RGB值颜色

.[setStyle](https://threejs.org/docs/index.html#api/zh/math/Color.setStyle) 修改css字符串颜色

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

## 颜色混入

* [.lerp(color, alpha)](https://threejs.org/docs/index.html?q=color#api/zh/math/Color.lerp) 设置颜色的混入效果 
  * `color ` 用于收敛的颜色。表示即将混入到那个颜色去
    `alpha ` 介于0到1的数字。表示混入的强度(越大混入颜色越深) 通常可以通过距离(或其他)方式进行计算 

```js
// 设置数量
const paramsConst = 10000
// 设置顶点颜色
const colors = new Float32Array(paramsConst * 3)

for (let index = 0; index < paramsConst; index++) {
  // 设置三个为一组
  const current = index * 3

  // 克隆颜色
  const mixColor = this.createdColor.clone()
  // 设置颜色混入
  mixColor.lerp(this.endColor, index / paramsConst)
  // 设置顶点颜色 rgb都要设置
  colors[current] = mixColor.r
  colors[current + 1] = mixColor.g
  colors[current + 2] = mixColor.b
}

```

