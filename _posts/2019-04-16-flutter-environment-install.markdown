---
layout: post
title:  "MAC 电脑 Flutter 开发环境的安装搭建"
date:   2019-04-16
author: "袁凤鸣"
excerpt: MAC 电脑 Flutter 开发环境的安装搭建

categories: 
    - flutter
tags: 
    - flutter
mathjax: true

---
* content
{:toc}
---


#### 0x01-1、2-1 Flutter开发环境的安装-01：
![](https://ws1.sinaimg.cn/large/006tNc79ly1g23spkggssj31920p0793.jpg)

#### 0x01-2、2-1 Flutter开发环境的安装-02：

![](https://ws4.sinaimg.cn/large/006tNc79ly1g23sq3wibjj31ic0u010u.jpg)


#### 0x02、JDK 安装：

由于官网下载比较缓慢。可以下载我百度网盘的`JDK`：链接: https://pan.baidu.com/s/1ibnt4PnJgOwFjxNdI3l47Q 提取码: v2jj 复制这段内容后打开百度网盘手机App，操作更方便哦；
![](https://ws4.sinaimg.cn/large/006tNc79ly1g23ssgykrbj31jk08w0tw.jpg)

**Mac下如何安装JDK**：详细过程可以参考：[https://www.cnblogs.com/quickcodes/p/5127101.html](https://www.cnblogs.com/quickcodes/p/5127101.html)
**安装好JDK后需要配置JDK的环境变量**：请参考：[Mac下如何配置环境变量](http://www.cnblogs.com/quickcodes/p/5398709.html)

#### 0x03、Flutter JDK 安装：
由于官网下载比较缓慢。可以下载我百度网盘的`Flutter SDK`：[https://pan.baidu.com/s/1OQLCy44KBbd1IoBuUzz1eQ](https://pan.baidu.com/s/1OQLCy44KBbd1IoBuUzz1eQ)
![](https://ws1.sinaimg.cn/large/006tNc79ly1g23t36yu4gj317e04w3zf.jpg)

<br>
我的 `Flutter` 安装在了如下路径（`home`目录下载新建一个`app`文件夹中）

![](https://ws1.sinaimg.cn/large/006tNc79ly1g23t6qad5wj318t0u0qfh.jpg)

- 配置环境变量:
 - 在终端执行 `opne ~/.bash_profile` ，加入 `Flutter` 的安装路径
     - `export PATH=/Users/mingo/app/flutter/bin:$PATH
`
    ![](https://ws1.sinaimg.cn/large/006tNc79ly1g23ta1lhlaj30zk0mwjtd.jpg)

    - 保存关闭 执行：`source ~/.bash_profile`

- 这个时候应该能运行flutter命令了，我们运行命令行：`flutter -h`
    - 出现如下：
    
    
```
$ flutter -h
Manage your Flutter app development.

Common commands:

  flutter create <output directory>
    Create a new Flutter project in the specified directory.

  flutter run [options]
    Run your Flutter application on an attached device or in an emulator.

Usage: flutter <command> [arguments]

Global options:
-h, --help                  Print this usage information.
-v, --verbose               Noisy logging, including all shell commands executed.
                            If used with --help, shows hidden options.

-d, --device-id             Target device id or name (prefixes allowed).
    --version               Reports the version of this tool.
    --suppress-analytics    Suppress analytics reporting when this command runs.
    --bug-report            Captures a bug report file to submit to the Flutter team.
                            Contains local paths, device identifiers, and log snippets.

    --packages              Path to your ".packages" file.
                            (required, since the current directory does not contain a ".packages" file)

Available commands:
  analyze                  Analyze the project's Dart code.
  attach                   Attach to a running application.
  bash-completion          Output command line shell completion setup scripts.
  build                    Flutter build commands.
  channel                  List or switch flutter channels.
  clean                    Delete the build/ and .dart_tool/ directories.
  config                   Configure Flutter settings.
  create                   Create a new Flutter project.
  devices                  List all connected devices.
  doctor                   Show information about the installed tooling.
  drive                    Runs Flutter Driver tests for the current project.
  emulators                List, launch and create emulators.
  format                   Format one or more dart files.
  help                     Display help information for flutter.
  install                  Install a Flutter app on an attached device.
  logs                     Show log output for running Flutter apps.
  make-host-app-editable   Moves host apps from generated directories to non-generated directories so that they can be
                           edited by developers.
  packages                 Commands for managing Flutter packages.
  precache                 Populates the Flutter tool's cache of binary artifacts.
  run                      Run your Flutter app on an attached device.
  screenshot               Take a screenshot from a connected device.
  stop                     Stop your Flutter app on an attached device.
  test                     Run Flutter unit tests for the current project.
  trace                    Start and stop tracing for a running Flutter app.
  upgrade                  Upgrade your copy of Flutter.
  version                  List or switch flutter versions.

Run "flutter help <command>" for more information about a command.
Run "flutter help -v" for verbose help output, including less commonly used options.

  ╔════════════════════════════════════════════════════════════════════════════╗
  ║                 Welcome to Flutter! - https://flutter.io                   ║
  ║                                                                            ║
  ║ The Flutter tool anonymously reports feature usage statistics and crash    ║
  ║ reports to Google in order to help Google contribute improvements to       ║
  ║ Flutter over time.                                                         ║
  ║                                                                            ║
  ║ Read about data we send with crash reports:                                ║
  ║ https://github.com/flutter/flutter/wiki/Flutter-CLI-crash-reporting        ║
  ║                                                                            ║
  ║ See Google's privacy policy:                                               ║
  ║ https://www.google.com/intl/en/policies/privacy/                           ║
  ║                                                                            ║
  ║ Use "flutter config --no-analytics" to disable analytics and crash         ║
  ║ reporting.                                                                 ║
  ╚════════════════════════════════════════════════════════════════════════════╝

```
    
#### 0x04、Flutter 检查环境：
##### 0x04-1、Flutter 提供了 检查环境 命令 `flutter doctor`

```
# mingo @ 192 in ~ [12:59:45] 
$ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.2.1, on Mac OS X 10.13.6 17G4015, locale zh-Hans-CN)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK components.
      (or visit https://flutter.io/setup/#android-setup for detailed instructions).
      If Android SDK has been installed to a custom location, set ANDROID_HOME to that location.
      You may also want to add it to your PATH environment variable.

[!] iOS toolchain - develop for iOS devices (Xcode 9.4.1)
    ✗ libimobiledevice and ideviceinstaller are not installed. To install with Brew, run:
        brew update
        brew install --HEAD usbmuxd
        brew link usbmuxd
        brew install --HEAD libimobiledevice
        brew install ideviceinstaller
    ✗ ios-deploy not installed. To install:
        brew install ios-deploy
[!] Android Studio (not installed)
[!] IntelliJ IDEA Ultimate Edition (version 2018.3.5)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] Connected device
    ! No devices available

! Doctor found issues in 5 categories.

# mingo @ 192 in ~ [13:03:33] 
```

**如上：带❌的就必须按照。带❗️的就可以暂时忽略。**

##### 0x04-2、安装 Android Studio 和 VS Code

打开`android studio`, 打开`plugins` ,安装`flutter`
![](https://ws2.sinaimg.cn/large/006tNc79ly1g23uca2fkyj30zh0u07a0.jpg)

输入flutter搜索，点击中间的 Search in repositories

![](https://ws1.sinaimg.cn/large/006tNc79ly1g23udb33zbj310p0u04l7.jpg)

点击`install`,顺利的话安装完毕之后重启`android studio`

再次运行

然后在 `flutter doctor`：

```
# mingo @ 192 in ~ [13:03:33] 
$ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.2.1, on Mac OS X 10.13.6 17G4015, locale zh-Hans-CN)
[!] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
    ✗ Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses
[!] iOS toolchain - develop for iOS devices (Xcode 9.4.1)
    ✗ libimobiledevice and ideviceinstaller are not installed. To install with Brew, run:
        brew update
        brew install --HEAD usbmuxd
        brew link usbmuxd
        brew install --HEAD libimobiledevice
        brew install ideviceinstaller
    ✗ ios-deploy not installed. To install:
        brew install ios-deploy
[✓] Android Studio (version 3.3)
[!] IntelliJ IDEA Ultimate Edition (version 2018.3.5)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] Connected device
    ! No devices available

! Doctor found issues in 4 categories.
```
##### 0x04-3、执行`flutter doctor --android-licenses`同意相关协议


```
# mingo @ 192 in ~ [13:22:07] 
$ flutter doctor --android-licenses
.
.
.此处 N 多信息，都是相关协议文件，一路 y 即可。
.
.
---------------------------------------
Accept? (y/N): y
All SDK package licenses accepted


# mingo @ 192 in ~ [13:22:48] 
$ flutter doctor                   
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.2.1, on Mac OS X 10.13.6 17G4015, locale zh-Hans-CN)
[✓] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
[!] iOS toolchain - develop for iOS devices (Xcode 9.4.1)
    ✗ libimobiledevice and ideviceinstaller are not installed. To install with Brew, run:
        brew update
        brew install --HEAD usbmuxd
        brew link usbmuxd
        brew install --HEAD libimobiledevice
        brew install ideviceinstaller
    ✗ ios-deploy not installed. To install:
        brew install ios-deploy
[✓] Android Studio (version 3.3)
[!] IntelliJ IDEA Ultimate Edition (version 2018.3.5)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] Connected device
    ! No devices available

! Doctor found issues in 3 categories.

# mingo @ 192 in ~ [1:02:09] 

```

##### 0x04-4、解决 iOS 环境

按照如下截图，依次一个个执行如图命令。
![](https://ws3.sinaimg.cn/large/006tNc79ly1g23ttuniycj312s0lcwqa.jpg)

    
第六个命令 `brew install ios-deploy` 安装完如下:

```
# mingo @ 192 in ~ [13:49:02] 
$ brew install ios-deploy
==> Downloading https://homebrew.bintray.com/bottles/ios-deploy-1.9.4.high_sierra.bottle.tar
######################################################################## 100.0%
==> Pouring ios-deploy-1.9.4.high_sierra.bottle.tar.gz
🍺  /usr/local/Cellar/ios-deploy/1.9.4: 7 files, 157.2KB

# mingo @ 192 in ~ [13:58:36] 
```

在 检查环境


```
# mingo @ 192 in ~ [0:35:18] 
$ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.2.1, on Mac OS X 10.13.6 17G4015, locale zh-Hans-CN)
[✓] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
[✓] iOS toolchain - develop for iOS devices (Xcode 9.4.1)
[✓] Android Studio (version 3.3)
[!] IntelliJ IDEA Ultimate Edition (version 2018.3.5)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[✓] VS Code (version 1.33.1)
[✓] Connected device (2 available)

! Doctor found issues in 1 category.

# mingo @ 192 in ~ [0:36:26] 
```


因为不需要使用 `IntelliJ IDEA`来开发，如果你电脑中没有安装`IntelliJ IDEA`是不会提示这个警告的，所以可以先不管这个栏目的❗️和 ❌
![](https://ws2.sinaimg.cn/large/006tNc79ly1g23u3amhzyj31940gw47p.jpg)

到此，`Flutter` 环境搭建完成，可以用 `Android Studio`，新建第一个 `Flutter`项目了。

