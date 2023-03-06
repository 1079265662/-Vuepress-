---
title: three.js 之 Raycaster 光线投射
date: 2023-03-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211161902823.png
tags:
 - three.js
categories: three.js
---

::: tip 介绍
光线投射Raycaster选中物体进行交互实现<br>
:::

<!-- more -->

## 什么是光线投射

* [Raycaster](https://threejs.org/docs/index.html?q=ray#api/zh/core/Raycaster) 光线投射 以相机或其他能提供射线的物体为基准(比如一个静态物体), 通过鼠标的`X Y`轴(鼠标的`X Y`轴需要转换成[three.js需求的设备坐标](./5_4_mouse_XY.md)) 打出一个射线, 这个射线可以帮助我们选中物体, **支持多个/单个物体的`Object3D`数组集合 和 场景子对象`scene.children`的集合**
  * [.intersectObjects](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster.intersectObjects) 检测和射线相交的一组物体。**支持多个/单个物体的`Object3D`数组集合 和 场景子对象`scene.children`的集合**
  * [.intersectObject](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster.intersectObject) 检查与射线相交的单个物体。**需要单个物体的`Object3D`数组集合**

* <font color =#ff3040>注意: 需要把JS的`X Y`轴需要转换成[three.js需求的设备坐标](./5_4_mouse_XY.md) </font>

### **场景子对象`scene.children`的光线投射**

光线投射器可以投射`scene.children`中的场景所包含的所有物体(子对象)

```tsx
// 创建二维向量 用于记录鼠标的位置
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', ({ clientX, clientY }) => { // mousemove 鼠标移动事件 还可以替换其他时间click等
  // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
  mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
  mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的

  // 创建一个光线投射器
  const raycaster = new THREE.Raycaster()
  // 设置光线投射器的射线 通过setFromCamera()设置 传入鼠标的位置和相机
  raycaster.setFromCamera(mouse, this.camera)

  // 投射scene场景中含的所有物体(子对象)
  const cube = raycaster.intersectObjects(this.scene.children) // 会返回所有与射线相交的多个对象的数组
  
  // 遍历选中的立方体 批量修改
  cube.forEach((item) => {
    console.log(item.object)
    // 替换所选材质 item.object是Object3D类型 需要断言为Mesh类型
    // ;(item.object as THREE.Mesh).material = this.redMaterial
  })
})

```

### **多个/ 单个物体的`Object3D`数组集合**

[.intersectObjects](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster.intersectObjects) 默认的参数是不支持`Object3D`类型的, 但是它支持投射数组的方式`Object3D`类型集合, 比如: [`Object3D1`, `Object3D2`], 这样他就能通过投射检测这两个`Object3D`类型的物体只要其中之一投射到就返回投射信息

[.intersectObject](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster.intersectObject) 检查与射线相交的单个物体。**需要单个物体的`Object3D`数组集合**

```js
// 创建一个光线投射器
const raycaster = new THREE.Raycaster()
// 投射多个Object3D对象, 数组的形式
const spriteMeshRay = raycaster.intersectObjects([
  this.spriteMesh,
  this.iphone,
]) // 规定只要投射到这两个物体(其中之一), 就返回投射的信息

// 单个Object3D对象, 使用.intersectObject方法
const cube = raycaster.intersectObject(this.iphone) 

```
