---
title: three.js 之 Material材质
date: 2023-03-10
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



## 网格朗伯材质([MeshLambertMaterial](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshLambertMaterial))

`MeshLambertMaterial`能够反光(但达不到镜面效果)，可以让几何物体产生简单的暗淡的表面。在大部分 3D 应用中，朗伯都是一种常用的材质。就像之前，我们可以调整颜色。我们可以通过 `emissive` 属性来给材质添加亮色。适合粗糙的物体

* 他的其他名字叫 `漫反射材质` 他具备光照反射效果 具备立体感 同时消耗性能较低 适合粗糙的物体, 比如墙体, 木头或地板, **也可以设置文字展示**的效果
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

## PBR网格标准材质([MeshStandardMaterial](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial))

`MeshStandardMaterial`的主要目标是将`MeshLambertMaterial`和`MeshPhoneMaterial`结合成一种材质。

* [PBR材质](./6_PBR.md) 是一种非常写实的材质 立体感很棒 渲染的效果非常好 同时消耗性能较大 `PBR`已经成为很多3D渲染引擎的标准，而无论你在任何软件，引擎中使用标准材质时，得到的结果都是一样的。
  * [.metalness](https://threejs.org/docs/index.html?q=sta#api/zh/materials/MeshStandardMaterial.metalness)粗糙度 和 [.roughness](https://threejs.org/docs/index.html?q=sta#api/zh/materials/MeshStandardMaterial.metalness)金属度 是该材质的典型内容
* `PBR材质`它有粗糙度和金属性的材质并且改变这些属性能够创建**非透明**的暗淡或者金属性光泽的表秒。

* <font color =#ff3040>注意: 该材质需要灯光才能看到</font>

![image-20230310174221078](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101742172.png)

我们可以直接调整粗糙度`roughness`和金属度`metalness`的值来观察

```js
const material = new THREE.MeshStandardMaterial({metalness: 0, roughness: 0.5});
material.metalness = 0.45
material.roughness = 0.65
```

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271929399.png" alt="图片" style="zoom:67%;" />



## 物理材质([MeshPhysicalMaterial](https://threejs.org/docs/index.html?q=MeshPhysicalMaterial#api/zh/materials/MeshPhysicalMaterial))

**基于物理的透明度:** 可以实现更加真实的类似玻璃等薄而透明的效果。

- **继承了`MeshStandardMaterial`PBR材质**金属度、粗糙度等属性, 并提供更优秀的反射和半透明效果 性能消耗高于`MeshStandardMaterial`PBR材质。
- 像汽车的漆面和镜子的镜面效果, 都可以用`MeshStandardMaterial`物理材质实现
- `MeshPhysicalMaterial`在不同版本three.js中，支持的属性也不完全相同，总的来说，版本越新，支持的功能越多。
- <font color =#ff3040>注意: 该材质需要灯光才能看到</font>

![image-20230310173943381](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101740483.png)

### **车外壳油漆效果**

车外壳油漆效果，你可以通过PBR材质的 清漆层厚度属性 [.clearcoat](https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial.clearcoat) 和 清漆层粗糙度属性 [.clearcoatRoughness](https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial.clearcoatRoughness)模拟

#### **清漆层厚度和清漆层粗糙度**

使用清漆层厚度属性`.clearcoat`，就好比你在物体表面包裹了一层东西，刷了一层漆，喷了点水。

* 想模拟车漆，碳纤维，湿水的表面，就需要在原有Mesh的面上再增加一个透明的涂层效果，`.clearcoat`属性可以在不需要重新创建一个透明的图层Mesh的情况下做到类似的效果。
* 你可以认为`.clearcoat`表示透明涂层的厚度, 把他理解为物体表面有一层透明图层，，从0.0到1.0。默认值为0.0。值越高透射性越差颜色会更深

清漆层粗糙度属性`.clearcoatRoughness`, 为了模拟清漆图层，而且涂层最好具有一定的反光特性，有一定的起伏和粗糙度

* 清漆层粗糙度`.clearcoatRoughness`属性表示物体表面透明涂层`.clearcoat`对应的的粗糙度，`.clearcoatRoughness`的范围是为0.0至1.0。默认值为0.0。值越表面越粗糙, 光线越差
* 清漆层粗糙度效果十分的明显, 如果想保持一个极高的漆面效果, 这个值需要调的很低

```js
const material = new THREE.MeshPhysicalMaterial({
  clearcoat: 1, // 设置清漆度, 从0.0到1.0。默认值为0.0。值越高透射性越差颜色会更深
  clearcoatRoughness: 0.01,//透明涂层表面的粗糙度
})

```

![image-20230310182238138](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101822550.png)

#### **清漆层粗糙度贴图**

如果一个mesh表面的透明图层对应的粗糙图属性`.clearcoatRoughness`，不同位置不同，可以用清漆层粗糙度贴图`.clearcoatRoughnessMap `来表示。

### **车子玻璃效果**

车子的玻璃效果需要打开透明支持 [.transparent](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/Material.transparent), 通过物理光学透明度 [.transmission](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/MeshPhysicalMaterial.transmission)(透射度)属性配合透明属性 [.opacity](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/Material.opacity), 实现一个玻璃效果

#### **物理光学透明度`.transmission`(透射度)**

为了更好的模拟玻璃、半透明塑料一类的视觉效果, 需要配合透明度属性`.opacity`。`.opacity`需要开启`transparent`透明支持

* 对于半透明的Mesh，可以使用Mesh透明度属性`.opacity`设置，不过在透明度`.opacity`比较高的时候，整个物体会隐藏起来。通过物理透明度`.transmission`属性, 即便完全透射的情况下仍可保持高反射率, 物体不会隐藏起来
* 物理光学透明度`.transmission`的值范围是从0.0到1.0。默认值为0.0。数值越高透明度越差
* 透明度属性`opacity`的值范围是从0.0到1.0。默认值为0.0, 数值越搞物体越真实存在
* 通常理透明度`.transmission`属性配合透明度属性`.opacity`。

```js
const material = new THREE.MeshPhysicalMaterial({
  color: '#000000', // 设置黑色
  opacity: 0.5, // 设置透明度, 默认为1, 半透明可以实现车窗膜效果
  transparent: true, // 设置透明, 配合透明度使用
  transmission: 1, // .设置透光度
  metalness: 0, // 设置金属度
  roughness: 0, // 设置粗糙度
})

```

![image-20230310194550694](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101945843.png)

![image-20230310194330735](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101943869.png)

#### **物理光学透明度贴图`.transmissionMap`**

使用贴图方式表达物理光学透明度`.transmission`属性。

### **折射率`.ior`**

非金属材料的折射率从1.0到2.333。默认值为1.5。

折射率，真空IOR为1，水1.44，[各种物质折射率](https://www.btbat.com/12032.html)


### **反射率`.reflectivity`属性**

反射率`.reflectivity`属性模拟了非金属材质的反射率。当PBR材质的金属度`metalness`为1.0时，此属性无效。

反射率`.reflectivity`属性的范围由0.0到1.0。默认为0.5, 相当于折射率1.5。

examples案例：webgl_materials_physical_reflectivity


### **光泽层强度`.sheen`**

examples例子：webgl_materials_physical_sheen 

光泽层强度`.sheen`,范围是0.0到1.0。默认为0.0。

如果`.sheen`光泽属性指定了颜色，则材质将使用特殊的光泽**BRDF**，用于渲染诸如天鹅绒之类的布料。光泽的颜色提供了创建两个色调的镜面反射材料的能力。默认为null。

### **光泽颜色`.sheenColor`**

光泽`.sheen`的颜色，默认为0xffffff白色。

### **光泽层的粗糙度`.sheenRoughness`**

光泽层的粗糙度`.sheenRoughness`，范围0.0到1.0。默认值是1.0。

### **光泽层粗糙度贴图`.sheenRoughnessMap`**

光泽层粗糙度贴图`.sheenRoughnessMap`的透明通道会与.sheenRoughness相乘，用于改变光泽层的粗糙度，默认为null;

### **光泽颜色粗糙度贴图`.sheenColorMap`**

光泽颜色粗糙度贴图`.sheenColorMap`的RGB通道会与`.sheenColor`光泽颜色相乘，最终作为光泽颜色结果，默认为null。



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
* `Sprite`是一个平面, 没有z轴的值

```js
const map = new THREE.TextureLoader().load('sprite.png')
const material = new THREE.SpriteMaterial({
    map
})
const sprite = new THREE.Sprite(material)

```

![sprite material](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639077)

## 关于Threejs材质中深度测试

3维场景中要绘制物体的遮挡关系，就离不开**深度测试**

* 深度测试的简单解释（抛开透明等情况）： 如果**开启了`depthTest`深度测试**，每个片元就要拿自己的深度值，跟深度缓冲区中**对应位置的深度值**比较，如果自己离屏幕**更近**（默认的比较方式），且**开启了`depthWrite`深度写入**，就会把深度缓冲区中这块位置的深度值**替换**成自己的深度值，让自己成为**标杆**，并有机会展示到屏幕上，后面只有这块位置比自己离屏幕更近的，才有机会替换掉自己展示到屏幕上
* 如果**没开启深度测试`depthTest`**，则会按绘制顺序，后面绘制的覆盖前面的, 通过.[renderOrder](https://threejs.org/docs/index.html#api/zh/core/Object3D.renderOrder) 可以查看物体的渲染顺序
* `depthTest`深度测试和`depthWrite`深度写入, 默认是`true`开启状态
*  除了深度方面, three.js渲染物体的时候, 默认会开启[WebGLRenderer的sortObjects](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer.sortObjects) 绘制顺序, 通过.[renderOrder](https://threejs.org/docs/index.html#api/zh/core/Object3D.renderOrder) 设置物体的渲染顺序, 也可以控制物体的深度方面内容

three材质相关的参数可以**影响深度测试**，这些参数，作用于**使用这个材质的物体**，原理就是控制前面提到的深度相关的的**开启[depthTest](https://threejs.org/docs/index.html#api/zh/materials/Material.depthTest)** 与 **写入[depthWrite](https://threejs.org/docs/index.html#api/zh/materials/Material.depthWrite)**

### **示例代码介绍**

后面的示例都会基于此，绘制存在遮挡关系的正方体跟圆柱体，**绘制顺序很重要**，先绘制的正方体，后绘制的圆柱体

```js
// 正方体
const cubeGeometry = new THREE.BoxGeometry(200, 200, 200)
// 正方体材质
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0x00ff00
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// 圆柱体
const cyGeometry = new THREE.CylinderGeometry(50, 50, 300, 32)
const cyMaterial = new THREE.MeshLambertMaterial({
  color: 0xffff00
})
// 圆柱体材质
const cylinder = new THREE.Mesh(cyGeometry, cyMaterial)
cylinder.rotateX(Math.PI / 2)
scene.add(cylinder)

```

默认行为两个物体的深度测试和深度写入是开启的, 显示效果如下

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303021113705.webp)

> [depthTest](https://threejs.org/docs/index.html#api/zh/materials/Material.depthTest) 开启物体的深度测试

```js
// 给后渲染的圆柱体关闭深度测试
const cyMaterial = new THREE.MeshLambertMaterial({
  ...
  depthTest: false
})

```

使用此参数使圆柱不被遮挡，可以关闭圆柱的深度测试，这样圆柱的绘制，就变成了不按照前后位置关系绘制，而是按照渲染的前后顺序绘制，这样后绘制的圆柱就可以覆盖正方体了

![image.png](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303021121412.webp)

> [depthWrite](https://threejs.org/docs/index.html#api/zh/materials/Material.depthWrite) 开启物体是否可以深度写入

```js
// 给先渲染的立方体关闭深度写入
const cubeMaterial = new THREE.MeshLambertMaterial({
  ...
  depthWrite: false
})

```

上一节为了让圆柱不被遮挡，是处理了圆柱，我们也可以处理正方体使其挡不住圆柱，阻止正方体的深度值写入，这样深度缓冲区中对应位置存的是圆柱的深度信息，圆柱变成了离屏幕最近的，就不会被遮挡了

![image.png](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303021136505.webp)

>  [depthFunc](https://threejs.org/docs/index.html#api/zh/materials/Material.depthFunc) **深度测试函数**

作用：默认为`THREE.LessEqualDepth`， 材质使用这些深度函数来比较输入像素和缓冲器中深度的值。 如果比较的结果为`true`，则将绘制像素。**不要关闭`depthTest`深度测试**
也就是说深度测试是有规则的，只是默认绘制最近的，可以修改规则, [three.js提供了很多深度模式规则](https://threejs.org/docs/index.html#api/zh/constants/Materials)

![image.png](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303021147132.webp)

```js
// 修改深度测试函数, 
const cubeMaterial = new THREE.MeshLambertMaterial({
  depthFunc: THREE.NeverDepth
})

```

### **关于多个透明物体渲染**

关于透明物体的渲染，我们经常会碰到各种问题。最常见的问题就是**多个透明物体**在渲染的时候，会跳过后面一个透明物体直接显示了之后的物体，从而形成非常诡异的现象。

![image-20230302154718781](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303021551902.png)

> 解决方式

**第一种解决: **干预物体的渲染顺序, 修改`Mesn`中的`.renderOrder`渲染顺序

three.js渲染物体的时候, 默认会开启[WebGLRenderer的sortObjects](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer.sortObjects) 绘制顺序, 通过.[renderOrder](https://threejs.org/docs/index.html#api/zh/core/Object3D.renderOrder) 设置物体的渲染顺序(默认是0), 控制物体的深度方面内容

* 适合某些透明材质是固定的场景
  * 比如`gltf/glb`模型自带的透明材质和二次创建的透明材质重叠的时候, 直接拉高二次创建的透明材质`.renderOrder`渲染顺序

* 如果`.sortObjects = false`不开启自动排序，`.renderOrder`渲染顺序将会失效, 绘制顺序就是物体的添加顺序（**注意，此时透明物体和非透明物体仍然是分开渲染的**）

```js
const material = new THREE.SpriteMaterial({
  map: spriteMap,
  transparent: true
})

const sprite = new THREE.Sprite(material)

// 给模型设置渲染顺序, 这样就不会, 有点类似于css中的z-index层级设置
sprite.renderOrder = 1

```

这样当多个透明物体叠加在一起的时候, 显示效果就正常了

![image-20230302183647403](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303021836462.png)

**第二种解决:** 也可以基于 alpha blending 的简单方式渲染,一般步骤：

1. **先绘制不透明物体（threejs从近向远排序绘制）**
2. 关闭透明材质的深度写入（`depthwrite: false`）
3. 打开透明材质的深度测试（`depthTest: true`）, 这个是默认开启的, 可以不设置
4. 透明物体根据相机距离进行排序（从远向近的顺序绘制）

* 如果向让透明物体一直显示，无论从什么角度都显示, 可以把第三步设置`depthTest: false`取消深度测试

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303021842488.jpeg)

## 文章来源

[three.js 之 Material](https://segmentfault.com/a/1190000014639067)

[一文搞懂 Three.js 里的材质 |《Three.js零基础直通11》](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247489272&idx=1&sn=e450ccc5ac8330fabbe2358573061523&chksm=cefc739bf98bfa8d2409f78b6597025a4bc9b721b7679b00dbf23de96c77f33c7cf4beab665b&scene=178&cur_album_id=2405559566127480834#rd)

[看懂Threejs材质中深度测试相关参数](https://juejin.cn/post/7043330105241763847)

[threejs中深度与透明](https://zhuanlan.zhihu.com/p/151649142)
