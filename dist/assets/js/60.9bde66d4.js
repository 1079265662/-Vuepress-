(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{564:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("Vue2重置data()中的数据"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"如何重置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何重置"}},[t._v("#")]),t._v(" 如何重置")]),t._v(" "),a("ul",[a("li",[t._v("通过"),a("code",[t._v("this.$options.data")]),t._v(" 获取初始状态的data 为了防止this指向错误 需要用"),a("code",[t._v("call()")]),t._v(" 来指定this指向")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("你要重置的数据域 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("你要重置的数据域\n")])])]),a("h3",{attrs:{id:"element-ui的重置表单"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#element-ui的重置表单"}},[t._v("#")]),t._v(" element ui的重置表单")]),t._v(" "),a("ul",[a("li",[t._v("通过我们通过上面方法 可以做到重置清除数据 但是如果你用了"),a("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng",target:"_blank",rel:"noopener noreferrer"}},[t._v("element 表单验证"),a("OutboundLink")],1),t._v(" 会触发表单验证的部分验证 我们需要再次使用 "),a("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng",target:"_blank",rel:"noopener noreferrer"}},[t._v("element 表单验证"),a("OutboundLink")],1),t._v(" 提供的重置方法")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("this.$resetForm('绑定form表单的ref', this.你要重置的数据域)\n")])])]),a("h2",{attrs:{id:"封装一个简易重置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#封装一个简易重置"}},[t._v("#")]),t._v(" 封装一个简易重置")]),t._v(" "),a("ul",[a("li",[t._v("如果我的重置不需要这么精确只需要都重置成"),a("code",[t._v("''")]),t._v(" 空值 那么我们可以封装成一个方法 然后在"),a("code",[t._v("main.js")]),t._v(" vue入口文件注册使用")]),t._v(" "),a("li",[t._v("通过"),a("code",[t._v("Object.keys")]),t._v(" 遍历对象中的数据 把其遍历成"),a("code",[t._v("''")]),t._v("空值")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @type {formName} String\n * @type {obj} any\n * @example 表单数据(消除表单验证提示) this.$resetForm('绑定form表单的ref', this.你要重置的数据域)\n * @example 普通数据 this.$resetForm('', this.你要重置的数据域)\n */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// formName: 表单的ref属性  obj表单的数据域")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resetForm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("formName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" obj")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 清空表单")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("formName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("formName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resetFields")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 清空数据域")]),t._v("\n    Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("keys")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("key")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// main.js 入口文件注册")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 清空表单")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" resetForm "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@/utils/resrtForm'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$resetForm "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" resetForm\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);