---
layout:     	post
title:       "那些年，我发现的那些大厂 APP 的 Bug"
date:     	2017-09-06
author:     	"袁凤鸣"
categories:  报错调试
tags:   大厂Bug 
mathjax: true
---

* content
{:toc} 


## 一、前言

产品：“~哎哎哎。。你知道你的程序有bug吗?”
开发：“怎么可能？不要乱说。没有。”
产品：“真的有啊。我以前遇到了啊。。“
开发：“有个🐔吧，你现在复现给我看看。”
产品：”。。。。。。“
开发：“**Talk is cheap, show me the screenshot.**”

<br/>
“不要嚣张，劳资之前幸好截图了。虽然现在复现不出来。但是有截图为证。非要下次再出现了然后拍个视频证实下？”，产品心中两万个草泥马正在这样思索着。

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/GZflxS.jpg)






## 二、说明

诚然，没有永无`bug`的程序。只是`bug`有木有被你发现罢了。

发现了`bug`要摆正态度，及时定位`bug`的原因然后尽快修复。这才是有个有态度的程序员该做的事情。当然产品也请不要死抓一些东西死磕。阿里腾讯等大厂的`APP`有时候都会有`bug`。什么东西都有个度，自己好好把控就好。

## 三、Talk is cheap, show me the screenshot.

### 1. 首先来个`QQ`的几个`bug`吧。。


这是一起偶发性发现的`bug`。现在复现也确实不好复现了。好在当时发现的时候截图为证了哈
    <br/>
#### **bug01：**和别人详细聊天的时候导航栏不见了。不能返回了。双击home退出再次进去又好了。
<br/>
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/AVN8ug.jpg)
<br/>

此图是我司产品发现的。发现时我让他截图了，然后发我保存了。

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/XI4w6r.jpg)
<br/>
#### **bug02：**不知道怎么回事。如图页面下方出现了：`qq.android.qavgesture`

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/GVVgTa.jpg)
<br/>
【时间：2017-07-18】

当日下午。持续几个小时后有木有了。
【记得当时发现这个`bug`的操作过程是：点击兴趣部落，然后后来进入好友动态。然后又回来接着下面`tabbar`三个按钮点击切换的时候就出现了如图】
<br/>
#### **bug03：**侧滑返回过程中出现前后页面错位。

【时间：2017-08-14】
【以我iOS角度分析原因是：后面页面隐藏导航，当面页面需要导航。这期间的导航隐藏和不隐藏木有处理好导致前面页面有错落感。】

<br/>
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/YkfccV.jpg)

<br/>
当日下午发现的`bug`。但是也马上截图了。但是一般情况下也不好复现。

<br/>
### 2. 新浪微博的`Bug`。
#### **bug01：**我已经登录成功了。但是个人中心的信息木有显示完全。

个人资料里面的信息都有。但是头像，微博数量，关注数量，粉丝数量都变为0了。
【时间： 2017-08-28】
<br/>

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/InU5UP.jpg)


### 3.腾讯视频的`Bug`【20170917更新如下】

9月13苹果新品发布会。腾讯视频直播这次发布会的时候。我闲来无事想看看苹果的新品发布会了解下新品特性。（这也是作为一个iOSer需要去了解关注的资讯吧。）

如图实时评论都跑到页面底部了。整个页面乱成狗了哈。。、O(∩_∩)O~

（当时发现了就果断录了个gif存着）
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/iIchMJ.jpg)

### 4.微信的`bug`【20170922跟新如下】
#### **bug01：**隐私协议竟然弹出键盘
前几天我搞了一个移动的天悦卡，话说1元500M流量还是很给力的。。So,那我就有两个手机卡了。于是新卡准备注册个微信。可是当我输入完验证码去看看隐私协议时候。这个页面却出现了数字键盘。
这页面只是给人看的怎么会把上个页面的输入键盘带过来了。但是可以点击屏幕后收回键盘。

当时截屏如下：

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/DnSPe5.jpg)

## 四、后记

之前也发现过淘宝 和 饿了么的`bug`。但当时木有截图收集。后面的又发现了这几家大厂`APP`的`bug`。所以就无聊截图留个纪念吧。毕竟大厂`APP`的`bug`不是天天有的。这真的要靠机遇和运气才能发现哦。。。


So，后续发现其他知名`APP`的`bug`我会截图跟新此帖。

