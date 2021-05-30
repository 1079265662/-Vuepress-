---
title: axios配置接口
date: 2021-5-30
tags:
 - Vue
 - axios
categories: Vue
---

::: tip 介绍
Vue中axios配置接口<br>
:::

<!-- more -->

## axios全局配置

> 目标：全局配置axios `main.js`

```js
// 进行axios的全局挂载
import axios from 'axios'
// 设置全局的 axios 基础url地址
axios.defaults.baseURL = 'http://localhost:3000/'
// 将来通过vue的实例访问$http，其实就是axios。
Vue.prototype.$http = axios
```

> 全局文件使用

```js
  methods: {
    async getBook () {
      // this.$http 获取声明的axios实例化对象
      let getBook = await this.$http.get('books')
      this.list = getBook.data
    }
  }
```

> 总结：
>
> 1. 面向对象：实例对象可以访问构造函数原型上的属性和方法
> 2. axios可以统一配置基准路径
> 3. 所有的组件都是Vue构造函数的实例对象

## axios获取数据打印

* template的样式模板 `BookList.vue`设置
  * v-for方法打印获取到的数据 并且用:key 进行id绑定

```vue
<template>
  <div class="list-container">
    <!-- <a href="heroes-form.html" class="btn btn-primary">添加图书</a> -->
    <router-link to="/home/BookAdd" class="btn btn-primary">添加图书</router-link>
    <hr />
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>英雄名称</th>
          <th>英雄性别</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
          <!-- v-for方法打印获取到的数据 并且用:key 进行id绑定 -->
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.bname}}</td>
          <td>{{item.author}}</td>
          <td>{{item.ctime}}</td>
          <td>
            <button class="btn btn-success">编辑</button>&nbsp;
            <button class="btn btn-danger">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

* script 脚本内容
  * async方法获取服务器数据 
  * 设置list数组 储存获取的数据 
  * `created ()` 页面打开时候 调用获取数据的方法 让其打开就拥有数据 

```vue
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    async getBook () {
      // this.$http 获取声明的axios实例化对象
      let getBook = await this.$http.get('books')
      this.list = getBook.data
    }
  },
    // created () 页面打开时候 调用获取数据的方法 让其打开就拥有数据 
  created () {
    this.getBook()
  }
}
</script>

```

## axios添加数据

> template的样式模板 `BookAdd.vue`设置

* 添加数据是 二级路由 `children:[]`  路由模块设置 点击后跳转二级路由新页面

* `v-model` 双向绑定 获取用户输入的数据 用于服务器数据上传
* 按钮需要设置 button类型 阻止默认刷新 也可以用`@click.prevent` Vue方法阻止

---



> 一级路由 点击跳转到二级路由页面 `BookList.vue`设置

```vue
<router-link to="/home/BookAdd" class="btn btn-primary">添加图书</router-link>
```

> 二级路由页面设置

```vue
<template>
  <form>
    <legend>添加图书</legend>
    <div class="form-group">
      <label>图书名称</label>
      <input v-model='bname' type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>图书作者</label>
      <input v-model='author' type="text" class="form-control">
    </div>
    <!-- 需要把按钮设置为 button 否则会默认跳转 -->
    <button @click='bookAdd' type="button" class="btn btn-primary">提交</button>
  </form>
</template>
```

> 在路由模块设置 二级路由新页面  `index.js`设置

```diff
添加 添加数据的二级路由页面
import BookAdd from '@/views/BookAdd'
 { path: '/home', component: Home ,
  // 设置定向跳转 默认进入该页面
  redirect:'/home/BookList',
  // 设置二级路由
  children:[
        // 获取图书数据的二级组件
+    {path:'BookList',component:BookList},
      // 添加图书的二级路由
+    {path:'BookAdd',component:BookAdd},
  ]}
```

> 二级路由页面设置 `BookAdd.vue`设置

* 建议添加 data(){}储存用户获取的值 否则会警告
* 进行判断 如果添加成功 返回目录页面`this.$router.push()` 如果失败了 提示用户

```vue
<script>
export default {
    // 建议添加 否则vue会警告 
  data () {
    return {
      bname: '',
      author: '',
    }
  },
  methods: {
    async bookAdd () {
      let bookAdd = await this.$http.post('/books', { // 需要比对服务器数据 比对后进行上传
        bname: this.bname,
        author: this.author,
        ctime: new Date()
      })
      if (bookAdd.status == 201) {
        this.$router.push('/home/BookList')
      } else {
        alert('添加失败')
      }
    }
  },
}
</script>

```

## axios删除数据

> 在数据显示组件设置 `BookList.vue`

* 删除数据是 二级路由 `children:[]` 路由模块设置

* template 模板设置
  * 设置点击事件 点击获取其id值 在script里面进行比对

```diff
<template>
  <div class="list-container">
    <!-- <a href="heroes-form.html" class="btn btn-primary">添加图书</a> -->
    <router-link to="/home/BookAdd" class="btn btn-primary">添加图书</router-link>
    <hr />
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>英雄名称</th>
          <th>英雄性别</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.bname}}</td>
          <td>{{item.author}}</td>
          <td>{{item.ctime}}</td>
          <td>
            <button class="btn btn-success">编辑</button>&nbsp;
+            <!-- 删除按钮需要获取其id值 比对id删除相应数据 -->
+            <button @click="delBook(item.id)" class="btn btn-danger">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

* script 脚本内容 `methods:`
  * 声明`methods:`方法 比对获取点击的id值 比对成功进行删除

```js
    // 传入@click获取的 标签id 
    async delBook (id) {
      if (confirm('你确定要删除吗')) {
        // 删除相应的id数据 需要用到 地址拼接/ + id
        const delBook = await this.$http.delete('/books/' + id)
        if (delBook.status == 200) {
          // 删除成功 重新刷新页面 显示新数据
          this.getBook()
        }
      }
    }
```

## axios修改数据

* 修改数据是页面的二级路由`children:[]` 路由模块设置 点击后跳转到二级路由新页面

---

> 一级路由跳转设置

* 点击按钮 获取其数据的id

````vue
            <!-- 编辑按钮需要获取修改数据的id值 比对服务器的id值 进行修改 -->
            <button @click="useBook(item.id)" class="btn btn-success">编辑</button>&nbsp;
````

* 声明一个点击事件方法 携带数据id 进行二级路由新页面跳转 `methods:`方法设置

```js
 // 点击修改按钮 跳转到修改图书页面 
    // 设置形参接收点击传给修改图书的id 地址拼接修改图书的id(/修改地址/+id)
    useBook (id) {
      this.$router.push('/home/edit/' + id)
    }
  }
```

>路由模块设置 `index.js`设置

*  修改内容 需要用到动态路由 设置动态地址传参(多复用 不同数据 跳转相同页面进行数据修改)

+   :id可以匹配修改内容的id值`path:'edit/:id'` 
+   props:true设置动态路由 `props: true`

```diff
// 导入修改内容的组件
+ import BookEdit from '@/views/BookEdit'
// 配置路由映射
const routes = [
  // 进首页前 先跳转带登录页面
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // 设置首页的路由信息
  { path: '/home', component: Home ,
  // 设置定向跳转 默认进入该页面
  redirect:'/home/BookList',
  // 设置二级路由
  children:[
    {path:'BookList',component:BookList},
    {path:'PersonList',component:PersonList},
    {path:'FloorList',component:FloorList},
    {path:'BookAdd',component:BookAdd},
+  // 修改内容 需要用到动态路由 设置动态传参
+  // :id可以匹配修改内容的id值 props:true设置动态路由
+  {path:'edit/:id',component:BookEdit,props: true}
  ]}
]
```

> 二级路由修改数据新页面 `BookEdit.vue`设置

```vue
<template>
  <form>
    <legend>编辑图书</legend>
    <div class="form-group">
      <label>图书名称</label>
      <!-- 双向绑定 
      1. 可以获取数据 打印到页面上 
      2. 可以储存用户编辑的数据 储存在数组中 -->
      <input v-model='book.bname' type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>图书作者</label>
      <input v-model='book.author' type="text" class="form-control">
    </div>
    <button @click='handleSubmit' type="button" class="btn btn-primary">提交</button>
  </form>
</template>

<script>
export default {
  // 1. 接收动态路由传给的id值
  props: ['id'],
  // 2. 声明一个空数组 接收原数据 打印到页面上
  data () {
    return {
      book: {}
    }
  },
  methods: {
    // 3. 声明获取数据的方法 --------------------------
    async getUsebook () {
      // 4. /books/+this.id 可指定获取id图书的数据 id为路由组件传给的id值 props[''] 接收传入的id值
      let editBook = await this.$http.get('books/' + this.id)
      // 5. 把获取的数据 存储到空的数组中1
      this.book = editBook.data
    },
    // 6. 声明修改数据的方法 --------------------------- 
    async handleSubmit () {
      // 7. patch值修哪里改哪里(后端规定)
      // 7.1 this.book.id 根据数据里的图书id 来设置url基础地址 
      // 7.2 this.book 把data()数组里的内容全部上传到服务器上 实现修改内容
      let handleSubmit = await this.$http.patch('books/' + this.book.id, this.book)
      // 8.判断 如果修改成功 返回首页 不成功打印提示
      if (handleSubmit.status == 200) {
        this.$router.push('/home')
      } else {
        alert('修改失败')
      }
    }
  },
  // 9. created () 生命周期开始时候 执行此方法 获取服务器的数据 打印到页面上
  created () {
    this.getUsebook()
  }
}
</script>

<style>
</style>

```

