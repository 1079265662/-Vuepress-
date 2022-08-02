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

### **关于颜色设置**

three.js支持十六进制的颜色设置 和 字符串类型的css风格颜色

* 十六进制的颜色设置

```js
// 创建渲染器对象 
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
	})
    // 设置渲染器背景颜色
renderer.setClearColor(0x00577)
```

* css风格颜色
  * <font color =#ff3040>注意: css风格的颜色 需要是字符串格式的才可以</font>

```js
// 创建渲染器对象 
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启锯齿
	})
    // 设置渲染器背景颜色 类型要为字符串格式
renderer.setClearColor('#00577')
```

## three.js的渲染步骤

* three.js的三大组件之一 必要元素
  1. 创建场景对象`Scene`
     * 创建网格模型(材质) [`Material` 材质](./3_1_three.js_Material.md)
     * 光源设置(非必选) DirectionalLight
  2. 相机设置 `Camera` [相机](./3_2_three.js_Camera.md)
  3. 创建渲染对象 (绑定页面的元素) [WebGLRenderer](https://threejs.org/docs/index.html?q=WebGLRenderer#api/zh/renderers/WebGLRenderer)
* 创建场景+ 相机 是组成three.js的重要步骤 他俩完成后 然后通过three.js插入到页面的元素中(以`canvas`方式绘制)

> 先来一个小案例

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

## three.js相关内容介绍

* 记录three.js的相关控件学习笔记 因为文章过长 以单独文章作为记录 通过学习

* 相关控件包括

  ☑️ [`Material` 材质](./3_1_three.js_Material.md)

  ☑️`Camera` [相机](./3_2_three.js_Camera.md)
  
  ☑️`Scene` [场景](./3_3_three.js_Scene.md)
  
  ☑️`Renderer` [场景渲染器、2D、3D渲染器](./3_4_three.js_Renderer.md)
  
  ☑️`Loader` [加载器](./3_6_three.js_Loader.md)
  
  ☑️`Light` [光源](./3_8_three.js_Light)
  
  ☑️`Dom` [模型节点](./2_1_three.js_Dom.md)
  
  🚫`Matrix` 欧拉角

## 辅助控件插件

* 记录非three.js核心的内容 这些基本上都是控件之类的 用来提供页面中的交互效果 

### **轨道控制器 OrbitControls**

* 听起来感觉很牛逼的感觉 实际上就是相机围绕目标进行轨道运动的效果 实现来拖拽和放大缩小模型 [官方介绍](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)
* <font color=#ff3040>注意: 使用轨道控制器之前 需要开启[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)动画 否则轨道控制器会失效</font>

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

## 常用Object3D方法

* 这是Three.js中大部分对象的基类，提供了一系列的属性和方法来对三维空间中的物体进行操纵。详细看这里[三维物体（Object3D）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D)

* 请注意，可以通过.add( object )方法来将对象进行组合，该方法将对象添加为子对象，但为此最好使用Group（来作为父对象）

* 任意的3D对象具备的 `Vector3`三维向量 四位向量
  - [.position(Vector3) ](https://threejs.org/docs/?q=ob#api/zh/core/Object3D.position)(在三个轴向上移动 通常也是模型的世界坐标位置)
  - [.scale(Vector3)](https://threejs.org/docs/?q=ob#api/zh/core/Object3D.scale) (在三个轴向上缩放)
  - `rotation` (在三个轴向上旋转)
  - `quaternion` (四元数，也是用于处理旋转的)
  
* 以上的方法都涉及到 `x,y,z`轴的(还有`w`) 进行修改时候需要用到以下方法 

  > 假设以`.position`模型世界坐标位置为例

  * [.add(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.add) 将传入的向量v和这个向量相加 可以对x y z 轴进行相加处理

  ```js
  const coordinate = new THREE.Vector3(200, 50, 50)
  Object3D.position.add(coordinate)
  ```

  * [.copy(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.copy) 将所传入`Vector3`的x、y和z属性复制给这一`Vector3`。覆盖原有的 x y z

  ```js
  const coordinate = new THREE.Vector3(200, 50, 50)
  Object3D.position.copy(coordinate)
  ```

  * [.set(number)](https://threejs.org/docs/?q=Vector3#api/zh/math/Vector3.set) 设置该向量的x、y 和 z 分量。覆盖原有的 x y z 不用 `Vector3`用数字设置即可

  ```js
  Object3D.position.set(0, 0, 0)
  ```

  * [.clone(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.clone) 返回一个新的`Vector3`，其具有和当前这个向量相同的x、y和z。复制一份 x y z 不修改原数据

  ```js
  const ret = Object3D.position.clone() 
  console.log(ret) // ret里面包含Vector3
  ```

  * 也可以直接赋值或者进行运算符处理指定坐标

  ```js
   // 赋值操作
  	Object3D.position.x = 20;
      Object3D.position.y = 20;
      Object3D.position.z = 2;
  // 相加相减操作
  	Object3D.position.x += 20;
      Object3D.position.y -= 20;
  ```
  

### **旋转角度 .rotateX rotateY rotateZ** 

* [.](https://threejs.org/docs/index.html#api/zh/core/Object3D.rotateX) 旋转X Y Z轴的角度 让内容朝某个方向转起来

```js
物体的网格对象(Mesh).rotateY(0.1) // rotateX rotateY rotateZ     
```

### **设置一个组 Group**

* 我们可以把声明的网格模型对象放到一个集合中 也就组[Group](https://threejs.org/docs/index.html?q=group#api/zh/objects/Group) 这样我们可以给组内的网格模型进行批量的操作
* Group也继承自`Object3D`类，因此可以使用`Object3D`类的属性和方法，例如位置，比例，旋转，四元数和`lookAt`都可以作用在Group上。

```js
//创建一个立方体几何对象Geometry
const geometry = new THREE.BoxGeometry(50, 50, 50); 
// 材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,//材质颜色
});

//网格模型对象Mesh
const mesh = new THREE.Mesh(geometry, material); 
//创建组对象
const group = new THREE.Group();
// 把网格模型放到组对象里面
group.add(mesh);

// 创建场景对象Scene
var scene = new THREE.Scene();
//把group中的模型添加到场景中
scene.add(group);
```

### **遍历Object3D对象 .traverse**

* [.traverse](https://threejs.org/docs/index.html#api/zh/core/Object3D.traverse) 可以递归遍历object3D对象 我们可以通过判断来批量替换网格模型中的材质 等等...
  * 如果替换的是网格模型的材质 一定要把`color`也替换上 否则会显示默认的白色模型


```js
    const model = new THREE.Group()// 声明一个组对象，用来添加加载成功的三维场景
    const loader = new GLTFLoader() // 创建一个GLTF加载器
    loader.loadAsync(`${process.env.BASE_URL}model/model.glb`, (gltf) => { // gltf加载成功后返回一个对象
    }).then((gltf) => {
      // 递归遍历gltf.scene，批量更改所有Mesh的材质
      gltf.scene.traverse(function (object) {
          // 进行判读 是否为网格模型Mesh
        if (object.type === 'Mesh') {
          // 替换漫反射材质
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

### **设置渲染顺序 .renderOrder **

* Object3D对象 在渲染器`render`中有先后渲染顺序 默认是0 他类似于css中的`z-index` 通过[.renderOrder](https://threejs.org/docs/#api/zh/core/Object3D.renderOrder) 进行渲染顺序 [scene graph](https://en.wikipedia.org/wiki/Scene_graph)（场景图)默认值会被该设置覆盖

```js
Object3D.renderOrder = 12 // 任意层数
```

### 移除Object3D对象 .remove

* [ .remove](https://threejs.org/docs/index.html?q=remove#api/zh/core/Object3D.remove) 移除Object3D对象 也可以移除在页面创建的Object3D模型对象
* [Group](https://threejs.org/docs/index.html?q=Group#api/zh/objects/Group) 组对象也可以使用

```js
Object3D.remove(被删Object3D对象)
Group.remove(被删Object3D对象)
```

### **修改Object3D对象中的元素样式**

* 如果我们的`Object3D`对象是通过js的Dom元素生成的 那么会存在`element`Dom属性 然后再通过`.style`就可以修改Dom元素的样式

```js
Object3D.element.style.opacity = 1 // 显示标签
```



## 二维向量（Vector2）和 三维向量（Vector3）

* **[二维向量（Vector2）](https://threejs.org/docs/index.html?q=Vector2#api/zh/math/Vector2)** x y 轴
  * 表示2D [vector](https://en.wikipedia.org/wiki/Vector_space)（二维向量）的类。 一个二维向量是一对有顺序的数字（标记为x和y），可用来表示很多事物
  * `CSS2DObject` CSS2对象模型
*  [三维向量（Vector3）](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3) x y z轴
  * 该类表示的是一个三维向量（3D [vector](https://en.wikipedia.org/wiki/Vector_space)）。 一个三维向量表示的是一个有顺序的、三个为一组的数字组合（标记为x、y和z）， 可被用来表示很多事物
  * `CSS3DObject` CSS3对象模型、`CSS3DSprite` CSS3精灵模型
* 如果你需要设置 x, y, z轴的值 就要使用三维向量（Vector3）[.set ](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.set)进行赋值修改

```js
二维三维可用向量.scale.set(0.3, 0.3, 0.3) // 设置xyz的值 需要.set设置
```

* 三维向量和二维向量 都需要用到以下修改值的方法 

  > 假设以`.position`模型世界坐标位置为例

  * [.add(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.add) 将传入的向量v和这个向量相加 可以对x y z 轴进行相加处理

  ```js
  const coordinate = new THREE.Vector3(200, 50, 50)
  Object3D.position.add(coordinate)
  ```

  * [.copy(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.copy) 将所传入`Vector3`的x、y和z属性复制给这一`Vector3`。覆盖原有的 x y z

  ```js
  const coordinate = new THREE.Vector3(200, 50, 50)
  Object3D.position.copy(coordinate)
  ```

  * [.set(number)](https://threejs.org/docs/?q=Vector3#api/zh/math/Vector3.set) 设置该向量的x、y 和 z 分量。覆盖原有的 x y z 不用 `Vector3`用数字设置即可

  ```js
  Object3D.position.set(0, 0, 0)
  ```

  * [.clone(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.clone) 返回一个新的`Vector3`，其具有和当前这个向量相同的x、y和z。复制一份 x y z 不修改原数据

  ```js
  const ret = Object3D.position.clone() 
  console.log(ret) // ret里面包含Vector3
  ```

  * 也可以直接赋值或者进行运算符处理指定坐标

  ```js
   // 赋值操作
  	Object3D.position.x = 20;
      Object3D.position.y = 20;
      Object3D.position.z = 2;
  // 相加相减操作
  	Object3D.position.x += 20;
      Object3D.position.y -= 20;
  ```

### 

### **获取模型的坐标**

*  [.getWorldPosition](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.getWorldPosition) 方法可以获取到模型的坐标 他可以用来获取世界坐标 可以通过`.getObjectByName()`获取模型的name 然后再使用该方法 获取其世界坐标
*  `Vector3`是threejs的三维向量对象,可以通过`Vector3`对象表示一个顶点的xyz坐标，顶点的法线向量。

```js
// 声明一个三维向量用来保存世界坐标
const worldPosition = new THREE.Vector3();
// 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中
mesh.getWorldPosition(worldPosition);
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

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)

[vue-cli + three.js 解决页面跳转时Css2dObject遗留在dom的问题](https://blog.csdn.net/qq_37338983/article/details/106461004)
