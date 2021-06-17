---
title: 9. Vue移动端 个人中心设置
date: 2021-06-13
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目


---

::: tip 介绍

Vue个人中心 获取个人信息 退出功能<br>
:::

<!-- more -->

## 组件基本布局 `my.vue`

[Vant 提供的 Layout 布局](https://vant-contrib.gitee.io/vant/#/zh-CN/col#jie-shao)

> 目标：实现个人中心组件基本布局
>
> 路径: my文件夹 中的 `my.vue`

![image-20210615232712541](https://tva4.sinaimg.cn/large/005INI3Xly8grjdav3n7gj308e0eijrz.jpg)

- `template` 模板

```vue
<template>
  <div>
    <div class="user-profile">
      <div v-if="info!=null" class="info">
        <van-image round :src="info.photo" />
        <h3 class="name">
          {{info.name}}
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <van-row>
        <van-col span="8">
          <p>0</p>
          <p>动态</p>
        </van-col>
        <van-col span="8">
          <p>0</p>
          <p>关注</p>
        </van-col>
        <van-col span="8">
          <p>0</p>
          <p>粉丝</p>
        </van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />阅读历史
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" to="/user/profile" is-link />
      <van-cell icon="chat-o" title="小智同学" to="/user/chat" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <!-- 绑定退出功能按钮 -->
      <van-cell @click="Exit" icon="warning-o" title="退出登录" is-link />
    </van-cell-group>
  </div>
</template>
```

- `style`样式

```less
<style lang="less" scoped>
.user {
  &-profile {
    width: 100%;
    height: 300px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 20px;
      align-items: center;
      .van-image {
        width: 128px;
        height: 128px;
      }
      .name {
        font-size: 32px;
        font-weight: normal;
        margin-left: 20px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p {
      margin: 0;
      text-align: center;
    }
  }
  &-group {
    margin-bottom: 30px;
  }
  &-links {
    padding: 30px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 48px;
      padding-bottom: 10px;
    }
  }
}
</style>

```

* 设置 个人用户页面 取消搜索功能 和 文字 `Home.vue`

```vue
<template>
  <div class="container">
    <!-- 顶部内容 -->
    <!-- v-if判断 如果路径是 '/home/my' 那么就让其设置为 个人信息 -->
    <van-nav-bar v-if="this.$route.fullPath === '/home/my'" v-show="show" title="个人信息" />
    <!-- v-else 否则就是搜索功能 -->
    <van-nav-bar v-else title="主页" right-text="搜索" @click-right='$router.push("/search")' />
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
<script>
export default {
  data () {
    return {
      active: 0,
      route: '',
      show: true
    }
  },
  methods: {
    head () {
      const route = '/home/my'
      this.route = route
      console.log(route)
    }
  },
  created () {
    this.head()
  }
}
</script>
<style lang="less" scoped>
// scoped的作用：让这些样式仅仅在当前组件生效，防止组件之间相同的类名冲突
// 本质上是如何做到这件事情的？添加唯一的自定义属性用于属性选择器
// 把页面宽高设置为可视窗口的大小
.container {
  width: 100%;
  height: 100%;
  position: relative;
  // 设置内容显示区域的 wrapper的大小
  .wrapper {
    position: absolute;
    width: 100%;
    bottom: 100px;
    top: 92px;
  }
}
</style>
```

> 总结：切图（工作量）

## 用户信息动态渲染 `my.vue`

> 目标：实现用户信息的动态渲染
>
> 效果:  显示用户的 名称 和 头像

### 封装 获取用户信息的api接口 ` my.js`

* 封装用户信息接口调用方法
  * `api文件夹 里面 my.js`

```js
// 个人中心数据api设置
// 导入配置的axios组件
import request from '../utils/request'
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: 'v1_0/user'
  })
}

```

### 获取用户个人信息 `my.vue`

* `script` 脚本设置 
  * 导入 用户个人信息的api接口

```js
// 传入获取用户个人信息的api接口
import { getUserInfo } from '../../api/my'
```

* `script` 脚本  ` methods` 函数方法

```js
    // 获取用户的个人信息
    async getUserInfo () {
      try {
        // 上传服务器 获取用户的个人信息 无需传参 服务器根据token值来获取其用户信息
        const ret = await getUserInfo()
        // 在页面储存个人信息
        this.info = ret.data
      } catch (error) {
        // 如果获取失败 提示用户(Vant插件提供)
        this.$toast('添加失败')
      }
    }
```

* `created ()`生命周期
  * 页面加载时候 让其获取用户数据

```js
 created () {
    // 页面加载时候加载用户个人数据
    this.getUserInfo()
  }

```

> 总结：调用接口；获取数据；填充页面

## 退出功能 `my.vue`

[Vant Dialog 弹出框插件](https://vant-contrib.gitee.io/vant/#/zh-CN/dialog)

> 目标：实现退出功能
>
> 效果:  通过 Vant Dialog组件 提示是否退出 点击取消关闭弹出层 确认删除其token 并且转到登录页 根据后端 是否要上传
>
> 原理: 基于Vant Dialog 弹出框 插件

![image-20210615232712541](https://tva3.sinaimg.cn/large/005INI3Xly8grjdu676ewj308v0eq755.jpg)

- `template`模板 (主模板已设置)
  - 事件绑定

```vue
   <!-- 绑定退出功能按钮 -->
      <van-cell @click="Exit" icon="warning-o" title="退出登录" is-link />
```

- `script` 脚本  ` methods` 函数方法
  - 确认退出功能实现
    - 根据后端根据 看情况是否上传退出事件
    - 基于Vant Dialog 弹出框 插件 设置弹出层

```js
// ~ 设置点击退出设置(Vant Dialog弹出框 提供插件)
    Exit () {
      // ~ $dialog是导入了全局Vant组件的Vue实例化对象(确认内容的弹窗)
      this.$dialog.confirm({
        title: '退出', // 标题内容的设置
        message: '真的要退出吗' // 弹窗内容的设置
      })
        // ~ 如果确认退出 删除token 并且跳转到登录页面(确定退出)
        .then(() => { // 确认退出进行内容
          // ~ 确认退出后 删除token值
          sessionStorage.removeItem('mytoken')
          // ~ 确认退出后 转到登录页面
          this.$router.push('/Login')
        })
        // ~ 不退出 不错操作(取消退出)
        .catch(() => { // 取消退出进行内容
          // on cancel
        })
    }
  }
```

> 总结：
>
> 1. 像删除、退出等类似操作一般都要确认
> 2. 基于token的退出，可能需要调用接口，也可能仅仅需要删除token即可。