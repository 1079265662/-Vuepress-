---
title: 用Vite创建项目
date: 2022-08-30
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209041935875.jpg
tags:
 - Vite
categories: Vite
---

::: tip 介绍
用create-vue 创建一个项目<br>
:::

<!-- more -->

## 使用create-vue

* 在[Vite](https://vitejs.cn/)没出来之前 我们都是用[Vue-cli](https://cli.vuejs.org/zh/) 脚手架创建项目 现在官方推荐用[create-vue](https://github.com/vuejs/create-vue) 代替Vue-cli
* Vite主打快速启动 低配置 这一点非常好 而且它支持`import`的导入方式 而`webpack`只支持 `CommonJS`的导入
  * Vite和webpack不一样的点就是 webpack需要加载完所有资源才能启动，Vite是先启动，然后需要什么资源再加载需要的部分，不需要的部分不加载


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

### **配置Prettier **

手动创建`.prettierrc` 文件(不要`.js` 后缀) 前提是你在创建时候安装了Prettier 否则没效果

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

如果我们我们在创建项目的时候 勾选`eslint`会自动创建一个`.eslintrc.cjs`规则文件

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
          void: 'always',
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

## 配置tsconfig

* 在`tsconfig.config.json` 修改`composite`属性 取消构建工具检测

```json
{
  "extends": "@vue/tsconfig/tsconfig.node.json",
  "include": ["vite.config.*", "vitest.config.*", "cypress.config.*"],
  "compilerOptions": {
    // 取消工具检测
    "composite": false,
    "types": ["node"]
  }
}

```

## 配置路由router

* 项目默认的`router` 是直接声明的 需要改成按需声明 
  * 把[createRouter()](https://router.vuejs.org/zh/api/index.html#createrouter)创建路由实例 中的 [routes](https://router.vuejs.org/zh/api/index.html#routes) 路由列表单独声明并引用

```tsx
import { createRouter, createWebHistory } from 'vue-router'
// 导入首页
import HomeView from '@/views/HomeView.vue'

// 单独声明路由列表
const routes = [
  {
    path: '/',
    name: 'HoMe',
    // 首页无需按需加载
    component: HomeView,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    // 设置按需加载
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 引用路由列表
  routes
})

export default router
```

## 配置页面title

* 实现页面动态title 并且当路由切换的时候 也具备动态效果

![image-20220904191959759](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209041919799.png)

> 准备

* 先准备一个全剧配置文件 统一管理像`title`类似的内容

```tsx
/**
 * settings.ts 全局配置文件
 */
export default {
  title: 'webgl学习'
}

```

* 在`index.html`中配置注入`title`

![image-20220904192850781](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209041928811.png)

```html
  <title>
    <%- title %>
  </title>
```

> 第一步 先下载Vite插件

* Vite是不支持 HTML 注入的 需要[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md) 在HTML 中注入
  * 该组件还有其他功能 比如HTML 压缩能力

```bash
npm i vite-plugin-html -D
```

> 第二步 在Vite中配置

* 在`vite.config.ts` 中进行HTML 注入配置

```tsx
// 代入Vite插件 用来设置title
import { createHtmlPlugin } from 'vite-plugin-html'
// 导入配置文件
import $t from './src/settings.js'

export default defineConfig({
  // 导入插件
  plugins: [
    vue(),
    // 使用vite-plugin-html 配置
    createHtmlPlugin({
      // 是否启动压缩html
      minify: true,
      // 在html中注入内容
      inject: {
        data: {
          // 注入title
          title: $t.title
        }
      }
    })
  ],
})

```

> 第三步 配置路由切换动态路由

* 按照以上步骤 实现了一个静态的`title` 想实现路由动态`title` 需要在`router`中进行配置

![image-20220904193031494](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209041930521.png)

```tsx
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 导入通用配置
import $t from '@/settings'

const routes = [
  {
    path: '/',
    name: 'HoMe',
    component: HomeView,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    // 设置懒加载
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 设置路由title
router.beforeEach((to, from, next) => {
  // 把路由title 和 默认title拼接起来
  document.title = `${to.meta.title} - ${$t.title} `
  next()
})

export default router

```

* 这样`title`就能依据你路由`meta`中设置的`title` 动态显示 所以路由的动态`title`是依赖`meta`中设置 别忘了新建路由的时候 进行设置

## 配置Vscode

* [配置Vscode](./Vscode.md) 在这里查看

## 参考文献

[配置 Vite 2.0 项目启动后自动打开浏览器](https://zxuqian.cn/how-to-automatically-open-browser-in-vite-projects/)

[收下这7款插件，让你在使用 Vite 的时候如虎添翼](https://www.cnblogs.com/hooray/p/15213132.html)
