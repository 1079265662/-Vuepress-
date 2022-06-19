---
title: three.js 之 Loader
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

加载器的分类(不确定)

* 模型加载器 用来加载大型模型 `gltf`和`glb`模型文件 <font color =#ff3040>模型加载器需要单独`import`引入</font>
  * [GLTFLoader()](https://threejs.org/docs/index.html?q=textur#examples/zh/loaders/GLTFLoader) 加载`gltf`和`glb`文件中的3D模型
* 贴图加载器 通常用来加载`png` `jpg` `gif` 或者制作`序列帧动画`  <font color =#ff3040>贴图加载器不需要引入</font>
  * [TextureLoader()](https://threejs.org/docs/?q=TextureLoade#api/zh/loaders/TextureLoader ) 通常用来加载一张图片可以返回一个[texture  贴图对象](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/TextureLoader) 作为一个表面，或者作为反射/折射贴图

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

## 导入纹理 TextureLoader()

* 纹理一般是指我们常见的在一些第三方程序中创建的图像，如PNG和JPG类型的图。我们把这张图片放在立方体上。（我通常称为`贴图`）。我们需要做的就是创建一个TextureLoader。调用它的load方法，同时传入图像的URL，并将材质的 map 属性设置为该方法的返回值
* [TextureLoader()](https://threejs.org/docs/?q=TextureLoade#api/zh/loaders/TextureLoader ) 通常用来加载一张图片可以返回一个纹理对象[Texture](https://threejs.org/docs/?q=TextureLoade#api/zh/textures/Texture) 作为一个表面，或者作为反射/折射贴图
* [TextureLoader()](https://threejs.org/docs/?q=TextureLoade#api/zh/loaders/TextureLoader) 也可以**制作**`序列帧动画`

### **网格模型使用加载的纹理贴图**

* 配合[基础网格材质MeshBasicMaterial()](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial)的[.map](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial.map) 把加载好纹理变成网格模型的贴图

```js
  // 获取图片网格材质
  const texture = new THREE.TextureLoader().load('https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%B0%8Fmao.jpg')
  // 使用网格材质
  const skyBoxMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh);  //网格模型添加到场景中
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
// require方式导入
const img = require('@/assets/火焰/火焰.png')
// import方式导入
import img from '@/assets/火焰/火焰.png'
// 加载导入的纹理贴图
const texture = textureLoader.load(img)
```

* 对应的资源文件

![image-20220619171155446](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220619171155446.png)

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
