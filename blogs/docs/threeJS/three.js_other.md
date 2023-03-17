---
title: three.js 纹理贴图和Blender操作
date: 2023-02-15
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302151739303.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
建模纹理贴图和Blender操作<br>
:::

<!-- more -->

## 美术建模和开发者的配合

美术随意绘制产品模型，然后随意导出，对于经验不够丰富的程序员而言，直接套用，不一定能够正常加载美术导出的模型。

- 必须：需要单独改变颜色、金属度、粗糙度等材质属性的零件，必须是一个独立的Mesh，不能与其它的部位合成一个Mesh。

- 必须：凡是需要程序员在代码中查询找到，并操作的对象，必须约定命名，其它随意

- 可选：不单独的操作的部件，可以单独绘制，可以合在一起

- 可选：法线贴图、金属度贴图、粗糙度贴图等，有更好，比如法线贴图有了，模型顶点数量更少，加载更快，渲染更快。

blender导出gltf模型模型的时候，支持导出PBR材质，比如模型的**金属度**和**粗糙度**信息可以包含在模型材质中。

### **注意点**

1. 尺寸：模型尺寸大小和单位问题
2. 位置：如何居中
3. 姿态：产品模型相对坐标系xyz轴角度姿态
4. 材质：导出材质问题，比如材质颜色、金属度、粗糙度等属性值
5. 贴图：是否包含贴图路径或贴图数据

## 关于模型尺寸大小和单位问题

在对于Three.js而言，并没有什么尺寸单位概念，Three.js模型几何体数据都是数字，至于单位要看你的web应用如何定义。一般导出的gltf格式模型也不会包含单位信息，比如three.js加载一个.gltf格式长15厘米的手机模型，美术按照厘米导出，three.js解析出来尺寸就是数字15，按照毫米为单位导出，three.js解析出来尺寸就是数字150, 每个三维软件都不有差异, 不代表全部内容, **gltf文件只包含数字，没有单位信息。**

一般美术进行三维建模的时候，有些美术可能不会关心单位问题，可能凭感觉绘制好一个模型然后导出。这时候你用Three.js代码直接加载要面临一个问题，不知道模型的尺寸大小。所以美术尽量按照某个单位进行模型的绘制，比如按照毫米为单位绘制一个智能手机，然后导出给程序员即可。**最好规定好导出的单位**

### **产品模型导出位置和姿态**

xxxxxxxxxx13 1// 创建一个组2const glassPanel = new THREE.Group()3// 创建一个网格模型4const demoMesh = new THREE.Mesh(geometry, material)5​6// 销毁组中的全部子类7// glassPanel.clear()8// 销毁组中的网格模型9glassPanel.remove(this.demoMesh)10// 销毁该网格模型的几何对象11demoMesh.geometry.dispose()12// (可选)利用js内存回收机制, 清除创建的网格模型对象13demoMesh = null as nulljs

1. 位置：手机模型的几何中心尽量和三维坐标系世界**坐标原点**重合
   
2. 姿态：手机长度方向、宽度方向、厚度方向最好分别和x、y、z轴平行或垂直(一般美术的建模习惯也是如此)


### **模型材质包含贴图路径或贴图**

贴图路径，文件是否可以正常包含贴图路径，如果可以最好，这样程序员加载模型的时候，自动加载贴图。

有些软件导出PBR材质可能会存在一些小问题，比如全部贴图无法正常导出，这时候可以选择导出的模型不包含贴图，然在在代码中手动设置贴图。

程序员手动设置贴图的话，如果模型非常多，程序员不太好区分哪个模型对应哪个贴图，可以让美术把贴图名称前面都设置一个模型名称一样的前缀字符，这样也快成批量加载。

### **材质：导出材质问题，比如材质颜色、金属度、粗糙度等属性值**

不同三维模型软件导出gltf格式模型，模型中Mesh对应的材质的金属度、粗糙度等属性不一定能够正常携带，这时候就需要程序元素在代码中手动设置PBR材质[MeshPhysicalMaterial](https://threejs.org/docs/index.html?q=MeshPhysicalMaterial#api/zh/materials/MeshPhysicalMaterial)的相关属性。

## Blender模型导入操作

专业三维建模软件：**3dmax**、**blender**、**c4d**、**maya**等等

模型预览小工具

1. **gltf-viewer**：https://gltf-viewer.donmccurdy.com/
2. **three.js editor**:https://threejs.org/editor/
3. **vscode**预览gltf模型：vscode搜索gltf，可以看到glTF Tools的工具

没有写代码之前，作为程序员，如果你会使用某款三维建模软件，可以直接使用该建模软件预览美术给你的产品模型，如果没有相关使用经验，可以选择三维软件**blender**。

一些模型预览小工具一般功能比较简单，如果后期工作需要程序员或美术更改一些模型细节，比如模型名称，往往不支持或使用不方便，所以程序员可以考虑使用3D建模软件预览3d模型，从安装、导出gltf格式方便程度来看，可以考虑选择blender。

### **Blender预览3D模型演示**

通过Blender可以**导入**、**导出**和**预览**产品的3D模型，你可以跟着视频的操作体验下，这样也算是培养一点3D模型软件的操作经验。

如果你们公司3D美术熟悉Blender，遇到问题直接询问美术就是最好的方式，如果3D美术不了解，可以一块去了解，毕竟3D美术有其它三维软件的操作基础，上手Blender速度要比大部分程序员快得多。

### **Bledner鼠标操作**

缩放：鼠标中键滚动

旋转：鼠标中键拖动

[**blender的10个视图快捷键你知道吗？**](https://www.bilibili.com/read/cv10547329/)

### **blender材质相关操作指南**

gltf文件一般会配合一些相关的贴图, 导入three.js时候会读取贴图, 但在Blender中, 需要手动导入贴图, glb模型则不需要手动添加贴图(自带贴图)

![image-20230216154928086](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302161549116.png)

::: tip gltf模型和贴图关联
gltf模型可以和相关贴图进行关联, 如果不关联, 在three.js加载后只显示模型的效果

包含金属度, 粗糙度等贴图都是PBR材质[MeshStandardMaterial](https://threejs.org/docs/index.html?q=Mesh#api/zh/materials/MeshStandardMaterial)

:::

> 添加gltf模型, 并进入shading着色模式

- 在blender导入gltf文件: 文件——导入：支持gltf、obj、fbx、stl等多种常用格式

![image-20230215172422150](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302151724200.png)

- 预览和设置材质效果：顶部菜单**shading**选项

![image-20230215170906218](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302151709302.png)

> 添加对应的图像纹理和法线贴图


  - 设置**颜色贴图/金属贴图/Aplpha贴图/粗糙度贴图**：添加——纹理——图像纹理

  ![image-20230215172856980](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302151728010.png)


  - **法线贴图**：1. 复制颜色贴图 2.添加——矢量——法线贴图

  ![image-20230215172925702](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302151729724.png)

  * 把这些贴图进行指定关联

  ![image-20230215173103889](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302151731092.png)

## Blender测量模型尺寸

在`Modeling`建模选项中, 可以选择右侧菜单提供的尺子, 如果测量是`m`米, 那么导出后和three.js的模型数值一致

![image-20230220183104670](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302201831848.png)

和three.js中[box3](https://threejs.org/docs/index.html?q=box3#api/zh/math/Box3)包围盒的数值是对应的(测量肯定有误差)

![image-20230220182827707](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302201828730.png)

