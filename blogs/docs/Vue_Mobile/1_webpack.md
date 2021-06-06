---
title: 1. Vue移动端脚手架自定义
date: 2021-06-01
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vue移动端
categories: Vue移动头条项目
---

::: tip 介绍
Vue移动端脚手架自定义(Vue 2.0)<br>
:::

<!-- more -->

## 选择`Manually select features`

![image-20201226221648826](https://i.loli.net/2021/06/01/ikYCzfl83JGK4RU.png)

## 选择相关选项

![image-20201226222041526](https://i.loli.net/2021/06/01/TjiWdDF5kBKzeOb.png)

- Babel：es6 转 es5

- Router：路由。在脚手架工具中，它会自动在本项目中使用路由，创建好基本的路由配置（不再需要手动去安装vue-router）。后面会提示你`是否启用历史模式`
- CSS Pre-processors：CSS 预处理器，后面会提示你选择 less、sass、stylus 等
- Linter / Formatter：代码格式校验，ESLint 代码格式校验。后面会再次让你具体选择eslint的标准。

## 选择版本号

![image-20201226222222991](https://i.loli.net/2021/06/01/o8i2hw1kSZYK4TH.png)

## 选择路由模式

- y 表示采用history模式
- n 表示采用hash模式

![image-20201226222308309](https://i.loli.net/2021/06/01/6xfoLElzNdVIaRQ.png)

## 选中css预处理

![image-20201226222421230](https://i.loli.net/2021/06/01/b5jxOgYuHzmS8h3.png)

## 选择代码校验规范

![image-20201226222533028](https://i.loli.net/2021/06/01/rRDKpf7nzkEM621.png)

## 选择代码触发条件

![image-20201226222631554](https://i.loli.net/2021/06/01/7R8teFfzCxrpVcD.png)

> 这里建议两个都选上，更严谨。

- Lint on save：在保存文件时会检查eslint错误。

- Lint and fix on commit：每当执行 `git commit` 提交的时候，会**自动修正**eslint错误。

## 选择代码校验配置文件形式

![image-20201226222813054](https://i.loli.net/2021/06/01/QTy8fIv1CRLir75.png)

> Babel、ESLint 等工具会有一些额外的配置文件，这里的意思是问你将这些工具相关的配置文件写到哪里：

- In dedicated config files：分别保存到单独的配置文件

- In package.json：保存到 package.json 文件中

## 选择是否保存默认配置

![image-20201226222938654](https://i.loli.net/2021/06/01/bw1kGUz4ioLEmgI.png)

> 这里里是问你是否需要将刚才选择的一系列配置保存起来，然后它可以帮你记住上面的一系列选择，以便下次直接重用。

## 配置选项总览

![image-20210601092732842](https://i.loli.net/2021/06/01/tJ2iejSn4Ikvs16.png)

## 回车后，进入安装依赖包的过程

![image-20201226223042236](https://i.loli.net/2021/06/01/GRPIxntz32fyCvB.png)

> 向导配置结束，开始装包。安装包的时间可能较长，请耐心等待......

## 安装完成后出现如下效果

![image-20201226223339226](https://i.loli.net/2021/06/01/xkFP3NtHaErAslw.png)

## 运行项目

```bash
# 进入你的项目目录
cd mytest

# 启动开发服务
npm run serve
```

