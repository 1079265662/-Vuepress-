---
title: three.js 之 geometry
date: 2022-06-19
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-z8ev7o.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Loader 几何体<br>
:::

<!-- more -->

## 几何体介绍

* 创建一个物体 可以使用[Material](./3_1_three.js_Material.md)纹理材质 创建后的对象是[BufferGeometry](https://threejs.org/docs/index.html#api/zh/core/BufferGeometry) 几何对象

## 立体缓冲几何体(长方体 正方体)  `BoxGeometry`

* [BoxGeometry](https://threejs.org/docs/index.html?q=BoxGeometry#api/zh/geometries/BoxGeometry)立体缓冲几何体(长方体 正方体)

![image-20220619175804236](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220619175804236.png)

```js
   //! 1. 创建场景对象Scene
  const scene = new THREE.Scene()
   // 创建一个立方体几何对象Geometry
 const geometry = new THREE.BoxGeometry(100, 100, 100)
  // 获取图片网格材质
  const texture = new THREE.TextureLoader().load('https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%B0%8Fmao.jpg')
  // 使用网格材质
  const skyBoxMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  })
  // 网格模型对象Mesh 导入网格模型和网格才是
  content.mesh = new THREE.Mesh(geometry, skyBoxMaterial)
  // 添加到场景中去
  scene.add(mesh)
```

## 平面缓冲几何体(长方形 正方形) `PlaneGeometry`

* [PlaneGeometry](https://threejs.org/docs/index.html?q=PlaneGeometry#api/zh/geometries/PlaneGeometry) 平面缓冲几何体(长方形 正方形) 可以用来交叉创建一些立体的东西

![image-20220619175911604](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220619175911604.png)

```js
  // 矩形平面网格模型，用来渲染火焰的动画效果
  const w = 25// 宽度
  const h = 1.6 * w// 高度
  const geometry = new THREE.PlaneGeometry(w, h) // 矩形平面
```

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
