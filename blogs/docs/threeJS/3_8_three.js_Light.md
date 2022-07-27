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

## **前言**

添加灯光其实和添加其它3D对象一样简单，首先实例化一个灯光，然后通过`scene.add`将其添加到场景中。在`Three.js`中有多种类型的灯光，我们已经简单用过了环境光`AmbientLight` 和点光源`PointLight`。

接下来，我们将在这一小节中详细了解所有不同类型的灯光以及如何使用它们。

## **准备工作**

首先我们来准备一个基础场景（一个`Sphere`球体、一个`Box`立方体、一个`Torus`圆环和一个`Plane`平面作为地板）。

因为我们要使用灯光，所以我们必须使用对灯光有反应的材质。有很多材质对灯光有反应，在前面有关材质的课程中我们已经学习过了。本节中我们将使用`MeshStandardMaterial`，因为它是我们在上一课中看到的最真实的一种。我们将材质的粗糙度`roughness`设置为0.4，这样我们就能观察到光的反射。

![图片](https://mmbiz.qpic.cn/mmbiz_png/t1ynS50Irh1tajggTYo7eu5ibKBXZjIWngibgnmlVUgckeJpF8C4iaaYsibHYNYKiaasA2Ln8ic9HTnuNmQdNE7UW86Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

由于我们使用了对光有反应的材质，所以在没有任何灯光的情况下，我们的3D世界将只有一片黑暗！

## **环境光AmbientLight**

环境光将在场景内的所有几何图形上应用全向照明（其实就是所有颜色的亮度提升）。它的第一个参数是颜色，第二个参数是光照强度。我们可以在实例化的时候直接设置属性，也可以在以后更改它们：

```
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Equals
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/t1ynS50Irh1tajggTYo7eu5ibKBXZjIWn5PfceldHI65DjvQKXI64pKkrNic79nR1GbXT2xK2n1X0iborZIicic0bOA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)/assets/lessons/15/step-02.png

就像我们在前面课程中所学到的，我们可以将灯光的属性添加到调试UI里，这样将极大的方便我们测试不同属性下灯光和材质的表现。

```
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
```

如果整个场景中，只有一个环境光，那么所有几何体的材质看上去都和`BasicMaterial`一样，因为所有几何体上的面都将被平均点亮。在现实生活中，当一个物体被照亮时，物体背面不会完全是黑色的，因为光线会在墙壁和其他物体上反射到物体背面。出于性能原因，`Three.js`不支持光反射，但是我们可以使用`AmbientLight`来模拟这种光反射。

## **平行光DirectionalLight**

平行光`DirectionalLight`通常用来模拟太阳光，第一个参数是颜色，第二个参数是强度：

```js
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
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

点光源就像一个看不见的电灯泡，电灯泡对周围所有的物体雨露均沾，光线均匀传播。第一个参数是颜色，第二个参数是强度：

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5)
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

## **矩形面光源RectAreaLight**

矩形面光源就像是你家客厅里的方形吸顶灯。第一个参数是颜色，第二个参数是强度，第三和第四个参数是矩形的宽度和高度：

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

## **性能优化**

3D世界有了灯光之后才更加真实。但是灯光也会带来更多的性能消耗。

所以我们应该尽可能少用灯，或者仔细思考是否可以用性能消耗更少的灯光来满足需求。

少量性能消耗的灯光：

- AmbientLight 环境光
- HemisphereLight 半球光

中等性能消耗的灯光：

- DirectionalLight 平行光
- PointLight 点光源

大量性能消耗的灯光：

- SpotLight 聚光灯
- RectAreaLight 矩形面光源

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



## 参考文献

[一文搞懂3D世界里的灯光 |《Three.js零基础直通13》](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247489582&idx=1&sn=58352429e98ca46417625407b5bad600&chksm=cefc7d4df98bf45b61bccf43fd999fea7e8fedf425cc338be58b44756622b8cb168a45ca6194&scene=178&cur_album_id=2405559566127480834#rd)
