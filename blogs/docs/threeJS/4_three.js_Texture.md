---
title: three.js 之 Texture纹理
date: 2022-09-08
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209081905516.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 Texture 纹理<br>
:::

<!-- more -->

## 纹理导入 TextureLoader()

* 纹理一般是指我们常见的在一些第三方程序中创建的图像，如PNG和JPG类型的图。我们把这张图片放在立方体上。（我通常称为`贴图`）。我们需要做的就是创建一个[TextureLoader()](https://threejs.org/docs/?q=TextureLoade#api/zh/loaders/TextureLoader )。调用它的load方法，同时传入图像的URL，并将材质的 map 属性设置为该方法的返回值
* `TextureLoader()` 通常用来加载一张图片可以返回一个纹理对象[Texture](https://threejs.org/docs/?q=TextureLoade#api/zh/textures/Texture) 作为一个表面，或者作为反射/折射贴图
  * 通过材质方法[map](https://threejs.org/docs/?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial.map) 加载纹理贴图

* `TextureLoader()` 也可以制作序列帧动画

### **网格模型使用加载的纹理贴图**

* 配合[基础网格材质MeshBasicMaterial()](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial)的[.map](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial.map) 把加载好纹理变成网格模型的贴图

```js
// 导入纹理图片 作为贴图
import logo from '@/assets/logo.svg'
  // 创建纹理
const texture = new THREE.TextureLoader().load(logo)
   // 创建一个在网格模型中展示的几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1) // 默认就是1,1,1 宽高深度
// 设置该集合体的纹理材质
const cubeMaterial = new THREE.MeshBasicMaterial({ map: texture }) // 通过map使用纹理材质
```

## 纹理的常用操作

### **设置偏移量 X Y**

* 通过[.offset](https://threejs.org/docs/index.html?q=V#api/zh/textures/Texture.offset) 可以改变纹理的偏移量 参数是一个[二维向量（Vector2）](https://threejs.org/docs/index.html?q=V#api/zh/math/Vector2)支持的修改方式: 
  * 直接修改`x`或`y`
  * 通过Vector2的`.set(x,y)` 批量修改
  * 创建一个新的二维向量Vector2 进行修改

```tsx
// 1.直接修改
  texture.offset.x = 0.5
  texture.offset.y = 0.5
// 2.用set(x,y)进行批量修改
  texture.offset.set(0.5, 0.5)
// 3.创建一个新的Vector2 进行修改
   texture.offset = new THREE.Vector2(0.5, 0.5)
```

### **设置旋转弧度**

* [.rotation](https://threejs.org/docs/index.html?q=V#api/zh/textures/Texture.rotation) 可以设置纹理将围绕中心点旋转多少度 单位为弧度（rad）。正值为逆时针方向旋转，默认值为**0**。
  * PI在数学方法中为π，而此时的π在角度里为180°，`Math.PI/180`就为1° 
  * 弧度= 角度 * `Math.PI / 180` 

![image-20220908183133719](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209081831800.png)

```tsx
// 计算出弧度
 const radians = Math.PI/180
// 设置纹理的旋转
  texture.rotation = 45 * radians
```

### **修改旋转中心点**

* [.center](https://threejs.org/docs/index.html?q=V#api/zh/textures/Texture.center) 可以设置旋转中心点 , (0.5, 0.5)对应纹理的正中心。默认值为(0,0)，即左下角。通常配合`.rotation`进行使用 参数是一个[二维向量（Vector2）](https://threejs.org/docs/index.html?q=V#api/zh/math/Vector2)

```tsx
// 1.直接修改
  texture.center.x = 0.5
  texture.center.y = 0.5
// 2.用set(x,y)进行批量修改
  texture.center.set(0.5, 0.5)

// 配合rotation旋转弧度使用
  // 计算出弧度
  const radians = Math.PI / 180
  texture.rotation = 45 * radians
  // 修改旋转中心点
  texture.center.set(0.5, 0.5)
```

### **设置贴图重复**

* [.repeat](https://threejs.org/docs/index.html?q=V#api/zh/textures/Texture.repeat) 设置贴图重复 [二维向量（Vector2）](https://threejs.org/docs/index.html?q=V#api/zh/math/Vector2) 代表x轴y轴 对应的重复次数
  * 默认的贴图包裹是[THREE.ClampToEdgeWrapping](https://threejs.org/docs/index.html?q=V#api/zh/constants/Textures)是将贴图推至到边远 而非重复 所以需要将贴图的水平和垂直设置重复包裹[THREE.RepeatWrapping](https://threejs.org/docs/index.html?q=V#api/zh/constants/Textures)
    * [.wrapS](https://threejs.org/docs/index.html?q=V#api/zh/textures/Texture.wrapS) 定义了纹理贴图在水平方向上将如何包裹
    * [.wrapT](https://threejs.org/docs/index.html?q=V#api/zh/textures/Texture.wrapT) 定义了纹理贴图在垂直方向上将如何包裹

```tsx
  // 设置重复包裹
  // 设置水平方向上
  texture.wrapS = THREE.RepeatWrapping
  // 设置垂直方向
  texture.wrapT = THREE.RepeatWrapping

  // 1.设置重复次数
  texture.repeat.set(3, 2) // 设置 x y轴的重复次数

  // 2.直接设置
  texture.repeat.x = 2
  texture.repeat.y = 3
```

* 设置重复后的纹理常量

  * `THREE.ClampToEdgeWrapping` 将贴图推至边缘 不进行重复操作

  ![image-20220909095110040](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209090951081.png)

  * `THREE.RepeatWrapping` 将贴图按照重复次数 进行重复包裹

  ![image-20220909095248617](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209090952646.png)

  * `THREE.MirroredRepeatWrapping` 将贴图按照重复次数 进行镜像方式的重复包裹

  ![image-20220909100116935](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209091001965.png)

### **设置纹理采样**

* 定义当一个纹理单元 覆盖多个像素点或者不足以覆盖对个像素点的时候 如何设置采样效果
  * [.magFilter ](https://threejs.org/docs/index.html#api/zh/textures/Texture.magFilter)当一个纹素覆盖大于一个像素时，贴图将如何采样。( 放大滤镜 )
    * 默认的纹理采样是 `THREE.LinearFilter` 表示获取4个最近的纹理单元执行双向线性插值计算 `显示效果好`
    * 另外的选项是 `THREE.NearestFilter`, 表示使用最近的texel `性能优`
  * [.minFilter](https://threejs.org/docs/index.html#api/zh/textures/Texture.minFilter) 当一个纹素覆盖小于一个像素时，贴图将如何采样。( 缩小滤镜 )
    * `THREE.NearestFilter`：最近滤镜。在纹理基层上执行最邻近过滤。`性能优`
    * `THREE.NearestMipMapNearestFilter`：选择最临近的mip层，并执行最临近的过滤。
    * `THREE.NearestMipMapLinearFilter`：在mip层之间执行线性插补，并执行最临近的过滤。
    * `THREE.LinearFilter`：在纹理基层上执行线性过滤。 `显示效果好`
    * `THREE.LinearMipMapNearestFilter`：选择最临近的mip层，并执行线性过滤。
    * `THREE.LinearMipMapLinearFilter`：在mip层之间执行线性插补，并执行线性过滤。

> 简单的进行一个预览效果

采用一个 36x36的小图片 看看设置`THREE.NearestFilter` 和 `THREE.LinearFilter`的显示差别

* 使用 `THREE.LinearFilter` 可以看出 小图片被模糊化了  three.js帮你优化了图片的展示效果 这种展示效果有点像一些调低画质的游戏

  * `THREE.LinearFilter` 是默认纹理采样无需设置

  ```tsx
  // 通常不需要手动设置 贴图默认就是这种纹理采样  
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
  ```

![image-20220909134033507](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209091340545.png)

* 使用`THREE.NearestFilter` 可以很明细的看出来马赛克效果( 因为图片本来就很小 ) 不会对贴图进行一些平滑处理 这种展示效果很像我的世界或一些像素游戏

  * `THREE.NearestFilter` 需要你手动设置这种纹理采样

  ```tsx
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
  ```

![image-20220909134420622](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209091344653.png)

### **设置灰度纹理**

* [.alphaMap](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial.alphaMap) 灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）
  * 使用`.alphaMap`灰度纹理的时候 需要把纹理的[.transparent](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/Material.transparent) 设置为`true` 透明

> 灰度纹理的作用

* 灰度纹理是用来实现 纹理局部透明 就跟栅栏一样 空隙的部分希望透明 不被遮挡

 比如说这个门 只想要中间部分 ![image-20220909154249316](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209091542426.png)

 就可能需要 灰度纹理进行处理 ![image-20220909154352262](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209091543291.png)

* 设置灰度纹理前的效果

![image-20220909154812917](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209091548945.png)

* 设置灰度纹理后的效果 很明显看到 **灰度纹理为黑色的地方变成了透明色** 白色为显示的内容

![image-20220909154840606](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209091548631.png)

```tsx
  // 导入纹理
  import logo from '@/assets/door/color.jpg'
  // 导入灰度纹理
  import logoGray from '@/assets/door/alpha.jpg'

  // 创建纹理
  const texture = new THREE.TextureLoader().load(logo)
  // 创建灰度纹理
  const textureGray = new THREE.TextureLoader().load(logoGray)

  // 创建一个在网格模型中展示的几何体
  const cubeGeometry = new THREE.BoxGeometry(3, 3, 3) 
  // 设置该集合体的纹理材质
  const cubeMaterial = new THREE.MeshBasicMaterial({
    // 设置纹理贴图
    map: texture,
    // 设置灰度纹理贴图
    alphaMap: textureGray,
    // 设置透明度 一定要把透明度设置为true
    transparent: true
  }) 
```

### **设置环境遮挡贴图**

* [.aoMap](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial.aoMap) 可以设置环境遮挡贴图 设置后需要第二组UV: `uv2` 坐标属性
  * `uv2`: 就是把第一组`uv`坐标的值赋值给第二组`uv`坐标
* [.aoMapIntensity](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial.aoMapIntensity) 可以设置环境遮挡的强度 默认是1 0是取消环境遮蔽效果
* 网格模型(mesh) 中的`.geometry`属性 实际上就是[BufferGeometry](https://threejs.org/docs/index.html?q=BoxGeometry#api/zh/core/BufferGeometry) 缓冲几何( 是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值 ) 通过其[.setAttribute](https://threejs.org/docs/index.html?q=BoxGeometry#api/zh/core/BufferGeometry.setAttribute)方法 给其设置一个属性 比如: 环境遮挡题图需要的`uv2`坐标属性

> 环境遮挡设置后的效果

* 环境遮挡的贴图

![image-20220913170807440](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209131708478.png)

* 设置环境遮挡后 可以看出 物体有明显的阴影效果 黑色的就是遮挡 白色的就是非遮挡

![image-20220913170523537](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209131705645.png)

* 设置环境遮挡的代码

```js
// 导入纹理
import logo from '@/assets/door/color.jpg'
// 导入环境遮挡贴图
import logoEnv from '@/assets/door/ambientOcclusion.jpg'

// 创建纹理
const texture = new THREE.TextureLoader().load(logo)
// 创建环境遮挡贴图
const textureEnv = new THREE.TextureLoader().load(logoEnv)

// 创建一个在网格模型中展示的几何体
// 参数为长宽高 以及长宽高的分段数 横截面，利于变形使用，段数越多越柔和，则段数越少越生硬。
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3) 

// 设置该集合体的纹理材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    // 设置纹理贴图
    map: texture,
    // 设置环境遮挡贴图
    aoMap: textureEnv,
    // 设置环境遮挡贴图强度
    aoMapIntensity: 1 // 默认为1 最小值为0 最大值为1
})

//  创建一个网格模型 放入创建的几何体和其自身材质
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // Mesh(几何体, 纹理材质)
// 设置环境遮挡贴图第二组uv坐标 (就是把第一组uv坐标的值赋值给第二组uv坐标)
cube.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(cube.geometry.attributes.uv.array, 2))
// 将几何体添加到场景中
scene.add(cube)

```

### **设置位移贴图(凹凸效果)**

* [.displacementScale](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.displacementMap) 设置位移贴图(凹凸纹理) 需要设置网格模型的分段数(默认是1)和[.displacementScale](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.displacementScale) 设置位移贴图影响程度(凹凸的深度 最大1 默认值1)
  * 分段数是横截面，利于变形使用，段数越多越柔和，则段数越少越生硬。

![image-20220914170655329](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209141706366.png)

```tsx
// 导入纹理
import logo from '@/assets/door/color.jpg'
// 导入置换纹理
import displacementMap from '@/assets/door/height.jpg'

// 创建纹理
const texture = new THREE.TextureLoader().load(logo)
// 创建置换纹理
const textureDisplacementMap = new THREE.TextureLoader().load(displacementMap)

// 创建一个在网格模型中展示的几何体
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3, 200, 200, 200) // 参数为长宽高 以及长宽高的分段数 分段数需要单独设置 默认是1

// 设置该集合体的纹理材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    // 设置纹理贴图
    map: texture,
    // 使用置换纹理
    displacementMap: textureDisplacementMap,
    // 设置置换纹理强度
    displacementScale: 0.1 // 默认为1 最小值为0 最大值为1
})

```



