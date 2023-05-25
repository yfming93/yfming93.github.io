---
layout: post
title:  "远程异地adb调试并配置Android为kiosk霸屏"
date:   2023-05-25
author: "袁凤鸣"
excerpt: 

categories: 
    - apk
tags: 
    - apk 
mathjax: true

---
* content
{:toc}
---


# 远程异地adb调试并配置Android为kiosk霸屏

### 0x00 背景
- 公司有多个公园大屏的项目在其他外省城市，各大屏均采用`Android`系统。
- 这种室外大屏就必须达到霸屏的效果。整个设备开机启动只能霸屏显示我们的App。用户无法退出当前App，也不能进行其他操作。
- 同时还要满足，开机自启动App。断电重启设备后自启动App。凌晨定时重新启动App。远程控制启动App。
- 设备要常亮屏
- 霸屏效果，采用`Android`的kiosk。达到这效果踩了不少坑，后期开一篇文章讲解如何完美`kiosk`霸屏。








### 0x01 远程搭建区域网组网

- [参照B站的视频了解下zerotier，先进行异地组一个大局域网](https://www.bilibili.com/video/BV1hK4y1L7ND/?spm_id_from=333.788.recommend_more_video.-1&vd_source=105da3da61ce39bd0f662b7be9e104d8)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202305240916365.png)


下载 `Mac` 和 `Android` 端各自安装好后。都进入同一个局域网。操作期间，都必须保持各自端的 `zerotier` 客户端保持打开，并是连接状态是OK的

如下图就是  安卓端进如内网后配置好获取到的 内网 IP 地址 `192.168.192.59`，`Mac`端的内网地址是`192.168.192.128`
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/dap.png)

- 可以测试下，ping 安卓的内网IP。可以成功就进行后面流程。


### 0x02 安卓端配置

**前置条件：**
- [x] 需要安卓设备能进行 `WiFi` 联网。（没`WiFi`模组，就无法开启远程无线调试）
- [x] 需要安卓设备现场有人，开一个`WiFi`热点出来提供给安卓设备使用
- [x] 安卓端的 `zerotier` 加入局域网，保持App保活。
- [x] 安卓进入开发者调试模式。开启`USB`调试，开启`USB调试（安全设置）`等等。

**安卓端开发者模式中无线网络调试：**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202305240950411.png)

### 0x03 终端配置

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202305240945130.png)

**连接说明：**
- 没有配对的设备先要进行两端配对 `adb pair 192.168.192.59:33251`
    - IP 是内网 IP，不是安卓设备显示的IP。但是端口是安卓设备进行6位数对码出现的端口。
    - 如下是配对成后：![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202305241010441.png)
- 配对好后，进行 `adb connect 192.168.192.59:46281`
    - 此时 IP 是还是内网IP，但是端口是安卓设备无线调试页面中，`IP地址和端口`那一栏目显示出现的端口。
- 连接成功后。本地的电脑`Android Studio`就可以显示连接的安卓设备了。
- 设置设备管理者：

        adb shell dpm set-device-owner com.shidai.app.runway/com.kalemba128.flutter_kiosk_android.FlutterKioskAndroidPlugin
        
- 霸屏配置：`Block apps`，`Start Kiosk`，`Allow installing applications`
    - 后面单独开文，如果详细霸屏。

    
**<u>实测发现安卓热点和iPhone热点连接方式不一样</u>:**
- 如下是安卓开的热点：
    - 安卓手机开的热点，在对码配对这里显示的是`192.168`的IP地址，苹果是`172.20`地址。![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202305241025329.png)
    - 此时配对连接用 `zerotier`分发的内网`IP`-`192.168.192.59`无法连接，提示如下

        ```
        mingo@192 ~ % adb pair 192.168.192.59:36705   
        Enter pairing code: 943400
        Failed: Unable to start pairing client.
        mingo@192 ~ % adb pair 192.168.192.59:36705
        Enter pairing code: 943400
        Failed: Unable to start pairing client.
        mingo@192 ~ % adb pair 192.168.10.107:36705
        Enter pairing code: 943400
        Successfully paired to 192.168.10.107:36705 [guid=adb-eeedefbd7c2441d0-bRW0iu]
        mingo@192 ~ % adb connect 192.168.10.107:45617                   
        connected to 192.168.10.107:45617
        ```
        后尝试使用当前手机显示的 `192.168.10.107`进行配对和连接都成功了。



**其他注意：**
- `adb push /Users/mingo/Desktop/app-release.apk /data/local/tmp/`这里先把 apk 推送到 安卓设备指定文件夹。
- 后采用`adb shell pm install -r -t /data/local/tmp/app-release.apk`进行`adb`安装`apk`。
    - 这里是无法直接手动点击安装的，因为打包的`apk`中有	`android:testOnly="true"`标签。
    - 设置*`testOnly`*这个标签的目的是后期可以进行 `adb shell dpm remove-active-admin` 命令移除设备管理者，退出霸屏模式方便维护调试，否则只能刷机才能退出霸屏。不要搞得达到霸屏效果，结果自己都不能维护了。。
- 需要自己开发隐藏的调试工具，在`App`中某个隐藏的入口，触发调试工具进行开启和关闭`kiosk`霸屏，



-------------------
**详细操作记录：**
``` Dart
mingo@macdembp-2 ~ % adb pair 192.168.192.59:33251
Enter pairing code: 469301
Successfully paired to 192.168.192.59:33251 [guid=adb-eeedefbd7c2441d0-bRW0iu]
mingo@macdembp-2 ~ % adb connect 192.168.192.59:33251
failed to connect to '192.168.192.59:33251': Connection refused
mingo@macdembp-2 ~ % adb connect 192.168.192.59:46281
connected to 192.168.192.59:46281
mingo@macdembp-2 ~ % adb shell 
rk3568_mids:/ $ su                                                                                                     
su: setgid failed: Operation not permitted
1|rk3568_mids:/ $ sudo su
/system/bin/sh: sudo: inaccessible or not found
127|rk3568_mids:/ $ adb root        
/system/bin/sh: adb: inaccessible or not found
127|rk3568_mids:/ $ adb install -r /Users/mingo/Desktop/app-release.apk 
/system/bin/sh: adb: inaccessible or not found
127|rk3568_mids:/ $ %                                                                                                   mingo@macdembp-2 ~ % adb push /Users/mingo/Desktop/app-release.apk /data/local/tmp/
/Users/mingo/Desktop/app-release.apk: 1 file pushed, 0 skipped. 0.6 MB/s (56891298 bytes in 85.867s)
mingo@macdembp-2 ~ % adb shell pm install /data/local/tmp/app-release.apk
Failure [INSTALL_FAILED_TEST_ONLY: installPackageLI]
mingo@macdembp-2 ~ % adb shell -r -t /data/local/tmp/app-release.apk     
adb shell: illegal option -- r
mingo@macdembp-2 ~ % adb shell --r -t /data/local/tmp/app-release.apk
adb shell: illegal option -- -
mingo@macdembp-2 ~ % adb shell pm install -r -t /data/local/tmp/app-release.apk
Success
mingo@macdembp-2 ~ % adb shell dpm set-device-owner com.shidai.app.runway/com.kalemba128.flutter_kiosk_android.FlutterKioskAndroidPlugin
Success: Device owner set to package ComponentInfo{com.shidai.app.runway/com.kalemba128.flutter_kiosk_android.FlutterKioskAndroidPlugin}
Active admin set to component {com.shidai.app.runway/com.kalemba128.flutter_kiosk_android.FlutterKioskAndroidPlugin}
mingo@macdembp-2 ~ % 
```