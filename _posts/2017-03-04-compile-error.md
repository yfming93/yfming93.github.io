---
layout:     	post
title:       "Apple Mach-O Linker Error Group & Lipo Error Group   错误 "
excerpt: 		同时报  Apple Mach-O Linker Error Group 和 Lipo Error Group 错误时处理方法 
date:     	2017-03-04 
author:     	"袁凤鸣"
categories:  报错调试
tags:
    - error
    
mathjax: true
---

* content
{:toc} 
 
#### 今天项目中遇到一个奇葩的编译错误。终端用cocoapods 导入第三方一切正常，但是编译的时候偶尔同时报  `Apple Mach-O Linker Error Group` 和 `Lipo Error Group` 错误 。我 Google 了好久才找到相应解决办法。。

网传如下方法好像有时候不管用。

### 方法1
退出Xcode，然后从 `finder` 里面进入
`~/Library/Developer/Xcode/DerivedData` 删掉里面所有的内容，然后重启 `Xcode` 。
上面的操作也可以直接在 `Xcode` 的 `organizer` 中完成，在 `organizer` 里面切换到 `projects`，然后 delete 掉 `derived data`
在 `target` 设置中删掉 `Prefix Header` 的值，重启 Xcode 试试看
最后恢复 `Prefix Header` 的设置

### 方法2

 在 `Xcode` 里面 `build phases`，
然后从 `copy bundle resources`里面删掉红色的错误资源文件

### 同时报  `Apple Mach-O Linker Error Group` 和 `Lipo Error Group` 时，

### 后来摸索到终极解大法






## 使用之前请检查是不是因为 **.a** 的静态库文件没有被SVN上传上来。所以你更新拉下来就会报这个错误。

### 上面一步检查没问题了。不是因为.a的原因就请看下面:

将 `Build Active Architecture Only` 的 `Debug` 换成 Yes 。
- 为 `Yes` 是为了 `debug` 的时候编译速度更快，它只编译当前的 `architecture` 版本。
- 避免其他版本其他特殊因素导致错误。
 + 但 **`release` 版必须为 NO** 全部编译适应所有版本。
 
 （ *NO Pictures Say G8* ，O(∩_∩)O~）
 
 ![](http://wx3.sinaimg.cn/large/cb81ffe8gy1fda7ck05u9j21040n9ts9.jpg)







