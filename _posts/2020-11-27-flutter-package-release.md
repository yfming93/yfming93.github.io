---
layout: post
title:  "flutter 发布自己的 package 到 pub.dev "
date:   2020-11-27
author: "袁凤鸣"
excerpt: flutter

categories: 
    - flutter
tags: 
    - flutter
mathjax: true

---
* content
{:toc}
---



## 一、Package 介绍
**`flutter` 有四种工程模式：`Flutter Application`、`Flutter Module`、`Flutter Plugin` 和 `Flutter Package`**。

**他们的区别如下：**

 - **Flutter Application** ：表示一个 Flutter 项目，主体是 Flutter，当然它也可以接入 Android Module 或者 iOS Framework，其内部包含 Android 和 iOS 项目。
 - **Flutter Module** ：用于原生项目中插入 Flutter 模块，原生为主体，与 Flutter 进行混合开发。
 - **Flutter Plugin** ：表示 Flutter 插件，包含 Android 和 iOS 项目，如果你要开发一个 Plugin 且此 Plugin 涉及到原生支持，比如蓝牙功能、网络功能等，这些功能纯 Flutter 是无法实现的。这时候就要新建 Flutter Plugin工程。
 - **Flutter Package**：和 Flutter Plugin 基本一样，唯一的区别是Flutter Package表示纯 Flutter 模块，不需要原生开发，没有Android 和 iOS 项目，比如开发一个纯 UI 的插件。
 
 
发布自己的 package 到 pub.dev

---------------

## 二、创建Package工程

### 0x01 发布需要屏蔽 .bash_profile 中：
    export PUB_HOSTED_URL=https://pub.flutter-io.cn
    export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
 
### 0x02、终端挂代理（这样容易上传）
- 思路步骤：挂代理VPN。然后设置终端代理。
- 翻墙成功后 测试 `curl www.google.com` 出现一大堆字符串就是翻墙成功。也可以利用 `curl ip.cc` 查看当前`ip`是否在国外。
 
### 0x03、使用 flutter packages pub publish --dry-run 验证是否有 error 。
 
 - 出现 **Your pubspec.yaml includes an "author" section which is no longer used and may be removed.**
    - 解决 ：在 `yaml` 中 删除 `author`
    直到出现 `Package has 0 warnings.` 表示验证成功
 - 出现 **./CHANGELOG.md doesn't mention current version (1.0.0).**
    - 解决：去修改 CHANGELOG 文件 记录当前版本的修改情况。
 - 出现 **LICENSE file LICENSE contains generic TODO.**
    - 去添加 LICENSE 证书 。
 
### 0x04、发布

发布地址：
            
    flutter packages pub publish --server=https://pub.dartlang.org

**然后根据提示去 浏览器验证账号地址，浏览器要翻墙。** 
 
  - 浏览器验证账号地址： https://accounts.google.com/o/oauth2/auth 开头的一大段。
 
- 出现 `Successfully uploaded package.` 表示上传成功。

### 0x05 终端操作记录

```
imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
↵ 65 → flutter packages pub publish --dry-run
Publishing app_debug 1.0.0 to https://pub.flutter-io.cn:
|-- .gitignore
|-- .metadata
|-- CHANGELOG.md
|-- LICENSE
|-- README.md
|-- lib
|   |-- app_debug.dart
|   |-- app_float_box.dart
|   |-- app_info_show_page.dart
|   '-- app_network_show_page.dart
|-- pubspec.yaml
'-- test
'-- app_debug_test.dart

Package has 0 warnings.

imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
✔ → flutter packages pub publish
Publishing app_debug 1.0.0 to https://pub.flutter-io.cn:
|-- .gitignore
|-- .metadata
|-- CHANGELOG.md
|-- LICENSE
|-- README.md
|-- lib
|   |-- app_debug.dart
|   |-- app_float_box.dart
|   |-- app_info_show_page.dart
|   '-- app_network_show_page.dart
|-- pubspec.yaml
'-- test
'-- app_debug_test.dart

Publishing is forever; packages cannot be unpublished.
Policy details are available at https://pub.dev/policy

Do you want to publish app_debug 1.0.0 (y/N)? y
Pub needs your authorization to upload packages on your behalf.
In a web browser, go to https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=force&response_type=code&client_id=818368855108-8grd2eg9tj9f38os6f1urbcvsq399u8n.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A59176&code_challenge=-hbfWqpz0_ieEG-RXp331HCw5h1sffHRGp1L-W0kxBg&code_challenge_method=S256&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email
Then click "Allow access".

Waiting for your authorization...
Authorization received, processing...
^C%

imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
↵ SIGINT(2) → ip
IP    : 219.140.141.18
地址    : 中国  湖北  武汉
运营商    : 电信

数据二    : 湖北省武汉市 | 汉口众友网吧

数据三    :

URL    : http://www.cip.cc/219.140.141.18

imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
✔ → proxy
imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
✔ → ip
IP    : 111.250.98.16
地址    : 中国  台湾  台北市
运营商    : cht.com.tw

数据二    : 台湾省台北市 | 中华电信

数据三    : 中国台湾 | 中华电信

URL    : http://www.cip.cc/111.250.98.16


imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
↵ 1 → flutter packages pub publish --server=https://pub.dartlang.org
Publishing app_debug 1.0.0 to https://pub.dartlang.org:
|-- .gitignore
|-- .metadata
|-- CHANGELOG.md
|-- LICENSE
|-- README.md
|-- lib
|   |-- app_debug.dart
|   |-- app_float_box.dart
|   |-- app_info_show_page.dart
|   '-- app_network_show_page.dart
|-- pubspec.yaml
'-- test
'-- app_debug_test.dart

Publishing is forever; packages cannot be unpublished.
Policy details are available at https://pub.dev/policy

Do you want to publish app_debug 1.0.0 (y/N)? y
Uploading...
LICENSE file `LICENSE` contains generic TODO.
pub finished with exit code 1

imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
↵ 1 → flutter packages pub publish --server=https://pub.dartlang.org
Publishing app_debug 1.0.0 to https://pub.dartlang.org:
|-- .gitignore
|-- .metadata
|-- CHANGELOG.md
|-- LICENSE
|-- README.md
|-- lib
|   |-- app_debug.dart
|   |-- app_float_box.dart
|   |-- app_info_show_page.dart
|   '-- app_network_show_page.dart
|-- pubspec.yaml
'-- test
'-- app_debug_test.dart

Publishing is forever; packages cannot be unpublished.
Policy details are available at https://pub.dev/policy

Do you want to publish app_debug 1.0.0 (y/N)? y
Uploading...
Successfully uploaded package.

imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
```

### 0x06 第二次发更新包终端操作记录

```

imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
✔ → ip
IP    : 111.250.98.16
地址    : 中国  台湾  台北市
运营商    : cht.com.tw

数据二    : 台湾省台北市 | 中华电信

数据三    :

URL    : http://www.cip.cc/111.250.98.16

imac@ksddeiMac → ~/Desktop/AAAFleeming/MingoKit/FlutterAppDebug/app_debug → main ✚ ● ? →
✔ → flutter packages pub publish --server=https://pub.dartlang.org
zsh: correct 'packages' to '.packages' [nyae]? n
Publishing app_debug 1.0.1 to https://pub.dartlang.org:
|-- .flutter-plugins
|-- .gitignore
|-- .idea
|   |-- codeStyles
|   |   '-- Project.xml
|   |-- libraries
|   |   |-- Dart_Packages.xml
|   |   |-- Dart_SDK.xml
|   |   '-- Flutter_Plugins.xml
|   |-- modules.xml
|   |-- vcs.xml
|   '-- workspace.xml
|-- .metadata
|-- CHANGELOG.md
|-- LICENSE
|-- README.md
|-- app_debug.iml
|-- example
|   '-- example.md
|-- lib
|   |-- app_debug.dart
|   |-- app_float_box.dart
|   |-- app_info_show_page.dart
|   '-- app_network_show_page.dart
|-- pubspec.yaml
'-- test
'-- app_debug_test.dart

Publishing is forever; packages cannot be unpublished.
Policy details are available at https://pub.dev/policy

Do you want to publish app_debug 1.0.1 (y/N)? y
Uploading...
Successfully uploaded package.

```

### 0x07 最终效果
**pub.dev 成品链接** [https://pub.dev/packages/app_debug](https://pub.dev/packages/app_debug)
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/20201130113844.png)
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/20201130111201.jpg) 

