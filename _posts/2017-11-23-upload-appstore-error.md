---
layout: post
title:  " 上传App Store 发布审核时遇到一个错误提示页面上有一个或多个错误"
date:   2017-11-23
categories: iOS 报错调试
tags: iOS审核
excerpt: 昨天上传 App Store 发布审核时遇到一个错误记录下，提示页面上有一个或多个错误
mathjax: true
---
* content
{:toc}

# 上传 App Store 发布审核时遇到页面上有一个或多个错误

### 问题如图：

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/VdNszx.jpg)

### 解决方法：
**找到媒体管理，勾选右边的框子**

原因：是因为我只上传了一个5.5寸的APP预览图组。所以其他尺寸勾选也用这套。

以前发布审核木有这回事的，应该最近苹果政策变了要求要三个尺寸的APP预览图组了。
###### BTW: 同时在 xcode9 之后项目中APPicon 也要一个 1024px 的logo图了
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/GgFLg4.jpg)




