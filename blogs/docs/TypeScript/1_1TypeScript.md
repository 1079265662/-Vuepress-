---
title: TypeScript 学习记录
date: 2022-03-18
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-6og5gx.jpg
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

### **布尔型** `boolean`

* 关键 `boolean`

```typescript
let b: boolean = false
console.log(b)
b = true
console.log(b)

// false
// true
```

### **数字类型** `number`

* 关键字 `number`

```typescript
let num: number = 1
console.log(num)

// 1
```

### **字符串** `string`

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

### **数组** `Array`

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

* 数组中可能有多种类型，数量和类型都不确定，那就直接`any[]。`

```tsx
// 只可以赋值数组 不可以赋值其他类型
let value7: any[] = []
```

### **元组** `tuple`

* 没有关键字 只有定义方式 定义指定的数据类型 ` [number, string, boolean] `
* 指定几个 就只能输入几个 而且类型必须和规定的一致

```typescript
let tuple: [string, number, boolean] = ['a', 1, false]
console.log(tuple)

// ['a', 1, false]
```

### **枚举** `enum`

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

### **任意数据类型** `any`

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

* `any`也可以细分为  数组`any[]` 数组`any[]`只能赋值数组格式
  * 例如，一个数组中可能有多种类型，数量和类型都不确定，那就直接`any[]`。或者`Array<any>`

```tsx
// 只可以赋值数组 不可以赋值其他类型
let value7: any[] = []
// 定义接口数组any
interface domElement {
  children: Array<any>
}
```

### **空数据类型** `void` 

* 关键字`void` 
* 空数据类型通常用于 方法 有很多方法不需要`return`返回 这个时候方法就是空值

```typescript
function say(): void {
  console.log('我啥也不返回')
}
say()
```

### **空** `null & undefined`

* `string`默认值是 `undefined`

```typescript
// 默认值是 undefined
let str: string = null
console.log(str)
```

### **定义但未使用** `never` 

* 我们在开发中 会用到`eslint` 来规范我们的代码 这个时候 我们定义一个值 但未使用 那么`eslint`会进行报错 防止报错我们可以注释 也可以使用ts的`never` 告诉其数据未定义 防止报错
* `never`不代表任何数据类型 不可以直接使用 使用之前 需要替换成其他正常的数据类型

```typescript
let a: never = 1
console.log(a) // 这个时候会报错 我们需要把never改成我们已经定义值的数据类型
```

* 报错提示

![image-20220301142333999](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220301142333999.png)

### **对象** `Object`

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

### **方法 `function`**

* 规定一个方法类型

### **Web API 类型**

* 开发的时候 会遇到Web API自带的方法 这种类型也有相应的类型规定
  * `Document`类型 可以选择使用的Web API

![image-20220907151901311](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209071519372.png)

```tsx
interface domElement {
  appendChild: Document['appendChild'] // Document类型 使用的是appendChild api方法
}
```

## ts的接口 `interface`

* 关键字 `interface`
* 说到接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等！
* `interface` 不光可以声明 还可以继承`extends` 提升代码的延展性 
* `interface` 可以设置可选参数(可有可无) `?: 类型`
* `interface` 的值可以多次赋值声明符合条件的值 除非设置只读属性 `readonly`
* `interface` 接口偏向于约束 而非实践

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

### **接口的继承** `extends`

* `interface` 不光可以声明 还可以继承接口欧`extends` 提升代码的延展性 
  * `extends` 不光可以让接口继承 还可以让泛型`< >`函数进行继承


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

console.log(user) // { name: 'hanyun', age: 32, CET4: false }

// 泛型函数通过extends继承接口
function getScene<T extends IUser>(nameCanvas: T) { 
}
```

### **接口中的可选参数** `?: `

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

### **只读属性** `readonly`

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

### **接口描述函数方法类型**

![image-20220905103724382](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209051037429.png)

* `interface`接口 也可用来描述函数方法类型 

```ts
interface Iprint<T> {
    (arg: T): T
}

function print<T>(arg:T) {
    console.log(arg)
    return arg
}

const myPrint: Iprint<number> = print
```

* 也可以给泛型添加默认参数 不过需要在`interface`接口进行设置

```tsx
interface Iprint<T = number> {
    (arg: T): T
}

function print<T>(arg:T) {
    console.log(arg)
    return arg
}

const myPrint: Iprint = print
```

## ts的类 `class`

* 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法 
  * Class类可以 继承`extends` 继承其他的class类
  * Class类可以和接口`interface`一起使用 来定义Class类的内容 接口声明的变量 Class类也需要声明 否则会报错
  * Class类可以设置 抽象类`abstract` 抽象类就是可以声明方法 不单单是变量
  * Class类的修饰符 可以规定四种修饰符 来限制数据 如果你不写修饰符 默认是`public` 公开
    * `public` 公开 公开的值可以在本类、子类和实例(外部)中进行赋值修改
    * `protected` 受保护 受保护的值可以在本类进行修改和赋值 也可以在子类中赋值修改 但是实例(外部)不可以修改
    * `private` 私有 私有的值只能在类内部赋值修改 限制属性只能在本类中访问 子类和实例(外部)不能访问( 不能用 不能继承 )
    * `readonly` 只读 只读的值只能在本类赋值修改 也可以被子类继承 但不可以在子类和实例(外部)赋值修改

### **声明class**

* 关键字 class 声明

```typescript
class Child {

}
```

### **类的继承** `extends`

* 关键字 `extends` 继承其他的class类
* <font color =#ff3040>注意: 类继承只会继承其构造函数 不会继承声明的类型</font>

```typescript
// 类1
class Father {
  // 类型声明不会继承
  scene: string
    
  // 构造函数内容会被继承
  constructor(canvas: any) {
    this.scene = '123'   
  }
}

// 类2继承类1
class Child extends Father {

}
```

### **类与接口 **`interface`

* Class类可以和接口`interface`一起使用 来定义Class类的内容 接口声明的变量 Class类也需要声明 否则会报错
* 接口在定义的时候，不能初始化属性以及方法，属性不能进行初始化，方法不能实现方法体。 类实现接口之后，必须声明接口中定义的属性以及方法。
  * <font color =#ff3040>注意: 类继承接口定义后 需要再次声明接口中的定义</font>


```typescript
// 接口
interface IMan {
  name: string
}
// 类1使用接口的定义
class Father implements IMan {
  name: string
}

// 类2继承类1 其中就包含接口的定义 因为类1已经声明了
class Child extends Father {

}
```

* 如果你不按照接口`interface`的定义 会出现报错

![image-20220310175524018](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220310175524018.png)

### **抽象类**

* Class类可以设置 抽象类`abstract` 抽象类就是可以声明方法 不单单是变量

```typescript
// 类1定义抽象类
abstract class Man {
  say(): string {
    return '我是 abstract class'
  }
}
// 类2继承类1
class Child extends Man {
}
// 声明抽象类2
let child = new Child()
// 打印抽象类2
let str=child.say()
console.log(str)
// 我是 abstract class
```

### **类的修饰符**

Class类的修饰符 可以规定四种修饰符 来限制数据 如果你不写修饰符 默认是`public` 公开

* `public` 公开 公开的值可以在本类、子类和实例(外部)中进行赋值修改
* `protected` 受保护 受保护的值可以在本类进行修改和赋值 也可以在子类中赋值修改 但是实例(外部)不可以修改
* `private` 私有 私有的值只能在类内部赋值修改 限制属性只能在本类中访问 子类和实例(外部)不能访问( 不能用 不能继承 )
* `readonly` 只读 只读的值只能在本类赋值修改 也可以被子类继承 但不可以在子类和实例(外部)赋值修改

```typescript
class Man {
  // 受保护
  protected gender: string
}
class User extends Man {
  // 公开
  public name: string
  // 受保护
  setGender() {
    this.gender = 'man'
  }
  // 私有
  private DNA: string = 'aaaa'
  // 只读
  readonly age: number = 1
}
let user = new User()

// 这里是对的 公开的值允许赋值和修改
user.name = 'Tom'
// 这里是错误的 受保护的值在外面(实例)不可以赋值修改 但是在子类里面是可以修改赋值的
// user.gender = 'man'

// 这里是错误的 私有的值是不可以修改和继承的
// user.DNA = 'aaaaa'

// 这里是错误的 只读的值 不能修改 可以再本类中赋值修改
// user.age = 10

```

### **类的赋值断言** `!:`

* class和泛型一起使用的时候 往往没办法直接规定类型或者赋值 那么就会出现报错提醒 我们需要添加`!:`赋值断言 让其不报错 设置默认为空

```typescript
// 设置class类的泛型
class UserX<T>{
  info!: T; // class类设置泛型的时候 需要添加赋值断言 防止因为未赋值进行报错
}
// 
let myUser = new UserX<IInfo>()
console.log(myUser); // UserX{}
```

* 使用泛型未赋值类class的报错

![image-20220318145503126](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220318145503126.png)

### `!:`和`?:`的区别

* `!:` 和 `?:` 都可以实现在`class`类中 不设置默认值只设置类型

  * `!:`是断言 断言这个值现在不存在 但是在将来一旦程序运行 将会进行赋值 本质上是必填值

  ![image-20221025154104534](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210251541577.png)

  * `?:`是可选参数 表示这个值可以存在也可以不存在 他会自动赋值一个`undefined`的类型

  ![image-20221025154054528](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202210251540577.png)

```tsx
class SceneCreated {
  // 断言类型
  animationId!: number
  // 可选类型
  animation?: number
}

```

##  ts的函数 `function`

* ts的函数就是js中的方法 分为两种函数: 具名函数和命名函数

### **具名函数**

* `function` 带有名称的为具名函数

```typescript
// 具名函数
function say() {
  console.log('say')
}
// 调用具名函数
say() // say
```

### **命名函数**

* `function` 不带名名称的为命名函数 需要变量来声明 他也支持箭头函数的声明方式

```typescript
// 命名函数
// 箭头函数的命名函数
let speak = () => {
  console.log('speak')
}
// function的命名函数
let speak1 = function () {
  console.log('speak1')
}
// 调用命名函数
speak() // speak
speak1() // speak1
```

### **函数指定类型**

* ts中的函数的参数可以声明类型 规定传入指定参数类型 支持全部的ts基本数据类型

```typescript
function say23(str: string) {
  console.log(str)
}
say23('需要传入指定的ts基本数据类型') // 需要传入指定的ts基本数据类型
```

* 如果你声明了类型 不传值 就会报错

![image-20220315174246157](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220315174246157.png)

### **函数可选参数**

* ts中可以规定指定参数类型后 可以让其成为可选参数 这样就算不传参数 也不会报错

```typescript
function say33(str?: string) {
  if (str) {
    console.log(str)
  }
}
// 可以不传参参数
say33() // 不做处理为 undefined
// 可以传参 需要和指定类型一致
say33('需要传入指定的ts基本数据类型')
```

### **函数默认参数**

* ts中可以规定指定参数类型后 设置指定参数类型的默认值 传参后会替换默认值

```typescript
function say2(str: string = 'haha') { // 设置参数类型的默认值 需要和规定类型一致
  console.log(str)
}
// 不传参那就是默认值
say2()
// 传参那就会替换成参数
say2('我覆盖了默认参数')
```

* 默认值数据类型不正确的报错

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220315175332690.png" alt="image-20220315175332690" style="zoom:200%;" />

### **函数返回值类型**

* 函数方法中会进行`return`返回数据 可以给`return`的值规定指定数据类型 
* 如果不规定类型(不写) 默认都可以接收

```typescript
// 不设置返回值的数据类型  默认什么类型都可以返回
function say2(str44: string) {
  console.log(str44);
  // 返回数字类型
  return 123
}
// 接收返回值
let str44 = say2('不设置返回值类型')
console.log(str44)

// 设置返回值的数据类型 只能接收字符串
function say4(str33: string): string { // 规定字符串类型
  console.log(str33);
  // 返回指定字符串类型
  return '规定类型的返回'
}
let str33 = say4('设置返回值的类型')
// 接收返回值
console.log(str33)
```

## 泛型函数

* [单独记录](./1_2_generics.md)

## 断言`as`

* 类型断言用于手动指定一个值的类型。

```tsx
值 as 类型
```

### **断言在方法中**

* 在方法中设置返回值的类型 通过`as`断言其具备的类型 

```tsx
function hd(arg: boolean): string | number {
  // 设置返回值类型
  return arg ? "我就干" : "我不敢"
}

// 设置断言返回类型string 断定返回值就是string类型 需要注意的是断言只能是联合类型中的一种
let res = hd(true) as string
// 断言类型不对也可由 但是必须是方法联合类型中的一种
let ret = hd(true) as number

console.log(res)
```



### **宽泛数据类型转换为值类型**

* 值类型的简单声明 规定其值

```tsx
// 设置一个值类型
let res: '你好' = '你好'
// 值类型是不可以进行修改的
res = '不好' // 会报错
```

* 通过`as`断言 可以把宽泛数据类型转换为值类型

```tsx
// 通过断言的方式设置一个值类型
let res = '你好' as const
// 值类型是不可以进行修改的
res = '不好'
```

### **对象和数组中的断言**

* 数组中使用断言 会把数组转换成`只读`元祖 

![image-20220906154614896](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209061546157.png)

```tsx
const a = '你好'
const b = 'hello'
// 通过as断言
const arr = [a, b, 99, '我'] as const
// 通过泛型来写
const arr = <const>[a, b, 99, '我']
```

* 对象中使用断言 会把对象的内容转换成`只读`

![image-20220906162307777](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209061623824.png)

```tsx
const a = '你好'
const b = 'hello'
// 通过as断言
const obj = {
  a,
  b,
  c: 99,
} as const
// 通过泛型来写
const obj = <const>{
  a,
  b,
  c: 99,
}
// 解构对象
const { a: ax } = obj

console.log(ax) // 你好
```

### 通过断言 return方法中的数组

* 通过`as`把数组转换成元组 `return`数组中的方法

```tsx
function hd() {
  let a = 1
  let b = (x: number, y: number): number => x + y // 设置一个方法
  return [a, b] as const // as const 保证返回的是一个元组
}

const [n, m] = hd() // 解构赋值后 因为通过 as const 保证了返回的是一个元组 所以 n的类型是number m的类型是function

console.log(typeof m) // function

// 调用数组中的方法
m(1, 2) // 3

```

### 选择属性时断言

* 对一个没有声明类型的属性进行选择的时候 会出现以下报错 需要对`material`属性进断言设置 规定该属性的属性

![image-20221116193429070](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211161934126.png)

* 把属性`()`起来 通过`as`断言设置其属性 并且在最前面添加`;`分好 (书写规范不写也可以`prettier`会自动格式化添加`;`

![image-20221116193655953](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202211161936004.png)

```tsx
;(item.object as THREE.Mesh).material = this.redMaterial 
```

