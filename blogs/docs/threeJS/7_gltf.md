---
title: GLTF格式简介
date: 2022-05-07
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-dpzjzg.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
GLTF格式简介 包含软件的支持程度<br>
:::

<!-- more -->

## 什么是GLTF

如果你是一名前端工程师，在开发web前端项目的时候，你肯定遇到过图片，比如常见的图片格式.png和.jpg。对于Web3D的三维模型同样如此，也有不同的格式，不同格式的图片可以包含不同的数据，不同格式的三维模型同样如此。

三维模型格式枚举：.stl、.obj、.ply、.dae、.fbx、.gltf、stp....


GLTF格式是新2015发布的三维模型格式，随着物联网、WebGL、5G的进一步发展，会有越来越多的互联网项目Web端引入3D元素，你可以把GLTF格式的三维模型理解为.jpg、.png格式的图片一样，现在的网站，图片基本是标配，对于以后的网站来说如果需要展示一个场景，使用3D来替换图片表达也是很正常的事情。图片有很多格式，对于三维模型自然也是如此，Web开发的时候图片会有常用格式，对于Web3D开发也一样，肯定会根据需要选择一个常见的大家都熟悉的格式，随时时间的发展，GLTF必然称为一个极为重要的标准格式。

不仅three.js，其它的WebGL三维引擎cesium、babylonjs都对gltf格式有良好的的支持。

实际上GLTF会帮助我们在three.js创建场景对象 three.js会解析这些内容 最终在页面生成建模(GLTF)给我们的效果 省去了开发用three.js进行建模的操作 我们只需要设置 相机 和 光源 还有交互效果即可

## GLTF版本

Khronos Group组织2015发布了GLTF 1.0版本，在2017年又发布了GLTF2.0的版本。

关于glTF的更多介绍和信息，可以查看github：<https://github.com/KhronosGroup/glTF>

## GLTF包含内容

相比较obj、stl等格式而言，.gltf格式可以包含更多的模型信息。

.gltf格式文件几乎可以包含所有的三维模型相关信息的数据，比如网格模型、PBR材质、纹理贴图、骨骼、变形、动画、光源、相机...

### **GLTF格式信息**

如果你有一定的前端基础，那么你对JSON一定不陌生，GLTF文件就是通过JSON的键值对方式来表示模型信息，比如`meshes`表示网格模型信息，`materials`表示材质信息...

```JavaScript
{
  "asset": {
    "version": "2.0",
  },
...
// 模型材质信息
  "materials": [
    {
      "pbrMetallicRoughness": {//PBR材质
        "baseColorFactor": [1,1,0,1],
        "metallicFactor": 0.5,//金属度
        "roughnessFactor": 1//粗糙度
      }
    }
  ],
  // 网格模型数据
  "meshes": ...
  // 纹理贴图
  "images": [
        {
            // uri指向外部图像文件
            "uri": "贴图名称.png"//图像数据也可以直接存储在.gltf文件中
        }
   ],
     "buffers": [
    // 一个buffer对应一个二进制数据块，可能是顶点位置 、顶点索引等数据
    {
      "byteLength": 840,
     //这里面的顶点数据，也快成单独以.bin文件的形式存在   
      "uri": "data:application/octet-stream;base64,AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAC/.......
    }
  ],
}
```

### **`.bin`文件**

有些glTF文件会关联一个或多个.bin文件，.bin文件以二进制形式存储了模型的顶点数据等信息。
.bin文件中的信息其实就是对应gltf文件中的buffers属性，buffers.bin中的模型数据，可以存储在.gltf文件中,也可以单独一个二进制.bin文件。

```JavaScript
"buffers": [
    {
        "byteLength": 102040,
        "uri": "文件名.bin"
    }
]
```

### **二进制.glb**

gltf格式文件不一定就是以扩展名.gltf结尾，.glb就是gltf格式的二进制文件。比如你可以把.gltf模型和贴图信息全部合成得到一个.glb文件中，.glb文件相对.gltf文件体积更小，网络传输自然更快。


### **GLTF格式模型在线预览**

你可以通过gltf-viewer平台预览GLTF格式模型，当然你也可以通过three.js editor预览gltf格式模型。

1. **gltf-viewer**：https://gltf-viewer.donmccurdy.com/

2. **three.js editor**:https://threejs.org/editor/

3. **vscode**预览gltf模型：vscode搜索gltf，可以看到glTF Tools的工具


### **导出GLTF**

可以把**three.js editor**作为工具，加载其他模型导出的obj、fbx等格式，然后转化为gltf格式。

3damx gltf相关插件：https://github.com/BabylonJS/Exporters/releases

blender：最新版本可以直接导出gltf，旧的版本可以通过gltf插件实现。

### **GLTF颜色空间**

* GLTF颜色空间是 sRGB在three.js中使用
* 在three.js中 需要单独设置

```js
renderer.outputEncoding = THREE.sRGBEncoding; //解决加载gltf格式模型纹理贴图和原图不一样问题
```

### **GLTF光源支持**

* gltf模型不能包含three.js中的环境光光源 `AmbientLight`、半球光光源 `HemisphereLight`、平面光光源 `RectAreaLight`。
* gltf格式模型可以包含平行光光源 `DirectionalLight`、点光源 `PointLight`、聚光源 `SpotLight`。

## 软件支持

* Blender 支持直接导出 并且支持二进制`glb`和拆分式`gltf`
* 3Dmax和maya需要额外的插件

### **3Dmax安装GLTF插件**

打开Babylonjs引擎github上相关的资源链接：https://github.com/BabylonJS/Exporters/releases，选择你的3dmax版本对应的zip文件下载，比如我的3dmax版本是2018，我需要下载`Max_2018.zip`文件。

![Max_2018.zip.png](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/Max_2018.zip.png)

### 解压复制

关闭你的3dmax软件，解压你下载的zip文件，比如我下载的`Max_2018.zip`文件,把解压出来的文件全部复制到你3dmax的安装目录`\bin\assemblies`下面，复制时候如果需要替换原来的文件，直接替换就可以。

3dmax安装后，`\bin\assemblies`文件我的默认是地址是`C:\Program Files\Autodesk\3ds Max 2018\bin\assemblies`，可以通过3damx桌面图标右键查看文件地址快速寻找。

### 导出gltf或.glb格式模型

在`\bin\assemblies`文件下完成文件复制替换后，重新打开3dmax程序，在界面的最上方右侧可以发现多了一个菜单命令babylon。

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/babylon.png)

babylon命令开发如下图所示，可以直接选择导出的格式。
![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/export.png)

### 导出相关问题

导出gltf或glb格式的模型后，我打开相关的模型查看材质，所有的材质默认都是PBR材质，threejs的GLTF加载器解析出来的结果是threejs的物理材质[MeshStandardMaterial](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/MeshStandardMaterial)。


如果想导出Lambert或Phong材质应该如何操作，如果不行的话，也可以自己写程序批量替换相关的材质，毕竟PBR材质可以包含除了Phong材质高光

