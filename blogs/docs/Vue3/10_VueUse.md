---
title: VueUse插件方法合集
date: 2021-07-15
cover: https://i.loli.net/2021/07/20/AiD6cUJyrtXVIC4.jpg
tags:
 - Vue3
categories: Vue3
---

::: tip 介绍
VueUse插件一些实用的方法合集<br>
:::

<!-- more -->

##  VueUse介绍

* [VueUse](https://vueuse.org/) 是Vue扩展方法插件 将一些原生api方法转换为简单的Vue方法
* <font color = #ff3040>注意: </font>Vue3中导入Vue Use需要按需导入 用哪个方法导入那个

> VueUse 导入方法

(1) 安装@vueuse/core 包，它封装了常见的一些交互逻辑

```bash
npm i @vueuse/core
```

(2) 按需导入VueUse里面方法 (例子导入监测窗口滚动方法)

```js
<script>
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  setup () {
    // 使用 VueUse 提供的窗口滚动方法 获取窗口滚动监测的数据
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>
```

## 监测窗口滚动方法 `useWindowScroll`

[监测窗口滚动方法](https://vueuse.org/core/useWindowScroll/) 

* 获取窗口滚动的数据 常用于吸顶判断

```js
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  setup () {
    // 使用 VueUse 提供的窗口滚动方法 获取窗口滚动监测的数据
    const { y } = useWindowScroll()
    return { y }
  }
}
```

## 全屏展示内容方法 `useFullscreen`

[全屏展示内容方法](https://vueuse.org/core/useFullscreen/#usefullscreen)

* 通常用于把视频 图片 等全屏展示

```js
import { useFullscreen } from '@vueuse/core'
//isFullscreen 当前是否是全屏
//toggle  是函数直接调用即可
const { isFullscreen, toggle } = useFullscreen();
```

## 粘贴内容功能方法 ` useClipboard`

[粘贴内容功能](https://vueuse.org/core/useclipboard/#useclipboard)

* 可以将一些数据 点击按钮粘贴到剪切板上 方便用户复制

```js
import { useClipboard } from '@vueuse/core'
//text 粘贴的内容
//copy 是粘贴函数
const { text, copy, isSupported } 
= useClipboard({ copiedDuring: 1500 });
```

## 夜间模式功能方法 `useDark`

[夜间模式功能方法](https://vueuse.org/core/useDark/#usedark)

* 可以设置一个按钮 点击后 把页面切换成黑夜模式(页面整体变黑)

> 这个需要自定义样式类通过 toggleDark函数控制

```js
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark({
  selector: "body",//class渲染的标签

  valueDark: "dark",//暗黑class名字
  valueLight: "light"//高亮class名字
});
const toggleDark = useToggle(isDark);

```

## 输入框的数据绑定到标题 `useTitle`

![image-20210720204411440](https://i.loli.net/2021/07/20/6Yckj1DZur2MBfO.png)

[输入框中模拟标题数据](https://vueuse.org/core/usetitle/#usetitle)

* 输入框的数据绑定到标题 输什么 标题也显示什么

```js
import { useTitle } from '@vueuse/core'
const title = useTitle()
console.log(title.value) // print current title
title.value = 'Hello' // change current title
```

## 设置Url内容 `useUrlSearchParams`

[设置Url内容](https://vueuse.org/core/useUrlSearchParams/?foo=bar&vueuse=awesome#useurlsearchparams)

* 暂时不知道有啥用

## 以上方法 综合使用案例 (Vue2)

```vue
<template>
  <div>
    <h1>VueUse工具插件</h1>
    <div>
      <input type="text" />
    </div>
    <h5 @click="toggle">useFullscreen全屏展示</h5>
    <h5>useActiveElement()当前点击的元素</h5>
    <h5>useBreakpoints选择当前窗口范围</h5>
    <h5>useBrowserLocation浏览器URL信息</h5>

    <note>useClipboard 粘贴功能</note>
    <p>
      当前粘贴内容:
      <code>{{ text || 'none' }}</code>
    </p>
    <input v-model="input" type="text" />
    <button @click="copy(input)">Copy</button>

    <div v-if="!isSupported">你的浏览器不支持当前api</div>
    <div>
      <h5>useCssVar控制css变量</h5>
      <div ref="el" style="color: var(--color)">颜色值, {{ color }}</div>
      <button @click="switchColor">改变颜色</button>
    </div>
    <div>
      <h3>开启useDark 黑暗模式</h3>
      <button @click="toggleDark">开启暗黑模式</button>
    </div>

    <div>
      <h4>useEventListener 页面卸载自动卸载监听</h4>
    </div>
    <div>
      <h4>
        useFavicon网站图标更换 一般跟 usePreferredDark当前页面是否是暗黑主题
        还有useDark 一起使用
      </h4>
    </div>
    <div>
      <h4>useFetch一款http请求插件，感觉axios的功能都有反正没什么区别感觉可能比axios方便</h4>
    </div>
    <div>
      <h4>useMediaControls媒体控制器提供了自定义媒体组件的基本元素</h4>
    </div>
    <div>
      <h4>useMediaQuery媒体查询跟原生html类似</h4>
    </div>
    <div>
      <h4>usePermission</h4>
      <h5>
        未来提高用户体验截止到2021年5月当前api还在实验阶段无法使用,
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API"
        >MDN Web api介绍</a>
      </h5>
    </div>
    <div>
      <h4>usePreferredColorScheme</h4>
      <h5>查询当前配色方案 跟,useDark相关函数配合使用</h5>
    </div>
    <div>
      <h4>usePreferredDark</h4>
      <h5>当前页面是否是暗黑主题</h5>
    </div>
      <div>
      <h4>useShare </h4>
      <h5 @click="startShare">点击分享谷歌支持其他平台估计不支持</h5>
    </div>
       <div>
      <h4>useTitle </h4>
      <h5 >设置浏览器标题</h5>
    </div>
        <div>
      <h4> useUrlSearchParams </h4>
      <h5 >设置浏览器Url参数</h5>
       <ul>
    <li v-for='key in Object.keys(params)' :key="key">
      {{ key }}={{ params[key] }}
    </li>
  </ul>
    </div>
      
  </div>
</template>
<script setup>
import { reactive, watch, ref } from "vue";
import {
  useFullscreen,
  useActiveElement,
  useBreakpoints,
  useBrowserLocation,
  useClipboard,
  usePermission,
  useCssVar,
  useDark,
  useToggle,
  useScriptTag ,
  useShare,
  useTitle,
  useUrlSearchParams 
} from "@vueuse/core";
const title = useTitle()
console.log(title.value) // print current title
title.value = 'Hello' // change current title
const { share } = useShare();
function startShare() {
  share({
    title: 'Hello',
    text: 'Hello my friend!',
    url: location.href,
  })
};
    const params = useUrlSearchParams('history')
    params.foo = 'bar';
    params.vueuse = 'awesome';
const microphoneAccess = usePermission("microphone");
const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280
});
const isDark = useDark({
  selector: "body",

  valueDark: "dark",
  valueLight: "light"
});

const toggleDark = useToggle(isDark);
let input = "";
let el = null;
const color = useCssVar("--color", el);
const switchColor = (color) => {
   color.value =color
};
const laptop = breakpoints.between("tablet", "desktop");
const location = useBrowserLocation();
const { isFullscreen, toggle } = useFullscreen();
const activeElement = useActiveElement(); //当前点击的元素
const { text, copy, isSupported } = useClipboard({ copiedDuring: 1500 });
watch(isDark, el => {
  console.log("是否是含黑模式", el);
});

watch(activeElement, el => {
  console.log("focus changed to", el);
});
</script>

```

