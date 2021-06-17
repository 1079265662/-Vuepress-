---
title: 8. Vue移动端 文章页面内容和功能
date: 2021-06-12
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目

---

::: tip 介绍

Vue移动端 文章内容 点赞 关注 评论 等功能<br>
:::

<!-- more -->

## 配置文章详情路由 `index.js`

[Cell 单元格 Vant插件](https://vant-contrib.gitee.io/vant/#/zh-CN/cell)

> 目标：配置文章详情组件路由

- 配置文章内容的编程式导航(动态导航)的路由 `router文件夹 里面 index.js`

```js
import detail from '../views/detail/detail'
  {
    path: '/detail',
    component: detail
  }
```

-  设置文章点击后 编程式导航 携带文章id值 跳转到文章页面 `search文件夹 里面 sresult.vue`

```vue
<!-- 把服务器获取的数据 渲染到页面上 id需要 toString()一下 因为用了 json-bigint解决了id太长js不识别问题 -->
<!-- @click点击事件 设置点击搜索到的文章进行动态路由携带文章i 值跳转到文章内容页面 让id强制转换成字符串.toString() -->
	<van-cell @click='$router.push("/detail?id="+item.art_id.toString())' v-for="item in list" :key='item.art_id.toString()'>
```

> 总结：
>
> 1. 基于问号方式传递路由参数
> 2. vant-cell组件支持路由跳转

## 获取文章详情数据 `detail.vue`

> 目标：在新的文章内容页面(新组件) 显示相应的文章数据 `components文件夹 里面 ArticleComment.vue`
>
> 效果: 点击进入文章后 显示相应的文章数据
>
> 原理: 通过 编程式导航(动态路由) 携带的文章id值 上传到服务器 获取服务器返回的详细文章数据

![image-20210615205914591](https://tva2.sinaimg.cn/large/005INI3Xly8grjdmxwbuzj30860ejwgi.jpg)

### 封装接口调用方法 `api文件夹 里面 search.js`

* 创建一个获取文章数据的api接口

```js
// ? 获取文章的详情数据
// ? 设置形参 接收文章的id值
export const getDetailById = (articleId) => {
  return request({
    method: 'get',
    // ? 地址拼接文章的id值 获取服务器返回的文章数据
    url: 'v1_0/articles/' + articleId
  })
}
```

### 文章页面 获取对应的文章数据和功能 `detail.vue`

* `template` 模板
  * 文章内容数据获取
  * 设置关注功能 利用三元表达式
  * 设置点赞功能 不喜欢功能 
    * 点赞 不喜欢功能 都是一个方法 一个api接口 通过`@click`事件携带不同参数 判断哪个按钮点击
    * 点赞 不喜欢功能状态位 1是点赞 0是不喜欢 -1是没操作

```vue
<template>
  <div class='container' ref="container">
    <!-- $router.back()是返回之前的路由 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail" v-if="article">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <!-- 动态获取文章作者的头像 -->
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate|formatTime}}</p>
        </div>
        <van-button @click='toggleFocus' round size="small" type="info">
          <!-- 点赞功能 三元表达 来判断 是否已经关注 -->
          {{article.is_followed?'已关注':'+ 关注'}}
        </van-button>
      </div>
      <!-- 文章内容 -->
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <!-- 点赞功能 点赞有三个状态位 1是点赞 0是不喜欢 -1是没操作(不用写) -->
        <!-- :class动态添加类名 如果状态位是1的时候 显示点赞的样式 -->
        <!-- @click 设置点击事件 用来判断点击的是哪个按钮(并不是传递参数 判断是否点赞参数是服务器返回的值) -->
        <van-button @click="toggleStatus(0)" round size="small" :class="{active:article.attitude===1}" plain icon="like-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- :class动态添加类名 如果状态位是0的时候 显示不喜欢的样式 -->
        <!-- @click 设置点击事件 用来判断点击的是哪个按钮 -->
        <van-button @click="toggleStatus(1)" round size="small" :class="{active:article.attitude===0}" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
  </div>
</template>
```

* `style` 样式

```less
<style scoped lang='less'>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 92px 20px 88px;
  // height: 1000%;
  .title {
    font-size: 36px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 20px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 20px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 20px;
      line-height: 1.5;
      .name {
        font-size: 28px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 24px;
        color: #999;
      }
    }
  }
  .content {
    padding: 40px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
    /deep/ pre {
      white-space: pre-wrap;
    }
  }
}
</style>

```

* `script` 脚本 导入获取文章api接口

```js
//! 导入api接口组件
import { getDetailById, unFollowArticle, followArticle, likes, unlikes, undislikes, dislikes } from '../../api/search'
```

* `script` 脚本 `data()`存储数据

```js
  data () {
    return {
      // ~ 接收服务器返回的数据(设置为空对象null) 服务器返回多个数据通常需要用对象储存
      article: null
    }
  }
```

- `script` 脚本  ` methods` 函数方法

```js
   // ? 获取文章详情数据
    async getDetailById () {
      // ? 通过编程式导航(动态路由) 传来的数据 和服务器进行比对 获取相应的文章数据
      const ret = await getDetailById(this.$route.query.id)
      // ? 把获取的数据储存到页面上
      this.article = ret.data
    },
```

## 文章关注与取消关注 `detail.vue`

> 目标：实现点击关注作者 或者 点击取消关注作者
>
> 效果:  点击后关注 如果已关注 点击后取消关注
>
> 原理: 获取服务器返回的关注状态 再利用三元表达式 设置关注按钮

![image-20210615222641041](https://tva2.sinaimg.cn/large/005INI3Xly8grjbjypxnij30940f975s.jpg)

### 封装关注与取消关注api接口`search.js`

* 两个接口 一个关注接口 一个取消关注接口

```js
// ? 关注文章的接口
export const followArticle = (userId) => {
  return request({
    method: 'post',
    url: 'v1_0/user/followings',
    // ? post方法 需要携带 data比对数据
    data: {
      target: userId
    }
  })
}

// ? 取消关注文章的接口
export const unFollowArticle = (userId) => {
  return request({
    method: 'delete',
    // ? 拼接id
    url: 'v1_0/user/followings/' + userId
  })
}

```

### 文章内容页面 实现关注功能 `detail.vue`

* `script` 脚本 导入关注api接口

```js
//! 导入api接口组件
import { getDetailById, unFollowArticle, followArticle, likes, unlikes, undislikes, dislikes } from '../../api/search'
```

* `script` 脚本  ` methods` 函数方法
  * 判断用户的状态位 如果关注了 再次点击 进行取消关注方法
  * 如果没关注 再次点击 进行关注方法

```js
  // ~ 关注或者取消关注文章的操作
    async toggleFocus () {
      // ~ 判断用户是否关注了内容
      if (this.article.is_followed) {
        // ~ 如果用户关注了该用户 此时点击后让关注按钮(is_followed)变为false 取消其关注
        try {
          // ~ 获取服务器 返回关注的状态位
          await unFollowArticle(this.article.aut_id)
          // ~ 设置下次点击后 让其取消关注(已经关注的操作)
          // ~ 关注的状态位 已经储存到了data()里的对象中
          this.article.is_followed = !this.article.is_followed // 也可以固定为false
        } catch (error) {
          // ~ 未知原因没有成功取消关注 提示用户(Vant轻提示组件)
          this.$toast('取消关注失败')
        }
      } else {
        // ~ 如果用户没有关注 此时点击后让关注按钮(is_followed)变为true 进行关注
        try {
          // ~ 获取服务器 返回关注的状态位
          await followArticle(this.article.aut_id)
          // ~ 设置下次点击后 让其关注(没有关注的操作)
          // ~ 关注的状态位 已经储存到了data()里的对象中
          this.article.is_followed = !this.article.is_followed // 也可以固定为true
        } catch (error) {
          // ~ 未知原因没有成功关注 提示用户(Vant轻提示组件)
          this.$toast('关注失败')
        }
      }
    }
```



> 总结：
>
> 1. 调用接口实现功能
> 2. async函数的异常处理必须有await，否则catch无法执行，因为Promise会使用catch方法处理异常。

## 文章点赞与不喜欢 `detail.vue`

> 目标：实现文章点赞与不喜欢功能
>
> 效果:  点赞 和 不喜欢功能 点击后 让其显示样式 两个按钮属于互斥按钮 
>
> 原理:  和关注功能大致一样 只不过两个按钮是互斥按钮 并且两个点击事件使用相同点击方法 需要区分两个按钮

![image-20210615221845811](https://tva1.sinaimg.cn/large/005INI3Xly8grjdpxjnl3j30aa0i4q3t.jpg)

### 封装点赞 和 不喜欢的 api接口`search.js`

```js
//! 点赞接口
export const likes = (articleId) => {
  return request({
    method: 'post',
    url: 'v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

//! 取消点赞接口
export const unlikes = (articleId) => {
  return request({
    method: 'delete',
    url: 'v1_0/article/likings/' + articleId
  })
}

//! 添加【不喜欢】接口
export const dislikes = (articleId) => {
  return request({
    method: 'post',
    url: 'v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}

//! 取消【不喜欢】接口
export const undislikes = (articleId) => {
  return request({
    method: 'delete',
    url: 'v1_0/article/dislikes/' + articleId
  })
}

```

### 实现点赞 不喜欢功能 `detail.vue`

* `template` 模板(主模板已经设置)
  * 因为是相同的点击事件 需要设置参数 判断是哪个按钮点击
  * 点赞功能 不喜欢有三个状态位 是共用的 1是点赞 0是不喜欢 -1是没操作(不用写)
  * 需要设置互斥功能
    * 使用相同的状态位即可 如果状态位是 1 设置给点赞样式 如果是0 设置给不喜欢样式

```vue
      <div class="zan">
        <!-- 点赞功能 不喜欢有三个状态位 是共用的 1是点赞 0是不喜欢 -1是没操作(不用写) -->
        <!-- @click 设置点击事件 用来判断点击的是哪个按钮(并不是传递参数 判断是否点赞参数是服务器返回的值) -->
        <!-- 点赞 不喜欢是互斥功能 当点击喜欢时候 :class 动态类名绑定给 点赞功能 让其点亮 -->
        <van-button @click="toggleStatus(0)" round size="small" :class="{active:article.attitude===1}" plain icon="like-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- :class动态添加类名 如果状态位是0的时候 显示不喜欢的样式 -->
        <!-- @click 设置点击事件 用来判断点击的是哪个按钮 -->
        <!-- 点赞 不喜欢是互斥功能 当点击不喜欢的时候 :class 动态类名绑定给 不喜欢功能 让其点亮 -->
        <van-button @click="toggleStatus(1)" round size="small" :class="{active:article.attitude===0}" plain icon="delete">不喜欢</van-button>
      </div>
```

* `script` 脚本  ` methods` 函数方法
  * 因为是相同的点击事件 需要判断携带的参数 来区分按钮

```js
  //! 实现点赞效果(4种操作：点赞和取消点赞，不喜欢和取消不喜欢)
    //! 需要判断 是哪个按钮触发 接收template模板传来的点击参数 来分辨是哪个按钮
    async toggleStatus (type) {
      //! 0 是点赞按钮(template模板设置) -------------------
      if (type === 0) {
        //! 点击了点赞按钮：点赞/取消点赞
        if (this.article.attitude === 1) { //! 状态为是1的话 说明已经点赞了 再次点击按钮取消赞的状态位
          try {
            //! 把取消点赞的状态位 上传到服务器上
            await unlikes(this.article.art_id.toString())
            //! 在页面上取消点赞状态位
            this.article.attitude = -1 //! -1是不点赞的状态位
          } catch (error) {
            //! 如果不成功设置提醒 提示用户(Vant轻提示组件)
            this.$toast('取消点赞失败')
          }
        } else { //! 否则 不等于1就是说明没点赞 再次点击按钮设置点赞状态位
          try {
            //! 把点赞的状态位 上传到服务器上
            await likes(this.article.art_id.toString())
            //! 在页面上设置点赞状态位
            this.article.attitude = 1 //! 1是点赞的状态位
          } catch (error) {
            //! 如果不成功设置提醒
            this.$toast('点赞失败')
          }
        }
      }
      //! 1 是不喜欢按钮(template模板设置) -----------------
      if (type === 1) {
        //! 点击了不喜欢按钮：不喜欢/取消不喜欢
        if (this.article.attitude === 0) { //! 状态位是0的话 说明已经不喜欢了 再次点击按钮取取消不喜欢状态位
          try {
            //! 把取消不喜欢的状态位 上传到服务器上
            await undislikes(this.article.art_id.toString())
            //! 在页面上取消不喜欢的状态位
            this.article.attitude = -1 //! -1取消不喜欢额状态位
          } catch (error) {
            //! 如果不成功设置提醒
            this.$toast('取消不喜欢失败')
          }
        } else { //! 否则 不等于0就是说明 没有设置不喜欢 再次点击按钮设置不喜欢状态位
          try {
            //! 把不喜欢的状态位 上传到服务器上
            await dislikes(this.article.art_id.toString())
            //! 在页面上设置不喜欢状态位
            this.article.attitude = 0
          } catch (error) {
            //! 如果不成功设置提醒
            this.$toast('取消不喜欢失败')
          }
        }
      }
    }
```

> 总结：
>
> 1. 逻辑分支比较多，先宏观再微观（先做大的分支处理，再做细节）

## 文章评论模块 `ArticleComment.vue`

[Vant list 组件实现](https://vant-contrib.gitee.io/vant/#/zh-CN/list)

>目标：实现评论列表数据动态渲染
>
>效果:  上滑评论区 获取服务器评论数据 并且自己也可以输入评论 上传到服务器 打印在评论区中
>
>原理:  根据文章的id 获取服务器评论数据 打印到页面上 上滑根据评论数据id 实现评论分页 

![image-20210615221845811](https://tva3.sinaimg.cn/large/005INI3Xly8grjchgwoymj30880emgmx.jpg)

### 评论区单独组件设置 `ArticleComment.vue`

- `template` 模板

```vue
<template>
  <div class="comment">
    <!-- 评论列表 -->
    <!-- 设置Vant组件list 提供的 @load上滑获取列表方法(分页) 实现评论加载 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="item van-hairline--bottom van-hairline--top" v-for="comment in list" :key="comment.com_id.toString()">
        <!-- 动态获取评论用户的头像 -->
        <van-image round width="1rem" height="1rem" fit="fill" :src="comment.aut_photo" />
        <div class="info">
          <p>
            <span class="name">{{comment.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{comment.like_count}}</span>
            </span>
          </p>
          <p>{{comment.content}}</p>
          <p>
            <span class="time">{{comment.pubdate|formatTime}}</span>&nbsp;
            <van-tag plain @click="showReply=true">{{comment.reply_count}}</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <!-- 底部输入框 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <span class="submit" slot="button" @click="sendComment">提交</span>
      </van-field>
    </div>
  </div>
</template>
```

- `style` 样式

```less
<style scoped lang='less'>
.comment {
  margin-top: 20px;
  /deep/ .item {
    display: flex;
    padding: 20px 0;
    .info {
      flex: 1;
      padding-left: 20px;
      .name {
        color: #069;
      }
      .zan {
        vertical-align: middle;
        padding-right: 4px;
      }
      .count {
        vertical-align: middle;
        font-size: 20px;
        color: #666;
      }
      .time {
        color: #666;
      }
      p {
        padding: 10px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 24px;
    color: #3296fa;
  }
}
</style>

```

- `script` 脚本 `data()`存储数据

```js
  data () {
    return {
      // 评论的内容 v-model双向绑定页面评论输入
      value: '',
      // 评论列表加载状态位  Vant插件的list功能
      // 单次加载的状态位
      loading: false,
      // 加载完成的状态位
      finished: false,
      // 分页参数(评论数据的id)设置为null是从第一条评论开始获取(不传值默认第一条)
      offset: null,
      // 储存服务器返回的评论数据
      list: []
    }
  }
```

> 总结：评论列表和评论表单基本布局。
>
> 1. 局部组件的基本使用：再配置，再导入,最后使用

### 封装获取评论区数据的api接口  `search.js`

- 封装评论区数据的接口 和 上传评论的接口

```js
// 获取文章的评论
export const getComments = (articleId, offset) => { // 两个参数 评论文章的id/回复文章id 和 分页的参数(评论条的id)
  return request({
    method: 'get',
    url: 'v1_0/comments',
    params: {
      // a表示文章的评论;c表示回复评论的数据
      type: 'a',
      // 评论的文章的id或者，回复的评论的id
      source: articleId,
      // 分页参数(评论数据的id)设置为null是从第一条评论开始获取(不传值默认第一条)
      offset: offset,
      // 每页的条数
      limit: 10
    }
  })
}
// 上传评论接口
export const comment = (options) => {
  return request({
    method: 'post',
    url: 'v1_0/comments',
    data: {
      // 文章的id
      target: options.target,
      // 评论内容
      content: options.content,
      // 如果参数target是文章id，那么这个参数不需要
      // 如果参数target是评论id，那么这个参数表示文章id(回复评论时候用到)
      art_id: options.articleId
    }
  })
}

```

> 总结：熟悉基于offset的分页策略：根据文章评论的id进行排序和分页，类似于基于时间戳的分页方式。

### 文章内容界面 导入评论区组件 `detail.vue`

* `script`脚本

```js
// 导入评论组件
import ArticleComment from '../../components/ArticleComment.vue'
components: {
    // 导入评论组件
    ArticleComment
  }
```

* `template`模板
  * 把文章id 创给评论区(子组件) 让其携带文章id 获取相应的评论数据

```vue
<!-- 设置评论的组件 给子组件传此文章的id值 -->
    <!-- 需要进行判断 因为article初始值为null 当获取到服务器返回的数据时候 才会有内容 所以需要判断 如果为空(false)不显示此功能-->
    <ArticleComment v-if="article" :articleId="article.art_id.toString()"></ArticleComment>
```

### 实现 评论区数据的获取渲染`ArticleComment.vue`

[Vant list 组件实现](https://vant-contrib.gitee.io/vant/#/zh-CN/list)

通过id分页方式 获取评论数据

- `script`脚本 

```js
// 导入获取评论的api接口
import { getComments, comment } from '../api/search'
```

- `script`脚本 `props:` 接收父组件传来的数据

```js
  props: {
    // 获取父组件传来的文章id值 用于获取用户评论
    articleId: {
      type: String
    }
  }
```

* `script` 脚本  ` methods` 函数方法
  * 基于数据id排序: 每加载一组数据(后端规定 10条一般) 服务器都会返回一个 id值 储存id值 上传到服务器 服务器根据id值 返回新的分页数据 如果id不返回 说明没有数据 分页结束

```js
  // 设置获取评论数据的方法
    async onLoad () {
      // 参数1 根据改文章的id 父组件传入的数值
      // 参数2 分页参数(评论数据的id) 第一条获取默认设置null
      const ret = await getComments(this.articleId, this.offset)
      // 把回去的评论输入 全部添加到页面数据中储存
      this.list.push(...ret.data.results)
      // 修改本次加载的状态位
      this.loading = false
      // 判断结束的条件(评论分页是根据评论数据id来加载分页的 如果不返回新的评论数据id 就说明已经没有评论了)
      // last_id是服务器返回的新评论id 需要把页面的分页参数(评论数据id)设置为 服务器返回的新评论数据id
      // 如果为空(false)说明没有数据了 设置分页加载完毕的状态位
      if (ret.data.last_id) { // 如果还有新数据(true) 继续加载评论分页
        // 把服务器返回的新评论id 设置给页面的分页参数(评论数据id)
        this.offset = ret.data.last_id
      } else {
        // 如果服务器不返回新的评论id 说明已经没有评论数据了 把加载完整状态位设置为true
        this.loading = true
      }
    }
```

> 总结：
>
> 1. 调用接口；获取数据；填充页面
> 2. 判断分页结束的条件（理解），类似于基于时间戳的分页策略

### 文章评论功能 `ArticleComment.vue`

> 目标：实现评论功能
>
> 效果: 用户输入数据 点击发送 上传到服务器 并且渲染到页面上

- `template`模板
  -  绑定事件(主模板已设置)

```vue
<span class="submit" @click="handleSubmit()" slot="button">提交</span>
```

- **`script`** **脚本**  **`methods`** 函数方法
  - 实现评论回复功能
  - 上传评论 需要两个参数
    - 文章的id 
    - 评论的内容

```js
    // ~ 设置发表评论的方法
    async sendComment () {
      // 发表评论
      try {
        // 调用发表评论的接口 上传评论数据
        await comment({
          // 发表评论 需要两个参数 文章的id 和 评论的内容
          target: this.articleId, // 文章的id 左侧是服务器规定的属性名
          content: this.value // 评论的内容 左侧是服务器规定的属性名
        })
        // 发表评论成功后 置空储存的之前评论
        this.list = []
        // 发表评论成功后 置空分页参数 重新获取评论数据
        this.offset = null
        // 调用获取评论数据的方法 重新获取评论数据
        this.onLoad()
        // 置空评论的输入框
        this.value = ''
      } catch (error) {
        // 如果评论失败 提示用户
        this.$toast('评论文章失败')
      }
    }
```

> 总结：
>
> 1. 调用接口，处理异常
> 2. try catch 处理async函数，await是必要的
