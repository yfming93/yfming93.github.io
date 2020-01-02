---
layout: post
title:  "iOS组件化之路 —— cocoapods 公有库搭建"
date:   2019-05-17
author: "袁凤鸣"
excerpt: cocoapods 公有库搭建。将项目中的公共基础模块抽离出来。多项目共用。

categories: 
    - cocoapods
tags: 
    - cocoapods
mathjax: true

---
* content
{:toc}
---
<!--{% raw %}-->



#### 0x01 以我抽离的组件 FMMacroKit为例
自己的`GitHub`账号中要创建同名仓库
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/20190517153811.png)
创建 `FMBaseKit.podspec` 文件
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/20190517153422.png)


#### 0x02 本地git仓库处理
- **clone** 到本地后，本地仓库新增如下目录结构。
- **`FMBaseKit.podspec`文件内容如下：**



```
Pod::Spec.new do |s|
  s.name         = 'FMBaseKit' # 项目名称
  s.version      = '1.0.0'       # 版本号 与 你仓库的 标签号 对应
  s.license      = 'MIT'          # 开源证书
  s.summary      = 'A set of useful Base Object for Foundation, UIKit and more.' # 项目简介
  s.homepage     = 'https://github.com/yfming93/FMBaseKit' # 你的主页
  s.source       = { :git => 'https://github.com/yfming93/FMBaseKit.git', :tag => s.version}#你的仓库地址，不能用SSH地址
  s.source_files = 'FMBaseKit/**/*.{c,h,hh,m,mm}' # 你代码的位置， BYPhoneNumTF/*.{h,m} 表示 BYPhoneNumTF 文件夹下所有的.h和.m文件
  # s.resources    = 'FMBaseKit/**/*.png'
  s.requires_arc = true # 是否启用ARC
  s.platform     = :ios, '9.0' #平台及支持的最低版本
  s.author             = { '袁凤鸣' => 'yfmingo@163.com' } # 作者信息
  s.social_media_url   = 'https://www.yfmingo.cn/' # 个人主页
end

```

#### 0x03 终端命令操作处理


    
```
cd /Users/mingo/Desktop/AAAFleeming/MingoKit/FMMacroKit

# mingo @ 192 in ~ [14:05:48]
$ cd /Users/mingo/Desktop/AAAFleeming/MingoKit/FMMacroKit

# mingo @ 192 in ~/Desktop/AAAFleeming/MingoKit/FMMacroKit on git:master o [14:05:48]
$ pod trunk register yfmingo@163.com 'yfming93' --verbose
opening connection to trunk.cocoapods.org:443...
opened
starting SSL for trunk.cocoapods.org:443...
SSL established
<- "POST /api/v1/sessions HTTP/1.1\r\nContent-Type: application/json; charset=utf-8\r\nAccept: application/json; charset=utf-8\r\nUser-Agent: CocoaPods/1.5.3\r\nAccept-Encoding: gzip;q=1.0,deflate;q=0.6,identity;q=0.3\r\nHost: trunk.cocoapods.org\r\nContent-Length: 64\r\n\r\n"
<- "{\"email\":\"yfmingo@163.com\",\"name\":\"yfming93\",\"description\":null}"
-> "HTTP/1.1 201 Created\r\n"
-> "Date: Thu, 16 May 2019 06:05:54 GMT\r\n"
-> "Connection: keep-alive\r\n"
-> "Strict-Transport-Security: max-age=31536000\r\n"
-> "Content-Type: application/json\r\n"
-> "Content-Length: 193\r\n"
-> "X-Content-Type-Options: nosniff\r\n"
-> "Server: thin 1.6.2 codename Doc Brown\r\n"
-> "Via: 1.1 vegur\r\n"
-> "\r\n"
reading 193 bytes...
-> "{\"created_at\":\"2019-05-16 06:05:54 UTC\",\"valid_until\":\"2019-09-21 06:05:54 UTC\",\"verified\":false,\"created_from_ip\":\"119.98.250.95\",\"description\":null,\"token\":\"0e49fab2602874ee4a944318fd01d9d9\"}"
read 193 bytes
Conn keep-alive
[!] Please verify the session by clicking the link in the verification email that has been sent to yfmingo@163.com

# mingo @ 192 in ~/Desktop/AAAFleeming/MingoKit/FMMacroKit on git:master o [14:05:55]
$ pod trunk me
- Name:     Mingoy
- Email:    yfmingo@163.com
- Since:    July 21st, 2017 10:05
- Pods:
- PagingButton
- FMListPlaceholder
- FMBaseKit
- Sessions:
- July 21st, 2017 10:05 - November 26th, 2017 10:05. IP: 42.48.222.102
- July 21st, 2017 10:06 - November 26th, 2017 10:06. IP: 42.48.222.104
- July 21st, 2017 10:07 -  December 7th, 2017 20:58. IP: 42.48.222.100
- January 14th, 11:04   -           May 31st, 02:21. IP: 111.47.249.83
- May 15th, 00:18       -     September 20th, 00:20. IP: 119.98.250.95
- May 15th, 03:02       -     September 20th, 03:25. IP: 119.98.250.95
- May 15th, 03:31       -     September 20th, 03:35. IP: 119.98.250.95
- May 15th, 03:50       -     September 20th, 23:53. IP: 119.98.250.95
- May 15th, 23:57       -     September 20th, 23:57. IP: 119.98.250.95
- May 16th, 00:01       -     September 21st, 00:01. IP: 119.98.250.95
- May 16th, 00:03       -     September 21st, 00:04. IP: 119.98.250.95
- May 16th, 00:05       -     September 21st, 00:06. IP: 119.98.250.95

# mingo @ 192 in ~/Desktop/AAAFleeming/MingoKit/FMMacroKit on git:master o [14:06:38]
$ pod lib lint --no-clean --allow-warnings

-> FMMacroKit (1.0.0)

Pods workspace available at `/var/folders/c8/yg_qg7lx1rdb9pthfqfl5hf80000gn/T/CocoaPods-Lint-20190516-16798-1tjmwqr-FMMacroKit/App.xcworkspace` for inspection.

FMMacroKit passed validation.

# mingo @ 192 in ~/Desktop/AAAFleeming/MingoKit/FMMacroKit on git:master x [14:06:58]
$ git tag -a 1.0.0 -m 'r1.0.0'

# mingo @ 192 in ~/Desktop/AAAFleeming/MingoKit/FMMacroKit on git:master o [14:07:51]
$ git push origin --tags
Counting objects: 1, done.
Writing objects: 100% (1/1), 164 bytes | 164.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0)
To https://github.com/yfming93/FMMacroKit.git
* [new tag]         1.0.0 -> 1.0.0

# mingo @ 192 in ~/Desktop/AAAFleeming/MingoKit/FMMacroKit on git:master o [14:08:02]
$ pod trunk push FMMacroKit.podspec
Updating spec repo `master`

CocoaPods 1.7.0.rc.2 is available.
To update use: `sudo gem install cocoapods --pre`
[!] This is a test version we'd love you to try.

For more information, see https://blog.cocoapods.org and the CHANGELOG for this version at https://github.com/CocoaPods/CocoaPods/releases/tag/1.7.0.rc.2

Validating podspec
-> FMMacroKit (1.0.0)

Updating spec repo `master`

CocoaPods 1.7.0.rc.2 is available.
To update use: `sudo gem install cocoapods --pre`
[!] This is a test version we'd love you to try.

For more information, see https://blog.cocoapods.org and the CHANGELOG for this version at https://github.com/CocoaPods/CocoaPods/releases/tag/1.7.0.rc.2


--------------------------------------------------------------------------------
🎉  Congrats

🚀  FMMacroKit (1.0.0) successfully published
📅  May 16th, 00:09
🌎  https://cocoapods.org/pods/FMMacroKit
👍  Tell your friends!
--------------------------------------------------------------------------------

# mingo @ 192 in ~/Desktop/AAAFleeming/MingoKit/FMMacroKit on git:master o [14:09:57]
$

```
**注意：**

- xcode使用`CocoaPod`打包`framework`时，如果在.h文件中引入了其他第三方pod，打包时需要修改什么
    - 加参数：`--use-libraries` [【参考】](https://segmentfault.com/q/1010000006885674)
    
         pod lib lint xxx.podspec --use-libraries
         pod trunk push --use-libraries

#### 0x04 操作记录截图


![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/carbon.png)

<!--  {% endraw %}-->




