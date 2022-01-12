---
title: 续签token的流程
date: 2021-05-12
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/vue.jpg
tags:
 - token续签
 - axios
categories:
 -  axios
---

::: tip 介绍

axios插件 自动续签用户的token值<br>
:::

<!-- more -->

## 双token机制 `request.js`

* 第一种是双token `ReFresh_token` 和 `用户token` 当`用户token`过期后 拿`ReFresh_token`去续签 `ReFresh_token`一般有效期是半年 该token不具备任何数据 只是作为续签凭证 如果`ReFresh_token`过期了 就需要重新登录了 这种方式是相对安全的 因为`用户token`时间只有五分钟 
* token续签总流程图

![image-20210605115451235](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/VaQ6uA7POdc8qJv.png)

* token分为两种
  * `token` 普通的token 用于访问需要身份验证的普通接口 获取数据 (一般有效期2小时)
  * `refresh_token` 续签token 如果普通的token失效了 需要用这个续签 如果两者都失效 需要重新登陆(一般有效期为14天)
* token续签 前端流程总结：
  1. 判断token是否失效，如果失效换取新的token（根据refresh_token）
  2. 把新的token覆盖到缓存中
  3. 重新发送请求调用刚才出错的地址
  4. 处理refresh_token失效的情况（失效后跳转到登录页面）
* <big>注意: </big> token续签需要用到 使用`axios.create({})`  不影响其他功能 单独配置续签地址 

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

## 单token机制

* 第二种是企业常用的 单`用户token` 当用户登录的时候 接口会返回一个`token过期时间戳` 前端把时间戳储存session中 每当请求接口的时候 需要电脑当前时间去计算后端返回`token过期时间戳` 如果小于10分钟(或者其他) 就会进行续签操作 替换一个新的`用户token`并且更新`token过期时间戳` 这种方式相对后端来说简单 安全性不如第一种 因为`用户token` 有效期通常为8小时甚至更长 因为后端是不会把过期token续签的 所以时间设置太短的话 用户临时不操作就会过期重新登录

  ![image-20220111163947060](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111163947060.png)

> 后端接口数据需求

* 前端需要给后端传递旧token即可 后端就会返回一个新的token 和 新的过期时间戳

1. 第一步在`utils`文件夹下创建cookie 或者 session方法

![image-20220111170221100](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111170221100.png)

```js
import Cookies from 'js-cookie'
// cookie命名
const TokenKey = 'Admin-Token'
// session命名
const timeKey = 'expireTime'

// 获取cookie
export function getToken () {
  return Cookies.get(TokenKey)
}
// 保存cookie
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
// 移除cookie
export function removeToken () {
  return Cookies.remove(TokenKey)
}
// 清空sessionStorage
export function clearStorage () {
  return sessionStorage.clear()
}
// 设置token过期时间 (保存token过期和当前时间进行比较 低于10分钟(或其他时间)进行续签)
export function setTokenTime (time) {
  return sessionStorage.setItem(timeKey, time)
}
// 重置token过期时间 (清空token不需要设置为'' 或者null 防止无法判断 需要设置为0或-1)
export function removeTokenTime () {
  return sessionStorage.setItem(timeKey, 0)
}
// 获取储存的token的时间
export function getTokenTime () {
  return sessionStorage.getItem(timeKey)
}
```

2. 第二步创建一个续签token的api接口 `api`文件夹

> 续签token的数据结构

续签token的数据结构: [续签token的数据结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E7%BB%AD%E7%AD%BEtoken%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.json)

```js
// token续签
export async function refreshTokenApi (parm) {
  return await http.post('/api/sysUser/refreshToken', parm)
}
```

3. 第三步在axios二次封装下的截器去实现token的续签 
   * <font color =#ff3040>注意: token续签的处理需要写在添加请求头的上面(把token塞到请求头里) 因为我们在续签后就已经处理了</font>

```js
import axios from 'axios'
// 导入vuex
import store from '@/store'
// 处理token和cookie
import { getToken, getTokenTime, setTokenTime, removeTokenTime, setToken, clearStorage, removeToken } from '@/utils/auth'
import { refreshTokenApi } from '@/api/user'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
 // timeout: 5000 // request timeout
})
//! --------------------处理token续签
// token续签方法
function reFresh () {
  // 声明一个变量 储存当前token 作为替换凭证
  const parm = {
    'token': getToken()
  }
  // 向接口请求一个新的token
  return refreshTokenApi(parm).then(res => {
    return res
  })
  // 这里其实可以简写
  //  return refreshTokenApi(parm).then(res => res)
}
//! 处理token续签
// 定义一个状态位 防止多次获取 无需每个接口都请求
let isReFresh = false

// request interceptor
// 发送请求之前的拦截器
service.interceptors.request.use(
  config => {
    //! 处理token续签
    // 获取当前系统时间戳
    const curent = new Date().getTime()
    // 获取缓存中的时间戳
    const expireTime = getTokenTime()
    // 如果缓存中的时间戳存在
    if (expireTime > 0) {
      const minMx = (expireTime - curent) / 1000 / 60 // 毫秒计算
      // 判断token时间是否小于十分钟 小于十分钟进行token续签操作
      if (minMx < 10) {
        // 判断状态位 为false执行 防止多次请求token续签接口
        if (!isReFresh) {
          isReFresh = true
          // 返回操作 不再执行以下拦截器操作 防止报错
          return reFresh().then(res => {
            // 判断是否请求成功
            if (res.code == 200) {
              // 设置新的token
              setToken(res.data.token)
              // 设置新的时间戳
              setTokenTime(res.data.expireTime)
              // 把新的token添加到头部 实现正常获取数据
              config.headers['token'] = getToken()
            }
            // 返回config 正常获取接口数据
            return config
          }).catch(res => {
            // 如果续签失败进行处理(没有)
            console.log(res)
          }).finally(res => {
            // 无论是否获取成功或者失败 都需要把状态位重置
            isReFresh = false
          })
        }
      }
    }

    // do something before request is sent
    // 从store里面获取token，如果token存在，
    // 把token添加到请求的头部Headers里面
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // 把token添加到请求的头部
      //! config是发送的数据 headers是axios请求头 Authorization是后端接口判断token的属性名
        config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


```

