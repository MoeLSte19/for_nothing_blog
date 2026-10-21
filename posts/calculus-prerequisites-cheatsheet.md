---
title: "预备知识 · 公式速查表"
date: "2026-09-15 12:00:00"
description: "预备知识 · 公式速查表：整理定义、方法、例题与易错点，保留原笔记中的待核实项。"
cover: "/assets/workspace/notes.svg"
tags: ["学习笔记", "高等数学", "知识点"]
mood: ""
---

> **这页是全书的地基，放在这里随时查。** 教材从这一节开始，后面每一章都会用到。
>
> ⚠️ **为什么要做这页**：我的错题 习题1.1 第 2(4) 题（$\arcsin$ 定义域）暴露的缺口就在这里——
> 我直接从 1.1.2 开始，跳过了最前面这几页。**这一节的内容不会立刻发作，但会在第 2 章求导、第 4 章积分时集中爆发。**
>
> 用法：平时**不用背**，做题时查；考前**只背标注 ⭐ 的那些**。

## 📍 位置与页码

| 内容 | 教材页 | PDF 页 |
| --- | --- | --- |
| 一、常用初等代数公式 | P1 | 11 |
| 二、常用三角函数和反三角函数等式（1–5 组） | P1–2 | 11–12 |
| 二、（6–8 组：万能公式、反三角、基本不等式） | P2 | 12 |
| 注：**三角函数的倍角/半角公式、特殊角函数值表，教材这一节没有** | — | — |

> 页码对应关系：**PDF 页码 = 教材页码 + 10**（PDF 第 11 页 = 教材 P1）。

---

## 一、常用初等代数公式

### 1. 对数的运算性质（$a>0$ 且 $a \neq 1$）⭐

$$\log_a(x \cdot y) = \log_a x + \log_a y$$

$$\log_a \frac{y}{x} = \log_a y - \log_a x$$

$$\log_a x^b = b \cdot \log_a x$$

$$a^{\log_a x} = e^{\ln x} = x$$

> 🔑 第 4 条是"指数与对数互逆"的桥梁，**求极限时经常用来把幂指函数化成 $e^{\ln}$ 形式**。
> 例：$x^x = e^{x\ln x}$——这是第 1 章的重要极限、第 2 章求导的必备变形。

**换底公式**（教材未列，但做题必用）：$\log_a b = \dfrac{\ln b}{\ln a}$

### 2. 指数的运算性质（$a>0$ 且 $a \neq 1$）⭐

$$a^m \cdot a^n = a^{m+n}, \qquad \frac{a^m}{a^n} = a^{m-n}, \qquad (a^m)^n = a^{mn}, \qquad (ab)^n = a^n b^n$$

### 3. 常用二项展开式及分解公式

| 公式 |
| --- |
| $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ |
| $(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$ |
| $a^3+b^3 = (a+b)(a^2-ab+b^2)$ |
| $a^3-b^3 = (a-b)(a^2+ab+b^2)$ |
| $a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + a^{n-3}b^2 + \cdots + b^{n-1})$ |
| $(a+b)^n = \mathrm{C}_n^0 a^n + \mathrm{C}_n^1 a^{n-1}b + \mathrm{C}_n^2 a^{n-2}b^2 + \cdots + \mathrm{C}_n^n b^n$ |

**其中组合系数**（教材原文，注意原书 $\mathrm{C}_n^m$ 的写法印刷有堆叠）：

$$\mathrm{C}_n^m = \frac{n(n-1)(n-2)\cdots(n-m+1)}{m!}, \qquad \mathrm{C}_n^0 = 1,\quad \mathrm{C}_n^1 = n$$

> ⚠️ 教材把组合数记作 $\mathrm{C}_n^m$（下标 $n$、上标 $m$），现代教材多写 $\binom{n}{m}$。**考试按老师的写法**。
>
> 🔑 $a^n - b^n$ 的分解在**求极限时极常用**（用于消去根式或多项式因式），必须记住。

---

## 二、三角函数与反三角函数

### 1. 同角三角函数的基本关系式 ⭐⭐

**倒数关系**
$$\tan\alpha \cdot \cot\alpha = 1, \qquad \sin\alpha \cdot \csc\alpha = 1, \qquad \cos\alpha \cdot \sec\alpha = 1$$

**商的关系**
$$\tan\alpha = \frac{\sin\alpha}{\cos\alpha}, \qquad \cot\alpha = \frac{\cos\alpha}{\sin\alpha}$$

**平方关系**
$$\sin^2\alpha + \cos^2\alpha = 1$$
$$1 + \tan^2\alpha = \sec^2\alpha$$
$$1 + \cot^2\alpha = \csc^2\alpha$$

> 🔑 后两条由第一条两边同除 $\cos^2\alpha$、$\sin^2\alpha$ 得到，**不用死记**。

### 2. 两角和与差的三角函数公式 ⭐⭐

$$\sin(x \pm y) = \sin x \cos y \pm \cos x \sin y$$
$$\cos(x \pm y) = \cos x \cos y \mp \sin x \sin y$$
$$\tan(x \pm y) = \frac{\tan x \pm \tan y}{1 \mp \tan x \tan y}$$

> ⚠️ $\cos(x\pm y)$ 的符号**与括号内相反**（"cos 变号"），这是最常错的一点。

### 3. 三角函数的倍角公式 ⭐

$$\sin 2x = 2\sin x \cos x$$
$$\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x$$
$$\tan 2x = \frac{2\tan x}{1 - \tan^2 x}$$

> 🔑 $\cos 2x$ 的**三个等价形式**都要记住——**降幂**时用后两个（$2\cos^2x-1$、$1-2\sin^2x$），
> 这是第 4 章积分、第 1 章求极限的常用变形。

### 4. 三角函数的和差化积公式

$$\sin x + \sin y = 2\sin\frac{x+y}{2}\cos\frac{x-y}{2}$$
$$\sin x - \sin y = 2\cos\frac{x+y}{2}\sin\frac{x-y}{2}$$
$$\cos x + \cos y = 2\cos\frac{x+y}{2}\cos\frac{x-y}{2}$$
$$\cos x - \cos y = -2\sin\frac{x+y}{2}\sin\frac{x-y}{2}$$

> ⚠️ **最后一条的负号**最容易漏。

### 5. 三角函数的积化和差公式

$$\sin x \cos y = \frac{1}{2}\left[\sin(x+y) + \sin(x-y)\right]$$
$$\cos x \sin y = \frac{1}{2}\left[\sin(x+y) - \sin(x-y)\right]$$
$$\cos x \cos y = \frac{1}{2}\left[\cos(x+y) + \cos(x-y)\right]$$
$$\sin x \sin y = -\frac{1}{2}\left[\cos(x+y) - \cos(x-y)\right]$$

> ⚠️ 第 4 条**有负号**（和差化积的最后一条也有），这两处是高频错点。
>
> 💡 和差化积 ↔ 积化和差 是**互逆**的，记一组就能推另一组。

### 6. 万能公式 ⭐

$$\sin\alpha = \frac{2\tan\frac{\alpha}{2}}{1 + \tan^2\frac{\alpha}{2}}, \qquad \cos\alpha = \frac{1 - \tan^2\frac{\alpha}{2}}{1 + \tan^2\frac{\alpha}{2}}$$

> 💡 用途：**把三角函数统一换成 $\tan\frac{\alpha}{2}$ 的有理式**，是三角函数有理式积分（第 4 章）的标准套路。
> 记忆法：分母都是 $1+\tan^2\frac{\alpha}{2}$（即 $\sec^2\frac{\alpha}{2}$）；$\sin$ 的分子是 $2\tan$，$\cos$ 的分子是 $1-\tan^2$。

### 7. 反三角函数有关等式 ⭐

$$\arcsin x + \arccos x = \frac{\pi}{2}, \qquad x \in [-1,\ 1]$$

$$\arctan x + \operatorname{arccot} x = \frac{\pi}{2}, \qquad x \in (-\infty,\ +\infty)$$

> ⚠️ **注意区间**：$\arcsin$ 那条限定 $x\in[-1,1]$（因为 $\arcsin$、$\arccos$ 只在 $[-1,1]$ 上有定义）；
> $\arctan$ 那条对一切实数成立。
>
> 📌 这两个等式可以理解为"**反函数与原函数在单调区间上的互补角**"。
>
> ⚠️ 我上一个错题（习题1.1 第 2(4) 题）就是因为不熟 $\arcsin$ 的定义域。
> **完整定义域/值域对照表见 [反三角函数的定义域与值域](/posts/inverse-trigonometric-functions)**。

### 8. 三角函数的基本不等式 ⭐

**（1）当 $x \in \left(0,\ \dfrac{\pi}{2}\right)$ 时：**
$$\sin x < x < \tan x$$

**（2）对于一切 $x$（$x$ 为弧度）：**
$$\lvert \sin x \rvert \leq \lvert x \rvert$$

> 🔑 **这两条是第 1 章最重要的不等式**！它们是证明 $\lim\limits_{x\to0}\dfrac{\sin x}{x} = 1$（第一个重要极限）和夹逼准则的核心工具。
> 现在先记住"$\sin$ 最小、$x$ 居中、$\tan$ 最大"，第 1.5 节会正式用。

---

## 📌 考前必背清单（只背这些）

| 优先级 | 内容 | 为什么 |
| --- | --- | --- |
| ⭐⭐⭐ | $\sin^2+\cos^2=1$ 及其两条变形 | 一切三角变形的基础 |
| ⭐⭐⭐ | 两角和差公式（$\sin$、$\cos$、$\tan$ 三条） | 倍角/半角/和差化积都能推出来 |
| ⭐⭐⭐ | 对数运算 4 条 | 求极限、求导反复用 |
| ⭐⭐⭐ | $\lvert\sin x\rvert \leq \lvert x\rvert$ 与 $\sin x < x < \tan x$ | 第一个重要极限的证明工具 |
| ⭐⭐ | 倍角公式（尤其 $\cos2x$ 三种形式） | 降幂、积分 |
| ⭐⭐ | 反三角函数的定义域/值域 | **我的错题点** → [反三角函数的定义域与值域](/posts/inverse-trigonometric-functions) |
| ⭐ | 万能公式、和差化积、积化和差 | 用时查即可，但负号要小心 |
| ⭐ | $a^n-b^n$ 分解 | 求极限消因式 |

## 🔴 教材这一节**没有**的内容（做题要用，需自己补）

教材此处偏简，以下内容**没有出现在预备知识里**，我做题时容易卡：

1. **三角函数的半角公式**
   $$\sin^2\frac{\alpha}{2} = \frac{1-\cos\alpha}{2}, \qquad \cos^2\frac{\alpha}{2} = \frac{1+\cos\alpha}{2}$$
   （由 $\cos2x = 1-2\sin^2x$ 反解得到，**降幂用**）

2. **特殊角的三角函数值表**（$0,\frac{\pi}{6},\frac{\pi}{4},\frac{\pi}{3},\frac{\pi}{2},\pi,\frac{3\pi}{2},2\pi$）

3. **诱导公式**（"奇变偶不变，符号看象限"）

4. **正弦/余弦定理**（工科后续可能用）

> 这些不算漏洞，但**做题时如果卡住，大概率就是这里**。遇到一次就补一条上来。

## 🚨 一处需要向老师确认的疑点

教材写 $\arctan x + \operatorname{arccot} x = \dfrac{\pi}{2}$，$x\in(-\infty,+\infty)$。
这个等式**成立的前提是 $\operatorname{arccot}$ 的主值区间取 $(0,\pi)$**。

但有的教材/文献把 $\operatorname{arccot}$ 的主值区间定义为 $\left(-\frac{\pi}{2},0\right)\cup\left(0,\frac{\pi}{2}\right)$，那样这个等式**就不成立**（会差 $\pi$）。

**我们课程的约定是什么？** → 记入 [作业与考试中心](/posts/notes-index) 疑问清单，问过老师后回填这里。

---

## 参考

- 教材：预备知识（PDF 第 11–12 页）
- 关联：[反三角函数的定义域与值域](/posts/inverse-trigonometric-functions)（我的错题归档处）
- 下一节应用：1.5.4 两个重要极限（第 1 章，会用到第 8 组不等式）

---

整理自本人的工作区记录：`笔记整理/02-知识库/预备知识-公式速查.md`。原笔记中的待核实项和实验限制予以保留。
