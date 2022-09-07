---
title: TS泛型学习
date: 2022-09-05
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209051045513.jpg
tags:
 - TypeScript
categories: TypeScript
---

::: tip 介绍
TS之泛型学习<br>
:::

<!-- more -->

## 泛型 `<T>`

* 泛型是指在预先定义函数`function`、接口`interface`或者类`class`的时候，不预先指定数据的类型，而是在使用的时候指定。
* 通俗的来讲 泛型就是声明的时候 不定义任何类型 我在外部使用的时候再规定 这可以让你的语法具备极强的可扩展性
* 泛型的语法是 `< >` 里写类型参数，一般可以用 `T` 来表示。
  * 泛型中的 T 就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型**像参数一样传入**，它可以**原封不动地输出**。
  * TS自身具备类型推导 所以只要泛型函数规定的泛型 不给其设置类型 也可以正常传参


### **函数参数使用泛型**

* 函数`function` 定义参数泛型  外部传参时候定义类型

```typescript
// 定义泛型函数
function say<T>(str: T) {
  console.log(str)
}
// 给泛型函数定义类型并传参
say<number>(1) // 规定number
say<boolean>(false) // 规定boolean
// TS具备类型推导 所以直接传参也可以
say(1) // 1
```

* 如果你规定了泛型 在外部使用的时候没有定义 就会有错误提示

![image-20220318133609950](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220318133609950.png)

### **函数参数和接口使用泛型**

* 函数`function` 定义参数泛型 配合接口`interface` 定义的类型使用

```typescript
// 定义函数参数泛型
function say<T>(str: T) {
  console.log(str)
}
// 定义接口并设置类型
interface IIUser {
  name: string
}
// 泛型函数使用接口约束的类型
say<IIUser>({ name: 'Tom' }) // { name: 'Tom' }
```

* 如果泛型函数 使用接口定义的类型不一致 就会有错误提示

![image-20220318141719795](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20220318141719795.png)

### **接口约束泛型传参**

* 使用泛型，也可以对 进行改造，让 `interface` 更灵活。
  * `interface`接口偏向于约束 而非实践


```typescript
// 定义接口并设置类型
interface IUser {
  name: string
}
// 定义函数 参数和返回值都是泛型
function say1<T>(str: T): T {
  return str
}
// 使用定义的接口 参数和返回值都为接口约束的类型
const strx = say1<IUser>({ name: 'Jack' })
console.log(strx) // { name: 'Jack' }
```

### **接口约束泛型方法中的属性**

* 假设现在有这么一个函数，打印传入参数的长度，我们这么写：

```tsx
function printLength<T>(arg: T): T {
    console.log(arg.length)
    return arg
}
```

* 因为不确定 T 是否有 length 属性，会报错：

![image-20220905102623221](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209051026262.png)

* 那么现在我想约束这个泛型，一定要有 length 属性，怎么办？
  * 可以和 `interface`接口，来约束其属性的类型。

```tsx
interface ILength {
    length: number
}

function printLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}
```

* 这其中的关键就是 `<T extends ILength>`，让这个泛型继承接口 `ILength`，这样就能约束泛型中的指定属性。
* 当然，我们定义一个不包含 length 属性的变量，比如数字，就会报错：

![image-20220905102821582](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209051028613.png)

### **接口描述泛型函数类型**

![image-20220905103724382](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209051037429.png)

* `interface`接口 也可用来描述泛型函数类型 

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

* 也可以给泛型添加默认参数 需要在`interface`接口进行设置

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

### **class类 使用泛型**

* 类`class` 设置泛型(注意赋值断言) 配合接口`interface` 定义的类型使用

```typescript
// 定义接口并设置类型
interface IInfo {
  name: string,
  age: number
}
// 设置class类的泛型
class UserX<T>{
  info!: T; // class类设置泛型的时候 需要添加赋值断言 防止因为未赋值进行报错
}
// 声明方法使用类
let myUser = new UserX<IInfo>()
// 依据接口约束给class类赋值
myUser.info = { name: '刘凯利', age: 22 }
console.log(myUser); // UserX { info: { name: '刘凯利', age: 22 } }
```

### **总结**

`泛型`（Generics），从字面上理解，泛型就是一般的，广泛的。

泛型是指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用的时候再指定类型。

泛型中的 `T` 就像一个占位符、或者说一个变量，在使用的时候可以把定义的类型**像参数一样传入**，它可以**原封不动地输出**。

泛型**在成员之间提供有意义的约束**，这些成员可以是：函数参数、函数返回值、类的实例成员、类的方法等。

用一张图来总结一下泛型的好处：



![image.png](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202209051021364.webp)







## 参考文献

[轻松拿下 TS 泛型](https://juejin.cn/post/7064351631072526350#heading-2)
