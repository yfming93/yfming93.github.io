---
layout:     	post
title:       "Xcode 中删除一整行代码的快捷键设置"
date:     	2017-09-27
author:     	"袁凤鸣"
categories:  开发效率
tags: 
    Xcode 
mathjax: true
---

* content
{:toc}

## Xcode 中删除一整行代码的快捷键设置

### (一)、介绍

升级到`Xcdoe9`后面。。之前在`Xcode8` 中自定义的 **delete line** 快捷键好像失效了。

呃呃呃~~~其实 `delete line`是`Xcode8`自带的。但是之前我发现不管用。后我自己折腾加了个快捷键 `cmd + d`就可以直接删除一整行了。

这个快捷键我已经严重依赖了。。可是当我升级到`Xcode9`后。发现不管用了。。

但是当我仔细研究后发现 ：
**moveToEndOfLine**、**deleteToBeginningOfLine**、**Delete to End of Paragraph**

这三个凑一起就是删除一行的意思。






    <string>moveToEndOfLine:</string>
    <key>Move to End of Line Extending Selection</key>
    
    <key>Delete to Beginning of Line</key>
    <string>deleteToBeginningOfLine:</string>

    <key>Delete to End of Paragraph</key>
    <string>deleteToEndOfParagraph:</string>
        


## (二)、解决方案     

如上那三个快捷方式 在 `/Applications/Xcode.app/Contents/Frameworks/IDEKit.framework/Resources/IDETextKeyBindingSet.plist`这个文件里面可以查找到。

或者在 `Finder` 中输入 `⌘ + G`,然后复制这个路径粘贴并回车。
   
打开 `IDETextKeyBindingSet.plist `，用 `Sublime Text` 或者 `Vim` 都可以。添加一个新的字典成员

        <key>Custom Deletions</key>
            <dict>
            <key>Delete Current Line </key>
            <string>moveToEndOfLine:, deleteToBeginningOfLine:, deleteToEndOfParagraph:</string> 
            </dict>


保存并重启 `Xcode`。打开`Xcode Preferences` ,点击 `Key Bindings`
在搜索框中输入 `Delete`，找到`Delete Current Line`
双击 `Key`,设置为`⌘+D`(我设置的是这个键 。当然你可以设置为你喜欢的快捷键)。

**说明：**有个缺点就是撤销的时候要连续撤销两次才会恢复删除。。这点不然`Xcode`自带的 `delete line` 撤销好用。只可惜不知什么原因 `delete line`在 `Xcode9`里面用不了啊啊 O(∩_∩)O~



