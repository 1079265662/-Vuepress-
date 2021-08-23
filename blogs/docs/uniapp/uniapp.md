---
title: uniapp的学习笔记
date: 2021-08-23
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-j3k6dp.png
tags:
 - uni-app
categories: uni-app
---

::: tip 介绍
uniapp的个人学习笔记<br>
:::

<!-- more -->

# 1. uni-app 购物商城项目

## uni-app介绍 和 注意

* **uni-app 是一个使用 Vue.js 开发所有前端应用的框架**。开发者编写一套代码，可发布到 iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。
* uni-app 集合了微信小程序的一些 `template`标签 但是语法和Vue相似 小程序没有跨域问题
* 在uni-app中的实例是` uni` 不要再uni-app项目中使用`v-show` 用`v-if`替代
* `block`标签是uniapp特殊标签 他不会被渲染 但是可以用作`v-if`来判断 优化性能 也可以进行 `v-for`渲染
* `<view v-html=""></view>` 可以渲染带有样式的数据(md文档)

![1-7.43264ae4](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-7.43264ae4.png)

> **详细的 uni-app 官方文档，请翻阅 https://uniapp.dcloud.net.cn/**

## uniapp中的页面生命周期(小程序)

[uniapp 页面生命周期官网](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)

> 常用的一些生命周期

* `onLoad`和 `onReady` tabBar不会多次执行(会销毁) 但是`onShow`可以多次执行(不会销毁)
* 可以使用`onShow` 生命周期 来更新角标的动态数据

| onLoad  | 监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考[示例](https://uniapp.dcloud.io/api/router?id=navigateto) |      |
| ------- | ------------------------------------------------------------ | ---- |
| onReady | 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发 |      |
| onShow  | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |      |
| onHide  | 监听页面隐藏                                                 |      |

# 2. 起步

## 开发工具

uni-app 官方推荐使用 **HBuilderX** 来开发 uni-app 类型的项目。主要好处：

- 模板丰富
- 完善的智能提a示
- 一键运行

> 当然，你依然可以根据自己的喜好，选择使用 VS Code、Sublime、~~记事本~~... 等自己喜欢的编辑器！

### 下载 安装 HBuilderX

1. 访问 HBuilderX 的官网首页 https://www.dcloud.io/hbuilderx.html
2. 点击首页的 `DOWNLOAD` 按钮
3. 选择下载 `正式版` -> `App 开发版`
4. 将下载的 `zip包` 进行解压缩
5. 将解压之后的文件夹，存放到**纯英文**的目录中（且不能包含括号等特殊字符）
6. 双击 `HBuilderX.exe` 即可启动 HBuilderX

### 安装 scss/sass 编译

* 为了方便编写样式（例如：`<style lang="scss"></style>`），建议安装 `scss/sass 编译` 插件。
* 插件下载地址：**https://ext.dcloud.net.cn/plugin?name=compile-node-sass**

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-1.74fed64c.png)

### HBuilderX配置

* 快捷键设置
  * 操作步骤：工具 -> 预设快捷键方案切换 -> VS Code

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-2.1c0c98c6.png)

* 修改编辑器的基本设置
  * 操作步骤：工具 -> 设置 -> 打开 Settings.json 按需进行配置

![image-20210816211539653](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210816211539653.png)

> 修改代码参考

```json
{
  "editor.colorScheme": "Default",
  "editor.fontSize": 12,
  "editor.fontFamily": "Consolas",
  "editor.fontFmyCHS": "微软雅黑 Light",
  "editor.insertSpaces": true,
  "editor.lineHeight": "1.5",
  "editor.minimap.enabled": false,
  "editor.mouseWheelZoom": true,
  "editor.onlyHighlightWord": false,
  "editor.tabSize": 2,
  "editor.wordWrap": true,
  "explorer.iconTheme": "vs-seti",
  "editor.codeassist.px2rem.enabel": false,
  "editor.codeassist.px2upx.enabel": false
}
```

# 3. 创建项目

## 新建 uni-app 项目

1. 文件 -> 新建 -> 项目

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-4.b7efec14.png)

2. 填写项目基本信息

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-5.585d746d.png)

3. 项目创建成功

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-6.01c783f2.png)

## 项目结构说明

* 一个 uni-app 项目，默认包含如下目录及文件：

```json
┌─components            // uni-app组件目录(存放组件)
│  └─comp-a.vue         // 可复用的a组件
├─node_modules          // 储存npm插件
├─pages                 // 存放的是tarbar组件(小程序底部栏组件)
├─static                // 存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─uni_modules			// 存放uni-app插件
├─main.js               // Vue初始化入口文件
├─App.vue               // 应用配置，用来配置小程序的全局样式、生命周期函数等 (可以设置警告提示)
├─index.html			// 类似于Vue项目中的App.vue 渲染所有组件到 id="app"
├─package-lock.json     // 记录npm包的版本
├─manifest.json         // 配置应用名称、appid、logo、版本等打包信息(通常用来配置appid)
├─uni.scss				// uni-app内置的常用样式变量 可以在页面中直接调用样式变量 方便管理整体颜色
└─pages.json            // 配置页面路径、页面窗口样式、tabBar、navigationBar 等页面类信息 (类似以Vue的路由配置)
```

## 把项目运行到微信开发者工具

1. 填写自己的微信小程序的 AppID：

![img](https://www.escook.cn/docs-uni-shop/assets/img/1-8.4c14eb68.png)

2. 在 HBuilderX 中，配置“微信开发者工具”的**安装路径**：

![img](https://www.escook.cn/docs-uni-shop/assets/img/1-9.deca7c09.png)

3. 在微信开发者工具中，通过 `设置 -> 安全设置` 面板，开启“微信开发者工具”的**服务端口**：

![download](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/download.png)

4. 在 HBuilderX 中，点击菜单栏中的 `运行 -> 运行到小程序模拟器 -> 微信开发者工具`，将当前 uni-app 项目编译之后，自动运行到微信开发者工具中，从而方便查看项目效果与调试：

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-11.2637002b.png)

5. 初次运行成功之后的项目效果：

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1-12.1b33864e.png)

## 把用到图片导入static文件中

[项目gitee地址](https://gitee.com/liu_kaili/shop) 在这里下载需要的图片

# 5. 配置网络请求

## 配置请求操作

由于平台的限制，小程序项目中**不支持 axios**，而且原生的 `wx.request()` API 功能较为简单，**不支持拦截器**等全局定制的功能。因此，建议在 uni-app 项目中使用 `@escook/request-miniprogram` 第三方包发起网络数据请求。

> 请参考 **@escook/request-miniprogram** 的官方文档进行安装、配置、使用

> 官方文档：https://www.npmjs.com/package/@escook/request-miniprogram

* 在项目的 `main.js` 入口文件中，通过如下的方式进行配置：

```js

// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//----------------------- 网络请求配置
// 1. 下载网络配置包
// npm install @escook/request-miniprogram
// 2. 引入网络配置包
import { $http } from '@escook/request-miniprogram'
// 3. 把$http挂载到全局对象下 在uni-app中导入 uni-app全局对象是uni
uni.$http = $http
// 4. 配置baseUrl(全局基础路径)
$http.baseUrl = 'https://www.uinav.com'
// 5. 配置请求拦截器
// 请求开始之前做一些事情
$http.beforeRequest = function(){
// 打开正在加载中弹窗
// wx.showLoading({ title })
	uni.showLoading({
		title:"加载中.........."
	})
}
// 6. 配置请求后拦截器(响应拦截器)
// 请求完成之后做一些事情
$http.afterRequest = function(){
// 关闭正在请求中弹窗
uni.hideLoading()
}
// 7. 封装加载失败提示
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    // 提示信息可以自定义 默认是 数据加载失败！
    title,
    // 提示的持续时间
    duration,
    // 提示的字体图标
    icon: 'none',
  })
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})

// ----------------------------
app.$mount()
// #endif
```

## 携带请求头 进行请求操作

* 有的接口需要携带请求头(token) 上传接口获取数据 这些接口一般都要特殊统一的请求地址
  * 比如url地址携带`/my/` 就是需要请求头的接口
  * 一般请求头名称为`header` 后端需求的请求头属性名(键)为`Authorization`
  * 在配置请求拦截器中配置携带请求头的操作

> 假设需要请求头的url地址 都携带`/my/` 

* 需要在请求插件的请求拦截器中配置请求头操作
* 使用`indexOf()`方法 查询url地址是否携带`/my/` 如果携带(非-1)就添加请求头

```diff

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入Vuex
import store from './store/store.js'

//----------------------- 网络请求配置
// 1. 下载网络配置包
// npm install @escook/request-miniprogram
// 2. 引入网络配置包
import { $http } from '@escook/request-miniprogram'
// 3. 把$http挂载到全局对象下 在uni-app中导入 uni-app全局对象是uni
uni.$http = $http
// 4. 配置baseUrl(全局基础路径)
$http.baseUrl = 'https://www.uinav.com'
// 5. 配置请求拦截器
// 请求开始之前做一些事情
$http.beforeRequest = function(options){
  console.log(options)
// 打开正在加载中弹窗
// wx.showLoading({ title })
	uni.showLoading({
		title:"加载中.........."
	})
+  // 添加请求头
+  if(options.url.indexOf('/my/') !== -1){
+    // 获取vuex储存的请求头 设置Authorization储存token(后端需求)
+    options.header.Authorization = store.state.m_user.token
+  }
}
// 6. 配置请求后拦截器(响应拦截器)
// 请求完成之后做一些事情
$http.afterRequest = function(){
// 关闭正在请求中弹窗
uni.hideLoading()
}
// 7. 封装加载失败提示
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    // 提示信息可以自定义 默认是 数据加载失败！
    title,
    // 提示的持续时间
    duration,
    // 提示的字体图标
    icon: 'none',
  })
}

Vue.config.productionTip = false
App.mpType = 'app'
// vue2挂载实例
const app = new Vue({
    ...App,
    store
})

// ----------------------------
app.$mount()
// #endif
```



# 6. 路由设置选项详解`pages.json`(非步骤)

## 分包和主包场景

* **分包可以减少小程序首次启动时的加载时间**(类似于Vue路由的按需加载) 主包会在小程序加载时候全部加载
* 分包主要用于tabBar(底部导航) 分包主要用于tabBar中的组件(页面中的组件)  

![image-20210816222345607](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210816222345607.png)



## 设置主包分包

我们在项目中，把 tabBar 相关的 4 个页面放到主包中，其它页面（例如：商品详情页、商品列表页）放到分包中。在 uni-app 项目中，配置分包的步骤如下：

* 分包主要用于tabBar(底部导航) 分包主要用于tabBar中的组件(页面中的组件)  

> 配置分包主包例子

1. 在项目根目录中，创建分包的根目录，命名为 `subpkg`
2. 在 `pages.json` 中，和 `pages` 节点平级的位置声明 `subPackages` 节点，用来定义分包相关的结构
3. 在路由中 配置分包的名称 需要和创建的组件文件夹一致

```json
{
	//----------------------------- 配置主包路由
	"pages": [{
            // 配置主包路径
            "path" : "pages/home/home",
            // 配置分包样式
            "style" :                                                                                    
            {
              // 配置小程序上方标题显示
                "navigationBarTitleText": "",
              // 允许上拉刷新数据
                "enablePullDownRefresh": false
            }
        }   
    ],
	//----------------------------- 配置分包路由
	  "subPackages": [
	    {
         // 配置分包的名称 需要和创建的组件文件夹一致
	      "root": "subpkg",
	      "pages": [{
                    // 配置分包路径
                    "path" : "goods_detail/goods_detail",
                    // 配置分包样式
                    "style" :                                                                                    
                {
                    // 配置小程序上方标题显示
                    "navigationBarTitleText": "",
                    // 允许上拉刷新数据
                    "enablePullDownRefresh": false
                }
             }    
	  ],
}
```

## 设置主包tabBar

* 设置主包路径的组件 通常作为tabBar(底部导航)来使用

![image-20210816224822572](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210816224822572.png)

> 配置tabBar案例

1. 配置主包路由后 再配置tarBar(底部导航栏)
2. tarBar 

```json
{
	//----------------------------- 配置主包路由
	"pages": [{
            // 配置主包路径
            "path" : "pages/home/home",
            // 配置分包样式
            "style" :                                                                                    
            {
              // 配置小程序上方标题显示
                "navigationBarTitleText": "",
              // 允许上拉刷新数据
                "enablePullDownRefresh": false
            }
            
        }
    ],
	//--------------------------- 添加tarBar底部导航栏
	"tabBar":{
		// 配置底部导航选择后的颜色
		"selectedColor":"#c00000",
		"list":[{
			// 配置底部导航对应的组件路径
			"pagePath":"pages/home/home",
			// 配置底部的文本
			"text":"首页",
			// 配置底部导航的未选中图标(静态图标)
			"iconPath":"static/index.png",
			// 配置底部导航的选中图标
			"selectedIconPath":"static/index_selected.png"
		}]
	}
}

```



## 设置小程序全局样式

1. 在 `pages.json` 中，配置选程序的全局设置

2. 可以设置小程序全局样式 (比如主题颜色 主标题等)

```json
// 设置小程序全局样式
	"globalStyle": {
		// 更改小程序 主题标题颜色
		"navigationBarTextStyle": "white",
		// 更改小程序 主题标题
		"navigationBarTitleText": "黑马优购",
		// 设置小程序主体颜色
		"navigationBarBackgroundColor": "#c00000",
		// 设置窗口的背景色
		"backgroundColor": "#F8F8F8",
		"app-plus": {
			"background": "#efeff4"
		}
 }
```

## 删除组件路由

* 在 HBuilderX 中 如果删除一个组件 是不会自动删除配置的路由 所以必须要手动删除 组件配置的路由

> index组件删除例子

1. 在 HBuilderX 中，把 `pages` 目录下的 `index首页文件夹` 删除掉
2. 同时，把 `page.json` 中记录的 `index 首页` 路径删除掉
3. 为了防止小程序运行失败，在微信开发者工具中，手动删除 `pages` 目录下的 `index 首页文件夹`
4. 同时，把 `components` 目录下的 `uni-link 组件文件夹` 删除掉

## 路由组件跳转传参

* 路由的跳转分为标签式和代码式
* uniapp里面的路由跳转是通过组件本地路由进行跳转的 而非url地址跳转

```js
// 标签式跳转		
		<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail'"></navigator>
// 代码式跳转
			uni.switchTab({
				// url跳转的路径地址 (组件所在的路径 非url地址)
				url: '/pages/cate/cate',
               success: () => {
               // 跳转成功后 进行的操作(通过向Vuex储存一些重定向)
             }
			})
```

> 标签式跳转 (不常用)

* 通过`<navigator :url=''></navigator>`标签进行跳转
  * 只可以进行 非tabBar(底部导航栏)的跳转
  * `:url`可以动态绑定跳转地址 并且支持参数的拼接

```js
// 标签式跳转
// :url跳转的路径地址 (组件所在的路径 非url地址)
  <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail'"></navigator>
```

* 标签式路由传参方式
  * `:url`通过绑定跳转地址 并且拼接携带的参数进行拼接
  * 传递的参数是一个对象

```js
 // 动态携带参数	goods_id="参数" 进行路由传参
	<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
	</navigator>
// 传递参数类型
{goods_id: "参数"}
```

> 代码式跳转

* 代码式跳转 通过`@click`等事件监听 触发跳转方法 实现跳转

  * <font color =#ff3040>tarBar(底部导航栏)跳转方法 `uni.switchTab()`</font>

  ![image-20210817000610303](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210817000610303.png)

  * <font color =#ff3040>普通组件跳转方法 `uni.navigateTo()`</font>
  * `url`可以动态绑定跳转地址 并且支持参数的拼接
  * ` success: () => {}` 跳转成功后 进行的操作(通过向Vuex储存一些重定向)

```vue
<template>
	<view @click="clickHandler"></view>
</template>
<script>
	export default {
		name:"SearchBar",
		methods:{
			clickHandler(){
			// 进行普通组件跳转
				uni.navigateTo({
				// 跳转的路径
					url:'/subpkg/goods-list/goods-list',
                    success: () => {
               // 跳转成功后 进行的操作(通过向Vuex储存一些重定向)
            		 }
				})
			}
		}
	}
</script>
```

* 代码式跳转路由传参方式
  * `url`通过绑定跳转地址 并且拼接携带的参数进行拼接
  * 传递的参数是一个对象

```js
		uni.navigateTo({
		 // 动态携带参数 进行路由传参
			url:'/subpkg/goods-list/goods-list?' + query
		})
```

## 获取路由跳转的参数

* 接收路由传递的参数 是对象格式 并且如果带有`=` 也会转换为对象

![image-20210817002028843](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210817002028843.png)

* 通过`onLoad()` 组件渲染时获取传递的参数(类似于Vue的 `created()`)

```js
<script>
	export default {
	// 通过onLoad参数 获取到路由传递的参数
    onLoad(data) {
      console.log(data)
    }
}
</script>
```

# 7. 创建tabBar

## 创建 tabBar 页面

在 `pages` 目录中，创建首页(home)、分类(cate)、购物车(cart)、我的(my) 这 4 个 tabBar 页面。在 HBuilderX 中，可以通过如下的两个步骤，快速新建页面：

* tabBar 页面不需要设置分包 分包跟Vue的按需加载道理一致

1. 在 `pages` 目录上鼠标右键，选择**新建页面**
2. 在弹出的窗口中，填写**页面的名称**、**勾选 scss 模板**之后，点击创建按钮。
3. 需要在路由中注册 并且使用主包炉头

![image-20210816224325598](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210816224325598.png)

## 配置 tabBar 效果

1. 需要先配置主包的路径 再 配置 tabBar 效果 (tabBar 可以设置为主包)
2. 修改项目根目录中的 `pages.json` 配置文件，新增 `tabBar` 的配置节点如下：

```json
{
	//----------------------------- 配置主包路由
	"pages": [{
            // 配置主包路径
            "path" : "pages/home/home",
            // 配置分包样式
            "style" :                                                                                    
            {
              // 配置小程序上方标题显示
                "navigationBarTitleText": "",
              // 允许上拉刷新数据
                "enablePullDownRefresh": false
            }
            
        }
        ,{
            "path" : "pages/cart/cart",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
                "enablePullDownRefresh": false
            }
            
        }
        ,{
            "path" : "pages/cate/cate",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
                "enablePullDownRefresh": false
            }
            
        }
        ,{
            "path" : "pages/my/my",
            "style" :                                                                                    
            {
                "navigationBarTitleText": "",
                "enablePullDownRefresh": false
            }
            
        }
    ],
//----------------------------- 添加tarBar底部导航栏
	"tabBar":{
		// 配置底部导航选择后的颜色
		"selectedColor":"#c00000",
		"list":[{
			// 配置底部导航对应的组件路径
			"pagePath":"pages/home/home",
			// 配置底部的文本
			"text":"首页",
			// 配置底部导航的未选中图标
			"iconPath":"static/index.png",
			// 配置底部导航的选中图标
			"selectedIconPath":"static/index_selected.png"
		},{
			"pagePath":"pages/cate/cate",
			"text":"分类",
			"iconPath":"static/category.png",
			"selectedIconPath":"static/category_selected.png"
		},{
			"pagePath":"pages/cart/cart",
			"text":"购物车",
			"iconPath":"static/cart.png",
			"selectedIconPath":"static/cart_selected.png"
		},{
			"pagePath":"pages/my/my",
			"text":"我的",
			"iconPath":"static/user.png",
			"selectedIconPath":"static/user_selected.png"
		}]
	}
}

```

## 配置 小程序全局样式

1. 打开 `pages.json` 这个全局的配置文件
2. 修改 `globalStyle` 节点如下：

```json
//----------------------------- 设置小程序全局样式
	"globalStyle": {
		// 更改小程序 主题标题颜色
		"navigationBarTextStyle": "white",
		// 更改小程序 主题标题
		"navigationBarTitleText": "黑马优购",
		// 设置小程序主体颜色
		"navigationBarBackgroundColor": "#c00000",
		// 设置窗口的背景色
		"backgroundColor": "#F8F8F8",
		"app-plus": {
			"background": "#efeff4"
		}
	}
```

# 8. uniapp 组件的使用

## 组件的使用注册

* uniapp里面的组件使用 无需`import`导入 只需要在 component文件夹创建即可

![image-20210817130914453](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210817130914453.png)

> 组件创建和使用步骤

1. 在 component文件夹里面创建 uniapp组件 需要勾选创建同名目录 组件导入以组件名为基准

![image-20210817132353096](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210817132353096.png)

2. 在需要的组件中 导入该组件
   * 在uniapp项目中 无需`import`导入 直接导入component文件夹的组件设置的名称即可

```vue
<template>
    <view>
    <!-- 直接导入component文件夹的组件设置的名称即可 -->
      <my-goods></my-goods>
    </view>
</template>
```



# 9. uniapp 父子组件的传值

## 父向子传值

* uniapp父子传值操作和vue一致 但是通过uniapp会通过路由来传值

> 父组件向子组件传值

* 传递给`my-goods`组件 通过`:`向子组件传递数据

```vue
<template>
  <view>
      <!-- 向子组件传递数据 -->
     <my-goods :goods='goods'></my-goods>
     </view>
  </view>
</template>
<script>
	export default {
		data() {
			return {
               // 需要向子组件传递的数据
				goods:'你好'
			}
		}
	}
</script>
```

> 子组件接收父组件的值

* 接收父组件传来的数据 直接调用即可 无需在`data()`中储存
* 可以设置`default` 默认数据 `required`必填项 `type`数据类型 来规范传值

```vue
<template>
  <view>
     接收父组件传来的数据 {{goods}}
  </view>
</template>
<script>
	export default {
	// 通过props获取父组件传来的数据
        props:{
            goods:{
                // 默认数据设置
                  default: '',
                // 是否必填项
                  required: false
     		 }
   		}
	}
</script>
```

## 子向父传值

* uniapp父子传值操作和vue一致 

> 子组件向父组件传值

* 向父组件进行传值
  * `this.$emit('传递父组的名称',传递的数据)`

```vue
<template>
  <view>
      <!-- 向父组件传递数据 -->
    <view @click="getID(id)">
  </view>
  </view>
</template>
<script>
	export default {
        methods:{
          getID(id){
              // 向父组件传递数据
              // this.$emit('传递父组的名称',传递的数据)
            this.$emit('demo1',id)
          }
       }
	}
</script>
```

> 父组件接收子组件传来的值

* 子组件传递的数据 必须在`data()`中储存 才能使用
* 接收`my-goods`组件传来的值 通过`@`接收子组件传递的数据

```vue
<template>
  <view>
      <!-- 接收子组件传递的数据 -->
     <my-goods @demo1="demo1"></my-goods>
       <view>{{demo1}}</view>
   </view>
  </view>
</template>
<script>
	export default {
	data() {
		return {
			// 储存子组件传递的数据
				demo1:''
			}
		},
	    methods:{
	    // 获取子组件传递的数据
           demo1(data){
             this.demo1 = data
           },
		}
</script>
```

# 10. uniapp创建Vuex

## uniapp创建Vuex步骤

* 默认uniapp是没有Vuex文件夹的 需要手动创建
* Vuex的方法在uniapp也适用

1. 在项目根目录中创建 `store` 文件夹，专门用来存放 vuex 相关的模块
2. 在 `store` 目录上鼠标右键，选择 `新建 -> js文件`，新建 `store.js` 文件：

![image-20210817211726180](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210817211726180.png)

![downlo1ad](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/downlo1ad.png)

3. 在 `store.js` 中按照如下 4 个步骤**初始化 Store 的实例对象**：

```js
// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {},
})

// 4. 向外共享 Store 的实例对象
export default store
```

4. 在 `main.js` (入口文件) 中导入 `store` 实例对象并挂载到 Vue 的实例上：

```js
// 1. 导入 store 的实例对象
import store from './store/store.js'

// 省略其它代码...

const app = new Vue({
  ...App,
  // 2. 将 store 挂载到 Vue 实例上
  store,
})
app.$mount()
```

## 进行Vuex拆分

* 为了方便管理数据 会把不同功能的Vuex进行拆分 统一在一个Vuex中导入

![image-20210817212349665](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210817212349665.png)

1. 在 `store` 目录上鼠标右键，选择 `新建 -> js文件`，创建购物车的 store 模块，命名为 `cart.js`：

![downlo1ad](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/downlo1ad.png)

2. 在 `cart.js` 中，初始化如下的 vuex 模块：

```json
export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
  }),

  // 模块的 mutations 方法
  mutations: {},

  // 模块的 getters 属性
  getters: {},
}
```

3. 在 `store/store.js` 模块中，导入并挂载购物车的 vuex 模块，示例代码如下：

   * 导入vuex拆分模块
   *  注册vuex模块 左侧是vuex组件名称 右侧是导入的vuex拆分组件
   * 最后导出vuex模块管理 在main.js入口文件中导入

```js
import Vue from 'vue'
import Vuex from 'vuex'
// 1. 导入vuex拆分模块
import moduleCart from './cart.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
    // 2. 注册vuex模块 左侧是vuex组件名称 右侧是导入的vuex拆分组件
    m_cart: moduleCart,
  },
})
	// 3. 最后导出vuex模块管理 在main.js入口文件中导入
export default store
```

# 11. uniapp持久化方案

## uniapp持久化

* [uniapp提供持久化官网方法](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)
* 通常我们会通过 session临时储存用户的一些数据 实现组件之间的数据持久化
* 获取session数据 需要通过`JSON.stringify`转化为json数据 和 `JSON.parse` 把json数据转换字符串
* uniapp提供的持久化session方法(临时储存)
  * `uni.setStorageSync('session储存名称',JSON.stringify(需要储存的数据)) ` 同步向session储存数据
  * `JSON.parse.(uni.getStorageSync('session储存名称')) `同步获取session储存的数据
  * `uni.removeStorageSync('session储存名称','替换的内容')` 同步删除(替换)session储存的数据

# 12. uniapp的mixins混入

## mixins混入场景

* 在uniapp中也支持mixins混入 我们会把一些常用的方法进行混入(比如给tabBar添加角标)
*  [uni.setTabBarBadge()](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge) 设置角标方法

![image-20210818133610721](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210818133610721.png)

## 设置mixins混入

1. 通常需要手动创建混入文件夹

![image-20210818134037400](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210818134037400.png)

2. 在组件中 导入混入文件
   * 通过`import`导入混入的文件
   * 在`<script></script>`中用`mixins:[]`接收导入混入文件

```vue
<script>
// 导入封装的mixins混入(添加tabBar角标)
import TabBarM from '@/mixins/tabbar-badge.js'
import { mapState,mapMutations } from 'vuex'
	export default {
	// 接收mixins混入的文件
    mixins:[TabBarM],
	}
</script>
```

注意: 混入只能储存常用 通用方法 其他的不能储存(`data()` 也可以储存)

#  13. uniapp常用方法

##  uniapp同步获取系统信息

* [uniapp 获取系统信息官网方法](https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync)
* 可以通过uniapp提供方法` uni.getSystemInfoSync()` 查看系统信息
* 通常可以获取当前高度进行一些处理

```js
			//获取窗口高度
			const { windowHeight } = uni.getSystemInfoSync()
```

## uniapp设置tabBar角标

*  [uni.setTabBarBadge()](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge) 设置角标方法
*  可以使用`onShow` 生命周期 来更新角标的动态数据
* 该方法只适合tabBar 设置角标 并且需要给每个tabBar设置该角标方法 否则只会在设置组件中显示(可以用mixins混入)

![image-20210818135020891](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210818135020891.png)

```js
      setBadge(){
        // 给tabBar添加角标
        uni.setTabBarBadge({
          // 根据tabBar索引添加角标
          index:2,
           // 设置角标显示数量
          // 角标需要字符串数据 需要转换字符串
          text:String('123')
        })
      },
```

## uniapp 获取用户地址信息

*  [uni.chooseAddress()](https://uniapp.dcloud.io/api/other/choose-address?id=chooseaddress) 该方法可以通过微信等(基于平台) 获取用户地址信息
*  该方法是一个异步操作 需要设置`async` `awite`
*  该方法只适合小程序
* 选择收货地址 返回的是一个数组 
  * 参数1是错误对象 当没有正确获取地址时候才有 正确获取为null
  * 参数2是返回收货地址对象

```js
      async choseAddress(){
        // 选择收货地址 返回的是一个数组 
        // 参数1是错误对象 当没有正确获取地址时候才有 正确获取为null
        // 参数2是返回收货地址对象
        const [err,succ] = await uni.chooseAddress()
        // 判断如果正常获取到地址对象
        if(err === null){
		// 进行储存用户的地址信息
        }
      }
```

## uniapp 启动付款

* [uni.requestPayment() 启动付款官方介绍](https://uniapp.dcloud.io/api/plugins/payment?id=requestpayment)
* 该方法是一个异步操作 需要设置`async` `awite`
* 启动付款 返回的是一个数组 
  * 参数1是错误对象 当没有正确付款时候才有 正确获取为null
  * 参数2是返回付款详细信息

```js
      async choseAddress(){
        // 启动付款 返回的是一个数组 
        // 参数1是错误对象 当没有正确付款时候才有 正确获取为null
        // 参数2是返回收货地址对象
        const [err,succ] = await uni.requestPayment()
        // 判断如果正常获取到地址对象
        if(err === null){
		// 进行付款成功后进行的操作
        }
      }
```

## uniapp 登录方法

* uniapp可以通过平台获取登录信息弹窗
* <font color =#ff3040>注意: 微信小程序方法 和 其他平台不一样需要单独设置</font>
  * 非小程序登录方法 [uni.getUserInfo()](https://uniapp.dcloud.io/api/plugins/login?id=getuserinfo) 小程序不能使用(小程序会匿名)
  * 小程序登录方法 [uni.getUserProfile()](https://uniapp.dcloud.io/api/plugins/login?id=getuserprofile)
    * 小程序登录有必填项 ` desc` 用来记录作用
    * 小程序登录必须需要添加到公司开发者中 用公司appid才能成功
* 该方法是一个异步操作 需要设置`async` `awite`

> 小程序登录方式

![image-20210819192153825](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210819192153825.png)

* 小程序登录方法 [uni.getUserProfile()](https://uniapp.dcloud.io/api/plugins/login?id=getuserprofile)
  * 小程序登录有必填项 ` desc` 用来记录作用
* 该方法是一个异步操作 需要设置`async` `awite`
* 启动登录 返回的是一个数组 
  * 参数1是错误对象 当没有正确登录时候才有 正确获取为null
  * 参数2是返回登录后详细信息(头像 名称等)
* 注意: 发送请求获取token 开发时候必须添加到公司开发者中 用公司appid才能成功

```js
      async choseAddress(){       
		// 今年4月13日 getUserInfo方法只能获取到匿名用户信息 已经不好用了
        // uni.getUserProfile 获取到用户的真实信息
        // 1. 获取用户信息
        const [err,succ] = await uni.getUserProfile({
          // 必填项 获取信息的用途(自定义)
          desc:'登录'
        })
         if(err === null){
		// 进行登录成功后进行的操作
        }
     }
```

## uniapp 配合登录获得code

*  [uni.login() 官网方法](https://uniapp.dcloud.io/api/plugins/login?id=login) 配合登录成功后 获取用户的code
* 有的后端需要用户登录成功后的code 需要用到该方法
* 该方法是一个异步操作 需要设置`async` `awite`
* 启动登录 返回的是一个数组 
  * 参数1是错误对象 当没有正确登录时候才有 正确获取为null
  * 参数2是返回code数据

```js
   async choseAddress(){     
   // 获取同的code配合登录
   		const [err1,loginsucc] = await uni.login()
   }
```

## uniapp 确认弹出层

* [uni.showModal() 官网方法](https://uniapp.dcloud.io/api/plugins/login?id=getuserprofile) 会弹出一个确认的弹出层
  * 该方法是一个异步操作 需要设置`async` `awite`
  * 确认弹出层 返回的是一个数组 
    * 参数1是错误对象 当没有正确弹出时候才有 正确获取为null
    * 参数2是返回确认弹出层参数(点击取消 和 点击确认的状态位)
      * `confirm` 是确认的状态位 (点击为true)
  * 弹出层的常用参数
    * `title` 是标题文本
    * `content`是内容文本

![image-20210819201414313](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210819201414313.png)

```js
     async delLogin(){
      // 确认弹出层
      const [err,succ] = await uni.showModal({
      // 标题文本
        title:'提示',
        // 内容文本
        content:'是否退出登录'
      })
      // 判断确认状态位 如果确认进行操作
      if(succ.confirm){
	// 点击确认按钮执行的操作
      }
	}
```

## uniapp 普通弹出层

* [uni.showToast() 官网方法](https://uniapp.dcloud.io/api/ui/prompt?id=showtoast)
* 普通弹出层不具备操作按钮 常用于提示
* 普通弹出层默认参数
  * `icon` 字体图标设置
  * `duration` 弹出层持续时间
  * `title` 标题文本
  * `mark` 是否显示透明蒙层，防止触摸穿透(防止用户点击取消弹出层)

![image-20210819202121653](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210819202121653.png)

```js
    // 普通弹出层方法
      showTips(){
        uni.showToast({
          // 设置图标(不设置)
          icon: 'none',
          // 提示持续时间
          duration: 1500,
          // 提示文本
          title:'登录失败',
          // 添加遮罩层(防止触摸)
          mask:true
        })
      },
```



