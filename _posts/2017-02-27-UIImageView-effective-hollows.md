---
layout:     	post
title:       "UIImageView高效圆角"
excerpt: 		UIImageView高效圆角，防止离屏渲染掉帧 
date:     	2017-02-27 
author:     	"袁凤鸣"
categories:  iOS
tags:
    - UIImageView
    - 离屏渲染
    
mathjax: true
---

* content
{:toc}  

### 我这里将常见的几种 `UIImageView` 圆角方法做以简单的对比，让大家心里理清什么场景该用什么



	UIImageView *imgView = [[UIImageView alloc]init];

## **方案A(基本方案)：**

	imgView.layer.cornerRadius = imgView.frame.size.width/2.0;
	
	imgView.layer.masksToBounds = YES;

或者第二种：

	imgView.layer.cornerRadius = imgView.frame.size.width/2.0;
	
	imgView.clipsToBounds = YES;

**备注：clipsToBounds是对view的切割，masksToBounds是对layer的切割**






性能消耗：
这个是离屏渲染（off-screen-rendering），对性能消耗比较大
fps大致在45帧左右（每个cell 做2个imageview）

正常fps是60帧，越小，用户体验越差
|

离屏渲染，指的是GPU在当前屏幕缓冲区以外新开辟一个缓冲区进行渲染操作。由上面的一个结论视图和圆角的大小对帧率并没有什么卵影响，数量才是伤害的核心输出啊。可以知道离屏渲染耗时是发生在离屏这个动作上面，而不是渲染。为什么离屏这么耗时？原因主要有创建缓冲区和上下文切换。创建新的缓冲区代价都不算大，付出最大代价的是上下文切换。

## **方案B:**

	CAShapeLayer *layer = [CAShapeLayer layer];  
	UIBezierPath *aPath = [UIBezierPath bezierPathWithOvalInRect:aImageView.bounds];  
	layer.path = aPath.CGPath;  
	poImgView.layer.mask = layer;
性能消耗：
测试fps大致在20帧左右，比方案A的消耗更大

## **方案C：**

	- (UIImage *)imageWithCornerRadius:(CGFloat)radius {
		CGRect rect = (CGRect){0.f, 0.f, self.size};
		
		UIGraphicsBeginImageContextWithOptions(self.size, NO, UIScreen.mainScreen.scale);
		CGContextAddPath(UIGraphicsGetCurrentContext(),
		 [UIBezierPath bezierPathWithRoundedRect:rect cornerRadius:radius].CGPath);
		CGContextClip(UIGraphicsGetCurrentContext());
		
		[self drawInRect:rect];
		UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
		
		UIGraphicsEndImageContext();
		
		return image;
	}
	
性能消耗：
这个是on-screen-rendering
相当于时时去做渲染，相比于A.B方案的离线渲染，此方法对性能消耗最低，推荐用此方案。

**最后说明**

方案A和方案B都是比较常见的方式，但是都不推荐，对此的优化方案是是用C，但是如果费用使用A或者B方案，补救措施是：

	self.layer.shouldRasterize = YES;  
	self.layer.rasterizationScale = [UIScreen mainScreen].scale;




