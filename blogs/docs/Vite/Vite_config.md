---
title: 用vite创建项目
date: 2022-08-30
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208311634099.jpg
tags:
 - vite
categories: vite
---

::: tip 介绍
用create-vue 创建一个项目<br>
:::

<!-- more -->

## 使用create-vue

* 在[vite](https://vitejs.cn/)没出来之前 我们都是用[Vue-cli](https://cli.vuejs.org/zh/) 脚手架创建项目 现在官方推荐用[create-vue](https://github.com/vuejs/create-vue) 代替Vue-cli
* Vite主打快速启动 低配置 这一点非常好 而且它支持`import`的导入方式 而`webpack`只支持 `CommonJS`的导入

![image-20220830112921104](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208301129234.png)

* 创建一个`create-vue` 项目

```bash
# Vue3
npm init vue@3
# Vue2
npm init vue@2
```

* 创建的选项

![image-20220830113303942](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208301133086.png)

* 这样我们就创建完成一个Vite脚手架的Vue3项目了 记得进入首次进入项目后 先`npm i`

## 配置Vite

* 创建项目完毕后需要手动配置一些Vite内容

### **安装scss**

* 在Vite官方文档中[CSS 预处理器](https://vitejs.cn/guide/features.html#css-pre-processors) 得知Vite官方推荐使用`PostCSS ` 想使用`scss` 需要单独安装一下

```bash
# .scss and .sass
npm install -D sass
```

### **安装插件**

* 推荐的 IDE 配置是 VSCode + Volar 扩展。Volar 为模板表达式、组件 `prop`，甚至是插槽验证提供了语法高亮和智能提示。我们强烈推荐这种设置，特别是如果你也在使用 TypeScript。

![image-20220830193709791](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208301937895.png)

![image-20220831111604568](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208311116595.png)

![image-20220831114022864](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208311140892.png)

![image-20220831114036184](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208311140209.png)

* `Vetur`插件一定要取消 或关闭部分功能 这个插件适用于Vue2 不支持Vue3`setup` (不过他的一些代码块依旧很香)

![image-20220830193848017](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208301938042.png)

* 或者关掉`Vetur`的导入效验功能 和 script 效验 
  * 搜索: vetur 和 Validation 


![image-20220830194140846](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208301941893.png)

![image-20220831145046625](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208311450671.png)

### **配置prettier**

1. 手动创建`.prettierrc` 文件(不要`.js` 后缀) 前提是你在创建时候安装了prettierrc 否则没效果
2. 使用以下prettier格式化规则

```js
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 120,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

### **完善eslint**

1. 如果我们我们在创建项目的时候 勾选`eslint`会自动创建一个`.eslintrc.cjs`规则文件

* eslint 详解

![image-20220831111109975](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208311111028.png)

* 添加`rules`规则

```js
  rules: {
    // 标签闭合
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 设置name时候自动转大小写  ["error", "PascalCase" | "kebab-case"]
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'array-bracket-spacing': [2, 'never'] // 不允许数组括号内的空格
    // 'no-inferrable-types': true, // 是否取消对ts的检测
  }
```

2. 添加规则忽略

* 手动创建一个`.eslintignore`文件 设置eslint白名单

```js
node_modules
.vscode
.idea
dist
public
.eslintrc.js
src/assets

```

## Vite的配置

* Vite 提供了方便的配置，可以在项目运行之后自动为我们打开浏览器，方便开发者开发。
* Vite的配置在`vite.config.ts`  文件中

```js
export default defineConfig({
  // 配置启动项
  server: {
    // 本地启动 + 局域网
    host: '0.0.0.0',
    // 自启打开页面
    open: true
  },
  // 导入全局scss变量
  css: {
    preprocessorOptions: {
      scss: {
          // 根据自己的scss变量文件来导入
        additionalData: `@use "./src/styles/config.scss" as *;`
      }
    }
  },
})
```

## 配置Vscode

* [配置Vscode](./Vscode.md) 在这里查看



## 参考文献

[配置 Vite 2.0 项目启动后自动打开浏览器](https://zxuqian.cn/how-to-automatically-open-browser-in-vite-projects/)
