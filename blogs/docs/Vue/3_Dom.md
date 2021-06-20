---
title:  Vue底层的虚拟Dom树
date: 2021-06-16
cover: https://tva2.sinaimg.cn/large/005INI3Xly8grlm4oxfplj319b0u0dhn.jpg
tags:
 - Vue
categories: Vue
---

::: tip 介绍

虚拟Dom树是什么呢<br>
:::

<!-- more -->

## Vue底层 虚拟Dom树

* 尽可能少的更新DOM元素：精准更新DOM元素
* Vue的底层是如何做到这件事情的？虚拟DOM树（真实DOM树）
* 虚拟DOM树对真实DOM树中的每一个DOM节点进行了描述

> 内部实现图

![image-20210617220504251](https://tva4.sinaimg.cn/large/005INI3Xly8grlm6byn5fj30gv07g3yf.jpg)

> 虚拟Dom 实现代码

![](https://tva4.sinaimg.cn/large/005INI3Xly8grlm7lpnhnj30hr0dtju6.jpg)
