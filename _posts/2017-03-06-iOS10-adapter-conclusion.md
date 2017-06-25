---
layout:     	post
title:       "iOS10适配总结"
excerpt: 		总结的一些关于iOS10适配方面的问题 
date:     	2017-03-06 
author:     	"袁凤鸣"
categories:  iOS
tags: 
    - iOS10
    
mathjax: true
---

* content
{:toc} 


## 总结的一些关于iOS10适配方面的问题

## 1.系统判断方法失效:

在开发中,当需要判断系统版本的话,不要使用下面的方法:

	#define isiOS10 ([[[[UIDevice currentDevice] systemVersion] substringToIndex:1] intValue]>=10)
	
	
它会永远返回 NO, `substringToIndex:1` 在iOS 10 会被检测成 iOS 1 了,
应该使用下面的这些方法:
Objective-C 中这样写:


	#define SYSTEM_VERSION_EQUAL_TO(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedSame)
	#define SYSTEM_VERSION_GREATER_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedDescending)
	#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
	#define SYSTEM_VERSION_LESS_THAN(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
	#define SYSTEM_VERSION_LESS_THAN_OR_EQUAL_TO(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedDescending)







或者使用:

	if ([[NSProcessInfo processInfo] isOperatingSystemAtLeastVersion:(NSOperatingSystemVersion){.majorVersion = 9, .minorVersion = 1, .patchVersion = 0}]) { 
	
	NSLog(@"Hello from > iOS 9.1");
	
	}
	if ([NSProcessInfo.processInfo isOperatingSystemAtLeastVersion:(NSOperatingSystemVersion){9,3,0}]) {
	 
	 NSLog(@"Hello from > iOS 9.3");
	 
	 }
	 
	 
或者使用:


	if (NSFoundationVersionNumber > NSFoundationVersionNumber_iOS_9_0) { 
	
	// do stuff for iOS 9 and newer
	} else { 
	
	// do stuff for older versions than iOS 9
	}
	
	
有时候会缺少一些常量,`NSFoundationVersionNumber`是在`NSObjCRuntime.h`中定义的,作为 Xcode7.3.1 的一部分,我们设定常熟范围从iPhone OS 2到`#define NSFoundationVersionNumber_iOS_8_4 1144.17`,在 iOS10(Xcode 8)中,苹果补充了缺少的数字,设置有未来的版本.


	#define NSFoundationVersionNumber_iOS_9_0 1240.1
	#define NSFoundationVersionNumber_iOS_9_1 1241.14
	#define NSFoundationVersionNumber_iOS_9_2 1242.12
	#define NSFoundationVersionNumber_iOS_9_3 1242.12
	#define NSFoundationVersionNumber_iOS_9_4 1280.25
	#define NSFoundationVersionNumber_iOS_9_x_Max 1299



Swift中这样写:

	if NSProcessInfo().isOperatingSystemAtLeastVersion(NSOperatingSystemVersion(majorVersion: 10, minorVersion: 0, patchVersion: 0)) { 
	         // 代码块
	}


或者使用


	if #available(iOS 10.0, *) { 
	         // 代码块
	} else { 
	         // 代码块
	}
	
	
## 2.隐私数据访问问题:

项目中访问了隐私数据,比如:相机,相册,联系人等,在Xcode8中打开编译的话,统统会crash,控制台会输出下面这样的日志:

![](http://upload-images.jianshu.io/upload_images/122816-135f4a89ba4b0ee5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是因为iOS对用户的安全和隐私的增强,在申请很多私有权限的时候都需要添加描述,但是,在使用Xcode 8之前的Xcode还是使用系统的权限通知框.
要想解决这个问题,只需要在`info.plist`添加`NSContactsUsageDescription`的 key,  value 自己随意填写就可以,这里列举出对应的 key(Source Code模式下):

	<!-- 相册 --> 
	<key>NSPhotoLibraryUsageDescription</key> 
	<string>App需要您的同意,才能访问相册</string> 
	<!-- 相机 --> 
	<key>NSCameraUsageDescription</key> 
	<string>App需要您的同意,才能访问相机</string> 
	<!-- 麦克风 --> 
	<key>NSMicrophoneUsageDescription</key> 
	<string>App需要您的同意,才能访问麦克风</string> 
	<!-- 位置 --> 
	<key>NSLocationUsageDescription</key> 
	<string>App需要您的同意,才能访问位置</string> 
	<!-- 在使用期间访问位置 --> 
	<key>NSLocationWhenInUseUsageDescription</key> 
	<string>App需要您的同意,才能在使用期间访问位置</string> 
	<!-- 始终访问位置 --> 
	<key>NSLocationAlwaysUsageDescription</key> 
	<string>App需要您的同意,才能始终访问位置</string> 
	<!-- 日历 --> 
	<key>NSCalendarsUsageDescription</key> 
	<string>App需要您的同意,才能访问日历</string> 
	<!-- 提醒事项 --> 
	<key>NSRemindersUsageDescription</key> 
	<string>App需要您的同意,才能访问提醒事项</string> 
	<!-- 运动与健身 --> 
	<key>NSMotionUsageDescription</key> <string>App需要您的同意,才能访问运动与健身</string> 
	<!-- 健康更新 --> 
	<key>NSHealthUpdateUsageDescription</key> 
	<string>App需要您的同意,才能访问健康更新 </string> 
	<!-- 健康分享 --> 
	<key>NSHealthShareUsageDescription</key> 
	<string>App需要您的同意,才能访问健康分享</string> 
	<!-- 蓝牙 --> 
	<key>NSBluetoothPeripheralUsageDescription</key> 
	<string>App需要您的同意,才能访问蓝牙</string> 
	<!-- 媒体资料库 --> 
	<key>NSAppleMusicUsageDescription</key> 
	<string>App需要您的同意,才能访问媒体资料库</string>


如果不起作用,可以请求后台权限,类似于这样:


	<key>UIBackgroundModes</key>
	<array> 
	<!-- 在这里写上你在后台模式下要使用权限对应的key --> 
	<string>location</string>
	...
	</array>



或者在Xcode里选中当前的target,选择`Capabilities`,找到`Background Modes`,打开它,在里面选择对应权限


![](http://upload-images.jianshu.io/upload_images/122816-138eaae9bc6b7d42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 3.UIColor的问题

官方文档中说:大多数core开头的图形框架和`AVFoundation`都提高了对扩展像素和宽色域色彩空间的支持.通过图形堆栈扩展这种方式比以往支持广色域的显示设备更加容易。现在对`UIKit`扩展可以在`sRGB`的色彩空间下工作，性能更好,也可以在更广泛的色域来搭配`sRGB`颜色.如果你的项目中是通过低级别的api自己实现图形处理的,建议使用`sRGB`,也就是说在项目中使用了`RGB`转化颜色的建议转换为使用`sRGB`,在`UIColor`类中新增了两个api:

	- (UIColor *)initWithDisplayP3Red:(CGFloat)displayP3Red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha NS_AVAILABLE_IOS(10_0);
	+ (UIColor *)colorWithDisplayP3Red:(CGFloat)displayP3Red green:(CGFloat)green blue:(CGFloat)blue alpha:(CGFloat)alpha NS_AVAILABLE_IOS(10_0);

## 4.真彩色的显示

真彩色的显示会根据光感应器来自动的调节达到特定环境下显示与性能的平衡效果,如果需要这个功能的话,可以在`info.plist`里配置(在Source Code模式下):

	<key>UIWhitePointAdaptivityStyle</key>
它有五种取值,分别是:

	<string>UIWhitePointAdaptivityStyleStandard</string> // 标准模式
	<string>UIWhitePointAdaptivityStyleReading</string> // 阅读模式
	<string>UIWhitePointAdaptivityStylePhoto</string> // 图片模式
	<string>UIWhitePointAdaptivityStyleVideo</string> // 视频模式
	<string>UIWhitePointAdaptivityStyleStandard</string> // 游戏模式



也就是说如果你的项目是阅读类的,就选择UIWhitePointAdaptivityStyleReading这个模式,五种模式的显示效果是从上往下递减,也就是说如果你的项目是图片处理类的,你选择的是阅读模式,给选择太好的效果会影响性能.

## 5.ATS的问题

1.在 iOS 9 的时候,默认非 HTTS 的网络是被禁止的,我们可以在`info.plist`文件中添加`NSAppTransportSecurity`字典,将`NSAllowsArbitraryLoads`设置为 YES 来禁用`ATS`;


2.从2017年1月1日起,,所有新提交的 app 默认不允许使用`NSAllowsArbitraryLoads`来绕过ATS的限制,默认情况下你的 app 可以访问加密足够强的`(TLS V1.2以上)`HTTPS内容;



3.可以选择使用`NSExceptionDomains`设置白名单的方式对特定的域名开放HTTP内容来通过审核,比如说你的应用集成了第三方的登录分享SDK,可以通过这种方式来做,下面以新浪SDK作为示范(Source Code 模式下):




	 <key>NSAppTransportSecurity</key>
	 <dict>
	  <key>NSExceptionDomains</key>
	  <dict>
	   <key>sina.cn</key>
	   <dict>
	    <key>NSThirdPartyExceptionMinimumTLSVersion</key>
	    <string>TLSv1.0</string>
	    <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
	    <false/>
	    <key>NSIncludesSubdomains</key>
	    <true/>
	   </dict>
	   <key>weibo.cn</key>
	   <dict>
	    <key>NSThirdPartyExceptionMinimumTLSVersion</key>
	    <string>TLSv1.0</string>
	    <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
	    <false/>
	    <key>NSIncludesSubdomains</key>
	    <true/>
	   </dict>
	   <key>weibo. com</key>
	   <dict>
	    <key>NSThirdPartyExceptionMinimumTLSVersion</key>
	    <string>TLSv1.0</string>
	    <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
	    <false/>
	    <key>NSIncludesSubdomains</key>
	    <true/>
	   </dict>
	   <key>sinaimg.cn</key>
	   <dict>
	    <key>NSThirdPartyExceptionMinimumTLSVersion</key>
	    <string>TLSv1.0</string>
	    <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
	    <false/>
	    <key>NSIncludesSubdomains</key>
	    <true/>
	   </dict>
	   <key>sinajs.cn</key>
	   <dict>
	    <key>NSThirdPartyExceptionMinimumTLSVersion</key>
	    <string>TLSv1.0</string>
	    <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
	    <false/>
	    <key>NSIncludesSubdomains</key>
	    <true/>
	   </dict>
	   <key>sina.com.cn</key>
	   <dict>
	    <key>NSThirdPartyExceptionMinimumTLSVersion</key>
	    <string>TLSv1.0</string>
	    <key>NSThirdPartyExceptionRequiresForwardSecrecy</key>
	    <false/>
	    <key>NSIncludesSubdomains</key>
	    <true/>
	   </dict>
	  </dict>
	 </dict>
	 
	 
	 
	 
4.在iOS 10 中`info.plist`文件新加入了`NSAllowsArbitraryLoadsInWebContent`键,允许任意web页面加载,同时苹果会用 ATS 来保护你的app;


5.安全传输不再支持`SSLv3`, 建议尽快停用`SHA1`和`3DES`算法;

## 6.UIStatusBar的问题:

在iOS10中,如果还使用以前设置`UIStatusBar`类型或者控制隐藏还是显示的方法,会报警告,方法过期,如下图:

![](http://upload-images.jianshu.io/upload_images/122816-6cc72fac7695aefa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



上面方法到 iOS 10 不能使用了,要想修改`UIStatusBar`的样式或者状态使用下图中所示的属性或方法:



	@property(nonatomic, readonly) UIStatusBarStyle preferredStatusBarStyle NS_AVAILABLE_IOS(7_0) __TVOS_PROHIBITED; // Defaults to UIStatusBarStyleDefault
	@property(nonatomic, readonly) BOOL prefersStatusBarHidden NS_AVAILABLE_IOS(7_0) __TVOS_PROHIBITED; // Defaults to NO
	- (UIStatusBarStyle)preferredStatusBarStyle NS_AVAILABLE_IOS(7_0) __TVOS_PROHIBITED; // Defaults to UIStatusBarStyleDefault
	- (BOOL)prefersStatusBarHidden NS_AVAILABLE_IOS(7_0) __TVOS_PROHIBITED; // Defaults to NO
	// Override to return the type of animation that should be used for status bar changes for this view controller. This currently only affects changes to prefersStatusBarHidden.
	- (UIStatusBarAnimation)preferredStatusBarUpdateAnimation NS_AVAILABLE_IOS(7_0) __TVOS_PROHIBITED; // Defaults to UIStatusBarAnimationFade


## 7.UITextField


在iOS 10 中,`UITextField`新增了`textContentType`字段,是`UITextContentType`类型,它是一个枚举,作用是可以指定输入框的类型,以便系统可以分析出用户的语义.是电话类型就建议一些电话,是地址类型就建议一些地址.可以在`#import <UIKit/UITextInputTraits.h>`文件中,查看`textContentType`字段,有以下可以选择的类型:


	UIKIT_EXTERN UITextContentType const UITextContentTypeName                      NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeNamePrefix                NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeGivenName                 NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeMiddleName                NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeFamilyName                NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeNameSuffix                NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeNickname                  NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeJobTitle                  NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeOrganizationName          NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeLocation                  NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeFullStreetAddress         NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeStreetAddressLine1        NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeStreetAddressLine2        NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeAddressCity               NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeAddressState              NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeAddressCityAndState       NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeSublocality               NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeCountryName               NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypePostalCode                NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeTelephoneNumber           NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeEmailAddress              NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeURL                       NS_AVAILABLE_IOS(10_0);
	UIKIT_EXTERN UITextContentType const UITextContentTypeCreditCardNumber          NS_AVAILABLE_IOS(10_0);
## 8.UserNotifications(用户通知)

iOS 10 中将通知相关的 API 都统一了,在此基础上很多用户定义的通知,并且可以捕捉到各个通知状态的回调.以前通知的概念是:大家想接受的提前做好准备,然后一下全两分发,没收到也不管了,也不关心发送者,现在的用户通知做成了类似于网络请求,先发一个 request 得到 response 的流程,还封装了 error,可以在各个状态的方法中做一些额外的操作,并且能获得一些字段,比如发送者之类的.这个功能的头文件是:
		
	#import <UserNotifications/UserNotifications.h>
	
	
主要有以下文件:


	#import <UserNotifications/NSString+UserNotifications.h>
	#import <UserNotifications/UNError.h>
	#import <UserNotifications/UNNotification.h>
	#import <UserNotifications/UNNotificationAction.h>
	#import <UserNotifications/UNNotificationAttachment.h>
	#import <UserNotifications/UNNotificationCategory.h>
	#import <UserNotifications/UNNotificationContent.h>
	#import <UserNotifications/UNNotificationRequest.h>
	#import <UserNotifications/UNNotificationResponse.h>
	#import <UserNotifications/UNNotificationSettings.h>
	#import <UserNotifications/UNNotificationSound.h>
	#import <UserNotifications/UNNotificationTrigger.h>
	#import <UserNotifications/UNUserNotificationCenter.h>
	#import <UserNotifications/UNNotificationServiceExtension.h>

## 9.UICollectionViewCell的的优化

在iOS 10 之前,`UICollectionView`上面如果有大量 cell,当用户活动很快的时候,整个`UICollectionView`的卡顿会很明显,为什么会造成这样的问题,这里涉及到了iOS 系统的重用机制,当cell准备加载进屏幕的时候,整个cell都已经加载完成,等待在屏幕外面了,也就是整整一行cell都已经加载完毕,这就是造成卡顿的主要原因,专业术语叫做:掉帧.


`要想让用户感觉不到卡顿,我们的app必须帧率达到60帧/秒,也就是说每帧16毫秒要刷新一次.`

**iOS 10 之前UICollectionViewCell的生命周期是这样的:**

- 1.用户滑动屏幕,屏幕外有一个 cell 准备加载进来,把 cell 从`reusr`队列拿出来,然后调用`prepareForReuse`方法,在这个方法里面,可以重置 cell 的状态,加载新的数据;
- 2.继续滑动,就会调用`cellForItemAtIndexPath`方法,在这个方法里面给 cell 赋值模型,然后返回给系统;
- 3.当 cell 马上进去屏幕的时候,就会调用`willDisplayCell`方法,在这个方法里面我们还可以修改 cell ,为进入屏幕做最后的准备工作;
- 4.执行完`willDisplayCell`方法后,cell就进去屏幕了.当 cell 完全离开屏幕以后,会调用`didEndDisplayingCell`方法.

**iOS 10 UICollectionViewCell的生命周期是这样的:**

- 1.用户滑动屏幕,屏幕外有一个 cell 准备加载进来,把 cell 从 `reusr`队列拿出来,然后调用`prepareForReuse`方法,在这里当 cell 还没有进去屏幕的时候,就已经提前调用这个方法了,对比之前的区别是之前是 cell 的上边缘马上进去屏幕的时候就会调用该方法,而iOS 10 提前到 cell 还在屏幕外面的时候就调用;
- 2.在`cellForItemAtIndexPath`中创建 cell，填充数据，刷新状态等操作,相比于之前也提前了;
- 3.用户继续滑动的话,当 cell 马上就需要显示的时候我们再调用`willDisplayCell`方法,原则就是:何时需要显示,何时再去调用`willDisplayCell`方法;
- 4.当 cell 完全离开屏幕以后,会调用`didEndDisplayingCell`方法,跟之前一样, cell 会进入重用队列.

	在iOS 10 之前, cell 只能从重用队列里面取出,再走一遍生命周期,并调用`cellForItemAtIndexPath`创建或者生成一个 cell .
	
	在iOS 10 中,系统会cell保存一段时间,也就是说当用户把 cell 滑出屏幕以后,如果又滑动回来, cell 不用再走一遍生命周期了,只需要调用`willDisplayCell`方法就可以重新出现在屏幕中了.

	iOS 10 中,系统是一个一个加载 cell 的,二以前是一行一行加载的,这样就可以提升很多性能;

	iOS 10 新增加的`Pre-Fetching`预加载

这个是为了降低`UICollectionViewCell`在加载的时候所花费的时间,在 iOS 10 中,除了数据源协议和代理协议外,新增加了一个`UICollectionViewDataSourcePrefetching`协议,这个协议里面定义了两个方法:

	- (void)collectionView:(UICollectionView *)collectionView prefetchItemsAtIndexPaths:(NSArray<NSIndexPath *> *)indexPaths NS_AVAILABLE_IOS(10_0);
	
	- (void)collectionView:(UICollectionView *)collectionView cancelPrefetchingForItemsAtIndexPaths:(NSArray<NSIndexPath *> *)indexPaths  NS_AVAILABLE_IOS(10_0);
	
在`ColletionView prefetchItemsAt indexPaths`这个方法是异步预加载数据的,当中的`indexPaths`数组是有序的,就是`item`接收数据的顺序;

`CollectionView cancelPrefetcingForItemsAt indexPaths`这个方法是可选的,可以用来处理在滑动中取消或者降低提前加载数据的优先级.

**注意:**这个协议并不能代替之前读取数据的方法,仅仅是辅助加载数据.

`Pre-Fetching`预加载对`UITableViewCell`同样适用.

## 10. UIRefreshControl的使用

在iOS 10 中, `UIRefreshControl`可以直接在`UICollectionView`和`UITableView`中使用,并且脱离了`UITableViewController`.现在`RefreshControl`是`UIScrollView`的一个属性.
使用方法:

	UIRefreshControl *refreshControl = [[UIRefreshControl alloc] init];
	    [refreshControl addTarget:self action:@selector(loadData) forControlEvents:UIControlEventValueChanged];
	    collectionView.refreshControl = refreshControl;
	    







