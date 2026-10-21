---
title: "AIRI 与本地模型：AI 虚拟伙伴项目笔记"
date: "2026-10-03 12:00:00"
description: "本文保留原归档时点的调研记录，软件版本、安装方式和功能可能随后变化，请以文末官方来源为准。"
cover: "/assets/workspace/reading.svg"
tags: ["AI", "开源项目", "调研"]
mood: ""
---

> 本文保留原归档时点的调研记录，软件版本、安装方式和功能可能随后变化，请以文末官方来源为准。

更新时间：2026-10-03

## 项目是什么

[AIRI（moeru-ai/airi）](https://github.com/moeru-ai/airi) 是开源、可自托管的 AI 虚拟伙伴项目，目标是打造类似 Neuro-sama 的数字角色。它更关注虚拟形象、语音对话和游戏互动；支持网页和桌面使用。项目仍在持续开发，部分游戏、移动端和本地推理能力可能处于实验或迭代阶段。

## 主要能力

- 接入多家云端或本地大模型服务，进行角色聊天。
- Live2D / VRM 虚拟形象、动作和表情控制。
- 语音输入、语音合成；语音服务可以分别配置。
- 游戏和聊天平台集成，例如 Minecraft、Factorio、Discord、Telegram；具体能力取决于集成状态和额外配置。
- 网页、Windows/macOS 桌面端；移动端仍偏实验性。

## 安装教程（Windows）

### 简易安装

PowerShell 或命令提示符运行：

```powershell
winget install MoeruAI.AIRI
```

也可以使用 Scoop：

```powershell
scoop bucket add airi https://github.com/moeru-ai/airi
scoop install airi/airi
```

安装后启动 AIRI，在设置中配置聊天服务商和模型。首次使用云端模型时需要按服务商要求填写 API Key，费用由服务商按模型与用量决定。

网页体验入口：[airi.moeru.ai](https://airi.moeru.ai)。

### macOS

```bash
brew install --cask airi
```

## 部署本地聊天模型（Windows + Ollama）

本地模型通过 Ollama 在电脑上运行，AIRI 连接 Ollama 提供的本地 API。通常无需模型 API Key；首次下载模型需要网络和磁盘空间，运行时消耗电脑的显存、内存和电力。

1. 从 [Ollama 官网](https://ollama.com/download) 下载并安装 Windows 版本。安装后 Ollama 会在后台运行。
2. 打开 PowerShell，确认命令可用：

   ```powershell
   ollama --version
   ```

3. 下载并启动一个模型。例子使用 Qwen 2：

   ```powershell
   ollama run qwen2
   ```

   首次运行会下载模型。模型名称可按 Ollama 模型库中可用的名称替换。退出交互对话后，Ollama 服务通常仍在后台运行。

4. 在 AIRI 中打开 **设置 → 服务商 → 聊天 → Ollama**：
   - Base URL：`http://localhost:11434/v1/`
   - 在“意识/聊天模型”中选择 Ollama 和已下载模型。
   - 点击 Ping API 测试连接，再选择模型。

5. 在 AIRI 对话页发一条消息，确认模型能正常回复。

如果连接失败，先确认 Ollama 正在运行、模型已下载、地址和端口正确。只有 AIRI 与 Ollama 分别运行在不同设备时才需要改成可访问的局域网地址；不要把本地 Ollama API 直接暴露到公网。若出现浏览器 CORS 错误，按 AIRI 官方 Ollama 文档中的方式设置 `OLLAMA_ORIGINS` 并重启 Ollama。

## 5060 移动版显卡的模型建议

RTX 5060 Laptop 的实际显存容量要以具体笔记本和任务管理器/NVIDIA 工具显示为准。若为常见的 8GB 显存配置，建议先从 **7B/8B、4-bit 量化**的聊天模型开始。上下文长度、并行语音功能和虚拟形象都会额外占用内存/显存；模型太大时可能部分落到系统内存，速度会下降。先跑小模型确认体验，再尝试更大的量化模型。

## 本地与云端的取舍

- **Ollama 本地模型**：不按 API token 付费，数据主要在本机处理；代价是占用硬件、磁盘和电力，模型能力受显存限制。
- **云端 API**：配置简单、通常能用更强模型；费用按服务商、模型和实际用量计算。
- **混合方式**：聊天用本地 Ollama，语音识别/合成单独选择本地或云服务。是否产生费用要逐项看各服务商配置。

## 官方参考

- AIRI 仓库与 README：https://github.com/moeru-ai/airi
- AIRI 中文 Ollama 配置指南：https://github.com/moeru-ai/airi/blob/main/docs/content/zh-Hans/docs/manual/config/providers/consciousness/ollama.md
- Ollama Windows 文档：https://ollama.readthedocs.io/en/windows/
- Ollama 下载页：https://ollama.com/download

---

整理自本人的工作区记录：`琐事/AIRI项目归档.md`。原笔记中的待核实项和实验限制予以保留。
