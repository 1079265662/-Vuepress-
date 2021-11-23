---
title: 小程序中的全局方法回调函数
date: 2021-11-23
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-9m9jq1.jpg
tags:
 - 小程序
categories: 小程序
---

::: tip 介绍
小程序中的全局方法回调函数设置方法 <br>
:::

<!-- more -->

## 全局方法中的回调函数

* 小程序的app.js入口文件可以写一些全局函数方法 这种函数方法可以在每个页面进行调用使用

* 小程序中的授权和小程序中的手机号授权 如果需求是整体授权 这个时候你肯定不想每个js文件都copy一遍这些api方法 这个时候 就需要全局函数来帮你省事

  

  <font color =#ff3040>疑问? 如果有这样一个场景 一个页面 调用app.js全局函数方法的时候 如果调用成功 这个时候 你要在当前页面做一些调用成功后的一些操作 你如何知道调用成功呢?</font>

  * 第一种方式 通过调用成功后 生成一个全局变量 让页面通过全局变量状态位来判断是否调用成功 ( 不采用 因为违背初衷 简单的不彻底 ⛔ )
  * 第二种方法 设置全局方法的<font color =#ff3040>回调函数</font> 当方法调用成功的时候 回调一个状态位 供你判断 只需要在页面上 通过形参拿到即可! ( 采用 简单易用 👍 )

## 实现步骤

* 那如何写一个全局方法呢 ?

> 第一步 在app.js声明全局函数方法

* 我们就拿授权手机号来说
  * `e` 代表调用页面传来的参数 `backall`就是全局方法的回调的内容( 通常为状态位 )
  * `backall` 代表成功后的状态位(当然失败也可 `file`) 在`success`调用成功中声明成功回调状态位( 这里进行了后端是否获取成功判断 写在成功中即可 )

```js
  // 电话号码授权 e 代表调用页面传来的参数 backall就是回调的内容
  getPhoneNumber(e,backall) {
    console.log(e);
    let status = ''; //登录态是否过期  0: 没过期  1: 过期
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      //用户点击允许后，获取解密手机号时用到的数据
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;
      const userId = wx.getStorageSync('userId');
      const sessionKey = wx.getStorageSync('sessionKey');

      //登录态过期
      status = 1;
      //调用微信登录获取code，通过code重新获取登录态sessionKey
      wx.login({
        timeout: 30000,
        success: res => {
          console.log(res)
          if (res.errMsg == 'login:ok') {
            //得到code
            const code = res.code;
            let data = {
              status: status,
              userId: userId,
              code: code,
              encryptedData: encryptedData,
              iv: iv,
              sessionKey: sessionKey,
            }
            //请求获取手机号接口
            wx.request({
              url: 'https://joyworkapi.lshmnc.com.cn/public/index.php/qcwy/front.login/getPhoneNumber',
              data: data,
              success: result => {
                console.log(result);
                //记得通过statusCode做判断
                if (result.data.statusCode == 1000) {
                  wx.setStorageSync('phoneNumber', result.data.data.phoneNumber);
                  wx.setStorageSync('sessionKey', result.data.data.sessionKey);
                  wx.showToast({
                    title: '授权成功',
                    duration: 1000,
                  })
                } else {
                  wx.showToast({
                    title: '授权失败',
                    duration: 1000,
                  })
                }

              }
            })
              // 声明成功回调状态为
            backall(true)
          } else {
            console.log('wx.login:error')
          }
        }
      })
      // }
      // },
      // })
    } else {
      wx.showToast({
        title: '获取失败',
      })
    }

  },
```

> 第二步 在当前页面使用回调函数

* ok 既然全局app.js已经写好回调 那么我们页面如果拿到回调呢
  * `e` 是给全局函数方法传参 `res`是调用全局方法的回调状态位

```js
   // 授权手机号
  getPhoneNumber(e) {
    console.log('启动');
    // 启动回调函数和传参
    getApp().getPhoneNumber(e,res=>{
        // e 是给全局函数方法传参 
        // res 是调用全局方法的回调状态
      console.log(res)
        if(res){
            // 成功的判断
        }
    })
  },
```

* 这个时候你就可以拿到成功后全局方法的回调函数啦 就可以进行判断是否调用成功

> 第三步 封装app.js全局回调函数 

* 如果你写了好多全局方法 感觉app.js 又臭又长 那么怎么办呢 我们可以通过es6导出导入 把这些方法封装成js文件

  

