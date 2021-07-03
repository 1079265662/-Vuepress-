(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{539:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("Vue插件 绝对时间插件 和 图片失效 制作方法 "),a("br")])]),t._v(" "),a("h2",{attrs:{id:"vue的插件机制-install"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue的插件机制-install"}},[t._v("#")]),t._v(" Vue的插件机制 "),a("code",[t._v("install")])]),t._v(" "),a("p",[a("a",{attrs:{href:"https://v3.cn.vuejs.org/guide/plugins.html#%E6%8F%92%E4%BB%B6",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue插件介绍"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("目标：熟悉Vue的插件机制（针对Vue核心规则的一种扩展机制）")])]),t._v(" "),a("p",[t._v("只要用"),a("code",[t._v("Vue.use()")]),t._v("导入的 都是Vue插件扩展")]),t._v(" "),a("ul",[a("li",[a("font",{attrs:{color:"#ff3040"}},[t._v("Vue.use(参数1,参数2)")]),t._v(" "),a("ul",[a("li",[t._v("参数1 是需要实例化的插件名称")]),t._v(" "),a("li",[t._v("参数2 是定制插件内部的信息(插件接收的数据 传递给install的options参数 可设置为固定值)")])])],1)]),t._v(" "),a("blockquote",[a("p",[t._v("第一步 定义插件（Vue插件就是一个对象，对象中必须有一个"),a("code",[t._v("install")]),t._v("方法）")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Vue插件就是一个对象，对象中必须有一个install方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("options")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 该方法的形参就是Vue构造函数 ")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 给Vue的实例化对象里面 添加$abc方法")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$abc "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("第二步 导入并配置插件(在总组件导入文件设置)")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入自定义插件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" MyPlugins "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@/utils/plugins.js'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入完毕后 需要Vue.use() 把组件添加到Vue实例化对象里")]),t._v("\nVue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("MyPlugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'这里可以导入一些数据'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 配置和定义插件时候 支持配置选项")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("第三步 在需要调用的Vue组件里 使用")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 组件中，可以用如下方式访问实例属性 ")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 直接调用导入的Vue实例化方法即可 $abc")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$abc\n")])])]),a("h2",{attrs:{id:"绝对时间插件制作例-基于dayjs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#绝对时间插件制作例-基于dayjs"}},[t._v("#")]),t._v(" 绝对时间插件制作例 "),a("code",[t._v("基于dayjs")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://tva4.sinaimg.cn/large/005INI3Xly8gs44pcc3kuj30bo023748.jpg",alt:"Snipaste_2021-07-03_22-22-49"}})]),t._v(" "),a("p",[a("a",{attrs:{href:"https://dayjs.fenxianglu.cn/category/plugin.html#%E7%9B%B8%E5%AF%B9%E6%97%B6%E9%97%B4",target:"_blank",rel:"noopener noreferrer"}},[t._v("dayjs的相对时间官网"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://v3.cn.vuejs.org/guide/plugins.html#%E6%8F%92%E4%BB%B6",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue插件介绍官网"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("目标：自定义过滤器格式化时间 (相当于时间)")]),t._v(" "),a("p",[t._v("安装: npm install dayjs --save")])]),t._v(" "),a("p",[t._v("通过 dayjs提供的包 制作时间过滤器插件")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("Vue.use()")]),t._v("实例化 创建一个过滤器插件")])]),t._v(" "),a("blockquote",[a("p",[t._v("在工具文件夹 "),a("code",[t._v("utils文件夹 里面 plugins.js")]),t._v(" 创建一个时间过滤器插件"),a("code",[t._v("filter")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 自定义Vue插件的文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Vue插件就是一个对象 对象中必须包含一个install方法")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入时间过滤器的插件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" dayjs "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dayjs'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入时间过滤器的 相对时间模板")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" relativeTime "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dayjs/plugin/relativeTime'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入国际化(中文)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dayjs/locale/zh-cn'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把 相对时间 和 时间过滤器插件 进行关联")]),t._v("\ndayjs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("extend")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("relativeTime"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置一个时间过滤器")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 扩展日期格式化过滤器 添加一个filter过滤器 formatTime是过滤名称")]),t._v("\n    Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'formatTime'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("time")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 基于中文的方式计算time的相对时间")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dayjs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("locale")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'zh-cn'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// dayjs方法.中文显示.格式化时间")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("blockquote",[a("p",[t._v("在项目入口文件 导入制作的时间插件 "),a("code",[t._v("main.js")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//~ 导入时间过滤器功能")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" time "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./utils/plugins'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 导入 自定义事件过滤器")]),t._v("\nVue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("在需要的Vue文件 使用过滤器 过滤器使用"),a("code",[t._v("|")]),t._v(" "),a("code",[t._v("main.vue")])])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("span")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{item.pubdate|formatTime}}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("span")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"普通格式化时间制作例-基于-moment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#普通格式化时间制作例-基于-moment"}},[t._v("#")]),t._v(" 普通格式化时间制作例 "),a("code",[t._v("基于 moment")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://tva4.sinaimg.cn/large/005INI3Xly8gs44xqw7t8j304b05rt8l.jpg",alt:"image-20210703223417137"}})]),t._v(" "),a("p",[a("a",{attrs:{href:"http://momentjs.cn/",target:"_blank",rel:"noopener noreferrer"}},[t._v("moment官方网站"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("安装: npm install moment "),a("em",[t._v("--save")])]),t._v(" "),a("p",[t._v("目标: 设置全局组件 绑定在全局过滤器上 实现绑定的时间格式化")])]),t._v(" "),a("p",[t._v("通过 moment提供的第三方包实现")]),t._v(" "),a("ul",[a("li",[t._v("通过"),a("code",[t._v("Vue.filter()")]),t._v(" 方法全局绑定过滤器")])]),t._v(" "),a("blockquote",[a("p",[a("strong",[t._v("在工具文件夹")]),t._v(" "),a("strong",[a("code",[t._v("utils文件夹 里面 plugins.js")])]),t._v(" 创建一个时间过滤器插件"),a("code",[t._v("filter")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入 moment 时间过滤器第三方包")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" moment "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'moment'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 定义一个Vue插件并且导出")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 设置全局过滤器 格式化时间 Vue.filter()是绑定全局过滤器")]),t._v("\n    Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'formatTime'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过第三方包 moment 设置格式化时间 调用时候 |formatTime")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// yyyy-MM-DD 时间格式是 年-月-日 ")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("moment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("format")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'yyyy-MM-DD'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("在项目入口文件 导入制作的时间插件 "),a("code",[t._v("main.js")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//~ 导入时间过滤器功能")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" time "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./utils/plugins'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 导入 自定义事件过滤器")]),t._v("\nVue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("在需要的Vue文件 使用过滤器 过滤器使用"),a("code",[t._v("|")]),t._v(" "),a("code",[t._v("main.vue")])])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("span")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{item.pubdate|formatTime}}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("span")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"制作头像失效问题插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#制作头像失效问题插件"}},[t._v("#")]),t._v(" 制作头像失效问题插件")]),t._v(" "),a("br"),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("目标")]),t._v("：处理图片加载失败时的默认显示效果 如果默认图片加载失败 用统一图片代替")]),t._v(" "),a("p",[a("code",[t._v("原理")]),t._v(":  这里用到了Vue的插件机制 "),a("code",[t._v("install")]),t._v(" 和 自定义Vue方法 "),a("code",[t._v("Vue.directive")])])]),t._v(" "),a("ul",[a("li",[t._v("在入口文件中导入Vue插件 并且实例化Vue插件 "),a("code",[t._v("main.js")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入自定义插件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" MyPlugins "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@/utils/plugins.js'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 配置自定义插件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 参数1 是需要实例化的插件名称")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 参数2 是定制插件内部的信息(插件接收的数据 传递给install的options参数 可设置为固定值)")]),t._v("\nVue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("MyPlugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\"https://tva2.sinaimg.cn/large/005INI3Xly8grusluz3ruj30b40b4wfn.jpg\"'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("ul",[a("li",[t._v("封装设置Vue插件 "),a("code",[t._v("utils文件夹 plugins.js")]),t._v(" "),a("ul",[a("li",[t._v("使用到了自定义指令"),a("code",[t._v("Vue.directive")]),t._v("  来检测图片加载失败清空\n"),a("ul",[a("li",[t._v("el:指令绑定的元素")]),t._v(" "),a("li",[t._v("bindings表示指令相关的配置信息 "),a("font",{attrs:{color:"#ff3040"}},[t._v("常用于动态绑定 "),a("code",[t._v(":")])])],1)])]),t._v(" "),a("li",[a("code",[t._v("onerror")]),t._v("是检测原始是否加载失败 如果失败就执行\n"),a("ul",[a("li",[t._v("当图片有地址 但是地址没有加载成功的时候 会报错 会触"),a("code",[t._v("onerror")])])])]),t._v(" "),a("li",[a("font",{attrs:{color:"#ff3040"}},[t._v("指令的名字在定义时候不需要加v-，在是用的时候才需要加v-")])],1)])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 定义一个Vue插件并导出")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Vue.use(MyPlugins, 'defaultImg.png')")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Vue.use的参数二传递给install方法的第二个参数options")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 扩展自定义指令")]),t._v("\n    Vue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("directive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'imgerror'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("inserted")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("el"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" bindings")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// el表示指令绑定的元素")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// bindings表示指令相关的配置信息")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("bindings"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 图片加载成功")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// el.onload = function () {}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 图片加载失败")]),t._v("\n        el"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onerror")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把加载失败的图片路径修改为指定的默认路径")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果bindings.value有值就用它，否则用后面的options")]),t._v("\n          el"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" bindings"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" options\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("br"),t._v(" "),a("ul",[a("li",[t._v("Vue文件 "),a("code",[t._v("template")]),t._v("模板 使用该插件\n"),a("ul",[a("li",[t._v("使用指令, 这里图片如果是用本地图片, 需要导入, 如果是完整地址的网图, 直接赋值即可")]),t._v(" "),a("li",[t._v("使用自定义Vue指令 需要 "),a("code",[t._v("v-自定义指令名称")]),t._v("这样写法")])])])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- :scr动态绑定img地址 --\x3e")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-imgerror")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("defaultImg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("avatar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("user-avatar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ul",[a("li",[t._v("Vue文件 "),a("code",[t._v("script")]),t._v("脚本 设置该插件\n"),a("ul",[a("li",[t._v("设置图片的动态的地址 "),a("code",[t._v("data()")]),t._v("数据储存 中设置")])])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 基于ES6导入单独的图片也是可以的(导入图片设置)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Img "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@/assets/common/head.jpg'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    defaultImg"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Img\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 或者直接完整地址的网图赋值")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 也可以用base64位 和 http图片")]),t._v("\n    defaultImg"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2344451607,2404623174&fm=111&gp=0.jpg'")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),a("p",[t._v("总结：")]),t._v(" "),a("ol",[a("li",[t._v("自定义指令的基本规则")]),t._v(" "),a("li",[t._v("插件基本使用规则：先定义，再导入并配置（支持选项）")]),t._v(" "),a("li",[t._v("配置插件时，可以传递options选项")]),t._v(" "),a("li",[t._v("扩展图片加载的自定义指令（原生dom事件 img.onerror 表示图片加载失败）")]),t._v(" "),a("li",[t._v("使用自定义指令")])])])}),[],!1,null,null,null);s.default=e.exports}}]);