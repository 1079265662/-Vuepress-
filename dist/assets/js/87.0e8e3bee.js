(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{610:function(t,s,n){"use strict";n.r(s);var a=n(2),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),n("p",[t._v("axios响应拦截器 axios.interceptors.response.use"),n("br")])]),t._v(" "),n("h2",{attrs:{id:"响应拦截器-interceptors-response-use"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#响应拦截器-interceptors-response-use"}},[t._v("#")]),t._v(" 响应拦截器"),n("code",[t._v(".interceptors.response.use")])]),t._v(" "),n("p",[n("a",{attrs:{href:"http://www.axios-js.com/zh-cn/docs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("axios拦截器官方文档"),n("OutboundLink")],1)]),t._v(" "),n("blockquote",[n("p",[t._v("需要把数据 "),n("code",[t._v("return")]),t._v("回去")])]),t._v(" "),n("ul",[n("li",[t._v("响应拦截器的作用是数据接收响应后进行一些操作\n"),n("ul",[n("li",[n("big",[t._v(" 续签token ")])],1),t._v(" "),n("li",[t._v("判断refresh_token 是否失效 如果失效 让其重新登录")]),t._v(" "),n("li",[t._v("获取axios数据后进行加工 直接进入 data里面 "),n("code",[t._v("return response.data")])])])])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加一个响应拦截器")]),t._v("\naxios"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interceptors"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 服务器返回的200范围内的状态码都会触发该函数")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对响应数据 做一些事情")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" response"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  请求如果如果错误做的事情")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Promise"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("reject")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("blockquote",[n("p",[n("code",[t._v("例子")]),t._v("响应拦截器应用场景：处理服务器返回的数据,这样在使用数据时可以少写一层data")])]),t._v(" "),n("div",{staticClass:"language-diff extra-class"},[n("pre",{pre:!0,attrs:{class:"language-diff"}},[n("code",[t._v("// 导入 axios组件\nimport axios from 'axios'\n// 设置基准axios路径 用常量保存\nconst baseURL = 'http://api-toutiao-web.itheima.net/app/'\n// axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)\nconst instance = axios.create({\n"),n("span",{pre:!0,attrs:{class:"token unchanged"}},[n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // baseURL是axios属性 用来声明url基础路径(比对上面声明的常量)\n")]),n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" baseURL: baseURL\n")])]),t._v("})\n// 添加一个响应拦截器\ninstance.interceptors.response.use(function (response) {\n"),n("span",{pre:!0,attrs:{class:"token unchanged"}},[n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 服务器返回的200范围内的状态码都会触发该函数\n")]),n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 针对向应的数据可以做一些处理\n")]),n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" console.log('before response')\n")])]),n("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[n("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v("  // 拦截器在返回数据之前，直接获取后端的原始数据，然后再返回\n")]),n("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v("  return response.data\n")])]),t._v("}, function (error) {\n"),n("span",{pre:!0,attrs:{class:"token unchanged"}},[n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 服务器返回的200范围以外的状态码都会触发该函数\n")]),n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 针对向应的错误信息可以做一些处理\n")]),n("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),n("span",{pre:!0,attrs:{class:"token line"}},[t._v(" return Promise.reject(error)\n")])]),t._v("})\n\n")])])]),n("blockquote",[n("p",[t._v("响应式续签token")])]),t._v(" "),n("ul",[n("li",[t._v("token续签的流程:\n"),n("ul",[n("li",[t._v("换取新的token（axios创建多个实例 axios.create()）")]),t._v(" "),n("li",[t._v("新token覆盖缓存的旧的token")]),t._v(" "),n("li",[t._v("重新调用刚才的错误接口")]),t._v(" "),n("li",[t._v("refresh_token失效的处理")])])])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入 axios组件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" axios "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'axios'")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入 router组件 调用跳转方法")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" router "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'../router/index'")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 目标: (1) 续签token (2) 如果refresh_token失效 就认为登录过期 需要重新登录 try{} catch{}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 双token机制 :")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 一个 token为获取数据token(保质期短 需要续签)")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 一个是配合续签的token(不支持获取数据 只能续签 保质期长)")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 1. 续签token 设置axios.create({}) 设置axios分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ axios.create({})分支可以设置多个基础url地址")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 2. 声明一个通用的url基础地址 用于申请token的基础路径 用常量保存")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" baseURL "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://api-toutiao-web.itheima.net/app/'")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 3. axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" instance "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" axios"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ baseURL是axios属性 用来声明url基础路径")]),t._v("\n  baseURL"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" baseURL\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 封装通用的接口调用方法")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("options")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这里的返回值是Promise实例对象")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("instance")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置请求方式")]),t._v("\n    method"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("method "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置请求地址")]),t._v("\n    url"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// POST/PUT请求参数（请求体）")]),t._v("\n    data"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// GET请求参数（自动拼接到url地址中）")]),t._v("\n    params"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("params"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置请求头")]),t._v("\n    headers"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" options"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("headers\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加响应拦截器 (加工后)")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 响应截拦器是接收到数据 进行一些操作")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 请求结果返回后，先不直接导出，而是先对响应码等等进行处理，处理好后再导出给页面")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// response获取的是 axios处理后的数据")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ?  1.常用于清除axios自带data 方便操作")]),t._v("\ninstance"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("interceptors"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取数据成功时候")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 当获取数据成功时候 直接进入axios里的data")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" response"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 4. 通常要用async函数还获取新token值(省去then步骤)")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 开始进行续签token----------------------")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 5. 判断token是否失效 错误参数是error")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ error里面参数response里面status是服务器返回值401(401无权限访问)")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("401")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 6. 如果refresh_token 是有效的 续签token")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 7. 如果token失效了 申请一个新的token(根据 refresh_token)")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 8. 调用浏览器储存的token (主要用 refresh_token)")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" user "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sessionStorage"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getItem")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mytoken'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 9. 调用接口 用refresh_token 跟服务器比对 如果成功 续签token")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" info "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("axios")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 10. 设置续签token的请求方式")]),t._v("\n        method"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'put'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 11. 设置续签token的地址 基础url+token地址")]),t._v("\n        url"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" baseURL "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'v1_0/authorizations'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        headers"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 12. 设置请求头 携带refresh_token 和服务器进行比对 如果成功 续签新token")]),t._v("\n          Authorization"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Bearer '")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" user"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("refresh_token\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 13. 获取最新的token数据 覆盖user里面的原先的失效token (在data.data里面的token)")]),t._v("\n      user"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("token "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" info"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("token\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 14. 在浏览器中缓存中保存新获取的token值")]),t._v("\n      sessionStorage"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setItem")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mytoken'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 15. 重新调用刚才接口 用新token访问服务器 实现续签成功")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ error是返回错误值的参数 config是错误参数中的属性名 里面包含url地址 请求方式等 相当于重新请求服务器")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("instance")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ return 如果数据正确就返回去 不打印下面打印信息")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 16. 如果refresh_token失效 让其重新登录 账号获取新的refresh_token (状态码403)")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 17. refresh_token失效 让其返回登录页面(需要调用router 组件 利用router方法跳转)")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" router"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/login'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 让其跳转到首页 return返回数据 不让其执行下面错误提示")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Promise"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("reject")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("ul",[n("li",[t._v("Promise.resolve() Promise方法 把数据包装为promise对象并获得正确结果")]),t._v(" "),n("li",[t._v("Promise.reject(error); Promise方法 把错误数据 包含为promise对象 并且得到异常数据")])])])}),[],!1,null,null,null);s.default=e.exports}}]);