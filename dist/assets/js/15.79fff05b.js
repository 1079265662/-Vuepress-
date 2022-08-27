(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{535:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("GSAP使用户记录 主要服务于three.js"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"了解gsap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#了解gsap"}},[t._v("#")]),t._v(" 了解gsap")]),t._v(" "),a("ul",[a("li",[t._v("不是很了解...")]),t._v(" "),a("li",[t._v("通过"),a("code",[t._v("npm")]),t._v("进行安装即可")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i gsap\n")])])]),a("h2",{attrs:{id:"gsap-to"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gsap-to"}},[t._v("#")]),t._v(" gsap.to()")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://greensock.com/docs/v3/GSAP/gsap.to()",target:"_blank",rel:"noopener noreferrer"}},[t._v("gsap.to()"),a("OutboundLink")],1),t._v(" 是自定义动画区间 实现一个动画的最佳方式")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入 gsap")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" gsap "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'gsap'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3. 创建一个网格模型 放入创建的几何体和其自身材质")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" cube "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Mesh")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cubeGeometry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" cubeMaterial"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Mesh(几何体, 纹理材质)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过gsap 设置three.js物体的position(位置)属性 然后设置修改position的属性 在设置其移动的持续时间即可")]),t._v("\n  gsap"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("to")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cube"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 沿着x轴位移的位置")]),t._v("\n    x"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 动画时间")]),t._v("\n    duration"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 动画的效果")]),t._v("\n    ease"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'power1.out'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置重复次数 无限循环设置-1")]),t._v("\n    repeat"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 往返运动")]),t._v("\n    yoyo"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 延迟动画")]),t._v("\n    delay"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 动画开始")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onStart")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'动画开始'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 动画完成")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onComplete")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'动画结束'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ngsap"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("to")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cube"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("rotation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" x"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" duration"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置three.js模型 xyz轴旋转")]),t._v("\n")])])]),a("ul",[a("li",[t._v("在"),a("code",[t._v("three.js")]),t._v("中 需要规定物体的移动向量 就比规定模型"),a("a",{attrs:{href:"https://threejs.org/docs/?q=ob#api/zh/core/Object3D.position",target:"_blank",rel:"noopener noreferrer"}},[t._v(".position "),a("OutboundLink")],1),t._v(" 模型的"),a("code",[t._v("X Y Z")]),t._v("轴")]),t._v(" "),a("li",[t._v("通过设置一些属性 来实现物体的动画效果")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[a("strong",[t._v("属性名")])]),t._v(" "),a("th",[a("strong",[t._v("属性作用")])]),t._v(" "),a("th",[t._v("类型****")]),t._v(" "),a("th",[a("strong",[t._v("默认值")])])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("x")]),t._v(" "),a("code",[t._v("y")]),t._v(" "),a("code",[t._v("z")])]),t._v(" "),a("td",[t._v("设置动画的的三维向量("),a("code",[t._v("X Y Z")]),t._v("轴)")]),t._v(" "),a("td",[t._v("属性")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("duration")]),t._v(" "),a("td",[t._v("设置动画的进行时间( 在时间内进行设置的动画 单位是"),a("code",[t._v("秒")]),t._v(")")]),t._v(" "),a("td",[t._v("属性")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"https://greensock.com/docs/v3/Eases",target:"_blank",rel:"noopener noreferrer"}},[t._v("ease"),a("OutboundLink")],1)]),t._v(" "),a("td",[t._v("设置动画的速度(动画的行为)")]),t._v(" "),a("td",[t._v("属性")]),t._v(" "),a("td",[t._v("none")])]),t._v(" "),a("tr",[a("td",[t._v("repeat")]),t._v(" "),a("td",[t._v("设置动画执行的次数 当设置为"),a("code",[t._v("-1")]),t._v("的时候 是无限执行")]),t._v(" "),a("td",[t._v("属性")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("yoyo")]),t._v(" "),a("td",[t._v("设置动画开启往返运动")]),t._v(" "),a("td",[t._v("属性")]),t._v(" "),a("td",[t._v("false")])]),t._v(" "),a("tr",[a("td"),t._v(" "),a("td",[a("em",[a("strong",[t._v("执行gsap动画的生命周期方法")])])]),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("onStart")]),t._v(" "),a("td",[t._v("动画开始时")]),t._v(" "),a("td",[t._v("方法")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("onComplete")]),t._v(" "),a("td",[t._v("动画完成时")]),t._v(" "),a("td",[t._v("方法")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td"),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td")])])]),t._v(" "),a("h2",{attrs:{id:"动画api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#动画api"}},[t._v("#")]),t._v(" 动画API")]),t._v(" "),a("ul",[a("li",[t._v("通过"),a("a",{attrs:{href:"https://greensock.com/docs/v3/GSAP/gsap.to()",target:"_blank",rel:"noopener noreferrer"}},[t._v("gsap.to()"),a("OutboundLink")],1),t._v(" 声明的动画 自身具备不少API方法 比如动画的暂停 开始 和检测动画播放的状态")])]),t._v(" "),a("h3",{attrs:{id:"实现一个暂停-播放的功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现一个暂停-播放的功能"}},[t._v("#")]),t._v(" "),a("strong",[t._v("实现一个暂停 播放的功能")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置一个gsap动画")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" animate "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" gsap"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("to")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cube"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("position"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    x"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    duration"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    ease"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'power1.out'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置重复次数 无限循环设置-1")]),t._v("\n    repeat"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 往返运动")]),t._v("\n    yoyo"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置一个双击事件")]),t._v("\n  window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dblclick'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断gsap动画的状态")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("animate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isActive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true为动画进行 false为动画暂停")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 暂停动画")]),t._v("\n      animate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("pause")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 进行动画")]),t._v("\n      animate"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resume")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h3",{attrs:{id:"gsap动画的api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gsap动画的api"}},[t._v("#")]),t._v(" "),a("strong",[t._v("gsap动画的API")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[a("strong",[t._v("API")])]),t._v(" "),a("th",[a("strong",[t._v("API作用")])]),t._v(" "),a("th",[a("strong",[t._v("备注")])])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("isActive()")]),t._v(" "),a("td",[t._v("判断动画播放状态")]),t._v(" "),a("td",[a("code",[t._v("true")]),t._v("为动画 "),a("code",[t._v("false")]),t._v("为动画暂停")])]),t._v(" "),a("tr",[a("td",[t._v("pause()")]),t._v(" "),a("td",[t._v("暂停动画")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("resume()")]),t._v(" "),a("td",[t._v("播放动画")]),t._v(" "),a("td")])])]),t._v(" "),a("h2",{attrs:{id:"参考文献"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[t._v("#")]),t._v(" 参考文献")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.cn/post/7041862990622605349",target:"_blank",rel:"noopener noreferrer"}},[t._v("GSAP3入门"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);