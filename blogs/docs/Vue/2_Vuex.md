---
title: Vuex 的食用方法
date: 2021-06-29
cover: https://tva2.sinaimg.cn/large/005INI3Xly8grlo28ue3tj31hc0u0q8z.jpg
tags:
 - Vue
 - Vuex
categories: Vue

---

::: tip 介绍
Vuex 的操作流程<br>
:::

<!-- more -->

## 关于`VueX`

`VueX`是适用于在`Vue`项目开发时使用的状态管理工具。试想一下，如果在一个项目开发中频繁的使用组件传参的方式来同步`data`中的值，一旦项目变得很庞大，管理和维护这些值将是相当棘手的工作。为此，`Vue`为这些被多个组件频繁使用的值提供了一个统一管理的工具——`VueX`。在具有`VueX`的Vue项目中，我们只需要把这些值定义在VueX中，即可在整个Vue项目的组件中使用

> 学习目标: <font color =#ff3040> 掌握Vuex的五个单一状态树 </font>(state,mutations,action,getters,modules)

## 组件之间传值

[VuexAPI 参考](https://vuex.vuejs.org/zh/api/#vuex-store)

> 目标：熟悉组件之间传值的各种情况（关注非父子之间传值）

- 父组件向子组件传值 props
- 子组件向父组件传值 $emit
- 非父子组件之间传值 : 爷孙；兄弟
  - 发布订阅模式 , 就称之为组件之间传值(需要有一个中介)

![image-20210121084735174](https://i.loli.net/2021/06/18/XhCStJlmnbfvIip.png)

## 兄弟组件简单传值方式(发布中介)

> 第一步 先new Vue() 全局Vue实例化对象(中介) 通常设置在总入口文件

```js
//! 创建一个Vue实例对象
const eventBus = new Vue()
//! 把创建的Vue对象添加到Vue构造函数的原型上，那么所有的组件都可以获取该对象
//! 所有的组件都是Vue构造函数的实例 (名称可以自定义)
Vue.prototype.eventBus = eventBus
```

> 第二步 在Vue中设置 设置数值 接收数值 `script`脚本 `methods:`方法

* msg是在data()中 设置的数据

```js
  methods: {
    // 设置一个兄弟组件的值(点击事件)
    handleClick () {
      // vue中使用 $emit(eventName) 触发事件，
      this.eventBus.$emit('msg-abc', this.msg)
    }
  }
```

> 第三步 在兄弟组件中 接收传来的数值 `script`脚本 `created()`生命周期

* receiveMsg是在data()中 设置的数据

```js
  created () {
    // 使用 $on(eventName) 监听事件
    this.eventBus.$on('msg-abc', ret => {
      this.receiveMsg = ret
    })
  }
```

##  Vuex状态管理必要性分析

* Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的**规则**保证状态以一种可预测的方式发生变化。
* 如果使用了Vuex，就可以**非常方便**的进行复杂的组件之间数据传递（非父子关系）

> ![Snipaste_2021-06-18_09-44-12](https://tva2.sinaimg.cn/large/005INI3Xly8grmau56oncj30iq08277j.jpg)

总结：

1. 所有组件的数据进行统一管理（存储和变更），每个组件内部就不再需要维护这些数据了
2. 数据变更时，统一修改Store中数据即可，组件中用到这个数据的组件会自动更新（数据是响应式的）

## Vuex的实现原理

> 目标：熟悉Vuex是如何实现上述集中管理组件数据这种思想（模式）的

![image-20210119224725242](https://i.loli.net/2021/06/18/kRCPx5DBYwNypVd.png)

- state 管理组件数据，管理的数据是响应式的，当数据改变时驱动视图更新。
- mutations 更新数据，state中的数据只能使用mutations去改变数据（只能处理同步的场景）
- actions 请求数据，响应成功后把数据提交给mutations 进而更新state（可以处理异步的场景 接口获取的数据）
- Devtools指的是浏览器的Vue插件调试工具 他可以监控数据的所有变更操作

![image-20210123111136131](https://i.loli.net/2021/06/18/Ivyd1EQ4mbxBG8c.png)

- getters相当于在State和组件之间添加一个环节（对state中的数据进行加工处理后再提供给组件）
- getters不要修改state中的数据

## Vuex的安装

* 单独 npm Vuex包

```bash
npm i vuex --save/-S
```

* 在脚手架中安装

![image-20210618121505711](https://tva2.sinaimg.cn/large/005INI3Xly8groqcnpbzyj30c105pwec.jpg)

## 储存数据 `state`

[储存数据 state](https://vuex.vuejs.org/zh/guide/state.html)

> 状态state用于存储所有组件的数据。

* 用于储存Vuex里面的数据
* <font color = #ff3040>注意: 此方法写在 Vue计算属性`computed:` 里面</font>

### 定义 `state`管理数据

* 设置state管理数据 `store文件夹 中 index.js`

```js
// 导入Vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 导出store实例化对象(Vuex) 调用时 $store
// 初始化vuex对象
const store = new vuex.Store({
     // state: 储存组件的所有数据
  state: {
    // 管理数据
    count: 0
  }
})
```

* 在Vue文件 调用state储存的数据 `template`模板

```vue
<div>A组件 state的数据：{{$store.state.count}}</div> 
<div>A组件 state的数据：{{count}}</div>
```

### 简单导入方法(非重点)

> 基于脚手架环境下 导入state管理数据

* `script` 脚本 `computed:`计算属性
  * 直接$store 也可以用  `computed:`计算属性 调用

```js
// 把state中数据，定义在组件内的计算属性中
computed: {
  // 1. 最完整的写法
  // count: function () {
  //   return this.$store.state.count
  // },
  // 2. 缩写
  count () {
    return this.$store.state.count
  }
}
// 不能使用剪头函数  this指向的不是vue实例
```

### `mapState` 方法导入数据 `重点`

> 目标: 简化导入store数据的代码
>
> 方案: 调用`mapState` 导入多个store数据
>
> mapState作用：可以辅助获取到多个state的值(Vuex自带 但需要导入)

- `template`模板

```vue
<template>
  <div>
    <!-- 导入计算属性computed: 获取的 state数值 (实际上是对象) -->
    <p>{{demo}}</p>
    <p>{{abc}}</p>
  </div>
```

- `script`脚本
  - 把vuex中的state数据映射到组件的计算属性中。(导入`mapState`)

```js
import { mapState } from 'vuex'
```

* `script` 脚本 `computed:`计算属性
  * 调用`mapState`设置方法 通过 `computed:`计算属性来声明
  * 利用结构赋值`...` 不影响计算属性其他方法

```js
// 使用mapState来生成计算属性  mapState函数返回值是对象
// 使用mapState使用对象传参
export default {
  // 在计算属性中 导入Vuex state中的值
  computed: {
    // 结构赋值... 相当于在computed计算属性中导入这两个数值
    // 结构赋值... 可以导入数值 也可导入对象
     ...mapState(['demo', 'abc']) // 调用state中储存的属性名(实际上是对象)
   
      // 等同于这种写法
      // 冒号左边是state中储存的属性名
      // 冒号右边是 获取到state中储存数据的自定义名称
      // ...mapState({
   //   demo: 'demo'
  //    abc: 'abc'
//    })
  }
}
```





总结：

1、是否组件的所有数据都应该放到Store中？不一定（数据仅仅需要在本组件使用，那么没有必要放到Store），放到Store中的数据一般需要多个组件共享。

2、`mapState`的方法

- 基本使用
- 简化用法
- 自定义和映射计算属性结合。。

3、 利用结构赋值`...` 导入 `mapState`

## 同步数据获取和修改数据 `mutations`

[同步数据修改 mutations](https://vuex.vuejs.org/zh/guide/mutations.html)

>目标：Vuex规定必须通过`mutation`修改数据，不可以直接通过store修改状态数据。
>
>作用: Vuex规定 非异步数据 都需要在`mutations` 上进行修改 不可在组件内部修改(专门修改数据)

* <font color = #ff3040>注意: 此方法写在 Vue方法`methods:` Vue方法里面</font>
* 先定义（mutations），再出发  this.$store.commit('mutation的名称，参数')
* ``mutation`的本质就是方法，方法名称自定义，`mutation`函数内部负责处理的变更操作。
* 一种操作就是一个`mutation`，不同的`mutation`处理不同的场景。
* 默认页面打开时候 不会获取数据 需要添加在 `created()`声明周期中触发

### 定义 `mutations`状态修改函数

* `mutations`本质上是方法 方法名称自定义` mutations`函数内部负责处理的变更操作

```js
  // mutations进行数据的变更
mutations: {
    // 定义一个mutation，用于累加count值
    // increment这个名字是自定义的
    increment (state, payload) {
      // 参数一 表示state的数据(state里面的数据)
      // 参数二 payload表示需要修改的数据(触发mutation时传递过来)
        state.count = state.count + payload
    }
}
```

### 简单的导入方法(非重点)

```js
  methods: {
    increment () {
      // 通过触发mutation修改state中的count的值
      this.$store.commit('increment', 2)
    }
  },
```

### `mapMutations` 方法导入数据 `重点`

> 作用: 把vuex中的mutations的函数映射到组件的methods中
>
> 通俗：通过mapMutations函数可以生成methods中函数

* `script`脚本
  * 把vuex中的`mapMutations`数据映射到组件的计算属性中。(导入`mapMutations`)

```js
import {  mapMutations } from 'vuex'
```

* `script` 脚本 `methods:` Vue方法中
  * 调用`mapMutations` 方法 通过`methods:` Vue方法来声明
  * 当事件函数名称和mutation名称一致时候 可以简写为数组 ` ...mapMutations(['increment'])`

```js
methods: {
    // 1、对象参数的写法
    // ...mapMutations({
    //   // 冒号右侧的increment是mutation的名称
    //   // 冒号左侧的increment是事件函数的名称，可以自定义
    //   increment: 'increment'
    // })
    // 2、数组参数的写法（事件函数名称和mutation名称一致）
    ...mapMutations(['increment'])
    // 3、这种写法和第2种等效
    // increment (param) {
    //   // 点击触发该函数后要再次触发mutation的
    //   this.$store.commit('increment', param)
    // }
}
```

* `template`模板

```vue
    <button @click="increment(1)">点击+1</button>
```

总结：

1. mapMutations函数的作用：简化methods的定义
2. 原始方式：通过$store.commit方法触发mutation
3. 简写方式一：对象写法
4. 简写方式二：数组写法

## 异步数据获取 `action`

[处理异步获取action](https://vuex.vuejs.org/zh/guide/actions.html)

> 目标: Vuex的异步数据获取(不具备修改数据功能)
>
> 作用: `action` 获取数据后 需要导入 `mutations`中进行修改 (自身不具备修改条件)

* <font color = #ff3040>注意: 此方法写在 Vue方法`methods:` Vue方法里面</font>
* 常用于获取服务器的数据 `async await`
* 不具备修改数据功能 需要在 `mutations`中进行修改 然后再获取到
* action的作用：处理异步任务，获取异步结果后，把数据交给mutation更新数据
* 触发action需要使用  this.$store.dispatch
* action 支持获取 `promise`数据 并且支持导出

### 定义 `action`异步数据获取

* actions是固定的，用于定义异步操作的动作（函数）
* 本身不具备修改功能 需要导入到`mutations`中进行修改 然后再获取到
* 参数一 constext 类似this.$store 用来实例化 actions 
  参数二 payload接收传来的数值
* `commit`是触发`mutations`的Vuex方法 把异步数据获取到后 进入`mutations`进行同步数据获取
  *  context.commit('mutations 获取数据方法名', 储存的数据)
  * 异步数据获取后 `async` 处理后 把数据变成同步数据 然后 进入`mutations`进行同步数据获取

```js
  // 4. state: 储存组件的所有数据
  state: {
    demo: '你好',
    abc: 1,
    list: [] // 储存异步获取到的数据
  },
// actions是固定的，用于定义异步操作的动作（函数）
actions: {
    // 定义了一个action，用于查询接口数据 需要设置async取消异步 同步数据
    async queryData (context, payload) {
      // 参数一 constext 类似this.$store 用来实例化 actions 
      // 参数二 payload接收传来的数值
      // 1. 调用接口获取数据
        const ret = await axios.get('http://test.zjie.wang/tab')
      // 2. 必须触发mutation修改list的值
      // context类似于this.$store 实例化 actions
      // commit 是触发 mutations 里面的函数 连接同步数据获取的mutations中 把数据进行修改
      // 把数据设置到 mutations的 updateList方法名中 进行修改数据
        context.commit('updateList', ret.data.list) 
    }
},
// 3. mutations进行数据的变更
mutations: {
    updateList (state, payload) {
        // payload参数二是 获取数据的参数
      state.list = payload // 把数据 赋值给state储存 
    }
}
```

### 进入`mutations`进行同步数据获取简单的导入方法(非重点)

* 常用于 数据获取

```js
methods: {
    handleQuery () {
        // 触发action(必须调用dispatch方法)
        this.$store.dispatch('queryData', 111)
    }
}
```

### `mapActions` 方法获取数据 `重点`

> - mapActions辅助函数，把actions中的函数映射组件methods中
> - 通俗：通过mapActions函数可以生成methods中函数
> - 1. `mapActions` 方法获取 获取异步数据
>   2. 获取到的数据 通过Vuex的`mutations` 处理 储存到Vuex的 `state` 数据
>   3. 通过Vue文件的 `mapState` 方法导入 `state` 数据

* `script` 脚本
  * 把vuex中的`mapActions`数据映射到组件的计算属性中。(导入`mapActions`)

```js
import { mapActions } from 'vuex'
```

* `script` 脚本 `methods:` Vue方法中
  * 设置异步获取数据的方法 并且在 `state` 储存

```js
// 相当于 methods申明了一个函数fn(num){ this.$store.dispatch('queryData', num)} 
// ...mapActions({
//   fn: 'queryData'
// })
// 相当于 methods申明了一个函数getData(num){ this.$store.dispatch('getData', num)} 
...mapActions(['queryData'])
```

* `script` 脚本 `computed:` 计算方法
  * 在 `mapState` 导入 Vue 的` state`数据

```js
  computed: {
    ...mapState(['list']), // 导入state中储存的属性名(实际上是对象)
  },
```

* `script` 脚本`created()` 声明周期
  * 页面刷新时候 让其获取服务器异步数据
  * 需要先导入`mapActions` 方法 否则需要 this.$store.dispatch('mapActions方法名')

```js
 created () {
    // 触发加载热映数据的action
    // this.$store.dispatch('queryData')
    this.queryData()
  }
```

* `template` 模板
  * 获取 Vuex里面的`state`中的数据 循环遍历渲染到页面上

```vue
    <ul>
        <!-- 获取 Vuex里面的state中list的数据 循环遍历渲染到页面上 -->
      <li v-for="item in list" :key="item.id">{{item.title}}</li>
    </ul>
    <button @click="queryData">点击X</button>
```

### 异步数据登录实战例子

> **`目标`** 实现基本的登录功能 
>
> `插件` [饿了么ui表单](https://element.eleme.cn/#/zh-CN/component/form#form-biao-dan)  [表单验证validate](https://github.com/yiminghe/async-validator) [第三方包js-cookie](https://www.npmjs.com/package/js-cookie)

* 封装登录页的api接口 `api文件夹里面 urse.js`
  * 已经设置了 axios封装通用的接口模块 所以直接填入即可

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

* 在Vuex组件的`actions:`获取登录异步数据 `modules文件夹的 user.js`
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
    // 从浏览器缓存中 读取cookie值 如果没有 赋值为{} 防止报错
    token: getToken() || {}
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

* 登录vue文件 导入Vuex异步获取的登录信息 `login文件夹 index.js`
  * 使用了第三方表单验证 [validate](https://github.com/yiminghe/async-validator)
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

总结：

1. 原始方式：this.$store.dispatch('queryData', num)
2. 简化方式一：对象
3. 简化方式二：数组

## 处理state里的数据 `getters`

[getters处理数据](https://vuex.vuejs.org/zh/guide/getters.html)

> 目标：熟悉getters的应用场景和具体使用步骤
>
> 作用: 相当于state的计算属性（基于State处理成另外一份数据）
>
> 应用场景：模板中需要的数据和State中的数据不完全一样 需要基于state中的数据进行加工处理，形成一份新的的数据，给模板使用

* <font color = #ff3040>注意: 此方法写在 Vue方法`computed:` 计算属性</font>
* 只能修改 Vuex里面的`state`数据
* 如果Vue文件不调用此方法 数据在Vuex中不会做出改变(即便是设置了)
  * 即便调用了这个方法 `state` 里面原数据也不会被修改 `getters`方法调用时 只是在原数据上进行修改
* `getters`可以通过`mapGetters`映射到不同的组件中(这些组件共享这个`getters`) 这样有一个这些组件不需要再单独定义个子的计算属性 代码沉余度较低

### 定义 `getters` 修改state里数据

* 修改 `state`里数据 定义`getters`

```js
// state: 储存组件的所有数据
state: {
     // 需要修改的state数据
    list: [1,2,3,4] 
  },
// 相当于state的计算属性（基于State处理成另外一份数据）
// 进行state数据处理
getters: {
    getPartList (state) {
      return state.list.filter(item => {
        return item.id > 1
      })
    }
  }
```

### 简单使用方法(非重点)

```js
caleList () {
  // 注意：获取getters的值，不需要加括号（当属性使用）
  return this.$store.getters.getPartList
},
```

### `mapGetters` 方法处state数据

> * 如果Vue文件不调用此方法 数据在Vuex中不会做出改变(即便是设置了)
> * 导入`mapGetters` 方法后 循环遍历数据 需要设置为`mapGetters` 方法的数据
>   * 即便调用了这个方法 `state` 里面原数据也不会被修改 `getters`方法调用时 只是在原数据上进行修改

* `script` 脚本
  * 把vuex中的`mapGetters` 数据映射到组件的计算属性中。(导入`mapGetters` )

```js
import { mapGetters } from 'vuex'
```

* `script` 脚本 `computed:`计算属性
  * 处理Vuex里面的 `state`数据

```js
import { mapGetters } from 'vuex'
// mapGetters的作用：把getters映射为计算属性
computed: {
    ...mapGetters(['getPartList']),
    // ...mapGetters({
    //   calcList: 'getPartList'
    // }),
    // calcList () {
    //   // 注意：获取getters的值，不需要加括号（当属性使用）
    //   return this.$store.getters.getPartList
    // },
}
```

* `template`模板
  * 把修改的`state`数据 渲染到页面上

```vue
    <ul>
      <li v-for="item in getPartList" :key="item.id">{{item.title}}</li>
    </ul>
    <button @click="queryData">点击X</button>
```

总结：

1. getters相当于在State和组件之间添加一个环节（对state中的数据进行加工处理后再提供给组件）
2. getters不要修改state中的数据
3. getters类似之前的计算属性（基于state中的数据进行计算）

## 模块化拆分 `modules`

[modules模块拆分](https://vuex.vuejs.org/zh/guide/modules.html)

> 目标：Store中代码越来越多，不方便后续的维护和扩展 就需要用到 `modules`模块拆分
>
> 作用:  方便后期的维护和扩展

### 设置Vuex `modules`入口文件

> 在入口文件中可以导入所有的模块并进行统一配置

* 入口文件 设置 ` modules:` 模块接收拆分的 Vuex组件

```js
// 导入Vuex的组件
import Vue from 'vue'
import Vuex from 'vuex'
// 导入Vuex的拆分组件
import listModule from '@/store/list.js'
import detail from '@/store/detail.js'
// 实例化Vuex
Vue.use(Vuex)
// 导出store实例化对象(Vuex) 调用时 $store
export default new Vuex.Store({
// 导入Vuex模块化组件(接收拆分的Vuex组件)
  modules: {
 // 左边是自定义名称 用于导入到Vue文件 Vue文件导入的名称
 // 右边是导入拆分组件的名称 需要和import导入名称匹配
    list: listModule,
    detail,
    demo1,
    demo
  }
})
```

### 设置 Vuex拆分模块内部`(js文件)`

> 不同的功能可以拆分为不同的js模块

```js
// 导入axios(可选)
import axios from 'axios'
export default {
  // 设置为局部组件 必须要设置为局部组件 否则Vuex无法识别
  namespaced: true,
  // 储存数据 state
  // 如果箭头函数的返回值是对象，那么需要包裹一个小括号，否则会有歧义
  state: () => ({

  }),
  // 同步数据修改 mutations
  mutations: {

    }
  },
  // 异步数据获取 action
  actions: {

  },
  // 处理state里的数据 getters
  getters: { }
}
```

### 模块成员的访问规则 `namespaced: true`

- 全局模块 (不包含namespaced属性）:不同模块的相同成员名称会冲突 <font color=#ff3040>不推荐</font>
- 局部模块（包含namespaced属性）:不同模块的相同成员名称不会冲突，但是访问时需要添加前缀（模块名称）推荐<font color=#ff3040>推荐</font>

> 全局和局部模块的访问规则的区别 

1. 全局模式下（不加namespaced） <font color=#ff3040>建议使用局部模式</font>

   * 不支持数组方法 并且不支持简化 不推荐
   * 如果多个组件名称一致 会发生错误  <font color=#ff3040>不推荐使用!</font>

```js
// 在不添加命名空间的前提下（模块中不添加namespaced），安装如下的方式获取模块的状态数据
...mapState({
  msg: state => state.detail.msg
})
```

2. 局部模块下（添加namespaced）

   * 支持数组 并且常用 但是需要在 Vuex拆分模块添加 ` namespaced: true`

```js
// 如果模块添加的namespaced，那么可以按照如下方式简化
// 如下的参数一表示模块名称，参数二表示state中属性名称
...mapState('detail', ['msg'])
```

### 在Vue文件 访问模块成员的方法

>如果设置了 局部模块 ` namespaced: true` 就可以调用 数组写法 和 辅助函数

* 数组方法支持多个Vuex模块导入 辅助函数不支持

#### 数组简化写法 `  ('', [''])`

> 数组简化方法 不需要导入其他东西 并且支持多个Vuex模块导入

* `script` 脚本 
  * 数组简写 :`...mapActions('modules左侧设置的Vuex名称', ['Vuex模块中需要获取的数据'])`

```vue
<script>
//! 导入Vuex的mapState 获取 Vuex的state数据
//! 导入mapActions 让Vuex获取服务器异步数据
import { mapState, mapActions } from 'vuex'
export default {
  // 在计算属性中 导入state数据
  computed: {
    // 获取Vuex模块化的state指定数据 和 处理state数据getters
    ...mapState('detail', ['movieInfo'])
  },
   // 在函数方法中 设置 action异步 和 mutations同步 数据获取
  methods: {
    // 让Vuex模块化获取异步数据 并储存在Vue的state数据里面
    ...mapActions('detail', ['movieDetail'])
  },
  created () {
    //  声明周期 页面加载时候 调用异步获取Vuex方法 获取服务器数据(携带动态路由传来的id)
    this.movieDetail(this.$route.query.id) // 携带 动态路由传来的电影详情id 获取电影详情的内容
  }
}
</script>

```

#### 通过辅助函数进行简化 `createNamespacedHelpers`

> 需要在Vue文件里 导入createNamespacedHelpers 并且不支持多个Vuex模块导入

* `script` 脚本 
  * 并不支持 多个Vuex模块导入

```js
<script>
// 创建基于某个命名空间辅助函数 用来导入 Vuex组件化的数据
import { createNamespacedHelpers } from 'vuex'
// ~ 导入Vuex的mapState 获取 Vuex的state数据
// ~ 导入mapActions 让Vuex获取服务器异步数据
// 导入Vuex 的组件化数据
// const { 用到的Vuex单一状态数(就是那四个值) } = createNamespacedHelpers('拆分的组件名')
const { mapState, mapActions } = createNamespacedHelpers('list')
export default {
  name: 'HotMovie',
  computed: {
    // ~ 导入Vuex的mapState 获取Vuex的state数据
    ...mapState(['mlist'])
  },
  methods: {
    // ~ 获取服务器异步数据的 导入Vuex的异步获取 mapActions方法
    ...mapActions(['movelist']),
  },
  created () {
    // ~ 声明周期 页面加载时候 调用异步获取Vuex方法 获取服务器数据
    // this.$store.dispatch('movelist')
    this.movelist()
  }
}
</script>
```

### 同时导入多和Vuex的拆分模块 `  ('', [''])`

> 利用数组简化写法 导入多个Vuex拆分模块

* `state` 不支持 数组对象方法 只能多次导入

1. 映射多次实现多模块导入

```js
  computed: {
      // 多次导入 state储存数据
    ...mapState('demo', ['listx']),
    ...mapState('demo1', ['list'])
  },
methods: {
    // 多次导入  methods同步数据 action异步数据同理
    ...mapActions('list', {
        getInfo1: 'getInfo'
    }),
        ...mapActions('detail', {
        getInfo2: 'getInfo'
    })
},
	// 声明周期调用methods同步数据
  created () {
    this.getInfo1()
    this.getInfo2()
  }
```

2. 通过数组方式映射一次
   * /可以在数组中写 并且/不会让重名的值覆盖 因为会被看成一个整体
   * [] 和 . 都是方法写法 
     *  this.fn()  === this['fn'] ()
   * `state` 不支持 数组对象方法 只能多次导入

```js
    // 多次导入  methods同步数据 action异步数据同理
methods: {
    ...mapActions([
      'list/getInfo', // 添加/ 不会被相同的getInfo覆盖 和前面的看做一个整体
      'detail/getInfo'
    ])
},
    // 声明周期调用methods同步数据
    created () {
    this['list/getInfo']() 
    this['detail/getInfo']()
}
```

## 全局Vuex组件

* 不加 `namespaced: true` 就是全局的Vuex组件
* 一般全局Vuex组件 单独设置在一个js文件中

### `mutation` 同步数据获取 Vuex全局

```js
// 定义一个打印消息的全局Vuex模块
const mutation = {
  showInfo (context, payload) {
    console.log(payload)
  }
}

export default {
  // 不加 namespaced: true 就是全局的Vuex组件
  getters:{},
  state: {},
  mutations: mutation, // 把定义的打印消息的组件 导入到全局Vuex模块
  actions: {}
}
```

* Vuex组件接收全局`mutation` 
  * 需要在后面设置 `{ root:true }` 才能获取到全局Vuex组件

```js
          // 接收全局mutation
          context.commit('showInfo', ret.data.data, { root: true })
```

