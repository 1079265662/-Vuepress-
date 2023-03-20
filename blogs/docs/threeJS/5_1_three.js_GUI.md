---
title: three.js 之 GUI调试面板
date: 2022-06-27
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-8ovykj.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之 lil-gui调试面板<br>
:::

<!-- more -->

## three.js官方调试面板

* `webgl`调试面板的常用库。
  - [dat.GUI](https://github.com/dataarts/dat.gui), 现在推荐用升级版 [lil-gui](https://lil-gui.georgealways.com/)
  
  - control-panel
  
  - ControlKit
  
  - Uil
  
  - Tweakpane
  
  - Guify
  
  - Oui
  
* [lil-gui](https://link.juejin.cn/?target=https%3A%2F%2Flil-gui.georgealways.com%2F) 是three.js官方的调试面板

> 使用lil-gui

* npm包下载

```bash
npm install lil-gui --save-dev
```

* 在项目中导入 使用`GUI`

```js
import GUI from 'lil-gui'

const gui = new GUI()

```

* 支持的控件
  - **Range** — 最小最大数值区间控件
  - **Color** — 颜色选择控件
  - **Text** — 文本控件
  - **Checkbox** — 勾选框控件
  - **Select** — 下拉选择控件
  - **Button** — 按钮
  - **Folder** — 抽屉，用于展开或折叠一组控件

## 调试基础面板控件

* 我们必须要使用[.add() ](https://lil-gui.georgealways.com/#GUI#add)方法来向调试UI面板中添加控件。该方法的第1个参数是该控件将要影响的对象，第2个参数则是该控件绑定修改的对象属性。
* `gui`支持链式操作 也可以都使用一个方法 不过命名需要单独进行链式操作`.name()`

![image-20220627201938228](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220627201938228.png)

* 先创建`GUI`调试面板的实例

```js
import GUI from 'lil-gui'

// 创建GUI调试面板的实例
const gui = new GUI()

```

### **xyz轴调试**

* 现在我们能在调试UI面板中看到一个能调整`y`数值的控件，当我们操作控件修改数值时，我们的立方体也会在`y`轴上移动到对应的数值坐标。

* 我们还可以在添加控件时加入`最小值`，`最大值`，以及`步进值(滑块的速度)`等参数
  * `min` 设置最小值
  * `max` 设置最大值
  * `step` 设置进步值(滑块速度)
  * `name` 设置控件名称
  * `onChange()` 修改时触发的方法 返回值是当前修改的值
  * `onFinishChange()` 修改完成时触发的方法 返回值是当前修改后的值

* 默认情况下，控件的名称是影响的变量名，比如`y`，我们也可以通过`.name()`参数来指定控件的名称，这样会更加容易分辨这个调试面板的控件到底产生什么影响。

```js
// 设置gui面板
const gui = new GUI()
gui
  .add(cube.position, 'x')
  .min(0)
  .max(5)
  .step(0.01)
  .name('修改X轴')
  // 修改值的方法
  .onChange((value) => {
    console.log('值被修改了', value)
  })
  // 修改完毕的方法
  .onFinishChange((value) => {
    console.log('修改完毕', value)
  })

```

### **模型显示隐藏**

* 添加控件时，`lil-gui`会自动检测对象变量的类型，比如检测到我们添加的控件将改变的是一个布尔值的话，就自动显示成`checkbox`勾选控件了。

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

### **添加方法按钮控件**

* 在使用`.add(...)`添加调试UI控件时，如果第2个参数传递的是一个函数对象，则会自动在调试UI面板中添加一个按钮，并且在按钮点击的时候调用这个函数。
  * 可以通过其他方法进行按钮的设置

```js
  // 设置旋转速度
const speedX = 0.01
  // 设置暂停动画
const end = {
    color: 0xff0000,
    // 方法名需要和gui设置的一致
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

### **通过对象创建gui的内容**

通过一个对象(js中对象key支持中文), 对象的key作为`gui`的名称, **参数1设置对象, 参数2按需设置对象的key**, 实现创建

```js
// 导入gui
import GUI from 'lil-gui'

export class GuiCreated {
  // 创建GUI调试面板的实例
  gui = new GUI()

  // 创建GUI调试面板
  createGui = () => {
    // 调试面板
    const guiControls = {
      // 金属边条
      金属度: 1.0, //金属度
      粗糙度: 0.2, //粗糙度
      环境影响: 1.0
    }

    // 创建一个文件夹
    const folder = this.gui.addFolder('汽车配件')
    // 打开文件夹
    folder.open()
      
    // 材质金属度.metalness属性值变化范围0.0~1.0
    folder.add(guiControls, '金属度', 0.0, 1.0).onChange((value) => {
      // 修改时候的回调函数
      console.log(value)
    })
  }
}

```

### 修改gui菜单标题

默认gui的标题是英文的controls(属性), 可以通过 [.title](https://lil-gui.georgealways.com/#GUI#title)进行修改

![image-20230320105108952](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303201051029.png)

```js
gui.title('汽车调试面板')

```

## 添加调色板

* [.addColor()](https://lil-gui.georgealways.com/#GUI#addColor) 设置调色板内容 需要设置一个默认的颜色对象
  * 通过设置`onChange()` 修改时触发颜色变量 再修改物体的材质`material.color` 颜色属性 实现调色功能

```js
// 默认物体的颜色
const params = {
  color: '#b1e1e5',
}
// 修改物体颜色
gui.addColor(params, 'color').onChange((value) => {
  // 获取修改的颜色变量
  // 更新物体的材质颜色 实现变色
  cube.material.color.set(value)
})

```

## 设置调试分组

* [.addFolder()](https://lil-gui.georgealways.com/#GUI#addFolder) 可以设置调试分组 可以更好的归纳一些内容

```js
// 设置gui的展开缩放
const select = gui.addFolder('拓展属性')
// 设置线框调试
select.add(cube.material, 'wireframe').name('显示线框')

```

* 实现效果

![image-20220828183245084](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208281832141.png)

### 打开分组

[.open](https://lil-gui.georgealways.com/#GUI#open) 打开分组

```js
select.open()

```

### 关闭分组

[.close()](https://lil-gui.georgealways.com/#GUI#close) 关闭分组

```js
select.close()

```

## 面板构造参数

[lil-gui ](https://lil-gui.georgealways.com/#GUI)提供了一些默认构造参数, 用来规定gui部分默认行为

### **默认关闭折叠**

在`lil-gui`初始化时设置`closeFolders`参数为`true`，那么调试UI面板默认将处于关闭折叠的状态。

* 如果不设置参数, 默认为`false`展架所有折叠

```js
const gui = new GUI({ closeFolders: true })

```

### **修改面板宽度**

在声明gui的时候可以设置`width`面板宽度

* 如果不设置参数, 默认为245

```js
const gui = new GUI( { width: 400 } )

```

## 隐藏面板和销毁面板

[.hide()](https://lil-gui.georgealways.com/#GUI#hide) 可以对面板进行隐藏, 隐藏不是销毁, 二次创建还会出现一个新的gui面板

```JS
gui.hide()

```

[.destroy()](https://lil-gui.georgealways.com/#GUI#destroy) 销毁gui, 销毁与此gui关联的所有 DOM 元素和事件侦听器

```js
gui.destroy()

```

## 参考文献

[给你的网页添加实时参数调试面板](https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247488905&idx=1&sn=266b08190e0f2f008955b2a77000dc72&chksm=cefc70eaf98bf9fcab5e2421dcce84492b7bb3fae5091d591ec51c942a0846f6fe0ce72b9eba&scene=178&cur_album_id=2405559566127480834#rd)

[lil-gui](https://lil-gui.georgealways.com/#)
