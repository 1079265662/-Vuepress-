---
title: 常用正则表达式
date: 2021-05-24
cover: https://i.loli.net/2021/06/06/LVQIriR5YnTdawv.jpg
tags:
 - 正则表达式
categories: 正则表达式
subSidebar: false
---

::: tip 介绍

常用的正则表达式<br>
:::

<!-- more -->

## js中正则表达的使用 

* 正则规则.test(效验的数据)

```js
 methods: {
    //! 进行手机号输入验证操作
    validateMobile () {
      //! 1. 进行手机号格式判断
      if (!this.mobile) {
        this.mobileMsg = '请输入手机号'
      } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.mobileMsg = '手机号格式不正确'
      } else {
        //! 2.手机号验证通过 取消提示
        this.mobileMsg = ''
      }
    },
    validateCode () {
      //! 3. 进行验证码格式判断(六位数验证码)
      if (!this.code) {
        this.codeMsg = '请输入验证码'
      } else if (!/^\d{6}$/.test(this.code)) {
        this.codeMsg = '验证码格式不正确'
      } else {
        //! 4. 验证通过 取消提示
        this.codeMsg = ''
      }
    }
```

## 常用的正则效验

* 手机号效验正则

```正则表达式
/^1[34578]\d{9}$/
```

* 六位数验证码正则

```正则表达式
/^\d{6}$/
```

* 4-15长度 只能为数字字母组合 (可以修改长度)

```
/^[A-Za-z0-9]{4,15}$/
```

* 4-15长度 只能中英文 

```
/^[\u4e00-\u9fa5a-zA-Z]+${4,15}/
```

