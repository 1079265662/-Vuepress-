---
title: 在Vue中使用markdown
date: 2021-11-02
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-e76roo.png
tags:
 - vue-element-admin
 - Vue
categories: Vue
---

::: tip 介绍
在Vue中使用markdown提升书写体验 <br>
:::

<!-- more -->

## 为什么要在Vue中使用markdown

* 现在有一个场景 需要给oa系统写一个用户手册 如果直接另起页面写的话十分费劲 并且样式还得自己写 这种传统的渲染方式显然不适合这种说明类文档 所以我们要有一个代替品
* `markdown`就是解决这种问题的 它本质上可以渲染成html 通过一个npm包 可以直接渲染成页面 并且自带样式 十分方便 我们就来试试这种方式
* <font color =#ff3040>注意: 你需要使用vue脚手架(vue-cli4) 才可以设置</font>

## 开始我们的流程

> 1. 第一步 开始安装我们渲染md的npm包

* `vue-markdown-loader`和`github-markdown-css` 是我们需要的npm包
* 注意 -S 和 -D  

```bash
npm i vue-markdown-loader -D  //markdown格式
npm i github-markdown-css -S  //markdown样式
```

![1781107-20201021091614764-1363270215](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1781107-20201021091614764-1363270215.png)

> 2. 第二步 配置vue.config.js,支持markdown语法

* <font color =#ff3040>注意 这一步会修改Vue配置文件 需要重启才能生效 并且不要修改你自带的配置信息 直接在 `chainWebpack (config)` 方法中 添加支持markdown即可</font>

````js
  chainWebpack (config) {
  // 你之前的配置数据 不要进行改动 直接添加以下内容即可 添加后 重启项目
    // 配置markdown文档
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  }
````

> 3. 第三步 在main.js中引入markdown样式

* 入口文件导入`markdown`样式奥 进行全局挂载css

```js
import 'github-markdown-css'
```

> 4. 第四步 创建一个md文件

* 这里推荐用 [typora](https://www.typora.io/) 体检极致的markdown书写体验 (注意写太多不建议这个软件 会闪退 大概超过2M)
* 以下是vscode读取markdown的样子

![image-20211108204842839](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211108204842839.png)

> 5. 第五步 在components中挂载组件

* 在需要的组件中引入help.md文件并在浏览器中查看
* <font color =#ff3040>注意class="markdown-body"是对markdown-css的引用，必须要有，不添加该class会导致文件没有样式</font>

```vue
<template>
	<div>
	 <!-- 必须配置class="markdown-body" 否则没有样式 -->
        <div class="markdown-body">
          <!-- 渲染md组件 -->
          <equipment />
        </div>
	</div>
</template>
<script>
// 导入md文件
import equipment from '@/staticMarkdowun/equipment.md'
export default {
  name: 'Instructions',
  // 在组件中进行挂载md组件
  components: {
    equipment
  }
}
</script>

```

> 6. 恭喜你导入成功 快看看样子吧

![image-20211108205325723](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211108205325723.png)

## 参考文献

[vue项目vue-cli4展示本地markdown语法_md文件，图文详细讲解](https://www.cnblogs.com/liuXiaoDi/p/13850536.html)

