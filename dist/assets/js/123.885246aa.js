(window.webpackJsonp=window.webpackJsonp||[]).push([[123],{647:function(t,s,a){"use strict";a.r(s);var n=a(2),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("GLTF格式简介 包含软件的支持程度"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"什么是gltf"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是gltf"}},[t._v("#")]),t._v(" 什么是GLTF")]),t._v(" "),a("p",[t._v("如果你是一名前端工程师，在开发web前端项目的时候，你肯定遇到过图片，比如常见的图片格式.png和.jpg。对于Web3D的三维模型同样如此，也有不同的格式，不同格式的图片可以包含不同的数据，不同格式的三维模型同样如此。")]),t._v(" "),a("p",[t._v("三维模型格式枚举：.stl、.obj、.ply、.dae、.fbx、.gltf、stp....")]),t._v(" "),a("p",[t._v("GLTF格式是新2015发布的三维模型格式，随着物联网、WebGL、5G的进一步发展，会有越来越多的互联网项目Web端引入3D元素，你可以把GLTF格式的三维模型理解为.jpg、.png格式的图片一样，现在的网站，图片基本是标配，对于以后的网站来说如果需要展示一个场景，使用3D来替换图片表达也是很正常的事情。图片有很多格式，对于三维模型自然也是如此，Web开发的时候图片会有常用格式，对于Web3D开发也一样，肯定会根据需要选择一个常见的大家都熟悉的格式，随时时间的发展，GLTF必然称为一个极为重要的标准格式。")]),t._v(" "),a("p",[t._v("不仅three.js，其它的WebGL三维引擎cesium、babylonjs都对gltf格式有良好的的支持。")]),t._v(" "),a("p",[t._v("实际上GLTF会帮助我们在three.js创建场景对象 three.js会解析这些内容 最终在页面生成建模(GLTF)给我们的效果 省去了开发用three.js进行建模的操作 我们只需要设置 相机 和 光源 还有交互效果即可")]),t._v(" "),a("h2",{attrs:{id:"gltf版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gltf版本"}},[t._v("#")]),t._v(" GLTF版本")]),t._v(" "),a("p",[t._v("Khronos Group组织2015发布了GLTF 1.0版本，在2017年又发布了GLTF2.0的版本。")]),t._v(" "),a("p",[t._v("关于glTF的更多介绍和信息，可以查看github："),a("a",{attrs:{href:"https://github.com/KhronosGroup/glTF",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/KhronosGroup/glTF"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"gltf包含内容"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gltf包含内容"}},[t._v("#")]),t._v(" GLTF包含内容")]),t._v(" "),a("p",[t._v("相比较obj、stl等格式而言，.gltf格式可以包含更多的模型信息。")]),t._v(" "),a("p",[t._v(".gltf格式文件几乎可以包含所有的三维模型相关信息的数据，比如网格模型、PBR材质、纹理贴图、骨骼、变形、动画、光源、相机...")]),t._v(" "),a("h3",{attrs:{id:"gltf格式信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gltf格式信息"}},[t._v("#")]),t._v(" "),a("strong",[t._v("GLTF格式信息")])]),t._v(" "),a("p",[t._v("如果你有一定的前端基础，那么你对JSON一定不陌生，GLTF文件就是通过JSON的键值对方式来表示模型信息，比如"),a("code",[t._v("meshes")]),t._v("表示网格模型信息，"),a("code",[t._v("materials")]),t._v("表示材质信息...")]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"asset"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模型材质信息")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"materials"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pbrMetallicRoughness"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//PBR材质")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"baseColorFactor"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"metallicFactor"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//金属度")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"roughnessFactor"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//粗糙度")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 网格模型数据")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"meshes"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 纹理贴图")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"images"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// uri指向外部图像文件")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uri"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"贴图名称.png"')]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//图像数据也可以直接存储在.gltf文件中")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"buffers"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 一个buffer对应一个二进制数据块，可能是顶点位置 、顶点索引等数据")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"byteLength"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("840")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//这里面的顶点数据，也快成单独以.bin文件的形式存在   ")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uri"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(' "data'),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("application"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("octet"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("stream"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("base64"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("AAAAPwAAAD8AAAA"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("AAAAPwAAAD8AAAC"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"bin文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bin文件"}},[t._v("#")]),t._v(" "),a("strong",[a("code",[t._v(".bin")]),t._v("文件")])]),t._v(" "),a("p",[t._v("有些glTF文件会关联一个或多个.bin文件，.bin文件以二进制形式存储了模型的顶点数据等信息。\n.bin文件中的信息其实就是对应gltf文件中的buffers属性，buffers.bin中的模型数据，可以存储在.gltf文件中,也可以单独一个二进制.bin文件。")]),t._v(" "),a("div",{staticClass:"language-JavaScript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"buffers"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"byteLength"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("102040")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"uri"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"文件名.bin"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("h3",{attrs:{id:"二进制-glb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二进制-glb"}},[t._v("#")]),t._v(" "),a("strong",[t._v("二进制.glb")])]),t._v(" "),a("p",[t._v("gltf格式文件不一定就是以扩展名.gltf结尾，.glb就是gltf格式的二进制文件。比如你可以把.gltf模型和贴图信息全部合成得到一个.glb文件中，.glb文件相对.gltf文件体积更小，网络传输自然更快。")]),t._v(" "),a("h3",{attrs:{id:"gltf格式模型在线预览"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gltf格式模型在线预览"}},[t._v("#")]),t._v(" "),a("strong",[t._v("GLTF格式模型在线预览")])]),t._v(" "),a("p",[t._v("你可以通过gltf-viewer平台预览GLTF格式模型，当然你也可以通过three.js editor预览gltf格式模型。")]),t._v(" "),a("ol",[a("li",[a("p",[a("strong",[t._v("gltf-viewer")]),t._v("：https://gltf-viewer.donmccurdy.com/")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("three.js editor")]),t._v(":https://threejs.org/editor/")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("vscode")]),t._v("预览gltf模型：vscode搜索gltf，可以看到glTF Tools的工具")])])]),t._v(" "),a("h3",{attrs:{id:"导出gltf"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导出gltf"}},[t._v("#")]),t._v(" "),a("strong",[t._v("导出GLTF")])]),t._v(" "),a("p",[t._v("可以把"),a("strong",[t._v("three.js editor")]),t._v("作为工具，加载其他模型导出的obj、fbx等格式，然后转化为gltf格式。")]),t._v(" "),a("p",[t._v("3damx gltf相关插件：https://github.com/BabylonJS/Exporters/releases")]),t._v(" "),a("p",[t._v("blender：最新版本可以直接导出gltf，旧的版本可以通过gltf插件实现。")]),t._v(" "),a("h3",{attrs:{id:"gltf颜色空间"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gltf颜色空间"}},[t._v("#")]),t._v(" "),a("strong",[t._v("GLTF颜色空间")])]),t._v(" "),a("ul",[a("li",[t._v("GLTF颜色空间是 sRGB在three.js中使用")]),t._v(" "),a("li",[t._v("在three.js中 需要单独设置")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("outputEncoding "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("THREE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sRGBEncoding"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//解决加载gltf格式模型纹理贴图和原图不一样问题")]),t._v("\n")])])]),a("h3",{attrs:{id:"gltf光源支持"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gltf光源支持"}},[t._v("#")]),t._v(" "),a("strong",[t._v("GLTF光源支持")])]),t._v(" "),a("ul",[a("li",[t._v("gltf模型不能包含three.js中的环境光光源 "),a("code",[t._v("AmbientLight")]),t._v("、半球光光源 "),a("code",[t._v("HemisphereLight")]),t._v("、平面光光源 "),a("code",[t._v("RectAreaLight")]),t._v("。")]),t._v(" "),a("li",[t._v("gltf格式模型可以包含平行光光源 "),a("code",[t._v("DirectionalLight")]),t._v("、点光源 "),a("code",[t._v("PointLight")]),t._v("、聚光源 "),a("code",[t._v("SpotLight")]),t._v("。")])]),t._v(" "),a("h2",{attrs:{id:"软件支持"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#软件支持"}},[t._v("#")]),t._v(" 软件支持")]),t._v(" "),a("ul",[a("li",[t._v("Blender 支持直接导出 并且支持二进制"),a("code",[t._v("glb")]),t._v("和拆分式"),a("code",[t._v("gltf")])]),t._v(" "),a("li",[t._v("3Dmax和maya需要额外的插件")])]),t._v(" "),a("h3",{attrs:{id:"_3dmax安装gltf插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3dmax安装gltf插件"}},[t._v("#")]),t._v(" "),a("strong",[t._v("3Dmax安装GLTF插件")])]),t._v(" "),a("p",[t._v("打开Babylonjs引擎github上相关的资源链接：https://github.com/BabylonJS/Exporters/releases，选择你的3dmax版本对应的zip文件下载，比如我的3dmax版本是2018，我需要下载"),a("code",[t._v("Max_2018.zip")]),t._v("文件。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/Max_2018.zip.png",alt:"Max_2018.zip.png"}})]),t._v(" "),a("h3",{attrs:{id:"解压复制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解压复制"}},[t._v("#")]),t._v(" 解压复制")]),t._v(" "),a("p",[t._v("关闭你的3dmax软件，解压你下载的zip文件，比如我下载的"),a("code",[t._v("Max_2018.zip")]),t._v("文件,把解压出来的文件全部复制到你3dmax的安装目录"),a("code",[t._v("\\bin\\assemblies")]),t._v("下面，复制时候如果需要替换原来的文件，直接替换就可以。")]),t._v(" "),a("p",[t._v("3dmax安装后，"),a("code",[t._v("\\bin\\assemblies")]),t._v("文件我的默认是地址是"),a("code",[t._v("C:\\Program Files\\Autodesk\\3ds Max 2018\\bin\\assemblies")]),t._v("，可以通过3damx桌面图标右键查看文件地址快速寻找。")]),t._v(" "),a("h3",{attrs:{id:"导出gltf或-glb格式模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导出gltf或-glb格式模型"}},[t._v("#")]),t._v(" 导出gltf或.glb格式模型")]),t._v(" "),a("p",[t._v("在"),a("code",[t._v("\\bin\\assemblies")]),t._v("文件下完成文件复制替换后，重新打开3dmax程序，在界面的最上方右侧可以发现多了一个菜单命令babylon。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/babylon.png",alt:""}})]),t._v(" "),a("p",[t._v("babylon命令开发如下图所示，可以直接选择导出的格式。\n"),a("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/export.png",alt:""}})]),t._v(" "),a("h3",{attrs:{id:"导出相关问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导出相关问题"}},[t._v("#")]),t._v(" 导出相关问题")]),t._v(" "),a("p",[t._v("导出gltf或glb格式的模型后，我打开相关的模型查看材质，所有的材质默认都是PBR材质，threejs的GLTF加载器解析出来的结果是threejs的物理材质"),a("a",{attrs:{href:"http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/materials/MeshStandardMaterial",target:"_blank",rel:"noopener noreferrer"}},[t._v("MeshStandardMaterial"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("p",[t._v("如果想导出Lambert或Phong材质应该如何操作，如果不行的话，也可以自己写程序批量替换相关的材质，毕竟PBR材质可以包含除了Phong材质高光")])])}),[],!1,null,null,null);s.default=r.exports}}]);