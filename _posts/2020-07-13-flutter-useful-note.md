---
layout: post
title:  "flutter填坑之路——实用小技巧"
date:   2020-07-13
author: "袁凤鸣"
excerpt: 收集flutter学习过程中觉得实用的一些小技巧。

categories: 
    - flutter
tags: 
    - flutter
mathjax: true

---
* content
{:toc}
---



#### Flutter 技巧
----
- 网络请求返回，封装时候 直接返回 `Future` 

        static Future<List<MovieItem>> requestMovieList (int start) async {}
    
    这样在其他界面 `initState` 可以用`then`来接收数据。不能使用`async` 和`await`，而且`initState`是系统函数不能加`async`

        @override
        void initState() {
          super.initState();
          HomeRequest.requestMovieList(0).then((res){
            print("homeres:$res");
          });
        }

------
- `color` 和 `decoration` 不能共存，同时写会报错，因为 `decoration` 中也有`color`

------
- 列表 `cell` 中，一个`item`底部的灰色小空白可以用如下

        decoration: BoxDecoration(
            border: Border(
          bottom: BorderSide(
            width: 10,
            color: Color(0xffdddddd),
          ),
        )),

------
- 数组数据处理技巧

    `final castsString = movie.casts.map((item)=> item.name).join(" ");`

 `movie.casts.map((item)=> item.name)` ：取`movie`对象里面的`casts`数组，转换成可遍历的`map`，取每个遍历出的`item`对象中的`name`然后返回成一个新`map`。
 
 `.join(" ")`：用返回的新`map`，再用空格字符串拼接得到新字符串。

------
- 图片加载闪烁问题

    默认图片的`gaplessPlayback`属性为`false`，
    
    - **问题：**这种模式下加载一个新图片的流程是。删除旧图 --> 显示空白 --> 等新图加载完成再去显示。这样会导致新图片替换旧图片时候，新图片第一次加载的过程中闪烁一下。
    - **解决：**`gaplessPlayback: true`
    - **原理：**`gaplessPlayback: true`模式加载图片流程：等新图加载完成 --> 删除旧图替换新图 
    

