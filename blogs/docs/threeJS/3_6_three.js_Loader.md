---
title: three.js 之 Loader加载器
date: 2022-06-16
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-q2ypkl.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Loader 加载器 <br>
:::

<!-- more -->

## 加载器Loader的作用

* 如果想做复杂的webgl场景 离不开加载器 加载器通过把`gltf`和`glb`的3D模型加载进来 转换成three.js的[Object3D](https://threejs.org/docs/index.html?q=Object#api/zh/core/Object3D) 他是其实就可以理解为`Mesh` 然后把他`.add`到`Scene`中 渲染到场景中
  * 一个glTF组件可传输一个或多个场景， 包括网格、材质、贴图、蒙皮、骨架、变形目标、动画、灯光以及摄像机。
* 也可以加载一张
* 加载器都依赖基类[.Loader](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader) 用来实现加载
  * 普通加载方法 [.load ](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader.load)
  * es6 `promise`加载 [.loadAsync](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader.loadAsync)
* [TextureLoader](https://threejs.org/docs/index.html#api/zh/loaders/TextureLoader) 纹理贴图加载器现在不支持进度监听, 直接通过`onLoad`方法监听是否加载完成即可

> 加载器的分类

* 模型加载器 用来加载大型模型 `gltf`和`glb`模型文件 <font color =#ff3040>模型加载器需要单独`import`引入</font>
  * [GLTFLoader()](https://threejs.org/docs/index.html?q=textur#examples/zh/loaders/GLTFLoader) 加载`gltf`和`glb`文件中的3D模型
* 贴图加载器 通常用来加载`png` `jpg` `gif` 或者制作`序列帧动画`  <font color =#ff3040>贴图加载器不需要引入</font>
  * [TextureLoader()](https://threejs.org/docs/?q=TextureLoade#api/zh/loaders/TextureLoader ) 通常用来加载一张图片可以返回一个[texture  贴图对象](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/TextureLoader) 作为一个表面，或者作为反射/折射贴图

> <font color =#ff3040>注意</font>

* 项目部署后 有可能资源会在服务器端进行压缩(尤其是大的图片`HDR`资源) 导致资源图片的加载大小 大于 总文件大小 计算百分比会出问题 解决该问题 可以把资源挂载到OSS云上 或者在服务器端取消图片压缩 已知会压缩的平台: [netlify](https://www.netlify.com/)

![123](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210211826476.jpg)

## 导入外部加载的模型 GLTFLoader()

* 我们在做threejs的时候会引入大量3D模型 通过是`gltf/glb`格式的文件 代替我们前端渲染的复杂模型 我们前端只需要写交互即可 我记录了有关[gltf格式的信息](./3_gltf)
* 我们可以使用官方的控件 [GLTFLoader](https://threejs.org/docs/index.html?q=GLTFLoader#examples/zh/loaders/GLTFLoader) 来实现加载`gltf/glb` 格式的文件 获取其模型对象 通过添加场景 光源 相机 渲染器后 直接在页面中显示
  * 获取完模型对象后 需要把模型对象`add`到声明的场景中去
* GLTFLoader支持地址`url` 如果你想在Vue cli上本地加载 需要在`public`文件夹下 存放本地的`gltf/glb` 并且只支持 绝对路径 不支持相对路径
  * 也可以在`assets`中通过`import`方式引入

* 我们通常在Vue cli上使用GLTFLoader加载会用`process.env.BASE_URL` 脚手架提供的获取环境路径方法 以防止出现位置bug
* <font color =#ff3040>注意: 模型加载器需要单独`import`引入</font>

```js
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const model = new THREE.Group() //声明一个组对象，用来添加加载成功的三维场景
const loader = new GLTFLoader() //创建一个GLTF加载器
loader.load(`${process.env.BASE_URL}model/model.gltf`, (gltf) => {
  //gltf加载成功后返回一个对象
  console.log('控制台查看gltf对象结构', gltf)
  //gltf.scene可以包含网格模型Mesh、光源Light等信息，至于gltf.scene是否包含光源，要看.gltf文件中是否有光源信息
  console.log('gltf对象场景属性', gltf.scene)
  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene)
})
const scene = new THREE.Scene()
scene.add(model) // 把三维模型添加到场景中

```

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

* 通过`GLTFLoader`导入的gltf文件 可能会出现颜色偏差问题 是因为three.js的默认颜色空间是 线性颜色空间`THREE.LinearEncoding` gltf的颜色空间是`sRGB`
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

### **批量修改网格模型材质**

* 我们可以使用模型提供的材质 通过[.traverse](https://threejs.org/docs/index.html#api/zh/core/Object3D.traverse)方法 遍历object3D对象方法把模型文件`glb`或`glft`的材质遍历出来使用
* 要用`.type` 去判断类型 在three.js 导入`glt `或 `gltf`中 `Mesh`是网格模型对象的属性名(键)

```js
    const model = new THREE.Group()// 声明一个组对象，用来添加加载成功的三维场景
    const loader = new GLTFLoader() // 创建一个GLTF加载器
    loader.loadAsync(`${process.env.BASE_URL}model/model.glb`, (gltf) => { // gltf加载成功后返回一个对象
    }).then((gltf) => {
      // 递归遍历gltf.scene，批量更改所有Mesh的材质
      gltf.scene.traverse(object => {
        if (object.type === 'Mesh') {
          // MeshLambertMaterial：受光照影响   MeshBasicMaterial：不受光照影响
          object.material = new THREE.MeshLambertMaterial({
            map: object.material.map, // 获取原来材质的颜色贴图属性值
            color: object.material.color // 读取原来材质的颜色
            // side: THREE.DoubleSide,//围墙需要设置双面显示
          })
        }
      })
      // 把gltf.scene中的所有模型添加到model组对象中
      model.add(gltf.scene)
    })
```

## Loader加载器在Vue cil中加载

* 在Vue cil使用[.Loader](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader)加载器 需要注意 如果想使用本地资源 需要把资源文件放到[public](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)非编译静态(必须绝对路径) 或者 `assets`编译静态中

### **public 非编译静态资源加载**

* [public](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)非编译静态加载 需要和当前Vue cli环境变量[process.env.BASE_URL](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 进行绝对路径的拼接 并且不可以使用相对路径

```js
const loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load(`${process.env.BASE_URL}model/model.gltf`, function (gltf) { // 进行process.env.BASE_URL 和 资源绝对路径的拼接
// ...进行操作
})
```

* 对应的资源文件

![image-20220510183547946](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220510183547946.png)

### **assets 编译资源加载**

* `assets `编译资源 他会被webpack进行编译处理 所以在非`vue`文件中 引入会出问题 需要通过es6`import` 或 CommonJs `require` 方式导入进来

```js
// require方式导入 (适合webpack和vite)
const img = require('@/assets/火焰/火焰.png')
// import方式导入 (适合vite)
import img from '@/assets/火焰/火焰.png'
// 加载导入的纹理贴图
const texture = textureLoader.load(img)
```

* 对应的资源文件

![image-20220619171155446](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220619171155446.png)

## 资源统一加载

* 任何类型的加载器 建议使用统一的加载方式(声明一个加载器的常量) 这样减少复用 并且在使用[LoadingManager](https://threejs.org/docs/index.html?q=loading#api/zh/loaders/managers/LoadingManager)加载管理器的时候更加的方便

> 举一个TextureLoader纹理贴图加载器案例

* [MeshStandardMaterial](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial)标准网格材质的纹理贴图具备很多内容 都需要使用[TextureLoader](https://threejs.org/docs/index.html?q=TextureLoader#api/zh/loaders/TextureLoader)纹理贴图加载器 进行加载

```js
  // 声明一个加载器的常量
  const textureLoader = new THREE.TextureLoader()
  // 创建纹理
  const texture = textureLoader.load(logo)
  // 创建灰度纹理
  const textureGray = textureLoader.load(logoGray)
  // 创建环境遮挡贴图
  const textureEnv = textureLoader.load(logoEnv)
  // 创建置换纹理
  const textureDisplacementMap = textureLoader.load(displacementMap)
  // 创建粗糙度纹理
  const textureRoughness = textureLoader.load(roughness)
  // 创建金属贴图
  const textureMetalness = textureLoader.load(metalness)
  // 创建法线贴图
  const textureNormal = textureLoader.load(normal)
  // 创建一个在网格模型中展示的几何体
  const cubeGeometry = new THREE.BoxGeometry(3, 3, 3, 200, 200, 200) // 参数为长宽高 以及长宽高的分段数 横截面，利于变形使用，段数越多越柔和，则段数越少越生硬。
  // 使用PBR材质
  const cubeMaterial = new THREE.MeshStandardMaterial({
    // 设置纹理贴图image.png
    map: texture,
    // 设置灰度纹理贴图
    alphaMap: textureGray,
    // 设置透明度 一定要把透明度设置为true
    transparent: true,
    // 设置环境遮挡贴图
    aoMap: textureEnv,
    // 设置环境遮挡贴图强度
    aoMapIntensity: 1, // 默认为1 最小值为0 最大值为1
    // 使用置换纹理
    displacementMap: textureDisplacementMap,
    // 设置置换纹理强度
    displacementScale: 0.1, // 默认为1 最小值为0 最大值为1
    // 设置粗糙度纹理
    roughnessMap: textureRoughness,
    // 设置粗糙度
    // roughness: 0.5, // 默认为0.5 最小值为0 最大值为1
    // 设置金属度
    metalness: 0.5, // 默认为0.5 最小值为0 最大值为1
    // 设置金属贴图
    metalnessMap: textureMetalness,
    // 导入法线贴图
    normalMap: textureNormal
  })

  // 创建一个网格模型 放入创建的几何体和其自身材质
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // Mesh(几何体, 纹理材质)
  // 设置环境遮挡贴图第二组uv坐标 (就是把第一组uv坐标的值赋值给第二组uv坐标)
  cube.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(cube.geometry.attributes.uv.array, 2))

  // 将几何体添加到场景中
  scene.add(cube)
```

## LoadingManager加载管理器

* 每个加载器 都自带一个加载监听事件 如果想统一管理加载的内容 判断加载进度或者是否加载成功 需要使用[LoadingManager](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/managers/LoadingManager)加载管理器
  * 声明加载管理器 把其变量塞到事件的加载器中即可使用
  * [.onProgress](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/managers/LoadingManager.onProgress) 有三个参数
    * `url` — 被加载的项的url (资源路径 绝对/相对路径 依据你导入的方式)
    * `itemsLoaded` — 目前已加载项的个数。
    * `itemsTotal` — 总共所需要加载项的个数。
* <font color =#ff3040>注意: 加载管理器适合资源统一加载(上面介绍过) 使用一个统一的加载器的常量</font>
* <font color =#ff3040>注意: 加载管理器不适合监控单文件加载进度(比入一张图) 单文件就是0到1的关系 不适合使用加载管理器</font>

```tsx
// 导入three.js
import * as THREE from 'three'
// 导入Vue响应式
import { ref } from 'vue'
// 储存加载的百分比
const loadingNumber = ref(0)
/**
 * @description: 声明加载管理器
 * @returns {any}
 */
function loading(): any  {
  // 创建加载器
  const manager = new THREE.LoadingManager()
  // 加载中的参数  url被加载的项的url itemsLoaded目前已加载项的个数 itemsTotal总共所需要加载项的个数。
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  // 获取加载百分比: 已加载个数 / 总数量 * 100 计算出加载百分比 并取两位小数
    loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(2))
  }
  // 返回加载管理器的变量
  return manager
}

/**
 * @description: 清除加载器和动画(销毁方法)
 */
function dispose() {
  // 清除渲染器
  renderer.dispose()
  // 清除动画
  cancelAnimationFrame(animationId)
  // 重置加载的百分比
  loadingNumber.value = 0
}

// 设置一个统一的纹理加载器
const textureLoader = new THREE.TextureLoader(loading()) // 在加载器中使用加载管理器
//TODO 进行各种纹理的加载操作
```

* **提示: 建议再销毁方法中 重置加载的百分比 这样下次加载的时候显示效果更好**

### **单个和多个文件统一加载器**

* 单个文件用文件的加载器进行传参计算 多个文件用`LoadingManager`加载管理器

```tsx


/**
 * @description: 声明加载管理器
 * @param {number | void} total
 * @param {number | void} loaded
 * @returns {any}
 */
function loading(total: number | void, loaded: number | void): any {
  // 对于单独文件的加载进行计算
  if (total && loaded) {
    loadingNumber.value = Number(((loaded / total) * 100).toFixed(0)) // 取消小数点
    return
  }

  // 对于多个文件的加载使用加载器进行计算
  // 创建加载器
  const manager = new THREE.LoadingManager()
  // 加载中的参数
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(url, itemsLoaded, itemsTotal)
    loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(0)) // 取消小数点
  }
  return manager
}

// 使用HDR加载器
const HDRloader = new RGBELoader()
// 异步加载HDR
HDRloader.loadAsync(getAssetsFile('hdr/002.hdr'), ({ total, loaded }) => {
    // 单独文件计算进度用加载器的方法传参
    loading(total, loaded)
  }).then((HDRtexture) => {
    // TODO 做一些加载完毕的事情
  })

```



##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
