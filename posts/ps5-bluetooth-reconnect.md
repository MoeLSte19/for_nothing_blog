---
title: "DualSense 蓝牙重连修复：一次有验证的排查记录"
date: "2026-10-11 12:00:00"
description: "日期：2026-10-11（北京时间）。"
cover: "/assets/workspace/lab.svg"
tags: ["Windows", "排错", "DualSense"]
mood: ""
---

日期：2026-10-11（北京时间）。

设备：ASUS TX Air FA401GM；Realtek Bluetooth Adapter（USB VID_13D3 / PID_3612）；DualSense Wireless Controller。

原症状：Windows 已配对，但按 PS 键无法重连，删除配对后重新配对才能使用。

检查发现：蓝牙适配器、手柄蓝牙 HID 的 MSPower_DeviceEnable.Enable 均为 true；2026-10-10 系统日志曾记录 BTHUSB 事件 3（适配器命令超时、不响应）及 HidBth 事件 2（蓝牙 HID 无响应或超出范围）。这些记录支持排查蓝牙端，但不能单独证明根因。

已执行：仅将上述两个设备的省电关闭开关改为 false，并读回确认成功。没有删除配对，没有更换驱动，没有重启电脑。

验证：用户反馈修改后按 PS 键可以连接，并进一步确认电脑重启后也可以直接连接。电脑睡眠后的重连稳定性仍待实际使用验证。

驱动：当前 Realtek 18.4032.2510.900。华硕官网列出更新版本 V178.4039.2510.0902，但本次未安装；若再次复发，需要先核对更新包 INF 与硬件 ID 匹配，再考虑更新。

## 文件

- `power-before.json`：修改前的两个省电设置。
- `power-result.json`：修复结果及读回核验值。
- `repair-power.ps1`：只修改这两个指定设备的省电设置，需要管理员权限。
- `restore-power.ps1`：根据备份恢复这两个设备的设置，需要管理员权限。

## 恢复原设置

在管理员 PowerShell 中运行：

```powershell
& 'E:\codex\琐事\ps5-bluetooth-repair\restore-power.ps1'
```

官方驱动入口：https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a14-2026-fa401gm/helpdesk_download?model2Name=FA401GM

## 手柄固件更新（2026-10-11）

- 从索尼官网下载 PlayStation Accessories 安装程序，数字签名有效，签名方为 Sony Interactive Entertainment LLC。
- 通过 winget 的 PlayStation.PlayStationAccessories 包安装官方工具 2.2.1.2，以及它所需的 Microsoft .NET Desktop Runtime 8。
- 用户用 USB 数据线连接手柄；官方工具执行更新，过程中读取到 37% 及 87% 的进度。
- 更新前固件：A-0520。
- 更新后重新打开官方工具，读取到“固件 A-0630”“最新”，确认更新完成。
- 官方工具安装路径：`C:\Program Files\Sony\PlayStationAccessories\PlayStationAccessories.exe`。
- 官方说明：https://controller.dl.playstation.net/controller/lang/en/2100004.html

---

整理自本人的工作区记录：`琐事/ps5-bluetooth-repair/README.md`。原笔记中的待核实项和实验限制予以保留。
