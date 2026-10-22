---
title: "项目 · qwenpaw-soul 与 N.E.K.O 风格锚实验"
date: "2026-10-22 09:20:00"
description: "一个给 AI 角色「定文风」的实验项目：用真实样本锚住说话风格（style_anchor 风格锚插件），并实测 N.E.K.O 平台插件接口。"
cover: "/assets/workspace/lab.svg"
tags: ["项目", "AI", "Agent", "插件"]
mood: ""
---

> 项目笔记存放于本机 `E:\DSH\实验\neko-plan`（当前未开源）。本文是项目介绍与技术要点。

## 项目是什么

让同一个 AI 角色（qwenpaw-soul）**今天和昨天说话像同一个人**。治的是「靠形容词定人设 → 换个语境就出戏」的问题。

核心思路：**文风由真实样本决定，而不是由形容词决定** —— 用一个插件把「他满意的历史回复原文」作为锚样本，每次对话强制注入，并配合输出硬约束与反例库。

## 关键设计（style_anchor 插件）

- **锚样本 anchors.json**：8–12 条真实发生过且让人满意的回复原文，永久保留、永不摘要（太多会挤占预算、稀释语感）。
- **输出硬约束 constraints.json**：单条 ≤20 字、禁列表、禁助手腔、禁技术名词。
- **反例库 anti_patterns.json**：每次「出戏」的句子收进来当负样本。
- **audit_reply**：回复发出去之前先自检（pass / rewrite），还有 `add_anchor`、`sync_to_memory`、`status` 等工具；日常最省事的用法是聊天时直接说「把刚才这句记进锚样本」。
- **三种注入模式**（plugin.toml 可选）：`memory_facts`（POST 记忆服务进召回管线，默认）、`entry_only`（只暴露工具由调用方拼）、`persona_api`（走角色 persona 接口）。

## 平台实测（N.E.K.O，Steam 封装版）

- 插件目录在 `%LOCALAPPDATA%\N.E.K.O\plugins\`，热重载：`POST http://127.0.0.1:48916/plugins/reload`。
- 插件打包格式 `.neko-plugin`：普通 zip 会被 400 拒绝；包内必须有根级 `manifest.toml`，结构为 `manifest.toml / payload/plugins/<id>/（plugin.toml + __init__.py + i18n + static）/ payload/profiles/default.toml`。
- 官方安装管线 `/plugin-cli/upload-and-install`（需 zip、`.neko-plugin` 后缀）；schema 见 `/openapi.json`。
- 完整接口实测记录见项目内《14-接口实测.md》（✅/❌ 逐条标注）。

## 现状与验收目标

- 接口层已实测通过；「锚样本是否每轮稳定进上下文」是下一步要重点验证的点。
- 验收：隔 24h 用同样 10 个问题盲评「像不像同一个人」≥8/10；对 100 条历史回复跑 `audit_reply`，助手腔命中率 <5%。

## 备注

- 该项目与本站（fornothing-blog）相互独立，属于个人 AI 角色养成实验；本文仅作项目记录与技术参考。