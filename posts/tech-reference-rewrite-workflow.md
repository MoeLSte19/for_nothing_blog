---
title: "技术参考 · 个性化改写方案与本地开发工作流"
date: "2026-10-22 09:10:00"
description: "本站从上游 XHBlogs 个性化改写的方案：背景/UI/Git 三大块、已完成项、以及本机开发→推送→服务器部署的完整工作流。"
cover: "/assets/workspace/lab.svg"
tags: ["技术参考", "改写", "UI", "Git"]
mood: ""
---

> 本文记录本站的个性化改写方案与开发-部署工作流，配套《站点架构与运维手册》阅读。

## 背景与目标

站点基于开源项目 [XHBlogs](https://github.com/heiehiehi/XinghuisamaBlogs)（Next.js 16 博客主题，CC BY-NC 4.0）搭建。在此基础上做三轮个性化改写：

1. **主界面背景**：图片轮播 → 视频壁纸，并提高背景清晰度；
2. **UI**：从蓝紫调改为一套黑白灰主色调；
3. **Git 管理**：从「单 commit + 上游 origin」迁到个人仓库 + 规范化提交。

## 已完成的改写

| 项 | 内容 |
|----|------|
| 视频壁纸 | `siteConfig.bgVideo=/bg.mp4`（Arisu，H.264 1080p，9.6MB）；`public/` 新文件需 rebuild 生效 |
| 背景清晰度 | layout 雾层 `bg-white/30 + blur-md` → `bg-white/10` 无模糊；渐变 wash 透明度 60%/20% → 25%/10%；全局 backdrop 模糊 12px→4px |
| 黑白主色调 | `globals.css` `@theme` 把 indigo/purple/pink/violet 色板整体重映射为中性灰；`siteConfig.themeColors` 灰度；进度条/滚动条灰化 |
| 首页板块 | 卡片 `backdrop-blur-md→sm`、底色 `/30-/40`，透出背景壁纸 |
| 硬编码色值 | 清理全站写死的 `#6366f1`、`rgba(99,102,241,…)` 等 90+ 处蓝紫（含加载页光晕） |
| 内容与功能 | 聊天（云反代）、天气（福州）、音乐（歌单「亚比」pl:），见运维手册 |

## 工作流：本机开发 → 推送 → 部署

```
本机仓库 E:\DSH\实验\fornothing-blog（内容根 = 服务器生产状态）
   │  改 → git commit
   ▼
GitHub 公开仓库 MoeLSte19/for_nothing_blog
   │  （本会话采用：改动文件 SFTP 上传 + rebuild；公开仓可直接 git pull）
   ▼
服务器 /root/XinghuisamaBlogs/XHBlogs → 后台 rebuild → pm2 restart → 线上验证
```

- 提交规范：`type(scope): 说明`（feat/fix/chore/docs/refactor），一次提交一件事。
- 推送认证：本机 `gh` 设备码授权；git 需 `http.sslBackend=openssl` + 本机代理 `127.0.0.1:7900`；git 协议只认 Basic，push 时用一次性 `Authorization: Basic <base64(x-access-token:TOKEN)>` 头。
- 回退：任何 UI 改动都在本机仓库有 commit，随时可 revert；换回彩色主题 = 删 `@theme` 重映射 + 恢复 `themeColors`。

## 后续计划

- UI 细节打磨：导航转盘样式、首页卡片排版微调、文字可读性与壁纸的平衡；
- Git 收尾：README/CHANGELOG、tag（如 v0.4.0）；
- 背景与主题的进一步微调（雾层强度、强调色是否保留一处）。

## 致谢与许可

- 上游项目 [heiehiehi/XinghuisamaBlogs](https://github.com/heiehiehi/XinghuisamaBlogs)（CC BY-NC 4.0 署名-非商业性使用），改写保留上游署名；
- 改写源码：https://github.com/MoeLSte19/for_nothing_blog ；关于页亦有致谢声明。