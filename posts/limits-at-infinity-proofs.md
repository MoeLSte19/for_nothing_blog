---
title: "自变量趋于无穷大时函数极限的证明"
date: "2026-10-08 12:00:00"
description: "自变量趋于无穷大时函数极限的证明：整理定义、方法、例题与易错点，保留原笔记中的待核实项。"
cover: "/assets/workspace/notes.svg"
tags: ["学习笔记", "高等数学", "知识点"]
mood: ""
---

> 一句话说清：$x$ 的绝对值超过某个阈值后，$f(x)$ 与目标值 $A$ 的距离可以小于任意给定的正数，就说函数在无穷远处趋于 $A$。

## 定义

若

$$
\forall\varepsilon>0,\ \exists X>0,\ \text{当 }|x|>X\text{ 时，}|f(x)-A|<\varepsilon,
$$

则称 $\lim_{x\to\pm\infty}f(x)=A$，即 $x\to+\infty$ 与 $x\to-\infty$ 两端都满足同一个条件；若只讨论一端，应分别使用 $x>X$ 或 $x<-X$。

这里的 $X$ 会随 $\varepsilon$ 改变：要求函数值更接近 $A$（$\varepsilon$ 更小）时，通常需要把 $X$ 取得更大。

## 证明步骤

1. 写出 $|f(x)-A|$。
2. 通过通分、有理化或放缩，把它估计成容易控制的形式。
3. 令该估计小于 $\varepsilon$，解出对 $|x|$ 或 $x$ 的要求。
4. 取满足要求的 $X$，并验证当 $|x|>X$ 时不等式成立。

## 例 1：$\lim_{x\to\pm\infty}1/x=0$

任给 $\varepsilon>0$，取 $X=1/\varepsilon$。当 $|x|>X$ 时，

$$
\left|\frac1x-0\right|=\frac1{|x|}<\frac1X=\varepsilon.
$$

所以 $\lim_{x\to\pm\infty}1/x=0$。

## 例 2：根式差的极限

$$
\lim_{x\to+\infty}\left(\sqrt{x+2}-\sqrt{x-2}\right)=0.
$$

有理化并估计：

$$
\left|\sqrt{x+2}-\sqrt{x-2}\right|
=\frac{4}{\sqrt{x+2}+\sqrt{x-2}}
<\frac4{\sqrt{x}}\quad(x>2).
$$

任给 $\varepsilon>0$，取 $X=\max\{2,16/\varepsilon^2\}$。当 $x>X$ 时，$4/\sqrt{x}<\varepsilon$，于是根式差的绝对值小于 $\varepsilon$，极限为 $0$。

## 我的错题：习题1.3第1题（3），平移后的分母估计

题目是 $\lim_{x\to\infty}1/(x+3)=0$，其中按课堂约定，$x\to\infty$ 同时考察正负两端。原证明取 $X=1/\varepsilon$，由 $|x|>X$ 直接推出 $|1/(x+3)|<\varepsilon$，这一步不成立。

例如 $\varepsilon=0.1$、$x=-10.1$ 时，$|x|>10$，但 $|1/(x+3)|\approx0.1408>0.1$。

任给 $\varepsilon>0$，改取 $X=3+1/\varepsilon$，则当 $|x|>X$ 时，

$$
|x+3|\ge |x|-3>\frac1\varepsilon,
\qquad
\left|\frac1{x+3}\right|<\varepsilon.
$$

分母发生平移时，要先估计原分母的绝对值，不能把 $1/|x|$ 的界直接搬到 $1/|x+3|$ 上。

## 证明完整性补充：习题1.4第2题

$1/(x-1)^2$ 在正负两端都趋于0。原作答使用 $x>X$，只证明了正无穷方向；若结论写成课堂中的 $x\to\infty$，可取 $X=1+1/\sqrt\varepsilon$，用

$$
|x|>X\Rightarrow |x-1|\ge |x|-1>\frac1{\sqrt\varepsilon}
\Rightarrow \frac1{(x-1)^2}<\varepsilon
$$

同时覆盖两端。原结论正确，这里补齐证明范围。

## 易错点

- $x\to+\infty$ 时条件写 $x>X$；$x\to-\infty$ 时写 $x<-X$；两端同时趋于无穷远时写 $|x|>X$。
- 根式估计要同时保证表达式有定义，因此阈值也应满足定义域要求（本例需 $x>2$）。
- $X$ 可以取得比推导出的下界更大；选取后要把它代回原估计验证。

## 来源

- [20261008 1.3 函数的极限](/posts/note-1390bf9c5175)
- 教材《高等数学上册》第 1 章 1.3 节，书内第 22–27 页：教材 PDF 第 32 页起（本地参考资料）。

---

整理自本人的工作区记录：`笔记整理/02-知识库/自变量趋于无穷大时函数极限的证明.md`。原笔记中的待核实项和实验限制予以保留。
