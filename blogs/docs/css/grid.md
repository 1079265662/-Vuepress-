---
title: Grid布局的学习记录
date: 2022-01-25
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-9meo78.jpg
tags:
 - Css
categories: Css
---

::: tip 介绍
Grid布局的学习记录<br>
:::

<!-- more -->

## 什么是grid布局

* 网格布局（Grid）是最强大的 CSS 布局方案。
* 它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

> grid和flex的区别

* `flex`布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。`grid`布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。`grid`布局远比 `flex`布局强大。
* `grid`+`flex`才是顶级之配 `flot`狗都不用 什么你说ie 不存在的 这是什么浏览器

> 学习视频

* 我是在 [b站这里](https://www.bilibili.com/video/BV1Bk4y197xm?from=search&seid=24652100936285353&spm_id_from=333.337.0.0) 学习的grid布局

## grid和flex容器和单元格概念

* `grid`布局有两个基本概念
  * 容器(container) 容器的概念就是一个大盒子 里面包裹着项目
  * 单元格(items 、项目) 单元格的概念就是大盒子里面的一个个小盒子 
  * 实际上基本概念和 flex 布局是有一定的相似处

![image-20220124185037060](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220124185037060.png)

## grid布局的整体介绍

* `grid`布局分为 行高 列宽 等等 但是 行高 列宽这俩个是最关键的 <font color=#ff3040>非常重要</font>

![image-20220124172955556](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220124172955556.png)

* 我们不光要懂行高列宽的概念 还要懂网格线的概念
  * 下图是一个 4 x 4 的网格，共有5根水平网格线和5根垂直网格线。

![image-20220124173220734](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220124173220734.png)

* <font color =#ff3040>注意: </font>
  * 设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效
  * grid布局只对项目生效，项目只能是容器的一级子元素，子元素并不生效
  * 设置grid布局后 内部单元格不建议使用`margin`来实现间距 可以使用`gap`来实现间距 或者使用`box-sizing: border-box;` + `padding`



# 容器属性(container)

## grid-template-columns 列宽  grid-template-rows 行高

* 容器指定了网格布局以后，接着就要划分单元格的行高和列宽 顺序为正序 单元格不设置宽高和其他属性 默认是等分充满整个容器
* `grid-template-columns`属性定义每一列的列宽
* `grid-template-rows`属性定义每一行的行高

![image-20220124175432720](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220124175432720.png)

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
}
```

* 除了使用绝对单位，也可以使用百分比。

```css
.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}
```

### **repeat()函数复写 (常用)**

* 写这么多相同的数 肯定累死了 我们可以通过设置`repeat()`复写函数 来代替
* `repeat()`接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值

```css
.container {
  display: grid;
  grid-template-columns: repeat(4,100px);
  grid-template-rows: repeat(3,100px);
}
```

* 不止于此，`repeat`还可以重复某种模式 也就 基数偶数的意思

```css
grid-template-columns: repeat(3,200px 100px); /** 这句代码定义了6列，分别是200，100，200，100，200，100 **/
```

### **auto-fill 关键字 (不常用)**

* 表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格
* 当我们只需要确定列宽或者行高，而不用理有多少列时，就可以使用它了 通常列用的很多
* <font color =#ff3040>注意:  如果你的行`grid-template-rows`超出了设置的话 会出现挤压</font>

```css
.container {
    display: grid;
	grid-template-columns: repeat(auto-fill,200px);
    grid-template-rows: repeat(3,200px);
}
```

* 当我们只需要确定列宽或者行高，而不用理有多少列时，就可以使用它了

![img](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509220842447.gif)

### **fr关键字 (常用)**

* `fr` 单位代表网格容器中可用空间的一等份(类似于`flex:1` `flex:2` 、百分比) 相比传统的px 具备了自适应性

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 2fr ; /** 左侧固定200px 中间1fr 右侧2fr **/
    grid-template-rows: repeat(3,200px)
}
```

* 表示第一个列宽设置为 `200px`，后面剩余的宽度分为两部分，第二给项目占`1/3`，第三个项目占`2/3`

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509220920257.gif)

### **minmax()关键字 (常用)**

* `minmax()` 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值
* 也就是说最大不会超过最大值，最小不能小过最小值 可以把他理解为 `min-width`  `max-width` 

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr minmax(400px,1fr); /** 列宽不小于400px，不大于1fr **/
    grid-template-rows: repeat(3,200px)
}
```

* `minmax(400px,1fr)`表示列宽不小于`400px`，不大于`1fr`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509220939349.gif#pic_center)

### **auto关键字 (常用)**

* 设置`auto`后，将由浏览器自行决定长度，尽可能的会占满剩余空间，除非有其他设置，例如有`min-width`之类的
* 利用这个关键字，我们可以轻易实现三列或者两列布局。
* <font color =#ff3040>注意: 如果你要实现三列布局 左右两侧的单元格就不要使用`fr` 他会导致你设置`auto`的单元格默认为内容宽度 而且不要设置复写函数`repeat()`</font>

```css
.container {
    display: grid;
	grid-template-columns: 200px auto 200px;
	grid-template-rows: repeat(3,200px)
}
```

* 如果中间那列设置了`auto`，两侧写死`px` 这样就实现了简单中间自适应的三栏布局(圣杯?)

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509220954600.gif)

### **网格线**

* grid布局叫做网格布局，那自然少不了网格线的存在，使用方括号，指定每一根网格线的名字，方便以后的做定位时使用 
* 没有实际的作用 只是一个辅助属性方便定位使用

```css
.container {
    display: grid;
    grid-template-columns: [c1] 200px [c2] auto [c3] 200px [c4];
	grid-template-rows:  [r1] 200px [r2] auto [r3] 200px [r4];
}
```

* 就像这样定义了一个`3*3`的网格区域，就需要有4条水平线，4条垂直线

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509221018381.png)

## gap 网格间距 

* 这个是设置每个单元格的边距 包括他的 行间距 列间距
* `row-gap`属性设置行与行的间隔（行间距），`column-gap`属性设置列与列的间隔（列间距）。
* <font color =#ff3040>注意：在很多的博客中采用的都是带有`grid`前缀的方式，目前这种定义网格间距的方式已经被废弃了，所以还是尽量采用这种写法</font>

```css
.container {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: repeat(3, 200px);
  gap: 10px 20px; /** 行间距 列间距 **/
}

```

* 在这段代码中定义了行间距为`10px`，列间距为`10px`，也可以采用合并属性`gap`来写`gap: 10px 10px`的意思和上面相同，第一个参数是行间距，第二个是列间距

![image-20220125093225454](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125093225454.png)

##  grid-template-areas 定义单元格区域

* 用于定义区域，一个区域由一个或者多个单元格组成 这个需要配合单元格的`grid-area`指定区域的属性

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
  grid-template-areas: 'a b c' 'd e f' 'g h i';
}
```

* 上面的代码划分出了9个单元格，然后将其命名为`a~i`的9个区域，分别对应9个单元格

> 合并成一个区域

* 我们也可以将多个单元格合并成一个区域
* <font color = #ff3040>注意: 如果一整块区域都是`a a a` 也不可能简写为`a` 一定要按照单元格的数量来设置 不可简写少写</font>

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
  grid-template-areas: 'a a a' 'b b b' 'c c c';
}
```

* 上面的代码中将9个单元格划分成了`a,b,c,d`4个区域

> 举个例子

* 在我们常见的布局中

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/2021050922104438.png)

```css
grid-template-areas: 'header header header' 
					 'nav nav nav' 
					 'article article aside'
					 'footer footer footer';
```

* 像上面的代码中，我们就划分成功了 然后我们可以继续学习如何去单独操作他们

> 其他事项

* 如果你不想给容器里的单元格起名字 可以用 `.`代替 如:` 'nav . nav'`
* <font color =#ff3040>注意：区域的命名会影响到网格线的名字，对于区域`aside`它的起始线叫做`aside-start`，结束线叫做`aside-end`</font> 不理解没关系 反正用不到 老老实实给他起名字就行 别少写或者简写

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509221057248.png)

## grid-auto-flow 容器内单元格排列方式

* 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。
* 这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。

```css
.container {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: repeat(3, 200px);
  grid-auto-flow: column; /** 盒子的排列顺序变成了先列后行 **/
}
```

![image-20220125094534638](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125094534638.png)

> 自动密集排列

* 假设当我调整我们的代码将某一个项目拉长时，会有这一行放不下的情况，就像图片左边这个场景一样，第6个项目因为太长了放不上去，那个位置被空出来了，我们可以尝试使用。

```css
.container {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: repeat(3, 200px);
  grid-auto-flow: row dense;/** 自动密集排列 **/
}
```

* 在实际应用中，我们可能想让下面长度合适的填满这个空白，这个时候可以设置 `grid-auto-flow: row dense`，表示尽可能填满表格

![image-20220125095302037](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125095302037.png)

## 容器内容排列方式 center

* 容器内容排列方式 分为两种
  * 单元格的排列方式
  * 容器的排列方式

### **单元格的排列方式**

* 这个是设置容器内所有单元格的排序方式 整体全部设置一直的排列

* `justify-items` 属性设置单元格内容的水平位置（左中右），`align-items` 属性设置单元格的垂直位置（上中下）
* 实际上这个跟`flex`布局是一样的
  * start：对齐单元格的起始边缘。
  * end：对齐单元格的结束边缘。
  * center：单元格内部居中。
  * stretch：拉伸，占满单元格的整个宽度（默认值）。
    * 简写: `place-items: 水平位置 垂直位置;`
* <font color =#ff3040>注意: 如果你的单元格没有设置宽度 当你设置排列方式的时候 宽度会变成默认的宽度</font>

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
  justify-items: center; /** 水平 **/
  align-items: center; /** 垂直 **/
}
```

![image-20220125101012269](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125101012269.png)

* 当然你可以简写 ( 垂直 水平 )

```css
 place-items: align-items justify-items;
```

### **内容区域的排列方式**

* 如果整个容器想要垂直水平居中呢 这里就需要用到 `justify-content`属性是定义整个内容区域在容器里面的水平位置（左中右），`align-content`属性是定义整个内容区域的垂直位置（上中下）
* 实际上这个跟`flex`布局是一样的
  * align-content: `stretch|center|flex-start|flex-end|space-between|space-around|initial|inherit;`
  * justify-content:` flex-start|flex-end|center|space-between|space-around|initial|inherit;`
* 他没有简写属性

> 具体实例

* 设置 垂直方向 `align-content`

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/2021050922131762.png)

* 设置 水平方向 `justify-content`
* content-stretch ：项目大小没有指定时，拉伸占据整个网格容器。

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509221345622.png)

* space-around ：两侧的边距相等。因此，项目之间的边距比项目与容器边框的边距大一倍

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509221359587.png)

* space-between ：项目与项目的边距相等，两侧没有边距。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509221411475.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzUwODU1ODcy,size_16,color_FFFFFF,t_70#pic_center)

* space-evenly ：两侧有间距 并且中间和两侧边距一致 全部等分

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509221423360.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzUwODU1ODcy,size_16,color_FFFFFF,t_70#pic_center)

## 设置多出的网格(隐式网格)

* 对于网格有显式网格和隐式网格，显示网格通过`grid-template-columns` 和 `grid-template-rows` 属性中定义的行和列，当实际行数或者列数大于设置的行列数时，就会有多余的网格，这些网格的宽高通过`grid-auto-columns`和`grid-auto-rows`属性来设置

> 举个例子

* 比如我有10个单元格 但我的列和行只设置了3x3 那么多出的单元格我想单独设置 就需要用到这个属性

![image-20220125104637447](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125104637447.png)

* 我想给10号盒子设置他的列宽和行高

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
  grid-auto-columns: 200px; /** 设置列宽 **/
  grid-auto-rows: 200px; /** 设置行高 **/
}
```

![image-20220125104835733](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125104835733.png)

> 图文详解

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509221441356.png)

# 单元格属性(项目 items)

##  指定单元格的列宽行高

* 如果我们想给单元格等比设置列宽行高怎么办呢
* 实现的原理是通过网格线 来设置单元格
  * `grid-column-start`属性：左边框所在的垂直网格线
  * `grid-column-end`属性：右边框所在的垂直网格线
    * 简写: `grid-column: 左边 右边 ` 
  * `grid-row-start`属性：上边框所在的水平网格线
  * `grid-row-end`属性：下边框所在的水平网格线
    * 简写: `grid-row: 上边 下边`

> 举个例子

* 我们设置一个3x3的grid单元格布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
}
```

![image-20220125114253237](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125114253237.png)

* 然后我们想把1号单元格设置成两行两行
  * <font color =#ff3040>注意: 必须用 `/` 分割 不可以用空格代替 `/`不是除号的意思，仅是占位的作用</font>
  * 如果只写一个数字的话，默认跨越1个网格

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
}
/** 设置成三列两行 **/
.item-1 {
  background-color: #55efc4;
  grid-column: 1 / 3; /** 设置他的列宽 从网格线1到网格线3 也就是到横着第二个单元格的右侧 **/
  grid-row: 1 / 3;  /** 设置他的行高 从网格线1到网格线3 也就是到竖着第二个单元格的底部 **/
}
```

> 图文详解

![image-20220125115422843](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125115422843.png)

* 我们还可以通过`span`关键字，来实现占2个网格这样的效果，可以将它理解为跨越的意思

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
}
.item-1 {
  background-color: #55efc4;
  /** grid-row: 1 / 3; **/ 
  /** grid-column: 1 / 3; **/  
  grid-row: span 2; /** 和1 / 3是相同的意思 设置两个行高 **/
  grid-column: span 2; /** 和1 / 3是相同的意思 设置两个列宽 **/
}
```

## 指定单元格的区域 grid-area

* 在前面容器属性讲过`grid-template-areas`定义区域属性，当时只是知道了怎么划分区域，现在`grid-area`属性就是怎么把项目指定给区域

> 举个例子

* 假设我们设置一个3x3的grid单元格布局 并且用`grid-template-areas`定义了区域属性

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
  grid-template-areas: 'a a a' 'b b b' 'ccc'; /** 3x3的盒子给他分配指定的区域**/
}
```

* 那么实际上这个区域的单元格是这样分的

![image-20220125133755848](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125133755848.png)

* 那我通过`grid-area`属性 让单元格1 设置到b区域(中间)
* <font color =#ff3040>注意: grid-area 设置区域的时候 不要带`''` 如果你的区域都相同的 比如`b b b` 那么他会占用一块`b`的区域</font>

````css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
  grid-template-areas: 'a a a' 'b b b' 'c c c';
}
.item-1 {
  background-color: #55efc4;
  grid-area: b;
}
````

![image-20220125134331044](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125134331044.png)

> 图文详解

![image-20220125134538970](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125134538970.png)

## 指定单元格内容排列方式(单个)

* 容器可以通过`align-items`和`justify-items` 设置容器内所有单元格的排列 但是如何只设置容器中的单独一个单元格呢 `self`这个单词就是自身的意思
  * `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
  * `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。
  * 属性值：`start | end | center | stretch`
    * 简写: `place-self: 水平位置 垂直位置;` 

> 举个例子

* 我想把容器里的单元格3设置为垂直水平居中 但不影响其他人

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 200px);
}
.item-3 {
  background-color: #74b9ff;
  align-self: center; /** 设置单元格3垂直居中 **/
  justify-self: center; /** 设置单元格3水平居中 **/
}
```

![image-20220125140701793](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220125140701793.png)

* 当然也可以简写 ( 垂直 水平 )

```css
place-self: align-self justify-self;
```

> 图文详解

* 设置 垂直方向 `align-self`

![在这里插入图片描述](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/20210509221605738.png)

* 设置 水平方向 `justify-self`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210509221555847.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzUwODU1ODcy,size_16,color_FFFFFF,t_70#pic_center)

## 参考文献

* [图解CSS布局（一）- Grid布局](https://blog.csdn.net/m0_50855872/article/details/116571697?spm=1001.2014.3001.5502)

