---
title: Vue3 骨架效果插件
date: 2021-07-21
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-m9992y.jpg
tags:
 - Vue3
categories: Vue3
---

::: tip 介绍
Vue3 骨架效果自定义插件设置<br>
:::

<!-- more -->

## Vue3 的骨架效果

![image-20210722184050574](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210722184050574.png)

[骨架效果使用项目](https://gitee.com/liu_kaili/Vue_little_rabbit_fresh)

> 目的：为了在加载的过程中等待效果更好，封装一个骨架屏组件。

* 骨架效果主要是 当页面刚打开时候 需要调用服务器数据 这时候页面还没有数据 为了提高用户体验 暂时性的用加载样式 代替服务器的数据

> 大致步骤：

- 需要一个组件，做占位使用。这个占位组件有个专业术语：骨架屏组件。
  - 暴露一些属性：高，宽，背景，是否有闪动画。
- 这是一个公用组件，需要全局注册，将来这样的组件建议再vue插件中定义。
- 使用组件完成左侧分类骨架效果。

> 实现骨架效果插件步骤

1. 封装骨架基本效果组件
   * 封装一个骨架的效果的文件  `src/components/library/xtx-skeleton.vue`
   * 骨架插件的配置参数
     * `bg` 是配置插件颜色 `bg="rgba(255,255,255,0.2)"`
     * `style` 是自定义样式 `style="margin-right:5px"`
     * `height`是调整其高度 `height="18px"`
     * `width`是调整其宽度 `width="50px"`

```vue
<template>
  <!-- 1 盒子-->
  <div class="xtx-skeleton" :style="{width,height}" :class="{shan:animated}">
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
    <div class="block" :style="{backgroundColor:bg}"></div>
  </div>
</template>
<script>
// 设置一个骨架屏效果
export default {
  // 设置name
  name: 'XtxSkeleton',
  // 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪下
  props: {
    // 骨架单元背景颜色
    bg: {
      type: String,
      default: '#efefef'
    },
    // 骨架单元宽度
    width: {
      type: String,
      default: '100px'
    },
    // 骨架单元高度
    height: {
      type: String,
      default: '100px'
    },
    // 是否支持动画
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: '';
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
```

2. 把骨架组件 封装为插件
   * 定义骨架插件 `src/componets/library/index.js`

```js
// 封装UI组件库的组件(导入骨架屏自定义插件)
import XtxSkeleton from './xtx-skeleton.vue'

// 自定义一个插件导出
export default {
  install (app) {
    // app表示Vue全局组件的实例对象 (Vue2是Vue. Vue3是app.)
    // 配置全局插件
    app.component(XtxSkeleton.name, XtxSkeleton) // (导入组件的名称的name名.name,导入组件的名称)
  }
}
```

3. 实例化骨架插件
   * 在入口文件中 实例化骨架插件 `src/main.js`
   * 通过 `.use()`进行导入

```js
// 导入实例化的Vue3
import { createApp } from 'vue'
import App from './App.vue'
// 导入自定义插件 让其实例化可在组件内使用
import XtxUI from './components/library/index'

// 创建一个vue应用实例(.use() 可以实例化导入的插件)
createApp(App).use(XtxUI).mount('#app')
```

4. 在需要的Vue组件中 配置骨架插件效果 
   * 在需要的Vue组件中 调用骨架插件 并且配置效果 `src/views/home/components/home-cate.vue`
   * <font color =#ff3040>骨架的显示隐藏需要`v-if`进行判断 如果没数据显示骨架 有数据显示获取的数据</font>
   * 该组件基于 `less` 样式处理器设置
   * 骨架插件的配置参数
     * `bg` 是配置插件颜色 `bg="rgba(255,255,255,0.2)"`
     * `style` 是自定义样式 `style="margin-right:5px"`
     * `height`是调整其高度 `height="18px"`
     * `width`是调整其宽度 `width="50px"`

* 在`template` 中设置 骨架的显示隐藏

```vue
    <ul class="menu">
      <li :class="{active:categoryId===item.id}" v-for="item in list" :key="item.id" @mouseenter="categoryId=item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <!-- 判断是否存在服务器的数据 如果不存在 让其显示骨架加载样式 -->
        <template v-if="item.children">
          <RouterLink v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${sub.id}`">
            {{sub.name}}
          </RouterLink>
        </template>
        <span v-else>
          <!-- 当分类数据尚未返回时，显示这里的内容：骨架屏(设置骨架屏效果) -->
          <!-- width height style bg 分别传递给插件数据 -->
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
    </ul>
```

* 在`style`中 设置骨架的动画效果

```js
// 设置骨架屏动画样式
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
```

总结：

1. 封装骨架屏单元格组件
2. 配置Vue插件并且配置全局组件
3. 入口文件导入并配置UI组件库这个插件
4. 分类列表中使用骨架屏组件进行站位