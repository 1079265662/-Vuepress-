---
title: JS的同步异步 宏任务微任务
date: 2021-07-09
cover: https://tva4.sinaimg.cn/large/005INI3Xly8gs6hp23s20j31hc0u0n4o.jpg
tags:
 - JavaScript
categories: JavaScript
---

::: tip 介绍
JS同步异步操作 和 宏任务微任务的面试介绍 <br>
:::

<!-- more -->

## 同步异步

* js运行环境是单线程
  * 同一时间只能做一件事 单线程(同步) + 事件队列(任务队列 异步)
    * 因为js需要操作页面 单线程对于页面操作很友好
  * 单线程会卡断 所以引用了事件队列机制 防止阻塞影响性能
    * 如果单线程代码执行过程中 遇到异步场景 会放入队列(宏任务) 立刻执行后续其他的代码(微任务)
      * 异步操作: 1. 定时函数(满足延时时间) 2. 事件函数(特定事件触发) 3. ajax回调函数(服务器有数据返回)
* js是单线程 浏览器是多线程
  * 浏览器编译js的时候是单线程 但是浏览器可以判断 同步任务 和 异步任务 如果是异步任务就放入事件队列
* 当同步任务执行完毕后 浏览器会传递异步任务 异步任务也分为 宏任务微任务 先执行宏任务 在=再执行微任务

## 宏任务微任务

* 进入浏览器事件队列的任务就 是宏任务
* 不进入浏览器队列但是进入微任务队列的 是微任务
* 宏任务 微任务 都是事件队列 
  * <font color = #ff3040>先同步再异步，在此异步基础上先宏任务再微任务</font>
    * 任务执行的时候仍然可能产生新的任务(宏任务 微任务 都有可能)

## 宏任务 微任务的执行顺序

* 代码的优先级: 主线程>宏任务>微任务 (微任务 宏任务都是异步)

![image-20210704203139670](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/s2lDdZPRqe6crIx.png)

## 宏任务 微任务 有哪些

同步:  网站的渲染过程 如元素的渲染，其实就是一个同步任务

异步: ajax axios setTimeout setInterval (都是宏任务) Promise nextTick (微任务)

<font color =#ff3040>宏任务: </font>script setTimeout setInterval

<font color =#ff3040>微任务: </font>Promise nextTick process

**try catch**是处理同步异常

**`Promise`的 try catch**是处理异步异常