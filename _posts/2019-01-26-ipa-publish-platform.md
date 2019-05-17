---
layout: post
title:  "自建 IPA 分发平台"
date:   2019-01-26
author: "袁凤鸣"
excerpt: 利用 coding 自己搭建一个 iOS 的企业签名 IPA 包的分发平台.

categories: 
    - iOS
tags: 
    - 分发
mathjax: true

---
* content
{:toc}
---

### 0x001 准备条件

-  已经经过苹果开发者企业账号签名之后的 IPA 包
-  需要支持 HTTPS 协议的服务器。（本文借助 coding 来实现）

### 0x002 成型效果
【大 gif 若加载不出来，重新刷新下网页】
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/akYtAu.jpg)

### 0x003 详细步骤

- 在 `coding` 上新开一个`git` 仓库 并开启 `coding page` 服务。
    - ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/rvDUhS.jpg)

- 然后 进入 设置 
    - ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/zd6tbW.jpg)
- 开启 强制 `HTTPS` 访问
    - ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/oBYeAn.jpg)

- 使用 `git` 命令 把仓库 克隆 到本地。
    - 新建 如图 几个文件
        - ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/2NktPp.jpg)

    - **index.html** 文件内容
                
        ```
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="description" content="">
            <meta name="keywords" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>人人乐商城</title><!--修改这里-->
        </head>
        <body>
            <a href="itms-services://?action=download-manifest&url=https://dev.tencent.com/u/yfming93/p/iosrrl/git/raw/master/manifest.plist">下载 人人乐商城</a><!--修改这里-->
        </body>
        </html>
        ```


    - **manifest.plist** 文件内容

        
```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>items</key>
        <array>
            <dict>
                <key>assets</key>
                <array>
                    <dict>
                        <key>kind</key>
                        <string>software-package</string>
                        <key>url</key>
                        <string>https://dev.tencent.com/u/yfming93/p/iosrrl/git/raw/master/rrl.ipa</string><!--修改这里-->
                    </dict>
                    <dict>
                        <key>kind</key>
                        <string>display-image</string>
                        <key>url</key>
                        <string>https://dev.tencent.com/u/yfming93/p/iosrrl/git/raw/master/image.57x57.png</string><!--修改这里-->
                    </dict>
                    <dict>
                        <key>kind</key>
                        <string>full-size-image</string>
                        <key>url</key>
                        <string>https://dev.tencent.com/u/yfming93/p/iosrrl/git/raw/master/image.512x512.png</string><!--修改这里-->
                    </dict>
                </array>
                <key>metadata</key>
                <dict>
                    <key>bundle-identifier</key>
                     <string>com.jshop.trading.mxjy</string><!--修改这里-->
                     <key>bundle-version</key>
                    <string>1.0.0</string><!--修改这里-->
                    <key>kind</key>
                    <string>software</string>
                    <key>title</key>
                    <string>人人乐商城</string><!--修改这里-->
                </dict>
            </dict>
        </array>
    </dict>
</plist>
```


- 新增 如图两个尺寸我 图标。作为下载安装时候桌面临时显示的图标。
- 新增 已经 企业账号签名过的 ipa 文件。

- 如图 五个文件制作好后，上传 到 `coding` 的仓库中。

### 0x004 重点注意：如上需要修改之处文件路径的正确获取姿势

- 上传的 ipa 文件路径 获取
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/qnxJxL.jpg)

- 上传的 图标 文件路径 获取

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/OO0NLJ.jpg)
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/49PKVQ.jpg)


- 上传的 **manifest.plist** 文件路径 获取

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/0pLVyG.jpg)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/XpnNuH.jpg)

### 0x005 结语
 - 获取到正确姿势的文件路径后，然后修改如上那些【修改这里】标签中内容。重新`push`一次。
 
 - 然后查看你 仓库 `page `服务的地址
 
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/eXhJ35.jpg)
 

- 发给别人用手机的 `Safari`浏览器 就可以安装了。（阔以把下载引导页做漂亮点，如上就下载网页就一个按钮太`low`）

**之前网上查找了一些教程操作后，老是提示暂时无法安装。后来分析后才明白获取文件的路径有问题。自行摸索后才弄清楚第四部的正确文件路径获取姿势**


