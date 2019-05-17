---
layout: post
title:  "导出 ipa 时候 Bitcode 报错"
date:   2018-07-17
author: "袁凤鸣"
excerpt: 

categories: 
    - iOS
    - 报错调试
tags: 
    - Bitcode
mathjax: true

---
* content
{:toc}
---



报错如下：

    > Failed to verify bitcode in opus.framework/opus:
    > error: Bundle only contains bitcode-marker /var/folders/xl/0m5873ss5fv9t4phvwfn56z40000gn/T/IDEDistributionOptionThinning.lF0/Payload/Taidi.app/Frameworks/opus.framework/opus (armv7)


![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/XCSXwW.jpg)

分析报错描述：

`opus` 库不支持 `Bitcode` 。但是打包需要`Bitcode`支持。我项目开发过程中都是木有选定`Bitcode`的。试试了重新打开项目工程的`Bitcode`还是不行。后查了下。需要导出时候不需要勾选如下

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/iWR1EG.jpg)

在此留个记录备忘。


