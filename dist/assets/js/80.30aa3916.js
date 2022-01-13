(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{600:function(t,a,n){"use strict";n.r(a);var s=n(2),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("介绍")]),t._v(" "),n("p",[t._v("什么是m3u8呢 和mp4比起来有什么区别呢 "),n("br")])]),t._v(" "),n("h2",{attrs:{id:"m3u8视频-是一种什么样的视频格式"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#m3u8视频-是一种什么样的视频格式"}},[t._v("#")]),t._v(" m3u8视频 是一种什么样的视频格式？")]),t._v(" "),n("ul",[n("li",[t._v("m3u8不是一种视频格式，m3u8是苹果公司提出的一种视频播放方式是一种纯文本文件。\n"),n("ul",[n("li",[t._v("m3u8视频文件格式中"),n("code",[t._v("存放了视频的基本信息")]),t._v("和 "),n("code",[t._v("分段视频的索引地址 (将一整个视频分成了时长不同的很多小段)")]),t._v("。当播放m3u8视频时，就是按顺序下载播放索引列表的视频，从而完成一部完整视频的播放。")])])])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173420184.png",alt:"image-20211025173420184"}})]),t._v(" "),n("h2",{attrs:{id:"m3u8和mp4的对比"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#m3u8和mp4的对比"}},[t._v("#")]),t._v(" m3u8和mp4的对比")]),t._v(" "),n("ul",[n("li",[n("p",[t._v("了解了m3u8的文件格式和播放原理，下边就可以对m3u8 与mp4 做一个简单对比了。")]),t._v(" "),n("ul",[n("li",[t._v("mp4 对HTML5和flash播放器亲和度都挺好。但是文件头太大，结构复杂，"),n("strong",[n("code",[t._v("长视频的大文件头影响加载速度的视频体")])]),t._v("，所以"),n("strong",[t._v("短视频更常见")])]),t._v(" "),n("li",[t._v("m3u8 采用苹果的HLS协议，目前 ios与android设备均已支持(微信小程序支持,pc端需要插件)。由于其工作原因是将整个视频流分成一个个小的基于Http的文件进行下载播放，因此"),n("code",[t._v("支持视频直播")]),t._v("。")])])]),t._v(" "),n("li",[n("p",[n("font",{attrs:{color:"#ff3040"}},[t._v("什么是视频文件头?")])],1),t._v(" "),n("blockquote",[n("p",[t._v("视频文件头说白了就是视频加载到播放的一个秒开率")])]),t._v(" "),n("ul",[n("li",[t._v("m3u8 (第一切片为1~3秒) 对比 mp4 的秒开率和成功率更高\n"),n("ul",[n("li",[t._v("m3u8 因为他是切割视频 所以可以优化视频的开头\n"),n("ul",[n("li",[t._v("m3u8 文件的 第一个ts片段长度为1~3秒")]),t._v(" "),n("li",[t._v("m3u8 文件的 第二个ts片段长度为3~5秒")]),t._v(" "),n("li",[t._v("m3u8 文件的 第三个ts片段长度为10秒左右")]),t._v(" "),n("li",[t._v("m3u8 文件的 第四个ts片段以上长度为30秒左右")]),t._v(" "),n("li",[t._v("m3u8 文件 最长ts片段不超过35秒")])])])])]),t._v(" "),n("li",[t._v("mp4无法进行视频开头的优化 无法进行切割")])])]),t._v(" "),n("li",[n("p",[n("font",{attrs:{color:"#ff3040"}},[t._v("更省流量更省资源")])],1),t._v(" "),n("ul",[n("li",[t._v("m3u8 会根据用户的进度 来逐步的获取到视频的资源 并且当用户暂停播放的时候 不会进行数据的获取 更友好的请求服务器 减少数据浪费\n"),n("ul",[n("li",[t._v("无需压缩视频 高质量视频进行切割即可")]),t._v(" "),n("li",[t._v("能够将部分m3u8的播放块切块之后直接加载到服务器内存中，让客户端可以更快的得到数据。")]),t._v(" "),n("li",[t._v("HTTP Live Streaming 巨大优势：自适应码率流播（adaptive streaming）。效果就是客户端会根据网络状况自动选择不同码率的视频流，条件允许的情况下使用高码率，网络繁忙的时候使用低码率，并且自动在二者 间随意切换。这对移动设备网络状况不稳定的情况下保障流畅播放非常有帮助。实现方法是服务器端提供多码率视频流，并且在列表文件中注明，播放器根据播放进 度和下载速度自动调整。")])])]),t._v(" "),n("li",[t._v("mp4 会一直请求服务器 获取资源 直到获取到视频全部 容易造成数据浪费\n"),n("ul",[n("li",[t._v("需要压缩视频 高质量视频想做性能提升 只能压缩画质")]),t._v(" "),n("li",[t._v("无法使用 HTTP的功能 不能自适应码率播放视频")])])])])])]),t._v(" "),n("blockquote",[n("p",[t._v("m3u8 格式的请求数据")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173601681.png",alt:"image-20211025173601681"}})]),t._v(" "),n("blockquote",[n("p",[t._v("mp4 格式请求数据")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173718462.png",alt:"image-20211025173718462"}})]),t._v(" "),n("h2",{attrs:{id:"谁在用m3u8"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#谁在用m3u8"}},[t._v("#")]),t._v(" 谁在用m3u8")]),t._v(" "),n("blockquote",[n("p",[t._v("通过"),n("code",[t._v("猫抓")]),t._v("爬来的视频数据展示")])]),t._v(" "),n("ul",[n("li",[t._v("优酷视频 (移动端)")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019173128405.png",alt:"image-20211019173127622"}})]),t._v(" "),n("ul",[n("li",[t._v("爱奇艺视频(移动端)")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019173831064.png",alt:""}})]),t._v(" "),n("ul",[n("li",[t._v("百度百科")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019182454565.png",alt:"image-20211019182454565"}})]),t._v(" "),n("ul",[n("li",[t._v("斗鱼视频(移动端)")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019183110313.png",alt:"image-20211019183110313"}})]),t._v(" "),n("ul",[n("li",[t._v("a站")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019183420904.png",alt:"image-20211019183420904"}})]),t._v(" "),n("ul",[n("li",[t._v("腾讯课堂")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173833887.png",alt:""}})]),t._v(" "),n("h2",{attrs:{id:"m3u8转换是不是太难"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#m3u8转换是不是太难"}},[t._v("#")]),t._v(" m3u8转换是不是太难?")]),t._v(" "),n("ul",[n("li",[t._v("经过"),n("a",{attrs:{href:"https://blog.csdn.net/qq_36623327/article/details/83007456",target:"_blank",rel:"noopener noreferrer"}},[t._v("教程"),n("OutboundLink")],1),t._v("的学习 m3u8的转换不是很困难 只需要下载"),n("code",[t._v("ffmpeg")]),t._v("软件并且输入一行命令 (支持自定义视频) 即可把视频分割成小块块 然后统一放在阿里云上即可 (m3u8 和 分成的ts文件必须在同级)")])]),t._v(" "),n("blockquote",[n("p",[t._v("第一步 切割视频")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("ffmpeg -i D:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("video"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("video.MP4 -profile:v baseline -level "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.0")]),t._v(" -s 640x360 -start_number "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" -hls_time "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),t._v(" -hls_list_size "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" -f hls D:"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("video"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("videoChange.m3u8\n")])])]),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019190003598.png",alt:"image-20211019190003598"}})]),t._v(" "),n("blockquote",[n("p",[t._v("第二步 上传阿里云 设置共有读")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019190141584.png",alt:"image-20211019190141584"}})]),t._v(" "),n("blockquote",[n("p",[t._v("第三步 获取m3u8文件地址")])]),t._v(" "),n("ul",[n("li",[t._v("配置后台视频地址的时候 只需要设置m3u8文件的地址即可")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019190212200.png",alt:"image-20211019190212200"}})]),t._v(" "),n("h2",{attrs:{id:"m3u8的缺点"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#m3u8的缺点"}},[t._v("#")]),t._v(" m3u8的缺点")]),t._v(" "),n("ul",[n("li",[t._v("碎片化的操作管理方式")]),t._v(" "),n("li",[t._v("有操作成本的视频转换")]),t._v(" "),n("li",[t._v("单个短视频效果不明显 (视频预加载效果明显)")]),t._v(" "),n("li",[t._v("暂时没找到mac的"),n("code",[t._v("ffmpeg")]),t._v("的软件")])]),t._v(" "),n("h2",{attrs:{id:"参考文献"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参考文献"}},[t._v("#")]),t._v(" 参考文献")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://www.cnblogs.com/alexgl2008/articles/12893849.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("“m3u8格式简析”与“视频秒开优化”"),n("OutboundLink")],1)]),t._v(" "),n("p",[n("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/338679519",target:"_blank",rel:"noopener noreferrer"}},[t._v("近年开始流行使用的.m3u8视频格式是什么？相比mp4在什么场景采用？"),n("OutboundLink")],1)]),t._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/vx_list/article/details/51956207",target:"_blank",rel:"noopener noreferrer"}},[t._v("M3U8格式讲解及实际应用分析"),n("OutboundLink")],1)]),t._v(" "),n("p",[n("a",{attrs:{href:"https://xiaxl.blog.csdn.net/article/details/103370511",target:"_blank",rel:"noopener noreferrer"}},[t._v("mp4相比m3u8第一帧加载较慢的原因？"),n("OutboundLink")],1)]),t._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/qq_36623327/article/details/83007456",target:"_blank",rel:"noopener noreferrer"}},[t._v("使用ffmpeg将MP4视频转换为m3u8格式"),n("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);