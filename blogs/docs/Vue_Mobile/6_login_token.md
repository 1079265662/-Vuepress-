---
title: 6. Vue移动端 登录功能完善(下)
date: 2021-06-07
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目

---

::: tip 介绍

Vue登录功能完善 (token续签)<br>
:::

<!-- more -->



## 响应式拦截器 续签token问题 `request.js`

* token续签需要用到 axios提供的 响应式截拦器`.interceptors.response.use()`
* token续签总流程图

![image-20210605115451235](https://i.loli.net/2021/06/06/VaQ6uA7POdc8qJv.png)

* token分为两种
  * `token` 普通的token 用于访问需要身份验证的普通接口 获取数据 (一般有效期2小时)
  * `refresh_token` 续签token 如果普通的token失效了 需要用这个续签 如果两者都失效 需要重新登陆(一般有效期为14天)
* token续签 前端流程总结：
  1. 判断token是否失效，如果失效换取新的token（根据refresh_token）
  2. 把新的token覆盖到缓存中
  3. 重新发送请求调用刚才出错的地址
  4. 处理refresh_token失效的情况（失效后跳转到登录页面）
* <big>注意: </big> token续签需要用到 使用`axios.create({})`  不影响其他功能  单独配置续签地址 

> 续签token代码 `utils文件夹 request.js` 路由工具文件下  引入在 单独配置登录`api文件下`的`login.js` 

* //~ 注释为 token续签过程注释

```js
//~ 导入 axios组件
import axios from 'axios'
//~ 导入 router组件 调用跳转方法
import router from '../router/index'
// ~ 目标: (1) 续签token (2) 如果refresh_token失效 就认为登录过期 需要重新登录 try{} catch{}
// ~ 双token机制 :
// ~ 一个 token为获取数据token(保质期短 需要续签)
// ~ 一个是配合续签的token(不支持获取数据 只能续签 保质期长)
// ~ 1. 续签token 设置axios.create({}) 设置axios分支
// ~ axios.create({})分支可以设置多个基础url地址
// ~ 2. 声明一个通用的url基础地址 用于申请token的基础路径 用常量保存
const baseURL = 'http://api-toutiao-web.itheima.net/app/'
// ~ 3. axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)
const instance = axios.create({
  // ~ baseURL是axios属性 用来声明url基础路径
  baseURL: baseURL
})
// 封装通用的接口调用方法
export default (options) => {
  // 这里的返回值是Promise实例对象
  return instance({
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
// 添加响应拦截器 (加工后)
// 响应截拦器是接收到数据 进行一些操作
// 请求结果返回后，先不直接导出，而是先对响应码等等进行处理，处理好后再导出给页面
// response获取的是 axios处理后的数据
// ?  1.常用于清除axios自带data 方便操作
instance.interceptors.response.use(function (response) { // 获取数据成功时候
  // 当获取数据成功时候 直接进入axios里的data
  return response.data
}, async function (error) { // ~ 4. 通常要用async函数还获取新token值(省去then步骤)
  // ~ 开始进行续签token
  // ~ 5. 判断token是否失效 错误参数是error
  // ~ error里面参数response里面status是服务器返回值401(401无权限访问)
  if (error.response.status === 401) {
    // ~ 6. 如果refresh_token 是有效的 续签token
    try {
      // ~ 7. 如果token失效了 申请一个新的token(根据 refresh_token)
    // ~ 8. 调用浏览器储存的token (主要用 refresh_token)
      const user = JSON.parse(sessionStorage.getItem('mytoken') || null)
      // ~ 9. 调用接口 用refresh_token 跟服务器比对 如果成功 续签token
      const info = await axios({
      // ~ 10. 设置续签token的请求方式 (put请求方式 替换修改的所有数据)
        method: 'put',
        // ~ 11. 设置续签token的地址 基础url+token地址
        url: baseURL + 'v1_0/authorizations',
        headers: {
        // ~ 12. 设置请求头 携带refresh_token 和服务器进行比对 如果成功 续签新token
          Authorization: 'Bearer ' + user.refresh_token
        }
      })
      // ~ 13. 获取最新的token数据 覆盖user里面的原先的失效token (在data.data里面的token)
      user.token = info.data.data.token
      // ~ 14. 在浏览器中缓存中保存新获取的token值
      sessionStorage.setItem('mytoken', JSON.stringify(user))
      // ~ 15. 重新调用刚才接口 用新token访问服务器 实现续签成功
      // ~ error是返回错误值的参数 config是错误参数中的属性名 里面包含url地址 请求方式等 相当于重新请求服务器
      return instance(error.config) // ~ return 如果数据正确就返回去 不打印下面打印信息
      // ~ 16. 如果refresh_token失效 让其重新登录 账号获取新的refresh_token (状态码403)
    } catch (error) {
      // ~ 17. refresh_token失效 让其返回登录页面(需要调用router 组件 利用router方法跳转)
      return router.push('/login') // ~ 让其跳转到首页 return返回数据 不让其执行下面错误提示
    }
  }
  return Promise.reject(error)
})
```

