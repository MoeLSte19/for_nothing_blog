export type Project = { id: string; name: string; description: string; icon: string; githubUrl: string; tags: string[]; };

export const projectsData: Project[] = [
  {
    "id": "mimo-aa-runtime",
    "name": "MiMoCode × Agents Anywhere",
    "description": "Runtime Adapter 原型：会话发现、消息发送与模型目录接入。",
    "icon": "🤖",
    "githubUrl": "https://github.com/MoeLSte19/fornothing-workspace/tree/main/projects/mimo-aa-runtime",
    "tags": [
      "Python",
      "Agent",
      "Runtime"
    ]
  },
  {
    "id": "qq-forwarder",
    "name": "QQ 通知队列与直发",
    "description": "通知过滤、静默时段、文件锁、失败重试与 OneBot 私聊推送。",
    "icon": "📨",
    "githubUrl": "https://github.com/MoeLSte19/fornothing-workspace/tree/main/projects/qq-forwarder",
    "tags": [
      "Python",
      "OneBot",
      "Queue"
    ]
  },
  {
    "id": "agent-workflows",
    "name": "Agent 交接与委托工作流",
    "description": "可复用的交接 Skill、检查点记录与网页 GPT 委托模板。",
    "icon": "🧩",
    "githubUrl": "https://github.com/MoeLSte19/fornothing-workspace/tree/main/projects/agent-workflows",
    "tags": [
      "Skill",
      "Workflow",
      "Markdown"
    ]
  },
  {
    "id": "edge-cdp-selfcheck",
    "name": "Edge CDP 自检",
    "description": "用 Node.js 和 DevTools 协议检查无界面浏览器的页面控制能力。",
    "icon": "🌐",
    "githubUrl": "https://github.com/MoeLSte19/fornothing-workspace/tree/main/projects/edge-cdp-selfcheck",
    "tags": [
      "Node.js",
      "CDP",
      "Edge"
    ]
  },
  {
    "id": "ps5-bluetooth-repair",
    "name": "DualSense 蓝牙重连排查",
    "description": "有回读核验和恢复步骤的设备省电设置修复记录。",
    "icon": "🎮",
    "githubUrl": "https://github.com/MoeLSte19/fornothing-workspace/tree/main/projects/ps5-bluetooth-repair",
    "tags": [
      "PowerShell",
      "Windows",
      "Troubleshooting"
    ]
  },
  {
    "id": "ocean-expo-presentation",
    "name": "向海而行 · 海博会分享",
    "description": "23 页演示与原生胶片墙动画，保留四版制作说明。",
    "icon": "🌊",
    "githubUrl": "https://github.com/MoeLSte19/fornothing-workspace/tree/main/projects/ocean-expo-presentation",
    "tags": [
      "PowerPoint",
      "Design",
      "Presentation"
    ]
  },
  {
    "id": "learning-notes",
    "name": "双轨学习笔记库",
    "description": "29 篇正文笔记，按课程与知识点双轨组织，附学习工作流和模板。",
    "icon": "📚",
    "githubUrl": "https://github.com/MoeLSte19/fornothing-workspace/tree/main/notes",
    "tags": [
      "Obsidian",
      "Math",
      "English"
    ]
  }
];
