---
title: axios封装通用的接口模块
date: 2021-05-25
tags:
 - Vue
 - axios
categories:
 -  axios
sticky: 2
---

::: tip 介绍
一级接口组件 二级接口组件 二级接口组件 获取数据<br>
:::

<!-- more -->

## 封装通用的接口模块

安装axios `npm i axios -S`

* 路由配置分为三个阶段
  * 1. 配置axios通用接口文件 (一级接口组件)
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
    // 超时,如果超过10秒，后端没有返回数据，那么就报错
    // timeout: 10000
  })
  ```

  * 调用接口时候 调用一级接口组件 单独设置接口文件 (二级接口组件)
  * 在需要调用接口的Vue文件引入二级接口组件 (导入二级接口)

> <big>一、</big>utils文件夹 一级路由 axios接口模块设置  `utils文件夹里面创建 request.js`

![11](https://i.loli.net/2021/06/04/l4R3Z1oLAGnmx6X.png)

- 配置 `axios.create({})` 分支设置url基础地址 方便操控
- 调用axios方法 设置基本url路径 设置参数 配置数据
  - 设置属性:  method(请求方式) , url(地址) , data(请求体) , params(请求方式参数) , headers(请求头)
    -  data(请求体) , params(请求方式参数) 可以通过es6的动态属性名(键) 来实现动态切换
  -  接口的url地址也是 http和https标准协议时候 那么axios基准路径不会拼接
- return 返回结果
- 设置axios的 请求拦截器 和 响应拦截器

> 目标: 封装通用的接口调用模块
>
> 作用: 配置通用的`axios`接口模块 方便统一修改 统一配置 统一更换 减低耦合

```js
// 封装通用的接口调用模块
// 导入axios组件
import axios from 'axios'
// 导入Vuex 实例化
import store from '@/store'
// 导入Vue router 实例化
import router from '@/router'

// 请求的基准路径 常量保存并且支持导出
export const baseURL = ''

// 创建独立的axios的实例
const instance = axios.create({
  // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)
  baseURL: baseURL
  // 设置响应超时
  // timeout: 5000
})

// 请求拦截器 (发送数据前的加工数据)
instance.interceptors.request.use((config) => { // config是发送的数据
  // 判断Vuex中是否有token，如果有就添加到请求头
  const token = store.state.user.profile.token
  // 如果存在token 把token存入headers请求头中
  if (token) {
    //! config是发送的数据 headers是axios请求头 Authorization是后端接口判断token的属性名
    config.headers.Authorization = 'Bearer ' + token
  }
  // 返回处理后的数据
  return config
}, (err) => {
  // 如果请求拦截器错误 返回打印错误信息
  return Promise.reject(err)
})

// 响应拦截器 (处理后端返回的数据)
instance.interceptors.response.use((response) => {
  // 去除axios自带的一层data
  return response.data
}, (err) => {
  // 处理token的过期操作
  if (err.response && err.response.status === 401) {
    // ---------------------- 应该续签token 但是后端没做(按需设置)
    // token过期了，清空过期的用户信息，跳转到登录页面
    store.commit('user/updateUserInfo', {})
    // 跳转到登录页
    router.push('/login')
  }
  // 打印响应拦截器的错误信息
  return Promise.reject(err)
})

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
    [options.method.toUpperCase() === 'GET' ? 'params' : 'data']: options.data, // toUpperCase转换为大写(请求是小写也可以)
    // 设置请求头(一般用于跨域问题 和 传输token)
    headers: options.headers
    // 请求方式 ------------------------------------------------------
    // data用于传递请求体数据（POST/PUT/DELETE）
    // data: options.data,
    // params用于传递get请求数据（查询字符串）
    // params: options.data
  })
}

// --------------------------------- api接口上传数据模拟
// 所有的请求方式 上传数据的对象都设置为data:{} (在通用的请求方法中已配置)
// -------------- post请求方式
// return request({
//   method: 'post',
//   url: '#',
//   data: {
//     uname: 'lisi',
//     pwd: '123'
//   }
// })
// -------------- get 请求方式
// return request({
//   method: 'get',
//   url: '#',
//   data: {
//     uname: 'lisi',
//     pwd: '123'
//   }
// })

```

> <big>二、</big>api文件夹 二级路由 指定接口设置示例(登录二级接口) `api文件夹创建 二级路由模块(接口)`

![image-20210604084917295](https://i.loli.net/2021/06/04/rVzQ9DwZpHEboj6.png)

* 设置命名导出(不是默认导出) 按需配置参数 
* 接口的url地址也是 http和https标准协议时候 那么axios基准路径不会拼接
* return返回数据

> 目标: 封装单独的登录接口文件 
>
> 作用: 接口文件 单独控制 方便修改 降低耦合度 便于维护

```js
// Login业务模块，专门负责调用接口
// 导入配置的axios组件
import request from '../utils/request'
// 使用导入axios组件 实现登录功
// 使用命名导出
// 需要设置形参 获取页面的数据 传给axios组件
export const login = (mobile, code) => {
  // 返回数据设置 return
  return request({
    method: 'POST',
    // 接口的url地址也是 http和https标准协议时候 那么axios基准路径不会拼接
    url: 'v1_0/authorizations',
    data: { // 跟服务器比对数据
      mobile,
      code
    }
  })
}
```

> <big>三、</big>Vue文件引入配置路由(登录组件)

* 命名方法 导入登录组件  (导入二级接口)
* try{}catch{}方法 配合async 获取数据 正确登入 错误提示用户
  * try{}是获取正确数据(用于成功登录) catch{}是获取错误信息(用户提示用户)
    * 类似于 if else方法

> 目标: 导入命名导出的 二级路由接口 获取数据 
>
> 作用: 判断用户是否登录成功 登录成功转到相应界面 登录失败提示用户

```js
// 1. 传入 login axios 组件 login是登录验证axios命名方法名称
import { login } from '../api/login'
export default {
  // 2. 设置 用户输入数据的储存
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 3. 创建数据验证方法
    async getLogin () {
      // 4. 用try catch 来判断 数据是否接收成功 提示用户
      try { // 给服务器发送信息
        // 5. 传入用户输入的数值 login是封装的axios登录验证方法名称
        const ret = await login(this.mobile, this.code)
        // 6. 进行判断 获取数据 如果获取成功 保存后端返回的 token值 不成功提示用户
        if (ret.status === 201) {
          // 7. 再进行判断 如果用户获取到后端的token 再让其登录
          if (ret.data.data.token && ret.data.data.refresh_token) {
            // 8. 保存token值(服务器缓存)
            // sessionStorage.setItem('保存名称', JSON.stringify(获取的token路径)); 保存token到服务器缓存
            // JSON.stringif()把获取的token转换成字符串
            sessionStorage.setItem('mytoken', JSON.stringify(ret.data.data))
            this.$router.push('/home')
          }
        }
      } catch (error) {
        // 登录失败时候会进入 catch 参数是错误信息
        console.log(error)
        // 9. 提示用户登录失败 $toast是Vant提供的模板
        this.$toast('登录失败')
      }
    }
  }
}
```

## 关于基准路径的配置

> 注意：`.env.development`和`.env.production` 文件用于配置开发环境和生产环境的基准url地址

- .env.development 开发环境
- .env.production 生产环境
- `#` 是注释的意思 

> .env.development 开发环境 配置文件 

* 如果只添加结尾数据 默认拼接localhost:

```bash
# just a flag
ENV = 'development'

# base api
# VUE_APP_BASE_API = 'http://ihrm-java.itheima.net/api/'
VUE_APP_BASE_API = '/api/'

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

