---
layout:     	post
title:       "UIWebView 加 MJRefresh 同时解决底部黑影问题"
date:     	2017-08-25
author:     	"袁凤鸣"
categories:  iOS
tags:  UIWebView 刷新
mathjax: true
---

* content
{:toc} 

# UIWebView 加 MJRefresh 同时解决底部黑影问题

## 一、介绍：
#### 让 H5 的刷新更加撩人浪漫！

<!--原文在我博客： [https://www.yfmingo.cn/2017/07/23/PagingButton/](https://www.yfmingo.cn/2017/07/23/PagingButton/)-->
<br>

之前`H5`的刷新一直用 `MBProgressHUD`在页面中间加个转转。。后来发现有些`APP`是直接进去的时候就有 `MJRefresh`。那样的效果个人觉得更加撩人。用户体验赶脚要好一些。不信你看看哈。

效果图：<br>

![](https://ws1.sinaimg.cn/large/cb81ffe8gy1fiw21qymttg207m0ecb2a.gif)

<br>






## 二、 实现代码：
#### 直接给整块代码吧。其他的废话说多了显得太廉价。


    //
    //  FMWebViewController.m
    //  MobileProject
    //
    //  Created by Mingo on 2017/8/25.
    //  Copyright © 2017年 袁凤鸣. All rights reserved.
    //
    
    #import "FMWebViewController.h"
    #import <MJRefresh.h>
    
    @interface FMWebViewController ()<UIWebViewDelegate>
    
    @property (nonatomic, strong) UIWebView *webView;//网页
    @end
    
    @implementation FMWebViewController
    
    - (void)viewDidLoad {
        [super viewDidLoad];
        self.view.backgroundColor = [UIColor whiteColor];
        [self.view addSubview:self.webView];
        [self.webView.scrollView.mj_header beginRefreshing];
    }
    
    #pragma mark -  懒加载创建webView：
    - (UIWebView *)webView{
        
        if (!_webView) {
            UIWebView *webView = [[UIWebView alloc] initWithFrame: CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height)];
            webView.backgroundColor = [UIColor whiteColor];
            webView.delegate = self;
            
            webView.scrollView.mj_header = [MJRefreshNormalHeader headerWithRefreshingTarget:self refreshingAction:@selector(headerRefresh)];
            webView.scrollView.mj_footer = [MJRefreshAutoNormalFooter footerWithRefreshingTarget:self refreshingAction:@selector(footerRefresh)];
            webView.opaque = NO;
            [self.view addSubview:webView];
            self.webView = webView;
        }
        return _webView;
    }
    
    #pragma mark - 下拉刷新
    - (void)headerRefresh{
        [self loadData];
    }
    
    #pragma mark - 上拉加载
    - (void)footerRefresh{
        [self loadData];
    }
    
    #pragma mark - 结束下拉刷新和上拉加载
    - (void)endRefresh{
        [self.webView.scrollView.mj_header endRefreshing];
        [self.webView.scrollView.mj_footer endRefreshing];
    }
    
    #pragma mark - 加载网页
    - (void)loadData{
        
        NSString *urlString =@"http://www.yfmingo.cn/";
        NSURL *url = [NSURL URLWithString:urlString];
        NSURLRequest *request = [NSURLRequest requestWithURL:url];
        [self.webView loadRequest:request];
    }
    
    #pragma mark - UIWebViewDelegate
    - (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationTyp {
        
        return YES;
    }
    
    - (void)webViewDidStartLoad:(UIWebView *)webView {
        [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
    }
    
    - (void)webViewDidFinishLoad:(UIWebView *)webView {
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
        [self endRefresh];
    }
    
    - (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
        [self endRefresh];
    }
    
    - (void)didReceiveMemoryWarning {
        [super didReceiveMemoryWarning];
    }
    
    @end
 
 
 
## 三、注意细节问题：
经过上面的一大坨代码后。你的`H5`页面已经有比较好看的刷新功能了。但是我的会出现底部有一部分黑底的情况。你打开`Xcode`的调试视图会发现他在`UIWebBrowserView`上面。

如图：
![](https://ws1.sinaimg.cn/large/cb81ffe8gy1fiw2csngr5g207m0ecx6r.gif)

##### 解决方法也相当简单：
在`UIWebView`初始化的时候加一句代码：
    `webView.opaque = NO;`
    
这样的就OK了哈。

## 四、补充技能：
以上示例中，用`H5`拼接详情页然后下面拼接原生评论列表。这个技巧在日常开发中很实用。很可能有机会使用到。那类似这种需求怎么准确拿到`H5`内容的高度呢？

请进入我的另外一篇文章传送门：[精确获取 UIWebView 的高度](https://www.yfmingo.cn/2017/03/13/accurate-get-webViewHeader/)

UIWebView其他实用技能文章：[UIWebView 不自动全屏播放视频](https://www.yfmingo.cn/2017/08/24/UIWebVIew-play-video/)
        
## 五、联系：
- 联系邮箱：yfmingo@163.com
- 联系网站：[www.yfmingo.cn](https://www.yfmingo.cn/)





