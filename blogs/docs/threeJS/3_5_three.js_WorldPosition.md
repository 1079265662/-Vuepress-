---
title: three.js 之 世界坐标
date: 2022-06-04
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-nmkyk1.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 世界坐标 <br>
:::

<!-- more -->

## 什么是世界坐标 和 局部坐标系

1. 世界坐标: 相对于three.js场景`scene`的xyz的坐标系
2. 局部坐标: 相对于模型自身的xyz的坐标系

![image-20220605193230284](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220605193230284.png)

* <font color =#ff3040>注意: 局部坐标依赖模型导出时自身的坐标 最好和建模约定好 自身坐标是从底部还是从顶部开始 下图的模型就是底部的几何中心坐标</font>

![image-20220605200907476](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220605200907476.png)

> 总结

* 世界坐标轴可以定位模型坐标 模型内部的局部坐标 依赖自身携带的坐标(3D软件设置的坐标)

## three.js获取世界坐标系

* 每个模型 都有独立的坐标`Position` 通过Object3D [.getWorldPosition](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.getWorldPosition) 方法获取到模型的世界坐标
* `Vector3`是threejs的三维向量对象,可以通过`Vector3`对象表示一个顶点的xyz坐标，顶点的法线向量。

```js
// 声明一个三维向量用来保存世界坐标
const worldPosition = new THREE.Vector3();
// 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中
mesh.getWorldPosition(worldPosition);
```

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
