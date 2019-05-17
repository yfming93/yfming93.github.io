---
layout: post
title:  "git 中忽略 UserInterfaceState.xcuserstate"
date:   2018-10-18
author: "袁凤鸣"
excerpt: 

categories: 
    - iOS
    - 报错调试
tags: 
    - xcuserstate
mathjax: true

---
* content
{:toc}
---

## git 中忽略 UserInterfaceState.xcuserstate

### 1.UserInterfaceState.xcuserstate是什么？

该文件为`xcode`默认自带文件，是`xcode`的配置信息，git会用这个文件记录下来。
比如：手动删除此文件，退出`xcode`后重启`xcode`，设置了`debug` 调试断点等。此文件会自动创建并跟踪

**SO,**  **此文件无需`push`，应忽略。不忽略的话在多人开发时提交文件时候会因为这个文件导致冲突。**

### 2.使用.gitignore 如何解决？
终端输入以下指令：【网络比较流行的方案。但是对我无效。2018-10-18实测】

```objc
git rm --cached 工程名称.xcodeproj/project.xcworkspace/xcuserdata/电脑用户名称.xcuserdatad/UserInterfaceState.xcuserstate
    
git commit -m "Removed file that shouldn't be tracked"    
    
git push
```





我项目的`.gitignore`配置如下：

```objc
.DS_Store
*.xcuserstate
project.xcworkspace
UserInterfaceState.xcuserstate
oclint.html
build/
derivedData/
xcuserdata
xcuserdata/  
UserInterface.xcuserstate
*.xcbkptlist
```

配置完`.gitignore`文件后， 要注意下面一个前提

要进入该工程的路径中，也就是`.xcodeproj`的上一级，否则会出现以下错误

```objc
fatal: path spec '[ProjectFolder].xcodeproj/project.xcworkspace/xcuserdata/[myUserName].xcuserdatad/UserInterfaceState.xcuserstate' did not match any files
```

**重点说明:**我真的是按照如上步骤这样搞的。但是任然是如上挂了。在检查了其他能意识想到的情况后。后来寻思，既然提示匹配不到文件。是不是文件路径有问题呀。网上复制来复制去都是很久以前的方案了。新版`xcode`是不是改变了这个路径。

### 3.解决误区

按照如上思路。。在项目文件目录中到处找。因为我项目是用`cocoapods`来管理的 。所以有`xcworkspace`文件。最终在`xcworkspace`文件中找到目标文件。
**路径：**

```objc
FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad
```

然后：

```objc
git rm --cached FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad
```   

给的提示是：

```objc
fatal: not removing 'FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad' recursively without -r
```

### 4.正确解决姿势

**所以最终的正确命令如下：**

```objc
git rm -r --cached [工程名称].xcworkspace/xcuserdata/[电脑用户名称].xcuserdatad
    
git commit -m "Removed file that shouldn't be tracked"    
    
git push
``` 
经过这些步骤后就完美解决了。


### 5.终端操作记录
    
```c    
   Last login: Thu Oct 18 14:58:49 on ttys005
Fengmings-iMac:~ mingo$ cd /Users/mingo/Desktop/AAAllGitRepos/jshop_cbd_ios
Fengmings-iMac:jshop_cbd_ios mingo$ ls -a
   .                CHANGELOG.md            Podfile.lock
   ..                FupingElectricity        Pods
   .DS_Store            FupingElectricity.xcodeproj    README.md
   .git                FupingElectricity.xcworkspace
   .gitignore            Podfile
Fengmings-iMac:jshop_cbd_ios mingo$ git rm --cached FupingElectricity.xcodeproj/xcuserdata/mingo.xcuserdatad/UserInterfaceState.xcuserstate
   fatal: pathspec 'FupingElectricity.xcodeproj/xcuserdata/mingo.xcuserdatad/UserInterfaceState.xcuserstate' did not match any files
Fengmings-iMac:jshop_cbd_ios mingo$ git rm --cached FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad
   fatal: not removing 'FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad' recursively without -r
Fengmings-iMac:jshop_cbd_ios mingo$ git rm -r --cached FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad
   rm 'FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad/IDEFindNavigatorScopes.plist'
   rm 'FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad/UserInterfaceState.xcuserstate'
   rm 'FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad/xcdebugger/Breakpoints_v2.xcbkptlist'
Fengmings-iMac:jshop_cbd_ios mingo$ git commit -m "Removed file that shouldn't be tracked"
   [dev/shopv2 bf20f45] Removed file that shouldn't be tracked
   3 files changed, 51 deletions(-)
   delete mode 100644 FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad/IDEFindNavigatorScopes.plist
   delete mode 100644 FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad/UserInterfaceState.xcuserstate
   delete mode 100644 FupingElectricity.xcworkspace/xcuserdata/mingo.xcuserdatad/xcdebugger/Breakpoints_v2.xcbkptlist
Fengmings-iMac:jshop_cbd_ios mingo$ git push
   Username for 'https://gitee.com': yfmingo@163.com
   Password for 'https://yfmingo@163.com@gitee.com':
   Counting objects: 3, done.
   Delta compression using up to 4 threads.
   Compressing objects: 100% (3/3), done.
   Writing objects: 100% (3/3), 318 bytes | 318.00 KiB/s, done.
   Total 3 (delta 2), reused 0 (delta 0)
   remote: Powered by Gitee.com
   To https://gitee.com/wuhan_wan_teng/jshop_cbd_ios.git
   f2db7ec..bf20f45  dev/shopv2 -> dev/shopv2
Fengmings-iMac:jshop_cbd_ios mingo$

```


