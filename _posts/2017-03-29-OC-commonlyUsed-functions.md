---
layout:     	post
title:       "总结一下 项目开发中（ OC 和 C ）常用的函数"
excerpt: 		今天要用到 ABS（A） 取整数绝对值，遂直接 markdown 一个常用函数对照表。以备以后查对。 
date:     	2017-03-29 
author:     	"袁凤鸣"
categories:  iOS
tags: OC常用函数 函数对照表
 
mathjax: true
---

* content
{:toc} 
 
### 介绍一下Objective-c常用的函数，常数变量



<center><h3>(一)：【算术函数】</h3></center>

| 函数名       | 说明  |  例子  
| :--------------------   | :--------------------  | :--------------------  
| int abs(int i) |  处理int类型的取绝对值 | int a = fabs( 71 - 78); <br>→7  <br>※浮点数的时候用fabs。 
| float fabsf(float i)| 处理float类型的取绝对值|CGFloat e = fabs( 71.001 - 78.89);
| int rand()     | 随机数生成 |   srand(time(nil));　<br>//随机数初期化 <br>int val = rand()P;　<br>//0～49之间的随机数  
|double fabs(double a)|	浮点数的绝对值| double val = fabs(-12.345); <br> →12.345 <br> ※整数的时候用abs。
|double floor(double a)|	返回浮点数整数部分（舍弃小数点）| double val = floor(12.345); <br> →12.000
|double ceil(double a)|	返回浮点数整数部分（舍弃小数点部分，往个位数进1）| double val = ceil(12.345); <br> →13.000 <br>
|double pow(double a, double b)	|a的b次方| double val = pow(2, 3);  <br>→8
|double sqrt(double a)	|a的平方根| double val = sqrt(2); <br> →1.41421356







<center><h3>(二)：【三角函数】</h3></center>

| 函数名       | 说明  |  例子  |
| :------------   | :--------  | :----  |
|double cos(double a)	|余弦函数　（a：弧度）||
|double sin(double a)	|正弦函数　（a：弧度）||
|double tan(double a)	|正切函数　（a：弧度）||
|double asin(double a)	|反正弦值　（a：弧度）||
|double acos(double a)	|反余弦函数（a：弧度）||
|double atan(double a)	|反正切函数	 	     
|double atan2(double a, double b)|	返回给定的 a 及 b 坐标值的反正切值||




<center><h3>(三)：【指数函数】</h3></center>

| 函数名       | 说明  |  例子  |
| :------------   | :--------  | :----  |
|double log(double a)	|以e 为底的对数值||
|double log10(double a)	|对数函数log||



<center><h3>(四)：【常数】</h3></center>

| 函数名       | 说明  |  例子  |
| :------------   | :--------  | :----  |
|M_PI	|圆周率（=π）||
|M_PI_2	|圆周率的１/２（=π/2）
|M_PI_4	|圆周率的１/４（=π/4）
|M_1_PI	|=1/π
|M_2_PI	|=2/π
|M_E	|=e
|M_LOG2E	|log_2(e)
|M_LOG10E	|log_10(e)