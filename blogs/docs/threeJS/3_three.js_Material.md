---
title: three.js 之 Material
date: 2022-05-07
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-l3xk6q.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Material 该文章为转载备份文章 <br>
:::

<!-- more -->



## 材质种类

* 在three.js中，材质决定了几何图形中的表面是如何画的。如果几何图形是骨架，定义了形状，那么材质就是皮肤。three.js 中有许多不同种类的材质，他们拥有不同的属性，像反光，纹理映射，调整透明度。

### 网格基础材质([Basic Material](https://link.segmentfault.com/?enc=BFh52AedUaRX7Bj6NkEpdg%3D%3D.ee7gn79A%2Bs8r4ZFlaCWhLNXExJIoR9kjLCRG8zGuHJdUBduyw4n1HxUyedvjvDx0K8XgfJ%2FUzeoJQWFBLyNIIH%2FuZvIpiSbx%2FxbvSzx%2BXos%3D))

最基本的材质是 `MeshBasicMaterial`。你能够把颜色`color`作为参数传进去来生成一个实心的带颜色对象，没有阴影，也不受光照影响。你也能够通过把透明度`opacity`作为参数传进去来调整透明度以及设置透明`transparent`为`true`。

```js
var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.5});
```

![basic material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639070)

### 网格法向材质([Normal Material](https://link.segmentfault.com/?enc=HBAUqe%2B8KIKTnKVUHSCqSA%3D%3D.lwhm8ro9QbNcG63Q900C5qDZIdDIE49keFR6rhYJzB3dk0%2BpJ0ICtto%2FGqewpLt1%2BLm19lySeEZFHt7aTqqDk1Yqvd6D8dtE%2B9WBv7qxGTw%3D))

`MeshNormalMaterial`是另一种材质。它会根据面的法线或朝向使用不同的颜色来渲染网格的面。

```haxe
var material = new THREE.MeshNormalMaterial();
```

![normal material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639071)

### 网格朗伯材质([Lambert Material]())

`MeshLambertMaterial`能够反光，可以让几何物体产生暗淡的表面。在大部分 3D 应用中，朗伯都是一种常用的材质。就像之前，我们可以调整颜色。我们可以通过 `emissive` 属性来给材质添加亮色。

```js
var material = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 0.5});
```

![lambert material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639072)

### 网格Phong式材质([Phong Material]())

就像朗伯材质，`MeshPhongMaterial`也是会反光的，但是它会给表面添加金属光泽，反光强度更大。你可以添加高光色和调整材质 `shininess`属性来改变反光的强度。

```js
var material = new THREE.MeshPhongMaterial({shininess: 1});
```

![phong material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639071)

### 网格标准材质([Standard Material]())

`MeshStandardMaterial`的主要目标是将`MeshLambertMaterial`和`MeshPhoneMaterial`结合成一种材质。它有粗糙度和金属性的材质并且改变这些属性能够创建暗淡或者金属性光泽的表秒。

```js
var material = new THREE.MeshStandardMaterial({metalness: 0, roughness: 0.5});
```

![standard material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639073)

### 网格深度材质([Depth Material]())

另一种不同的材质是`MeshDepthMaterial`，它会对网格对象的灰度级别从黑到白绘制，根据内容的所在的深度不同。

```js
var material = new THREE.MeshDepthMaterial();
```

![depth material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639072)

上面我们看到的都是网格材质，因为他们是用户网格的。但是在three.js中也有不同的几何图形对象，他们有自己独特的材质。

### 直线材质([Line Material]())

如果要画直接，我们必须使用`LineBasicMaterial`。这个和`MeshBasicMaterial`差不多。还有 `LineDashedMaterial`，它能够让你设置直线中点的大小和间距。为了让短划线起作用，你需要在geometry中调用`computeLineDistance`。

```js
var material = new THREE.LineDashedMaterial({dashSize: 2, gapSize: 2});
geometry.computeLineDistances();

var line = new THREE.Line(geometry, material);
```

![line material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639074)
![dashed line material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639075)

### 点材质([Points Material]())

跟画线类似，点的话需要使用 `PointsMaterial`

```js
var material = new THREE.PointsMaterial({color: 0xF3FFE2});
var points = new THREE.Points(geometry, material);
```

![points material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639076)

### 雪碧材质([Sprite Material]())

另一种特殊的材质是`SpriteMaterial`，它能够使用纹理贴图，并且应用于雪碧材质上。Sprite是一种总是面向镜头的特殊平面.

```js
var material = new THREE.SpriteMaterial({map: "mytexture.png"});
var sprite = new THREE.Sprite(material);
```

![sprite material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639077)

## 文章来源

[three.js 之 Material](https://segmentfault.com/a/1190000014639067)
