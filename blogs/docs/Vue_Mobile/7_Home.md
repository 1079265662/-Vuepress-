---
title: 7. Vue移动端 频道关联文章列表
date: 2021-06-08
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目
---

::: tip 介绍

Vue首页布局 频道和列表关联 实现点击切换相应文章<br>
:::

<!-- more -->

## 首页频道基本布局 `main.vue`

> 目标：基于vant组件实现频道效果布局

* `main文件夹下的 main.Vue文件`

> 基本结构 template

```vue
<template>
  <div class="main">
    <!-- v-model="active"是控制默认选择 在data(){}里面控制 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :key="index" v-for="index in 8" :title="'标签 ' + index">
        <div class="scroll-wrapper">
          <van-cell v-for="item in 20" :key="item">{{index + '-' + item}}</van-cell>
        </div>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav"></van-icon>
    </span>
  </div>
</template>
<script>
```

> 样式处理 style

```less
<style lang="less" scoped>
.main {
  height: 100%;
  .van-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/ .van-tabs__wrap {
      height: 72px;
      padding-right: 72px;
      .van-tab {
        line-height: 72px;
      }
      .van-tabs__line {
        background-color: #3296fa;
        height: 2px;
      }
    }
    // 修改Vant插件样式 需要用到/deep/ 防止修改失败
    /deep/ .van-tabs__content {
      flex: 1;
      overflow: hidden;
      .van-tab__pane {
        height: 100%;
        .scroll-wrapper {
          height: 100%;
          overflow-y: auto;
        }
      }
    }
  }
  .bar_btn {
    width: 72px;
    height: 70px;
    position: absolute;
    top: 0;
    right: 0;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 999;
      box-shadow: 0 0 10px #999;
      transform: scale(1, 0.6);
    }
    .van-icon-wap-nav {
      width: 100%;
      height: 100%;
      background: #fff;
      text-align: center;
      line-height: 70px;
      position: relative;
      z-index: 1000;
      &::before {
        font-size: 40px;
      }
    }
  }
}
</style>
```

- `/deep/`  作用：**父级样式影响到子级**
  - /deep/ 这个符号的作用由[vue-loader](https://vue-loader.vuejs.org/zh/guide/scoped-css.html)决定 
  - 默认情况下，scoped模式的样式会自动编译类名 .a[data-v-f3f3eg9]
  - 让父组件影响到子组件
    - 让子组件类名生效
  - <big>只要第三方组件提供的类名被覆盖 就在左侧添加/deep/(覆盖第三方样式 添加自己样式)</big>
  
  

> van-tabs 和 van-tab 的关系
>
> 注意：如果希望覆盖第三方组件提供类名，需要添加/deep/（希望less的嵌套写法中，父组件的类名影响子组件的类名）

## 实现上拉下拉加载更新  `main.vue`

[上拉加载更新官方地址](https://vant-contrib.gitee.io/vant/#/zh-CN/list)

> 目标：基于vant组件实现上拉下拉效果

需求：

1. 滚动到页面底部时，加载下一页数据 加载到一定数量 结束加载
2. 滑动顶部 更新数据 

> 基本结构 template

* @refresh是声明上拉方法
* @load是声明下拉方法

```vue
<template>
  <div class="main">
    <!-- v-model="active"是控制默认选择 在data(){}里面控制 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :key="index" v-for="index in 8" :title="'标签 ' + index">
        <div class="scroll-wrapper">
          <!-- 添加 上拉菜单刷新 -->
          <!--isLoading 是控制上拉的状态为 布尔控制 -->
          <!-- @refresh是声明上拉方法 -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="pullText">
            <!-- 添加 滑动下拉的数据 -->
            <!-- :finished 是列表加载完成的标志 布尔控制 loading 是下拉状态为 布尔控制  -->
            <!-- @load是声明下拉方法-->
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <!-- list是渲染到页面上的内容  -->
              <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav"></van-icon>
    </span>
  </div>
</template>
```

> 脚本设置  scrpit 

* onLoad () 下拉菜单获取数据

  * `loading `加载的过程 会自动修改为true 但是渲染完毕后 需要手动修改false
  * ` finished` 加载的结束 设置指定数值 加载到一定数目结束加载 需要手动修改true

  <big>下拉获取数据总结</big>：

  1. 页面首次渲染列表时，自动触发onLoad函数，如果单次加载数据不够一屏，自动再次触发一次
  2. 单次加载列表数据时，loading状态位自动修改为true，本次数据加载完成后，需要手动修改为false,表示此次加载数据完成。
  3. 最后所有数据都加载成功了，需要把finished状态位修改为true，表示所有数据已经加载完成。

* onRefresh() 上拉菜单更新数据

  * `isLoading` 刷新的过程 会自动修改为true 但是渲染完毕后 需要手动修改false
  * ` finished` 加载的结束 设置指定数值 加载到一定数目结束加载 需要手动修改true
  * ` pullText` 设置刷新提示

  <big>上拉刷新数据总结</big>：

  1. 通过状态位isLoading控制下拉的完成的流程
  2. 更新完成数据后，为了防止出现不够一屏的情况，需要手动调用onLoad
  3. 下拉时需要清空列表数据

```js
<script>
export default {
  data () {
    return {
      // 控制Tab当前选中的条目
      active: 0,
      // 下来获取数据状态位在(加载的过程 会自动修改为true 但是渲染完毕后 需要手动修改false)
      loading: false,
      // 列表加载完成的标志 (加载的结束 设置指定数值 加载到一定数目结束加载 需要手动修改true)
      finished: false,
      // 列表数据
      list: [],
      // 上拉刷新状态位 (加载的过程 会自动修改为true 但是渲染完毕后 需要手动修改false)
      isLoading: false, 
      // 设置刷新提示
      pullText: '刷新成功'
    }
  },
  methods: {
    // 下拉时触发，加载最新的数据即可 (下滑到顶部执行)
    onRefresh () {
      // 加载一页新的数据
      setTimeout(() => {
        const data = [1, 2, 3, 4, 5]
        if (data.length > 0) {
          // 有新的数据(先请空之前的数据，再放入最新的数据)
          this.list = []
          this.list.push(...data)
          // 把列表加载结束的标志重置一下
          this.finished = false
          // 手动加载一页数据(防止不够一页数据)
          this.onLoad()
        } else {
          // 没有新的数据提示
          this.pullText = '没有数据需要更新...'
        }
        // 通知下拉刷新的组件成功了
        this.isLoading = false
      }, 1000)
    },
    // 每次触发动态加载一页新的数据（上滑到底部时触发）
    onLoad () {
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
      }, 1000)
    }
  }
</script>
```

<big>下拉获取数据总结：</big>

1. 页面首次渲染列表时，自动触发onLoad函数，如果单次加载数据不够一屏，自动再次触发一次
2. 单次加载列表数据时，loading状态位自动修改为true，本次数据加载完成后，需要手动修改为false,表示此次加载数据完成。
3. 最后所有数据都加载成功了，需要把finished状态位修改为true，表示所有数据已经加载完成。

<big>上拉刷新数据总结： </big>

1. 通过状态位isLoading控制下拉的完成的流程
2. 更新完成数据后，为了防止出现不够一屏的情况，需要手动调用onLoad
3. 下拉时需要清空列表数据

## 设置函数节流  `main.vue`

> 目的: 防止用户多次刷新 出现bug
>
> 作用: 在固定的时间内（1秒），无论触发多少次条件（onLoad触发一次），仅仅执行一次任务（加载一页数据）

 函数节流: 固定的时间内 无论触发多少次条件 都只会进行一次 直到条件结束 

节流原理: 设置一个对象 默认为false 如果第一次执行方法 先让其编程true 等代码执行完毕后 再恢复false 判断是否为true 如果是return跳出 防止多次刷新

````js
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
````

总结:

1.  在固定的时间内（1秒），无论触发多少次条件（onLoad触发一次），仅仅执行一次任务（加载一页数据）

##  列表文章布局  `main.vue`

[Vant Cell 单元格](https://vant-contrib.gitee.io/vant/#/zh-CN/cell)

[Vant img 图片](https://vant-contrib.gitee.io/vant/#/zh-CN/image)

> 目标：实现文章列表基本布局

* 页面结构-三张图 
* 页面结构-一张图

>template 模板样式

* van-ellipsis vant内置的样式 当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```diff
<template>
  <div class="main">
    <!-- v-model="active"是控制默认选择 在data(){}里面控制 -->
    <van-tabs v-model="active" swipeable>
      <!-- 把用户频道数据 渲染到页面上 -->
      <van-tab :key="item.id" v-for="item in channels" :title="item.name">
        <div class="scroll-wrapper">
          <!-- 添加 上拉菜单刷新 -->
          <!--isLoading 是控制上拉的状态为 布尔控制 -->
          <!-- @refresh是声明上拉方法 -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="pullText">
            <!-- 添加 滑动下拉的数据 -->
            <!-- :finished 是列表加载完成的标志 布尔控制 loading 是下拉状态为 布尔控制  -->
            <!-- @load是声明下拉方法-->
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <!-- list是渲染到页面上的内容  -->
+               <van-cell v-for="item in list" :key="item">
+                <!-- 页面结构-三张图 -->
+                 <div class="article_item">
+					<!-- van-ellipsis vant内置的样式 当文本内容长度超过容器最大宽度时，自动省略多余的文本 -->
+                   <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
+                   <div class="img_box">
+                     <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
+                     <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
+                     <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
+                   </div>
+                   <div class="info_box">
+                     <span>你像一阵风</span>
+                     <span>8评论</span>
+                     <span>10分钟前</span>
+                     <span class="close">
+                       <van-icon name="cross"></van-icon>
+                     </span>
+                   </div>
+                 </div>
+                 <!-- 页面结构-一张图 -->
+                 <div class="article_item">
+                   <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
+                   <div class="img_box">
+                     <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
+                   </div>
+                   <div class="info_box">
+                     <span>你像一阵风</span>
+                     <span>8评论</span>
+                     <span>10分钟前</span>
+                     <span class="close">
+                       <van-icon name="cross"></van-icon>
+                     </span>
+                   </div>
+                 </div>
+               </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav"></van-icon>
    </span>
  </div>
</template>
<script>
```

> style css样式

```less
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
      width: 100%;
      height: 360px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 24px;
    span {
      padding-right: 20px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 4px;
        line-height: 30px;
        height: 24px;
        width: 32px;
        text-align: center;
        padding-right: 0;
        font-size: 16px;
        position: absolute;
        right: 0;
        top: 14px;
      }
    }
  }
}
```

总结：

1. 数据项分为单张图片和三张图片的效果（由数据决定显示成什么效果）。
2. van-ellipsis 类由Vant提供，用于实现文本超出后显示省略号。
3. van-cell插槽的用法要注意（具名插槽）

## 获取频道数据 动态渲染文章列表(测试数据) `main.vue`

步骤分为: 获取频道数据 ----->  获取频道对应文章(通过时间轴获取)

### 获取用户的频道数据 `api文件夹 下 channel.js`

* 目标：调用接口获取频道数据 `src/api/channel.js`

> 封装调用频道接口业务模块

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

> 调用频道接口业务模块 `main文件夹下的 main.Vue文件`

```js
import { getMyChannels } from '@/api/channel.js'
methods: {
   // 获取频道列表
   async getMyChannels () {
       const ret = await getMyChannels()
       this.channels = ret.data.channels
   }
},
created () {
     // ! 生命周期 登录获取相应用户数据
   this.getMyChannels()
}
```

> 列表数据 储存数据

```js
// 储存频道需要的数据
data () {
    return {
channels: []
    }
}
```

> 渲染组件 template模板

```vue
<van-tab :key="item.id" v-for="item in channels" :title="item.name">
```

> 总结：调用频道接口获取用户相关的频道数据并且进行动态渲染。

## 通过时间戳 实现频道数据分页 `main.vue`

![image-20210607193133308](https://i.loli.net/2021/06/07/pWP5QXa3rt76BmT.png)

### 分页频道对应文章数据结构分析

> 目标：熟悉文章和频道数据结构

* 分析：文章列表与频道关系
  * 频道数据 需要 设置 关联切换文章列表的数据

![image-20210607162140226](https://i.loli.net/2021/06/07/OieBo3R2HdqT84W.png)

![image-20210607193916685](https://i.loli.net/2021/06/07/VF2ib1Eefr7AogP.png)

通过三个参数 来实现分页切换:

```js
      // 分页参数 (时间戳)
      timestamp: timestamp,
      // 频道id 
      channel_id: channelId,
      // 是否包含置顶数据
      with_top: 1
```

基于时间的分页策略

- 前提条件：数据是基于时间排好序的
- 首次查询，传递当前时间，作为分页参数，后端从这个时间点向后查询固定量的数据，并且获取下一条数据的时间，作为新的时间戳，和数据一块返回给前端
- 前端获取首页数据后进行渲染，并且用返回的时间戳覆盖当前时间戳
- 第二次查询时，把上次返回的时间戳作为分页参数，查询下一页数据，
- 后端采用相似的规则返回数据和新的时间戳
- 前端同样发送新的时间戳查询分页数据即可，以此类推

### 给频道数据 添加 关联文章列表数据

> 目标: 给频道数据添加获取文章列表数据添加关联性（包括文章加载的状态相关标志位，以及分页相关参数）
>
> 需求: 利用`map`方法 给频道数据添加新的属性名 关联文章列表 实现切换功能

* 关联的属性名: id  name loading  isLoading  finished pullText timestamp articles
  * 利用`map`方法 给所有的频道数据 添加 新的属性名 来关键 文章列表 

```js
 methods: {
    // ! 获取用户的频道数据
    async getAllChannels () {
      // ! 调用获取用户频道数据的专用组件
      const ret = await getAllChannels()
      // ! 保存服务器返回的数据
      // ! 利用map方法 给频道数据添加新的属性名 关联文章列表
      this.channels = ret.data.channels.map(item => {
        //! 作为切换的根据 自定义属性名
        return {
          // 频道的id
          id: item.id,
          // 频道的标签名称
          name: item.name,
          // 文章列表加载状态
          loading: false,
          // 下拉刷新的完成状态
          isLoading: false,
          // 上拉列表加载完成的标志
          finished: false,
          // 下拉刷新完成的提示信息
          pullText: '加载成功',
          // 时间戳，用于实现列表的分页查询
          timestamp: +new Date(), //! 把时间设置为毫秒数 +
          // 文章列表
          articles: []
        }
      })
    }
```

## 频道关联 文章列表 上滑获取数据 下滑刷新数据

> 创建一个 api 单独配置 频道切换文章 的接口 `api文件夹 里面 article.js`

* 实现频道切换文章需要的比对数值 设置参数 (左边服务器规定)
  * 分页参数(时间轴): timestamp: timestamp,
  * 频道id : channel_id: channelId,

```js
// 文章模块
// 导入axios 统一获取方法
import requset from '../utils/request'

// 通过频道关联 实现 比对文章切换属性值 实现切换
// 命名导出 设置分页参数(时间戳) 频道单独id参数
export const getArticles = (channelId, timestamp) => {
  return requset({
    method: 'get',
    url: 'v1_1/articles',
    params: {
      // 分页参数
      timestamp: timestamp,
      // 频道id
      channel_id: channelId,
      // 是否包含置顶数据
      with_top: 1
    }
  })
}

```

 >实现 频道关联 动态切换文章列表 `main.vue`

* 第一步 先获取 频道数据
  * 需要单独设置api组件 
* 第二步 频道数据添加关联文章列表根据的属性名(利用 `map`方法实现添加)
* 第三步 添加文章列表关联属性名后 和服务器比对 获取相应的数据 (基于接口的实现)
  * 需要单独设置api组件 
  * <big> 注意:</big> axios获取数据是异步操作 必须要让数据变成同步 实现串联(一环套一环)
* 第四步 声明 下滑更新 上滑获取数据 (重新调用接口获取最新数据)
  * 当前时间戳 比对 服务器时间戳 更新 获取最新数据

>template 模板

```vue
<template>
  <div class="main">
    <!-- v-model="active"是控制默认选择 在data(){}里面控制 -->
    <van-tabs v-model="active" swipeable>
      <!-- 把用户频道数据 渲染到页面上 -->
      <van-tab :key="item.id" v-for="item in channels" :title="item.name">
        <div class="scroll-wrapper">
          <!-- 添加 上拉菜单刷新 -->
          <!--isLoading 是控制上拉的状态为 布尔控制 -->
          <!-- @refresh是声明上拉刷新数据方法 -->
          <van-pull-refresh v-model="activeChannel.isLoading" @refresh="onRefresh" :success-text="activeChannel.pullText">
            <!-- 添加 滑动下拉的数据 -->
            <!-- :finished 是列表加载完成的标志 布尔控制 loading 是下拉状态为 布尔控制  -->
            <!-- @load是声明下拉获取数据方法-->
            <van-list v-model="activeChannel.loading" :finished="activeChannel.finished" finished-text="没有更多了" @load="onLoad">
              <!-- 把数据渲染到页面上的框架 -->
              <van-cell v-for="item in activeChannel.articles" :key="item.art_id">
                <!-- 把数据渲染到页面上内容 -->
                <div class="article_item">
                  <h3 class="van-ellipsis">{{item.title}}</h3>
                  <div class="img_box">
                    <!-- 进行判断 如果 数据图片为3张时候 把类名设置为 w33 如果为1张时候 把类名设置为w100 -->
                    <!-- 循环遍历 v-for 获取储存的数组中的数据 -->
                    <van-image lazy-load :class='[{w33: item.cover.type === 3}, {w100: item.cover.type === 1}]' :key='index' v-for='(img, index) in item.cover.images' fit="cover" :src="img" />
                  </div>
                  <div class="info_box">
                    <!-- 通过Vue 方法 循环遍历打印到页面上 -->
                    <span>{{item.aut_name}}</span>
                    <span>{{item.comm_count}} 评论</span>
                    <span>{{item.pubdate|formatTime}}</span>
                    <span class="close">
                      <!-- ?设置点击显示弹窗事件 点击后设置为true -->
                      <van-icon name="cross"></van-icon>
                    </span>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav"></van-icon>
    </span>
  </div>
</template>
```

> script 脚本方法

![image-20210609180732538](https://i.loli.net/2021/06/09/RnFg5Zrvm4Owfti.png)

```vue
<script>
// ? 导入弹窗的组件
import MoreAction from '../../components/MoreAction'
// ! 1. 导入不同用户的频道数据
import { getAllChannels } from '../../api/channel'
// ! 2. 导入 频道切换文章列表的 api
import { getArticles } from '../../api/article'
export default {
  components: {
    MoreAction
  },
  data () {
    return {
      // 控制Tab当前选中的条目
      active: 0,
      // 列表数据加载过程的状态位(加载的过程 会自动修改为true 但是渲染完毕后 需要手动修改false)
      loading: false,
      // 列表加载完成的标志(加载的结束 设置指定数值 加载到一定数目结束加载 需要手动修改true)
      finished: false,
      // 列表数组
      list: [],
      // 下拉刷新状态位
      isLoading: false,
      // 设置刷新提示
      pullText: '刷新成功',
      // ~ 设置函数节流
      throttle: false,
      // ! 3. 设置一个保存频道数据的数组
      channels: []
    }
  },
  computed: {
    //! 9. 当前激活的频道（data中添加active索引数据）
    activeChannel () {
      //! 10. 选中哪个channels频道 获取 其匹配的 active的条目
      return this.channels[this.active] //! 获取的是对象格式
    }
  },
  // ! 11. 生命周期 页面加载时候 添加并获取数据(需要设置)
  async created () {
    // ~ 接口调用是异步的
    // ~ 先要获取频道数据 并且添加频道关联文章列表属性名 再调用频道关联 动态切换文章列表方法
    await this.getAllChannels() //! 获取用户的频道数据并且添加切换根据属性名
  },
  methods: {
    // ! 4. 获取用户的频道数据并且添加切换文章列表根据的属性名 ----------------------
    async getAllChannels () {
      // ! 5. 调用获取用户频道数据的专用组件
      const ret = await getAllChannels()
      // ! 6. 保存服务器返回的数据
      // ! 7. 利用map方法 给频道数据添加新的属性名 关联文章列表
      this.channels = ret.data.channels.map(item => {
        //! 8. 作为频道切换的根据 自定义属性名  匹配 列表文章切换属性
        return {
          // ! 频道的id
          id: item.id,
          // ! 频道的标签名称
          name: item.name,
          // ! 文章列表加载状态
          loading: false,
          // ! 下拉刷新的完成状态
          isLoading: false,
          // ! 上拉列表加载完成的标志
          finished: false,
          // ! 下拉刷新完成的提示信息
          pullText: '加载成功',
          // ! 时间戳，用于实现列表的分页查询
          timestamp: +new Date(), //! 把时间设置为毫秒数 +
          // ! 获取文章列表储存
          articles: []
        }
      })
    },
    //! 12. 每次触发动态加载一页新的数据（下滑到底部时触发）------------------------
    //! 频道列表关联文章列表切换  并实现下滑获取文章列表
    async onLoad () { //! 14. 需要设置 同步执行处理异步 使用 async await
      //! 13. 获取当前频道信息(map方法已经添加 相关频道信息 实现文章列表关联)
      const channel = this.activeChannel
      //! 14. 与文章列表数据进行比对 实现频道关联 动态切换文章列表 并且获取相应数据
      const ret = await getArticles(channel.id, channel.timestamp)
      //! 15. 把加载的单页数据添加到文章列表的数组中
      channel.articles.push(...ret.data.results)
      //! 16. 通知Vant-list 组件本次数据加载成功(Vant加载数据自动为 true 加载完毕后 手动设置false)
      channel.loading = false
      //! 17. 判断 是否获取完毕数据(通过时间戳 如果 后端不返回时间戳 说明已经获取完毕)
      if (ret.data.pre_timestamp) {
        //! 18. 如果后端返回有时间戳 说明还有数据 继续和后端交互时间戳 实现数据获取
        channel.timestamp = ret.data.pre_timestamp
      } else {
        //! 19. 如果不返回时间戳 说明没有数据 把Vant方法 结束加载 设置为 true 表示加载完成
        channel.finished = true
      }
    },

    //! 20. 更新数据 比对当前时间戳 获取更新后的数据 (实现 上滑 更新数据) ---------------------
    async onRefresh () { //! 需要设置 同步执行处理异步 使用 async await
      //! 21. 获取当前频道信息(map方法已经添加 相关频道信息 实现文章列表关联)
      const channel = this.activeChannel
      //! 22. 重置时间戳(获取当前时间戳 比对服务器的时间戳 实现更新)
      channel.timestamp = +new Date()
      //! 23.  与文章列表数据进行比对 实现频道关联 动态切换文章列表 并且获取刷新后相应数据
      const ret = await getArticles(channel.id, channel.timestamp)
      //! 需要把加载最新数据 覆盖当前文章列表 并且获取服务器最新的时间戳 如果没数据 啥也不做
      //! 24. 进行判断 查看服务器是否有更新数据
      if (ret.data.results.length > 0) {
        //! 25. 如果服务器有新的数据 那就覆盖当前储存数据的数组 实现更新
        channel.articles = ret.data.results
        //! 26. 如果服务器返回了时间戳 则替换当前数组的时间戳
        if (ret.data.pre_timestamp) {
          //! 把数组的时间戳 替换为服务器返回的新时间戳
          channel.timestamp = ret.data.pre_timestamp
        }
      } else {
        //! 27. 如果服务器没有更新数据 那么提示用户 没有数据更新 什么也不做
        channel.pullText = '没有数据更新'
      }
      //! 28. 数据刷新完毕后 设置加载结束为 false 如果为true 则无法获取下滑刷新的数据
      channel.isLoading = false
      //! 29. 数据更新后 通知Vant-list 组件本次数据加载成功(Vant加载数据自动为 true 加载完毕后 手动设置false)
      channel.finished = false
    },
    }
    }
</script>
```

总结：

1. 图片的单张和多张的处理
2. 根据单张和多张分别绑定不同的类名(class绑定的值，对象和数组可以结合使用）
3. 有的第三方图片不允许访问（防盗链），解决方案，在页面中添加如下代码

```html
<meta name="referrer" content="never">
```

> 防盗链：本质就是不告诉服务器，访问的来源是哪里 (添加在`index.html` 显示页中)

## 时间过滤器插件 `main.vue`

[dayjs的相对时间官网](https://dayjs.fenxianglu.cn/category/plugin.html#%E7%9B%B8%E5%AF%B9%E6%97%B6%E9%97%B4)

[Vue插件介绍官网](https://v3.cn.vuejs.org/guide/plugins.html#%E6%8F%92%E4%BB%B6)

> 目标：自定义过滤器格式化时间 (相对时间)
>
> 安装: npm install dayjs --save

通过 dayjs提供的包 制作时间过滤器插件

- `Vue.use()`实例化 创建一个过滤器插件 
- 用到 `Vue.use()` 都是Vue的插件
- 本质上是一个对象 对象中需要有一个方法 `install` 

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



## 图片懒加载 `main.vue`

[Vant提供的懒加载 ](https://vant-contrib.gitee.io/vant/#/zh-CN/image)

> 目标：实现图片懒加载效果（目的是提高性能）
>
> 预期效果：当屏幕中出现图片时，再去发送请求获取图片内容；尚未看到的图片暂时不发请求。
>
> 优势: 采用这种机制页面的加载效率比较高

Vant 提供懒加载插件 如果在Vant模板 `<van-image></van-image>` 使用的图片 引入后 直接在结尾添加 `lazy-load`

<van-image lazy-load></van-image>

- vant内置插件导入，实现图片懒加载。`入口文件 main.js`

```js
// 导入Vant 和 图片懒加载
import Vant, { Lazyload } from 'vant'
```

```js
// 配置懒加载插件
Vue.use(Lazyload)
```

```html
<!-- 启用懒加载!  main.vue -->
<van-image lazy-load></van-image>
```







