(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{642:function(t,s,a){"use strict";a.r(s);var e=a(2),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("three.js 之 Loader 几何体"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"几何体介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#几何体介绍"}},[t._v("#")]),t._v(" 几何体介绍")]),t._v(" "),a("ul",[a("li",[t._v("创建一个物体 可以使用"),a("RouterLink",{attrs:{to:"/blogs/docs/threeJS/3_1_three.js_Material.html"}},[t._v("Material")]),t._v("纹理材质 创建后的对象是"),a("a",{attrs:{href:"https://threejs.org/docs/index.html#api/zh/core/BufferGeometry",target:"_blank",rel:"noopener noreferrer"}},[t._v("BufferGeometry"),a("OutboundLink")],1),t._v(" 几何对象")],1)]),t._v(" "),a("h2",{attrs:{id:"立体缓冲几何体-长方体-正方体-boxgeometry"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#立体缓冲几何体-长方体-正方体-boxgeometry"}},[t._v("#")]),t._v(" 立体缓冲几何体(长方体 正方体)  "),a("code",[t._v("BoxGeometry")])]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://threejs.org/docs/index.html?q=BoxGeometry#api/zh/geometries/BoxGeometry",target:"_blank",rel:"noopener noreferrer"}},[t._v("BoxGeometry"),a("OutboundLink")],1),t._v("立体缓冲几何体(长方体 正方体)")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220619175804236.png",alt:"image-20220619175804236"}})]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 1. 创建场景对象Scene")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" scene "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Scene")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个立方体几何对象Geometry")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" geometry "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("BoxGeometry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取图片网格材质")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" texture "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("TextureLoader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("load")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/%E5%B0%8Fmao.jpg'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用网格材质")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" skyBoxMaterial "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MeshBasicMaterial")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    map"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" texture"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    side"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("THREE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DoubleSide\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 网格模型对象Mesh 导入网格模型和网格才是")]),t._v("\n  content"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mesh "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Mesh")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("geometry"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" skyBoxMaterial"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 添加到场景中去")]),t._v("\n  scene"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mesh"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"平面缓冲几何体-长方形-正方形-planegeometry"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#平面缓冲几何体-长方形-正方形-planegeometry"}},[t._v("#")]),t._v(" 平面缓冲几何体(长方形 正方形) "),a("code",[t._v("PlaneGeometry")])]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://threejs.org/docs/index.html?q=PlaneGeometry#api/zh/geometries/PlaneGeometry",target:"_blank",rel:"noopener noreferrer"}},[t._v("PlaneGeometry"),a("OutboundLink")],1),t._v(" 平面缓冲几何体(长方形 正方形) 可以用来交叉创建一些立体的东西")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220619175911604.png",alt:"image-20220619175911604"}})]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 矩形平面网格模型，用来渲染火焰的动画效果")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" w "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("25")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 宽度")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" h "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.6")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" w"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 高度")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" geometry "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("THREE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("PlaneGeometry")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("w"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" h"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 矩形平面")]),t._v("\n")])])]),a("h2",{attrs:{id:"参考文献"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[t._v("#")]),t._v(" 参考文献")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://www.yanhuangxueyuan.com/Three.js/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Three.js零基础入门教程(郭隆邦)"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=n.exports}}]);