---
title: JS的二次解构赋值使用方法
date: 2022-07-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-dpkloo.jpg
tags:
 - JavaScript
categories: JavaScript
---

::: tip 介绍
JS的二次解构赋值使用方法 <br>
:::

<!-- more -->

## 解构赋值数组方式简单解构

* [**解构赋值** ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)语法是一种 Javascript 表达式。通过**解构赋值，**可以将属性/值从对象/数组中取出，赋值给其他变量。

  * 如果解构的值为`undefined` 那么他可以被进行赋值 
    * 只有原值为`undefined`才会进行赋值操作
    * `有值` 或 空值`''` 和 `null` 那么将并不会进行赋值操作 还是原值


  ```js
    const demo = {
      demoObj: undefined,
      demoNull: null,
      demoEmpty: '',
      demoYes: 88
    }
    // 进行赋值
    const number = 12
    // 解构数据
    onst { demoObj = number, demoNull = number, demoEmpty = number, demoYes = number } = demo // 进行解构赋值 只有原值为undefined才会进行赋值操作
    console.log(demoObj, demoNull, demoEmpty); // 12 null '' 88
  ```

* 如果是通过`const`常量解构的数据 那么解构出来后 不可以修改值 解构的数据为静态属性 修改会报错[TypeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)

* 以下只有三组数据 就可以用数组方式 解构赋值

  ![image-20220705174326907](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220705174326907.png)

  * 按数组顺序 解构该两组数据 对应其索引值(下标)
  * 使用`async` 和 `await` 进行解构处理

  ````js
        // err 和 succ 对应两个返回的数据 对应其索引值(下标)
        const [data, meg, statusCode] = await api.getUserInfo()
  ````

##  二次解构赋值方法使用案例 (方法1)

* 适合两层对象中 获取指定数据 (二次解构的本身 也可以再次解构)
* 利用二次解构指定对象 获取对象里面相应的对象的数据 (两层对象)

```js
  let demo = {二层对象: {获取二层对象指定的数据}} = 解构的一层对象
```

* 二次解构后的数据 可以再其他作用域直接调用 

```js
// 设置一个需要解构赋值的对象
    const ret  = 
    {
      result:{
      account: "admin1",
      avatar: "123333",
      id: "1422096022109622274",
      mobile: "13411111111",
      token: "34567",
      birthday: null,
      cityCode: null,
      gender: null,
      nickname: null,
      profession: null,
      provinceCode: null
      }
    }
    // 利用二次解构赋值 ret对象中result对象里面的不带null的值(两层)
   let demo = {result, result: {id, avatar, account, mobile, token}} = ret
   // 打印二次解构后的数据 可以再其他作用域直接调用
    console.log(id, avatar, account, mobile, token, result);
  // 打印解构后的所有数据
	console.log(demo)
```

## 二次解构赋值方法使用案例 (方法2)

* 也可以通过获取对象的方法 来实现二次解构赋值

```js
// 设置一个需要解构赋值的对象
    const ret  = 
    {
      result:{
      account: "admin1",
      avatar: "123333",
      id: "1422096022109622274",
      mobile: "13411111111",
      token: "34567",
      birthday: null,
      cityCode: null,
      gender: null,
      nickname: null,
      profession: null,
      provinceCode: null
      }
    }
    // 通过获取对象的方法 来实现二次解构赋值
   let demo = {{id, avatar, account, mobile, token}} = ret.result
   // 打印二次解构后的数据 可以再其他作用域直接调用
    console.log(id, avatar, account, mobile, token);
  // 打印解构后的所有数据
	console.log(demo)
```

## 普通解构赋值方法使用案例

* 只有一层对象 获取指定数据
* 直接解构指定对象 获取指定数据即可

```js
// 设置一个需要解构赋值的对象
    const ret  = {
      account: "admin1",
      avatar: "123333",
      id: "1422096022109622274",
      mobile: "13411111111",
      token: "34567",
      birthday: null,
      cityCode: null,
      gender: null,
      nickname: null,
      profession: null,
      provinceCode: null
    }
    // 普通解构赋值直接获取即可
   let demo = {id, avatar, account, mobile, token} = ret
   // 打印二次解构后的数据 可以再其他作用域直接调用
    console.log(id, avatar, account, mobile, token);
```

### **给解构的数据起名**

* 数据解构后 可以再次给解构的数据命名`:` 可以防止名称冲突

```js
    // 解构传来的参数id 给解构id改名叫ids
	getItem ({ id: ids }) {
       console.log(ids); // 值和解构id的值一样
    },
```

### **声明方法通过解构传值**

* 疑问: 有时候我们会封装一些通用方法 通用方法如果需要传参过多 会导致非常难管理 有些参数我不想传 想用默认值 我们可不可以指定传参呢 
* 解答: 我们可以给方法传入对象`Object` 然后再声明的方法中解构对象 这样就可以实现我们 按需传值 而非传统的无序排列传参

```js
// 声明一个通用方法
/**
 * @example this.$addNull(array,name,id)
 * @author 刘凯利
 * @function 添加空的可选值 id为0
 * @param {Object} obj 参数合集
 * @param {Array} obj.array 要添加的数组
 * @param {String} obj.id 渲染id
 * @param {String} obj.name 名称
 */
export default function addNull (obj) {
  // 解构传参的对象
  const { array, id, name  } = obj
  ... 方法干的事情
}

// 外部使用该方法
addNull({
    // 传递array 参数
    array: [2333,3333],
    // 不想传id 直接传name
    name: '不传id'
})
```

* 通过方法内 解构参数对象 实现按需传参的需求
