---
title: 路由导航守卫(访问权限 白名单)
date: 2021-06-26
cover: https://tva2.sinaimg.cn/large/005INI3Xly8grlofqcdd3j31gi0u0dvl.jpg
tags:
 - Vue
 - Vue Router
categories: Vue

---

::: tip 介绍
Vue-router 全局路由导航守卫 设置访问权限 白名单等<br>
:::

<!-- more -->

## 全局路由导航守卫 `beforeEach()`

[Vue-router 路由守卫介绍](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)

> 目标：用户没有登录页面 不让其访问 主页 等内容 让其跳转到登录页

* 一般设置在总路由组件中 控制全局的某些指定跳转
* 全局导航守卫有三个参数
  - to 表示要跳转到哪里去 (通常用来判断 路由地址 `if(to.path === '/login')`)
  - from 表示从哪里跳转过来的
  - next 表示具体跳转到哪里 如果不调用 无法看到组件
* ==注意: 必须要设置在路由映射生效之后 导出路由之前==

> 全局导航守卫案例  路由文件夹`router`里面 `index.js`

1. 判断用户是否登录 (判断其token值) 如果没登录 转到登录页
   * 判断需要两个条件 
     * 需要判断用户是否存在 token值 不存在跳转到登录页面 `next('/路径')`
     * 判断是否处于登录页 如果在登录页 无需跳转` to.path`是判断是否处于某个页面
2. 如果已经登录不管直接 `next()`

```js
// 设置全局导航守卫(路由跳转到目标组件之前 先经过导航守卫进行效验)
// 判断其token值 如果不存在 转到登录页面 如果已经在登录页面 则判断不需要跳转
router.beforeEach((to, from, next) => {
  // to 表示要跳转到哪里去
  // from 表示从哪里跳转过来的
  // next 表示具体跳转到哪里 如果不调用 无法看到组件

  // 判断用户是否已经登录
  // 1. 查询用户是否已经登录 把用户token值转换为字符串 (两个token 临时token 和 续费token)
  const userToken = JSON.parse(sessionStorage.getItem('mytoken'))
  // 2. 获取字符串整合token 和 两个token的值 (两个token 临时token 和 续费token)
  const flag = userToken && userToken.token && userToken.refresh_token// 判断是否存在token值 存在返回true
  // 3. 进行token判断 是否存在token 和 是否处于登录页 to.path是判断是否处于某个页面
  if (!flag && to.path !== '/Login') {
    // 4. 如果没登录 进入判断进行跳转
    next('/Login')
  } else {
    // 5. 如果已经登录 直接next()即可
    next()
  }
})
```

![image-20210604171827880](https://i.loli.net/2021/06/05/n5NRQfYb9pK36rZ.png)

## 全局路由导航守卫设置 白名单

> 需求：有一些组件(白名单)，不登录也可以访问到 
>
> 原理: 在可以访问的组件(路由中) 设置 `meta:` 属性自定义属性名 设置为true 然后再路由守卫中判断 满足添加就让其访问
>
> `meta:`是什么: meta作为一个对象属性{}，被定义在routes的{}下，用于进行权限控制。如普通浏览者和已登陆用户可访问的数据信息不同

1. 在路由映射中 白名单组件中添加`meta:`属性自定义属性名为 true

```js
{ path: '/main', component: Main, meta: { keepAlive: true, auth: true } },
```

2. 导航守卫中判断 如果满足就让其访问(true)

```js
router.beforeEach((to, from, next) => {
  // ~ 白名单功实现
  if (to.meta.auth) {
      // next() 不做任何行为 让其访问 
    return next()
  }
})
```

> 总结：基于路由映射的`meta:`配置实现白名单效果。