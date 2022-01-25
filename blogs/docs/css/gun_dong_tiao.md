---
title: 修改页面的一些默认样式
date: 2022-01-25
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-9mk3ek.jpg
tags:
 - Css
categories: Css
---

::: tip 介绍
修改webkit浏览器的滚动条和勾选状态<br>
:::

<!-- more -->

## 修改webkit浏览器自带的滚动条

* 浏览器自带的滚动条十分的难看 修改一下样式怎样
* <font color =#ff3040>注意: 该css属性只能修改`webkit`内核的浏览器 比如: 谷歌 edge safari等浏览器</font>

```css
/************** 滚动条 **************/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: #647ea0;
}

::-webkit-scrollbar-thumb:horizontal {
  width: 5px;
  background-color: #647ea0
}
```

* 这样设置一下 滚动条就又细又长很好看

![image-20220125170414230](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125170414230.png)

## 修改浏览器自带的选中效果

* 通过`::selection`改变选则文本的颜色 这个所有`现代`浏览器都支持

```css
::selection {
  background: #da1333;
  color: #fff;
}
```

## 修改浏览器自带的鼠标效果

* 这个需要在`body`中设置`cursor`样式 别忘了要带上`auto`

```css
html,
body {
  // 鼠标样式
  cursor: url("https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/arrow.cur"), auto;
}
```

## 设置线性过度

* 设置一些线性过度可以让一些点击事件 或者 `:hover`鼠标移入样式 看着更舒服一些 我们设置`transition`通用的线性过度吧 让页面具备一些动画效果 

```css
  transition: all 0.25s ease-in-out 0.16s;
```

