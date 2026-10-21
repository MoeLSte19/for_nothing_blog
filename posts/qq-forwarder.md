---
title: "QQ 通知直发：队列、静默时段与失败重试"
date: "2026-09-27 12:00:00"
description: "建议"
cover: "/assets/workspace/lab.svg"
tags: ["Python", "自动化", "消息队列"]
mood: ""
---

## 建议

让腾讯云上已运行的 NapCat 小号直接给主 QQ 发好友私聊。Hermes 继续只通过微信和你聊天；QQ 转发不调用 `hermes send`，因此不会进入 Hermes 当前回复的对话上下文。

```text
QQ群 → NapCat → qq_listener.py → JSONL 队列 → qq_pusher.py
                                                ↓ OneBot send_private_msg
                                          NapCat 小号 → 主 QQ
```

消息正文沿用现有格式，包含群名、QQ 消息时间、发件人和原文。夜间普通消息进入晨报队列，`@全体` / `@你` 按现有规则可穿透静默时段。推送改为 QQ 后，失败的消息继续保留在队列并退避重试。

NapCat 的 OneBot HTTP Server 默认配置端口为 3000、监听地址为 `127.0.0.1`，但可能尚未启用；具体以这台服务器的 NapCat 配置为准。OneBot 11 定义了 `send_private_msg` 动作。[NapCat 网络配置](https://github.com/NapNeko/NapCatQQ/blob/main/packages/napcat-webui-backend/src/onebot/config.ts) · [OneBot 私聊 API](https://github.com/botuniverse/onebot-11/blob/master/api/public.md#send_private_msg-%E5%8F%91%E9%80%81%E7%A7%81%E8%81%8A%E6%B6%88%E6%81%AF)

## 部署前条件

1. NapCat 登录的小号已添加主 QQ 为好友，最好由主 QQ 主动添加小号并完成验证。
2. 在 NapCat 启用 OneBot HTTP Server，并设置访问 Token。
3. 如果 NapCat 在 Docker 中，HTTP Server 在容器内监听 `0.0.0.0:3000`，Docker 仅绑定到宿主机回环地址，例如 `127.0.0.1:3000:3000`。不要把 API 端口公开到公网。
4. 在服务器创建 `/home/ubuntu/.hermes/qq-forwarder.env`，内容参考 `qq-forwarder.env.example`，然后设为仅 ubuntu 可读：`chmod 600 /home/ubuntu/.hermes/qq-forwarder.env`。
5. 确认 OneBot API URL 能从 pusher 运行环境访问。HTTP 动作 URL 的常见格式是 `http://127.0.0.1:3000/send_private_msg`；若端口映射或部署方式不同，应使用实际地址。

## 文件用途

- `qq_listener.py`：接收群消息、过滤、去重、夜间分流；队列写入与 pusher 使用同一文件锁。
- `qq_pusher.py`：静默时只发送 P0；通过 NapCat 私聊主 QQ；发送失败时保留队列；意外退出时恢复 `.inflight` 批次。
- `morning_brief.py`：已有夜间消息读取与晨报展示实现。
- `qq-pusher.service`：新增加载 `/home/ubuntu/.hermes/qq-forwarder.env`。

## 部署提醒

先备份服务器上的原脚本和 service，再替换包内对应文件，并执行 `systemctl --user daemon-reload`。复盘记录说 listener 曾被主动停用；部署脚本不会自动启动服务。确认后再手动启动/重启服务并查看日志。

当前包没有实际 QQ 号码、NapCat Token 或服务器信息。上线前必须把环境文件中的示例值改成真实配置。首次验证建议只让小号给主 QQ 发一条测试私聊，再检查 pusher 日志与队列。

## 适用边界

这是第三方 NTQQ / OneBot 方案，不是 QQ 官方机器人 API；可用性和账号限制受 QQ 客户端、NapCat 版本及账号状态影响。它能隔离 Hermes 对话，并绕开 Hermes 微信通道的 iLink 限流，但不能保证 QQ 本身永不限流或掉线。若主 QQ 不接受好友私聊，消息会留在队列并持续重试。

---

整理自本人的工作区记录：`琐事/qq-system-20260922/qq-system-20260922/README-QQ直发方案.md`。原笔记中的待核实项和实验限制予以保留。
