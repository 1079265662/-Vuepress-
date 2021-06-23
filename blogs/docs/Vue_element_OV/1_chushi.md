---
title: 1. OV系统 初始化
date: 2021-07-01
cover: https://tva2.sinaimg.cn/large/005INI3Xly8grslmb2p7gj31hc0u0h58.jpg
tags:
 - Vue
categories: Vue OV系统
---

::: tip 介绍
Vue OV系统初始化(基于 饿了么ui组件)<br>
:::

<!-- more -->

## 项目介绍

- [项目演示地址](http://ihrm-java.itheima.net/#/login)

> 总结：项目主要用于人力资源相关流程的信息管理（类似于OA）
>
> 员工管理；角色管理；权限管理；授权流程分析；组织架构......

## 测试项目初始化

[饿了么ui网站](https://element.eleme.cn/#/)

> 需求：熟悉Element-UI组件库的基本使用（类似于Vant）饿了么ui

1. 安装依赖包

```bash
npm i element-ui
```

2. 导入插件和样式(所有的组件全部导入)

```js
// 导入饿了么ui组件
import ElementUI from 'element-ui'
// 导入饿了么ui css样式
import 'element-ui/lib/theme-chalk/index.css'
// 实例化 饿了么ui
Vue.use(ElementUI)
```

3. 组件中可以使用任意Element-UI提供的组件了

```vue
<el-button type="primary">成功按钮</el-button>
```

- 表格组件的基本使用：
  - 需要向el-table中注入数据
  - 列和数据的关系由el-table-column组件的prop值决定

## vue-element-admin介绍

[vue-element-admin官方](https://panjiachen.github.io/vue-element-admin-site/zh/)

> **`目标`**: 熟悉通用的 vue后台集成方案**`vue-element-admin`**基本用法 <font color = #ff3040>(一般用基本模板)</font>
>
> [vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/) 是一个后台管理系统前端项目解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。
>
> 它使用了最新的前端技术栈，内置国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，可以帮助你快速搭建企业级中后台产品原型。
>
> 集成方案：[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
>
> * 集成方案: 全部功能版 不推荐开发使用 不方便修改
>
> <font color = #ff3040>基础模板：[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) </font> 
>
> * <font color = #ff3040>基础模板: 有部分功能 包含了基本的 **登录 / 鉴权 / 主页布局** 功能模板, 我们可以直接在该模板上进行功能的扩展和项目的二次开发。</font>

- 集成方案预览
  - 拉取代码支持设置文件名 结尾空格 英文名即可 (只能英文)

```bash
# 拉取代码
git clone https://github.com/PanJiaChen/vue-element-admin.git Englishname
# 切换到具体目录下
cd Englishname
# 用 npm i 下载依赖包
npm i 
# 启动开发调试模式  查看package.json文件的scripts可知晓启动命令
npm run dev
```

集成方案并不适合我们直接拿来进行二次开发，[基础模板](https://github.com/PanJiaChen/vue-admin-template)则是一个更好的选择。

基础模板, 包含了基本的 **登录 / 鉴权 / 主页布局** 功能模板, 我们可以直接在该模板上进行功能的扩展和项目的二次开发。

总结：vue-element-admin是一个基于Vue和Element-UI封装的一个后台管理系统的可以快速创建项目基本原型的包，集成方案提供可非常丰富的业务功能模块；基础版本提供最基础的项目架构，方便进行

## 正式初始化项目

> **`目标`**: 熟悉搭建一个vue中台项目的基本流程

1. 拉取基础模板代码(地址之后的名称可以修改默认克隆的项目名称)

```bash
git clone https://github.com/PanJiaChen/vue-admin-template.git myhr128
```

2. 安装项目依赖包

```bash
cd vue-admin-template
npm i
```

3. 启动项目

```bash
npm run dev
```

## 基于git管理项目

- git init 初始化仓库
- git add  添加所有代码到暂存区
- git commit  提交初始版本
- git remote add origin https://gitee.com/wzj1031/myhr128.git  添加远程仓库别名
- git push -u origin master  推送到远程

## 项目目录结构分析 `项目所有文件`

> **`目标`**: 熟悉基础模板的项目目录结构

```bash
├── build                      # 构建打包相关
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
│   └── settings.js            # 配置文件
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

此时,你可能会**眼花缭乱**, 因为生成的目录里面有太多的文件 我们在做项目时 其中最关注的就是**`src`**目录, 里面是所有的源代码和资源, 至于其他目录, 都是对项目的环境和工具的配置。



## 项目主要代码分析 `src`

> **`目标`**: 熟悉当前模板的基本运行机制和基础架构

```bash
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
│   └── settings.js            # 配置文件
```

### main.js

> 项目入口文件主要实现如下功能

![image-20210216103338274](https://i.loli.net/2021/06/21/Mb8Uoy9Se2Cgi56.png)

总结：

1. 导入相关的资源（样式）
2. 导入并配置ElementUI
3. 导入图标
4. 导入权限控制模块
5. 导入路由
6. 导入store
7. 配置跟组件

### App.vue

> 项目根组件主要提供如下功能

![image-20210216103509352](https://i.loli.net/2021/06/21/RxYZUlMmkNCde8Q.png)

总结

1. 左侧菜单
2. 右侧内容区（顶部导航；下面内容区）
3. 左侧菜单又进行了子组件拆分（拆的很稀碎）



### Sidebar文件夹 index.js

> <font color = #ff3040>export 支持 同时导入导出</font>

* `export { default as Navbar } from './Navbar' `
  *  `export`接收Navbar导出的默认组件 并且`as`起名 然后再用 `export` 再次将组件导出 导出名是 `as` 起得新名字 Navbar

```js
// 分别导入三个组件，然后分别起一个别名，然后直接导出
export { default as Navbar } from './Navbar'
export { default as Sidebar } from './Sidebar'
export { default as AppMain } from './AppMain'
```

> 总结：
>
> 1. 模块化导入的解构赋值支持起一个别名
> 2. 导入之后可以直接导出 export {成员名称} from ‘路径’

### permission.js

> **`permission.js`** 是控制页面登录权限(路由访问)的文件， 我们可以先将此处的代码进行注释或删除，现在还没做登录拦截，等我们构建权限功能时，再从0到1进行构建。

- 将代码进行注释

![image-20210216103659777](https://i.loli.net/2021/06/21/Ow8oqJY2z43LrmF.png)

### settings.js

> **`settings.js`**则是对于一些项目信息的配置，里面有三个属性 
>
> **`title`**(项目名称)，
>
> **`fixedHeader`**（固定头部）
>
> **`sidebarLogo`**（显示左侧菜单logo）
>
> **`settings.js`**中的文件在其他的位置会引用到，所以这里暂时不去对该文件进行变动
>
> 注意：一般全局设置信息（后续有可能需要手动修改）

```js
// 可能需要修改的三个状态 标题状态 头部固定状态 左侧logo控制状态
// 全局信息 并且后期需要手动修改 一把写在这里
module.exports = {
  // 标题设置
  title: '人力资源项目',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  // 控制头部是否固定
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  // 控制左侧logo是否显示
  sidebarLogo: true
}

```



### Vuex结构

> 当前的Vuex结构采用了模块形式进行管理共享状态，其架构如下

![image-20210216103849198](https://i.loli.net/2021/06/21/VKZ7pMQPTlhqcuf.png)

- 其中app.js模块和settings.js模块，功能已经完备，不需要再进行修改。 user.js模块是我们后期需要重点开发的内容，所以这里我们将user.js里面的内容删除，并且导出一个默认配置

```js
export default  {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {}
}
```

- 导入Vuex拆分组件 `index.js`
  - 导入Vuex组件 需要写在 `modules` 写在`modules`外面的全局Vuex组件

```js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  // Vuex中除了局部模块之外 也可以有全局模块
  // 全局模块写在modules外面
  getters
})

export default store
```

> 总结：
>
> 1. 默认生成3个局部模块：app.js/settings.js/user.js
> 2. vuex也支持全局模块（拆分独立的全局模块global.js）
> 3. getters可以直接放到全局模块即可

### scss css扩展语言

> 该项目还使用了[scss](https://www.sass.hk/)作为css的扩展语言，在**`styles`**目录下，我们可以发现scss的相关文件
>
> 1. less
> 2. sass/scss
> 3. stylus

![image-20210216111548825](https://i.loli.net/2021/06/21/2FH6L4enuqDU87d.png)

> 样式导入：入口文件index.scss;间接导入其他样式
>
> index 入口文件
>
> element-ui 覆盖element-ui的默认样式
>
> mixin 提前定义的样式，可以再其他地方多次使用 `(设置全局sass样式 导入vue组件中)`
>
> * sass声明(导出)全局样式 `@mixin` 接收(导入)全局样式是 `@include`
>
> sidebar 表示左侧菜单样式
>
> transition 表会动画相关样式
>
> variables 表示通用的变量

#### scss css扩展语言

> scss 原称 sass 是css扩展语言之一 

* sass的定义变量是 `$` 而less 定义变量是 `@`

![image-20210621202020367](https://i.loli.net/2021/06/21/NCdPoaOgJQmHEL9.png)

* sass的导入自己文件方式 `@import '路径';` 没有from

```scss
// sass 导入文件的方式 没有from
@import './variables.scss';
@import './mixin.scss';
@import './transition.scss';
@import './element-ui.scss';
@import './sidebar.scss';
```

* sass声明(导出)全局样式 `@mixin` 接收(导入)全局样式是 `@include`

![image-20210621202711224](https://i.loli.net/2021/06/21/9OnxNqmYL2etDAo.png)

* sass文件 导入到Vue中 如果用到 `@` 需要在前面添加 `~`
  * 如果你不用`@` 直接 `../` 就不需要 `~`

```scss
// sass导入样式文件时候 需要加一个 ~符号
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
// 但是 如果你用 ../ 就不需要加 ~
@import '../styles/mixin';
```

> 与less的区别

- 定义变量（less使用@;sass使用$）

- :export 表示导出样式变量用于给js环境使用

  - 一、在 scss 文件中用 `:export` 写入你要获取的变量名：

    ```scss
    // vars.scss
    
    $color-primary: #3c8dbc;
    $bg: #ffffff;
    
    :export {
      colorPrimary: $color-primary;
      bgColor: $bg;
    }
    ```

    二、之后再你要导入的文件中引入这个文件：

    ```js
    import styles from '../assets/css/vars.scss'
    
    export default {
        data () {
            return {
                bgColor: styles.bgColor
            }
        }
    }
    ```

### icons

> 图标的文件结构如下

![image-20210216111619982](https://i.loli.net/2021/06/21/ohS5TQcO6r7UAMd.png)

> 总结：如何使用svg图标？
>
> 1. 把图标svg文件复制到icons/svg目录中
> 2. 使用svg-icon全局组件配置图标
>
> `<svg-icon class-name='abc' icon-class='user'></svg-icon>`
>
> - iconClass的值是svg文件的名称(更换图标时候 更换iconClass名称即可)
>
> - className可以定制图标的样式

### 使用svg图标的位置 

> svg图标路径: @/src/layout/components/SideBar/Item.vue

```js
  // render是渲染组件模板 和 template效果一样 但是没人会用render写
  // render 函数比 template更底层 更好编译(Vue提供)
  // 脚手架环境下 template不支持 只能用 render渲染模板
  render (h, context) { // render 参数1是返回自身 需要return 参数2 可以获取父组件传递过来的值
    // 这里用的是 JSX JSX 差值表达式用的单的花括号(Vue3取消可用{{}} )
    // 使用JSX必须要外包一层唯一的根节点(div)
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
```

> 总结：字体图标的用法；render函数的作用
>
> 注意：
>
> 1. 数组中直接放入标签（HTML或者组件标签）形式的代码其实就是JSX。
> 2. render函数参数二可以获取父组件传递过来的属性值。

## Vue中实现组件的模板方式

> Vue组件的模板由如下三种写法

- template 传统的定义组件的方式(不可以用在Vue脚手架)
- el 只能用在 new Vue实例场景中
- render 更加底层的一种模板实现 (可以用在Vue脚手架等特殊情况)

```js
// template模板写法
Vue.component('my-com', {
  template: '<div>hello</div>',
  data () {
    return {
      msg: ''
    }
  }
})
// el模板写法
new Vue({
  el: '#app',
  data: {
    msg: ''
  }
})
// render 模板写法
  // 组件的模板可以由render函数提供
  render (createElement) {
    // createElement的参数
    // 参数一，表示标签名称
    // 参数二，表示里面的内容子元素
    return createElement('div', 'hello')
  }
})
```

> 总结：组件的模板由几种写法？
>
> 1. el 只能用在 new Vue实例场景中
> 2. template 传统的定义组件的方式
> 3. render 更加底层的一种模板实现
> 4. 单文件组件中的模板（template标签）

- render函数对JSX的支持
  - Vue的render函数支持JSX作为返回值，这个返回值本质上是虚拟DOM节点 

```js
  render (createElement) {
    // js结合标签一块写（JSX）
    // Vue 的render函数支持React的JSX语法规则
// JSX的语法结构是再js代码中写html标签和组件标签
// JSX中的标签 可以作为函数参数 返回值 也可以赋值给一个变量
    // JSX外面也要包一层div
	return(
       <div>
         <div>tome</div>
        <div>jerry<div>
        </div>
  )
}
```

> 总结：
>
> 1. JSX：React框架提供的语法规则（在js代码中直接写HTML标签（组件标签））
> 2. Vue的render函数支持JSX作为返回值，这个返回值本质上是虚拟DOM节点 VNode
> 3. 虚拟DOM节点VNode本质上就是对象，这个对象描述了真实的DOM元素。

## API模块介绍

> **`目标`** 介绍API模块的单独请求和 request模块的封装

- axios拦截器原理

![image-20210216112010676](https://i.loli.net/2021/06/22/hKv9NVL3pWxQBAf.png)

![image-20210403164509767](https://i.loli.net/2021/06/22/4IMt59PkQn8YCGg.png)

- 创建axios实例 `utils/request.js`

```js
import axios from 'axios'
// 基准路径
export const baseURL = 'http://ihrm-java.itheima.net/api/'

// 创建一个新的axios实例
const instance = axios.create({
  // 设置基准路径
  baseURL: baseURL,
  // 请求超过这么多时间还没有返回就报错
  timeout: 5000
})

// 封装一个通用的请求方法
export default (options) => {
  return instance({
    method: options.method || 'GET',
    url: options.url,
    data: options.data,
    params: options.params,
    headers: options.headers
  })
}
```

- api模块单独封装

```js
// import request from '@/utils/request'

// 实现登录
export function login(data) {
 
}
// 获取用户信息
export function getInfo(token) {

}

// 实现退出
export function logout() {

}
```

## 项目公共样式处理

> **`目标`** 将一些公共的图片和样式资源放入到 规定目录中
>
> - 图片资源在课程资料的图片文件中，我们只需要将**`common`**文件夹拷贝放置到 **`assets`**目录即可
>
> - 样式资源在  资源/样式目录下
>
> 修改**`variables.scss`** （我们在**`variables.scss`**添加了一些基础的变量值）
>
> 新增**`common.scss`**  我们提供了 一份公共的**`common.scss`**样式,里面内置了一部分内容的样式,在开发期间可以帮助我们快速的实现页面样式和布局）
>
> 注意在scss文件中，通过**@import** 引入其他样式文件，需要注意最后加分号，否则会报错。

- 将两个文件放置到**styles**目录下，然后在**`index.scss`**中引入该样式

```scss
@import './common.scss'; // 引入common.scss样式表 (在最下面导入)
```

