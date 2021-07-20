---
title: JS 常用的数组方法
date: 2021-06-24
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/16.jpg
tags:
 - 数组方法
categories: JS 方法合集
---

::: tip 介绍
JS 常用的数组方法合集<br>
:::

<!-- more -->

## `map(item=>{return 重组解构})` 处理数组方法(重组)

> map后的数据类型: [{id:'',name:'',seq:''},{},{}.........]

* map() 方法返回一个`新数组`，数组中的元素为原始数组元素调用函数处理后的值
* map() 具有两个参数 一个是原数据(item) 一个是索引值(index)
* map可以作用于 对遍历的每一项数据 进行加工 让其变为新的数组。
* map() 方法会遍历出一个新的数组(无需存储) 拿来用即可
  * 用于数组中的每一项数据进行处理 最后返回一个新的数组
  * 可以用于 给数组添加新的属性名
* 需要 <font color = #ff3040>return</font>

> 对每一个现有频道进行排序 并且添加一些属性

```js
  //! 对每一个现有频道进行排序（添加一个seq属性进行编号和其他数据）
      //! 先对之前的频道排序 利用map方法(包含index参数) 往里面添加 频道序列号
      const orderChannels = this.channels.map((item, index) => {
        return {
          //! 添加频道数据的id
          id: item.id,
          //! 添加频道数据的名称
          name: item.name,
          //! 添加频道数据的 索引(map自带)
          seq: index
        })
  // 数据类型: [{id:'',name:'',seq:''},{},{}.........]
```

## `filter(item=>{return 筛选条件})` 筛选数组方法

>返回的数据类型是 布尔值 符合条件 true 不符合 false

* filter() 方法创建一个`新数组`，新数组中的元素是通过检查指定数组中符合条件的所有元素。
  * **注意**：filter() 不会对空数组进行检测。
  * **注意**： filter() 不会改变原始数组。
  *  <font color = #ff3040>需要: return</font>

> 在数组筛选能被2整除的数据

```js
let arr = [56, 15, 48, 3, 7];
let newArr = arr.filter(function (value, index, array) {
    return value % 2 === 0;
});
console.log(newArr)
// [56, 48]
```

> 配合 `some()` 检测数组中的元素是否满足指定条件(取反) 再`filter()`储存不满足条件数据

```js
    optionChannels () {
// ? 进行筛选 filter()方法进行数据总筛选 接收some()传来的true(取反值) 代表不存在的数据为true filter() 方法储存不存在的数据即可
// ? filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
        
      return this.allChannels.filter(item => { // allChannels 是全部频道数据 channels是我的频道数据
        // ? 进行符合条件筛选 some() 并且取反 把不满足条件的取反变成true 返回给filter()筛选器
        // ?  some()方法作用：判断数组中是否包含符合条件的数据，只要有一项符合，就返回true
        return !this.channels.some(items => {
            // ?
          return items.id === item.id
        })
      })
    }
```

## `some(item=>{return 条件判断})` 筛选数组方法

* `some()`不会创建一个新数组 `some()` 方法用于检测数组中的元素是否满足指定条件（函数提供）。
* 如果有一个元素满足条件，则表达式返回*true* , 剩余的元素不会再执行检测。
* 如果没有满足条件的元素，则返回false。

  * **注意：** some() 不会对空数组进行检测。
  * **注意：** some() 不会改变原始数组。
  *  <font color = #ff3040>需要: return</font>
* 通常和 `filter()`方法使用

> 配合 `some()` 检测数组中的元素是否满足指定条件(取反) 再`filter()`储存不满足条件数据

```js
    optionChannels () {
// ? 进行筛选 filter()方法进行数据总筛选 接收some()传来的true(取反值) 代表不存在的数据为true filter() 方法储存不存在的数据即可
// ? filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
        
  return this.allChannels.filter(item => { // allChannels 是全部频道数据 channels是我的频道数据
        // ? 进行符合条件筛选 some() 并且取反 把不满足条件的取反变成true 返回给filter()筛选器
        // ?  some()方法作用：判断数组中是否包含符合条件的数据，只要有一项符合，就返回true
        return !this.channels.some(items => {
            // ?
          return items.id === item.id
        })
      })
    }
```

## `find(item=>{return 筛选条件})` 筛选数组符合条件内容

* `find()`不会修改原对象(数组) 但是<font color = #ff3040>会返回一个符合条件的对象</font>
* 当数组中的元素在测试条件时返回 true 时, `find()` 返回符合条件的元素，之后的值不会再调用执行函数。
* 如果没有符合条件的元素返回 undefined
* **注意:** `find()` 对于空数组，函数是不会执行的。
* 可以设置索引值的参数 array.find(function(当前元素, 索引值, 当前元素所属的数组对象))

> 基于Vue进行的find()筛选 (作用域插槽传来的数据例子)

```js
    formatHireTyp (type) { // 接收作用域插槽传来的数据
      // 使用find方法 查询符合格式化的数据
      const obj = Types.hireType.find(item => { // 导入格式化规则
        return item.id === type // 格式化条件 查询 作用域插槽传来的数据
      })
      // 把查完的结果 return返回 返回给作用域插槽
      // 进行判断 如果查询到存在筛选内容 那就赋值给其正式的数据 如果没查到 返回原数据
      return obj ? obj.value : type
    },
```

## `forEach((item,index)=>{})` 循环遍历

* 不会生成一个新数组 会直接改变原数组
* 本质上等同于 for 循环，对每一项执行 function 函数。
* 没有返回值(return)
* <font color=#ff340>**注意: **</font>该方法会改变原始数组。

> 筛除3号数字 

```js
var arr = [1, 2, 3, 4, 5];

arr.forEach(function (item) {
    if (item === 3) {
        return;
    }
    console.log(item);
});
```

## `indexOf("")` 查找下标(索引值)

* 查找 对应数据的索引值 
  * 如果存在 返回相应的索引值
  * 如果不存在  返回 -1 (区分大小写)

> 查询相应内容的下标

```js
<script type="text/javascript">

let str=["123","321","111"]

str.indexOf("123")
str.indexOf("321")
str.indexOf("666")
</script>
// 返回的数值
0
1
-2
```

## `includes() ` 判断数组是否包含指定的值

* includes() 方法用来判断一个数组是否包含一个指定的值。
* 如果是返回 true，否则false

> 简单判断流程

```js
let site = ['runoob', 'google', 'taobao'];
 
site.includes('runoob'); 
// true 
 
site.includes('baidu'); 
// false
```

## `splice()` 数组删除添加二合一

* splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
* 这个方法 不会生成 新数组 会直接改变原来数组
* 通常用作删除功能

<font color=#ff340>**注意: **</font>该方法会改变原始数组。

```js
arrayObject.splice(index,howmany,item1,.....,itemX)
```

| 参数              | 描述                                                         |
| :---------------- | :----------------------------------------------------------- |
| index             | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。 |
| howmany           | 必需。要删除的项目数量。如果设置为 0，则不会删除项目。       |
| item1, ..., itemX | 可选。向数组添加的新项目。                                   |

> `splice()` 用作删除 示例

```js
      // ? 在页面数据历史记录 找到指定索引 进行删除 index是索引 1是删除一个
      this.history.splice(index, 1)
```

## `replace()` 数组替换内容方法

* replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
* 此方法不会创建一个 新数组 会直接改变原来数组
* 通常配合正则表达式来替换内容

```js
	w = kw.replace(reg, this.q) // 替换方法 replace(替换规则,替换数据)
```

| 参数          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| regexp/substr | 必需。规定子字符串或要替换的模式的 RegExp 对象。请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。 |
| replacement   | 必需。一个字符串值。规定了替换文本或生成替换文本的函数。     |

> 使用正则表达式 配合`replace`替换内容

```js
      // kw此时包括span高亮的标签，需要去掉
      const reg = new RegExp(`<span>${this.q}</span>`, 'ig') //RegExp是正则表达式 对象模式 
   	  kw.replace(reg, this.q) // 替换方法 replace(替换的规则,需要替换的数据)
```



## `new set()` 数组去重方法

[MDN官网介绍](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/types/BrowserSetting/set)

* ES6 提供了新的数据结构 `new Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值
  * 设置该方法时候 需要在前面加 `new` 创建一个新对象
* 需要手动 设置新数组 并且添加进去
* `new set()`自带很多自己的方法

> `set()`方法去除数组重复 示例

```js
      // ~ 3. 进行搜索数据的去重 new Set() 方法去重后自动生成数组 把没有重复的数组覆盖到 原先数组中
      this.history = [...new Set(this.history)]
```

## `push()` 数组添加方法

* 把数据添加到数组末尾 对原数据不会有修改 不会覆盖 只是添加到末尾

> `push()` 方法 添加数据 示例

```js
    // 把服务器 获取的数据 储存到页面对象里 需要使用 push方法 因为分页是动态获取数据 需要用push添加 不覆盖之前数据
      this.list.push(...ret.data.results) // ... 是把所有数据储存起来
```

## `unshift()` 数组开头添方法

* 添加数据到数组开头 不会覆盖之前数据 只是添加到开头

>`unshift()` 方法 添加数据 示例 

```js
  // ~ 把输入的内容 保存到历史关键字对象里 unshift会把数据添加到第一项 push是默认添加到结尾
      this.history.unshift(this.q)
```

## `add()` 数组添加方法

* 把数据添加到数组内 会覆盖原先的数据

> `add()` 方法添加数据 示例

```js
  this.list.add(...ret.data.results) 
```

## `toString()` 对象转字符串方法

* 把对象转换为字符串格式
  * 通常解决 js获取过长id无法解读 用到` json-bigint`插件时候 把查分id的对象  转为字符串 

> 把对象转换为字符串 (Vue的key只是别字符串)

```js
:key="item.art_id.toString()
```

## `split(',')` 字符串分割成字符串数组

* `split()` 会创建一个新的字符串数组 但不会改变原始字符串
* `split()` 方法用于把一个字符串分割成字符串数组。
* 数组字符串通过是 , 隔开 
* 把字符串转成 字符串数组 可以方便循环遍历 在页面渲染出来

> 把符合条件的内容 从字符串分割成字符串数组

```js
            if (state.movie.tags) { // 满足条件 把字符串分割为 字符串数组
                state.movie.tags = state.movie.tags.split(',')
            }
```

## `includes()` 判断数组是否包含一个指定的值

* 返回的值是布尔值
  * 如果含有 返回true 
  * 如果不含 返回false
* 可以判断路径地址

> 设置路径白名单 判断是否在该路径下 

```js
// 创建一个路径白名单 里面填写的是路径 (允许用户游客模式访问一些内容 比如登录页 404 没必要验证)
const white = ['/login', '/404']

// 判断是否处于该路径地址
 if (white.includes(to.path)){
 
 }
```

##  `Object.keys()`把对象里面的属性名 储存为一个字符串数组

* 不会修改原对象内容 但是会返回一个字符串数组
* 可以把对象里面的 属性名提取出来 返回到一个字符串数组中
* 常用于 forEach 循环遍历替换 原属性名

> 使用例子

```js
// 需要提取的对象
	const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
// 开始提取
      const demo = Object.keys(headers)
      console.log(demo);
// ----------------------------------------- 提出的结果
 ["姓名", "手机号", "入职日期", "聘用形式", "转正日期", "工号", "部门"]
```



