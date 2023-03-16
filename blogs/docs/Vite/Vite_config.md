---
title: 用Vite创建项目
date: 2023-03-10
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


![image-20221101161612601](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211011616674.png)

![image-20220831145046625](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208311450671.png)

### **配置Prettier**

手动创建`.prettierrc` 文件(不要`.js` 后缀) 前提是你在创建时候安装了Prettier 否则没效果

```js
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "ignore",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
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
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 设置全局环境下未定义变量的处理方式
  env: {
    node: true,
    browser: true,
    commonjs: true,
    amd: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 可以使用any
    '@typescript-eslint/no-explicit-any': 'off',
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
    'vue/html-indent': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 设置name时候自动转大小写  ["error", "PascalCase" | "kebab-case"]
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'array-bracket-spacing': [2, 'never'] // 不允许数组括号内的空格
    // 'no-inferrable-types': false, // 是否取消对ts的检测
  }
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

::: details 查看文件目录
![image-20230216173250748](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302161732791.png)
:::

## 配置tsconfig

* 总共有两个`tsconfig`
  * `tsconfig.config.json` 应该是参考TS
  * `tsconfig.json` 本项目的TS配置文件 


![image-20220907193353390](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209071933446.png)

* 如果不需要参考TS 需要在`tsconfig.json`中取消`references`参考 并且以后设置TS规则也在这个文件中设置

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "compilerOptions": {
    "baseUrl": ".",
    "isolatedModules": false, // 取消导出检查
    "paths": {
      "@/*": ["./src/*"]
    }
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

### 拆分路由

* 子模块`children[]` 数据太多 可以单独封装在一个js/ts文件中 通过`...`解构进行导出

> 拆分示例

* 这是一个完整未拆分的路由 包含父级菜单和子级模块路由

```tsx
const routes = [
  {
    path: '/css',
    component: Layout,
    meta: <any>{
      title: 'CSS操练场',
    },
    children: [
      {
        path: '/csstext',
        name: 'CssText',
        // 首页无需按需加载
        component: () => import('@/views/css_menu/css_test/index.vue'),
        meta: {
          title: '滚动字体',
        },
      },
      {
        path: '/loveclick',
        name: 'LoveClick',
        // 首页无需按需加载
        component: () => import('@/views/css_menu/love_click/index.vue'),
        meta: {
          title: '一颗爱心',
        },
      },
    ],
  },
]

```

* 进行拆分操作 把子模块`children[]`的数据 进行拆分操作

```tsx
export const css_menu = [
  {
    path: '/csstext',
    name: 'CssText',
    // 首页无需按需加载
    component: () => import('@/views/css_menu/css_test/index.vue'),
    meta: {
      title: '滚动字体'
    }
  },
  {
    path: '/loveclick',
    name: 'LoveClick',
    // 首页无需按需加载
    component: () => import('@/views/css_menu/love_click/index.vue'),
    meta: {
      title: '一颗爱心'
    }
  }
]

```

* 在路由文件中进行 导入并通过`...`解构子级里面的数组数据
  * 建议不要导出父级菜单 因为父级菜单依赖于`Layout`菜单 导出的时候 还需要在js/ts中引入`Layout`组件 而且父级菜单并不占位置并且能直观的展示有哪些父级菜单

```tsx
// 使用动态导入/懒加载
const Layout = () => import('@/layout/index.vue')
// 导入拆分的路由
import { css_menu } from './modules/css_menu'
const routes = [
  {
    path: '/css',
    component: Layout,
    meta: <any>{
      title: 'CSS操练场',
    },
    // 解构子级数组里面的数据
    children: [...css_menu],
  },
]

```

## 配置页面title

* 实现页面动态title 并且当路由切换的时候 也具备动态效果

![image-20220904191959759](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209041919799.png)

> 准备

* 先准备一个全剧配置文件 统一管理像`title`类似的内容

```tsx
/**
 * 全局配置文件
 */
// 声明全局配置对象
const viewSettings = {
  title: 'webgl学习'
}

// 导出
export { viewSettings }

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
import { viewSettings } from './src/settings.js'

export default defineConfig({
  // 导入插件
  plugins: [
    vue(),
    createHtmlPlugin({
      // 是否启动压缩html
      minify: true,
      // 在html中注入内容
      inject: {
        data: {
          // 注入title
          title: viewSettings.title
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
import HomeView from '@/views/dashboard/index.vue'
// 导入通用配置
import { viewSettings } from '@/settings'

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
    component: () => import('@/views/AboutView.vue'),
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
  document.title = `${to.meta.title} - ${viewSettings.title}`
  next()
})

export default router

```

* 这样`title`就能依据你路由`meta`中设置的`title` 动态显示 所以路由的动态`title`是依赖`meta`中设置 别忘了新建路由的时候 进行设置

## 批量导入图片

* 在js或ts中导入图片 需要用`import`进行导入使用 Vite 中提供了 `import.meta.glob` 的语法糖来解决这种**批量导入**的问题，一次性加载出这些图片文件来。

```tsx
// 单独导入
import item0 from "../assets/image/item_0.png"
import item1 from "../assets/image/item_1.png"
import item2 from "../assets/image/item_2.png"
// ...more
import item9 from "../assets/image/item_9.png"

// 批量导入
const imgs = import.meta.globEager("../assets/image/item_*.png");
```

## 静态资源处理 public & assets

在Vite中分为两种静态资源: 

![image-20230310122607833](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101226874.png)

[public](https://cn.vitejs.dev/guide/assets.html#the-public-directory)资源不应该作为代码进行引用 他只适合一些本地下载的资源 或...

* 引入 `public` 中的资源永远应该使用根**绝对路径** —— 举个例子，`public/icon.png` 应该在源码中被引用为 `/icon.png`。或通过[import.meta.env.BASE_URL](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes)使用Vite的基本 URL导入

![image-20230310122419197](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101224240.png)

```js
// 静态绝对路径导入 可以省去/public/
import car from '/car/轿车.gltf'
const gltf = await loader.loadAsync('/car/轿车.gltf')

// 或通过import.meta.env.BASE_URL进行导入
const gltf = await loader.loadAsync(
  `${import.meta.env.BASE_URL}car/轿车.gltf`
)

```

* `public` 中的资源不应该被 JavaScript 文件引用。
* `public`中的文件不会被vite处理, 比如一些未被`import`引用的资源
* `public` 资源需要通过绝对**路径导入**, 且无需设置 [?url](https://cn.vitejs.dev/guide/assets.html#explicit-url-imports)后缀

* `public`适合一些被拆分但又会被导入的文件, 比如`gltf`文件, 这种文件不能放在`assets`中, 因为在vite的`src`文件中会自动清理代码中未引入的内容, 而代码中只会导入`gltf`单文件

![image-20230310135551735](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101355777.png)

<br/>

`assets`资源作为代码中统一的静态资源管理 适合在代码中进行使用

* `assets`会被vite进行编译 所以需要单独设置
* `assets`里面的文件如果没有被明确的`import`引用, 打包的时候会被自动清理掉, 在`src`里面的所有文件都会通过打包编译处理, 这就是所谓的`loader` (本地开发环境下不会)

### **template模板中引用资源**

* `<template>`模板中引用资源很简单 直接按照相对路径引用即可

```vue
<template>
  <img src="@/assets/logo.svg" />
</template>
```

### **JS/TS import引用方式**

* 通过`import` 引入静态资源 这种适合单一文件的引用 可以分别作用于JS/TS和`<template>`模板中

```vue
<template>
  <img :src="logo" />
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg' 
console.log(logo) // 引入的图片资源路径
</script>
```

### **JS/TS使用绝对路径引用**

* 放在`assets`或者`public`的资源 也可以通过绝对路径进行引用(相对路径和`@/`在脚手架中的JS/TS不可用)
* <font color =#ff3040>注意: 这种方式引入, 可能在线上环境时无法使用, 不建议用这种方式引入资源文件</font>

```tsx
// 获取绝对路径assets下的音频
const ret = new Audio('/src/assets/ball/ball_music.mp3')
// 音频播放
ret.play()

```

### **封装方法多文件引用方式**

多个文件适合封装一个方法 进行引用减少代码的耦合性

* [静态资源处理 | Vite 官方中文文档](https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url) 通过官网介绍进行封装

```js
// getAssetsFile.ts
// 封装静态资源引用方法
const getAssetsFile = (url: string) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}
export { getAssetsFile }

```

* 在JS/TS中使用导入方法

```ts
import { getAssetsFile } from '@/utils/getAssetsFile'

// 这里是three.js的cube加载器 引用多张图片进行加载
const envMapT = envMapLoader.load([
    getAssetsFile('environmentMaps/0/px.jpg'),
    getAssetsFile('environmentMaps/0/nx.jpg'),
    getAssetsFile('environmentMaps/0/py.jpg'),
    getAssetsFile('environmentMaps/0/ny.jpg'),
    getAssetsFile('environmentMaps/0/pz.jpg'),
    getAssetsFile('environmentMaps/0/nz.jpg')
])
```

* 在`<template>`模板中也可以直接使用引用方法

```vue
<template>
  <img :src="getAssetsFile('environmentMaps/0/px.jpg')" alt="" />
</template>

<script setup lang="ts">
import { getAssetsFile } from '@/utils/getAssetsFile'
</script>
```

### **Vite全局静态文件处理**

[静态资源](https://cn.vitejs.dev/config/shared-options.html#assetsinclude)是一些不参与编译的文件, 图片等常见静态资源类型vite内置, 但是部分静态资源, 需要手动添加比如: glb和gltf的weblg模型资源

```tsx
export default defineConfig({
  // 静态资源
  assetsInclude: ['**/*.gltf', '**/*.glb'],
})

```

### **Vite处理URL资源**

上面介绍了通过[assetsInclude](https://cn.vitejs.dev/config/shared-options.html#assetsinclude), 配置全局的静态处理, 如果我们只想在`import`引入的时候, 进行处理, 可以使用[显式 URL 引入](https://cn.vitejs.dev/guide/assets.html#explicit-url-imports) `?url`后缀

* 如果再出现路径中含有`/@fr/`, 建议重启项目

```js
// 导入three.js自带的json字体库
import helvetiker from 'three/examples/fonts/optimer_bold.typeface.json?url'
// 本地assets资源的引用
import helvetikerAssets from '@/assets/iphone/font/text.json?url'

```

这样就能通过传统的URL引入了

![image-20230228175416946](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302281754908.png)

![image-20230228175457744](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302281754783.png)

### **Vite静态文件字符串处理**

Vite自带的[?raw](https://cn.vitejs.dev/guide/assets.html#importing-asset-as-string) 后缀可以将声明作为字符串引入。

```js
import shaderString from './shader.glsl?raw'

```

## [环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes)

在Vue2时代的webpack中我们使用的是` process.env`, webpack帮我们做了处理，使浏览器可以直接识别node.js的`process.env`变量，从而实现了浏览器识别环境变量的功能。

在Vue3搭配Vite使用的是特殊的 **`import.meta.env`** 对象上暴露环境变量, 他是现代浏览器提供的关键字[import.meta](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import.meta)。这里有一些在所有情况下都可以使用的内建变量：

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。
- **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/shared-options.html#base)决定。**常用在导入public静态资源中**
- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境。
- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。
- **`import.meta.env.SSR`**: {boolean} 应用是否运行在 [server](https://cn.vitejs.dev/guide/ssr.html#conditional-logic) 上。

注：这些变量在运行在环境中，**vite.config.ts**中无法访问

### **vite中自定义环境变量**

Vite内置了dotenv这个第三方库， dotenv会自动读取.env文件， [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://vitejs.cn/vite3-cn/config/shared-options.html#envdir) 中的下列文件加载额外的环境变量：

* .env     所有情况下都会加载
* .env.[mode]     只在指定模式下加载 

> 默认情况下

- *npm run dev 会加载 .env 和 .env.development 内的配置*
- *npm run build 会加载 .env 和 .env.production 内的配置*
- *mode 可以通过命令行 --mode 选项来重写。*

加载的环境变量也会通过 `import.meta.env` 以字符串形式暴露给客户端源码。为了防止意外地将一些环境变量泄漏到客户端，只有以 **`VITE_`** 为前缀的变量才会暴露给经过 Vite处理的代码。

> 我们验证下

我们在项目的根目录下，创建 **.env**文件，写入测试内容；

```ini
HELLO = "小伙子，我是base数据"
VITE_HELLO = "小伙子，我是base数据"

```

创建 **.env.development** 文件，写入测试内容；

```ini
HI = "小伙子，我是development数据"
VITE_HI = "小伙子，我是development数据"

```

 创建 **.env.production** 文件，写入测试内容；

```ini
MD =  "小伙子，我是production数据"
VITE_MD =  "小伙子，我是production数据"

```

然后在入口文件main.ts中打印一下

```js
console.log(' HI: ',  import.meta.env.HI);
console.log(' VITE_HI: ',  import.meta.env.VITE_HI);
console.log(' HELLO: ',  import.meta.env.HELLO);
console.log(' VITE_HELLO: ',  import.meta.env.VITE_HELLO);
console.log(' MD: ',  import.meta.env.MD);
console.log(' VITE_MD: ',  import.meta.env.VITE_MD);

```

运行 `npm run dev` 命令，，观察浏览器打印结果

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202303101158482.webp)

由于我们执行的是`npm run dev`，所以mode的值是**development**，因此 **.env和** **.env.development**中以**VITE_** 为前缀的变量都会被识别。

## vite中使用webworker

[Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)和[SharedWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker) 是浏览器提供的多线程方式, 在vite中也支持使用, 但是需要[import.meta](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/import.meta) js模块暴露支持, 详细看[Web Workers](https://cn.vitejs.dev/guide/features.html#web-workers) 在vite的支持

### **通过构造器导入**

一个 Web Worker 可以使用 [`new Worker()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) 和 [`new SharedWorker()`](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker/SharedWorker) 导入。与 worker 后缀相比，这种语法更接近于标准，是创建 worker 的 **推荐** 方式。

```ts
const worker = new Worker(new URL('./worker.js', import.meta.url))

```

把type设置为`module`“模块”类型, 可以让webworker文件支持`import`导入

```ts
const worker = new Worker(new URL('./worker.js', import.meta.url), {
  type: 'module',
})

```

### **带有查询后缀的导入**

你可以在导入请求上添加 `?worker` 或 `?sharedworker` 查询参数来直接导入一个 web worker 脚本。默认导出会是一个自定义 worker 的构造函数：

```js
import MyWorker from './worker?worker'

const worker = new MyWorker()

```

Worker 脚本也可以使用 `import` 语句来替代 `importScripts()` —— 注意，在开发过程中，这依赖于浏览器原生支持，目前只在 Chrome 中适用，而在生产版本中，它已经被编译掉了。

默认情况下，worker 脚本将在生产构建中编译成单独的 chunk。如果你想将 worker 内联为 base64 字符串，请添加 `inline` 查询参数：

```js
import MyWorker from './worker?worker&inline'

```

如果你想要以一个 URL 的形式读取该 worker，请添加 `url` 这个 query：

```js
import MyWorker from './worker?worker&url'

```

## 生产环境去除打印

[vite-plugin-remove-console](https://github.com/xiaoxian521/vite-plugin-remove-console) Vite第三方插件可以在生产环境中移除打印和断点

* npm下载包

```bash
npm install vite-plugin-remove-console -D
```

* 在`vite.config.ts`中进行配置

```tsx
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
      // 使用去除打印和断点
    removeConsole()
  ]
});
```

## 补充ts导入资源类型

在ts文件中导入资源是需要类型的, 默认提供了一些图片(png, jpg)的资源类型, 在进行一些其他资源类型的补充

```ts
/// <reference types="vite/client" />
declare module '*.vue' {
  // import type { DefineComponent } from 'vue'
  // const component: ComponentOptions | ComponentOptions['setup']
  export default component
}
declare module '*.glsl' {
  const value: string
  export default value
}
declare module '*.glb' {
  const value: string
  export default value
}
declare module '*.gltf' {
  const value: string
  export default value
}

```

::: details 查看文件目录
![image-20230216172529775](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302161726829.png)
:::

## 配置Vscode

* [配置Vscode](./Vscode.md) 在这里查看

## 参考文献

[配置 Vite 2.0 项目启动后自动打开浏览器](https://zxuqian.cn/how-to-automatically-open-browser-in-vite-projects/)

[收下这7款插件，让你在使用 Vite 的时候如虎添翼](https://www.cnblogs.com/hooray/p/15213132.html)

[动态引入图片的几种方式](https://www.jianshu.com/p/ddfb5a8b458b)

[vite中环境变量的使用与配置（非常详细）](https://juejin.cn/post/7172012247852515335#comment)
