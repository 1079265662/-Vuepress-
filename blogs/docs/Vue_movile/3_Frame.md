---
title: 3. Vue脚手架自定义
date: 2021-06-03
cover: https://i.loli.net/2021/05/30/mnhTAar3tc4gLdK.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目

---

::: tip 介绍

第三步 项目架构<br>
:::

<!-- more -->

## 整体路由配置

> 目标：根据参考图，设计路由规则。

| path         | 功能         | 路由级别 |
| ------------ | ------------ | -------- |
| /login       | 登录组件     | 一级路由 |
| /home        | 首页组件     | 一级路由 |
| /            | 布局组件     | 一级路由 |
| ├─ /main     | 首页内容     | 二级路由 |
| ├─ /question | 问答组件     | 二级路由 |
| ├─ /video    | 视频组件     | 二级路由 |
| ├─ /my       | 个人中心组件 | 二级路由 |

- 实现路由配置 `在router文件夹创建 index.js`路由配置

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import main from '@/views/main/main'
import my from '@/views/my/my'
import question from '@/views/question/question'
import video from '@/views/video/video'
Vue.use(VueRouter)

// 配置路由映射时候 name属性可以给路由的路径起一个别名
// 跳转路由时候 可以使用name跳转 (相当于路径别名)
// this.$router.push('/about') = this.$router.push({name: 'About'})
const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/main',
    children: [
      { path: 'main', component: main },
      { path: 'my', component: my },
      { path: 'question', component: question },
      { path: 'video', component: video }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]
const router = new VueRouter({
  routes
})

export default router
```



## 完成Layout组件

> 目标：实现主页的基本布局 `Home.vue`配置 

- 提供【首页】【 问答】【 视频】【 我的】基础布局，也就是一级路由组件。
- 需要根据地址栏去选中TabBar对应标签，开启路由模式组件内部实现。

```vue
<template>
  <div class="container">
    <!-- 顶部内容 vant组件-->
    <van-nav-bar title="搜索框">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 中间内容 -->
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <!-- 底部内容 vant组件-->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home/main" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/home/video" icon="search">视频</van-tabbar-item>
      <van-tabbar-item to="/home/question" icon="friends-o">问答</van-tabbar-item>
      <van-tabbar-item to="/home/my" icon="setting-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
}
</script>

<style lang="less" scoped>
// scoped 的作用：让这些样式仅仅在当前组件生效，防止组件之间相同的类名冲突
// 本质上是如何做到这件事情的？添加唯一的自定义属性用于属性选择器
// 把页面宽高设置为可视窗口的大小
.container {
  width: 100%;
  height: 100%;
  position: relative;
  // 设置内容显示区域的 wrapper的大小
  .wrapper {
    position: absolute;
    width: 100%;
    bottom: 50px;
    top: 50px;
  }
}
</style>

```

> scoped 的作用：

![image-20210602121826794](https://i.loli.net/2021/06/02/mNGDSeZ5A3Ja2O1.png)

## 配置全局样式

> 目标：配置全局样式 单独配置在styles里面
>
> 文件路径：src/styles/index.less

* 导入到 `main.js`(入口文件)
  * 导入到入口文件时 可以直接导入less文件 但是要加 .less 后缀名 

```js
// 导入全局less(导入less文件 需要加后缀)
import './styles/index.less'
```

* 导入到styles 全局样式

```less
// -----------------------全局样式-----------------------
* {
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
#app{
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  font-size: 14px;
}

// -----------------------覆盖vant(vant组件默认样式)-----------------------
.van-nav-bar {
  background: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__text {
    color: #fff;
    font-size: 12px;
  }
  .van-icon{
    color: #fff;
  }
}
.van-tabbar{
  background: #fdfdfd;
}
.van-nav-bar__text:active{
  background: transparent;
}
```

> 总结: 
>
> 1. 通用样式放到全局样式文件中
> 2. 组件内部样式单独写到组件内部

## 封装通用的接口模块

> 安装axios `npm i axios -S`

> 目标：封装通用的接口调用模块 `utils文件夹里面创建 request.js`

* 调用axios方法 设置基本url路径
* ==return== 返回结果

```js
// 导入 axios组件
import axios from 'axios'
// 设置基准axios路径
axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net/app/'
// 封装通用的接口调用方法
export default (options) => {
  // 这里的返回值是Promise实例对象
    // return 返回数据
  return axios({
    // 设置请求方式
    method: options.method || 'GET',
    // 设置请求地址
    url: options.url,
    // POST/PUT请求参数（请求体）
    data: options.data,
    // GET请求参数（自动拼接到url地址中）
    params: options.params,
    // 设置请求头
    headers: options.headers
  })
}

```

