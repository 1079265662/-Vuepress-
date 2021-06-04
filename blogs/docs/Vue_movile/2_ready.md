---
title: 2. Vue脚手架自定义
date: 2021-06-02
cover: https://i.loli.net/2021/05/30/mnhTAar3tc4gLdK.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目
---

::: tip 介绍

第二步 黑马移动端初始化<br>
:::

<!-- more -->

项目初始化

> 首先，黑马头条移动端是一个IT资讯移动**web应用**，有着和今日头条一样的资讯浏览体验。
>
> 主要功能：资讯列表、标签页切换，文章举报，频道管理、离线频道，文章详情、阅读记忆，关注功能、点赞功能、评论功能、回复评论、搜索功能、登录功能、个人中心、编辑资料、小智同学。

> 总结：移动Web项目（网站）；App(Android(Java),IOS(Swift))/React Native / Flutter(Dart) / Uniapp



## 项目技术选型

- 项目业务功能分析
- 项目技术栈
  - vue 核心vue
  - vue-router 路由插件
  - axios 请求插件
  - json-bigint 最大安全数值处理
  - vant 移动组件库(有赞)
  - amfe-flexible  rem适配
- 开发依赖
  - babel  ES转换器
  - less  css预处理器
  - postcss  css后处理器
  - vue-cli  vue项目脚手架



## 项目初始化

> 目标：基于Vue脚手架初始化项目

```bash
vue create hm-toutiao-mobile-128
```

> 总结：参考详细文档说明【03-resource/脚手架手动创建项目】
>
> 注意：vue-router、less、eslint + standard

- 分析每一个文件的作用和具体代码的细节

> 总结：配置路由映射时，可以添加name属性给路径起一个别名，跳转路由时可以使用。

## 调整项目目录结构

> 目标：根据功能模块调整项目的目录结构

```sh
├─api               #接口函数（封装接口调用相关模块）
├─assets            #静态资源（静态资源）
├─components        #公用组件（被重复利用的组件）
├─styles            #less代码
├─utils             #工具模块（封装一些通用的js模块）
└─views             #路由页面
    ├─home          #首页模块
    ├─video         #视频模块
    ├─question      #问答模块
    ├─user          #用户模块
    └─Layout.vue    #公用布局
├─App.vue           #根组件
├─router            #路由文件
|-main.js           #项目的入口文件
```

## 项目代码git管理

> 目标：基于git管理项目代码

1. 创建远程仓库

   - 图形界面创建

2. 提交代码

   - git init 
   - git add .

   - git commit -m '初始化版本'

3. 推送到远程仓库

   - git remote add origin https://gitee.com/wzj1031/hm-toutiao-mobile-128.git
   - git push -u origin master

> 如果希望提交空目录，需要在目录中创建一个.gitkeep文件



## 代码规范ESLint配置

### 介绍

> 无规矩不成方圆（正规团队对项目的代码是有严格规范）
>
> 代码的规范谁来保证？人工方式靠谱吗，不靠谱，所以需要工具

- [ESLint](https://cn.eslint.org/) 是什么？是验证代码规范的工具（如果你写的代码不符合规范，它会告诉你哪里写错了），ESLint本身提供了一些规范，ESLint提供的这些规范我们做项目是全部遵循吗（大概率是遵循一部分），因此，就有一个问题：如果不同的团队单独指定规范的话，其实也挺乱的。所以说应该有一个通用的约定。
- [standard](https://standardjs.com/readme-zhcn.html) 是相对比较客观的一套通用规则，如果很多团队都采用，那么规范就统一了
- ESLint负责规则验证，并且本身也提供了一些默认的规则，但是并不是统一的标准，需要自己定制
- ESLint（法官）也可以基于standard（法律）这套相对标准的规则进行验证。

### 常见语法规则

- 使用两个字符实现代码缩进
- 字符串使用单引号
- 不再有冗余的变量（变量一旦定义必须使用）
- 结尾无分号
- 行首不要以，开头
- 关键字后面添加空格
- 函数名后加空格
- 坚持使用全等===，放弃==
- ~~一定要处理Node.js中的err~~
- ~~使用浏览器全局变量添加window~~
- ......

> 关于代码的语法的修改，可以利用lint命令：`npm run lint`
>
> 这个命令可以自动规范化代码的风格。
>
> 如何知道报错的原因？赋值报错的特征字符串（错误信息结尾），去[stardust](https://standardjs.com/rules-zhcn.html#javascript-standard-style)官方网站插值即可



### 自定义规则 

> `npm run lint` 必须符合条件才能修改

- .eslintrc.js配置文件可以配置启用或者禁用那些规则
- 关于规则的取值
  - off/0 表示关闭规则的验证
  - warn/1 表示出错后进行警告（在命令行出现，不影响页面功能）
  - error/2 表示出错后页面进行错误提示，无法进一步开发

```json
{
    "rules": {
        'semi': 'warn',
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

> 总结  "quotes": ["error", "double"]表示，必须使用双引号，否则报错
>
> double 表示双引号
>
> single 表示单引号
>
> blacktick 表示反引号

- 规则的值如果是数组，那么数组两项的作用
  - 第一项作用：规则的[验证级别](https://cn.eslint.org/docs/user-guide/getting-started)
  - 第二项作用：规则的配置选项，详细的规则选项参考[ESLint](https://standardjs.com/rules-zhcn.html#javascript-standard-style)

> 1、Vue脚手架项目提供了代码的规则验证
> 谁负责规则的验证？ESLint
> 谁负责提供规则？Standard
> ESLint基于Standard进行验证
> 2、如果我们写的代码不符合规则，就会报错
> 3、所有需要解决错误才能继续开发
> 4、但是人工方式解决错误有点儿麻烦
> 怎么人工解决错误？通过查看页面的提示（行号；错误特征字符串（错误信息的后面）），如果认识英文，那么直接就能够理解错误，如果理解不了英文，就把特征字符串复制，然后去standard官方网站（https://standardjs.com/rules-zhcn.html#javascript-standard-style）查询即可
> 5、所有可以借助命令自动解决`npm run lint`
> 6、如果希望自己再定义一下默认的规则，那么可以修改配置文件.eslintrc
> 如何修改？修改rules选项即可

### vscode配置

> 我们希望vscode帮我们解决代码规范问题（如果我们写的代码不规范，那么vscode帮我们修复问题）
>
> 脚手架的代码规范和vscode的代码规范示范一致？不一致
>
> 如何解决？可以修改脚手架的eslint配置让他迎合vscode；修改vscode配置去迎合脚手架。

- 需要安装两个插件
  - ESLint 负责验证规则
  - Vetur 负责提供vue的语法规则

```json
// # 每次保存的时候自动格式化 
"editor.formatOnSave": true,
// # 每次保存的时候将代码按eslint格式进行修复
// "eslint.autoFixOnSave": true, (已经过期)
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
```

- vue代码风格配置
  - Vue代码风格依赖了 [Prettier](https://prettier.io/docs/en/options.html#trailing-commas)

```json
"vetur.validation.template": true,
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
    "prettier": {
        "semi": false, //不加分号
        "singleQuote": true, //用单引号
        "trailingComma": "none",
        "bracketSpacing": true,
        "tabWidth": 2,
        "arrowParens": "avoid"
    },
    "js-beautify-html": {
        // "wrap_line_length": 250, //换行长度
        "wrap_attributes": "auto", //属性换行 force-aligned
        // "end_with_newline": false
    }
},
```

> 总结：
>
> 1. 基于Vscode配置可以自动格式化代码并且自动修复代码的不规范的格式
> 2. 如果vscode格式的结果不符合要求，可以修改Vscode配置，也可以修改项目中.eslintrc配置文件

## Vant基本使用

> 目标：属性Vant组件库的基本使用
>
> [vant](https://youzan.github.io/vant/#/zh-CN/)

- 安装依赖包

```bash
npm i vant
```

- 导入包和样式 `main.js`设置

```js
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
```

- 使用组件

```vue
<van-button type="primary">主要按钮</van-button>
```

> 以上做法是完整导入，在项目开发阶段使用，配置方便节省时间，将来上线的时候可以使用按需导入。



## 屏幕适配配置 `移动端`

> 屏幕适配：页面在不同的尺寸的手机中显示相似的效果（等比缩放）

- 百分比（自适应宽度，不处理高度）
- 自适应（自适应宽度，不处理高度）
- 响应式（多端适配：PC端、移动端、IPAD端。。。。）
- Rem适配：针对移动适配（页面在不同的尺寸的手机上等比缩放-包括宽度和高度）

> 1. ==UI负责给一个移动端设计稿 750px==
> 2. font-size = 100px = 1rem
> 3. 设计稿图书 123px * 62px 
> 4. 页面中样式写法 1.23/2rem * 0.62/2rem
> 5. iphone6=屏幕的宽度w/font-size基准值p=固定值g=3.75rem
> 6. 其他手机=屏幕的宽度w1/font-size基准值p1=固定值g=3.75rem
> 7. w1/p1 = w/p ，根据公式计算p1值，给当前手机的页面的html元素的font-size设置基准值即可

> Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具
>
> [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem
>
> [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

- 安装依赖包
  - postcss-pxtorem (把px单位转换为rem单位)
  - lib-flexable () (设置html的font-size)

```bash
npm i postcss-pxtorem@5.1.1 -D
// 如果按照5.1.1版本后依然报错，按照提示安装如下包即可
npm install @vue/composition-api
// -----------------------------------------------------------
npm i amfe-flexible -S
```

### 配置postcss.config.js `需要手动创建` `350px适配`

- rootValue 表示以该值作为rem的基准值（vant最佳显示状态）
- propList那些css属性的像素值转换为rem单位

```js
module.exports = {
  plugins: {
    // 控制样式属性前面自动添加前缀
    autoprefixer: {},
    'postcss-pxtorem': {
      // html的font-size规定为37.5px
      // 为什么是37.5？因为iPhone6的尺寸是375px
      rootValue: 37.5,
        
      // 控制那些样式的属性需要转换
      propList: ['*'],
    },
  },
}
```

> 总结：postcss-pxtorem负责把px单位转换为rem单位

- 导入  `main.js`设置

```js
// 导入 html跟 font-size的数值
import 'amfe-flexible'
```

> 总结：amfe-flexible用于动态计算当前页面的HTML的font-size基准值并且动态设置
>
> 1. rootValue 是转换px的基准值，参考设备iPhone6，设备宽度375px。（Vant的设计稿是375）
> 2. flexible 在iPhone6设备设置的  html--->font-size 也为37.5px 。

### 配置postcss.config.js `需要手动创建` `750px适配`

>Vant 基础的适配是 375px 一般设计稿是750px 如果改成750px 需要格外设置

```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // HTML的font-size基准值（不负责设置这个基准值）
      // 用于postcss-pxtorem插件把px转换为rem
      // rootValue: 37.5,
      rootValue ({ file }) {
        // file参数表示Vant组件库样式文件的路径 import 'vant/lib/index.css'
        // vant设计稿是375px
        // 标准的设计稿应该是750px
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 规定哪些属性需要转换成rem
      propList: ['*']
    }
  }
}
```

>总结：
>
>1. vant设计稿是375px
>2. 标准的设计稿应该是750px
>3. 通过判断样式文件的特征区分到底是Vant内部样式，还是我们自定义样式，根据样式文件的区别设置不同的基准值即可。

##  总结

- 熟悉项目的基本业务
- 初始化项目
- 代码的规范化处理
  - ESLint 负责验证代码的规范
  - Standard 提供校验规则
  - 可以使用npm run lint实现自动修复格式问题
  - 基于Vscode自动格式化并处理规范问题
- Vant基本使用
  - 先安装包，然后安装官方文档练习使用相关组件用法
- 屏幕适配的配置
  - 屏幕是否原理：基于rem的适配原理
  - 基于Vant提供的架手架环境配置适配方案
    - 自动把px转换为rem
    - 自动计算HTML的font-size的基准值并动态设置
    - 兼容标准750设计稿用法
