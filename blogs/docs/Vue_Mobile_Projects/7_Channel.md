---
title: 6. Vue移动端 频道列表编辑操作
date: 2021-06-10
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/4.jpg
tags:
 - Vue
 - Vant
 - Vue移动端
categories: Vue移动头条项目

---

::: tip 介绍

Vue频道列表(Vant动作面板) 频道编辑操作(添加 删除)<br>
:::

<!-- more -->

> 需求：登录的用户，可以选择喜欢的频道

![image-20210611083432783](https://i.loli.net/2021/06/11/b9LWE7oJdM4eDKn.png)

## 获取父组件的频道数据 渲染到编辑模板 `ChannelEdit.vue`

> 目标：实现频道组件基本布局 (Vant底部弹出层)
>
> 效果：实现频道列表 基本样式  获取用具频道数据 实现主题样式

### <big>封装独立的频道编辑 子组件`ChannelEdit.vue`</big>

[Vant动作面板 ActionSheet](https://vant-contrib.gitee.io/vant/#/zh-CN/action-sheet)

> 组件路径：`src/components/ChannelEdit.vue` 创建独立的组件文件

* `template` 模板样式
  * 1. 需要设置 用户当前选中的频道高亮 (动态添加类名 `:class`)
    2. 需要设置 保留推荐频道 不能删除 (排除索引为0的内容 动态显示 `v-show`)

```vue
<template>
  <!-- @closed="editing=false" 关闭屉式菜单  重置编辑状态为不编辑  @input="$emit('input', $event)" -->
  <van-action-sheet :value="value" @closed="editing=false" @input="input" title="编辑频道">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(item,index) in channels" :key="item.id">
          <!-- 添加当前选中频道的高亮类名(用户当前选中的频道 让其高亮显示)
                :class 动态添加高亮类名 类名对象里面三元表达式 判断符合父元素传来的当前索引 让其添加高亮类名 -->
          <span :class="{red : index === activeindex}" class="f12">{{item.name}}</span>
          <!-- 至少留一个推荐频道(第一个频道 索引为0)
                :show动态隐藏显示 除了索引值为0(推荐频道) 其他都显示删除按钮 -->
          <van-icon v-show="editing && index!==0" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="index in 8" :key="index">
          <span class="f12">频道{{index}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </van-action-sheet>
</template>
```

* `script` 脚本内容

```js
<script>
export default {
  // 导入父组件传来的数据
  props: {
    // 控制弹窗组件的显示
    value: {
      type: Boolean
    },
    // 我的频道数据
    channels: {
      type: Array
       //! 表示数组的默认值是空数组[]
      default: () => []
    },
    // 当前频道的索引(选中的频道)
    activeindex: {
      type: Number
    }
  },
  data () {
    return {
      // 叉号的显示对象
      editing: false
    }
  },
  methods: {
    // 会父组件传值 关闭频道编辑窗口
    handleClose () {
      this.$emit('input', false)
    }
  }
}
</script>
```

- `style` 样式设置

```css
</script>
<style lang="less" scoped>
.van-popup--bottom {
  &.van-popup--round {
    border-radius: 0;
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
.channel {
  padding: 10px;
  .tit {
    line-height: 3;
    .tip {
      font-size: 10px;
      color: #999;
    }
  }
  .van-button {
    float: right;
    margin-top: 7px;
  }
  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #ddd;
    font-size: 12px;
    color: #fff;
  }
  .f12 {
    font-size: 12px;
    color: #555;
  }
  .red {
    color: red;
  }
}
</style>

```

### 父组件 传入频道数据给子组件`main.vue`

* 导入频道数据编辑子组件 `script 导入`

```js
// ? 导入 频道编辑操作组件
import ChannelEdit from '../../components/ChannelEdit'
```

* 设置控制 频道编辑 显示的对象 `scrpit脚本 data()储存数据`

```js
// ? 控制编辑频道弹窗的显示和隐藏
      isEdit: false,
```

* 设置父组件传递数据给子组件(频道列表 和 当前选中频道列表的数据)

```vue
    <!-- ?编辑频道组件 给组件传入 频道列表 和 当前选中频道列表的数据 -->
    <ChannelEdit v-model='isEdit' :channels='channels' :activeindex='active'></ChannelEdit>
```

> 总结：
>
> 1. 控制弹窗的显示和隐藏
> 2. 父子组件的数据传递
> 3. v-model在组件上的用法
> 4. 父组件向子组件传值
> 5. 属性的类型检测
> 6. 类的绑定用法

## 渲染可选频道`ChannelEdit.vue`

> 目标：渲染可选频道
>
> 效果: 除了已经选中的频道 在底部添加可选频道  
>
> 原理: 所有频道 减去 用户当前拥有的频道 得出用户还没有获得的频道

![](https://pic.imgdb.cn/item/60c37411844ef46bb2af8686.jpg)

###  封装可选频道 api接口 `api文件夹 channel.js`

```js
// ~ 设置获取 全部频道数据
export const getChannels = () => {
  return request({
    method: 'get',
    url: 'v1_0/channels'
  })
}
```

### 组件中调用方法获取全部频道数据 `ChannelEdit.vue`

> [Vant 动作面板](https://vant-contrib.gitee.io/vant/#/zh-CN/action-sheet)

* `template`模板 
  * 添加 @open 打开动作面板 开始触发指令(Vant方法) 让其打开时候 获取数据

```vue
 <!--？ Vant动作模板支持 @opne 打开动作模板后触发方法 -->
  <van-action-sheet @open='handleOpen' :value="value" @closed="editing=false" @input="handleClose" title="编辑频道">
```

* `script`脚本 
  * 导入获取所有频道的api接口

```js
// ? 导入获取全部频道数据删除频道 添加频道 的api接口
import { getChannels, delChannel, addChannel } from '../api/channel'
```

* `script`脚本 `methods:` 函数方法

```js
  // ? 打开动作模板后执行的方法
    async handleOpen () {
      // ? 调用接口获取所有的频道数据
      // ? 判断 如果获取成功 得到数据 不成功提示用户
      try {
        const ret = await getChannels()
        this.allChannels = ret.data.channels
      } catch (error) {
        // ? 不成功 提示用户
        this.$toast('获取频道列表失败')
      }
    },
```

总结：

1. 已经拥有【我的频道】和【全部频道】数据
2. 基于上述两种频道计算【可选频道】数据
3. 弹窗打开时触发加载全部频道的动作（基于Vant组件的事件open）

### 设置频道计算方法 获取用户未添加的频道`ChannelEdit.vue`

- 根据 【全部频道】 和 【我的频道】 得到 【可选频道】
  - 可选频道 = 全部频道  -  我的频道
- 利用`filter()` 筛选方法(可创先新数组) 和 `some()`(单纯筛选) 数组方法实现

> `script`脚本 `computed:`计算属性

```js
  // ? 添加计算属性
  computed: {
    // ? 添加计算方法 总频道列表 比对 用户已经关注的列表 得出用户还没有关注的频道
    optionChannels () {
      // ? 进行筛选 filter方法进行数据总筛选 接收some() some传来的true为取反 代表不存在的数据为true filter方法储存不存在的数据即可
      // ? filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
      return this.allChannels.filter(item => { // allChannels 是全部频道数据 channels是我的频道数据
        // ? 进行符合条件筛选 some() 并且取反 把不满足条件的取反变成true 返回给filter()筛选器
        // ?  some()方法作用：判断数组中是否包含符合条件的数据，只要有一项符合，就返回true
        return !this.channels.some(items => {
          // ? 比对 filter的数据 返回true
          return items.id === item.id
        })
      })
    }
  }
```

- `template`模板 渲染计算后的数据

```vue
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="items in optionChannels" :key="items.id">
          <span class="f12">{{items.name}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
```

总结：

1. 计算可选频道（算法）
2. 动态渲染可选频道数据

## 点击进入频道 `ChannelEdit.vue`

> 目标：控制点击进入频道
>
> 效果: 点击不同频道时候 进入相应频道文章列表中 (子传父)

### 子组件点击后获取频道索引 传父组件 `ChannelEdit.vue`

- `template模板` 事件绑定 
  - @click 设置点击事件 传入其索引参数

```vue
<!-- ? @click 创建点击事件 携带点击频道的id值(参数) 传给父组件 实现点击后切换到该频道 -->
<span :class="{red : index === activeindex}" class="f12" @click="enterChannel(index)">{{item.name}}</span>
```

- `script ` 脚本 `methods:`函数方法
  - 设置`$emit` 给父组件对应频道的索引值 和 关闭动作面板 布尔值
  - 设置 `.sync $emit('update:xxx)` 互传简写方法

```js
// ? 接收点击频道的id值 创给子组件 实现点击频道后 跳转到该频道
    enterChannel (index) {
      // ? 1、关闭窗口
      this.$emit('input', false)
      // ? 这里需要把index传递给父组件并且给active赋值
      this.$emit('update:activeindex', index)
    },
```

### 父组件监听事件 跳转指定文章列表`main.vue`

* `template`模板 
  * `.sync $emit('update:xxx)`  双向绑定数据 直接可以获取索引值 无需设置方法

```vue
    <!-- ?编辑频道组件 接收子组件传来的数据 -->
    <ChannelEdit @addChannel='addChannel' @delChannel='delChannel' v-model='isEdit' :channels='channels' :activeindex.sync='active'></ChannelEdit>
```

### 简写方法 `.sync $emit('update:xxx)`

- 父子组件之间传值的简化写法
  - 父向子传值  :属性名称 （:activeIndex="active"）
  - 子向父传值  @自定义事件名称 （@update-index="active=$event"）
  - 合并的写法  `:activeIndex.sync="active"`
  - 要求：子组件触发事件 

```diff
    enterChannel (index) {
      this.$emit('input', false)
-     this.$emit('update-index', index)
+     this.$emit('update:activeIndex', index)
    },
```

```vue
    <edit-channel
      v-model="showEditChannel"
      :channels="channels"
-      @update-index="active=$event"
-      :activeIndex="active">
+      :activeIndex.sync="active">
    </edit-channel>
```

总结

1. 如果希望传递给子组件的属性是双向绑定的，可以再属性的后面添加.sync即可，但是有一个要求：子组件触发的事件**必须**是如下的格式 update:属性名称

```js
this.$emit('update:activeIndex', index)
```



## 删除我的频道 `ChannelEdit.vue`

> 目标：实现删除我的频道功能
>
> 效果: 点击删除按钮后 删除改频道 并且通知服务器 该频道已删除

![](https://pic.imgdb.cn/item/60c37cd9844ef46bb289049d.jpg)

### 封装上传频道 api接口 `api文件夹 channel.js`

```js
// ? 设置删除 用户的频道数据
export const delChannel = async (channelId) => {
  return request({
    method: 'delete',
    url: 'v1_0/user/channels/' + channelId
  })
}
```

### 子组件上传删除频道 传值给父组 通知删除`ChannelEdit.vue`

* `template` 模板 
  * 绑定删除频道事件 携带删除频道的id值 进行删除

```vue
       <!-- ~ @click 点击事件 删除频道方法 携带频道id 用于服务器删除 携带索引值 用于页面删除  -->
          <van-icon @click='handleDelete(item.id)' v-show="editing && index!==0" class="btn" name="cross"></van-icon>
```

* `script` 脚本
  * 导入删除api接口文件

```js
// ? 导入获取全部频道数据删除频道 添加频道 的api接口
import { getChannels, delChannel, addChannel } from '../api/channel'
```

- `script` 脚本 `methods:` 函数方法
  - 获取id值 上传删除频道id给服务器
  - 把频道id值创给父组件 让父组件在页面删除该频道

```js
    // ~ 添加删除频道功能方法
    async handleDelete (id) {
      try {
        // ~ 通知服务器 进行频道删除
        await delChannel(id)
        // ~ 删除成功后 把id值创给父组件 通知父组件在页面上进行删除
        this.$emit('delChannel', id)
      } catch (error) {
        // ~ 提示用户 删除失败
        this.$toast('频道删除失败')
      }
    }
```

### 父组件监听事件 进行删除频道 `main.vue`

* `template` 模板
  * 导入要删除频道的id值

```vue
  <!-- ?编辑频道组件 接收子组件传来的数据 -->
    <ChannelEdit @addChannel='addChannel' @delChannel='delChannel' v-model='isEdit' :channels='channels' :activeindex.sync='active'></ChannelEdit>
```

* `script` 脚本 `methods:` 函数方法
  * 使用 `findIndex()`方法 查询删除频道 所在的 总频道列表索引值
  * `splice()`方法 删除对应索引值的 频道

```js
    // 接收子组件传来删除频道的id值 进行页面删除
    delChannel (id) {
      const index = this.channels.findIndex(item => {
        // 把页面上的频道列表 和 子组件传来的 频道id值 进行比对 findIndex方法 查询到其索引值进行删除
        return item.id === id
      })
      // 根据索引 删除对应的页面频道数据
      this.channels.splice(index, 1)
    },
```

总结：

1. 封装接口
2. 绑定事件调用接口
3. 删除频道（子向父组件传值，由父组件根据id删除频道）

## 添加我的频道 `ChannelEdit.vue`

> 目标：添加我的频道参数处理
>
> 效果: 点击添加按钮 添加频道 并且上传到服务器
>
> <big>注意:</big>   
>
> 1. 后端规定 添加列表需要上传排序 `seq` 给喜欢的频道添加序号（每个频道添加seq属性）
>
> 2. 子组件添加的频道 传给父组件时候 需要用`map()`方法循环遍历添加符合 父组件条件的频道值 再传父组件
>
> 3. 提交的数据不可以包含【推荐】频道

### 封装 删除频道的 api接口 `api文件夹 channel.js`

```js
//! 添加频道
//! 添加频道的接口
export const addChannel = (orderChannels) => {
  return request({
    method: 'put',
    url: 'v1_0/user/channels',
    data: {
      channels: orderChannels
    }
  })
}
```

### 子组件上传添加频道数据 并传值给父组件 `ChannelEdit.vue`

* `template` 模板 
  * 携带喜欢频道的 详细数据 进行加工 符合父组件频道数据要求

```vue
          <!-- ! @click 点击事件 点击后 添加新的频道数据 携带频道的详细参数 -->
          <van-icon @click="addChannel(items)" class="btn" name="plus"></van-icon>
```

* `script` 脚本
  * 导入添加频道的api接口

```js
// ? 导入获取全部频道数据删除频道 添加频道 的api接口
import { getChannels, delChannel, addChannel } from '../api/channel'
```

* `script` 脚本 `methods:` 函数方法
  * 组件实现添加频道功能
    - 绑定添加频道的按钮的点击事件
    - 封装了添加频道的接口方法
    - 准备添加频道调用接口的相关参数
      - 要求是数组，数组中放对象，对象中包含频道id和排序序号seq
      - seq作用：告诉后端，页面中频道的顺序
      - 数组中要去掉【推荐】频道
    - 调用接口发送请求
    - 如果调用接口成功，在我的频道中添加一个新的频道（点击的添加的频道）

```js
//! 设置添加频道的方法
    //! 因为无法获取后台seq顺号  只能前端排序让后端统一即可。(后端要求 新的频道总列表 添加序号上传后端)
    //! 后端需要 完整的排好序的 数组 [{id,seq},...] 注意：不需要推荐
    //! 本地需要 {id, name} 利用map方法 往里面添加 频道序列号
    addChannel (channel) {
      //! 准备参数：对每一个现有频道进行排序（添加一个seq属性进行编号）；并且去掉【推荐】频道
      //! 先对之前的频道排序 利用map方法(包含index参数) 往里面添加 频道序列号
      const orderChannels = this.channels.map((item, index) => {
        return {
          //! 添加频道数据的id
          id: item.id,
          //! 添加频道数据的名称
          name: item.name,
          //! 添加频道数据的 索引(map自带)
          seq: index
        }
      })
      //! 把点击的新频道 添加到map遍历的数组中 编号seq是map数组的长度
      orderChannels.push({ id: channel.id, name: channel.name, seq: orderChannels.length })
      //! 去除第一个【推荐】频道 splice 方法
      orderChannels.splice(0, 1)
      //! 调用接口 通知服务器 添加频道的操作
      try {
        //! 请求服务器 添加频道列表
        addChannel(orderChannels)
        //! 添加频道成功后，添加页码的频道(传给父组件 通知父组件更新数据)
        //! 因为首页的频道数据有额外的属性值 所以需要添加这些内容 传给父组件
        const newChannel = {
          //! 频道的id
          id: channel.id,
          //! 频道的标签名称
          name: channel.name,
          //! 文章列表加载状态
          loading: false,
          //! 下拉刷新的完成状态
          isLoading: false,
          //! 上拉列表加载完成的标志
          finished: false,
          //! 下拉刷新完成的提示信息
          pullText: '加载成功',
          //! 时间戳，用于实现列表的分页查询
          timestamp: +new Date(),
          //! 文章列表
          articles: []
        }
        //! 把新的频道数据传递给父组件，让父组件去添加到页面上
        this.$emit('addChannel', newChannel)
      } catch (error) {
        //! 通知用户
        this.$toast('添加失败')
      }
    },
```

### 父组件监听事件 进行添加频道 `main.vue`

* `template` 模板
  * 接收子组件 传来新的 频道数组(包括需求的属性名)

```vue
    <!-- ?编辑频道组件 接收子组件传来的数据 -->
    <ChannelEdit @addChannel='addChannel' @delChannel='delChannel' v-model='isEdit' :channels='channels' :activeindex.sync='active'></ChannelEdit>
```

* `script` 脚本 `methods:` 函数方法
  * 把子组件传来的频道数组 添加到页面的频道数组里

```js
    // 接收子组件传来的添加频道数据
    addChannel (channel) {
      // 把传来的数据 添加到页面频道数组里
      this.channels.push(channel)
    }
```

总结：

1. 准备参数（对频道排序，去掉【推荐】频道）
2. 调用接口添加频道
3. 添加页面的频道



