---
title: 3. Vue移动端 基本登录功能
date: 2021-06-04
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目

---

::: tip 介绍

Vant插件的登录功能(基本功能 访问数据 访问权限功能 token续签)<br>
:::

<!-- more -->

## 页面基本布局` Login.vue`

> 目标：实现登录页面基本布局` Login.vue`设置

* 进行表单`v-model`双向绑定 验证数据

```vue
<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title='登录' />
    <!-- 表单 -->
    <van-cell-group>
      <van-field v-model="mobile" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="code" label="验证码" placeholder="请输入验证码">
        <!-- #button 调用Vant的button具名插槽 里面填充内容 #button 是v-slot 具名插槽的简写 -->
        <!-- size 是控制器大小 -->
        <template #button>
          <van-button class="p5" slot="button" size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 提交按钮 -->
    <div class="btn">
      <van-button @click="getLogin" type="info" block round>登 录</van-button>
    </div>
  </div>
</template>
```

> 总结：基于Vant提供的UI组件实现登录页面基本布局。

## 实现基本登录功能` Login.vue`

> 实现登录基本功能分为两步: 

1. 在api文件夹创建单独控制登录页面的 js文件 ` api文件夹 创建 login.js`
2. 在` Login.vue`文件里面调入Login登录路由配置 验证登录 
3. `native-type="submit" / button` submit提交表单并且可以跳转 button提交表单但会阻止跳转(Vant提供的方法)

### 创建单独控制登录页api` request.js`

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

### 登录页面验证登录 ` Login.vue`

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

- 跳转路由

```js
this.$router.push('/home')
```

> 总结：绑定表单数据；绑定提交事件；调用接口；跳转页面。

![image-20210602161633614](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/ApcZa8H4L6sDCxO.png)

> 总结：封装的好处
>
> 1. 降低模块之间的耦合性（联系），方便后续的维护和扩展
> 2. 代码的逻辑结构比较清晰（单一职责）

## 表单验证 ` Login.vue`

> 目标：能够实现表单验证效果

[Vant field输入框样式地址](https://vant-contrib.gitee.io/vant/#/zh-CN/field)

### 表单验证 手动挡 (自己写)

>template 模板写法

1. 绑定错误消息 `:error-message=""` 

2. @input是监测输入内容

```vue
<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title='登录' />
    <!-- 表单 -->
    <van-cell-group>
+      <!-- 调用 Vant方法 @input是监测输入内容 :error-message是提示信息 -->
+      <!-- 给:error-message设置一个 对象储存其数据 进行判断 -->
+      <van-field @input='validateMobile' :error-message="mobileMsg" v-model="mobile" label="手机号" placeholder="请输入手机号" />
+      <van-field @input="validateCode" :error-message="codeMsg" v-model="code" label="验证码" placeholder="请输入验证码">
        <!-- #button 调用Vant的button具名插槽 里面填充内容 -->
        <!-- size 是控制器大小 -->
        <template #button>
          <van-button class="p5" slot="button" size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <!-- 提交按钮 -->
    <div class="btn">
      <van-button :loading='isLoading' native-type="submit" @click="getLogin" type="info" block round>登 录</van-button>
    </div>
  </div>
</template>
```

> script 脚本写法

1. 手机号 验证码 进行单独两项判断 如果输入不正确 赋值给 `:error-message=""` 打印错误提示 输入正确 置空`:error-message=""` 
2. 进行登录按钮效验 如果不满足表单要求 阻止上传到服务器

* 验证手机号正则 `/^1[34578]\d{9}$/` 
* 六位数验证码` /^\d{6}$/`

```vue
<script>
// 1. 传入 login axios 组件 login是登录验证axios命名方法名称
import { login } from '../api/login'
export default {
  // 2. 设置 用户输入数据的储存
  data () {
    return {
      mobile: '',
      code: '',
+      //! 错误提示-手机号
+      mobileMsg: '',
+      //! 错误提示-验证码
+      codeMsg: ''
    }
  },
  methods: {
    //! 进行手机号输入验证操作
    validateMobile () {
+      //! 1. 进行手机号格式判断
+      if (!this.mobile) {
+        this.mobileMsg = '请输入手机号'
+      } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
+        this.mobileMsg = '手机号格式不正确'
+      } else {
+        //! 2.手机号验证通过 取消提示
+        this.mobileMsg = ''
+      }
+    },
+    validateCode () {
+      //! 3. 进行验证码格式判断(六位数验证码)
+      if (!this.code) {
+        this.codeMsg = '请输入验证码'
+      } else if (!/^\d{6}$/.test(this.code)) {
+        this.codeMsg = '验证码格式不正确'
+      } else {
+        //! 4. 验证通过 取消提示
+        this.codeMsg = ''
+      }
+    },
    // 3. 创建数据验证方法
    async getLogin () {
      // 4. 用try catch 来判断 数据是否接收成功 提示用户
      try { // 给服务器发送信息
+        //! 5. 调用登录效验方法
+        this.validateMobile()
+       this.validateCode()
+        //! 6. 通过提示信息判断是否效验成功 不成功 提示用户失败 跳出判断
+        if (this.mobileMsg !== '' || this.codeMsg !== '') {
+          //! 8. 失败了 跳出循环
+          return this.$toast('请输入手机号或者验证码')
+        }
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
</script>
```

### 表单验证 自动挡(Vant提供)

[Vant field输入框样式地址](https://vant-contrib.gitee.io/vant/#/zh-CN/field)

>`template` 模板设置

* 需要创建 Vant表单 `<van-form validate-first @submit='handleLogin' @failed="onFailed"> </van-form>`
  * 必须把效验的数据 上传数据按钮 放在 `van-form`里面
* 不需要设置 **`:error-message=""`** 提示错误 `script` 方法可以设置
* `@failed=''` 是打印错误信息 可以不设置
* `@submit=''` 当验证通过时候 执行里面的函数方法 (用于绑定接口方法 验证符合条件的数据)

```vue
<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title='登录' />
    <!-- 表单 -->
    <van-cell-group>
      <!-- validate-first 是否在某一项校验不通过时停止校验 -->
      <!-- failed事件，在点击提交按钮后才会触发(可以并不用) -->
      <!-- submit事件，在所有的表单验证通过后触发(绑定接口方法 验证数据) -->
      <van-form validate-first @submit='handleLogin' @failed="onFailed">
          <!-- 设置:rules登录效验 声明一个对象 用于效验规则 -->
        <van-field :rules="mobileRules" v-model="mobile" label="手机号" placeholder="请输入手机号" />
        <van-field :rules="codeRules" v-model="code" label="验证码" placeholder="请输入验证码">
          <!-- #button就是具名插槽的用法 -->
          <template #button>
            <van-button native-type="button" class="p5" size="mini" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <!-- 提交按钮 -->
        <div class="btn">
          <van-button :loading='isLoading' native-type="submit" type="info" block round>登 录</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </div>
</template>
```

>`script` 脚本设置

* 需要在 data(){}里面 设置校验即可
* 自带不满足条件不上传服务器 所有不需要设置数据上传效验

```js
  data () {
    return {
      // 手机号
      mobile: '',
      // 验证码
      code: '',
	// pattern:是正则表达式规则 message:是提示用户信息
      mobileRules: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号' }], 
      codeRules: [{ pattern: /^\d{6}$/, message: '请输入验证码' }]
    }
  }
```

### 表单点击事件支持

除下列事件外，Field 默认支持 Input 标签所有的原生事件

| 事件                 | 说明                 | 回调参数                       |
| :------------------- | :------------------- | :----------------------------- |
| input                | 输入框内容变化时触发 | *value: string (当前输入的值)* |
| focus                | 输入框获得焦点时触发 | *event: Event*                 |
| blur                 | 输入框失去焦点时触发 | *event: Event*                 |
| clear                | 点击清除按钮时触发   | *event: Event*                 |
| click                | 点击 Field 时触发    | *event: Event*                 |
| click-input `v2.8.1` | 点击输入区域时触发   | *event: Event*                 |
| click-left-icon      | 点击左侧图标时触发   | *event: Event*                 |
| click-right-icon     | 点击右侧图标时触发   | *event: Event*                 |



## 登录按钮加载提示 ` Login.vue` `:loading`

[Vant Button 按钮](https://vant-contrib.gitee.io/vant/#/zh-CN/button)

![image-20210604223154115](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/315fhwcZ9KVmQN4.png)

> 目标：实现登录按钮提示效果 (常用于电商网站购买按钮 和 登录等待验证按钮)

- 通过vant按钮的`:loading`属性实现提示效果
  - ![image-20210604223427347](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/h1IJviZBmW9dcnr.png)

1. 在`template`里面设置Vant提供的加载方法`:loading:'对象名'`

```vue
  <!-- :loading 响应式方法 控制按钮是否加载 参数是布尔值 -->
	<!-- native-type="submit" / button submit提交表单并且可以跳转 button提交表单但会阻止跳转 -->
      <van-button :loading='isLoading' native-type="submit" @click="getLogin" type="info" block round>登 录</van-button>
```

2. 在`script`data(){}创建对象名 默认布尔值是false

```diff
  data () {
    return {
      mobile: '',
      code: '',
      //! 错误提示-手机号
      mobileMsg: '',
      //! 错误提示-验证码
      codeMsg: '',
+      // ? 登录按钮的加载状态(布尔值 默认要设置flase 让用户能点)
+      isLoading: false
    }
  },
```

3. 在接口调用方法中 调用 判断是否登录成功
   * try{}里面设置为 true 提交数据成功后 不让其点击 `  this.isLoading = true`
   * catch{} 里面重新设置为 false 登录失败 取消按钮加载 让其点击`this.isLoading = false`

```diff
    async getLogin () {
      // 4. 用try catch 来判断 数据是否接收成功 提示用户
      try { // 给服务器发送信息
        //! 5. 调用登录效验方法
        this.validateMobile()
        this.validateCode()
        //! 6. 通过提示信息判断是否效验成功 不成功 提示用户失败 跳出判断
        if (this.mobileMsg !== '' || this.codeMsg !== '') {
          //! 8. 失败了 跳出循环
          return this.$toast('请输入手机号或者验证码')
        }
+         // ? 登录时候进行接口调用 让其转起来 防止重复提交表单
+        this.isLoading = true
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
+         // ? 登录失败的时候 还原按钮加载状态 让用户继续登录
+        this.isLoading = false
      }
    }
```

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

![image-20210604171827880](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/n5NRQfYb9pK36rZ.png)

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
// 添加一个请求拦截器 (发送数据 进行处理)
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
  *  判断refresh_token 是否失效 如果失效 让其重新登录
  *  获取axios数据后进行加工 直接进入 data里面 `return response.data`

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
// 添加响应拦截器 (获取数据 进行处理)
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

