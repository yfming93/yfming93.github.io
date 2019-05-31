---
layout: post
title:  "Mac 环境安装 remix-ide"
date:   2019-05-31
author: "袁凤鸣"
excerpt: Mac 环境安装 remix-ide

categories: 
    - solidity
tags: 
    - solidity
    - remix
mathjax: true

---
* content
{:toc}
---
<!--{% raw %}-->

### 0x01 天坑
**上来就是`npm install remix-ide -g`的坑**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/D23B25F41AF5502C17AC26A98ED43542.jpg)

- 正常情况下 不管怎么 安装都报错如图一大堆。

### 0x02 卸载 node npm 重装
卸载 node npm  参考的教程： [nodejs在Mac下的卸载](https://www.cnblogs.com/kivenlv/p/6096171.html)

**重安装：**
部分参考：[搭建智能合约开发环境Remix IDE及使用](https://cloud.tencent.com/developer/article/1194056)
部分参考：[Mac OS 下 NVM 的安装与使用](https://www.jianshu.com/p/622ad36ee020)

目的：安装 `node` `npm` `nvm` 为如下三个版本：

    $ node --version
    v7.10.1
    $ npm --version
    4.2.0
    $ nvm --version
    0.33.11


达到如上前期要求开始安装。

### 0x03 开始安装 remix-ide

**注意：**先把这个目录的读写权限提高
`sudo chmod 777  /usr/local/lib/`

- 然后开始：`sudo npm install remix-ide -g`


```
# mingo @ 192 in ~ [16:27:10]
$ sudo chmod 777  /usr/local/lib/

# mingo @ 192 in ~ [16:27:45]
$ sudo npm install remix-ide -g
npm WARN deprecated tar.gz@1.0.7: ⚠️  WARNING ⚠️ tar.gz module has been deprecated and your application is vulnerable. Please use tar module instead: https://npmjs.com/tar
npm WARN deprecated fs-promise@2.0.3: Use mz or fs-extra^3.0 with Promise Support
/Users/mingo/.nvm/versions/node/v7.10.1/bin/remix-ide -> /Users/mingo/.nvm/versions/node/v7.10.1/lib/node_modules/remix-ide/bin/remix-ide

> websocket@1.0.26 install /Users/mingo/.nvm/versions/node/v7.10.1/lib/node_modules/remix-ide/node_modules/web3-providers-ws/node_modules/websocket
> (node-gyp rebuild 2> builderror.log) || (exit 0)

CXX(target) Release/obj.target/bufferutil/src/bufferutil.o
SOLINK_MODULE(target) Release/bufferutil.node
CXX(target) Release/obj.target/validation/src/validation.o
SOLINK_MODULE(target) Release/validation.node
/Users/mingo/.nvm/versions/node/v7.10.1/lib
└─┬ remix-ide@0.8.0
└─┬ remixd@0.1.8-alpha.6
└─┬ web3@1.0.0-beta.27
└─┬ web3-core@1.0.0-beta.27
└─┬ web3-core-requestmanager@1.0.0-beta.27
└─┬ web3-providers-ws@1.0.0-beta.27
└── websocket@1.0.26  (git://github.com/frozeman/WebSocket-Node.git#6c72925e3f8aaaea8dc8450f97627e85263999f2)


# mingo @ 192 in ~ [16:30:01] C:127
$ cd /Users/mingo/Desktop/blockchain/code

# mingo @ 192 in ~/Desktop/blockchain/code [16:58:21]
$ remix-ide
setup notifications for /Users/mingo/Desktop/blockchain/code
Starting Remix IDE at http://localhost:8080 and sharing /Users/mingo/Desktop/blockchain/code
Fri May 31 2019 16:58:24 GMT+0800 (CST) Remixd is listening on 127.0.0.1:65520

```



<!--  {% endraw %}-->


### 0x04 完成效果

完成后就阔以关联本地的sol文件开发智能合约了
开启remix-ide后 访问浏览器路径：http://localhost:8080

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/20190531170925.png)

