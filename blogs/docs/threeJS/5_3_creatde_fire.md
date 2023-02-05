---
title: 创建火焰列帧动画
date: 2022-06-19
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-6ory8l.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
用PlaneGeometry平面创建火焰列帧动画<br>
:::

<!-- more -->



## 创建思路

实现的效果图

![chrome-capture-2022-5-19](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/chrome-capture-2022-5-19.gif)

* 通过序列帧动画 实现一个立体火焰的效果

![火焰.355b66d0](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E7%81%AB%E7%84%B0.355b66d0.png)

> 整体思路

1. 创建平面几何体(长方形) [PlaneGeometry()](https://threejs.org/docs/index.html?q=PlaneGeometry#api/zh/geometries/PlaneGeometry)
2. 通过[TextureLoader()](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/TextureLoader)贴图加载器 导入可以实现序列帧的图片(上图就是) 
3. 通过[TextureLoader()](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/TextureLoader)会生成一个[texture 贴图](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/TextureLoader) 设置贴图的[.repeat(Vector2)](https://threejs.org/docs/index.html?q=Texture#api/zh/textures/Texture.repeat)重复偏移属性(设置15帧)，不断改变贴图对象的方向让贴图产生流动效果 就跟最初动画片实现方式一样
4. 设置[MeshBasicMaterial]((https://threejs.org/docs/index.html?q=MeshBasicMaterial#api/zh/materials/MeshBasicMaterial))基础网格材质 把火焰[texture 贴图](https://threejs.org/docs/index.html?q=Texture#api/zh/loaders/TextureLoader)导入到基础网格材质 
5. 然后再场景`Mesh`中 添加序列帧动画的平面几何体 和 设置火焰贴图的基础网格材质
6. 单一张序列化动画贴图切换视角的时候会过于单一 通过Object3D的克隆方法[.clone()](https://threejs.org/docs/index.html?q=obje#api/zh/core/Object3D.clone) 让其四个角度各执行(插入)克隆的火焰列帧动画 增加立体感
7. 给序列帧动画写一个暂停方法 [cancelAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame) 让其可以停止自身动画效果方便控制
8. 在场景`scene`中添加该火焰列帧动画 

### 实现代码

* 封装一个火焰列帧动画的效果`fire.js`

```js
// 引入Three.js
import * as THREE from 'three'
// 导入火焰贴图
import img from '@/assets/火焰/火焰.png'
// 创建一个火焰动画
const createFlame = () => {
  // 矩形平面网格模型，用来渲染火焰的动画效果
  const w = 25// 火焰宽度  通过参数w可以快速调节火焰大小，以便于适应对应的三维场景
  const h = 1.6 * w// 火焰高度
  const geometry = new THREE.PlaneGeometry(w, h) // 矩形平面
  geometry.translate(0, h / 2, 0)// 火焰底部中点和局部坐标系坐标原点重合
  const textureLoader = new THREE.TextureLoader()// 纹理贴图加载器
  const texture = textureLoader.load(img)// 创建一个纹理对象
  const num = 15 // 火焰多少帧图
  console.log(texture.type)
  // .repeat方法设置uv两个方向纹理重复数量
  texture.repeat.set(1 / num, 0)// 1/num：从图像上截图一帧火焰
  // texture.offset.x = 0 / num;//选择第1帧火焰
  // texture.offset.x = 1 / num;//选择第2帧火焰
  // texture.offset.x = (num-1) / num;//选择第一帧火焰
  const material = new THREE.MeshBasicMaterial({
    map: texture, // 加载纹理
    transparent: true, // 是否透明
    opacity: 0.4, // 整体调节透明度 和三维场景相融合
    side: THREE.DoubleSide, // 双面可见
    depthWrite: false // 是否对深度缓冲区有任何的影响
  })
  const mesh = new THREE.Mesh(geometry, material)// 火焰网格模型
  const flame = new THREE.Group()// 火焰组对象
  // 两个火焰mesh交叉叠加
  // flame.add(mesh, mesh.clone().rotateY(Math.PI / 2))
  // 四个火焰mesh交叉叠加
  flame.add(mesh, mesh.clone().rotateY(Math.PI / 2), mesh.clone().rotateY(Math.PI / 4), mesh.clone().rotateY(Math.PI / 4 * 3))

  let t = 0
  let stopAnimationFrame = null
  // 火焰动画生成
  const UpdateLoop = () => {
    t += 0.1// 调节火焰切换速度
    if (t > num) t = 0
    //  Math.floor(t)取整 保证一帧一帧切换
    texture.offset.x = Math.floor(t) / num// 动态更新纹理偏移 播放关键帧动画 产生火焰然后效果
    stopAnimationFrame = window.requestAnimationFrame(UpdateLoop) // 请求再次执行函数UpdateLoop
  }
  UpdateLoop()

  // 火焰动画停止
  flame.stop = () => {
    window.cancelAnimationFrame(stopAnimationFrame)// 取消动画
  }
  // flame.stop()
  return flame
}
export { createFlame }
```

* 在场景`scene`中添加该火焰列帧动画 

```js
import { createFlame } from './fire'// 火焰序帧动画
/**
 * 创建场景对象Scene
 */
const flame = createFlame()// 创建一个火焰序列帧动画对象
const scene = new THREE.Scene();
scene.add(flame);//火焰网格模型添加到场景中 实现火焰序列帧动画
```

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)

[threejs 贴图动画总结](https://zhuanlan.zhihu.com/p/446541959)
