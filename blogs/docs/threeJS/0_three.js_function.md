---
title: three.js 之 销毁
date: 2023-02-27
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302281043191.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 销毁模型和销毁场景<br>
:::

<!-- more -->

## three.js的场景销毁

three.js的场景销毁的销毁, 销毁整个画布的操作, 通常用于路由切换后的清除之前的画布, 动画和监听

* [Scene](https://threejs.org/docs/index.html?q=scene#api/zh/scenes/Scene)场景的基类是[Object3D](https://threejs.org/docs/index.html?q=Object3D#api/zh/core/Object3D), 其中`.clear()`方法, 可以清除所有子对象, 清除通过`.add()`添加的内容

* [OrbitControls](https://threejs.org/docs/index.html?q=controls#examples/zh/controls/OrbitControls) 轨道控制器提供了[.dispose( )](https://threejs.org/docs/index.html?q=controls#examples/zh/controls/OrbitControls.dispose) 销毁方法

* [WebGLRenderer](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer) webgl渲染器提供了两种销毁方法

  * .[dispose( )](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer.dispose) 销毁渲染器
  * [.forceContextLoss( )](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer.forceContextLoss) 模拟WebGL环境的丢失, 这种方法清除更彻底, 并且不会出现下图警告, 但是会让页面进行短暂的白屏

  ![image-20230227205254371](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302272053302.png)

* [cancelAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame) 清除[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame) 动画渲染
* [removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener) 清除代码中的监听事件

```js
// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 设置场景
const scene = new THREE.Scene()
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 动画渲染方法
const animationId = requestAnimationFrame()

// 清除场景, Object3D中的clear()方法, 清除所有子对象, 清除通过.add添加的内容
scene.clear()
// 清除轨道控制器
controls.dispose()
// 清除渲染器
renderer.dispose()
// 释放内存
// this.renderer.forceContextLoss()
// 清除动画
cancelAnimationFrame(this.animationId)
// 销毁监听
window.removeEventListener('resize', this.onWindowResize)

```

## three.js的物体销毁

通常我们会把物体装进一个[Group](https://threejs.org/docs/index.html?q=group#api/zh/objects/Group)组中, `Group`的基类是`Object3D`, 那么就存在两种销毁方法

* `.clear()`, 清除`Group`中所有子类, 清除通过`.add()`添加的内容
* [.remove(网格模型Mesh)](https://threejs.org/docs/index.html#api/zh/core/Object3D.remove) 删除指定的`Mesh`网格模型

最后还会通过[geometry](https://threejs.org/docs/index.html?q=geometry#api/zh/core/BufferGeometry) 几何对象[.dispose( )](https://threejs.org/docs/index.html?q=geometry#api/zh/core/BufferGeometry.dispose) 销毁方法, 把创建的几何对象也销毁掉, 如果觉得网格模型整体不会再出现, 还可以通过赋值为`null`触发js内存回收机制, 释放内存

```js
// 创建一个组
const glassPanel = new THREE.Group()
// 创建一个网格模型
const demoMesh = new THREE.Mesh(geometry, material)

// 销毁组中的全部子类
// glassPanel.clear()
// 销毁组中的网格模型
glassPanel.remove(this.demoMesh)
// 销毁该网格模型的几何对象
demoMesh.geometry.dispose()
// (可选)利用js内存回收机制, 清除创建的网格模型对象
demoMesh = null as null
```
