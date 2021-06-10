---
title: 4. Vue移动端 基本登录功能(上)
date: 2021-06-04
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目

---

::: tip 介绍

Vant插件的登录功能(基本功能 模板+访问数据)<br>
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

![image-20210602161633614](https://i.loli.net/2021/06/02/ApcZa8H4L6sDCxO.png)

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

![image-20210604223154115](https://i.loli.net/2021/06/04/315fhwcZ9KVmQN4.png)

> 目标：实现登录按钮提示效果 (常用于电商网站购买按钮 和 登录等待验证按钮)

- 通过vant按钮的`:loading`属性实现提示效果
  - ![image-20210604223427347](https://i.loli.net/2021/06/04/h1IJviZBmW9dcnr.png)

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

