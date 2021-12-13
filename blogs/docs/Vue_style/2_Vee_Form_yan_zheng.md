---
title: Vue3 的表单验证功能(Vee V4版)
date: 2021-08-05
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-g792j3.jpg
tags:
 - Vue3
 - VeeValidate
categories: Vue3
---

::: tip 介绍
Vue3 的表单验证功能 通过插件VeeValidate实现<br>
:::

<!-- more -->

##  Vue3的表单验证功能(Vee V4版)

[VeeValidate 官网](https://vee-validate.logaretm.com/v4/) 

[使用表单验证的项目(QQ登录功能)](https://gitee.com/liu_kaili/Vue_little_rabbit_fresh)

<font color =#ff3040>Vue3 导入Vee表单验证 需要按需导入其 `Form`和`Field` 两个组件 并且通过`components`实例化</font>

> Vee版本号

```json
"vee-validate": "^4.0.3"
```

> Vee安装

```bash
npm i vee-validate@4.0.3
```

> Vue3按需导入Form和Field 两个组件

```js
import { Form, Field } from 'vee-validate'
// 实例化Vee的两个组件
components: { Form, Field },
```

> 效验思路

1. 设置验证规则 (单独js文件) -> 2. 导入局部验证规则 绑定到组件内使用 (局部验证) -> 3. 设置整体表单验证 通过了才能上传合格的数据 (所有表单的数据)

![image-20210804184720063](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210804184720063.png)

## Vee的使用方法

* Vee把原`div或form`和`input`标签分别替换为 `Form`和`Field` 两个Vee提供的组件 实现表单验证功能

  * 需要给`Form`(div) 绑定表单验证
  * 需要给`Field`(input) 绑定表单验证规则 和 内容
  * 需要设置 整体表单验证 通过了才能上传合格数据 (所有表单的数据)

* Vee的表单验证参数 (局部验证)

  * `Form`(div) 绑定表单验证的属性

    * `ref` 需要操作绑定其Dom节点 进行表单验证 (必填)
    * `v-slot='{ errors }'` 设置Vee具名插槽 通过验证规则返回的提示信息 页面上显示提示信息 (必填)

    ![image-20210804231015635](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210804231015635.png)

  * `Field`(input) 绑定表单验证规则 和 内容的属性

    * `v-model` 用来双向绑定输入框的数据 (必填)
    * `:rules` 用来绑定表单验证的正则效验规则 (必填)
    * `name` 绑定提示信息 需要和提示信息插槽值绑定一致(必填)

    ![image-20210804225601087](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210804225601087.png)	

* Vee的整体表单验证 (所有表单的数据)

  * 整体表单验证(提交数据)的按钮(a标签) 需要方法在`Form`里面  (提交数据)
  * 通过` target.value.validate()` 返回的`promise`对象 判断整体表单是否通过了验证
    * target是`Form`表单验证的Dom节点 (`ref`绑定)
    * 可以通过`async await `来获取其布尔类型数据(true/false)

```js
    // 整体表单验证(提交数据)
    const handleSubmit = async () => {
      // 手动进行整体表单验证(整体)
      const flag = await target.value.validate()
      // 整体表单验证通过时
      if (flag) {
      // 执行表单通过的内容
          console.log('整体表单验证通过')
      }
    }
```

## Vee表单验证的案例

* 通常我们会设置一个单独验证规则组件 单独设置验证规则 然后导入在Vue表单验证组件中(拆分验证规则)
* Vue3中使用Vee表单
* 表单验证需要两个Vee组件  `Form`和`Field` 分别替换原标签div 和 原input 
  * <font color =#ff3040>需要按需导入其 `Form`和`Field` 两个组件 并且通过`components`实例化</font>
* 除了两个表单验证组件 还需要单独设置一个div 通过`v-if`提示错误信息
* 设置整体表单验证 通过了才能上传合格的数据 (所有表单的数据)

> 表单验证实现流程(大致)

[使用表单验证的项目(QQ登录功能)](https://gitee.com/liu_kaili/Vue_little_rabbit_fresh)

1. 单独设置一个验证规则文件 (js文件)
   * 路径: `src/utils/vee-validate-schema.js`
   * 设置正则效验 验证是否输入符合要求
   * 判断是否验证成功 如果验证失败 返回内容 提示用户

```js
// 定义表单-用户名验证规则 
const checkAccount = (value) => {
  // value是将来使用该规则的表单元素的值(两个规则)
  // 1. 必填
  // 2. 6-20个字符，需要以字母开头
  // 如何反馈校验成功还是失败，返回true才是成功，其他情况失败，返回失败原因。
  //--------------------------- 返回失败信息
  // 判断如果没输入 没输入提示
  if (!value) return '请输入用户名' // 返回 空的的错误提示
  // 判断输入的内容 是否符合规则 不符合提示
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符' // 返回 格式错误提醒信息
  //--------------------------- 返回成功信息
  return true // 如果都符合 返回true 说明通过验证了
}
// 导出验证方法 提供给表单验证
export default {
    // 左侧导出名称 右侧导出的验证规则名称(其实可简写checkAccount)
  account: checkAccount
}
```

2. 在Vue组件中 设置表单验证
   * 路径: `src/views/login/components/callback-patch.vue`
   * 导入设置的表单验证规则 
   * Vee把原`div`和`input` 分别设置为 `Form`和`Field` 两个Vee提供的组件 实现表单验证功能
     * 需要给`Form`(div) 绑定表单验证
     * 需要给`Field`(input) 绑定表单验证规则 和 内容
     * 需要设置 整体表单验证 通过了才能上传合格数据 (所有表单的数据)
   * 除了两个表单验证组件 还需要单独设置一个div 通过`v-if`提示错误信息

```vue
<template>
  <!-- 设置 Form表单验证 绑定ref操作表单的Dom节点 设置具名插槽获取验证规则的返回提示 -->
  <Form ref='target' v-slot='{ errors }'>
    <!-- 设置Field表单验证的规则 -->
    <Field v-model="form.account" name='accountApi' :rules='schema.accountApi' class="input" type="text" placeholder="请输入用户名" />
    <!-- 判断是否存在返回的提示错误信息 如果存在 打印到页面上提示用户 -->
    <div v-if='errors.accountApi'>{{errors.accountApi}}</div>
    <!-- 整体表单验证按钮 -->
    <a href="javascript:;" class="submit" @click='handleSubmit'>进行整体验证!</a>
  </Form>
</template>

<script>
// 导入表单验证的组件
import { Form, Field } from 'vee-validate'
// 导入表单验证的规则
import schema from '@/utils/vee-validate-schema.js'
// 导入Vue3的方法
import { reactive, ref } from 'vue'
export default {
  name: 'CallbackPatch',
  // 实例化导入的表单验证的组件
  components: { Form, Field },
  setup (props) {
    // 设置ref绑定表单验证Dom节点
    const target = ref(null)
    // 设置 v-model双向绑定的输入数据 (默认为null)
    const form = reactive({
      account: null
    })

    // 整体表单验证(提交数据)
    const handleSubmit = async () => {
      // 手动进行整体表单验证(整体)
      const flag = await target.value.validate()
      // 整体表单验证通过时
      if (flag) {
        // 执行表单通过的内容
        console.log('整体表单验证通过')
      }
    }
    // 设置返回
    return { form, schema, target, handleSubmit }
  }
}
</script>

```

总结：

1. 安装依赖包
2. 导入Form和Field组件并使用
3. 在Field组件上通过rules属性绑定验证规则
4. 通过Form组件的作用域插槽可以获取错误提示 errors.name属性值