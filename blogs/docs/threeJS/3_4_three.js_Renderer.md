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

### 设置像素比

* 很多高清显示屏，尤其是移动设备上的显示屏，一个显示单元往往具有多个物理像素，这就是像素比。比如第一代iPhone4的Retina高清显示屏的像素比就是2，这为我们带来了更加细致入微的视觉体验，但无疑也会消耗更多的性能，当性能消耗过大时，我们的动画和渲染也就会变慢，俗称掉帧。

* 我们可以通过[window.devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio) 来获取当前设备的像素比，同时通过调用渲染器的[渲染器.setPixelRatio](https://threejs.org/docs/index.html?q=ren#api/zh/renderers/WebGLRenderer.setPixelRatio) 方法来使渲染器根据像素比渲染画面。但这样做过于草率了，就像前面说的，更大的像素比意味着更加消耗性能，而当像素比大于2的时候，其实肉眼已经很难看出来差别了。所以我们最好做一个限制。我们使用js取最小值 [Math.min()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min)方法来使渲染器像素比不会超过2。

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

### **执行持续场景渲染**

* 通过`requestAnimationFrame`方法 可以自适应的根据刷新率 渲染页面内容

```js
const render = () => {
    renderer.render(场景Scene, 相机Camera) // 执行渲染操作
    requestAnimationFrame(render) // 请求再次执行渲染函数render，渲染下一帧 需要回调自己
  }
render()
// 在元素上绘制canvas
document.body.appendChild(labelRenderer.domElement);
```

### **场景渲染器自适应**

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

## CSS2DRenderer 2D(CSS2)渲染器

* 通过three.js扩展库 `CSS2DObject`可以实现把**HTML元素**和三维元素相结合 可以使用[二维向量（Vector2）](https://threejs.org/docs/index.html?q=Vector2#api/zh/math/Vector2) [.position](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.position)局部位置属性 
* 当我们设置 `CSS2DObject`2D元素后 需要通过的[CSS2DRenderer](https://threejs.org/docs/index.html?q=Object#examples/zh/renderers/CSS2DRenderer) 2D渲染器渲染出来 否则没有效果

> 在工程化下导入three.js 2D渲染器和2D模型

* threejs扩展库CSS2DRenderer.js提供了两个构造函数CSS2渲染器 `THREE.CSS2DRenderer`、CSS2模型对象 `THREE.CSS2DObject`。

```js
// 导入2D模型对象 和 2D模型渲染器
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
```

### **创建CSS2模型对象 `CSS2DObject`**

* CSS2模型对象 `CSS2DObject`作用是把HTML元素设计的UI包装为一个类似threejs网格模型 `Mesh`的模型对象，可以设置 [二维向量（Vector2）](https://threejs.org/docs/index.html?q=Vector2#api/zh/math/Vector2) [.position](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.position)局部位置属性 ，具备Object3D的一些方法 可以通过 `.add()方法`插入到场景中

```JavaScript
// 创建一个CSS2DObject对象
function tag (name) {
  // 创建div元素(作为标签)
  const div = document.createElement('div');
  // 给标签插入内容(依据传来的参数)
  div.innerHTML = name;
  // 给元素设置一个class 方便设置样式
  div.classList.add('tag');
  //div元素包装为CSS2模型对象CSS2DObject
  const label = new CSS2DObject(div);
  div.style.pointerEvents = 'none';//避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  // label.position.set(x, y, z);
  return label;//返回CSS2模型标签      
}
```

### **创建CSS2渲染器 `CSS2DRenderer`**

* CSS2渲染器 `THREE.CSS2DRenderer`和常用的WebGL渲染器 `WebGLRenderer`一样都是渲染器，只是渲染技术不同，WebGL渲染器 `WebGLRenderer`解析渲染threejs模型对象的时候会调用底层的WebGL API，CSS2渲染器 `THREE.CSS2DRenderer`功能是渲染与threejs场景中网格模型绑定的HTML元素。
* CSS2渲染器 `.domElement`、`.setSize()`、`.render()`等方法和属性功能和WebGL渲染器相同。webgl渲染器的部分属性和方法CSS3渲染是不具备的，比如设置背景颜色的方法 `.setClearColor()`(Css渲染器没有)。
* <font color =#ff3040>注意: 2D渲染器的`.setSize`依赖`WebGLRenderer`场景渲染器的宽度高度 需要和其保持一致 否则会出现偏移问题 无论如何 他俩的宽高应该都是一个作用域的值(相同)</font>

```JavaScript
// 创建一个CSS2渲染器CSS2DRenderer
const labelRenderer = new THREE.CSS2DRenderer();
// .setSize的值 应该和WebGLRenderer场景渲染器的宽度高度一致 否则会出现偏移问题
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none';
// 在元素上绘制canvas
document.body.appendChild(labelRenderer.domElement);
//渲染场景中的HTMl元素包装成的CSS2模型对象
labelRenderer.render(场景scene, 相机camera);
```

### **把CSS2DObject对象添加到three.js中**

three.js会把元素Dom重新渲染成 three.js的[Object3D](https://threejs.org/docs/?q=Object3D#api/zh/core/Object3D)对象 这样就可以和网格模型进行交互 并且支持部分(区分2D和3D方法)[Object3D](https://threejs.org/docs/?q=Object3D#api/zh/core/Object3D)对象方法

<font color = ff3040>注意: 必须要把CSS2DObject对象添加到场景`scene` 或 `Group组对象`中去 否则不会被three.js进行渲染</font>

* 声明到`Group`组对象

```js
const model = new THREE.Group()// 声明一个组对象，用来添加加载成功的三维场景
const label = tag() // 假设label是CSS2DObject的内容
model.add(label) // CSS2DObject内容插入model组对象中
```

* 声明到`scene`场景中

```js
// 声明场景对象
const scene = new THREE.Scene()
const label = tag() // 假设label是CSS2DObject的内容
scene.add(ambient) // CSS2DObject内容插入scene场景对象中
```

> 渲染效果

* `CSS2DRenderer`的标签本身的大小不会缩放也不会旋转，始终面对屏幕

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/e06645802f2742eda25815e6d7a91628.gif)

* 2D渲染器生成的html元素 [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)元素不是[matrix3d()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix3d)

![image-20220610122035918](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220610122035918.png)

## CSS3DRenderer 3D(CSS3)渲染器 

* 他和`CSS2DRenderer`2D渲染器差不多 不过他可以使用 [三维向量（Vector3）](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3)[.scale.set()](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.scale)局部缩放属性 和 [.rotate](https://threejs.org/docs/index.html#api/zh/core/Object3D.rotateX) 旋转X Y Z轴属性

> 在工程化下导入three.js CSS3渲染器 CSS3对象模型 CSS3精灵模型

```js
import { CSS3DRenderer, CSS3DSprite, CSS3DObject  } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
```

> CSS3对象模型CSS3DObject 和 CSS3精灵模型CSS3DSprite的区别

* `THREE.CSS3DRenderer`能够渲染的模型对象是CSS3对象模型 `THREE.CSS3DObject`、CSS3精灵模型 `THREE.CSS3DSprite`。他俩使用方法都一样 只是展示效果略微不同
  * `CSS3DObject`CSS3对象模型的标签 缩放的时候跟着鼠标缩放变大变小，场景旋转的时候，它会跟着场景渲染器一起旋转 **但不会面对屏幕**
  * `CSS3DSprite`CSS3精灵对象模型的标签 和上面差不多 唯一区别是不会随着场景渲染器一起旋转 **始终面对屏幕**

### **创建 CSS3对象模型 `CSS3DObject`**

* [.scale.set()](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.scale)局部缩放需要设置 生成的3D元素的尺存(px)和渲染器尺寸差距较大 通常需要设置缩放比是`<1`

```js
// 创建一个CSS3DObject对象
function tag (name) {
  // 创建div元素(作为标签)
  const div = document.createElement('div');
  // 给标签插入内容(依据传来的参数)
  div.innerHTML = name;
  // 给元素设置一个class 方便设置样式
  div.classList.add('tag');
  //div元素包装为CSS3模型对象CSS3DObject
  const label = new CSS3DObject(div);
  //避免HTML标签遮挡三维场景的鼠标事件
  div.style.pointerEvents = 'none';
  //缩放CSS3DObject模型对象
  label.scale.set(0.2, 0.2, 0.2); //根据相机渲染范围控制HTML 3D标签尺寸
  label.rotateY(Math.PI / 2); //控制HTML标签CSS3对象姿态角度
  // label.rotateX(-Math.PI/2);
  return label; //返回CSS3模型标签      
}
```

> 渲染效果

* `CSS3DObject`CSS3对象模型的标签 缩放的时候跟着鼠标缩放变大变小，场景旋转的时候，它会跟着场景渲染器一起旋转 **但不会面对屏幕**

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/bd0cf6acd7414a0aafe75fb838a371e4.gif)

* 3D渲染器生成的html元素 [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)元素是[matrix3d()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix3d)3D 转换效果

![image-20220610122217013](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220610122217013.png)

### **创建 CSS3精灵对象模型 `CSS3DSprite`**

* [.scale.set()](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.scale)局部缩放需要设置 生成的3D元素的尺存(px)和渲染器尺寸差距较大 通常需要设置缩放比是`<1`

```js
// 创建一个HTML标签
function tag (name) {
  // 创建div元素(作为标签)
  const div = document.createElement('div');
  // 给元素设置一个class 方便设置样式(依据传来的参数)
  div.innerHTML = name;
  // 给元素设置一个class 方便设置样式
  div.classList.add('tag');
  //div元素包装为CSS3模型对象CSS3DSprite
  const label = new CSS3DSprite(div);
  div.style.pointerEvents = 'none'; //避免HTML标签遮挡三维场景的鼠标事件
  //缩放CSS3DSprite模型对象
  label.scale.set(0.2, 0.2, 0.2); //根据相机渲染范围控制HTML 3D标签尺寸
  label.rotateY(Math.PI / 2); //控制HTML标签CSS3对象姿态角度
  // label.rotateX(-Math.PI / 2);
  return label; //返回CSS3模型标签      
}
```

> 渲染效果

* `CSS3DSprite`CSS3精灵对象模型的标签 和上面差不多 唯一区别是不会随着场景渲染器一起旋转 **始终面对屏幕**

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/6c043673321f42d78a98d9f7d6c0da3c.gif)

### **创建 CSS3渲染器 `CSS3DRenderer `**

* 和 `CSS2DRenderer` CSS2渲染器差不多 不记录了 可以去[CSS3DRenderer](https://threejs.org/docs/index.html?q=CSS3DRenderer#examples/zh/renderers/CSS3DRenderer)文档中查看

```js
// 创建一个CSS3渲染器CSS3DRenderer
const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
// 相对标签原位置位置偏移大小
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
// //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);
//渲染场景中的HTMl元素包装成的CSS3模型对象
labelRenderer.render(场景scene, 相机camera);
// 在元素上绘制canvas
document.body.appendChild(labelRenderer.domElement);
```

### **把CSS3DObject对象添加到three.js中**

three.js会把元素Dom重新渲染成 three.js的[Object3D](https://threejs.org/docs/?q=Object3D#api/zh/core/Object3D)对象 这样就可以和网格模型进行交互 并且支持部分(区分2D和3D方法)[Object3D](https://threejs.org/docs/?q=Object3D#api/zh/core/Object3D)对象方法

<font color = ff3040>注意: 必须要把CSS3DObject对象添加到场景`scene` 或 `Group组对象`中去 否则不会被three.js进行渲染</font>

* 声明到`Group`组对象

```js
const model = new THREE.Group()// 声明一个组对象，用来添加加载成功的三维场景
const label = tag() // 假设label是CSS3DObject的内容
model.add(label) // CSS2DObject内容插入model组对象中
```

* 声明到`scene`场景中

```js
// 声明场景对象
const scene = new THREE.Scene()
const label = tag() // 假设label是CSS3DObject的内容
scene.add(ambient) // CSS3DObject内容插入scene场景对象中
```

## 2D、3D、3DSprite(精灵)渲染器的相关问题

* 2D 3D 3DSprite(精灵 )渲染器会出现的自适应 和 在虚拟Dom的问题记录
* 以下代码块 采用`CSS2DRenderer `2D渲染器 同样适用于`CSS3DRenderer` 3D渲染器

### **渲染器自适应**

* 有时候我们需要随着页面进行自适应操作 我们可以使用`.setSize` 方法重新设置渲染的输出尺寸 使用方法和场景渲染器`WebGLRenderer`自适应一样 
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
* 原因是three.js的 `CSS2DRendeer`生成的标签直接就是挂在真实的DOM上，并非是Vue的虚拟DOM上，所以在页面切换的时候，这个标签并不会随着切换而消失。而是一直在页面的body上面

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

### **把Vue组件转换为CSS2DObject**

把Vue写好的组件 转换为`CSS2DObject` 或者 `CSS3DObject` 让其成为three.js的内容

* 第一步导入组件 给其绑定`id` 方便选中其Dom节点

```vue
<template>
  <div>
    <!-- 渲染模板 -->
    <div ref="stateDom" style="position: relative;" @click="checked">
      <!-- 导入详细信息card -->
      <tagCards id="messageTag" />
    </div>
  </div>
</template>
```

* 第二步封装一个把Dom节点转换成`CSS2DObject` js方法 (通常单独js文件 里面包含`CSS2DRenderer ` 2D渲染器)
  * 注意 需要`CSS2DRenderer ` 2D渲染器 这里就不写了

```js
const tagCard = (domID) => {
  // 获取需要转换
  const dom = document.getElementById(domID)
  // dom元素包装为CSS2模型对象CSS2DObject
  const label = new CSS2DObject(dom)
  dom.style.pointerEvents = 'none'// 避免HTML标签遮挡三维场景的鼠标事件
  return label// 返回CSS2模型标签
}
```

* 第三步 在页面的`onMounted`中进行`CSS2DObject` 转换
  * 可以使用`nextTick()` 确保Dom渲染完毕

```vue
<template>
  <div>
    <!-- 渲染模板 -->
    <div ref="stateDom" style="position: relative;" @click="checked">
      <!-- 导入详细信息card -->
      <tagCards id="messageTag" />
    </div>
  </div>
</template>
<script setup>
const context = reactive({
    // 储存转换好的CSS2DObject
  messageTag: null
})
onMounted(() => {
    // 确保Dom渲染完毕
  nextTick(() => {
      // 通过id把Dom转换为CSS2DObject
      context.messageTag = tagCard('messageTag')
      //! 很关键 需要把转换好的CSS2DObject添加到 场景scene 或 Group组对象中
      model.add(context.messageTag)
      // 设置渲染顺序和css的z-index一样 设置高一点防止被覆盖
      context.messageTag.renderOrder = 12
  })
})
</script>
```

* 被转换的Vue组件可以正常使用任何Vue的api 并且响应式数据依旧有效 因为是先进行Vue组件的内容 然后渲染再转换成CSS2DObject 最后渲染到页面中

![image-20220614142147851](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220614142147851.png)

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
