---
title: "函数极限的 ε-δ 定义与单侧极限"
date: "2026-10-08 12:00:00"
description: "函数极限的 ε-δ 定义与单侧极限：整理定义、方法、例题与易错点，保留原笔记中的待核实项。"
cover: "/assets/workspace/notes.svg"
tags: ["学习笔记", "高等数学", "知识点"]
mood: ""
---

> 一句话说清：$\lim_{x\to x_0}f(x)=A$ 的意思是，只要 $x$ 与 $x_0$ 足够接近且 $x\ne x_0$，$f(x)$ 就能与 $A$ 任意接近。

## ε-δ 定义

$$
\lim_{x\to x_0}f(x)=A
\iff
\forall\varepsilon>0,\ \exists\delta>0,\ \text{当 }0<|x-x_0|<\delta\text{ 时，}|f(x)-A|<\varepsilon.
$$

- $\varepsilon$ 限制函数值与目标值 $A$ 的距离。
- $\delta$ 限制自变量与 $x_0$ 的距离。
- 条件中有 $0<|x-x_0|$，所以不考察 $x=x_0$ 处的函数值；$f(x_0)$ 可以不等于 $A$，也可以无定义。

## 用定义证明的基本步骤

1. 从 $|f(x)-A|$ 出发，整理成便于控制的表达式。
2. 让 $|x-x_0|<\delta$ 推出 $|f(x)-A|<\varepsilon$。
3. 根据所需的不等式选出 $\delta$，再代回验证。

### 例：证明 $\lim_{x\to1}(2x-1)=1$

$$
|(2x-1)-1|=2|x-1|.
$$

任给 $\varepsilon>0$，取 $\delta=\varepsilon/2$。若 $0<|x-1|<\delta$，则

$$
|(2x-1)-1|=2|x-1|<2\delta=\varepsilon.
$$

因此极限为 $1$。

## 单侧极限

右极限只从右侧接近 $x_0$：

$$
\lim_{x\to x_0^+}f(x)=A
\iff
\forall\varepsilon>0,\ \exists\delta>0,\ 0<x-x_0<\delta\Rightarrow |f(x)-A|<\varepsilon.
$$

左极限只从左侧接近 $x_0$：

$$
\lim_{x\to x_0^-}f(x)=A
\iff
\forall\varepsilon>0,\ \exists\delta>0,\ 0<x_0-x<\delta\Rightarrow |f(x)-A|<\varepsilon.
$$

双侧极限存在，当且仅当左右极限都存在且相等：

$$
\lim_{x\to x_0}f(x)=A
\iff
\lim_{x\to x_0^-}f(x)=\lim_{x\to x_0^+}f(x)=A.
$$

例如

$$
f(x)=\begin{cases}
x-1,&x<0,\\
0,&x=0,\\
x+1,&x>0
\end{cases}
$$

在 $x=0$ 处左极限为 $-1$，右极限为 $1$，所以双侧极限不存在。单侧极限不相等是判断双侧极限不存在的直接依据。

## 其他常见的极限不存在情形

- 函数值无界：$1/x$ 在 $x\to0$ 时没有有限极限。
- 函数值无限振荡：$\sin(1/x)$ 在 $x\to0$ 时没有极限。

## 易错点

- 不要把 $f(x_0)$ 的值误当成极限；极限只看 $x_0$ 附近（去掉 $x_0$ 本身）的函数值。
- 证明时量词顺序是先任取 $\varepsilon>0$，再找到对应的 $\delta>0$。
- 不能只检查右侧或左侧就断定双侧极限存在，必须验证两个单侧极限相同。

## 来源

- [20261008 1.3 函数的极限](/posts/note-1390bf9c5175)
- 教材《高等数学上册》第 1 章 1.3 节，书内第 22–27 页：教材 PDF 第 32 页起（本地参考资料）。

---

整理自本人的工作区记录：`笔记整理/02-知识库/函数极限的ε-δ定义与单侧极限.md`。原笔记中的待核实项和实验限制予以保留。
