---
layout: post
title:  "Mac电脑 GitHub 配置SSH Key"
date:   2024-01-16
author: "袁凤鸣"
excerpt: 

categories: 
    - ssh
tags: 
    - ssh 
mathjax: true

---
* content
{:toc}
---

## 2024-01-20 00:01:22 补充更新
最近Mac的SourceTree提交SSH仓库经常出现：

    ssh:connect to host github.com port 22: Connection timed out
    
查阅相关资料后明白22端口无法使用了。因此想到修改端口试试。一般默认端口都是443

- cd 进入`~/.ssh`下    
- 使用`vim config`打开 编辑 config文件
- 输入`I`后可以编写。粘贴如下：

        Host github.com
        User git
        Hostname ssh.github.com
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/id_rsa
        Port 443
- 然后`WQ`保存退出，并使用如下检查是否成功

        ssh -T git@github.com

- 按照提示操作，成功后如图。然后可以去提交了
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202401200008609.png)

## 原因
之前一直使用https的仓库链接进行提交`Github`仓库。但是最近一直动不动403无响应。经常链接不上。现在采用`SSH`链接仓库。记录下方便查询。





## 检查

**先看当前Git环境有没有配置提交账号的user name和email** 
- 使用`git config --list `查看。如下是已经配置好了。
    ```
    mingo@macdeMacBook-Pro-2 ~ % git config --list
    credential.helper=osxkeychain
    init.defaultbranch=main
    user.name=yfm
    user.email=928289877@qq.com
    core.excludesfile=/Users/mingo/.gitignore_global
    difftool.sourcetree.cmd=opendiff "$LOCAL" "$REMOTE"
    difftool.sourcetree.path=
    mergetool.sourcetree.cmd=/Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh "$LOCAL" "$REMOTE" -ancestor "$BASE" -merge "$MERGED"
    mergetool.sourcetree.trustexitcode=true
    commit.template=/Users/mingo/.stCommitMsg
    ```
    
## 检查是否存在SSH Key
`cd ~/.ssh`进行切换到`.ssh`文件夹进行` ls`查看文件。
- 看是否存在 `id_rsa` 和 `id_rsa.pub`文件，如果存在，说明已经有`SSH Key`
- 我的就是这样，还没有
    ```
    mingo@macdeMacBook-Pro-2 .ssh % ls
    known_hosts
    ```
    
**如果没有SSH Key，则需要先生成一下**
- 我这里使用的是`Github`账号邮箱。
    ```
    ssh-keygen -t rsa -C "yfmingo@163.com"
    ```
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202307162241589.png)
    
## 获取SSH Key
- `cat id_rsa.pub`命令出现秘钥。
- 终端控制台会出现` ssh-rsa`的一大堆字符串。
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202307162247936.png)
    
## GitHub添加SSH Key

- `GitHub`点击用户头像，选择`setting`
- 点击 `New SSH Key` 新建一个，取个名字。填入刚才得到` ssh-rsa`的一大堆字符串
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202307162249765.png)    
    
## 验证和修改

测试是否成功配置`SSH Key`
```
ssh -T git@github.com
//运行结果出现类似如下
Hi yfming93! You've successfully authenticated, but GitHub does not provide shell access.
```

## 完整操作记录

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202307162254706.png)

之前已经是`https`的链接，现在想要用`SSH`提交怎么办？
直接修改项目目录下 `.git`文件夹下的`config`文件，将地址修改一下就好了。
- `.git`默认是隐藏的。
    ```
    Finder 始终显示隐藏文件或文件夹。
    defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
    defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
    ```

`git`地址获取可以看如下图切换。

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/202307162256554.png)
