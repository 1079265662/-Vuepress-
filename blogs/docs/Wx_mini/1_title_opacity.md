---
title: 小程序吸顶效果
date: 2021-11-20
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-zxkgeg.jpg
tags:
 - 小程序
categories: 小程序
---

::: tip 介绍
小程序中的吸顶效果展示 <br>
:::

<!-- more -->

## 效果展示

* 在页面中 吸顶效果非常常见 我自己也记录了[Vue3的吸顶效果](https://liukaili127.vercel.app/blogs/docs/Vue3/8_Vue_xi_ding.html) 那如何在小程序中也实现这种效果呢

![title](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/title.gif)

## 实现步骤

* 实现步骤大概需要以下步骤

1. 需要通过微信api方法计算异形屏的高度 适配异形屏(说的就是你苹果) `wx.getSystemInfoSync()['statusBarHeight']`方法是这个 这个需要写在`app.js`入口文件里面
2. 通过计算异形屏的刘海高度 就可以自己写一个顶部title 通过样式来实现一个顶部title
3. 设置的背景颜色采用rgba; 通过改变rgba其中a的值来实现透明渐变。

* 大致步骤就是这些 详细流程: 

> 第一步 在app.js 入口文件中 计算异形屏的刘海高度 

```javascript
  globalData: {
  // 计算异形屏的高度 这样自定义样式会适应屏幕刘海
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
  },
```

> 第二步 在你需要吸顶效果的页面开写吸顶效果

* <font color=#ff3040>注意: 需要在吸顶效果的页面 关闭小程序自带的默认顶部效果(在json文件写)`navigationStyle:custom` </font>
* `wx.getSystemInfoSync()` 获取高度的方法 他不携带px 需要你自己在拼接px
* <font color =#ff3040>注意 千万不要再 `scroll-view`标签去计算滑动高度 它自带的滑动监听 非常垃圾 亲测100内的高度会出现计算失误问题 如果页面足够高 可以滚动 建议用`onPageScroll`这个方法来检测滑动高度</font>

1. 在js里面 获取刘海高度和获取滑动高度 用来设置title样式和吸顶效果

```javascript
// 创建微信实例对象
var App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     // 这个是盒子内部高度 防止碰到异形屏
    statusBarHeight: App.globalData.statusBarHeight + 'px',
     // 这个是盒子整体的高度 44是你自己写的css样式高度 也需要算在里面
    navigationBarHeight: (App.globalData.statusBarHeight + 44) + 'px',
     // 储存滚动高度
    scrollTop: 0,
    // 设置标题
    navigationBarTitle: '华北利星行机械',
    },
   	// 滚动条监听 设置顶部下拉隐藏
  onPageScroll: function (obj) {
    let scrollTop = obj.scrollTop
    // 安全距离防止出现bug
    if (scrollTop < 20) {
      this.setData({
        scrollTop: 0
      })
      return
    }
    // 修改滚动数据
    this.setData({
      scrollTop: scrollTop
    })
  },
})
```

2. wxss里面写一下吸顶的样式

```css
.navbar {
  width: 100vw;
  background-color:#FFF;
  position: fixed;
  top: 0;
  z-index: 999;
}
.title-container {
  height: 44px;
  display: flex;
  align-items: center;
  position: relative;
}
.titles {
  position: absolute;
  left: 104px;
  right: 104px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

3. wxml里面写一下吸顶的模板

````html
<!-- 吸顶菜单 -->
<view class="navbar" style="height: {{navigationBarHeight}};background-color: rgba(255, 255, 255,{{scrollTop / 150 > 1 ? 1 : scrollTop / 150}});">
  <view style="{{'height: ' + statusBarHeight}}"></view>
  <view class='title-container'>
      <!-- 这里的算法数值越大 显示越慢 可以自行替换 -->
    <view class='titles' style="color: rgba(0, 0, 0,{{scrollTop / 150 > 1 ? 1 : scrollTop / 150}});">{{navigationBarTitle}}</view>
  </view>
</view>
````

* ok 现在你已经完成吸顶效果啦 并且可以适应异形屏 但千万记得要先关掉微信自带的title 因为我们这个是自定义的

## 参考文献

* [微信小程序MUI导航栏透明渐变功能示例(通过改变rgba的a值实现)](https://download.csdn.net/download/weixin_38638312/13977131?utm_medium=distribute.pc_relevant_download.none-task-download-2~default~baidujs~default-3.test_version_3&depth_1-utm_source=distribute.pc_relevant_download.none-task-download-2~default~baidujs~default-3.test_version_3&dest=https%3A%2F%2Fdownload.csdn.net%2Fdownload%2Fweixin_38638312%2F13977131&spm=1003.2020.3001.6616.5)

