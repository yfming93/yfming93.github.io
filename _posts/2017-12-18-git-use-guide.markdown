---
layout: post
title:  " Git 常用命令使用指南"
date:   2017-12-18
author: "袁凤鸣"
categories: 开发效率
tags: git
excerpt: Git 常用命令使用指南。
mathjax: true
---
* content
{:toc}


## 首先附上神图
![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmkpcop11lj30yg0oc46d.jpg)

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmkpnb6169j311l0k1wfl.jpg)

## 生成key
安装好git后用以下命令生成key文件（注意不要输入密码，直接三次回车就可以了），并将key.pub文件发给管理员。
> ssh-keygen -t rsa

## clone
拿到代码地址后clone下来，如：
> git clone git@192.168.199.229:TestGit.git

## config
>git config user.name “…”
>git config user.email “…”

##版本回退
>git reset — —hard HEAD  重置到当前版本,之前做了修改单没有提交的将会被删除
>git reset — —hard HEAD ^回滚上一个版本
>git reset — — hard HEAD ^3 回滚到前面3个版本
>git reset — — hard [sha1生成的7位版本号]

##查看日志
>git log 查看详细日志
>git reflog 查看引用日志,方便查看7位版本号

## branch
当我们要进行开发的时候，首先是从master基础上新建自己的分支,如：
> git branch -d dev-yangxi-order  创建新的分支并直接切换到这个分支上
> git branch 查看所有分支
> git checkout [分支名字]切换到想要切换的分支

##删除分支
git branch -d dev2删除dev2这个分支,前提是要切换到别的分支
git branch -D dev2强制删除这个分支
git branch -m oldname newname重命名分支
git branch -M oldname newname强制重命名分支,这样会覆盖已有的分支

## commit
这时候我们就可以在本地进行自己编码工作了，每次节点改动养成提交的习惯。
如果有新增加文件，需要加入到版本控制里面：
> git add .
没有的话直接提交：
> git commit -a -m "更新内容"

## merge
模块节点功能开发完成后，先在本地合并代码。
在此之前先切换到master：
> git checkout master
然后合并刚刚开发好的内容：
> git merge dev-yangxi-order

## pull
使用pull命令合并远程代码
> git pull origin master
如果合并后有冲突，跟同事商量保留谁的代码，解决冲突。
eclipse解决冲突后需要做remove from index 然后再次commit
> 解决完后可以push代码
为了确保在保证代码冲突时没有人push代码，通常需要先再pull一次，确保没有冲突再做push操作
> git push origin master

## 新的迭代
至此，一次开发周期就算是完成了，刚刚开发的本地分支就可以删掉了，要开发新的功能，继续做同样的操作过程即可
>git tag -a v1.2.0 -m “…” 打标签,备份版本
>git push origin v1.2.0  将打标签的版本推送到服务器


## 补充
Github PR 流程

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmkpxkcgsvj30qu0ekabh.jpg)




