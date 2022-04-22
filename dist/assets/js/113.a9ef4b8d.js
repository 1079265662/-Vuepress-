(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{614:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("记录和解决框架之间的问题 让Vue3兼容three.js"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"问题由来"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题由来"}},[t._v("#")]),t._v(" 问题由来")]),t._v(" "),a("ul",[a("li",[t._v("刚学three.js 我想把我的"),a("code",[t._v("Scene()场景对象")]),t._v(" 和 "),a("code",[t._v("Mesh()网格模型对象")]),t._v(" 放入Vue3的data()中(准确的是"),a("code",[t._v("reactive()")]),t._v("中) 这样我可以在多个方法中进行调用 当我赋值完毕后 在方法中调用 出现了以下报错")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Uncaught (in promise) TypeError: 'get' on proxy: property 'modelViewMatrix' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '#<Matrix4>' but got '[object Object]')\n")])])]),a("h2",{attrs:{id:"问题解析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题解析"}},[t._v("#")]),t._v(" 问题解析")]),t._v(" "),a("ul",[a("li",[t._v("第一感觉不是赋值操作的问题 可能是Vue3"),a("code",[t._v("proxy")]),t._v("对象代理的问题 我们知道Vue2是通过"),a("code",[t._v("defineproperty")]),t._v("的方式 实现的双向绑定(响应式数据) Vue3则采取更先进的es6方法"),a("code",[t._v("proxy")]),t._v(" 很可能是Vue3的响应式数据 和 three.js的相关数据结构 出现了冲突")]),t._v(" "),a("li",[t._v("通过我查询资料后 在该"),a("a",{attrs:{href:"https://cdmana.com/2022/03/202203041738342602.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("文章"),a("OutboundLink")],1),t._v(" 验证了我的猜想 那他的决绝方法是 在three.js源码中进行修改 我认为这种修改方式不可取 这种npm包的修改配置 是一种高危且无用的方式 再次npm后 你修改的内容会丢失")]),t._v(" "),a("li",[t._v("进一步的查询后在"),a("a",{attrs:{href:"https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3#comment116149963_65693108",target:"_blank",rel:"noopener noreferrer"}},[t._v("stackoverflow论坛中"),a("OutboundLink")],1),t._v(" 我发现实际上"),a("code",[t._v("Scene()场景对象")]),t._v(" 和 "),a("code",[t._v("Mesh()网格模型对象")]),t._v("是一种数据结构 不需要双向绑定 也不需要响应式")]),t._v(" "),a("li",[t._v("在该文章的最后得出最佳答案 使用Vue的"),a("a",{attrs:{href:"https://staging-cn.vuejs.org/api/reactivity-advanced.html#toraw",target:"_blank",rel:"noopener noreferrer"}},[t._v("toRaw()方法"),a("OutboundLink")],1),t._v("  这个方法可以让我们储存的"),a("code",[t._v("proxy")]),t._v("对象 取消其代理特性 转换成普通对象 当然 也就失去了Vue3的响应式哦")]),t._v(" "),a("li",[t._v("还有一种 也是最暴力 最简单的方式 就是声明全局变量 不在Vue3中声明 感觉有点不优雅 不是很想用")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/ca4567224a4548528842b6fd1a0c8633.png",alt:"在这里插入图片描述"}})]),t._v(" "),a("h2",{attrs:{id:"问题解决"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题解决"}},[t._v("#")]),t._v(" 问题解决")]),t._v(" "),a("ul",[a("li",[t._v("我们先通过"),a("code",[t._v("reactive()")]),t._v("声明储存 然后通过"),a("code",[t._v("toRaw()")]),t._v("取消"),a("code",[t._v("proxy")]),t._v("代理特性 即可优雅使用")]),t._v(" "),a("li",[a("font",{attrs:{color:"ff3040"}},[t._v("注意: 只有"),a("code",[t._v("Scene()场景对象")]),t._v(" 和 "),a("code",[t._v("Mesh()网格模型对象")]),t._v(" 需要使用"),a("code",[t._v("toRaw()")]),t._v("取消其代理 其他的声明正常写即可")])],1)]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("setup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入Vue组合API")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" onMounted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reactive"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" toRaw "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入three")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("THREE")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'three'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明需要的参数")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" content "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reactive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明场景对象Scene")]),t._v("\n  scene"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明网格模型mesh")]),t._v("\n  mesh"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 开始threejs的渲染步骤")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("box")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建场景对象Scene")]),t._v("\n  content"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scene "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Scene")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把创建场景对象 转换为普通对象格式")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" scene "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toRaw")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("scene"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 网格模型对象Mesh")]),t._v("\n  content"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mesh "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Mesh")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把创建网格模型对象 转换为普通对象格式")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mesh "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toRaw")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("content"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mesh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onMounted")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 渲染threejs的立体几何对象")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("box")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ul",[a("li",[t._v("问题解决 全局变量解决办法就不写了 那个很简单 你在外面声明一个变量即可")])]),t._v(" "),a("h2",{attrs:{id:"参考文献"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[t._v("#")]),t._v(" 参考文献")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3#comment116149963_65693108",target:"_blank",rel:"noopener noreferrer"}},[t._v("stackoverflow解决方法"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://cdmana.com/2022/03/202203041738342602.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("分析文章"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);