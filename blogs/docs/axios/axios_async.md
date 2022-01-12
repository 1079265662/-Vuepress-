---
title: async 同步获取axios数据
date: 2021-05-26
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-y8kdvd.jpg
tags:
 - Vue
 - axios
categories:
 -  axios
---

::: tip 介绍
async 同步获取axios数据<br>
:::

<!-- more -->

## async 同步获取axios数据

> 实现登录基本功能分为两步: 

1. 在api文件夹创建单独控制登录页面的 js文件 ` api文件夹 创建 login.js`
2. 在` Login.vue`文件里面调入Login登录路由配置 验证登录 
3. `native-type="submit" / button` submit提交表单并且可以跳转 button提交表单但会阻止跳转(Vant提供的方法)

#### 创建单独控制登录页api` request.js`

* 调用通用的接口模块 `utils文件夹 request.js`
* 创建命名导出 `Login.vue`接收js文件
* 配置登录axios 实现登录验证
* 需要设置`return`让数据返回

```js
// Login业务模块，专门负责调用接口
// 导入配置的axios通用的接口模块
import request from '../utils/request'
// 配置登录axios 实现登录验证
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



> 目标：创建单独控制登录页的api 链接通用的接口模块`index,js` 再导入登录主页 ` api文件夹 创建 login.js`

- 表单数据绑定：v-model双向数据绑定
- 提交按钮事件绑定：绑定点击事件
- 调用接口-业务方法封装
- 用于单独控制登录页面的接口调用

#### 登录页面验证登录 ` Login.vue`

> 数据绑定 `template`

* 表单数据绑定：v-model双向数据绑定
* 提交按钮事件绑定：绑定点击事件

> 数据验证 `script`

* 用try{}catch{}语法 验证数据是否正确 catch{}提示用户登录失败
  * 需要进行输入效验 判断token值是否获取 和 服务器返回值 ` if (ret.status === 201)`和`if (ret.data.data.token) `
* 如果用户登录成功 需要缓存其token值`sessionStorage.setItem('保存名称', JSON.stringify(获取的token路径))`
  * axios自带data token在data.data里面`sessionStorage.setItem('mytoken', JSON.stringify(ret.data.data))`
* 如果全局引入 Vant 可以用 `this.$toast('登录失败')`来调用Vant的提示插件

```vue
<script>
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
            // 9. 登录成功 跳转到主页
            this.$router.push('/home')
          }
        }
      } catch (error) {
        // 登录失败时候会进入 catch 参数是错误信息
        console.log(error)
        // 10. 提示用户登录失败 $toast是Vant提供的模板
        this.$toast('登录失败')
      }
    }
  }
}
</script>
```

> 总结：绑定表单数据；绑定提交事件；调用接口；跳转页面。

![image-20210602161633614](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/ApcZa8H4L6sDCxO.png)

> 总结：封装的好处
>
> 1. 降低模块之间的耦合性（联系），方便后续的维护和扩展
> 2. 代码的逻辑结构比较清晰（单一职责）
