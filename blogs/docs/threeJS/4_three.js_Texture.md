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

* <font color=#ff3040>注意: three.js r84遗弃了TextureLoader进度事件。对于支持进度事件的TextureLoader </font>

![image-20220920100808348](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209201008434.png)

### **网格模型使用加载的纹理贴图**

* 配合[基础网格材质MeshBasicMaterial()](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial)的[.map](https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial.map) 把加载好纹理变成网格模型的贴图

```js
// 导入纹理图片 作为贴图
import logo from '@/assets/logo.svg'

// 设置一个统一的纹理加载器
const textureLoader = new THREE.TextureLoader()
// 创建纹理
const texture = textureLoader.load(logo)
// 创建一个在网格模型中展示的几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1) // 默认就是1,1,1 宽高深度
// 设置该集合体的纹理材质
const cubeMaterial = new THREE.MeshBasicMaterial({ map: texture }) // 通过map使用纹理材质
```

## 纹理贴图的常用操作

* 以下纹理的属性 基于[PBR标准网格材质(MeshStandardMaterial)](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.roughnessMap)进行设置 其他材质需要看文档 是否支持

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

  // 设置一个统一的纹理加载器
  const textureLoader = new THREE.TextureLoader()
  // 创建纹理
  const texture = textureLoader.load(logo)
  // 创建灰度纹理
  const textureGray = textureLoader.load(logoGray)
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

// 设置一个统一的纹理加载器
const textureLoader = new THREE.TextureLoader()
// 创建纹理
const texture = textureLoader.load(logo)
// 创建环境遮挡贴图
const textureEnv = textureLoader.load(logoEnv)
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

// 设置一个统一的纹理加载器
const textureLoader = new THREE.TextureLoader()
// 创建纹理
const texture = textureLoader.load(logo)
// 创建置换纹理
const textureDisplacementMap = textureLoader.load(displacementMap)
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

### **设置粗糙度**

* [.roughness](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.roughness) 设置纹理贴图的整体粗糙度 **默认为1 最小值为0 最大值为1 例如: 镜子的粗糙度就是0.1**
  * 粗糙度是物体表面反光的一种表现 越光滑的物体 反光越明显 相反越粗糙的物体反光就比较受限

![image-20220923142137149](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231421307.png)

* [.roughnessMap](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.roughness) 可以设置粗糙度贴图 也就是局部粗糙度 

![image-20220923143956572](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231439650.png)

![image-20220923144146173](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231441262.png)

* 如果同时设置`.roughness` 和 `.roughnessMap` 那么两个值将会相乘 效果更明显

```tsx
// 导入纹理
import logo from '@/assets/door/color.jpg'
// 导入粗糙度贴图
import roughness from '@/assets/door/roughness.jpg'

// 设置一个统一的纹理加载器
const textureLoader = new THREE.TextureLoader()
// 创建纹理
const texture = textureLoader.load(logo)
// 创建粗糙度贴图
const textureRoughness = textureLoader.load(roughness)
// 创建一个在网格模型中展示的几何体
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3) 

// 设置该集合体的纹理材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    // 设置纹理贴图
    map: texture,
   // 设置粗糙度贴图
   roughnessMap: textureRoughness
   // 设置粗糙度
   roughness: 0.5 // 默认为0.5 最小值为0 最大值为1
}) 
```

### **设置金属度**

* [.metalness](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.metalness) 设置纹理贴图的整体金属度 **默认为0 最小值为0 最大值为1 越大金属度越明显会很黑**

  * 金属度代表了有多少光子是直接被反射出去, 有多少光子在进入体内,后成了漫反射 
  * 金属度等于0, 或者很低的情况下, **直接反射会变得非常弱, 只有漫反射**

  ![image-20220923151659503](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231516595.png)

  * 金属度如果等于1的情况下, **所有的光子都会被反射出去, 会完全没有漫反射**

  ![image-20220923151739046](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231517114.png)

* [.metalnessMap](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.metalnessMap) 可以设置金属度贴图 也就是局部金属度

![image-20220923153256639](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231532677.png)

![image-20220923153512473](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231535524.png)

* 如果同时设置`.metalness` 和 `.metalnessMap` 那么两个值将会相乘 效果更明显

```tsx
// 导入纹理
import logo from '@/assets/door/color.jpg'
// 导入金属贴图
import metalness from '@/assets/door/metalness.jpg'

// 设置一个统一的纹理加载器
const textureLoader = new THREE.TextureLoader()
// 创建纹理
const texture = textureLoader.load(logo)
// 创建金属贴图
const textureMetalness = textureLoader.load(metalness)
// 创建一个在网格模型中展示的几何体
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3) 

// 设置该集合体的纹理材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    // 设置纹理贴图
    map: texture,
    // 设置金属贴图
    metalnessMap: textureMetalness,
    // 设置金属度
    metalness: 0.5 // 默认为0.5 最小值为0 最大值为1
}) 
```

### **设置法线贴图**

* [.normalMap](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.normalMap) 设置法线贴图

![image-20220923161909543](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231619586.png)

* 法线贴图的颜色代表着反射(方向)的向量 从而规定光源的反射效果 实现光照物体的层次感

![image-20220923161820345](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209231618455.png)

* 记得设置灯光

```tsx
import logo from '@/assets/door/color.jpg'
// 导入法线贴图
import normal from '@/assets/door/normal.jpg'

// 设置一个统一的纹理加载器
const textureLoader = new THREE.TextureLoader()
// 创建纹理
const texture = textureLoader.load(logo)
// 创建法线贴图
const textureNormal = textureLoader.load(normal)
// 创建一个在网格模型中展示的几何体
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3) 

// 设置该集合体的纹理材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    // 设置纹理贴图
    map: texture,
    // 导入法线贴图
    normalMap: textureNormal
}) 

```

## 环境贴图 (cube几何贴图加载器)

* [CubeTextureLoader](https://threejs.org/docs/index.html?q=cube#api/zh/loaders/CubeTextureLoader) cube几何贴图加载器 类似于几何体的加载 对应的是几个体的每个面
  * 通过几何贴图加载器 加载环境贴图 贴在指定的几何体面上 再设置物体的粗糙度和金属度(让其反光有镜面的效果) 就可以实现环境贴图的效果

### **环境贴图的示例**

* 比如说[BoxGeometry](https://threejs.org/docs/index.html?q=BOX#api/zh/geometries/BoxGeometry)或者[SphereGeometry](https://threejs.org/docs/index.html?q=sph#api/zh/geometries/SphereGeometry) 立方体有六个面 或者 球体(也是六面个和立方体一样) 使用几何贴图加载器分别对应其每个面的贴图
  * 物体的[.roughness](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.roughness) 粗糙度设置低一些(**0.1左右**)光滑一些 默认粗糙度(默认为1) 是没有反光效果的
  * 物体的[.metalness](https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial.metalness) 金属度要搞一些(**0.7左右**)镜面效果强一些 默认金属度(默认为0)是没有镜面效果的
  * <font color =#ff3040>注意: 一定要加上灯光 推荐[DirectionalLight 平行光](https://threejs.org/docs/index.html?q=DirectionalLight#api/zh/lights/DirectionalLight) 和 [AmbientLight 环境光](https://threejs.org/docs/index.html?q=AmbientLight#api/zh/lights/AmbientLight) 一起用</font>

![image-20221015163226829](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210151632885.png)

* 代码展示案例

```tsx
// 创建场景
const scene = new THREE.Scene()

// 设置一个cube加载器
const envMapLoader = new THREE.CubeTextureLoader()
// 加载环境贴图
const envMapT = envMapLoader.load([
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	])

// 声明一个球体
const sphere = new THREE.SphereGeometry(1, 20, 20)
// 声明一个标准材质
const mmaterial = new THREE.MeshStandardMaterial({
    // 设置金属度
    metalness: 0.7,
    // 设置光滑度
    roughness: 0.1,
    // 设置环境贴图
    envMap: envMapT
  })

// 创建网格模型
const mesh = new THREE.Mesh(sphere, mmaterial)
// 添加到场景
scene.add(mesh)

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
scene.add(light)

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(0, 0, 10)
scene.add(directionalLight)
```

* 环境贴图的展示效果

![image-20221015201426618](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210152014663.png)

## HDR贴图的应用

* 得益于[HDR](./7_HDR.md)出色的色彩效果 虽HDR的资源消耗巨大 (vscode安装HDR插件后 预览一次就会崩溃) 但是也可以在webgl中使用
  * `HDR`可以作为`Sence`背景 也可以作为物体的环境贴图
  * `HDR`加载需要使用three.js的[RGBELoader](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/RGBELoader.js)`HDR`文件加载器控件 (控件需要单独导入)
  * `HDR`加载建议使用[.loadAsync](https://threejs.org/docs/index.html?q=load#api/zh/loaders/Loader.loadAsync) 异步加载 `HDR`一张图往往10m以上 适合异步加载
  * 通过`RGBELoader`加载的 `HDR`需要设置 [.mapping](https://threejs.org/docs/index.html?q=text#api/zh/textures/Texture.mapping)贴图的环绕方式 设置为[EquirectangularReflectionMapping](https://threejs.org/docs/index.html?q=text#api/zh/constants/Textures)等距圆柱投影的环境贴图也被叫做经纬线映射贴图 包裹在一起形成`Scene`的背景效果

```tsx
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

