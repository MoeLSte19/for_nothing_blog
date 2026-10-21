---
title: "把长对话交接做成可复用工作流"
date: "2026-09-24 12:00:00"
description: "这是本工作区维护的交接流程；相关社区方案与来源见调研记录。"
cover: "/assets/workspace/lab.svg"
tags: ["Agent", "工作流", "上下文管理"]
mood: ""
---

> 这是本工作区维护的交接流程；相关社区方案与来源见[调研记录](/posts/context-handoff-research)。

Use this workflow for long-running work in `E:\codex` when the conversation has compacted, context is visibly degrading, or the user asks for a handoff. Workspace-wide rules are in AGENTS.md; project routing is in README.md.

## Trigger policy

- After the first observed compaction, record or update a short checkpoint in the current project’s handoff state (or `工具/交接/` if work spans projects). Include objective, completed work, current state, key confirmed decisions, exact files touched, and next action. Continue the task if context remains reliable.
- After a second compaction, clear loss of relevant decisions/artifact state, or the user asking for a fresh conversation, tell the user a new conversation is advisable and prepare a handoff summary before stopping.
- Do not interrupt for ordinary turns or infer a compaction count without evidence. If the count/state is unknown, say so and assess visible continuity.
- The user requested a reminder and summary, not automatic thread creation or switching. Do not claim to open or switch conversations unless an available, authorized Codex thread tool actually does that.

## Handoff summary

Write the summary in Chinese unless the task’s working language differs. Make it self-contained and concise. Include:

1. Objective and acceptance criteria.
2. Confirmed user decisions and constraints; separate unresolved questions.
3. Completed work and current state.
4. Exact workspace paths of relevant files and any edits not yet completed.
5. Next concrete steps and blockers.
6. Verification actually performed; do not imply unrun checks passed.

Prefer a dated file under `工具/交接/` for cross-project handoffs, or the project’s existing handoff location when one is defined. Do not overwrite an unrelated prior handoff. Provide the user a brief new-conversation prompt pointing to the summary and project entry README.

## Delegation and outside GPT

- Delegate only bounded, read-only retrieval or repeated extraction to subagents when available and useful. Ask for concise findings with source paths and uncertainty. The main conversation verifies and writes all files.
- For web ChatGPT, prepare a minimal, de-identified packet using `工具/网页GPT委托包模板.md`. The user manually sends it and brings the reply back. Do not imply direct connectivity or automatic dispatch.

## Capability limit

This Skill alone cannot observe token percentages, automatic compaction events, or thread state. Without an installed lifecycle Hook or explicit event signal, act only when the conversation exposes a compaction/degradation signal or the user requests a handoff. Do not claim background monitoring.

---

整理自本人的工作区记录：`工具/skills/context-handoff/SKILL.md`。原笔记中的待核实项和实验限制予以保留。
