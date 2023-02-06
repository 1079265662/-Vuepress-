---
title: TS中HTMLElement和Element
date: 2023-02-06
cover: https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302061911001.jpg
tags:
 - TypeScript
categories: TypeScript
---

::: tip 介绍
在TS类型中HTMLElement 和 Element的区别<br>
:::

<!-- more -->

## Element和HTMLElement

[getElementsByClassName](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByClassName) TS类型为`HTMLCollectionOf`

[getElementsByName](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByName)和[querySelectorAll](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll) 这两个属性为Dom集合类型[NodeList](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)

[getElementById](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById) 获取的Dom在TS类型为[HTMLElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)

[querySelector](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment/querySelector) 获取的Dom在TS类型为[Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

element是一个html元素，或者标签，每一个标签在dom中就是一个节点node，节点下面有element，document，characterData, attr.document代表一个html或xml文档，element类型代表该文档中的一个元素。HTMLElement和HTMLDocument只针对HTML文档和元素

![view](https://jinyanlong-1305883696.cos.ap-hongkong.myqcloud.com/202302061902483.png)

### **Element**

Element接口表示一个元素，该接口扩展自Node接口，自然继承了Node接口的属性和方法，也有一套针对元素的属性和方法。

**Element 是一个通用性非常强的基类，所有 Document 对象下的对象都继承自它**

Element接口常见的属性比较少，常用的就是一个只读的tagName属性，该属性返回元素名，数据类型是DOMString。

Element接口定义的方法也主要是针对属性操作，常见方法如下：

| 方法名                 | 数据类型  | 说明                               |
| ---------------------- | --------- | ---------------------------------- |
| getAttribute           | DOMString | 返回对应属性                       |
| getAttributeNode       | Attr      | 返回对应属性节点                   |
| getAttributeNodeNS     | Attr      | 返回属性命名空间                   |
| getAttributeNS         | DOMString | 返回对应属性节点                   |
| getElementsByTagName   | NodeList  | 节点名获取元素列表                 |
| getElementsByTagNameNS | NodeList  | 根据指定空间内的标签名搜索所有元素 |
| hasAttribute           | Boolean   | 判断属性是否存在                   |
| hasAttributeNS         | Boolean   | 判断属性是否存在                   |
| removeAttribute        | void      | 删除属性                           |
| removeAttributeNode    | Attr      | 删除属性                           |
| removeAttributeNS      | void      | 删除属性                           |
| setAttribute           | void      | 添加属性                           |
| setAttributeNode       | Attr      | 添加属性节点                       |
| setAttributeNodeNS     | Attr      | 添加属性节点                       |
| setAttributeNS         | void      | 添加属性                           |

###  **HTMLElement**

该接口继承自Element接口，同样用于表示一个HTML元素，拥有自定义的属性和方法。 

**HTMLElement 接口是所有 HTML 元素的基本接口**

1. 属性列表

| 属性名            | 数据类型            | 只读 | 说明                                    |
| ----------------- | ------------------- | ---- | --------------------------------------- |
| innerHTML         | DOMString           |      | 获取或设置HTML内容                      |
| outerHTML         | DOMString           |      | 设置或获取对象的纯文本形式              |
| id                | DOMString           |      | 对应元素的id属性                        |
| title             | DOMString           |      | 对应元素的title属性                     |
| lang              | DOMString           |      | 对应元素的lang属性                      |
| dir               | DOMString           |      | 对应元素的dir属性                       |
| className         | DOMString           |      | 对应元素的class属性                     |
| classList         | DOMTokeList         | Y    | 返回元素的class属性作为DOMTokenList对象 |
| dataset           | DOMStringMap        | Y    | 返回自定义的data-*属性集合              |
| hidden            | Boolean             |      | 对应元素的hidden属性                    |
| tabIndex          | long                |      | 对应元素的tabIndex属性                  |
| accessKey         | DOMString           |      | 对应元素的accessKey属性                 |
| accessKeyLabel    | DOMString           | Y    | 返回热键组合                            |
| draggable         | Boolean             |      | 对应元素的draggable属性                 |
| contentEditable   | DOMString           |      | 对应元素的contentEditable属性           |
| isContentEditable | Boolean             | Y    | 判断元素是否可用编辑                    |
| contextMenu       | HTMLMenuElement     |      | 对应元素的contextMenu属性               |
| spellcheck        | DOMString           |      | 对应元素的spellcheck属性                |
| commandType       | DOMString           | Y    | 对应元素的commandType属性               |
| label             | DOMString           | Y    | 对应元素的label属性                     |
| icon              | DOMString           | Y    | 对应元素的icon属性                      |
| disabled          | Boolean             | Y    | 对应元素的disabled属性                  |
| checked           | Boolean             | Y    | 对应元素的checked属性                   |
| style             | CSSStyleDeclaration | Y    | 对应元素的style属性                     |

2.  方法列表

| 方法名                 | 数据类型 | 说明                            |
| ---------------------- | -------- | ------------------------------- |
| getElementsByClassName | NodeList | 根据元素的class属性获取所有元素 |
| insertAdjacentHTML     | void     | 在指定位置插入HTML或XML         |
| click                  | void     | 单击元素，触发click事件         |
| scrollIntoView         | void     | 滚动元素内容到视点内            |
| focus                  | void     | 元素获取焦点                    |
| blur                   | void     | 元素失去焦点                    |
