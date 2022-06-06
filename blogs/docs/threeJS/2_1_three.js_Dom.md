---
title: three.js 获取三维模型的节点 
date: 2022-06-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-3zvv3d.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
three.js 获取三维模型的节点 <br>
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

![image-20220605155233753](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220605155233753.png)

## 参考文献

[Three.js零基础入门教程(郭隆邦)](http://www.yanhuangxueyuan.com/Three.js/)
