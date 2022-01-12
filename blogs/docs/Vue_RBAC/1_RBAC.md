---
title: RABC权限学习记录文档
date: 2022-01-11
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-9m92rx-min.jpg
tags:
 - Vue
 - axios
 - RABC
categories: RABC
---

::: tip 介绍

RABC权限学习记录文档 从头到尾学习文档<br>
:::

<!-- more -->

## 权限流程图

* [整体权限的流程总结图pdf](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E6%95%B4%E4%BD%93%E8%AE%BF%E9%97%AE%E9%89%B4%E6%9D%83%E6%B5%81%E7%A8%8B.pdf)
* [本地仓库地址](https://gitee.com/liu_kaili/mine-project-advanced-revision)
* [项目体验地址](http://element-admin.ynitmk.cn/)  账户 admin  密码 1234

* 前端主体权限流程图(前端流程)

![image-20211208172131082](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211208172131082.png)

* 后端权限流程图(表结构 仅供参考)

![image-20211213101322386](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211213101322386.png)

## 权限学习地址

* 我是通过[腾讯课堂](https://ke.qq.com/course/3451173)来学习的权限管理内容 所有的笔记都按照其授课内容记录的 请先浏览该项目后 符合项目设计需求后 再继续浏览本记录

## 权限准备工作

> 后端兄弟需要怎么配合你呢

* 首先 需要后端把权限按照你需要的格式返回给你

  * `roles` 是用户拥有权限的合集 前端是通过`roles`来判断用户是否具备路由权限和路由按钮权限(元素) <font color = #ff3040>注意: 必须是一个数组格式 </font>

  ![image-20211212191435998](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211212191435998.png)

  * 然后 你需要让后端生成全部动态路由菜单  <font color = #ff3040>注意: 必须让后端这样做</font>
    * 这里的动态路由菜单就是路由权限 前端会通过vue element admin 中提供的路由权限架构实现路由的整体权限控制 
      * vue element admin 提供了meta对象 里面包含`roles` 就是控制路由权限的凭证

  ![image-20211212191525037](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111094334915.png)

  * 其次 是路由按钮(元素)的权限 在第二阶段中

> 前端准备工作

* 如果我们用的是[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/) 框架 就必须要要知道登录和权限流程

0. 二次封装一个 axios请求库 `request.js` (按需)

   * 需要qs包 qs是一个url参数转化（parse和stringify）的js库

   ```bash
   npm i qs
   ```

   * 这里是按需封装 如果你有需要的话 
   * 请求拦截器往里面塞了请求头token

   ```js
   import axios from 'axios'
   import { MessageBox, Message } from 'element-ui'
   import store from '@/store'
   import { getToken } from '@/utils/auth'
   import qs from 'qs'
   // create an axios instance
   const service = axios.create({
     // 默认url基本路径
     baseURL: 'http://42.193.158.170:8089',
     // withCredentials: true, // send cookies when cross-domain requests
     timeout: 5000 // request timeout
   })
   
   // request interceptor
   // 发送请求之前的拦截器
   service.interceptors.request.use(
     config => {
       // do something before request is sent
       // 从store里面获取token，如果token存在，
       // 把token添加到请求的头部Headers里面
       if (store.getters.token) {
         // let each request carry token
         // ['X-Token'] is a custom headers key
         // please modify it according to the actual situation
         // 把token添加到请求的头部
         ['token'] = getToken()
       }
       return config
     },
     error => {
       // do something with request error
       console.log(error) // for debug
       return Promise.reject(error)
     }
   )
   
   // response interceptor
   // 请求返回之后的拦截器
   service.interceptors.response.use(
     /**
      * If you want to get http information such as headers or status
      * Please return  response => response
     */
   
     /**
      * Determine the request status by custom code
      * Here is just an example
      * You can also judge the status by HTTP Status Code
      */
     response => {
       const res = response.data
       // console.log(response)
       // console.log(res)
       // if the custom code is not 20000, it is judged as an error.
       if (res.code !== 200) {
         // 验证码处理：返回的是arraybuffer,需要转车base64
         // 1.把arraybuffer转换成二进制字符
         // 2.把二进制字符转换为base64 (btoa方法)字符给img使用
         const indexs = response.config.responseType
         if (indexs === 'arraybuffer') {
           return Promise.resolve(
             'data:image/png;base64,' +
             btoa(
               new Uint8Array(res).reduce(
                 (data, byte) => data + String.fromCharCode(byte), ''
               )
             )
           )
         }
         Message({
           message: res.msg || '服务器出错',
           type: 'error',
           duration: 5 * 1000
         })
   
         // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
         if (res.code === 600 || res.code === 50012 || res.code === 50014) {
           // to re-login
           MessageBox.confirm('用户登录信息过期，请重新登录！', '系统提示', {
             confirmButtonText: '登录',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             store.dispatch('user/resetToken').then(() => {
               location.reload()
             })
           })
         }
         return Promise.reject(new Error(res.msg || '服务器出错'))
       } else {
         return res
       }
     },
     error => {
       console.log('err' + error) // for debug
       Message({
         message: error.msg || '服务器出错',
         type: 'error',
         duration: 5 * 1000
       })
       return Promise.reject(error)
     }
   )
   
   // 请求方法
   const http = {
     post (url, params) {
       return service.post(url, params, {
         transformRequest: [(params) => {
           return JSON.stringify(params)
         }],
         headers: {
           'Content-Type': 'application/json'
         }
       })
     },
     put (url, params) {
       return service.put(url, params, {
         transformRequest: [(params) => {
           return JSON.stringify(params)
         }],
         headers: {
           'Content-Type': 'application/json'
         }
       })
     },
     // parm =>  {id:10}
     // http://localhost:8089/api/user?id=10
     get (url, params) {
       return service.get(url, {
         params: params,
         paramsSerializer: (params) => {
           return qs.stringify(params)
         }
       })
     },
     // parm =>  {id:10}
     // http://localhost:8089/api/user/10
     getRestApi (url, params) {
       let _params
       if (Object.is(params, undefined || null)) {
         _params = ''
       } else {
         _params = '/'
         for (const key in params) {
           console.log(key)
           console.log(params[key])
           // eslint-disable-next-line no-prototype-builtins
           if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== '') {
             _params += `${params[key]}/`
           }
         }
         // 去掉参数最后一位?
         _params = _params.substr(0, _params.length - 1)
       }
       console.log(_params)
       if (_params) {
         return service.get(`${url}${_params}`)
       } else {
         return service.get(url)
       }
     },
     // parm =>  {id:10}
     // http://localhost:8089/api/user/10
     delete (url, params) {
       let _params
       if (Object.is(params, undefined || null)) {
         _params = ''
       } else {
         _params = '/'
         for (const key in params) {
           // eslint-disable-next-line no-prototype-builtins
           if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== '') {
             _params += `${params[key]}/`
           }
         }
         // 去掉参数最后一位?
         _params = _params.substr(0, _params.length - 1)
       }
       if (_params) {
         return service.delete(`${url}${_params}`).catch(err => {
           Message.error(err.msg)
           return Promise.reject(err)
         })
       } else {
         return service.delete(url).catch(err => {
           Message.error(err.msg)
           return Promise.reject(err)
         })
       }
     },
     upload (url, params) {
       return service.post(url, params, {
         headers: {
           'Content-Type': 'multipart/form-data'
         }
       })
     },
     login (url, params) {
       return service.post(url, params, {
         transformRequest: [(params) => {
           return qs.stringify(params)
         }],
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         }
       })
     },
     getImage (url) {
       return service.post(url, null, {
         responseType: 'arraybuffer'
       })
     }
   }
   export default http
   
   ```

   * 封装后 api请求的格式 `api.js`
     * 二次封装axios后 我们直接async awite

   ```js
   import http from '@/utils/requestStudent'
   
   // 登录
   export async function login (parms) {
     return await http.login('/api/user/login', parms)
   }
   // 获取用户信息和权限信息
   export async function getInfo () {
     return await http.get('/api/sysUser/getInfo')
   }
   // 获取全部的动态路由
   export async function getMenuList () {
     return await http.get('/api/sysUser/getMenuList')
   }
   // 获取用户列表
   export async function getUserListApi (parm) {
     return await http.getRestApi('/api/user/list', parm)
   }
   ```

1. 登录实际上是再vuex中进行的 通过vuex来获取的登录信息(用户拥有的权限集合) 和 动态路由信息

   * 登录信息(用户拥有的权限集合) `Vuex中 user.js`
     * 这里的 `login, logout, getInfo` 可以替换成自己的接口数据

   ```js
   import { getToken, setToken, removeToken } from '@/utils/auth'
   import router, { resetRouter } from '@/router'
   import { login, getInfo } from '@/api/students/student'
   
   const state = {
     // 通过cookie获取token
     token: getToken(),
     // 用户名
     name: '',
     // 用户头像
     avatar: '',
     // 用户简介
     introduction: '',
     // 用户拥有的权限集合
     roles: [],
     // 用户id
     userId: ''
   }
   
   const mutations = {
     SET_TOKEN: (state, token) => {
       state.token = token
     },
     SET_INTRODUCTION: (state, introduction) => {
       state.introduction = introduction
     },
     SET_NAME: (state, name) => {
       state.name = name
     },
     SET_USERUID: (state, userId) => {
       state.userId = userId
     },
     SET_AVATAR: (state, avatar) => {
       state.avatar = avatar
     },
     SET_ROLES: (state, roles) => {
       state.roles = roles
     }
   }
   
   const actions = {
     // user login  用户登录 用作用户登录
     login ({ commit }, userInfo) {
       // 解构出用户名和密码
       const { username, password, code } = userInfo
       // 调用promise方法登录
       return new Promise((resolve, reject) => {
         // 调用api/user里面的login方法
         login({
           // 用户登录的信息
           username: username.trim(),
           password: password,
           code: code
         }).then(response => {
           console.log(response)
           // 结构token
           const { token } = response
           // 把后端返回的token存到vuex中
           commit('SET_TOKEN', token)
           // 把后端返回的token存到cookies里面
           setToken(token)
           resolve()
         }).catch(error => {
           reject(error)
         })
       })
     },
   
     // get user info 这里是路由信息
     getInfo ({ commit, state }) {
       return new Promise((resolve, reject) => {
         // 调用api/user里面的getInfo方法获取用户信息和权限信息
         getInfo(state.token).then(response => {
           console.log(response)
           // 结构数据
           const { data } = response
           if (!data) {
             reject('Verification failed, please Login again.')
           }
   
           const { roles, name, introduction, id } = data
   
           // roles must be a non-empty array
   
           // roles必须是一个数组
           if (!roles || roles.length <= 0) {
             reject('getInfo: roles must be a non-null array!')
           }
           // 把权限字段放到sessionStorage里面
           sessionStorage.setItem('codeList', JSON.stringify(roles))
           // 把roles存到store里面
           commit('SET_ROLES', roles)
           const userImg = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
           commit('SET_USERUID', id)
           commit('SET_NAME', name)
           commit('SET_AVATAR', userImg)
           commit('SET_INTRODUCTION', introduction)
           // console.log(state)
           resolve(data)
         }).catch(error => {
           console.log(error)
           reject(error)
         })
       })
     },
   
     // user logout
     // logout ({ commit, state, dispatch }) {
     //   return new Promise((resolve, reject) => {
     //     logout(state.token).then(() => {
     //       commit('SET_TOKEN', '')
     //       commit('SET_ROLES', [])
     //       removeToken()
     //       resetRouter()
   
     //       // reset visited views and cached views
     //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
     //       dispatch('tagsView/delAllViews', null, { root: true })
   
     //       resolve()
     //     }).catch(error => {
     //       reject(error)
     //     })
     //   })
     // },
   
     // remove token
     resetToken ({ commit }) {
       return new Promise(resolve => {
         commit('SET_TOKEN', '')
         commit('SET_ROLES', [])
         removeToken()
         resolve()
       })
     },
   
     // dynamically modify permissions
     async changeRoles ({ commit, dispatch }, role) {
       const token = role + '-token'
   
       commit('SET_TOKEN', token)
       setToken(token)
   
       const { roles } = await dispatch('getInfo')
   
       resetRouter()
   
       // generate accessible routes map based on roles
       const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
       // dynamically add accessible routes
       router.addRoutes(accessRoutes)
   
       // reset visited views and cached views
       dispatch('tagsView/delAllViews', null, { root: true })
     }
   }
   
   export default {
     namespaced: true,
     state,
     mutations,
     actions
   }
   
   ```

   * 动态路由信息 `Vuex中 permission.js`
     * 这里是生成动态路由的内容
     * `permission`非常关键 他会通过循环去判断 用户的`rolse`合集中的路由权限 是否和动态路由菜单匹配 然后生成权限动态路由

   ```js
   import { constantRoutes } from '@/router'
   import { getMenuList } from '@/api/students/student'
   import Layout from '@/layout'
   
   /**
    * Use meta.role to determine if the current user has permission
    * @param roles
    * @param route
    */
   function hasPermission (roles, route) {
     if (route.meta && route.meta.roles) {
       return roles.some(role => route.meta.roles.includes(role))
     } else {
       return true
     }
   }
   
   /**
    * Filter asynchronous routing tables by recursion
    * @param routes asyncRoutes
    * @param roles
    */
   export function filterAsyncRoutes (routes, roles) {
     const res = []
     // 循环每一个路由
     routes.forEach(route => {
       // console.log(route)
       const tmp = { ...route }
       // console.log(tmp)
       // 判断是否有权限
       if (hasPermission(roles, tmp)) {
         const component = tmp.component
         if (route.component) {
           if (component === 'Layout') {
             // 如果是一级
             tmp.component = Layout
           } else {
             // 如果是二三级 因为后端返回的数据格式很标准 所以只需要这样写即可
             tmp.component = (resolve) => require([`@/views${component}`], resolve)
           }
         }
         // 判断是否有下级
         if (tmp.children) {
           tmp.children = filterAsyncRoutes(tmp.children, roles)
         }
         res.push(tmp)
       }
     })
     // console.log(res)
     return res
   }
   
   const state = {
     routes: [],
     addRoutes: []
   }
   
   const mutations = {
     SET_ROUTES: (state, routes) => {
       state.addRoutes = routes
   
       // 把过滤出来有权限的路由添加到不需要权限的路由里面去
       state.routes = constantRoutes.concat(routes)
       console.log(state.routes)
     }
   }
   
   const actions = {
     generateRoutes ({ commit }, roles) {
       return new Promise((resolve, reject) => {
         // 存的是有权限的路由，是一个数组
         getMenuList().then(res => {
           console.log(res)
           let accessedRoutes
           // 判断书否获取成功
           if (res.code === 200) {
             // 生成动态路由菜单
             accessedRoutes = filterAsyncRoutes(res.data, roles)
           }
           commit('SET_ROUTES', accessedRoutes)
           resolve(accessedRoutes)
         }).catch(error => {
           reject(error)
         })
       })
     }
   }
   
   export default {
     namespaced: true,
     state,
     mutations,
     actions
   }
   
   ```

2. 路由守卫也需要单独配置 判断用户是否登录 和 他所拥有的角色权限 `permission.js` 

   * 这里是路由守卫中的 `permission.js` 不是Vuex中的

   ```js
   // axios的路由导航守卫 配合Vue-router 实现登录权限功能(在router上设置axios导航守卫)
   // 导入Vue-router方法 (在Vue组件内需要 this.$router 组件外直接router 使用即可)
   import router from './router/index'
   // 导入Vuex(获取其全局token值)
   import store from './store/index'
   // 从cookie获取 getToken (暂时不用)
   import { removeToken } from '@/utils/auth' // get token from cookie
   // 创建一个路径白名单 里面填写的是路径 (允许用户游客模式访问一些内容 比如登录页 404 没必要验证)
   const white = ['/login', '/404']
   // 创建路由导航守卫
   router.beforeEach(async (to, from, next) => {
     //! 读取Vuex全局组件 判断是否存在token
     // 从Vuex全局组件中 读取保存的token(储存在getters里面)
     // const token = store.getters.token
     //! 读取用户的token
     const hasToken = store.getters.token || null
     // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
     // console.log(hasToken)
     // 调用全局vuex的登录(这里是重新调用 实际上不需要重新调用 调用userInfo即可)
     // if (!store.state.userInfo) {
     //   store.dispatch('login')
     // }
     // 如果存在token
     if (hasToken) {
       // 如果存在token 并且当前在登录页 让其跳转到主页
       if (to.path === '/login') { // to 表示要跳转到哪里去
         next('/')
       } else {
         //! 如果存在路由数据
         const hasRoles = store.getters.roles && store.getters.roles.length > 0 // token要删除(这里防止多次调用)
         // 如果不在登录页面上 直接通过 不做处理(因为已经登录访问 无需再跳转)
         // 获取用户的信息(路由菜单信息)
         // 为什么需要判断用户信息是否存在？（我们认为登录系统后已经得到了用户信息）
         // 但是，获取用户信息的流程是异步的，路由访问时，用户信息尚未返回
         if (hasRoles) {
           // 如果用户信息存在 不做处理直接通过
           next()
         } else {
           try {
             //! rolse必须是数组 ['admin'] or ,['developer','editor']
             // 获取用户信息和权限信息
             const { roles } = await store.dispatch('user/getInfo')
             // generate accessible routes map based on roles
             // 获取动态生成的路由数据
             const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
             // console.log(accessRoutes)
             // dynamically add accessible routes
             // 添加到我们的路由
             router.addRoutes(accessRoutes)
             console.log(accessRoutes)
             next({ ...to, replace: true })
           } catch (error) {
             // 获取不到返回登录页
             next('/login')
             // 清除所有信息
             localStorage.clear()
             // 清除cookie
             removeToken()
           }
           // // 如果用户信息不存在 获取用户的信息(调用Vuex里面获取信息的方法)
           // await store.dispatch('user/getInfo') // 重新调用Vuex方法获取数据
           // // await之后是可以获取用户信息的(用户可以获取的动态路由)
           // const menus = store.state.user.userInfo.roles.menus
           // // 下一步通过menus控制当前用户的路由权限
           // // 根据menus信息从所有的动态路由asyncRoutes中过滤出该用户所拥有的的动态路由信息
           // // 通过action过滤用户的路由权限,把路由映射信息存储在store中
           // // action的返回值表示当前用户所拥有的的动态路由
           // const myRoutes = await store.dispatch('permission/filterAuth', menus) // menus参数是用户拥有的动态路由权限 传递给Vuex进行动态路由筛选
           // // 动态配置路由
           // // 配置404 因为404是*路由 是全局匹配 要最后导入 先导入静态+动态路由的整合 再导入404
           // router.addRoutes([...myRoutes, { path: '*', redirect: '/404', hidden: true }])
           // // 继续跳转当前路由
           // next({
           //   ...to,
           //   // 仅仅保留一个跳转历史（如果动态添加路由了，那么路由需要重新访问一次，这样的话，通样的路径访问的两次，路由历史重复了，不友好，所以可以把这两个合并为一个）
           //   replace: true
           // })
         }
       }
     } else {
       // 如果不存在token 判断是否在白名单中(游客可以访问的路径)
       if (white.includes(to.path)) { // includes()是数组方法 检测是否包含指定内容
         // 在白名单里面，放行通过即可
         next()
       } else {
         // 如果不在白名单里面 跳转到登录页面
         next('/login')
         // 清除所有信息
         localStorage.clear()
         // 清除cookie
         removeToken()
       }
     }
   })
   ```

## 第一阶段: 路由权限的实现

* 权限分为两个阶段

1. <font color =#ff3040>路由权限 </font>也就是左侧菜单栏的权限 属于主体权限 是判断用户有权访问该页面的权限
2. <font color =#ff3040>按钮权限(元素权限)</font> 也就是进入页面后 内容显示与否的权限 是判断用户是否有权看到该元素 或者具备按钮等元素交互的权限

> 登录模块数据

* 登录所获取的数据 <font color =#ff3040>1. 用户的个人信息 其中包含权限信息合集 2. 获取动态路由信息 配合权限信息合集</font> 通过获取到用户的权限合集 配合需要权限的动态路由信息 才能实现 <font color =#ff3040>按钮和路由的权限</font>

  * 用户的个人信息 其中包含权限信息合集 
    * 第一阶段的路由权限 只需要用到路由权限 不需要按钮(元素)的权限

  ![image-20211212191435998](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211212191435998.png)

  * 路由合集数据类型介绍

  ![image-20220110113745507](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220110113745507.png)

  * 获取动态路由信息 配合权限信息合集
    * 你需要让后端生成全部**动态路由菜单**  <font color = #ff3040>注意: 必须让后端这样做</font>

  ![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111094334915.png)

* 登录个人信息json: [登录个人信息json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E7%99%BB%E5%BD%95%E5%90%8E%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF.json)

* **动态路由菜单**json: [动态路由菜单json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.json)

> 登录模块流程

* 登录功能整体流程图

![image-20211213085442657](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211213085442657.png)

> 前端的权限列表的结构 (参考结构)

* 路由格式文件

![image-20220110135137882](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220110135137882.png)

* 路由权限结构

```js
  {
    path: '/nested',
    component: Layout,
    name: 'Nested',
    redirect: 'noRedirect',
    meta: {
      title: '服务板块',
      icon: 'nested',
      roles: ['sys:serve']
    },
    children: [
      {
        path: 'menuAll',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu0',
        meta: {
          title: '设备管理',
          icon: 'el-icon-s-help',
          affix: true,
          roles: ['sys:equipment']
        },
        children: [
          {
            path: 'menu1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1',
            meta: {
              title: '客户管理',
              icon: 'kehu',
              roles: ['sys:client']
            }
          },
          {
            path: 'menu2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu2',
            meta: {
              title: '工区管理',
              icon: 'clipboard',
              roles: ['sys:gong']
            }
          },
          {
            path: 'menu3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu3',
            meta: {
              title: '设备管理',
              icon: 'tab',
              roles: ['sys:device']
            }
          },
          {
            path: 'AssemblyChange',
            component: () => import('@/views/nested/menu1/menu1-3/AssemblyChange'),
            name: 'AssemblyChange',
            hidden: true,
            meta: {
              title: '设备管理编辑页',
              noCache: true,
              roles: ['sys:device']
            }
          },
          {
            path: 'Assemblymanagement',
            component: () => import('@/views/nested/menu1/menu1-4/Assemblymanagement'),
            name: 'Assemblymanagement',
            hidden: true,
            meta: {
              title: '总成管理编辑页',
              noCache: true,
              roles: ['sys:assy']
            }
          },
          {
            path: 'menu4',
            component: () => import('@/views/nested/menu1/menu1-4'),
            name: 'Menu4',
            meta: {
              title: '总成管理',
              icon: 'all',
              roles: ['sys:assy']
            }
          }
        ]
      }
    ]
  },
```

## 机构管理模块(非代码)

> 展示效果(前端)

* 查询前端样式

![image-20211219175722785](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211219175722785.png)

* 添加部门的前端样式

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211231134953873.png)

> 数据介绍和关联关系

* 一个公司，下面有多个部门，每个部门下面可能还有下级部门，这些部门组合起来，就形成一个机构；

* 通常一个公司，有很多部门，存在上下级的关系，所以设计机构管理表时，设计为上下级关系的表；

| 字段         | 类型         | 备注                                               |
| ------------ | ------------ | -------------------------------------------------- |
| id           | int          | 主键                                               |
| pid          | int          | 上级部门id                                         |
| parent_name  | varchar(128) | 上级部门名称                                       |
| name         | varchar(128) | 部门名称                                           |
| dept_code    | varchar(36)  | 部门编码                                           |
| dept_phone   | varchar(20)  | 部门电话                                           |
| dept_address | varchar(255) | 部门地址                                           |
| like_id      | varchar(255) | 所有上级部门id和自己id的集合，逗号分隔如   1，3，5 |
| order_num    | int          | 序号                                               |
| manager      | varchar(36)  | 部门经理                                           |

* `like_id` 这个很关键 可以通过他去查上机部门id和自己的id集合 
  * 适合查当前部门下的所有字段 否则你需要用递归的方式去查 `like_id` 可以很方便的差所有内容

> 机构管理树形表单的结构 `el-table`树形数据 接口

* 你需要让后端来了解你需要哪些数据 这些数据和饿了么ui相对应

![image-20211219181333509](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211219181333509.png)

* 机构管理树形查询的结构json: [机构管理树形结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E7%BB%93%E6%9E%84%E7%AE%A1%E7%90%86%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84.json) 

> 添加部门查询的树形结构 `el-tree`树形数据 接口

* 添加部门的树形结构json: [添加部门的树形结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E6%9C%BA%E6%9E%84%E7%AE%A1%E7%90%86%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84.json) 

![image-20211222203357616](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211222203357616.png)

![image-20211222203213313](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211222203213313.png)

![image-20211222203236301](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211222203236301.png)

> 添加部门的接口 接口

* 他是通过`pid`(上级部门id) 来添加的 

> 删除部门 接口 

* 删除部门是携带需要删除部门的`id`(主键id) 来进行删除的

> 编辑部门 接口 

* 编辑部门接口是通过`pid`(上级部门id)来查询添加的

<font color =#ff3040>注意事项</font>

* 前端在用饿了么ui的时候 使用这种children格式的数据 一定要在 `el-table`上绑定 `:tree-props="{ children: 'children' }"` 否则无法渲染 `children`对应的应该是后端所返回的名称

## 权限管理(非代码)

> 展示效果(前端)

![image-20211227205708768](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211227205708768.png)

> 数据介绍和关联关系

* 权限管理是精确到按钮的管理内容 这里涉及到每个模块的按钮分配

![image-20211227210234355](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211227210234355.png)

![image-20211227210259841](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211227210259841.png)

![image-20211227210318965](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211227210318965.png)

<font color =#ff3040>注意: </font> 一级的类型是 `目录type 为0` 二级的类型是 `菜单type 为1` 三级的类型是 `按钮type 为3` 

* 目录对应的是路由 

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211227210734657.png)

* **菜单对应是路由中的内容**

![image-20211227210809213](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211227210809213.png)

*  按钮是路由内容中的按钮

![image-20211227210841368](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211227210841368.png)

> 权限管理树形结构查询接口

* 权限管理树形的结构json: [机构管理树形结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84.json) 

> 添加权限的树形结构 `el-tree`树形数据 接口 

![image-20211228111107856](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211228111107856.png)

![image-20211228111130731](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211228111130731.png)

![image-20211228111153740](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211228111153740.png)

* 添加权限的树形结构 `el-tree`树形数据 接口 : [添加权限的树形结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E6%B7%BB%E5%8A%A0%E6%9D%83%E9%99%90%E6%9F%A5%E8%AF%A2%E7%9A%84%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84%20.json)

> 新增权限管理按钮接口

* 新增权限管理接口 依据的是`pid`(上级部门id)

> 编辑权限管理按钮接口 

* 编辑权限管理按钮接口 依据的是 `id`(主键id)

> 删除权限管理按钮接口

* 依据的是 `id`(主键id)

## 角色管理

* 角色管理是查看总体角色有哪些 并且控制其可见路由(一二级)和页面内容(三级)

> 展示效果

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211229182430280.png)

> 角色管理查询接口

* 角色管理查询接口的结构json: [角色管理查询接口json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E8%A7%92%E8%89%B2%E6%9F%A5%E8%AF%A2%E6%8E%A5%E5%8F%A3.json)
  * 用户名称 `name`
  * 用户id `id`
  * 用户角色创建人id `createUser`

> 角色管理添加接口

* 添加操作需要携带创建人的`id`(当前用户的userid)

> 角色管理删除接口
>
> 

* 删除操作 需要携带删除的角色`id`(要删除角色的id)

### 分配权限思路

![image-20211230184150455](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211230184150455.png)

* 分配权限是一个难点 分配权限的数据是饿了么ui树形勾选结构 需要携带以下数据: 
  * `roleId` 为查询的角色id
  * `userId` 为当前用户的角色id 因为角色id要作为可分配的一个筛选条件
    * 也就是说 当前角色权限不能修改比他自身大的权限 树形结构数据只能返回当前角色所拥有的的权限 自身没有的能不返回显示
* 分配权限查询接口有两个内容 

1. `checkList` 当前用户那些权限为选中状态(拥有的权限) (权限选中数组)
2. `listmenu `当前角色用户选中权限的id合集 (权限选中数组)

![image-20211230191712030](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211230191712030.png)

* 通过`checkList`储存的值 去匹配`listmenu`里面的id值 这样就可以知道该用户勾选了那些权限 (权限选中数组)
  * <font color =#ff3040>注意: 必须让后端在所有层级中返回这个空 open 最为一次遍历是否为末级的根据</font>

![image-20211231102028411](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211231102028411.png)

* 分配权限查询接口结构: [分配权限查询接口结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90%E6%9F%A5%E8%AF%A2%E6%8E%A5%E5%8F%A3%E7%BB%93%E6%9E%84.json)

### 分配权限递归代码

* 分配权限如果前端处理的话 需要两次递归(设置回选) 这样才能实现符合条件的权限勾选状态

1. 第一次递归需要判断权限对象中`children`(层级) 是否为末级 

   * 后端会在每个层级内 放入`open`空字段 前端递归处理 非末级为false 末级为true

   ```js
   // 判断权限数组对象children是否是末级
   export default function leafUtils () {
       // 递归函数 筛选setLeaf数组对象
       const setLeaf = (arr) => {
           // 判断是否存在数组对象 并且数组对象长度不小于0
           if (arr && arr.length > 0) {
               // 循环数组对象内的字段 进行操作
               for (let i = 0; i < arr.length; i++) {
                   // 判断数组对象中 是否含有children字段 并且长度不小于0
                   if (arr[i].children && arr[i].children.length > 0) {
                       // 如果满足该条件 则把open字段设置为false
                       arr[i].open = false
                       // 再次自己调用自己 实现递归函数
                       setLeaf(arr[i].children)
                   } else {
                       // 如果不满足条件 则把open字段设置为true
                       arr[i].open = true
                   }
               }
           }
           // 返回递归处理后的数据 (需要再次return一次 把处理的递归数据导出)
           return arr
       }
       // 再次return一次 把处理好的递归数据储存到声明变量中 并且以对象方式导出
       return {
           setLeaf
       }
   }
   
   ```

2. 第二次递归把第一次递归处理好的数据(添加了末级状态) 拿来后再次递归 

   * 通过`checkList` 当前角色用户选中权限的`id`合集 (权限选中数组) 来匹配树形结构中的`id` 如果符合 就让其处于勾选状态
   * 第一次递归会设置末级状态位 在二次递归的时候 进行判断 如果为末级 就`break`打断
   * `childNodes[循环索引值].children` 只要节点含有层级 就把每层进行递归处理

```js
    // 分配权限的属性结构查询 处理数据 能实现权限勾选
    async assignRole (row) {
      // 防止this指向的不是vue实例对象
      const that = this
      this.roleId = row.id
      const parm = {
        roleId: row.id,
        userId: this.$store.getters.userId
      }
      // 掉接口获取数据
      const res = await getAssignTreeApi(parm)
      if (res && res.code == 200) {
        // -------------------------------------------  正式开始处理数据
        // 当前登录用户所拥有的所有权限
        const menuList = res.data.listmenu
        // 当前被分配的角色所拥有的权限
        const selectIds = res.data.checkList
        // 通过一次递归 判断是否末级(设置末级状态位)
        const { setLeaf } = leafUtils()
        // 通过二次递归 处理勾选数据
        const newMenuList = setLeaf(menuList)
        // 赋值二次递归后的最终数据 ( 已经勾选好的数据 )
        this.assignTreeData = newMenuList
        console.log(newMenuList)
        this.$nextTick(() => {
          // 这里通过ref绑定的树形结构 拿到里面的数据(assignTree.children) 这路装着属性结构的数据 注意要this.$nextTick渲染后再调用
          const nodes = that.$refs.assignTree.children
          // 调用递归处理 nodes是通过vue实例拿到的树形结构 selectIds是当前角色用户选中权限的id合集 (权限选中数组) that是当前内容的this指向 防止this指错
          that.setChild(nodes, selectIds, that)
          console.log(nodes)
        })
      }
      console.log(res)
    },
    setChild (childNodes, selectIds, that) {
      // 这里不要使用this 要使用上个方法传来的that 以防止this指向错误
      // 判断树形结构是否存在且不小于0
      if (childNodes && childNodes.length > 0) {
        // eslint-disable-next-line no-lone-blocks
        {
          // 遍历树形结构 需要调用element getNode()方法 拿到每个node (每个节点的内容 也就是包含一级二级三级都拿出来)
          for (let j = 0; j < childNodes.length; j++) {
            // 拿到树形结构中的每个node (每个节点的内容 也就是包含一级二级三级都拿出来)
            var node = that.$refs.assignTree.getNode(childNodes[j])
            // 判断(权限选中数组)是否存在 且长度不小于0
            if (selectIds && selectIds.length > 0) {
              // 遍历(权限选中数组) 那存储的所有权限选中id 去树形结构每个节点中的id其匹配
              for (let h = 0; h < selectIds.length; h++) {
                // 如果匹配到了相同的id 说明具备该权限 需要处于选中状态
                if (selectIds[h] == childNodes[j].id) {
                  // 这里来判断是否为末级 (通过第一次遍历修改open状态)
                  if (childNodes[j].open) {
                    // 通过调用element setChecked()方法 把未勾选变成已勾选状态 node是一级二级三级都拿出来
                    that.$refs.assignTree.setChecked(node, true)
                    // 不用return返回 打断即可
                    break
                  }
                }
              }
            }
            // 这里进行判断 如果节点存在children(二级三级) 就继续递归
            if (childNodes[j].children) {
              // 携带所需要的参数childNodes[j](每层数据) selectIds(权限选中数组) that(当前指向)
              that.setChild(childNodes[j].children, selectIds, that)
            }
          }
        }
      }
    },
```

### 权限分配提交按钮

* 分配角色的树形结构实际上提交的是勾选上内容(层级)的id 它分为两种id

1. 全勾选 全勾选id为路由里按钮等元素的id 他没有依赖关系 所以直接勾选即可 
2. 半勾选 半勾选是路由 因为路由里按钮等元素被勾选后 路由处于一个半勾选状态 除非他字内容完全勾选 才会成为全勾选 
   * 所以全勾选 和 半勾选 他都需要提交 这就需要使用 饿了么ui的两个方法
     * `getCheckedKeys()`获取全勾选绑定的 `node-key`
     * `getHalfCheckedKeys()`获取半勾选绑定的 `node-key`

```js
      // 获取绑定node-key的值(一般为条目的id值) getCheckedKeys是获取勾选的id getHalfCheckedKeys是获取半勾选的内容 (半勾选是路由权限 里面勾选的是按钮等元素权限 两者都需要获取到)
      // 通过concat()方法把两个数组拼接起来
      const listId = this.$refs.assignTree.getCheckedKeys().concat(this.$refs.assignTree.getHalfCheckedKeys())
      // 这里是全勾选和半勾选全部的合集内容
      console.log(listId)
```

> 权限分配提交按钮接口 

* 需要给后端传递 分配权限的数组(全勾选和半勾选)
* 还需要传递 修改人的`userid`

## 用户管理 (非代码)

* 用户管理是查看所属部门下的所有用户权限 属于一个总体浏览 看看到底该部门有多少权限
* 用户管理为二合一 左侧菜单栏 显示每个层级部门

> 显示效果

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211231174020671.png)

### 用户管理左侧菜单

* 用户管理为二合一 左侧菜单栏是显示每个层级部门并且选中后右侧显示对应的角色权限

> 展示效果

![image-20220111203308636](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111203308636.png)

> 用户管理左侧菜单数据结构

* 用户管理左侧菜单数据结构json:  [用户管理左侧菜单数据结构](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E9%83%A8%E9%97%A8%E7%AE%A1%E7%90%86%E5%B7%A6%E4%BE%A7%E8%8F%9C%E5%8D%95%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.json)
* 这里实际上和 [机构管理树形结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E7%BB%93%E6%9E%84%E7%AE%A1%E7%90%86%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84.json) 结构是一致的 都是树形结构 一层一层的

### 用户管理右侧菜单

* 右侧菜单展示的是该部门下的所有的用户

> 展示效果

![image-20220111202655929](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111202655929.png)

> 用户管理右侧菜单数据结构

* 需要给后端传递所选部门的 `id`

* 用户管理右侧菜单数据结构json:  [用户管理右侧菜单数据结构](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%8F%B3%E4%BE%A7%E8%A7%92%E8%89%B2%E5%B1%95%E7%A4%BA%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F.json)

> 用户管理新增右侧菜单用户数据

* 这里是管理用户的模块 可以修改部门 账号密码等等

![image-20220105210852891](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220105210852891.png)

> 用户管理编辑右侧菜单用户数据

* 这里需要携带编辑条目的`id`

![image-20220105211047641](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220105211047641.png)

> 用户管理 编辑和添加所属部门树形结构数据

* 和权限管理的所属部门数据一样 都是树形结构:  [部门管理编辑和添加所属部门树形结构数据格式](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E9%83%A8%E9%97%A8%E7%AE%A1%E7%90%86%E7%BC%96%E8%BE%91%E5%92%8C%E6%B7%BB%E5%8A%A0%E6%89%80%E5%B1%9E%E9%83%A8%E9%97%A8%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84%E6%95%B0%E6%8D%AE.json)
* 编辑这里需要携带 `pid`(当前点击的部门id) 给后端 在点击的部门下 创建用户
* 修改这里需要携带 `id`(要修改条目的id)给后端 修改对应的条目数据

![image-20220106194736422](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220106194736422.png)

> 用户管理 删除所属部门下的用户信息

* 这里分为真删假删 根据业务 需要携带 `id`给后端 删除对应的条目数据

### 用户管理右侧菜单分配角色展示效果

* 通过获取到所有用户的角色内容后 相对的也能获取到用户的`id` 这样可以通过`id`来查询用户拥有的角色 也可以分配对应的角色
* 这里是设计的时候只能获取单个角色 如果多角色也可以实现

> 展示效果

![image-20220107194042859](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220107194042859.png)

> 实现思路

* 需要两个接口 

  1. 先查询当前所创建的所有角色 渲染到页面上

  2. 再查询当前角色所拥有的角色 然后赋值 在页面上进行勾选展示

> 查询当前所创建的所有角色

* 查询当前所创建的所有角色数据格式: [查询当前所创建的所有角色数据格式json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E6%9F%A5%E8%AF%A2%E5%BD%93%E5%89%8D%E6%89%80%E5%88%9B%E5%BB%BA%E7%9A%84%E6%89%80%E6%9C%89%E8%A7%92%E8%89%B2%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F.json)

![image-20220107205325700](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220107205325700.png)

> 查询当前角色所拥有的权限角色 (本项目为只能拥有一个权限角色)

* 携带用户的 `userid` 来查询用户当前拥有的权限角色 然后根据`roleId`去tab中匹配 符合条件的勾选

![image-20220110094250932](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220110094250932.png)

> 修改当前角色的权限角色

* 携带用户的`userid`和用户所选的`roleId` 提交表单 修改用户的权限角色

## 第二阶段: 按钮权限 (元素权限)的实现

* 权限分为两个阶段

1. <font color =#ff3040>路由权限 </font>也就是左侧菜单栏的权限 属于主体权限 是判断用户有权访问该页面的权限
2. <font color =#ff3040>按钮权限 (元素)</font> 也就是进入页面后 内容显示与否的权限 是判断用户是否有权看到该元素 或者具备按钮等元素交互的权限

>  按钮权限 (元素权限)的思路

* 路由合集数据类型介绍

![image-20220110113745507](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220110113745507.png)

1. 第一步 首先我们登录后可以拿到用户的权限合集`roles` 权限合集中包含着 路由和按钮的权限 我们需要用到按钮的权限

2. 第二步 我们拿到用户的权限合集后 把权限合集储存到 `sessionstorage` 这样页面刷新的时候 会立刻读取 (vuex也可以通过缓存拿到 但是会有延迟 直接储存到缓存更好)

   * 在vuex 获取到用户的路由合集后 储存到缓存中

   ```js
      // 把权限字段放到sessionStorage里面
      sessionStorage.setItem('codeList', JSON.stringify(roles))
   ```

3. 第三步 封装一个js方法 用来配合页面`v-if` 实现元素的显示隐藏 并且在`main.js`入口文件中注册原型链

   *  封装按钮权限的js方法

   ```js
   // 判断按钮权限
   // parm 是页面传来的按字段 用来和权限合集的判断
   export default function hasPermission (parm) {
       // tag这里声明一个状态 判断用户是否具备按钮元素的权限 默认是false无权限
       let tag = false
       // 从缓存中读取用户的权限合集
       const codeList = JSON.parse(sessionStorage.getItem('codeList'))
       // 循环权限合集字段 去和传来的页面字段匹配
       for (let i = 0; i < codeList.length; i++) {
           // 如果匹配成功 说明拥有权限
           if (codeList[i] === parm) {
               // 把tag设置为true
               tag = true
               // 打断循环
               break
           }
       }
       // 把处理好的tag状态返回出去
       return tag
   }
   
   ```

   * 在`main.js`入口文件中注册原型链

   ```js
   // 按钮权限判断
   import hasPermission from '@/permission/index'
   Vue.prototype.hasPerm = hasPermission
   ```

   * 在页面上进行按钮权限判断

   ```vue
   // 通过 v-if调用按钮权限js方法 传入按钮的权限名称 即可实现按钮权限
   <el-button v-if="hasPerm('sys:menu:edit')" type="primary" icon="el-icon-edit" size="small" @click="editMenu(scope.row)">编辑</el-button>
   ```

   

4. 第四步 按钮(元素)设置`v-if` 调用声明的js方法 并且传参传入的按钮的权限名称 在路由合集中筛选 判断是否有该权限名称 即可实现按钮权限

![image-20220110132442514](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220110132442514.png)

## 退出功能

* 退出功能理论上可以让前端删除掉cookie的token的方式 实现退出功能 但是如果用户提前把token保存后再粘贴到cookie里 这时候 就会造成无法准确判断用户是否退出登录
  * 在后端设计的时候 需要做一个退出功能的接口 单独做处理(可以用Redis)
  * 这块需要后端建一个黑名单 储存用户退出的token 需要用到Redis 自动删除过期的token 防止多次储存一个人退出的token

> 前端退出功能操作

* 前端需要携带cookie储存的token即可 传给后端 后端去做处理即可
* 同时清除cookie 和 sessionStorage 并且跳转到登录页
* <font color =#ff3040>注意: 如果你使用了token续签 则必须在清空后 重置token过期时间戳(让其变为0) 否则可能会存在判断问题</font>

> 实现操作

* 如果你用的是 vue element admin框架 他的`utils`文件夹中自带了cookie方法 建议把清除session的也添加进去

![image-20220111170221100](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111170221100.png)

```js
import Cookies from 'js-cookie'
// cookie命名
const TokenKey = 'Admin-Token'
// session命名
const timeKey = 'expireTime'

// 获取cookie
export function getToken () {
  return Cookies.get(TokenKey)
}
// 保存cookie
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
// 移除cookie
export function removeToken () {
  return Cookies.remove(TokenKey)
}
// 清空sessionStorage
export function clearStorage () {
  return sessionStorage.clear()
}
// 设置token过期时间 (保存token过期和当前时间进行比较 低于10分钟(或其他时间)进行续签)
export function setTokenTime (time) {
  return sessionStorage.setItem(timeKey, time)
}
// 重置token过期时间 (清空token不需要设置为'' 或者null 防止无法判断 需要设置为0或-1)
export function removeTokenTime () {
  return sessionStorage.setItem(timeKey, 0)
}
// 获取储存的token的时间
export function getTokenTime () {
  return sessionStorage.getItem(timeKey)
}

```

* 页面退出功能
  * <font color =#ff3040>注意: 如果你使用了token续签 则必须在清空后 重置token过期时间戳(让其变为0) 否则可能会存在判断问题</font>

```js
    // 清空token
    removeToken()
    // 清空缓存
    clearStorage()
    // 重置token时间戳
    removeTokenTime()
    // 刷新跳转
    window.location.href = '/login'
```



## token续签

* token续签有两种方式 其实全部的token续签都涉及到了axios的请求拦截器 通过拦截器去实现token的续签 
* 通常都会在`utils`里的`request.js`中进行处理

### 双token机制

* 第一种是双token `ReFresh_token` 和 `用户token` 当`用户token`过期后 拿`ReFresh_token`去续签 `ReFresh_token`一般有效期是半年 该token不具备任何数据 只是作为续签凭证 如果`ReFresh_token`过期了 就需要重新登录了 这种方式是相对安全的 因为`用户token`时间只有五分钟 

  ![image-20210605115451235](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/VaQ6uA7POdc8qJv.png)

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
  // 添加响应拦截器 (加工后)
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

### 单token机制

* 第二种是企业常用的 单`用户token` 当用户登录的时候 接口会返回一个`token过期时间戳` 前端把时间戳储存session中 每当请求接口的时候 需要电脑当前时间去计算后端返回`token过期时间戳` 如果小于10分钟(或者其他) 就会进行续签操作 替换一个新的`用户token`并且更新`token过期时间戳` 这种方式相对后端来说简单 安全性不如第一种 因为`用户token` 有效期通常为8小时甚至更长 因为后端是不会把过期token续签的 所以时间设置太短的话 用户临时不操作就会过期重新登录

  ![image-20220111163947060](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111163947060.png)

> 后端接口数据需求

* 前端需要给后端传递旧token即可 后端就会返回一个新的token 和 新的过期时间戳

1. 第一步在`utils`文件夹下创建cookie 或者 session方法

![image-20220111170221100](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220111170221100.png)

```js
import Cookies from 'js-cookie'
// cookie命名
const TokenKey = 'Admin-Token'
// session命名
const timeKey = 'expireTime'

// 获取cookie
export function getToken () {
  return Cookies.get(TokenKey)
}
// 保存cookie
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
// 移除cookie
export function removeToken () {
  return Cookies.remove(TokenKey)
}
// 清空sessionStorage
export function clearStorage () {
  return sessionStorage.clear()
}
// 设置token过期时间 (保存token过期和当前时间进行比较 低于10分钟(或其他时间)进行续签)
export function setTokenTime (time) {
  return sessionStorage.setItem(timeKey, time)
}
// 重置token过期时间 (清空token不需要设置为'' 或者null 防止无法判断 需要设置为0或-1)
export function removeTokenTime () {
  return sessionStorage.setItem(timeKey, 0)
}
// 获取储存的token的时间
export function getTokenTime () {
  return sessionStorage.getItem(timeKey)
}
```

2. 第二步创建一个续签token的api接口 `api`文件夹

> 续签token的数据结构

续签token的数据结构: [续签token的数据结构json](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E7%BB%AD%E7%AD%BEtoken%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.json)

```js
// token续签
export async function refreshTokenApi (parm) {
  return await http.post('/api/sysUser/refreshToken', parm)
}
```

3. 第三步在axios二次封装下的截器去实现token的续签 
   * <font color =#ff3040>注意: token续签的处理需要写在添加请求头的上面(把token塞到请求头里) 因为我们在续签后就已经处理了</font>

```js
import axios from 'axios'
// 导入vuex
import store from '@/store'
// 处理token和cookie
import { getToken, getTokenTime, setTokenTime, removeTokenTime, setToken, clearStorage, removeToken } from '@/utils/auth'
import { refreshTokenApi } from '@/api/user'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
 // timeout: 5000 // request timeout
})
//! --------------------处理token续签
// token续签方法
function reFresh () {
  // 声明一个变量 储存当前token 作为替换凭证
  const parm = {
    'token': getToken()
  }
  // 向接口请求一个新的token
  return refreshTokenApi(parm).then(res => {
    return res
  })
  // 这里其实可以简写
  //  return refreshTokenApi(parm).then(res => res)
}
//! 处理token续签
// 定义一个状态位 防止多次获取 无需每个接口都请求
let isReFresh = false

// request interceptor
// 发送请求之前的拦截器
service.interceptors.request.use(
  config => {
    //! 处理token续签
    // 获取当前系统时间戳
    const curent = new Date().getTime()
    // 获取缓存中的时间戳
    const expireTime = getTokenTime()
    // 如果缓存中的时间戳存在
    if (expireTime > 0) {
      const minMx = (expireTime - curent) / 1000 / 60 // 毫秒计算
      // 判断token时间是否小于十分钟 小于十分钟进行token续签操作
      if (minMx < 10) {
        // 判断状态位 为false执行 防止多次请求token续签接口
        if (!isReFresh) {
          isReFresh = true
          // 返回操作 不再执行以下拦截器操作 防止报错
          return reFresh().then(res => {
            // 判断是否请求成功
            if (res.code == 200) {
              // 设置新的token
              setToken(res.data.token)
              // 设置新的时间戳
              setTokenTime(res.data.expireTime)
              // 把新的token添加到头部 实现正常获取数据
              config.headers['token'] = getToken()
            }
            // 返回config 正常获取接口数据
            return config
          }).catch(res => {
            // 如果续签失败进行处理(没有)
            console.log(res)
          }).finally(res => {
            // 无论是否获取成功或者失败 都需要把状态位重置
            isReFresh = false
          })
        }
      }
    }

    // do something before request is sent
    // 从store里面获取token，如果token存在，
    // 把token添加到请求的头部Headers里面
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // 把token添加到请求的头部
      //! config是发送的数据 headers是axios请求头 Authorization是后端接口判断token的属性名
        config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


```

