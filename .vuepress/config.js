module.exports = {
  "title": "LKaiLi",
  "description": "草 走 🤸 忽略",
  "dest": "dist",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "https://pan.zealsay.com/blog/favicon.ico"
      }
    ],
    // 设置鼠标点击 社会主义核心价值观
    ["script", { "language": "javascript", "type": "text/javascript", "src": "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js" }],
    ["script", { "language": "javascript", "type": "text/javascript", "src": "/js/mouseClick.js" }],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    ['script', {}, `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?b0aae218897fa9d8a9f76e9a77e0b3c6";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `] //百度统计
  ],
  "locales": {
    "/": {
      "lang": 'zh-CN'
    }
  },
  // "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        text: '关于本播客',
        icon: 'reco-other',
        items: [
          { text: '关于我', link: '/other/', icon: 'reco-account' },
          { text: '联系我', link: '/about/', icon: 'reco-mail' }
        ]
      },
  
    ],
    "type": "blog",
    "sidebar": {
       // 添加分类时，改两处位置，多加一个分类字段（第一处）
      //  '/categories/': utils.genSidebar(folderhelper.getFolderName(rootpath + "/categories/"), filehelper.getFileName(rootpath + "/categories/"), true),
      //  '/archives/': getArchivesSidebar(),
      //  '/links/': getCategoriesSidebar(),
      //  '/about/': getCategoriesSidebar(),
      //  '/domains/': getCategoriesSidebar(),
       // '/categories/': getCategoriesSidebar('Docker', 'Kali', 'Linux', 'Web', '生活', '云主机', '数据库', '树莓派', '机器学习', '科学上网', '编程语言')
    },
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "博客分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "关于我",
        "desc": "欢迎访问本小站",
        "logo": "https://i.loli.net/2021/05/17/rRzqv6kGHwATM41.png",
        "link": "/other/"
      },
      {
        "title": "播客样式作者",
        "desc": "zealsay说你想说",
        "logo": "https://pan.zealsay.com/avatar/20200606105310570000000.jpg",
        "link": "https://blog.zealsay.com"
      },
      {
        "title": "播客友情链接",
        "desc": "vuepress_blog",
        "logo": "https://pan.zealsay.com/avatar/20200606105310570000000.jpg",
        "link": "https://www.zealsay.com"
      },
      {
        "title": "技术指导",
        "desc": "vuepress_blog",
        "logo": "https://zyj_yida.gitee.io/source/img/ico/head.jpg",
        "link": "https://zhangyujie.top/"
      },
      {
        "title": "我的GitHub",
        "desc": "记录我搬砖的网站",
        "logo": "https://i.loli.net/2021/05/18/Cw4FEmbWIKROu7l.jpg",
        "link": "https://github.com/1079265662"
      }
    ],
    "valineConfig": {
      "appId": "tPugNRadb0huWnsoU1URpvSM-MdYXbMMI",// your appId
      "appKey": "rDi2HfpHPFMIL6Vt8yV9Dbe5", // your appKey
      "avatar": "mp", //
      "enableQQ": true, //启用昵称框自动获取QQ昵称和QQ头像
      "requiredFields": ['nick'], //设置必填项
      "placeholder": "可以评论一下吗😅",
      "meta": ['nick', 'mail', 'link']
    },
    "logo": "/logo.png",
    // "huawei": true, //首页出现华为文案
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "LKaiLi",
    "authorAvatar": "https://i.loli.net/2021/05/17/rRzqv6kGHwATM41.png",
    "record": "暂无备案号 ", //icp备案
    "startYear": "2021 ",
    "info": "你看100遍她的视频，她不是你的，你敲100遍vue代码，知识就是你的，该醒醒了，我们的目标是学习vue！😅",
    "socials": {
      "github": "https://github.com/1079265662", //github
      "gitlub": false, //gitlub
      "gitee": "https://gitee.com/liu_kaili", //gitee
      "jianshu": false, //简书
      "zhihu": false, //知乎
      "toutiao": false, //知乎
      "juejin": false, //掘金
      "segmentfault": false, //思否
      "csdn": false, //CSDN
      "wechat": "https://i.loli.net/2021/05/18/KsB8A6JD7SVR3Oy.jpg", //微信
      "qq": "https://i.loli.net/2021/05/18/4HCo6ieL2MZfu78.jpg" //QQ
    },
    "mottos": [{
      "zh": "它的优秀之处并非原创，它的原创之处并不优秀。",
      "en": "the part that is good is not original, and the part that is original is not good"
    },
    {
      "zh": "它的优秀之处并非原创，它的原创之处并不优秀。",
      "en": "the part that is good is not original, and the part that is original is not good."
    },
    {
      "zh": "它的优秀之处并非原创，它的原创之处并不优秀。",
      "en": "the part that is good is not original, and the part that is original is not good."
    },
    {
      "zh": "它的优秀之处并非原创，它的原创之处并不优秀。",
      "en": "the part that is good is not original, and the part that is original is not good."
    },
    {
      "zh": "它的优秀之处并非原创，它的原创之处并不优秀。",
      "en": "the part that is good is not original, and the part that is original is not good."
    }, {
      "zh": "它的优秀之处并非原创，它的原创之处并不优秀。",
      "en": "the part that is good is not original, and the part that is original is not good."
    },
    {
      "zh": "优它的优秀之处并非原创，它的原创之处并不优秀。",
      "en": "the part that is good is not original, and the part that is original is not good."
    }
    ],
    "covers": [
      'https://pan.zealsay.com/zealsay/cover/4.jpg',
      'https://pan.zealsay.com/zealsay/cover/4.jpg',
      'https://pan.zealsay.com/zealsay/cover/4.jpg',
      'https://pan.zealsay.com/zealsay/cover/4.jpg',
      'https://pan.zealsay.com/zealsay/cover/4.jpg',
      'https://pan.zealsay.com/zealsay/cover/4.jpg',
      'https://pan.zealsay.com/zealsay/cover/4.jpg'
    ],
    "codeTheme": "tomorrow"
  },
  "markdown": {
    "lineNumbers": false
  },
  // configureWebpack: (config, isServer) => {
  //   if (!isServer) {
  //     // 修改客户端的 webpack 配置
  //     config.output.publicPath = config.mode === 'production'
  //       ? 'https://pan.zealsay.com/blog/' // sample/essays 打包的默认路径为 ‘_nuxt’ 或者可以指定cdn 域名
  //       : '/';
  //     config.output.filename = "assets/js/[name].js";
  //   }
  // }
  plugins: [
    // 自动生成侧边栏的插件
    [
      'vuepress-plugin-auto-sidebar', {
        collapse: {
          open: true
        }
      }
    ],
    [
      "dynamic-title",
      {
        // Icon 建议根据自身需求选择
        showIcon: "/favicon.ico",
        showText: "",
        hideIcon: "/favicon1.ico",
        hideText: " 你在看什么呢！",
        recoverTime: 2000
      }
    ],
    // 复制代码功能
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功!"
        }
      }
    ],
    // 音乐播放器
    [
      'meting', {
        meting: {
          // 网易
          server: "netease",
          // 读取歌单列表
          type: "playlist",
          // 歌单id 
          mid: "6755005481",
        },
        // 不配置该项的话不会出现全局播放器
        aplayer: {
          // 吸底模式
          fixed: true,
          mini: true,
          // 自动播放
          autoplay: false,
          // 歌曲栏折叠
          listFolded: true,
          // 颜色
          theme: '#647ea0',
          // 播放顺序为随机
          order: 'random',
          // 初始音量
          volume: 0.2,
          // 关闭歌词显示
          lrcType: 0
        },
        mobile: {
          // 手机端去掉cover图
          cover: false,
          // lrc: false
        }
      }
    ],
    // 小猫挂绳 npm install vuepress-plug-go-top 
    ['go-top'],
    [
      //先安装在配置， npm install @vuepress-reco/vuepress-plugin-kan-ban-niang --save
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ['blackCat'],
        width: 120,
        height: 322,
        clean: true
      }
    ],
    // 播客背景绸缎
    // ["ribbon-animation", {
    //   size: 90,   // 默认数据
    //   opacity: 0.3,  //  透明度
    //   zIndex: -1,   //  层级
    //   opt: {
    //     // 色带HSL饱和度
    //     colorSaturation: "80%",
    //     // 色带HSL亮度量
    //     colorBrightness: "60%",
    //     // 带状颜色不透明度
    //     colorAlpha: 0.65,
    //     // 在HSL颜色空间中循环显示颜色的速度有多快
    //     colorCycleSpeed: 6,
    //     // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
    //     verticalPosition: "bottom",
    //     // 到达屏幕另一侧的速度有多快
    //     horizontalSpeed: 256,
    //     // 在任何给定时间，屏幕上会保留多少条带
    //     ribbonCount: 2,
    //     // 添加笔划以及色带填充颜色
    //     strokeSize: 0,
    //     // 通过页面滚动上的因子垂直移动色带
    //     parallaxAmount: -0.5,
    //     // 随着时间的推移，为每个功能区添加动画效果
    //     animateSections: true
    //   },
    //   ribbonShow: false, //  点击彩带  true显示  false为不显示
    //   ribbonAnimationShow: true  // 滑动彩带
    // }]
  ]
}
