---
title: websocket 和 http 协议
date: 2021-06-20
cover: https://tva1.sinaimg.cn/large/005INI3Xly8grllscozb9j31400u0dlz.jpg
tags:
 - 协议
 - http
 - websocket
categories: TCP协议
---

::: tip 介绍
websocket 和 http 协议区别 和 websocket应用 <br>
:::

<!-- more -->

## websocket介绍

> 目标：熟悉websocket通信规则

- http通信流程
  - 建立连接（三次握手）
  - 发送接收数据
  - 断开连接（四次挥手）
- websocket通信流程（双向的：客户端可以向服务器发送消息，服务器也可以主动向客户端发送消息）
  - 首次发送请求时，需要建立连接
  - 后续收发消息就不再需要建立连接
  - 长时间没有数据交互会自动断开连接（也可以手动断开连接）

![image-20210131195932810](https://i.loli.net/2021/06/16/R1HJjDQOvefNw8L.png)

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

## websocket第三方包用法

> 目标：熟悉socket.io基本信息和用法
>
> 官方网站：https://socket.io/get-started/chat/
>
> 既支持服务器，也支持客户端

- 服务端代码（基于socket.io自己做）

```js
/*
  websocket服务端
  作用：1、接收客户端发送的请求；2、向客户端返回数据
*/
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// 监听跟路径
app.get('/', function(req, res){
  // 返回的结果是一个网页
  res.sendFile(__dirname + '/index.html');
});

// 监听客户端的链接
io.on('connection', function(socket){
  // 监听客户端端开链接事件
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  // 监听客户端发送消息的事件
  socket.on('chat message', function(msg){
    // 客户端发送的消息msg
    // emit方法的作用是向客户端返回消息
    // emit参数一表示客户端监听的接收消息的事件
    // emit参数二表示服务器返回给客户端的消息
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

- 客户端代码

```html
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <meta charset="utf-8" >                  
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <!-- 消息列表 -->
    <ul id="messages"></ul>

    <!-- 发送消息的表单 -->
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>

    <!-- SocketIO 提供了一个客户端实现：socket.io.js -->
    <script src="https://cdn.bootcdn.net/ajax/libs/socket.io/3.0.0-rc4/socket.io.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
    <script>
      // 建立连接，得到 socket 通信对象
      var socket = io('ws://localhost:3000/')

      socket.on('connect', () => {
        console.log('建立连接成功了')
      })

      $('form').submit(function(e){
        e.preventDefault();
        // 向服务器发送消息
        // chat message事件名称与谁有关？服务器的事件监听有关
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });

      // 客户端监听服务器返回消息的事件
      socket.on('chat message', function(msg){
        // msg表示服务器返回的消息，通过jQuery把消息添加到页面
        $('#messages').append($('<li>').text(msg));
      });
    </script>
  </body>
</html>
```

> **总结：我们关注的是客户端代码。**

- 发消息：`socket.emit('chat message', '内容');`
- 收消息：`socket.on('chat message', function(msg){}`

![image-20210616103412907](https://tva1.sinaimg.cn/large/005INI3Xly8grllv6knfqj30y60asq5x.jpg)

