(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{643:function(t,s,a){"use strict";a.r(s);var e=a(2),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("three.js 之 世界坐标 "),a("br")])]),t._v(" "),a("h2",{attrs:{id:"什么是世界坐标-和-局部坐标系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是世界坐标-和-局部坐标系"}},[t._v("#")]),t._v(" 什么是世界坐标 和 局部坐标系")]),t._v(" "),a("ol",[a("li",[t._v("世界坐标: 相对于three.js场景"),a("code",[t._v("scene")]),t._v("的xyz的坐标系")]),t._v(" "),a("li",[t._v("局部坐标: 相对于模型自身的xyz的坐标系")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220605193230284.png",alt:"image-20220605193230284"}})]),t._v(" "),a("ul",[a("li",[a("font",{attrs:{color:"#ff3040"}},[t._v("注意: 局部坐标依赖模型导出时自身的坐标 最好和建模约定好 自身坐标是从底部还是从顶部开始 下图的模型就是底部的几何中心坐标")])],1)]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220605200907476.png",alt:"image-20220605200907476"}})]),t._v(" "),a("blockquote",[a("p",[t._v("总结")])]),t._v(" "),a("ul",[a("li",[t._v("世界坐标轴可以定位模型坐标 模型内部的局部坐标 依赖自身携带的坐标(3D软件设置的坐标)")])]),t._v(" "),a("h2",{attrs:{id:"three-js获取世界坐标系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#three-js获取世界坐标系"}},[t._v("#")]),t._v(" three.js获取世界坐标系")]),t._v(" "),a("ul",[a("li",[t._v("每个模型 都有独立的坐标"),a("code",[t._v("Position")]),t._v(" 通过Object3D "),a("a",{attrs:{href:"https://threejs.org/docs/index.html?q=obj#api/zh/core/Object3D.getWorldPosition",target:"_blank",rel:"noopener noreferrer"}},[t._v(".getWorldPosition"),a("OutboundLink")],1),t._v(" 方法获取到模型的世界坐标")]),t._v(" "),a("li",[a("code",[t._v("Vector3")]),t._v("是threejs的三维向量对象,可以通过"),a("code",[t._v("Vector3")]),t._v("对象表示一个顶点的xyz坐标，顶点的法线向量。")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明网格模型对象Mesh")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mesh "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Mesh")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("网格模型Geometry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 材质对象Material"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明一个三维向量用来保存世界坐标")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" worldPosition "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Vector3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行getWorldPosition方法把模型的世界坐标保存到参数worldPosition中")]),t._v("\nmesh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getWorldPosition")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("worldPosition"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"参考文献"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[t._v("#")]),t._v(" 参考文献")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://www.yanhuangxueyuan.com/Three.js/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Three.js零基础入门教程(郭隆邦)"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=n.exports}}]);