---
title: "20260924 反三角函数的主值与复合关系"
date: "2026-09-24 12:00:00"
description: "20260924 反三角函数的主值与复合关系：整理定义、方法、例题与易错点，保留原笔记中的待核实项。"
cover: "/assets/workspace/notes.svg"
tags: ["学习笔记", "高等数学", "课堂笔记"]
mood: ""
---

## 📋 本节要点

1. 反三角函数的值域是选定的主值区间，计算复合式时不能把反函数与原函数任意抵消。
2. 反正弦、反余弦和反正切、反余切各有对应的主值区间。
3. 照片记录了若干反三角函数复合关系；其中涉及区间限制的式子应先确认输入范围。

## 📝 课堂记录

### 主值区间

$$
\arcsin x\in\left[-\frac\pi2,\frac\pi2\right],\qquad
\arccos x\in[0,\pi].
$$

$$
\arctan x\in\left(-\frac\pi2,\frac\pi2\right),\qquad
\operatorname{arccot}x\in(0,\pi).
$$

主值区间限定了反三角函数的输出范围。

### 互余关系

$$
\arcsin x+\arccos x=\frac\pi2\quad(-1\le x\le1),
$$

$$
\arctan x+\operatorname{arccot}x=\frac\pi2\quad(x\in\mathbb R).
$$

### 复合关系的区间限制

$$
\sin(\arcsin x)=x\quad(-1\le x\le1),
$$

而 $\arcsin(\sin x)=x$ 仅在 $x\in[-\pi/2,\pi/2]$ 时成立。反三角函数输出必须落在其主值区间内。

## ❓ 疑问

- [ ] 照片中部分复合恒等式的条件与个别符号不清楚，本笔记只录入可辨认且与现有知识笔记一致的结论。

## 🧠 本节抽出的知识点

- [反三角函数的定义域与值域](/posts/inverse-trigonometric-functions)

## 参考

- 教材要点：[教材要点-1.1.3 反函数（预习）](/posts/note-cd582272f4d2)
- 关联知识点：[反三角函数的定义域与值域](/posts/inverse-trigonometric-functions)

---

整理自本人的工作区记录：`笔记整理/01-课程库/高等数学A（上）/20260924 反三角函数的主值与复合关系.md`。原笔记中的待核实项和实验限制予以保留。
