---
title: glsl中的2D纹理(texture2D)
date: 2023-02-13
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302131353131.png
tags:
 - three.js
 - glsl
categories: glsl
---

::: tip 介绍
二维纹理映射的概念和原理和glsl中的使用<br>
:::

<!-- more -->

## 使用纹理增加物体表面细节

要使渲染的物体更加逼真，一方面我们可以使用更多的三角形来建模，通过复杂的模型来逼近物体，但是这种方法会增加绘制流水线的负荷，而且很多情况下不是很方便的。使用纹理，将物体表面的细节映射到建模好的物体表面，这样不仅能使渲染的模型表面细节更丰富，而且比较方便高效。纹理映射就是这样一种方法，在程序中通过为物体指定纹理坐标，通过纹理坐标获取纹理对象中的纹理，最终显示在屏幕区域上，已达到更加逼真的效果。

## 纹素(texel)和纹理坐标

使用纹素这个术语，而不是像素来表示纹理对象中的显示元素，主要是为了强调纹理对象的应用方式。纹理对象通常是通过纹理图片读取到的，这个数据保存到一个二维数组中，这个数组中的元素称为纹素(texel)，纹素包含颜色值和alpha值。纹理对象的大小的宽度和高度应该为2的整数幂，例如16, 32, 64, 128, 256。要想获取纹理对象中的纹素，需要使用纹理坐标(texture coordinate)指定。

纹理坐标应该与纹理对象大小无关，这样指定的纹理坐标当纹理对象大小变更时，依然能够工作，比如从256x256大小的纹理，换到512x256时，纹理坐标依然能够工作。因此纹理坐标使用规范化的值，大小范围为[0,1]，纹理坐标使用uv表示，如下图所示(来自:[Basic Texture Mapping](http://ogldev.atspace.co.uk/www/tutorial16/tutorial16.html)):

![纹理坐标](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302131325642.png)

u轴从左至右，v轴从底向上指向。右上角为(1,1)，左下角为(0,0)。 通过指定纹理坐标，可以映射到纹素。例如一个256x256大小的二维纹理，坐标(0.5,1.0)对应的纹素即是(128,256)。(256x0.5 = 128, 256x1.0 = 256)。

纹理映射时只需要为物体的顶点指定纹理坐标即可，其余部分由片元着色器插值完成，如下图所示(来自[A textured cube](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-5-a-textured-cube/))：

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302131329544.png)

## 模型变换和纹理坐标

所谓模型变换，就是对物体进行缩放、旋转、平移等操作，后面会着重介绍。当对物体进行这些操作时，顶点对应的纹理坐标不会进行改变，通过插值后，物体的纹理也像紧跟着物体发生了变化一样。如下图所示为变换前物体的纹理坐标(来自:[Basic Texture Mapping](http://ogldev.atspace.co.uk/www/tutorial16/tutorial16.html)):

![模型变换前](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302131330238.png)

经过旋转等变换后，物体和对应的纹理坐标如下图所示，可以看出上面图中纹理部分的房子也跟着发生了旋转。(来自:[Basic Texture Mapping](http://ogldev.atspace.co.uk/www/tutorial16/tutorial16.html)):

![模型变换后](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302131331022.png)

## 在three.js着色器中使用纹理

在three.js加载纹理, 并且设置`uniforms`着色器传参

```js
// 引入纹理
import usaTexture from '@/assets/material/usa.png'

// 加载纹理
const usaTextureLoader = new THREE.TextureLoader().load(usaTexture)

// 声明一个着色器材质
const rawShader = new THREE.RawShaderMaterial({
  // 通过glsl程序实现
  // 顶点着色器 需要设置坐标转换
  vertexShader: planeVertexShader,
  // 片元着色器
  fragmentShader: planeFragmentShader,
  // 开启线性
  // wireframe: true,
  // 设置双面显示
  side: THREE.DoubleSide,
  // 给着色器传递uniforms顶点参数
  uniforms: {
    uTexture: {
        // 传递纹理
      value: usaTextureLoader,
    },
  },
})

```

在`fragmentShader`片元着色器中设置2D纹理, 通过`texture2D(sampler2D, vec2 )`方法进行设置

```glsl
// fragmentShader.glsl
// 设置精度
precision mediump float;

// 接收顶点着色器传递的值
varying vec2 vUv;
varying float vPositionZ;

// 导入three.js传来的纹理, sampler2D采样纹理对应的是THREE.Texture的纹理
uniform sampler2D uTexture;

// 声明浮点数的值
float color;
// 声明纹理颜色值
vec4 textureColor;

void main() {
  // z轴的值为-0.05~0.05，不能为负数所以加0.05转正，再乘以10，得到0~10的R色值, 让其颜色随着凹凸变化, 越凹越黑(值越小), 越凸越亮(值越大)
  // color = vPositionZ + 0.05 * 20.0;
  // 赋值计算后R色值
  // gl_FragColor = vec4(color, 0.0, 0.0, 1.0); 

  // 根据uv坐标获取纹理的颜色值
  textureColor = texture2D(uTexture, vUv);
  // 赋值计算后的颜色值
  // textureColor.rgb *= color;  

 // 赋值计算后的颜色值
  gl_FragColor = textureColor;
}

```

## 参考文献

[二维纹理映射](https://github.com/wangdingqiao/noteForOpenGL/tree/master/textures)
