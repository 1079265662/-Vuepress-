## 2021.8.4

- 更新了随机图片功能 采取的是数组方法 随机数组里的固定图片地址 实现随机图片功能

  - 修改文件 `Common.vue`

- 修复了随机图片会显示空白的问题

## 2022.01.13

- 优化了随机图片的效果

  - 修改文件 `Common.vue`


## 2022.01.17

* 添加了侧边栏菜单右侧阴影效果
  * 修改文件 `Sidebar.vue`
* 添加了滚动条
* 添加了鼠标样式
  * 修改文件 `theme.styl`
* 添加了菜单滚动条
  * 修改文件 `DropdownLink.vue`
* 修改了箭头样式
  * 修改文件 `HomeBlog.vue`

## 2022.1.18

* 添加了关于我的二级页
  * 修改文件`About.vue`

## 2022.2.22

* 真正意义上实现了图片随机效果 只需要在`Config`中的`covers`设置即可
  * 修改文件`Common.vue`

## 2022.5.20

* 原`jsdelivr`挂载的 代码css样式文件容易出现请求失败的问题 已把css文件挂载到个人oss中 [腾讯OSS地址](https://console.cloud.tencent.com/cos/bucket/setting?type=object&tab=objectDetail&bucket=jinyanlong-1305883696&path=%252Fcss%252Fprism-tomorrow.css&region=ap-hongkong)
  * 修改文件`-Vuepress-\.vuepress\theme\helpers\other.js`
