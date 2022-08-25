---
title: three.js常用的方法
date: 2022-08-08
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208081959690.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
记录three.js常用的方法<br>
:::

<!-- more -->

## 常用Object3D方法

* 这是Three.js中大部分对象的基类，提供了一系列的属性和方法来对三维空间中的物体进行操纵。详细看这里[三维物体（Object3D）](https://threejs.org/docs/index.html?q=OrthographicCamera#api/zh/core/Object3D)

* 请注意，可以通过`.add(object)`方法来将对象进行组合，该方法将对象添加为子对象，但为此最好使用Group（来作为父对象）

* 任意的3D对象具备的 `Vector3`三维向量 四位向量

  - [.position(Vector3) ](https://threejs.org/docs/?q=ob#api/zh/core/Object3D.position)(在三个轴向上移动 通常也是模型的世界坐标位置)
  - [.scale(Vector3)](https://threejs.org/docs/?q=ob#api/zh/core/Object3D.scale) (在三个轴向上缩放)
  - `rotation` (在三个轴向上旋转)
  - `quaternion` (四元数，也是用于处理旋转的)

* 以上的方法都涉及到 `x,y,z`轴的(还有`w`) 进行修改时候需要用到以下方法 

  > 假设以`.position`模型世界坐标位置为例

  * [.add(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.add) 将传入的向量v和这个向量相加 可以对`x y z` 轴进行相加处理

  ```js
  const coordinate = new THREE.Vector3(200, 50, 50)
  Object3D.position.add(coordinate)
  ```

  * [.copy(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.copy) 将所传入`Vector3`的x、y和z属性复制给这一`Vector3`。覆盖原有的 `x y z`

  ```js
  const coordinate = new THREE.Vector3(200, 50, 50)
  Object3D.position.copy(coordinate)
  ```

  * [.set(number)](https://threejs.org/docs/?q=Vector3#api/zh/math/Vector3.set) 设置该向量的x、y 和 z 分量。覆盖原有的 `x y z` 不用 `Vector3`用数字设置即可

  ```js
  Object3D.position.set(0, 0, 0)
  ```

  * [.clone(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.clone) 返回一个新的`Vector3`，其具有和当前这个向量相同的x、y和z。复制一份 `x y z` 不修改原数据

  ```js
  const ret = Object3D.position.clone() 
  console.log(ret) // ret里面包含Vector3
  ```

  * 也可以直接赋值或者进行运算符处理指定坐标

  ```js
   // 赋值操作
  	Object3D.position.x = 20;
      Object3D.position.y = 20;
      Object3D.position.z = 2;
  // 相加相减操作
  	Object3D.position.x += 20;
      Object3D.position.y -= 20;
  ```

### 旋转角度 

* [.rotateX() .rotateY() .rotateZ()](https://threejs.org/docs/index.html#api/zh/core/Object3D.rotateX) 旋转三个轴的角度 让内容朝某个方向转起来

```js
物体的网格对象(Mesh).rotateY(0.1) // rotateX rotateY rotateZ     
```

* [.rotation(X, Y, Z, 'order')](https://threejs.org/docs/index.html#api/zh/core/Object3D.rotation) 整合旋转三个轴的角度 他的参数的类是[欧拉角（Euler）](https://threejs.org/docs/index.html#api/zh/math/Euler.order)
  * `order`可以设置旋转的顺序 默认值为 'XYZ'，这意味着对象将首先是 绕X轴旋转，然后是Y轴，最后是Z轴。其他可能性包括: 'YZX'， 'ZXY'， 'XZY'， 'YXZ'和'ZYX'。这些**必须是大写字母。**

```js
Mesh.rotation.set(1, 0, 0, 'ZYX')  
```

* 也可以直通过`.rotation` 进行直接的赋值处理指定的旋转坐标

```js
Mesh.rotation.x += 0.1
Mesh.rotation.y += 0.1
Mesh.rotation.z += 0.1
```

### **缩放比例**

* [.scale(Vector3)](https://threejs.org/docs/index.html#api/zh/core/Object3D.scale) 在三个轴向上缩放 默认的XYZ值为`1`

```js
  // 创建一个网格模型 放入创建的几何体和其自身材质
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial) // Mesh(几何体, 纹理材质)
  // 进行缩放
  cube.scale.set(2, 1, 1)
```

### **设置一个组 Group**

* 我们可以把声明的网格模型对象放到一个集合中 也就组[Group](https://threejs.org/docs/index.html?q=group#api/zh/objects/Group) 这样我们可以给组内的网格模型进行批量的操作
* Group也继承自`Object3D`类，因此可以使用`Object3D`类的属性和方法，例如位置，比例，旋转，四元数和`lookAt`都可以作用在Group上。

```js
//创建一个立方体几何对象Geometry
const geometry = new THREE.BoxGeometry(50, 50, 50); 
// 材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,//材质颜色
});

//网格模型对象Mesh
const mesh = new THREE.Mesh(geometry, material); 
//创建组对象
const group = new THREE.Group();
// 把网格模型放到组对象里面
group.add(mesh);

// 创建场景对象Scene
var scene = new THREE.Scene();
//把group中的模型添加到场景中
scene.add(group);
```

### **遍历Object3D对象 .traverse**

* [.traverse](https://threejs.org/docs/index.html#api/zh/core/Object3D.traverse) 可以递归遍历object3D对象 我们可以通过判断来批量替换网格模型中的材质 等等...
  * 如果替换的是网格模型的材质 一定要把`color`也替换上 否则会显示默认的白色模型


```js
    const model = new THREE.Group()// 声明一个组对象，用来添加加载成功的三维场景
    const loader = new GLTFLoader() // 创建一个GLTF加载器
    loader.loadAsync(`${process.env.BASE_URL}model/model.glb`, (gltf) => { // gltf加载成功后返回一个对象
    }).then((gltf) => {
      // 递归遍历gltf.scene，批量更改所有Mesh的材质
      gltf.scene.traverse(function (object) {
          // 进行判读 是否为网格模型Mesh
        if (object.type === 'Mesh') {
          // 替换漫反射材质
          object.material = new THREE.MeshLambertMaterial({
            map: object.material.map, // 获取原来材质的颜色贴图属性值
            color: object.material.color // 读取原来材质的颜色
            // side: THREE.DoubleSide,//围墙需要设置双面显示
          })
        }
      })
      // 把gltf.scene中的所有模型添加到model组对象中
      model.add(gltf.scene)
    })
```

### **设置渲染顺序 .renderOrder **

* Object3D对象 在渲染器`render`中有先后渲染顺序 默认是0 他类似于css中的`z-index` 通过[.renderOrder](https://threejs.org/docs/#api/zh/core/Object3D.renderOrder) 进行渲染顺序 [scene graph](https://en.wikipedia.org/wiki/Scene_graph)（场景图)默认值会被该设置覆盖

```js
Object3D.renderOrder = 12 // 任意层数
```

### **移除Object3D对象 .remove**

* [ .remove](https://threejs.org/docs/index.html?q=remove#api/zh/core/Object3D.remove) 移除Object3D对象 也可以移除在页面创建的Object3D模型对象
* [Group](https://threejs.org/docs/index.html?q=Group#api/zh/objects/Group) 组对象也可以使用

```js
Object3D.remove(被删Object3D对象)
Group.remove(被删Object3D对象)
```

### **修改Object3D对象中的元素样式**

* 如果我们的`Object3D`对象是通过js的Dom元素生成的 那么会存在`element`Dom属性 然后再通过`.style`就可以修改Dom元素的样式

```js
Object3D.element.style.opacity = 1 // 显示标签
```

## 使用时间跟踪

* 通过设置[Clock](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock) 可以跟踪动画渲染的时间 并且可以通过时间跟踪设置动画的一些行为 时钟设置后自动开启
  * [.getElapsedTime()](https://threejs.org/docs/index.html?q=clock#api/zh/core/Clock.getElapsedTime) 获取启动后的秒数 通常可以通过他设置一些动画的行为

```js
  // 设置一个时钟
  const clock = new THREE.Clock()
    // 7. 创建更新动画的方法
  const render = (time) => { // time会返回一个毫秒帧率
    // 获取渲染的更新时间
    const runClock = clock.getElapsedTime()
    //限制其最大移动距离 超过会重置移动距离
    const run = runClock % 5
    // 设置没秒移动1距离
    cube.position.x = run * 1
    // 设置旋转
    cube.rotation.x += 0.1
    // cube.rotation.x += 0.1
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    requestAnimationFrame(render)
  }
  // 执行创建更新动画的方法
  render()
```



## 按照屏幕刷新率进行移动

* 通过[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 方法可以让浏览器自动的播放动画 但是有时候浏览器会因为某些原因会进行跳帧 从而感觉动画不是很流畅 
* 可以通过`requestAnimationFrame`返回值`毫秒帧率 / 1000`的方式获取每秒的帧率 然后手动设置动画效果 这样动画就会很流畅 并根据刷新率进行自适应的动画

```js
  // 7. 创建更新动画的方法
  const render = (time) => { // requestAnimationFrame 会返回一个毫秒帧率
    // 毫秒帧率 / 1000 得到秒帧率 % 5 可以限制其最大移动距离 距离超过5就会重置移动距离
    const run = time / 1000 % 5
    // 设置没秒移动1距离
    cube.position.x = run * 1
    // 使用渲染器,通过相机将场景渲染出来
    renderer.render(scene, camera) // render(场景, 相机)
    // 使用动画更新的回调API实现持续更新动画的效果
    requestAnimationFrame(render)
  }
  // 执行创建更新动画的方法
  render()
```

