(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{538:function(t,s,v){"use strict";v.r(s);var _=v(2),a=Object(_.a)({},(function(){var t=this,s=t.$createElement,v=t._self._c||s;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("div",{staticClass:"custom-block tip"},[v("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),v("p",[t._v("JS同步异步操作 和 宏任务微任务的面试介绍 "),v("br")])]),t._v(" "),v("h2",{attrs:{id:"同步异步"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#同步异步"}},[t._v("#")]),t._v(" 同步异步")]),t._v(" "),v("ul",[v("li",[t._v("js运行环境是单线程\n"),v("ul",[v("li",[t._v("同一时间只能做一件事 单线程(同步) + 事件队列(任务队列 异步)\n"),v("ul",[v("li",[t._v("因为js需要操作页面 单线程对于页面操作很友好")])])]),t._v(" "),v("li",[t._v("单线程会卡断 所以引用了事件队列机制 防止阻塞影响性能\n"),v("ul",[v("li",[t._v("如果单线程代码执行过程中 遇到异步场景 会放入队列(宏任务) 立刻执行后续其他的代码(微任务)\n"),v("ul",[v("li",[t._v("异步操作: 1. 定时函数(满足延时时间) 2. 事件函数(特定事件触发) 3. ajax回调函数(服务器有数据返回)")])])])])])])]),t._v(" "),v("li",[t._v("js是单线程 浏览器是多线程\n"),v("ul",[v("li",[t._v("浏览器编译js的时候是单线程 但是浏览器可以判断 同步任务 和 异步任务 如果是异步任务就放入事件队列")])])]),t._v(" "),v("li",[t._v("当同步任务执行完毕后 浏览器会传递异步任务 异步任务也分为 宏任务微任务 先执行宏任务 再执行微任务")])]),t._v(" "),v("h2",{attrs:{id:"宏任务微任务"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#宏任务微任务"}},[t._v("#")]),t._v(" 宏任务微任务")]),t._v(" "),v("ul",[v("li",[t._v("进入浏览器事件队列的任务就 是宏任务")]),t._v(" "),v("li",[t._v("不进入浏览器队列但是进入微任务队列的 是微任务")]),t._v(" "),v("li",[t._v("宏任务 微任务 都是事件队列\n"),v("ul",[v("li",[v("font",{attrs:{color:"#ff3040"}},[t._v("先同步再异步，在此异步基础上先宏任务再微任务")]),t._v(" "),v("ul",[v("li",[t._v("任务执行的时候仍然可能产生新的任务(宏任务 微任务 都有可能)")])])],1)])])]),t._v(" "),v("h2",{attrs:{id:"宏任务-微任务的执行顺序"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#宏任务-微任务的执行顺序"}},[t._v("#")]),t._v(" 宏任务 微任务的执行顺序")]),t._v(" "),v("ul",[v("li",[t._v("代码的优先级: 主线程>宏任务>微任务 (微任务 宏任务都是异步)")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/s2lDdZPRqe6crIx.png",alt:"image-20210704203139670"}})]),t._v(" "),v("h2",{attrs:{id:"宏任务-微任务-有哪些"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#宏任务-微任务-有哪些"}},[t._v("#")]),t._v(" 宏任务 微任务 有哪些")]),t._v(" "),v("p",[t._v("同步:  网站的渲染过程 如元素的渲染，其实就是一个同步任务")]),t._v(" "),v("p",[t._v("异步: ajax axios setTimeout setInterval (都是宏任务) Promise nextTick (微任务)")]),t._v(" "),v("p",[v("font",{attrs:{color:"#ff3040"}},[t._v("宏任务: ")]),t._v("script setTimeout setInterval")],1),t._v(" "),v("p",[v("font",{attrs:{color:"#ff3040"}},[t._v("微任务: ")]),t._v("Promise nextTick process")],1),t._v(" "),v("p",[v("strong",[t._v("try catch")]),t._v("是处理同步异常")]),t._v(" "),v("p",[v("strong",[v("code",[t._v("Promise")]),t._v("的 try catch")]),t._v("是处理异步异常")])])}),[],!1,null,null,null);s.default=a.exports}}]);