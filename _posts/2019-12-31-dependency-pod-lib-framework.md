---
layout: post
title:  "iOS组件化之路——打包依赖AFNetworking的静态framework"
date:   2019-12-31
author: "袁凤鸣"
excerpt: iOS组件化之路——打包依赖AFNetworking的静态framework

categories: 
    - cocoapods
tags: 
    - cocoapods
mathjax: true

---
* content
{:toc}
---





### 0x0001 需求

年底了，业务不是非常忙。公司最近需求要搞组件化开发。把每一个成熟的模块做成 `SDK`、`framework`、`pod-repo`等。计划将核心业务打包成静态`framework`，制作静态`framewok`的网上到处搜索得到，但是真正能说清楚如何依赖`AFNetworking`的却很少，如何一步一步做`framework`很少，接下来我们就一起来看一下，如何制作一个依赖`AFNetworking`的静态库`framework`。

### 0x0002 详细步骤
- 我们要创建一个静态库工程：打开**Xcode ->File ->New->Project**，，我们选择 `Framework`

    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafystdbhmj31hy0u07wd.jpg)

- 保存到桌面
![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafyxotkz5j31800qi4go.jpg)


- 使用pod 来依赖AFNetworking,打出来的静态库。

    在引用的时候，引用静态库的工程也需要用 `pod` 安装`AFNetworking`，否则无法使用打包出来的`framework`。这种方法虽然优雅，但是也有风险，比如说一些特别老的工程可能没有使用 `pod` 来管理三方库，这就略微蛋疼了。But。。试问现在还要多少公司的工程不用`pod`来管理呢？如果有这种公司我建议裸辞回家过年哈。`pod`都不用的公司以后苦逼日多的是。
    
- 新建 `Podfile` 后，终端执行 `pod install`安装 `AFNetworking`

    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafz6nsqnfj30zy0qcwl9.jpg)

- 进入`xcworkspace`文件 编译项目，并拉入你的`SDK`将要封装打包的文件
    - 这里是将要把红框的`FMNetworking`文件夹封装成framework。`FMNetworking`内部一些文件依赖的 `AFNetworking`
    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafzck8zo0j31be0u0e3q.jpg)
    
- 对外暴露出你想要提供给别人使用的一些头文件

    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafzfz96fvj319z0u0u0x.jpg)


- 然后我们要把`framework`工程修改为静态库`framework`，因为我们创建的工程默认是动态库工程,将红框里面的`Mach-o Type` 修改为`Static Library`,这个一定要改，不改的话，打出来的framework 在引用的时候会报 如下错误。 

    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafziwoweij31t40qk1kx.jpg)
    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafynb82ylj31tg0so7wh.jpg)

    - 然后这里引入你刚才暴露出的头文件
        - 注意：我暴露出的头文件.h里面都没有引用 `AFNetworking`的文件。都是在`.m`里面引用的，不然编译不成功。
    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafznxlwloj31po0t01kx.jpg)
    

- 编译导出：` cmd + k`先清除缓存，然后`cmd+b`编译。你发现`products`文件夹里的`framework`由红色变成实心灰黑色。
    - 编译成功，直接`option + 鼠标左键`拖出 `products`文件夹里的`framework`到桌面放着
    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gafzqt27aaj31na0u07wh.jpg)    

- 注意：TARGETS —> Build Settings 中设置相关项 `Build Active Architecture Only` 设置为`NO`的意思是当前打包的`.framework`支持所有的设备.否则打包时只能用当前版本的模拟器或真机运行.

    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gamnc2plx0j31ds0hgn1b.jpg)
    
- `Build Setting` 搜索`Dead Code Stripping` 设置为`NO`是编译选项优化,包瘦身,(可不改)
    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gamnf488gej31cm0gctd2.jpg)
    
- 设置framework最低支持的版本

    ![](https://tva1.sinaimg.cn/large/006tNbRwgy1gamngroqw1j31ci0eijve.jpg)
    
### 0x0003 使用

- 你的工程也要使用 `pod` 引用 `AFNetworking`。
- 然后将桌面的 `framework`拖到你的工程中。
- 在要使用的地方导入`#import <FMNetworking/FMNetworking.h>`即可使用。


### 0x0004 总结
- 制作的`framework`中 某些`.m`文件中使用了`AFNetworking`，但是所有头文件无涉及`AFNetworking`。这样编译导出的`framework`正常；
- 使用时候，项目工程要用 `pod` 引用`AFNetworking`，然后在使用刚才的`framework`


