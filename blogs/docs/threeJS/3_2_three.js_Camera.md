---
title: three.js 之 Camera相机
date: 2022-05-30
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271755262.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Camera 相机 <br>
:::

<!-- more -->

## 相机Camera的作用

查看 Three.js 的文档，可以看到 [Camera](https://threejs.org/docs/index.html#api/zh/cameras/Camera) 是一个抽象类，一般不直接使用，其他类型的 Camera 实现了这个抽象类。有

- `ArrayCamera` 包含着一组子摄像机，常用于多人同屏的渲染，更好地提升VR场景的渲染性能
- `StereoCamera` 双透视摄像机（立体相机），常用于创建 3D 立体影像，比如 3D 电影之类或 VR
- `CubeCamera` 有6个渲染，分别是立方体的6个面，常用于渲染环境、反光等
- `OrthographicCamera` 正交相机，在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染2D场景或者UI元素是非常有用的。

```js
// 正投影相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)

```

- `PerspectiveCamera` 透视相机，这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。

```js
// 透视投影相机对象
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)

```

> 透视相机 和 正交相机的区别图

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/aHR0cDovL3d3dy53ZWl4aXl1ZS5jb20vd29yZHByZXNzL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE5LzA4LzMzMy0xMDI0eDQyNy5wbmc)

> 其他相机

![image-20220606145127687](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220606145127687.png)

## [PerspectiveCamera ](https://threejs.org/docs/index.html?q=PerspectiveCamera#api/zh/cameras/PerspectiveCamera)透视相机

```js
PerspectiveCamera(fov : Number, aspect : Number, near : Number, far : Number)
```

| fov    | fov表示视场，所谓视场就是能够看到的角度范围，人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度 | 45                                       |
| ------ | ------------------------------------------------------------ | ---------------------------------------- |
| aspect | aspect表示渲染窗口的长宽比，如果一个网页上只有一个全屏的canvas画布且画布上只有一个窗口，那么aspect的值就是网页窗口客户区的宽高比 | `window.innerWidth`/`window.innerHeight` |
| near   | near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 | 0.1                                      |
| far    | far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到 | 1000                                     |



![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/threejs60PerspectiveCamera.png)

* 透视图中，灰色的部分是视锥体，是可能被渲染的物体所在的区域。`fov` 是视锥体竖直方向上的张角（是角度制而非弧度制）

* `aspect`等于 width / height，是照相机水平方向和竖直方向长度的比值，通常设为 Canvas 的横纵比例。

* `near` 和 `far` 分别是照相机到视锥体最近、最远的距离，均为正值，且 `far`应大于 `near`。

* 通常我们设置`.position.set`的时候 `X Y Z`的倍数大于正交角度的10倍
* <font color =#ff3040>注意: 不要将 near 和 far 设置为比较极端的数值，如 0.0001 和 99999，这可能引起 bug，让 threejs 无法分辨物体的前后，导致闪动</font>

```js
import * as THREE from 'three'
// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x607d8b,
  }),
)
scene.add(cube)

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
const width = window.innerWidth; //窗口文档显示区的宽度
const height = window.innerHeight; //窗口文档显示区的高度
//  透视投影相机
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000); // (角度, 长宽比, 近裁截面, 远裁截面)
camera.position.set(318, 162, 204);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
renderer.render(scene, camera)
```

效果如下：

* 多个模型效果更加明显 离你最近的模型会比离你最远的模型大不少

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/v2-3f6e24601ffc17a0c4d08f2d11fe58ea_720w.jpg)

## [OrthographicCamera](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/cameras/OrthographicCamera) 正交相机

```js
OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
```

| 参数(属性) | 含义                                                         |
| :--------- | :----------------------------------------------------------- |
| left       | 渲染空间的左边界                                             |
| right      | 渲染空间的右边界                                             |
| top        | 渲染空间的上边界                                             |
| bottom     | 渲染空间的下边界                                             |
| near       | near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值0.1 |
| far        | far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到。 默认值1000 |

三维场景中坐标值不在三维空间中的网格模型不会被渲染出来，会被剪裁掉，比如你把上面代码中far参数的值从1000更改为420，你会发现长方体的一部分无法显示。

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/threejs60OrthographicCamera.png)



为了保持照相机的横竖比例，需要保证

```js
(right - left)
```

与

```js
(top - bottom)
```

的比例与 Canvas 宽度与高度的比例一致。

```js
import * as THREE from 'three'
import stats from '../common/stats'

// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x607d8b,
  }),
)
scene.add(cube)

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
const width = window.innerWidth; //窗口文档显示区的宽度
const height = window.innerHeight; //窗口文档显示区的高度
// 正投影相机
const k = width / height; //Three.js输出的Cnavas画布宽高比
// var s = 200; //控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大
const s = 100;//根据你想要渲染的粮仓范围设置相机渲染范围大小
//THREE.OrthographicCamera()创建一个正投影相机对象
// -s * k, s * k, s, -s, 1, 1000定义了一个长方体渲染空间，渲染空间外的模型不会被渲染
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000); // (左侧面, 右侧面, 上侧面, 下侧面, 近裁截面, 远裁截面)
// camera.position.set(200, 300, 200); //相机在Three.js坐标系中的位置
camera.position.set(292, 223, 185);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  stats.begin()

  const delta = clock.getDelta()

  cube.rotation.y += 1 * delta

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick()
```

效果如下：

* 无论如何 离你近的和离你远的模型都一个大小

![v2-658ad7429ff462798328098b7966dcc6_b](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/v2-658ad7429ff462798328098b7966dcc6_b.gif)

## ArrayCamera 阵列相机

[ArrayCamera](https://threejs.org/docs/index.html?q=ArrayCamera#api/zh/cameras/ArrayCamera) 可以帮我们方便的在一张画布上渲染多个相机视角，这有点像在监控室的大屏幕上看多个摄像头或者是在同一台电脑上玩多人游戏时的分屏显示。

## StereoCamera 立体相机

[StereoCamera ](https://threejs.org/docs/index.html?q=StereoCamera#api/zh/cameras/StereoCamera)立体相机，这个相机很好玩，我们可以很简单的将场景渲染出需要带VR / 3D眼镜才可以观看到的立体效果。

![image-20220606145331665](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220606145331665.png)



## CubeCamera 立方体相机

[CubeCamera](https://threejs.org/docs/index.html?q=CubeCamera#api/zh/cameras/CubeCamera)必须配合[WebGLCubeRenderTarget](https://threejs.org/docs/index.html?q=WebGLCubeRenderTarget#api/zh/renderers/WebGLCubeRenderTarget)一起使用，这个相机主要用于将当前场景的画面实时渲染成一个六面图（全景图的一种），用于创建类似镜面反射的效果。

## Camera 相机参数设置

* `Camera`相机可以当成一双眼睛 通过`Camera`可以设置相机的角度距离参数 这样页面刚进来的时候 就可以在合适的区域内进行观看
* 在three.js中 没有单位的概念 只有数字 没有任何单位的概念
* <font color =#ff3040>注意: 在大多数属性发生改变之后，你将需要调用[.updateProjectionMatrix](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/cameras/OrthographicCamera.updateProjectionMatrix)来使得这些改变生效。</font>

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/threejs60camera.png)

### **相机位置 .position.set(x,y,z)**

* 通过[.position.set](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D.position) 我们可以设置相机的默认的角度(三维向量`Vector3`) 分别代表(x,y,z)

```js
camera.position.set(292, 223, 185);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
```

* 通常我们不会随便设置相机位置 我们可以搭配相机控件 `OrbitControls` 来获取合适的相机`.position`角度 
  * 该调试方式适用于`OrthographicCamera` 正交相机 和 `PerspectiveCamera` 透视相机 


```js
// 渲染循环
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
```

### 相机指向坐标系 .lookAt(x,y,z)

* 通过[.lookAt](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D.lookAt) 我们可以设置相机在Three.js坐标系中的渲染位置 也就通过`AxesHelper`的到的Three.js坐标轴为准的渲染的位置分量

```js
camera.lookAt(0, 0, 0); //相机指向Three.js坐标系原点
```

* 通常我们我们很依赖 模型提供的坐标系 如果模型到导出的坐标系符合需求 那我们可以不用设置具体参数 设置0即可
  * 我们可以告诉建模师(美术) 把坐标原点放到我们需要的区域
* 如果我们设置了轨道控制器 `OrbitControls` 那么`.lookAt`参数不会生效 取默认值为0 

![image-20220529201212577](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220529201212577.png)

## 相机自适应页面的尺寸

通过`window.onresize`监听页面尺寸是否改变 重新给画布赋值 并更新摄像机投影矩阵

* <font color =#ff3040>注意: 修改了相机参数 需要用到[.updateProjectionMatrix](https://threejs.org/docs/index.html?q=PerspectiveCamera#api/zh/cameras/PerspectiveCamera.updateProjectionMatrix)方法 进行参数更新</font>

  ![image-20230221142449014](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302211424049.png)

* [position](https://threejs.org/docs/index.html#api/zh/core/Object3D.position) 位置属性不需要

### **正投影相机[OrthographicCamera](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/cameras/OrthographicCamera)自适应渲染**

* 渲染区域变化了，要通过Three.js渲染器`.setSize()`方法重置渲染器渲染尺寸。

```js
// onresize 事件会在窗口被调整大小时发生
window.onresize = () = >{
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth,window.innerHeight);
  // 重置相机投影的相关参数
  k = window.innerWidth/window.innerHeight;//窗口宽高比
  camera.left = -s*k;
  camera.right = s*k;
  camera.top = s;
  camera.bottom = -s;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix ();
};
```

### **透视投影相机[PerspectiveCamera](https://threejs.org/docs/index.html?q=PerspectiveCamera#api/zh/cameras/PerspectiveCamera)自适应渲染**

* 渲染区域变化了，要通过Three.js渲染器`.setSize()`方法重置渲染器渲染尺寸。

```js
// onresize 事件会在窗口被调整大小时发生
window.onresize = () = >{
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth,window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth/window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix ();
};
```

渲染区域尺寸变化，相机的相关参数自然也需要变化，改变相机的参数后，注意需要执行相机对象`.updateProjectionMatrix ()`方法更新相机对象的投影矩阵`.projectionMatrix`，之所以需要手动更新，是因为Threejs为了提高渲染效率，Threejs系统每次执行渲染器`WebGLRenderer`渲染方法`.rener()`的时候不会读取相机相关的参数重新计算一次投影矩阵`.projectionMatrix`，Threejs系统只会首次渲染的时候计算一次投影矩阵，所以当你改变影响相机投影矩阵的属性，自然需要调用`.updateProjectionMatrix ()`更新相机对象的投影矩阵`.projectionMatrix`。

## **预置的相机控制器**

下面为大家介绍一下具体有哪些内置的相机控制器，以及它们分别提供怎样的功能

### **陀螺仪控制器(被删除)**

* DeviceOrientationControls 绝大多数当下主流的移动设备都支持，用倾斜旋转手机的方式来控制我们的相机镜头。利用这个控制器可以很容易的创造出类似VR眼镜那样的体验。

### **飞行控制器 和 第一人称控制器**

* [FlyControls](https://threejs.org/docs/index.html?q=FlyControls#examples/zh/controls/FlyControls)，[FirstPersonControls](https://threejs.org/docs/index.html?q=FirstPersonControls#examples/zh/controls/FirstPersonControls) 这两个控制器提供的功能极为相似，都可以很容易的实现类似人在场景中移动的效果。在开发一些比如VR看房，虚拟展厅，虚拟世界探索游戏等需求时很常用。

### **指针锁定控制器**

* [PointerLockControls](https://threejs.org/docs/index.html?q=PointerLockControls#examples/zh/controls/PointerLockControls) 使用这个控制器会隐藏鼠标指针，相机镜头会跟随mousemove事件旋转看向不同的方位，就像真正的射击游戏那样。当我们需要创建一个第一人称的3D游戏时，这个控制器是最佳选择。

### **环轨控制器(轨道控制器)**

* [OrbitControls](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls) 我们刚才其实已经手写过了这个控制器的核心逻辑。当然，这个内置的控制器比我们刚才写的要完善很多，比如让我们可以通过拖拽旋转镜头，使用滚轮放大或缩小等等。这个控制器不允许世界颠倒，这是它和下面轨迹球控制器的区别。

###  **轨迹球控制器**

* [TrackballControls](https://threejs.org/docs/index.html?q=TrackballControls#examples/zh/controls/TrackballControls) 轨迹球控制器，和环轨控制器的效果极为相似，区别是取消了垂直镜头的区间限制，允许世界颠倒。

## 滚动页面

* 页面多个内容滚动的时候(高度为`100vh`) 可以通过相机的`y`轴移动 来显示这些内容

```tsx
    // 移动相机 下滚动所以是-y 让相机沿着-y轴移动 
    this.camera.position.y =
      -(window.scrollY / window.innerHeight) * 30 // 当前滚动的距离 / 屏幕高度 * 物体间距 下滚动所以是-y
```

## 参考文献

[Three.js 之相机 Camera](https://zhuanlan.zhihu.com/p/510877492)

[Three.js里的相机和镜头控制 | 《Three.js零基础直通06》](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247487835&idx=1&sn=0f4822c38abafcf572cb412cb32aa67c&chksm=cefc7438f98bfd2ef88798c5bb353b7ce3106cc607e4b497c5231c9262c055bb759619648875&scene=178&cur_album_id=2405559566127480834#rd)

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
