---
title: three.js 之 Material材质
date: 2022-05-21
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-l3xk6q.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Material 材质 <br>
:::

<!-- more -->

## 材质种类

* 在three.js中，材质决定了几何图形中的表面是如何画的。如果几何图形是骨架，定义了形状，那么材质就是皮肤。three.js 中有许多不同种类的材质，他们拥有不同的属性，像反光，纹理映射，调整透明度。
* 任何类型的材质都是 [Material](https://threejs.org/docs/index.html?q=mater#api/zh/materials/Material)的基类

## 网格基础材质([Basic Material](https://link.segmentfault.com/?enc=BFh52AedUaRX7Bj6NkEpdg%3D%3D.ee7gn79A%2Bs8r4ZFlaCWhLNXExJIoR9kjLCRG8zGuHJdUBduyw4n1HxUyedvjvDx0K8XgfJ%2FUzeoJQWFBLyNIIH%2FuZvIpiSbx%2FxbvSzx%2BXos%3D))

最基本的材质是 `MeshBasicMaterial`。你能够把颜色`color`作为参数传进去来生成一个实心的带颜色对象，没有阴影，也不受光照影响。你也能够通过把透明度`opacity`作为参数传进去来调整透明度以及设置透明`transparent`为`true`。

* 基础材质 <font color=#ff3040>不具备光照反射效果</font> 不具备立体感 所以看起来更像是2d 适合图片`png jpg` 常用来实现序列帧动画
* 适合搭配[PlaneGeometry()](https://threejs.org/docs/index.html?q=PlaneGeometry#api/zh/geometries/PlaneGeometry)平面几何体使用

```js
const material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.5});
```

![basic material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639070)

## 网格标准材质([MeshStandardMaterial](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial))

`MeshStandardMaterial`的主要目标是将`MeshLambertMaterial`和`MeshPhoneMaterial`结合成一种材质。它有粗糙度和金属性的材质并且改变这些属性能够创建暗淡或者金属性光泽的表秒。

* 他的学名也叫 [PBR材质](./6_PBR.md) 是一种非常写实的材质 立体感很棒 渲染的效果非常好 同时消耗性能较大 `PBR`已经成为很多3D渲染引擎的标准，而无论你在任何软件，引擎中使用标准材质时，得到的结果都是一样的。
  * `粗糙度` 和 `金属度` 是该材质的典型内容
* 通常我们加载的`gltf`和`glb`默认会使用`PBR`材质
* <font color =#ff3040>注意: 该材质需要灯光才能看到</font>

```js
const material = new THREE.MeshStandardMaterial({metalness: 0, roughness: 0.5});
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271930405.png" alt="图片" style="zoom:67%;" />

我们可以直接调整粗糙度`roughness`和金属度`metalness`的值来观察

```js
material.metalness = 0.45
material.roughness = 0.65
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271929399.png" alt="图片" style="zoom:67%;" />

## 网格朗伯材质([MeshLambertMaterial](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshLambertMaterial))

`MeshLambertMaterial`能够反光(但达不到镜面效果)，可以让几何物体产生简单的暗淡的表面。在大部分 3D 应用中，朗伯都是一种常用的材质。就像之前，我们可以调整颜色。我们可以通过 `emissive` 属性来给材质添加亮色。适合粗糙的物体

* 他的其他名字叫 `漫反射材质` 他具备光照反射效果 具备立体感 同时消耗性能较低 适合粗糙的物体 比如墙体或者木头, **也可以设置文字展示**的效果
* 如果需要更高的显示效果, 需要使用开较大的`MeshStandardMaterial`PBR材质
* <font color =#ff3040>注意: 该材质需要灯光才能看到</font>

```js
const material = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 0.5});
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271931325.png" alt="图片" style="zoom:67%;" />

## 网格Phong式材质([MeshPhongMaterial](https://threejs.org/docs/index.html?q=MeshPhongMaterial#api/zh/materials/MeshPhongMaterial))

就像朗伯材质，`MeshPhongMaterial`也是会反光的，但是它会给表面添加金属光泽，反光强度更大。你可以添加高光色和调整材质 `shininess`属性来改变反光的强度。

* 他的其他名字叫 `高光网格材质` 是`PBR材质`和`漫反射` 材质的折中材质 渲染的效果也不错
* `MeshPhongMaterial`则是应用这种算法的材质。效果和`MeshLambertMaterial`类似，但光影明暗过度更加自然，性能的消耗也略高于`MeshLambertMaterial`低于`MeshStandardMaterial`PBR。适合一些高光的物体
* <font color =#ff3040>注意: 该材质需要灯光才能看到</font>

```js
const material = new THREE.MeshPhongMaterial({shininess: 1});
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271930552.png" alt="图片" style="zoom:67%;" />

* 您可以通过亮度属性控制光的反射。值越大反射越强，表面越亮，看上去更光洁。您还可以使用`specular`高光色属性来更改反射的颜色:

```js
material.shininess = 100
material.specular = new THREE.Color(0x1188ff)
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271925232.png" alt="图片" style="zoom: 67%;" />

这段代码让反射的光线有些泛蓝色，看出来了吗？

## 物理材质([MeshPhysicalMaterial](https://threejs.org/docs/index.html?q=MeshPhysicalMaterial#api/zh/materials/MeshPhysicalMaterial))

- **基于物理的透明度:** 可以实现更加真实的类似玻璃等薄而透明的效果。

- **更优秀的反射效果 性能消耗高于`MeshStandardMaterial`PBR材质**。

- <font color =#ff3040>注意: 该材质需要灯光才能看到</font>

- 物理材质`MeshPhysicalMaterial`是`MeshStandardMaterial`的扩展或者说加强版，提供更高级的基于物理的渲染属性，比如：

  - **清漆属性Clearcoat:** 有一些材料 (例如汽车油漆，碳纤维和潮湿的表面) 需要在另一层可能不规则或粗糙的表面上的透明反射层。Clearcoat可以实现近似的效果，而不需要单独的透明表面。

    <img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271941547.png" alt="图片" style="zoom:67%;" />

- 其他的展示效果

![图片](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271941126.png)

## 网格法向材质([MeshNormalMaterial](https://link.segmentfault.com/?enc=HBAUqe%2B8KIKTnKVUHSCqSA%3D%3D.lwhm8ro9QbNcG63Q900C5qDZIdDIE49keFR6rhYJzB3dk0%2BpJ0ICtto%2FGqewpLt1%2BLm19lySeEZFHt7aTqqDk1Yqvd6D8dtE%2B9WBv7qxGTw%3D))

`MeshNormalMaterial`是另一种材质。它会根据面的法线或朝向使用不同的颜色来渲染网格的面。

```haxe
const material = new THREE.MeshNormalMaterial();
```

![normal material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639071)

* 那到底什么是法线呢？法线就是始终垂直于平面的一根线，也就代表了面的朝向。而在三维引擎中，每个顶点都有法线信息。

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271858662.png" alt="图片" style="zoom:80%;" />

* 既然法线代表了顶点的朝向，那自然就可以用于计算如何反射光线或折射光线。

> 当使用`MeshNormalMaterial`时，颜色只会显示法线相对相机的方向。这就是说如果我们绕着球体旋转，你会看到颜色总是一样的。

* 除了`wireframe`，`opacity`等基础属性，`MeshBasicMaterial`还可以使用一个新的`flatShading`平面着色属性：

```js
material.flatShading = true
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271859519.png" alt="图片" style="zoom:80%;" />

* 平面着色属意味着法线不会在顶点和顶点之间插值。`MeshNormalMaterial`通常用来调试和观测法线信息，但它看起来很绚丽，所以也可以直接拿来做一些很独特的效果。

## 材质捕捉材质 [MeshMatcapMaterial](https://threejs.org/docs/index.html?q=MeshMatcapMaterial#api/zh/materials/MeshMatcapMaterial)

* 这个名字有点绕口，但`Matcap`的确是由`Material`和`Capture`两个单词组合而成，其意思就是材质捕捉。

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207272009939.png" alt="图片" style="zoom:80%;" />

* 它是一种很棒的材质，效果很不错的同时在性能非常好。

> “
>
> 渲染通常需要几何体、光源、材质、shader 的共同参与。而`matcap` 是将光源、材质信息在3D建模软件中直接**烘焙**到一张纹理贴图上，渲染时直接拿来用即可，计算量自然大大减少，性能提升明显。我们还可以很方便的在不同的 matcap 纹理之间切换，看上去就和切换材质一样。
>
> ”

* 使用`MeshMatcapMaterial`材质时必须使用一个看起来像球体的参考纹理贴图。

```js
// 获取材质贴图
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
// 声明MeshMatcapMaterial材质
const material = new THREE.MeshMatcapMaterial()
// 设置材质捕捉贴图：
material.matcap = matcapTexture
```

* 网上可以找到很多[matcap](https://zhuanlan.zhihu.com/p/420473327)纹理贴图，可以理解为`开箱即用`的材质 https://github.com/nidorx/matcaps

## 网格深度材质([MeshDepthMaterial](https://threejs.org/docs/index.html?q=MeshDepthMaterial#api/zh/materials/MeshDepthMaterial))

另一种不同的材质是`MeshDepthMaterial`，它会对网格对象的灰度级别从黑到白绘制，根据内容的所在的深度不同。

```js
const material = new THREE.MeshDepthMaterial();
```

![depth material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639072)

* 上面我们看到的都是网格材质，因为他们是用户网格的。但是在three.js中也有不同的几何图形对象，他们有自己独特的材质。

* `MeshDepthMaterial`这种材质的外观不是由光照或者某个材质决定，而是由物体到相机的远近距离决定，当物体离相机较近时会呈现白色，较远时会呈现黑色。

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271922356.png" alt="图片" style="zoom: 50%;" />



## 卡通材质 ([MeshToonMaterial](https://threejs.org/docs/index.html?q=MeshToonMaterial#api/zh/materials/MeshToonMaterial))

* `MeshToonMaterial`卡通材质的可以让我们的几何体表现出2次元卡通的风格，俗称3渲2：
* <font color =#ff3040>注意: 该材质需要灯光才能看到</font>

```js
const material = new THREE.MeshToonMaterial()
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937263.png" alt="图片" style="zoom: 67%;" />

* 默认情况下，我们只能看到两种的颜色 (一个用于暗面，一个用于亮面)。如果想要更多的颜色过度，可以使用`gradientMap`属性并加载`gradientTexture`：

```js
material.gradientMap = gradientTexture
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937271.png" alt="图片" style="zoom:67%;" />

如果我们直接设置gradientMap，会发现卡通效果失效了，明暗过度太丝滑了。这是因为我们使用的梯度纹理很小，这和我们在纹理贴图小节中了解过的minFilter，magFilter和mipmapping有关系。

解决方法也很简单，只需要将`minFilter` 和 `magFilter`设置为`THREE.NearestFilter`即可

别忘了加入`generatempmaps = false`：

```js
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937565.png" alt="图片" style="zoom:67%;" />

现在我们能看到卡通效果有三个颜色了，还可以换成有5个颜色过渡的贴图：

```js
// 导入贴图
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937414.png" alt="图片" style="zoom:67%;" />



## 直线材质 ([LineBasicMaterial](https://threejs.org/docs/index.html?q=LineBasicMaterial#api/zh/materials/LineBasicMaterial))

如果要画直接，我们必须使用`LineBasicMaterial`。这个和`MeshBasicMaterial`差不多。还有 `LineDashedMaterial`，它能够让你设置直线中点的大小和间距。为了让短划线起作用，你需要在geometry中调用`computeLineDistance`。

```js
const material = new THREE.LineDashedMaterial({dashSize: 2, gapSize: 2});
geometry.computeLineDistances();

const line = new THREE.Line(geometry, material);
```

![line material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639074)
![dashed line material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639075)

## 点材质([PointsMaterial](https://threejs.org/docs/index.html?q=PointsMaterial#api/zh/materials/PointsMaterial))

跟画线类似，点的话需要使用 `PointsMaterial`

```js
const material = new THREE.PointsMaterial({color: 0xF3FFE2});
const points = new THREE.Points(geometry, material);
```

![points material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639076)

## 雪碧材质([SpriteMaterial](https://threejs.org/docs/index.html?q=SpriteMaterial#api/zh/materials/SpriteMaterial))

雪碧材质/精灵材质材质是`SpriteMaterial`，它能够使用纹理贴图，并且应用于雪碧材质上。

* `SpriteMaterial`精灵材质需要配合[Sprite](https://threejs.org/docs/index.html?q=Sprite#api/zh/objects/Sprite) 精灵物体来使用, 他永远都会面向于相机, 无论怎么修改相机位置, 适合做一些小的信息点, 镜头改变时, 自身也跟着镜头走

```js
const map = new THREE.TextureLoader().load('sprite.png')
const material = new THREE.SpriteMaterial({
    map
})
const sprite = new THREE.Sprite(material)

```

![sprite material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639077)

## 文章来源

[three.js 之 Material](https://segmentfault.com/a/1190000014639067)

[一文搞懂 Three.js 里的材质 |《Three.js零基础直通11》](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247489272&idx=1&sn=e450ccc5ac8330fabbe2358573061523&chksm=cefc739bf98bfa8d2409f78b6597025a4bc9b721b7679b00dbf23de96c77f33c7cf4beab665b&scene=178&cur_album_id=2405559566127480834#rd)
