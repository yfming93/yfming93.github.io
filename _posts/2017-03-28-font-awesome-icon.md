---
layout:     	post
title:       "Font Awesome 开源图标库"
excerpt: 		Font Awesome 是一款开源的字体图标库，拥有大量简洁优雅的图标(Version 4.3.0已经拥有519个图标)，是一款强大、丰富、简单、好用的字体图标库。在项目中使用Font Awesome可以大大提高项目的进度。 
date:     	2017-03-28 
author:     	"袁凤鸣"
categories: 转载
tags: FontAwesome 开源图标
mathjax: true
---

* content
{:toc} 

## （一）：引言

<big>今天因为个人博客想加入网易云音乐的主页链接。于是对博客的JS文件粗略修改。在百度了一些资料后。还是有些许收获，根据这篇文章成功完成了需求。还加了知乎 和 网站主页的 图标链接 </big>

## （二）：什么是 Font Awesome？

[**Font Awesome**](http://fontawesome.io/icons/) 是一款开源的字体图标库，拥有大量简洁优雅的图标(Version 4.3.0已经拥有519个图标)，是一款强大、丰富、简单、好用的字体图标库。在项目中使用Font Awesome可以大大提高项目的进度。

网页小图标处处可见，如果网页没有了小图标的点缀，那么在用户体验上就可能失去了一种优雅。想想看，下面的小图标，我们做设计是不是会经常会注意到？(分别选自QQ空间，豆瓣，淘宝)






![](http://7xjt8m.com1.z0.glb.clouddn.com/img.jpg)

icon 作为提高用户体验的重要手段，在网页设计中早已被广泛使用。但是在CSS3之前，多使用传统的“*CSS + 图片*”的方式来制作这些icon，即每个网站制定一套icon，放到透明的PNG图像上，然后通过CSS进行定位显示icon。但大多数的网页都要用到各种透明小图标，且要兼容各个浏览器，也可能会有多个尺寸，这样我们就要将这些小图标分别输出多种尺寸、颜色和文件格式。这种方法效率低，可移植性差，也不利于设计流程的优化。
　　

还好，CSS3的出现为我们提供了解决的办法。CSS3的自定义字体(*@font-face*)已经被各大浏览器支持，那么对于网站中用到的icon，我们就可以使用`font-icon`来代替。`font-icon`(`fong-icon`这里先只简单的介绍下)通过字体编辑软件，将矢量的`icon`放到字体文件中，用`CSS3`的*@font-face*引入字体文件实现`icon`在网页上的展示。这种方法实现的icon缩放不会失真，更容易编辑和维护，尺寸、颜色也可以方便的用`CSS`来控制，这些都避免我们之前要对`icon`多次输出，有助于提高我们的设计效率。

`Font Awesome`就是这样的一款`font-icon`库，而且为我们提供了其它一些方便的特性，比如icon的一些简单动效、`icon`的叠加以生成新图标以及对`bootstrap`的支持等。
　　
## （三）：如何使用Font Awesome

使用Font Awesome非常简单，引入图标库后，在其网站上找到我们想要用的图标放入网页就可以了。

### **1. 引入**

你可以通过CDN引入:


	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">


也可以通过下载[Font Awesome][fontawesome]的源码，将源码放到自己的网页项目中引入:


	<link rel="stylesheet" href="path/to/css/font-awesome.min.css">
	

注意：Font Awesome的font文件夹要跟其存放.css文件的文件夹在同一个目录下。*

引入`Font Awesome`之后，我们就可以在`Font Awesome`的`icons`界面搜索我们想要的图标，找到我们想要的图标后，例如这个：
　　
![](http://7xjt8m.com1.z0.glb.clouddn.com/20150618230925.png)


通过在标签加上类名 **fa** 以及`fa-icon`名(这个例子中是`fa-bed`)，就可以将图标引入网页，如：`<i class="fa fa-bed"></>或<span class="fa fa-bed">`。(`Font Awesome`被设计成跟内联的标签一起使用。)

## **2. 控制icon**

通过类名fa和fa-icon名即可在页面中使用Font Awesome。而且Font Awesome的控制也很方便操作。下面是常见的一些操作。

- **尺寸:**

`fa-lg`, `fa-2x`, `fa-3x`, `fa-4x`, `fa-5x` 分别是将`icon`扩大到原来的133%, 2倍，3倍，4倍和5倍，如图：

![](http://7xjt8m.com1.z0.glb.clouddn.com/2015062705)

- **固定宽度：**

通过`fa-fw`给`icon`一个固定宽度。当要使不同宽度的`icon`对齐时很管用，特别是在设计导航组和列表组的时候，如图：
![](http://7xjt8m.com1.z0.glb.clouddn.com/2015062706)

- **用于列表的 icon：**

用`fa-ul`和`fa-li`可以方便的替换掉`ul`列表的默认样式，如图：

![](http://7xjt8m.com1.z0.glb.clouddn.com/2015062707)

- **边框和排版：**

用`fa-border`，`pull-right`, `pull-left` 方便的排列用于引用或文字开头的图标(首字下沉效果)，如图：

![](http://7xjt8m.com1.z0.glb.clouddn.com/2015062702)


- **动画：**

`fa-spin`和`fa-pulse`可以让图标旋转，两个有区别，第一个应该是不间断的旋转，第二个是以8步动画旋转的，可以自己实现看下，我这里可能描述的不准确。经常跟`fa fa-spinner`, `fa fa-refresh`, `fa fa-cog`一起使用。

- **旋转和翻转：**

`fa-rotate-90`, `fa-rotate-180`, `fa-rotate-270`分别让`icon`旋转 90°，180°， 270°；`fa-flip-horizontal`, `fa-flip-vertical`分别让`icon`水平翻转和垂直翻转，如图：
![](http://7xjt8m.com1.z0.glb.clouddn.com/2015062704)


- **组合：**

组合`icon`要在父级标签加上`fa-stack`类，正常大小的图标用`fa-stack-1x`, 2倍正常大小的用`fa-stack-2x`(即用来做背景`icon`), 可以用`fa-inverse`翻转`icon`颜色，叠加的顺序就是标签的顺序，在父级添加`fa-lg`这类控制`icon`大小的类可以控制整个组合图标的大小，如图:
![](http://7xjt8m.com1.z0.glb.clouddn.com/20150627)



- **配合Bootstrap使用：**

`Font Awesome`可以很好的跟`Bootstrap`一起工作，使用方法跟`Bootstrap`的`Glyphicons`也基本相同，但是可以控制的项更多了，下图是`Font Awesome`在`Bootstrap`组件中的效果：
![](http://7xjt8m.com1.z0.glb.clouddn.com/2015062701)


### 更详细的参考可以到官方网站: [Font Awesome](http://fontawesome.io/icons/) 查阅。

原文 [Font Awesome 学习笔记](http://www.jianshu.com/p/ba0e7ebd045c)

