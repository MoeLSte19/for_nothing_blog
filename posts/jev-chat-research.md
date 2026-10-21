---
title: "Jev 聊天助手：各端形态与使用边界"
date: "2026-10-03 12:00:00"
description: "本文保留原归档时点的调研记录，软件版本、安装方式和功能可能随后变化，请以文末官方来源为准。"
cover: "/assets/workspace/reading.svg"
tags: ["AI", "开源项目", "调研"]
mood: ""
---

> 本文保留原归档时点的调研记录，软件版本、安装方式和功能可能随后变化，请以文末官方来源为准。

更新时间：2026-10-03

## 项目是什么

[Jev 聊天助手](https://github.com/jev-chat/jev-chat-jarvis) 是聊天副驾，不是微信插件或聊天机器人服务。它在设备上读取当前聊天内容，分析对方意图/风险并给出候选回复。用户选择后，软件只复制或填入输入框，不会自动发送。

官方组织还维护 iOS 和 Windows 版本：

- Android：https://github.com/jev-chat/jev-chat-jarvis
- iOS：https://github.com/jev-chat/jev-chat-jarvis-ios
- Windows：https://github.com/jev-chat/jev-chat-windows

## 各端情况

### Android

- 要求 Android 11+、ARM64。
- 仓库提供 APK；README 当前给出的安装包为 v1.4。
- 使用前配置判断、回复（以及可选视觉）模型接口，并授予无障碍和悬浮窗权限；部分手机还要允许自启动、关闭电池优化。
- 当前说明列出的平台：QQ、X 私信、飞书（OCR 兜底）；其它未适配应用可手动触发 OCR。项目说明称当前 Android 版不再处理微信内容。
- 工作方式：无障碍读取当前屏幕聊天，必要时本地 OCR；提供意图/风险分析和候选回复，用户手动确认发送。

### iOS

- 仓库：https://github.com/jev-chat/jev-chat-jarvis-ios
- 形态是自定义键盘，可在聊天 App 的输入框内调用。
- 基本流程：复制对方消息 → 切换到 Jev 键盘 → 分析剪贴板 → 选候选并插入输入框 → 自己发送。
- 当前不会自动读取屏幕，复制的内容通常缺少完整上下文。
- 仓库 README 提供 Xcode 工程安装步骤：需 Mac 和 Xcode，将项目签名后安装到 iPhone；免费个人开发者签名通常 7 天过期，需要重新安装。
- 启用键盘时需要在 iOS 设置里打开“允许完全访问”，用于联网调用模型和读取剪贴板。README 声明键盘不记录或上传按键。

### Windows

- 仓库：https://github.com/jev-chat/jev-chat-windows
- Windows 10 1903+ / Windows 11；Releases 提供打包好的 ZIP，解压后运行 EXE，无需自行安装 Python。
- 窗口截图和本地离线 OCR 识别聊天内容，悬浮窗显示意图分析及三条候选回复；点“填入”后由用户检查和发送。
- README 当前明确列出微信 Windows 版和 KakaoTalk。其他聊天窗口需自行适配。
- 需要配置 Jev 判断接口和回复模型接口两组 API Key；模型调用按服务商实际价格计费。EXE 未签名，Windows SmartScreen 可能提示拦截。

## 模型与费用

软件本身开源免费，默认需要用户配置模型 API。判断与回复可以使用不同服务商；项目提供若干预设，也允许配置兼容接口。每次分析都会产生相应模型调用，费用取决于服务商、模型和用量。若改用本地兼容模型，需确认该端实现支持所需 API 协议；仓库默认流程主要按联网 API 配置说明。

## 隐私边界

- Android/iOS：触发分析时，聊天文本和已启用的背景资料发往用户配置的模型服务商；项目作者称不运营中转服务器。
- Windows：截图 OCR 在本机处理；识别出的聊天文字用于调用所配置的模型服务。项目说明称截图仅在内存处理、不写入磁盘。
- 模型供应商收到的内容受其自身隐私政策约束。使用前应检查所选供应商的数据处理规则。
- 所有版本都强调由用户最终确认，应用不会自动发送消息。

## 已知限制

- Android：不同聊天应用的读取兼容性不同；OCR 可能误识别。群聊意图分析按一对一场景处理。部分国产系统会限制后台运行。
- iOS：需要手动复制消息，无法自动获得完整聊天上下文；需开启键盘完全访问权限。
- Windows：目前明确支持的聊天软件较少；聊天窗口需保持打开、不能最小化；OCR 识别结果仍应人工检查。

## 官方参考

- 主仓库与 Android 说明：https://github.com/jev-chat/jev-chat-jarvis
- Android 隐私政策：https://github.com/jev-chat/jev-chat-jarvis/blob/main/PRIVACY.md
- iOS 仓库与安装说明：https://github.com/jev-chat/jev-chat-jarvis-ios
- Windows 仓库、下载和功能说明：https://github.com/jev-chat/jev-chat-windows

---

整理自本人的工作区记录：`琐事/Jev聊天助手项目归档.md`。原笔记中的待核实项和实验限制予以保留。
