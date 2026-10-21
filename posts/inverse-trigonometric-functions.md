---
title: "反三角函数的定义域与值域"
date: "2026-09-15 12:00:00"
description: "反三角函数的定义域与值域：整理定义、方法、例题与易错点，保留原笔记中的待核实项。"
cover: "/assets/workspace/notes.svg"
tags: ["学习笔记", "高等数学", "知识点"]
mood: ""
---

> 一句话：**反三角函数是"限定区间上的反函数"**——因为它必须单调才能反，所以每个反三角函数的**值域被限定在一个主值区间**里。定义域和值域必须一起记。

## 🚨 我的错题（2026-09-14）

**习题 1.1 第 2(4) 题**：求 $y = \arcsin\dfrac{1}{x} + \arctan 2x$ 的定义域
→ **我留空了**，因为不知道 $\arcsin$ 的定义域要求什么。

**这道题的正确解法**：

- $\arcsin u$ 要求 $\lvert u \rvert \leq 1$，这里 $u = \dfrac{1}{x}$，故 $\left\lvert \dfrac{1}{x} \right\rvert \leq 1$
  ⟹ $\lvert x \rvert \geq 1$，即 $x \in (-\infty,-1] \cup [1,+\infty)$
- $\arctan u$ **对任意实数都有定义**（定义域是 $\mathbb{R}$），故 $\arctan 2x$ 不构成限制
- 取交集：$D = (-\infty,-1] \cup [1,+\infty)$

> 🔑 **关键**：$\arcsin$ 和 $\arccos$ **有定义域限制**，$\arctan$ 和 $\operatorname{arccot}$ **没有**。
> 这是本题的分水岭——加号两边不一定都产生限制条件。

---

## 1. 四个反三角函数的定义域与值域（必须背下来）

| 函数 | 定义域 | **值域（主值区间）** | 单调性 | 奇偶性 |
| --- | --- | --- | --- | --- |
| $y = \arcsin x$ | $[-1,\ 1]$ | $\left[-\dfrac{\pi}{2},\ \dfrac{\pi}{2}\right]$ | 单调**增** | **奇函数** |
| $y = \arccos x$ | $[-1,\ 1]$ | $[0,\ \pi]$ | 单调**减** | 非奇非偶 |
| $y = \arctan x$ | $\mathbb{R}$ | $\left(-\dfrac{\pi}{2},\ \dfrac{\pi}{2}\right)$ | 单调**增** | **奇函数** |
| $y = \operatorname{arccot} x$ | $\mathbb{R}$ | $(0,\ \pi)$ | 单调**减** | 非奇非偶 |

**记忆法**：
- **定义域**：带 `arc` 且名字里有 `sin`/`cos` 的 → $[-1,1]$；带 `tan`/`cot` 的 → $\mathbb{R}$
- **值域**：$\sin$ 和 $\tan$ 的都是 $\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$ 家族（$\arcsin$ 取到端点、$\arctan$ 取不到）
- **奇偶性**：$\arcsin$、$\arctan$ 是**奇函数**；$\arccos$、$\operatorname{arccot}$ **非奇非偶**

> ⚠️ 最常错的一点：**$\arcsin x$ 的值域是 $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$，不是 $\left[-\frac{\pi}{2},\frac{\pi}{2}\right)$**（端点能取到，因为 $\arcsin(\pm1) = \pm\frac{\pi}{2}$）。
> 而 $\arctan x$ 的值域**取不到** $\pm\frac{\pi}{2}$（那是渐近线）。

## 2. 关键公式

**互余关系**（$x$ 在公共定义域内）：

$$\arcsin x + \arccos x = \frac{\pi}{2}, \qquad x \in [-1,\ 1]$$

$$\arctan x + \operatorname{arccot} x = \frac{\pi}{2}, \qquad x \in \mathbb{R}$$

**奇函数性质**：

$$\arcsin(-x) = -\arcsin x, \qquad \arctan(-x) = -\arctan x$$

**反三角恒等式**（注意区间限制，**不能随便用**）：

$$\sin(\arcsin x) = x,\quad x\in[-1,1] \qquad\qquad \arcsin(\sin x) = x \ \text{仅当} \ x \in \left[-\tfrac{\pi}{2}, \tfrac{\pi}{2}\right]$$

> ⚠️ $\arcsin(\sin x) = x$ **只在 $x \in \left[-\frac{\pi}{2},\frac{\pi}{2}\right]$ 时成立**。
> 例如 $x = \pi$ 时 $\arcsin(\sin\pi) = \arcsin 0 = 0 \neq \pi$。这个坑很常见。

## 3. 三个反三角函数的图像特征

| 函数 | 图像特征 |
| --- | --- |
| $\arcsin x$ | 过原点，关于原点对称，两端点为 $(\pm1, \pm\frac{\pi}{2})$ |
| $\arccos x$ | **过点 $(0,\frac{\pi}{2})$、$(1,0)$、$(-1,\pi)$**，单调下降，与 $y$ 轴交点高 |
| $\arctan x$ | 过原点，关于原点对称，有**水平渐近线** $y = \pm\frac{\pi}{2}$ |

## 4. 求含反三角函数的定义域——标准流程

1. **逐个识别**每个反三角函数，写出它对自己参数的要求：
   - $\arcsin u$ 或 $\arccos u$ ⟹ $\lvert u \rvert \leq 1$
   - $\arctan u$ 或 $\operatorname{arccot} u$ ⟹ **无限制**
2. 同时考虑其他雷区（分母、偶次根、对数真数）
3. **全部取交集**

**例**：$y = \arcsin\dfrac{1}{x} + \arctan 2x$
- $\arcsin\frac1x$ ⟹ $\lvert \frac1x \rvert \leq 1$ ⟹ $\lvert x \rvert \geq 1$
- $\arctan 2x$ ⟹ 无限制
- 交集：$(-\infty,-1] \cup [1,+\infty)$

## 5. 易错与坑

- ⚠️ **以为 $\arctan$ 也有定义域限制**（实际上没有，反而 $\arcsin$/$\arccos$ 有）
- ⚠️ 混淆 $\arcsin x$ 的**定义域** $[-1,1]$ 与**值域** $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$
- ⚠️ 忘记 $\arccos$ 的值域是 $[0,\pi]$（不是 $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$！）
- ⚠️ 滥用 $\arcsin(\sin x) = x$
- ⚠️ 解 $\left\lvert \frac{1}{x} \right\rvert \leq 1$ 时搞错：它等价于 $\lvert x \rvert \geq 1$（**取倒数不等号反向**）

## 6. 关联

- 前置知识：[函数的三要素](/posts/three-elements-of-a-function)、[求自然定义域](/posts/natural-function-domains)
- 后续应用：1.1.3 初等函数（**反三角函数是五类基本初等函数之一**）；第 2 章求导（$(\arcsin x)' = \frac{1}{\sqrt{1-x^2}}$）
- 同类对比：反三角函数 vs 三角函数（后者**不是**单调的，必须限定区间才能反）

## 7. 自测

- [ ] 我能默写四个反三角函数的定义域和值域（尤其 $\arccos$ 的值域）
- [ ] 我知道哪两个反三角函数**没有**定义域限制
- [ ] 我能解出 $\left\lvert \frac{1}{x} \right\rvert \leq 1$
- [ ] 我知道 $\arcsin(\sin x)=x$ 的成立条件
- [ ] 我能独立做出习题 1.1 第 2(4) 题

## 8. 我的理解

反三角函数存在的理由是**三角函数不单调，没法整体求反函数**，所以只能"砍"出一段单调区间来做反函数。这个"砍"出来的区间就是**主值区间 = 值域**。所以定义域和值域是一体两面：定义域来自原三角函数的值域，值域来自我们选定的单调区间。

理解了这一点，就不用死记——**$\arcsin$ 的定义域必定是 $\sin$ 的值域 $[-1,1]$，值域必定是我们选的那个单调区间 $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$**。

## 参考

- 教材：预备知识「二、一些常用的三角函数和反三角函数等式」，P2–P3；基本初等函数部分见 1.1.3（P10 起）
- 📐 **公式速查表**：[预备知识-公式速查](/posts/calculus-prerequisites-cheatsheet)（含 $\arcsin x + \arccos x = \frac{\pi}{2}$ 等恒等式）
- 错题来源：习题 1.1 A 组 第 2(4) 题
- 相关联：基本初等函数（教材 1.1.3，P10 起）——反三角函数是五类基本初等函数之一

---

整理自本人的工作区记录：`笔记整理/02-知识库/反三角函数的定义域与值域.md`。原笔记中的待核实项和实验限制予以保留。
