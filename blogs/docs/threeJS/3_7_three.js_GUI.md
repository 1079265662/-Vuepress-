---
title: three.js 之 GUI调试面板
date: 2022-06-27
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-8ovykj.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 GUI调试面板<br>
:::

<!-- more -->

## three.js官方调试面板

* `webgl`调试面板的常用库。

  - [dat.GUI](https://github.com/dataarts/dat.gui)

  - control-panel

  - ControlKit

  - Uil

  - Tweakpane

  - Guify

  - Oui

* [dat.GUI](https://github.com/dataarts/dat.gui) 是three.js官方的调试面板

> 使用GUI

* npm包下载

```bash
npm install --save dat.gui
```

* 在项目中导入 使用`GUI`

```js
// CommonJS:
const dat = require('dat.gui');

// ES6:
import * as dat from 'dat.gui';

// 创建GUI调试面板的实例
const gui = new dat.GUI();
```

* 支持的控件
  - **Range** — 最小最大数值区间控件
  - **Color** — 颜色选择控件
  - **Text** — 文本控件
  - **Checkbox** — 勾选框控件
  - **Select** — 下拉选择控件
  - **Button** — 按钮
  - **Folder** — 抽屉，用于展开或折叠一组控件

## 调试面板控件

* 我们必须要使用`gui.add(...)`方法来向调试UI面板中添加控件。该方法的第1个参数是该控件将要影响的对象，第2个参数则是该控件绑定修改的对象属性。
* `gui`支持链式操作 也可以都使用一个方法 不过命名需要单独进行链式操作`.name()`

![image-20220627201938228](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220627201938228.png)

* 先创建`GUI`调试面板的实例

```js
// 创建GUI调试面板的实例
const gui = new dat.GUI();
```

### **xyz轴调试**

* 现在我们能在调试UI面板中看到一个能调整`y`数值的控件，当我们操作控件修改数值时，我们的立方体也会在`y`轴上移动到对应的数值坐标。

* 我们还可以在添加控件时加入`最小值`，`最大值`，以及`步进值(滑块的速度)`等参数
* 默认情况下，控件的名称是影响的变量名，比如`y`，我们也可以通过`.name()`参数来指定控件的名称，这样会更加容易分辨这个调试面板的控件到底产生什么影响。

```js
gui.add(mesh.position, 'y', -100, 100, 0.01).name('Y轴切换') // 进行传参的方式
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('X轴切换') // 进行链式操作
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('Y轴切换') // 进行链式操作
```

### **模型显示隐藏**

* 添加控件时，`dat.GUI`会自动检测对象变量的类型，比如检测到我们添加的控件将改变的是一个布尔值的话，就自动显示成`checkbox`勾选控件了。

```js
gui.add(mesh, 'visible').name('是否显示模型')
```

### **显示材质线框**

* `wireframe`属性可以设置显示模型的线框

```js
  // 使用网格材质
const skyBoxMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
})  
// 显示线框
gui.add(skyBoxMaterial, 'wireframe').name('显示线框')
```

### **添加按钮控件**

* 在使用`gui.add(...)`添加调试UI控件时，如果第2个参数传递的是一个函数对象，则会自动在调试UI面板中添加一个按钮，并且在按钮点击的时候调用这个函数。
  * 可以通过其他方法进行按钮的设置

```js
  // 设置旋转速度
const speedX = 0.01
  // 设置暂停动画
const end = {
    color: 0xff0000,
    spin: () => {
      // 暂停动画
      speedX = 0
    }
  }
  // 设置暂停动画按钮
gui.add(end, 'spin').name('暂停动画')

  // 开始按钮
const startButton = () => {
  // 开始旋转0.1
   speedX = 0.01
}
  // 设置开始动画
const start = {
    color: 0xff0000,
    spin: () => {
      // 开始动画
      startButton()
    }
  }
gui.add(start, 'spin').name('开始动画')
```

## 调试面板设置

### **默认关闭折叠**

* 在`dat.GUI`初始化时设置`closed`参数为`true`，那么调试UI面板默认将处于关闭折叠的状态。

```js
const gui = new dat.GUI({ closed: true })
```

### **面板宽度**

* 也可以通过设置`width`参数来改变面板的默认宽度：

```js
const gui = new dat.GUI({ width: 400 })
```

## 参考文献

[给你的网页添加实时参数调试面板](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247488905&idx=1&sn=266b08190e0f2f008955b2a77000dc72&chksm=cefc70eaf98bf9fcab5e2421dcce84492b7bb3fae5091d591ec51c942a0846f6fe0ce72b9eba&scene=178&cur_album_id=2405559566127480834#rd)
