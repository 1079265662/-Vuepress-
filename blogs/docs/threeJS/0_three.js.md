---
title: three.js学习记录
date: 2022-04-01
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-y8lqo7.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
学习中.....<br>
:::

<!-- more -->

## 学习three.js

* webgl作为前端物联网的一部分 值得学习 
* [three.js](https://threejs.org/docs/#manual/zh/introduction/Creating-a-scene)作为webgl的框架

> 框架选择

Vue3.2 + Vue cli5 + three.js 

## 导入three.js

* 第一步 npm下载three.js

```bash
npm install --save three
```

* 第二步 在Vue3中使用three某个功能
  * three.js在Vue3中可以使用结构 来调用某些控件(方法)

```vue
<template>
  <div>
  </div>
</template>

<script setup>
// 导入Vue组合API
import { onMounted } from 'vue'
// 导入three
import * as THREE from 'three'
onMounted(() => {
  box()
})
// 创建一个盒子
const box = () => {
  // 创建一个场景对象
  const scene = new THREE.Scene()
  console.log(scene)
}
</script>
<script>
export default {
  name: 'HomeView'
}
</script>

```

## 学习three.js前置知识

* 持续记录哦
  * three.js常用的js方法看[这里](./1.1_three.js_js)

### **三维物体（Object3D）**

* 3d的东西肯定有 `x轴z轴y轴`
* 在使用三坐标时，会设置x，y，z轴，其实这三个轴就是立体空间的三个方向，即横竖纵三轴，一般情况下常规定义x为横轴，y为纵轴，z为竖轴。

![bf096b63f6246b60f926c6e5f9f81a4c510fa273](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/bf096b63f6246b60f926c6e5f9f81a4c510fa273.jpg)



* 在three.js中[三维物体（Object3D）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D)作为基类API 可以提供很多关于坐标和三维物体有关的方法

## three.js的一个渲染步骤

* three.js的三大组件之一 必要元素
  1. 创建场景对象`Scene`
     * 创建网格模型
     * 光源设置(非必选)
  2. 相机设置
  3. 创建渲染对象 (绑定页面的元素)
* 创建场景+ 相机 是组成three.js的重要步骤 他俩完成后 然后通过three.js插入到页面的元素中(以`canvas`方式绘制)

> 先来一个小案例

* <font color =ff3040>注意: `Scene()场景对象` 和 `Mesh()网格模型对象`  需要使用`toRaw()`取消其代理 其他的元素正常写即可 否则会报错 详细[看这里](./2_three.js_vue3_error.md)</font>

```vue
<template>
  <div>
    <div ref="stateDom" />
  </div>
</template>

<script setup>
// 导入Vue组合API
import { onMounted, reactive, ref, toRefs } from 'vue'
// 导入three
import * as THREE from 'three'
// 声明需要的参数
const content = reactive({
  // 宽高
  width: 800,
  height: 600,
  // 声明场景对象Scene
  scene: null,
  // 声明网格模型mesh
  mesh: null,
  // 声明相机camera
  camera: null,
  // 创建渲染器对象
  renderer: null
})
// 获取元素的Dom
const stateDom = ref(null)
// 结构
const { width } = toRefs(content)
//! 开始threejs的渲染步骤
const box = () => {
  console.log(width.value)
   // 1. 创建场景对象Scene
  content.scene = new THREE.Scene()
  // 把创建场景对象 转换为普通对象格式
  const scene = toRaw(content.scene)
  // 2. 创建网格模型
  const geometry = new THREE.BoxGeometry(100, 100, 100) // 创建一个立方体几何对象Geometry
  // 材质对象Material
  const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff // 材质颜色
  })
  // 网格模型对象Mesh
  content.mesh = new THREE.Mesh(geometry, material)
  // 把创建网格模型对象 转换为普通对象格式
  const mesh = toRaw(content.mesh)
  scene.add(mesh) // 网格模型添加到场景中
  // 3. 光源设置
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
  directionalLight.position.set(400, 200, 300)
  scene.add(directionalLight)
  // 环境光
  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)
  // 4. 相机设置
  const k = content.width / content.height // Three.js输出的Canvas画布宽高比
  const s = 200 // 控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大
  // THREE.OrthographicCamera()创建一个正投影相机对象
  // -s * k, s * k, s, -s, 1, 1000定义了一个长方体渲染空间，渲染空间外的模型不会被渲染
  content.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  content.camera.position.set(200, 300, 200) // 相机在Three.js坐标系中的位置
  content.camera.lookAt(0, 0, 0) // 相机指向Three.js坐标系原点
  // 5. 创建渲染器对象
  content.renderer = new THREE.WebGLRenderer({
    antialias: true // 开启锯齿
  })
  content.renderer.setPixelRatio(window.devicePixelRatio)// 设置设备像素比率,防止Canvas画布输出模糊。
  content.renderer.setSize(content.width, content.height) // 设置渲染区域尺寸
  content.renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色
  //  domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
  stateDom.value.appendChild(content.renderer.domElement) // body元素中插入canvas画布
  // 执行渲染操作   指定场景、相机作为参数
  content.renderer.render(scene, content.camera)
}
onMounted(() => {
  // 渲染threejs的立体几何对象
  box()
})

</script>
<script>
export default {
  name: 'HomeView'
}
</script>
<style lang="scss" scoped>
</style>
```



