---
layout: post
title:  "安卓手机或者苹果手机硬件设备信息"
date:   2021-03-23
author: "袁凤鸣"
excerpt: flutter

categories: 
    - Android 
    - iOS
tags: 
    - Android 
    - iOS
mathjax: true

---
* content
{:toc}
---





``` dart

 static void getDeviceInfo() async{
    DeviceInfoPlugin deviceInfo = new DeviceInfoPlugin();
    if(Platform.isIOS){
      IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
      await _readIosDeviceInfo(iosInfo);

    }else if(Platform.isAndroid){
      AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
      await _readAndroidBuildData(androidInfo);
    }
  }

 static Map<String, dynamic> _readAndroidBuildData(AndroidDeviceInfo build) {
    Map<String, dynamic> map=  <String, dynamic>{
      'version.securityPatch': build.version.securityPatch,//用户可见的安全补丁程序级别。仅在Android 6.0或更高版本上可用。
      'version.sdkInt': build.version.sdkInt,// API 级别是对 Android 平台版本提供的框架 API 修订版进行唯一标识的整数值。// https://developer.android.com/guide/topics/manifest/uses-sdk-element
      'version.release': build.version.release,// 用户可见的版本字符串。示例：Android10
      'version.previewSdkInt': build.version.previewSdkInt,// 开发人员预览版的预发行版SDK。
      'version.incremental': build.version.incremental,// 源码控制版本号 示例： C00B171
      'version.codename': build.version.codename,// 当前开发代号，或者字符串“REL”（如果是正式的发布版本） 示例： REL
      'version.baseOS': build.version.baseOS,// 基带版本 The base OS build the product is based on. 示例：空值
      'board': build.board,// 主板 示例：FRD-AL00
      'bootloader': build.bootloader,// 系统启动程序版本号 示例：unknown
      'brand': build.brand,// 系统定制商 示例：honor
      'device': build.device,// 设备参数 示例：HWFRD
      'display': build.display,// 用于向用户显示的构建ID字符串。示例：FRD-AL00C00B171
      'fingerprint': build.fingerprint,// 设备指纹（同样的新设备该值应该是一样的） 示例：honor/FRD-AL00/HWFRD:6.0/HUAWEIFRD-AL00/C00B171:user/release-keys
      'hardware': build.hardware,// 硬件的名称（从内核命令行或/ proc）。 示例：hi3650
      'host': build.host,// Hostname 示例：huawei-RH2288H-V2-12L
      'id': build.id,// 修订版本列表 示例：HUAWEIFRD-AL00
      'manufacturer': build.manufacturer,// 产品/硬件的制造商 示例：HUAWEI
      'model': build.model,// 最终用户可见名称。示例：FRD-AL00
      'product': build.product,// 整体产品的名称。 示例：FRD-AL00
      'supported32BitAbis': build.supported32BitAbis,// 支持32位ABIs的列表（数值）示例：[armeabi-v7a,armeabi]
      'supported64BitAbis': build.supported64BitAbis,// 支持64位ABIs的列表（数值）示例：[arm64-v8a]
      'supportedAbis': build.supportedAbis,// 支持ABIs的列表（数值）示例：[arm64-v8a,armeabi-v7a,armeabi]
      'tags': build.tags,// 描述Build的标签（Comma-separated tags describing the build, like "unsigned,debug".） 示例：release-keys
      'type': build.type,// 描述Build的类型（The type of build, like "user" or "eng".） 示例：user
      'isPhysicalDevice': build.isPhysicalDevice,// 是否是真实物理设备（真机或模拟器）
      'androidId': build.androidId, //设备唯一标识
      // 'systemFeatures': build.systemFeatures,
    };
    String str =  ConvertUtils.convert(map, 0); // map to json
    developer.log(str);
    return map;

  }

  static Map<String, dynamic> _readIosDeviceInfo(IosDeviceInfo data) {

    Map<String, dynamic> map=  <String, dynamic>{
      'name': data.name,// 手机名称（通用关于本机里显示的名称）示例：iPhone12
      'systemName': data.systemName,// 系统名称 示例： iOS
      'systemVersion': data.systemVersion,// 系统版本号 示例： iOS 14.3
      'model': data.model,// 设备型号的名称 示例：iPhone
      'localizedModel': data.localizedModel,// 设备型号的本地化名称 示例：iPhone
      'identifierForVendor': data.identifierForVendor, //设备唯一标识 示例：DB2E04F5-27D0-4101-8D53-F73CB0505DAD
      'isPhysicalDevice': data.isPhysicalDevice,// 是否是物理设备（真机或模拟器）示例：true
      'utsname.sysname:': data.utsname.sysname,// 操作系统名称。示例：Darwin
      'utsname.nodename:': data.utsname.nodename,// 网络上的节点名称。示例：iPhone12t
      'utsname.release:': data.utsname.release,// 当前发布级别  示例：20.2.0
      'utsname.version:': data.utsname.version,// 当前发布版本  示例：Darwin Kernel Version 20.2.0: Fri Nov 13 01:00:14 PST 2020; root:xnu-7195.62.1~4/RELEASE_ARM64_T8101
      'utsname.machine:': data.utsname.machine,// 当前硬件体系类型  示例： 'iPhone7,1' 这个就是 iPhone 6 Plus；'iPhone13,2'这个就是iPhone12
    };
    String str =  ConvertUtils.convert(map, 0); // map to json
    developer.log(str);
    return map;
  }
```

