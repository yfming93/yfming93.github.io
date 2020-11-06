---
layout: post
title:  "mac 使用技巧,持续更新ing"
date:   2020-09-08
author: "袁凤鸣"
excerpt: mac使用技巧

categories: 
    - mac
tags: 
    - mac
mathjax: true

---
* content
{:toc}
---



## mac 使用技巧

### 0x01 mac 给 iPhone 充电不是上电
**Q：**数据线连接 mac 给 iPhone 充电不是上电。电池图标一直断断续续闪烁。
**A：**解决方法：打开终端Terminal，输入
- **sudo killall -STOP -c usbd** 命令回车，即可把进程关闭。插上`iPhone`，正常连接，问题解决。

-------
### 0x02 忘记Mac电脑密码时重置管理员密码

**Q：** 如果您无法在重新启动 Mac 后使用新密码登录，可尝试重新设置密码 ，请完成以下额外步骤：

**A：**解决步骤：

1. 再次重新启动 Mac，然后立即按住 `Command-R` 或其他 `macOS` 恢复组合键之一，直到您看到 `Apple` 标志或旋转的地球。
2. 当您看到“`macOS` 实用工具”窗口时，请从菜单栏中选取“实用工具”>“终端”。
3. 在“终端”窗口中，键入 `resetpassword`，然后按下 Return 键以打开上图所示的“重设密码”助理。
4. 选择“我的密码在登录时无法正常工作”，然后点按“下一步”，并按照屏幕上适用于您用户帐户的说明操作。

 -------