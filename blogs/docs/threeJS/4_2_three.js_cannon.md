---
title: three.js 之 cannon物理引擎
date: 2022-12-30
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212301707700.png
tags:
 - three.js
 - cannon.js
categories: three.js
---

::: tip 介绍
cannon.js物理引擎 配合three.js实现物理效果<br>
:::

<!-- more -->

## cannon.js物理引擎

[cannon.js](https://pmndrs.github.io/cannon-es/) 是一个轻量级且易于使用的网络 3D 物理引擎, 基于[ammo.js](https://github.com/kripken/ammo.js/)和[Bullet 物理引擎](https://github.com/bulletphysics/bullet3)。

首先要设置的是我们的物理世界，它将容纳我们所有的物理实体并推动模拟向前发展。让我们用地球引力创造一个世界。请注意，cannon.js 使用[SI 单位](https://en.wikipedia.org/wiki/International_System_of_Units)（**米、千克、秒等**）。

```bash
npm i cannon-es
```

## 物理引擎工作原理

物理引擎工作原理和流程

物理引擎可以通过设置的物体质量进行计算, 计算出物理效果, 然后把计算得出的值, 绑定在three.js真实的物体中, 从而实现一个物理效果

* 物理引擎的实现方式 主要有两种

  * 第一种, 绑定物体的实现方式, 常于一些需要运动的three.js物体
    * three.js物体是真实存在的(视图层), 其内部存在一套cannon.js的物理引擎, 这个物理引擎不可见(视图层), 但是当物体做出物理操作的时候, 他可以通过自身计算(依赖于物体的物理参数), 得出three.js需要一个物理参数(比如一个`Vector3`三维向量), 让three.js的物体按照其计算的物理效果进行移动, 实现一个物理效果

  ![image-20221229154557887](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212291546973.png)

  * 第二种, 真实存在的透明物理效果(视图层)类似于空气墙, 通常在这种物理效果上覆盖一层three.js物理作为地板或者墙壁, 常用于实现一个墙壁或者地板的效果 
    * 这种物理效果一般作为限制物体的行为, 通常被称为空气墙, 可以防止物体移动的范围, 他是真实存在视图层上, 只是默认状态下为不可见状态, 但是具备物理效果, 不需要在three.js渲染时进行操作, 直接添加在`World`物理世界即可

## 创建物理引擎

物理引擎在three.js中实现方式

1. 创建一个物理世界[World](https://pmndrs.github.io/cannon-es/docs/classes/World.html), 创建所有物理材质都需要放在物理世界中
2. 创建一些需要的物理材质可以通过构造函数创建[Body](https://pmndrs.github.io/cannon-es/docs/classes/Body.html)也可以通过[.addShape](https://pmndrs.github.io/cannon-es/docs/classes/Body.html#addShape)添加, 这些物理材质会对three.js中的物体进行一些物理效果, 创建后需要通过[.addBody](https://pmndrs.github.io/cannon-es/docs/classes/World.html#addBody), 添加到物理世界中

```tsx
// 导入conoon.js
import * as CANNON from 'cannon-es'

export class CreateConnon {
  // 创建物理世界 并且设置重力属性
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) }) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反
  // 创建物理引擎模型
  sphereBody!: CANNON.Body

  // 创建物理世界
  createPhysics = () => {
    // 设置重力方向 (x, y, z)
    // this.world.gravity.set(0, -9.8, 0) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反

    // 设置物理小球
    const sphereShape = new CANNON.Sphere(1) // 半径为1的球体
    // 设置物理小球材质
    const sphereMaterial = new CANNON.Material() // 默认物理材质

    // 设置物理小球的刚体
    this.sphereBody = new CANNON.Body({
      shape: sphereShape, // 物理形状绑定
      material: sphereMaterial, // 物理材质绑定
      mass: 1, // 设置物理小球的质量(默认为0，不受重力影响)
      position: new CANNON.Vec3(0, 15, 0) // 设置物理小球的位置
    })

    // 设置物理平面
    const planeShape = new CANNON.Plane() // 平面
    // 设置物理平面材质
    const planeMaterial = new CANNON.Material() // 默认物理材质
    // 设置物理平面的刚体
    const planeBody = new CANNON.Body({
      mass: 0, // 质量
      position: new CANNON.Vec3(0, -5, 0), // 位置
      quaternion: new CANNON.Quaternion().setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0), // 设置旋转轴 (x, y, z) x轴旋转
        -Math.PI / 2 // 旋转-90度
      ), // 旋转90度
      shape: planeShape, // 形状
      material: planeMaterial // 材质
    })

    // 将物理小球添加到物理世界中
    this.world.addBody(this.sphereBody)
    // 将物理平面添加到物理世界中
    this.world.addBody(planeBody)
  }
}

```

3. 在three.js的创建场景中添加物理创建方法, 并且在渲染阶段更新three.js的物理效果(比如通过物理引擎计算后的three.js`Vector3`三维向量, 在物理引擎中为[Vec3](https://pmndrs.github.io/cannon-es/docs/classes/Vec3.html))

```tsx
// 导入three.js
import * as THREE from 'three'
// 导入物理世界
import { CreateConnon } from './cube_physics'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 继承物理世界, 创建three.js内容的3D物理世界
export class CreateWorld extends CreateConnon {
  constructor(canvas: HTMLElement) {
    super()
    // 接收传入的画布Dom元素
    this.canvas = canvas
  }

  // 绘制canvas的Dom
  canvas!: HTMLElement | Document | Element
  // 轨道控制器
  controls!: OrbitControls
  // 设置动画id
  animationId!: number

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true // 开启锯齿
  })
  // 设置场景
  scene = new THREE.Scene()
  // 设置相机
  camera = new THREE.PerspectiveCamera(
    // 视觉角度
    75,
    // 相机纵横比 取整个屏幕 宽 / 高
    window.innerWidth / window.innerHeight,
    // 相机的进截面 (近距离不可见范围)
    0.1,
    // 远截面 (远距离不可见范围)
    1000
  )

  // 创建时钟
  clock = new THREE.Clock()

  // 创建需要物理的模型
  pMesh!: THREE.Mesh
  sphereMesh!: THREE.Mesh

  // 创建场景
  createScene = () => {
    // 设置相机的所在位置 通过三维向量Vector3的set()设置其坐标系 (基于世界坐标)
    this.camera.position.set(0, 2, 20) // 默认没有参数 需要设置参数
    // 把相机添加到场景中
    this.scene.add(this.camera)

    // 声明一个标准材质
    const material = new THREE.MeshStandardMaterial({
      color: '#cbe0e0'
    })
    // 声明一个球体
    const sphere = new THREE.SphereGeometry(1, 20, 20)
    // 创建网格模型
    this.sphereMesh = new THREE.Mesh(sphere, material)
    // 设置阴影
    this.sphereMesh.castShadow = true
    // 添加到场景
    this.scene.add(this.sphereMesh)

    // 声明一个平面
    const plane = new THREE.PlaneGeometry(20, 20)
    // 声明一个标准材质
    const pmaterial = new THREE.MeshStandardMaterial()
    // 创建网格模型
    this.pMesh = new THREE.Mesh(plane, pmaterial)
    // 设置平面的位置
    this.pMesh.position.set(0, -5, 0)
    // 设置平面的旋转
    this.pMesh.rotation.x = -Math.PI / 2 // 旋转90度
    this.pMesh.receiveShadow = true
    // 添加到场景
    this.scene.add(this.pMesh)

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)

    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
    this.scene.add(light)

    // 创建一个辅助线
    const axesHelper = new THREE.AxesHelper(20)
    this.scene.add(axesHelper)

    // 设置渲染器(画布)的大小 通过setSize()设置
    this.renderer.setSize(window.innerWidth, window.innerHeight) // setSize(画布宽度, 画布高度)
    this.renderer.shadowMap.enabled = true
    // 将webgl渲染到指定的页面元素中去 (比如body 也可以设置其他页面Dom元素)
    this.canvas.appendChild(this.renderer.domElement)

    // 创建创建一个轨道控制器 实现交互渲染
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) // new OrbitControls(相机, 渲染器Dom元素)
    // 设置控制器阻尼 让控制器更真实 如果该值被启用，你将必须在你的动画循环里调用.update()
    this.controls.enableDamping = true

    // 创建物理效果
    this.createPhysics()

    this.render()

    this.onAddEventListener()
  }

  // 渲染需要物体物理的three.js物体
  renderCannon = () => {
    // 获取动画的时间间隔(每帧的间隔)
    const deltaTime = this.clock.getDelta()
    // 更新物理引擎世界里的物体
    this.world.step(1 / 60, deltaTime) // 1/60秒更新一次物理世界60hz刷新率, deltaTime是时间间隔(更精准)
    // 把物体绑定物理引擎 把物理引擎的位置赋值给物体
    this.sphereMesh.position.set(...this.sphereBody.position.toArray()) // 绑定物理引擎toArray()转换为数组cannon-es自带的方法
    // 把物理引擎的旋转赋值给物体
    this.sphereMesh.quaternion.set(...this.sphereBody.quaternion.toArray()) // 绑定物理引擎toArray()转换为数组cannon-es自带的方法
  }

  // 渲染
  render = () => {
    // 设置阻尼感必须在动画中调用.update()
    this.controls.update()
    // 使用渲染器,通过相机将场景渲染出来
    this.renderer.render(this.scene, this.camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    this.animationId = requestAnimationFrame(this.render)

    // 绑定物理世界
    this.renderCannon()
  }

  // 尺寸变化时调整渲染器大小
  onWindowResize = () => {
    // 解构window对象
    const { innerWidth, innerHeight, devicePixelRatio } = window
    // 更新相机的宽高比
    this.camera.aspect = innerWidth / innerHeight
    // 更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix()
    // 更新渲染器
    this.renderer.setSize(innerWidth, innerHeight)
    // 更新渲染器的像素比
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  }

  // 监听窗口变化
  onAddEventListener = () => {
    // 实现画面变化 更新渲染的内容
    window.addEventListener('resize', this.onWindowResize)
  }

  // 销毁渲染内容
  dispose = () => {
    // 清除渲染器
    this.renderer.dispose()
    // 清除轨道控制器
    this.controls.dispose()
    // 销毁监听
    window.removeEventListener('resize', this.onWindowResize)
    // 清除动画
    cancelAnimationFrame(this.animationId)
  }
}

```

## 物理引擎的常用内容

### **基本物理参数**

[Vec3](https://pmndrs.github.io/cannon-es/docs/classes/Vec3.html) cannon.js的三维向量, 和three.js中的`Vector3`一样, 用来设置xyz轴

```js
new CANNON.Vec3(0, -9.8, 0)
```

[Quaternion](https://pmndrs.github.io/cannon-es/docs/classes/Quaternion.html) cannon.js的旋转方法, 是一个四元数, 和three.js的`rotate`旋转一样

* [.setFromAxisAngle](https://pmndrs.github.io/cannon-es/docs/classes/Quaternion.html#setFromAxisAngle) 设置旋转的四元数(xyz轴旋转的位置)和旋转的弧度

```js
const quaternion = new CANNON.Quaternion().setFromAxisAngle(
  new CANNON.Vec3(1, 0, 0), // 设置旋转轴 (x, y, z) x轴旋转
  -Math.PI / 2 // 旋转-90度
) // 旋转90度

```

[World](https://pmndrs.github.io/cannon-es/docs/classes/World.html) 创建物理世界, 就跟three.js的场景一样, 创建的物理内容都需要添加到世界中去

* [.gravity](https://pmndrs.github.io/cannon-es/docs/classes/World.html#gravity) 给物理世界添加重力, 通常设置重力加速度

```js
const gravity = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) }) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反
```

[Body](https://pmndrs.github.io/cannon-es/docs/classes/Body.html) 设置物理的刚体

* [.shape](https://pmndrs.github.io/cannon-es/docs/classes/Shape.html) 设置物理的形状
* [.material](https://pmndrs.github.io/cannon-es/docs/classes/Material.html) 设置物体的材质
* [.mass](https://pmndrs.github.io/cannon-es/docs/classes/Body.html#mass) 设置物体的质量(默认为0，不受重力影响, 不会有物理效果)
* [.position](https://pmndrs.github.io/cannon-es/docs/classes/Body.html#position) 物体的位置, `Vec3`三维向量类型
* [.quaternion](https://pmndrs.github.io/cannon-es/docs/classes/Body.html#quaternion) 物体旋转的方向, [Quaternion](https://pmndrs.github.io/cannon-es/docs/classes/Quaternion.html)是一个四元数类型

```js
// 设置物理立方体
const sphereShape = new CANNON.Box(new CANNON.Vec3(...this.vec3Number)) // 半径为1的立方体
// 设置物理立方体材质
const sphereMaterial = new CANNON.Material('cube') // 默认物理材质
// 设置物理立方体的刚体
const sphereBody = new CANNON.Body({
  shape: sphereShape, // 物理形状绑定
  material: sphereMaterial, // 物理材质绑定
  mass: 1, // 设置物理立方体的质量(默认为0，不受重力影响)
  position: new CANNON.Vec3(0, 0, 0), // 设置物理立方体的位置
})
// 设置物理立方体
const sphereShape = new CANNON.Box(new CANNON.Vec3(...this.vec3Number)) // 半径为1的立方体
// 设置物理立方体材质
const sphereMaterial = new CANNON.Material('cube') // 默认物理材质
// 设置物理立方体的刚体
const sphereBody = new CANNON.Body({
  shape: sphereShape, // 物理形状绑定
  material: sphereMaterial, // 物理材质绑定
  mass: 1, // 设置物理立方体的质量(默认为0，不受重力影响)
  position: new CANNON.Vec3(0, 0, 0), // 设置物理立方体的位置
})

// 将物理立方体添加到物理世界中
world.addBody(sphereBody)

```

* [.applyLocalForce](https://pmndrs.github.io/cannon-es/docs/classes/Body.html#applyLocalForce)设置设置物体施加力, 给其刚体设置一个力的方向, 和力所在的物体位置(受力点)

```tsx
// 设置物体施加力
sphereBody.applyLocalForce(
  new CANNON.Vec3(0, 20, 0), // 添加力的方向
  new CANNON.Vec3(0, 0, 3) // 施加力所在的物体位置(受力点)
)

```



### **物理形状**

[Sphere](https://pmndrs.github.io/cannon-es/docs/classes/Sphere.html) 声明一个球形物理

```js
// 设置物理小球
const sphereShape = new CANNON.Sphere(1) // 半径为1的球体
// 设置物理小球材质
const sphereMaterial = new CANNON.Material() // 默认物理材质

// 设置物理小球的刚体
this.sphereBody = new CANNON.Body({
  shape: sphereShape, // 物理形状绑定
  material: sphereMaterial, // 物理材质绑定
  mass: 1, // 设置物理小球的质量(默认为0，不受重力影响)
  position: new CANNON.Vec3(0, 15, 0), // 设置物理小球的位置
})

```

[Plane]() 声明一个实心平面, 适合做物理空气墙或者地面效果

```js
// 设置物理平面
const planeShape = new CANNON.Plane() // 平面
// 设置物理平面材质
const planeMaterial = new CANNON.Material() // 默认物理材质
// 设置物理平面的刚体
const planeBody = new CANNON.Body({
  mass: 0, // 质量
  position: new CANNON.Vec3(0, -5, 0), // 位置
  quaternion: new CANNON.Quaternion().setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0), // 设置旋转轴 (x, y, z) x轴旋转
    -Math.PI / 2 // 旋转-90度
  ), // 旋转90度
  shape: planeShape, // 形状
  material: planeMaterial, // 材质
})

```

[Box](https://pmndrs.github.io/cannon-es/docs/classes/Box.html) 声明一个矩形, 参数为`Vec3`三维向量

* <font color =#ff3040>注意: `Box`的参数是`Vec3`三维向量, 并且 three.js的矩形是物理效果的2倍(*2)</font>

```tsx
const vec3Number = [0.5, 0.5, 0.5]
// 设置物理立方体
const sphereShape = new CANNON.Box(new CANNON.Vec3(...this.vec3Number)) // 半径为1的立方体
// 设置物理立方体材质
const sphereMaterial = new CANNON.Material('cube') // 默认物理材质

// 设置物理立方体的刚体
const sphereBody = new CANNON.Body({
  shape: sphereShape, // 物理形状绑定
  material: this.sphereMaterial, // 物理材质绑定
  mass: 1, // 设置物理立方体的质量(默认为0，不受重力影响)
  position: new CANNON.Vec3(0, 0, 0), // 设置物理立方体的位置
})
// 将物理立方体添加到物理世界中
world.addBody(sphereBody)

// three.js的矩形是物理效果的2倍
// 声明一个立方体
const sphere = new THREE.BoxGeometry(
  vec3Number[0] * 2,
  vec3Number[1] * 2,
  vec3Number[2] * 2
)

```

### **物理材质**

[Material](https://pmndrs.github.io/cannon-es/docs/classes/Material.html) 定义一些物理材质, 在`Body`刚体中使用

```tsx
// 设置物理平面材质
const planeMaterial = new CANNON.Material() // 默认物理材质
// 设置物理平面的刚体
const planeBody = new CANNON.Body({
  material: planeMaterial, // 材质
})

```

## 监听刚体物理碰撞

`Body`物体刚体的碰撞可以通过[addEventListener](https://pmndrs.github.io/cannon-es/docs/classes/Body.html#addEventListener)中`collide`碰撞事件进行监听, 获取到碰撞参数: 

* `.body`是碰撞的物体
* `.target`是被碰撞的物体
* `.contact`是碰撞的相关参数, 比如碰撞后物体冲击强度
  * [.getImpactVelocityAlongNormal](https://pmndrs.github.io/cannon-es/docs/classes/ContactEquation.html#getImpactVelocityAlongNormal) 获取碰撞强度, 数值越大强度越大

```tsx
// 导入音频
import ballAudio from '@/assets/ball/ball_music.mp3'
export class CreateConnon {
  // 创建球体跌落的音频
  audio = new Audio(ballAudio)

  // 监听球体刚体落地
  onSphereBody = () => {
    // 给球体刚体绑定碰撞事件
    this.sphereBody.addEventListener('collide', (e: CANNON.Body | any) => {
      const shock = e.contact.getImpactVelocityAlongNormal() // 获取物体冲击强度
      // 获取物体冲击强度 大于5强度时播放音频
      if (shock > 5) {
        this.audio.currentTime = 0 // 重置音频播放时间 从头开始播放 防止音频播放不完整
        this.audio.volume = shock / 10 > 1 ? 1 : shock / 12 /// 设置音频音量 重力强度/10 大于1时音量为1
        this.audio.play() // 播放音频
      }
    })
  }
}

```

## 物理材质相遇/碰撞关联

[ContactMaterial](https://pmndrs.github.io/cannon-es/docs/classes/ContactMaterial.html)定义两种物体相遇/碰撞的关联, 需要关联两种材质, 设置后需要通过[addContactMaterial()](https://pmndrs.github.io/cannon-es/docs/classes/World.html#addContactMaterial), 添加到`World`物理直接中

* `friction` 设置两种物体摩擦力, 默认是`0.3`
* `restitution` 设置两种物体弹性, 默认是`0.3`

```tsx
// 导入conoon.js
import * as CANNON from 'cannon-es'
// 导入音频
import ballAudio from '@/assets/ball/ball_music.mp3'
export class CreateConnon {
  // 创建物理世界 并且设置重力属性
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) }) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反
  // 创建物理引擎模型
  sphereBody!: CANNON.Body

  // 创建球体跌落的音频
  audio = new Audio(ballAudio)

  // 创建物理世界
  createPhysics = () => {
    // 设置重力方向 (x, y, z)
    // this.world.gravity.set(0, -9.8, 0) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反

    // 设置物理小球
    const sphereShape = new CANNON.Sphere(1) // 半径为1的球体
    // 设置物理小球材质
    const sphereMaterial = new CANNON.Material('sphereMaterial') // 默认物理材质

    // 设置物理小球的刚体
    this.sphereBody = new CANNON.Body({
      shape: sphereShape, // 物理形状绑定
      material: sphereMaterial, // 物理材质绑定
      mass: 1, // 设置物理小球的质量(默认为0，不受重力影响)
      position: new CANNON.Vec3(0, 15, 0) // 设置物理小球的位置
    })

    // 设置物理平面
    const planeShape = new CANNON.Plane() // 平面
    // 设置物理平面材质
    const planeMaterial = new CANNON.Material('planeMaterial') // 默认物理材质

    // 设置物理平面的刚体
    const planeBody = new CANNON.Body({
      mass: 0, // 质量
      position: new CANNON.Vec3(0, -5, 0), // 位置
      quaternion: new CANNON.Quaternion().setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0), // 设置旋转轴 (x, y, z) x轴旋转
        -Math.PI / 2 // 旋转-90度
      ), // 旋转90度
      shape: planeShape, // 形状
      material: planeMaterial // 材质
    })

    // 设置材质碰撞关联
    const materialLink = new CANNON.ContactMaterial(
      // 两个材质碰撞关联
      sphereMaterial, // 小球材质
      planeMaterial, // 平面(地板)材质
      {
        friction: 0.1, // 摩擦力
        restitution: 0.7 // 弹性
      }
    )
    // 将材质碰撞关联添加到物理世界中
    this.world.addContactMaterial(materialLink)

    // 将物理小球添加到物理世界中
    this.world.addBody(this.sphereBody)
    // 将物理平面添加到物理世界中
    this.world.addBody(planeBody)
  }
}

```

### **设置默认相遇/碰撞行为**

[.defaultContactMaterial](https://pmndrs.github.io/cannon-es/docs/classes/World.html#defaultContactMaterial) 可以设置两个物体的默认碰撞行为, 前提是没有单独设置两个物体的碰撞行为, 如果单独设置会覆盖默认行为, 他的添加方法和上面一样, 把`addContactMaterial()`替换成`.defaultContactMaterial`

```tsx
// 导入conoon.js
import * as CANNON from 'cannon-es'
// 导入音频
import ballAudio from '@/assets/ball/ball_music.mp3'
export class CreateConnon {
  // 创建物理世界 并且设置重力属性
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) }) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反
  // 创建物理引擎模型
  sphereBody!: CANNON.Body

  // 创建球体跌落的音频
  audio = new Audio(ballAudio)

  // 创建物理世界
  createPhysics = () => {
    // 设置重力方向 (x, y, z)
    // this.world.gravity.set(0, -9.8, 0) // 重力加速度 g=9.8m/s^2 向下跌落y轴取反

    // 设置物理小球
    const sphereShape = new CANNON.Sphere(1) // 半径为1的球体
    // 设置物理小球材质
    const sphereMaterial = new CANNON.Material('sphereMaterial') // 默认物理材质

    // 设置物理小球的刚体
    this.sphereBody = new CANNON.Body({
      shape: sphereShape, // 物理形状绑定
      material: sphereMaterial, // 物理材质绑定
      mass: 1, // 设置物理小球的质量(默认为0，不受重力影响)
      position: new CANNON.Vec3(0, 15, 0) // 设置物理小球的位置
    })

    // 设置物理平面
    const planeShape = new CANNON.Plane() // 平面
    // 设置物理平面材质
    const planeMaterial = new CANNON.Material('planeMaterial') // 默认物理材质

    // 设置物理平面的刚体
    const planeBody = new CANNON.Body({
      mass: 0, // 质量
      position: new CANNON.Vec3(0, -5, 0), // 位置
      quaternion: new CANNON.Quaternion().setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0), // 设置旋转轴 (x, y, z) x轴旋转
        -Math.PI / 2 // 旋转-90度
      ), // 旋转90度
      shape: planeShape, // 形状
      material: planeMaterial // 材质
    })

    // 设置材质碰撞关联
    const defaultContactMaterial = new CANNON.ContactMaterial(
      // 两个材质碰撞关联
      sphereMaterial, // 小球材质
      planeMaterial, // 平面(地板)材质
      {
        friction: 0.1, // 摩擦力
        restitution: 0.7 // 弹性
      }
    )
    // 将材质碰撞关联添加到物理世界中
    // this.world.addContactMaterial(defaultContactMaterial)
    // 设置物理世界碰撞的默认材料, 如果材料没有设置都用这个材料
    this.world.defaultContactMaterial = defaultContactMaterial

    // 将物理小球添加到物理世界中
    this.world.addBody(this.sphereBody)
    // 将物理平面添加到物理世界中
    this.world.addBody(planeBody)
  }
}

```

