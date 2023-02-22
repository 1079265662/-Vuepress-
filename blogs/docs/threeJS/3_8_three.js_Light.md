---
title: three.js 之 Light光源
date: 2022-07-27
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271752861.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Loader 几何体<br>
:::

<!-- more -->

## 灯光前言

添加灯光其实和添加其它3D对象一样简单，首先实例化一个灯光，然后通过`scene.add`将其添加到场景中。

首先我们来准备一个基础场景（一个`Sphere`球体、一个`Box`立方体、一个`Torus`圆环和一个`Plane`平面作为地板）。

`MeshStandardMaterial`标准网格材质。我们将材质的粗糙度`roughness`设置为0.4，这样我们就能观察到光的反射。

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207272010649.png" alt="图片" style="zoom:67%;" />

由于我们使用了对光有反应的材质，所以在没有任何灯光的情况下，我们的3D世界将只有一片黑暗！

> 关于旋转

* 如果是`mesh`物体旋转, 那么只是物体的自转, 灯光是不进行旋转的, 会根据物体的自身的旋转显示对应的光照效果
* 如果是`scene`场景旋转, 那么场景中所有的物体和灯光都会进行同步的旋转效果, 不会根据物体自身的旋转显示对应的光照效果(因为光源也在同步转)

## **环境光AmbientLight**

环境光将在场景内的所有几何图形上应用全向照明（四面八方的光）。它的第一个参数是颜色，第二个参数是光照强度。我们可以在实例化的时候直接设置属性，也可以在以后更改它们, 作为整个场景的明暗强弱, 通常环境光可以配合环境贴图, 实现一个反射的明暗效果

* 环境光没有阴影效果

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Equals
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207272010244.png" alt="图片" style="zoom:80%;" />

就像我们在前面课程中所学到的，我们可以将灯光的属性添加到调试UI里，这样将极大的方便我们测试不同属性下灯光和材质的表现。

```js
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
```

如果整个场景中，只有一个环境光，那么所有几何体的材质看上去都和`BasicMaterial`一样，因为所有几何体上的面都将被平均点亮。在现实生活中，当一个物体被照亮时，物体背面不会完全是黑色的，因为光线会在墙壁和其他物体上反射到物体背面。出于性能原因，`Three.js`不支持光反射，但是我们可以使用`AmbientLight`来模拟这种光反射。

## **平行光/直线光DirectionalLight**

平行光/直线光`DirectionalLight`通常用来模拟太阳光，第一个参数是颜色，第二个参数是强度：<font color =#ff3040>必须设置光源位置</font>

* 平行光/直线光的[.shadow](https://threejs.org/docs/index.html?q=DirectionalLight#api/zh/lights/shadows/DirectionalLightShadow) 阴影是通过[OrthographicCamera](https://threejs.org/docs/index.html?q=camera#api/zh/cameras/OrthographicCamera) 正交相机计算生成的

```js
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
 // 设置光的位置
directionalLight.position.set(10, 10, 10)
scene.add(directionalLight)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271749989.png" alt="图片" style="zoom:80%;" />

默认情况下，光线由正上方向下照射。我们也可以使用位置`position`属性来移动光源

```js
directionalLight.position.set(1, 0.25, 0)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271748644.png" alt="图片" style="zoom:80%;" />

光源和物体的距离暂时无关，因为平行光只需要关心照射角度。

## **半球光HemisphereLight**

半球光的效果类似于环境光，区别在于它可以设置天空和地面两种颜色，面向天空的面将被天空颜色照亮，而另一面将被地面色照亮。

第一个参数是天空颜色，第二个参数是地面色，第三个参数是光照强度：

```js
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271748804.png" alt="图片" style="zoom:80%;" />

## **点光源PointLight**

点光源就像一个看不见的电灯泡，电灯泡对周围所有的物体雨露均沾，光线均匀传播。第一个参数是颜色，第二个参数是强度：<font color =#ff3040>必须设置光源位置</font>

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5)
// 设置光的位置
pointLight.position.set(10, 10, 10)
scene.add(pointLight)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271747478.png" alt="图片" style="zoom:80%;" />

我们同样可以移动它的坐标来改变光源的位置

```js
pointLight.position.set(1, - 0.5, 1)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271747948.png" alt="图片" style="zoom:80%;" />

默认情况下，光照的范围是无限大的。但是我们也可以设置光照的最大距离`distance`和衰减`decay`属性，设置他们就像是精细的控制电灯泡的瓦数。

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271747003.png" alt="图片" style="zoom:80%;" />

## **矩形面光源(平面光源)RectAreaLight**

矩形面光源就像是你家客厅里的方形吸顶灯。第一个参数是颜色，第二个参数是强度，第三和第四个参数是矩形的宽度和高度：

* 平面光源没有阴影

```js
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271746565.png" alt="图片" style="zoom:80%;" />

矩形面光源仅适用于 `MeshStandardMaterial` 和`MeshPhysicalMaterial`。我们可以移动和旋转它：

```js
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271746066.png" alt="图片" style="zoom:80%;" />

> “
>
> 没有传递任何参数的Vector3其实x，y和z是0，也就是场景的中心。
>
> ”

## **聚光灯SpotLight**

聚光灯就像手电筒，光线从一个点朝一个方向射出，形成光束。

* 聚光灯的[.shadow](https://threejs.org/docs/index.html?q=SpotLight#api/zh/lights/SpotLight.shadow) 阴影是通过[SpotLightShadow](https://threejs.org/docs/index.html?q=SpotLight#api/zh/lights/shadows/SpotLightShadow) 透视相机[PerspectiveCamera](https://threejs.org/docs/index.html?q=ca#api/zh/cameras/PerspectiveCamera) 计算生成的

- 创建时的参数列表:

  - `color`: 光的颜色
  - `intensity`: 光照强度
  - `distance`: 光照最大距离
  - `angle`: 光束的大小
  - `penumbra`: 光束边缘的清晰度
  - `decay`: 光照的衰减速度

```js
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/7.png" alt="7" style="zoom:80%;" />

当我们想旋转聚光灯的时候略有点麻烦，但聚光灯的实例有一个名为`target`的属性，它也是一个`Object3D`对象。聚光灯会总是看向那个`target`所在的位置。

但是，当我们尝试直接更改`target`的位置时，似乎聚光灯不会发生什么变化：

```js
spotLight.target.position.x = - 0.75
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/6.png" alt="6" style="zoom:80%;" />

这是因为我们的目标不在场景中，要使其工作，我们还需要将`target`添加到场景中：

```js
scene.add(spotLight.target)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/5.png" alt="5" style="zoom:80%;" />

### **设置聚光灯聚焦大小**

* [.angle](https://threejs.org/docs/index.html#api/zh/lights/SpotLight.angle) 可以设置聚光灯 聚焦大小 数值越小 范围也就越大 最大范围应该不超过 **`Math.PI/2`**。默认值为 **`Math.PI/3`**。

```tsx
    // 聚光灯
    const SpotLight = new THREE.SpotLight(0xffffff, 0.5)
    // 设置聚光灯的位置
    SpotLight.position.set(5, 5, 5)
    // 开启聚光灯阴影
    SpotLight.castShadow = true
    //TODO 设置聚光灯的角度
    SpotLight.angle = Math.PI / 4
    // 添加灯光到场景
    this.scene.add(SpotLight)
```

![image-20221025192734516](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210251927570.png)

### **设置聚光灯光线距离**

* [.distance](https://threejs.org/docs/index.html?q=gui#api/zh/lights/SpotLight.distance) 可以设置光线的距离 默认是`0`空值 空值就是没有衰减
  * 如果从非`0`开始 范围是:`1~100`之间 值越大光线距离越长
  * 光线距离越短 衰弱的效果就越强

```tsx
  // 设置聚光灯光线距离
  SpotLight.distance = 20
```

![image-20221025202931280](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210252029333.png)

### **设置聚光灯半影的衰减**

* [.penumbra](https://threejs.org/docs/index.html?q=gui#api/zh/lights/SpotLight.penumbra) 可以设置聚光灯的半影衰减 默认是`0` 范围是`0~1` 值越大半影衰减越明显 会显得聚焦感降低 更虚化看上去更真实

```tsx
  // 设置聚光灯半影的衰减
  SpotLight.penumbra = 0.5
```

![image-20221025204235175](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210252042240.png)

### **设置灯光的强度(亮度)**

* 可以通过聚光灯的构造器生成强度 也可以通过`.intensity`二次设置灯光强度 它会覆盖构造器的灯光强度

```tsx
    // 聚光灯
    const SpotLight = new THREE.SpotLight(0xffffff, 0.5) // 通过构造器设置聚光灯强度
    // 设置灯光强度
    SpotLight.intensity = 1 // 通过对.intensity 赋值修改灯光的强度 它会覆盖构造器的灯光强度
```

## 设置物理光照和衰减量

这里用聚光灯[SpotLight](https://threejs.org/docs/index.html?q=SpotLight#api/zh/lights/SpotLight) 进行演示 物理衰减对性能的要求较大 灯光会根据距离的长短进行不同效果的展示 越远越暗 越近越亮

* [.physicallyCorrectLights](https://threejs.org/docs/index.html?q=SpotLight#api/zh/renderers/WebGLRenderer.physicallyCorrectLights) 可以开启[WebGLRenderer](https://threejs.org/docs/index.html?q=SpotLight#api/zh/renderers/WebGLRenderer.physicallyCorrectLights) 渲染器的物理光照效果, 需要在`renderer`中开启
* [.decay](https://threejs.org/docs/index.html?q=SpotLight#api/zh/lights/SpotLight.decay) 可以设置物理光照的衰减量 如果不开启[.physicallyCorrectLights](https://threejs.org/docs/index.html?q=SpotLight#api/zh/renderers/WebGLRenderer.physicallyCorrectLights) 物理光照将不会有效果
  * decay 设置为等于`2`将实现现实世界的光衰减。缺省(默认)值为`1`。

```tsx
    // 聚光灯
    const SpotLight = new THREE.SpotLight(0xffffff, 0.6)
    // 设置聚光灯的位置
    SpotLight.position.set(5, 5, 5)
    // 开启聚光灯阴影
    SpotLight.castShadow = true
    // TODO 设置物理光照的衰减量
    SpotLight.decay = 0.2
    // 添加灯光到场景
    this.scene.add(SpotLight)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    // TODO 开启物理光照效果
    this.renderer.physicallyCorrectLights = true
```

## 性能相关

3D世界有了灯光之后才更加真实。但是灯光也会带来更多的性能消耗。

所以我们应该尽可能少用灯，或者仔细思考是否可以用性能消耗更少的灯光来满足需求。

少量性能消耗的灯光：

- `AmbientLight` 环境光
- `HemisphereLight `半球光

中等性能消耗的灯光：

- `DirectionalLight` 平行光
- `PointLight` 点光源

大量性能消耗的灯光：

- `SpotLight` 聚光灯
- `RectAreaLight` 矩形面光源

## **灯光烘焙**

还有一种技术，既可以保留灯光的效果，又几乎没有性能消耗，这就是灯光烘焙。这种技术可以将灯光对材质的表现固化到纹理贴图上。通常我们在3D建模软件中来完成烘焙。

> “
>
> 注意，烘焙只能用于不会运动的光源和物体。
>
> ”

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/3.png" alt="3" style="zoom: 67%;" />

## **灯光辅助**

灯光会对3D场景中产生影响，但其本身是不可见的，所以移动或是旋转时就很麻烦，但我们可以使用灯光辅助类来使得灯光对象变得可见

- [HemisphereLightHelper](https://threejs.org/docs/index.html?q=HemisphereLightHelper#api/zh/helpers/HemisphereLightHelper) 半球形光辅助
- [DirectionalLightHelper](https://threejs.org/docs/index.html?q=DirectionalLightHelper#api/zh/helpers/DirectionalLightHelper) 平行光辅助
- [PointLightHelper]() 点光源辅助
- [RectAreaLightHelper](https://threejs.org/docs/index.html?q=RectAreaLightHelper#examples/zh/helpers/RectAreaLightHelper) 自定义光源辅助
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

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/642.png" alt="642" style="zoom:80%;" />

对于`SpotLightHelper`而言，没有大小参数。另外，在移动`target`后，我们需要调用`update(...)` 方法来更新它：

```js
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/641.png" alt="641" style="zoom:80%;" />

`RectAreaLightHelper`没有内置在`Three.js`中，像导入[OrbitControls](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)一样导入后才可以使用它

* `jsm`文件是three.js的ts扩展, 如果你使用的ts就必须通过`jsm`文件导入

```js
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/640.png" alt="640" style="zoom:80%;" />

## 开启灯光阴影

* 除了一些不支持阴影的光源(比如: `AmbientLight`环境光)以外 开启灯光阴影 当灯光打在物体上 可以实现阴影效果 阴影效果比较消耗性能 所以three.js默认是关闭阴影的 但是可以通过以下步骤打开阴影效果:
* 阴影的基类[LightShadow](https://threejs.org/docs/index.html?q=OrbitControls#api/zh/lights/shadows/LightShadow) 可以设置阴影的一些属性
  0. 材质和光源要满足对光照的反应 比如`AmbientLight`环境光 和 `MeshBasicMaterial`基础网格材质 就没有光照反应 所以设置阴影无效
  
  1. 设置[WebGLRenderer.shadowMap](https://threejs.org/docs/index.html?q=webgl#api/zh/renderers/WebGLRenderer.shadowMap)渲染器开启对阴影的计算 ` renderer.shadowMap.enabled = true`
  2. 设置灯光投射阴影 (比如 平型光[DirectionalLight.castShadow](https://threejs.org/docs/index.html?q=DirectionalLight#api/zh/lights/DirectionalLight.castShadow))`.castShadow = true`
  3. 设置`Object3D`物体投射阴影(需要阴影的物体)[.castShadow](https://threejs.org/docs/index.html?q=mesh#api/zh/core/Object3D.castShadow) `Object3D.castShadow = true`
  4. 设置`Object3D`物体接收阴影(阴影投射的物体)[.receiveShadow](https://threejs.org/docs/index.html?q=mesh#api/zh/core/Object3D.receiveShadow) `Object3D.receiveShadow= true`

```tsx
  // 声明一个球体并具备阴影效果
  const sphere = new THREE.SphereGeometry(1, 20, 20)
  // 声明一个标准材质
  const mmaterial = new THREE.MeshStandardMaterial()
  // 创建网格模型
  const sphereMesh = new THREE.Mesh(sphere, mmaterial)
  // TODO 开启物体投射阴影
  sphereMesh.castShadow = true
  // 添加到场景
  scene.add(sphereMesh)

  // 声明一个平面用来接收物体阴影
  const plane = new THREE.PlaneGeometry(10, 10)
  // 声明一个标准材质
  const pmaterial = new THREE.MeshStandardMaterial()
  // 创建网格模型
  const planeMesh = new THREE.Mesh(plane, pmaterial)
  // 定位平面
  planeMesh.position.set(0, -1, 0)
  // 旋转平面到底部
  planeMesh.rotation.x = -Math.PI / 2
  // TODO 开启物体接收阴影
  planeMesh.receiveShadow = true
  // 添加到场景
  scene.add(planeMesh)

  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
  scene.add(light)
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(10, 10, 10)
  // TODO 设置灯光投射阴影
  directionalLight.castShadow = true
  scene.add(directionalLight)

  // 创建一个辅助线
  const axesHelper = new THREE.AxesHelper(20)
  scene.add(axesHelper)

  // 4. 设置渲染器(画布)的大小 通过setSize()设置
  renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
  // TODO 设置WebGLRenderer渲染器开启对阴影的计算
  renderer.shadowMap.enabled = true
  // 5. 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
  nameCanvas.appendChild(renderer.domElement)

```

* 开启阴影的效果

![image-20221023204057143](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210232040198.png)

* 设置阴影的属性 可以通过`灯光变量.shadow.阴影属性` 进行设置 详细可以看阴影基类[LightShadow](https://threejs.org/docs/index.html?q=OrbitControls#api/zh/lights/shadows/LightShadow)

![image-20221025150515814](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210251505864.png)

### **设置阴影的模糊度**

* [.radius](https://threejs.org/docs/index.html?q=OrbitControls#api/zh/lights/shadows/LightShadow.radius)设置阴影的模糊度 可以降低性能消耗(?) 但是越高的模糊度 会显得阴影不够细致有重影 可以通过[.mapSize ](https://threejs.org/docs/index.html?q=OrbitControls#api/zh/lights/shadows/LightShadow.mapSize)设置阴影的质量
  * 阴影模糊度默认值是`1`

```tsx
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  // 设置光源位置
  directionalLight.position.set(10, 10, 10)
  // 开启光照投射阴影
  directionalLight.castShadow = true
  // TODO 设置阴影的模糊度
  directionalLight.shadow.radius = 10 // 默认值是1
  // 添加到场景
  scene.add(directionalLight)
```

* 模糊度对比效果

![image-20221025142611593](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210251426638.png)

### 设置阴影的质量

* 阴影可以设置其质量 阴影质量越高 吃的性能就越多 通过光源对象进行设置
* [.mapSize ](https://threejs.org/docs/index.html?q=OrbitControls#api/zh/lights/shadows/LightShadow.mapSize)设置阴影的质量 阴影的质量必须是2的幂 默认是: (512,512)
  * (512,512) 是低质量阴影 也是默认阴影的默认质量
  * (1024,1024) 中等质量阴影
  * (2048,2048) 高质量阴影
  * (4096,4096) 超高质量阴影

```tsx
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  // 设置光源位置
  directionalLight.position.set(10, 10, 10)
  // 开启光照投射阴影
  directionalLight.castShadow = true
  // TODO 设置阴影模糊度
  directionalLight.shadow.mapSize.set(1024, 1024)
  // 添加到场景
  scene.add(directionalLight)
```

### **设置灯光物体跟踪**

* [.target](https://threejs.org/docs/index.html?q=light#api/zh/lights/SpotLight.target) 设置灯管对物体的跟踪 大部分的灯光都支持物体跟踪 
  * 设置灯光对应的物体(网格模型`mesh`) 这样物体移动的时候灯光也会跟着物体移动

```tsx
    // 声明一个球体
    const sphere = new THREE.SphereGeometry(1, 20, 20)
    // 声明一个标准材质
    const mmaterial = new THREE.MeshStandardMaterial()
    // 创建网格模型
    const sphereMesh = new THREE.Mesh(sphere, mmaterial)
    // 开启阴影
    sphereMesh.castShadow = true
    // 添加到场景
    this.scene.add(sphereMesh)
    
   // 设置聚光灯
    const SpotLight = new THREE.SpotLight(0xffffff, 0.5)
    // 设置聚光灯的位置
    SpotLight.position.set(5, 5, 5)
    // 开启聚光灯阴影
    SpotLight.castShadow = true
    // TODO 设置灯光对应的物体(网格模型mesh) 这样物体移动的时候灯光也会跟着物体移动
    SpotLight.target = sphereMesh
    // 添加灯光到场景
    this.scene.add(SpotLight)
```

## 灯光添加物体中

* 创建后的灯光 如果直接添加到`mesh`场景中 那么是场景灯光 也可以把灯光添加到物体中 那么就是物体灯光 (比如创建一个球体模拟太阳)

```tsx
   // 创建场景
   const scene = new THREE.Scene()
   // 创建一个灯光小球
    const lightBall = new THREE.Mesh(
      // 创建小球
      new THREE.SphereGeometry(0.1, 20, 20),
      // 创建标准材质
      new THREE.MeshBasicMaterial({ color: '#ff3040' })
    )
    // 物体添加到场景中
    scene.add(lightBall)
    
    // 创建点光源
    const directionalLight = new THREE.PointLight('#ff3040', 1)
    // 把点光源添加到小球中
    lightBall.add(directionalLight)

```

* 效果图
  * 那么随着灯光物体变化 物体的光照效果(影子)也会发生变化

![image-20221030181556010](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210301815069.png)

## 参考文献

[一文搞懂3D世界里的灯光 |《Three.js零基础直通13》](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247489582&idx=1&sn=58352429e98ca46417625407b5bad600&chksm=cefc7d4df98bf45b61bccf43fd999fea7e8fedf425cc338be58b44756622b8cb168a45ca6194&scene=178&cur_album_id=2405559566127480834#rd)

[06-PBR](https://www.yuque.com/books/share/aa187c93-6603-453e-9377-9a935b59aeb4/hvvntq)
