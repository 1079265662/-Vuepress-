---
title: JS 常用的数组方法
date: 2021-06-23
cover: https://cdn.jsdelivr.net/gh/Mu-Yan/Mu-Yan.github.io/blogsImg/16.jpg
tags:
 - 数组方法
categories: 数组方法
---

::: tip 介绍
JS 常用的数组方法合集<br>
:::

<!-- more -->

## `map()` 处理数组方法 需要return

> map后的数据类型: [{id:'',name:'',seq:''},{},{}.........]

* map() 方法返回一个`新数组`，数组中的元素为原始数组元素调用函数处理后的值
* map() 具有两个参数 一个是原数据(item) 一个是索引值(index)
* map可以作用于 对遍历的每一项数据 进行加工 让其变为新的数组。
* map() 方法会遍历出一个新的数组(无需存储) 拿来用即可
  * 用于数组中的每一项数据进行处理 最后返回一个新的数组
  * 可以用于 给数组添加新的属性名
* <big>注意</big>: 需要设置 `return` 返回数据

```js
  //! 对每一个现有频道进行排序（添加一个seq属性进行编号）和其他数据
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
  // 数据类型: [{id:'',name:'',seq:''},{},{}.........]
```

## `filter()` 筛选数组方法

>返回的数据类型是 布尔值 符合条件 true 不符合 false

* filter() 方法创建一个`新数组`，新数组中的元素是通过检查指定数组中符合条件的所有元素。
  * **注意**：filter() 不会对空数组进行检测。
  * **注意**： filter() 不会改变原始数组。

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



## `some()` 筛选数组方法

* `some()`不会创建一个新数组 `some()` 方法用于检测数组中的元素是否满足指定条件（函数提供）。

* 如果有一个元素满足条件，则表达式返回*true* , 剩余的元素不会再执行检测。

* 如果没有满足条件的元素，则返回false。

  * **注意：** some() 不会对空数组进行检测。
  * **注意：** some() 不会改变原始数组。

* 通常和 `filter`方法使用

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

```js
:key="item.art_id.toString()
```

