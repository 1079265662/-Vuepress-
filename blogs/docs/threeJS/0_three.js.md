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

* 如果使用TS 要安装TS版本

```bash
npm install --save @types/three
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

### **三维物体（Object3D）**

* 3d的东西肯定有 `x轴z轴y轴`
* 在使用三坐标时，会设置x，y，z轴，其实这三个轴就是立体空间的三个方向，即横竖纵三轴，一般情况下常规定义x为横 轴，y为纵轴，z为竖轴。

![image-20220424174721556](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220424174721556.png)



* 在three.js中[三维物体（Object3D）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D)作为基类API 可以提供很多关于坐标和三维物体有关的方法

## three.js的渲染步骤

* three.js的三大组件之一 必要元素
  1. 创建场景对象 [Scene](https://threejs.org/docs/index.html?q=Scene#api/zh/scenes/Scene)
  2. 创建网格模型 [Mesh](https://threejs.org/docs/index.html?q=Mesh#api/zh/objects/Mesh), 基类是 [Object3D](https://threejs.org/docs/index.html#api/zh/core/Object3D)
     *  可包含材质 [Material](https://threejs.org/docs/index.html?q=Material#api/zh/constants/Materials)
     *  颜色 [Color](./3_9_three.js_Color.md)
     *  纹理 [Texture](./4_three.js_Texture.md)
  3. 创建相机 [Camera](https://threejs.org/docs/index.html?q=Camera#api/zh/cameras/Camerad)
  4. 光源的设置(非必须) [Light](https://threejs.org/docs/index.html?q=DirectionalLight#api/zh/lights/Light)
  5. 创建渲染器 [WebGLRenderer](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer)
  6. 把渲染器绑定到指定页面元素上(可通过 [element.appendChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)进行绑定)通过 [canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)渲染 [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
  7. 通过 [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)更新动画API实现实时渲染画布的效果(非必须 通常配合 [OrbitControls](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)轨道控制器使用)

> 纯JS的简单案例

* 通过必要步骤 实现three.js基础渲染过程 并把webgl绑定到指定页面元素上(Dom元素上)

```js
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
/**
 *
 * @param {*} nameCanvas 接收页面传来的页面Dom元素
 */

export default function getScene (nameCanvas) {
  // 1. 创建three.js场景
  const scene = new THREE.Scene()

  // 2. 创建一个透视相机
  const camera = new THREE.PerspectiveCamera(
    // 视觉角度
    75,
    // 相机纵横比 取整个屏幕 宽 / 高
    window.innerWidth / window.innerHeight,
    // 相机的进截面 (近距离不可见范围)
    0.1,
    // 远截面 (远距离不可见范围)
    1000
  )
  // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
  camera.position.set(0, 0, 10) // 默认没有参数 需要设置参数
  // 把相机添加到场景中
  scene.add(camera)

  // 创建一个在网格模型中展示的几何体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1) // 默认就是1,1,1 宽高深度
  // 设置该集合体的纹理材质
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#abe2e5' }) // 支持CSS颜色设置方式 但是需要字符串格式

  // 3. 创建一个网格模型 放入创建的几何体和其自身材质
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // Mesh(几何体, 纹理材质)
  // 将几何体添加到场景中
  scene.add(cube)

  // 添加辅助线
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
    
  // 4. 创建一个渲染器
  const renderer = new THREE.WebGLRenderer({
       antialias: true // 开启锯齿
  })
  // 设置渲染器(画布)的大小 通过setSize()设置
  renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)

  // 5. 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
  nameCanvas.appendChild(renderer.domElement)

  // 6. 创建创建一个轨道控制器 实现交互渲染
  const controls = new OrbitControls(camera, renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
  // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
  controls.enableDamping = true
  console.log(controls)

  // 7. 创建更新动画的方法
  const render = () => {
    // 设置阻尼感必须在动画中调用.update()
    controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    requestAnimationFrame(render)
  }

  // 实现画面变化 更新渲染的内容
  window.addEventListener('resize', () => {
    // 解构window对象
    const { innerWidth, innerHeight, devicePixelRatio } = window
    // 更新相机的宽高比
    camera.aspect = innerWidth / innerHeight
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(innerWidth, innerHeight)
    // 更新渲染器的像素比
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  })
    
  // 执行创建更新动画的方法
  render()
}

```

* 如果我们想在Vue3中的页面进行webgl的渲染
  * 注意: 不要在[setup](https://staging-cn.vuejs.org/api/composition-api-setup.html#composition-api-setup)(模板渲染成html前调用) 中直接渲染`webgl` 该生命周期时页面元素还未渲染 会报错 需要在[onMounted](https://staging-cn.vuejs.org/api/composition-api-lifecycle.html#onmounted)(模板渲染成html后调用) 中渲染`webgl `

```vue
<template>
  <div>
    <div ref="stateDom" />
  </div>
</template>
<style lang="scss" scoped>
</style>

<script setup>
// 导入Vue组合API
import { ref, onMounted } from 'vue'
// 导入webgl 渲染方法
import getScene from './settings/main'
// 获取元素的Dom
const stateDom = ref(null)
// 在onMounted(模板渲染成html后调用) 中渲染webgl
onMounted(() => {
  // 渲染webgl
  getScene(stateDom.value)
})
// 不要在setup(模板渲染成html前调用) 中直接渲染webgl 该生命周期时页面元素还未渲染 会报错
// getScene(stateDom.value)
</script>
<script>
export default {
  name: 'MyName'
}
</script>

```

> 一个Vue3的代理渲染案例

* <font color =ff3040>注意: `Scene()场景对象` 和 `Mesh()网格模型对象`  需要使用`toRaw()`取消其代理 或使用`shallowReactive()`代理 其他的元素正常写即可 否则会报错 详细[看这里](./2_three.js_vue3_error.md)</font>
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

### **TS普通函数渲染**

* 写在函数外面 方便导出操作 并且有销毁方法

```tsx
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
interface domElement {
  appendChild: Document['appendChild']
}
// 储存动画id
let animationId: number
// 创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
// 创造轨道控制器
let controls: any
// 创建相机
let camera: any

/**
 * Description 创建
 * @param {T} nameCanvas
 * @returns {any}
 */
export function getScene<T extends domElement>(nameCanvas: T) {
  // 1. 创建three.js场景
  const scene = new THREE.Scene()

  // 2. 创建一个透视相机
  camera = new THREE.PerspectiveCamera(
    // 视觉角度
    75,
    // 相机纵横比 取整个屏幕 宽 / 高
    window.innerWidth / window.innerHeight,
    // 相机的进截面 (近距离不可见范围)
    0.1,
    // 远截面 (远距离不可见范围)
    1000
  )
  // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
  camera.position.set(0, 0, 10) // 默认没有参数 需要设置参数
  // 把相机添加到场景中
  scene.add(camera)

  // 声明一个球体
  const sphere = new THREE.SphereGeometry(1, 20, 20)
  // 声明一个标准材质
  const mmaterial = new THREE.MeshStandardMaterial({
    // 设置金属度
    metalness: 0.7,
    // 设置光滑度
    roughness: 0.1
  })
  // 创建网格模型
  const mesh = new THREE.Mesh(sphere, mmaterial)
  // 添加到场景
  scene.add(mesh)

  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
  scene.add(light)
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(0, 0, 10)
  scene.add(directionalLight)

  // 创建一个辅助线
  const axesHelper = new THREE.AxesHelper(20)
  scene.add(axesHelper)

  // 4. 设置渲染器(画布)的大小 通过setSize()设置
  renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
  // 5. 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
  nameCanvas.appendChild(renderer.domElement)

  // 6. 创建创建一个轨道控制器 实现交互渲染
  controls = new OrbitControls(camera, renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
  // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
  controls.enableDamping = true

  // 7. 创建更新动画的方法
  const render = () => {
    // 设置阻尼感必须在动画中调用.update()
    controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    animationId = requestAnimationFrame(render)
  }
  // 执行创建更新动画的方法
  render()

  // 实现画面变化 更新渲染的内容
  window.addEventListener('resize', () => {
    // 解构window对象
    const { innerWidth, innerHeight, devicePixelRatio } = window
    // 更新相机的宽高比
    camera.aspect = innerWidth / innerHeight
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(innerWidth, innerHeight)
    // 更新渲染器的像素比
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  })
}

/**
 * @description: 清除加载器和动画(销毁方法)
 */
export function dispose() {
  // 清除渲染器
  renderer.dispose()
  // 清除轨道控制器
  controls.dispose()
  // 清除动画
  cancelAnimationFrame(animationId)
}

```

* 在Vue3中使用

```vue
<template>
  <div class="canvas" ref="stateDom" />
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { getScene, dispose } from './components/texture_renderer'

// 获取绘制元素的Dom
const stateDom = ref()

onMounted(() => {
  // 传递页面Dom 绘制three.js
  getScene(stateDom.value)
})

onBeforeUnmount(() => {
  // 切换路由销毁three.js
  dispose()
})
</script>
<script lang="ts">
export default {
  name: 'ThreeJs'
}
</script>

```

* <font color =#ff3040>注意: 不要把 加载器中的`scene`场景 放在方法外单独声明 否则[WebGLRenderer](https://threejs.org/docs/index.html?q=renderer#api/zh/renderers/WebGLRenderer)的某些api方法无法使用(比如`.dispose`销毁渲染器)</font>

### 使用构造函数渲染

* 更先进 更细致的构造函数 class类进行渲染
  * [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 监听属性如果监听的是`window`对象 那么在Vue框架中 切换路由后其监听依旧会生效 为了性能优化 需要通过[removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener) 进行销毁监听
  * `removeEventListener`销毁监听需要传入参数 而且必须和 `addEventListener`监听属性的方法一致 否则无法进行销毁操作 建议单独把监听的方法写成一个构造函数 监听和销毁使用同一个构造函数  [详细看这里](https://zh.javascript.info/introduction-browser-events#addeventlistener)
    * [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent)鼠标相关 ts类型: `MouseEvent`
    * [resize](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/resize_event)屏幕视图调整大小时(浏览器尺寸/拉伸改变时) ts类型: `UIEvent | Event`
    * [DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)节点(页面元素) ts类型: `HTMLElement | Document | Element`


```tsx
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CreateWorld {
  constructor(canvas: HTMLElement) {
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }
    
  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element
  // 轨道控制器
  controls!: OrbitControls
  // 设置动画id
  animationId!: number

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
   // antialias: true // 开启锯齿
  })
  // 设置场景
  scene = new THREE.Scene()
  // 设置相机
  camera = new THREE.PerspectiveCamera(
    // 视觉角度
    75,
    // 相机纵横比 取整个屏幕 宽 / 高
    window.innerWidth / window.innerHeight,
    // 相机的进截面 (近距离不可见范围)
    0.1,
    // 远截面 (远距离不可见范围)
    1000
  )

  // 创建场景
  createScene = () => {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 5, 10) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 声明一个球体
    const sphere = new THREE.SphereGeometry(1, 20, 20)

    // 声明一个标准材质
    const mmaterial = new THREE.MeshStandardMaterial()

    // 创建网格模型
    const mesh = new THREE.Mesh(sphere, mmaterial)
    // 添加到场景
    this.scene.add(mesh)

    // 平行光
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    // directionalLight.position.set(8, 3, 4)
    // this.scene.add(directionalLight)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(20)
    this.scene.add(axesHelper)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true

    this.render()
    this.onAddEventListener()
  }

  render = () => {
    // console.log(this.animationId)
    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }

  // 尺寸变化时调整渲染器大小
  onWindowResize = (item: Event | UIEvent) => {
    // 解构window对象
    const { innerWidth, innerHeight, devicePixelRatio } = window
    // 更新相机的宽高比
    this.camera.aspect = innerWidth / innerHeight
    // 更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix()
    // 更新渲染器
    this.renderer.setSize(innerWidth, innerHeight)
    // 更新渲染器的像素比
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  }

  // 监听窗口变化
  onAddEventListener = () => {
    // 实现画面变化 更新渲染的内容
    window.addEventListener('resize', this.onWindowResize)
  }

  // 销毁渲染内容
  dispose = () => {
    // 清除场景
    this.scene.clear()
    // 清除轨道控制器
    this.controls.dispose()
    // 清除渲染器
    this.renderer.dispose()
    // 强制环境的丢失销毁webgl上下文 (存在白屏问题, 上下文不销毁也能自动销毁, 但会在控制台警告)
    // this.renderer.forceContextLoss()
    // 清除动画
    cancelAnimationFrame(this.animationId)
    // 销毁监听
    window.removeEventListener('resize', this.onWindowResize)
  }
}

```

* 在Vue中使用

```vue
<template>
  <div>
    <div ref="stateDom" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount } from 'vue'
//导入绘制和销毁
import { CreateWorld } from './components/ksy_renderer'

// 获取Dom
const stateDom = ref()
// 储存three.js的实例
let Three: CreateWorld

onMounted(() => {
  // 创建three.js实例
  Three = new CreateWorld(stateDom.value)
  // 传递页面Dom 绘制three.js
  Three.createScene()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.dispose()
})
</script>
<script lang="ts">
export default {
  name: ''
}
</script>
<style lang="scss" scoped></style>

```

### **使用拆分class的模块渲染(常用)**

通过class的继承特性, 可以拆分three.js的渲染内容, 可以把渲染的**公共类,公共方法类**作为基础, 这样我们就省去创建一些重复性的内容, 我们只需要专注于不同的渲染方法方式即可, 实现一个模块化效果

1. 第一层是three.js渲染的公共类, 一些依赖于three.js渲染的类型, 比如`renderer`, `scene`, `camera`等, 通过ts进行类型设置, 通过`import type`可以进行ts的类型引入, 这一类**是公共类**

```tsx
// type.ts
/**
 * three.js渲染的公共类
 */

// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器类型
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Type {
  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element

  // 轨道控制器
  controls!: OrbitControls
  // 设置动画id
  animationId!: number
  // 创建材质
  mmaterial!: THREE.RawShaderMaterial

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 关掉锯齿
    alpha: true // 设置背景透明
  })

  // 设置场景
  scene = new THREE.Scene()

  // 设置相机
  camera = new THREE.PerspectiveCamera(
    // 视觉角度
    75,
    // 相机纵横比 取整个屏幕 宽 / 高
    window.innerWidth / window.innerHeight,
    // 相机的进截面 (近距离不可见范围)
    0.1,
    // 远截面 (远距离不可见范围)
    3000
  )

  // 创建纹理加载器
  textureLoader = new THREE.TextureLoader()
  // 创建时钟
  clock = new THREE.Clock()

  // 创建平行光
  directionalLight!: THREE.DirectionalLight

  // 创建环境光
  ambientLight!: THREE.AmbientLight
}

```

2. 第二层, three.js的渲染方法, 继承于第一层的**公共类**, 例如, 监听页面尺寸更新画布大小, 销毁画布的常规/基础方法等, 这一类是**公共方法类**

```tsx
// createdrender.ts
/**
 * three.js渲染的公共方法类
 */

// 导入公共类
import { Type } from './type'
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { GUI } from 'lil-gui'

export class CreatedRender extends Type {
  // 是否开启CSS2DRenderer或者CSS3DRenderer的渲染
  // 开启了2D
  isCSS2DRenderer = false
  // 2D渲染器
  label2DRenderer!: CSS2DRenderer
  //gui调试面板
  gui!: GUI

  // 尺寸变化时调整渲染器大小
  onWindowResize = () => {
    // 解构window对象
    const { innerWidth, innerHeight, devicePixelRatio } = window
    // 更新相机的宽高比
    this.camera.aspect = innerWidth / innerHeight
    // 更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix()
    // 更新渲染器
    this.renderer.setSize(innerWidth, innerHeight)
    // 如果开启了CSS2DRenderer
    if (this.isCSS2DRenderer) {
      // 更新CSS2DObject的渲染器
      this.label2DRenderer.setSize(innerWidth, innerHeight)
    }
    // 更新渲染器的像素比
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  }

  // 监听窗口变化
  onAddEventListener = () => {
    // 实现画面变化 更新渲染的内容
    window.addEventListener('resize', this.onWindowResize)
  }

  // 销毁渲染内容
  dispose = () => {
    // 清除场景
    this.scene.clear()
    // 清除轨道控制器
    this.controls.dispose()
    // 清除渲染器
    this.renderer.dispose()
    // 清除动画
    cancelAnimationFrame(this.animationId)
    // 销毁监听
    window.removeEventListener('resize', this.onWindowResize)
    // 销毁gui
    if (this.gui) this.gui.destroy()

    // 释放内存
    this.renderer.forceContextLoss()
  }
}

```

* 第三层, 可以再来一个three.js的工具方法类, 包围盒, 辅助线, 可视化灯光的工具方法类

```tsx
// utils_renderer.ts
/**
 * three.js渲染的工具方法类
 */

// 导入three.js
import * as THREE from 'three'
// 导入公共类
import { CreatedRender } from './createdrender'
// 导入加载类型
import type { LoadingManager } from 'three'
// 导入Vue响应式
import { ref } from 'vue'

export class CreatedUtils extends CreatedRender {
  // 加载的进度
  loadingNumber = ref(0)

  /**
   * @description 设置包围盒
   * @param THREE.Object3D 传入的物体
   */
  getBoxSize = (object: THREE.Object3D) => {
    // 创建一个包围盒
    const box = new THREE.Box3()

    // 设置包围盒的大小
    box.setFromObject(object)
    // 获取包围盒的大小
    const boxSize = box.getSize(new THREE.Vector3())
    console.log(`当前物体的大小(包围盒)`, boxSize)

    return boxSize
  }

  /**
   * @description 设置平行光可视化
   * @param THREE.DirectionalLight 传入平行光光源
   */
  setLightHelper = (light: THREE.DirectionalLight) => {
    // 创建一个可视化灯光
    const helper = new THREE.DirectionalLightHelper(light, 5)
    // 添加到场景中
    this.scene.add(helper)
  }

  /**
   * @description 创建辅助线
   * @param length 传入辅助线的长度
   */
  addaxesHelper = (length = 10) => {
    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(length)
    // 添加到场景中
    this.scene.add(axesHelper)

    return axesHelper
  }

  /**
   * @description 计算全屏下的webgl设备坐标
   * @param item 传入的鼠标事件
   */
  calculateFullXY = (item: MouseEvent) => {
    const { clientX, clientY } = item
    // 创建二维向量 用于记录鼠标的位置
    const mouse = new THREE.Vector2()

    // mousemove 鼠标移动事件 还可以替换其他时间click等
    // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
    mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
    mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的

    return mouse
  }

  /**
   * @description: GLTF模型进度加载器
   * @returns LoadingManager | undefined
   */
  createLoadingGLTF = (): LoadingManager | undefined => {
    // 创建加载器
    const manager = new THREE.LoadingManager()

    // 加载中的参数  url被加载的项的url itemsLoaded目前已加载项的个数 itemsTotal总共所需要加载项的个数。
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      // 获取加载百分比: 已加载个数 / 总数量 * 100 计算出加载百分比 并取两位小数
      this.loadingNumber.value = Number(
        ((itemsLoaded / itemsTotal) * 100).toFixed(2)
      )

      console.log('加载中', this.loadingNumber.value)
    }

    return manager
  }

  /**
   * @description: 假的加载管理器
   * @returns {}
   */
  createLoadingFalse = (loadingIng = false) => {
    const i = setInterval(() => {
      // 加载完成清除定时器
      if (loadingIng) {
        this.loadingNumber.value = 100
        // 加载完成后清除定时器
        clearInterval(i)
      } else {
        // 0到3之间随机数
        const random = Math.floor(Math.random() * 2 + 0)
        // 不能能超过98, 到98就卡住
        if (this.loadingNumber.value >= 98) return
        // 每次加1
        this.loadingNumber.value += random
      }
    }, 50)
  }
}

```

3. 第三层以后, 这些类就可以进行自定义渲染方法, 满足自身需求的一些方法类, 比如渲染一个正方体还是一个球体, 这取决你这一层的自定义渲染方法, **最后一层的类名作为构造函数进行使用**
   * 通常这一层需要通过`constructor`实例化传入的`canvas`画布Dom(类型`HTMLElement`)
   * `render`渲染方法也可以写在这里, 有些值是依赖于three.js中的[Clock](https://threejs.org/docs/index.html?q=Clock#api/zh/core/Clock) 跟踪时间
   * 这里举个例子, 我们要渲染一个面, 那么就可以继承第三步**工具方法类**, 创建自己想要的场景效果

```tsx
// 导入工具方法类
import { CreatedUtils } from '@/glsltype/utils_renderer'
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class CreatedCanvas extends CreatedUtils {
 constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 创建场景
  createScene = () => {
    const { radius } = {
      radius: 2
    }

    // 声明一个球体
    const sphere = new THREE.SphereGeometry(radius, 32, 32)

    // 创建网格模型
    const mesh = new THREE.Mesh(sphere, this.mmaterial)
    // 添加到场景
    this.scene.add(mesh)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // 创建辅助线
    this.addaxesHelper(100)

    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 5, 20) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    // new OrbitControls(相机, 渲染器Dom元素)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true
    // 禁用轨道控制器
    // this.controls.enabled = false

    // 渲染方法
    this.render()
    // 添加监听画布大小变化
    this.onAddEventListener()
  }

  // 渲染动画
  render = () => {
    // 获得动画执行时间
    // const clockTime = this.clock.getElapsedTime()

    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()

    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)
  }
}

```

4. 最后, 我们在Vue中导入最后一层的class构造函数, 实现three.js的展示
   * 可以通过[shallowRef()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 对three.js的数据进行[`ref()`](https://cn.vuejs.org/api/reactivity-core.html#ref) 的浅层作用形式。three.js数据不可以被Vue的`fef()`或者`reactive()`响应式代理, 详细看[这里](./2_1_three.js_vue3_error.md)

```vue
<template>
  <div>
    <div ref="stateDom" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
// 导入three.js的构造函数
import { CreatedCanvas } from './components/car_render'

// 获取Dom
const stateDom = ref()
// 通过shallowRef()浅层响应式代理three.js数据
const Three = shallowRef<CreatedCanvas>()

onMounted(() => {
  // 创建three.js实例
  Three.value = new CreatedCanvas(stateDom.value)
  // 传递页面Dom 绘制three.js
  Three.value.createScene()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.value?.dispose()
})
</script>

<script lang="ts">
export default {
  name: 'BydCar'
}
</script>
<style lang="scss" scoped></style>

```

### **着色器GLSL代码**

适用于three.js中[RawShaderMaterial](https://threejs.org/docs/index.html#api/zh/materials/RawShaderMaterial) 原始着色器材质中的顶点着色器`vertexShader`和片元着色器`fragmentShader`

* 在three.js中使用`RawShaderMaterial` 原始着色器, 如果是vite需要安装配置[vite-plugin-string](https://github.com/aweikalee/vite-plugin-string), 让其GLSL代码转换成字符串

```js
// 引入glsl
import planeVertexShader from '../glsl/vertexShader.glsl'
import planeFragmentShader from '../glsl/fragmentShader.glsl'
// 声明一个着色器材质
const shader = new THREE.ShaderMaterial({
  // 设置双面显示
  side: THREE.DoubleSide,
  // 顶点着色器 需要设置坐标转换
  vertexShader: planeVertexShader,
  // 片元着色器
  fragmentShader: planeFragmentShader,
})

```

* 设置`vertexShader`顶点着色器

```glsl
// 设置精度
precision mediump float;

// 传入three.js中的一些变量
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// 传入three.js顶点关联的变量
attribute vec3 position;

void main() {
  // 顶点坐标
  vec4 modelPostion = modelMatrix * vec4(position, 1.0);

  // 计算顶点位置
  gl_Position = projectionMatrix * viewMatrix * modelPostion;
}

```

* 设置`fragmentShader`片元着色器

```js
// 设置精度
precision mediump float;

void main() {
  // 设置片元颜色
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // 纯白色
}

```

* 实现效果

![image-20230129150213034](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301291502132.png)

## three.js相关内容记录

* 记录three.js的相关控件学习笔记 因为文章过长 以单独文章作为记录 通过学习

* 相关控件包括

  ☑️ [`Material` 材质](./3_1_three.js_Material.md)

  ☑️`Camera` [相机](./3_2_three.js_Camera.md)
  
  ☑️`Scene` [场景](./3_3_three.js_Scene.md)
  
  ☑️`Renderer` [场景渲染器、2D、3D渲染器](./3_4_three.js_Renderer.md)
  
  ☑️`Loader` [加载器](./3_6_three.js_Loader.md)
  
  ☑️`Light` [光源](./3_8_three.js_Light)
  
  ☑️`Dom` [模型节点](./2_1_three.js_Dom.md)
  
  ☑️`GLSL` [着色器](./4_4_three.js_glsl.md)
  
  🚫`Matrix` 欧拉角

## 二维向量（Vector2）和 三维向量（Vector3）

[二维向量（Vector2）](https://threejs.org/docs/index.html?q=Vector2#api/zh/math/Vector2) x y 轴

* 表示2D [vector](https://en.wikipedia.org/wiki/Vector_space)（二维向量）的类。 一个二维向量是一对有顺序的数字（标记为x和y），可用来表示很多事物
* `CSS2DObject` CSS2对象模型

[三维向量（Vector3）](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3) x y z轴

* 该类表示的是一个三维向量（3D [vector](https://en.wikipedia.org/wiki/Vector_space)）。 一个三维向量表示的是一个有顺序的、三个为一组的数字组合（标记为x、y和z）， 可被用来表示很多事物
* `CSS3DObject` CSS3对象模型、`CSS3DSprite` CSS3精灵模型

### **添加拷贝修改相关语法**

对向量( `Vector2` 和 `Vector3` )数据的处理方法

> 假设以`.position`模型世界坐标位置为例

[.add(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.add) 将传入的向量v和这个向量相加 可以对x y z 轴进行相加处理

```js
const coordinate = new THREE.Vector3(200, 50, 50)
Object3D.position.add(coordinate)
```

[.copy(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.copy) 将所传入`Vector3`的x、y和z属性复制给这一`Vector3`。覆盖原有的 x y z

```js
const coordinate = new THREE.Vector3(200, 50, 50)
Object3D.position.copy(coordinate)

```

[.set(number)](https://threejs.org/docs/?q=Vector3#api/zh/math/Vector3.set) 设置该向量的x、y 和 z 分量。覆盖原有的 x y z 不用 `Vector3`用数字设置即可

```js
Object3D.position.set(0, 0, 0)

// 有时候可以直接通过数组展开语法也可以, 规范还是用.copy进行赋值
const coordinateSpread  = [200, 50, 50]
Object3D.position.set(...coordinate)

```

[.clone(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.clone) 返回一个新的`Vector3`，其具有和当前这个向量相同的x、y和z。复制一份 x y z 不修改原数据 类似于深拷贝向量一份数据

```js
const ret = Object3D.position.clone() 
console.log(ret) // ret里面包含Vector3
```

可以直接赋值或者进行运算符处理指定坐标

```js
// 赋值操作
Object3D.position.x = 20
Object3D.position.y = 20
Object3D.position.z = 2
// 相加相减操作
Object3D.position.x += 20
Object3D.position.y -= 20

```

或者直接创建一个新的`Vector2`, `Vector3`进行修改

```js
Object2D.position = new THREE.Vector2(0.5, 0.5)
Object3D.position = new THREE.Vector3(0.5, 0.5, 0.5)

```

## 获取模型Mesh

[.getObjectByName(模型name值)](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.getObjectByName) 方法可以直接获取到和name匹配的`Mesh`模型

* 在ts中(@types/three版本0.149.0)`.getObjectByName()` 获取到的模型是一个`Object3D`格式的数据, 但本身其实是`Mesh`类型, 可以通过断言给其设置为`Mesh<THREE.BufferGeometry, 使用材质的类型>`
* 当我们修改模型材质的时候, 也需要给其添加上之前我们设置的材质属性断言

```tsx
// 查找模型, 给其设置Mesh类型泛型为BufferGeometry和MeshStandardMaterial(依据使用材质的类型)
const iphoneMap = this.iphone.getObjectByName('手机') as  THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>

// 设置贴图材质的断言
const iphoneMapMaterial = iphoneMap.material 

// 标记为需要更新
iphoneMapMaterial.needsUpdate = true
// 更新贴图
iphoneMapMaterial.map = map2

```

::: details 查看实际使用效果(截图)

![VIY9UG7%{E[7}JC{4}]JXFX](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303012019259.png)

:::

## **获取模型的坐标**

*  [.getWorldPosition](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.getWorldPosition) 方法可以获取到模型的坐标 他可以用来获取世界坐标 可以通过`.getObjectByName(模)`获取模型的name 然后再使用该方法 获取其世界坐标
*  `Vector3`是threejs的三维向量对象,可以通过`Vector3`对象表示一个顶点的xyz坐标，顶点的法线向量。

```js
// 声明一个三维向量用来保存世界坐标
const worldPosition = new THREE.Vector3()
// 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中
mesh.getWorldPosition(worldPosition)

```

## 使用网格基础材质 MeshBasicMaterial

* 最基本的材质是 `MeshBasicMaterial`。你能够把颜色`color`作为参数传进去来生成一个实心的带颜色对象，没有阴影，也不受光照影响。你也能够通过把透明度`opacity`作为参数传进去来调整透明度以及设置透明`transparent`为`true`。
* 详情[看这里](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshBasicMaterial) 如果我们想给基础材质 导入图片或gif等 可以配合`TextureLoader` 导入后 在[map](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshBasicMaterial.map)方法中进行纹理导入 最后在网格对象`Mesh`中导入
  * 如果要修改渲染面 请看[这里]( https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/Material.side) 通过`side`设置

```js
// 创建一个立方体
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 创建图片网格材质
const texture = new THREE.TextureLoader().load(
  'https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%B0%8Fmao.jpg'
)
// 创建网格材质
const skyBoxMaterial = new THREE.MeshLambertMaterial({
  // 设置纹理贴图
  map: texture,
  // 设置渲染面:
  side: THREE.DoubleSide,
})
// 声明网格模型 导入创建的立方体和网格材质
content.mesh = new THREE.Mesh(geometry, skyBoxMaterial)

```

## three.js在ts中

* three.js 有ts版本

```bash
npm i @types/three
```

* 安装后 可以直接设置`three.js `中的ts类型 支持提示 也支持插件的类型设置
  * 声明一个`OrbitControls`轨道控制器的类型 和 `THREE.Mesh`网格类型

```tsx
// 导入three.js
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 轨道控制器
controls!: OrbitControls
// 声明mesh 类型为THREE.Mesh或为空
mesh: THREE.Mesh | undefined

```

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)

[vue-cli + three.js 解决页面跳转时Css2dObject遗留在dom的问题](https://blog.csdn.net/qq_37338983/article/details/106461004)
