---
title: Vue路由和组件的按需加载
date: 2021-07-09
cover: https://tva2.sinaimg.cn/large/005INI3Xly8gs6h05bvi6j31hc0u0dum.jpg
tags:
 - Vue
categories: Vue
---

::: tip 介绍
Vue router 和 Vue组件的按需加载设置<br>
:::

<!-- more -->

## 设置路由的懒加载(按需加载) `component 重要`

* 普通导入路由的时候 页面如果加载 会把所有路由组件都加在进来
* 当设置路由懒加载的时候 不会一次性加载所有配置的路由 页面加载更快

> 普通导入路由的方法

```js
const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
```

> 路由懒加载导入方法

```js
const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'Home',
        // 这里是导入组件的Home路径
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      // 这里是导入组件的About路径
      component: () => import('../views/About.vue')
    }
  ]
})
```

## Vue的按需导入组件 `import`

* 按需导入指的是 当该组件功能用到的时候 才会加载该内容 (普通导入在页面加载时候 就会加载)
* 按需导入可以提高页面打开效率 常用于导入大文件的时候使用(超过50kb)

> 普通的导入方法

```js
import demo from '导入的路径' // 方式导入 打开页面会加载
```

> 按需导入的方法

* 使用的时候 再导入该组件

```js
 import('@/vendor/Export2Excel') // 使用组件的时候 再import导入
```

