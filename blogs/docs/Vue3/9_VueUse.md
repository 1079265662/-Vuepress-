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

## VueUse介绍

* [VueUse官网](https://vueuse.org/core/useWindowScroll/) 是Vue扩展方法插件 将一些原生api方法转换为简单的Vue方法
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

##  检测组件是否可视化 `useIntersectionObserver`

[检测组件是否可视化](https://vueuse.org/core/useintersectionobserver/#useintersectionobserver)

* 通常用来设置组件懒加载 
* 通过返回值 `stop`来取消监听
* 具有两个返回参数 (方法参数)
  - 参数1是监听的Dom元素(需要的观察容器)
  - 参数2是判断 是否到达可视区 如果到达返回 true (默认是false)
* 在方法结尾设置 `threshold=0` 刚一进入可视区就触发(默认有一段距离才触发)

> 组件懒加载案例

`目的`：实现当组件进入可视区域在加载数据。

* 我们可以使用 `@vueuse/core` 中的 `useIntersectionObserver` 来实现监听进入可视区域行为，但是必须配合vue3.0的组合API的方式才能实现。
* 适用于图片较少的 大组件 组件整体的懒加载

>  大致步骤：

- 封装一个组件懒加载
  - 通过`useIntersectionObserver` 来实现监听进入可视区域行为 判断是否到达可视区 
  - 返回两个参数 (方法参数)
    - 参数1是监听的Dom元素(需要的观察容器)
    - 参数2是判断 是否到达可视区 如果到达返回 true (默认是false)
  - 可以设置返回值 `stop`停止监控
- Vue组件中 导入懒加载组件方法
  - 需要给组件懒加载传递api接口 
  - 并且接收懒加载组件返回的 参数 
    - 监听的Dom元素 通过`ref`绑定到需要监听的组件
    - 返回的展示数据 遍历到页面上

> 懒加载组件设置使用

1. 设置一个懒加载组件(js文件)
   * 通过`useIntersectionObserver` 来实现监听进入可视区域行为 判断是否到达可视区 
   * 返回两个参数 (方法参数)
     - 参数1是监听的Dom元素(需要的观察容器)
     - 参数2是调用接口api返回的数据 (展示数据)

```js
// 数据展示的懒加载 需要配合图片懒加载
// 导入VueUse组件useIntersectionObserver方法
import { useIntersectionObserver } from '@vueuse/core'
// 导入Vue3的ref方法
import { ref } from 'vue'

// useIntersectionObserver 有三个参数
// 参数1 表示被监听的Dom元素(观察容器)
// 参数2 监听是否到达绑定的Dom组件(布尔值类型)
// 参数3 是一个对象用来配置这个方法(通常用来配置触发条件)

export default (apiFn) => { // 参数apiFn表示调用接口的方法(组件传来的api接口 用来获取展示数据)
  // 接收传来的懒加载数据(展示数据)
  const result = ref([])
  // 设置VueUse懒加载的监听的Dom元素(观察容器)
  const target = ref(null)
  // 启动通过VueUse的懒加载操作
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  // stop是取消监听 target表示被监听的Dom元素(观察容器) isIntersecting是监听是否到达绑定的Dom组件(布尔值类型)
    if (isIntersecting) { // 如果到达了Dom组件可视区 调用接口 获取展示数据
    // 触发一次之后，取消继续监听
      stop()
      // 被监听的Dom组件已经进入可视区，此时组件传来的api接口
      apiFn().then(data => {
        // 储存到展示数据中
        result.value = data.result
      })
    }
  }, {
    // 刚一进入可视区，就触发（默认值表示，进入一段距离之后才触发）
    threshold: 0 // 0-1范围 类似百分比(推荐设置为0 无延迟)
  })
  // 进行返回值
  // 1、target表示被监听的Dom元素(需要的观察容器)
  // 2、result表示调用接口api返回的数据 (展示数据)
  return { target, result }
}

```

2. Vue组件中 导入懒加载组件方法
   - 需要给组件懒加载传递api接口 
   - 并且接收懒加载组件返回的 参数 
     - 监听的Dom元素 通过`ref`绑定到需要监听的组件
     - 返回的展示数据 遍历到页面上
   - 如果api接口需要传参 需要用箭头函数进行设置 `const { target, result } = useLazyData(() => findBrand(10))`

```vue
<template>
  <div class="home-product" ref='target'>
  <!-- 需要懒加载的组件内容  -->
  </div>
</template>

<script>
// 导入api接口
import { findGoods } from '@/api/home.js'
import useLazyData from '@/hooks'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
     // 把api接口传给组件懒加载 并且获取组件懒加载的数据 
    // 获取懒加载组件返回的两个值
    // 1、target表示被监听的Dom元素(需要的观察容器)
    // 2、result表示调用接口apiFn返回的数据 (展示数据)
    // 3、需要在懒加载组件传递api接口 用来获取展示数据
    const { target, result } = useLazyData(findGoods) // 无需传参的设置
    // 组件懒加载需要传递参数 先通过函数方法调用接口获取promise数据 到达指容器位置后 再传递服务器获取的数据
    // const { target, result } = useLazyData(() => findBrand(10)) // 需要传参的设置
    return { target, list: result }
  }
}
</script>
```

总结：监听DOM元素进入可视区，进入后停止监听，并且调用接口获取数据

1. 将懒加载的整体流程代码封装为Hook
2. 基于hook方法实现新鲜好物和人气推荐模块的懒加载效果

## 父子组件相互传值 `useVModel`

[父子组件相互传值](https://vueuse.org/core/usevmodel/#usevmodel)

* 适用基于`v-model` 父子组件之间进行的传值操作
* VueUse修改父组件的值 需要`.value`来修改数据 不过在`template`**模板中不需要**

 ```js
  setup (props, { emit }) { // 结构赋值 获取父组件传值方法 emit
    // 使用VueUse的useVModel进行父组自检相互传值
    // 获取父组件传递过来的modelValue的值
    const checked = useVModel(props, 'modelValue', emit)
    return { checked }
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

