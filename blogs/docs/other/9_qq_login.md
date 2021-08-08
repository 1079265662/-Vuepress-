---
title: Vue脚手架导入qq登录方法
date: 2021-08-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-rdo2v1.jpg
tags:
 - Vue
 - QQ
categories: Vue
---

::: tip 介绍
Vue脚手架导入qq登录方法 用于设置qq登录 <br>
:::

<!-- more -->

## Vue脚手架中 导入qq登录方法

![image-20210806001727627](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210806001727627.png)

> 项目设置QQ登录 都需要导入QQ登录专用方法 才能实现QQ登录

* 在Vue脚手架的 `public/index.html` 导入qq登录方法链接

  * 导入QQ登录方法的代码

  ```html
    <script src="http://connect.qq.com/qc_jssdk.js" data-appid="100556005"
      data-redirecturi="http://www.corho.com:8080/#/login/callback">
    </script>
  ```

> 导入QQ登录方法示例

* 路径`public/index.html`

```diff
<!DOCTYPE html>
<html lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>

<body>
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
        Please enable it to continue.</strong>
  </noscript>
  <div id="app"></div>
</body>
+    <!-- 导入QQ登录的配置方法 -->
+    <script src="http://connect.qq.com/qc_jssdk.js" data-appid="100556005"
+    data-redirecturi="http://www.corho.com:8080/#/login/callback">
+  </script>
+    <!-- 导入QQ登录的配置方法 -->
</html>

```



