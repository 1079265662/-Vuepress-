(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{536:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("JS 常用的数组方法合集"),a("br")])]),t._v(" "),a("h2",{attrs:{id:"map-item-return-重组解构-处理数组方法-重组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#map-item-return-重组解构-处理数组方法-重组"}},[t._v("#")]),t._v(" "),a("code",[t._v("map(item=>{return 重组解构})")]),t._v(" 处理数组方法(重组)")]),t._v(" "),a("blockquote",[a("p",[t._v("map后的数据类型: [{id:'',name:'',seq:''},{},{}.........]")])]),t._v(" "),a("ul",[a("li",[t._v("map() 方法返回一个"),a("code",[t._v("新数组")]),t._v("，数组中的元素为原始数组元素调用函数处理后的值")]),t._v(" "),a("li",[t._v("map() 具有两个参数 一个是原数据(item) 一个是索引值(index)")]),t._v(" "),a("li",[t._v("map可以作用于 对遍历的每一项数据 进行加工 让其变为新的数组。")]),t._v(" "),a("li",[t._v("map() 方法会遍历出一个新的数组(无需存储) 拿来用即可\n"),a("ul",[a("li",[t._v("用于数组中的每一项数据进行处理 最后返回一个新的数组")]),t._v(" "),a("li",[t._v("可以用于 给数组添加新的属性名")])])]),t._v(" "),a("li",[t._v("需要 "),a("font",{attrs:{color:"#ff3040"}},[t._v("return")])],1)]),t._v(" "),a("blockquote",[a("p",[t._v("对每一个现有频道进行排序 并且添加一些属性")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 对每一个现有频道进行排序（添加一个seq属性进行编号和其他数据）")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 先对之前的频道排序 利用map方法(包含index参数) 往里面添加 频道序列号")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" orderChannels "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("channels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 添加频道数据的id")]),t._v("\n          id"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 添加频道数据的名称")]),t._v("\n          name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 添加频道数据的 索引(map自带)")]),t._v("\n          seq"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" index\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 数据类型: [{id:'',name:'',seq:''},{},{}.........]")]),t._v("\n")])])]),a("h2",{attrs:{id:"filter-item-return-筛选条件-筛选数组方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#filter-item-return-筛选条件-筛选数组方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("filter(item=>{return 筛选条件})")]),t._v(" 筛选数组方法")]),t._v(" "),a("blockquote",[a("p",[t._v("返回的数据类型是 布尔值 符合条件 true 不符合 false")])]),t._v(" "),a("ul",[a("li",[t._v("filter() 方法创建一个"),a("code",[t._v("新数组")]),t._v("，新数组中的元素是通过检查指定数组中符合条件的所有元素。\n"),a("ul",[a("li",[a("strong",[t._v("注意")]),t._v("：filter() 不会对空数组进行检测。")]),t._v(" "),a("li",[a("strong",[t._v("注意")]),t._v("： filter() 不会改变原始数组。")]),t._v(" "),a("li",[a("font",{attrs:{color:"#ff3040"}},[t._v("需要: return")])],1)])])]),t._v(" "),a("blockquote",[a("p",[t._v("在数组筛选能被2整除的数据")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("56")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("15")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("48")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" newArr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newArr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [56, 48]")]),t._v("\n")])])]),a("blockquote",[a("p",[t._v("配合 "),a("code",[t._v("some()")]),t._v(" 检测数组中的元素是否满足指定条件(取反) 再"),a("code",[t._v("filter()")]),t._v("储存不满足条件数据")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("optionChannels")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? 进行筛选 filter()方法进行数据总筛选 接收some()传来的true(取反值) 代表不存在的数据为true filter() 方法储存不存在的数据即可")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素")]),t._v("\n        \n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("allChannels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("item")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// allChannels 是全部频道数据 channels是我的频道数据")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? 进行符合条件筛选 some() 并且取反 把不满足条件的取反变成true 返回给filter()筛选器")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ?  some()方法作用：判断数组中是否包含符合条件的数据，只要有一项符合，就返回true")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("channels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("some")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("items")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ?")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" items"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"some-item-return-条件判断-筛选数组方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#some-item-return-条件判断-筛选数组方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("some(item=>{return 条件判断})")]),t._v(" 筛选数组方法")]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("some()")]),t._v("不会创建一个新数组 "),a("code",[t._v("some()")]),t._v(" 方法用于检测数组中的元素是否满足指定条件（函数提供）。")])]),t._v(" "),a("li",[a("p",[t._v("如果有一个元素满足条件，则表达式返回"),a("em",[t._v("true")]),t._v(" , 剩余的元素不会再执行检测。")])]),t._v(" "),a("li",[a("p",[t._v("如果没有满足条件的元素，则返回false。")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("注意：")]),t._v(" some() 不会对空数组进行检测。")]),t._v(" "),a("li",[a("strong",[t._v("注意：")]),t._v(" some() 不会改变原始数组。")]),t._v(" "),a("li",[a("font",{attrs:{color:"#ff3040"}},[t._v("需要: return")])],1)])]),t._v(" "),a("li",[a("p",[t._v("通常和 "),a("code",[t._v("filter()")]),t._v("方法使用")])])]),t._v(" "),a("blockquote",[a("p",[t._v("配合 "),a("code",[t._v("some()")]),t._v(" 检测数组中的元素是否满足指定条件(取反) 再"),a("code",[t._v("filter()")]),t._v("储存不满足条件数据")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("optionChannels")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? 进行筛选 filter()方法进行数据总筛选 接收some()传来的true(取反值) 代表不存在的数据为true filter() 方法储存不存在的数据即可")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素")]),t._v("\n        \n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("allChannels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("filter")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("item")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// allChannels 是全部频道数据 channels是我的频道数据")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? 进行符合条件筛选 some() 并且取反 把不满足条件的取反变成true 返回给filter()筛选器")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ?  some()方法作用：判断数组中是否包含符合条件的数据，只要有一项符合，就返回true")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("channels"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("some")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("items")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ?")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" items"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"foreach-item-index-循环遍历"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#foreach-item-index-循环遍历"}},[t._v("#")]),t._v(" "),a("code",[t._v("forEach((item,index)=>{})")]),t._v(" 循环遍历")]),t._v(" "),a("ul",[a("li",[t._v("不会生成一个新数组 会直接改变原数组")]),t._v(" "),a("li",[t._v("本质上等同于 for 循环，对每一项执行 function 函数。")]),t._v(" "),a("li",[t._v("没有返回值(return)")]),t._v(" "),a("li",[a("font",{attrs:{color:"#ff340"}},[t._v("**注意: **")]),t._v("该方法会改变原始数组。")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("筛除3号数字")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\narr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("item")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"indexof-查找下标-索引值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#indexof-查找下标-索引值"}},[t._v("#")]),t._v(" "),a("code",[t._v('indexOf("")')]),t._v(" 查找下标(索引值)")]),t._v(" "),a("ul",[a("li",[t._v("查找 对应数据的索引值\n"),a("ul",[a("li",[t._v("如果存在 返回相应的索引值")]),t._v(" "),a("li",[t._v("如果不存在  返回 -1 (区分大小写)")])])])]),t._v(" "),a("blockquote",[a("p",[t._v("查询相应内容的下标")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"text/javascript"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"321"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"111"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\nstr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nstr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"321"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nstr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("indexOf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"666"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回的数值")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\n")])])]),a("h2",{attrs:{id:"splice-数组删除添加二合一"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#splice-数组删除添加二合一"}},[t._v("#")]),t._v(" "),a("code",[t._v("splice()")]),t._v(" 数组删除添加二合一")]),t._v(" "),a("ul",[a("li",[t._v("splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。")]),t._v(" "),a("li",[t._v("这个方法 不会生成 新数组 会直接改变原来数组")]),t._v(" "),a("li",[t._v("通常用作删除功能")])]),t._v(" "),a("p",[a("font",{attrs:{color:"#ff340"}},[t._v("**注意: **")]),t._v("该方法会改变原始数组。")],1),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("arrayObject"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("splice")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("howmany"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("item1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("itemX"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("参数")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("index")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("howmany")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("必需。要删除的项目数量。如果设置为 0，则不会删除项目。")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("item1, ..., itemX")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("可选。向数组添加的新项目。")])])])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("splice()")]),t._v(" 用作删除 示例")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ? 在页面数据历史记录 找到指定索引 进行删除 index是索引 1是删除一个")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("history"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("splice")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"replace-数组替换内容方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#replace-数组替换内容方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("replace()")]),t._v(" 数组替换内容方法")]),t._v(" "),a("ul",[a("li",[t._v("replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。")]),t._v(" "),a("li",[t._v("此方法不会创建一个 新数组 会直接改变原来数组")]),t._v(" "),a("li",[t._v("通常配合正则表达式来替换内容")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("\tw "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" kw"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 替换方法 replace(替换规则,替换数据)")]),t._v("\n")])])]),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("参数")]),t._v(" "),a("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("regexp/substr")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("必需。规定子字符串或要替换的模式的 RegExp 对象。请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("replacement")]),t._v(" "),a("td",{staticStyle:{"text-align":"left"}},[t._v("必需。一个字符串值。规定了替换文本或生成替换文本的函数。")])])])]),t._v(" "),a("blockquote",[a("p",[t._v("使用正则表达式 配合"),a("code",[t._v("replace")]),t._v("替换内容")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// kw此时包括span高亮的标签，需要去掉")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<span>")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("</span>")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ig'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//RegExp是正则表达式 对象模式 ")]),t._v("\n   \t  kw"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 替换方法 replace(替换的规则,需要替换的数据)")]),t._v("\n")])])]),a("h2",{attrs:{id:"new-set-数组去重方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#new-set-数组去重方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("new set()")]),t._v(" 数组去重方法")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/types/BrowserSetting/set",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN官网介绍"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[t._v("ES6 提供了新的数据结构 "),a("code",[t._v("new Set")]),t._v("。它类似于数组，但是成员的值都是唯一的，没有重复的值\n"),a("ul",[a("li",[t._v("设置该方法时候 需要在前面加 "),a("code",[t._v("new")]),t._v(" 创建一个新对象")])])]),t._v(" "),a("li",[t._v("需要手动 设置新数组 并且添加进去")]),t._v(" "),a("li",[a("code",[t._v("new set()")]),t._v("自带很多自己的方法")])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("set()")]),t._v("方法去除数组重复 示例")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 3. 进行搜索数据的去重 new Set() 方法去重后自动生成数组 把没有重复的数组覆盖到 原先数组中")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("history "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("history"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("h2",{attrs:{id:"push-数组添加方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#push-数组添加方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("push()")]),t._v(" 数组添加方法")]),t._v(" "),a("ul",[a("li",[t._v("把数据添加到数组末尾 对原数据不会有修改 不会覆盖 只是添加到末尾")])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("push()")]),t._v(" 方法 添加数据 示例")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 把服务器 获取的数据 储存到页面对象里 需要使用 push方法 因为分页是动态获取数据 需要用push添加 不覆盖之前数据")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("list"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("ret"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("results"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ... 是把所有数据储存起来")]),t._v("\n")])])]),a("h2",{attrs:{id:"unshift-数组开头添方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#unshift-数组开头添方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("unshift()")]),t._v(" 数组开头添方法")]),t._v(" "),a("ul",[a("li",[t._v("添加数据到数组开头 不会覆盖之前数据 只是添加到开头")])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("unshift()")]),t._v(" 方法 添加数据 示例")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ~ 把输入的内容 保存到历史关键字对象里 unshift会把数据添加到第一项 push是默认添加到结尾")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("history"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("unshift")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"add-数组添加方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-数组添加方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("add()")]),t._v(" 数组添加方法")]),t._v(" "),a("ul",[a("li",[t._v("把数据添加到数组内 会覆盖原先的数据")])]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("add()")]),t._v(" 方法添加数据 示例")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("list"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("ret"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("results"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n")])])]),a("h2",{attrs:{id:"tostring-对象转字符串方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tostring-对象转字符串方法"}},[t._v("#")]),t._v(" "),a("code",[t._v("toString()")]),t._v(" 对象转字符串方法")]),t._v(" "),a("ul",[a("li",[t._v("把对象转换为字符串格式\n"),a("ul",[a("li",[t._v("通常解决 js获取过长id无法解读 用到"),a("code",[t._v("json-bigint")]),t._v("插件时候 把查分id的对象  转为字符串")])])])]),t._v(" "),a("blockquote",[a("p",[t._v("把对象转换为字符串 (Vue的key只是别字符串)")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v('"item'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("art_id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"split-字符串分割成字符串数组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#split-字符串分割成字符串数组"}},[t._v("#")]),t._v(" "),a("code",[t._v("split(',')")]),t._v(" 字符串分割成字符串数组")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("split()")]),t._v(" 会创建一个新的字符串数组 但不会改变原始字符串")]),t._v(" "),a("li",[a("code",[t._v("split()")]),t._v(" 方法用于把一个字符串分割成字符串数组。")]),t._v(" "),a("li",[t._v("数组字符串通过是 , 隔开")]),t._v(" "),a("li",[t._v("把字符串转成 字符串数组 可以方便循环遍历 在页面渲染出来")])]),t._v(" "),a("blockquote",[a("p",[t._v("把符合条件的内容 从字符串分割成字符串数组")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("movie"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tags"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 满足条件 把字符串分割为 字符串数组")]),t._v("\n                state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("movie"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tags "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("movie"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tags"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("','")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"includes-判断数组是否包含一个指定的值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#includes-判断数组是否包含一个指定的值"}},[t._v("#")]),t._v(" "),a("code",[t._v("includes()")]),t._v(" 判断数组是否包含一个指定的值")]),t._v(" "),a("ul",[a("li",[t._v("返回的值是布尔值\n"),a("ul",[a("li",[t._v("如果含有 返回true")]),t._v(" "),a("li",[t._v("如果不含 返回false")])])]),t._v(" "),a("li",[t._v("可以判断路径地址")])]),t._v(" "),a("blockquote",[a("p",[t._v("设置路径白名单 判断是否在该路径下")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个路径白名单 里面填写的是路径 (允许用户游客模式访问一些内容 比如登录页 404 没必要验证)")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" white "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/login'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/404'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断是否处于该路径地址")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("white"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("includes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("to"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n \n "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);