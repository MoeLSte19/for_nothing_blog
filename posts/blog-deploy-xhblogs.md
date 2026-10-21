---
title: "ForNothing 博客的内容组织与发布方式"
date: "2026-10-21 12:00:00"
description: "这个站点使用 XHBlogs / Next.js，在自有 Ubuntu 服务器上运行，Nginx 负责 HTTPS 和反向代理，PM2 管理 Node.js 进程。"
cover: "/assets/workspace/lab.svg"
tags: ["博客", "Next.js", "部署"]
mood: ""
---

这个站点使用 XHBlogs / Next.js，在自有 Ubuntu 服务器上运行，Nginx 负责 HTTPS 和反向代理，PM2 管理 Node.js 进程。

## 内容组织

- `posts/`：文章和学习笔记，每篇文章使用 Markdown 与 Frontmatter。
- `chatters/`、`moments/`：杂谈与说说。
- `siteConfig.ts`：标题、简介、头像与导航等站点信息。
- `data/projects.ts`、`data/friends.ts`、`data/albums.ts`：项目、友链与相册。
- `public/`：网页可直接访问的静态资源。

## 发布步骤

先整理内容和检查资源引用，备份现有版本后在后台构建。确认构建成功退出，再切换构建产物并重启 PM2，最后核对文章、导航、公式与图片。构建失败时保留此前可以运行的版本。

服务器资源有限，构建时需要控制 Node.js 堆内存并查看日志。`nohup` 的作用是让命令脱离终端，它本身不会限制服务器的总内存占用。

## 来源

博客界面和基础功能来自 [heiehiehi/XinghuisamaBlogs](https://github.com/heiehiehi/XinghuisamaBlogs)，本人的工作主要是部署、个性化配置、内容整理与发布。上游代码和素材的许可归原作者。
