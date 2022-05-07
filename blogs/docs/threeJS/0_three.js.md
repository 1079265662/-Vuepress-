---
title: three.js学习记录
date: 2022-04-01
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-y8lqo7.jpg
tags:
 - three.js
categories: three.js
sticky: 4
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
* 在使用三坐标时，会设置x，y，z轴，其实这三个轴就是立体空间的三个方向，即横竖纵三轴，一般情况下常规定义x为横 轴，y为纵轴，z为竖轴。

![image-20220424174721556](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220424174721556.png)



* 在three.js中[三维物体（Object3D）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D)作为基类API 可以提供很多关于坐标和三维物体有关的方法

## three.js的渲染步骤

* three.js的三大组件之一 必要元素
  1. 创建场景对象`Scene`
     * 创建网格模型 `Mesh`
     * 光源设置(非必选) `DirectionalLight`
  2. 相机设置 `Camera`
  3. 创建渲染对象 (绑定页面的元素) `WebGLRenderer`
* 创建场景+ 相机 是组成three.js的重要步骤 他俩完成后 然后通过three.js插入到页面的元素中(以`canvas`方式绘制)

> 先来一个小案例

* <font color =ff3040>注意: `Scene()场景对象` 和 `Mesh()网格模型对象`  需要使用`toRaw()`取消其代理 其他的元素正常写即可 否则会报错 详细[看这里](./2_three.js_vue3_error.md)</font>
  * 在Vue3中 如果我们想在指定区域渲染 需要通过`ref`选中该元素的Dom 然后通过`appendChild(.domElement)` 进行渲染

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
  const s = 200 // 控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越小
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

## three.js辅助内容

* 记录非three.js核心的内容 这些基本上都是控件之类的 用来提供页面中的交互效果 

### 轨道控制器 OrbitControls

* 听起来感觉很牛逼的感觉 实际上就是相机围绕目标进行轨道运动的效果 [官方介绍](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)
* <font color=#ff3040>注意: 使用轨道控制器之前 需要开启`requestAnimationFrame()`动画 否则轨道控制器会失效 [详细看这里](./1.1_three.js_js)</font>

```js
// 执行动画
const start = () => {
  // 获取场景对象
  const scene = toRaw(content.scene)
  // 执行渲染
  content.renderer.render(scene, content.camera)
    // 开启动画
  requestAnimationFrame(start)
}
```

> 使用轨道控制器

* 作为控件`OrbitControls`需要单独导入 
* 使用方法: `new OrbitControls(物体的相机设置, 渲染对象.domElement)`

```vue
// 导入OrbitControls控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
<script setup>
// 使用three.js 轨道控制器
const OrbitControlsF = () => {
  // 使用轨道控制器
  // 创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
  // 旋转：拖动鼠标左键
  // 缩放：滚动鼠标中键
  // 平移：拖动鼠标右键
  const controls = new OrbitControls(物体的相机设置, 渲染对象.domElement)
}
</script>
```

### 开启XYZ轴辅助线 THREE.AxesHelper()

* 开启XYZ轴辅助线可以帮助我们调试物体的位置 [官方介绍](https://threejs.org/docs/index.html?q=AxesHelper#api/zh/helpers/AxesHelper)
* `THREE.AxesHelper(轴线长度 默认是1)`

![image-20220424174721556](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220424174721556.png)

```js
// 使用three.js三维坐标轴辅助
const coordinate = () => {
  // 获取场景对象
  const scene = toRaw(content.scene)
  scene.add(new THREE.AxesHelper(249))
}
```

## 自适应页面的尺寸

* 通过`window.onresize`监听页面尺寸是否改变 重新给画布赋值 并更新摄像机投影矩阵

```js
// 声明需要的参数
const content = reactive({
  // 宽高
  width: window.innerWidth,
  height: window.innerHeight,
  // 相机的渲染尺寸
  cameraSize: 200,
  // 声明场景对象Scene
  scene: null,
  // 声明网格模型mesh
  mesh: null,
  // 声明相机camera
  camera: null,
  // 创建渲染器对象
  renderer: null,
  // 创建动画
  animation: null,
  // 动画速度
  speed: 0.1
})  
// 随页面尺寸进行渲染
const updateCamera = () => {
  // 监听页面尺寸是否修改
  window.onresize = () => {
    // 获取新的尺寸数据
    content.width = window.innerWidth
    content.height = window.innerHeight
    // 重新渲染场景
    content.renderer.setSize(content.width, content.height)
    // 更新相机参数 不更新相机参数 会导致相机内容拉伸
    const k = content.width / content.height // Three.js输出的Canvas画布宽高比
    const s = content.cameraSize// 控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大
    content.camera.left = -s * k
    content.camera.right = s * k
    content.camera.top = s
    content.camera.bottom = -s
    // 更新相机参数后执行
    content.camera.updateProjectionMatrix()
  }
}
```

## three.js中常用Object3D方法

* 这是Three.js中大部分对象的基类，提供了一系列的属性和方法来对三维空间中的物体进行操纵。详细看这里[三维物体（Object3D）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D)
* 请注意，可以通过.add( object )方法来将对象进行组合，该方法将对象添加为子对象，但为此最好使用Group（来作为父对象）

### **旋转角度 rotateX rotateY rotateZ**

* 旋转X Y Z轴的角度 让内容朝某个方向转起来

```js
物体的网格对象(Mesh).rotateY(速度(0.1)) // rotateX rotateY rotateZ
```

