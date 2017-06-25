---
layout:     	post
title:       "利用搬瓦工VPS自建高速丝滑VPN"
excerpt: 		自建的专属 VPN ，随心畅享自己的网络海洋！
date:     	2017-01-01
author:     	"袁凤鸣"
categories:  实用技术
tags:
    - 实用技术
    - VPN
mathjax: true
---

* content
{:toc}

## 一 、前言
------

 * 之前一直用的所谓的主流收费VPN 或众多程序员所熟悉的  [lantern](https://getlantern.org/) （如果官网进不去可取 `GitHub` 的仓库去下载 [GitHub 仓库 lantern 地址](https://github.com/getlantern/lantern/releases) ） ，但是速度始终达不到理想状态。`GitHub` 下载个别人的 demo 那是个真要等到花儿都谢完了。 木有 VPN 时总是在百度和必应查找资料，花了很多时间结果找不到我们想要的东西。最最重要的是搜索结果有一半是广告，这个时候只能求助于 Google，无奈天朝 ，一直追求自由明主的 Google 早在10年就被轰出了墙外。哎！！！哀叹息！不知道我们的哪一代子孙才能畅游自由网络的海洋。

 
 
 

* 现在市面上的 VPN 产品满天飞，大多采用 `L2TP`、`PPTP`、`IP sec` 等协议， 那些卖家的 VPN 协议被限速，而且因为容易断线，以及只能全局代理。 。有不少是开张几个月就卷款跑路，然后重新弄个网站换个名字继续骗钱。
* 于是乎我找到了亲爱的搬瓦工，自己购买主机搭建VPN服务器，不论是速度还是用户体验，不要太爽的好伐，关键是价格很亲民，最便宜的一年20刀，折合人民币才100多大洋。我了解深入的是搬瓦工（当然也许还有更好的提供商），价格亲民、速度快，大家可以在官网首页看到机型 [配置和价格](https://bandwagonhost.com/vps-hosting.php)，如下：
 
![](http://wx1.sinaimg.cn/large/cb81ffe8gy1fbzc3fgoncj20c80c83zg.jpg)

最便宜的2.99刀一个月，一年20刀。接下来就给大家分享我搭建VPN的过程，搭建完成之后的VPN观看 `YouTube`高清那真的是无压力啊（当然还要取决于运营商给你的带宽）。

## 二、罗列一下目前主流 VPS 
-------

 网上比较流行的有[BandwagonHOST](https://bandwagonhost.com/)、[DigitalOcean](https://www.digitalocean.com/)、[Linode](https://www.linode.com/)、[Vultr](https://www.vultr.com/)，简单描述下网友对这几个 vps 的评价：

### [BandwagonHOST](https://bandwagonhost.com/) 
　　俗称搬瓦工，隶属于美国 IT7 旗下的 VPS 服务品牌，VPS 采用 OpenVZ 架构，主要针对低端 VPS 市场。
#### `优点`
1. 价格低廉
2. 支持支付宝
3. 可自由切换机房
4. 自带一键安装ss

#### `缺点`
1. 网速不稳定，丢包较严重
2. 采用 OpenVZ 架构，多用户共享硬件，容易受他人影响
3. 超卖严重，cpu 被过度分割


### [DigitalOcean](https://www.digitalocean.com/)
　　这是一家成立于 2012 年的总部设置在纽约的云主机商家，采用 KVM 虚拟，配置高性能的 SSD 做储存。
#### `优点`
1. 价格便宜
2. 高性能配置，搭载 SSD
3. 小时计费
4. 免费快照

#### `缺点`
1. CPU 容易超载
2. 硬盘空间小
3. 网络较不稳定


### [Linode](https://www.linode.com/)
　　来自美国，专注于基于 XEN 虚拟的 VPS，成立于 2003 年，办公地点在新泽西。

#### `优点`
1. 老牌 VPS，速度稳定
2. 有负载均衡
3. 提供 DNS 代管服务
4. 有试用服务

#### `缺点`
1. 价格高
2. 只支持信用卡
3. 快照功能收费

### [Vultr](https://www.vultr.com/)
　　这是一家成立于 2014 年的 VPS 提供商，服务器采用的 E3 的 CPU，清一色 Intel 的 SSD 硬盘，采用 KVM 架构。

#### `优点`
1. 性价比高，活动力度大
2. 配置 SSD，性价比更高
3. 小时计费
4. 支持安装 Windows 系统

#### `缺点` 
1. 网络稍差点
2. 只支持信用卡和 paypal
　　由于 Vultr 目前有送 20 刀的优惠，等于可以免费使用最低配置的主机 3-4 个月，且按小时计费，不用的时候可以 destroy 掉主机，就不会再计费，非常适合初次体验 vps 的我，在安装部署方面也非常的方便。

## 三、正题 —— 我选择的是搬瓦工
-----

[搬瓦工官网](https://bandwagonhost.com)链接： [https://bandwagonhost.com](https://bandwagonhost.com)

（不挂VPN应该很难进去的，推荐去`GitHub`安装个免费的 [lantern](https://github.com/getlantern/lantern/releases) 先凑合用一会！）

 - 进去先简单注册个账号。然后登陆后，点击 [vps-hosting](https://bandwagonhost.com/vps-hosting.php) 。就看到上图所介绍的 VPS 价格配置表。个人建议，如果只是搞个专线 VPN 的话就选最低档的 `$2.99` 每月。因为我个人也是选择的最低档套餐，查 [Google](https://www.google.com.hk/?gws_rd=ssl) 看 [YouTuBe](https://www.youtube.com/) 高清足以。
 - 再说一个卑贱的小手段，听说搬瓦工是可以试用一个月退款的。我第一次购买的是一个月想试用下，后来查看了一些文章说首次使用一个月不满意可以全额退款。不过有实力的小伙伴还是不要这样猥琐了哈。。我只是单纯的科普下，。哈哈~~
 - 选择你想要的套餐后点击 `order` 下单，就会看到如图页面：
 
 ![](http://wx4.sinaimg.cn/large/cb81ffe8gy1fbzc3avytyj20rj0fhaey.jpg)
 
 位置：我选择的是默认的洛杉矶。我也不知道各个地区位置的 VPS 到底差异如何。
 - 然后来到下图：
 
 ![](http://wx3.sinaimg.cn/large/cb81ffe8gy1fbzc3b56rkj20sf0cz76o.jpg)
 
  **说明几点：**
  
   * `Promotional Code `： 如果你有优惠码就填上去。。没有的话这里有 [优惠码](http://www.cmsky.com/bandwagonhost-promo/) 。我擦，日了🐩了，我当初就木有想到去网上找优惠码。后来闲逛论坛时发现的，不确定是否有用。你们可以试试。优惠码可以减免   `5%` 的大洋，后期买一整年的要是也可以用就爽了。
   * 然后 `check out` 进入支付环节了。确认支付信息，选择 `Complete Oreder` 选择支付宝进行扫码支付吧。
   * 也可以选择 `PayPal` 进行支付。`PayPal` 分国内版和国际版，国内版是不支持美元支付的，而且两者的账户是不通的，所以你注册了国内版是无法支付的，国际版的地址是：[https://www.paypal.com](https://www.paypal.com)，虽然是中文，但是货币是USD美元，绑定一张银联的卡就可以购物了。

## 四、搬瓦工VPS使用及面板介绍
-----

- 我们付款成功之后，稍等片刻，可以看到购买的VPS已经激活。
![](http://wx1.sinaimg.cn/large/cb81ffe8gy1fbzc3bj07zj20sk0c741w.jpg)

根据上图，我们可以找到已购搬瓦工VPS的方案，确定左边显示 `ACTIVE` 就可以用，如果是 `PENGDING` 需要等一会。点击 ``KiwiVM Control Panel`` 就可以进入面板管理。

* 进入KiwiVM管理后台，点击左侧 `Root Shell-interactive `，此时会以H5的形式打开一个 `terminal窗口 `，执行 `passwd `命令修改 ROOT 密码。输入密码的步骤是没任何反应的，输入完毕直接回车即可。
（这里还是建议修改一下 ROOT 密码，免得每次需要密码操作时还要进入搬瓦工后台都要去看一下。）

按照如图操作：
![](http://wx1.sinaimg.cn/large/cb81ffe8gy1fbzc3cc93rj20gr042t99.jpg)

* 然后选择 `Install new OS `  安装一个系统。这系统默认就是 **centos-6-x86** 。你可以选择换其他的系统，也可以就用这默认的。。我就是用的这个默认的系统。反正我这菜逼也不知道其他各个系统的区别。
![](http://wx4.sinaimg.cn/large/cb81ffe8gy1fbzc3c6q5ej20nt0i741x.jpg)

## 五、安装Shadowsocks Server
------


>> 搬瓦工也提供了 openVPN 一键安装，个人感觉 Shadowsocks 更好用，有两种加速模式，访问会更快速。
 
其实这篇文章介绍的是 SS 的安装，它跟 VPN 的原理差不多，因为 SS 采用的是自由协议，一般被墙的可能性要小得多，所以更加稳定！其实我也不知道 SS 和 VPN 的具体差异，但能确定 SS 在稳定性上更有优势。简单给两张在网上找的图对比下：

其他模式的VPN：
![](http://wx1.sinaimg.cn/large/cb81ffe8gy1fbzc3d0uc8j20j303k3z6.jpg)

shadowsocks 的交互模式 ：
![](http://wx4.sinaimg.cn/mw690/cb81ffe8gy1fbzc3e0zlaj20i108kt9o.jpg)


* 好了。我们现在在控制台的左侧菜单栏找到 `Shadowsocks Server`  并安装，安装好的Shadowsocks Server界面是这样的：
![](http://wx4.sinaimg.cn/mw690/cb81ffe8gy1fbzc3e6yf6j20jj08bjsb.jpg)

* 这个时候就可以使用了。不过速度可能不是最理想的。
网上很多版本的 `shadowsocksX` 不能跟新 `PAC` 。
建议 Mac 用户下载我网盘的 [shadowsocksX](https://pan.baidu.com/s/1dEDFqnv) 链接: [https://pan.baidu.com/s/1dEDFqnv](https://pan.baidu.com/s/1dEDFqnv) 密码: **qd93**
进行安装设置四个参数。

* 其他用户可去 `Github` 下载 对比版本，这里给个能下载的链接。因为官方的仓库已经并墙了。[`shadowsocks ` 其他用户进去看 `README` 下载](https://github.com/ziggear/shadowsocks)
![](http://wx2.sinaimg.cn/mw690/cb81ffe8gy1fbzc3cxcxuj20ul0gdqaq.jpg)

## 六、 使用 Speeder 给 VPN 加速。
-----

完成上面的步骤，你确实是可以访问墙外网站了。但其实还可以提速。使用 `Speeder` 给 VPN 加速步骤如下：

1、 点击 **KiwiVM** 控制台左边的 **Root shell - interactive** 右边就开启一个 `terminal窗口 `。或者打开电脑自带的终端也可以。

2、 先连上远程主机

	ssh -l root -p 12830 192.243.112.242
    
把端口和IP换成你自己主机的，然后需要输入root密码，输入在第一步我们设置的密码就可以了。

3、 安装 `Net-Speeder` 输入下面的命令进行安装：

		wget https://coding.net/u/njzhenghao/p/download/git/raw/master/net_speeder-installer.sh
		
这里我用的是别人coding上的sh脚本，有现成的就用。更何况自己还不会写。。那干嘛不用别人大牛的。。

4、 编译并安装
输入下面的命令编译 `Net-Speeder`：

	bash net_speeder-installer.sh
	
命令执行成功之后，执行reboot重启主机，或者在后台面板重启主机也行。（此时远程主机的连接会断开，需要重新连接）

5、 端口加速
最后一步，加速端口：

	nohup /usr/local/net_speeder/net_speeder venet0 "ip" >/dev/null 2>&1 &

执行完这个命令应该会有一个端口号打印出来，证明加速成功了！然后Shadowsocks菜单点击退出再重新启动。现在就可以开始的丝滑飞墙之旅了。


**（注意：加速端口这个命令每次重启主机都需要执行一次，因为这个脚本没有加到开机自启动！）**
动了如下操作就要重新端口加速。不过我们也不会经常手贱去搞这个地方。最多只是登录进去操作其他的了。
![](http://wx1.sinaimg.cn/mw690/cb81ffe8gy1fbzc3esx04j21130f6td2.jpg)

网上有人说把 ：

	nohup /usr/local/net_speeder/net_speeder venet0 "ip" >/dev/null 2>&1 &
	
添加到
**vi /etc/rc.d/rc.local**
这个文件中，就可以开机自启动端口加速。。但是我木有在 VPS 中找到这个文件哦哦哦。谁找到怎么搞还望告诉我。


<b>好了。到此！！！ 我们自建 VPN 教程就完成了。鉴于本人也初次搭建 VPN ,各位看到的老大如果有什么不恰当还请轻喷。后续如有新问题我再继续更新此贴！</b>