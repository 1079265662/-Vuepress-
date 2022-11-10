---
title: three.js一些相关控件
date: 2022-05-07
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-dpzjzg.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
记录three.js一些相关控件<br>
:::

<!-- more -->



## 需要单独导入的控件

* 有些控件不内置在three.js的核心中 需要单独导入使用

### 轨道控制器 OrbitControls

* 听起来感觉很牛逼的感觉 实际上就是相机围绕目标进行轨道运动的效果 实现来拖拽和放大缩小模型 [官方介绍](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls)
* <font color=#ff3040>注意: 使用轨道控制器之前 需要开启[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)更新动画 否则轨道控制器会失效</font>
* 声明后需要进行执行 否则会报错

```js
  // 7. 创建更新动画的方法
  const render = () => {
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    requestAnimationFrame(render)
  }
  // 执行创建更新动画的方法
  render()
```

> 使用轨道控制器

* 作为控件`OrbitControls`需要单独导入 
* 使用方法: `new OrbitControls(物体的相机设置, 渲染对象.domElement)`
  * [.enableDamping](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.enableDamping) 设置阻尼感如果该值被启用，你将必须在你的动画循环里调用[.update()](https://threejs.org/docs/index.html?q=OrbitControls#examples/zh/controls/OrbitControls.update)。


```js
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 6. 创建创建一个轨道控制器 实现交互渲染
const controls = new OrbitControls(camera, renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
// 设置控制器阻尼 让控制器更真实 设置后需要在动画循环里调用.update()
controls.enableDamping = true
```

## 无需单独导入的控件

* 这些控件属于three.js内置内容 不需要单独导入

### **开启坐标轴辅助器 AxesHelper**

* 开启XYZ轴辅助线可以帮助我们调试物体的位置 [官方介绍](https://threejs.org/docs/index.html?q=AxesHelper#api/zh/helpers/AxesHelper)
* `THREE.AxesHelper(轴线长度 默认是1)`
* 不需要单独导入内置插件 需要通过`.add()`添加到`Scene`场景中使用

![image-20220424174721556](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220424174721556.png)

```js
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5)
  // 添加到场景中去
  scene.add(axesHelper)
```

### **时钟/闹钟Clock**

* [Clock](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock) 可以用于跟踪对象 记录对象时间

  * [.getElapsedTime](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock.getElapsedTime) 可以用来获取动画执行的时间 可以用它进行一些数学运算处理

  ```js
      // 设置闹钟
      const clock = new THREE.Clock()
      
      // 在动画执行时调用
      // 创建更新动画的方法
      const render = () => {
        const time = clock.getElapsedTime()
        // 通过时钟设置物体的x轴运动
        // // 通过sin()函数设置物体的x轴运动 通过time设置物体的运动速度 通过3设置物体的运动范围
        lightBall.position.x = Math.sin(time) * 3 
        // 通过时钟设置物体的y轴运动
        // // 通过cos()函数设置物体的y轴运动 通过time设置物体的运动速度 通过3设置物体的运动范围
        lightBall.position.z = Math.cos(time) * 3 
        // 上下运动y轴
        // // abs()取绝对值 使得y轴的值永远为正数 从而实现上下运动
        lightBall.position.y = Math.abs(Math.sin(time * 3)) * 2 
  
        // 设置阻尼感必须在动画中调用.update()
        this.controls.update()
        // 使用渲染器,通过相机将场景渲染出来
        this.renderer.render(this.scene, this.camera) // render(场景, 相机)
        // 使用动画更新的回调API实现持续更新动画的效果
        this.animationId = requestAnimationFrame(render)
      }
  
      // 执行创建更新动画的方法
      render()
      
  ```

  