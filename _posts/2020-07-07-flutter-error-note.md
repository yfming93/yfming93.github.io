---
layout: post
title:  "flutter填坑之路——error记录"
date:   2020-07-07
author: "袁凤鸣"
excerpt: 收集flutter学习过程中遇见的填一些 error 场景。

categories: 
    - flutter
tags: 
    - flutter
mathjax: true

---
* content
{:toc}
---




#### 0x0001
- Android Studio 报错如下

        Error detected in pubspec.yaml:
        Error on line 44, column 4: Expected a key while parsing a block mapping.
        ╷
        44 │    assets:
        │    ^
        ╵
        Please correct the pubspec.yaml file at /Users/mingo/Desktop/AAAllGitRepos/flutter_douban/pubspec.yaml

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/20200707162257.png)
    - **原因：** `assets` 前面多了空格
    - **解决：** 去掉空格就好。

--
- Android Studio 不提示代码
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/final Color unselectedColor;.png)
    - **原因：**可能是上一行使用了///注释导致的。
    -  **解决：**使用//注释


