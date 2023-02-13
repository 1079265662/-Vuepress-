---
title: three.js 之 glsl
date: 2023-01-09
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301091642302.jpg
tags:
 - three.js
 - glsl
categories: glsl
---

::: tip 介绍
Shader着色器在three.js中使用<br>
:::

<!-- more -->

## shader 着色器的实现

着色器材质（ShaderMaterial）是一个用GLSL编写的小程序 ，在GPU上运行。它能够提供 materials 之外的效果，也可以将许多对象组合成单个Geometry或BufferGeometry以提高性能。

* 着色器学习网站 [大量示例](https://thebookofshaders.com/?lan=ch)

### **着色器材质的变量**

每个着色器材质都可以指定两种不同类型的shaders，他们是顶点着色器和片元着色器(Vertex shaders and fragment shaders)。

- 顶点着色器首先运行; 它接收`attributes`， 计算/操纵每个单独顶点的位置，并将其他数据`varyings`传递给片元着色器。
- 片元（或像素）着色器后运行; 它设置渲染到屏幕的每个单独的“片元”（像素）的颜色。

shader中有三种类型的变量: `uniforms`, `attributes`, 和 `varyings`, 如果three.js提供的变量, 导入的时候需要和three.js变量名一致

- `uniforms`是所有顶点都具有相同的值的变量。可以通过顶点着色器`vertexShader`和片元着色器`fragmentShader`来访问。
  - `uniform`变量就像是C语言里面的常量（const ），它不能被shader程序修改。**（shader只能用，不能改）**
  - `uniform`变量一般用来表示**：变换矩阵，材质，光照参数, 颜色, three.js传来的值等**。
- `attributes` 与每个顶点关联的变量。只可以在顶点着色器`vertexShader`中访问。
  - `attribute`变量来表示一些顶点的数据，**如：顶点坐标，法线，纹理坐标，顶点颜色,uv值等。**
- `varyings` 是从顶点着色器`vertexShader`传递到片元着色器`fragmentShader`的变量。对于每一个片元，每一个`varying`的值将是相邻顶点值的平滑插值。
  - `varyings`变量在顶点着色器`vertexShader`传递到片元着色器`fragmentShader`二者之间的声明(类名)必须是一致的
  - `varyings`声明后是没有值的, 需要在函数中赋值
  - `varyings`的值不允许改变, 如果需要改变值, 需要创建一个新的变量


注意：在shader 内部，`uniforms`和`attributes`就像常量；你只能使用JavaScript代码通过缓冲区来修改它们的值。

### **着色器浮点精确度**

规定着色器显示的`float`浮点精确度, 越精确质量越高, 理解为材质的画质, 在three.js的[RawShaderMaterial](https://threejs.org/docs/index.html?q=shader#api/zh/materials/RawShaderMaterial) 原始着色器中必须设置, 通过`precision`设置`float`, 分为三个质量等级

* 着色器中, 必须在顶点着色器`vertexShader`和片元着色器`fragmentShader`中设置, 两者的浮点精度可以不一致, 但必须都声明

```glsl
// highp高浮点精确度 -2^16 - 2^16
precision highp float
// mediump中浮点精确度 -2^16 - 2^10
precision mediump float
// lowp低浮点精确度 -2^8 - 2^8
precision lowp float

```

### **Shader/GLSL代码规范**

* shader 语言 有一个 `main`函数，是强类型语言。这点和 C 语言很像。
* **大小写敏感, 表达式后面必须以`;`结束, 声明变量必须声明其类型(强类型语言), 类型不正确会报错**
*  三种变量命名时候通常为`类型首字母(u/a/v) + 名称`
* 最终的像素颜色取决于预设的全局变量 `gl_FragColor`。
* 这个类 C 语言有内建的**变量**（像`gl_FragColor`），**函数**和**数据类型**。在本例中我们刚刚介绍了vec4（四分量浮点向量）。之后我们会见到更多的类型，像 vec3（三分量浮点向量）和 vec2（二分量浮点向量），还有非常著名的：float（单精度浮点型）， int（整型） 和 bool（布尔型）。
* float类型在 shaders 中非常重要，所以**精度**非常重要。更低的精度会有更快的渲染速度，但是会以质量为代价。你可以选择每一个浮点值的精度, 最好养成在float 型数值里加一个 . (整数加 .0 )的好习惯, <font color =#ff3040>**不要把单精度浮点值换成整型数值**</font>

## three.js着色器材质

在three.js中有两种着色器实现方式, 他们都需要使用[GLSL](https://developer.mozilla.org/zh-CN/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)着色器语言来实现

* [ShaderMaterial](https://threejs.org/docs/index.html?q=sha#api/zh/materials/ShaderMaterial) 着色器材质, 内置的`uniforms`和`attributes`
* [RawShaderMaterial](https://threejs.org/docs/index.html?q=shader#api/zh/materials/RawShaderMaterial) 原始着色器, 不使用内置的`uniforms`和`attributes`, 需要声明后才能使用

<font color =#ff3040>注意: 以上两种材质默认渲染格式为 `RGB`没有透明属性, 需要给其.[transparent](https://threejs.org/docs/index.html#api/zh/materials/Material.transparent) 透明度设置`true`, 否则将无法渲染`RGBA`透明内容</font>

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

### **着色器GLSL代码**

适用于three.js中[RawShaderMaterial](https://threejs.org/docs/index.html#api/zh/materials/RawShaderMaterial) 原始着色器材质中的顶点着色器`vertexShader`和片元着色器`fragmentShader`

* 在three.js中使用`RawShaderMaterial` 原始着色器, 如果是vite需要安装配置[vite-plugin-string](https://github.com/aweikalee/vite-plugin-string), 让其GLSL代码转换成字符串

```js
// 引入glsl
import planeVertexShader from '../glsl/vertexShader.glsl'
import planeFragmentShader from '../glsl/fragmentShader.glsl'
// 声明一个着色器材质
const shader = new THREE.ShaderMaterial({
  // 设置双面显示
  side: THREE.DoubleSide,
  // 顶点着色器 需要设置坐标转换
  vertexShader: planeVertexShader,
  // 片元着色器
  fragmentShader: planeFragmentShader,
})

```

* 设置`vertexShader`顶点着色器

```glsl
// 设置精度
precision mediump float;

// 传入three.js中的一些变量
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// 传入three.js顶点关联的变量
attribute vec3 position;

void main() {
  // 顶点坐标
  vec4 modelPostion = modelMatrix * vec4(position, 1.0);

  // 计算顶点位置
  gl_Position = projectionMatrix * viewMatrix * modelPostion;
}

```

* 设置`fragmentShader`片元着色器

```js
// 设置精度
precision mediump float;

void main() {
  // 设置片元颜色
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // 纯白色
}

```

* 实现效果

![image-20230129150213034](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202301291502132.png)

### **偏移问题**

通过glsl着色器渲染的时候, 会出现一些类似于小边框的效果, 这个其实是着色器多出的渲染部分

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302011346563.png)

可以通过给xy轴偏移0.01, 让其隐藏不渲染的内容

```glsl
// 接收公共值
varying vec2 vUv;

// 设置变量
float color;

void main() {
  color = step(0.8, mod(vUv.x * 10.0 + 0.01, 1.0));
  // 如果color < 0.5, 返回0.0, 否则返回1.0
  color += step(0.8, mod(vUv.y * 10.0 + 0.01, 1.0));
  gl_FragColor = vec4(color, color, color, 1.0);
}

```

### **抗锯齿问题**

three.js[WebGLRenderer](https://threejs.org/docs/index.html?q=renderer#api/zh/renderers/WebGLRenderer)的`antialias`抗锯齿对于glsl不太友好, 甚至开了还不如不开, 所以建议别开, 等以后有后期处理的抗锯齿库再补充

![image-20230201144946264](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302011449315.png)

```js
  // 创建渲染器
  new THREE.WebGLRenderer({
    // antialias: true // 不要开抗锯齿
  })
  
```

### **透明设置**

three.js中, [Material](https://threejs.org/docs/index.html?q=RawShaderMaterial#api/zh/materials/Material) 材质默认渲染格式为`RGB`, 不支持着色器`gl_FragColor`中的透明度设置, 需要给其设置.[transparent](https://threejs.org/docs/index.html#api/zh/materials/Material.transparent) 透明支持设置为`true`让其支持`RGBA`渲染格式

* `.transparent` 透明支持设置为`true`后支持图像的透明效果, 让其从`RGB`转换为`RGBA`渲染效果

```js
const material = new THREE.RawShaderMaterial({
  // 设置透明设置, 默认Material使用带有 RGB 的渲染目标格式。需要设置RGBA带有透明的渲染目标格式
  transparent: true,
})

```

```glsl
gl_FragColor = vec4(1.0, 1,0, 1.0, 0.5) // 支持RGBA透明效果

```

## uniforms使用

`uniforms`是 GLSL 着色器中的全局变量。可以通过three.js设置后传入GLSL中

*  <font color=#ff3040>每个 `uniforms`对象中的内容平必须包括一个 **value** 属性</font>。value的类型必须和下表中 GLSL的基本类型相对应。

| GLSL 类型      | JavaScript 类型                                              |
| :------------- | :----------------------------------------------------------- |
| int            | Number                                                       |
| uint (WebGL 2) | Number                                                       |
| float          | Number                                                       |
| bool           | Boolean                                                      |
| bool           | Number                                                       |
| vec2           | [THREE.Vector2](https://threejs.org/docs/index.html#api/zh/math/Vector2) |
| vec2           | Float32Array (*)                                             |
| vec2           | Array (*)                                                    |
| vec3           | [THREE.Vector3](https://threejs.org/docs/index.html#api/zh/math/Vector3) |
| vec3           | [THREE.Color](https://threejs.org/docs/index.html#api/zh/math/Color) |
| vec3           | Float32Array (*)                                             |
| vec3           | Array (*)                                                    |
| vec4           | [THREE.Vector4](https://threejs.org/docs/index.html#api/zh/math/Vector4) |
| vec4           | [THREE.Quaternion](https://threejs.org/docs/index.html#api/zh/math/Quaternion) |
| vec4           | Float32Array (*)                                             |
| vec4           | Array (*)                                                    |
| mat2           | Float32Array (*)                                             |
| mat2           | Array (*)                                                    |
| mat3           | [THREE.Matrix3](https://threejs.org/docs/index.html#api/zh/math/Matrix3) |
| mat3           | Float32Array (*)                                             |
| mat3           | Array (*)                                                    |
| mat4           | [THREE.Matrix4](https://threejs.org/docs/index.html#api/zh/math/Matrix4) |
| mat4           | Float32Array (*)                                             |
| mat4           | Array (*)                                                    |
| ivec2, bvec2   | Float32Array (*)                                             |
| ivec2, bvec2   | Array (*)                                                    |
| ivec3, bvec3   | Int32Array (*)                                               |
| ivec3, bvec3   | Array (*)                                                    |
| ivec4, bvec4   | Int32Array (*)                                               |
| ivec4, bvec4   | Array (*)                                                    |
| sampler2D      | [THREE.Texture](https://threejs.org/docs/index.html#api/zh/textures/Texture) |
| samplerCube    | [THREE.CubeTexture](https://threejs.org/docs/index.html#api/zh/textures/CubeTexture) |

(*) 与最内层队列中 GSLS 的类型保持一致。包含队列中所有矢量的元素或矩阵中的元素。

### **通过three.js传入uniform**

着色器`ShaderMaterial` 和 原始着色器`RawShaderMaterial`都可以通过[uniforms](https://threejs.org/docs/index.html?q=un#api/zh/core/Uniform)属性进行传值, <font color=#ff3040>每个 `uniforms`对象中的属性平必须包括一个 **value** 属性, 格式为对象</font>

* 在GLSL中直接使用`uniforms`对象中包含的属性即可

```js
// 声明一个着色器材质
const rawShader = new THREE.RawShaderMaterial({
  // 通过glsl程序实现
  // 顶点着色器 需要设置坐标转换
  vertexShader: planeVertexShader,
  // 片元着色器
  fragmentShader: planeFragmentShader,
  // 设置双面
  side: THREE.DoubleSide,
  // 给着色器传递uniforms属性
  uniforms: {
    time: { value: 0 },
  },
})

// 修改uniforms属性中的值
rawShader.uniforms.time.value = 3

```

* 在GLSL中接收three.js传来的`uniforms`中的属性, 必须通过上面的类型表, 转换three.js的类型设置其在GLSL中的基本类型

```glsl
// 接收传来的uniforms中的属性 类型为浮点数float
uniform float time;

void main() {
 sin(time)
}

```

## glsl内置函数

开始学习three.js着色器材质时，我们经常会无从下手，辛苦写下的着色器，也会因莫名的报错而手足无措。原因是着色器材质它涉及到另一种语言–GLSL，只有懂了这个语言，我们才能更好的写出着色器材质，利用好的我们的GPU。这篇说一说glsl内置函数。

* glsl取反为`1.0 - 参数`, 取正为`1.0 + 参数`(以three.js传来的UV作为参数0~1)

### **常用方法函数**

类似于three.js中的一些方法

| 函数                        | 参数                            | 描述                             |
| --------------------------- | ------------------------------- | -------------------------------- |
| texture2D(sampler2D, vec2 ) | sampler2D采样纹理, 物体的UV坐标 | 用来在片元着色器中设置2D纹理贴图 |
|                             |                                 |                                  |

### **和角度相关的函数** 

下面是一个和角度相关的函数，他们的用法我们度熟悉。

| 函数       | 参数 | 描述           |
| ---------- | ---- | -------------- |
| sin(x)     | 弧度 | 正弦函数       |
| cos(x)     | 弧度 | 余弦函数       |
| tan(x)     | 弧度 | 正切函数       |
| asin(x)    | 弧度 | 反正弦函数     |
| acos(x)    | 弧度 | 反余弦函数     |
| atan(x)    | 弧度 | 反正切函数     |
| radians(x) | 角度 | 角度转换为弧度 |
| degrees(x) | 弧度 | 弧度转换为角度 |

### **数学函数** 

这类主要是对指数对数幂函数的操作

| 函数           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| pow(x,y)       | x的y次方。如果x小于0，结果是未定义的。同样，如果x=0并且y<=0,结果也是未定义的。 |
| exp(x)         | e的x次方                                                     |
| log(x)         | 计算满足x等于e的y次方的y的值。如果x的值小于0，结果是未定义的。 |
| exp2(x)        | 计算2的x次方                                                 |
| log2(x)        | 计算满足x等于2的y次方的y的值。如果x的值小于0，结果是未定义的。 |
| sqrt(x)        | 计算x的开方。如果x小于0，结果是未定义的。                    |
| inversesqrt(x) | 计算x的开方之一的值，如果x小于等于0，结果是未定义的。        |

### **常用函数** 

这里是常用函数，和js中的内置函数很像，需要牢记。

| 函数                        | 描述                                                         |
| --------------------------- | ------------------------------------------------------------ |
| abs(x)                      | 返回x的绝对值                                                |
| sign(x)                     | 如果x>0，返回1.0；如果x=0，返回0，如果x<0，返回-1.0          |
| floor(x)                    | 返回小于等于x的最大整数值                                    |
| ceil(x)                     | 返回大于等于x的最小整数值                                    |
| fract(x)                    | 返回x-floor(x)，即返回x的小数部分                            |
| mod(x, y)                   | 返回x和y的模                                                 |
| min(x, y)                   | 返回x和y的值较小的那个值。                                   |
| max(x, y)                   | 返回x和y的值较大的那个值。                                   |
| clamp(x, minVal, maxVal)    | 将x值钳于minVal和maxVal之间，意思就是当x<minVal时返回minVal，当x>maxVal时返回maxVal，当x在minVal和maxVal之间时，返回x |
| mix(x, y, a)                | 返回线性混合的x和y，如：x*(1−a)+y*a                          |
| step(edge, x)               | 如果x < edge，返回0.0，否则返回1.0                           |
| smoothstep(edge0, edge1, x) | 如果x <= edge0，返回0.0 ；如果x >= edge1 返回1.0；如果edge0 < x < edge1，则执行0~1之间的平滑埃尔米特差值。如果edge0 >= edge1，结果是未定义的。 |

###  **几何函数**

这是与长度、距离、向量等相关的函数

| 函数                    | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| length(x)               | 返回向量x的长度<br />支持二维向量vec2, 那么其长度为两个值相加后的长度<br />用来实现半径渐变效果(扩散效果)<br />不支持vec3, vec4等 |
| distance(p0,p1)         | 计算向量p0，p1之间的距离<br />支持二维向量vec2两个值的距离, p0和p1都必须为vec2, vec2的两个值对应计算 |
| dot                     | 向量x，y之间的点积                                           |
| cross(x, y)             | 向量x，y之间的叉积                                           |
| normalize(x)            | 标准化向量，返回一个方向和x相同但长度为1的向量               |
| faceforward(N, I, Nref) | 如果Nref和I的点积小于0，返回N；否则，返回-N；                |
| reflect(I, N)           | 返回反射向量                                                 |
| refract(I, N, eta)      | 返回折射向量                                                 |

### **二维向量随机数**

glsl没有提供相应的随机数方法, 可以通过已有的数学方法计算出一个伪随机, 详细看[随机](https://thebookofshaders.com/10/?lan=ch), 这篇文章

```glsl
// 设置精度
precision mediump float;

// 接收公共值
varying vec2 vUv;

// 接收three.js传递的值(时间)
uniform float time;

// 伪随机方法
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // 随机数
  float color = random(vUv + time);
    
  gl_FragColor = vec4(color, color, color, 1);
}

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
