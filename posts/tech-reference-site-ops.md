---
title: "技术参考 · ForNothing 站点架构与运维手册"
date: "2026-10-22 09:00:00"
description: "本站（4nothing.me / XHBlogs / Next.js）的技术架构、SSH 运维方法、发布流程与常见问题排查手册。"
cover: "/assets/workspace/lab.svg"
tags: ["技术参考", "运维", "Next.js", "部署"]
mood: ""
---

> 本文是本站的运维手册，记录真实跑在服务器上的架构与操作步骤，供后续维护与参考。

## 站点概览

| 项 | 值 |
|----|-----|
| 域名 | https://4nothing.me |
| 框架 | XHBlogs（Next.js 16.2.1 / React 19.2.4 / Tailwind 4），上游 [heiehiehi/XinghuisamaBlogs](https://github.com/heiehiehi/XinghuisamaBlogs)（CC BY-NC 4.0） |
| 服务器 | 阿里云 ECS（Ubuntu 22.04，1.6G 内存 + 2G swap），Node v20.18.1 |
| 进程 | PM2 `xhblogs`（端口 3000，fork），Nginx 反代 80/443 → 3000，Let's Encrypt 证书 |
| 项目路径 | `/root/XinghuisamaBlogs/XHBlogs` |

## 服务架构

- **环境变量**：密钥集中在 `/root/xhblogs.env`（chmod 600，仓库外），由 `ecosystem.config.js` 加载进 PM2。改 env 后需 `pm2 delete xhblogs && pm2 start ecosystem.config.js && pm2 save`（restart 不重读 env）。
- **聊天助手**：`/api/chat`（edge runtime）→ 云反代 `GEMINI_PROXY_BASE`（OpenAI 兼容 `chat/completions`），Bearer 用 `GEMINI_API_KEY`，模型在 `siteConfig.geminiConfig.modelId`。
- **天气**：`/api/weather` → 和风**专属 API Host** + `X-QW-Api-Key` 请求头（新版控制台 Key 必须配专属 Host，通用域名会 403，Bearer 会 401），城市福州 `101230101`。
- **音乐**：`/api/music` → 网易云详情/歌词 + 音频回退链（gdstudio CDN 直链 → 官方外链并探测 content-type）；支持 `pl:<歌单ID>` 歌单展开（上限 30、并发 5、双层 5 分钟缓存）；播放器 `MusicProvider`（layout 级）。
- **背景壁纸**：`siteConfig.bgVideo`（`/bg.mp4`，`public/` 下）优先，`bgImages` 作图片轮播与 poster 兜底。⚠️ `public/` 新增文件必须 rebuild 才被服务器提供（构建期快照，已实测）。
- **主题**：黑白主色调 —— `globals.css` 的 `@theme` 把 indigo/purple/pink/violet 色板重映射为中性灰；`siteConfig.themeColors` 为灰度。

## SSH 使用（Windows 本机）

工具在 `E:\DSH\实验\tools\`：`ssh_probe.py`（批量执行，命令用 base64 传参）、`ssh_put.py`/`ssh_get.py`（SFTP 上传/下载）。

```powershell
$env:SSHPASS = '<密码>'                    # 只进当前进程环境，不落盘
$env:PYTHONIOENCODING = 'utf-8'; $env:PYTHONUTF8 = '1'
[Console]::OutputEncoding = [Text.Encoding]::UTF8
function B64($s) { [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($s)) }
& py 'E:\DSH\实验\tools\ssh_probe.py' (B64 'pm2 status')
```

连接：`root@47.117.109.8`（该 IP 与域名 DNS 一致），密码只从环境变量读取、绝不写文件。

> 安全约定：SSH 密码 / API 密钥绝不进仓库与网页文档；密钥只在 `/root/xhblogs.env`。

### SSH 注意事项

| 事项 | 说明 |
|------|------|
| 构建期断连 | build 顶满 1.6G 内存时 SSH 可能被断开（10054），build 是 nohup 后台，重连查日志即可 |
| 引号与编码 | PowerShell 传参吞引号 → 命令 base64 传参；先设 UTF-8 环境防乱码 |
| 命令超时 | 大命令设足 timeout；远程 curl 加 `-m` 防挂起 |
| 防火墙 | ufw 只放 22/80/443/6379，本地服务默认外部不可达 |

## 发布流程（发文章/改配置）

1. 服务器上写/改内容（`posts/`、`chatters/`、`moments/` 或 `siteConfig.ts`）。
2. **后台构建**（前台会卡死 SSH）：

```bash
export PATH=/usr/local/bin:/usr/local/lib/nodejs/node-v20.18.1-linux-x64/bin:$PATH
cd /root/XinghuisamaBlogs/XHBlogs
rm -rf .next
nohup env NODE_OPTIONS="--max-old-space-size=1024" NEXT_TELEMETRY_DISABLED=1 npm run build > /root/build.log 2>&1 &
```

3. 等 `Compiled successfully` + `.next/BUILD_ID` 出现，然后 `pm2 restart xhblogs`。
4. 验证：`curl -sI http://127.0.0.1:3000 | head -5` 期望 200；线上按页面确认。

文章 Frontmatter：`title / date / description / cover / tags / mood`；图片放 `public/` 后正文写 `/xxx.jpg`。

## 常用运维命令

```bash
pm2 status && pm2 logs xhblogs --lines 30
curl -sk -X POST https://4nothing.me/api/chat -H "Content-Type: application/json" -d '{"message":"你好"}'
curl -sk https://4nothing.me/api/weather
curl -sk "https://4nothing.me/api/music?ids=pl:<歌单ID>"
nginx -t && systemctl reload nginx
certbot renew
```

## 常见问题

| 症状 | 处理 |
|------|------|
| SSH 连不上 | 可能被 build 卡死，阿里云控制台重启实例后重连 |
| `/api/chat` Key missing | env 没注入：检查 `xhblogs.env` → `pm2 delete/start ecosystem.config.js` |
| `/api/weather` 403/401 | Host 不是专属 Host / 认证头不对 |
| 音乐没声音 | `/api/music` 返回 url 必须是音频；gdstudio 挂了会退化外链（部分歌不可播） |
| 改了没生效 | 忘记 rebuild 或没 restart |
| 加载页/残留蓝紫 | 检查是否还有写死的 `rgba(99,102,241,…)` 等硬编码色值 |

## 本机开发与 GitHub

- 开发仓库：`E:\DSH\实验\fornothing-blog`；远端 https://github.com/MoeLSte19/for_nothing_blog （公开）。
- 授权：本机 `gh` 设备码登录（MoeLSte19），配置在 `tools\gh\config`（`GH_CONFIG_DIR`）。
- 推送要点：git `http.sslBackend=openssl`；走本机代理；git 协议只认 Basic 认证，用一次性头：
  `git -C <repo> -c http.https://github.com/.extraHeader="Authorization: Basic <base64('x-access-token:'+TOKEN)>" push`

---

*更多细节见本地 skill：`skills/fornothing-blog/*`（含服务器路径、服务清单、Troubleshooting 全表）。*