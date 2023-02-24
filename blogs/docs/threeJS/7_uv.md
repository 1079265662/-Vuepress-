---
title: UV坐标轴
date: 2023-02-08
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202302082238182.png
tags:
 - three.js
categories: three.js
---

::: tip 介绍
记录UV坐标轴的内容<br>
:::

<!-- more -->

## **关于UV坐标的概念**

UV就是一张二维图像，UV映射就是将二维图像投影到三维模型的表面以进行纹理映射的3D建模过程。

U代表水平方向，V代表垂直方向，所以U和V就代表了2D纹理的轴，而 X,Y,Z 则用于表示三维模型空间中3D对象的轴。

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301301034989.jpeg)

UV贴图代表的是所有应用程序都在使用的纹理创建的基本原理.UV贴图是在多边形3D模型建模完成之后被创建的, 且拥有与3D对象同样的网格结构, 不过所有这些多边形都被转换到了2D空间中, 因此它们可能会发生变形. 

此动图展示了对应于3D模型部分的UV贴图部分.

![UV mapping - 3Dcoat](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301301105684.gif)

在three.js中UV映射，在纹理图的原点在其左下方，坐标为(0,0),右下方为(1,0)，左上方为(0,1)，右上方为(1,1), uv的范围永远都是 0~1之间的浮点数, 可以把他理解为只有0~1的xy轴

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301301111407.png)

### **GLSL中的uv**

在`RawShaderMaterial`原始着色器材质和`ShaderMaterial`着色器材质中, 可以获得uv坐标, 这里通过传入的uv参数修改`gl_FragColor`片元颜色

- uv坐标可以理解为x(u)y(v), 范围为0~1之间的浮点数

```glsl
 // 设置精度
 precision mediump float;
 
 // 接收公共值
 varying vec2 vUv;
 
 void main() {
   // 设置片元颜色 r红 g绿 b蓝 a透明度
   gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0); // 保留蓝色, 给红绿加点蓝色
   // 或者直接设置
   // gl_FragColor = vec4(vUv, 1.0, 1.0);
 }
 
```

- 给红绿加点蓝色后的实现效果

![image-20230130151131724](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301301511774.png)
