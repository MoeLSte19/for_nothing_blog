---
title: "让 MiMoCode 接入 Agents Anywhere：Runtime Adapter 实验"
date: "2026-09-22 12:00:00"
description: "假设 / 变量 / 判定"
cover: "/assets/workspace/lab.svg"
tags: ["Agent", "MiMoCode", "实验"]
mood: ""
---

## 假设 / 变量 / 判定

- **假设**：AA Connector 的 Runtime Provider 可热插拔，加一个 `MimoProvider` 后手机端「可添加」会出现 MiMo Code
- **变量**：`connector/runtimes/mimo/` 新包 + `providers.py` 注册
- **判定**：AA 桌面端「添加 Agent」列表出现 MiMo Code；手机能发消息并看到回复

## 最终目标

1. MiMoCode CLI 工作区固定 `E:\小米mimo`，开机自启
2. 对接 Agents-Anywhere，手机可发号施令（含指定工作目录、vibe coding）

## 已完成

### 1. Runtime Adapter（已写入 AA Connector 源码）

| 文件 | 作用 |
|------|------|
| `connector/runtimes/mimo/discovery.py` | 发现 `mimo` 可执行文件（`MIMO_BIN` / PATH / `~/.mimocode/bin`） |
| `connector/runtimes/mimo/provider_config.py` | 配置 schema（executablePath / defaultCwd / model / agent / autoApprove）+ capabilities |
| `connector/runtimes/mimo/provider.py` | `MimoProvider`：discover / validate_config / create_runtime |
| `connector/runtimes/mimo/runtime.py` | `MimoRuntime`：用 `mimo run --format json` / `mimo session list` 驱动 |
| `connector/runtimes/providers.py` | 注册 `MimoProvider()` |

**接入点**：`F:\agent anywhere\Agents Anywhere\resources\connector\`（editable 安装，改源码即生效）

### 2. 能力覆盖（MVP）

| AA 能力 | 状态 | 实现 |
|---------|------|------|
| modelCatalog | ✅ | MiMo V2.5 Pro / V2.5 / Flash |
| permissionCatalog | ✅ | build / plan / compose（映射 `--agent`） |
| sessionDiscovery | ✅ | `mimo session list` |
| sessionSnapshot | ✅ | 用户/助手消息 timeline |
| createAndStartSession | ✅ | `mimo run --dir <cwd> --title <t> <msg>` |
| startTurn | ✅ | `mimo run --session <id> <msg>` |
| attachments | ✅ | `--file` |
| cwd 切换 | ✅ | `create_and_start_session(cwd=...)` / 配置 `defaultCwd` |
| interrupt / steer / approvals | ❌ 后续 | 用 `mimo serve` HTTP 或 ACP 增强 |

### 3. 冒烟测试结果

```
identity: MiMo Code
models: xiaomi/mimo-v2.5-pro, xiaomi/mimo-v2.5, xiaomi/mimo-v2.5-flash
perms: build, plan, compose
sessions: ses_-ffe5f37c... (从 mimo session list 读到 2 条)
caps: catalog.model, catalog.permission, session.send_message, runtime.attachment
```

## 目录结构

```text
exp-002-mimo-aa-runtime/
├── README.md          # 本文件
├── discovery.py       # 与 AA 源码同步的副本
├── provider.py
├── provider_config.py
├── runtime.py
└── scripts/
    ├── install-aa-mimo-runtime.ps1   # 同步 adapter 到 AA Connector
    ├── restart-aa-connector.ps1      # 重启 Connector
    └── register-autostart.ps1        # 开机自启
```

## 落地到 Agents-Anywhere 的操作步骤

1. **同步 adapter**（已做，或用 `scripts/install-aa-mimo-runtime.ps1`）
2. **重启 Connector**（`scripts/restart-aa-connector.ps1`）  
   或重启 Agents Anywhere 桌面端
3. **桌面端 → 添加 Agent** 列表应出现 **MiMo Code**
4. **配置**：
   - Default workspace: `E:\小米mimo`
   - Auto-approve: 开（手机远程少打断）
   - Model: 按需选 `xiaomi/mimo-v2.5-pro`
5. **手机端** 新建会话时可用 `cwd` 指定子目录（如 `E:\小米mimo\实验`）

## 开机自启（已核实）

| 组件 | 自启方式 | 表现 |
|------|----------|------|
| **AA Desktop** | 注册表 `dev.agentsanywhere.workbench` → `Agents Anywhere.exe --hidden` | **静默后台**，无窗口 |
| **AA Connector** | Desktop 自动拉起 `anywhere-cli` | 后台 Python 进程 |
| **mimo** | **不自启、不常驻** | 手机发消息时按需 `mimo run`，跑完退出 |

> `mimo` 是无状态执行器：会话历史在 `mimocode.db`，跨重启保留；每次任务由 Connector spawn，无需开机常驻。Startup 快捷方式已清理（注册表已有 `--hidden`，加 .lnk 会重复启动）。

## 下一步（增强）

1. **ACP / serve 深度集成**：interrupt、steer、审批卡片
2. **timeline 增强**：解析 `mimo run --format json` 的工具调用事件
3. **手机指定工作目录**：AA 端 `createAndStartSession` 的 `cwd` 已支持
4. **多实例**：`instance_policy = multiple`，每个项目一个 MiMo 实例

## 复现

```powershell
# 1. 安装
.\scripts\install-aa-mimo-runtime.ps1

# 2. 重启 Connector
.\scripts\restart-aa-connector.ps1

# 3. 验证
& "$env:APPDATA\Agents Anywhere\connector\.venv\Scripts\python.exe" `
  -c "import sys; sys.path.insert(0, r'F:\agent anywhere\Agents Anywhere\resources\connector'); from connector.runtimes.providers import default_runtime_providers; print([p.runtime_type for p in default_runtime_providers()])"
# 期望: ['codex', 'claude', 'dsh', 'mimo']
```

---

整理自本人的工作区记录：`实验/exp-002-mimo-aa-runtime/README.md`。原笔记中的待核实项和实验限制予以保留。
