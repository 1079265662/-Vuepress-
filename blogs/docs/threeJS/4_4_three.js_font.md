---
title: three.js 之 font 字体
date: 2022-02-26
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202302261856034.png
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 font 字体的记录<br>
:::

<!-- more -->

## three.js中的字体

three.js可以通过附加组件[FontLoader](https://threejs.org/docs/index.html?q=FontLoader#examples/zh/loaders/FontLoader)字体加载器进行字体的导入, 并且自带一些基于英文的json格式的字体

* [FontLoader](https://threejs.org/docs/index.html?q=FontLoader#examples/zh/loaders/FontLoader)字体加载器, 是附加组件需要单独引入, `FontLoader`**只支持json格式的字体**

```js
// 导入json字体加载器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

```

* three.js中自带一些简单的json字体库, 可以直接进行引入使用, <font color =#ff3040>注意: 在Vite环境中, 需要对[显式 URL 引入](https://cn.vitejs.dev/guide/assets.html#explicit-url-imports) 的资源添加`?url`后缀, 取消编译时的操作</font>

```js
// 导入three.js的json字体, url资源需要在后缀加上?url 其他的按路径导入即可, bold是加粗字体, regular是正常字体
// 导入three.js自带的json字体库
import helvetiker from 'three/examples/fonts/optimer_bold.typeface.json?url'
// 本地assets资源的引用
import helvetikerAssets from '@/assets/iphone/font/text.json?url'

// 如果再出现路径中含有/@fr/, 建议重启项目
```

* 字体的材质可以设置[MeshLambertMaterial](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshLambertMaterial) 朗博材质(轻微的反光处理) 或 [MeshBasicMaterial](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/MeshBasicMaterial)基础材质(性能最好)

::: details 查看three.js自带json格式字体

![image-20230226180527187](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202302261806892.png)

:::

字体效果有两种: 

* 2D字体, 通过[ShapeGeometry](https://threejs.org/docs/index.html#api/zh/geometries/ShapeGeometry) 形状缓冲几何体, 原理是通过各种顶点绘制成一个个三角形, 最后形成一个字体的效果, 字体只是这个几何体的实现能力的一种
* 3D立体文字(几何字体), 通过[TextGeometry](https://threejs.org/docs/index.html?q=TextGeometry#examples/zh/geometries/TextGeometry) 文本缓冲几何体生成, 这是一个附加组件, 需要单独引入使用

```js
// 导入字体几何体
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

```

## 2D字体的应用

2D字体实现的步骤: 

1. 通过`FontLoader` 字体加载器加载json字体库, 加载完毕后是three.js中的`Font`类型
2. 通过`Font`类型中的`.generateShapes(文字, 大小)`文字提取方法, 提取出需的文字[Shape](https://threejs.org/docs/index.html?q=Shape#api/zh/extras/core/Shape) 参数
3. 通过`ShapeGeometry` 形状缓冲几何体生成文字几何体
4. 设置字体的材质可以设置[MeshLambertMaterial](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshLambertMaterial) 朗博材质(轻微的反光处理) 或 [MeshBasicMaterial](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/MeshBasicMaterial)基础材质(性能最好)
5. 把文字几何体效果和材质添加到[Mesh](https://threejs.org/docs/index.html?q=mesh#api/zh/objects/Mesh)物体中, 就实现了一个字体效果

```js
// 导入three.js
import * as THREE from 'three'
// 导入json字体加载器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// 导入three.js的json字体库, url资源需要在后缀加上?url
import helvetiker from 'three/examples/fonts/optimer_bold.typeface.json?url'

// 声明字体加载器
const fontLoader = new FontLoader()

// 加载字体库
const font = await fontLoader.loadAsync(helvetiker)
// 设置文字几何体
const fontView = font.generateShapes('720°', 10) // generateShapes(文字: string, 大小: number)

// 生成文字几何体
const textGeometry = new THREE.ShapeGeometry(fontView)

// 设置字体的材质朗伯材质
const material = new THREE.MeshLambertMaterial({
  color: '#ffffff',
  // 双面显示
  side: THREE.DoubleSide,
})

// 设置文字模型
const text = new THREE.Mesh(textGeometry, material)

```

生成了一个2D效果的文字

![image-20230226184145447](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202302261841467.png)

## 3D字体的应用

3D字体实现的步骤: 

1. 通过`FontLoader` 字体加载器加载json字体库, 加载完毕后是three.js中的`Font`类型
2. 引入[TextGeometry](https://threejs.org/docs/index.html?q=TextGeometry#examples/zh/geometries/TextGeometry) 文本缓冲几何体, 设置参数, 这里不需要通过2D字体的`.generateShapes`文字提取方法, 直接通过`TextGeometry`参数设置即可 , `TextGeometry`还支持设置斜角的字体效果
3. 设置字体的材质可以设置[MeshLambertMaterial](https://threejs.org/docs/index.html?q=MeshLambertMaterial#api/zh/materials/MeshLambertMaterial) 朗博材质(轻微的反光处理) 或 [MeshBasicMaterial](https://threejs.org/docs/index.html?q=mesh#api/zh/materials/MeshBasicMaterial)基础材质(性能最好)
4. 把文字几何体效果和材质添加到[Mesh](https://threejs.org/docs/index.html?q=mesh#api/zh/objects/Mesh)物体中, 就实现了一个字体效果

```js
// 导入three.js
import * as THREE from 'three'
// 导入json字体加载器
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// 导入three.js的json字体, url资源需要在后缀加上?url
import helvetiker from 'three/examples/fonts/optimer_bold.typeface.json?url'

// 导入字体几何体
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// 声明字体加载器
const fontLoader = new FontLoader()

// 加载常规字体
const font = await fontLoader.loadAsync(helvetiker)
// 设置文字几何体
// const fontView = font.generateShapes('720°', 10) // generateShapes(文字: string, 大小: number)

// TextGeometry(文字: string, 参数: object)
const geometry = new TextGeometry('720°', {
  font, //THREE.Font的实例。
  size: 10, // 字体大小，默认值为100。
  height: 2, // 挤出文本的厚度。默认值为50
  curveSegments: 20, // Integer。（表示文本的）曲线上点的数量。默认值为12, 3D文字的曲线分 段数越大，圆弧越平滑(大字需要)。

  // 斜角参数, 不开启斜角的话, 下面的参数都不起作用
  bevelEnabled: false, // 是否开启斜角，默认为false, 设置为true时，下面的参数才有效
  bevelThickness: 0, // 文本上斜角的深度，默认值为20
  bevelSize: 0, // 斜角与原始文本轮廓之间的延伸距离。默认值为8。
  bevelSegments: 3, // 斜角的分段数。默认值为3
})

// 设置字体的材质朗伯材质
const material = new THREE.MeshLambertMaterial({
  color: '#ffffff',
  side: THREE.DoubleSide,
})

// 设置文字模型
const text = new THREE.Mesh(geometry, material)

```

生成了一个3D效果(几何字体)的文字(未开启斜角) ,一般大号的字体才需要斜角的展示效果

![image-20230226184841685](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202302261848706.png)

## 加载中文字体

可以通过[fontmin](http://ecomfe.github.io/fontmin/#app) 提取出我们需要的中文(不提取也可以, 就是json文件会很大), 然后通过[Facetype.js](http://gero3.github.io/facetype.js/) 把ttf文件转化成`json`格式, `json`格式中就包含中文字体的顶点坐标

* `Vite`环境中引入url资源需要添加`?url`后缀

```js
// 导入three.js的json字体, url资源需要在后缀加上?url
import helvetiker from '@/assets/iphone/font/text.json?url'
// 声明字体加载器
const fontLoader = new FontLoader()
// 加载常规字体
const font = await fontLoader.loadAsync(helvetiker)

// 声明文字几何体
const geometry = new TextGeometry('你好', {
  font, //THREE.Font的实例。
  size: 8, // 字体大小，默认值为100。
  height: 1, // 挤出文本的厚度。默认值为50
  curveSegments: 20, 
})

// 设置字体的材质朗伯材质
const material = new THREE.MeshLambertMaterial({
  color: '#ffffff',
  side: THREE.DoubleSide,
})

// 设置文字模型
const text = new THREE.Mesh(geometry, material)


```

生成了一个中文的3D字体效果

![image-20230228180437326](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302281804355.png)
