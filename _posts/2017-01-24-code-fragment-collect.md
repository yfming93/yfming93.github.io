---
layout:     	post
title:       "好用高效的代码片段收集"
excerpt: 		收集常用高效率的代码片段，持续更新ing
date:     	2017-01-24
author:     	"袁凤鸣"
categories:  开发效率
tags:
    - 开发效率
    - 代码片段收集
mathjax: true
---

* content
{:toc}

## Xcode 相关：
##### Xcdoe真机测试文件地址：
    /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport

##### 查看Xcode的UUID方式，在终端执行 ：
- `defaults read /Applications/Xcode.app/Contents/Info DVTPlugInCompatibilityUUID`

##### Xcode 插件目录如下 ：
- `~/Library/Developer/Xcode/Plug-ins `
- `~/Library/Application Support/Developer/Shared/Xcode/Plug-ins`
- `~/Library/Developer/Application Support/Developer/Shared/Xcode/Plug-ins`





##### 将 Xcdoe 的软件的 UUID 加到所有插件中：
- `find ~/Library/Application\ Support/Developer/Shared/Xcode/Plug-ins -name Info.plist -maxdepth 3 | xargs -I{} defaults write {} DVTPlugInCompatibilityUUIDs -array -addUUID`

	在终端中运行上述命令就解决了插件失效的问题，在插件 Info.plist 的 DVTPlugInCompatibilityUUIDs 中也能看到新增的 UUID 了。
	- 网络上真的好多把 **-array -addUUID** 错写成了 **-array-addUUID**。写成连在一起了导致写入 **DVTPlugInCompatibilityUUIDs**出错。我第一次运行网友这个错误的方式时直接把 **DVTPlugInCompatibilityUUIDs**数组变成了 **string**类型。

##### 直接清除Xcode缓存的数据:
- `~/Library/Developer/Xcode/DerivedData`

##### Xcode 的 Code Snippets 文件存放于   【代码块】
- `~/Library/Developer/Xcode/UserData/CodeSnippets`  目录，只要直接把 *.codesnippets 文件放到这个目录下（若没有则自己创建），重启 Xcode 即可生效。

## 文件高效处理相关

#### 给文件加前缀：(切换到对应文件夹终端执行)
- **for i in \`ls\`;do mv $i \`echo "前缀内容" $i\`;done;**

#### OS X 下统计项目代码行数:

这是一条普通的计算代码行数的命令，在终端中切换到源码文件所在目录下执行即可：


	find . "(" -name "*.m" -or -name "*.mm" -or -name "*.swift" -or -name "*.cpp" -or -name "*.h" -or -name "*.rss" ")" -print | xargs wc -l
	
	
可以计算代码行数，源码文件类型在命令里哦，可以根据自己需要修改，上面这条是计算 iOS 项目的，效果如下：

![](https://www.eyrefree.org/images/Wrap-Count-1.png)

#### OS X 下打印文件夹的目录结构:
	find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'

