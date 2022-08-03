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

## 解构赋值的特性

* [**解构赋值** ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)语法是一种 Javascript 表达式。通过**解构赋值，**可以将属性/值从对象/数组中取出，赋值给其他变量。
* 数组和对象都可以使用解构

* 如果是通过[const ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)常量解构的数据 那么解构出来后 不可以修改值 解构的数据为静态属性 修改会报错[TypeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 可以使用变量[let ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)来接收
* 数组解构是根据索引下标进行解构 对象解构是根据指定的`key`进行解构

## 解构赋值数组

* 数组解构是根据索引下标进行解构 解构数组需要解构后包裹`[]`
* 解构数组 按数组顺序 解构该两组数据 对应其索引值(下标)

```js
  // 解构数据
  const ret = ['第一个', '第二个', '第三个', '第四个', '第五个']
  // es5时候按顺序获取
  console.log(ret[0], ret[1], ret[2])
  // es6使用解构进行排序获取
  const [first, second, third] = ret
  console.log(first, second, third) // 第一个 第二个 第三个
```

### **数组跳过解构**

* 按数组的顺序(索引) 解构的时候不声明变量 就可以跳过我们不需要的内容

```js
  // 解构数据
  const ret = ['第一个', '第二个', '第三个', '第四个', '第五个']
  // 解构不声明变量 就可以跳过
  const [, , second] = ret
  console.log(second) // 第三个
```

### **解构数组 通过对象的方式访问**

* 数组结构后 可以对象的方式储存 对象的`key`值 需要对应数组的指定索引

```js
  // 解构数据
  const ret = ['第一个', '第二个', '第三个', '第四个', '第五个']
  // 以对象的方式储存数组指定索引的内容
  const { 0: num1, 1: num2 } = ret
  console.log(num1, num2) // 第一个 第二个
```

### **循环数组 获取首字母**

* 可以通过循环 如`forEach`遍历整个数组 并获取每个遍历元素中的首字母 ([JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)数组对象不适用) 只需要在[参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#参数) 中添加`[]`即可

```js
  // 解构数据
  const ret = ['刘同学', '李同学', '王同学']
  // 在循环中进行解构赋值 这样我们可以直接使用值
  ret.forEach(([item]) => {
    console.log(item) // 获取数组中每个元素的首字母
  })
  // 刘
  // 李
  // 王
```

## 解构赋值对象

* 对象解构是根据指定的`key`进行解构 解构对象需要解构后包裹`{}`

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

## 解构赋值字符串

* 字符串解构 就是给其单个拆开来解构 按顺序来单个展示
* 解构字符串需要用`[]`进行包裹

```js
  const ret = '你好大家好'
  // 解构字符串的时候 需要加[]
  const [n0, n1, n2, n3] = ret
  console.log(n0, n1, n2, n3) // 你 好 大 家
```

## 解构设置默认值

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

## 解构的数据重命名

* 数据解构后 可以再次给解构的数据重命名 通过`:` 重命名防止名称冲突

```js
    // 解构传来的参数id 给解构id改名叫ids
	getItem ({ id: ids }) {
       console.log(ids); // 值和解构id的值一样
    },
```

## 配合`...`展开运算符

* 配合展开运算符 可以把其他没解构的内容塞进去
* 不可以把`...`展开运算符放置在前面 `...`展开运算符 无论如何都应该在最后添加

```js
  // 解构数据
  const ret = ['第一个', '第二个', '第三个', '第四个', '第五个']
  // 配合展开运算符 可以把其他没解构的内容塞进去
  const [first, second, ...other] = ret
  console.log(`我需要${first}和${second} 不需要${other}`) // 我需要第二个 不需要第三个,第四个,第五个
```

* 只使用展开运算符 可以进行浅拷贝操作

```js
  // 解构数据
  const ret = ['第一个', '第二个', '第三个', '第四个', '第五个']
  // 配合展开运算符进行浅拷贝
  const [...other] = ret
  console.log(other) // ['第一个', '第二个', '第三个', '第四个', '第五个']
```

* 如果我们只是用 展开运算符的内容 那么我们相当于删除的指定的值

```js
  // 解构数据
  const ret = {
    name: '小刘',
    id: 1,
    hobby: '打游戏'
  }
  // 可以通过解构 删除指定的内容
  const { hobby, ...delHobby } = ret
  console.log(delHobby) // {name: '小刘', id: 1}
```

## 在循环中使用解构

* 可以在循环比如`forEach`中使用解构 可以直接使用其值 无需引用

```js
  // 解构数据
  const ret = [
    {
      name: '小刘',
      hobby: '敲代码'
    },
    {
      name: '小王',
      hobby: '打电动'
    }, {
      name: '小黄',
      hobby: '打飞机'
    }
  ]
  // 在循环中进行解构赋值 这样我们可以直接使用值
  ret.forEach(({ name, hobby }) => {
    console.log(`姓名${name}`, `爱好${hobby}`)
  })
// 姓名小刘 爱好敲代码
// 姓名小王 爱好打电动
// 姓名小黄 爱好打飞机
```

## 在`Map`数据项的集合中使用解构

* [Map](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Map) 还在学习中

## 声明方法通过解构传值

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

## Vue中 通过解构进行快速赋值

* 解构可以方便我们在Vue中的赋值操作 通过解构实现快速赋值 适用于对`Object`对象类型的赋值

```vue
<script>
export default {
  data () {
    return {
      // 赋值的数据源
      tableDetils:{
         name: '名字'
         number: 18
         desc: '介绍' 
      },
      // 被赋值的对象
      formData: {},
     }
  },
  methods: {
      onOpen () {
        // 解构我们要赋值的内容 也可以重命名适配被赋值的对象
        const { desc, name, number: numberOther } = this.tableDetils
        // 进行对象的赋值
        this.formData = {
          // 如果绑定的字段和解构的值一样 就可以用这种方式进行赋值 如果不适配 还可以通过解构重命名再赋值
          desc, name, numberOther
        }
        console.log(this.formData)
    },
  }
}
</script>
```

* 打印的结果成功进行了赋值操作

![image-20220803145633085](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202208031456157.png)



## 通过解构修改对象的值

* 不建议通过解构赋值修改原值 你还是引用修改把 只推荐修改解构后的值这种做法

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

