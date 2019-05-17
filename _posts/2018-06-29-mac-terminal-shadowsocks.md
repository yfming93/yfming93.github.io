---
layout: post
title:  "Mac 终端走 shadowsocks 代理"
date:   2018-06-29
author: "袁凤鸣"
excerpt:
categories: 
    - 实用技术
tags: 
    - VPN
mathjax: true

---
* content
{:toc}
---


## 一、起因：

由于使用 `cocoapods` 安装依赖库。使用`pod
 install` 等等各种命令时候。终端卡着蜗牛速度。每次新加依赖库都搞半天，国内开源的依赖库还好。要是碰到几个国外的依赖库那真是泪崩啊。
 
 经过一番了解后才知道。`Mac` 端 `shadowsocks` 软件的代理开启后。只对浏览器进行了代理。木有对所有软件代理。这个原因就导致了`pod
 install`速度慢，即使你傻傻开启了`shadowsocks`软件的代理也毫无卵用的。所以 `Mac` 终端也使用上代理就慢慢折腾了起来。





 
## 二、解决方案：

**shadowsocks设置为：**

- 打开`shadowsocks`软件，设置自动代理模式，并填好自己的`SS`四个参数勾选服务器。
- 终端 执行`vim ~/.zshrc `打开`.zshrc`文件。
- 在文末添加如下代理配置:
    
    ```
    # proxy list
    alias proxy='export all_proxy=socks5://127.0.0.1:1080'
    alias unproxy='unset all_proxy'
    ```
- `:wq`保存退出
- 执行`source ~/.zshrc`

## 三、使用：
- 开启终端代理命令：`proxy` 
- 解除终端代理命令：`unproxy`

**eg：**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/gTyi8F.jpg)

**说明：**
查看当前的`ip`地址：
- `curl ip.cn`
- `curl cip.cc`

**这个方法只对当前窗口有效。所以再打开一个新窗口时候又得执行一遍命令**

参考资料：[https://github.com/mrdulin/blog/issues/18](https://github.com/mrdulin/blog/issues/18)



