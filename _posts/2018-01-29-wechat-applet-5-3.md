---
layout: post
title:  "微信小程序入门与实战(5-3)"
date:   2018-01-29
author: "袁凤鸣"
categories: 微信小程序
tags: 微信小程序
excerpt: 5-3 template模板的使用
mathjax: true
---
* content
{:toc}


[微信小程序入门与实战 常用组件API开发技巧项目实战](https://coding.imooc.com/class/75.html)


## 5-3 template模板的使用

**说明：代码块中{\{XXX}} 识别不了,会将{\{XXX}}置为空白。故打成 {\\{XXX}}**


**模板只对`WXML`和`WXSS`文件有作用。对`JS`和`JSON`文件引用无效。**

**WXML文件实例：**


``` html
<template name="postItem">
    <view class='post-container'>
        <view class='post-author-date'>
            <image class='post-author' src='{\{headImgSrc}}'></image>
            <text class='post-date'>{\{date}}</text>
        </view>
        <text class='post-title'>{\{title}}</text>
        <image class='post-image' src='{{imgSrc}}'></image>
        <text class='post-content'>{\{content}}</text>
        <view post-like>
            <image class='post-like-image' src='../../images/icon/chat.png'></image>
            <text class='post-like-font'>{\{collection}}</text>
            <image class='post-like-image' src='../../images/icon/view.png'></image>
            <text class='post-like-font'>{\{reading}}</text>
        </view>
    </view>
 </template>
```




**WXSS文件实例：**



``` css
.post-container{
 display: flex;
 flex-direction: column;
 margin-top: 20rpx;
 margin-bottom: 40rpx;
 background-color: #fff;
 border-bottom: 1px solid #ededed;
 border-top: 1px solid #ededed;
 padding-bottom: 5px;
}
    
.post-author-date{
 margin: 10rpx 0 20rpx 10rpx;
    
}
    
.post-author{
 width: 60rpx;
 height: 60rpx;
 vertical-align: middle;
 border-radius: 30px;
}
    
.post-date{
 margin-left: 20rpx;
 vertical-align: middle;
 margin-bottom: 10px;
 font-size: 26rpx;
}
    
.post-title{
 font-size: 34rpx;
 font-weight: 600;
 color: #333;
 margin-bottom: 10px;
 margin-left: 10px;
}
     
.post-image{
  margin-left: 16px;
  width: 100%;
  height: 340rpx;
  margin: auto 0;
  margin-bottom: 15px;
}
    
.post-content{
  color: #666;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  letter-spacing: 2rpx;
  line-height: 40rpx;
}
    
.post-like{
  font-size: 13px;
  flex-direction: row;
  line-height: 16px;
  margin-left: 10px
}
    
.post-like-image{
  height: 16px;
  width: 16px;
  margin-right: 8px;
  margin-left: 10px;
  vertical-align: middle;
}
    
.post-like-font{
  vertical-align: middle;
  margin: 8px;
  font-size: 14px;
  color: burlywood;
}
```
     
     
**引入:**


``` html
<import src="post-item/post-item-template.wxml" />

<view wx:for="{{postList}}" wx:key="idx" >
   <view catchtap="onPostTap" >
       <template is="postItem" data="{{...item}}" />
   </view>
</view>
```


- 在主引用样式文件中引用`wxss`：

        @import "post-item/post-item-template.wxss";

 
**注意：**
 
 - 模板文件引用的结尾必须用 `/>`结尾
 - 当在某个`js`文件中`require`一个脚本文件时**必须使用相对路径**：
    
        var postsData = require('../../data/posts-data.js')

 

