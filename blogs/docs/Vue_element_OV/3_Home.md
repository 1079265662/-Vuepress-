---
title: 3. OV系统 主页布局 用户信息获取
date: 2021-07-03
cover: https://tva2.sinaimg.cn/large/005INI3Xly8grslmb2p7gj31hc0u0h58.jpg
tags:
 - Vue
categories: Vue OV系统

---

::: tip 介绍inde
Vue OV系统 主页的布局和获取用户详细信息<br>
:::

<!-- more -->

## 主页模块的总览

> `目标`：实现主页基本布局效果 
>
> 主页的布局组件位置**`src/layout`**

![image-20210626154624222](https://i.loli.net/2021/06/26/GeXijbrxtl2mgHa.png)

## 主页布局-左侧菜单 `styles文件夹 siderbar.scss`

> `目标`：实现左侧菜单效果

- 左侧导航样式处理 `styles/siderbar.scss`

```scss
// 设置背景渐变色
.sidebar-container {
   background: -webkit-linear-gradient(bottom, #3d6df8, #5b8cff);
}
// 设置左侧导航背景图片
.scrollbar-wrapper { 
   background: url('~@/assets/common/leftnavBg.png') no-repeat 0 100%;
}
// 设置菜单选中颜色
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  a{
    li{
      .svg-icon{
        color: #fff;
        font-size: 18px;
        vertical-align: middle;
        .icon{
          color:#fff;
        }
      }
      span{
        color: #fff;
      }
      &:hover{
        .svg-icon{
          color: #43a7fe
        }
        span{
          color: #43a7fe;
        }
      }
    }
  }
}
```

> 因为我们后期没有二级菜单，所以这里暂时不对二级菜单的样式进行控制。

## 主页布局-左侧图标 `components文件夹 Logo.vue`

[饿了么ui组件 折叠功能](https://element.eleme.cn/#/zh-CN/component/menu#zhe-die)

> 需求：定制SideBar菜单的Logo：`@/src/layout/components/Logo.vue`
>
> 插件: [饿了么ui组件 折叠功能](https://element.eleme.cn/#/zh-CN/component/menu#zhe-die)

- 左侧菜单展开和折叠的控制逻辑
  - 左侧菜单的展开和折叠由什么决定？el-menu组件的collapse属性决定
  - 谁会影响到这个属性的值？点击汉堡图标会影响到
  - 汉堡图标是如何影响这个collapse的值的？app这个vuex模块来管理菜单展开和折叠状态的
    - app提供菜单的默认展开状态数据给菜单组件
    - 点击汉堡图标时，通过action影响app模块的里面的状态数据

```js
// sidebar一共有三个地方需要用到
// 1、值的初始化操作
// 2、他的值是以全局getters的方式提供给组件
// 3、点击汉堡图标，触发action修改这个值即可
```

- 左侧logo图片显示效果调整

```vue
<div class="sidebar-logo-container" :class="{'collapse':collapse}">
  <transition name="sidebarLogoFade">
    <router-link key="collapse" class="sidebar-logo-link" to="/">
      <img src="@/assets/common/logo.png" class="sidebar-logo  ">
    </router-link>
  </transition>
</div>
```

- 设置大图和小图的样式

```scss
// 大图样式
& .sidebar-logo {
  width: 140px;
  vertical-align: middle;
  margin-right: 12px;
}
// 小图样式
&.collapse {
  .sidebar-logo {
    margin-right: 0px;
    width: 50px;
    height: 24px;
  }
}
```

> 总结：&和类名之间的空格问题
>
> 1. 如果有空格，就是父子关系(一般不写 没必要 在父元素嵌套自带父子关系)
> 2. 如果没有空格就是兄弟关系（并列兄弟关系 ）
>    * 把父元素 当成兄弟 常用于两个元素都存在时候显示样式

## 主页布局-头部导航 `components文件夹 Navbar.vue`

> **`目标`**设置头部内容的布局和样式

- 头部组件效果 **`layout/components/Navbar.vue`**
  - `breadcrumb ` 面包屑导航 属于二级路由 但是此项目不需要

```vue
<div class="app-breadcrumb">
  江苏传智播客教育科技股份有限公司
  <span class="breadBtn">体验版</span>
</div>
<!-- <breadcrumb class="breadcrumb-container" /> -->
```

- 布局样式

```scss
.navbar {
    background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
    .app-breadcrumb {
      display: inline-block;
      font-size: 18px;
      line-height: 50px;
      margin-left: 10px;
      color: #ffffff;
      cursor: text;
      .breadBtn {
        background: #84a9fe;
        font-size: 14px;
        padding: 0 10px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        margin-left: 15px;
      }
    }
}
```

- 汉堡组件图标颜色 **`src/components/Hamburger/index.vue`**
  - fill属性可更改svg字体图标的颜色
  - [svg属性总览](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute)

```vue
<svg
     :class="{'is-active':isActive}"
     class="hamburger"
     viewBox="0 0 1024 1024"
     xmlns="http://www.w3.org/2000/svg"
     width="64"
     height="64"
     fill="#fff" 
 >
```

> **`注意`**这里的图标我们使用了**`svg`**，设置颜色需要使用svg标签的**`fill属性`** [svg属性总览](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute)

- 右侧下拉菜单设置

```vue
<div class="right-menu">
  <el-dropdown class="avatar-container" trigger="click">
    <div class="avatar-wrapper">
      <img src="@/assets/common/bigUserHeader.png" class="user-avatar">
      <span class="name">管理员</span>
      <i class="el-icon-caret-bottom" style="color:#fff" />
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <router-link to="/">
        <el-dropdown-item>
          首页
        </el-dropdown-item>
      </router-link>
      <a target="_blank" href="https://xxx.com">
        <el-dropdown-item>项目地址</el-dropdown-item>
      </a>
      <el-dropdown-item divided @click.native="logout">
        <span style="display:block;">退出登录</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
```

- 头像和下拉菜单样式

```scss
.avatar-wrapper {
  position: relative;

  .user-avatar {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    vertical-align: middle;
  }
  .name {
    cursor: pointer;
    color: #fff;
    vertical-align: middle;
    margin-left:5px;
  }
  .user-dropdown {
    color: #fff;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 20px;
    font-size: 12px;
  }
}
```

> 总结：汉堡菜单；面包屑导航；右侧下拉菜单（基于ElementUI组件dropdown实现）
>
> 注意：svg的样式控制使用fill属性填充颜色

## 获取用户信息 `准备工作`

> **`目标`** 封装获取用户资料的资料信息
>
> 上小节中，我们完成了头部菜单的基本布局，但是头像和名称没有，需要通过接口调用的方式获取当前用户的资料信息

### 获取用户资料接口 **`api文件夹 user.js `**

* 注意不是 `get` 是`post` 请求
* 路径:  **`src/api/user.js`**

```js
// 获取用户信息
export function getInfo (token) {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

```

### 统一设置请求头 携带token访问服务器 `utils文件夹 request.js`

* 这个接口, 需要配置 headers 请求头, 配置 token, 而我们在请求任何带安全权限的接口时都需要**`令牌(token)`** ,每次在接口中携带**`令牌（token）`**很麻烦，所以我们可以在axios拦截器中统一添加token。
* 路径:  **`src/utils/request.js`**

```js
// 请求拦截器
instance.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    // 如果token存在 注入token
    config.headers = {
      Authorization: `Bearer ${store.getters.token}`
    }
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
```

### 前端解决跨域问题 `vue.config.js`

[官方介绍 vue.config.js](https://cli.vuejs.org/zh/config/#vue-config-js)

- 可以在`vue.config.js` 文件里面设置中介 模拟不跨域接口 (Vue脚手架功能)
  - 注意: 仅限于开发时候使用 生产模式依旧会产生跨域 (纯前端无法解决跨域 需要配合后端)
-  `vue.config.js`是路由定制webpack 可以配置跨域等问题 (webpack开放的拓展文件)

```js
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理（中介 帮你解决跨域问题 但是仅限于开发环境 生产环境还是需要后端解决跨域）
    proxy: {
      // 所有的请求路径以api开始的地址都会被代理
      // 发送的请求 http://localhost:9528/api/sync/profile
      // 代理的目标 http://ihrm-java.itheima.net/api/sys/profile
      '^/api': { // 凡是以/api的请求 全部代理到此处
        // 代理的目标地址
        target: 'http://ihrm-java.itheima.net'
      }
    }
    // before: require('./mock/mock-server.js')
  },
```

* `.env.development` 配置生产模式基础的url地址
  * 不设置固定的url地址 只设置末尾地址 这样默认就是 `localhost:`地址拼接

````
# just a flag
ENV = 'development'

# base api
# VUE_APP_BASE_API = 'http://ihrm-java.itheima.net/api/'
VUE_APP_BASE_API = '/api/'

````



![image-20210405174513239](https://i.loli.net/2021/06/24/t3FcUNAYx2begdC.png)

![image-20210624162222615](https://i.loli.net/2021/06/24/Lg9OaMTxvyhdXnq.png)

> 总结：
>
> 1. 网页网址 http://localhost:9528/#/dashboard
> 2. 浏览器监控的接口网址 http://localhost:9528/api/sys/profile
> 3. 实际的发送的接口网址 http://ihrm-java.itheima.net/api/sys/profile

## vuex存储用户基本信息 并调用 `Navbar.vue`

> **`目标`**： 在用户的vuex模块中封装获取用户资料的action，并存储相关状态到vuex中

* 用户状态会在后续的开发中，频繁用到，所以我们将用户状态同样的封装到action中

### Vuex封装用户基本信息 异步获取action `user.js`

> 文件路径:  **`src/store/modules/user.js`**

* Vuex **`action`** 异步数据获取

```js
//! 导入登录的api接口
import { login, getInfo } from '../../api/user'
state: {
    //! 储存用户信息
    userInfo: {}
 },
mutations: {
    userInfo (state, payload) {
      //! 接收获取到用户信息的异步数据
      state.userInfo = payload
    }
 },
actions: {
    //! 获取用户的基本信息
    async getInfo (context) {
      //! 根据token获取相应的用户信息
      const ret = await getInfo()
      //! 把用户信息 储存到state里面(先传入mutations同步数据获取中)
      context.commit('userInfo', ret.data)
    }
}
```

### NavBar 组件中调用 `Navbar.vue`

> 文件路径:  **`src/components/Sidebar/Navbar.vue`**

* `mapActions`异步数据获取 映射到该组件 实现登录信息获取
  * `mapActions` 写在 Vue的`methods` 函数方法中
  * 设置 声明周期`created()` 页面加载时候调用该异步数据获取方法

```js
// 导入mapActions 异步数据获取映射
import { mapActions } from 'vuex'
created() {
  // 原始写法
  // this.$store.dispatch('user/getInfo')
   // ~ 页面开始时候 调用actions异步数据获取方法
  this.getInfo()
},
methods: {
   // ~ 导入获取用户信息的 actions异步数据获取方法
  ...mapActions('user', ['getInfo']),
}
```

### 设置 全局Vuex组件 导出用户基本信息 `global.js`

> 文件路径:  **`src/store/modules/global.js`**

* 把通用性较强的数据 设置为全局Vuex组件 方便调用数据
*   <font color = #ff3040>全局Vuex `state` 数据是通过Vuex `getters`导出</font>
  * `getters` 在Vue组件中 需要用` computed:` 计算属性导入

```js
// 这里设置全局的 Vuex模块
// import getters from '@/store/getters.js'
// 配置全局属性 getters
const getters = {
  // 左侧是调用全局Vuex的名称(自定义) 右侧是从指定文件中 导入数据 让其变为全局Vuex
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  // 导入全局的用户信息(名称)
  // 这里是短路写法 如果没有获取到用户数据 那就不会执行后面的获取用户名称
  // && 是两个条件必须满足 前一个不满足就不会执行后面的
  uname: state => state.user.userInfo && state.user.userInfo.username,
  // 导入全局的用户图片
  // 这里是短路写法 如果没有获取到用户数据 那就不会执行后面的获取用户头像
  avatar: state => state.user.userInfo && state.user.userInfo.staffPhoto

}
// 定义一个打印消息的全局Vuex模块
const mutations = {
  showInfo (context, payload) {
    console.log('--------------' + payload)
  }
}

export default {
  // 不加 namespaced: true 就是全局的Vuex组件
  getters: getters,
  state: {},
  mutations: mutations,
  actions: {}
}

```

### 在Vue组件中 调用Vuex全局名称 `Navbar.vue`

> 文件路径:  **`src/components/Sidebar/Navbar.vue`**

* `script` 脚本
  * 导入的全局Vuex组件数据 uname数据
  *   <font color = #ff3040>全局Vuex `state` 数据是通过Vuex `getters`导出</font>
    * `getters` 在Vue组件中 需要用` computed:` 计算属性导入
    * 直接导入设置全局Vuex名称即可

```diff
+  // 导入vuex映射
+ import { mapActions, mapGetters } from 'vuex'

  computed: {
    // 导入全局的Vuex组件
    ...mapGetters([
      'sidebar',
      'avatar',
+      // ~ 导入全局的Vuex用户信息
+      'uname'
    ])
  }
```

* `template` 模板
  * 把获取的全局Vuex组件数据 渲染到页面上(插值表达式)

```vue
<span class="name">{{uname}}</span>
```

> 总结：
>
> 1. 通过action调用接口获取用户信息
> 2. 把获取的数据更新到state里面
> 3. Layout组件中触发action
> 4. 通过getters解析用户信息中的uname
> 5. 模板中显示用户信息

## 获取用户头像信息`Navbar.vue`

> `目标`：获取用户头像信息
>
> `原因`: 用户头像信息 没有存放在基本信息中 我们需要获取从用户资料中 获取用户id 携带用户id 获取到头像信息

### 封装获取用户信息接口  **`user.js`**

- 路径: **`src/api/user.js`**

```js
// 获取用户头像信息
export function getDetailInfo (id) {
  // 参数ID表示当前登录系统的用户id
  return request({
    method: 'get',
    url: '/sys/user/' + id
  })
}
```

### 携带用户id 获取服务器相应头像 `user.js`

* 之前已经获取了 用户的基本信息(里面包括用户id) 携带用户id 获取相应的头像
* 需要用到 重构 把之前获取的基本信息 和 新获取的头像信息 同时储存到 `state`里面

```js
state: {
       //! 储存用户信息 和 用户头像数据
    userInfo: null
  },
      // 接收用户基本信息 和 头像信息
mutations: {
      userInfo (state, payload) {
      // 接收用户的信息
      state.userInfo = payload
    }
},
actions: {   
//! 获取用户的基本信息
    async getInfo (context) {
      //! 根据token获取相应的用户基本信息
      const userBasic = await getInfo()
      // ~ 获取到基本信息后 获取其 用户id值 得到详细数据
      const userDetails = await getDetailInfo(userBasic.data.userId) // 需要携带基础信息的id值 上传服务器 获取数据
      //! 把用户信息 储存到state里面(把基础信息 和 详细信息都存进去)
      context.commit('userInfo', {
        // ~ 导入获取到的基础信息
        ...userBasic.data,
        // ~ 导入用户的相信信息
        ...userDetails.data
      })
    }
 }

```

### 设置 全局Vuex组件 导出头像信息 `global.js`

> 文件路径:  **`src/store/modules/global.js`**

* 头像属于常用内容 设置为全局Vuex组件 方便调用数据
* <font color = #ff3040>全局Vuex `state` 数据是通过Vuex `getters`导出</font>
  * `getters` 在Vue组件中 需要用` computed:` 计算属性导入

```js
// 这里设置全局的 Vuex模块
// import getters from '@/store/getters.js'
// 配置全局属性 getters
const getters = {
  // 左侧是调用全局Vuex的名称(自定义) 右侧是从指定文件中 导入数据 让其变为全局Vuex
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  // 导入全局的用户信息(名称)
  // 这里是短路写法 如果没有获取到用户数据 那就不会执行后面的获取用户名称
  // && 是两个条件必须满足 前一个不满足就不会执行后面的
  uname: state => state.user.userInfo && state.user.userInfo.username,
  // 导入全局的用户图片
  // 这里是短路写法 如果没有获取到用户数据 那就不会执行后面的获取用户头像
  avatar: state => state.user.userInfo && state.user.userInfo.staffPhoto

}
// 定义一个打印消息的全局Vuex模块
const mutations = {
  showInfo (context, payload) {
    console.log('--------------' + payload)
  }
}

export default {
  // 不加 namespaced: true 就是全局的Vuex组件
  getters: getters,
  state: {},
  mutations: mutations,
  actions: {}
}

```

### 在Vue组件中 调用Vuex设置的全局头像 `Navbar.vue`

> 文件路径:  **`src/components/Sidebar/Navbar.vue`**

* `script` 脚本
  * 导入的全局Vuex组件数据 uname数据
  * <font color = #ff3040>全局Vuex `state` 数据是通过Vuex `getters`导出</font>
    * `getters` 在Vue组件中 需要用` computed:` 计算属性导入
    * 直接导入设置全局Vuex名称即可

```js
  computed: {
    // 导入全局的Vuex组件
    ...mapGetters([
      'sidebar',
      // ~ 全局的用户头像信息
      'avatar',
      // ~ 导入全局的Vuex用户信息
      'uname'
    ])
  }
```

* `template`模板
  * 动态绑定 `:scr`图片路径 和 uname名称

```vue
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <span class="name">{{ uname }}</span>
          <i class="el-icon-caret-bottom" style="color:#fff" />
        </div>
```

总结：action中可以处理多个异步接口调用（基于async函数）

##  制作头像失效问题插件

<br>

> `目标`：处理图片加载失败时的默认显示效果 如果默认图片加载失败 用统一图片代替
>
> `原理 `:  这里用到了Vue的插件机制 `install` 和 自定义Vue方法 `Vue.directive`

* 在入口文件中导入Vue插件 并且实例化Vue插件 `main.js`

```js
// 导入自定义插件
import MyPlugins from '@/utils/plugins.js'
// 配置自定义插件
// 参数1 是需要实例化的插件名称
// 参数2 是定制插件内部的信息(插件接收的数据 传递给install的options参数 可设置为固定值)
Vue.use(MyPlugins, '"https://tva2.sinaimg.cn/large/005INI3Xly8grusluz3ruj30b40b4wfn.jpg"')
```

* 封装设置Vue插件 `utils文件夹 plugins.js`
  * 使用到了自定义指令`Vue.directive`  来检测图片加载失败清空
    * el:指令绑定的元素
    * bindings表示指令相关的配置信息 <font color = #ff3040>常用于动态绑定 `:`</font>
  * `onerror`是检测原始是否加载失败 如果失败就执行
    * 当图片有地址 但是地址没有加载成功的时候 会报错 会触`onerror`
  * <font color = #ff3040>指令的名字在定义时候不需要加v-，在是用的时候才需要加v-</font> 

```js
// 定义一个Vue插件并导出
export default {
  // Vue.use(MyPlugins, 'defaultImg.png')
  // Vue.use的参数二传递给install方法的第二个参数options
  install (Vue, options) {
    // 扩展自定义指令
    Vue.directive('imgerror', {
      inserted (el, bindings) {
        // el表示指令绑定的元素
        // bindings表示指令相关的配置信息
        console.log(bindings)
        // 图片加载成功
        // el.onload = function () {}
        // 图片加载失败
        el.onerror = function () {
          // 把加载失败的图片路径修改为指定的默认路径
          // 如果bindings.value有值就用它，否则用后面的options
          el.src = bindings.value || options
        }
      }
    })
  }
}
```

### 在Vue文件中 使用该插件 ` Navbar.vue`

* Vue文件 `template`模板 使用该插件 
  * 使用指令, 这里图片如果是用本地图片, 需要导入, 如果是完整地址的网图, 直接赋值即可
  * 使用自定义Vue指令 需要 `v-自定义指令名称 `这样写法

```vue
<!-- :scr动态绑定img地址 -->
<img v-imgerror="defaultImg" :src="avatar" class="user-avatar">
```

* Vue文件 `script`脚本 设置该插件
  * 设置图片的动态的地址 `data()`数据储存 中设置

```js
// 基于ES6导入单独的图片也是可以的(导入图片设置)
import Img from '@/assets/common/head.jpg'
data() {
  return {
    defaultImg: Img
  }
},
// 或者直接完整地址的网图赋值
data() {
  return {
      // 也可以用base64位 和 http图片
    defaultImg: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2344451607,2404623174&fm=111&gp=0.jpg'
  }
},
```

总结：

1. 自定义指令的基本规则
2. 插件基本使用规则：先定义，再导入并配置（支持选项）
3. 配置插件时，可以传递options选项
4. 扩展图片加载的自定义指令（原生dom事件 img.onerror 表示图片加载失败）
5. 使用自定义指令



## 退出功能 `Navbar.vue`

[饿了么ui退出组件](https://element.eleme.cn/#/zh-CN/component/message-box#que-ren-xiao-xi)

> **`目标`**：实现用户的退出操作

![image-20210216134315084](https://i.loli.net/2021/06/26/pQjSmro2L8P69cX.png)

### 在Vuex中 设置退出后清空用户信息 `user.js`

* 路径:  **`src/store/modules/user.js`**
* 当用户点击退出后 应当把其用户信息 和 token在本地删除
  * 在修改数据 `mutations` 中把state里面的数据 设置为null
  * 调用导入[第三方包js-cookie](https://www.npmjs.com/package/js-cookie) 中的删除token方法 `removeToken()` 移除token

```js
// 导入存储和获取的cookie的组件(第三方包js-cookie)
import { setToken, getToken, removeToken } from '../../utils/auth'

mutations: {
   // 删除token 和 用户信息
    deluserInfo (state, payload) {
      // 删除用户基本信息
      state.token = null
      // 删除用户详细信息
      state.userInfo = null
      // 删除token(存在cookie 使用的第三方js-cookie组件)
      removeToken()
    }
    }
```

### Vue文件 设置退出功能 并 调用Vuex删除数据 `Navbar.vue`

<br>

> - 路径 :  **`  src/layout/components/Navbar.vue`**
> - [饿了么ui退出组件](https://element.eleme.cn/#/zh-CN/component/message-box#que-ren-xiao-xi) 支持Promise方法，点击确定触发then，点击取消触发catch

- `script`模板 `methods:` 函数方法
  - 导入Vuex `mutations ` 映射退出时 删除信息Vuex方法
  - Vuex `mutations `  设置在 Vue脚本的`methods:` 函数方法中

```js
// 导入vuex映射
import { mapActions, mapGetters, mapMutations } from 'vuex'

// 设置 退出功能 点击后退出 并且 删除用户数据和token
    logout () {
      // 点击退出时需要提示是否退出 (饿了么ui 确认消息提供)
      this.$confirm('确认要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 如果点击了确认退出 删除token 和 Vuex中的用户数据
        this.deluserInfo()
        //
        this.$router.push('/login')
      }).catch(() => {
        // 点击取消，执行catch方法
        // 如果点击了取消 则什么也不做
        console.log('cancel')
      })
    }
```

- `template`模板 
  - 设置点击退出功能
  - 饿了么组件 `el-dropdown-item` 并不支持点击事件 但是可以再后面添加 `.native`让其根组件拥有click事件 (Vue原生方法)

```vue
          <!-- 在组件的标签上绑定事件时 如果添加.native事件修饰符 表示把事件绑定到组件的根元素上(原生Vue提供)
          解决本身不支持该事件 设置native后 强制让其支持 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
```

> 总结：
>
> 1. 绑定事件
> 2. 确认删除
> 3. 清除token
> 4. 清除用户信息
> 5. 跳转到登录页面

## 处理token失效问题 `request.js`

> **`目标`**： 实现token失效的处理  这和项目后端没有续签token功能 只能实现token过去跳到登录页重新登录 并且删除用户信息 和 token
>
> `路径` : src/utils/request.js

- 拦截器处理token失效 **`src/utils/request.js`**
  - token超时的错误码是**`10002`** 状态码为 `401`
  - 通过 axios 设置响应拦截器 检测token是否过期 如果过期 跳转到登录页 重新登录
  - 需要导入 Vuex组件 调用其删除用户信息组件功能 实现完美退出

```js
// 导入axios
import axios from 'axios'
// 导入 Vuex 获取全局的Vuex组件
import store from '../store/index'


// 响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么：去掉axios默认包装的data属性
  return response.data
}, error => {
  // 对响应错误做点什么
  // 判断用户的token是否失效 如果失效 删除用户信息 跳转到登录页
  if (error.response.status === 401 && error.response.data.code === 10002) {
    // 导入Vuex的实例化对象 调用Vuex方法删除用户的信息
    store.commit('user/deluserInfo')
    // 跳转到登录页
    router.push('/login')
  }
  return Promise.reject(error)
})
```

总结：

1. 判断token过期的情况
2. 判断服务器失败的其他情况
3. 在组件中触发mutation没有添加user前缀，因为映射时已经添加
4. 在非组件环境触发mutation需要添加模块的前缀

