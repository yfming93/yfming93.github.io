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




#### 0x001 Android Studio 报错如下

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

-----


#### 0x002 AndroidStudio 不提示代码

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/final Color unselectedColor;.png)
    - **原因：**可能是上一行使用了///注释导致的。
    -  **解决：**使用//注释

------
#### 0x003 真机编译安装APP显示空白

- **原因：**报错：`Failed to find assets path for "Frameworks/App.framework/flutter_assets"`
-  **解决：**
  -  点击红框加号添加 `Add Files` ， 在ios -> flutter -> 添加`App.framework`,`Flutter.framework`重新编译安装。
     ![](https://tva1.sinaimg.cn/middle/007S8ZIlgy1ggsx2sumbdj319o0se7af.jpg)
   
--------------
#### 0x004 使用非 Runner 名称 跑 flutter 项目

- **原因：**使用非 Runner 名称 跑 flutter 项目。会报错如下：

         Could not find the built application bundle at build/ios/iphoneos/Runner.app.
- **解决：** 在`xcode`修改 项目名称为`Runner`再跑项目

--------

##### 0x005

- **原因：**Flutter Entrypoint isn't within the current project
- **解决：**
    ```
    as 打开  File -> Project Structure -> Module
重新选择source 为你项目路径
    ```