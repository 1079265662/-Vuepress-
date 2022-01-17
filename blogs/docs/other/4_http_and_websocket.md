---
title: websocket 和 http 协议
date: 2021-06-20
cover: https://tva1.sinaimg.cn/large/005INI3Xly8grllscozb9j31400u0dlz.jpg
tags:
 - 协议
 - http
 - websocket
categories: JavaScript
---

::: tip 介绍
websocket 和 http 协议区别 和 websocket应用 <br>
:::

<!-- more -->

## websocket介绍

[WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 和 [socket.io-client](https://www.npmjs.com/package/socket.io-client) 实时通讯 介绍

> 目标：熟悉websocket通信规则

- http通信流程
  - 建立连接（三次握手）
  - 发送接收数据
  - 断开连接（四次挥手）
- websocket通信流程（双向的：客户端可以向服务器发送消息，服务器也可以主动向客户端发送消息）
  - 首次发送请求时，需要建立连接
  - 后续收发消息就不再需要建立连接
  - 长时间没有数据交互会自动断开连接（也可以手动断开连接）

![image-20210131195932810](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/R1HJjDQOvefNw8L.png)

![三次握手](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.png)

![四次挥手](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.png)

> 结论：websocket做双向通信更加高效（比如聊天功能，推送服务）

## websocket基本使用

> 目标：熟悉websocket基本用法
>
> 浏览器为 HTTP 通信提供了 XMLHttpRequest 对象，同样的，也为 WebSocket 通信提供了一个操作接口：WebSocket。(http https) === (ws wss)

- 基本通信流程
  - 拨号（建立连接）
  - 通话（双向通信）
  - 结束通话（关闭连接）

```js
// 创建连接（和服务器建立连接，回复你）
var ws = new WebSocket("wss://echo.websocket.org");

// 连接成功
ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  // 发送消息
  ws.send("Hello WebSockets!");
};

// 接受信息
ws.onmessage = function(evt) {
  // 服务回复消息
  console.log( "Received Message: " + evt.data);
  // 关闭连接
  ws.close();
};

// 连接已经关闭
ws.onclose = function(evt) {
  console.log("Connection closed.");
}; 
```

## 基于websocket Vue对话机器人

### 小智同学-基本布局 `xiaozhi.vue`

> 目标：实现个人中心组件基本布局
>
> 路径: xiaozhi文件夹 中的 `xiaozhi.vue`

![image-20210616181407468](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/hy9IetMduJ5KbRv.png)

- `template` 模板

```vue
<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list">
      <!-- <div class="chat-item left">
        <van-image fit="cover" round :src="xzAvatar" />
        <div class="chat-pao">ewqewq</div>
      </div>
      <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image fit="cover" round :src="photo" />
      </div> -->
      <div class="chat-item" :class='[{left: item.name==="xz"}, {right: item.name === name}]' v-for='(item,index) in list' :key='index'>
        <van-image fit="cover" v-if='item.name==="xz"' round :src="xzAvatar" />
        <div class="chat-pao">{{item.msg}}</div>
        <van-image fit="cover" v-if='item.name===name' round :src="photo" />
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="说点什么...">
        <span @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>
```

- `style` 样式

```less
<style scoped lang='less'>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 92px 0 100px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 20px;
      .van-image {
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 70%;
        min-height: 80px;
        line-height: 76px;
        border: 0.5px solid #c2d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before {
          content: '';
          width: 20px;
          height: 20px;
          position: absolute;
          top: 24px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 30px;
    &::before {
      right: -12px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 30px;
    margin-right: 0;
    &::before {
      left: -10px;
      transform: rotate(-135deg);
    }
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
}
</style>
```

- `script`脚本 `data()`数据

```js
  data () {
    return {
      // 小智头像
      xzAvatar: xz,
      // 登录用户的头像
      photo: 'https://img.yzcdn.cn/vant/cat.jpeg',
      // 登录的用户名称
      name: 'python',
      // 说的内容
      value: '',
      // 聊天记录
      list: [],
      // socket实例对象
      ws: null
    }
  }
```

总结：

1. 聊天组件路由配置
2. 实现基本的布局效果

### 小智同学聊天功能 `xiaozhi.vue`

[WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 和 [socket.io-client](https://www.npmjs.com/package/socket.io-client) 实时通讯 介绍

> 目标：实现小智同学聊天功能
>
> 效果:  实现小智同学的只能对话 
>
> 原理:  通过 插件`socket.io-client` 实时通信([WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket))实现的通信技术 调用接口 返回服务器的数据 实现聊天功能

下载 `socket.io-client`: npm i socket.io-client

### 设置小智同学的聊天布局  `xiaozhi.vue`

- `script` 脚本
  - 导入图片 和 到入socket.io-client 插件

```js
// 脚手架环境可以直接以模块化方式导入图片
import xz from '@/assets/logo.png'
// 导入socket.io-client 插件
import { io } from 'socket.io-client'
```

* `template` 模板(主模板已经设置)
  * 设置对话内容 头像 名称等

```vue
      <div class="chat-item" :class='[{left: item.name==="xz"}, {right: item.name === name}]' v-for='(item,index) in list' :key='index'>
        <van-image fit="cover" v-if='item.name==="xz"' round :src="xzAvatar" />
        <div class="chat-pao">{{item.msg}}</div>
        <van-image fit="cover" v-if='item.name===name' round :src="photo" />
      </div>
```

### 实现小智同学聊天功能  `xiaozhi.vue`

* `script` 脚本  ` methods` 函数方法

```js
methods: {
    // 初始化Socket链接
    initConnection () {
      // 初始化链接配置
      this.ws = io('ws://localhost:3000/') // 后端设置的 wb接口地址
      // 监听链接成功的动作
      this.ws.on('connect', () => {
        // 链接成功后，向服务器发送一条消息
        // 1、把消息添加到页面
        const info = {
          name: this.name,
          msg: '你好'
        }
        this.list.push(info)
        // 2、把消息发送给后端
        this.ws.emit('chat message', info) // chat message是固定写法
      })
      // 监听服务器返回的消息
      this.ws.on('chat message', (info) => {
        this.list.push({
          name: 'xz',
          msg: info.msg
        })
      })
    },
    // 向服务器发送消息
    send () {
      // 1、把消息内容添加到页面列表中
      const info = {
        name: this.name,
        msg: this.value
      }
      this.list.push(info)
      // 2、把消息发送给服务器
      this.ws.emit('chat message', info)
      // 清空表单
      this.value = ''
    }
  },
  created () {
    this.initConnection()
  },
  destroyed () {
    // 释放socket链接资源（告诉服务器断开连接）
    this.ws.close()
  }
}
```
