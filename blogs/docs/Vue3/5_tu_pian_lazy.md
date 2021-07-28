---
title: Vue3 自定义图片懒加载方法
date: 2021-07-19
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-z8mq8y.jpg
tags:
 - Vue3
categories: Vue3

---

::: tip 介绍
 Vue3 自定义图片懒加载方法 (自定义方法)<br>
:::

<!-- more -->

## Vue3自定义图片懒加载方法

* 非插件 自定实例化方法(跟插件差不多)

![image-20210723220724444](https://i.loli.net/2021/07/23/Qu9WRPXgvzladjM.png)

[自定义图片懒加载方法效果使用项目](https://gitee.com/liu_kaili/Vue_little_rabbit_fresh)

> `功能`: 懒加载 + 图片失效处理(代替失败图片)

* 通过 `IntersectionObserver` 方法监控视窗 实现图片懒加载效果 (原生的webapi)
* 代替`:src` 动态绑定图片路径方法 使用自定义实例化懒加载方法
* <font color =#ff3040>适用于过多图片的组件懒加载</font>

> 大致步骤

* 通过原生的webapi方法 实现懒加载的效果
* [通过mounted自定义实例化懒加载方法](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#mounted)
* Vue组件设置自定义懒加载方法 实现懒加载效果

> 懒加载自定义实例化方法

1. 设置一个懒加载图片自定义实例化方法 (js文件)
   * `mounted`设置自定义方法后 然后`install`导出自定义方法 
   * 通过 `IntersectionObserver` 方法监控视窗 实现图片懒加载效果 (原生的webapi)
   * `功能`: 懒加载图片 + 图片失效处理(代替失败图片)

```js
// 导入加载失败默认图片
import defaultImg from '@/assets/images/200.png'

// 自定义图片懒加载指令 (单独图片懒加载适合多图模式 少图模式批量设置即可)
// <img v-lazy="http://abc.com/a.jpg"/>
// 设置Vue3的实例化方法 (Vue模板调用 v-实例化名称)
const defineDirective = (app) => {
  // vue.directive('lazy', {})
  app.directive('lazy', {
    // vue2中用 inserted
    //! vue3中用 mounted
    mounted (el, bindings) {
      // el表示绑定指令的dom
      // bindings表示指令的相关信息
      // 实现图片懒加载的监听
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 进入可视区之后，取消监听
          observer.unobserve(el)
          // 进入可视区：加载图片的地址
          el.src = bindings.value
          // 监听图片加载失败的情况
          el.onerror = () => {
            // 如果加载图片失败了，就显示默认图片
            el.src = defaultImg
          }
        }
      }, {
        // 刚一进入可视区，就触发（默认值表示，进入一段距离之后才触发）
        threshold: 0 // 0-1范围 类似百分比(推荐设置为0 无延迟)
      })
      // 实现图片DOM的监听
      observer.observe(el)
    }
  })
}
// 自定义一个插件方法导出
export default {
  install (app) {
	// install导出自定义方法 
    defineDirective(app)
  }
}
```

2.  实例化 懒加载自定义方法
   * 在入口文件中 实例化 懒加载自定义方法 `src/main.js`
   * 通过 `.use()`进行导入

```js
// 导入实例化的Vue3
import { createApp } from 'vue'
import App from './App.vue'
// 导入自定义的方法 让其实例化可在组件内使用
import XtxUI from './components/library/index'

// 创建一个vue应用实例(.use() 可以实例化导入的插件)
createApp(App).use(XtxUI).mount('#app')

```

3. 在需要的Vue组件中替换`:src`
   * 自定义图片懒加载方法参数
     *  `v-lazy` 设置需要懒加载的图片路径 (必须)

```vue
<template>
  <div >
      <!-- 替换成自定义方法 无需导入直接使用v-lazy懒加载图片 -->
      <img v-lazy="picture" alt="" />
      <!-- <img :src="picture" alt="" /> -->
  </div>
</template>
```

**注意：**在img上使用使用v-lazyload值为图片地址，不设置src属性。

1. 原生js的API监听DOM元素进入可视区基本使用
2. Vue3的自定义指令的基本规则
3. 处理图片的加载和失败的情况