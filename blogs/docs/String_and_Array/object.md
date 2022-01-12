---
title: JS 常用对象方法
date: 2021-12-22
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-j3dg1m.jpg
tags:
 - 字符串方法
categories: JS 方法合集

---

::: tip 介绍 
JS 常用对象方法 <br>
:::

<!-- more -->

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

## `Object.keys()`清空对象所有数据(格式化)

* 常用于对象数据的清空 重置数据

> es6导出方法

```js
// 表单清空  obj表单的数据域
export default function resetForm (obj) {
  // 清空数据域
  Object.keys(obj).forEach(key => {
    obj[key] = ''
  })
}

```

> vue入口文件注册使用 `main.js`

```js
// 清空表单
import resetForm from '@/src/utils/resrtForm'
Vue.prototype.$resetForm = resetForm
```

> vue页面调用重置方法

```js
// this.addDeptModel为处理的对象  
this.$resetForm(this.addDeptModel)
```

## `Object.keys()`element ui 清空表单数据

* 原理和清空一样

* 常用于对象数据的清空 重置数据

> es6导出方法

```js
// 表单清空
// formName: 表单的ref属性  obj表单的数据域
export default function resetForm (formName, obj) {
  // 清空表单
  if (this.$refs[formName]) {
    this.$refs[formName].resetFields()
  }
  // 清空数据域
  Object.keys(obj).forEach(key => {
    obj[key] = ''
  })
}

```

> vue入口文件注册使用 `main.js`

```js
// 清空表单
import resetForm from '@/src/utils/resrtForm'
Vue.prototype.$resetForm = resetForm
```

> vue页面调用重置方法

```js
// this.addDeptModel为处理的对象 
 this.$resetForm('addDeptForm', this.addDeptModel)
```

## `Object.keys()` 快速复制 不存在的key不复制

* 适合拷贝对象 并且只拷贝你生成过的key 不生成的不拷贝

> 数据类型

```js
      // 要拷贝的对象
      addDeptModel: {
        editType: '',
        id: '',
        pid: '',
        parentName: '',
        manager: '',
      },
      // 拷贝到的对象
         DeptModel: {
        editType: '',
        id: '',
        pid: '',
      }, // 这个时候只拷贝存在的key 其他的key不拷贝
```

> es6导出方法

```js
// 对象的快速复制  不存在的key不复制
export default async function objCoppy (obj1, obj2) {
  Object.keys(obj2).forEach(key => {
    obj2[key] = obj1[key]
  })
}

```

> vue入口文件注册使用 `main.js`

```js
// 数据的快速复制
import objCoppy from '../src/utils/objCoppy'
Vue.prototype.$objCoppy = objCoppy
```

> vue页面调用拷贝方法

```js
 this.$resetForm(this.addDeptModel, this.DeptModel) // 旧的在前 新的在后
```



## `object.assign()`合并对象中的属性(浅拷贝)

* 适用于合并两个对象 并且指定保留那个对象(合并储存的对象)

* 不会修改合并储存对象里面的原数据 只是继续添加数据

* `object.assign()` 有n个参数 但是参数1是 指定储存合并的对象

  * 参数1是 指定储存合并的对象( 自己可以拥有原数据 并不会覆盖原数据 )
  * 参数2 需要合并的对象
  * 参数3 需要合并的对象

  .....

* 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

> 使用例子

```js
// 合并储存的对象
const target = { 
               		 a: 1
               };
// 需要合并的对象1
const source1 = { 
                	b: 2
               };
// 需要合并的对象2
const source2 = { 
					c: 3 
				};
// 进行对象合并
Object.assign(target, source1, source2);
//---------------------- 合并后的target值
target {
        a:1,
        b:2,
        c:3
	}
```

## 替换JSON对象的key

* 如果后端返回的数据 不是你需要的key 这个时候你就可以替换key 用你想用key

> 假设数据这个样子

![image-20211222194909818](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211222194909818.png)

* 这个时候 你想把`id`替换成value ` region_name`替换成text 需要用到`replace`这个方法 通过正则来替换key 替换成自己想要的

```js
  // 接收数据
const ret = res.data.data
  // 处理数据b
const changeObject = JSON.parse(JSON.stringify(ret).replace(/region_name/g, "text").replace(/id/g, "value"));
```

![image-20211222195215458](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211222195215458.png)

* 这样数据就处理好啦

## 从数组中的对象取出特定字段并生成新的数组

* 如果后端返回的数组对象中的数据你想单独拎出来放到一个数组中 就需要通过`map`来把该字段洗出来

![image-20211225211500239](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211225211500239.png)

```js
// 假设这个是你要处理的该数组对象
const ret = res.data.data
// 把数组对象用map洗出来
const rtx = ret.map(e => {
    return e.real_img_src
})
// 这里就是你想要的数组内容
console.log(rtx)
```

* 洗完后的数据

![image-20211225211916673](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20211225211916673.png)