---
title: "会话交接方案调研与取舍"
date: "2026-09-24 12:00:00"
description: "本文保留原归档时点的调研记录，软件版本、安装方式和功能可能随后变化，请以文末官方来源为准。"
cover: "/assets/workspace/reading.svg"
tags: ["Agent", "调研", "上下文管理"]
mood: ""
---

> 本文保留原归档时点的调研记录，软件版本、安装方式和功能可能随后变化，请以文末官方来源为准。

检索日期：2026-09-24。目标：在 Codex 中记录压缩检查点，并在重复压缩/上下文退化时准备新对话交接。

## 候选方案

| 方案 | 特点 | 与本工作区的适配 |
|---|---|---|
| [timyeou1234/context-handoff](https://github.com/timyeou1234/context-handoff) | Codex 插件、Skill 与生命周期 Hook；Hook 提供压缩事件信号，Skill 负责判断与摘要。 | 最贴近需求；不过当前运行时暂不直接装插件/Hook。仓库介绍的 token 百分比门槛需要可用遥测支持，不能当作 Hook 必然可监测的指标。 |
| [jumpifequal/handoff-skill](https://github.com/jumpifequal/handoff-skill) | 手动交接 Skill，并提供 CLI 场景的压缩前 Hook。 | 可借鉴手动应急摘要；其自动触发不等于当前 Codex 桌面运行时支持。 |
| [lifang336/codex-session-handoff](https://github.com/lifang336/codex-session-handoff) | 将结构化交接写到 `.codex/handoffs`，以手动流程为主。 | 可借鉴文件化交接；缺少压缩生命周期触发。 |
| [Handover Skills](https://skills.handover.sh/) | 多技能方案，依赖外部 Handover MCP/CLI。 | 引入额外服务，不符合先保持本地、轻量工作流的选择。 |

## 采取的方案

先维护本地 Skill 源文件与工作区规则，再安装为用户级 Skill；暂不启用 Hook。Skill 已清楚标明自身无法监听自动压缩事件或读取精确 token 使用率。若要实现稳定自动提醒，再对候选插件的 manifest、Hook 脚本、路径、外部访问与副作用逐项审查，完成审查后单独确认是否安装。

参考的官方说明：[Codex plugins 与 Hooks](https://developers.openai.com/plugins/build/plugins)、[Skills 概念](https://developers.openai.com/plugins/concepts/skills)。官方文档指出插件 Hook 会在 Codex 生命周期事件中运行，本机脚本应先检查并信任后再启用。

---

整理自本人的工作区记录：`工具/交接方案调研.md`。原笔记中的待核实项和实验限制予以保留。
