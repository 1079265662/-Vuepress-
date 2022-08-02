(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{600:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("Vue3 组件懒加载方法 适用图片少的大组件"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"设置组件懒加载方法-非插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设置组件懒加载方法-非插件"}},[t._v("#")]),t._v(" 设置组件懒加载方法(非插件)")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/JM58VpFCRZnhIXy.png",alt:"image-20210723223757171"}})]),t._v(" "),a("p",[a("a",{attrs:{href:"https://gitee.com/liu_kaili/Vue_little_rabbit_fresh",target:"_blank",rel:"noopener noreferrer"}},[t._v("组件懒加载方法效果使用项目"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("目的")]),t._v("：实现当组件进入可视区域在加载数据。")])]),t._v(" "),a("ul",[a("li",[t._v("我们可以使用 "),a("code",[t._v("@vueuse/core")]),t._v(" 中的 "),a("code",[t._v("useIntersectionObserver")]),t._v(" 来实现监听进入可视区域行为，但是必须配合vue3.0的组合API的方式才能实现。")]),t._v(" "),a("li",[t._v("专业术语是 钩子函数 hooks")]),t._v(" "),a("li",[a("font",{attrs:{color:"#ff3040"}},[t._v("适用于图片较少的 大组件 组件整体的懒加载")])],1)]),t._v(" "),a("blockquote",[a("p",[t._v("大致步骤：")])]),t._v(" "),a("ul",[a("li",[t._v("封装一个组件懒加载\n"),a("ul",[a("li",[t._v("通过"),a("code",[t._v("useIntersectionObserver")]),t._v(" 来实现监听进入可视区域行为 判断是否到达可视区")]),t._v(" "),a("li",[t._v("返回两个参数\n"),a("ul",[a("li",[t._v("参数1是监听的Dom元素(需要的观察容器)")]),t._v(" "),a("li",[t._v("参数2是判断 是否到达可视区 如果到达返回 true (默认是false)")])])]),t._v(" "),a("li",[t._v("可以设置返回值 "),a("code",[t._v("stop")]),t._v("停止监控")])])]),t._v(" "),a("li",[t._v("Vue组件中 导入懒加载组件方法\n"),a("ul",[a("li",[t._v("需要给组件懒加载传递api接口")]),t._v(" "),a("li",[t._v("并且接收懒加载组件返回的 参数\n"),a("ul",[a("li",[t._v("监听的Dom元素 通过"),a("code",[t._v("ref")]),t._v("绑定到需要监听的组件")]),t._v(" "),a("li",[t._v("返回的展示数据 遍历到页面上")])])])])])]),t._v(" "),a("blockquote",[a("p",[t._v("懒加载组件设置使用")])]),t._v(" "),a("ol",[a("li",[t._v("设置一个懒加载组件(js文件)\n"),a("ul",[a("li",[t._v("路径: "),a("code",[t._v("src/hooks/index.js")])]),t._v(" "),a("li",[t._v("通过"),a("code",[t._v("useIntersectionObserver")]),t._v(" 来实现监听进入可视区域行为 判断是否到达可视区")]),t._v(" "),a("li",[t._v("返回两个参数\n"),a("ul",[a("li",[t._v("参数1是监听的Dom元素(需要的观察容器)")]),t._v(" "),a("li",[t._v("参数2是判断 是否到达可视区 如果到达返回 true (默认是false)")])])]),t._v(" "),a("li",[t._v("可以设置返回值 "),a("code",[t._v("stop")]),t._v("停止监控")])])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 数据展示的懒加载 需要配合图片懒加载")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入VueUse组件useIntersectionObserver方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" useIntersectionObserver "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vueuse/core'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入Vue3的ref方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" ref "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// useIntersectionObserver 有三个参数")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 参数1 表示被监听的Dom元素(观察容器)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 参数2 监听是否到达绑定的Dom组件(布尔值类型)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 参数3 是一个对象用来配置这个方法(通常用来配置触发条件)")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("apiFn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 参数apiFn表示调用接口的方法(组件传来的api接口 用来获取展示数据)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 接收传来的懒加载数据(展示数据)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ref")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置VueUse懒加载的监听的Dom元素(观察容器)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" target "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ref")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 启动通过VueUse的懒加载操作")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" stop "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useIntersectionObserver")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" isIntersecting "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// stop是取消监听 target表示被监听的Dom元素(观察容器) isIntersecting是监听是否到达绑定的Dom组件(布尔值类型)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("isIntersecting"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果到达了Dom组件可视区 调用接口 获取展示数据")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 触发一次之后，取消继续监听")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stop")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 被监听的Dom组件已经进入可视区，此时组件传来的api接口")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apiFn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 储存到展示数据中")]),t._v("\n        result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("result\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 刚一进入可视区，就触发（默认值表示，进入一段距离之后才触发）")]),t._v("\n    threshold"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0-1范围 类似百分比(推荐设置为0 无延迟)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进行返回值")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1、target表示被监听的Dom元素(需要的观察容器)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2、result表示调用接口api返回的数据 (展示数据)")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Vue组件中 导入懒加载组件方法\n"),a("ul",[a("li",[t._v("需要给组件懒加载传递api接口")]),t._v(" "),a("li",[t._v("并且接收懒加载组件返回的 参数\n"),a("ul",[a("li",[t._v("监听的Dom元素 通过"),a("code",[t._v("ref")]),t._v("绑定到需要监听的组件")]),t._v(" "),a("li",[t._v("返回的展示数据 遍历到页面上")])])]),t._v(" "),a("li",[t._v("如果api接口需要传参 需要用箭头函数进行设置 "),a("code",[t._v("const { target, result } = useLazyData(() => findBrand(10))")])])])])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 设置被监听的Dom元素(需要的观察容器) --\x3e")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("home-product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("ref")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 需要懒加载的组件内容  --\x3e")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入api接口")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" findGoods "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@/api/home.js'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" useLazyData "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@/hooks'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'HomeProduct'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  components"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" HomePanel"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" HomeGoods "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setup")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把api接口传给组件懒加载 并且获取组件懒加载的数据 ")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取懒加载组件返回的两个值")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1、target表示被监听的Dom元素(需要的观察容器)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2、result表示调用接口apiFn返回的数据 (展示数据)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3、需要在懒加载组件传递api接口 用来获取展示数据")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useLazyData")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("findGoods"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 无需传参的设置")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 组件懒加载需要传递参数 先通过函数方法调用接口获取promise数据 到达指容器位置后 再传递服务器获取的数据")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// const { target, result } = useLazyData(() => findBrand(10)) // 需要传参的设置")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" target"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" list"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("总结：监听DOM元素进入可视区，进入后停止监听，并且调用接口获取数据")]),t._v(" "),a("ol",[a("li",[t._v("将懒加载的整体流程代码封装为Hook")]),t._v(" "),a("li",[t._v("基于hook方法实现新鲜好物和人气推荐模块的懒加载效果")])])])}),[],!1,null,null,null);s.default=e.exports}}]);