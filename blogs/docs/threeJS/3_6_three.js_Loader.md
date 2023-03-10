---
title: three.js 之 Loader加载器
date: 2023-03-10
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
* 加载器都依赖基类[.Loader](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader) 用来实现加载
  * 普通加载方法 [.load ](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader.load)
  * es6 `promise`加载 [.loadAsync](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader.loadAsync)
* [TextureLoader](https://threejs.org/docs/index.html#api/zh/loaders/TextureLoader) 纹理贴图加载器现在不支持进度监听, 直接通过`onLoad`方法监听是否加载完成即可
* **几乎所有的加载器, 都需要导入**

> 加载器的分类

* 模型加载器 用来加载大型模型 `gltf`和`glb`模型文件 <font color =#ff3040>模型加载器需要单独`import`引入</font>
  * [GLTFLoader()](https://threejs.org/docs/index.html?q=textur#examples/zh/loaders/GLTFLoader) 加载`gltf`和`glb`文件中的3D模型
* 贴图加载器 通常用来加载`png` `jpg` `gif` 或者制作`序列帧动画`  <font color =#ff3040>贴图加载器不需要引入</font>
  * [TextureLoader()](https://threejs.org/docs/?q=TextureLoade#api/zh/loaders/TextureLoader ) 通常用来加载一张图片可以返回一个[texture  贴图对象](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/TextureLoader) 作为一个表面，或者作为反射/折射贴图

> <font color =#ff3040>注意</font>

* 项目部署后 有可能资源会在服务器端进行压缩(尤其是大的图片`HDR`资源) 导致资源图片的加载大小 大于 总文件大小 计算百分比会出问题 解决该问题 可以把资源挂载到OSS云上 或者在服务器端取消图片压缩 已知会压缩的平台: [netlify](https://www.netlify.com/)

![123](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210211826476.jpg)

## 模型加载器 GLTFLoader

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

### **promise异步加载**

`.loadAsync` 可以支持异步加载[详细](https://threejs.org/docs/index.html?q=TextureLoader#api/zh/loaders/Loader.loadAsync) 异步加载使用的`promise`方法 需要通过`then`和`catch`获取其异步加载状态

```js
const loader = new THREE.GLTFLoader();
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

### **async/await异步加载**

[async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 可以优化`promise`的链式操作, 而且`GLTFLoader`返回的数据就是`promise`对象, 可以通过`async/await`进行代码优化

```js
// 创建加载器
const gltfLoader = new THREE.GLTFLoader(); 
// 用async/await来获取模型的异步数据
const result = await gltfLoader.loadAsync("car/scene.gltf"); // promise解析后的模型数据

```

> 在class类中使用

`async/await`在class中使用, 需要写在箭头函数`()`前面

```js
class Person {
  // 创建加载器
  gltfLoader = new THREE.GLTFLoader()

  // 在箭头函数的()前添加async 关键字
  loadIphone = async () => {
    // 用async/await来获取模型的异步数据
    const result = await gltfLoader.loadAsync('car/scene.gltf') 
    console.log(result) // promise解析后的模型数据
  }

  createScene = () => {
    // 在需要模型的方法里调用异步数据
    this.loadIphone()
  }
}

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

### **Vite中导入glb和gltf**

glb和gltf资源是[静态资源](https://cn.vitejs.dev/config/shared-options.html#assetsinclude), 如果文件在脚手架([create-vue](https://github.com/vuejs/create-vue))中导入使用, 需要在`vite.config.ts`配置中设置为静态资源, 不进行编译处理

```js
// 静态资源设置
assetsInclude: ['**/*.gltf', '**/*.glb'],
```

* 在ts代码中进行导入
  * [create-vue](https://github.com/vuejs/create-vue)脚手架环境下, ts/js文件中静态资源不可以直接通过路径来导入, 需要通过`import`或通过[官方封装的方法导入](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url)(Vue文件可以直接使用路径导入)

```js
// 导入手机模型gltf
import huawei from '@/assets/iphone/huaweiB.glb'
// 创建glTF加载器
const loader = new GLTFLoader()
// 异步获得加载的模型
const gltf = await this.loader.loadAsync(huawei)

```

::: details 查看文件目录
![image-20230216173250748](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302161732791.png)
:::

### **在ts环境下使用glb和gltf**

glb,gltf 文件在ts环境下是没有类型标识的, 直接导入会报错, 所以我们需要在脚手架([create-vue](https://github.com/vuejs/create-vue))根目录下创建一个`env.d.ts`(格式为`*.d.ts`)作为字符串导入

```tsx
declare module '*.glb' {
  const value: string
  export default value
}
declare module '*.gltf' {
  const value: string
  export default value
}

```

::: details 查看文件目录
![image-20230216172529775](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302161726829.png)
:::

### **vue-created中加载**

[create-vue](https://github.com/vuejs/create-vue) 是Vue3+Vite, 在Vite中分为两种静态资源存放`public` & `assets`

![image-20230310122607833](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101226874.png)

* `public` 资源不会被编译, 也不会被清理
* `assets`位于`src`目录下, 如果资源未被`import`引用, 那么打包的时候会被清理 (本地开发环境下不会)

模型文件又分为`glb`和`gltf`文件, 

* `glb`是二进制单文件, 里面包含模型的所有信息

![image-20230310141212805](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101412835.png)

* `gltf`是json格式的文件, 里面不包含模型的贴图信息, 贴图信息是通过`.bin`进行的中转

![image-20230310135551735](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101355777.png)

所以`glb`文件适合存放在`assets`中

* 通过`import`引用

```js
// 导入手机模型gltf
import huawei from '@/assets/iphone/手机.glb'

```

`gltf`文件适合存放在`public`中, 因为在vite的`src`文件中会自动清理代码中未引入的内容, 而代码中只会导入`gltf`单文件

* 通过绝对路径或通过[import.meta.env.BASE_URL](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes)使用Vite的基本 URL导入

```js
// 静态绝对路径导入 可以省去/public/
import car from '/car/轿车.gltf'
const gltf = await loader.loadAsync('/car/轿车.gltf')

// 或通过import.meta.env.BASE_URL进行导入
const gltf = await loader.loadAsync(
  `${import.meta.env.BASE_URL}car/轿车.gltf`
)

```

### **Vue cil中加载**

在[Vue CLI](https://cli.vuejs.org/zh/)使用[.Loader](https://threejs.org/docs/index.html?q=textur#api/zh/loaders/Loader)加载器 需要注意 如果想使用本地资源 需要把资源文件放到[public](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)非编译静态(必须绝对路径) 或者 `assets`编译静态中

* Vue cil使用的是webpack打包

#### **public 非编译静态资源加载**

* [public](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9)非编译静态加载 需要和当前Vue cli环境变量[process.env.BASE_URL](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 进行绝对路径的拼接 并且不可以使用相对路径

```js
const loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load(`${process.env.BASE_URL}model/model.gltf`, function (gltf) { // 进行process.env.BASE_URL 和 资源绝对路径的拼接
// ...进行操作
})
```

* 对应的资源文件

![image-20220510183547946](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220510183547946.png)

#### **assets 编译资源加载**

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

## 纹理加载器 TextureLoader

[TextureLoader](https://threejs.org/docs/index.html?q=TextureLoader#api/zh/loaders/TextureLoader) 纹理加载器, 用于加载单张图片格式的纹理贴图

```js
// 创建纹理加载器
const textureLoader = new THREE.TextureLoader()
// 导入一张纹理贴图
import someJPG from '@/assets/door/alpha.jpg'

// 创建异步加载
const loader = async () => {
    // 加载一张贴图
  const loaderSome = await textureLoader.loadAsync(someJPG)
}

```

## 环境贴图加载器 CubeTextureLoader

[CubeTextureLoader](https://threejs.org/docs/index.html?q=CubeTextureLoader#api/zh/loaders/CubeTextureLoader) 环境贴图加载器, 用来加载一组环境贴图, 基本上是六张图片

![image-20230308114807800](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303081148867.png)

* `.setPath`可以统一设置环境贴图加载的根路径

```js
// 创建环境贴图加载器
const cubeLoader = new THREE.CubeTextureLoader()

// 创建异步加载
const loader = async () => {
  // 参数为数组，数组中的每一项都是一个图片的路径
  const loaderSome = await cubeLoader
    .setPath('textures/cubeMaps/')
    .loadAsync(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
}

```

### **在Vue脚手架环境下**

如果图片在中Vue脚手架 [create-vue](https://github.com/vuejs/create-vue)环境下就需要单独处理, 需要通过`import`或通过[官方封装的方法导入](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url)(Vue文件可以直接使用路径导入)

* [静态资源处理 | Vite 官方中文文档](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url) 通过官网介绍进行封装

```tsx
// getAssetsFile.ts
// 封装静态资源引用方法 
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}
// export { getAssetsFile }

```

* 该函数方法默认指向Vue静态资源文件夹`assets`, 所以可以省略`assets`路径前缀

```ts
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 创建环境贴图加载器
const envMapLoader = new THREE.CubeTextureLoader()

const setEnvMap = async () => {
  // 加载环境贴图
  const envMapTexture = await envMapLoader.loadAsync([
    getAssetsFile('car/envMap/px.jpg'),
    getAssetsFile('car/envMap/nx.jpg'),
    getAssetsFile('car/envMap/py.jpg'),
    getAssetsFile('car/envMap/ny.jpg'),
    getAssetsFile('car/envMap/pz.jpg'),
    getAssetsFile('car/envMap/nz.jpg'),
  ] as any)
}

```

::: details 查看示例所在的文件

![image-20230308121203772](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303081212811.png)

:::

## 字体加载器 FontLoader

[FontLoader](https://threejs.org/docs/index.html?q=FontLoader#examples/zh/loaders/FontLoader) 字体加载器, 是一个附加组件需要单独导入

* `FontLoader`**只支持json格式的字体** 
* 可以使用[facetype.js](https://gero3.github.io/facetype.js/)来在线转换ttf字体。
*  <font color =#ff3040>注意: 在Vite环境中, 需要对[显式 URL 引入](https://cn.vitejs.dev/guide/assets.html#explicit-url-imports) 的资源添加`?url`后缀, 取消编译时的操作</font>

```js
// 导入json字体加载器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// 导入three.js的json字体, url资源需要在后缀加上?url
import helvetiker from '@/assets/iphone/font/text.json?url'

// 创建字体加载器
const fontLoader = new FontLoader()

// 创建异步加载
const loader = async () => {
  // 只支持json格式的字体
  const fontSome = await fontLoader.loadAsync(helvetiker)
}

```

## HDR加载器 RGBELoader

`RGBELoader`是用来加载HDR图片的, HDR可以作为环境贴图来使用

* HDR图片非常大, 且性能消耗巨大

```js
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 1. 创建three.js场景
const scene = new THREE.Scene()
// 添加HDR贴图
const HDRloader = new RGBELoader()
// 异步加载HDR贴图
HDRloader.loadAsync('hdr/002.hdr').then((HDRtexture) => {
  // 设置HDR贴图的贴图环绕方式
  HDRtexture.mapping = THREE.EquirectangularReflectionMapping
  // 给场景设置HDR背景图
  scene.background = HDRtexture
  // 给场景内所有的物体添加默认的环境贴图 (如果物体不单独设置环境贴图 默认使用这个环境贴图)
  scene.environment = HDRtexture
})

```

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

每个加载器 都自带一个加载监听事件 如果想统一管理加载的内容 判断加载进度或者是否加载成功 需要使用[LoadingManager](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/managers/LoadingManager)加载管理器
* 声明加载管理器 把其变量塞到事件的加载器中即可使用
* [.onProgress](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/managers/LoadingManager.onProgress) 有三个参数
  * `url` — 被加载的项的url (资源路径 绝对/相对路径 依据你导入的方式)
  * `itemsLoaded` — 目前已加载项的个数。
  * `itemsTotal` — 总共所需要加载项的个数。

* <font color =#ff3040>注意: 加载管理器适合资源统一加载(上面介绍过) 使用一个统一的加载器的常量</font>
* <font color =#ff3040>注意: 加载管理器不适合监控单文件加载进度(比入一张图) 单文件就是0到1的关系 不适合使用加载管理器</font>

```tsx
// loading.ts
// 导入three.js
import * as THREE from 'three'
// 导入加载类型
import type { LoadingManager } from 'three'
// 导入Vue响应式
import { ref } from 'vue'
export const loadingNumber = ref(0)

/**
 * @description: 声明加载管理器
 * @param {number | void} total 总大小
 * @param {number | void} loaded 已加载大小
 * @returns {loadingNumber | any}
 */
// 模型/hdr加载的方法
export function loadTexture(
  total: number | void,
  loaded: number | void
): LoadingManager | any {
  loadingNumber.value = 0

  // 对于单独文件的加载进行计算(比如hdr)
  if (total && loaded) {
    loadingNumber.value = Number(((loaded / total) * 100).toFixed(2))
    return
  }

  // 创建加载器
  const manager = new THREE.LoadingManager()

  // 加载中的参数  url被加载的项的url itemsLoaded目前已加载项的个数 itemsTotal总共所需要加载项的个数。
  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    // 获取加载百分比: 已加载个数 / 总数量 * 100 计算出加载百分比 并取两位小数
    loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(2))
  }

  // 返回加载管理器的变量(一般用不到, 特殊请倪哥看需要)
  return manager
}

/**
 * @description: 声明加载管理器
 * @returns {any}
 */
// export function loading(): THREE.LoadingManager | any {
//   loadingNumber.value = 0

//   // 创建加载器
//   const manager = new THREE.LoadingManager()
//   // 加载中的参数
//   manager.onProgress = (url, itemsLoaded, itemsTotal) => {
//     loadingNumber.value = Number(((itemsLoaded / itemsTotal) * 100).toFixed(2))
//   }

//   return loadingNumber.value
// }

```

* 在three.js中使用, 使用加载器的时候, 调用

```js
// 导入加载方法
import { loadTexture } from '@/utils/loading'
// 创建glTF加载器时候使用加载方法
const loader = new GLTFLoader(loadTexture())

```

### **单个和多个文件统一加载器**

单个文件用文件的加载器进行传参计算 多个文件用`LoadingManager`加载管理器, 比如纹理贴图和glb/gltf文件加载

* 可以通过Vue3的组合式api的`ref()`响应式数据来记录加载的百分比数据

```tsx
// 导入加载类型
import type { LoadingManager } from 'three'
// 导入Vue响应式
import { ref } from 'vue'

export class CreatedRender {
  // 设置响应式变量
  loadingNumber = ref(0)

  /**
   * @description: 声明加载管理器
   * @returns {LoadingManager}
   */
  loading = (): LoadingManager => {
    // 创建加载器
    const manager = new THREE.LoadingManager()
    // 加载中的参数  url被加载的项的url itemsLoaded目前已加载项的个数 itemsTotal总共所需要加载项的个数。
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      // 获取加载百分比: 已加载个数 / 总数量 * 100 计算出加载百分比 并取两位小数
      this.loadingNumber.value = Number(
        ((itemsLoaded / itemsTotal) * 100).toFixed(2)
      )
    }

    // 返回加载管理器的变量(一般用不到, 特殊情况需要)
    return manager
  }
}

```

## Vue脚手架下导入静态资源

如果图片在中Vue脚手架 [create-vue](https://github.com/vuejs/create-vue)环境下就需要单独处理, 需要通过`import`或通过[官方封装的方法导入](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url)(Vue文件可以直接使用路径导入)

* [静态资源处理 | Vite 官方中文文档](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url) 通过官网介绍进行封装

```tsx
// getAssetsFile.ts
// 封装静态资源引用方法 
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}
// export { getAssetsFile }

```

* 该函数方法默认指向Vue静态资源文件夹`assets`, 所以可以省略`assets`路径前缀

```ts
// 静态资源引入方法
import { getAssetsFile } from '@/utils/getAssetsFile'
// 创建环境贴图加载器
const envMapLoader = new THREE.CubeTextureLoader()

const setEnvMap = async () => {
  // 加载环境贴图
  const envMapTexture = await envMapLoader.loadAsync([
    getAssetsFile('car/envMap/px.jpg'),
    getAssetsFile('car/envMap/nx.jpg'),
    getAssetsFile('car/envMap/py.jpg'),
    getAssetsFile('car/envMap/ny.jpg'),
    getAssetsFile('car/envMap/pz.jpg'),
    getAssetsFile('car/envMap/nz.jpg'),
  ] as any)
}

```

::: details 查看示例所在的文件

![image-20230308121203772](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303081212811.png)

:::

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)

[加载异步功能不起作用或使用错误](https://discourse.threejs.org/t/loadasync-function-not-working-or-using-wrong/28355)
