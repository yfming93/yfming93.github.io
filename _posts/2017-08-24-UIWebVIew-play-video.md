---
layout:     	post
title:       "UIWebView 不自动全屏播放视频 "
date:     	2017-08-24
author:     	"袁凤鸣"
categories:  iOS
tags:  UIWebView
mathjax: true
---

* content
{:toc} 

# UIWebView 不自动全屏播放视频

## 一、介绍：
#### 让 H5 里面的视频播放变得更加优雅！

原文在我博客： [https://www.yfmingo.cn/2017/08/24/UIWebVIew-play-video/](https://www.yfmingo.cn/2017/08/24/UIWebVIew-play-video/)
<br>
`iOS` 客户端`APP`里面的的`H5`页面如果含有视频，当我们点击播放时就会调用`iOS`原生自带的播放器进行播放。最可恶的是还自动自己全屏播放了。

效果图：<br>

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/mzD93k.jpg)

<br>

这样的用户体验总会感觉到无比的尴尬。公司产品往往幻想的效果是这样：

不要自动全屏播放。要内嵌在网页里面播放。视频框可以跟随网页内容上下滚动。

**理想效果图：**<br>
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/lJh1aD.jpg)





## 二、 实现代码：
#### （1）、H5 端要实现的代码如下：

    <video id="video" width="100%" autobuffer="true" x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline webkit-playsinline controls='controls' poster="http://img.nntv.cn/images/2017-6-25/5OdZ806_1498400363126_G8a72i9_1.jpg" src="http://mvod.nntv.cn/vod/local/2017/06/25/5OdZ806_1498400363126_G8a72i9_2812.mp4"
                       onclick="playVideo('http://mvod.nntv.cn/vod/local/2017/06/25/5OdZ806_1498400363126_G8a72i9_2812.mp4');">
                    不支持视频播放
                </video>
                
重点代码如下：

`x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline webkit-playsinline`

 **说明：**
 
 -  `iOS10`以上`H5`视频不自动全屏播放识别 `playsinline`这个属性
 - `iOS10`以下`H5`视频不自动全屏播放识别 `webkit-playsinline`这个属性

 
#### （2）、iOS端要实现的代码如下：
    _webView.allowsInlineMediaPlayback = YES;
    
 设置`UIWebView` 的`allowsInlineMediaPlayback`属性为`YES`即可。
 
 
## 三、其他问题：
这样设置了以后，你的 `UIWebView` 里面的视频就已经实现点击播放不会自动全屏了。

但是当你仔细测试后发现。当这个页面消失后`H5`里面的视频仍然在继续播放。

##### 解决当页面消失时H5视频不自动播放方法：
- 方法一 ：

        - (void)viewDidDisappear:(BOOL)animated {
            [super viewDidDisappear:animated];
            [_webView reload]; //重新加载 防止web中正在播放的视频页面消失后还在播放。 
        }
 
 
- 方法二：
 
         - (void)viewDidDisappear:(BOOL)animated {
          //新跳转一个空白页 防止web中正在播放的视频页面消失后还在播放。
            [_webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"about:blank"]]]; 
        }
        
    **此方法的弊端 ：**
    当当前`H5`页面不是单纯`H5`时，再次拿如下图来描述：
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/lJh1aD.jpg)
    
    最新评论以上全部是`H5` ，评论列表是原生。底部四个按钮是原生。
    
    当我们点击这些原生元素进入次级详情页面时，然后再返回就会发现`H5`页面已经变成了我们刚刚新建的空白页了。
    

## 四、补充技能：
以上示例中，用`H5`拼接详情页然后下面拼接原生评论列表。这个技巧在日常开发中很实用。很可能有机会使用到。那类似这种需求怎么准确拿到`H5`内容的高度呢？

请进入我的另外一篇文章传送门：[精确获取 UIWebView 的高度](https://www.yfmingo.cn/2017/03/13/accurate-get-webViewHeader/)

还一篇`UIWebView`实用技能：
[UIWebView 加 MJRefresh 同时解决底部黑影问题](https://www.yfmingo.cn/2017/08/25/UIWebVIew-mjrefresh/)        
## 五、联系：
- 联系邮箱：yfmingo@163.com
- 联系网站：[www.yfmingo.cn](https://www.yfmingo.cn/)





