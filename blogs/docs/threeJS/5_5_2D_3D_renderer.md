---
title: 2D/3D渲染器renderer
date: 2023-03-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303020959983.png
tags:
 - three.js
categories: three.js
---

::: tip 介绍
2D/3D渲染器renderer和2D/3D对象Object<br>
:::

<!-- more -->

## 2D/3D渲染器renderer

three.js提供了两种内置的页面元素渲染器, 用来渲染Vue或者其他框架的Dom元素, 2D和3D渲染器使用的方式都是一样的, 只是部分有区别

<font color =#ff3040>注意: 2D/3D渲染器的`.setSize`依赖`WebGLRenderer`场景渲染器的宽度高度 需要和其保持一致 否则会出现偏移问题 无论如何 他俩的宽高应该都是一个作用域的值(相同)</font>

### 2D渲染器介绍

[CSS2DRenderer](https://threejs.org/docs/index.html?q=CSS2DRenderer#examples/zh/renderers/CSS2DRenderer) 2D渲染器, 对应的是`CSS2DObject`2D对象, 是一个`Object3D`(残缺版, 部分属性无效), 2D渲染器更适合做一些需要持续显示的标签

```JS
// 导入2D渲染器和2D对象
import {
  CSS2DRenderer,
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

```

* CSS2D(类似于`Sprite`雪碧图)，场景缩放时，缩小放大都一样大, **不根据透视相机的显示效果, 永远保持一个大小**，**不被模型遮挡**，通过DOM事件点击。可以使用`Object3D`的 [.position](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.position)位置等属性

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/e06645802f2742eda25815e6d7a91628.gif)

* CSS2渲染器 `.domElement`、`.setSize()`、`.render()`等方法和属性功能和WebGL渲染器相同。webgl渲染器的部分属性和方法CSS3渲染是不具备的，**不会缩放也不会旋转**

* 2D渲染器生成的html元素 [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)元素不是[matrix3d()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix3d)

![image-20220610122035918](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220610122035918.png)

### 3D渲染器介绍

[CSS3DRenderer](https://threejs.org/docs/index.html?q=CSS2DRenderer#examples/zh/renderers/CSS2DRenderer) 3D渲染器, 对应的是`CSS3DObject`, 是一个[Object3D](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D), 3D渲染器更适合做一些和模型保持一致的标签, 比如模型旋转标签也跟着旋转的需求

```js
// 导入3D渲染器和3D对象
import {
  CSS3DRenderer,
  CSS3DObject
} from 'three/examples/jsm/renderers/CSS3DRenderer.js'

```

* CSS3D不面向摄像机，场景缩放时，**会随着透视相机显示效果, 由远变小, 由近变大**，**不被模型遮挡**，通过DOM事件点击, 可以使用`Object3D`的[.scale](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D.scale)缩放等属性
  * **3D元素的尺存(px)和渲染器尺寸差距较大 通常需要设置`.scale`缩放比的值`<1`**

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/bd0cf6acd7414a0aafe75fb838a371e4.gif)

* CSS3D默认是双面显示, 可以通过css属性[backface-visibility: hidden](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backface-visibility), 取消背面显示

![image-20230306200150028](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303062002574.png)

* 3D渲染器生成的html元素 [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)元素是[matrix3d()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix3d)3D转换效果

![image-20220610122217013](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220610122217013.png)

## 创建CSS2DRenderer

`CSS2DRenderer`和其他渲染器一样, 也包含`.render()` `.domElement`、`.setSize()`,

* 通过`.domElement`可以插入到和canvas一样的元素中, 根据`.setSize()`大小设置的大小, 默认只有`overflow: hidden;`隐藏溢出和宽高度属性

![image-20230306201313838](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303062013859.png)

* 可以通过设置定位`positio`为`absolute`固定定位, 再设置[pointerEvents](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)为`none`穿透点击不影响canvas的操作

> 实现步骤

1. 第一步, 写好一个Vue的一个组件或者页面元素, 获取其Dom元素, 传给three.js (和绘制`WebGLRenderer`场景渲染器一样)

2. 创建`CSS2DRenderer`2D标签渲染器, 通过`.domElement`给其设置一些css样式, 默认只有`overflow: hidden;`和宽高度属性
   * 和`WebGLRenderer`场景渲染器一样, 通过`.setSize`设置渲染器大小
   * 通过`CSS2DObject`方法可以把Dom元素转化为`Object3D`
   * 可以添加在canvas子节点中也可以直接添加在body中
   * 如果生成的标签位置不太正确, 可以修改固定定位的值, 注意外盒子要设置`overflow: hidden`溢出隐藏

```js
// 导入2D标签渲染器
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

// 创建2D标签渲染器
const label2DRenderer = new CSS2DRenderer()

// 设置2D标签渲染器的大小
label2DRenderer.setSize(window.innerWidth, window.innerHeight)

// 设置2D标签渲染器的样式
label2DRenderer.domElement.style.display = 'none' // 默认隐藏
label2DRenderer.domElement.style.overflow = 'visible' // 显示超出部分(默认隐藏), 适配移动端
label2DRenderer.domElement.style.position = 'absolute'
// 如果生成的标签位置不太正确, 可以修改固定定位的值, 注意外盒子要设置overflow: hidden溢出隐藏
label2DRenderer.domElement.style.top = '80px' // 移动高度
label2DRenderer.domElement.style.left = '0px'
label2DRenderer.domElement.style.pointerEvents = 'none' // 鼠标事件不可用, 穿透点击不影响canvas的操作

// 将2D标签渲染器添加到canvas元素中和WebGLRenderer的canvas同级, 也可以添加到body中
canvas.appendChild(label2DRenderer.domElement)
// document.body.appendChild(label2DRenderer.domElement)

// 把Dom元素转化为Object3D
const tags2D = new CSS2DObject(tags) // tags就是Vue的Dom元素

// 添加到场景中
scene.add(tags2D)

```

3. 在render渲染动画中和`WebGLRenderer`场景渲染器一样, 给`.render`设置其场景, 相机参数

```js
// 渲染动画
const render = () => {
  // WebGLRenderer渲染器
  renderer.render(scene, tcamera) // render(场景, 相机)
  // CSS2DRenderer渲染器
  label2DRenderer.render(scene, camera)

  // 使用动画更新的回调API实现持续更新动画的效果(回调函数)
  requestAnimationFrame(render)
}

```

4. 在尺寸变化时调整渲染器大小, 和`WebGLRenderer`一样`CSS2DRenderer`尺寸变化时也需要调整渲染大小 (可选)

```js
// 尺寸变化时调整渲染器大小
const onWindowResize = () => {
  // 解构window对象, 获取宽高和像素比
  const { innerWidth, innerHeight, devicePixelRatio } = window

  // 更新渲染器
  renderer.setSize(innerWidth, innerHeight)
  // 更新CSS2DObject的渲染器
  label2DRenderer.setSize(innerWidth, innerHeight)

  // 更新相机的宽高比
  camera.aspect = innerWidth / innerHeight
  // 更新摄像机的投影矩阵
 camera.updateProjectionMatrix()

  // 更新渲染器的像素比
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
}

```

5. 切换路由时, 销毁CSS2DRenderer, 直接通过[removeChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild) 删除子节点的方式销毁即可 (可选)
   * 如果在body里面通过` document.body.removeChild()`删除body节点方式销毁

```js
// Vue3
onUnmounted(() => {
// 销毁CSS2DRenderer
// 添加在canvas里面 canvas.appendChild()
canvas.removeChild(label2DRenderer.domElement)
// 添加在body里面 document.body.appendChild()
// document.body.removeChild(label2DRenderer.domElement)
})

// Vue2
beforeDestroy() {
canvas.removeChild(label2DRenderer.domElement)
// document.body.removeChild(label2DRenderer.domElement)
}
```

`CSS3DRenderer`创建方式和`CSS2DRenderer`差不多, 需要主要的是CSS3DRenderer的大小问题, 可能会过大, 通过`.scale`缩放进行设置, 通过css属性[backface-visibility: hidden](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backface-visibility), 取消背面显示