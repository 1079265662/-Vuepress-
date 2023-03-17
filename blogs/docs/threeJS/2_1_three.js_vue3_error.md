---
title: three.js在Vue3中proxy问题
date: 2022-04-21
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-k7g117.jpg
tags:
 - three.js
 - Vue3
categories: three.js
---

::: tip 介绍
记录和解决框架之间的问题 让Vue3兼容three.js<br>
:::

<!-- more -->

## 问题由来

* 刚学three.js 我想把我的`Scene()场景对象` 和 `Mesh()网格模型对象` 放入Vue3的data()中(准确的是`reactive()`中) 这样我可以在多个方法中进行调用 当我赋值完毕后 在方法中调用 出现了以下报错

```js
Uncaught (in promise) TypeError: 'get' on proxy: property 'modelViewMatrix' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '#<Matrix4>' but got '[object Object]')
```

## 问题解析

* 第一感觉不是赋值操作的问题 可能是Vue3`proxy`对象代理的问题 我们知道Vue2是通过`defineproperty`的方式 实现的双向绑定(响应式数据) Vue3则采取更先进的es6方法`proxy` 很可能是Vue3的响应式数据 和 three.js的相关数据结构 出现了冲突
* 通过我查询资料后 在该[文章](https://cdmana.com/2022/03/202203041738342602.html) 验证了我的猜想 那他的解决方法是 在three.js源码中进行修改 我认为这种修改方式不可取 修改npm包是一种高危且无用的方式 再次npm后 你修改的内容会丢失
* 进一步的查询后在[stackoverflow论坛中](https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3#comment116149963_65693108) 我发现实际上`Scene()场景对象` 和 `Mesh()网格模型对象`是一种数据结构 不需要双向绑定 也不需要响应式 
* 在该文章的最后得出最佳答案 使用Vue的[toRaw()方法](https://staging-cn.vuejs.org/api/reactivity-advanced.html#toraw)  这个方法可以让我们储存的`proxy`对象 取消其代理特性 转换成普通对象 当然 也就失去了Vue3的响应式哦
* 还有一种 也是最暴力 最简单的方式 就是声明全局变量 不在Vue3中声明 感觉有点不优雅 不是很想用

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/ca4567224a4548528842b6fd1a0c8633.png)

## 问题解决

* 我们先通过`reactive()`声明储存 然后通过`toRaw()`取消`proxy`代理特性 即可优雅使用
* 需要取消代理的对象
  * Scene() 场景对象
  * xxxxxxxxxx13 1// 创建一个组2const glassPanel = new THREE.Group()3// 创建一个网格模型4const demoMesh = new THREE.Mesh(geometry, material)5​6// 销毁组中的全部子类7// glassPanel.clear()8// 销毁组中的网格模型9glassPanel.remove(this.demoMesh)10// 销毁该网格模型的几何对象11demoMesh.geometry.dispose()12// (可选)利用js内存回收机制, 清除创建的网格模型对象13demoMesh = null as nulljs
  * Group() 导入模型


```vue
<script setup>
// 导入Vue组合API
import { onMounted, reactive, toRaw } from 'vue'
// 导入three
import * as THREE from 'three'
// 声明需要的参数
const content = reactive({
  // 声明场景对象Scene
  scene: null,
  // 声明网格模型mesh
  mesh: null,
})
//! 开始threejs的渲染步骤
const box = () => {
  // 创建场景对象Scene
  content.scene = new THREE.Scene()
  // 把创建场景对象 转换为普通对象格式
  const scene = toRaw(content.scene)
  // 网格模型对象Mesh
  content.mesh = new THREE.Mesh()
  // 把创建网格模型对象 转换为普通对象格式
  const mesh = toRaw(content.mesh)
}
onMounted(() => {
  box()
})

</script>
```

* 问题解决 全局变量解决办法就不写了 那个很简单 你在外面声明一个变量即可

## 最佳问题解决

如果我们每次都需要使用`toRaw`进行取消代理 在配合Vue3的`composition API` 那么我们岂不是非常麻烦吗 如果这个模型在很多方法多个文件中使用 那无疑是非常麻烦的 

* 使用Vue3 [shallowref()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)和 [shallowReactive()](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)浅层响应式代理(只代理第一次, 没递归处理), 该API只会代理最外层的响应式而深层不会代理, 并非使用的是`proxy`代理
  * `shallowref()` 对应的是`ref()`浅层作用形式, 此对象只有一个指向其内部值的属性 `.value`, 访问的时候需要用 `.value`
  * `shallowReactive()` 对应的是[`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 的浅层作用形式。
* 这两种浅层响应式都可以使用, 但如果是通过class类构造的单一数据结构推荐使用`shallowref()`

> `shallowref()` 使用 

创建一个通过class类构造的单一数据结构

```vue
<template>
  <div>
    <div ref="stateDom" />
    <!-- 在模板中, 如果是class类中的Vue响应式数据，需要使用.value -->
    <LoaDing :loadingNumber="Three?.loadingNumber.value" />
  </div>
</template>
<script setup lang="ts">
// 导入Vue3的API
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
// 导入three.js的构造函数
import { CreatedCanvas } from './components/car_render'

// 获取Dom
const stateDom = ref()
// 通过shallowRef()浅层响应式代理three.js数据
const Three = shallowRef<CreatedCanvas>()

onMounted(() => {
  // 创建three.js实例
  Three.value = new CreatedCanvas(stateDom.value)
  // 传递页面Dom 绘制three.js
  Three.value.createScene()
})

onBeforeUnmount(() => {
  // 销毁three.js实例
  Three.value?.dispose()
})
</script>

<script lang="ts">
export default {
  name: 'BydCar'
}
</script>
<style lang="scss" scoped></style>

```

> `shallowReactive()`使用

```vue
<script setup>
// 导入Vue组合API
import { onMounted, shallowReactive, toRaw } from 'vue'
// 导入three
import * as THREE from 'three'
// 声明需要的参数
const content = shallowReactive({
  // 声明场景对象Scene
  scene: null,
  // 声明网格模型mesh
  mesh: null,
})
//! 开始threejs的渲染步骤
const box = () => {
  // 创建场景对象Scene
  content.scene = new THREE.Scene()
  // 网格模型对象Mesh
  content.mesh = new THREE.Mesh()
}
onMounted(() => {
  box()
})

</script>
```

* 使用[shallowReactive()](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)浅层代理 解决了three.js对`proxy`的支持问题

## 参考文献

[stackoverflow解决方法](https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3#comment116149963_65693108)

[分析文章](https://cdmana.com/2022/03/202203041738342602.html)
