---
layout: post
title:  "ipa 发布审核指南"
date:   2018-07-02
author: "袁凤鸣"
excerpt: 旨在帮助非技术人员快速了解苹果 ipa 发布审核流程
categories: 
    - iOS
tags: 
    - 审核
mathjax: true

---
* content
{:toc}
---


# ipa 发布审核指南

**说明：**

 - 本指南为初版，旨在帮助非技术人员快速了解苹果`ipa`发布审核流程
 - 非技术的审核专员发布审核只需处理 **（五）、iTunes connect 后台设置**
     - 该栏目的重中之重要是 **组织比较好的中英文双语备注一起审核**。
 - 技术人员负责辅助审核
     - 创建证书
     - 出包上传到 `iTunes connect 后台`等待操作
     
### （一）、上传硬性条件：
1. `Mac` 电脑（正式版系统，`beta`版不行）
2. 上传工具：
    * [x]    `Xcode` 开发工具 （正式版`IDE`，`beta`版不行）
    * [x]    `Application Loader` 软件
3. 申请的苹果开发者账号（**需要已经付费的**）
4. 预览效果图 和 `APP`文字描述 以及 随审备注中英文内容


###  （二）、前期准备：
 1. **BID**包名定义，如：**com.stormorai.taidi**（使得每个`ipa`独一无二），并添加到苹果 [developer.apple.com](https://developer.apple.com/account/) 后台设置相关配置。
    
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/qdELAW.jpg)
 2. **证书制作**（这个比较麻烦建议由开发人员来操作。）
     - 两个`mobileprovision`证书制作。
     - 两个`CER`证书制作。
     - （证书制作使得当前`Mac`电脑有打包上传能力，使得当前电脑中 `Xcode`有打包上传能力。有出测试包，和决定哪些手机可以安装测试包的能力）
     - 证书制作在[开发者账号后台](https://developer.apple.com/account/)，相对麻烦。可参考[https://www.yfmingo.cn/2017/02/09/iOS-create-certificate/](https://www.yfmingo.cn/2017/02/09/iOS-create-certificate/)

### （三）、新建并配置将要发布的 APP

1. **登录 [itunesconnect](https://appstoreconnect.apple.com/) 选择 我的`APP`**

2. **选中如图新建一个将要发布的`APP`**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/FRuNsb.jpg)
    
- 套装 `ID` ：在后台创建 `Identifiers APP IDs`中的，选择带有当前`APP`的`BID`的那个
- `SKU`： 也是一个唯一标示符，就使用`BID`即可

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/d469EH.jpg)


3、**新构建 iOS 版本**

- 由于我已经构建了将要发布的所以不再次构建，所以显示灰色。 

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/0Z5LUN.jpg)

### （四）、上传流程:

#### 上传方法一  
**注意：**
**用 Application Loader 上传 ipa ,由于中国网络环境限制很可能卡在某一步骤长时间没进展，有 VPN 的请开启 VPN 环境上传。**


将开发人员给的`ipa`包用 **application loader** 软件上传到 [iTunes connect 后台](https://itunesconnect.apple.com)

- 在 `Xcode` 中打开 `application loader`


    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/8khI93.jpg)
- 选取开发人员给的`ipa`包
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/exEiwB.jpg)
- 开始等待苹果服务器预处理检测并随后上传到后台等待操作

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/E7PvpS.jpg)


#### 上传方法二
**`Xcode` 签名处理后直接上传到`itunesconnect`:**

- 此方案无法将已经导出的`ipa`进行上传。只能打包上传一条龙走完流程。
- 选择如图`Generic iOS Device`（或者真机名称）后。执行如图`Archive`打包按钮

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/u2B1pb.jpg)

- 打包成功后 点击右边的 `Validate`进行验证

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/ajgvPn.jpg)
    - 一定要先验证包的正确性。验证如图通过才可以上传
    - 避免将一个错误的包上传审核。
    - 验证期间可以验证出各种元数据错误，遇错误自行修改。
    
     ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/6hA1Wg.jpg)
- 验证通过就可以点击右边的`Upload to App Store`进行上传到`itunesconnect`后台等待审核操作。
    - 上传期间也许会一直卡着不动，突然几秒就上传成功了。
    - 但是如果连续卡着二十分钟左右那就不正常了。需取消重新上传，或者更换网络上传。
- `Xcdoe` 上传成功后在`itunesconnect`后台的活动中如图状态，会显示正在处理，此时是苹果服务器预处理检测。一般20分钟左右再次在活动这里刷新就正常。
- **注意:** 
    - 上传后可能过几分钟该处上传的包直接被苹果删除。这时候一定要去看苹果账号对应的邮箱中的邮件。被删除后会有邮件通知，从邮件中寻找原因及时调整再次打包上传。

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/3X8wos.jpg)


###（五）、 [iTunes connect 后台设置](https://itunesconnect.apple.com) 


#### 一、 创建 APP 成功后填写 APP 基础信息
##### 1. **在`APP`信息中**
- 填写：名称、选择 类别
- 副标题一般无需求可不填。（填的副标题关键词若和已经上架的`APP`雷同就会被拒）

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/BwrMz3.jpg)


##### 2、 **设置价格销售范围**

- 价格一般设置成免费（除非你真的卖`APP`）
- 销售地区选择中国以及其他需要销售的国家
    - 个人认为最好不要勾选美国，原因是如果由于硬件被拒可以和审核人员解释我的`APP`不在美国销售。为防止硬件被拒要求寄设备留一手。
    
   ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/uvVkLX.jpg)

#### 二、准备提交：


##### **1️⃣、上传预览效果图**
- 选择 如图`5.5`英寸显示屏按钮，将准备的五张（至少三张）预览图拖到此处。
- 预览效果图标准： `5.5`寸的预览图必须 `1241*2208px` （`iPhone 6plus` 和 `iPhone 7plus`等`plus`手机截图即可使用）
- 想把效果图做的漂亮点可以请`UI`设计师制作，或者在`App Store`下载`Screenshot`软件制作。
    
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/6sJZzx.jpg)
    
##### **2️⃣、选中右边媒体管理，勾选如图**
- 使得其他尺寸效果图都使用`5.5`这个效果图。

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/impFK3.jpg)


##### **3️⃣、APP介绍，技术支持营销网站等**
- 宣传文本（显示在`App Store`大卡图中，一般不写）
- 关键词（`SEO`关键词，使用英文逗号分隔）
- 技术网站，营销网站。（写产品公司官网即可）
- **描述：（重点注意，有可能描述不符会被拒）**
   - 对`APP` 项目本身的介绍，显示在`App Store`当前APP的下载页面
   - 描述请如实介绍`APP`,不要夸大虚假描述。（是着重介绍`APP`本身，不是APP配合的硬件产品）
   - 尽量不要涉及，医疗，彩票，赌博，硬件 等等敏感字样。
       - 扯到 医疗：有可能被要求提供资质文件证明被拒。
       - 扯到 彩票：有可能被要求提供彩票代售许可证被拒。
       - 扯到 赌博：有可能被要求提供相关资质证明被拒。
       - 扯到 硬件：有可能被要求提供硬件辅助审核被拒。
   
       ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/KJ4APP.jpg)

##### **4️⃣、构建版本。**
-  点击如图 `+` 号。选中刚刚活动中处理好后的版本（活动中构建版本没有好是不会显示`+`号的）

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/I5iZXR.jpg)

##### **5️⃣、APP你分级，版权联系信息**
- 修改如图当前版本号为上传到后台的那个包的版本。
- 按照实际情况对`APP`进行分级。（分级太差如果都选择是，则会无法上线的）
- 右侧填写版权相关联系信息
   - 版权写公司名称，中英文都行
   
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/XyqleF.jpg)

##### **6️⃣、审核信息**（需要重点注意，备注一定要写好）
- 需要登录的`APP`必须勾选需要登录，必须提供测试登录账号。（否则审核人员无法登录直接被拒）
- 联系人信息写自己相关信息
- 备注可写对`APP`的介绍辅助审核人员理解该`APP`

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/0Tl864.jpg)

##### **7️⃣、备注是重中之重:**
   - **备注最好要用中英文双语言版本写，审核人员是美国人大多只看英文。**
   - 备注写的好可以极大帮助`APP`进行通过审核。
   - 备注中强烈建议附带一个特殊功能使用的视频。
   - 涉及硬件交互使用的，后台权限相关的`APP`一定要附带视频。不然很容易被拒。


##### **8️⃣、提交审核**

- 各个选项勾选如图
- 如遇到知识产权确认选项，请直接勾选“是”
- 最后点击 右上角 提交 按钮 即可提交审核

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/fCh4iX.jpg)


