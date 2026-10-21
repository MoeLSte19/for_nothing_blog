---
title: "用 Node.js 做一次 Edge CDP 能力自检"
date: "2026-10-21 12:00:00"
description: "这份工具用来验证 Windows 上 Edge 的启动、CDP 连接和页面控制能力。源码只包含自检脚本，不包含登录后的浏览器资料。"
cover: "/assets/workspace/lab.svg"
tags: ["Node.js", "Edge", "浏览器自动化"]
mood: ""
---

这份工具用来验证 Windows 上 Edge 的启动、CDP 连接和页面控制能力。源码只包含自检脚本，不包含登录后的浏览器资料。

## 做了什么

- 创建临时独立配置目录，启动无界面的 Edge。
- 读取 DevTools 端口，连接浏览器和页面的 WebSocket。
- 执行页面检查，把结果和截图写入本机输出目录。
- 检查结束后释放浏览器进程；输出目录需要使用者自行管理。

## 运行

需要 Node.js，以及已安装的 Microsoft Edge。进入源码目录后运行：

```powershell
node edge-selfcheck.mjs
```

脚本内有备用的 Edge 安装路径，也可通过 `EDGE_PATH` 指定。自检结果属于具体机器的运行记录，仓库不附带本人的浏览器缓存或会话资料。
