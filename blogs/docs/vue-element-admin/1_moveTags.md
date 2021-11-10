---
title: vue-element-admin中的快捷导航滑动
date: 2021-11-01
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-pkgk6j.jpg
tags:
 - vue-element-admin
 - Vue
categories: vue-element-admin
---

::: tip 介绍
vue-element-admin中的快捷导航滑动 <br>
:::

<!-- more -->

## 快捷导航滑动介绍

![ezgif-6-c444a9d43c4f](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/ezgif-6-c444a9d43c4f.gif)

* 一直在使用`vue-element-admin`中的快捷导航 总觉得快捷导航差一点意思 我想把快捷导航做成想浏览器导航一样的效果 支持滑动
* [SortableJS](https://sortablejs.github.io/Sortable/) 正好解决了我这个需求 而且实现十分简单

```bash
npm i sortablejs
```

## 效果实现步骤

1. 第一步 首先你要找到 `TagsView` 快捷导航的文件下的`index`

![](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211108200829923.png)

2. 第二步 找到文件后 进入查看作者封装的源代码

   * [SortableJS](https://sortablejs.github.io/Sortable/) 滑动原理是 把原渲染的数组 通过滑动的方式 重新排序 并且渲染排序后的数据 那么我们就需要找到 快捷导航渲染的数组

   ![image-20211108201033951](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211108201033951.png)

   * 找到原数组后 我们知道原来原数组是通过计算属性 `computed` 在`vuex`中拿到的 这里我们不管他是怎么拿到的 只需要知道数组叫什么就行

   ![image-20211108201303672](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211108201303672.png)

<font color =#ff3040>注意: 之前快捷导航作者是直接通过计算属性 `return`获取的数据 这种获取不支持修改 如果修改会报错(但是效果会有) 想解决报错 必须使用`get set` 获取计算数据</font>

```js
  computed: {
    visitedViews: {
      // 注意 原来的计算获取没有 get和set 直接return获取到的 这样获取不支持修改 需要改成get set 获取 (set方法可以不进行操作)
      get () {
        return this.$store.state.tagsView.visitedViews
      },
      set (v) {
      }
    },
 }
```

3. 第三步 导入 `SortableJS`

![image-20211108201743784](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211108201743784.png)

4. 第四步 在`template`中的导航数据外 包一层`div` 让其支持单个移动
   * 这里需要额外包一层div 否则无法单独控制移动 注意要绑定id

```diff
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
+      <!-- 这里需要额外包一层div 否则无法单独控制移动 注意要绑定id 才能使用SortableJS -->
+      <div id="items">
        <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag)?'active':''" :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item" @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''" @contextmenu.prevent.native="openMenu(tag,$event)">
          {{ tag.title }}
          <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
        </router-link>
+      </div>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他页面</li>
      <li @click="closeAllTags(selectedTag)">关闭全部页面</li>
    </ul>
  </div>
</template>
```

5. 第五步 在`methods` 设置`SortableJS`让其支持滑动操作
   * 注意 要修改成自己的数组名称 `visitedViews`是我的数组名称 当然如果你是同款快捷导航不用注意 copy就行

```js
 methods:  {
	// 通过SortableJS 设置导航数据支持移动 
    test () {
      const that = this
      const el = document.getElementById('items')
      // 常用
      new Sortable(el, {
        onEnd: function (evt) {
          // 获取排序之后的data数据
          that.visitedViews.splice(evt.newIndex, 0, that.visitedViews.splice(evt.oldIndex, 1)[0])
          const newArray = that.visitedViews.slice(0)
          that.visitedViews = []
          that.$nextTick(function () {
            that.visitedViews = newArray
            // console.log(that.visitedViews)
          })
        },
        // 加入动画
        animation: 150
      })
    },
 }
```

6. 第六步 在`mounted`Dom渲染完毕后的生命周期 挂载`SortableJS`设置的方法
   * 一定要在`mounted`Dom渲染完毕后的生命周期挂载奥

```js
  mounted () {
    // 挂载导航数据 支持移动
    this.test()
  },
```

## 参考文献

我找不到了....

* 下一个坑 基础模板搬运快捷导航 十分麻烦 但是值得一记!

