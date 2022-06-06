---
title: three.js 之 Renderer
date: 2022-06-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-6o3qx7.png
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Renderer 渲染器 <br>
:::

<!-- more -->

## 渲染器renderer的作用

* `three.js渲染器` 分为很多类型的渲染器 用到再记录
  * [WebGLRenderer 场景渲染器](https://threejs.org/docs/index.html?q=web#api/zh/renderers/WebGLRenderer) 最常用的渲染器 可以渲染网格模型
  * [CSS2DRenderer 2D渲染器](https://threejs.org/docs/examples/zh/renderers/CSS2DRenderer.html) 2D渲染器可以渲染html内容 ( 比如 div span具备样式的html元素 )


> 所有渲染器

![image-20220606142601974](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220606142601974.png)

## WebGLRenderer 场景渲染器

* [WebGLRenderer](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer) 进行场景渲染器的创建 详细[看官网](./1.1_three.js_js.md)
  * 设置`antialias` 可以开始抗锯齿


```js
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启抗锯齿
})
renderer.outputEncoding = THREE.sRGBEncoding// 解决加载gltf格式模型纹理贴图和原图不一样问题
renderer.setPixelRatio(window.devicePixelRatio)// 设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染区域尺寸
renderer.setClearColor('#ff3040',1)    // 设置背景颜色 支持十六进制颜色和字符串风格css颜色 (颜色, 透明度)
```

### **执行持续场景渲染**

* 通过`requestAnimationFrame`方法 可以自适应的根据刷新率 渲染页面内容

```js
  const render = () => {
    renderer.render(场景Scene, 相机Camera) // 执行渲染操作
    requestAnimationFrame(render) // 请求再次执行渲染函数render，渲染下一帧
  }
```

### 场景渲染器自适应

* 有时候我们需要随着页面进行自适应操作 我们可以使用`.setSize` 方法重新设置渲染的输出尺寸
* `window.onresize`监听窗口调整大小方法建议存在一个 如果你不通过指定监听`.addEventListener()`绑定 那么一个页面只能存在一个`window.onresize`方法 其他的会被覆盖
* 不光场景渲染器需要自适应 相机也需要自适应 并且通过`.updateProjectionMatrix()`方法更新相机

```js
 // 创建一个CSS2渲染器CSS2DRenderer
  const renderer = new THREE.WebGLRenderer()
 // 设置渲染器的尺寸(需要和其他渲染器宽高一致)
  renderer.setSize(window.innerWidth, window.innerHeight)  
 // 监听页面尺寸是否修改
  window.onresize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(width, height)
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = width / height
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix()
  }
```

### **在Vue3中执行渲染**

* 通过`ref`绑定元素dom 进行指定元素的渲染

```vue
<template>
  <div>
    <!-- 渲染模板 -->
    <div ref="stateDom" />
  </div>
</template>
<script setup>
// 导入Vue组合API
import { onMounted, ref } from 'vue'
import startRender from './settings/render'
// 获取元素的Dom
const stateDom = ref(null)
// 结构渲染操作
const { render, renderer } = startRender()
onMounted(() => {
  // 进行渲染操作
  render()
  // 渲染到指定的元素中
  stateDom.value.appendChild(renderer.domElement)
})

</script>
<script>
export default {
  name: 'ToGranary'
}
</script>

```

## CSS2DRenderer 2D渲染器

* 通过three.js扩展库 `CSS2DObject`可以实现把**HTML元素**和三维元素相结合 并且具备`Object3D`的一些方法 可以使用`.position` 属性等等....
* 当我们设置 `CSS2DObject`2D元素后 需要通过的[CSS2DRenderer](https://threejs.org/docs/index.html?q=Object#examples/zh/renderers/CSS2DRenderer) 2D渲染器渲染出来 否则没有效果

> 在工程化下导入2D元素 

* threejs扩展库CSS2DRenderer.js提供了两个构造函数CSS2渲染器 `THREE.CSS2DRenderer`、CSS2模型对象 `THREE.CSS2DObject`。

```js
// 导入2D模型对象 和 2D模型渲染器
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
```

### **创建CSS2模型对象 `CSS2DObject`**

* CSS2模型对象 `CSS2DObject`作用是把HTML元素设计的UI包装为一个类似threejs网格模型 `Mesh`的模型对象，可以设置 `.position`属性，具备Object3D的一些方法 可以通过 `.add()方法`插入到场景中

```JavaScript
/**
 * HTML元素编写一个UI效果作为模型标签
 */
const div = document.createElement('div');
div.innerHTML = '立方体';
div.style.padding = '10px';
div.style.color = '#fff';
div.style.backgroundColor = 'rgba(25,25,25,0.5)';
div.style.borderRadius = '5px'
// div.style.position = 'absolute';//不需要设置绝对定位

//HTML元素标签作为参数创建一个CSS2模型对象CSS2DObject
//你可以把CSS2DObject模型对象类比为网格模型Mesh 具备Object3D的一些方法，一样具有position属性
//CSS2DObject模型对象不具有角度和缩放.scale属性
const label = new THREE.CSS2DObject(div);
//设置模型对象CSS2DObject在场景位置
//标签标注boxMesh模型所以复制boxMesh的位置
label.position.copy(boxMesh.position);
//适当偏移标签
label.position.y += 30
scene.add(label);//CSS2模型标签插入到场景中
```

### **创建CSS2渲染器 `CSS2DRenderer`**

* CSS2渲染器 `THREE.CSS2DRenderer`和常用的WebGL渲染器 `WebGLRenderer`一样都是渲染器，只是渲染技术不同，WebGL渲染器 `WebGLRenderer`解析渲染threejs模型对象的时候会调用底层的WebGL API，CSS2渲染器 `THREE.CSS2DRenderer`功能是渲染与threejs场景中网格模型绑定的HTML元素。

* CSS2渲染器 `.domElement`、`.setSize()`、`.render()`等方法和属性功能和WebGL渲染器相同。webgl渲染器的部分属性和方法CSS3渲染是不具备的，比如设置背景颜色的方法 `.setClearColor()`(Css渲染器没有)。
* <font color =#ff3040>注意: 2D渲染器的`.setSize`依赖`WebGLRenderer`场景渲染器的宽度高度 需要和其保持一致 否则会出现偏移问题 无论如何 他俩的宽高应该都是一个作用域的值(相同)</font>
* <font color =#ff3040>注意: `CSS2DRenderer`只能用于2D场景 像Css3中的`transform`这种3D属性 需要使用[CSS3DRenderer](https://threejs.org/docs/index.html?q=CSS3#examples/zh/renderers/CSS3DRenderer)</font>

```JavaScript
// 创建一个CSS2渲染器CSS2DRenderer
var labelRenderer = new THREE.CSS2DRenderer();
// .setSize的值 应该和WebGLRenderer场景渲染器的宽度高度一致 否则会出现偏移问题
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);
//渲染场景中的HTMl元素包装成的CSS2模型对象
labelRenderer.render(scene, camera);
```

### **2D渲染器自适应**

* 有时候我们需要随着页面进行自适应操作 我们可以使用`.setSize` 方法重新设置渲染的输出尺寸 使用方法和场景渲染器一样 
*  相机也需要重置哦

```js
 // 创建一个CSS2渲染器CSS2DRenderer
  const labelRenderer = new CSS2DRenderer()
 // 设置渲染器的尺寸(需要和其他渲染器宽高一致)
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  // 监听页面尺寸是否修改
  window.onresize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    // 重置2D渲染器输出画布canvas尺寸
    labelRenderer.setSize(width, height)
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = width / height
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix()
  }
```

### **Vue cli中问题**

* 当我们在Vue脚手架切换路由的时候 页面上的2D渲染器产生的标签并不会随着路由切换而隐藏(销毁) 
* 原因是three.js的 `CSS2DRenderer`生成的标签直接就是挂在真实的DOM上，并非是Vue的虚拟DOM上，所以在页面切换的时候，这个标签并不会随着切换而消失。而是一直在页面的body上面

![image-20220606200111409](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220606200111409.png)

> 解决办法

* Vue3提供了组件销毁后的生命周期`onUnmounted()` Vue2是`beforeDestroy()` 我们通过原生方法:  [.removeChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild) 在DOM中删除(销毁)一个子节点的方法 来销毁2D渲染器产生的标签

```js
// 假设变量labelRenderer为CSS2DRenderer创建的2D渲染器
// Vue3
onUnmounted(() => {
    // 销毁CSS2DRenderer创建的2D渲染器
  document.body.removeChild(labelRenderer.domElement)
})
// Vue2
beforeDestroy() {
    // 销毁CSS2DRenderer创建的2D渲染器
    document.body.removeChild(labelRenderer.domElement)
}
```



##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)

[vue-cli + three.js 解决页面跳转时Css2dObject遗留在dom的问题](https://blog.csdn.net/qq_37338983/article/details/106461004)
