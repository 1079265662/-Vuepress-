---
title: three.js 镜头光晕
date: 2023-03-26
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202303261538243.jpg
tags:
 - three.js
categories: three.js
---

::: tip 介绍
镜头光晕效果, 通过光晕贴图实现<br>
:::

<!-- more -->

## 镜头光晕 Lensflare

[Lensflare](https://threejs.org/docs/index.html?q=le#examples/zh/objects/Lensflare) 镜头光晕和`LensflareElement ` 镜头光晕实例, 可以实现一个光晕效果

* `Lensflare`和`LensflareElement`需要单独导入
* `Lensflare`是一个[Object3D](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D) 
* `Lensflare`不能共用, 如果多个物体需要镜头光晕, 那就需要创建多个`Lensflare`镜头光晕

![image-20230326150342240](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/undefined202303261503322.png)

镜头光晕实现步骤: 

1. 导入`Lensflare`和`LensflareElement`, three.js核心代码不包含镜头光晕

2. 通过`TextureLoader`贴图加载器加载光晕贴图

3. 创建镜头光晕`Lensflare`, 通过`.addElement`方法传入`LensflareElement ` 镜头光晕实例和相关设置
4. 将创建好的镜头光晕`,.add()`添加到需要的物体上

### 具体实现代码

创建两个`Lensflare`镜头光晕, 分别添加到: 镜头光晕1和镜头光晕2

* 因为`Lensflare`是一个`Object3D`, 可以设置 [.visible](https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.visible)来设置显示与隐藏, 默认是`true`显示镜头光晕

```tsx
// 导入three.js
import * as THREE from 'three'
// 导入镜头光晕
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare.js'
// 加载镜头光晕贴图
import lensflare from '@/assets/car/lensflare.jpg'

export class ChangeLensflare {
  // 创建纹理加载器
  textureLoader = new THREE.TextureLoader()

  // 镜头贴图
  lensFlareImage!: THREE.Texture

  // 镜头光晕1
  lensflare1!: Lensflare

  // 镜头光晕2
  lensflare2!: Lensflare

  // 一个组
  carGroup!: THREE.Group

  // 创建镜头光晕
  createLensflare = async () => {
    // 加载镜头光晕贴图
    this.lensFlareImage = await this.textureLoader.loadAsync(lensflare)

    // 设置镜头光晕贴图的编码格式
    this.lensFlareImage.encoding = THREE.sRGBEncoding

    // 创建镜头光晕1
    this.lensflare1 = new Lensflare()

    // 设置光晕1的贴图
    this.lensflare1.addElement(
      new LensflareElement(this.lensFlareImage, 512, 0)
    )

    // 设置光晕1的渲染顺序
    this.lensflare1.renderOrder = 2

    // 创建镜头光晕2
    this.lensflare2 = new Lensflare()

    // 设置光晕2的渲染顺序
    this.lensflare2.renderOrder = 2

    // 设置光晕2的贴图
    this.lensflare2.addElement(
      new LensflareElement(this.lensFlareImage, 512, 0)
    )

    // 设置光晕位置
    this.carGroup.getObjectByName('镜头光晕1')?.add(this.lensflare1)
    this.carGroup.getObjectByName('镜头光晕2')?.add(this.lensflare2)

    // 默认隐藏镜头光晕, Object3D类型
    this.lensflare1.visible = false
    this.lensflare2.visible = false
  }
}

```

