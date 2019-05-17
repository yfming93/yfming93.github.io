---
layout: post
title:  "cocoapods errors about pod search"
date:   2017-11-06 
author: "袁凤鸣"
categories: 开发效率
tags: cocoapods
excerpt: pod search 出现  You need at least git version 1.8.5 to use CocoaPods
mathjax: true
---
* content
{:toc}

### pod search 出现  You need at least git version 1.8.5 to use CocoaPods

如下图：

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/ns6O9B.jpg)

我的cocoapods版本是 1.2.0； 
这个问题可能是由于没有链接到 xcode，或者链接到的xcode版本过低。 前几天刚安装了一个 xcode9-beta版本，我把新安装的xcode放到了Applications（应用程序）下，但是按原来的链接路径找不到xcode.app相应的目录； 


### 解决办法： 
    

修改链接Xcode.app 路径为 Xcode-beta.ap路径，命令是： 
    
    sudo xcode-select -switch /Applications/Xcode-beta.app/Contents/Developer 


（sudo xcode-select -switch /Xcode应用所在的文件路径/Contents/Developer）

目测以后升级正式版的Xcode后又要把路径改回来。

