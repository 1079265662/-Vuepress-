---
title: three.js 三维模型交互相关
date: 2022-06-05
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-3zvv3d.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 三维模型交互相关的内容<br>
:::

<!-- more -->

## 什么是三维模型的节点

开发一些web3d项目，比如一个小区、学校的可视化，场景中会有多个楼房模型对象，这时候程序员通过什么方式区分每一栋楼是一个问题。

通过获取指定模型的节点 我们可以和其建立交互效果 就跟前端的获取Dom 绑定事件是一样的

### **三维建模软件和three.js模型名称对应**

* 一般三维建模软件的**目录树**都有模型的名称，three.js加载外部模型，外部模型的名称会解析为three.js对象的 `.name`属性。
* 类似以前端的Dom节点一样 我们通过`class`或者`id`给其绑定一个类名 然后通过一些选择Dom的方法 绑定其Dom节点 就可以实现一些交互效果

### **获取三维模型的节点 `.getObjectByName()`**

* three.js通过基类[Object3D](https://threejs.org/docs/index.html?q=Object3D#api/zh/core/Object3D)的 `.getObjectByName('模型节点名称name')`方法快速查找某个模型对象，就像普通前端绑定DOM的方法 `getElementById()`一样。
  * `.getObjectByName()` 不光具备绑定模型节点操作节点 也可以进行模型节点进行筛选(类似于`filter`) 筛选符合条件的模型节点内容 找不到会返回`undefined`
* 我们可以通过给**模型对象**添加**父类** 通过获取父类的三维模型的节点 实现批量修改模型对象的方式

```js
const model = new THREE.Group();//声明一个组对象，用来添加加载成功的三维场景
const loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load("./scene/scene.gltf", function (gltf) {
    model.add(gltf.scene);
    
    // 我有两个模型 名称为: 立方体 和 Cylinder 我们通过getObjectByName()获取其三维模型的节点 
    const mesh = gltf.scene.getObjectByName('立方体');
    console.log('立方体',mesh);//控制台查看返回结果

    const Cylinder = gltf.scene.getObjectByName('Cylinder');//圆柱体
    console.log('圆柱体',Cylinder);//控制台查看返回结果
    
    // 查找符合条件的name名称
    const ret = gltf.scene.getObjectByName('粮仓')
    // 查找符合条件的name
    console.log(ret)
    // 我们还可以批量修改某个模型的内容 比如以上两模型都在 Group这个父类 通过获取父类批量修改里面的子类
    var group = gltf.scene.getObjectByName('Group');//获得立方体和Cylinder的父对象Group
    // 批量更改group所有后代的颜色
    group.children.forEach(function(mesh){
        mesh.material.color.set(0x00ffff);
    })
    
})
```

### **模型命名**

* 命名：中文名、英文名、汉语拼音都可以，可以根据公司规定或开发习惯命名。

* **规范**：模型命名也可以参考编程命名规范，目前大多数公司提倡英文命名，中文命名很少见。

* **相关**：模型名称可以尝试参考前后端API接口名称，比如前后端接口定义，**P_01**对应**1号**平房粮仓，**P_02**对应**2号**平房粮仓，那么美术和前端之间模型的名称也可以使用P_01、P_02分别表示1号平房粮仓、2号平房粮仓。毕竟前端WebGL工程师要同时和后端、美术协作，名称都一致更方便。

### **命名其他问题**

* 通过三维软件建模的时候，每个模型软件都会默认生成一个名字( 唯一名字 )，如果前端代码不需要查询某个模型进行特定操作，那么该模型名称随意是什么都无所谓 并不会重名 除非自己修改。
* 如果需要选中进行特定操作的模型，一般需要处于独立状态，不能和其它Mesh合在一起，比如需要获取模型世界坐标、射线拾取模型对象等。

> 命名建议

1. 需要进行交互的模型 一定要独立绘制 并且名称需要唯一
2. 需要交互的不同模型 建议创建父级名称进行归类

![image-20220609175247508](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220609175247508.png)

## 鼠标交互 射线拾取操作

通过[.getObjectByName](https://threejs.org/docs/index.html?q=Object3D#api/zh/core/Object3D.getObjectByName)筛选出需要交互的模型 然后通过Object3D[.traverse](https://threejs.org/docs/index.html#api/zh/core/Object3D.traverse)方法遍历递归出他们的网格模型`Mesh` 最后通过 [Raycaster光摄投线](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster)的方法进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）判断是否点击的是需要交互的网格模型节点 如果是 那么就给选中的网格模型节点进行一些交互效果

> 射线拾取网格模型——四步走

1. 获取需要鼠标交互的网格模型集合(父对象) [.getObjectByName](https://threejs.org/docs/index.html?q=Object3D#api/zh/core/Object3D.getObjectByName)
2. 坐标转化(鼠标单击的屏幕坐标转WebGL标准设备坐标)
3. 射线生成计算 (通过鼠标单击位置+相机参数计算射线值)
4. 射线拾取计算[.intersectObjects](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster.intersectObjects)



### **获取需要鼠标交互的网格模型集合**

* 通常需要交互的网格模型会放入[Group](https://threejs.org/docs/index.html?q=Group#api/zh/objects/Group)集合中( 建模自带 或者 手动创建[Group](https://threejs.org/docs/index.html?q=Group#api/zh/objects/Group) ) 
* 通过[.getObjectByName](https://threejs.org/docs/index.html?q=Object3D#api/zh/core/Object3D.getObjectByName)筛选出需要交互的模型 然后通过Object3D的[.traverse](https://threejs.org/docs/index.html#api/zh/core/Object3D.traverse)方法遍历递归出他们的网格模型`Mesh`

```js
// 声明一个储存需要交互的网格模型的数组
const granaryArr = []
loader.load("建模文件.glb", function (gltf) {//gltf加载成功后返回一个对象
    // // 所有需要交互的网格模型父对象名称：'粮仓'
    const group = gltf.scene.getObjectByName('粮仓');
    //console.log('粮仓', group);
    group.traverse(function (obj) {
        if (obj.type === 'Mesh') {
            granaryArr.push(obj);
        }
    })
    model.add(gltf.scene);
})
```

### **坐标转化**

* 鼠标单击canvas画布，通过返回事件对象属性 `window.event.clientX`和 `window.event.clientY`鼠标单机位置的屏幕坐标,然后把屏幕坐标转化为WebGL标准设备坐标，WebGL标准设备坐标坐标范围[-1,1]。
  * WebGL标准设备坐标公式:
    * 宽: ( 当前鼠标宽 / 当前设备的宽 )  * 2 - 1
    * 高: -( 当前鼠标高 / 当前设备的高 )  * 2 + 1

```JavaScript
  const Sx = window.event.clientX // 鼠标单击位置横坐标
  const Sy = window.event.clientY // 鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  const x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
  const y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
```

### **射线生成计算 `.setFromCamera()`**

把鼠标单击位置坐标和相机参数作为 [.setFromCamera(Vector2, Camera)](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster.setFromCamera)方法的参数，计算射线投射器 `Raycaster`的射线属性 `.ray`值。

```JavaScript
//创建一个射线投射器`Raycaster`
const raycaster = new THREE.Raycaster();
//通过鼠标单击位置标准设备坐标和相机参数计算射线投射器Raycaster的射线属性 .ray
raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
```

### **射线拾取计算 `.intersectObjects()`**

通过 [.intersectObjects(交互模组集合array)](https://threejs.org/docs/index.html?q=Raycaster#api/zh/core/Raycaster.intersectObjects)方法可以计算出来射线相交的网格模型。

```JavaScript
//返回.intersectObjects()参数中射线选中的网格模型对象
// 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
const intersects = raycaster.intersectObjects([boxMesh, sphereMesh, cylinderMesh]);
```

#### **射线拾取获取场景点击坐标**

* 通过射线拾取计算 `.intersectObjects()` 可以获得当前拾取(场景点击)的 x y z坐标 他是一个`Vector3`三维向量 `Object3D`对象可以直接通过[.copy(Vector3)](https://threejs.org/docs/index.html?q=Vector3#api/zh/math/Vector3.copy) 进行 x y z赋值
* 有时候会有多个射线拾取 其实是模型重叠 把后面的模型也选中了 **[.renderOrder](https://threejs.org/docs/#api/zh/core/Object3D.renderOrder)**设置渲染顺序即可(不确定) 或者选中第一个对象

```js
Object3D.position.copy(intersects[0].point) // 选择第一个对象 有时候模型重叠会存在多个对象 但是点击对象通常是第一个
```

### **整体写法Vue3**

* 我们需要记录 上一次所选中的网格模型对象 当选择下一个的时候 让原来那个恢复未选中的样式效果
* 修改材质颜色的时候 需要用 颜色(Color)的[color.set](https://threejs.org/docs/index.html?q=color#api/zh/math/Color.set) 方法进行材质颜色修改
* <font color =#ff3040> 注意: 如果材质是一张贴图 将无法修改</font>

```vue
<template>
  <div>
    <!-- 渲染模板 -->
    <div ref="stateDom" @click="checked" />
  </div>
</template>
<script setup>
// 引入Three.js
import * as THREE from 'three'
// 导入Vue组合API
import { reactive } from 'vue'
import { camera } from './settings/RendererCamera.js'
// 获取需要交互的模型对象集合
import { contentModel } from './settings/model.js'
// 储存选中的网格模型对象
const context = reactive({
  chooseMesh: null
})
// 绑定渲染模板的点击事件
const checked = () => {
  // 判断上次是否有选过网格模型对象
  if (context.chooseMesh) {
    context.chooseMesh.material.color.set('#ffffff')// 把上次选中的mesh设置为原来的颜色
  }
  const Sx = window.event.clientX // 鼠标单击位置横坐标
  const Sy = window.event.clientY // 鼠标单击位置纵坐标
  // 屏幕坐标转WebGL标准设备坐标
  const x = (Sx / window.innerWidth) * 2 - 1 // WebGL标准设备横坐标
  const y = -(Sy / window.innerHeight) * 2 + 1 // WebGL标准设备纵坐标
  // 创建一个射线投射器Raycaster
  const raycaster = new THREE.Raycaster()
  // 通过鼠标单击位置标准设备坐标和相机参数计算射线投射器Raycaster的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
  // 返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  const intersects = raycaster.intersectObjects(contentModel.granaryArr)
  console.log(intersects)
  // console.log("射线器返回的对象", intersects);
  // console.log("射线投射器返回的对象 点point", intersects[0].point);
  // console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
      // 赋值被点中的交互模型
    context.chooseMesh = intersects[0].object
      // 打印当前鼠标点击在场景的坐标 x y z
    console.log(intersects[0].point)
    context.chooseMesh.material.color.set('#00ffff')// 选中改变颜色，这样材质颜色贴图.map和color颜色会相乘
  }
}
</script>
```

## 参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
