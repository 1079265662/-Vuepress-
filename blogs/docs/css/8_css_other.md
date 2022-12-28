---
title: 一些有趣的css样式
date: 2022-01-25
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-9mk3ek.jpg
tags:
 - Css
categories: Css
---

::: tip 介绍
一些常用的css样式记录一下<br>
:::

<!-- more -->

## 优化页面全局属性

* 设置`body`文档主体元素

```css
body {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
```

## 修改webkit浏览器自带的滚动条 `webkit`

* 浏览器自带的滚动条十分的难看 修改一下样式怎样
* <font color =#ff3040>注意: 该css属性只能修改`webkit`内核的浏览器 比如: 谷歌 edge safari等浏览器 火狐目前并不支持</font>

```css
/************** 滚动条 **************/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: #647ea0;
}

::-webkit-scrollbar-thumb:horizontal {
  width: 5px;
  background-color: #647ea0
}
```

* 这样设置一下 滚动条就又细又长很好看

![image-20220125170414230](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125170414230.png)

### 有边距的滚动条

* 具备边距的滚动条 

```css

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  height: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 7px;
  background-color: #9d9d9d;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}
::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}
```

![image-20220607154525867](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220607154525867.png)

## 修改浏览器自带的选中效果 `::selection `

* 通过`::selection`改变选则文本的颜色 这个所有`现代`浏览器都支持

```css
::selection {
  background: #da1333;
  color: #fff;
}
```

## 修改浏览器自带的鼠标效果 `cursor`

* 这个需要在`body`中设置`cursor`样式 别忘了要带上`auto`

```css
html,
body {
  // 鼠标样式
  cursor: url("https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/arrow.cur"), auto;
}
```

## 设置线性过度 `  transition`

* 设置一些线性过度可以让一些点击事件 或者 `:hover`鼠标移入样式 看着更舒服一些 我们设置`transition`通用的线性过度吧 让页面具备一些动画效果 

```css
  transition: all 0.25s ease-in-out 0.16s;
```

## 设置阴影特效 `box-shadow`

* 有很多场景会用到边框效果`box-shadow` 特别是颜色很中和的场景是非常需要边框来实现一个漂亮的过度

> box-shadow的常用[语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow#syntax)

```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
```

### **整体的阴影特效**

* 整体容器的阴影特效很简单

> 实物图和代码

![image-20220126151148656](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126151148656.png)

```css
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.3);
```

### **上下左右阴影的实现 **

* 如果你的容器紧贴着浏览器边缘 实际上整体的就能实现 但是也有特殊奥
* 盒子左侧的阴影 

![image-20220126154223370](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126154223370.png)

```css
box-shadow: -15px 0px 12px -12px rgb(0 0 0 / 30%);
```

* 盒子右侧的阴影

![image-20220126152607080](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126152607080.png)

```css
box-shadow: 8px 0px 5px -6px rgb(0 0 0 / 30%);
```

* 盒子上侧的阴影

![image-20220126153553880](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126153553880.png)

```css
box-shadow: 0px -8px 8px -6px rgb(0 0 0 / 30%);
```

* 盒子下侧的阴影

![image-20220126153920763](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220126153920763.png)

```css
box-shadow: 0 6px 4px -2px rgb(0 0 0 / 12%);
```

## 缩放功能 `transform: scale()`

* 缩放功能是一个十分好用的功能 当你懒得给组件的内容重新设置大小 或者你觉得不值当就用一次 那么我们就可以用到缩放功能
* 在早期的数据可视化的大屏使用的是rem rem虽然也是为了自适应而生的 但是rem放大后 会造成虚化现象 后来大家都使用` transform: scale()` 来实现大屏效果
* 有意思的是 谷歌和ie可以使用 `zoom` 来实现缩放 但是火狐不支持 所以只能使用`transform: scale()`来实现
* [transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 不光有`scale`缩放 还有`rotate`旋转 `translate`平移 `skew`偏斜 `matrix`矩阵

> 效果展示

* 这是不放大的效果

![image-20220221182416369](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220221182416369.png)

* 这是放大后的效果

![image-20220221182444535](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220221182444535.png)

> 通过zoom进行放大

* `zoom`在ie和谷歌可以随便使用 但是火狐不支持
*  他会基于项目所在位置进行放大(相当于不脱标) 直接设置即可

```scss
  // 放大
  zoom: 1.5
```

> 通过transform: scale() 方法

* `transform: scale()`本质上和`zoom`一直 只不过火狐不兼容 为了兼容性 就需要用到它
* `transform: scale()` 使用后会改变原来位置(相当于脱标) 所以我们需要单独设置 ` transform-origin`属性 调整基点位

```scss
  // 放大
  transform: scale(1.5);
  // 按照原位置进行放大
  transform-origin: top left;
```

## 根据内容 width自适应宽度

* `width`有个方法 [fit-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 通过内容自适应宽度 记录学习一下

> 设置fit-content

![image-20220606173614700](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220606173614700.png)

> 不设置fit-content 默认width是平铺状态

![image-20220606173705716](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220606173705716.png)

## 实现一个毛玻璃特性

* 毛玻璃是什么
  * 背景模糊的磨砂玻璃效果
  * 空间物体漂浮多层次
  * 鲜艳的色彩突出模糊的透明度 (有点半透明的感觉)
  * 半透明物体上有一个细微的光线边界

> 看看效果图

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208171655689.webp" alt="1.png" style="zoom:80%;" />

> 实现方法 

* 通过[backdrop-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter) 设置背景图的图形效果 再通过[box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)添加阴影效果 实现细微的光线边界 最好把背景设置为半透明 这样效果更加

```css
  background: hsla(0, 0%, 100%, 0.1);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 5px rgba(139, 136, 136, 0.6);
```

## mix-blend-mode 内容和背景 混合模式

*  [mix-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode) 混合模式最常见于 `photoshop` 中，利用混合模式将多个图层混合得到一个新的效果 比如一张顶层的图片 想个下层(子级)的文字混合在一起 实现一个 问题镶嵌在图片的效果 就是混合模式 这种实现方式 和背景属性[background-clip: text](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip) 有异曲同工之妙。一个是背景的混合 一个是图片`<img>`或者其他块级元素(一个纯色色块)

* `mix-blend-mode CSS` 属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。它有以下属性值：

  - `normal`：正常

  - `multiply`：正片叠底

  - `screen`：滤色

  - `overlay`：叠加

  - `darken`：变暗

  - `lighten`：变亮

  - `color-dodge`：颜色减淡

  - `color-burn`：颜色加深

  - `hard-light`：强光

  - `soft-light`：柔光

  - `difference`：差值

  - `exclusion`：排除

  - `hue`：色相

  - `saturation`：饱和度

  - `color`：颜色

  - `luminosity`：亮度

  - `initial`：初始

  - `inherit`：继承

  - `unset`：复原

* 这些图层混合效果效果有前辈总结 可以看看[Photoshop中高级进阶系列之一——图层混合模式原理](http://www.zcool.com.cn/article/ZMzcyNzY=.html)：

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081139113.png)

> 看看部分实际效果

* 写一个绝对定位盒子 定位在`<img>`标签上 给定位盒子设置一些混合效果

```html
<body>
  <div class="box">
    <div class="box-text">mix-blend-mode属性</div>
    <img src="https://www.dengzhanyong.com/PHP/images/1606961604.jpg" />
  </div>
</body>

<style>
  .box {
    position: relative;
  }

  .box-text {
    position: absolute;
    top: 20px;
    left: 60px;
    background: rgb(108, 124, 15);
    font: bolder 100px 'Alfa Slab One';
    color: #fff;
    text-align: center;
    padding-top: 10px;
    height: 100%;
    mix-blend-mode: darken; /* 设置一些混合效果 */
  }

</style>
```

* 正常情况下是这种效果

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081335394.webp)

* 现在我们来添加mix-blend-mode属性，并为它赋上不同的值看看效果：

```css
mix-blend-mode: multiply; //正片叠底
```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081335770.webp)

```css
mix-blend-mode: screen; //滤色 
```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081335355.webp)

```css
mix-blend-mode: overlay; //叠加
```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081334942.webp)

```css
mix-blend-mode: darken; //变暗
```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081334608.webp)

```css
mix-blend-mode: lighten; //变亮
```

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081334924.webp)

* 如果项目中 有用到图片/色块 需要和文字混合的效果 不妨试试混合模式 
  * 背景属性[background-clip: text](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip) 可以实现背景文字的混合 不过他没有滤镜效果
  * [mix-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode) 可以实现混合效果 并且它支持各种滤镜效果

## text-align-last 文本中最后一行对齐

* [text-align-last](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align-last) 可以设置文本的最后一行对齐规则 默认值为`aoto`

  * `aoto` 最后一行不做处理由 [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align) 的值来确定(默认值)

  ![image-20221108133138856](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081331894.png)

  * `left` 最后一行文字与内容盒子的左侧对齐
  * `right` 最后一行文字与内容盒子的右侧对齐
  * `center` 最后一行文字与内容盒子居中对齐

  ![image-20221108133228081](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081332118.png)

  * `justify` 最后一行文字的开头与内容盒子的左侧对齐，末尾与右侧对齐。

![image-20221108133030946](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211081330989.png)

## dvh 和 dvw 自适应视口

* `vh`和`vw` 这两个单位可以占满整个视口 

![image-20221212172936782](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212121729822.png)

* 但是他们在移动端会受到顶部地址栏或底部操作栏的溢出问题 并且在PC端vw也会收到滚动条的影响

![image-20221212172948176](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212121729218.png)

* 可以用新单为`dvh`和`svw` 这个 d 是 `dynamic` 的缩写，它是动态的：这样浏览器会根据自身自适应的拉伸 不用担心溢出问题

![image-20221212173123528](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212121731565.png)

* 只不过兼容性一般

![image-20221212173226030](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212121732062.png)

## linear-gradient 渐变属性

* [linear-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient) 用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于[`<gradient>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient)数据类型，是一种特别的[`<image>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image)数据类型。
* [CSS的渐变规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Images/Using_CSS_gradients) 在这里了解CSS的渐变规则

```css
/* 渐变轴为45度，从蓝色渐变到红色 如果不设置过度中心点 默认为50%开始转变 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 从下到上，从蓝色开始渐变、到高度 40% 位置是绿色渐变开始、最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/* 渐变轴为45%, 从透明到红色 从透明起点5%开始渐变, 设置过度中心点也在5% 这样可以实现一个剪切的效果 */
linear-gradient(45deg, transparent 5%, 5%, red);
linear-gradient(45deg, transparent 5%, red 5%); /* 也可以这样写 不设置过度中心点, 但是设置红色渐变的起点在5% */

```

* 渐变轴示意图
  * 渐变颜色可以多个 渐变开始到结束对应从左往右设置
  * 渐变点默认是50% 从中间开始从上到下的渐变
  * 渐变默认从上到下, 可以通过旋转改变其渐变的位置

![image-20221213140404899](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212131404939.png)

> 使用案例

* 做一个左下角缺少的按钮样式 可以通过背景渐变旋转 并设置衔接的渐变中心点实现

![image-20221213181631564](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212131816597.png)

```css
 // 设置一个渐变的背景并且进行旋转
background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
 // 设置右侧阴影
box-shadow: 6px 0px 0px 0px #00e6f6;
```

* 进行多色的按钮拼接

![image-20221214110820359](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212141108411.png)

```css
background: linear-gradient(
  45deg, // 旋转45°
  transparent 3%, // 透明3%
  red 3%, // 从3%开始变红
  5%, // 从5%设备过渡点
  blue 5% // 从5%开始变蓝
  );

// 也可以这样写
background: linear-gradient(
  45deg, // 旋转45°
  transparent 3%, // 透明3%
  red 3%, // 从3%开始变红
  red 5%, // 从5%设备过渡点
  blue 5% // 从5%开始变蓝
  );
```



### repeating-linear-gradient 线性渐变

* [repeating-radial-gradient()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/repeating-linear-gradient)是渐变的一种 数据类型都是`<gradient>`和`<image>` 创建一个由重复线性渐变组成的重复渐变

```css
/* 一个倾斜 45 度的重复线性渐变，
   从蓝色开始渐变到红色 */
repeating-linear-gradient(45deg, blue, red);

/* 一个从右下角到左上角的重复线性渐变，
   从蓝色开始渐变到红色 */
repeating-linear-gradient(to left top, blue, red);

/* 一个由下至上的重复线性渐变，
   从蓝色开始，40% 后变绿，
   最后渐变到红色 */
repeating-linear-gradient(0deg, blue, green 40%, red);
```

* 还有[repeating-radial-gradient()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/repeating-radial-gradient)创建一个从原点辐射的重复渐变

##  clip-path 剪切功能

* [clip-path](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path) 属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。

### inset() 矩形插图

* [inset()](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset)进行一个矩形的剪裁 上下左右 
  * 剪切方式是 设置上下剪切位置后 两个剪切点相连的位置剪切下来 以外的部分隐藏
  * 如果想完全隐藏不剪辑 可以设置为`inset(50% 50% 50% 50%)`
  * 负数就是往里剪切

![image-20221214181528396](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212141815452.png)

```css
// 从上到下50%处 左边王莉6px 从下倒上20%处 开始剪切 相当于在中考下剪切了30%部分
clip-path: inset(50% -6px 20% 0);
// 平移-20px更凸显剪切
transform: translateX(-20px);
```

## Css过度效果的简单记录

* Css过度应用在两个属性上 
  * [transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition) 过度属性, 或者通过过度动画方法[transition-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function) 进行设置, 多个设置可通过`,`分割
  * [animation](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation) 动画属性, 或者通过动画方法[animation-timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function) 进行设置, 多个设置可通过`,`分割
* 通过`cubic-bezier()`可以手动设置Css赛贝尔参数, 也可以通过在线调试获取赛贝尔参数
  * [赛贝尔曲线效果速查表, 包含动画和背景渐变两种展示效果](https://easings.net/zh-cn)
  * [详细的赛贝尔展示, 没有渐变展示效果](https://xuanfengge.com/easeing/ceaser/)
  * [简单的赛贝尔对比](https://cubic-bezier.com/#.17,.67,.83,.67)


```css
/**  transition 和 animation 属性定义赛贝尔曲线 **/
.block {
    /** 简写 **/
	transition: all 0.6s cubic-bezier(0.37, 0, 0.63, 1);
    animation: glitched 0.6s cubic-bezier(0.37, 0, 0.63, 1);
    /** 指定过度/动画执行的方式 多个属性通过, 分割steps()是步长用来设置动画帧数 **/
    transition-timing-function: steps(2, end), cubic-bezier(0.68, -0.55, 0.27, 1.55);
    animation-timing-function: steps(2, end), cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

* Css也内置了几个现成的赛贝尔效果, 可以直接设置实现预设的赛贝尔曲线动画效果

```css
animation-timing-function: ease;
```

`ease` 对应自定义cubic-bezier(.25,.01,.25,1),效果为先慢后快再慢；

![aHR0cDovL3d3dy55ZGh0bWwuY29tL2ltZy8yMDE4LTA5LTExLzEuanBn](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212261155744.png)

2. `linear` 对应自定义cubic-bezier(0,0,1,1)，效果为匀速直线；

![aHR0cDovL3d3dy55ZGh0bWwuY29tL2ltZy8yMDE4LTA5LTExLzIuanBn](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212261155006.png)

3. `ease-in` 对应自定义cubic-bezier(.42,0,1,1),效果为先慢后快；

![aHR0cDovL3d3dy55ZGh0bWwuY29tL2ltZy8yMDE4LTA5LTExLzMuanBn](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212261155157.png)

4. `ease-out` 对应自定义cubic-bezier(0,0,.58,1),效果为先快后慢；

![aHR0cDovL3d3dy55ZGh0bWwuY29tL2ltZy8yMDE4LTA5LTExLzQuanBn](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212261155342.png)

5. `ease-in-out` 对应自定义cubic-bezier(.42,0,.58,1),效果为先慢后快再慢。

![aHR0cDovL3d3dy55ZGh0bWwuY29tL2ltZy8yMDE4LTA5LTExLzUuanBn](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212261156629.png)

## animation动画取消过渡效果

`animation` 默认是从0%到100%的执行, 其默认的过度效果(动画)是`ease`效果(先慢后快再慢过度效果)

* `@keyframes` 的属性是0%到100%，假如我们写的是0%-100%，那绝对会有渐变效果

```css
@keyframes twinkling{ 
  0%{ 
    opacity: 0; 
  } 
  100%{ 
    opacity: 1; /** 会存在渐变效果 **/
  } 
}

```

* 那所以我们换一个写法，0%-50%的时间显示，51%-100%的时间隐藏，就可以直接跳过过度效果实现无渐变。

```css
// 一闪一闪动画
.twinkle{ 
  animation: twinkling 0.5s infinite linear; 
} 
.animated{ 
  animation-duration: 0.5s; 
} 

@keyframes twinkling{ 
  0%, 50%{ 
    opacity: 0; 
  } 
  51%, 100%{ 
    opacity: 1; /** 不会存在渐变效果 **/
  } 
}

```

## 点状背景效果

* 通过[radial-gradient()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient)线性渐变和[background-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)背景图大小设置点状背景
  * 通过`radial-gradient()`设置一个灰色点点, 再通过`background-size`背景尺寸把灰色点点设置的小一些, 因为`background-repeat`背景默认重复行为是`repeat`重复排列, 所以灰色小点点会依次排列, 形成点状背景效果


![image-20221228103418680](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202212281034717.png)

```html
  <div class="one-box">
    <!-- 点状背景 -->
  </div>

```

```css
  .one-box {
    height: 100svh;
    width: 100svw;
    background-image: radial-gradient(#00000021 1px, transparent 1px);
    background-size: 5px 5px;
  }

```

