---
title: TS和Vue3 使用记录
date: 2022-09-05
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209072009800.jpg
tags:
 - TypeScript
 - Vue3
categories: TypeScript
---

::: tip 介绍
TS和Vue3 使用记录 记录一些踩坑内容<br>
:::

<!-- more -->

## Vue3 在原型链上创建属性

* 通过`install `Vue3在原型链上注册一些全局内容 比如一些描述性的内容

> 配置一个全局文件

* 通过`export{}`进行命名导出

```tsx
/**
 * 全局配置文件
 */
// 按钮名称
const button = {
  reset: '重 置'
}
export {  button }

```

> 在入口文件 `main.ts`

* 在入口文件中导入并注册 
* <font color =#ff3040>注意: 全局属性一定要用`$`开头</font>
* <font color =#ff3040>注意: 如果你在Vue的原型链上 注册新的内容 那么必须定义后扩充 `@vue/runtime-core` 设置你注册的类型</font> 

```tsx
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入按钮配置
import { button } from '@/settings'
// 创建Vue3要添加的原型链方法
const ret = {
  install(App: any) {
    // 通过config.globalProperties给其添加原型链方法
    // app.config.globalProperties.$要创建的原型链方法名 = 创建的虚拟Dom方法
    App.config.globalProperties.$b = button // 全局属性一定要以$开头
  }
}

// 定义了全局方法之后需要扩充类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $b: {
      reset: string
    }
  }
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ret)
app.mount('#app')

```

> 在Vue中使用

* 在模板`<template>`中 直接用即可
* 在`<script>`中 需要导入[getCurrentInstance]()获取当前组件实例并且需要断言`as any`其类型
  * [getCurrentInstance]()  据说是内部接口 不稳定 只建议用来使用全局注册 并且打包后 会失去其实例 只会保留`$`符号的内容

````vue
<template>
  <div> {{ $b.reset }} </div>
</template>
<script lang="ts" setup>
// 导入getCurrentInstance 使用原型链对象方法
import { getCurrentInstance } from 'vue'
// 实例化 getCurrentInstance 使用原型链对象方法 并且结构proxy
const { proxy } = getCurrentInstance() as any // 主要进行断言
// 使用原型链上的内容
console.log(proxy.$b.reset)
</script>

````

