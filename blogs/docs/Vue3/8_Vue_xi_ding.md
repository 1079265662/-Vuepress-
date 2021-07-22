---
title: Vue3 吸顶效果实现组件
date: 2021-07-17
cover: https://tva2.sinaimg.cn/large/005INI3Xly8gsppz3ihabj32000u00x8.jpg
tags:
 - Vue3
categories: Vue3

---

::: tip 介绍
Vue3 设置吸顶效果的小组件(可设插件)<br>
:::

<!-- more -->

##  设置吸顶效果样式

![image-20210720212627308.png](https://i.loli.net/2021/07/21/C2ErdLpbePHzacq.png)

[吸顶效果组件项目预览](https://gitee.com/liu_kaili/Vue_little_rabbit_fresh)

> 吸顶效果总览

任务目标: 

1. 使用选项式api完成头部组件吸顶效果的实现

**交互要求**: 

1. 滚动距离大于等于78个px的时候，组件固定在视口顶部跟随页面移动
2. 滚动距离小于78个px的时候，组件消失

**实现思路**: 

1. 准备一个吸顶组件，准备一个类名，控制样式让其固定在顶部
2. 监听页面滚动，判断滚动距离，距离大于78px添加类名

操作流程: 

* 通过[VueUse插件提供的 监测窗口滚动方法](https://vueuse.org/core/useWindowScroll/) 监控窗口滚动 实现 显示隐藏
  * 当窗口滚动到一定高度 显示吸顶效果 反之隐藏吸顶
* <font color = #ff3040>注意: 如果当插件来调用的话 需要设置在头部菜单下面(头部菜单是正常菜单 不是吸顶) </font>

> 吸顶效果样式和交互 `Vue3`

1. 设置吸顶效果的Vue文件

```vue
<template>
  <!-- 动态绑定类名 当top数据>=78的时候 添加show这个类名 -->
  <div class="app-header-sticky" :class="{show:top>=78}">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 分类列表 -->
      <TopHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
// 导入导航列表数据
import TopHeaderNav from '@/components/top-header-nav.vue'
// import { onMounted, ref } from 'vue'
// 导入VueUse的页面滚动方法
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: {
    TopHeaderNav
  },
  setup () {
// -------------------------------- 通过VueUse插件中的窗口监听 实现滚动吸顶
    // 使用VueUse的页面滚动方法
    const { y } = useWindowScroll()
    // 返回数据 把y赋值给top top作为属性名(键)
    return { top: y }
// --------------------------------- 通过原生方法 监控页面 实现滚动吸顶
    // // 监听页面的滚动
    // const top = ref(0)
    // onMounted(() => {
    //   //  onscroll 元素滚动时候触发的方法  window.onscroll是当整个页面滚动时候触发
    //   window.onscroll = () => {
    //     // 获取到页面滚动的数据
    //     top.value = document.documentElement.scrollTop
    //   }
    // })
    // return { top }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // -------------------------- 此处为关键样式!!!
  // 默认情况下完全把自己移动到上面(隐藏列表)
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  //---------------------------
  // 显示出来的类名
  &.show {
    transition: all 0.3s linear;
    transform: none; // 取消transform的定位 让其显示
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url('~@/assets/images/logo.png') no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>

```

2. 导入吸顶效果的Vue组件

* <font color = #ff3040>注意: 如果当插件来调用的话 需要设置在头部菜单下面(头部菜单是正常菜单 不是吸顶) </font>

```vue
<template>
  <!-- 导入吸顶效果(要在原头部菜单的下面设置) -->
  <headerSticky></headerSticky>
</template>
<script>
// 导入吸顶效果
import headerSticky from './components/header-sticky'
export default {
  name: 'xtx-layout',
  components: {
    // 配置吸顶效果
    headerSticky
  }
}
</script>
```

总结：

1. 默认让组件出现在页面的顶部，可视区之外
2. 当页面滚动的距离超过78px时，添加一个类名，该类名控制吸顶组件显示出来

