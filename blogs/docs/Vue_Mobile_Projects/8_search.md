---
title: 7. Vue移动端 搜索功能设置
date: 2021-06-11
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目
---

::: tip 介绍

Vue移动端 搜索功能 通过动态路由传参 设置搜索页<br>
:::

<!-- more -->

## 设置一级路由搜索组件 点击跳转搜索 `search.vue`

[Vant搜索插件](https://vant-contrib.gitee.io/vant/#/zh-CN/search)

> 目标：实现搜索组件基本布局
>
> 效果: 点击搜索按钮 弹出一级路由的 搜索组件

![image.png](https://i.loli.net/2021/06/12/XZdqocaOlE5Qn68.png)

### 搜索功能组件基本样式 `search.vue`

一级路由组件 需要单独创建文件夹 创建Vue文件 `search文件夹 里面 search.vue`

* `template`模板内容
  * `v-if v-else` 来切换 历史搜索 和 搜索联想 
  * `$router.back()`是回退到上一个路由组件

```vue
<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- 搜索框 Vant search 提供的方法  @search按下回车点击搜索触发 .trim Vue提供的修饰符 用户去除两边空格(防止用户在两边输入空格)-->
    <van-search @search='handleSearch' v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
    <!-- 通过v-if v-else 判断 如果有输入内容 就切换成联想列表 没有输入内容就显示历史记录 -->
    <!-- 联想列表 -->
    <van-cell-group class="suggest-box" v-if='q'>
      <van-cell icon="search">
        <p><span>j</span>ava</p>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <!-- v-else-if判断 如果存在搜索数据 才会显示内搜索记录  否则就不显示搜索记录 -->
    <div class="history-box" v-else-if="history.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon name="delete"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="(item,index) in history" :key="index">
          <a class="word_btn">{{item}}</a>
          <van-icon class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
```

* `script`脚本

```vue
<script>
export default {
  name: 'Search',
  data () {
    return {
      // 搜索关键字(搜索框里面的内容)
      q: '',
    }
  }
}
</script>
```

* `style` 样式

```vue
<style scoped lang='less'>
.history-box {
  padding: 0 20px;
  .head {
    line-height: 36px;
    color: #999;
    .van-icon {
      font-size: 16px;
      float: right;
      margin-top: 10px;
    }
  }
  .van-cell {
    padding: 10px 0;
  }
  .word_btn {
    color: #3296fa;
  }
  .close_btn {
    margin-top: 5px;
    color: #999;
  }
}
.suggest-box {
  /deep/ .van-cell {
    padding: 10px 20px;
    color: #999;
    p {
      span {
        color: red;
      }
    }
  }
}
</style>

```

### 配置搜索页面的一级路由 `router 文件 index.js`

* 导入搜索Vue组件

```js
import search from '../views/search/search'
```

- `routes` 里面配置路径

```js
  {
    path: '/search',
    component: search
  }
```

### 首页 点击搜索 跳转到搜索页`Home.vue`

* `template` 模板
  * 点击后跳转到 搜索组件 ` @click-right`是Vant提供点击方法

```diff
<template>
  <div class="container">
    <!-- 顶部内容 -->
+    <van-nav-bar title="主页" right-text="搜索" @click-right='$router.push("/search")' />
    <!-- 中间内容 -->
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <!-- 底部内容 -->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home/main" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/home/video" icon="search">视频</van-tabbar-item>
      <van-tabbar-item to="/home/question" icon="friends-o">问答</van-tabbar-item>
      <van-tabbar-item to="/home/my" icon="setting-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>

</template>
```

总结：

1. 路由对象中提供了跳转页面相关的方法：
   1. back() 向后跳一步
   2. forward 向前跳一步
   3. go(n) 负值表示向后跳，正值表示向前跳
   4. push() 跳转到指定路径
2. v-model的修饰符
   1. lazy表示切换input事件到change事件
   2. number表示转换字符串为数值
   3. trim 表示去掉首位空格

## 显示历史搜索内容 `search.vue`

> 目标：显示历史搜索内容
>
> 效果: 在历史记录中 显示曾经搜索过的内容 不显示重复内容 并且可以删除历史记录
>
> 原理: 通过`localStorage` 永久储存缓存方法 把搜索内容存入浏览器缓存 再调用打印到页面上
>
> <font color = #ff3040>注意: </font>浏览器缓存的数据格式是 json 需要用到 `JSON.parse()`方法 转换数据成字符串

![image.png](https://i.loli.net/2021/06/12/PxR4tygA6lXKSV1.png)

- `script` 脚本 `data()`存储数据
  - `JSON.parse(localStorage.getItem('search')` 把缓存到浏览器的数据读取出来 并且`JSON.parse`转换为字符串

```diff
  data () {
    return {
      // 搜索关键字(搜索框里面的内容)
      q: '',
+      // ~ 历史关键字保存对象
+      // ~ 给历史关键字保存获取本地缓存的搜索数据 让其循环遍历到页面上
+     // ~ 3. 读取永久储存 localStorage的搜索缓存 缓存数据是字符串 需要转成对象
+ history: JSON.parse(localStorage.getItem('search') || '[]') // ~ 如果没有值 让其显示为空的字符串数组
    }
  }
```

* `script` 脚本 `methods:` 方法函数
  * 回车触发后 把搜索数据 储存到 对象里
    * 使用`localStorage.setItem` 把对象里面的搜索数据永久缓存到浏览器上

```js
  methods: {
      // ~ 回车搜索的配置(同时保存其历史记录)
    handleSearch () {
      // ~  回车触发后 保存历史关键字
      // ~ 把输入的内容 保存到历史关键字对象里
      this.history.unshift(this.q)
      // ~ 把保存历史关键字对象 把历史数据 永久存储到浏览器
      localStorage.setItem('search', JSON.stringify(this.history))
    }
  }
```

* `template` 模板
  * 搜索历史布局 把搜索历史 `v-for` 循环遍历打印到页面上
  *  @search按下回车点击搜索触发方法 由Vant 插件提供
  * v-else-if判断 如果存在搜索数据 才会显示内搜索记录  否则就不显示搜索记录
    * `<div class="history-box" v-else-if="history.length">`

```vue
<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- 搜索框 Vant search 提供的方法  @search按下回车点击搜索触发 .trim Vue提供的修饰符 用户去除两边空格(防止用户在两边输入空格)-->
    <van-search @search='handleSearch' v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
    <!-- 通过v-if v-else 判断 如果有输入内容 就切换成联想列表 没有输入内容就显示历史记录 -->
    <!-- 联想列表 -->
    <van-cell-group class="suggest-box" v-if='q'>
      <van-cell icon="search">
        <p><span>j</span>ava</p>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <!-- v-else-if判断 如果存在搜索数据 才会显示内搜索记录  否则就不显示搜索记录 -->
    <div class="history-box" v-else-if="history.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon name="delete"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="(item,index) in history" :key="index">
          <a class="word_btn">{{item}}</a>
          <van-icon class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
```

### 历史数据去重(覆盖上面)

* `script` 脚本  ` methods` 函数方法
  * 需要进行空格效验 不能让空格数据 储存到服务器缓存中 `if (!this.q.trim()) return`
  * 相同的搜索历史不显示 需要用到`new Set()` 方法去重
  * 去重后 需要把 js数据转换成 json 数据`JSON.stringify()` 才能存储到服务器缓存

````js
    // ~ 回车搜索的配置(同时保存其历史记录)
    handleSearch () {
      // ~ 1. 防止用户输入空格搜索 trim()方法取消首尾空格后 没有数据 取反返回true 如果为true return 跳出方法
      if (!this.q.trim()) return
      // ~ 2. 回车触发后 保存历史关键字
      // ~ 把输入的内容 保存到历史关键字对象里 unshift会把数据添加到第一项 push是默认添加到结尾
      this.history.unshift(this.q)
      // ~ 3. 进行搜索数据的去重 new Set() 方法去重后自动生成数组 把没有重复的数组覆盖到 原先数组中
      this.history = [...new Set(this.history)]
      // ~ 4. 把保存历史关键字对象 把历史数据 永久存储到浏览器
      localStorage.setItem('search', JSON.stringify(this.history))
    }
````

总结：基于ES6提供Set构造函数进行去重比较方便

注意：Set是ES6引入的一个构造函数，存储结构和数组类似，其中不允许放重复数据

### 删除历史数据

* `template` 模板
  * 分别绑定两种删除
    * 一种是 单独点击搜索条目删除按钮后 删除该搜索记录 (需要携带搜索条目id 在页面数据中删除)
    * 一种是 点击后 清空所有的搜索记录 (直接用`localStorage.removeItem()`删除浏览器缓存搜索记录)

```vue
    <!-- 搜索历史 -->
    <!-- v-else-if判断 如果存在搜索数据 才会显示内搜索记录  否则就不显示搜索记录 -->
    <div class="history-box" v-else-if="history.length">
      <div class="head">
        <span>历史记录</span>
        <!-- ? 绑定删除全部搜索历史的方法 -->
        <van-icon @click='deleteAll' name="delete"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="(item,index) in history" :key="index">
          <a @click="handleJump(item)" class="word_btn">{{item}}</a>
          <!-- ? 绑定删除指定历史条目的方法 -->
          <van-icon @click='deleteSingle(index)' class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
```

* `script`脚本 ` methods:` 函数方法

```js
    // ? 删除搜索单个条目
    deleteSingle (index) { // ? 获取其索引值 进行删除
      // ? 在页面数据历史记录  找到指定索引 进行删除
      this.history.splice(index, 1)
      // ? 在浏览器缓存中删除(重新把页面数据覆盖到浏览器缓存中)
      localStorage.setItem('search', JSON.stringify(this.history))
    },
    // ? 删除全部搜索内容
    deleteAll () {
      // ? 清空页面数据历史记录(清除所有记录)
      this.history = []
      // ? 清空浏览器缓存中的数据
      localStorage.removeItem('search')
    },
```

注意：删除时要删除两个部分：1、data中的数据；2、缓存中的数据



## 关键字联想列表 `search.vue`

[Vant 提供搜索插件](https://vant-contrib.gitee.io/vant/#/zh-CN/search)

>目标：用书输入搜索内容 获取服务器返回的联想 
>
>效果: 当用户输入的时候 显示模糊搜索联想
>
>原理: 输入绑定@input功能 实现用户输入就获取其数据 用户输入数据 提交服务器 服务器返回 模糊匹配数据 打印到页面
>
><font color = #ff3040>注意: </font> 需要设置`函数防抖 debounce` 限制提交频率 在规定时间内 只上传一次数据 (1秒)

* `template` 模板设置
  * 设置 `@input`方法 用户输入内容时候 触发方法
  * 循环遍历 服务器返回的搜索匹配 打印到页面上

```vue
   <!-- 搜索框 Vant search 提供的方法  @search按下回车点击搜索触发 .trim Vue提供的修饰符 用户去除两边空格(防止用户在两边输入空格)
          绑定 @input功能 只要用户开始搜索 就触发-->
    <van-search @input="keywordList" @search='handleSearch' v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
    <!-- 通过v-if v-else 判断 如果有输入内容 就切换成联想列表 没有输入内容就显示历史记录 -->
    <!-- 联想列表 -->
    <van-cell-group class="suggest-box" v-if='q'>
      <!-- 携带点击搜索结果的详细条目信息 -->
      <van-cell @click.stop='handleJump(items)' v-for="(items,index) in keylist" :key="index" icon="search">
        <!-- 使用v-html 实现样式也能打印出来 -->
        <p>{{items}}</p>
        <!-- <p>{{items}}</p> -->
      </van-cell>
    </van-cell-group>
```

- `script` 脚本  ` data()` 储存数据
  - 存储 服务器返回的搜索数据 
  - 存储 把用户搜索的关键字 储存到函数防抖机制中

```js
  data () {
    return {
      //! 搜索关键字(搜索框里面的内容)
      q: '',
 	 //! 创建一个空对象 服务器返回的搜索数据
      keylist: [],
      //! 创建一个函数防抖函数 默认为空null(对象存储起来 用于删除防抖定时)
      timer: null
    }
  }
```

* `script` 脚本  ` methods` 函数方法
  * 需要设置函数防抖 1秒内 只会向服务器请求一次数据 
  * 需要设置 空格效验 不能让空格数据 上传服务器 进行获取 `if (!this.q.trim()) return`

```js
    //! 搜索功能的实现
    keywordList () {
      //! 添加搜索的 函数防抖(利用定时器 在一定时间内向服务器发送一次指令 防止频繁发送指令给服务器)
      //! 1. 当数据传入过来的时候 重置(清除)上一个防抖定时器
      clearTimeout(this.timer)
      //! 2. 防止用户输入空格搜索 trim()方法取消首尾空格后 没有数据 取反返回true 如果为true return 跳出方法
      if (!this.q.trim()) return
      //! 3. 创建一个防抖函数(定时器)
      this.timer = setTimeout(async () => { //! 5. 需要设置async同步
        //! 6. 向服务器发送数据
        const ret = await searchList(this.q)
        //! 7. 把服务器传回的值 保存到页面搜索数据里 用于打印到页面上
        this.keylist = ret.data.options
      }, 1000) //! 每隔一秒钟 触发一次(向服务器发送数据)
    },
```

### 函数防抖介绍

> 目的: 限制任务执行的频率(防止同一时间 多次把数据上传到服务器)
>
> 原理: 使用 `setTimeout` 来存放待执行的函数，这样可以很方便的利用 `clearTimeout` 在合适的时机来清除待执行的函数
>
> 场景: 关键字搜索 账号重复性验证 (输入效验 搜索返回)
>
> 作用: 如果连续两次触发条件的时间间隔超过规定的时间，那么才触发一次任务，如果两次触发条件的间隔小于这个固定时间，那么始终不触发任务。(上一个任务 覆盖下一个任务 直到最后执行一个任务)

函数防抖: 连续两次触发条件超过特定时间才会执行一次任务

---



总结：

1. 函数防抖 debounce ：连续两次触发条件超过特定时间才会执行一次任务。（关键字搜索、账号重复性验证）
2. 函数节流 throttle：在固定的时间内，无论触发多少次条件，仅仅执行一次任务。（分页动态加载）

## 动态路由跳转 搜索内容页面 `sresult.vue`

[编程式导航 (动态路由) 介绍](https://router.vuejs.org/zh/guide/essentials/navigation.html#%E7%BC%96%E7%A8%8B%E5%BC%8F%E7%9A%84%E5%AF%BC%E8%88%AA)

> 目标：当用户点击搜索 或者 回车的时候 跳转到 搜索内容页面 
>
> 原理:  当用户触发搜索时候 通过动态路由 携带用户搜索数据 上传服务器 获取搜索匹配的数据
>
> <font color = #ff3040>注意: </font>需要用到动态路由 携带参数 上传服务器 如果文章id过长 需要用到[ json-bigint插件处理](https://liukaili.vercel.app/blogs/docs/axios/axios_transform.html) 转换的id值如果绑定是`:key` 需要用 `toString()` 把拆分id对象 转为字符串

![image-20210613153437861](https://i.loli.net/2021/06/13/SJmWGvlsTAc5gFX.png)

### 配置动态跳转搜索内容页的路由 `search.vue`

> 在 搜索页面上 配置搜索内容的 动态路由 `search.vue`

* 搜索页面一般为 动态路由 携带用户数据 跳转到 搜索内容页面 
  * 携带的用户数据 比对服务器 获取服务器返回的数据 渲染到页面上
* 使用 `? ` `query`动态路由配置写法 显示效果: `/sresult?kw=aaa123`

> 回车触发搜索进行跳转

* `template` 模板

```vue
 <!-- 搜索框 Vant search 提供的方法  @search按下回车点击搜索触发 .trim Vue提供的修饰符 用户去除两边空格(防止用户在两边输入空格)
          绑定 @input功能 只要用户开始搜索 就触发-->
    <van-search @input="keywordList" @search='handleSearch' v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
```

* `script` 脚本 `methods: `函数方法
  * **使用** **`?`** `query`态路由配置写法 显示效果:`/sresult?kw=aaa123`
  * 用对象方式 配置动态路由 通过`query` 对象传值

```diff
    // ~ 回车搜索的配置(同时保存其历史记录)
    handleSearch () {
   // ~ 1. 防止用户输入空格搜索 trim()方法取消首尾空格后 没有数据 取反返回true 如果为true return 跳出方法
      if (!this.q.trim()) return
      // ~ 2. 回车触发后 保存历史关键字
      // ~ 把输入的内容 保存到历史关键字对象里 unshift会把数据添加到第一项 push是默认添加到结尾
      this.history.unshift(this.q)
      // ~ 3. 进行搜索数据的去重 new Set() 方法去重后自动生成数组 把没有重复的数组覆盖到 原先数组中
      this.history = [...new Set(this.history)]
      // ~ 4. 把保存历史关键字对象 把历史数据 永久存储到浏览器
      localStorage.setItem('search', JSON.stringify(this.history))
+      // 回车跳转到搜索列表页面(动态路由设置) /? 也是一种路由跳转传递参数的设置
+       this.$router.push({
+         name: 'myresult', // name是该路径的别名 需要给路由组件设置一样名称 作用跟path一样 动态跳转
+         query: { // 利用 query 动态路由跳转方法 携带数据 跳转到二级路由上
+           // 携带搜索关键字的数据 左边属性名 需要和 设置的?后面路径一致 右边是要携带的属性值
+           kw: this.q
        }
      })
    }
```

> 鼠标点击历史记录进行跳转

* `template`模板 
  * 需要阻止阻止其冒泡行为 防止删除的时候触发跳转 搜索内容页面

```vue
        <van-cell v-for="(item,index) in history" :key="index">
          <!-- 设置鼠标点击搜索历史进行跳转 注意为了防止冒泡行为 需要设置 .stop阻止冒泡行为 -->
          <a @click.stop="handleJump(item)" class="word_btn">{{item}}</a>
          <!-- ? 绑定删除指定历史条目的方法 -->
          <van-icon @click='deleteSingle(index)' class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
```

* `script` 脚本 `methods: `函数方法
  * **使用** **`?`** `query`态路由配置写法 显示效果:`/sresult?kw=aaa123`
  * 用对象方式 配置动态路由 通过`query` 对象传值

```js
    // 搜索联想 点击跳转到搜索页面方法(动态路由的处理)
    handleJump (kw) {
      // kw此时包括span高亮的标签，需要去掉
      const reg = new RegExp(`<span>${this.q}</span>`, 'ig')
      kw = kw.replace(reg, this.q) // 替换方法 replace(替换的规则,需要替换的数据)
      this.$router.push({
        name: 'myresult', // name是该路径的别名 需要给路由组件设置一样名称 作用跟path一样 动态跳转
        query: { // 利用 query 动态路由跳转方法 携带数据 跳转到二级路由上
          // 携带搜索关键字的数据 左边属性名 需要和 设置的?后面路径一致 右边是要携带的属性值
          kw: kw
        }
      })
    }
```

>在路由映射文件 配置动态路由 `router文件夹 里面 index.js`

```js
// 导入搜索内容页
import sresult from '../views/search/sresult' 
// 配置其动态路由 设置name 好调用
{
    path: '/sresult',
    name: 'myresult',
    component: sresult
  }
```

### 配置搜索内容接口api (分页获取) ` search.js`

> 配置在 `api文件夹 里面 search.js`

* 基于页码（pagenum）和每页条数（pagesize）实现分页 

```js
// 根据关键字 搜索文章列表的api接口
//! 分页方法: 根据 pagenum pagesize 根据页码 和 每页条数 进行分页
export const searchArticles = (options) => { // 分页传参的时候 直接传对象即可
  return request({
    method: 'get',
    url: 'v1_0/search',
    // axios传递get请求参数本来就是使用params
    // 利用传统的分页方法 获取分页的文章列表
    params: {
      // 当前页码
      page: options.pagenum,
      // 每页的条数
      per_page: options.pagesize,
      // 查询的关键字
      q: options.kw
    }
  })
}
```

### 创建显示搜索内容的页面 `sresult.vue`

[Vant-list组件](https://vant-contrib.gitee.io/vant/#/zh-CN/list)

> 搜索显示页面 需要单独创建 `search文件夹 里面 sresult.vue`

* `template` 模板
  * `@load`是声明下拉获取数据方法 当频道没有数据的时候 自动执行
  * 循环遍历 服务器返回搜索结果 到页面上
  * 进行判断 如果 数据图片为3张时候 把类名设置为 w33 如果为1张时候 把类名设置为w100 (利用动态类名 `:clas'[{}]'` )

```vue
<template>
  <div class="container">
    <!-- 导航固定定位 fixed -->
    <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />
    <!-- 文章列表  @load是声明下拉获取数据方法 当频道没有数据的时候 自动执行-->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load='onLoad'>
      <van-cell-group>
        <!-- 把服务器获取的数据 渲染到页面上 id需要 toString()一下 因为用了 json-bigint解决了id太长js不识别问题 -->
        <van-cell v-for="item in list" :key='item.art_id.toString()'>
          <div class="article_item">
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <div class="img_box">
      <!-- 进行判断 如果 数据图片为3张时候 把类名设置为 w33 如果为1张时候 把类名设置为w100 -->
      <!-- 循环遍历 v-for 获取储存的数组中的数据 -->
              <van-image lazy-load :class='[{w33: item.cover.type === 3}, {w100: item.cover.type === 1}]' :key='index' v-for='(img, index) in item.cover.images' fit="cover" :src="img" />
            </div>
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}} 评论</span>
              <span>{{item.pubdate|formatTime}}</span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>
```

- `style` 样式

```less
<style scoped lang='less'>
.container {
  padding-top: 92px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 180px;
    }
    .w100 {
      height: 360px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 20px;
    }
  }
}
</style>

```

### 获取搜索结果 上拉显示搜索结果(首页文章列表组件一致) `sresult.vue`

[Vant-list组件](https://vant-contrib.gitee.io/vant/#/zh-CN/list)

* `script` 脚本  导入搜索接口api

```
// 导入搜索接口的api
import { searchArticles } from '../../api/search'
```

* `script` 脚本 `data()`存储数据
  * 设置 Vant-list组件的 上拉加载状态位 和 加载结束状态位
  * 设置 请求参数(携带关键字 通过pagenum pagesize 实现分页) 利用传统的分页方法 获取分页的文章列表
  * 设置 获取服务器返回数据 储存的数组
  * 设置 列表的总数 比对服务器总数目判断是否加载完毕

```JS
 

data () {
    return {
      // 单次加载状态位(Vant提供)
      loading: false,
      // 列表是否完全加载完成的标志(Vant提供)
      finished: false,
      // 请求参数(携带关键字 通过pagenum pagesize 实现分页) 利用传统的分页方法 获取分页的文章列表
      queryData: {
        // 当前页码 让其显示第一页(最近接模糊搜索的值)
        pagenum: 1,
        // 每页的条数 (根据接口文件设置)
        pagesize: 10,
        // 查询关键字
        kw: ''
      },
      // 获取服务器返回搜索数据 储存的数组
      list: [],
      // 列表的总数 比对服务器总数目判断是否加载完毕
      total: 0
    }
  },
```

* `script` 脚本  `created ()` 生命周期
  * 用户跳转到 搜索页面 就获取其动态路由携带的数据 储存到页面数据里 上传到服务器 获取服务器返回的搜索数据

```js
  created () {
    // 让页面一跳转 就获取动态路由携带的数据 用于比对服务 进行模糊数据展示
    this.queryData.kw = this.$route.query.kw
    console.log(this.list)
  }
```

* `script` 脚本 `methods: `函数方法
  * 把动态路由携带的数据 上传服务器 获取服务器返回搜索结果数据
  * 把服务器返回的结果储存到 页面数组中 循环遍历到页面上
  * 单次页面加载完毕后 手动设置单次加载状态位为false`this.loading = false`
  * 进行判断 加载总条数 等于 服务器 返回的总条数数据 终止列表文章加载

```js
  methods: {
    // 获取分页数据 并且实现分页效果
    async onLoad () {
      // 页面加载时候 触发一次 如果不够一屏幕 自动调用一次 (Vant方法)
      // 比对搜索数据 获取服务器 数据
      const ret = await searchArticles(this.queryData)
      // 把服务器 获取的数据 储存到页面对象里 需要使用 push方法 因为分页是动态获取数据 需要用push添加 不覆盖之前数据
      // ...是直接把所有数据全部添加进去 不用一个一个添加
      this.list.push(...ret.data.results)
      // 设置服务器数据的总数(根据服务器返回)
      this.total = ret.data.total_count
      // 单次页码 加载完成后 还原单次加载状态为(有数据刷新自动为true 需要手动设置为false)
      this.loading = false
      // 判断时候加载了全部数据 加载全部数据让其 finished 加载完毕状态位 设置为true
      if (this.list.length === this.total) { // total是服务器返回的 模糊搜素条目的总数 满足总条数后 把获取文章列表状态位设置为true
        // 如果以展示所有数据 那么 把finished 加载完毕状态位 设置为true
        this.finished = true
      } else {
        // 如果没有加载结束 继续获取数据(继续添加页码 服务器通过页码返回搜素数据的)
        this.queryData.pagenum += 1
      }
      console.log(this.total)
    }

  },
```

总结：

1. 基于pagenum和pagesize的分页逻辑
2. van-list组件的基本使用
3. 类名的动态绑定的用法
