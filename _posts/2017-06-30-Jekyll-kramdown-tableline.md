---
layout:     	post
title:       "Jekyll 的 kramdown 解释器对表格不友好"
excerpt: 		Jekyll 的 kramdown 解释器在解析表格语法时没有把表格线解析出来。此文针对这个问题的解答。而且介绍下表格设置列宽度的技巧。
date:     	2017-06-30
author:     	"袁凤鸣"
categories:  实用技术
tags:  
    - markdown 
    - jekyll
mathjax: true
---

* content
{:toc} 

## 一、问题：

有时候我们信心满满的写了一篇 `markdown` 文章。在本地端的`markdown`软件表现一切正常。然而当我们上传部署到博客后。

恶心的事情发生了。。

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/YhWUFe.jpg)

 <br>
 
## 二、什么鬼，表格线呢。没线叫鸡毛表格啊。


弄了好久解决不好。于是就去Jekyll官网看看。<br>
刚开始到jekyll官网去，看到了有个Table of Content Generator: 生成包含表格（ TOC ）的 HTML 代码的插件，结果安装步骤安装，还是老是解决不好。


最后转换思想，其实不用什么插件都可以解决这些问题。直接写个HTML代码放在头文件里，每片文章时自动引入。完全可以很好的兼容表格的问题。

##  三、解决：

直接在Jekyll博客根目录下，  有个_includes 文件夹。官方介绍如下。

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/HtwMcK.jpg)

<br>
**你可以加载这些包含部分到你的布局或者文章中以方便重用。然后再包含进来。** 


我们一般都会把每篇文章需要重复引用的文件放在这个`_includes`文件夹里面。
其中我建了一个 `head.html`文件进行全局JS函数库的引用。。我设想把解决`table`表格线的 `HTML` 代码放到这里来，以便每篇文章可以引用到这段代码。

	<style>
		  table{
		    border-left:1px solid #000000;border-top:1px solid #000000;
		    width: 100%;
		    word-wrap:break-word; word-break:break-all;
		  }
		  table th{
		  text-align:center;
		  }
		  table th,td{
		    border-right:1px solid #000000;border-bottom:1px solid #000000;
		  }
	</style>

<br>
### 就这样：
我的表格终于有线了。O(∩_∩)O哈哈~

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/AEC9V1.jpg)


# 四、one more thing
注意到了木有。。有线的表格第一列显示的宽度合理了很多。。回头看看之前第一张没有表格线的图，里面的第一列被挤的很窄很不好看。。

下面我就介绍下设置`table` 列宽度的技巧。<br>
只要在表格前面添加一行代码：<br>
	
	<style>table  th:nth-of-type(1) {    width: 100px;}</style>
	
**这样就可以调整每一列的宽度了**。<br>

- `width: 100px;`可以自行更改宽度数值哈。
- `th:nth-of-type(1)` 中括号里面的数字就第几列。

