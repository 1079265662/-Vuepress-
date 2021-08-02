---
title: 函数节流和函数防抖的设置与原理
date: 2021-06-20
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/12.jpg
tags:
 - Vue
 - JavaScript
categories: Vue
---

::: tip 介绍
函数节流 函数防抖的设置与原理 <br>
:::

<!-- more -->

## 函数节流设置方法 `throttle`

> 目的: 防止用户多次刷新 出现bug 
>
> 原理: 设置一个对象 默认为false 如果第一次执行方法 先让其编程true 等代码执行完毕后 再恢复false 判断是否为true 如果是return跳出 防止多次刷新
>
> 场景: 分页功能动态加载(滚动条类型)
>
> 作用:  在固定的时间内（1秒），无论触发多少次条件（onLoad触发一次），仅仅执行一次任务（加载一页数据）

函数节流: 固定的时间内 无论触发多少次条件 都只会进行一次 直到条件结束 

> 函数节流 滚动条示例

```diff
<script>
// ? 导入不同用户的频道数据
import { getAllChannels } from '../../api/channel'
export default {
  data () {
    return {
      // 控制Tab当前选中的条目
      active: 0,
      // 列表数据加载过程的状态位(加载的过程 会自动修改为true 但是渲染完毕后 需要手动修改false)
      loading: false,
      // 列表加载完成的标志(加载的结束 设置指定数值 加载到一定数目结束加载 需要手动修改true)
      finished: false,
      // 列表数据
      list: [],
+      // 设置函数节流
+      throttle: false
    }
  },
  methods: {
// 每次触发动态加载一页新的数据（上滑到底部时触发）
    onLoad () {
      // 函数节流: 固定的时间内 无论触发多少次条件 都只会进行一次进入
+ // 原理: 设置一个对象 默认为false 如果第一次执行方法 先让其编程true 等代码执行完毕后 再恢复false 判断是否为true 如果是return跳出 防止多次刷新
+       // 启动函数节流: 如果 throttle为true 就让其跳出 不执行下面代码
+       if (this.throttle) return
+       // 设置 throttle 为true 让其执行一次
+       this.throttle = true
      // 模拟异步操作
      setTimeout(() => {
        // 加载一页新的数据
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 告诉列表组件本次数据已经完成加载
        this.loading = false
        // 如果加载完成后，需要告诉list组件
        if (this.list.length >= 50) {
          // 加载结束(不改成true 加载不会结束 会一直加载)
          this.finished = true
        }
+       // 再设置回false 让其下次可以触发方法  
+         this.throttle = false
      }, 1000)
    }
  }
</script>
```

## 函数防抖设置方法 `debounce`

> 目的: 限制任务执行的频率(防止同一时间 多次把数据上传到服务器)
>
> 原理: 使用 `setTimeout` 来存放待执行的函数，这样可以很方便的利用 `clearTimeout` 在合适的时机来清除待执行的函数
>
> 场景: 关键字搜索 账号重复性验证 (输入效验 搜索返回)
>
> 作用: 如果连续两次触发条件的时间间隔超过规定的时间，那么才触发一次任务，如果两次触发条件的间隔小于这个固定时间，那么始终不触发任务。(上一个任务 覆盖下一个任务 直到最后执行一个任务)

函数防抖: 连续两次触发条件超过特定时间才会执行一次任务

### 函数防抖 搜索示例

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
