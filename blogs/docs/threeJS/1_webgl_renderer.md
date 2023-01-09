---
title: webgl相关内容记录
date: 2023-01-09
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091145272.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
webgl相关信息记录<br>
:::

<!-- more -->

## WebGL 是什么

WebGL（Web图形库）是一个JavaScript API，可在任何兼容的Web浏览器中渲染高性能的交互式3D和2D图形，而无需使用插件。WebGL通过引入一个与OpenGL ES 2.0非常一致的API来做到这一点，该API可以在HTML5 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)元素中使用。 这种一致性使API可以利用用户设备提供的硬件图形加速。

## WebGL 发展史

WebGL 的发展最早要追溯到 2006 年，WebGL 起源于 Mozilla 员工弗拉基米尔·弗基西维奇的一项 Canvas 3D 实验项目，并于 2006 年首次展示了 Canvas 3D 的原型。这一技术在 2007 年底在 FireFox 和 Opera 浏览器中实现。2009 年初 Khronos Group 联盟创建了 WebGL 的工作组最初的工作成员包括 Apple、Google、Mozilla、Opera 等。 2011 年 3 月 WebGL 1.0 规范发布，WebGL 2 规范的发展始于 2013 年，并于 2017 年 1 月最终完成，WebGL 2 的规范，首度在 Firefox 51、Chrome 56 和 Opera 43 中被支持。

## 渲染管线

**Webgl**的渲染依赖底层**GPU**的渲染能力。所以**WEBGL** 渲染流程和 **GPU** 内部的渲染管线是相符的。

**渲染管线的作用是将3D模型转换为2维图像。**

在早期，渲染管线是不可编程的，叫做**固定渲染管线**，工作的细节流程已经固定，修改的话需要调整一些参数。

现代的 **GPU** 所包含的渲染管线为**可编程渲染管线**，可以通过编程 **GLSL 着色器语言** 来控制一些渲染阶段的细节。

简单来说： 就是使用**shader**(又称[GLSL](https://developer.mozilla.org/zh-CN/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)，我们可以对画布中**每个像素点做处理**，然后就可以生成各种酷炫的效果了。

> 渲染流程

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301090959340.png)

> 渲染流程图

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091004926.png)

## webgl渲染过程

渲染过程大概经历了下面这么多过程， 因为本篇文章的重点其实是在着色器，所以我重点分析从**顶点着色器**—— **片元着色器**的一个过程

- **顶点着色器**
- **图片装配**
- **光栅化**
- **片元着色器**
- **裁剪测试**
- **多重采样操作**
- **背面剔除**
- **模板测试**
- **深度测试**
- **融合**
- **缓存**

### **顶点着色器**

WebGL就是和GPU打交道，在GPU上运行的代码是一对着色器，一个是顶点着色器，另一个是片元着色器。每次调用着色程序都会先执行顶点着色器，再执行片元着色器。着色器(shader)是一门单独的语言[GLSL](https://developer.mozilla.org/zh-CN/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)

> 顶点着色器流程图

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091008693.png)

一个顶点着色器的工作是生成裁剪空间坐标值，通常是以下的形式, 需要在模板字符串中去写`glsl`语言：

```js
const vertexShaderSource = `
    attribute vec3 position; 
    void main() {
        gl_Position = vec4(position,1); 
    }
`

```

每个顶点调用一次（顶点）着色器，每次调用都需要设置一个特殊的全局变量 **gl_Position**。 该变量的值就是裁减空间坐标值。空间坐标值就是无论你的画布有多大，裁剪坐标的坐标范围永远是 -1 到 1 。

> 空间坐标图

![img](https://cdn.nlark.com/yuque/0/2022/webp/22620727/1651318484959-e2511004-cdd3-4a83-97a2-0693402024f2.webp?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_37%2Ctext_6ICB6ZmI5omT56CB%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

如果运行一次顶点着色器， 那么gl_Position 就是 **（-0.5，-0.5，0，1）** 记住他永远是个 **Vec4**, 简单理解就是对应**x、y、z、w**。即使你没用其他的，也要设置默认值， 这就是所谓的 3维模型转换到我们屏幕中。

顶点着色器需要的数据，可以通过以下四种方式获得。

1. attributes 属性（从缓冲读取数据）
2. uniforms 全局变量 （一般用来对物体做整体变化、 旋转、缩放）
3. textures 纹理（从像素或者纹理获得数据）
4. varyings 变量 （将顶点着色器的变量 传给 片元着色器）

### **图元装配**

**什么是图元？**

* **描述各种图形元素的函数叫做图元，描述几何元素的称为几何图元（点，线段或多边形）。点和线是最简单的几何图元** 经过顶点着色器计算之后的坐标会被组装成**组合图元**。

* **通俗解释**：**图元就是一个点、一条线段、或者是一个多边形。**

**什么是图元装配呢？**

* **简单理解就是说将我们设置的顶点、颜色、纹理等内容组装称为一个可渲染的多边形的过程。**

* 组装的类型取决于： 你最后绘制选择的图形类型

### **光栅化**

**什么是光栅化：**

* 通过图元装配生成的多边形，计算像素并填充，**剔除**不可见的部分，**剪裁**掉不在可视范围内的部分。最终生成可见的带有颜色数据的图形并绘制。

> 光栅化流程图

![b59fdd9a56d74142a32b80b0c2829fdc_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091014300.webp)

### **剔除和剪裁**

**剔除**：当我们能看到这两个物体(在可视范围内), 重叠的部分会进行剔除，不参与绘制。节省渲染开销。

> 剔除效果图

![image-20230109102302290](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091023332.png)

> 📷剔除角度

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091023285.png)

**剪裁**: 当我们不能看到一些物体的时候(超出可视范围), 这一部分会被剪裁掉，不参与绘制。以此来提高性能

> 📷剪切效果

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091026110.png)

### **片元着色器**

**光珊化后，每一个像素点都包含了 颜色 、深度 、纹理数据， 这个我们叫做片元**(上色)

* 小tips ： 每个像素的颜色由片元着色器的**gl_FragColor**提供

* 接收光栅化阶段生成的片元，在光栅化阶段中，已经计算出每个片元的颜色信息，这一阶段会将片元做逐片元挑选的操作，处理过的片元会继续向后面的阶段传递。 **片元着色器运行的次数由图形有多少个片元决定的**。

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091053543.png)

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091054989.png)

### **逐片元挑选**

通过模板测试和深度测试来确定片元是否要显示，测试过程中会丢弃掉部分无用的片元内容，然后生成可绘制的二维图像绘制并显示。

- **深度测试：** 就是对 **z** 轴的值做测试，值比较小的片元内容会覆盖值比较大的。（类似于近处的物体会遮挡远处物体）。对物体重叠之后进行深度检测, 设置其行为和效果
- **模板测试：** 模拟观察者的观察行为，可以接为镜像观察。标记所有镜像中出现的片元，最后只绘制有标记的内容。配合剔除和剪切, 进行显示和不显示的标记

## 参考文献

[WEBGL入门 密码:lzzk](https://www.yuque.com/yun41s/bbsl9p/kgir0b?)