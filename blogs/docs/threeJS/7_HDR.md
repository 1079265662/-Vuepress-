---
title: HDR高动态范围成像
date: 2022-10-21
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210211155335.jpg
tags:
 - three.js
categories: three.js

---

::: tip 介绍
HDR高动态范围成像的相关记录<br>
:::

<!-- more -->

## 简谈投影的HDR技术的发展

 HDR技术并非新鲜事物，在数码摄影领域，这个词汇已经被大家所熟知，而在显示领域，HDR技术是近一二年才开始兴起的技术。是之前的技术无法实现HDR效果吗？其实真正的原因并非如此，过去显示领域一直专注于高分辨，3D以及新面板技术，对于HDR这种边缘化的技术并不是特别的关注。如今在显示升级遭遇阻力的时候，人们才将眼光投射到了这里。

![0926333257-0](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210211135451.jpg)

 HDR技术是一种改善动态对比度的技术，HDR就是高动态范围技术，如其名字一样，HDR技术增加了亮度范围，同时提升最亮和最暗画面的对比度，从而获得更广泛的色彩范围，除了明显改善灰阶，也带来了更黑或更白的颜色效果。这样用户就可以看到更多的细节，当然前提是你放映的片源也要支持HDR技术才可以，目前市面上使用HDR技术录制的视频还很少。

![0926332061-1](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210211136660.jpg)

## HDR处理的照片效果

 HDR技术使得图像看上去效果更好，图像充满活力，而不是洗白或偏色的图像，使得整体画质表现力有较大的提升。从技术角度来看，其的确对于用户来说是意义的，但是其实HDR技术和3D技术在某种意义上有着相同的尴尬，那就是这种技术到底能不能有用武之地。

## 仅仅有技术是不够的

 3D技术大家都非常的了解，去看电影很多人也会选择3D的版本。但是大家自己购买设备的时候，往往并不会选择具有3D功能的产品。比如3D显示器价格的确不贵，但是真正实用起来，用户没有什么显示资源来支持，3D显示器也就成为了摆设。HDR技术也是如此，播放普通的片源，HDR技术并不能显著提高动态范围，因此我们必须有对应的内容源头。

![0926334011-2](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210211137774.jpg)

## HDR技术可以让用户看到更多细节

 据报道，华纳兄弟和杜比已经宣布了《明日边缘》、《不惧风暴》等电影将在今年进行HDR重制。亚马逊、Netflix则会针对旗下部分流媒体内容进行HDR重制(宣称HDR流媒体仅需2.5Mbps带宽即可实现)。另外，蓝光光盘协会也将推出超高清蓝光光盘，其中也包括支持HDR功能。但是这一点得资源还是不够的，对于普通消费者来说，必须要海量的HDR视频出现后，这样的技术才真的有用。

![092633NM-3](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210211137566.jpg)

## HDR技术需要很多的内容支持

 现在电视和投影机都出现了HDR技术的新品。笔者认为拥有心新的技术是好的，但是这种技术要求太高，注定难以普及开来。一种技术的开拓，不能对其他配套设备和资源有太多的要求，不然的话很难推动产业链的全面发展。3D技术如此，HDR技术也不例外。

## HDR在three.js的应用

* 得益于`HDR`出色的色彩效果 虽HDR的资源消耗巨大 (vscode安装HDR插件后 预览一次就会崩溃) 但是也可以在webgl中使用
  * `HDR`可以作为`Sence`背景 也可以作为物体的环境贴图
  * `HDR`加载需要使用three.js的[RGBELoader](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/RGBELoader.js)`HDR`文件加载器控件 (控件需要单独导入)
  * `HDR`加载建议使用[.loadAsync](https://threejs.org/docs/index.html?q=load#api/zh/loaders/Loader.loadAsync) 异步加载 `HDR`一张图往往10m以上 适合异步加载
  * 通过`RGBELoader`加载的 `HDR`需要设置 [.mapping](https://threejs.org/docs/index.html?q=text#api/zh/textures/Texture.mapping)贴图的环绕方式 设置为[EquirectangularReflectionMapping](https://threejs.org/docs/index.html?q=text#api/zh/constants/Textures)等距圆柱投影的环境贴图也被叫做经纬线映射贴图 包裹在一起形成`Scene`的背景效果

```tsx
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 1. 创建three.js场景
const scene = new THREE.Scene()
// 添加HDR贴图
const HDRloader = new RGBELoader()
// 异步加载HDR贴图
HDRloader.loadAsync('hdr/002.hdr').then((HDRtexture) => {
    // 设置HDR贴图的贴图环绕方式
    HDRtexture.mapping = THREE.EquirectangularReflectionMapping
    // 给场景设置HDR背景图
    scene.background = HDRtexture
    // 给场景内所有的物体添加默认的环境贴图 (如果物体不单独设置环境贴图 默认使用这个环境贴图)
    scene.environment = HDRtexture
  })
```

## 参考文献

[07-HDR详解](https://www.yuque.com/books/share/aa187c93-6603-453e-9377-9a935b59aeb4/yxh2oe)