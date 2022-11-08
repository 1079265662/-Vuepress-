---
title: three.js 点材质/粒子
date: 2022-11-01
cover: 
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 点材质/粒子效果<br>
:::

<!-- more -->

## 几何物体的点

* 一般物体是通过顶点进行相连形成的 通过[.wireframe](https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial) 可以将几何体渲染成线框（即渲染为平面多边形)

> 举个球体例子

* 比如一个球体就是通过顶点相连的分段形成的

```tsx
    // 声明一个球体
    const sphere = new THREE.SphereGeometry(3, 20, 20)
    // 声明一个标准材质
    const mmaterial = new THREE.MeshStandardMaterial({
      // 开启线框模式
      wireframe: true
    })
    // 创建网格模型
    const mesh = new THREE.Mesh(sphere, mmaterial)
    // 添加到场景
    scene.add(mesh)
```

* 开启线框的效果

![image-20221101203734896](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211012037980.png)

## Points点物体

[Mesh](https://threejs.org/docs/index.html?q=mesh#api/zh/objects/Mesh) 网格可以生成一个网格模型 [Points](https://threejs.org/docs/index.html?q=mesh#api/zh/objects/Points) 是点物体 生成的是一个由顶点构成的物体 也就是没有连线线框效果的物体

* `Points`点物体要搭配 [PointsMaterial](https://threejs.org/docs/index.html?q=PointsMaterial#api/zh/materials/PointsMaterial) 点材质才能生成
  * [.size](https://threejs.org/docs/index.html?q=PointsMaterial#api/zh/materials/PointsMaterial) 设置点的大小(类型`Number`)。默认值为`1.0` 默认值非常大 需要手动调整点的大小 比如`0.1`

> 举个球体例子

* 声明了一个球体 给其设置为点材质 

```tsx
    // 声明一个球体
    const sphere = new THREE.SphereGeometry(3, 20, 20)
    // 创建点材质
    const pmaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1
    })
    // 创建点模型
    const points = new THREE.Points(sphere, pmaterial)
    points.position.set(5, 0, 0)
    // 添加到场景
    scene.add(points)
```

* 展示效果

![image-20221101205137873](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211012051904.png)
