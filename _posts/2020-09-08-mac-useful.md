---
layout: post
title:  "mac 使用技巧,持续更新ing"
date:   2020-09-08
author: "袁凤鸣"
excerpt: mac使用技巧

categories: 
    - mac
tags: 
    - mac
mathjax: true

---
* content
{:toc}
---



### mac 使用技巧

#### 0x1 数据线连接 mac 给 iPhone 充电不是上。电池图标一直断断续续闪烁。
解决 ：解决方法：打开终端Terminal，输入
- **sudo killall -STOP -c usbd** 命令回车，即可把进程关闭。插上`iPhone`，正常连接，问题解决。
