---
title: Vue接口模块设置步骤
date: 2021-6-4 
tags:
 - Vue
 - axios
categories:
 -  axios
autoIgnore: true
subSidebar: false
---

::: tip 介绍
一级接口组件、二级接口组件、引入二级接口组件<br>
:::

<!-- more -->

## 封装通用的接口模块

安装axios `npm i axios -S`

* 路由配置分为三个阶段
  * 1. 配置axios通用接口文件 (一级接口组件)
  * 2. 调用接口时候 调用一级接口组件 单独设置接口文件 (二级接口组件)
  * 3. 在需要调用接口的Vue文件引入二级接口组件 (导入二级接口)

> <big>一、</big>utils文件夹 一级路由 axios接口模块设置  `utils文件夹里面创建 request.js`

![11](https://i.loli.net/2021/06/04/l4R3Z1oLAGnmx6X.png)

- 调用axios方法 设置基本url路径 设置参数 配置数据
  - 设置属性:  method(请求方式) , url(地址) , data(请求体) , params(请求方式参数) , headers(请求头)
- return 返回结果

> 目标: 封装通用的接口调用模块
>
> 作用: 配置通用的`axios`接口模块 方便统一修改 统一配置 统一更换 减低耦合

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
    // 设置请求方式 左边是固定属性名 右边是数据
    method: options.method || 'GET', // 默认设置为'GET' 请求方式
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

> <big>二、</big>api文件夹 二级路由 指定接口设置示例(登录二级接口) `api文件夹创建 二级路由模块(接口)`

![image-20210604084917295](https://i.loli.net/2021/06/04/rVzQ9DwZpHEboj6.png)

* 设置命名导出(不是默认导出) 按需配置参数 
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

