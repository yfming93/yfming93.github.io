---
layout: post
title:  "virmach 自购 VPS 搭建 ss、ssr 教程"
date:   2019-02-14
author: "袁凤鸣"
excerpt: virmach 自购 VPS 搭建 ss、ssr 教程。

categories: 
    - 实用技术
tags: 
    - VPS
    - VPN
mathjax: true

---
* content
{:toc}
---

### 0x001 引言
楼主我之前用的是 搬瓦工的`VPS`。两年前买的最低配的19.9美金一年。用的很酸爽。速度自行感觉可以，看`YouTube`也行。

之前也写过一篇搬瓦工自建梯子的帖子：[利用搬瓦工VPS自建高速丝滑VPN](https://www.yfmingo.cn/2016/09/05/bandwagonhost-vpn/)

但是呀。。我擦，今年 2019.02.09 日。正在春节过年期间，我的搬瓦工那个最低配的套餐到期了忘记在到期之前续费。结果到期后想再次购买时发现搬瓦工早就下架了此套餐。

不得已一顿百度找的了`virmach`。找这个原因主要是便宜，真是便宜。最低配的 1.25 美金一个月。我搭建后查谷歌是勉强正常的，但是看`YouTube`速度不太满意不行，没有之前的搬瓦工好。想到平时也就查查谷歌，很少看`YouTube`。就准备入手折腾这家了。





### 0x002 准备条件

- 自行购买 `virmach` 的`VPS`主机
    - `virmach`官网：[https://virmach.com/](https://virmach.com/)
    - 买`virmach`的原因是价格非常的优惠。
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/d8moDR.jpg)
- 安装 `Centos 6.5` 操作系统


### 0x003  相关信息获取
- 后台获取 `ssh` 登陆信息
在购买前首先需要你已经购买了对应的 `vps` 。登陆 `virmach` 后，首先获取你的 `vps` 登陆`ip`，在 `virmach` 后台选择 `Service` =》`My Services`：
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/sCurWk.jpg)

- 进入实例列表，然后点击你 vps ：
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/woVw3Z.jpg)
- 进入 `Manage Product` 页面后，往下拖动，会看到你具体的 `vps` 信息，比如 `ip` 地址、`root` 登陆密码等：
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/VumCbU.jpg)

- 在`mac`电脑终端使用 `ssh` 登陆工具进行连接到远程`vps`
    - ssh root@vpsip (vpsip 是上面取到的ip)
        - 输入密码，输入密码是完全没反应的状态，这是正常的。连接到`vps`成功后再如下操作。
    - 终端 输入如下 回车

            wget –no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
            
 -  可能报错`-bash: wget: command not found`
     -  则先安装 `yum -y install wget`
-  然后 `chmod +x shadowsocks-all.sh` 回车
-  然后`./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log`回车
-  然后 安装下图具体选项选择。


### 0x004  具体安装步骤
终端全部的操作过程，已经制作成了一个漂亮的长长图。如下：

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/szMMRg.jpg)


### 0x005 关于 ss、ssr 服务端的的一些常用命令介绍

如上图显示，就表示安装成功了。安装成功后，系统会默认启动 ssr 。

关于 ss、ssr 服务端的的一些常用命令介绍
启动脚本后面的参数含义，从左至右依次为：启动，停止，重启，查看状态。

**Shadowsocks-Python** 版：

    /etc/init.d/shadowsocks-python start | stop | restart | status

**ShadowsocksR** 版：

    /etc/init.d/shadowsocks-r start | stop | restart | status

**Shadowsocks-Go** 版：

    /etc/init.d/shadowsocks-go start | stop | restart | status

**Shadowsocks-libev** 版：

    /etc/init.d/shadowsocks-libev start | stop | restart | status

比如我要启动 `ssr`，自己输入：`/etc/init.d/shadowsocks-r start` 即可，如上图最末尾。

然后使用 ssr 客户端连接你的账号，这样就可以开始愉快的使用 ssr 了 ：）。



