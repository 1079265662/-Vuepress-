---
title: 绘制一个圆和线
date: 2023-02-24
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302242018221.jpg
tags:
 - three.js
categories: three.js

---

::: tip 介绍
three.js绘制一个圆和线的实现代码<br>
:::

<!-- more -->

## 圆的实现效果

[EllipseCurve](https://threejs.org/docs/index.html?q=EllipseCurve#api/zh/extras/curves/EllipseCurve) 通过椭圆曲线实现一个圆, 当X轴和Y轴的半径一致(不一致是椭圆), 给其X轴曲线绘制开始结束设置为0~360°, 通过[LineBasicMaterial](https://threejs.org/docs/index.html?q=LineBasicMaterial#api/zh/materials/LineBasicMaterial)线条材质就可以形成一个圆的效果

![image-20230224193419995](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302241934034.png)

- [.getPoints()](https://threejs.org/docs/index.html?q=E#api/zh/extras/core/Curve) 设置曲线划分为的分段数, 分段数越多, 原就越饱满(根据圆的半径大小设置), 默认为5

![image-20230224194638123](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302241946167.png)

```js
// 声明一个几何对象
const linGeometry = new THREE.BufferGeometry()

// 设置一个圆的半径(three.js的单位)
const radius = 60

// 通过椭圆曲线（弧线）绘制一个半圆, 默认是逆时针绘制
// 绘制一个缺口的半圆
// 360° - 45° = 315°
const curve = new THREE.EllipseCurve(
  0, // 中心的X坐标，默认值为0。
  0, // 中心的Y坐标，默认值为0
  radius, // X轴向上椭圆的半径，默认值为1
  radius, // Y轴向上椭圆的半径，默认值为1
  0, //  以弧度来表示，从正X轴算起曲线开始的角度，默认值为0
  Math.PI * 2, // 以弧度来表示，从正X轴算起曲线终止的角度，默认值为2 x Math.PI。
  false, // 椭圆是否按照顺时针方向来绘制，默认值为false。 true为顺时针，false为逆时针
  0 //  以弧度表示，椭圆从X轴正方向逆时针的旋转角度（可选），默认值为0。按照设置的顺时针或逆时针方向旋转
)

// 提取绘制的弧线
linGeometry.setFromPoints(curve.getPoints(50))

// 设置基础线条材质
const material = new THREE.LineBasicMaterial({
  color: '#ffffff',
})

// 设置线条对象
const line = new THREE.Line(linGeometry, material)

// 设置线条的位置
// line.position.set(0, -170 / 2, 0)
// 设置线条的旋转, 旋转90°, 实现地板的效果
// line.rotateX(Math.PI / 2)

// 添加到场景中
this.scene.add(line)

```

### **实现有缺口的圆**

通过设置曲线开始和结束的角度, 不从0°~360°开始绘制, 比如从45°~360°绘制, **默认逆时针的绘制**的话就会存在一个45°的一个缺口, 顺时针则只有45°的弧线线条

```js
// 设置一个圆的半径(three.js的单位)
const radius = 60

// 通过椭圆曲线（弧线）绘制一个半圆, 默认是逆时针绘制
// 绘制一个缺口的半圆
// 绘制的度数: 360° - 45° = 315°
const curve = new THREE.EllipseCurve(
  0, // 中心的X坐标，默认值为0。
  0, // 中心的Y坐标，默认值为0
  radius, // X轴向上椭圆的半径，默认值为1
  radius, // Y轴向上椭圆的半径，默认值为1
  Math.PI / 4, //  以弧度来表示，从正X轴算起曲线开始的角度，默认值为0
  Math.PI * 2, // 以弧度来表示，从正X轴算起曲线终止的角度，默认值为2 x Math.PI。
  false, // 椭圆是否按照顺时针方向来绘制，默认值为false。 true为顺时针，false为逆时针
  0 //  以弧度表示，椭圆从X轴正方向逆时针的旋转角度（可选），默认值为0。按照设置的顺时针或逆时针方向旋转
)

```

![image-20230224195321525](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302241953552.png)

修改顺时针后, 绘制只有弧线线条的效果

```js
// 设置一个圆的半径(three.js的单位)
const radius = 60

const curve = new THREE.EllipseCurve(
  0, 
  0, 
  radius, 
  radius, 
  Math.PI / 4, 
  Math.PI * 2, 
  true, // 修改为顺时针绘制
  0 
)

```

![image-20230224195504593](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302241954588.png)

### **线条宽度**

`LineBasicMaterial` 提供了设置线宽的 [linewidth](https://threejs.org/docs/index.html?q=LineBasicMaterial#api/zh/materials/LineBasicMaterial.linewidth)、相邻线段间的连接形状 [linecap](https://threejs.org/docs/index.html?q=LineBasicMaterial#api/zh/materials/LineBasicMaterial.linecap)以及端点形状 [linecap](https://threejs.org/docs/index.html?q=LineBasicMaterial#api/zh/materials/LineBasicMaterial.linecap)，但是设置了之后却发现不生效，ThreeJS 的文档也说明了这一点：

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302242004871.webp)

由于[底层 OpenGL 渲染的限制性](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/lineWidth)，线宽的最大和最小值都只能为 1，线宽无法设置，那么线段之间的连接形状设置也就没有意义了，因此这三个设置项都是无法生效的。

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302242005834.webp)

ThreeJS 官方提供了一个可以设置线宽的 [demo](https://threejs.org/examples/?q=line#webgl_lines_fat)，这个 demo 使用了扩展包 jsm 中的材质 `LineMaterial`、几何体 `LineGeometry` 和对象 `Line2`。

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302242006836.webp)

```js
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'

const geometry = new LineGeometry();
geometry.setPositions( positions );

const matLine = new LineMaterial({
  color: 0xffffff,
  linewidth: 5, // in world units with size attenuation, pixels otherwise
  //resolution:  // to be set by renderer, eventually
  dashed: false,
  alphaToCoverage: true,
});

const line = new Line2(geometry, matLine);
line.computeLineDistances();
line.scale.set(1, 1, 1);
scene.add( line );

// 进行渲染操作
function render() {
  renderer.render(scene, camera);
	// renderer will set this eventually
  matLine.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
  requestAnimationFrame(render);
}

```

需要注意的是，在渲染循环的 render(loop)中，每帧都需要重新设置材质的 `resolution` ，否则宽度效果就无法生效；`Line2` 没有提供文档说明，具体参数需要通过观察源码进行探索。

### **线条颜色**

在`LineMaterial`材质设置中， `vertexColors` 这个参数可以控制材质颜色的来源，如果设置为 `true`，那么颜色的计算逻辑来自于顶点颜色，通过一定的插值平滑过渡为连续的颜色变化。

```js
// 创建材质
const material = new THREE.LineMaterial({
  linewidth: 2,
  vertexColors: true,
  resolution: new THREE.Vector2(800, 600),
});

// 创建空几何体
const geometry = new THREE.LineGeometry();
geometry.setPositions([
  10,10,0, 10,-10,0, -10,-10,0, -10,10,0
]);
// 设置顶点颜色
geometry.setColors([
  1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0
]);

const line = new THREE.Line2(geometry, material);
line.computeLineDistances();
scene.add(line);

```

上述代码创建了四个点，分别设置顶点颜色为红色(1,0,0)、绿色(0,1,0)、蓝色(0,0,1)、黄色(1,1,0)，得到的渲染效果如下图：

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302242010701.webp)

## 参考文献

[ThreeJS 中线的那些事](https://juejin.cn/post/7078932375127719966)