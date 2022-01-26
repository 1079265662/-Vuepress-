---
title: 一些常用的css样式
date: 2022-01-25
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-9mk3ek.jpg
tags:
 - Css
categories: Css
---

::: tip 介绍
一些常用的css样式记录一下<br>
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

## 设置阴影特效

* 有很多场景会用到边框效果`box-shadow` 特别是颜色很中和的场景是非常需要边框来实现一个漂亮的过度

> box-shadow的常用[语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#syntax)

```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
```

### **整体的阴影特效**

* 整体容器的阴影特效很简单

> 实物图和代码

![image-20220126151148656](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126151148656.png)

```css
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.3);
```

## 上下左右阴影的实现

* 如果你的容器紧贴着浏览器边缘 实际上整体的就能实现 但是也有特殊奥
* 盒子左侧的阴影 

![image-20220126154223370](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126154223370.png)

```css
box-shadow: -15px 0px 12px -12px rgb(0 0 0 / 30%);
```

* 盒子右侧的阴影

![image-20220126152607080](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126152607080.png)

```css
box-shadow: 8px 0px 5px -6px rgb(0 0 0 / 30%);
```

* 盒子上侧的阴影

![image-20220126153553880](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126153553880.png)

```css
box-shadow: 0px -8px 8px -6px rgb(0 0 0 / 30%);
```

* 盒子下侧的阴影

![image-20220126153920763](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126153920763.png)

```css
box-shadow: 0 6px 4px -2px rgb(0 0 0 / 12%);
```

