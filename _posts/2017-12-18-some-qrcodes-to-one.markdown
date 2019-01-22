---
layout: post
title:  "二维码多合一"
date:   2017-12-18
author: "袁凤鸣"
categories: 实用技术
tags: 二维码
excerpt: 多个二维码合成一个二维码
mathjax: true
---
* content
{:toc}


## 介绍：
日常开发中。有些情况需要将多个二维码合成一个二维码。如:

将蒲公英的iOS测试包二维码和安卓测试包二维码合成一个。。这样发给任何人测试只要发一个二维码就行。不管他是安卓手机还是苹果手机自动识别并安装对应的测试包。

## 步骤：
1. 新建`index.html`文件。
2. 在`index`文件中写入相关逻辑判断代码。将准备好的iOS和安卓测试包二维码链接替换代码中二维码链接。
3. 将`index`文件发布到`coding`或者`Github Page`平台并开启`page`模式（page模式开启教程也简单，可见官网）。
4. 然后得到`index`的`page`网页链接。再将此链接利用在线生成二维码工具生成二维码即可。

## 代码：

    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>二维码下载</title>   
     
            <script type="text/javascript">
                /*
                 * 智能机浏览器版本信息:
                 *
                 */
                var browser = {
                    versions: function() {
                        var u = navigator.userAgent, app = navigator.appVersion;
                        return {//移动终端浏览器版本信息
                            trident: u.indexOf('Trident') > -1, //IE内核
                            presto: u.indexOf('Presto') > -1, //opera内核
                            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                            iPad: u.indexOf('iPad') > -1, //是否iPad
                            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                        };
                    }(),
                    language: (navigator.browserLanguage || navigator.language).toLowerCase()
                }
     
                if (browser.versions.android) { 
                    
                    window.location="https://www.pgyer.com/VzkB";
                } else if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
                    window.location="https://www.pgyer.com/me2z";
                }
                 
     
    //            document.writeln("语言版本: " + browser.language);
    //            document.writeln(" 是否为移动终端: " + browser.versions.mobile);
    //            document.writeln(" ios终端: " + browser.versions.ios);
    //            document.writeln(" android终端: " + browser.versions.android);
    //            document.writeln(" 是否为iPhone: " + browser.versions.iPhone);
    //            document.writeln(" 是否iPad: " + browser.versions.iPad);
    //            document.writeln(navigator.userAgent);
     
     
            </script>
        </head>
        <body>
             
        </body>
    </html>

