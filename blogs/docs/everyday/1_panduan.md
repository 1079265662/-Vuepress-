---
title: JS实用小技巧
date: 2021-08-21
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/wallhaven-o3lpzl.jpg
tags:
 - JavaScript
categories: JavaScript
---

::: tip 介绍
JS日常总结的使用小技巧 <br>
:::

<!-- more -->



## 通过二元判断对象中是否存在的数据

* 可以通过二元表达式 判断对象中是否存在该数据 进行一些特殊判断操作

> 假设如果 succ对象中 存在confirm数据 则进行一些操作

```js
    if(succ?.confirm){
	// 如果 succ对象中存在confirm数据 则进行一些操作
    }
```

## 结构赋值数组方式简单结构

* 如果需要结构的数据很少 可以通过数组方式结构

![image-20210819203952979](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210819203952979.png)

* 以上只有两组数据 就可以用数组方式 结构赋值
  * 按数组顺序 结构该两组数据 对应其索引值(下标)

```js
      // err 和 succ 对应两个返回的数据 对应其索引值(下标)
      const [err, succ] = await uni.requestPayment(payParams)
```

## 把后端返回的数据 转换成对象使用

* 通常我们获取到后端返回的数据类型是这样的

![image-20210822231515067](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210822231515067.png)

* 如果有特殊需求 需要把其转换成对象

![image-20210822231619762](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210822231619762.png)

> 转换方法

* 通过箭头函数把后端返回的数据转换成对象 箭头函数的参数就是转换成对象后的后端数据

```vue
       // goods是我们需要转换的数据
       <block v-for="(goods, i) in cart" :key="i">
       // 箭头函数里面的参数(goods) 就是转换成对象后的后端数据
         <view @click="()=> bindClick(goods)" ></view>
       </block>

```

* 我们可以用这种方法 使用一些字符串数组方法

```js
 goods.goods_id // 读取转换成对象的后端数据
```

## 倒计时样式设置

* 我们一般提交完毕数据 或者 登录成功后 会用倒计时方式通知用户即将跳转到某个页面 这个时候就需要`setInterval()` 定时器通知用户即将跳转

<img src="https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/image-20210917193701640.png" alt="image-20210917193700300" style="zoom: 33%;" />

* `setInterval()` 使用的时候会有一秒的延迟(异步方法) 所以我们需要在定时器开始前 进行一次提示
* 这里用`alert()`弹窗效果

```js
          // 设置定时器的秒数
          const TIME_COUNT = 3;
          // 提前显示弹窗 防止定时器延迟显示
          alert(`提交成功3秒进入积分榜`)
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 1 && this.count <= TIME_COUNT) {
                this.count--;
                alert(`提交成功${this.count}秒进入积分榜`)
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                // 这里是倒计时结束执行的事件 可以添加跳转到其他页面
                  // 这里可以写一些跳转逻辑
              }
            }, 1000);
          } 
```

