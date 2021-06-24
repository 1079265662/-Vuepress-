---
title: 2. OV系统 登录模块
date: 2021-07-02
cover: https://tva2.sinaimg.cn/large/005INI3Xly8grslmb2p7gj31hc0u0h58.jpg
tags:
 - Vue
categories: Vue OV系统
---

::: tip 介绍
Vue OV系统登录模块设置<br>
:::

<!-- more -->

## 登录页面基本布局 `login文件夹 index.js`

> **`目标`**完成登录页面的基础布局

- 基本布局

```vue
<!-- 放置标题图片 @是设置的src目录别名-->
<div class="title-container">
  <h3 class="title">
    <img src="@/assets/common/login-logo.png" alt="">
  </h3>
</div>
```

- 样式处理

```css
/* reset element-ui css */
.login-container {
  // 设置背景图片
  background-image: url('~@/assets/common/login.jpg'); 
  // 将图片位置设置为充满整个屏幕
  background-position: center; 
}
```

> **`注意`**： 如需要在样式表中使用**`@`**别名的时候，需要在@前面加上一个**`~`**符号，否则不识别 `../`不需要加 `~`

- 设置手机号和密码的字体颜色

```scss
// 修改输入框字体颜色
$light_gray: #407ffe; 
```

- 设置输入表单整体背景色

```css
.el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.9); // 输入登录表单的背景色
  border-radius: 5px;
  color: #454545;
}
```

- 设置错误信息的颜色

```css
.el-form-item__error {
  color: #fff;
  font-size: 14px;
}
```

- 设置登录按钮的样式

```css
.login-btn {
  background: #407ffe;
  height: 64px;
  line-height: 32px;
  font-size: 24px;
}
```

> 需要给el-button 增加一个login-btn的class样式

- 修改显示的提示文本和登录文本

```vue
<div class="tips">
  <span style="margin-right:20px;">账号: 13800000002</span>
  <span> 密码: 123456</span>
</div>
```

> 总结：跳转登录页面的布局样式

## 登录表单的校验 `login文件夹 index.js`

[饿了么ui自定义表单验证](https://element.eleme.cn/#/zh-CN/component/form#form-biao-dan)  [async-validator表单验证](https://github.com/yiminghe/async-validator)

> **`目标`**对登录表单进行规则校验
>
> 基础模板已经有了基础校验的代码,我们只需在此基础上修改即可

- el-form表单校验的必要条件
  - el-form标签上面绑定model和rules熟悉
  - el-form-item标签上绑定prop熟悉，值是要验证的表单的输入域的name
  - el-input上面要双向绑定输入域的name
  - 饿了么ui 是自定义表单验证 使用的是 [async-validator](https://github.com/yiminghe/async-validator) 插件 (设置在 登录按钮上)
    - 自定义规则单独写在一个文件里 导入到登录页` utils文件夹 validate.js`

![image-20210216125719740](https://i.loli.net/2021/06/22/fOyCbNpdsomM9ew.png)

- 登录表单验证 `login文件夹 index.js`
  - 饿了么ui 是自定义表单验证 使用的是 [async-validator](https://github.com/yiminghe/async-validator) 插件 (设置在 登录按钮上)
  - 表单自定义验证 单独导入的表单验证方法  `utils文件夹 validate.js`
    - 手机号必填，并且进行格式校验
    - 密码必填，长度6-16位之间
  - 登录按钮的效验 
    - 如果输入的效验不通过 那么点击登录时候不上传服务器 并且提示用户 

```vue
<script>
// 导入表单验证js文件
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data () {
    // 自定义表单规则 验证用户名 是否正确 rule是规则设置(这里的规则是导入文件) value是输入用户名 callback是返回的提示信息 使用的是 async-validator插件
    const validateUsername = (rule, value, callback) => { // 使用导入表单验证的js文件
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => { // 使用导入表单验证的js文件
      if (value.length < 6) {
        callback(new Error('密码长度不可以小于六位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        // required是必填选项 trigger触发条件 validator自定义效验规则 自定义一个验证规则
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
// 设置登录按钮的效验
    handleLogin () {
      // 点击登录按钮的时候 触发表单验证
      // validate表单效验插件() $refs操作sel-form组件实例实现验证 通过this.$refs.名称 访问组件实例
      this.$refs.loginForm.validate(valid => {
        // 防止用户不输入内容 点击登录 先服务器提交数据
        // 如果通过效验(true) 就像服务器提交数据
        if (valid) {
          console.log('表单验证通过')
        } else {
          // 如果表单不通过 提示 不提交服务器
          console.log('表单验证不通过')
        }
      })
    }
  }
}
</script>
```

* 效验规则的js文件 `utils文件夹 validate.js`

```js
/**
 * Created by PanJiaChen on 16/11/18.
 */

// -------------------------- 表单验证功能
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  // 设置手机号正则表达式
  const valid_map = /^1[34578]\d{9}$/
  // 设置正则表达式检测 trim()去除用户输入的两侧空格 再进行效验
  return valid_map.test(str.trim())
}
```

> 总结：遵循ElementUI的表单验证规则；自定义验证规则要熟悉

## 登录基本功能  `login文件夹 index.js`

[饿了么ui表单](https://element.eleme.cn/#/zh-CN/component/form#form-biao-dan)

 [表单验证validate](https://github.com/yiminghe/async-validator)

[第三方包js-cookie](https://www.npmjs.com/package/js-cookie)

> **`目标`** 实现基本的登录功能 
>
> `插件` [饿了么ui表单](https://element.eleme.cn/#/zh-CN/component/form#form-biao-dan)  [表单验证validate](https://github.com/yiminghe/async-validator)  [第三方包js-cookie](https://www.npmjs.com/package/js-cookie)

### 设置axios通用的接口模块 和基础url地址 `utils文件夹 request.js`

> 基础url地址:  http://ihrm-java.itheima.net/api 

* 设置通用接口 方便后接口调用

```js
import axios from 'axios'
// 基准路径
const baseURL = 'http://ihrm-java.itheima.net/api/'

// 创建一个axios实例对象
const instance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API
  baseURL: baseURL,
  // 超时,如果超过10秒，后端没有返回数据，那么就报错
  timeout: 10000
})

export default (options) => {
  return instance({
    // 请求方式
    method: options.method || 'GET',
    // 请求地址
    url: options.url,
    // post/put 请求体传递的参数
    data: options.data,
    // get 请求传参
    params: options.params,
    // 请求头
    headers: options.headers
  })
}
```

### 设置登录功能的api接口 `api文件夹 里面 user.js`

* 设置一个登录使用的api接口
* 完成登录模块之后，我们需要对登录接口进行封装, 登录请求应该单独封装到一个模块中, 便于维护和管理

```js
// 登录请求
export function login (data) {
  return request({
    // 请求登录的方式
    method: 'post',
    url: '/sys/login',
    data: data
  })
}
```

### 设置cookie插件`utils文件夹 auth.js`

[第三方包js-cookie](https://www.npmjs.com/package/js-cookie)

>**`目标 `** 封装通用的token操作模块 
>
>本地三个储存：Cookie/sessionStorage/localStorage
>
>Cookie的问题：
>
>1. 本地存储的数据量有限制 4K  1K = 1024B(Byte) 1Byte = 8bit
>
>2. 不安全（存储在客户端）
>
>特点：发送请求时会自动携带Cookie；没有浏览器的兼容问题；
>
>Cookie的类型：会话Cookie（浏览器一旦关闭就失效了）；持久Cookie（可以设置有效期）

* 导入第三方包js-cookie 操作cookie 设置在工具文件
  * `getToken` 获取cookie
  * `setToken` 储存cookie
  * `removeToken` 删除cookie

```js
// 导入第三方包js-cookie 操作cookie (用那种方法导入那种方法名)
import Cookies from 'js-cookie'
// cookie的储存的名称(在cookie缓存里储存的名称)
const TokenKey = 'vue_admin_template_token'
// 获取指定的cookie
export function getToken () {
  return Cookies.get(TokenKey)
}
// 设置指定的cookie(储存token时候使用)
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
// 删除指定的cookie
export function removeToken () {
  return Cookies.remove(TokenKey)
}
```

总结：

1. 原生js可以操作Cookie，但是很麻烦
2. 所以可以基于第三方包 js-cookie操作cookie，比较简单

###  Vuex组件的`actions:`获取登录异步数据 `modules文件夹的 user.js`

* 登录案例无需储存数据 只需要设置 async函数同步获取数据
* 判断如果登录成功 返回一个状态位(成功true 不成功false)
* `context.commit` 把数据储存到state里面
* 在`mutations` 数据获取中 把token储存到cookie里面(没有cookie token代替)
  * cookie是 第三方包js-cookie

```js
// 导入登录的api接口
import { login } from '../../api/user'
// 导入存储和获取的cookie的组件(第三方包js-cookie)
import { setToken, getToken } from '../../utils/auth'
// 用户模块
export default {
  namespaced: true,
  state: {
    // 从浏览器缓存中 读取cookie值 如果没有 赋值为null 防止报错
    token: getToken() || null
  },
  mutations: {
    updateToken (state, payload) {
      // 接收异步获取的数据
      state.token = payload
      // 把获取到的token值(目前没cookie) 存储到cookie缓存中去
      setToken(payload)
    }
  },
  // 异步获取数据
  actions: {
    // 实现异步登录 获取服务器的返回值 并且储存token
    async login (context, payload) {
      try {
        const ret = await login(payload)
        if (ret.data.code === 10000) {
          // 登录成功，缓存服务器返回的token(储存到 Vuex的state里面)
          context.commit('updateToken', ret.data.data)
          // 如果登录成功 返回一个成功状态位
          return true
        } else {
          // 登录失败 返回一个失败状态位
          return false
        }
      } catch (error) {
        // 登录失败(这个是网络错误) 返回一个失败状态位
        return false
      }
    }
  }
}
```

总结

1. 封装登录接口api
2. 封装调用接口的Action方法
3. 组件中把Action映射为函数并且调用方法实现登录

### 登录vue文件 导入Vuex异步获取的登录信息 `login文件夹 index.js`

* 使用了第三方表单验证 [表单验证validate](https://github.com/yiminghe/async-validator)
* mapActions 映射 actions 异步数据获取

```js
// 导入表单验证js文件
import { validUsername } from '@/utils/validate'
// 导入Vuex的Actions 映射
import { mapActions } from 'vuex'

methods: {
    // 导入(映射)Vuex的 actions异步数据获取方法(Vuex入口文件user里面的login异步获取登录数据方法)
    ...mapActions('user', ['login']),
   handleLogin () {
      // 点击登录按钮的时候 触发表单验证
      // validate表单效验插件() $refs操作sel-form组件实例实现验证 通过this.$refs.名称 访问组件实例
      this.$refs.loginForm.validate(async valid => {
        // 防止用户不输入内容 点击登录 先服务器提交数据
        // 如果通过效验(true) 就向服务器提交数据
        if (valid) {
          // 如果完成了输入效验 把账号密码 上传到服务器 判读是否正确
          const ret = await this.login({ // 调用Vuex的异步获取登录数据声明的actions方法(映射Vuex方法)
           mobile: this.loginForm.username, // 获取用户输入的账号密码 左侧是后端规定的属性名 上传到服务器比对
           password: this.loginForm.password
          })
          // 判断Vuex返回的状态位(自设置的 如果登录成功 返回的true 不成功返回false)
          if (ret) {
            // 如果返回true 说明登录成功 跳转到主页面
            this.$router.push('/dashboard')
          } else {
            // 否则就是false 说明登录失败 提示用户 (饿了么ui提供的弹窗)
            this.$message.error('账号密码输入错误')
          }
        } else {
          // 如果表单不通过 提示用户 不提交服务器 (饿了么ui提供的弹窗)
          this.$message.error('请输入正确的用户名密码')
        }
      })
    }
  }
```

总结：封装token的基本操作方法，本地缓存采用cookie

1. 首次登陆时，缓存token
2. 页面打开时，从缓存读取token并初始化state中的token

## axios响应拦截器 `utils 文件夹 request.js`

> `目标`: 处理响应拦截器
>
> axios返回的数据中默认增加了一层**`data的包裹`**, 每次我们都要 res.data.data, 太麻烦, 所以我们需要在这里处理下。

```js
// 响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么：去掉axios默认包装的data属性
  return response.data
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})
```

> 总结：通过响应拦截器优化数据的获取

## 基于全局Vuex  设置路由守卫 `permission.js`

<br>

> **<font color = #ff3040>目标 </font>**：根据全局Vuex 获取token 处理路由组件的访问权限问题 (没有token的用户, 不让你进系统的) 
>
> **<font color = #ff3040>步骤</font>** :  从Vuex中读取 token值 判断是否持有token 让其访问权限内容 如果用户在白名单(游客页面) 不进行操作
>
> **<font color = #ff3040>路径</font>** :  登录路径 `/login` 首页路径`/dashboard` 白名单路径`'/login', '/404', '/qita'`

![image-20210216132052672](https://tva1.sinaimg.cn/large/005INI3Xly8grtqo20yraj30kw07fgmc.jpg)

```js
// axios的路由导航守卫 配合Vue-router 实现登录权限功能(在router上设置axios导航守卫)
// 导入Vue-router方法 (在Vue组件内需要 this.$router 组件外直接router 使用即可)
import router from './router/index'
// 导入Vuex(获取其全局token值)
import store from './store/index'
// 创建一个路径白名单 里面填写的是路径 (允许用户游客模式访问一些内容 比如登录页 404 没必要验证)
const white = ['/login', '/404', '/qita']
// 创建路由导航守卫]
router.beforeEach((to, from, next) => {
  //! 读取Vuex全局组件 判断是否存在token
  // 从Vuex全局组件中 读取保存的token(储存在getters里面)
  const token = store.getters.token
  console.log(token)
  // 如果存在token
  if (token) {
    // 如果存在token 并且当前在登录页 让其跳转到主页
    if (to.path === '/login') { // to 表示要跳转到哪里去
      next('/dashboard')
    } else {
      // 如果不在登录页面上 直接通过 不做处理(因为已经登录访问 无需再跳转)
      next()
    }
  } else {
    // 如果不存在token 判断是否在白名单中(游客可以访问的路径)
    if (white.includes(to.path)) { // includes()是数组方法 检测是否包含指定内容
      // 在白名单里面，放行通过即可
      next()
    } else {
      // 如果不在白名单里面 跳转到登录页面
      next('/login')
    }
  }
})

```

总结：导航守卫要拦截素有请求的路由链接

1. 判断是否登录
2. 判断是否为白名单

## 关于基准路径的配置

> 注意：`.env.development`和`.env.production` 文件用于配置开发环境和生产环境的基准url地址

- .env.development 开发环境
- .env.production 生产环境
- `#` 是注释的意思 

> .env.development 开发环境 配置文件 

* 不设置固定的url地址 只设置末尾地址 这样默认就是 `localhost:`地址拼接

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

