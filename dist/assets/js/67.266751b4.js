(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{587:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),a("p",[t._v("函数节流 函数防抖的设置与原理 "),a("br")])]),t._v(" "),a("h2",{attrs:{id:"函数节流设置方法-throttle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数节流设置方法-throttle"}},[t._v("#")]),t._v(" 函数节流设置方法 "),a("code",[t._v("throttle")])]),t._v(" "),a("blockquote",[a("p",[t._v("目的: 防止用户多次刷新 出现bug")]),t._v(" "),a("p",[t._v("原理: 设置一个对象 默认为false 如果第一次执行方法 先让其编程true 等代码执行完毕后 再恢复false 判断是否为true 如果是return跳出 防止多次刷新")]),t._v(" "),a("p",[t._v("场景: 分页功能动态加载(滚动条类型)")]),t._v(" "),a("p",[t._v("作用:  在固定的时间内（1秒），无论触发多少次条件（onLoad触发一次），仅仅执行一次任务（加载一页数据）")])]),t._v(" "),a("p",[t._v("函数节流: 固定的时间内 无论触发多少次条件 都只会进行一次 直到条件结束")]),t._v(" "),a("blockquote",[a("p",[t._v("函数节流 滚动条示例")])]),t._v(" "),a("div",{staticClass:"language-diff extra-class"},[a("pre",{pre:!0,attrs:{class:"language-diff"}},[a("code",[a("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[a("span",{pre:!0,attrs:{class:"token prefix deleted"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("script>\n")])]),t._v("// ? 导入不同用户的频道数据\nimport { getAllChannels } from '../../api/channel'\nexport default {\n"),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" data () {\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("   return {\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     // 控制Tab当前选中的条目\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     active: 0,\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     // 列表数据加载过程的状态位(加载的过程 会自动修改为true 但是渲染完毕后 需要手动修改false)\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     loading: false,\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     // 列表加载完成的标志(加载的结束 设置指定数值 加载到一定数目结束加载 需要手动修改true)\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     finished: false,\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     // 列表数据\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     list: [],\n")])]),a("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("      // 设置函数节流\n")]),a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("      throttle: false\n")])]),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("   }\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" },\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" methods: {\n")])]),t._v("// 每次触发动态加载一页新的数据（上滑到底部时触发）\n"),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("   onLoad () {\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     // 函数节流: 固定的时间内 无论触发多少次条件 都只会进行一次进入\n")])]),a("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" // 原理: 设置一个对象 默认为false 如果第一次执行方法 先让其编程true 等代码执行完毕后 再恢复false 判断是否为true 如果是return跳出 防止多次刷新\n")]),a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       // 启动函数节流: 如果 throttle为true 就让其跳出 不执行下面代码\n")]),a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       if (this.throttle) return\n")]),a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       // 设置 throttle 为true 让其执行一次\n")]),a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       this.throttle = true\n")])]),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     // 模拟异步操作\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     setTimeout(() => {\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       // 加载一页新的数据\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       for (let i = 0; i < 10; i++) {\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("         this.list.push(this.list.length + 1)\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       }\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       // 告诉列表组件本次数据已经完成加载\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       this.loading = false\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       // 如果加载完成后，需要告诉list组件\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       if (this.list.length >= 50) {\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("         // 加载结束(不改成true 加载不会结束 会一直加载)\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("         this.finished = true\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       }\n")])]),a("span",{pre:!0,attrs:{class:"token inserted-sign inserted"}},[a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("       // 再设置回false 让其下次可以触发方法  \n")]),a("span",{pre:!0,attrs:{class:"token prefix inserted"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("         this.throttle = false\n")])]),a("span",{pre:!0,attrs:{class:"token unchanged"}},[a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("     }, 1000)\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("   }\n")]),a("span",{pre:!0,attrs:{class:"token prefix unchanged"}},[t._v(" ")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v(" }\n")])]),a("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[a("span",{pre:!0,attrs:{class:"token prefix deleted"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token line"}},[t._v("/script>\n")])])])])]),a("h2",{attrs:{id:"函数防抖设置方法-debounce"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数防抖设置方法-debounce"}},[t._v("#")]),t._v(" 函数防抖设置方法 "),a("code",[t._v("debounce")])]),t._v(" "),a("blockquote",[a("p",[t._v("目的: 限制任务执行的频率(防止同一时间 多次把数据上传到服务器)")]),t._v(" "),a("p",[t._v("原理: 使用 "),a("code",[t._v("setTimeout")]),t._v(" 来存放待执行的函数，这样可以很方便的利用 "),a("code",[t._v("clearTimeout")]),t._v(" 在合适的时机来清除待执行的函数")]),t._v(" "),a("p",[t._v("场景: 关键字搜索 账号重复性验证 (输入效验 搜索返回)")]),t._v(" "),a("p",[t._v("作用: 如果连续两次触发条件的时间间隔超过规定的时间，那么才触发一次任务，如果两次触发条件的间隔小于这个固定时间，那么始终不触发任务。(上一个任务 覆盖下一个任务 直到最后执行一个任务)")])]),t._v(" "),a("p",[t._v("函数防抖: 连续两次触发条件超过特定时间才会执行一次任务")]),t._v(" "),a("h2",{attrs:{id:"函数防抖-搜索示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数防抖-搜索示例"}},[t._v("#")]),t._v(" 函数防抖 搜索示例")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://vant-contrib.gitee.io/vant/#/zh-CN/search",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vant 提供搜索插件"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("目标：用书输入搜索内容 获取服务器返回的联想")]),t._v(" "),a("p",[t._v("效果: 当用户输入的时候 显示模糊搜索联想")]),t._v(" "),a("p",[t._v("原理: 输入绑定@input功能 实现用户输入就获取其数据 用户输入数据 提交服务器 服务器返回 模糊匹配数据 打印到页面")]),t._v(" "),a("p",[a("font",{attrs:{color:"#ff3040"}},[t._v("注意: ")]),t._v(" 需要设置"),a("code",[t._v("函数防抖 debounce")]),t._v(" 限制提交频率 在规定时间内 只上传一次数据 (1秒)")],1)]),t._v(" "),a("ul",[a("li",[a("code",[t._v("template")]),t._v(" 模板设置\n"),a("ul",[a("li",[t._v("设置 "),a("code",[t._v("@input")]),t._v("方法 用户输入内容时候 触发方法")]),t._v(" "),a("li",[t._v("循环遍历 服务器返回的搜索匹配 打印到页面上")])])])]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 搜索框 Vant search 提供的方法  @search按下回车点击搜索触发 .trim Vue提供的修饰符 用户去除两边空格(防止用户在两边输入空格)\n          绑定 @input功能 只要用户开始搜索 就触发--\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("van-search")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@input")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("keywordList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@search")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("handleSearch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-model.trim")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("placeholder")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("请输入搜索关键词"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("shape")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("round"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 通过v-if v-else 判断 如果有输入内容 就切换成联想列表 没有输入内容就显示历史记录 --\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 联想列表 --\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("van-cell-group")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("suggest-box"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-if")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 携带点击搜索结果的详细条目信息 --\x3e")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("van-cell")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click.stop")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("handleJump(items)"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-for")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("(items,index) in keylist"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":key")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("icon")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("search"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 使用v-html 实现样式也能打印出来 --\x3e")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{items}}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("p")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- <p>{{items}}</p> --\x3e")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("van-cell")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("van-cell-group")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("ul",[a("li",[a("code",[t._v("script")]),t._v(" 脚本  "),a("code",[t._v("data()")]),t._v(" 储存数据\n"),a("ul",[a("li",[t._v("存储 服务器返回的搜索数据")]),t._v(" "),a("li",[t._v("存储 把用户搜索的关键字 储存到函数防抖机制中")])])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 搜索关键字(搜索框里面的内容)")]),t._v("\n      q"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n \t "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 创建一个空对象 服务器返回的搜索数据")]),t._v("\n      keylist"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 创建一个函数防抖函数 默认为空null(对象存储起来 用于删除防抖定时)")]),t._v("\n      timer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[a("code",[t._v("script")]),t._v(" 脚本  "),a("code",[t._v("methods")]),t._v(" 函数方法\n"),a("ul",[a("li",[t._v("需要设置函数防抖 1秒内 只会向服务器请求一次数据")])])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 搜索功能的实现")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("keywordList")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 添加搜索的 函数防抖(利用定时器 在一定时间内向服务器发送一次指令 防止频繁发送指令给服务器)")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 1. 当数据传入过来的时候 重置(清除)上一个防抖定时器")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clearTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("timer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 2. 防止用户输入空格搜索 trim()方法取消首尾空格后 没有数据 取反返回true 如果为true return 跳出方法")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("trim")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 3. 创建一个防抖函数(定时器)")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("timer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 5. 需要设置async同步")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 6. 向服务器发送数据")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" ret "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("searchList")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("q"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 7. 把服务器传回的值 保存到页面搜索数据里 用于打印到页面上")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("keylist "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ret"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("options\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//! 每隔一秒钟 触发一次(向服务器发送数据)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);