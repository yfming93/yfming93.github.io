---
layout: post
title:  "flutter 版本的安卓项目友盟移动统计官方 umeng_common_sdk 的坑"
date:   2021-06-03
author: "袁凤鸣"
excerpt: flutter 版本的安卓项目友盟移动统计官方 umeng_common_sdk 的坑

categories: 
    - Android 
    - flutter
tags: 
    - Android 
    - flutter
mathjax: true

---
* content
{:toc}
---


## 0x001 坑01

生产环境的 页面统计数据只能显示昨天的，或者以前的某一周。不能显示自然日。
![](https://i.loli.net/2021/06/03/saTvyiKqXRkr2QA.png)

## 0x002 坑02
必须要把版本管理都加上采集中。不加测试和生产都统计不到。
![](https://i.loli.net/2021/06/03/osb9c4hlNqJLYCH.png)

## 0x003 坑03
官方获取安卓的测试机id不好用。
 
 - 在安卓项目工程文件夹的 `MainActivity.java` 中的`onCreate`执行以下方法`getTestDeviceInfo(getApplicationContext());`获取的id是空的。
     - **解决：** 延时几秒执行就获取到。     
    

```
public static String[] getTestDeviceInfo(Context context){
    String[] deviceInfo = new String[2];
    try {
        if(context != null){
            deviceInfo[0] = DeviceConfig.getDeviceIdForGeneral(context);
            deviceInfo[1] = DeviceConfig.getMac(context);
            android.util.Log.i("UMLog--deviceInfo0", deviceInfo[0]);
            android.util.Log.i("UMLog--deviceInfo1", deviceInfo[1]);

        }
    } catch (Exception e){
    }
    return deviceInfo;
}
```  

## 0x004 坑04
添加的测试手机，如果长时间收录不到信息。最后一次测试时间迟迟不更新。可能是设备信息变了。需要删除重新添加。

 - **解决:**删除测试设备 卸载重装应用.重新添加测试设备 然后触发页面 完全退出应用  不在后台运行。 间隔40秒 重新启动应用。看下数据是否上传。

![](https://i.loli.net/2021/06/03/4lAqURJhaOHpkLb.png)

## 0x005 坑05
错误日志，暂无数据，是不体现在集成测试模式下的。官方把这个放在这里又看不数据确实很鸡肋。
- **解决：**需要单独集成U-APM 

![](https://i.loli.net/2021/06/03/SGNnyAuhmVEYWac.jpg)


## 0x006 坑06
`onPageStart` 和  `onPageEnd` 没成对使用的话友盟日志会报错。

**解决：**一定要想办法成对调用。就是先`onPageStart`了一定要先`onPageEnd`后再次去`onPageStart`。

    E/UMLog (30670): │ 对于页面XXX，请确保先依序成对调用onPageStart，onPageEnd接口，再调用onPageStart接口对其它页面进行统计。 
    E/UMLog (30670): ├───────────────────解决方案────── 
    E/UMLog (30670): │ 对于任意一个页面，必须依序成对调用onPageStart以及onPageEnd，不能有遗漏。详见链接 https://developer.umeng.com/docs/66632/detail/66975?um_channel=sdk 
    I/UMLog (30670): onPageStart:xxx

**解决示例代码：**

```
static void onPageStart (String pageName)async {
    String  page = FmAnalysis.pageName(pageName);
    if ( page != umStartPage &&(page.length > 0)){
      if (umStartPage != ''){
        await UmengCommonSdk.onPageEnd(umStartPage);
      }
      umStartPage = page;
      await UmengCommonSdk.onPageStart(page);
    }
  }
  static void onPageEnd (String pageName) async {

    String  page = FmAnalysis.pageName(pageName);
    if ( (page == umStartPage )&&(umStartPage != '')){
        await UmengCommonSdk.onPageEnd(umStartPage);
        umStartPage = '';
    }
  }

  static String pageName (String pageName){
    String name = pageName??'';
    if (name == '/') name = '';
    if (name == '/FmTabPage') name = '';
    if (name.contains('/Fm')){
      name = name.replaceFirst('/Fm', '');
    }
    return name;
  }
```

然后 新建 `AppAnalysis`文件。在`MaterialApp`中的`navigatorObservers: [AppAnalysis()],`引用。我使用的是配合`GetMaterialApp`使用的。整个项目使用了`Get`管理路由。

```
class AppAnalysis extends NavigatorObserver {
  @override
  void didPush(Route<dynamic> route, Route<dynamic> previousRoute) {
    // print('---didPush.Get.previousRoute:${Get.previousRoute}');
    // print('---didPush.Get.currentRoute:${Get.currentRoute}');
    FmAnalysis.onPageStart(Get.currentRoute);
  }

  @override
  void didPop(Route<dynamic> route, Route<dynamic> previousRoute) {
    // print('---didPop.Get.previousRoute:${Get.previousRoute}');
    // print('---didPop.Get.currentRoute:${Get.currentRoute}');
    FmAnalysis.onPageEnd(Get.currentRoute);
  }

  @override
  void didReplace({Route<dynamic> newRoute, Route<dynamic> oldRoute}) {
    // print('---didReplace.Get.previousRoute:${Get.previousRoute}');
    // print('---didReplace.Get.currentRoute:${Get.currentRoute}');
    // FmAnalysis.onPageEnd(Get.previousRoute);
    // FmAnalysis.onPageStart(Get.currentRoute);

  }
}
```

## 0x007 坑07
集成友盟需要问题联系不到官方人员。
**解决：**
-   1、提客服工单，效率极慢。
-   2、拨打官方400客服电话咨询
-   3、我推荐的，在线客服，连续发两次“人工”。就好转接的在线的人工客服。回复讨论问题比较及时。我之前都不知道这个方案。还是打400电话咨询官方告诉我的。

## 0x008 坑08
如果把测试手机转变为正式用户测试正式环境数据是否统计。
**解决：**直接在测试设备中删除测试手机。正常使用APP。第二天才能看到数据被统计。