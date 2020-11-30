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



### Flutter 技巧
----
- #### 网络请求返回，封装时候 直接返回 `Future` 

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

- #### 属性不能共存

    `color` 和 `decoration` 不能共存，同时写会报错，因为 `decoration` 中也有`color`

------
- #### 列表 `cell` 中，一个`item`底部的灰色小空白可以用如下

        decoration: BoxDecoration(
            border: Border(
          bottom: BorderSide(
            width: 10,
            color: Color(0xffdddddd),
          ),
        )),

------
- #### 数组数据处理技巧

    `final castsString = movie.casts.map((item)=> item.name).join(" ");`

 `movie.casts.map((item)=> item.name)` ：取`movie`对象里面的`casts`数组，转换成可遍历的`map`，取每个遍历出的`item`对象中的`name`然后返回成一个新`map`。
 
 `.join(" ")`：用返回的新`map`，再用空格字符串拼接得到新字符串。

------
- #### 图片加载闪烁问题

    默认图片的`gaplessPlayback`属性为`false`，
    
    - **问题：**这种模式下加载一个新图片的流程是。删除旧图 --> 显示空白 --> 等新图加载完成再去显示。这样会导致新图片替换旧图片时候，新图片第一次加载的过程中闪烁一下。
    - **解决：**`gaplessPlayback: true`
    - **原理：**`gaplessPlayback: true`模式加载图片流程：等新图加载完成 --> 删除旧图替换新图 

---------
- #### 富文本水平不对齐

    如图 富文本的图标和文字不在同一水平线
    ![](https://tva1.sinaimg.cn/small/007S8ZIlgy1ggph7s09pbj308d04ldgs.jpg)
    
    问题代码：
    
  

          Widget buildContentInfoTitle() {
            return Text.rich(TextSpan(children: [
              WidgetSpan(
                child: Icon(
                  Icons.play_circle_outline,
                  color: Colors.redAccent,
                  size: 24,
                ),
              ),
              TextSpan(
                text: movie.title,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              WidgetSpan(
                  child: Text("(${movie.playDate})",
                      style: TextStyle(fontSize: 16, color: Colors.grey))),
            ]));
          }

- **问题：**使用了不同的`span`导致的。如上分别使用了 `WidgetSpan`、`TextSpan`、`WidgetSpan`
- **解决：**全部使用`WidgetSpan`即可解决。
    - 正确代码：
        



            Widget buildContentInfoTitle() {
                return Text.rich(TextSpan(children: [
                  WidgetSpan(
                      child: Icon(
                        Icons.play_circle_outline,
                        color: Colors.redAccent,
                        size: 24,
                      ),
                      alignment: PlaceholderAlignment.middle),
                  WidgetSpan(
                      child: Text(movie.title,
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          )),
                      alignment: PlaceholderAlignment.middle),
                  WidgetSpan(
                      child: Text("(${movie.playDate})",
                          style: TextStyle(fontSize: 16, color: Colors.grey)),
                      alignment: PlaceholderAlignment.middle),
                ]));
              }

------------
- #### 富文本字符不自动换行
    如图 ：图标+电影名称+年份 是三个`WidgetSpan`，预期效果是文本接到图标后面。
    ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggphztvpn8j308r04vdgw.jpg)
    
    - **问题：**电影名称是一个单独的`WidgetSpan`，如果文字过长就不会自动换行。单独的`Widget`不会自动换行。
        - 问题代码：【见如上 《**富文本水平不对齐**》 中代码】
    - **解决思路**：将特别长的电影名称按照每个字分割为许多单独的`Widget`。
    -  **解决：**
           
            Widget buildContentInfoTitle() {
                List<InlineSpan> spans = [];
            
                spans.add(WidgetSpan(
                    child: Icon(
                      Icons.play_circle_outline,
                      color: Colors.redAccent,
                      size: 24,
                    ),
                    alignment: PlaceholderAlignment.middle));
                spans.addAll(movie.title.runes.map((rune) {
                  return WidgetSpan(
                      child: Text(String.fromCharCode(rune),
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          )),
                      alignment: PlaceholderAlignment.middle);
                }));
            
                spans.add(WidgetSpan(
                    child: Text("(${movie.playDate})",
                        style: TextStyle(fontSize: 16, color: Colors.grey)),
                    alignment: PlaceholderAlignment.middle));
            
                return Text.rich(TextSpan(children: spans));
              }
        

----------
- #### print打印

    - `debugPrint` 打印会在每一行最前面多出很多`flutter: `，这样复制打印的数据很不方便。
    
---------

- #### flutterText 换行问题

-  直接设置`maxLines` 发现有些场景会无效，解决方法 在`Text`外层级使用`Expanded`包一下

-------

    

-------
- 自定义dialog 点击框外背景自动消失无效
    - **解决：**需要按照如下控件顺序布局
    ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gh8djft9udj317n0u0n3k.jpg)

----------

- #### flutter Text 文本点击

        RichText(
          text: TextSpan(
              text: "我已认真阅读并同意",
              style: TextStyle(color: Colors.red, fontSize: 24),
              children: [
                TextSpan(
                    text: "《隐私协议》",
                    style: TextStyle(
                        color: Colors.blue,
                        fontSize: 30,
                        fontStyle: FontStyle.italic,
                        decoration: TextDecoration.underline),
                recognizer: TapGestureRecognizer()..onTap=(){
                      print("点击了！！");
                }),
              ]),
        )

