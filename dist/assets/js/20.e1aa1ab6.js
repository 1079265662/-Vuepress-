(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{546:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("Vue登录功能完善 (访问权限功能)"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"全局路由导航守卫-路由文件-index-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#全局路由导航守卫-路由文件-index-js"}},[t._v("#")]),t._v(" 全局路由导航守卫 "),a("code",[t._v("路由文件 index.js")])]),t._v(" "),a("blockquote",[a("p",[t._v("目标：用户没有登录页面 不让其访问 主页 等内容 让其跳转到登录页 "),a("big",[t._v("(判断token值)")])],1)]),t._v(" "),a("ul",[a("li",[t._v("Vue-router 提供方法")]),t._v(" "),a("li",[t._v("全局导航守卫需要设置在 全局路由组件中 控制某些全局跳转")]),t._v(" "),a("li",[t._v("全局导航守卫有三个参数\n"),a("ul",[a("li",[t._v("to 表示要跳转到哪里去")]),t._v(" "),a("li",[t._v("from 表示从哪里跳转过来的")]),t._v(" "),a("li",[t._v("next 表示具体跳转到哪里 如果不调用 无法看到组件")]),t._v(" "),a("li",[a("big",[t._v("注意: ")]),t._v("必须要设置在路由映射生效之后 导出路由之前")],1)])])]),t._v(" "),a("blockquote",[a("p",[t._v("全局导航守卫  路由文件夹"),a("code",[t._v("router")]),t._v("里面 "),a("code",[t._v("index.js")])])]),t._v(" "),a("ol",[a("li",[t._v("判断用户是否登录 (判断其token值) 如果没登录 转到登录页\n"),a("ul",[a("li",[t._v("判断需要两个条件\n"),a("ul",[a("li",[t._v("需要判断用户是否存在 token值 不存在跳转到登录页面 "),a("code",[t._v("next('/路径')")])]),t._v(" "),a("li",[t._v("判断是否处于登录页 如果在登录页 无需跳转"),a("code",[t._v("to.path")]),t._v("是判断是否处于某个页面")])])])])]),t._v(" "),a("li",[t._v("如果已经登录不管直接 "),a("code",[t._v("next()")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置全局导航守卫(路由跳转到目标组件之前 先经过导航守卫进行效验)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断其token值 如果不存在 转到登录页面 如果已经在登录页面 则判断不需要跳转")]),t._v("\nrouter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("beforeEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("to"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// to 表示要跳转到哪里去")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// from 表示从哪里跳转过来的")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// next 表示具体跳转到哪里 如果不调用 无法看到组件")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断用户是否已经登录")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1. 查询用户是否已经登录 把用户token值转换为字符串 (两个token 临时token 和 续费token)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" userToken "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sessionStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getItem")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mytoken'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2. 获取字符串整合token 和 两个token的值 (两个token 临时token 和 续费token)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" flag "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" userToken "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" userToken"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("token "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" userToken"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("refresh_token"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断是否存在token值 存在返回true")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3. 进行token判断 是否存在token 和 是否处于登录页 to.path是判断是否处于某个页面")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("flag "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" to"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("path "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/Login'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 4. 如果没登录 进入判断进行跳转")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/Login'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 5. 如果已经登录 直接next()即可")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("总结：")]),t._v(" "),a("ol",[a("li",[t._v("前置全局导航守卫：拦截所有的路由请求")]),t._v(" "),a("li",[t._v("如果登录了，就正常跳转到组件，否则调回到登录组件")])])]),t._v(" "),a("h3",{attrs:{id:"导航守卫工作流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导航守卫工作流程"}},[t._v("#")]),t._v(" 导航守卫工作流程")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://i.loli.net/2021/06/05/n5NRQfYb9pK36rZ.png",alt:"image-20210604171827880"}})]),t._v(" "),a("h2",{attrs:{id:"调用接口获取频道数据-channel-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#调用接口获取频道数据-channel-js"}},[t._v("#")]),t._v(" 调用接口获取频道数据 "),a("code",[t._v("channel.js")])]),t._v(" "),a("blockquote",[a("p",[t._v("目标：如果用户登录 获取频道列表数据，用于测试请求拦截器和token有效期")])]),t._v(" "),a("ul",[a("li",[t._v("在"),a("code",[t._v("api文件夹 新建 channel.js")]),t._v(" 单独路由配置文件下")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取频道列表数据，用于测试请求拦截器和token有效期")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入封装的接口组件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" request "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../utils/request'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? 获取用户的频道数据(如果没有登录，返回默认的频道数据；如果登录了，就返回该用户自己的数据)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("getAllChannels")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? 携带请求方式 请求地址 获取相应用户的登录频道数据(根据token判断不同用户)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("request")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    method"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'get'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    url"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'v1_0/user/channels'")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("ul",[a("li",[t._v("调用接口获取频道数据\n"),a("ul",[a("li",[a("code",[t._v("main文件夹 main.vue")])])])])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[t._v("// 文件的路径 src/views/main/index.vue\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" getAllChannels "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@/api/channel.js'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Home'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("created")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAllChannels")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"设置axios获取数据-create-分支-request-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设置axios获取数据-create-分支-request-js"}},[t._v("#")]),t._v(" 设置axios获取数据 .create 分支 "),a("code",[t._v("request.js")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("使用axios.create({})")]),t._v(" 设置axios方法分支\n"),a("ul",[a("li",[t._v("设置分支可以单独设置url基础地址 方便管理调用")]),t._v(" "),a("li",[t._v("单独用常量 设置url基础地址 在"),a("code",[t._v("axios.create({})")]),t._v("里面和"),a("code",[t._v("baseURL")]),t._v("属性名比对\n"),a("ul",[a("li",[t._v("单独常量设置地址 单独设置地址拼接")])])])])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入 axios组件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" axios "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'axios'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置基准axios路径 用常量保存")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" baseURL "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://api-toutiao-web.itheima.net/app/'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" instance "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" axios"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)")]),t._v("\n  baseURL"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" baseURL\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 封装通用的接口调用方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("options")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这里的返回值是Promise实例对象")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// return 返回数据 instance是声明的axios分支方法")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("instance")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置请求方式")]),t._v("\n    method"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("method "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置请求地址")]),t._v("\n    url"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// POST/PUT请求参数（请求体）")]),t._v("\n    data"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// GET请求参数（自动拼接到url地址中）")]),t._v("\n    params"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("params"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置请求头(一般用于跨域问题 和 传输token)")]),t._v("\n    headers"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("headers\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("h2",{attrs:{id:"添加请求拦截器-请求头统一携带token-request-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加请求拦截器-请求头统一携带token-request-js"}},[t._v("#")]),t._v(" 添加请求拦截器 请求头统一携带token "),a("code",[t._v("request.js")])]),t._v(" "),a("blockquote",[a("p",[t._v("需要把数据 "),a("code",[t._v("return回去")])])]),t._v(" "),a("ul",[a("li",[t._v("请求拦截器的作用是 在发送请求之前 进行一些操作\n"),a("ul",[a("li",[t._v("在每个请求体里面加上token值 (登录后用户权限信息)")])])])]),t._v(" "),a("blockquote",[a("p",[t._v("发送请求前 判断是否登录(有token) 如果登录 携带请求头 发送给服务器 "),a("code",[t._v("utils文件夹 request.js")]),t._v(" 路由工具文件下")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入 axios组件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" axios "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'axios'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置基准axios路径 用常量保存")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" baseURL "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://api-toutiao-web.itheima.net/app/'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" instance "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" axios"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)")]),t._v("\n  baseURL"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" baseURL\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加一个请求拦截器 (发送数据 进行处理)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 请求截拦器的作用是再请求发送前 进行一些操作 例如在每个请求体上加上token 获取登录权限后的数据")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// config 是数据发送请求的属性")]),t._v("\ninstance"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interceptors"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("config")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 0.发送请求前 添加响应的token值 获取相应的登录数据")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 1. 读取用户存在浏览器的token值 (需要转换成字符串)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sessionStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getItem")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mytoken'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 如果没有token 赋值为null")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 2. 进行判断 如果存在token值 则添加相应的token值(三层判断) 是否存在 老token 新token")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("token "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("refresh_token"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 3. 如果存在token 登录成功 统一添加请求头携带其相应token(携带老token)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! config是发送的数据 headers是axios请求头Authorization是后端接口判断token的属性名")]),t._v("\n    config"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("headers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Authorization "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Bearer '")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("token "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'Bearer '是后端声明的token前置")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" config\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("error")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 请求如果出错了可以做一些事情")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Promise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"添加响应拦截器-统一处理axios返回数据-request-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加响应拦截器-统一处理axios返回数据-request-js"}},[t._v("#")]),t._v(" 添加响应拦截器 统一处理axios返回数据 "),a("code",[t._v("request.js")])]),t._v(" "),a("blockquote",[a("p",[t._v("需要把数据 "),a("code",[t._v("return回去")])])]),t._v(" "),a("ul",[a("li",[t._v("响应拦截器的作用是数据接收响应后进行一些操作\n"),a("ul",[a("li",[a("big",[t._v("续签token")])],1),t._v(" "),a("li",[t._v("判断refresh_token 是否失效 如果失效 让其重新登录")]),t._v(" "),a("li",[t._v("获取axios数据后进行加工 直接进入 data里面 "),a("code",[t._v("return response.data")])])])])]),t._v(" "),a("blockquote",[a("p",[t._v("响应拦截器应用场景：处理服务器返回的数据   "),a("code",[t._v("utils文件夹 request.js")]),t._v(" 路由工具文件下")])]),t._v(" "),a("ul",[a("li",[t._v("这样在使用数据时可以少写一层data")])]),t._v(" "),a("div",{staticClass:"language-diff extra-class"},[a("pre",{pre:!0,attrs:{class:"language-diff"}},[a("code",[t._v("// 导入 axios组件\nimport axios from 'axios'\n// 设置基准axios路径 用常量保存\nconst baseURL = 'http://api-toutiao-web.itheima.net/app/'\n// axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)\nconst instance = axios.create({\n"),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" baseURL: baseURL\n")])]),t._v("})\n// 添加一个响应拦截器\ninstance.interceptors.response.use(function (response) {\n"),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 服务器返回的200范围内的状态码都会触发该函数\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 针对向应的数据可以做一些处理\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" console.log('before response')\n")])]),a("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("  // 拦截器在返回数据之前，直接获取后端的原始数据，然后再返回\n")]),a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("  return response.data\n")])]),t._v("}, function (error) {\n"),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 服务器返回的200范围以外的状态码都会触发该函数\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 针对向应的错误信息可以做一些处理\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" return Promise.reject(error)\n")])]),t._v("})\n\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);