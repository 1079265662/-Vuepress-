---
title: three.js 之 Scene
date: 2022-06-03
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-28ve6mX.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 之Scene 场景<br>
:::

<!-- more -->

## 场景Scene的作用

* **THREE.Scene** 对象是所有不同对象的容器，也就是说该对象保存所有物体、光源、摄像机以及渲染所需的其他对象。

* **THREE.Scene** 对象又是被称为场景图，它不仅仅是一个对象数组，还包含了整个场景图树形结构中的所有节点：

  - 每个添加到 **Three.js** 场景的对象，甚至包括 **THREE.Scene** 本身都是继承自一个名为 **THREE.Object3D** 的对象。

  - 每个 **THREE.Object3D** 对象也可以有自己的子对象，我们可以使用它的子对象来创建一个 **Three.js** 能解释和渲染的对象树。

## THREE.Scene 常用的方法和属性

| **方法（属性）**                    | **描述**                                                     |
| ----------------------------------- | ------------------------------------------------------------ |
| **add(object)**                     | 用于向场景中添加对象。使用该方法还可以创建对象组。           |
| **children**                        | 用于返回一个场景中所有对象的列表，包括摄像机和光源。         |
| **getObjectByName(name,recursive)** | 在创建对象时可以指定唯一的标识 **name**，使用该方法可以查找特定名字的对象。 当参数 **recursive** 设置为 **false** 时，在调用者子元素上查找当参数 **recursive** 设置为 **true** 时，在调用者的所有后代对象上查找 |
| **remove(object)**                  | **object** 为场景中对象的引用，使用该方法可以将对象从场景中移除。 |
| **traverse(function)**              | 该方法也可以遍历调用者和调用者的所有后代，**function** 参数是一个函数，被调用者和每一个后代对象调用 **function** 方法。 |
| **fog**                             | 使用该属性可以为场景添加雾化效果，可以产生隐藏远处物体的浓雾效果。 |
| **overrideMaterial**                | 使用该属性可以强制场景中的所有物体使用相同的材质。           |

### **给场景添加雾化效果**

使用 **fog** 属性可以为整个场景添加雾化效果，即场景中的物体离得越远就会变得越模糊。具体样式有如下两种：

* 使用 `THREE.Fog`：该方法雾的浓度是线性增长的，它有三个参数：

  - 第 **1** 个参数：雾的颜色 颜色支持十六进制和字符串类型的css风格颜色

  - 第 **2** 个参数：**near**（近处）属性的值，决定雾化开始的地方。

  - 第 **3** 参数：**far**（远处）属性的值，决定雾化结束的地方。

```js
scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
```

* 使用 `THREE.FogExp2`：该方法雾的浓度不再是线性增长的，而是随着距离呈指数增长，它有两个参数：

  - 第 **1** 个参数：雾的颜色 颜色支持十六进制和字符串类型的css风格颜色

  - 第 **2** 个参数：雾的浓度

```js
scene.fog = new THREE.FogExp2( '#ff3040', 0.015 );
```

* 通常雾的效果需要和渲染器的背景颜色`.setClearColor` 设置同样或者相似的颜色 这样效果会更好

```js
// 设置雾化效果，雾的颜色和背景颜色相近，这样远处网格线和背景颜色融为一体
scene.fog = new THREE.Fog(0x005577, -100, 1000);
// 设置渲染器背景颜色 和雾化颜色相配    
renderer.setClearColor('#ff3040', 1); //  (颜色, 透明度)
```

##  参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
