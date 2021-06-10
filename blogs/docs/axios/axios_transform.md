---
title: 文章id超范围问题
date: 2021-05-28
tags:
 - Vue
 - axios
categories:
 -  axios
---

::: tip 介绍
利用axios transform功能 解决文章id超范围问题<br>
:::

<!-- more -->

## 文章id超范围问题

[处理超范围id插件](https://github.com/sidorares/json-bigint)

> 问题: js处理数字有长度限制 如果后端传来的数据太长 js无法处理 导致无法把修改后的数据交给后端处理
>
> 解决: 安装插件 npm i json-bigint
>
> 类型: 会把 超范围的id 转换为对象拼接起来 并非之前字符串 所以调用时候 需要用 `toString()`转换成字符串

![image-20210610132529317](https://i.loli.net/2021/06/10/YKC2j6HSOGcQNZX.png)

> 在通用的接口调用模块设置  `utils文件夹 里面 request.js`

- 设置`transformResponse` 在传递给 then/catch 前，允许修改响应数据(比响应式拦截更早)
- `transformResponse` 携带服务器传来的数据 不携带其他内容 响应式拦截会携带其他内容

```diff
// 导入bigint插件
import JSONbig from 'json-bigint'
// ~  声明一个通用的url基础地址 用于申请token的基础路径 用常量保存
const baseURL = 'http://api-toutiao-web.itheima.net/app/'
// ~  axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)
const instance = axios.create({
+   // 在接口获取数据之前对后端返回的原始数据进行处理
+   // 这里处理发生在响应拦截器之前（它最先接触到后端返回的原始数据）
+   transformResponse: [(data) => {
+     // 这里对数据处理好之后，再交给响应拦截器即可
+     try {
+       // 转换的id值 是一个对象 注意后续: 需要转换为字符串格式 对象不属于任何字符串格式
+       return JSONbig.parse(data) // parse是对文章列表的id值 进行转换 解决js数值最大限制问题
+     } catch {
+       // 如果数据转换错误，就不做转换，返回原始数据
+       return data
+     }
+ }],
  // ~ baseURL是axios属性 用来声明url基础路径
  baseURL: baseURL
})
```

> 如果用完有Vue警告 :
>
> ![1623308642(1)](https://i.loli.net/2021/06/10/ZGrsb2gnAhqJOk9.png)
>
> 原因: 插件会自动把长id转换为 对象 拼接起来 但是`:key` 要求的是对象 所以会警告
>
> 解决: 需要用 `toString()`转换成字符串 即可
>
> - `:key="item.art_id.toString()"`
