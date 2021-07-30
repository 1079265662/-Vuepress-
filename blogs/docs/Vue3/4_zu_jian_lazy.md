---
title: Vue3 组件懒加载方法(非插件)
date: 2021-07-19
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-l3zmwy.jpg
tags:
 - Vue3
categories: Vue3
---

::: tip 介绍
 Vue3 组件懒加载方法 适用图片少的大组件<br>
:::

<!-- more -->



## 设置组件懒加载方法(非插件)

![image-20210723223757171](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/JM58VpFCRZnhIXy.png)

[组件懒加载方法效果使用项目](https://gitee.com/liu_kaili/Vue_little_rabbit_fresh)

> `目的`：实现当组件进入可视区域在加载数据。

* 我们可以使用 `@vueuse/core` 中的 `useIntersectionObserver` 来实现监听进入可视区域行为，但是必须配合vue3.0的组合API的方式才能实现。
* 专业术语是 钩子函数 hooks
* <font color =#ff3040>适用于图片较少的 大组件 组件整体的懒加载</font>

>  大致步骤：

- 封装一个组件懒加载
  - 通过`useIntersectionObserver` 来实现监听进入可视区域行为 判断是否到达可视区 
  - 返回两个参数 
    - 参数1是监听的Dom元素(需要的观察容器)
    - 参数2是判断 是否到达可视区 如果到达返回 true (默认是false)
  - 可以设置返回值 `stop`停止监控
- Vue组件中 导入懒加载组件方法
  - 需要给组件懒加载传递api接口 
  - 并且接收懒加载组件返回的 参数 
    - 监听的Dom元素 通过`ref`绑定到需要监听的组件
    - 返回的展示数据 遍历到页面上

> 懒加载组件设置使用

1. 设置一个懒加载组件(js文件)
   * 路径: `src/hooks/index.js`
   * 通过`useIntersectionObserver` 来实现监听进入可视区域行为 判断是否到达可视区 
   * 返回两个参数 
     - 参数1是监听的Dom元素(需要的观察容器)
     - 参数2是判断 是否到达可视区 如果到达返回 true (默认是false)
   * 可以设置返回值 `stop`停止监控

```js
// 数据展示的懒加载 需要配合图片懒加载
// 导入VueUse组件useIntersectionObserver方法
import { useIntersectionObserver } from '@vueuse/core'
// 导入Vue3的ref方法
import { ref } from 'vue'

// useIntersectionObserver 有三个参数
// 参数1 表示被监听的Dom元素(观察容器)
// 参数2 监听是否到达绑定的Dom组件(布尔值类型)
// 参数3 是一个对象用来配置这个方法(通常用来配置触发条件)

export default (apiFn) => { // 参数apiFn表示调用接口的方法(组件传来的api接口 用来获取展示数据)
  // 接收传来的懒加载数据(展示数据)
  const result = ref([])
  // 设置VueUse懒加载的监听的Dom元素(观察容器)
  const target = ref(null)
  // 启动通过VueUse的懒加载操作
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  // stop是取消监听 target表示被监听的Dom元素(观察容器) isIntersecting是监听是否到达绑定的Dom组件(布尔值类型)
    if (isIntersecting) { // 如果到达了Dom组件可视区 调用接口 获取展示数据
    // 触发一次之后，取消继续监听
      stop()
      // 被监听的Dom组件已经进入可视区，此时组件传来的api接口
      apiFn().then(data => {
        // 储存到展示数据中
        result.value = data.result
      })
    }
  }, {
    // 刚一进入可视区，就触发（默认值表示，进入一段距离之后才触发）
    threshold: 0 // 0-1范围 类似百分比(推荐设置为0 无延迟)
  })
  // 进行返回值
  // 1、target表示被监听的Dom元素(需要的观察容器)
  // 2、result表示调用接口api返回的数据 (展示数据)
  return { target, result }
}

```

2. Vue组件中 导入懒加载组件方法
   - 需要给组件懒加载传递api接口 
   - 并且接收懒加载组件返回的 参数 
     - 监听的Dom元素 通过`ref`绑定到需要监听的组件
     - 返回的展示数据 遍历到页面上
   - 如果api接口需要传参 需要用箭头函数进行设置 `const { target, result } = useLazyData(() => findBrand(10))`

```vue
<template>
   <!-- 设置被监听的Dom元素(需要的观察容器) -->
  <div class="home-product" ref='target'>
  <!-- 需要懒加载的组件内容  -->
  </div>
</template>

<script>
// 导入api接口
import { findGoods } from '@/api/home.js'
import useLazyData from '@/hooks'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
     // 把api接口传给组件懒加载 并且获取组件懒加载的数据 
    // 获取懒加载组件返回的两个值
    // 1、target表示被监听的Dom元素(需要的观察容器)
    // 2、result表示调用接口apiFn返回的数据 (展示数据)
    // 3、需要在懒加载组件传递api接口 用来获取展示数据
    const { target, result } = useLazyData(findGoods) // 无需传参的设置
    // 组件懒加载需要传递参数 先通过函数方法调用接口获取promise数据 到达指容器位置后 再传递服务器获取的数据
    // const { target, result } = useLazyData(() => findBrand(10)) // 需要传参的设置
    return { target, list: result }
  }
}
</script>
```

总结：监听DOM元素进入可视区，进入后停止监听，并且调用接口获取数据

1. 将懒加载的整体流程代码封装为Hook
2. 基于hook方法实现新鲜好物和人气推荐模块的懒加载效果

