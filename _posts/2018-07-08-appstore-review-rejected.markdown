---
layout: post
title:  "近期审核被拒总结"
date:   2018-07-08
author: "袁凤鸣"
excerpt: 
categories: 
    - iOS
tags: 
    - 审核
mathjax: true

---
* content
{:toc}
---


## （一）、近期审核被拒总结：

### **审核条款 2.1 被拒：**
 - **APP 完整性被拒：**
     - **如下情况属于元数据被拒：**
         -  **元数据被拒可以直接回复邮件解释情况，不用再次提交二进制文件**
     - 需要提供更多辅助审核的材料
     - 一般是涉及硬件交互，要求邮寄硬件到美国
     - 或者被要求需要更加详细的描述主要功能特征

    >     * 		2. 1 Performance: App Completeness
    Guideline 2.1 - Information Needed
    >      
    We have started the review of your app, but we are not able to continue because we need the associated hardware to fully assess your app features.
    >  
    Next Steps
    To help us proceed with the review of your app, please send the necessary hardware/accessory to the address below.
    NOTE: Please include your app name and app ID in the shipment; failure to provide this information can delay the review process.
    Additionally, it may take several business days for us to receive the hardware once it has been delivered to Apple.
   >  
    Apple
    One Apple Park Way
    M/S: 124-2APP
    Cupertino, CA 95014
    USA

- **解决方案：**
    - 我自己用的应对套路中文版本，英文版本自行翻译。
    - 主要强调硬件设备的唯一性，独特性，邮寄方案真实不可行等。
    - 示例如下：






    >  尊敬的苹果审核团队：
    感谢您对我们的App耐心审核。请仔细看看演示视，地址是：https://youtu.be/nupqFYRNXMU。 我们应用只有一个功能是蓝牙控制设备联网。设备默认是4G网络，可以通过应用连接到WiFi网络。我们的应用和设备只在中国地区销售，不涉及其他国家。硬件设备所需要的电源标准只适合中国地区，邮寄到你们那里硬件设备是无法正常充电使用的。你们要求我们邮寄设备去“One Apple Park Way”。我们的硬件设备非常昂贵，邮寄过程耗时间。这是非常困难的把设备邮寄到你们那里。我们应用真的着急上线。
    真诚致谢！
    
    
    
### **审核条款 2.1 被拒：**
 - **APP 完整性被拒：**
     - 审核人员不是很理解你发布的`APP`
     - 需要你根据审核人员的提问组织中英文双语解释

    >     * 		Guideline 2.1 - Information Needed
    >       
    We have started the review of your app, but we are not able to continue because we need additional information about your app.
    >  
    Next Steps
    >  
    To help us proceed with the review of your app, please provide detailed information to the following questions. The more information you can provide upfront, the sooner we can complete your review.
    >  
> - What are the main features and functionality of your app?
> - Can you provide another demo video demonstrating the feature and functionality?
    >  
    Once you reply to this message in Resolution Center with the requested information, we can proceed with your review.
    >  
    Since your App Store Connect status is Metadata Rejected, we do NOT require a new binary. To revise the metadata, visit App Store Connect to select your app and revise the desired metadata values. Once you’ve completed all changes, reply to this message in Resolution Center and we will continue the review. 

- **解决方案：**
    - 补充更加详细说明。
    - 针对审核人员提出的疑问，详细回复解答。尽量围绕问题多写些内容。（用个一两句话解释下你自己觉得靠谱吗？）

### **审核条款 2.1 被拒：**
 - **APP 完整性被拒：**
     - 乱用了容易产生误解的敏感词
     - 不是和医疗相关就不要用“大夫”这个词

    >     * 		2. 1 Performance: App Completeness
    Dear Developer,
    >  
    Thank you for your reply.
    >  
    Since your app is not relevant to medical use, it would be appropriate to remove 大夫 from your app title to avoid any confusion.
    >  
    Best Regards,
    App Store Review
    
- **解决方案：**
   - 删除“大夫”重新打包上传审核


### **审核条款 2.5.1 被拒：** 
- **软件相关规定被拒**
    - 使用了苹果旧的接口`API`，该`API`被苹果收回为自己苹果公司内部使用的私有`API`
    
    >      * 		Guideline 2.5.1 - Performance - Software Requirements
    >  
    Your app uses the "prefs:root=" non-public URL scheme, which is a private entity. The use of non-public APIs is not permitted on the App Store because it can lead to a poor user experience should these APIs change.
    >  
    Continuing to use or conceal non-public APIs in future submissions of this app may result in the termination of your Apple Developer account, as well as removal of all associated apps from the App Store.
    >  
    Next Steps
    >  
    To resolve this issue, please revise your app to provide the associated functionality using public APIs or remove the functionality using the "prefs:root" or "App-Prefs:root" URL scheme.
    >  
    If there are no alternatives for providing the functionality your app requires, you can file an enhancement request.
    
- **解决方案：** 
   - 移除违规的`API`。
   - 🍎就是爹，说不让你用就果断不让你用。你再用就给你拒。
    
### **审核条款 2.5.4 被拒：**

- **软件相关规定被拒**
    - 使用了后台音频权限，可以后台播放音乐，但是锁屏又木有音乐控制功能。被拒
    - 锁屏没有使用`APP`时候，后台音频播放是一个无效功能。（可能意思是审核人员纠结锁屏没使用`APP`就无法控制音频了）

    >     * 		Guideline 2.5.4 - Performance - Software Requirements
    > 
    Your app declares support for audio in the UIBackgroundModes key in your Info.plist but did not include features that require persistent audio. Specifically, we have received the note in Review Note that “我们的应用是一个语音助手，可以播放音乐。因此我们需要后台播放音频的权限。并且我们的应用可以和已经验证过的蓝牙耳机交互使用， 为此录制了一个视频演示这个功能。视频地址是：https://youtu.be/3plONKZ7aRY”  while the function to play music in the background is an invalid feature of background audio when the users did not use the app. in other words, it is an inappropriate way to use the background audio to play music when the users did not use the app. 
    >  
    Next Steps
    >  
    The audio key is intended for use by apps that provide audible content to the user while in the background, such as music player or streaming audio apps. Please revise your app to provide audible content to the user while the app is in the background or remove the "audio" setting from the UIBackgroundModes key.

    
- **解决方案：** 
   - 添加锁屏音乐控制功能。并重新录制视频演示这个功能。
   - 审核人员建议如果不是做专门的音频播放`APP`的话建议移除后台音频播放功能。

### **审核条款 4.1 被拒**：
- **设计抄袭**
    - 你的`APP`包含使人容易误解的内容
    - 这种情况大多数是违规占用了著名的商标
    - 比如占用`HYUNDAI`商标，之前遇到的也有占用那个`大白(●—●)`形象做`logo`被拒的
    
    >     * 		4. 1 Design: Copycats
    > 
    Guideline 4.1 - Design - Copycats
    >  
    Your app or its metadata appears to contain misleading content.
    >  
    The next submission of this app may require a longer review time, and this app will not be eligible for an expedited review until this issue is resolved.
    >  
    Next Steps
    >  
    - Review the Copycats section of the App Store Review Guidelines.
    - Ensure your app is compliant with all sections of the App Store Review Guidelines and the Terms & Conditions of the Apple Developer Program. 
    - Provide rights to any protected or trademarked content in App Store Connect.
    - Once your app is fully compliant, resubmit your app for review.
    >  
    Submitting apps designed to mislead or harm customers or evade the review process may result in the termination of your Apple Developer Program account. Review the Terms & Conditions of the Apple Developer Program to learn more about our policies regarding termination.
    >  
    If you believe your app is compliant with the App Store Review Guidelines, you may submit an appeal. 
    >  
    You may attach documentary evidence in the App Review Information section in App Store Connect. In accordance with section 3.2(f) of the Apple Developer Program License Agreement, you acknowledge that submitting falsified or fraudulent documentation can result in the termination of your Apple Developer Program account and the removal of your apps from the App Store. Once Legal has reviewed your documentation and confirms its validity, we will proceed with the review of your app.
    >  
    Since your App Store Connect status is Rejected, a new binary will be required.

- **解决方案：**
    - 修改使人误解的内容。
    - 不要占用著名商标。

### **审核条款 4.3 被拒**：

- 垃圾设计。垃圾设计。
    - `4.3 `被拒主要是被认定为马甲`APP`（`UI`换壳子，功能逻辑和界面布局一模一样）。
    - 马甲`APP`原始流行于 彩票、棋牌、游戏 类型项目。这些项目总爱换一套`UI`皮肤疯狂上线。总有一个说不定火了。苹果17年开始严打这类型`APP`
    - 后期这种只换`UI`图标的马甲`APP`也是愈加难以通过审核。
    - 我司`APP`被这个情况拒的比较多
      
        
    >     * 		4. 3 Design: Spam
    >  
    Guideline 4.3 - Design
    >  
    This app duplicates the content and functionality of other apps submitted by you or another developer to the App Store, which is considered a form of spam.
    >  
    Apps that simply duplicate content or functionality create clutter, diminish the overall experience for the end user, and reduce the ability of developers to market their apps.
    >  
    The next submission of this app may require a longer review time, and this app will not be eligible for an expedited review until this issue is resolved.
    >  
    Next Step
    >  - Review the Design section of the App Store Review Guidelines.
    - Ensure your app is compliant with all sections of the App Store Review Guidelines and the Terms & Conditions of the Apple Developer Program. 
    - Once your app is fully compliant, resubmit your app for review.
    >  
    Submitting apps designed to mislead or harm customers or evade the review process may result in the termination of your Apple Developer Program account. Review the Terms & Conditions of the Apple Developer Program to learn more about our policies regarding termination.
    >  
    If you believe your app is compliant with the App Store Review Guidelines, you may submit an appeal. Alternatively, you may provide additional details about your app by replying directly to this message.
    
- **解决方案：**
    - 目前了解的只有加混淆代码减少原始真实代码的比重发布审核。有一定几率还是被拒。
    - 重新布局。界面做的真的不一样。

### **审核条款 5.1.2 被拒：**
- **用户隐私数据的使用和分享被拒**
    - 这个被拒由于`APP`进行了把了通讯录上传到服务器被拒。
    - 被拒邮寄中要求提供用户隐私协议的勾选同意页面。

    >     * 		Guideline 5.1.2 - Legal - Privacy - Data Use and Sharing
    >  
    Your app accesses user data from the device but does not have the required precautions in place.
    >  
    Specifically, your current model alert did not make it clear to the users that their personal data will be uploaded to your server or not and there is no privacy URL in the metadata.
    >  
    Next Steps
    >  
    To collect personal data with your app, you must make it clear to the user that their personal data will be uploaded to your server and you must obtain the user's consent before the data is uploaded. You must also have a Privacy Policy URL and ensure that the URL you provide directs users to your privacy policy.
    >  
    - Starting with iOS 6, there are keys for specifying the reason the app will access the user's protected data. When the access prompt is displayed, the purpose specified in these keys is displayed in that dialog box. If your app will be transmitting protected user data, the usage string in your access request should clearly inform the user that their data will be uploaded to your server if they consent.
    >  
    Resources
    >  
    For more information on these keys, please review the Information Property List Key Reference.

- **解决方案：** 
   - 和后台沟通加一个审核开关接口
   - 利用审核开关接口，在审核期间屏蔽掉通讯录上传功能
   - 或者按照要求加一个用户隐私数据同意上传的协议勾选页面。



### **审核条款 5.2.1 被拒：**
- **知识产权被拒**
   - 涉及到 医疗、彩票、金融、赌博等等 就会被要求提供相关资质文件。
   - 有可能音乐的下载也会因为这个被拒。国外比较注重音乐版权。
   - 苹果对这些类型`APP`审核会更加严厉。
   - 以个人民义注册的苹果账号不能发布医疗`APP`。需要要求医疗机构的公司账号发布。
    

    >     * 		Guideline 5.2.1 - Legal - Intellectual Property
    >  
    The seller and company names associated with your app do not reflect the name “Medical Institution” in the app or its metadata, as required by Guideline 5.2.1 of the App Store Review Guidelines.
    >  
    Next Steps
    >  
    Your app must be published under a seller name and company name that reflects the Medical Institution name. If you have developed this app on behalf of a client, please advise your client to add you to the development team of their Apple Developer account. If your client does not yet have an Apple Developer account, they can enroll in the Apple Developer Program through the Apple Developer portal.
    >  
    Note that submitting documentation showing permission to publish this app on behalf of the content owner or institution will not resolve this issue. This app must be submitted under the content owner’s own Apple Developer account.
    >  
    To request a fee waiver for nonprofit organizations, accredited educational institutions, or U.S.-based government entities, follow the steps outlined on the Apple Developer Program Membership Fee Waivers page.
    >  
    Once created, you cannot change your seller name or company name in App Store Connect. For assistance with changing your company name or seller name, you will need to contact us. Select Membership and Account to request an update to your Apple Developer account information.
    >  
    Since your App Store Connect status is Rejected, a new binary will be required. 

- **解决方案：**
    - 描述和备注介绍中尽量不要出现敏感字眼。
    - 真实做这些类型`APP`那就要提供完整的资质证明文件。
    - 美好大夫机器人项目由于备注不小心写了医学健康常识字样被这个拒，后来删除敏感词重新提交。

-------------------

## （二）、感想和防止再次被拒：

### ①、后台权限使用一定要慎重

- 开启的后台权限越多审核被拒几率越大。减少后台权限的使用可以极大增加审核几率。
- 苹果手机电池一般就一千多毫安，安卓普遍都三千多。后台权限越多手机就越耗电池。那苹果就越严抓这个。
- **实在非要涉及的后台权限。审核时候需要附带视频演示后台权限什么功能使用了。苹果严禁滥用后台权限又不做正规的功能的 APP 。**（主要是耗电）
- **目前我司 APP 中的后台权限有：**
    - 后台音频播放权限
    - 后台导航权限
    - 后台蓝牙连接权限
    - 所有后台权限一共才8个，`APP`就占了4个。🤣
    
    ![](https://ws4.sinaimg.cn/large/006tNc79gy1fswuib1j5xj315g0dujtp.jpg)


### ②、马甲APP开发需谨慎
- 只换**UI**图标。界面的布局，和功能完全一样的这种`APP`是就是马甲`APP`。
- 现阶段苹果严抓的类型`APP`。这种`APP`苹果就是认为是垃圾，抄袭。经常被 `4.3`条款拒绝

### ③、APP 和硬件设备交互使用审核时候需要重点解释说明。
- **当 `APP`涉及和硬件交互时候，一定要录制视频说明演示和硬件交互使用**
- **还要解释硬件设备的唯一性，特殊性。防止被要求邮寄硬件到美国审核。**

### ④、审核时候，尽可能的写好备注
- **一个好的审核备注可以极大增加`APP`审核通过几率**。
- 备注写的好，写的足够详细。审核人员才好更加全面的了解审核`APP`。
- **需要专门的审核专员 组织比较好的 英文备注 和 `APP`一起发布审核。**
    - 目的还是让审核人员更加容易理解`APP`，毕竟审核人员是美国人，人家只爱看英文。发中文解释半天人家也很难看懂。



