---
layout: post
title:  "Vue-cli 初始化 Vue 项目"
date:   2017-12-27
author: "袁凤鸣"
categories: vue
tags: vue
excerpt: 利用 Vue-cli 脚手架 初始化我们的 vue 项目代码
mathjax: true
---
* content
{:toc}

## 利用 Vue-cli 脚手架 初始化我们的 vue 项目代码

### 终端命令如下：

    Last login: Wed Dec 27 10:50:16 on ttys001
    MingodeMacBook-Pro:~ Mingo$ cd /Users/Mingo/Desktop/VueAll/VueMusic 
    MingodeMacBook-Pro:VueMusic Mingo$ vue init webpack vue-music
    
    ? Project name vue-music
    ? Project description 这是一个用 vue 开发的音乐播放器！
    ? Author 袁凤鸣 <yfmingo@163.com>
    ? Vue build runtime
    ? Install vue-router? Yes
    ? Use ESLint to lint your code? Yes
    ? Pick an ESLint preset Standard
    ? Set up unit tests No
    ? Setup e2e tests with Nightwatch? No
    ? Should we run `npm install` for you after the project has been created? (recommended) no
    
       vue-cli · Generated "vue-music".
    
    # Project initialization finished!
    # ========================
    
    To get started:
    
      cd vue-music
      npm install (or if using yarn: yarn)
      npm run lint -- --fix (or for yarn: yarn run lint --fix)
      npm run dev
      
    Documentation can be found at https://vuejs-templates.github.io/webpack
    
    
    MingodeMacBook-Pro:VueMusic Mingo$ cnpm i
    npminstall WARN package.json not exists: /Users/Mingo/Desktop/VueAll/VueMusic/package.json
    ✔ Installed 0 packages
    ✔ Linked 0 latest versions
    ✔ Run 0 scripts
    ✔ All packages installed (used 10ms, speed 0B/s, json 0(0B), tarball 0B)
    MingodeMacBook-Pro:VueMusic Mingo$ cd vue-music/
    MingodeMacBook-Pro:vue-music Mingo$ cnpm i
    ✔ Installed 46 packages
    ✔ Linked 706 latest versions
    [fsevents] Success: "/Users/Mingo/Desktop/VueAll/VueMusic/vue-music/node_modules/_fsevents@1.1.3@fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
    Pass --update-binary to reinstall or --build-from-source to recompile
    ✔ Run 2 scripts
    peerDependencies link ajv@4.11.8 in /Users/Mingo/Desktop/VueAll/VueMusic/vue-music/node_modules/_ajv-keywords@1.5.1@ajv-keywords unmet with /Users/Mingo/Desktop/VueAll/VueMusic/vue-music/node_modules/ajv(5.5.2)
    Recently updated (since 2017-12-20): 9 packages (detail see file /Users/Mingo/Desktop/VueAll/VueMusic/vue-music/node_modules/.recently_updates.txt)
    ✔ All packages installed (836 packages installed from npm registry, used 18s, speed 753.84kB/s, json 752(1.47MB), tarball 11.75MB)
    MingodeMacBook-Pro:vue-music Mingo$ 
    
    


## 注意：
当我按照上面步骤一切准备就绪时候。

在 `npm run dev` 之后兴奋地在浏览器贴上`http://localhost:8080/`。

但是始终显示错误如下：
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/m61EXr.jpg)

后来看了[这篇文章](https://github.com/vuejs/vue-hackernews-2.0/issues/98)才反应过来自己挂载着全局 `VPN`才使得不能正常访问。关闭全局`VPN`后就正常了。



