---
title: axios封装通用的api接口方法
date: 2022-01-13
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-o37o8l.jpg
tags:
 - Vue
 - axios
categories:
 -  axios
sticky: 2
---

::: tip 介绍
二次封装axios 实现api接口直接调用<br>
:::

<!-- more -->

## 封装通用的接口模块

安装axios `npm i axios -S`

* 路由配置分为三个阶段

  1. 配置通用axios封装组件
     * 通常配置 `axios.create({})` 分支设置url基础地址 方便操控

  ```js
  // 导入 axios组件
  import axios from 'axios'
  // 设置基准axios路径 用常量保存
  export const baseURL = 'http://api-toutiao-web.itheima.net/app/'
  // axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)
  const instance = axios.create({
    // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)
    baseURL: baseURL,
    // 设置响应超时 建议不设置 或者设置时间较长 会影响一些较大的文件下载
    // timeout: 10000
  })
  ```

  2. 调用接口时候 调用一级接口组件 单独设置api接口组件

  3. 在需要调用接口的Vue文件 导入api接口

> <big>一、</big>utils文件夹 一级路由 axios接口模块设置  `utils文件夹里面创建 request.js`

![11](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/l4R3Z1oLAGnmx6X.png)

- 配置 `axios.create({})` 分支设置url基础地址 方便操控
- 调用axios方法 设置基本url路径 设置参数 配置数据
  - 设置属性:  method(请求方式) , url(地址) , data(请求体) , params(请求方式参数) , headers(请求头)
    -  data(请求体) , params(请求方式参数) 可以通过es6的动态属性名(键) 来实现动态切换
  -  <font color =#ff3040>注意: 接口的url地址也是 http和https标准协议时候 那么axios基准路径不会拼接 会直接调用</font> 
- return 返回结果
- 设置axios的 请求拦截器`response.use()` 和 响应拦截器`response.use()`
- `transformRequest`是axios请求处理(比拦截器还早) 通常会把数据转换为json格式 并且在headers(请求头)中做一些处理
- `paramsSerializer`是处理你向后端传递的数据 是一个负责向后端传递数据时序列化的函数 通常搭配qs把前端传递的数组序列化

```js
  // 导入qs序列化
  import qs from 'qs'
  //! qs序列化的用法
   qs.stringify({ids: [1, 2, 3]}, { indices: false })
  // 转换形式： ids=1 ids=2 id=3
   qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'indices'})
  // 转换形式： ids[0]=1 ids[1]=2 ids[2]=3
   qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'brackets'})
  // 转换形式：ids[]=1 ids[]=2 ids[]=3
   qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'repeat'})
  // 转换形式： ids=1 ids=2 id=3
```

> 目标: 封装通用的接口调用模块
>
> 作用: 配置通用的`axios`接口模块 方便统一修改 统一配置 统一更换 减低耦合
>
> <font color =#ff3040>注意: 封装分为 携带token请求头的通用封装 和 携带token还需要其他请求头参数的特殊封装</font>

```js
// 封装通用的接口调用模块
// 导入axios组件
import axios from 'axios'
// 导入Vuex 实例化
import store from '@/store'
// 获取toekn
import { getToken } from '@/utils/auth'
// 导入Vue router 实例化
import router from '@/router'
// 导入序列化函数
import qs from 'qs'

// 请求的基准路径 常量保存并且支持导出
export const baseURL = ''
// 更规范的调用 通过process.env调用
// const baseURL = process.env.VUE_APP_BASE_API

// 创建独立的axios的实例
const instance = axios.create({
  // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)
  baseURL: baseURL
  // 设置响应超时 建议不设置 或者设置时间较长 会影响一些较大的文件下载
  // timeout: 5000
})

// 请求拦截器 (发送数据前的加工数据)
instance.interceptors.request.use((config) => { // config是发送的数据
  console.log(config)
  // 特殊处理headers传值（内容类型）
  // 判断Vuex中是否有token，如果有就添加到请求头
  const token = store.getters.token
  // 如果存在token 把token存入headers请求头中
  if (token) {
    //! config是发送的数据 headers是axios请求头
    config.headers['token'] = getToken()
    // 也可以这样写
    // config.headers.token= getToken()
  }
  // 返回处理后的数据
  return config
}, (err) => {
   // 提示网络错误 可以拦截到网络错误 接口报错
  Message.error($t.login.errorWeb)
  // 如果请求拦截器错误 返回打印错误信息
  return Promise.reject(err)
})

// 响应拦截器 (处理后端返回的数据)
instance.interceptors.response.use((response) => {
   // 这里可以判断token是否失效 然后进行处理操作
  // 去除axios自带的一层data
  return response.data
}, (err) => {
  // 处理token的过期操作
  if (err.response && err.response.status === 401) {
    // ---------------------- 应该续签token 但是后端没做(按需设置)
      
    // 进行清除操作
    // 刷新跳转
    window.location.href = '/login'
  }
   // 提示网络错误 可以拦截到网络错误 接口报错
  Message.error($t.login.errorWeb)
  // 打印响应拦截器的错误信息
  return Promise.reject(err)
})

//! 这里是只携带token请求头的通用封装
// 封装一个通用的请求方法
export default (options) => {
  // 这里的返回值是Promise实例对象
  // return 返回数据 instance是声明的axios分支方法
  return instance({
    // 如果没有传递请求方式，默认是使用get请求
    method: options.method || 'GET',
    // 设置请求地址
    url: options.url,
    // 动态判断请求的方式(es6规则: 对象的键可以是动态的变量)
    // 如果不是data请求 那么就赋值params请求
    // api掉接口的时候 传递数据的属性名(键) 全部为data:{} (不管是那种方式)
    [options.method.toUpperCase() === 'GET' ? 'params' : 'data']: options.data, // toUpperCase转换为大写(请求为小写也可)
    // 设置请求头(一般用于跨域问题 和 传输token)
   // headers: options.headers // 不建议覆盖之前的headers 会出现问题 建议单独处理具备其他请求头的接口
  })
}

//! 这里是不光携带token还需要其他请求头参数的特殊封装
// 名称要和api接口名称一致
const http = {
    
  //! 这里是特殊的post请求 通常需要携带参数
  // transformRequest是axios请求处理(拦截器还早) 允许在向服务器发送前，修改请求数据
  // 这里是只能提交json数据 需要在请求头数据类型中设置类型为json
  postToken (url, params) {
    return instance.post(url, params, {
      transformRequest: [(params) => {
        return JSON.stringify(params)
      }],
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  //! 这里是post请求不需要携带参数
  // 如果不需要参数 需要把参数2设置为null
  postNo (url) {
    return instance.post(url, null, {
      transformRequest: [(params) => {
        return JSON.stringify(params)
      }],
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  //! 这里是获取arraybuffer类型的二进制数据 适用于验证码图片的获取 需要指定responseType类型
  // 他没有没有参数 在post请求时候参数需要写null 因为其不携带参数 否则无法转换
  getImage (url) {
    return instance.post(url, null, {
      responseType: 'arraybuffer'
    })
  },

  //! 这里是特殊的get请求 通常特殊处理的get请求需要携带参数 比如通过qs来实现序列化的函数
  // paramsSerializer是处理你向后端传递的数据 是一个负责向后端传递数据时序列化的函数
  qsToken (url, params) {
    return instance.get(url, {
      params: params,
      paramsSerializer: (params) => {
        // 通过qs处理序列化函数
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })
  }

  //! qs序列化的用法
  // qs.stringify({ids: [1, 2, 3]}, { indices: false })
  // 转换形式： ids=1 ids=2 id=3
  // qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'indices'})
  // 转换形式： ids[0]=1 ids[1]=2 ids[2]=3
  // qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'brackets'})
  // 转换形式：ids[]=1 ids[]=2 ids[]=3
  // qs.stringify({ids: [1, 2, 3]}, {arrayFormat: 'repeat'})
  // 转换形式： ids=1 ids=2 id=3
}

// 命名导出
export { http }
```

> <big>二、</big>api文件夹 二级路由 指定接口设置示例(登录二级接口) `api文件夹创建 二级路由模块(接口)`

![image-20210604084917295](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/rVzQ9DwZpHEboj6.png)

* 设置命名导出(不是默认导出) 按需配置参数 
* <font color =#ff3040>注意: 接口的url地址也是 http和https标准协议时候 那么axios基准路径不会拼接 会直接调用</font> 
* return返回数据

> 目标: 封装单独的登录接口文件 
>
> 作用: 接口文件 单独控制 方便修改 降低耦合度 便于维护
>
> <font color =#ff3040>注意: 分为 携带token请求头的通用接口 和 携带token还需要其他请求头参数的特殊接口</font>

```js
//! 这里是只携带token请求头通用接口
import request from '@/utils/request'
//! 这里是不光携带token还需要其他参数的特殊接口
import { http } from '@/utils/request'

//! 通用接口请求示例
// get请求
export function login (data) {
  return request({
    method: 'get',
    url: 'public/index.php/login/login/todata',
    data
  })
}
// post请求
export function loginOut (data) {
  return request({
    method: 'post',
    url: 'public/index.php/login/login/todata',
    data
  })
}

//! 特殊接口的api封装 必须和一次封装名称一致
// 携带参数的post请求 
export async function postToken (parm) {
  return await http.postToken('public/index.php/custequip/authrule/index/index', parm)
}
// 不需要携带参数的post请求
export async function postNo () {
  return await http.postNo('public/index.php/custequip/authrule/index/index')
}

// 不需要携带参数arraybuffer类型二进制数据的post请求
export async function getImage () {
  return await http.getImage('public/index.php/custequip/authrule/index/index')
}
// 序列化传参的get接口
export async function qsToken (parm) {
  return await http.qsToken('public/index.php/custequip/authrule/index/index', parm)
}

```

> <big>三、</big>Vue文件引入二次封装的api接口

* 在页面调用二次封装的api接口

```js
import { postToken, postNo, getImage, qsToken } from '@/api/user'

// 通用接口请求我们就不操作了

// 特殊接口的api封装请求
// 携带参数的post请求
    async demo () {
      const res = await postToken({
        // 传递参数
        limt: 1
      })
    }
// 不需要携带参数的post请求
    async demo () {
      const res = await postNo({
      })
      console.log(res)
    }
// 不需要携带参数的post的arraybuffer类型的二进制数据
    async demo () {
      const res = await getImage({
      })
      console.log(res)
    }
// 序列化传参的get接口
    async demo () {
      const res = await qsToken({
        limt: [1, 2, 3] // 序列化后 limt: 1 limt: 2 limt: 3
      })
      console.log(res)
    }
```

## 关于基准路径的配置

> 注意：`.env.development`和`.env.production` 文件用于配置开发环境和生产环境的基准url地址

- .env.development 开发环境 (测试)
- .env.production 生产环境 (正式)
- `#` 是注释的意思 

> .env.development 开发环境 配置文件 

* 如果只添加结尾数据 默认拼接localhost:

```bash
# just a flag
ENV = 'development'

# base api
VUE_APP_BASE_API = 'https://miningrenewapi-qa.lshmnc.com.cn/'
VUE_APP_BASE_API = 'http://localhost:8089/'

```

> axios封装通用的接口模块 `utils文件夹 request.js`

```js
// 创建一个axios实例对象
const instance = axios.create({
  // 基准路径 通过 开发环境 和 生产环境 文件进行配置(开发和生产单独设置 方便区分 脚手架方法需要重启)
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: baseURL,
  // 超时,如果超过10秒，后端没有返回数据，那么就报错
  timeout: 10000
})
```

> 总结：为了灵活配置接口的基准路径，可以基于配置文件的方式，在开发和生产环境分别切换到不同的地址。这种方式好处就是代码在开发和上线时修改比较容易

