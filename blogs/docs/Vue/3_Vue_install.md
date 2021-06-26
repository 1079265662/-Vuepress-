---
title: Vue插件食用方法 
date: 2021-06-30
cover: https://tva2.sinaimg.cn/large/005INI3Xly8grvjjbanusj31hc0u01f3.jpg
tags:
 - Vue
categories: Vue
---

::: tip 介绍
Vue插件 绝对时间插件 和 图片失效 制作方法 <br>
:::

<!-- more -->

## Vue的插件机制 `install`

[Vue插件介绍](https://v3.cn.vuejs.org/guide/plugins.html#%E6%8F%92%E4%BB%B6)

> 目标：熟悉Vue的插件机制（针对Vue核心规则的一种扩展机制）

只要用`Vue.use()`导入的 都是Vue插件扩展

* <font color = #ff3040>Vue.use(参数1,参数2)</font>
  * 参数1 是需要实例化的插件名称
  * 参数2 是定制插件内部的信息(插件接收的数据 传递给install的options参数 可设置为固定值)

> 第一步 定义插件（Vue插件就是一个对象，对象中必须有一个`install`方法）

```js
// Vue插件就是一个对象，对象中必须有一个install方法
export default {
  install (Vue,options) {
    // 该方法的形参就是Vue构造函数 
    // 给Vue的实例化对象里面 添加$abc方法
    Vue.prototype.$abc = 123
  }
}
```

>第二步 导入并配置插件(在总组件导入文件设置)

```js
// 导入自定义插件
import MyPlugins from '@/utils/plugins.js'
// 导入完毕后 需要Vue.use() 把组件添加到Vue实例化对象里
Vue.use(MyPlugins,'这里可以导入一些数据') // 配置和定义插件时候 支持配置选项
```

>第三步 在需要调用的Vue组件里 使用

```js
// 组件中，可以用如下方式访问实例属性 
// 直接调用导入的Vue实例化方法即可 $abc
this.$abc
```

## 绝对时间插件制作例

[dayjs的相对时间官网](https://dayjs.fenxianglu.cn/category/plugin.html#%E7%9B%B8%E5%AF%B9%E6%97%B6%E9%97%B4)

[Vue插件介绍官网](https://v3.cn.vuejs.org/guide/plugins.html#%E6%8F%92%E4%BB%B6)

> 目标：自定义过滤器格式化时间 (相当于时间)
>
> 安装: npm install dayjs --save

通过 dayjs提供的包 制作时间过滤器插件

- `Vue.use()`实例化 创建一个过滤器插件

> 在工具文件夹 `utils文件夹 里面 plugins.js` 创建一个时间过滤器插件`filter`

```js
// 自定义Vue插件的文件
// Vue插件就是一个对象 对象中必须包含一个install方法
// 导入时间过滤器的插件
import dayjs from 'dayjs'
// 导入时间过滤器的 相对时间模板
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入国际化(中文)
import 'dayjs/locale/zh-cn'
// 把 相对时间 和 时间过滤器插件 进行关联
dayjs.extend(relativeTime)
// 设置一个时间过滤器
export default {
  install (Vue) {
    // 扩展日期格式化过滤器 添加一个filter过滤器 formatTime是过滤名称
    Vue.filter('formatTime', function (time) {
      // 基于中文的方式计算time的相对时间
      return dayjs().locale('zh-cn').from(time) // dayjs方法.中文显示.格式化时间
    })
  }
}

```

> 在项目入口文件 导入制作的时间插件 `main.js`

```js
//~ 导入时间过滤器功能
import time from './utils/plugins'
// ~ 导入 自定义事件过滤器
Vue.use(time)
```

> 在需要的Vue文件 使用过滤器 过滤器使用`|` `main.vue`

```vue
<span>{{item.pubdate|formatTime}}</span>
```

## 制作头像失效问题

<br>

> `目标`：处理图片加载失败时的默认显示效果 如果默认图片加载失败 用统一图片代替
>
> `原理 `:  这里用到了Vue的插件机制`Vue.directive` 和 自定义Vue方法 `install`

* 在入口文件中导入Vue插件 并且实例化Vue插件 `main.js`

```js
// 导入自定义插件
import MyPlugins from '@/utils/plugins.js'
// 配置自定义插件
// 参数1 是需要实例化的插件名称
// 参数2 是定制插件内部的信息(插件接收的数据 传递给install的options参数 可设置为固定值)
Vue.use(MyPlugins, '"https://tva2.sinaimg.cn/large/005INI3Xly8grusluz3ruj30b40b4wfn.jpg"')
```

* 封装设置Vue插件 
  * 使用到了自定义指令`Vue.directive`  来检测图片加载失败清空
    * el:指令绑定的元素
    * bindings表示指令相关的配置信息 <font color = #ff3040>常用于动态绑定 `:`</font>
  * `onerror`是检测原始是否加载失败 如果失败就执行
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