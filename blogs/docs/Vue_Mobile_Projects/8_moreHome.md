---
title: 8. Vue移动端 文章列表更多操作
date: 2021-06-09
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目
---

::: tip 介绍

Vue首页 文章列表更多操作弹出层 (举报 不感兴趣)<br>
:::

<!-- more -->

## 文章列表弹出层设置(举报删除功能) `MoreAction.vue`

[Vant提供的popup 组件](https://youzan.github.io/vant/#/zh-CN/popup)

> 目标：Vant提供的弹窗层组件（封装独立的组件）`MoreAction.vue`
>
> 使用: 在`main.vue` 导入使用
>
> 效果: 在首页上 弹出一个列表框
>
> 原理: 通过v-model 父传子 子传父 控制显示与隐藏
>
> 组件创建: 文件路径` src/components/MoreAction.vue` `components文件夹 里面 MoreAction.vue`

![image-20210608205520862](https://i.loli.net/2021/06/08/Ua7DWQG8bYNfMp9.png)

1. 给子组件设置两个 绑定事件 `:value ` `@input` (使用v-model语法糖)

*  `:value `接收父元素传入的 true值(父传子)
*  `@input` 设置子元素给父元素传入的 false值(子传父)
   * 不能设置 v-model 因为 v-model修改的 `props`并不支持修改

```html
 <!-- van-popup是Vant提供的弹出层方法 -->
  <!-- 1. ?接收首页点击后 创给的值 true 使用 van-popup方法 让其显示(true显示 false隐藏) -->
  <!-- 需要设置: 1. :value 动态绑定的固定布尔值(用于接收首页传入的true让弹出框显示)
                 2. @input 设置input监听(Vant需求) 当子组件关闭时候 给首页传入false 让首页关闭弹出框  -->
  <van-popup :value='value' @input='handleClose'>
```

2. 给父组件 设置 v-model 接收 `isShow`绑定的动态布尔值 `<MoreAction v-model='isShow'></MoreAction>`

3. 父组件声明方法在data()保存  点击后让 isShow变为 true 并且携带true值 子组件通过`props:['value']`接收父组件传入的true  `:value ` 再获取其true值 实现显示 ==(父传子)==

4. 子组件需要隐藏时 需给父组件传入false  `@input` 传的false值通过` this.$emit('input', false)`方法 传给父组件  父组件设置一个方法(需要参数用来接收子组件的值) 接收子组件传来的数据 并且赋值子组件传的值 ==(子传父)==
5. 父组件 绑定的 v-model `<MoreAction v-model='isShow'></MoreAction>` 接收到 子组件修改父组件完毕的数据 让其隐藏 (不需要操作 只是流程)

> 父组件 设置  `main文件夹里面 main.vue`

* 点击事件 点击后让其显示(true) `template` 模板

```html
 <span class="close">
<!-- ?设置点击显示弹窗事件 点击后设置为true -->
<van-icon @click='handleOpen' name="cross"></van-icon>
</span>
```

* v-model双向绑定 控制弹出层显示隐藏 `template` 模板

```html
    <!-- ?当isShow被点击按钮点击后变为 true显示组件 -->
    <MoreAction v-model='isShow'></MoreAction>
```

* 设置 isShow 布尔值 默认fasle(不显示) `script` 脚本

```js
data () {
    return {
  // ? Vant中提供弹窗属性(默认不显示false 点击后再显示) 需要在 data中设置
      isShow: false,
    }
    }
```

* 设置 点击让其显示的方法 `script` 脚本
* 设置 子组件向父组件传值的方法(接收子组件传来的值)

```js
 methods:{
     // ? 控制更多操作组件显示(显示组件)
    handleOpen () {
      // ? 点击后 显示组件(false 变为 true) 传给子组件
      this.isShow = true
    },
    // ? 接收子组件传来的数值 参数为子组件的布尔值
    handleClose (flag) {
      // ? 把传来的布尔类型 给 isShow接收 实现隐藏
      this.isShow = flag
    }
 
```

* 导入子组件的组件

```js
// ? 导入弹窗的组件
import MoreAction from '../../components/MoreAction'
```

> 子组件 设置  `components文件夹 里面 MoreAction.vue`

* 给子组件设置两个 绑定事件 `:value ` `@input` (使用v-model语法糖)

* 通过 `props:[]` 接收父组件传入的布尔值  `:value ` 接收布尔值  实现显示效果 (父传子)
* 需要隐藏的时候  `@input` 传的false值通过` this.$emit('input', false)`方法 传给父组件 (子传父)

```vue
<template>
  <!-- 1. ?接收首页点击后 创给的值 true 使用 van-popup方法 让其显示(true显示 false隐藏) -->
  <!-- 需要设置 :value 动态绑定的固定布尔值(用于接收首页传入的true让弹出框显示)
                @input 设置input监听(Vant需求) 当子组件关闭时候 给首页传入false 让首页关闭弹出框  -->
  <van-popup :value='value' @input='handleClose'>
    <van-cell-group v-if="!isReport">
      <van-cell>不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell>侵权</van-cell>
      <van-cell>色情</van-cell>
      <van-cell>暴力</van-cell>
      <van-cell>低俗</van-cell>
      <van-cell>不适</van-cell>
      <van-cell>错误</van-cell>
      <van-cell>其他</van-cell>
    </van-cell-group>
  </van-popup>
</template>
<script>
export default {
  name: 'xianshitanchuang',
  // props:['value'],
  // 接收页面传回的 显示隐藏数值 (父组件传回的)
  props: {
    // 给传回来的值 强制设置为布尔类型(按需) 如果类型不对 会报错
    value: {
        // 设置父组件传入的类型
      typeof: Boolean,
        // 设置必填项
      required: true
    }
  },
  data () {
    // 控制举报窗口
    return {
      isReport: false
    }
  },
  methods: {
    handleClose () {
      // 控制关闭弹窗（只能让父组件去关闭）
      // this.$emit('event-close', false)
      this.$emit('input', false)
    }
  }
}

</script>
<style scoped lang='less'>
.van-popup {
  width: 80%;
  border-radius: 4px;
}
</style>

```

---

父传子 子传父` v-model` `$event`

- 指令v-model在组件标签上使用

```vue
<more-action v-model='isShow'></more-action>
<more-action :value='isShow' @input='isShow=$event'></more-action>
```

- 指令v-model在DOM标签上使用

```html
<input type="text" v-model='uname'>
<input type="text" :value='uname' @input='uname=$event.target.value'>
```

> 总结：
>
> 1. $event 在自定义事件中指的是传递的数据  `@input='isShow=$event'`
> 2. $event 在原生DOM事件中指的是事件对象  `@input='uname=$event.target.value'`

## Vant的van-popup组件原理分析(扩展)

> 目标：理解组件上v-model的底层实现原理

- 组件代码

```vue
<template>
  <div @click='handleClose' class="byte-popup" :style='{display: value?"block":"none"}'>
    <div @click.stop class="byte-box">测试</div>
  </div>
</template>
<script>
export default {
  name: 'BytePopup',
  props: ['value'],
  methods: {
    handleClose () {
      // 控制点击背景关闭弹窗
      console.log('hello')
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped lang='less'>
.byte-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  .byte-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 200px;
    height: 200px;
  }
}
</style>

```

- 组件的用法

```vue
<!-- <byte-popup v-model='show'>内容</byte-popup> -->
<byte-popup :value='show' @input='show=$event'>内容</byte-popup>
<!-- <van-popup v-model="show">内容</van-popup> -->
```

> 总结：v-model在组件上的用法原理：通过value属性向组件传值，通过input事件监听子组件传回的值。

## 组件属性传值的类型检测 Prop验证(扩展)

[Prop 验证详情](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)

> 目标：熟悉组件属性类型检测的作用和用法

```js
  // props: ['value'],
  props: {
    // 属性的类型检测:提高组件被使用时传递数据的规范性
    // https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
    value: {
      // 属性值必须是布尔类型
      type: Boolean,
      // 属性是必填项
      required: true
    }
  },
```

> 总结：
>
> 1. 类型检测可以提供组件的使用的规范性
> 2. 熟悉类型检测的具体[规则](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)



## 不感兴趣文章功能实现 `MoreAction.vue`

[Vant提供的popup 组件](https://youzan.github.io/vant/#/zh-CN/popup)

> 目标：实现不感兴趣功能 基于文章列表弹出层 实现不感兴趣功能实现(轻提示)
>
> 效果: 通过弹出层提供的不感兴趣文章按钮 隐藏改文章 并且把文章id传给服务器 下次不显示
>
> 原理: v-model 父传子图书id 子组件提交不感兴趣后 传给父组件图书id 让父组件在文章列表中删除

### 不感兴趣功能 父组件传值给子组件文章id

- 父组件 点击按钮时传入文章id `首页 main.vue中获取 template模板中`

```vue
  <span class="close">
	<!-- ?设置点击显示弹窗事件 点击后设置为true 并且携带文章对应的id值 -->
		<van-icon @click='handleOpen(item.art_id)' name="cross"></van-icon>
	</span>
```

- 文章id注入子组件`首页 main.vue中获取 template模板中`

```vue
    <!-- ?编辑频道组件 给组件传入 频道列表 和 当前选中频道列表 的数据 -->
    <ChannelEdit v-model='isEdit' :channels='channels' :activeindex='active'></ChannelEdit>
```

* 父组件 声明一个获取 用户id的对象 `首页 main.vue中获取 data()储存数据`
  * 默认没有数据设置 -1

```js
      // 创建一个点击后 获取文章id的对象
      articleId: -1,
```

* 父组件 获取文章id方法 `首页 main.vue中获取 scrip脚本 methods: 中设置方法` 
  * 把不喜欢内容的id值 创给子组件 让子组件上传到服务器中

```diff
+// 声明 控制弹窗显示 和 记录文章的id
handleOpen (id) {
    // 控制弹窗显示
    this.isShow = true
+    // 记录文章的id
+    this.articleId = id
},
```

> 总结：点击X，获取文章id并记录，通过组件属性传入子组件。

### 不感兴趣功能接口设置

> 目标：封装不喜欢接口调用方法

- 封装接口调用方法 `api文件夹 里 article.js`

```js
// ~ 不感兴趣功能 的接口
export const dislike = id => {
  return requset({
    method: 'post',
    url: 'v1_0/article/dislikes',
    data: {
      target: id
    }
  })
}
```

### 不感兴趣功能实现 子组件设置上传图书id

* 点击按钮发送请求 `components文件夹 里面 MoreAction.vue`

```vue
    <!-- ! 绑定不敢兴趣点击方法 -->
      <van-cell @click="disLike">不感兴趣</van-cell>
```

* 导入不感兴趣的api接口组件

```js
//! 导入不感兴趣api
// ? 导入举报按钮的 api
import { dislike } from '@/api/api-article.js'
```

* 实现不感兴趣子组件设置 `script 脚本  methods: 中设置方法`
  * 子组件上传父组件传回的不喜欢文章id 提交上传 
  * 发送数据成功后 子组件给父组件 传回关闭弹出层的布尔值 实现提交数据后 关闭弹出层 `$emit`子传父

```js
    //! 不敢兴趣按钮的接口比对 传给服务器不敢兴趣的文章id
    async disLike () {
      try {
        //! 传给服务器 获取服务器的返回值 如果成功 提示用户操作成功(try) 不成功提示用户(catch)
        const ret = await dislike(this.articleId)
        if (ret.data.target) {
          //! 关闭弹窗
          this.$emit('input', false)
          //! 删除对应的文章数据（通知父组件去删除文章数据）
          this.$emit('on-success', this.articleId)
          //! 提示用户操作成 ($toast)是vant提供的轻提示
          this.$toast('不感兴趣操作成功')
        }
      } catch (error) {
        //! 不成功提示用户 ($toast)是vant提供的轻提示
        this.$toast('不感兴趣操作失败')
      }
    }
```

### 父组件在文章列表里删除该文章 

* 父组件接收子组件传回不感兴趣图书的id值 `子传父`

```vue
    <!-- ?当isShow被点击按钮点击后变为 true显示组件
          @on-success='handleDislike' 接收子组件传回的图书id值-->
    <MoreAction v-model='isShow' :article-id='articleId' @on-success='handleDislike'></MoreAction>
```

* 父组件接收到子组件传给不感兴趣图书id 在文章列表中删除该内容 `script 脚本  methods: 中设置方法`

```js
    // 不敢兴趣的删除功能方法
    handleDislike (id) { // 接收子组件传回要删除的id值
      // 根据id删除该文章
      const index = this.activeChannel.articles.findIndex(item => {
        return item.art_id === id
      })
      // 根据索引删除数组的一个元素
      this.activeChannel.articles.splice(index, 1)
    },
```

总结：

1. 调用接口告诉服务器我对那篇文章不感兴趣
2. 操作成功后，通知父组件删除对应文章



## 文章id超范围问题

[处理id超范围的包](https://github.com/sidorares/json-bigint)

> 问题: js处理数字有长度限制 如果后端传来的数据太长 js无法处理 导致无法把修改后的数据交给后端处理
>
> 解决: 安装插件 npm i json-bigint
>
> 类型: 会把 超范围的id 转换为对象拼接起来 并非之前字符串 所以调用时候 需要用 `toString()`转换成字符串

![image-20210610132529317](https://i.loli.net/2021/06/10/YKC2j6HSOGcQNZX.png)

> 在通用的接口调用模块设置  `utils文件夹 里面 request.js`

* 设置`transformResponse` 在传递给 then/catch 前，允许修改响应数据(比响应式拦截更早)

```diff
// 导入bigint插件
import JSONbig from 'json-bigint'
// ~  声明一个通用的url基础地址 用于申请token的基础路径 用常量保存
const baseURL = 'http://api-toutiao-web.itheima.net/app/'
// ~  axios分支的方法 创建axios接口调用方法 取代单一的axios方法(方便单独设置)
const instance = axios.create({
+   // 在接口获取数据之前对后端返回的原始数据进行处理
+   // 这里处理发生在响应拦截器之前（它最先接触到后端返回的原始数据）
+   transformResponse: [(data) => {
+     // 这里对数据处理好之后，再交给响应拦截器即可
+     try {
+       // 转换的id值 是一个对象 注意后续: 需要转换为字符串格式 对象不属于任何字符串格式
+       return JSONbig.parse(data) // parse是对文章列表的id值 进行转换 解决js数值最大限制问题
+     } catch {
+       // 如果数据转换错误，就不做转换，返回原始数据
+       return data
+     }
+ }],
  // ~ baseURL是axios属性 用来声明url基础路径
  baseURL: baseURL
})
```

> 如果用完有Vue警告 :
>
> ![1623308642(1)](https://i.loli.net/2021/06/10/ZGrsb2gnAhqJOk9.png)
>
> 原因: 插件会自动把长id转换为 对象 拼接起来 但是`:key` 要求的是对象 所以会警告
>
> 解决: 需要用 `toString()`转换成字符串 即可
>
> * `:key="item.art_id.toString()"`



## 举报功能的实现 `MoreAction.vue`

[Vant提供的popup 组件](https://youzan.github.io/vant/#/zh-CN/popup)

> 目标：实现各种类型举报功能
>
> 效果: 根据举报id 上传给服务器 举报类型 举报完毕后审核通过(和后端互动) 屏蔽该内容
>
> 原理: v-model 父传子图书id 子组件提交举报后 传给父组件图书id 让父组件在文章列表中删除
>
> <big>注意:</big> 后端返回的图书id可能过大 需要设置 id超范围解决插件: [解决id超范围方法](https://liukaili.vercel.app/blogs/docs/axios/axios_transform.html#%E6%96%87%E7%AB%A0id%E8%B6%85%E8%8C%83%E5%9B%B4%E9%97%AE%E9%A2%98)

### 举报文章列表基本布局

> 常量数据 一般单独设置为一个组件 方便修改数据 `utils文件夹 里面 新建 constant.js`

```js
// 常量 储存器
// 举报类型
export const reports = [
  { value: 0, label: '其他问题' },
  { value: 1, label: '标题夸张' },
  { value: 2, label: '低俗色情' },
  { value: 3, label: '错别字多' },
  { value: 4, label: '旧闻重复' },
  { value: 5, label: '广告软文' },
  { value: 6, label: '内容不实' },
  { value: 7, label: '涉嫌违法犯罪' },
  { value: 8, label: '侵权' }
]

```

> 导入到弹出层组件中 填充举报功能 `MoreAction.vue`

- 导入常量组件

```js
// ? 导入举报功能的常量(固定值 单独设置在固定值文件 便于修改)
import { reports } from '../utils/constant'
```

* 把导入常量的数据储存起来 `script脚本 data() 存储数据`

```diff
  data () {
    return {
      isReport: false,
+     reports: reports
    }
  },
```

* 把举报常量值` v-for` 循环遍历打印到页面上 `template模板设置`
  * 设置`@click`点击事件 点击后 携带其举报信息的id值 把举报信息上传到服务器

```vue
  <!-- ？举报功能保存data()常量 循环遍历到模板上
		设置点击方法 绑定举报类型(id值) -->
      <van-cell @click="handleReport(item.value)" icon="info-o" v-for="item in reports" :key="item.value">{{item.label}}</van-cell>
```

总结：

1. 固定的相对不变的数据可以统一放到独立的模块中，方便了后续的统一维护

### 举报文章功能实现

> 封装 举报文章的api接口 `api文件夹 里 article.js`

- 封装举报文章接口调用方法

```js
// ? 举报功能的接口
export const report = (articleId, type) => {
  return requset({
    method: 'post',
    url: 'v1_0/article/reports',
    data: {
      target: articleId,
      type: type
    }
  })
}
```

> 组件设置点击事件 上传举报内容分类 `子传父`

- 绑定点击事件，发请求(其实上一步已经做了) `template模板设置`

```vue
  <!-- ？举报功能保存data()常量 循环遍历到模板上
		设置点击方法 绑定举报类型(id值) -->
<van-cell @click="handleReport(item.value)" icon="info-o" v-for="item in reports" :key="item.value">{{item.label}}</van-cell>
```

* 设置举报信息发送 
  * 发送数据成功后 子组件给父组件 传回关闭弹出层的布尔值 实现提交数据后 关闭弹出层 `$emit`子传父
  * 举报完毕后 通知父组件 删除该文章 `$emit`子传父

```js
    // ? 举报功能接口比对 传给服务器举报信息
    async handleReport (type) {
      try {
        const ret = await report(this.articleId, type)
        if (ret.data.target) {
          // ? 举报成功提示用户($toast)是vant提供的轻提示
          this.$toast('举报文章成功')
          // ? 关闭弹窗
          this.$emit('input', false)
          // ? 通知父组件删除文章
          this.$emit('on-success', this.articleId)
        }
      } catch {
        this.$toast('举报文章失败')
      }
    }
```

