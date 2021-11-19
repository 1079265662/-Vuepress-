---
title: element-dialog添加拖拽拉伸和边界限制
date: 2021-11-05
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-m9y9j1.jpg
tags:
 - vue-element-admin
 - Vue
categories: vue-element-admin
---

::: tip 介绍
element ui的dialog 支持拖拽拉伸和边界限制 <br>
:::

<!-- more -->

## 设计思路

* 这里修改的组件是[elementui 的dialog](https://element.eleme.cn/#/zh-CN/component/dialog) 
* element本身是不支持弹出层拖拽拉伸的 我们这里给他改造一下 并且给他边界限制 不能移动到边界 
* 本文参考的是[element的dialog弹出框可拖拽，并处理边界问题](https://blog.csdn.net/weixin_46074961/article/details/106905396?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link) 和 [Element,el-dialog弹出层拖拽及拉伸、双击全屏](https://blog.csdn.net/sqlquan/article/details/92806779) 他俩的混合
* <font color =#ff3040>注意: 在制作中发现 如果dialog过长 边界处理就会出现bug 不能完全阻止底部边界问题 需要特殊处理</font>

## 开始设置

> 1. 第一步 在js文件中 写一下功能代码

```js
import Vue from 'vue'

/*
*  使用方法
*  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
*  给dialog设置 :close-on-click-modal="false" , 禁止点击遮罩层关闭弹出层
*  如果是form表单，不要将提交等按钮放置el-form-item，以免在上下拉伸时被隐藏
*/

// v-dialogDrag: 弹窗拖拽+水平方向伸缩

Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    // 弹框可拉伸最小宽高
    const minWidth = 400
    const minHeight = 300

    // 初始非全屏
    let isFullScreen = false

    // 当前顶部高度
    let nowMarginTop = 0

    // 获取弹框头部（这部分可双击全屏）
    const dialogHeaderEl = el.querySelector('.el-dialog__header')

    // 弹窗
    const dragDom = el.querySelector('.el-dialog')

    // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
    dragDom.style.overflow = 'auto'

    // 清除选择头部文字效果
    // dialogHeaderEl.onselectstart = new Function("return false");

    // 头部加上可拖动cursor
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    const moveDown = dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomheight = dragDom.offsetHeight // 对话框高度
      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
      const minDragDomTop = dragDom.offsetTop
      // 注意 这里如果取消宽度验证 需要单独设置 我这里是最低支持1/5
      const maxDragDomTop = screenHeight - dragDom.offsetTop - (dragDomheight / 5)
      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left')
      let styT = sty(dragDom, 'top')
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        // eslint-disable-next-line no-useless-escape
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        // eslint-disable-next-line no-useless-escape
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
      return false
    }

    dialogHeaderEl.onmousedown = moveDown

    // 当前宽高
    let nowWidth = 0
    // let nowHight = 0
    // 双击头部全屏效果
    dialogHeaderEl.ondblclick = e => {
      if (isFullScreen === false) {
        // nowHight = dragDom.clientHeight
        nowWidth = dragDom.clientWidth
        nowMarginTop = dragDom.style.marginTop

        dragDom.style.left = 0
        dragDom.style.top = 0
        dragDom.style.height = '100VH'
        dragDom.style.width = '100VW'
        dragDom.style.marginTop = 0

        isFullScreen = true

        dialogHeaderEl.style.cursor = 'initial'
        dialogHeaderEl.onmousedown = null
      } else {
        dragDom.style.height = 'auto'
        dragDom.style.width = nowWidth + 'px'
        dragDom.style.marginTop = nowMarginTop

        isFullScreen = false

        dialogHeaderEl.style.cursor = 'move'
        dialogHeaderEl.onmousedown = moveDown
      }
    }

    dragDom.onmousemove = function (e) {
      // let moveE = e

      if (
        e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 ||
        dragDom.offsetLeft + 10 > e.clientX
      ) {
        dragDom.style.cursor = 'w-resize'
      } else if (
        el.scrollTop + e.clientY >
        dragDom.offsetTop + dragDom.clientHeight - 10
      ) {
        dragDom.style.cursor = 's-resize'
      } else {
        dragDom.style.cursor = 'default'

        dragDom.onmousedown = null
      }

      dragDom.onmousedown = e => {
        const clientX = e.clientX
        const clientY = e.clientY
        const elW = dragDom.clientWidth
        const elH = dragDom.clientHeight
        const EloffsetLeft = dragDom.offsetLeft
        const EloffsetTop = dragDom.offsetTop

        dragDom.style.userSelect = 'none'

        const ELscrollTop = el.scrollTop

        // 判断点击的位置是不是为头部
        if (
          clientX > EloffsetLeft &&
          clientX < EloffsetLeft + elW &&
          clientY > EloffsetTop &&
          clientY < EloffsetTop + 100
        ) {
          // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;
        } else {
          document.onmousemove = function (e) {
            // 移动时禁用默认事件
            e.preventDefault()

            // 左侧鼠标拖拽位置
            if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
              // 往左拖拽
              if (clientX > e.clientX) {
                dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
              }

              // 往右拖拽
              if (clientX < e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                  console.log()
                } else {
                  dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                }
              }
            }

            // 右侧鼠标拖拽位置
            if (
              clientX > EloffsetLeft + elW - 10 &&
              clientX < EloffsetLeft + elW
            ) {
              // 往左拖拽
              if (clientX > e.clientX) {
                if (dragDom.clientWidth < minWidth) {
                  console.log()
                } else {
                  dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                }
              }

              // 往右拖拽
              if (clientX < e.clientX) {
                dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
              }
            }

            // 底部鼠标拖拽位置
            if (
              ELscrollTop + clientY > EloffsetTop + elH - 20 &&
              ELscrollTop + clientY < EloffsetTop + elH
            ) {
              // 往上拖拽
              if (clientY > e.clientY) {
                if (dragDom.clientHeight < minHeight) {
                  console.log()
                } else {
                  dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                }
              }

              // 往下拖拽
              if (clientY < e.clientY) {
                dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px'
              }
            }
          }

          // 拉伸结束
          document.onmouseup = function (e) {
            document.onmousemove = null

            document.onmouseup = null
          }
        }
      }
    }
  }
})

```

> 2. 第二步 在main.js入口文件引入挂载全局

* 不用`Vue.use()` 直接导入即可

```js
// 导入elementui 弹出层拉动js
import '@/components/elementUImove/elementUImove'
```

> 3. 第三步 在`el-dialog`的组件中 直接使用声明的方法 `v-dialogDrag`

```vue
<el-dialog title="收货地址" :visible.sync="dialogTableVisible" v-dialogDrag>
</el-dialog>
```

## 参考文献

[element的dialog弹出框可拖拽，并处理边界问题](https://blog.csdn.net/weixin_46074961/article/details/106905396?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link) 

[Element,el-dialog弹出层拖拽及拉伸、双击全屏](https://blog.csdn.net/sqlquan/article/details/92806779) 
