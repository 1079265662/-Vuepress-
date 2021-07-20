---
title: JS 常用字符串方法
date: 2021-06-25
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/16.jpg
tags:
 - 字符串方法
categories: JS 方法合集
---

::: tip 介绍 
JS 常用字符串方法 <br>
:::

<!-- more -->

```js
String.split("")				//分割 按照参数分割字符串
String.substring(0,2)			//裁剪 从下标0到2裁剪,不包括下标2
String.charAt(0)				//提取 提取下标为0的字符
String.indexOf("")				//查询 同数组方法
string.replace(a,b)				//替换 将参数a替换为参数b
String.padStart(位数,补数)	 	 //补位 如果字符串不满足位数要求,使用补数填充位数
String.toUpperCase()			//全部转换为大写
String.toLacaleLowerCase()		//全部转换为小写
String.trim()					//去除两边空格
String.endsWith('.xlsx')	    //检查字符串是否以指定的子字符串结尾(常用于检查上传文件的后缀名.xlsx 等)
```

