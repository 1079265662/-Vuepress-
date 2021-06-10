---
title: 5. Vue移动端 登录功能完善(中)
date: 2021-06-06
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目

---

::: tip 介绍

Vue登录功能完善 (访问权限功能)<br>
:::

<!-- more -->

## 全局路由导航守卫 `路由文件 index.js`

> 目标：用户没有登录页面 不让其访问 主页 等内容 让其跳转到登录页 <big>(判断token值)</big>

- Vue-router 提供方法 
- 全局导航守卫需要设置在 全局路由组件中 控制某些全局跳转
- 全局导航守卫有三个参数
  - to 表示要跳转到哪里去
  - from 表示从哪里跳转过来的
  - next 表示具体跳转到哪里 如果不调用 无法看到组件
  - <big>注意: </big>必须要设置在路由映射生效之后 导出路由之前

> 全局导航守卫  路由文件夹`router`里面 `index.js`

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

> 总结：
>
> 1. 前置全局导航守卫：拦截所有的路由请求
> 2. 如果登录了，就正常跳转到组件，否则调回到登录组件

### 导航守卫工作流程

![image-20210604171827880](https://i.loli.net/2021/06/05/n5NRQfYb9pK36rZ.png)

## 调用接口获取频道数据 `channel.js`

> 目标：如果用户登录 获取频道列表数据，用于测试请求拦截器和token有效期

* 在`api文件夹 新建 channel.js` 单独路由配置文件下

```js
// 获取频道列表数据，用于测试请求拦截器和token有效期
// 导入封装的接口组件
import request from '../utils/request'
// ? 获取用户的频道数据(如果没有登录，返回默认的频道数据；如果登录了，就返回该用户自己的数据)
export const getAllChannels = () => {
  // ? 携带请求方式 请求地址 获取相应用户的登录频道数据(根据token判断不同用户)
  return request({
    method: 'get',
    url: 'v1_0/user/channels'
  })
}

```

* 调用接口获取频道数据
  * `main文件夹 main.vue`

```vue
// 文件的路径 src/views/main/index.vue
<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  name: 'Home',
  created () {
    getAllChannels()
  }
}
</script>
```

## 设置axios获取数据 .create 分支 `request.js`

* `使用axios.create({})` 设置axios方法分支
  * 设置分支可以单独设置url基础地址 方便管理调用
  * 单独用常量 设置url基础地址 在`axios.create({})`里面和`baseURL`属性名比对 
    * 单独常量设置地址 单独设置地址拼接

```js
// 导入 axios组件
import axios from 'axios'
// 设置基准axios路径 用常量保存
const baseURL = 'http://api-toutiao-web.itheima.net/app/'
// axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)
const instance = axios.create({
  // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)
  baseURL: baseURL
})
// 封装通用的接口调用方法
export default (options) => {
  // 这里的返回值是Promise实例对象
    // return 返回数据 instance是声明的axios分支方法
  return instance({
    // 设置请求方式
    method: options.method || 'GET',
    // 设置请求地址
    url: options.url,
    // POST/PUT请求参数（请求体）
    data: options.data,
    // GET请求参数（自动拼接到url地址中）
    params: options.params,
    // 设置请求头(一般用于跨域问题 和 传输token)
    headers: options.headers
  })
}

```

## 添加请求拦截器 请求头统一携带token `request.js`

>需要把数据 `return回去`

* 请求拦截器的作用是 在发送请求之前 进行一些操作 
  * 在每个请求体里面加上token值 (登录后用户权限信息)

> 发送请求前 判断是否登录(有token) 如果登录 携带请求头 发送给服务器 `utils文件夹 request.js` 路由工具文件下

```js
// 导入 axios组件
import axios from 'axios'
// 设置基准axios路径 用常量保存
const baseURL = 'http://api-toutiao-web.itheima.net/app/'
// axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)
const instance = axios.create({
  // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)
  baseURL: baseURL
})
// 添加一个请求拦截器 (加工前)
// 请求截拦器的作用是再请求发送前 进行一些操作 例如在每个请求体上加上token 获取登录权限后的数据
// config 是数据发送请求的属性
instance.interceptors.request.use(function (config) {
  //! 0.发送请求前 添加响应的token值 获取相应的登录数据
  //! 1. 读取用户存在浏览器的token值 (需要转换成字符串)
  const user = JSON.parse(sessionStorage.getItem('mytoken') || null) //! 如果没有token 赋值为null
  //! 2. 进行判断 如果存在token值 则添加相应的token值(三层判断) 是否存在 老token 新token
  if (user && user.token && user.refresh_token) {
    //! 3. 如果存在token 登录成功 统一添加请求头携带其相应token(携带老token)
    //! config是发送的数据 headers是axios请求头Authorization是后端接口判断token的属性名
    config.headers.Authorization = 'Bearer ' + user.token // 'Bearer '是后端声明的token前置
  }
  return config
}, function (error) {
  // 请求如果出错了可以做一些事情
  return Promise.reject(error)
})
```

## 添加响应拦截器 统一处理axios返回数据 `request.js`

> 需要把数据 `return回去`

* 响应拦截器的作用是数据接收响应后进行一些操作 
  *  <big>续签token</big>
  * 判断refresh_token 是否失效 如果失效 让其重新登录
  * 获取axios数据后进行加工 直接进入 data里面 `return response.data`

> 响应拦截器应用场景：处理服务器返回的数据   `utils文件夹 request.js` 路由工具文件下

* 这样在使用数据时可以少写一层data

```diff
// 导入 axios组件
import axios from 'axios'
// 设置基准axios路径 用常量保存
const baseURL = 'http://api-toutiao-web.itheima.net/app/'
// axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)
const instance = axios.create({
  // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)
  baseURL: baseURL
})
// 添加一个响应拦截器
instance.interceptors.response.use(function (response) {
  // 服务器返回的200范围内的状态码都会触发该函数
  // 针对向应的数据可以做一些处理
  console.log('before response')
+  // 拦截器在返回数据之前，直接获取后端的原始数据，然后再返回
+  return response.data
}, function (error) {
  // 服务器返回的200范围以外的状态码都会触发该函数
  // 针对向应的错误信息可以做一些处理
  return Promise.reject(error)
})

```
