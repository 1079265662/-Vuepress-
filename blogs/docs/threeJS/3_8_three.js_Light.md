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

## **环境光AmbientLight**

环境光将在场景内的所有几何图形上应用全向照明（四面八方的光）。它的第一个参数是颜色，第二个参数是光照强度。我们可以在实例化的时候直接设置属性，也可以在以后更改它们：

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

创建时的参数列表:

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

灯光会对3D场景中产生影响，但其本身是不可见的，所以移动或是旋转时就很麻烦，但我们可以使用灯光辅助类来使得灯光对象变得可见：

- HemisphereLightHelper
- DirectionalLightHelper
- PointLightHelper
- RectAreaLightHelper
- SpotLightHelper

实例化这些类，使用相应的光作为参数，并将它们添加到场景中。第二个参数用于改变灯光辅助对象的大小：

```js
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

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

`RectAreaLightHelper`没有内置在`Three.js`中，我们要在`Three.js`仓库的路径中找到它`three/examples/js/helpers/RectAreaLightHelper.js`，并像导入`OrbitControls`一样导入后才可以使用它：

```js
import { RectAreaLightHelper } from 'three/examples/js/helpers/RectAreaLightHelper.js'
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/640.png" alt="640" style="zoom:80%;" />

## 开启灯光阴影

* 除了一些不支持阴影的光源(比如: `AmbientLight`环境光)以外 开启灯光阴影 当灯光打在物体上 可以实现阴影效果 阴影效果比较消耗性能 所以three.js默认是关闭阴影的 但是可以通过以下步骤打开阴影效果:

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

## 参考文献

[一文搞懂3D世界里的灯光 |《Three.js零基础直通13》](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247489582&idx=1&sn=58352429e98ca46417625407b5bad600&chksm=cefc7d4df98bf45b61bccf43fd999fea7e8fedf425cc338be58b44756622b8cb168a45ca6194&scene=178&cur_album_id=2405559566127480834#rd)

[06-PBR](https://www.yuque.com/books/share/aa187c93-6603-453e-9377-9a935b59aeb4/hvvntq)
