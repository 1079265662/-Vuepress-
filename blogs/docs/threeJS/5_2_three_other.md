---
title: three.js一些其他内容
date: 2022-05-07
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-dpzjzg.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
记录three.js一些相关控件<br>
:::

<!-- more -->

## 附加组件

* 有些控件不内置在three.js的核心中, 需要单独导入使用

### 轨道控制器 OrbitControls

* 听起来感觉很牛逼的感觉 实际上就是相机围绕目标进行轨道运动的效果 实现来拖拽和放大缩小模型 [官方介绍](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)
* <font color=#ff3040>注意: 使用轨道控制器之前 需要开启[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)更新动画 否则轨道控制器会失效</font>
* 声明后需要进行执行 否则会报错

```js
  // 7. 创建更新动画的方法
  const render = () => {
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    requestAnimationFrame(render)
  }
  // 执行创建更新动画的方法
  render()

```

> 使用轨道控制器

作为控件`OrbitControls`需要单独导入, 使用方法: `new OrbitControls(物体的相机设置, 渲染对象.domElement)`

```js
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 6. 创建创建一个轨道控制器 实现交互渲染
const controls = new OrbitControls(camera, renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)

```

* [.enableDamping](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.enableDamping) 设置阻尼感如果该值被启用，你将必须在你的动画循环里调用[.update()](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.update)。

```js
// 设置控制器阻尼 让控制器更真实 设置后需要在动画循环里调用.update()
controls.enableDamping = true
render = () => {
  // 设置阻尼感必须在动画中调用.update()
  controls.update()  
}

```

* [.enabled](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.enabled) 禁用轨道控制器, 设置为`false`禁用, 默认为`true`

```js
// 禁用轨道控制器
controls.enabled = false

```

* 设置缩放范围, 控制一个产品的缩放范围
  * [.maxDistance](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.maxDistance) 控制器能拉开的最大距离, 默认是无限大`Infinity`
  * [.minDistance](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.minDistance) 控制器能拉开的最小距离, 默认为0
  * [.enableZoom](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.enableZoom) 禁止用户进行缩放

```js
//透视投影相机：相机距离目标观察点距离越远显示越小，距离越近显示越大

// 设置控制器的最大距离
controls.maxDistance = 500
// 设置控制器的最小距离
controls.minDistance = 10
//禁止缩放
controls.enableZoom = false;

```

* 设置水平(左右)旋转范围, 你想控制用户能够看到的角度范围, 其有效值范围为[-2 *` Math.PI`，2 * `Math.PI`]弧度值, -360°到360°
*  <font color =ff3040>注意:水平(左右)旋转范围最小值和最大值必须都设置才会生效, 单独设置一个无效</font>
  * [.minAzimuthAngle](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.minAzimuthAngle) 最小的旋转弧度值, 默认值: -2 *` Math.PI`, 通常为负数
  * [.maxAzimuthAngle](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.maxAzimuthAngle) 最大旋旋转弧度值, 默认值: 2 *` Math.PI`, 通常是最小值的绝对值

```js
// 设置最大水平旋转, 弧度值
controls.minAzimuthAngle = -Math.PI / 2 // 最小 -90°
controls.maxAzimuthAngle = Math.PI / 2 // 最大 90

```

* 设置垂直(上下)旋转范围, 有效值范围[0 , Math.PI]弧度值, 0°~180°
*  <font color =ff3040>注意: 垂直(上下)旋转范围最小值和最大值必须都设置才会生效, 单独设置一个无效</font>
  * [.minPolarAngle](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.minPolarAngle) 你能够垂直旋转的角度的下限，其默认值为0
  * [.maxPolarAngle](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.maxPolarAngle) 你能够垂直旋转的角度的上限，其默认值为`Math.PI`(不限制)。

```js
// 上下旋转范围0~120度
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI * (120 / 180)

// 如果是一个地面效果, 最多旋转84°, (比直角小一点, 防止重合)
controls.maxPolarAngle = Math.PI / 2 - 0.1
```

![image-20230320195312677](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303201953858.png)

* [.enablePan](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.enablePan)禁止右键拖拽平移, 默认为`true`

```js
controls.enablePan = false; //禁止右键拖拽

```

* [.enableRotate](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.enableRotate) 禁用摄像机水平或垂直旋转, 默认值为`true`

```js
controls.enableRotate = false; //禁止旋转

```

## 内置组件

* 这些控件属于three.js内置组件, 不需要单独导入

### **开启坐标轴辅助器 AxesHelper**

* 开启XYZ轴辅助线可以帮助我们调试物体的位置 [官方介绍](https://threejs.org/docs/index.html?q=AxesHelper#api/zh/helpers/AxesHelper)
* `THREE.AxesHelper(轴线长度 默认是1)`
* 不需要单独导入内置插件 需要通过`.add()`添加到`Scene`场景中使用

![image-20220424174721556](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220424174721556.png)

```js
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5)
  // 添加到场景中去
  scene.add(axesHelper)
```

### **时钟/闹钟Clock**

* [Clock](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock) 可以用于跟踪对象 记录对象时间

  * [.getElapsedTime](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock.getElapsedTime) 可以用来获取渲染器执行的时长(当前渲染器执行了多少秒)单位是`s`秒 可以用来做旋转效果
    * 获取自时钟启动后的秒数，同时将 [.oldTime](https://threejs.org/docs/index.html#api/zh/core/Clock.oldTime) 设置为当前时间。
  
  * [.oldTime](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock.oldTime) 存储时钟最后一次调用 `.autoStart `, `.getElapsedTime` 或 `.getDelta` 方法的时间。默认值是 **0**。
  * [.getDelta](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock.getDelta) 获取动画的时间间隔(每帧的间隔时间差, 通常为小数)可以用来做一些`+=/-=`自增的效果
    * 获取自[.oldTime](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock.oldTime) 设置后到当前的秒数。 同时将[.oldTime](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock.oldTime) 设置为当前时间。
    * <font color=#ff3040>`.getDelta`需要放在`.getElapsedTime`前面, 因为`getElapsedTime`会重置`oldTime`</font>
  
  
  ```js
      // 设置闹钟
      const clock = new THREE.Clock()
      
      // 在动画执行时调用
      // 创建更新动画的方法
      const render = () => {
        // 获取动画的时间间隔, 必须放在.getElapsedTime前面
        const clockDelta = clock.getDelta()
  	  // 获取动画执行的时长
        const time = clock.getElapsedTime()
  
        // 通过时钟设置物体的x轴运动
        // 通过时间来改变位置 产生动画效果 通过Math.sin()来实现正弦函数 产生周期性的变化 数值为-1~1之间
        lightBall.position.x = Math.sin(time)
        // 通过时钟设置物体的y轴运动 数值为-3~3之间
        lightBall.position.z = Math.cos(time) * 3 
        // 上下运动y轴
        // // abs()取绝对值 使得y轴的值永远为正数 从而实现上下运动
        lightBall.position.y = Math.abs(Math.sin(time * 3)) * 2 
        
        // 旋转x轴
        lightBall.rotation.x = this.clock.getElapsedTime()
        
        // 根据鼠标的位置来改变相机的位置
        this.camera.position.x +=
        (this.mouse.x * 10 - this.camera.position.x) * clockDelta
          
        // 设置阻尼感必须在动画中调用.update()
        this.controls.update()
        // 使用渲染器,通过相机将场景渲染出来
        this.renderer.render(this.scene, this.camera) // render(场景, 相机)
        // 使用动画更新的回调API实现持续更新动画的效果
        this.animationId = requestAnimationFrame(render)
      }
  
      // 执行创建更新动画的方法
      render()
      
  ```
  

### **三维空间包围盒Box3**

[Box3](https://threejs.org/docs/index.html?q=box2#api/zh/math/Box3.getSize)三维空间包围盒, 可以包围导入的三维物体, 传入物体的`Object3D`, 在物体外生成包围盒, 可以用来查看物体的大小

* [min](https://threejs.org/docs/index.html#api/zh/math/Vector3) - (参数可选) [Vector3](https://threejs.org/docs/index.html#api/zh/math/Vector3) 表示包围盒的下边界。 默认值是（ + Infinity, + Infinity, + Infinity ）。
* [max](https://threejs.org/docs/index.html#api/zh/math/Vector3) - (参数可选) [Vector3](https://threejs.org/docs/index.html#api/zh/math/Vector3) 表示包围盒的上边界。 默认值是（ - Infinity, - Infinity, - Infinity ）。
* [.getSize](https://threejs.org/docs/index.html#api/zh/math/Box3.getSize), 可以获得包围盒的大小(.[sub](https://threejs.org/docs/index.html#api/zh/math/Vector3.sub) 后的数据)

```js
// 导入three.js
import * as THREE from 'three'

export class CreatedUtils  {
  // 通过三维空间包围盒计算物体的大小
  getBoxSize = (object: THREE.Object3D) => {
    // 创建一个包围盒
    const box = new THREE.Box3()
    
    // 设置包围盒的大小
    box.setFromObject(object)
    // 获取包围盒的大小
    const boxSize = box.getSize(new THREE.Vector3())

    console.log(`当前物体的大小(包围盒)`, boxSize)
  }
}

```

::: details 查看测量效果
![image-20230220181802720](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302201820902.png)

:::

### **光源辅助**

灯光会对3D场景中产生影响，但其本身是不可见的，所以移动或是旋转时就很麻烦，但我们可以使用灯光辅助类来使得灯光对象变得可见

- [HemisphereLightHelper](https://threejs.org/docs/index.html?q=HemisphereLightHelper#api/zh/helpers/HemisphereLightHelper) 半球形光辅助
- [DirectionalLightHelper](https://threejs.org/docs/index.html?q=DirectionalLightHelper#api/zh/helpers/DirectionalLightHelper) 平行光辅助
- [PointLightHelper]() 点光源辅助
- [RectAreaLightHelper](https://threejs.org/docs/index.html?q=RectAreaLightHelper#examples/zh/helpers/RectAreaLightHelper) 自定义光源辅助 <font color =#ff3040>注意: 这个需要单独导入</font>
- [SpotLightHelper](https://threejs.org/docs/index.html?q=SpotLightHelper#api/zh/helpers/SpotLightHelper) 聚光灯辅助

实例化这些类，使用相应的光源的实例作为参数，并将它们添加到场景中。第二个参数用于改变灯光辅助对象的大小：

```js
// 导入three.js
import * as THREE from 'three'

// 半球形辅助
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

// 平行光辅助
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)'=

// 点光源辅助
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/642.png)

`RectAreaLightHelper`没有内置在`Three.js`中，像导入[OrbitControls](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)一样导入后才可以使用它

* `jsm`文件是three.js的ts扩展, 如果你使用的ts就必须通过`jsm`文件导入

```js
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/640.png)

## three.js物体的生成

three.js中想生成一个物体(只是物体), 用到两个内容, 如果[mesh](https://threejs.org/docs/index.html?q=Mesh#api/zh/objects/Mesh)中不添加材质, 那么默认会采用[MeshBasicMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)基础材质

* [BufferGeometry](https://threejs.org/docs/index.html?q=EllipseCurve#api/zh/core/BufferGeometry) 几何体对象, **必要**
* [Material](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/Material) 材质, 贴图可以理解为贴在几何体上, **非必要**, 默认[Mesh](https://threejs.org/docs/index.html?q=Mesh#api/zh/objects/Mesh)会采用[MeshBasicMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)基础材质

有了这两个要素, 就可以生成一个几何体, 并且可以给几何体添加自己的材质贴图

### **BufferGeometry几何体对象**

在three.js中， [BufferGeometry](https://threejs.org/docs/index.html?q=EllipseCurve#api/zh/core/BufferGeometry)是用来代表所有几何体的一种方式。 `BufferGeometry` 本质上是一系列 `BufferAttributes` 的 名称 。每一个 `BufferAttribute` 代表一种类型数据的数组：位置，法线，颜色，uv，等等…… 这些合起来， `BufferAttributes `代表每个顶点所有数据的 并行数组 。**可以理解为通过各类属性创建一个自定义的几何体, 可以创建一个通过[EllipseCurve](https://threejs.org/docs/#api/zh/extras/curves/EllipseCurve)椭圆曲线创建的圆等其他效果**

![image.png](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302241806892.png)

* [.setAttribute()](https://threejs.org/docs/index.html?q=EllipseCurve#api/zh/core/BufferGeometry.setAttribute) 设置为当前几何体设置一个 `attribute`, 需要先规定要添加的类型, 再进行参数的[BufferAttribute](https://threejs.org/docs/index.html?q=BufferAttribute#api/zh/core/BufferAttribute)的设置

```js
const geometry = new THREE.BufferGeometry()
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
])

// itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

```

* .[setFromPoints()](https://threejs.org/docs/index.html#api/zh/core/BufferGeometry.setFromPoints) 通过该方法可以把数组`pointsArr`(通过[.getPoints](https://threejs.org/docs/#api/zh/extras/core/Curve.getPoints)取出分段数的数组)坐标数据提取出来赋值给几何体。具体说就是把`pointsArr`里面坐标数据提取出来，赋值给`geometry.attributes.position`坐标属性

```js
const pointsArr = [
  // 三维向量Vector3表示的坐标值
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 100, 0),
  new THREE.Vector3(0, 100, 100),
  new THREE.Vector3(0, 0, 100),
]
// 把数组pointsArr里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性
geometry.setFromPoints(pointsArr)
console.log('几何体变化', geometry.attributes.position)

```

## 批量修改Mesh网格 .traverse

可以使用`Object3D`中 [.traverse](https://threejs.org/docs/index.html#api/zh/core/Object3D.traverse)方法递归其包含的子级网格

* 通常要先用`.type`去判断能修改的类型`Mesh`网格类型, 很可能里面也存在一些其他类型比如`Object3D`
* 通常会把需要批量修改的网格放到 [Group](https://threejs.org/docs/index.html?q=Group#api/zh/objects/Group)组对象中进行` .traverse`递归

```js
// 导入汽车模型gltf
import car from '@/assets/car/轿车.gltf'
// 导入外包加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// 导入three.js
import * as THREE from 'three'

const loader = new GLTFLoader()
// 异步获得加载的模型
const gltf = await loader.loadAsync(car)

// 替换金属内容的材质
gltf.scene.traverse((child) => {
  // 符合mesh类型(只有mesh网格模型类型才有材质)
  if (child.type === 'Mesh') {
    // 如果名称中包含高光金属
    if (child.name.includes('高光金属')) {
      // 修改材质
      const meshOject = child as THREE.Mesh<
        THREE.BufferGeometry,
        THREE.MeshStandardMaterial
      >
      meshOject.material = new THREE.MeshStandardMaterial({
        color: meshOject.material.color,
        metalness: 1.0,
        roughness: 0.2,
      })
    }

    // 如果名称中包含后视镜
    if (child.name.includes('后视镜')) {
      // 修改材质
      const meshOject = child as THREE.Mesh<
        THREE.BufferGeometry,
        THREE.MeshStandardMaterial
      >
      meshOject.material = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        metalness: 1.0,
        roughness: 0.0,
        envMapIntensity: 1.0,
      })
    }
  }
})

```

对应递归的子级的集合

![image-20230309161358307](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303091614385.png)

