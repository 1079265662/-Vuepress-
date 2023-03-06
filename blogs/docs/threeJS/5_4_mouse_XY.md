---
title: three.js 屏幕坐标系转换
date: 2022-02-02
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211161553849.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
JS/Css坐标转换three.js需求的设备坐标和实现一些效果<br>
:::

<!-- more -->

## JS/Css中的坐标

通过JS`mousemove`或者其他时间监听获取的`X Y`坐标, 是基于屏幕的坐标系, 数值非常大(依据客户端坐标), 是相对于全屏幕的`X Y`坐标(且没有负数)

在three.js中需要把JS获取到的坐标轴转换为标准设备坐标(webgl坐标), WebGL标准设备坐标坐标范围[-1,1]。

* 下面的图片是这两者的区别 

![image-20230202182142381](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302021821413.png)

![image-20230306105240428](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303061052521.png)

## 进行坐标转换

* 通过 `当前JS/Css坐标 / 屏幕的大小 * 2 - 1 ` 求-1到1坐标
  * `当前JS/Css坐标 / 屏幕的大小 - 0.5`  求-0.5到0.5坐标 (设备坐标的一半)
  * `Y`轴需要反转`-`一下 因为在JS/CSS坐标中`Y`轴是反的
  

### **全屏坐标转换**

如果是全屏, 设备坐标系和屏幕坐标系是重合的状态, 所以直接转换即可

```js
// 创建二维向量 用于记录鼠标的位置
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', ({ clientX, clientY }) => {
  // 鼠标事件, 可以替换click等事件
  // 将鼠标点击位置的屏幕坐标转换成three.js中的标准设备坐标
  mouse.x = (clientX / window.innerWidth) * 2 - 1 // X轴坐标 2个单位 -1到1
  mouse.y = -((clientY / window.innerHeight) * 2 - 1) // Y轴坐标 2个单位 -1到1 这里需要反转一下 因为在JS/CSS坐标中Y轴是反的
})

```

### **若果是非全屏的效果**

如果是非全屏的效果, 那计算标准设备坐标的时候, 就需要减去位于屏幕坐标原点的顶部和侧部(左侧)距离

![image-20230306110649318](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303061106353.png)

```js
window.addEventListener('mousemove', ({ clientX, clientY }) => {  // 鼠标事件, 可以替换click等事件
  // canvas画布非全屏情况：坐标变换参考
  //屏幕坐标转WebGL标准设备坐标
  const width = 800 //three.js canvas画布宽度 以项目具体值为准
  const height = 600 //three.js canvas画布高度 以项目具体值为准

  const lefts = 60 //three.js canvas画布相对画布左上角左侧像素值
  const tops = 100 //three.js canvas画布相对画布左上角顶部像素值

  const x = ((clientX - lefts) / width) * 2 - 1 //WebGL标准设备x坐标
  const y = -((clientY - tops) / height) * 2 + 1 //WebGL标准设备y坐标
})

```

## 实现three.js的视觉相对效果

视觉相对效果就是, 鼠标在屏幕移动时, 屏幕中的物体会往反方的从`x`轴进行偏移, 从而实现一种视觉上的反差感

* 通过坐标转换后, 获取到three.js的设备坐标, 修改`camera`的`position`的`x`轴属性, 再通通过[clock.getDelta](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock), 获得每帧渲染的时间(防止动画卡顿, 逐帧进行修改), 最后在`render`渲染阶段进行`x`轴的属性修改
  * <font color=#ff3040>`.getDelta`需要放在`.getElapsedTime`前面, 因为`getElapsedTime`会重置`oldTime`</font>

![p2eac-wv085](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302021845875.gif)

```js
export class createView {
  // 开始鼠标移动监听
  mouseMoveStart = () => {
    this.element.addEventListener('mousemove', this.mouseMove)
  }

  // 鼠标移动监听效果, 计算three.js的设备坐标
  mouseMove = (item: MouseEvent) => {
    // 获得鼠标的位置 -1 ~ 1
    this.mouse.x = (item.clientX / window.innerWidth) * 2 - 1 // -1 ~ 1
  }

  // 渲染阶段的代码
  render = () => {
    // 获得上次调用的clock时间间隙, 需要放在.getElapsedTime前面
    const clockDelta = this.clock.getDelta()
    // 获得动画执行时间
    const clockTime = this.clock.getElapsedTime()

    // 根据鼠标的位置来改变相机的位置  x轴移动 往反方向移动*3是加大偏移量 *clockDelta是为了让动画更加平滑随着动画帧数的推移
    this.camera.position.x +=
      (this.mouse.x * 0.3 - this.camera.position.x) * clockDelta
  }
}

```

