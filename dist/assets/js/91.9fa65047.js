(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{616:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("Vue 一个长图点击爱心特效 模仿gif的效果"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"特效的小效果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特效的小效果"}},[t._v("#")]),t._v(" 特效的小效果")]),t._v(" "),a("ul",[a("li",[t._v("前几天访问别人的网站的时候 发现了一个很有趣的爱心特效")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/tpe63-9bqnz.gif",alt:"tpe63-9bqnz"}})]),t._v(" "),a("ul",[a("li",[t._v("默认是红色爱心 点击后 会有一个很有趣的特效 这种效果是如何实现的?")])]),t._v(" "),a("h2",{attrs:{id:"实现思路"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现思路"}},[t._v("#")]),t._v(" 实现思路")]),t._v(" "),a("ul",[a("li",[t._v("这种效果可以用那种长条图片来实现 就跟胶片一样 从左往右的逐帧播放 就能实现这个特效")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/heart.3c55287.png",alt:"img"}})]),t._v(" "),a("ul",[a("li",[t._v("就是这种长条图 通过前端css 动画 来实现播放效果 就可以和上面的gif效果一样啦")]),t._v(" "),a("li",[t._v("我们可以绑定"),a("code",[t._v("@click")]),t._v("点击事件 设置状态位 并且设置函数防抖  防止多次点击重置动画")])]),t._v(" "),a("h2",{attrs:{id:"实现代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现代码"}},[t._v("#")]),t._v(" 实现代码")]),t._v(" "),a("ul",[a("li",[t._v("用Vue3来实现效果")])]),t._v(" "),a("blockquote",[a("p",[t._v("第一步 在template上设置爱心")])]),t._v(" "),a("ul",[a("li",[t._v("这里我们用到了Vue的动态类名 默认的时候是爱心初始样式 点击变更状态位的时候 再给其添加css的动画效果")])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("["),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("loveBox"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(","),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("loveRed"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(",loveState ? "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("loveBoxAdm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v(" : "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("]"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("loveThis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("第二步 在sass中设置我们的爱心特效样式")])]),t._v(" "),a("ul",[a("li",[t._v("通过"),a("code",[t._v("animation")]),t._v("css动画 然后给其设置动画帧数"),a("code",[t._v("steps()")]),t._v(" 最后设置"),a("code",[t._v("forwards")]),t._v(" 让动画结束的时候保持在最后状态 不重置")])]),t._v(" "),a("div",{staticClass:"language-scss extra-class"},[a("pre",{pre:!0,attrs:{class:"language-scss"}},[a("code",[t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置爱心小盒子")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".loveBox ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("width")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 50px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("margin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" auto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/heart.3c55287.png'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-repeat")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" no-repeat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 2900%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("cursor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" pointer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把长条爱心背景图定格到最后")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".loveRed ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置点击后的动画效果")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".loveBoxAdm ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("animation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" sprite5 1s "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("steps")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("28"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" forwards"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("第三步 点击爱心后 进行交互 播放爱心特效")])]),t._v(" "),a("ul",[a("li",[t._v("通过交互 我们获取到绑定的点击事件 改变播放状态位 设置函数防抖 让其播放完毕后才能点击 这样就不会出现频繁点击重置动画")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" data "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reactive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 点击爱心状态")]),t._v("\n      loveState"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 爱心防抖")]),t._v("\n      States"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 点击爱心")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("loveThis")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("States"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n      data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("States "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("States "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n        data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loveState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loveState\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loveState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loveState\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解构导出")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" dataOut "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toRefs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("dataOut"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" loveThis "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);