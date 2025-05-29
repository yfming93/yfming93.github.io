---
layout: post
title:  "flutter 集成 Android 和 iOS 极光推送 JPush"
date:   2025-05-28
author: "袁凤鸣"
excerpt: 

categories: 
    - flutter
tags: 
    - dio 
    - JPush
mathjax: true

---
* content
{:toc}
---
## 0x000 背景 
最近`flutter`项目需要接入极光推送。接入过程中是艰难险阻一大堆。极光官网的文档都是`Android` 和 `iOS` 原生接入的文档。对于`flutter`的朋友接入太过艰难。官网勉强出了[jpush_flutter: ^3.2.7](https://pub.dev/packages/jpush_flutter)。但是文档也是草草敷衍。里面的`issues`一大堆，官方不管。
![官方issues](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281030385.png) 
遂经历艰难险阻后，故写这篇文章，以方便后续自己和其他的网友避坑。




## 0x001 接入前期准备。
 **有些接入基础前期准备，就不过多细嗦了。一笔带过。**
 - 极光平台 创建安卓和`iOS`应用 得到`AppKey`和 `Master Secret`
 - 申请各家安卓厂商的推送 `key`。每家的`key`不同，
     - 可参考极光文档申请：[https://docs.jiguang.cn/jpush/client/Android/android_3rd_param](https://docs.jiguang.cn/jpush/client/Android/android_3rd_param)
     申请后填入极光后台下图：
     ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281037867.png)
          
    -  **【注意坑】大多需要APP已经上线他们家的应用商店才能申请推送key**
部分厂商要求必须上架应用市场才可以正常使用推送服务，详情参考下表：

        <table>
        <thead>
        <tr>
        <th style="text-align:left">厂商通道</th>
        <th style="text-align:left">是否需要上架</th>
        <th style="text-align:left">说明</th>
        </tr>
        </thead>
        <tbody><tr>
        <td style="text-align:left">小米</td>
        <td style="text-align:left"><strong>是</strong></td>
        <td style="text-align:left">需要注册企业开发者账号，详见 <a href="/jpush/client/Android/android_3rd_param#%E5%B0%8F%E7%B1%B3%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96">小米参数获取</a>。</td>
        </tr>
        <tr>
        <td style="text-align:left">华为</td>
        <td style="text-align:left">否</td>
        <td style="text-align:left">个人开发者账号即可，详见 <a href="/jpush/client/Android/android_3rd_param#%E5%8D%8E%E4%B8%BA%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96">华为参数获取</a>。</td>
        </tr>
        <tr>
        <td style="text-align:left">魅族</td>
        <td style="text-align:left">否</td>
        <td style="text-align:left">个人开发者账号即可，详见 <a href="/jpush/client/Android/android_3rd_param#%E9%AD%85%E6%97%8F%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96">魅族参数获取</a>。</td>
        </tr>
        <tr>
        <td style="text-align:left">vivo</td>
        <td style="text-align:left"><strong>是</strong></td>
        <td style="text-align:left">需要注册企业开发者账号，详见 <a href="/jpush/client/Android/android_3rd_param#vivo-%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96">vivo 参数获取</a>。</td>
        </tr>
        <tr>
        <td style="text-align:left">OPPO</td>
        <td style="text-align:left"><strong>是</strong></td>
        <td style="text-align:left">需要注册企业开发者账号，详见 <a href="/jpush/client/Android/android_3rd_param#oppo-%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96">OPPO 参数获取</a>。</td>
        </tr>
        <tr>
        <td style="text-align:left">FCM</td>
        <td style="text-align:left">否</td>
        <td style="text-align:left">个人开发者账号即可，详见 <a href="/jpush/client/Android/android_3rd_param#fcm-%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96">FCM 参数获取</a>。</td>
        </tr>
        <tr>
        <td style="text-align:left">荣耀</td>
        <td style="text-align:left">否</td>
        <td style="text-align:left">需要注册企业开发者账号，详见 <a href="/jpush/client/Android/android_3rd_param#%E8%8D%A3%E8%80%80%E5%8F%82%E6%95%B0%E8%8E%B7%E5%8F%96">荣耀参数获取</a>。</td>
        </tr>
        </tbody></table>
    
- 在[极光厂商接入文档](https://docs.jiguang.cn/jpush/client/Android/android_3rd_guide#vivo-%25E9%2580%259A%25E9%2581%2593%25E9%259B%2586%25E6%2588%2590%25E6%258C%2587%25E5%258D%2597)下载极光原生SDk备用，当前是5.7.0版本
 ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281419604.png)
     
## 0x002 接入代码
### 安卓代码
 - 在`flutter` 项目先集成 [jpush_flutter: ^3.2.7](https://pub.dev/packages/jpush_flutter)。执行 `flutter pub get`
 - 在`App`下的`build.gradle`中添加上面获取的各个厂商`key`
     - 红框的不需要我忘记删除了，绿框的就刚刚下载备用的原生SDK的example中demo中的`libs`下的
     ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281616506.png)
 - 还有` id "com.huawei.agconnect"`。
      - 一些老的资料可能会是`apply plugin: 'com.huawei.agconnect' `这个在高版本`gradle`过时了会报错。
     ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281428323.png)
       
### `App`下的`build.gradle`中`dependencies`
 ``` gradle
 dependencies {
    implementation fileTree(include: ['*.jar',"*.aar"], dir: 'libs')
//    implementation(name: 'HiPushSdk-v8.0.12.307', ext: 'aar')
    // only for demo
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    implementation 'com.google.android.material:material:1.2.1'
    implementation 'org.conscrypt:conscrypt-android:2.2.1'
    implementation 'androidx.multidex:multidex:2.0.1'
    implementation 'com.hjq:toast:8.8'
    implementation 'com.github.CymChad:BaseRecyclerViewAdapterHelper:3.0.4'
    implementation 'com.tencent:mmkv-static:1.2.4'
    
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.1.4'
    implementation 'androidx.localbroadcastmanager:localbroadcastmanager:1.1.0'
    implementation 'cn.jiguang.sdk:jpush:5.7.0'
    implementation 'cn.jiguang.sdk:jcore:4.9.1'
    
    implementation 'com.huawei.hms:push:6.12.0.300'  // 华为 HMS Push SDK
    implementation 'cn.jiguang.sdk.plugin:huawei:5.7.0'  // 极光华为通道插件
    implementation 'com.huawei.agconnect:agconnect-core:1.8.0.300' // 核心库
    
    
    implementation 'cn.jiguang.sdk.plugin:xiaomi:5.7.0'
    implementation 'cn.jiguang.sdk.plugin:oppo:5.7.0'
    implementation 'cn.jiguang.sdk.plugin:vivo:5.7.0'
    implementation 'cn.jiguang.sdk.plugin:honor:5.7.0'
    //厂商版本和 JPush SDK 版本保持一致
//    implementation 'cn.jiguang.sdk.plugin:huawei:5.7.0'
    
    implementation 'com.google.code.gson:gson:2.6.2'
    implementation 'commons-codec:commons-codec:1.6'
    implementation 'androidx.annotation:annotation:1.1.0'
}
 ```

### `android`下`build.gradle`的`dependencies`

 ```
 buildscript {
    ext.kotlin_version = '1.9.24'
    repositories {
        google()
        mavenCentral()
        maven {url 'https://developer.huawei.com/repo/'}
        maven {url 'https://developer.hihonor.com/repo'}
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'https://maven.aliyun.com/repository/public' }
    }
    
    dependencies {
        classpath 'com.android.tools.build:gradle:8.8.0'
        classpath 'com.huawei.agconnect:agcp:1.9.1.301' // 确保版本与 HMS SDK 兼容
    
//        classpath 'com.google.gms:google-services:4.3.14'
//        classpath 'com.huawei.agconnect:agcp:1.6.0.300'
//        classpath 'com.hihonor.mcs:asplugin:2.0.1.300'
    }
}  
allprojects {
    repositories {
//        google()
//        mavenCentral()
//        maven {url 'https://developer.huawei.com/repo/'}
//        maven {url 'https://developer.hihonor.com/repo'}
        mavenCentral()
//        maven { url "https://mirrors.tencent.com/nexus/repository/maven-public/" }
        // 配置HMS Core SDK的Maven仓地址。
        maven {url 'https://developer.huawei.com/repo/'}
        maven {url 'https://developer.hihonor.com/repo'}
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url "https://maven.jiguang.cn/repository/public" }
    }
}
// This is updated Code .
 rootProject.buildDir = "../build"
    
subprojects {
    afterEvaluate {
        if (it.hasProperty('android')) {
            it.android.compileSdkVersion = 35
            it.android.defaultConfig.targetSdkVersion = 35
            it.android.compileOptions.sourceCompatibility = JavaVersion.VERSION_21
            it.android.compileOptions.targetCompatibility = JavaVersion.VERSION_21
            tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).configureEach {
                kotlinOptions.jvmTarget = JavaVersion.VERSION_21
            }
            if (it.android.namespace == null) {
                def manifest = new XmlSlurper().parse(file(it.android.sourceSets.main.manifest.srcFile))
                def packageName = manifest.@package.text()
                android.namespace = packageName
                println("Updating namespace ${packageName}")
            }
        }
    }
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
    
tasks.register("clean", Delete) {
    delete rootProject.buildDir
}    
```
     
 - 还有华为和荣耀的`services.json`离线文件，都放在 `res`同级目录
 - 混淆`proguard-rules.pro`按照[极光厂商配置代码混淆的文档](https://docs.jiguang.cn/jpush/client/Android/android_3rd_guide)进行配置。
     
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281436491.png)
    
## flutter 端的推送代码

- 以下`AppKey.appKeyJPush`就是极光申请的key。
- 有个文件`app_export.dart`，`im_talk.dart`，`im_chat_page.dart`，`im_socket.dart`，`kit_view.dart`,`ImSocket`都是我的业务文件。你复制过去报错删除即可。

``` dart
// 接入文档 https://github.com/jpush/jpush-flutter-plugin
// https://github.com/jpush/jpush-flutter-plugin/blob/master/documents/APIs.md
// 各厂商集成参考 https://docs.jiguang.cn/jpush/client/Android/android_3rd_guide
// import 'package:jpush_flutter/jpush_flutter.dart';
    
import 'dart:developer';
import 'package:app/core/app_export.dart';
import 'package:app/models/im/im_talk.dart';
import 'package:app/pages/im/im_chat_page.dart';
import 'package:app/pages/im/im_socket.dart';
import 'package:app/widgets/kit_view.dart';
import 'package:jpush_flutter/android_ios/jpush_flutter_a_i.dart';
import 'package:jpush_flutter/jpush_interface.dart';
import '../core/app_key.dart';
    
class AppPush {
  static AppPush? _instance;
  AppPush._internal() {
    _instance = this;
    jpush =  JPush_A_I();
  }
  factory AppPush() => _instance ?? AppPush._internal();   ///判空符??
    
  late JPush_A_I jpush;
    
  Future<void> init() async {
    logs('---dao.token--${dao.token}');
    // if (dao.token.isEmpty) return;
    // 之前提审因为极光被拒，就操作提审日之后延迟5天才初始化极光。现在不需要了
    // var t1 = DateTime.tryParse(Env.time);
    // logs('---t1--$t1');
    // var t2 = DateTime.now();
    // if(t1 != null) {
    //   if(t2.difference(t1).inDays <= 5) {
    //     return;
    //   }
    // }
    
    jpush.addEventHandler(
      // 接收通知回调方法。
      onReceiveNotification: (Map<String, dynamic> message) async {
        // logs("----jpush-onReceiveNotification: $message");
        logs('--jsonDecode--:${jsonEncode(message)}');
      },
    
      // onConnected: (Map<String, dynamic> message) async {
      //   logs("----jpush-onConnected: $message");
      // },
      // onReceiveNotificationAuthorization: (Map<String, dynamic> message) async {
      //   logs("----jpush-onReceiveNotificationAuthorization: $message");
      // },
      // onInAppMessageShow: (Map<String, dynamic> message) async {
      //   logs("----jpush-onInAppMessageShow: $message");
      // },
      // onNotifyMessageUnShow: (Map<String, dynamic> message) async {
      //   logs("----jpush-onNotifyMessageUnShow: $message");
      // },
      // 点击通知回调方法。
      onOpenNotification: (Map<String, dynamic> message) async {
        //     {alert: 推送内容2, extras: {cn.jpush.android.ALERT_TYPE: 7, cn.jpush.android.NOTIFICATION_ID: 518325105, cn.jpush.android.MSG_ID: 18100827735900274, cn.jpush.android.ALERT: 推送内容2, cn.jpush.android.EXTRA: {"route_path":"\/problems"}}, title: 推送标题2}
        logs('----jpush-onOpenNotification-:$message');
        jpush.setBadge(0);
        Future.delayed(Duration(milliseconds: 1000),(){
          _do_message(message);
        });
      },
      // 接收自定义消息回调方法。
      onReceiveMessage: (Map<String, dynamic> message) async {
        logs("----jpush-onReceiveMessage: $message");
      },
    );
    // jpush.setup(appKey: AppKey.appKeyJPush, channel: Env.channel, production: Env.indexUrl == 0, debug: isDebug,);
    jpush.setup(appKey: AppKey.appKeyJPush, channel: '', production: true, debug: true,);
    jpush.applyPushAuthority(const NotificationSettingsIOS(sound: true, alert: true, badge: true));
    jpush.setAuth(enable: true);
    if(user.info.mobile.isNotEmpty) jpush.setAlias(user.info.mobile);
    jpush.getRegistrationID().then((rid) {
      AppRun().registration_id = rid;
      log('---registration_id--$rid');
    });
    jpush.isNotificationEnabled().then((bool value) {
      print("通知授权是否打开: $value");
      if (!value) {
        Get.snackbar(
          "提示",
          "没有通知权限,点击跳转打开通知设置界面",
          duration: const Duration(seconds: 6),
          onTap: (_) {
            jpush.openSettingsForNotification();
          },
        );
      }
    }).catchError((onError) {
      print("通知授权是否打开: ${
          onError.toString()}");
    });
    jpush.enableAutoWakeup(enable: true);
    if(isAndroid) jpush.setWakeEnable(enable: false);
  }
    
  Future<void> _do_message(Map<String, dynamic> message) async {
    // 业务字段都在 extras下的cn.jpush.android.EXTRA 中。
    var  msg ;
    if (isAndroid) msg = message['extras']['cn.jpush.android.EXTRA'];
    if (isIOS)  msg = message['extras'];
    logs('--map-msg-:${jsonEncode(msg)}');
    
    ImTalkItems mo = ImTalkItems.fromJson(Map<String, dynamic>.from(msg));
  }
}

```    
         
- 一些文档
    
    [https://github.com/jpush/jpush-flutter-plugin](https://github.com/jpush/jpush-flutter-plugin)
    [https://github.com/jpush/jpush-flutter-plugin/blob/master/documents/APIs.md](https://github.com/jpush/jpush-flutter-plugin/blob/master/documents/APIs.md)

    [各厂商集成参考 ](https://docs.jiguang.cn/jpush/client/Android/android_3rd_guide)
    
## 0x003 试运行了
 
 经过上面步骤。可以试运行了。运行后发现在`jpush.getRegistrationID()`得到了`registration_id`。
 
 没座。![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281506170.png)![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281507139.png)
 得到的`registration_id`就是当前设备的唯一标识。欣喜若狂。去极光后台控制台操作推送。
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281503144.png)
呀呀呀，APP成功收到了消息。激动万分。

然而。![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281510065.png)
少年还是太年轻了。缺少社会的鞭打，极光怎么会让你这么容易就搞成呢。发个问题都不叼的人。。
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281508493.png)

这只是第一步。下面开始介绍各种坑了。

## 0x004 整个过程遇到的坑专辑
 
### 坑1：极光的初始化需要在Android端完成。在Dart端完成初始化会在提审的时候被各家安卓拒审
  原因如下：[https://github.com/jpush/jpush-flutter-plugin/issues/494](https://github.com/jpush/jpush-flutter-plugin/issues/494%0A)
 
 ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281515226.png)
     
 我的解决是：在安卓`MainActivity`中
     
     
    ``` Kotlin
    package com.xxx.app
    import android.annotation.TargetApi
    import android.app.ActivityManager
    import android.graphics.BitmapFactory
    import android.graphics.Color
    import android.os.Build
    import android.os.Bundle
    import android.widget.Toast
    import cn.jiguang.api.utils.JCollectionAuth
    import cn.jpush.android.api.JPushInterface
    import app包名.nsp.R
    import io.flutter.embedding.android.FlutterActivity
    import io.flutter.embedding.engine.FlutterEngine
    import io.flutter.plugin.common.MethodChannel
    import java.util.Timer
    import kotlin.concurrent.schedule
        
    class MainActivity: FlutterActivity() {
        private val CHANNEL = "flutter.app.method.plugin"
        
    //    lateinit var resultCallback: MethodChannel.Result;
        
        override fun onStart() {
            super.onStart()
        
    //        https://github.com/jpush/jpush-flutter-plugin/issues/383
            JCollectionAuth.setAuth(context, false);
        
        }
        
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
        
            Timer("ChangingTaskDescriptionColor", false).schedule(1000) {
                val taskDescription: ActivityManager.TaskDescription =
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                        //android 9.0
                        setTaskDescriptionP()
                    } else {
                        setTaskDescriptionBeforeP()
                    }
                setTaskDescription(taskDescription)
            }
        
        }
        
        override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
            super.configureFlutterEngine(flutterEngine)
            MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
    //            resultCallback = result;
    //            resultCallback.success("Android 调用成功")  ;
                if (call.method == "AppMethod") {
    //                showToast("Flutter 调用了通道: ${call.arguments as String}")
                    System.out.println("channel=1==" + call.arguments.toString())
    
                    JPushInterface.init(this)
                    JPushInterface.setDebugMode(false)
                    JCollectionAuth.setAuth(context, true)
                    result.success("Android ${call.arguments}")
                } else {
                    result.notImplemented()
                }
            }
        }
        
        private fun showToast(message: String) {
            Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
        }
        
        // 和推送无关，适配华为提审被拒：APP后台看不见图标和APP名称
        private fun setTaskDescriptionBeforeP(): ActivityManager.TaskDescription {
            val bitmapIcon = BitmapFactory.decodeResource(resources, R.mipmap.ic_launcher)
            return ActivityManager.TaskDescription("APP名称", bitmapIcon, Color.RED)
        }
        
        // 和推送无关，适配华为提审被拒：APP后台看不见图标和APP名称
        @TargetApi(Build.VERSION_CODES.P)
        private fun setTaskDescriptionP(): ActivityManager.TaskDescription {
            return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                ActivityManager.TaskDescription.Builder().setLabel("APP名称")
                    .setIcon(R.mipmap.ic_launcher)
                    .setPrimaryColor(Color.RED).build()
            } else ActivityManager.TaskDescription("APP名称", R.mipmap.ic_launcher, Color.RED)
        
        }
    }
    ```
     
在`onStart`中先`JCollectionAuth.setAuth(context, false);`。初始化但不验证。还要写flutter和原生交互方法（不会自己去学）。然后等用户在`APP`在`flutter` 端用户点击同意隐私协议后，进行和原生安卓交互，回调到原生安卓，重新初始化极光，如上重新初始化核心代码就这三行。在上面整个文件中也有。
         
    JPushInterface.init(this)
    JPushInterface.setDebugMode(false)
    JCollectionAuth.setAuth(context, true)

**如果学不会flutter原生交互就看我封装的app_native.dart**
``` dart
import 'package:app/core/app_export.dart';
import 'package:app/https/env.dart';

class AppNative{
  static const methodChannel = "flutter.app.method.plugin";
  static const methodApp = "AppMethod";
  static const methodChannelToNative = MethodChannel(AppNative.methodChannel); //和App原生对应
  static const return_channel = "RETURN_CHANNEL"; //和安卓原生对应

  // 实现监听 安卓原生那边 传过来的值
  static Future<dynamic> platformCallHandler(MethodCall call) async {

    switch (call.method) {
      case AppNative.return_channel:
        var realest = call.arguments;//获取安卓穿过来的值
        break;
    }
  }

  // 异步方法
  static Future<Null> sendToNative() async{
      // Map<String,dynamic> map = {"isAgreePrivacy":dao.check,"channel":Env.channel};
    // 跳转并传递数据
    var result = await methodChannelToNative.invokeMethod(methodApp,Env.channel);
    // 打印原生返回的参数
    logs('---result--$result');
    return null;
  }
}
```

`sendToNative` 在用户点击同意隐私协议后调用。

### 坑2：前面提到的获得了registration_id 仅是集成了极光的flutterSDK，没有集成厂商推送通道。
 
 - 这个会导致：只有在APP打开的时候才能收到推送。下次冷启动后上次没收到的消息就会过来（默认一天离线等待时间），这是极光通道保存的离线消息过来了。因为没有集成厂商通道，在APP离线的时候不能及时收到推送消息。

### 坑3：没有开通极光会员。调试排查的机会都没有。
 红框这些都是需要会员才能操作的。记得之前集成原生iOS的时候都是免费使用的。现在飘了不付费都不好调试。
 ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281541679.png)
 可以联系极光销售人员，给7天的试用会员接入调试。（建议合理时期申请，在前期各个厂商的key申请好了。而且[厂商消息分类](https://docs.jiguang.cn/jpush/client/Android/android_channel_id)完成后，可以申请试用会员针对目前配置好的厂商做下推送测试）
 
### 坑4：OPPO错误码:67--分类错误(包含强提醒所有异常)。
  
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281551728.png)
    
 解决：可以参考文档看看
[https://go48pg.yuque.com/go48pg/pa41sm/fytwgsthan0o4d0x](https://go48pg.yuque.com/go48pg/pa41sm/fytwgsthan0o4d0x)
注意：旧通道配置并不表示已经申请消息分类成功，同时还需要发邮件给oppo官方，等待邮件审核通过后并且配置旧通道才表示申请消息分类成功，可以正常使用不受限的服务类消息，服务端需要配置的字段是`channel_id`（如果使用的是旧版消息分类，`category` 和`notify_level` 一定不要配置！！！！），仔细看上面文档解决。

最终审核通过了。我的是IM及时通讯。需要后台推送接口配置如下。最终才能收到离线推送消息。

    "oppo": {
        "channel_id": "push_oplus_category_service",
        "category": "IM",
        "notify_level": 2
    },

### 坑5：无厂商token:就是没有集成成功。仅集成了极光端，没有集成厂商通道，不能离线推送消息。
 
 ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281554917.png)
 
 - 如图右下角红框也验证了。无厂商`token`，下次`APP`启动时候得到的消息其实还是极光推送过来的，不是厂商的推送的。
 -  无厂商`token`:就是没有集成成功。需要在[厂商通道集成指南](https://docs.jiguang.cn/jpush/client/Android/android_3rd_guide)的每个厂商的集成结果判断一直才是集成了厂商通道。

-  如下才是集成厂商通道的标志性打印信息
    
        红米测试手机registration_id--100d855908726892cf6
        00:23:31.674 [XMPlatformsReceiver] [key-step]xiao mi push register success
        00:23:31.674 [okhttp] e:java.lang.ClassNotFoundException: com.mediatek.cta.CtaUtils
        00:23:31.675 [ThirdPushManager] uploadRegID regid:8eRWchmNchDDAy2XCKUNVlrhDFB74yPUdOUrc+F7HU6pwJoZa0KV6ghLcAq/ZHbJ
        
         荣耀20pro YAL AL10..是华为推送registration_id--1a0018970b9fbbb998e
        get huawei token:IQAAAACy1K-FAADtvROjjqcxf1fTCqvHiBvTCnraNSt7zzJrPgXJTG5iErmX68Os7u7WvYsiLd7D9XptTUqJCm2pP87x0sw7dj9i2sqQ1O_qUCVi_g
        
        荣耀平板-registration_id--13065ffa4f2bec9adf1
        get honor token success:BAEAAAAAB.jpj3KupmXF2GpUHjdbRQ9x9M7hrEhX2jxzYR2qiGcOk0Q5oIppeEADelcV8e8IzYPd8Yt7qTdsrvosXRQ9grX_4L8-fMqaKnzXVuBjnDBohBZIs7XAtMCk
        uploadRegID regid:BAEAAAAAB.jpj3KupmXF2GpUHjdbRQ9x9M7hrEhX2jxzYR2qiGcOk0Q5oIppeEADelcV8e8IzYPd8Yt7qTdsrvosXRQ9grX_4L8-fMqaKnzXVuBjnDBohBZIs7XAtMCk
        
        iPhone12-registration_id--171976fa8bb960b843e
        ab6f8b13b0b81d8aea79957d61ff36c54280e9a47e970491a795fde0b14b539f
     
### 坑6：集成华为的时候报错：907135000
  
     doExecute, uri:push.gettoken, errorCode:907135000, transactionId:000000000ttoken20250527162637237540687

**日志报错907135000，参考这个文档排查解决**
[https://go48pg.yuque.com/go48pg/pa41sm/cge57f](https://go48pg.yuque.com/go48pg/pa41sm/cge57f)

### 坑7：然后又 get huawei token error:6003: certificate fingerprint error
 **《错误码：6003》**
 https://go48pg.yuque.com/go48pg/pa41sm/xi17ah?singleDoc# 
 
### 坑8:  mac 无法查看 查看签名的SHA256
  你在坑7 这一步时候可能不是和文档那样顺利。
  
  ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281601517.png)
  比如我是这样的：
  ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281602187.png)
  看到这样，顿时劳资猫当丁就不想说话了。
  ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281604471.png)
  
  接着查资料知道是非`JDK8`，高版本的就会这样。于是曲线救国。找到网友封装的`SignaturesUtils.java`
  
``` java
package app包名;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SignaturesUtils {
    private static final String TAG = SignaturesUtils.class.getSimpleName();

    private static byte[] getSignBytes(Context context) {
        try {
            PackageManager pm = context.getPackageManager();
            PackageInfo packageInfo = pm.getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES);
            return packageInfo.signatures[0].toByteArray();
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }

    public static String getMD5(Context context) {
        try {
            byte[] sig = getSignBytes(context);
            // MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            String md5 = bytesToHex(md.digest(sig));
            Log.i(TAG, "getMD5=" + md5);
            return md5;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getSHA1(Context context) {
        byte[] sig = getSignBytes(context);
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            String sha1 = bytesToHex(md.digest(sig));
            Log.i(TAG, "getSHA1=" + sha1);
            return sha1;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getSHA256(Context context) {
        byte[] sig = getSignBytes(context);
        try {
            // SHA-256
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            String sha256 = bytesToHex(md.digest(sig));
            Log.i(TAG, "getSHA256=" + sha256);
            return sha256;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

}
```

利用如上`getSHA256`获取，自己分割冒号，填入华为后台。（其实荣耀后台也要填 这个 SHA256）。最好测试的也填进去。

获取测试环境的`SHA256`代码如下，Mac终端测试的咋又是可以获取到。
    
    keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
    
**特别注意：**
**指纹配置成功后大约10分钟左右生效，请您耐心等待。**。这里坑了我配置了无效了质疑自己半天。

### 坑9:  并不是所有荣耀手机都走荣耀推送。
  
  这个是荣耀官网所述支持的设备：[https://developer.honor.com/cn/docs/11002/guides/introduction](https://developer.honor.com/cn/docs/11002/guides/introduction)
  ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281612175.png)
  
  我的荣耀20pro，走的是华为推送。
  
### 坑10:   离线推送，消息到了通知栏，点击通知栏拉不起来APP。
   
    当安卓端app程序处于后台时，通知收到了，点击通知无法成功把app拉回前台。
    杀死APP离线通知可以收到了，点击通知无法成功把app拉起冷启动
    
参考原生配置文档：
[https://docs.jiguang.cn/jpush/practice/intent](https://docs.jiguang.cn/jpush/practice/intent)
联系后台推送接口配置

    "intent": {
        "url": "intent:#Intent;action=android.intent.action.MAIN;end"
    },
    
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281632423.png)

### 坑11:  推送消息处理。安卓和iOS的不一样
   
   
``` dart
  // 点击通知回调方法。
onOpenNotification: (Map<String, dynamic> message) async {
    //     {alert: 推送内容2, extras: {cn.jpush.android.ALERT_TYPE: 7, cn.jpush.android.NOTIFICATION_ID: 518325105, cn.jpush.android.MSG_ID: 18100827735900274, cn.jpush.android.ALERT: 推送内容2, cn.jpush.android.EXTRA: {"route_path":"\/problems"}}, title: 推送标题2}
    logs('----jpush-onOpenNotification-:$message');
    jpush.setBadge(0);
      // 业务字段都在 extras下的cn.jpush.android.EXTRA 中。
    var  msg ;
    if (isAndroid) msg = message['extras']['cn.jpush.android.EXTRA'];
    if (isIOS)  msg = message['extras']; 
 },
      
```
   
### 坑12:  APP 的极光SDK有生产环境和测试环境，后台接口也有生产环境和测试环境

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281637464.png)
 - 两端的环境要一样。之前后台接口都是一直是生产环境调试的。
 - `iOS`是`AppStore`的才是生产环境，非`AppStore`的就是测试环境。之前跑真机调试（测试环境）接口一直是生产环境，导致推送消息不成功。
 ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505291507807.png)

### 坑13:  一定需要后台出一个测试推送的接口。不然不好及时触发推送调试。
   - 推送的测试接口需要返回`msg_id`。`msg_id`和`registration_id`可以在开会员后在极光后台排查问题。
   
### 坑14:  厂商消息分类完成后，才可以针对目前配置好的厂商做下推送测试
   
   去各家厂商后台申请厂商消息分类：得到如下

    ``` JSON
    {
        "options": {
            "classification": 1,
            "third_party_channel": {
                "xiaomi": {
                    "channel_id": "xxx"
                },
                "huawei": {
                    "importance": "NORMAL",
                    "category": "IM"
                },
                "oppo": {
                    "channel_id": "IM",
                    "category": "IM",
                    "notify_level": 16
                },
                "vivo": {
                    "distribution": "secondary_push",
                    "category": "IM"
                },
                "honor": {
                    "importance": "NORMAL"
                }
            }
        }
    }
    ```

   如下是后台按照我申请配置的厂商消息分类：
   
    class := 1
     options := &push.Options{
      Classification: &class,
      ThirdPartyChannel: &push.ThirdPartyChannel{
       Xiaomi: &push.ThirdPartyChannelOptions{
        ChannelID: "xxx",
       },
       Huawei: &push.ThirdPartyChannelOptions{
        Importance: "NORMAL",
        Category:   "IM",
       },
       OPPO: &push.ThirdPartyChannelOptions{
        ChannelID:   "IM",
        Category:    "IM",
        NotifyLevel: 16,
       },
       Vivo: &push.ThirdPartyChannelOptions{
        Distribution: "secondary_push",
        Category:     "IM",
       },
       Honor: &push.ThirdPartyChannelOptions{
        Importance: "NORMAL",
       },
      },
     }
     
 厂商消息分类使用指南    
 [https://docs.jiguang.cn/jpush/client/Android/android_channel_id](https://docs.jiguang.cn/jpush/client/Android/android_channel_id)

### 坑15:  需要和后台约定，每次APP登录后，需要把得到的极光`registration_id`存到用户表。

- `registration_id`处理逻辑。：
    - 每次登录，在登录接口一起上报`registration_id`给后台，后台拿到覆盖更新当前用户的`registration_id`字段。用于当前用户触发业务消息需要推送时候找到设备id。


### 坑16:  build.gradle 中的各厂商SDK的版本号码需要和jpush_flutter 对应一致。
比如查jpush_flutter 3.2.7源码知道对应的是

    implementation ('cn.jiguang.sdk:jpush:5.7.0'){
        exclude group: 'cn.jiguang.sdk', module: 'jcore'//会自动把jcore剔除
    }
    implementation 'cn.jiguang.sdk:jcore:4.9.1'
    
那`build.gradle` 中都是`5.7.0`版本

    implementation 'com.huawei.hms:push:6.12.0.300'  // 华为 HMS Push SDK
    implementation 'cn.jiguang.sdk.plugin:huawei:5.7.0'  // 极光华为通道插件
    implementation 'com.huawei.agconnect:agconnect-core:1.8.0.300' // 核心库
    
    
    implementation 'cn.jiguang.sdk.plugin:xiaomi:5.7.0'
    implementation 'cn.jiguang.sdk.plugin:oppo:5.7.0'
    implementation 'cn.jiguang.sdk.plugin:vivo:5.7.0'
    implementation 'cn.jiguang.sdk.plugin:honor:5.7.0'

并不是原生SDK文档中对应的版本
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281747025.png)    

### 坑17:  小米 错误码:27001--channel相关信息不匹配

小米 27001#invalid channel info!
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281757995.png)

服务端推送时AndroidNotificationXiaomiChannel参数是否正确配置， 小米开放平台消息渠道是否成功申请。[https://dev.mi.com/console/doc/detail?pId=2422#_2](https://dev.mi.com/console/doc/detail?pId=2422#_2)

申请后 回到 `坑14 ` 让后台接口配置

    "xiaomi": {
        "channel_id": "xxx"
    },
                
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505281758879.png)

### 坑18:  小米需要在 AndroidManifest 的 `application`标签下添加配置


    <!--        xiaomi start-->
    <receiver
        android:name="cn.jpush.android.service.PushReceiver"
        android:exported="true"
        tools:node="replace"
        android:enabled="false">
        <intent-filter android:priority="1000">
            <action android:name="cn.jpush.android.intent.NOTIFICATION_RECEIVED_PROXY" />
            <!--Required  显示通知栏 -->
            <category android:name="${applicationId}" />
        </intent-filter>
    </receiver>
    <!--        xiaomi end-->
    
### 坑19:  荣耀需要在 AndroidManifest 的 `application`标签下添加配置    

    //Honor所需要的权限
      <queries>
         <intent>
             <action android:name="com.hihonor.push.action.BIND_PUSH_SERVICE" />
         </intent>
     </queries>
     <application>
         <service
             android:name="cn.jpush.android.service.JHonorService"
             android:exported="false">
             <intent-filter>
                 <action android:name="com.hihonor.push.action.MESSAGING_EVENT" />
             </intent-filter>
         </service>
 
         <meta-data
             android:name="com.hihonor.push.app_id"
             android:value="您的应用对应的Honor的APP ID" />
     </application>
     
### 坑20:  华为收到离线推送，点击拉起APP报错
 
>      A GlobalKey was used multiple times inside one widget's child list. The offending GlobalKey was： ［Label edGlobalKey<NavigatorState>#55a59］ The parent of the widgets with that key was：
>     
>     _FocusInheritedScope The first Child to get instantlated with that key became：
>     
>     Navigator-［LabeledGlobalKey<Navig atorState>#55a59］
>     The second child that was to be instantiated with that key was： FocusInheritedScope A GlobalKey can only be specified on one widget at a time in the widget tree.
>     See also: https://docs.flutter.dev/ testing/errors
    
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505291152990.png)

看到这真的把劳资搞麻木了。

遂根据报错信息。找到资料如下：
[https://stackoverflow.com/questions/78526585/a-globalkey-was-used-multiple-times-in-my-flutter-project](https://stackoverflow.com/questions/78526585/a-globalkey-was-used-multiple-times-in-my-flutter-project)

按照资料提示设置

    unknownRoute: GetPage(
      name: "/splash",
      page: () => SplashView(),
      binding: SplashBinding(),
    ),
    
然鹅，对我没有卵用，还是报错。最终思考应该是启动初始化 Getx的时候报错。
故尝试屏蔽
    
    // getPages: AppPages.pages,    
    
解决了问题。


### 坑21: 桌面logo角标设置
 
[看文档解决：https://docs.jiguang.cn/jpush/practice/set_badge](https://docs.jiguang.cn/jpush/practice/set_badge)
 
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505291438798.png)

需要Android原生配置一波，按照文档配置即可。
需要后台接口配置：

    //服务端发送 json 消息串
    {
        "notification": {
            "android": {
                "alert": "hello, JPush!",
                "badge_add_num": 1, //角标增加值，取值范围1-99
                "badge_set_num": 1, //角标固定值，取值范围0-99
                "badge_class": "com.test.badge.MainActivity", //默认为 APP 的主 Activity
            }
        }
    }

关键是
    
    "badge_class": "app包名.MainActivity", //默认为 APP 的主 Activity

### 坑22:  小米角标 无效。需要人工开启才生效。

> 小米角标
> 小米 MIUI 6 及以上设备支持数字角标，小米系统自动处理数字角标展示功能，默认收到通知+1处理，打开 App 清零。

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202505291518689.png)

**总结，遇坑填坑，多看文档，有的文档良心介绍了注意事项可以闭坑。遇到报错，根据报错信息多思考。**