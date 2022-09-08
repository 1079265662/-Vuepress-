(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{650:function(a,t,s){"use strict";s.r(t);var e=s(2),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[a._v("介绍")]),a._v(" "),s("p",[a._v("three.js 之 Material 材质 "),s("br")])]),a._v(" "),s("h2",{attrs:{id:"材质种类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#材质种类"}},[a._v("#")]),a._v(" 材质种类")]),a._v(" "),s("ul",[s("li",[a._v("在three.js中，材质决定了几何图形中的表面是如何画的。如果几何图形是骨架，定义了形状，那么材质就是皮肤。three.js 中有许多不同种类的材质，他们拥有不同的属性，像反光，纹理映射，调整透明度。")]),a._v(" "),s("li",[a._v("任何类型的材质都是 "),s("a",{attrs:{href:"https://threejs.org/docs/index.html?q=mater#api/zh/materials/Material",target:"_blank",rel:"noopener noreferrer"}},[a._v("Material"),s("OutboundLink")],1),a._v("的基类")])]),a._v(" "),s("h2",{attrs:{id:"网格基础材质-basic-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网格基础材质-basic-material"}},[a._v("#")]),a._v(" 网格基础材质("),s("a",{attrs:{href:"https://link.segmentfault.com/?enc=BFh52AedUaRX7Bj6NkEpdg%3D%3D.ee7gn79A%2Bs8r4ZFlaCWhLNXExJIoR9kjLCRG8zGuHJdUBduyw4n1HxUyedvjvDx0K8XgfJ%2FUzeoJQWFBLyNIIH%2FuZvIpiSbx%2FxbvSzx%2BXos%3D",target:"_blank",rel:"noopener noreferrer"}},[a._v("Basic Material"),s("OutboundLink")],1),a._v(")")]),a._v(" "),s("p",[a._v("最基本的材质是 "),s("code",[a._v("MeshBasicMaterial")]),a._v("。你能够把颜色"),s("code",[a._v("color")]),a._v("作为参数传进去来生成一个实心的带颜色对象，没有阴影，也不受光照影响。你也能够通过把透明度"),s("code",[a._v("opacity")]),a._v("作为参数传进去来调整透明度以及设置透明"),s("code",[a._v("transparent")]),a._v("为"),s("code",[a._v("true")]),a._v("。")]),a._v(" "),s("ul",[s("li",[a._v("基础材质 不具备光照反射效果 不具备立体感 所以看起来更像是2d 适合图片"),s("code",[a._v("png jpg")]),a._v(" 常用来实现序列帧动画")]),a._v(" "),s("li",[a._v("适合搭配"),s("a",{attrs:{href:"https://threejs.org/docs/index.html?q=PlaneGeometry#api/zh/geometries/PlaneGeometry",target:"_blank",rel:"noopener noreferrer"}},[a._v("PlaneGeometry()"),s("OutboundLink")],1),a._v("平面几何体使用")])]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("MeshBasicMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("color"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0xff0000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" transparent"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" opacity"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639070",alt:"basic material"}})]),a._v(" "),s("h2",{attrs:{id:"网格法向材质-normal-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网格法向材质-normal-material"}},[a._v("#")]),a._v(" 网格法向材质("),s("a",{attrs:{href:"https://link.segmentfault.com/?enc=HBAUqe%2B8KIKTnKVUHSCqSA%3D%3D.lwhm8ro9QbNcG63Q900C5qDZIdDIE49keFR6rhYJzB3dk0%2BpJ0ICtto%2FGqewpLt1%2BLm19lySeEZFHt7aTqqDk1Yqvd6D8dtE%2B9WBv7qxGTw%3D",target:"_blank",rel:"noopener noreferrer"}},[a._v("Normal Material"),s("OutboundLink")],1),a._v(")")]),a._v(" "),s("p",[s("code",[a._v("MeshNormalMaterial")]),a._v("是另一种材质。它会根据面的法线或朝向使用不同的颜色来渲染网格的面。")]),a._v(" "),s("div",{staticClass:"language-haxe extra-class"},[s("pre",{pre:!0,attrs:{class:"language-haxe"}},[s("code",[a._v("const material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("MeshNormalMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639071",alt:"normal material"}})]),a._v(" "),s("ul",[s("li",[a._v("那到底什么是法线呢？法线就是始终垂直于平面的一根线，也就代表了面的朝向。而在三维引擎中，每个顶点都有法线信息。")])]),a._v(" "),s("img",{staticStyle:{zoom:"80%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271858662.png",alt:"图片"}}),a._v(" "),s("ul",[s("li",[a._v("既然法线代表了顶点的朝向，那自然就可以用于计算如何反射光线或折射光线。")])]),a._v(" "),s("blockquote",[s("p",[a._v("当使用"),s("code",[a._v("MeshNormalMaterial")]),a._v("时，颜色只会显示法线相对相机的方向。这就是说如果我们绕着球体旋转，你会看到颜色总是一样的。")])]),a._v(" "),s("ul",[s("li",[a._v("除了"),s("code",[a._v("wireframe")]),a._v("，"),s("code",[a._v("opacity")]),a._v("等基础属性，"),s("code",[a._v("MeshBasicMaterial")]),a._v("还可以使用一个新的"),s("code",[a._v("flatShading")]),a._v("平面着色属性：")])]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("material"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("flatShading "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"80%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271859519.png",alt:"图片"}}),a._v(" "),s("ul",[s("li",[a._v("平面着色属意味着法线不会在顶点和顶点之间插值。"),s("code",[a._v("MeshNormalMaterial")]),a._v("通常用来调试和观测法线信息，但它看起来很绚丽，所以也可以直接拿来做一些很独特的效果。")])]),a._v(" "),s("h2",{attrs:{id:"网格朗伯材质-lambert-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网格朗伯材质-lambert-material"}},[a._v("#")]),a._v(" 网格朗伯材质("),s("a",{attrs:{href:""}},[a._v("Lambert Material")]),a._v(")")]),a._v(" "),s("p",[s("code",[a._v("MeshLambertMaterial")]),a._v("能够反光，可以让几何物体产生暗淡的表面。在大部分 3D 应用中，朗伯都是一种常用的材质。就像之前，我们可以调整颜色。我们可以通过 "),s("code",[a._v("emissive")]),a._v(" 属性来给材质添加亮色。")]),a._v(" "),s("ul",[s("li",[a._v("他的其他名字叫 "),s("code",[a._v("漫反射材质")]),a._v(" 他具备光照反射效果 具备立体感 同时消耗性能较低")]),a._v(" "),s("li",[s("font",{attrs:{color:"#ff3040"}},[a._v("注意: 该材质需要灯光才能看到")])],1)]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("MeshLambertMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("color"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0xff0000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" transparent"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" opacity"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271931325.png",alt:"图片"}}),a._v(" "),s("h2",{attrs:{id:"网格phong式材质-phong-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网格phong式材质-phong-material"}},[a._v("#")]),a._v(" 网格Phong式材质("),s("a",{attrs:{href:""}},[a._v("Phong Material")]),a._v(")")]),a._v(" "),s("p",[a._v("就像朗伯材质，"),s("code",[a._v("MeshPhongMaterial")]),a._v("也是会反光的，但是它会给表面添加金属光泽，反光强度更大。你可以添加高光色和调整材质 "),s("code",[a._v("shininess")]),a._v("属性来改变反光的强度。")]),a._v(" "),s("ul",[s("li",[a._v("他的其他名字叫 "),s("code",[a._v("高光网格材质")]),a._v(" 是"),s("code",[a._v("PBR材质")]),a._v("和"),s("code",[a._v("漫反射")]),a._v(" 材质的折中材质 渲染的效果也不错")]),a._v(" "),s("li",[s("code",[a._v("MeshPhongMaterial")]),a._v("则是应用这种算法的材质。效果和"),s("code",[a._v("MeshLambertMaterial")]),a._v("类似，但光影明暗过度更加自然，性能的消耗也略高于"),s("code",[a._v("MeshLambertMaterial")]),a._v("。")]),a._v(" "),s("li",[s("font",{attrs:{color:"#ff3040"}},[a._v("注意: 该材质需要灯光才能看到")])],1)]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("MeshPhongMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("shininess"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271930552.png",alt:"图片"}}),a._v(" "),s("ul",[s("li",[a._v("您可以通过亮度属性控制光的反射。值越大反射越强，表面越亮，看上去更光洁。您还可以使用"),s("code",[a._v("specular")]),a._v("高光色属性来更改反射的颜色:")])]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("material"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("shininess "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("100")]),a._v("\nmaterial"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("specular "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("Color")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0x1188ff")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271925232.png",alt:"图片"}}),a._v(" "),s("p",[a._v("这段代码让反射的光线有些泛蓝色，看出来了吗？")]),a._v(" "),s("h2",{attrs:{id:"网格标准材质-standard-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网格标准材质-standard-material"}},[a._v("#")]),a._v(" 网格标准材质("),s("a",{attrs:{href:""}},[a._v("Standard Material")]),a._v(")")]),a._v(" "),s("p",[s("code",[a._v("MeshStandardMaterial")]),a._v("的主要目标是将"),s("code",[a._v("MeshLambertMaterial")]),a._v("和"),s("code",[a._v("MeshPhoneMaterial")]),a._v("结合成一种材质。它有粗糙度和金属性的材质并且改变这些属性能够创建暗淡或者金属性光泽的表秒。")]),a._v(" "),s("ul",[s("li",[a._v("他的学名也叫 "),s("code",[a._v("PBR材质")]),a._v(" 是一种非常写实的材质 立体感很棒 渲染的效果非常好 同时消耗性能较大 "),s("code",[a._v("PBR")]),a._v("已经成为很多3D渲染引擎的标准，而无论你在任何软件，引擎中使用标准材质时，得到的结果都是一样的。\n"),s("ul",[s("li",[s("code",[a._v("粗糙度")]),a._v(" 和 "),s("code",[a._v("金属度")]),a._v(" 是该材质的典型内容")])])]),a._v(" "),s("li",[a._v("通常我们加载的"),s("code",[a._v("gltf")]),a._v("和"),s("code",[a._v("glb")]),a._v("默认会使用"),s("code",[a._v("PBR")]),a._v("材质")]),a._v(" "),s("li",[s("font",{attrs:{color:"#ff3040"}},[a._v("注意: 该材质需要灯光才能看到")])],1)]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("MeshStandardMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("metalness"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" roughness"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271930405.png",alt:"图片"}}),a._v(" "),s("p",[a._v("我们可以直接调整粗糙度"),s("code",[a._v("roughness")]),a._v("和金属度"),s("code",[a._v("metalness")]),a._v("的值来观察")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("material"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("metalness "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.45")]),a._v("\nmaterial"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("roughness "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.65")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271929399.png",alt:"图片"}}),a._v(" "),s("h2",{attrs:{id:"材质捕捉材质-meshmatcapmaterial"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#材质捕捉材质-meshmatcapmaterial"}},[a._v("#")]),a._v(" 材质捕捉材质 "),s("a",{attrs:{href:"https://threejs.org/docs/index.html?q=MeshMatcapMaterial#api/zh/materials/MeshMatcapMaterial",target:"_blank",rel:"noopener noreferrer"}},[a._v("MeshMatcapMaterial"),s("OutboundLink")],1)]),a._v(" "),s("ul",[s("li",[a._v("这个名字有点绕口，但"),s("code",[a._v("Matcap")]),a._v("的确是由"),s("code",[a._v("Material")]),a._v("和"),s("code",[a._v("Capture")]),a._v("两个单词组合而成，其意思就是材质捕捉。")])]),a._v(" "),s("img",{staticStyle:{zoom:"80%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207272009939.png",alt:"图片"}}),a._v(" "),s("ul",[s("li",[a._v("它是一种很棒的材质，效果很不错的同时在性能非常好。")])]),a._v(" "),s("blockquote",[s("p",[a._v("“")]),a._v(" "),s("p",[a._v("渲染通常需要几何体、光源、材质、shader 的共同参与。而"),s("code",[a._v("matcap")]),a._v(" 是将光源、材质信息在3D建模软件中直接"),s("strong",[a._v("烘焙")]),a._v("到一张纹理贴图上，渲染时直接拿来用即可，计算量自然大大减少，性能提升明显。我们还可以很方便的在不同的 matcap 纹理之间切换，看上去就和切换材质一样。")]),a._v(" "),s("p",[a._v("”")])]),a._v(" "),s("ul",[s("li",[a._v("使用"),s("code",[a._v("MeshMatcapMaterial")]),a._v("材质时必须使用一个看起来像球体的参考纹理贴图。")])]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 获取材质贴图")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" matcapTexture "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" textureLoader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("load")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'/textures/matcaps/2.png'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 声明MeshMatcapMaterial材质")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("MeshMatcapMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 设置材质捕捉贴图：")]),a._v("\nmaterial"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("matcap "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" matcapTexture\n")])])]),s("ul",[s("li",[a._v("网上可以找到很多"),s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/420473327",target:"_blank",rel:"noopener noreferrer"}},[a._v("matcap"),s("OutboundLink")],1),a._v("纹理贴图，可以理解为"),s("code",[a._v("开箱即用")]),a._v("的材质 https://github.com/nidorx/matcaps")])]),a._v(" "),s("h2",{attrs:{id:"网格深度材质-depth-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网格深度材质-depth-material"}},[a._v("#")]),a._v(" 网格深度材质("),s("a",{attrs:{href:""}},[a._v("Depth Material")]),a._v(")")]),a._v(" "),s("p",[a._v("另一种不同的材质是"),s("code",[a._v("MeshDepthMaterial")]),a._v("，它会对网格对象的灰度级别从黑到白绘制，根据内容的所在的深度不同。")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("MeshDepthMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639072",alt:"depth material"}})]),a._v(" "),s("ul",[s("li",[s("p",[a._v("上面我们看到的都是网格材质，因为他们是用户网格的。但是在three.js中也有不同的几何图形对象，他们有自己独特的材质。")])]),a._v(" "),s("li",[s("p",[s("code",[a._v("MeshDepthMaterial")]),a._v("这种材质的外观不是由光照或者某个材质决定，而是由物体到相机的远近距离决定，当物体离相机较近时会呈现白色，较远时会呈现黑色。")])])]),a._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271922356.png",alt:"图片"}}),a._v(" "),s("h2",{attrs:{id:"卡通材质-meshtoonmaterial"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#卡通材质-meshtoonmaterial"}},[a._v("#")]),a._v(" 卡通材质 ("),s("a",{attrs:{href:"https://threejs.org/docs/index.html?q=MeshToonMaterial#api/zh/materials/MeshToonMaterial",target:"_blank",rel:"noopener noreferrer"}},[a._v("MeshToonMaterial"),s("OutboundLink")],1),a._v(")")]),a._v(" "),s("p",[s("code",[a._v("MeshToonMaterial")]),a._v("卡通材质的可以让我们的几何体表现出2次元卡通的风格，俗称3渲2：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("MeshToonMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937263.png",alt:"图片"}}),a._v(" "),s("p",[a._v("默认情况下，我们只能看到两种的颜色 (一个用于暗面，一个用于亮面)。如果想要更多的颜色过度，可以使用"),s("code",[a._v("gradientMap")]),a._v("属性并加载"),s("code",[a._v("gradientTexture")]),a._v("：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("material"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("gradientMap "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" gradientTexture\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937271.png",alt:"图片"}}),a._v(" "),s("p",[a._v("如果我们直接设置gradientMap，会发现卡通效果失效了，明暗过度太丝滑了。这是因为我们使用的梯度纹理很小，这和我们在纹理贴图小节中了解过的minFilter，magFilter和mipmapping有关系。")]),a._v(" "),s("p",[a._v("解决方法也很简单，只需要将"),s("code",[a._v("minFilter")]),a._v(" 和 "),s("code",[a._v("magFilter")]),a._v("设置为"),s("code",[a._v("THREE.NearestFilter")]),a._v("即可")]),a._v(" "),s("p",[a._v("别忘了加入"),s("code",[a._v("generatempmaps = false")]),a._v("：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("gradientTexture"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("minFilter "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("THREE")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("NearestFilter\ngradientTexture"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("magFilter "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[a._v("THREE")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("NearestFilter\ngradientTexture"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("generateMipmaps "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937565.png",alt:"图片"}}),a._v(" "),s("p",[a._v("现在我们能看到卡通效果有三个颜色了，还可以换成有5个颜色过渡的贴图：")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 导入贴图")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" gradientTexture "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" textureLoader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("load")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'/textures/gradients/5.jpg'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271937414.png",alt:"图片"}}),a._v(" "),s("h2",{attrs:{id:"物理材质-meshphysicalmaterial"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#物理材质-meshphysicalmaterial"}},[a._v("#")]),a._v(" 物理材质("),s("a",{attrs:{href:"https://threejs.org/docs/index.html?q=MeshPhysicalMaterial#api/zh/materials/MeshPhysicalMaterial",target:"_blank",rel:"noopener noreferrer"}},[a._v("MeshPhysicalMaterial"),s("OutboundLink")],1),a._v(")")]),a._v(" "),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271941126.png",alt:"图片"}}),a._v(" "),s("p",[a._v("物理材质"),s("code",[a._v("MeshPhysicalMaterial")]),a._v("是"),s("code",[a._v("MeshStandardMaterial")]),a._v("的扩展或者说加强版，提供更高级的基于物理的渲染属性，比如：")]),a._v(" "),s("ul",[s("li",[s("p",[s("strong",[a._v("清漆属性Clearcoat:")]),a._v(" 有一些材料 (例如汽车油漆，碳纤维和潮湿的表面) 需要在另一层可能不规则或粗糙的表面上的透明反射层。Clearcoat可以实现近似的效果，而不需要单独的透明表面。")]),a._v(" "),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202207271941547.png",alt:"图片"}})]),a._v(" "),s("li",[s("p",[s("strong",[a._v("基于物理的透明度:")]),a._v(" 可以实现更加真实的类似玻璃等薄而透明的效果。")])]),a._v(" "),s("li",[s("p",[s("strong",[a._v("更优秀的反射效果")]),a._v("。")])])]),a._v(" "),s("h2",{attrs:{id:"直线材质-line-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#直线材质-line-material"}},[a._v("#")]),a._v(" 直线材质 ("),s("a",{attrs:{href:""}},[a._v("Line Material")]),a._v(")")]),a._v(" "),s("p",[a._v("如果要画直接，我们必须使用"),s("code",[a._v("LineBasicMaterial")]),a._v("。这个和"),s("code",[a._v("MeshBasicMaterial")]),a._v("差不多。还有 "),s("code",[a._v("LineDashedMaterial")]),a._v("，它能够让你设置直线中点的大小和间距。为了让短划线起作用，你需要在geometry中调用"),s("code",[a._v("computeLineDistance")]),a._v("。")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("LineDashedMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("dashSize"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" gapSize"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\ngeometry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("computeLineDistances")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" line "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("Line")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("geometry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" material"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639074",alt:"line material"}}),a._v(" "),s("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639075",alt:"dashed line material"}})]),a._v(" "),s("h2",{attrs:{id:"点材质-points-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#点材质-points-material"}},[a._v("#")]),a._v(" 点材质("),s("a",{attrs:{href:""}},[a._v("Points Material")]),a._v(")")]),a._v(" "),s("p",[a._v("跟画线类似，点的话需要使用 "),s("code",[a._v("PointsMaterial")])]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("PointsMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("color"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0xF3FFE2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" points "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("Points")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("geometry"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" material"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639076",alt:"points material"}})]),a._v(" "),s("h2",{attrs:{id:"雪碧材质-sprite-material"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#雪碧材质-sprite-material"}},[a._v("#")]),a._v(" 雪碧材质("),s("a",{attrs:{href:""}},[a._v("Sprite Material")]),a._v(")")]),a._v(" "),s("p",[a._v("另一种特殊的材质是"),s("code",[a._v("SpriteMaterial")]),a._v("，它能够使用纹理贴图，并且应用于雪碧材质上。Sprite是一种总是面向镜头的特殊平面.")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" material "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("SpriteMaterial")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("map"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"mytexture.png"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" sprite "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("THREE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("Sprite")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("material"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/1460000014639077",alt:"sprite material"}})]),a._v(" "),s("h2",{attrs:{id:"文章来源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文章来源"}},[a._v("#")]),a._v(" 文章来源")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000014639067",target:"_blank",rel:"noopener noreferrer"}},[a._v("three.js 之 Material"),s("OutboundLink")],1)]),a._v(" "),s("p",[s("a",{attrs:{href:"https://mp.weixin.qq.com/s?__biz=Mzg3MTUyNzQzNg==&mid=2247489272&idx=1&sn=e450ccc5ac8330fabbe2358573061523&chksm=cefc739bf98bfa8d2409f78b6597025a4bc9b721b7679b00dbf23de96c77f33c7cf4beab665b&scene=178&cur_album_id=2405559566127480834#rd",target:"_blank",rel:"noopener noreferrer"}},[a._v("一文搞懂 Three.js 里的材质 |《Three.js零基础直通11》"),s("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);