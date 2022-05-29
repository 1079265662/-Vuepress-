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

## three.js相关控件介绍

* 记录three.js的相关控件学习笔记 因为文章过长 以单独文章作为记录 通过学习

* 相关控件包括

  ☑️ [`Material` 材质](./3_three.js_Material.md)

  - [ ] `Camera` 相机
  - [ ] `Light` 光源
  - [ ] `Matrix` 欧拉角

## Camera相机参数设置

* `Camera`相机可以当成一双眼睛 通过`Camera`可以设置相机的角度距离参数 这样页面刚进来的时候 就可以在合适的区域内进行观看
* 在three.js中 没有单位的概念 只有数字 没有任何单位的概念
* <font color =#ff3040>注意: 在大多数属性发生改变之后，你将需要调用[.updateProjectionMatrix](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/cameras/OrthographicCamera.updateProjectionMatrix)来使得这些改变生效。</font>

> 声明相机

* 假如我们设置一个[正交相机（OrthographicCamera）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/cameras/OrthographicCamera)声明相机需要一些构造参数 可以去官方看看

![image-20220529192741664](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220529192741664.png)

```js
const width = window.innerWidth; //窗口文档显示区的宽度
const height = window.innerHeight; //窗口文档显示区的高度
// Three.js输出的Cnavas画布宽高比
const k = width / height; 
// 根据你想要渲染的粮仓范围设置相机渲染范围大小
const s = 100;
// -s * k, s * k, s, -s, 1, 1000定义了一个长方体渲染空间，渲染空间外的模型不会被渲染 
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
```

### **相机位置 .position(x,y,z)**

* 通过[.position](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D.position) 我们可以设置相机的默认的角度(三维向量`Vector3`) 分别代表(x,y,z)

```js
camera.position.set(292, 223, 185);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
```

* 通常我们不会随便设置相机位置 我们可以搭配相机控件 `OrbitControls` 来获取合适的相机`.position`角度 

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

## 辅助控件插件

* 记录非three.js核心的内容 这些基本上都是控件之类的 用来提供页面中的交互效果 

### **轨道控制器 OrbitControls**

* 听起来感觉很牛逼的感觉 实际上就是相机围绕目标进行轨道运动的效果 实现来拖拽和放大缩小模型 [官方介绍](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)
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

### **开启XYZ轴辅助线 AxesHelper**

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

## 优化相关

* 记录three.js的相关优化 

### **自适应页面的尺寸**

* 通过`window.onresize`监听页面尺寸是否改变 重新给画布赋值 并更新摄像机投影矩阵
* 修改了相机参数 需要用到`updateProjectionMatrix`方法 进行参数更新

```js
// 导入Vue组合API
import { reactive } from 'vue'
// 代理渲染的参数
const contentCamera = reactive({
  // 渲染宽度
  width: window.innerWidth,
  // 渲染高度
  height: window.innerHeight,
  // 渲染范围
  size: 100
})
// 监听页面尺寸是否修改
window.onresize = () => {
  // 获取新的尺寸数据
  contentCamera.width = window.innerWidth
  contentCamera.height = window.innerHeight
  // 重新渲染场景
  renderer.setSize(contentCamera.width, contentCamera.height)
  // 更新相机参数 不更新相机参数 会导致相机内容拉伸
  const k = contentCamera.width / contentCamera.height // Three.js输出的Canvas画布宽高比
  const s = contentCamera.size// 控制相机渲染空间左右上下渲染范围，s越大，相机渲染范围越大
  camera.left = -s * k
  camera.right = s * k
  camera.top = s
  camera.bottom = -s
  // 更新相机参数后执行
  camera.updateProjectionMatrix()
}
```

## 常用Object3D方法

* 这是Three.js中大部分对象的基类，提供了一系列的属性和方法来对三维空间中的物体进行操纵。详细看这里[三维物体（Object3D）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D)
* 请注意，可以通过.add( object )方法来将对象进行组合，该方法将对象添加为子对象，但为此最好使用Group（来作为父对象）

### **旋转角度 rotateX rotateY rotateZ**

* 旋转X Y Z轴的角度 让内容朝某个方向转起来

```js
物体的网格对象(Mesh).rotateY(速度(0.1)) // rotateX rotateY rotateZ
```

## 导入外部加载的模型 GLTFLoader

* 我们在做threejs的时候会引入大量3D模型 通过是`gltf/glb`格式的文件 代替我们前端渲染的复杂模型 我们前端只需要写交互即可 我记录了有关[gltf格式的信息](./3_gltf)
* 我们可以使用官方的控件 [GLTFLoader](https://threejs.org/docs/index.html?q=GLTFLoader#examples/zh/loaders/GLTFLoader) 来实现加载`gltf/glb` 格式的文件 获取其模型对象 通过添加场景 光源 相机 渲染器后 直接在页面中显示
  * 获取完模型对象后 需要把模型对象`add`到声明的场景中去
* <font color =#ff3040>注意: GLTFLoader支持地址`url` 如果你想在Vue cli上本地加载 需要在`public`文件夹下 存放本地的`gltf/glb` 并且只支持 绝对路径 不支持相对路径</font>
* 我们通常在Vue cli上使用GLTFLoader加载会用`process.env.BASE_URL` 脚手架提供的获取环境路径方法 以防止出现位置bug

```js
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const model = new THREE.Group();//声明一个组对象，用来添加加载成功的三维场景
const loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load(`${process.env.BASE_URL}model/model.gltf`, function (gltf) {//gltf加载成功后返回一个对象
    console.log('控制台查看gltf对象结构', gltf);
    //gltf.scene可以包含网格模型Mesh、光源Light等信息，至于gltf.scene是否包含光源，要看.gltf文件中是否有光源信息
    console.log('gltf对象场景属性', gltf.scene);
    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);
})
const scene = new THREE.Scene();
scene.add(model);// 把三维模型添加到场景中
```

* Vue cil 脚手架的下载文件路径(用来存放`gltf/glb` 等需要下载的本地文件) 

![image-20220510183547946](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220510183547946.png)

### **异步加载**

* `.loadAsync` 可以支持异步加载[详细](https://threejs.org/docs/index.html?q=TextureLoader#api/zh/loaders/Loader.loadAsync) 异步加载使用的`promise`方法 需要通过`then`和`catch`获取其异步加载状态

```js
loader.loadAsync(`${process.env.BASE_URL}model/model.gltf`, (gltf) => { // gltf加载成功后返回一个对象 该对象是模型信息
      console.log('控制台查看gltf对象结构', gltf)
      // gltf.scene可以包含网格模型Mesh、光源Light等信息，至于gltf.scene是否包含光源，要看.gltf文件中是否有光源信息
      console.log('gltf对象场景属性', gltf.scene)
    }).then(() => {
    ... 调用成功的方法
    }).catch(()=>{
    ... 调用失败的方法
})
```

### **颜色偏差问题**

* 通过`GLTFLoader`导入的gltf文件 大概率会出现颜色偏差问题 是因为three.js的默认颜色空间是 线性颜色空间`THREE.LinearEncoding` gltf的颜色空间是sRGB
* 通过three.js的[纹理常量Textures](https://threejs.org/docs/index.html?q=PlaneGeometry#api/zh/constants/Textures) 了解到需要在 创建渲染器`WebGLRenderer`的时候进行颜色空间的处理

```js
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
})
renderer.outputEncoding = THREE.sRGBEncoding// 解决加载gltf格式模型纹理贴图和原图不一样问题
```

* sRGB 如果我们导入了非gltf的模型 比如`TextureLoader`方法导入的PNG和JPG图片 那么你已经设置渲染器`WebGLRenderer`的颜色空间为sRGB 那么`TextureLoader`的图片也需要设置`sRGB ` [材质设置颜色空间方法](https://threejs.org/docs/index.html?q=PlaneGeometry#api/zh/textures/Texture.encoding) 如过导入了`map`纹理贴图 需要`map.encoding`

```js
// 创建纹理贴图
var texture = new THREE.TextureLoader().load( './scene/model_img3.png' );//加载纹理贴图
// 创建一个平面缓冲几何体(面)
var geometry = new THREE.PlaneGeometry(185, 260);
// 创建一个网格朗伯材质
var material = new THREE.MeshLambertMaterial({ 
    // 设置渲染面
    side: THREE.DoubleSide ,
    // 设置纹理贴图
    map:texture,
});
//设置纹理贴图编码方式和WebGL渲染器一致  如过导入了map纹理贴图 需要map.encoding
material.map.encoding = THREE.sRGBEncoding;
//  声明网格模型 导入平面缓冲几何体(面)和网格材质
var plane = new THREE.Mesh(geometry, material);
```

## 导入纹理 TextureLoader

* 纹理一般是指我们常见的在一些第三方程序中创建的图像，如PNG和JPG类型的图。我们把这张图片放在立方体上。（我通常称为`贴图`）。我们需要做的就是创建一个TextureLoader。调用它的load方法，同时传入图像的URL，并将材质的 map 属性设置为该方法的返回值
* 该方法通常是配合`MeshBasicMaterial`方法 进行加载基础网格材质

```js
  const texture = new THREE.TextureLoader().load('https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%B0%8Fmao.jpg')
```

## 使用网格基础材质 MeshBasicMaterial

* 最基本的材质是 `MeshBasicMaterial`。你能够把颜色`color`作为参数传进去来生成一个实心的带颜色对象，没有阴影，也不受光照影响。你也能够通过把透明度`opacity`作为参数传进去来调整透明度以及设置透明`transparent`为`true`。
* 详情[看这里](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshBasicMaterial) 如果我们想给基础材质 导入图片或gif等 可以配合`TextureLoader` 导入后 在[map](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshBasicMaterial.map)方法中进行纹理导入 最后在网格对象`Mesh`中导入
  * 如果要修改渲染面 请看[这里]( https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/Material.side) 通过`side`设置

```js
  // 创建一个立方体
  const geometry = new THREE.BoxGeometry(100, 100, 100) 
  // 创建图片网格材质
  const texture = new THREE.TextureLoader().load('https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%B0%8Fmao.jpg')
  // 创建网格材质
  const skyBoxMaterial = new THREE.MeshLambertMaterial({
      // 设置纹理贴图
    map: texture,
      // 设置渲染面: 
    side: THREE.DoubleSide
  })
  // 声明网格模型 导入创建的立方体和网格材质
  content.mesh = new THREE.Mesh(geometry, skyBoxMaterial)
```
