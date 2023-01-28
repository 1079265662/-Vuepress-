---
title: three.js 之 着色器材质
date: 2023-01-09
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091642302.jpg
tags:
 - three.js
 - Shader
categories: three.js
---

::: tip 介绍
Shader着色器在three.js中使用<br>
:::

<!-- more -->

## shader 着色器的实现

着色器材质（ShaderMaterial）是一个用GLSL编写的小程序 ，在GPU上运行。它能够提供 materials 之外的效果，也可以将许多对象组合成单个Geometry或BufferGeometry以提高性能。

### **着色器材质的变量**

每个着色器材质都可以指定两种不同类型的shaders，他们是顶点着色器和片元着色器(Vertex shaders and fragment shaders)。

- 顶点着色器首先运行; 它接收`attributes`， 计算/操纵每个单独顶点的位置，并将其他数据`varyings`传递给片元着色器。
- 片元（或像素）着色器后运行; 它设置渲染到屏幕的每个单独的“片元”（像素）的颜色。

shader中有三种类型的变量: `uniforms`, `attributes`, 和 `varyings`

- `uniforms`是所有顶点都具有相同的值的变量。可以通过顶点着色器`vertexShader`和片元着色器`fragmentShader`来访问。
  - `uniform`变量就像是C语言里面的常量（const ），它不能被shader程序修改。**（shader只能用，不能改）**
  - `uniform`变量一般用来表示**：变换矩阵，材质，光照参数和颜色等信息**。

- `attributes` 与每个顶点关联的变量。只可以在顶点着色器`vertexShader`中访问。
  - `attribute`变量来表示一些顶点的数据，**如：顶点坐标，法线，纹理坐标，顶点颜色,uv值等。**

- `varyings` 是从顶点着色器`vertexShader`传递到片元着色器`fragmentShader`的变量。对于每一个片元，每一个`varying`的值将是相邻顶点值的平滑插值。
  - `varyings`变量在顶点着色器`vertexShader`传递到片元着色器`fragmentShader`二者之间的声明(类名)必须是一致的
  - `varyings`声明后是没有值的, 需要在函数中赋值
  - `varyings`的变量通常会在变量名前添加`v`, 来标记该变量的特殊性


注意：在shader 内部，`uniforms`和`attributes`就像常量；你只能使用JavaScript代码通过缓冲区来修改它们的值。

### **着色器浮点精确度**

规定着色器显示的`float`浮点精确度, 越精确质量越高, 理解为材质的画质, 在three.js的[RawShaderMaterial](https://threejs.org/docs/index.html?q=shader#api/zh/materials/RawShaderMaterial) 原始着色器中必须设置, 通过`precision`设置`float`, 分为三个质量等级

* 在原始着色器`RawShaderMaterial`必须在顶点着色器`vertexShader`和片元着色器`fragmentShader`中设置, 两者的浮点精度可以不一致, 但必须都声明

```glsl
// highp高浮点精确度 -2^16 - 2^16
precision highp float
// mediump中浮点精确度 -2^16 - 2^10
precision mediump float
// lowp低浮点精确度 -2^8 - 2^8
precision lowp float

```

### **Shader代码规范**

* shader 语言 有一个 `main`函数，是强类型语言。这点和 C 语言很像。
* 大小写敏感, 表达式后面必须以`;`结束
* 最终的像素颜色取决于预设的全局变量 `gl_FragColor`。
* 这个类 C 语言有内建的**变量**（像`gl_FragColor`），**函数**和**数据类型**。在本例中我们刚刚介绍了vec4（四分量浮点向量）。之后我们会见到更多的类型，像 vec3（三分量浮点向量）和 vec2（二分量浮点向量），还有非常著名的：float（单精度浮点型）， int（整型） 和 bool（布尔型）。
* float类型在 shaders 中非常重要，所以**精度**非常重要。更低的精度会有更快的渲染速度，但是会以质量为代价。你可以选择每一个浮点值的精度, 最好养成在float 型数值里加一个 . (整数加 .0 )的好习惯, <font color =#ff3040>**不要把单精度浮点值换成整型数值**</font>

## three.js着色器材质

在three.js中有两种着色器实现方式, 他们都需要使用[GLSL](https://developer.mozilla.org/zh-CN/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)着色器语言来实现

* [ShaderMaterial](https://threejs.org/docs/index.html?q=sha#api/zh/materials/ShaderMaterial) 着色器材质, 内置的`uniforms`和`attributes`
* [RawShaderMaterial](https://threejs.org/docs/index.html?q=shader#api/zh/materials/RawShaderMaterial) 原始着色器, 不使用内置的`uniforms`和`attributes`, 需要声明后才能使用

### **通过ShaderMaterial实现**

`vertexShader` 顶点着色器, 设置着色器顶点

* `gl_Position` 设置顶点位置的显示
  * 顶点变换过程: 投影矩阵 * 视图矩阵 * 模型矩阵* 顶点坐标

![image](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091604242.png)

```glsl
// 顶点位置 = 投影矩阵*视图矩阵 * 模型矩阵 * 顶点坐标
void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}

```

* `fragmentShader` 片元着色器, 设置着色器显示效果
  * `gl_FragColor` 设置着色器中像素的颜色, 通过`rgba`设置类型为float


```glsl
// 通过rgba设置颜色类型为float
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

```

* 通过模板字符串在`ShaderMaterial`设置glsl代码

```tsx
// 声明一个着色器材质
const shader = new THREE.ShaderMaterial({
  // 通过Shader实现
  // 顶点着色器 需要设置坐标转换
  vertexShader: `
        void main(){
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
        }
      `,
  // 片元着色器
  fragmentShader: `
        void main(){
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `,
})

```

## Vite引入glsl

当单独创建glsl文件进行引入时Vite打包工具默认不识别glsl文件, 并不会把glsl转化成一段字符串, 所以不能直接引入使用, 需要通过[vite-plugin-string](https://github.com/aweikalee/vite-plugin-string) 进行转换

* 支持转化文本的类型: .vs，.fs，.vert，.frag，.glsl，wgsl等。

> 安装vite-plugin-string

```bash
npm install --save-dev vite-plugin-string
```

> 在vite.config.ts中引入

```tsx
// vite.config.js
import vitePluginString from 'vite-plugin-string'

export default {
  plugins: [
    vitePluginString()
  ]
}

```

> 在项目中使用

```tsx
// 引入glsl
import planeFragmentShader from '../glsl/fragmentShader.glsl'
import planeVertexShader from '../glsl/vertexShader.glsl'

// 声明一个着色器材质
const shader = new THREE.ShaderMaterial({
  // 使用引入的glsl
  // 顶点着色器 
  vertexShader: planeVertexShader,
  // 片元着色器
  fragmentShader: planeFragmentShader,
})

```

## 在ts环境下使用glsl

glsl文件在ts环境下是没有类型标识的, 直接导入会报错 所以我们需要在脚手架([create-vue](https://github.com/vuejs/create-vue) Vue3+vite脚手架环境下)根目录下创建一个`env.d.ts`(格式为`*.d.ts`, 进行glsl类型设置, 作为字符串导入

```tsx
declare module '*.glsl' {
  const value: string
  export default value
}

```

## 参考文献

[WEBGL入门 密码:lzzk](https://www.yuque.com/yun41s/bbsl9p/kgir0b?)
