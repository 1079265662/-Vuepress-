(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{567:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("记录常用的Vue eslint规则"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"eslint的优势"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#eslint的优势"}},[t._v("#")]),t._v(" eslint的优势")]),t._v(" "),a("ul",[a("li",[t._v("eslint可以让原本松散的JS代码 具备极强且规范的能力 让代码更加的方便阅读 并且让团队协作更规范 更简单")]),t._v(" "),a("li",[t._v("推荐搭配Vscode的配置 + eslint的规范 这样你只要"),a("code",[t._v("ctrl+s")]),t._v(" 就可以格式化代码 很方便 请查看"),a("RouterLink",{attrs:{to:"/blogs/docs/Vscode/Vscode.html"}},[t._v("这里设置Vscode的配置")])],1),t._v(" "),a("li",[t._v("Vue有自己的eslint规范 通常我们通过Vue cli脚手架创建的项目 是Vue的eslint规范 我们就记录这些Vue的eslint规范")]),t._v(" "),a("li",[a("code",[t._v(".eslintrc.js")]),t._v("通常我们在脚手架的这里 填写eslint的规则")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220422121956764.png",alt:"image-20220422121956764"}})]),t._v(" "),a("h2",{attrs:{id:"自动闭合标签"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自动闭合标签"}},[t._v("#")]),t._v(" 自动闭合标签")]),t._v(" "),a("ul",[a("li",[t._v("html中 标签如果没有包含内容 可以设置闭合 让代码更优雅 就比如")])]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" // 没闭合\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v(" // 闭合标签\n")])])]),a("ul",[a("li",[t._v("Vue eslint 在"),a("a",{attrs:{href:"https://eslint.vuejs.org/rules/html-self-closing.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里"),a("OutboundLink")],1),t._v("有详细的闭合介绍 它属于规则 在"),a("code",[t._v("rules")]),t._v("中进行添加")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 标签闭合")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vue/html-self-closing'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'warn'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// error")]),t._v("\n      html"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'never'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        normal"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'always'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        component"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'always'")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      svg"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'always'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      math"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'always'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);