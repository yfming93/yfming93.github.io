---
layout: post
title:  "Flutter-Skill MCP 安装与配置踩坑深度复盘指南"
date:   2026-09-20
author: "袁凤鸣"
excerpt: 面向 AI 辅助研发与端到端自动化测试的 flutter_skill MCP 插件在接入 Antigravity IDE 过程中，关于虚假协议声明、进程并发锁与 EOF 崩溃的踩坑复盘与深度治理。

categories: 
    - flutter
tags: 
    - flutter
    - mcp
    - ai
mathjax: true

---
* content
{:toc}
---

> **文档信息**  
> - **作者**：袁凤鸣  
> - **日期**：2026-09-20  
> - **适用环境**：macOS (Apple Silicon) / Antigravity IDE (VSCode OSS 架构) / Flutter FVM / Node.js  
> - **目标组件**：`flutter_skill` (v0.9.37, GitHub: [ai-dashboad/flutter-skill](https://github.com/ai-dashboad/flutter-skill))  

---

## 一、 项目背景与接入目标

`flutter-skill` 是一个面向 AI 辅助研发与端到端自动化测试的 MCP (Model Context Protocol) 插件。接入后可赋予 Antigravity IDE / Claude Code 等 AI 助手如下核心能力：
- 跨平台 Flutter UI 语义层遍历与元素定位；
- 自动化模拟交互（点击 `tap`、输入 `enter_text`、滚动 `scroll`）；
- 运行时截屏与视觉比对验证；
- 动态热重载（`hot_reload`）与热重启（`hot_restart`）；
- 移动端（iOS / Android / Web）真机与模拟器设备调度。

但在实际接入 Antigravity IDE 的过程中，由于该开源项目底层在 MCP 协议规范实现以及进程并发控制上的缺陷，引发了一连串致命阻碍。以下为完整踩坑与彻底解决的复盘记录。

---

## 二、 踩坑全景与底层根因剖析

### 坑一：IDE 面板无限期卡在 “Refreshing...”

- **表面现象**：在 Manage MCP servers 界面添加配置或刷新时，状态圈一直旋转，页面挂死在 “Refreshing...”，无法加载任何工具。
- **底层根因**：
  1. **虚假协议声明**：原生 `flutter_skill` 源码在 `server.dart` 的 `initialize` 初始化握手响应中，硬编码返回了 `"capabilities": { "resources": {} }`，声称自身支持资源管理协议。
  2. **缺少对应路由实现**：Antigravity IDE 严格遵循 MCP 规范，收到该声明后立刻向 Server 发送 `resources/list` 请求以拉取列表。但作者在路由分支中**完全漏写了 `resources/list` 的处理分支**。
  3. **静默丢弃未匹配帧**：其底层缺乏未知 JSON-RPC 方法的默认兜底分支（未匹配方法直接丢弃，不返回任何结果也不返回错误），导致 IDE 客户端陷入无休止的阻塞等待，面板永久卡死。

---

### 坑二：IDE 重启后必现红字 `Error: calling "initialize": EOF.`

- **表面现象**：在界面手动点击一次 “Refresh 🔄” 按钮有时可以勉强加载成功；但**一旦完全关闭 Antigravity IDE 并重新打开，必定弹出红色报错：`Error: calling "initialize": EOF.`**，无法随 IDE 自动初始化。
- **底层根因（核心链路）**：
  1. **IDE 双进程架构机制**：
     - Antigravity IDE 启动时，会在底层并发启动两个独立的后台 Language Server：
       - `Language Server 1`：全局实例（负责跨窗口调度与全局 MCP 服务管理面板）；
       - `Language Server 2`：当前 Workspace 项目实例（负责当前项目的代码解析、LSP 与工作区工具）。
     - 这两个后台服务启动时，均会读取 `mcp_config.json`，并在**同一毫秒内并发拉起两路 `flutter-skill` 进程**。
  2. **原生硬编码全局文件锁冲突**：
     - 原生 `flutter_skill` 在 `server.dart` 中内置了单例文件锁机制（硬编码路径为 `$HOME/.flutter_skill.lock`）。
     - 只要检测到该文件存在且修改时间在 10 分钟以内，后起的实例就会判定为“已有实例运行”，直接打印错误并执行 `exit(1)` 退出。
  3. **早期脚本全局 `pkill` 引发并发互杀**：
     - 先前为了避免孤儿进程残留，在脚本启动前加入了 `pkill -9 flutter_skill...`。
     - 在双 Language Server 并发拉起的毫秒级瞬间：进程 A 刚拉起 Dart 子进程，进程 B 启动时执行 `pkill` 瞬间杀死了进程 A 的子进程。
     - 进程 A 捕获到子进程暴毙立即异常终止，导致管道破裂，向 IDE 抛出 `initialize: EOF`。
  4. **为什么点击 Refresh 偶尔能好？**：
     - 在已打开的 IDE 中手动点击 Refresh 时，仅重载当前管理面板对应的单个 Language Server，属于**单实例冷启动**，无并发竞争，所以能碰巧成功；但重启 IDE 是两路必定并发，因此必现 EOF。

---

### 坑三：GUI 进程环境变量 PATH 缺失

- **表面现象**：在配置中直接指定 `node` 或 `flutter_skill` 时，报错 `spawn ENOENT` 或退出码 `127`。
- **底层根因**：macOS GUI 应用程序（从 Dock / Spotlight 启动的 Antigravity IDE）默认继承的 `PATH` 仅包含 `/usr/bin:/bin` 等极简系统路径，无法自动感知 Homebrew（`/opt/homebrew/bin`）或 FVM / Flutter SDK 路径。

---

### 坑四：社区官方现状（未修复的已知架构缺陷）

经过排查 [ai-dashboad/flutter-skill/issues](https://github.com/ai-dashboad/flutter-skill/issues) 发现，该问题在开源社区中早已有人反馈，但官方至今未能妥善修复：
1. **[Issue #66](https://github.com/ai-dashboad/flutter-skill/issues/66)**（2026-09-17）：
   *“Flutter-skill completely breaks if you have multiple instances running”*  
   开发者明确抗议：一台机器上应该能够独立运行多个实例而互不干扰，不应因全局单例锁而彻底崩溃。
2. **[Issue #50](https://github.com/ai-dashboad/flutter-skill/issues/50)**：
   *“MCP Error on Antigravity IDE on Mac: Error upon restarting IDE ... calling initialize: EOF”*  
   与本次遇到的 IDE 重启必报 EOF 完全一致。

---

## 三、 终极解决方案与架构落地

为规避修改第三方 pub 缓存包源码的风险，同时彻底解决双实例并发互杀与协议漏帧问题，我们采用了 **“透明协议补丁代理 + 动态沙箱环境隔离”** 的全套架构设计。

### 1. 核心架构逻辑

- **动态沙箱 HOME 隔离**：在代理层为每个 Language Server 实例分配专属临时主目录 `/tmp/flutter_skill_mcp_<PID>`，将 `.flutter_skill.lock` 彻底关入私有沙箱，解除全局单例互斥；
- **真实配置软链接映射**：在沙箱内自动软链接用户主目录下的 `.pub-cache`、`.flutter-skill`、`.fvm` 等，功能 100% 保持原生完备；
- **严禁全局滥杀**：彻底删除跨进程的 `pkill` 指令，每个 wrapper 实例仅精准持有并杀死自己 `spawn` 的 Dart 子进程；
- **全协议兼容兜底**：过滤无效的 `resources` 声明，主动应答握手探测，未实现方法统一返回标准 `-32601` 错误码；
- **绝对路径与 PATH 注入**：显式注入 Homebrew 及 Dart/Flutter SDK 路径，彻底解决 GUI 环境缺失 PATH 问题。

---

### 2. 补丁代理脚本完整源码 (`flutter_skill_wrapper.js`)

文件路径：`/Users/mingo/.gemini/config/scripts/flutter_skill_wrapper.js`

```javascript
#!/usr/bin/env node
/**
 * flutter_skill MCP 协议透明补丁代理
 * 
 * 核心特性与加固：
 * 1. 【实例环境隔离】：为每个 MCP 客户端实例创建独立运行沙箱（独立隔离 HOME 目录），
 *    彻底解决原生 flutter_skill 的 ~/.flutter_skill.lock 单例锁冲突，
 *    允许多个 Language Server（全局实例 + Workspace 实例）并发拉起而不发生抢锁崩溃。
 * 2. 【严禁跨进程滥杀】：移除所有全局 pkill 命令，每个 wrapper 实例严格仅管理和销毁自身的 child 进程。
 * 3. 【协议兼容兜底】：
 *    - 拦截 resources/list, resources/templates/list, prompts/list, ping, roots/list, server/discover 等
 *    - 剥离 capabilities 中的 resources 声明，避免客户端拉取无效资源
 *    - 未知请求自动返回 JSON-RPC 2.0 Method not found 错误，防止 IDE 握手阶段挂起
 * 4. 【生命周期守卫与优雅回收】：
 *    - 监听 process exit, SIGINT, SIGTERM, SIGHUP, stdin close 等事件
 *    - 进程销毁时同步终止子进程并递归清理专属沙箱目录
 * 5. 【日志隔离】：子进程 stderr 与调试信息写入 /tmp/flutter_skill_mcp.log，保持 stdio 管道纯净
 */

const { spawn } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const os = require("os");

const realHome = os.homedir();
const logFile = "/tmp/flutter_skill_mcp.log";

function debugLog(msg) {
  try {
    fs.appendFileSync(logFile, `[${new Date().toISOString()}][PID ${process.pid}] ${msg}\n`);
  } catch (e) {}
}

// 捕获未处理异常，防止无声崩溃
process.on("uncaughtException", (err) => {
  debugLog(`Uncaught exception: ${err ? err.stack || err : ""}`);
});
process.on("unhandledRejection", (reason) => {
  debugLog(`Unhandled rejection: ${reason}`);
});

// 清理已消亡进程遗留的全局锁文件（如有）
try {
  const staleLock = path.join(realHome, ".flutter_skill.lock");
  if (fs.existsSync(staleLock)) {
    const content = fs.readFileSync(staleLock, "utf8");
    const oldPid = parseInt(content.split("\n")[0].trim(), 10);
    let isAlive = false;
    if (oldPid) {
      try {
        process.kill(oldPid, 0);
        isAlive = true;
      } catch (e) {
        isAlive = false;
      }
    }
    if (!isAlive) {
      fs.unlinkSync(staleLock);
      debugLog(`Cleaned stale ~/.flutter_skill.lock for dead PID ${oldPid}`);
    }
  }
} catch (e) {}

// 1. 创建属于当前实例的沙箱 HOME 目录，隔离 .flutter_skill.lock
const instanceHome = path.join(os.tmpdir(), `flutter_skill_mcp_${process.pid}`);
try {
  if (!fs.existsSync(instanceHome)) {
    fs.mkdirSync(instanceHome, { recursive: true });
  }
  // 软链接用户主目录下的重要配置，保证 flutter_skill 工具能力完备
  const dirsToLink = [".pub-cache", ".flutter-skill", ".fvm", ".android", "Library", "allRepos"];
  for (const dir of dirsToLink) {
    const target = path.join(realHome, dir);
    const link = path.join(instanceHome, dir);
    if (fs.existsSync(target) && !fs.existsSync(link)) {
      try {
        fs.symlinkSync(target, link);
      } catch (e) {}
    }
  }
  debugLog(`Initialized sandbox HOME at ${instanceHome}`);
} catch (e) {
  debugLog(`Sandbox init error: ${e.message}`);
}

const dartBin = "/Users/mingo/fvm/versions/3.38.10/bin/cache/dart-sdk/bin/dart";
const snapshot = "/Users/mingo/.pub-cache/global_packages/flutter_skill/bin/flutter_skill.dart-3.10.9.snapshot";

// 2. 拉起原生 Dart MCP 进程
const child = spawn(dartBin, [snapshot, "server"], {
  stdio: ["pipe", "pipe", "pipe"],
  env: {
    ...process.env,
    HOME: instanceHome,
    USERPROFILE: instanceHome,
    PATH: "/Users/mingo/fvm/versions/3.38.10/bin/cache/dart-sdk/bin:/Users/mingo/fvm/versions/3.38.10/bin:/Users/mingo/Library/Android/sdk/platform-tools:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:" + (process.env.PATH || "")
  }
});

debugLog(`Spawned child process PID ${child.pid}`);

let isCleanedUp = false;
function cleanup() {
  if (isCleanedUp) return;
  isCleanedUp = true;
  debugLog("Cleaning up child process and sandbox...");
  try {
    if (child && !child.killed) {
      child.kill("SIGTERM");
      setTimeout(() => {
        try { if (!child.killed) child.kill("SIGKILL"); } catch (e) {}
      }, 500);
    }
  } catch (e) {}

  try {
    if (fs.existsSync(instanceHome)) {
      fs.rmSync(instanceHome, { recursive: true, force: true });
    }
  } catch (e) {}
}

process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(0); });
process.on("SIGTERM", () => { cleanup(); process.exit(0); });
process.on("SIGHUP", () => { cleanup(); process.exit(0); });
process.stdin.on("end", () => { cleanup(); process.exit(0); });
process.stdin.on("close", () => { cleanup(); process.exit(0); });

child.on("error", (err) => {
  debugLog(`Child process error: ${err.message}`);
  cleanup();
  process.exit(1);
});

child.on("exit", (code, signal) => {
  debugLog(`Child exited with code ${code}, signal ${signal}`);
  cleanup();
  process.exit(code || 0);
});

child.stderr.on("data", (chunk) => {
  debugLog(`[child stderr] ${chunk.toString().trim()}`);
});

// 支持的原生方法集合
const SUPPORTED_NATIVE_METHODS = new Set([
  "initialize",
  "notifications/initialized",
  "tools/list",
  "tools/call"
]);

// 处理从 IDE 客户端发来的请求
const rlStdin = readline.createInterface({ input: process.stdin, terminal: false });

rlStdin.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const req = JSON.parse(trimmed);
    const method = req.method;
    const id = req.id;

    // 1. 特殊已知方法主动应答
    if (method === "server/discover") {
      const resp = { jsonrpc: "2.0", id: id, error: { code: -32601, message: "Method not found" } };
      process.stdout.write(JSON.stringify(resp) + "\n");
      return;
    }

    if (method === "resources/list") {
      const resp = { jsonrpc: "2.0", id: id, result: { resources: [] } };
      process.stdout.write(JSON.stringify(resp) + "\n");
      return;
    }

    if (method === "resources/templates/list") {
      const resp = { jsonrpc: "2.0", id: id, result: { resourceTemplates: [] } };
      process.stdout.write(JSON.stringify(resp) + "\n");
      return;
    }

    if (method === "prompts/list") {
      const resp = { jsonrpc: "2.0", id: id, result: { prompts: [] } };
      process.stdout.write(JSON.stringify(resp) + "\n");
      return;
    }

    if (method === "ping") {
      const resp = { jsonrpc: "2.0", id: id, result: {} };
      process.stdout.write(JSON.stringify(resp) + "\n");
      return;
    }

    if (method === "roots/list") {
      const resp = { jsonrpc: "2.0", id: id, result: { roots: [] } };
      process.stdout.write(JSON.stringify(resp) + "\n");
      return;
    }

    // 2. 如果是底层明确支持的方法，透传给底层 flutter_skill
    if (SUPPORTED_NATIVE_METHODS.has(method)) {
      child.stdin.write(line + "\n");
      return;
    }

    // 3. 对其他带有 id 的未知方法，主动返回标准 JSON-RPC 2.0 Method not found
    if (id !== undefined && id !== null) {
      const resp = { jsonrpc: "2.0", id: id, error: { code: -32601, message: `Method not found: ${method}` } };
      process.stdout.write(JSON.stringify(resp) + "\n");
      return;
    }

    // 无 id 的通知类消息，安全透传
    child.stdin.write(line + "\n");
  } catch (e) {
    child.stdin.write(line + "\n");
  }
});

rlStdin.on("close", () => {
  cleanup();
  process.exit(0);
});

// 处理底层 flutter_skill 发出的响应
const rlStdout = readline.createInterface({ input: child.stdout, terminal: false });

rlStdout.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const msg = JSON.parse(trimmed);
    // 移除 initialize 中的 resources 声明，避免 IDE 去请求 resources/list
    if (msg.result && msg.result.capabilities && msg.result.capabilities.resources) {
      delete msg.result.capabilities.resources;
      process.stdout.write(JSON.stringify(msg) + "\n");
      return;
    }
    process.stdout.write(line + "\n");
  } catch (e) {
    process.stdout.write(line + "\n");
  }
});

```

---

### 3. MCP 最终配置文件规范

配置文件路径：`~/.gemini/config/mcp_config.json` 与 `~/.gemini/antigravity/mcp_config.json`

```json
{
  "mcpServers": {
    "flutter-skill": {
      "command": "/opt/homebrew/bin/node",
      "args": [
        "/Users/mingo/.gemini/config/scripts/flutter_skill_wrapper.js"
      ],
      "env": {
        "PATH": "/Users/mingo/fvm/versions/3.38.10/bin/cache/dart-sdk/bin:/Users/mingo/fvm/versions/3.38.10/bin:/Users/mingo/Library/Android/sdk/platform-tools:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
      }
    }
  }
}
```

---

## 四、 压测与修复验证

使用高并发模拟脚本，针对 3 个客户端实例在同一毫秒并发发起 `initialize` 与 `tools/list` 握手压测：

```python
# 并发压测返回结果：
Concurrent results: [(1, 13), (1, 13), (1, 13)]
```

- **握手时延**：毫秒级完成初始化握手，无任何卡死与断流；
- **能力覆盖**：每个实例均稳定加载全部 **13 个核心 MCP 工具**；
- **生命周期**：客户端退出后，临时沙箱与 Dart 虚拟机进程 100% 自动回收，零孤儿进程残留；
- **自愈验证**：Antigravity IDE 重新启动后，无需手动点击 Refresh 即可自动加载就绪。
