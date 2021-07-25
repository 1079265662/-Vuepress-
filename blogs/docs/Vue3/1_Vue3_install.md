---
title: Vue3 install插件机制
date: 2021-07-18
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-9m23jw.jpg
tags:
 - Vue3
categories: Vue3
---

::: tip 介绍
Vue3 将组件设置为插件的食用方法<br>
:::

<!-- more -->

## Vue3自定义插件机制 `install`

[Vue3插件机制官网](https://v3.cn.vuejs.org/guide/plugins.html#%E6%8F%92%E4%BB%B6)

> 目标：熟悉Vue的插件机制（针对Vue核心规则的一种扩展机制）

* Vue3配置全局插件是 app. (Vue2是 Vue.)
* Vue3设置插件的时候 设置插件的Vue组件需要 设置`name`属性

![image-20210722165649300](https://i.loli.net/2021/07/22/kaSbDBwVJC32TEh.png)

## 设置Vue3自定义插件

[Vue3插件机制官网](https://v3.cn.vuejs.org/guide/plugins.html#%E6%8F%92%E4%BB%B6)

> 第一步 把写好的Vue组件 设置为插件

* 把写好的Vue组件 在一个文件中 统一设置为插件

* 设置插件的Vue组件需要 设置`name`属性
  * `app.component` 设置插件的名称 需要和 组件内部设置的name名称一致

```js
// 导入需要设置为插件的Vue组件
import XtxSkeleton from './xtx-skeleton.vue'

// 自定义一个插件导出
export default {
  install (app) {
    // 配置全局插件 app.component 设置插件的名称 需要和 组件内部设置的name名称一致
    // app表示Vue全局插件的实例对象 (Vue2是Vue. Vue3是app.)
  app.component(XtxSkeleton.name, XtxSkeleton) // (导入组件的名称的name名.name,插件的名称)
  }
}
```

> 第二步 实例化插件 让其能在Vue组件中使用

* 入口文件一般是 `main.js`
* 通过 `.use(插件名称)` 实例化该插件

```js
// 导入实例化的Vue3
import { createApp } from 'vue'
import App from './App.vue'
// 导入自定义插件的配置文件 让其实例化 可在组件内使用
import XtxUI from './components/library/index'

// 在createApp(App)后面 .use()导入自定义的插件
createApp(App).use(XtxUI).mount('#app')

```

> 第三步 实例化插件后 无需导入 直接在Vue组件中使用

* 无需导入 直接在`template` 模板中调用插件即可(导入配置的插件名称)

```vue
<template>
  <div class="home-banner">
  <!-- 直接导入插件即可 可以在里面绑定参数 -->
 <XtxSkeleton />
  </div>
</template>
```

* 如果需要给插件传递参数 通常会动态绑定数据 ( 动态绑定基本类型的传入插件的数据 可保证插件需求的数据类型)

