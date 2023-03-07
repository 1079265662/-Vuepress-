---
title: three.js 之 Renderer渲染器
date: 2022-06-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-dp7gkm-min.png
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Renderer 渲染器 <br>
:::

<!-- more -->

## 渲染器renderer的作用

`three.js渲染器` 分为很多类型的渲染器 用到再记录

<font color =#ff3040>注意: 不同类型的渲染器只能存在一个 多个会被覆盖 </font>

* [WebGLRenderer 场景渲染器](https://threejs.org/docs/index.html?q=web#api/zh/renderers/WebGLRenderer) 最常用的渲染器 可以渲染网格模型
* [CSS2DRenderer 2D渲染器](https://threejs.org/docs/examples/zh/renderers/CSS2DRenderer.html) 2D渲染器可以让你的元素渲染成2D效果 CSS2对象模型是`CSS2DObject`
  * CSS2DRenderer的标签本身的大小不会缩放也不会旋转，**始终面对屏幕**
* [CSS3DRenderer 3D渲染器](https://threejs.org/docs/index.html?q=3d#examples/zh/renderers/CSS3DRenderer) 3D渲染器可以让你的元素渲染成3D效果 更具备立体感 
  * CSS3对象模型 `CSS3DObject`和CSS3精灵模型 `CSS3DSprite`
    * `CSS3DObject`CSS3对象模型的标签 缩放的时候跟着鼠标缩放变大变小，场景旋转的时候，它会跟着场景渲染器一起旋转 **但不会面对屏幕**
    * `CSS3DSprite`CSS3精灵对象模型的标签 和上面差不多 唯一区别是不会随着场景渲染器一起旋转 **始终面对屏幕**


> 所有渲染器

![image-20220606142601974](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220606142601974.png)

## WebGLRenderer 场景渲染器

* [WebGLRenderer](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer) 进行场景渲染器的创建 详细[看官网](./1.1_three.js_js.md)
  * 设置`antialias` 可以开始抗锯齿


```js
// 创建场景渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启抗锯齿
})
renderer.outputEncoding = THREE.sRGBEncoding// 解决加载gltf格式模型纹理贴图和原图不一样问题
renderer.setPixelRatio(window.devicePixelRatio)// 设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染区域尺寸
renderer.setClearColor('#ff3040',1)    // 设置背景颜色 支持十六进制颜色和字符串风格css颜色 (颜色, 透明度)
```

### **设置像素比**

* 很多高清显示屏，尤其是移动设备上的显示屏，一个显示单元往往具有多个物理像素，这就是像素比。比如第一代iPhone4的Retina高清显示屏的像素比就是2，这为我们带来了更加细致入微的视觉体验，但无疑也会消耗更多的性能，当性能消耗过大时，我们的动画和渲染也就会变慢，俗称掉帧。

* 我们可以通过[window.devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio) 来获取当前设备的像素比，同时通过调用渲染器的[渲染器.setPixelRatio](https://threejs.org/docs/index.html?q=ren#api/zh/renderers/WebGLRenderer.setPixelRatio) 方法来使渲染器根据像素比渲染画面。但这样做过于草率了，就像前面说的，更大的像素比意味着更加消耗性能，而当像素比大于2的时候，其实肉眼已经很难看出来差别了。所以我们最好做一个限制。我们使用js取最小值 [Math.min()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min)方法来使渲染器像素比不会超过2。

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

### **设置渲染器透明**

* `WebGLRenderer` 背景默认是纯黑色 并且不透明 如果`canvas`通过`fixed`或者`absolute` 定位后默认是无法显示被遮挡的内容 
  *  通过[alpha](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer) 属性设置渲染器透明性 默认是`false`

```tsx
// 创建场景渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启抗锯齿
  alpha: true // 开启透明
})
```

### **场景渲染器自适应**

* `window.onresize`监听窗口调整大小方法建议存在一个 如果你不通过指定监听`.addEventListener()`绑定 那么一个页面只能存在一个`window.onresize`方法 其他的会被覆盖
* 相机需要自适应 更新其宽高比[.aspect](https://threejs.org/docs/index.html#api/zh/cameras/PerspectiveCamera.aspect)后 再通过[.updateProjectionMatrix()](https://threejs.org/docs/index.html?q=PerspectiveCamera#api/zh/cameras/PerspectiveCamera.updateProjectionMatrix)方法更新相机 (每个相机都支持)
* 渲染器通过[.setSize()](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer.setSize) 更新其宽高后 还需要更新[.setPixelRatio](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer.setPixelRatio)设备的像素比

```js
// 实现画面变化 更新渲染的内容
window.addEventListener('resize', () => {
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
})

```

### **gltf/glb的编码设置问题**

gltf/glb模型的编码是`sRGBEncoding`, 通过[GLTFLoader](https://threejs.org/docs/index.html?q=gltf#examples/zh/loaders/GLTFLoader)加载器加载到three.js中, 会出现一些色差
![image-20230307190545297](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303071905396.png)

这时候`WebGLRenderer`场景渲染器默认的渲染是线性渲染(默认), 那么如果模型中包含一些自带的纹理贴图就会出现色差问题(自带贴图是sRGB编码), 需要 [WebGLRenderer](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer) 通过 [.outputEncoding](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer.outputEncoding) 修改渲染编码为sRGB编码

```js
renderer.outputEncoding = THREE.sRGBEncoding // 解决gltf/glb模型加载后出现色差问题

```

总的来说`WebGLRenderer`场景渲染的`.outputEncoding`编码渲染方式, 必须和纹理贴图的`.encoding`编码方式一致, 否则会出现一些色差问题

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

## `requestAnimationFrame()` 持续调用渲染器实现动画

* 过去我们想让一个动画一直处于播放状态 会用到 `setTimeout()` 或 `setInterval()`方法 这种方法是异步方法 当页面比较繁琐的时候 浏览器可能把他放到栈里面 这个时候可能会耽误动画的播放 而且当我们隐藏浏览器 或者切换到其他页面时候 这个东西他还会继续执行很浪费性能 而且动画的执行帧率是靠人工设置 并不能通过屏幕的刷新率 自动设置
* 详细看[requestAnimationFrame()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

> requestAnimationFrame()的优点

* CPU节能：使用setInterval实现的动画，当页面被隐藏或最小化时，setInterval仍然在后台执行动画任务。而`requestAnimationFrame`在页面未激活时，该页面的屏幕刷新任务也会被系统暂停。当页面被激活时，任务会从上次停留的地方继续执行，有效节省了CPU开销。
* 流畅度：`requestAnimationFrame()`由系统决定回调函数的执行时机。依据用户屏幕的刷新率，每次刷新的间隔中会执行一次回调函数，不会引起丢帧，卡顿。而setInterval任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；且setInterval的固定时间间隔不一定与屏幕刷新时间相同，会引起丢帧。
* 函数节流：`requestAnimationFrame()`可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。

### **使用方式**

* `requestAnimationFrame(回调方法callback)`
* 在`requestAnimationFrame()`中只会执行渲染操作`.render` 不会设置渲染配置(`.setSize`等等...) 因为他会重复执行配置(按照屏幕刷新率 执行该方法)

```js
const render = () => {
    renderer.render(场景Scene, 相机Camera) // 执行渲染操作
    requestAnimationFrame(render) // 请求再次执行渲染函数render，渲染下一帧 需要回调自己
  }
render()
// 在元素上绘制canvas
document.body.appendChild(labelRenderer.domElement);
```

* 取消动画 可以通过[cancelAnimationFrame()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame)方法取消指定的动画  `cancelAnimationFrame(执行动画的变量)`

```js
// 获取执行动画的变量
const myReq = requestAnimationFrame(step);
// 停止动画
cancelAnimationFrame(myReq);
```

* 通常我们要暂停动画 不需要使用`cancelAnimationFrame()`这个方法 我们可以通过对执行的动作(`translateX` 等等....)进行`0`值赋值 让其不动 实现暂停效果
* `cancelAnimationFrame()`适合进行清除操作 而非暂停操作



##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)

[vue-cli + three.js 解决页面跳转时Css2dObject遗留在dom的问题](https://blog.csdn.net/qq_37338983/article/details/106461004)

[WebGL(threeJS)给物体打标签](https://blog.csdn.net/xyphf/article/details/125082815)
