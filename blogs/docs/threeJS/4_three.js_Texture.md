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

