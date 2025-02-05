---
layout: post
title:  "flutter dio response cut the data"
date:   2025-02-05
author: "袁凤鸣"
excerpt: 

categories: 
    - flutter
tags: 
    - dio 
mathjax: true

---
* content
{:toc}
---

## 0x001 现象
 某个接口报错，但是又有数据返回。报错如下：
 
    Connection closed while receiving data
 

认真排查后发现如下问题。虽然有数据返回，但是数据被截断了。
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202502051048077.png)


## 0x002 原因
 **flutter dio 返回超大文本数据时候被截断了，导致数据缺失。** 后台服务是PHP的，经过和后台开发沟通，说是 http 响应结果输出大小有限制太小了。

## 0x003 解决
 - 后续经过如下修改后台 Nginx配置实现正常。
 
 ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202502051053850.png)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202502051059248.png)