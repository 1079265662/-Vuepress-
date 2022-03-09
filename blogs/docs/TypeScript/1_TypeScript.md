---
title: TypeScript 学习记录
date: 2022-03-01
cover: 
tags:
 - TypeScript
categories: TypeScript
---

::: tip 介绍
TypeScript学习记录<br>
:::

<!-- more -->

## ts的作用是什么

* ts可以帮助我们进行一个强类型检测 让js变成了一个十分严格的强类型语言
* 我们开发可以通过`eslint`来规范我们的书写方式 配合 `ts`来规范我们的类型 让你的`Vue`或者其他的语言更具备工程化
* 当你设置ts后 就会内置类型检查 如果类型不一致 将会报错

> 举个例子

* 我们知道`number`类型和`string`类型 在js中可以用 `+=` 但是他不是相加 是拼接 js并不知道他俩类型是否不一样 可能就会造成错误

```js
let ret = 100 // 我们声明一个number类型的值
ret += '100' // 让其增加100 但是我们100如果是字符串类型 那么会被拼接而非相加
console.log(ret) // 100100
```

* 通过以上的例子我们就知道bug怎么诞生了吧 那么如果这个值是后端返回的 你更无法操控得知 就会造成数据的bug

> ts的类型检测

* 如果你规定了ts类型(`any`除外) 当你输入不符合的类型时候 会进行报错

![image-20220301142532649](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220301142532649.png)

## 安装ts

我们想直接用ts 而非框架中 就需要单独安装运行环境 `ts-node`

* 下载ts 并全局安装

```bash
npm install -g typescript
```

* 下载ts封装的运行环境 并全局安装 让我们用`ts-node`命令 就能启动ts

```bash
npm install -g ts-node
```

* 在文件下创建ts配置文件 没有特殊需求 不用管 使用默认配置即可

```bash
tsc --init
```

* 运行我们的ts 文件

```bash
ts-node demo.ts
```

## ts的基本数据类型

* 基本数据类型大家都懂奥 就是什么布尔啊数字什么的 
* 命名的方式: `let 变量名: 类型 = 类型规范的值`

### **布尔型 `boolean`**

* 关键 `boolean`

```typescript
let b: boolean = false
console.log(b)
b = true
console.log(b)

// false
// true
```

### **数字类型 `number`**

* 关键字 `number`

```typescript
let num: number = 1
console.log(num)

// 1
```

### **字符串 `string`**

* 关键字 `string`
*  `string`如果你不定义 默认值是`undefined`

```typescript
let str: string = 'str'
console.log(str)
let str1: string = "str1"
console.log(str1)

// str
// str1
```

### **数组 `Array`**

* 关键字 `Array<数据类型> 数据类型[]`

* 指定类型的数组 `变量名: number/string[]` 
  *  `number`类型的数组 还是`string`类型的数组
* 泛型表示的数组 `变量名: Array<number/string>`

```typescript
// 指定类型表示的数组
let arr1: number[] = [1, 2, 3]
let arrStr: string[] = ['a', 'b']

// 泛型表示的数组
let arr2: Array<string> = ['a', 'b']
let arr3: Array<string> = [1, 2]
console.log(arr1, arrStr, arr2, arr3)

// [ 1, 2, 3 ] [ 'a', 'b' ] [ 'a', 'b' ] [ 1 , 2 ]
```

### **元组 `tuple`**

* 没有关键字 只有定义方式 定义指定的数据类型 ` [number, string, boolean] `
* 指定几个 就只能输入几个 而且类型必须和规定的一致

```typescript
let tuple: [string, number, boolean] = ['a', 1, false]
console.log(tuple)

// ['a', 1, false]
```

### **枚举 `enum`**

* 关键字 `enum`
* 枚举可以分为:
  * 数字枚举 数字形枚举是递增的枚举 从上到下的递增 你也可以给其赋值 不赋值的话就是递增 默认从`0` 开始
  * 字符串枚举 字符串不支持递增 也就是声明了一个字符串的内容 你枚举里面的所有内容 都需要设置内容
  * 混合枚举(异构枚举) 字符串和数字声明后都可以塞入枚举 但是不推荐
  * const枚举

> 数字枚举

* 如果不设置值 默认是从0开始 设置值 就会从值开始递增

```typescript
enum Play {
  UP, // 0
  DOWN, // 1
  LEFT = 3, // 3
  RIGHT // 4
}
```

> 字符串枚举

* 字符串枚举 字符串不支持递增 也就是声明了一个字符串的内容 你枚举里面的所有内容 都需要设置内容

```typescript
enum Play {
  UP = '你好', // 你好
  DOWN = '我好', // 我好
  ...
}
```

> 混合枚举(异构枚举) 

* TypeScript 支持 Enum 的枚举成员既可以是 number 也可以是 string ，但是并不建议这样做。

```typescript
enum Check {
    No = 0, // 0
    Yes = 'YES' // YES
}
```

> const 枚举

* 在大多数情况下，枚举是一个完全有效的解决方案。 然而，有时要求更严格。 为了避免在访问枚举值时支付额外生成的代码和额外的间接费用，可以使用 const 枚举。 const枚举是在我们的枚举上使用 const 修饰符定义的：
* const 枚举允许内部进行计算 其他的枚举 并不支持计算

```
const enum Enum {
  A = 1, // 1
  B = A * 3 // 3
}
```

* const 枚举还支持外部调用

```typescript
// 声明一个const 枚举
const enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, //3
}

// 在外部调用cosnt 枚举
let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
console.log(directions) // [ 0, 1, 2, 3 ]
```

> 枚举的同数据源比较

* 枚举的作用可以用来比较相同的源头数据 也就是想全等`===`就必须是同数据源 不同数据源就算数据一样 也不会为`true`
* 枚举的判断是逻辑性判断 而非值的判断

```typescript
enum Play {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
console.log(Play.UP, Play.DOWN)

enum Play1 {
  UP,
  DOWN,
  LEFT,
  RIGHT
}
console.log(Play1.UP, Play1.DOWN)


console.log(Play1.UP === 0)

// 可以比较的 同源 true
console.log(Play1.UP === Play1.UP)

// 不可比较的 非同源 fasle
console.log(Play1.UP === Play.UP)

```

* 非同源报错

![image-20220301142432107](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220301142432107.png)

### **任意数据类型 `any`**

* 关键字 `any`
* <font color =#ff3040>注意: 任意数据类型不会进行类型检测 相当于使用了原js声明</font>

```typescript
let a: any = 1
console.log(a)
a = 'a'
console.log(a)

// 1
// a
```

### **空数据类型 `void`** 

* 关键字`void` 
* 空数据类型通常用于 方法 有很多方法不需要`return`返回 这个时候方法就是空值

```typescript
function say(): void {
  console.log('我啥也不返回')
}
say()
```

### **空 `null & undefined`**

* `string`默认值是 `undefined`

```typescript
// 默认值是 undefined
let str: string = null
console.log(str)
```

### **定义但未使用 `never` **

* 我们在开发中 会用到`eslint` 来规范我们的代码 这个时候 我们定义一个值 但未使用 那么`eslint`会进行报错 防止报错我们可以注释 也可以使用ts的`never` 告诉其数据未定义 防止报错
* `never`不代表任何数据类型 不可以直接使用 使用之前 需要替换成其他正常的数据类型

```typescript
let a: never = 1
console.log(a) // 这个时候会报错 我们需要把never改成我们已经定义值的数据类型
```

* 报错提示

![image-20220301142333999](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220301142333999.png)

### **对象 `Object`**

* 万物皆对象 什么都可以塞进对象中

```typescript
let abc: Object = {
  a: 1,
  b: 2,
  c: '你好',
  d: null,
  f: undefined
}
console.log(abbc) // { a: 1, b: 2, c: '你好', d: null, f: undefined }
```

## ts的接口 `interface`

* 关键字 `interface`
* 说到接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等！
* `interface` 不光可以声明 还可以继承`extends` 提升代码的延展性 
* `interface` 可以设置可选参数(可有可无) `?: 类型`
* `interface` 的值可以多次赋值声明符合条件的值 除非设置只读属性 `readonly`

### **一般声明的接口**

```typescript
interface IUser {
  name: string
  age: number
}
// 通过接口 声明数据
let user: IUser = { name: 'hanyun', age: 32 }

console.log(user)
// { name: 'hanyun', age: 32 }
```

### **接口的继承 `extends`**

* `interface` 不光可以声明 还可以继承接口欧`extends` 提升代码的延展性 

```typescript
// 接口A
interface IUser {
  name: string
  age: number
}
// 继承接口A的接口B
interface IStudent extends IUser {
  CET4: boolean
}
// 通过接口 声明接口B的数据
let user: IStudent = { name: 'hanyun', age: 32, CET4: false }

console.log(user) 
// { name: 'hanyun', age: 32, CET4: false }
```

### **接口中的可选参数 `?: `**

* `interface` 可以设置可选参数(可有可无) `?: 类型`

```typescript
// 接口A
interface IUser {
  name: string
  age: number
}
// 继承接口A的接口B
interface IStudent extends IUser {
  CET4: boolean
   // 设置可选参数
  CET6?: boolean
}
// 通过接口 声明数据
let student1: IStudent = { name: 'hanyun', age: 32, CET4: true }
let student2: IStudent = { name: 'hanyun', age: 32, CET4: true, CET6: true }

console.log(student1, student2)
// { name: 'hanyun', age: 32 }
// { name: 'hanyun', age: 32, CET4: true } { name: 'hanyun', age: 32, CET4: true, CET6: true }

```

### **只读属性 `readonly`**

* `interface` 的值可以多次赋值声明符合条件的值 可以设置只读属性 `readonly` 防止数据二次修改

```typescript
// 接口A
interface IUser {
  name: string
  age: number
}
// 继承接口A的接口B
interface IStudent extends IUser {
  // 设置一个只读的属性
  readonly DNA: string
  CET4: boolean
  // 设置一个可选参数
  CET6?: boolean
}
// 通过接口 声明数据
let student1: IStudent = { name: 'hanyun', DNA: 'aaaaa', age: 32, CET4: true }
let student2: IStudent = { name: 'hanyun', DNA: 'assasaaaaa', age: 32, CET4: true, CET6: true }

// 修改的非只读数据
student1.CET6 = true
console.log(student1, student2)

// 不可以修改只读数据 会报错
student1.DNA = "mdakldmak"
// 接口A
interface IUser {
  name: string
  age: number
}
// 继承接口A的接口B
interface IStudent extends IUser {
  // 设置一个只读的属性
  readonly DNA: string
  CET4: boolean
  // 设置一个可选参数
  CET6?: boolean
}
// 通过接口 声明数据
let student1: IStudent = { name: 'hanyun', DNA: 'aaaaa', age: 32, CET4: true }
let student2: IStudent = { name: 'hanyun', DNA: 'assasaaaaa', age: 32, CET4: true, CET6: true }

// 修改的非只读数据
student1.CET6 = true

// 不可以修改只读数据 会报错
student1.DNA = "mdakldmak"
```

* 报错提示

![image-20220301094210191](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220301094210191.png)



# 未完待续...
