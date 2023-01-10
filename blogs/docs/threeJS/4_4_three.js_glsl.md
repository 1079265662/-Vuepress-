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
Shader着色器在three.js(ShaderMaterial)中使用<br>
:::

<!-- more -->

## ShaderMaterial着色器材质

[ShaderMaterial](https://threejs.org/docs/index.html?q=sha#api/zh/materials/ShaderMaterial) 是three.js的材质一种, 可以自定义的去写Shader(GLSL)着色器代码, 需要在模板字符串中写Shader语言, Shader可以直接在GPU上运行, 通过自定义着色器顶点实现一些展示效果

> Shader代码规范

* shader 语言 有一个 `main`函数，是强类型语言。这点和 C 语言很像。
* 大小写敏感, 表达式后面必须以`;`结束
* 最终的像素颜色取决于预设的全局变量 `gl_FragColor`。
* 这个类 C 语言有内建的**变量**（像`gl_FragColor`），**函数**和**数据类型**。在本例中我们刚刚介绍了vec4（四分量浮点向量）。之后我们会见到更多的类型，像 vec3（三分量浮点向量）和 vec2（二分量浮点向量），还有非常著名的：float（单精度浮点型）， int（整型） 和 bool（布尔型）。
* float类型在 shaders 中非常重要，所以**精度**非常重要。更低的精度会有更快的渲染速度，但是会以质量为代价。你可以选择每一个浮点值的精度, 最好养成在float 型数值里加一个 . (整数加 .0 )的好习惯, <font color =#ff3040>**不要把单精度浮点值换成整型数值**</font>

### **shader 着色器的实现**

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

`fragmentShader` 片元着色器, 设置着色器显示效果

* `gl_FragColor` 设置着色器中像素的颜色, 通过`rgba`设置类型为float

```glsl
// 通过rgba设置颜色类型为float
void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

```

### **three.js实现代码**

`ShaderMaterial`通过three.js设置着色器材质, 使用模板字符串自定义Shader着色器代码

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

Vite打包工具默认不识别glsl文件, 并不会把glsl转化成一段字符串, 所以不能直接引入使用, 需要通过[vite-plugin-string](https://github.com/aweikalee/vite-plugin-string) 进行转换

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

## 在ts环境下使用glsl

glsl文件在ts环境下是没有类型标识的, 直接导入会报错 所以我们需要在脚手架([create-vue](https://github.com/vuejs/create-vue) Vue3+vite脚手架环境下)根目录下创建一个`env.d.ts`(格式为`*.d.ts`, 进行glsl类型设置, 作为字符串导入

```tsx
declare module '*.glsl' {
  const value: string
  export default value
}

```

