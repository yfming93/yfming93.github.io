---
layout: post
title:  "使用 BBR 脚本 给 SSR 加速"
date:   2019-02-15
author: "袁凤鸣"
excerpt: 使用 BBR 脚本 给 SSR 加速。

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


请勿再使用 Linode 或 Vultr VPS 来搭建 FQ 类工具，它们已不适合作为搭建 FQ 类工具的选择。
如有需要，推荐 BandWagon（搬瓦工），CN2 线路系统内核自带 BBR 模块，SSH 端口非默认 22 端口。是您搭梯最佳选择。
关于搭梯工具，由于墙识别 SSR 的流量已经很准确，请勿再使用 SSR。可重新考虑 SS 或新的工具如 V2***。

之前我们给 SS 加速的时候用的是 K*****，它是用流量换速度，缺点也很明显，上手有点麻烦。而 SS 在 19大期间已经被日益壮大的大长城国家防火墙有效和谐。因此，对于 SSR，我们推荐使用另一个更便捷的，只需要安装服务器端即可，不再需要在电脑上安装客户端，这就是谷歌开发的 BBR 模块。

### 0x002 方法一
连接 Xshell。

**下载 BBR 加速脚本：**

    wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
执行：

`chmod +x bbr.sh && bash bbr.sh`

回车确定安装

出现提示：

    Info: Your kernel version is greater than 4.9, directly setting TCP BBR…
    Info: Setting TCP BBR completed…

用命令检查一下：

    ps aux | grep bbr*

发现 bbr 的进程正在运行。

BBR 安装配置完毕，SSR 立即得到提速。


### 0x003 方法二
**——————-下面内容不适用于Linode VPS 安装 BBR———————**

如果你用的不是 Linode VPS，用其他 VPS 安装，则可能要经历更新 CentOS 7 4.9 版本linux 内核的过程。

CentOS 7的4.9内核合并了Google研发的BBR TCP阻塞算法，使用效果大概可以跟锐速相比。

先检查你的 VPS 的内核版本，可以用如下命令检查一下：

 - uname -r
    - 如果大于 4.9，比如：4.14.14-xxx.elrepo.x86_64 或 4.15.4-1.xxxx.elrepo.x86_64 ，则上面的脚本安装会一切顺利。

    - 如果小于 4.9，比如：3.10.0-693.11.6.el7.x86_64，则无需执行上面的 BBR 安装步骤，直接从下面的更换 4.9版本内核开始即可。该内核自带 BBR 模块。

- iozoom vps 上安装 BBR 安装之后，可能会出来这样的提示：

    Error: /boot/grub2/grub.cfg not found, please check it.
    这就很可能说明没能成功安装新的 Kernel 版本。
    
    则执行如下操作：

- 更换4.9版本内核

        wget -O- https://soft.wellphp.com/scripts/install_bbr_centos.sh | bash
        
安装结束之后，重启： `reboot`
会断开 vps 的连接。过一会，重新连接，然后输入如下命令验证：

    sysctl net.ipv4.tcp_congestion_control net.core.default_qdisc

结果如下即可：

    net.ipv4.tcp_congestion_control = bbr
    net.core.default_qdisc = fq
    
此脚本的特点：

1、无需手动修改grub启动项；
2、已经默认设置拥塞算法为BBR，无需额外设置，重启即可用；
3、更新至4.9正式版
4、非模块化编写，lsmod | grep bbr 查不到 bbr 模块，但 ps aux | grep bbr* 可以查到进程。

### 0x004 终端详细步骤
楼主我是 virmach 的 vps ， Centos 6.5 操作系统，用方法二安装的加速。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1g079dj0ohkj30u00y0trh.jpg)

### 0x005 最终效果如下图
![](https://ws2.sinaimg.cn/large/006tKfTcgy1g0bkybg16mj31g00u01ky.jpg)


