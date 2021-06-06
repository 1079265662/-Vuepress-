---
title: axios 请求拦截器
date: 2021-05-27
tags:
 - Vue
 - axios
categories:
 -  axios
---

::: tip 介绍
axios 请求拦截器 .interceptors.request.use<br>
:::

<!-- more -->

## 请求拦截器 `.interceptors.request.use`

[axios拦截器官方文档](http://www.axios-js.com/zh-cn/docs/)

>需要把数据 `return`回去

* 请求拦截器的作用是 在发送请求之前 进行一些操作 
  * 在每个请求体里面加上token值 (登录后用户权限信息)

```js
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
// 对求数据 做的一些事情
    return config;
  }, function (error) {
// 请求如果如果错误做的事情
    return Promise.reject(error); // Promise方法 把错误数据 包含为promise对象 并且得到异常数据
  });
```

>`例子` 发送请求前 判断是否登录(有token) 如果登录 携带请求头 发送给服务器

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

* Promise.resolve() Promise方法 把数据包装为promise对象并获得正确结果
* Promise.reject(error); Promise方法 把错误数据 包含为promise对象 并且得到异常数据
