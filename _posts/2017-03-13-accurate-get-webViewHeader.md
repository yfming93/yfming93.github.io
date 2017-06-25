---
layout:     	post
title:       "精确获取 UIWebView 的高度"
excerpt: 		通过 KVO 监听 webView.scrollView 的 contentSize 变化，进行精确获取 UIWebView 的高度 
date:     	2017-03-13 
author:     	"袁凤鸣"
categories:  iOS
tags:
    - UIWebView
    - UIWebView高度
    - H5底部评论列表
    
mathjax: true
---
 
* content
{:toc} 

## 精确获取 **UIWebView** 的高度

## （一）使用背景：
很多情况下。项目需求实现H5文章  和 原生评论效果，文章是加载`H5`链接，评论信息是后台接口提供，以列表形式展示。

像下面这个内容的详情图。我们希望上面部分的详情内容做成 `H5` ，下面部分的评论列表做成原生的。。我们这个时候就想到了把 `H5` 嵌入到  `tableView` 的  `tableHeaderView` 上面。然后评论就用 `cell` 进行显示。

如图：（ *NO Pictures Say G8  O(∩_∩)O~* ）
![](http://wx2.sinaimg.cn/mw690/cb81ffe8gy1fdl7imgcxhj20ku1dan6h.jpg)







## （二）原始做法：
原始做法，只是在设置 `webView` 的代理之后 实现  `webViewDidFinishLoad`代理方法。在方法中使用 `[webView sizeThatFits:CGSizeZero]` 来得到 `webView`的内容高度。

	- (void)webViewDidFinishLoad:(UIWebView *)webView {
	
	    CGSize tempSize = [webView sizeThatFits:CGSizeZero];
	    _webView.frame = CGRectMake(0, 0, tempSize.width, tempSize.height);
	    [self.table setTableHeaderView:_webView];
	    
	}

## （三）问题介绍：
那么问题来了。

获取`WebView` 内容高度，上面的做法无法获取到准确高度，导致页面布局出现差错。


像上面这样，类似的方法很多，不管是JS获取，还是contentSize获取，最后结果都难以获取到准确高度，并非方法不行，*而是：
`webViewDidFinishLoad`代理方法被调用时，页面并不一定完全展现完成，可能有图片还未加载出来，导致此时获取的高度是并不是最终高度*，过会儿图片加载出来后，浏览器会重新排版，而我们在这之前给了一个错误高度，导致显示异常。

布局出现差错后，上下滑动页面时，在`WebView`内容区域滑动只是 `WebView` 的内容上下动，在 `tableView` 内容区域滑动只是  `tableView` 内容上下动。而我们要的效果是无论怎样滑动 都只有  `tableView` 内容上下动。搜到的资料很多但都无法解决问题，相信很多人都踩过坑。以下是个人经验总结：


## （四）解决思路：

-  `webView`加载`H5`链接，设置它为`tableView`的 `headerView`，下方评论信息用`Cell`加载展示。

- 在`webView`的回调方法`webViewDidFinishLoad`中获取网页内容高度，设置为`webView`的高度，重新将`webView`赋给`tableView`的`headerView`。
- 给`webView`的`scrollView`的`contentSize`属性添加监听，每当内容发生变化，`contentSize`一定会跟着变，捕获这个变动，在监听方法中实现`webViewDidFinishLoad`中的代码，也就是获取最新的内容高度赋给`webView`。

**Tip: 将一个View赋值给UITableView的tableHeaderView时，不需要手动设置高度，HeaderView会自动使用View的高度。**

## （五）代码实现：
引用 **Linus Torvalds** 一句装逼的话 ：

> Talk is cheap, show me the code.   —— Linus Torvalds

- 设置监听的 `KeyPath` ：

		 static NSString  *kcontentSize = @"contentSize";
- 初始化创建 `webView` 时设置 监听 **webView**.**scrollView** 的 **contentSize** 变化：

		[self.webView.scrollView addObserver:self forKeyPath:kcontentSize options:NSKeyValueObservingOptionNew context:nil];


- 实现 `KVO` 回调方法，并判断如果  `KeyPath`  是 `contentSize`时再进行一次 `webViewDidFinishLoad` 中 `webView`高度的赋值操作。

		- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context {
		
		    if ([keyPath isEqualToString:kcontentSize]) {
		        
		        CGSize tempSize = [_webView sizeThatFits:CGSizeZero];
		        _webView.frame = CGRectMake(0, 0, tempSize.width, tempSize.height);
		        self.table.tableHeaderView = _webView;
		        
		    }else {
		        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
		    }
		}

- 同时原来 `webViewDidFinishLoad`的操作也是要的 ：
		
		- (void)webViewDidFinishLoad:(UIWebView *)webView {
		
		    CGSize tempSize = [webView sizeThatFits:CGSizeZero];
		    _webView.frame = CGRectMake(0, 0, tempSize.width, tempSize.height);
		    [self.table setTableHeaderView:_webView];
		    
		}

- 移除观察者 ：

		- (void)dealloc {
		    [_webView.scrollView removeObserver:self forKeyPath:kcontentSize context:nil];
		    
		}

## （六）来个总结：
- 好了。这样之后。`webView`内容发生变化后。就会监听到 **webView.scrollView.contentSize** 也发生了变化。我们在监听方法里面及时再次设置高度即可。

- 还有，在`cell`中使用`webView`获取高度不准确的解决办法跟上面一样，只不过需要注意`cell`中使用`webView`涉及到`cell`重用，会导致滑动列表时`webView`多次加载，影响性能，建议缓存高度。