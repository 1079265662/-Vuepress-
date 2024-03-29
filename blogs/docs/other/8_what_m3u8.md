---
title: m3u8的学习资料(博客版)
date: 2021-10-25
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-6op786.jpg
tags:
 - H5Video
categories: other
---

::: tip 介绍
什么是m3u8呢 和mp4比起来有什么区别呢 <br>
:::

<!-- more -->

## m3u8视频 是一种什么样的视频格式？

* m3u8不是一种视频格式，m3u8是苹果公司提出的一种视频播放方式是一种纯文本文件。
  * m3u8视频文件格式中`存放了视频的基本信息`和 `分段视频的索引地址 (将一整个视频分成了时长不同的很多小段)`。当播放m3u8视频时，就是按顺序下载播放索引列表的视频，从而完成一部完整视频的播放。

![image-20211025173420184](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173420184.png)

## m3u8和mp4的对比

* 了解了m3u8的文件格式和播放原理，下边就可以对m3u8 与mp4 做一个简单对比了。

  - mp4 对HTML5和flash播放器亲和度都挺好。但是文件头太大，结构复杂，**`长视频的大文件头影响加载速度的视频体`**，所以**短视频更常见**
  - m3u8 采用苹果的HLS协议，目前 ios与android设备均已支持(微信小程序支持,pc端需要插件)。由于其工作原因是将整个视频流分成一个个小的基于Http的文件进行下载播放，因此`支持视频直播`。

* <font color =#ff3040>什么是视频文件头?</font>

  > 视频文件头说白了就是视频加载到播放的一个秒开率

  * m3u8 (第一切片为1~3秒) 对比 mp4 的秒开率和成功率更高
    * m3u8 因为他是切割视频 所以可以优化视频的开头 
      * m3u8 文件的 第一个ts片段长度为1~3秒
      * m3u8 文件的 第二个ts片段长度为3~5秒
      * m3u8 文件的 第三个ts片段长度为10秒左右
      * m3u8 文件的 第四个ts片段以上长度为30秒左右
      * m3u8 文件 最长ts片段不超过35秒
  * mp4无法进行视频开头的优化 无法进行切割

* <font color =#ff3040>更省流量更省资源</font>

  * m3u8 会根据用户的进度 来逐步的获取到视频的资源 并且当用户暂停播放的时候 不会进行数据的获取 更友好的请求服务器 减少数据浪费
    * 无需压缩视频 高质量视频进行切割即可
    * 能够将部分m3u8的播放块切块之后直接加载到服务器内存中，让客户端可以更快的得到数据。
    * HTTP Live Streaming 巨大优势：自适应码率流播（adaptive streaming）。效果就是客户端会根据网络状况自动选择不同码率的视频流，条件允许的情况下使用高码率，网络繁忙的时候使用低码率，并且自动在二者 间随意切换。这对移动设备网络状况不稳定的情况下保障流畅播放非常有帮助。实现方法是服务器端提供多码率视频流，并且在列表文件中注明，播放器根据播放进 度和下载速度自动调整。
  * mp4 会一直请求服务器 获取资源 直到获取到视频全部 容易造成数据浪费
    * 需要压缩视频 高质量视频想做性能提升 只能压缩画质
    * 无法使用 HTTP的功能 不能自适应码率播放视频

> m3u8 格式的请求数据

![image-20211025173601681](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173601681.png)

> mp4 格式请求数据

![image-20211025173718462](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173718462.png)

## 谁在用m3u8

> 通过`猫抓`爬来的视频数据展示

* 优酷视频 (移动端)

![image-20211019173127622](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019173128405.png)

* 爱奇艺视频(移动端)

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019173831064.png)

* 百度百科

![image-20211019182454565](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019182454565.png)

* 斗鱼视频(移动端)

![image-20211019183110313](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019183110313.png)

* a站

![image-20211019183420904](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019183420904.png)

* 腾讯课堂

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211025173833887.png)

## m3u8转换是不是太难?

* 经过[教程](https://blog.csdn.net/qq_36623327/article/details/83007456)的学习 m3u8的转换不是很困难 只需要下载`ffmpeg`软件并且输入一行命令 (支持自定义视频) 即可把视频分割成小块块 然后统一放在阿里云上即可 (m3u8 和 分成的ts文件必须在同级)

> 第一步 切割视频

```bash
ffmpeg -i D:\video\video.MP4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 60 -hls_list_size 0 -f hls D:\video\videoChange.m3u8
```

![image-20211019190003598](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019190003598.png)

> 第二步 上传阿里云 设置共有读

![image-20211019190141584](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019190141584.png)

> 第三步 获取m3u8文件地址

* 配置后台视频地址的时候 只需要设置m3u8文件的地址即可

![image-20211019190212200](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211019190212200.png)

## m3u8的缺点

* 碎片化的操作管理方式
* 有操作成本的视频转换
* 单个短视频效果不明显 (视频预加载效果明显)
* 暂时没找到mac的`ffmpeg`的软件

## 参考文献

[“m3u8格式简析”与“视频秒开优化”](https://www.cnblogs.com/alexgl2008/articles/12893849.html)

[近年开始流行使用的.m3u8视频格式是什么？相比mp4在什么场景采用？](https://zhuanlan.zhihu.com/p/338679519)

[M3U8格式讲解及实际应用分析](https://blog.csdn.net/vx_list/article/details/51956207)

[mp4相比m3u8第一帧加载较慢的原因？](https://xiaxl.blog.csdn.net/article/details/103370511)

[使用ffmpeg将MP4视频转换为m3u8格式](https://blog.csdn.net/qq_36623327/article/details/83007456)

