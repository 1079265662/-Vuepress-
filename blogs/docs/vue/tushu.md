---
title: 图案书管理案例
date: 2021-5-20
tags:
 - Vue
 - 前端
categories: Vue小案例
---

::: tip 介绍
Vue 图书管理案例<br>
:::

<!-- more -->



> 需求   

1. 创建一个vue本地数据 循环遍历到页面上
2. 实现隔行变色
3. 把第二本数添加一个书名号 
4. 实现删除按钮

> 示例图 :

  

![Snipaste_2021-05-20_18-29-33.png](https://i.loli.net/2021/05/20/GjLyAB2sT4ChVxp.png)

## 第一部分 渲染数据 设置样式

1. 通过 `v-for in` 获取 vue声明的数据 循环遍历打出
2. 设置 `:key` 单独绑定每个 Vue渲染的内容 提高读取修改速度
3. 设置隔行变色 `:class`判断是否符合条件 符合条件啊 active样式加进去 实现隔行变色 添加粉色颜色
4. 给二号书添加双引号 `v-if v-else`

> vue代码部分 获取渲染app类名 创造一个数组对象

::: details 查看 Vue数据代码

```vue
 <script>
        new Vue({
            el: ('#app'),
            data: {

                book: [{
                    Bookname: '百万英镑',
                    Writers: '马克吐温',
                    Release: 'Tome',
                    time: new Date()
                }, {
                    Bookname: '警察与赞美诗',
                    Writers: '欧·亨利',
                    Release: 'Jurry',
                    time: new Date()
                }, {
                    Bookname: '羊脂球',
                    Writers: '莫泊桑',
                    Release: 'LKaiLi',
                    time: new Date()
                }
                ],
                add: '<警察与赞美诗>'
            }

        })
    </script>
```



:::

> css 样式设置 设置active样式 实现隔行变色

```css
#app table tbody tr.active td {
            /* 声明一个隔行样式 让其背景色变为粉色 */
            /* 拥有active类名的tr标签下面的td添加背景颜色 */
            background-color: pink;
        }
```

> html 标签样式数据渲染 

```html
<div v-cloak id="app">
        <table>
            <tr>
                <th>编号</th>
                <th>图书名称</th>
                <th>图书作者</th>
                <th>图书发布日期</th>
                <th>管理</th>
            </tr>
            <tbody>
                <!-- 1. v-for in 给表单渲染数据 -->
                <!-- 2. 设置 :key 单独绑定每个 Vue渲染的内容 提高读取修改速度 -->
                <!-- 3. 设置隔行变色 :class判断是否符合条件 符合条件啊 active样式加进去 实现隔行变色 添加粉色颜色 -->
                <tr :key='index' v-for='(item,index) in book' :class='{active : index % 2 === 0 ? true :false}'>
                    <td>{{index + 1}}</td> <!-- 可以设置index索引+1 按顺序排序书名编号 -->
              	<!-- 4. 给二号书添加双引号 v-if v-else  -->
                <!-- 判断 如果书名为 警察赞美诗 就打印书名号  v-if v-else  -->
                    <td v-if='item.Bookname === "警察与赞美诗"'>《{{item.Bookname}}》</td>
              	<!-- 不是赞美诗 就打印原本内容 -->
                    <td v-else>{{item.Bookname}}</td>
                    <td>{{item.Writers}}</td>
                    <td>{{item.Release}}</td>
	    		<!-- 5. 按钮删除功能 -->
                    <td>
                        <a href="">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
```

## 第二部分 按钮删除功能

![cheers.gif](https://i.loli.net/2021/05/20/j2zIdip1RmgPDth.gif)