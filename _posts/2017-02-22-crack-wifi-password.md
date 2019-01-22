---
layout:     	post
title:       "获取WiFi密码"
excerpt: 		安卓机未ROOT获取万能钥匙已经连接的WiFi密码 
date:     	2017-02-22 
author:     	"袁凤鸣"
categories:  实用技术
tags:
    - WiFi    
mathjax: true
---
 
* content
{:toc} 

### 最近刚刚搬家，还没有拉网。出于年轻人的本能，没网的日子实在不好受。在决定周六办网的这前几天。自己用华为的安卓手机下载了个WiFi万能钥匙连接蹭上了别人家的网勉强可用。可是晚上有时也要用电脑查查资料搞搞技术。因此想折腾下把WiFi万能钥匙连接好的WiFi密码提取出来。






#### 在网上搜索了下，有些文章介绍用华为的备份将WiFi信息备份成 db 数据文件。然后用 SQLite 等工具查看。。然而我弄完这些操作后没什么卵用。还有更直接的方法是手机 ROOT 后直接查看手机内部储存根目录下的相关文件。但是考虑到手机 ROOT 后不保修。不能 ATO 升级 。最后自己慢慢摸索后突然发现了一个很容易的方法。可以在WiFi万能钥匙连接好后，直接在手机通用 WiFi 列表点击已经连接的 WiFi 查看详情。。。就 **有了二维码**。。。然后就可以开始呵呵哒了。 O(∩_∩)O~

**附图如下：**


> ## **step 01 ：** 下载一个WiFi万能钥匙连接一个可用的WiFi。

![](http://wx4.sinaimg.cn/mw690/cb81ffe8gy1fczpx1esbcj20u01hcaek.jpg)



> ##  **step 02 ：** 去手机的通用WiFi列表。


![](http://wx4.sinaimg.cn/mw690/cb81ffe8gy1fczpx20d5rj20u01hcq5t.jpg)




> ##  **step 03 ：** 点击查看详情会发现有二维码，并截图保存下。

![](http://wx3.sinaimg.cn/mw690/cb81ffe8gy1fczpx31medj20u01hcgnv.jpg)


> ##  **step 04 ：** 用微信扫一扫刚才保存的图片就会出现密码。

![](http://wx2.sinaimg.cn/mw690/cb81ffe8gy1fczpx3jkkrj20u01hc75g.jpg)


 **其实这些步骤很简单，为毛网上说的天花乱坠还不管什么卵用。经过这几步直接可以把密码扫出来。。然后想给谁就给谁。在此做个备忘。**








