# RH Intel · 人际关系 · 情报中心

<div align="center">

**用 AI 管理你的人际关系网络**

*单文件工具 · 本地存储 · 隐私优先 · 完全免费*

[🌐 在线访问](https://lfc1402046.github.io/rh-intel/) · [⬇️ 下载工具](https://lfc1402046.github.io/rh-intel/download.html) · [📖 使用指南](https://lfc1402046.github.io/rh-intel/guide.html) · [⭐ Star](https://github.com/lfc1402046/rh-intel)

</div>

---

## ✨ 一句话介绍

RH Intel 是一个**单文件 HTML 工具**，帮你管理所有联系人、关系网络、互动历史。**无需安装、无需账号、双击即用**，所有数据存在你的浏览器本地，不上任何服务器。

## 🎯 核心特性

### 六大模块

| 模块 | 简介 |
|---|---|
| 👤 **联系人档案** | 每个人的完整画像（30+ 字段 + Markdown 备注 + 自定义键值）|
| 🕸️ **关系图谱** | 可视化你的关系网络，支持力导向 / 子图聚焦 / 多种布局 |
| 📅 **互动时间线** | 记录每一次相遇，7 指标雷达 + 日历热力图 + 季度复盘 |
| 🏷️ **标签圈子** | 多维标签体系，自动识别你的社交圈子 |
| 🔔 **关键信息** | 生日提醒 / 待办承诺 / 偏好禁忌 / 敏感话题 |
| 📊 **情报看板** | 5 秒看清今天该做什么 + 邓巴分布 + 趋势洞察 |

### AI 增强（用户自带 API key）

- 🏷️ **自动打标**：基于备注和互动历史推荐标签
- 💬 **话术建议**：3 种版本开场白（破冰/升级/修复）
- 📈 **月度总结**：自动生成关系动态 + 关键词云
- 🎯 **强度推荐**：基于互动频率和深度推荐关系强度
- 🧭 **图谱洞察**：谁是你的关系枢纽？哪里有潜在撮合？
- 🔗 **撮合推荐**：基于共同话题推荐值得认识的人

### 隐私承诺

- ✅ **本地存储** — 数据存在浏览器，不上任何服务器
- ✅ **不上传** — 我们看不到，也不想看到
- ✅ **完全开源** — 每行代码可审查
- ✅ **0 追踪** — 无第三方脚本，无广告，无 cookie

## 🚀 快速开始

### 方法 1：在线使用

```bash
# 访问部署好的站点
https://lfc1402046.github.io/rh-intel/

# 下载工具本体（单文件 31KB）
https://lfc1402046.github.io/rh-intel/download.html
```

### 方法 2：本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/lfc1402046/rh-intel.git
cd rh-intel

# 2. 直接打开 site/index.html（无需构建）
open site/index.html

# 3. 工具本体
open tool/index.html
```

### 方法 3：本地部署（任何静态服务器）

```bash
# Python
python3 -m http.server 8000 --directory site
# 访问 http://localhost:8000

# Node.js
npx serve site

# PHP
php -S localhost:8000 -t site
```

## 📸 界面预览

> 截图将在 v1.5+ 提供（当前为占位 SVG）

| 情报看板 | 关系图谱 |
|:---:|:---:|
| 6 模块顶部 + 数据指标 | 力导向布局 + 节点 + 边 |

| 互动时间线 | AI 话术建议 |
|:---:|:---:|
| 雷达图 + 日历热力图 | 3 种版本开场白 |

## 🛠️ 技术栈

**主站（`site/` 目录）**：
- 纯 HTML + CSS + JavaScript（**0 依赖**）
- Apple-inspired Design System（系统字体栈 + 巨量留白 + 玻璃拟态）
- 响应式 3 断点（1068 / 734 / 480）
- 无障碍：WCAG AA + 减弱动画支持

**工具本体（`tool/index.html`）**：
- 单文件 HTML（31KB）
- localStorage 本地存储
- Canvas 2D（关系图谱）
- LLM 客户端调用（用户自带 API key）

## 📁 目录结构

```
rh-intel/
├── site/                          # 主站（部署到 GitHub Pages）
│   ├── index.html                 # 首页
│   ├── features.html              # 功能页
│   ├── architecture.html          # 架构页
│   ├── guide.html                 # 使用指南
│   ├── download.html              # 下载页
│   ├── privacy.html               # 隐私政策
│   ├── contact.html               # 联系页
│   ├── sitemap.xml                # SEO 站点地图
│   ├── robots.txt                 # 爬虫规则
│   └── assets/
│       ├── css/main.css           # 苹果风格统一样式
│       └── js/main.js             # 共用脚本
├── tool/
│   └── index.html                 # 工具本体（从根 index.html 复制）
├── docs/                          # 架构方案 + 部署文档
│   ├── 架构方案.md                 # v1.0 初始架构
│   ├── 架构方案-v2.md              # v2.0 视觉翻新
│   ├── 架构方案-v3.md              # v3.0 邓巴圈层
│   ├── 架构方案-v4.md              # v4.0 画像体系
│   ├── 架构方案-v5.md              # v5.0 算法深挖
│   ├── 付费模式设计.md             # 商业模式设计
│   ├── MVP-阶段实施-spec.md        # MVP 实施规范
│   ├── DEPLOY.md                  # 完整部署指南
│   ├── LAUNCH-CHECKLIST.md        # 上线前检查
│   └── MONITORING.md              # 监控方案
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages 自动部署
├── README.md                      # 本文件
└── LICENSE                        # MIT 协议
```

## 🤝 贡献指南

欢迎贡献！请按以下步骤：

1. **Fork** 仓库
2. **创建** 分支 (`git checkout -b feature/AmazingFeature`)
3. **提交** 改动 (`git commit -m 'feat: add amazing feature'`)
4. **推送** 分支 (`git push origin feature/AmazingFeature`)
5. **发起** Pull Request

**Commit 规范**：
- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 样式调整
- `refactor:` 重构
- `test:` 测试
- `chore:` 构建/工具链

## 🐛 反馈与支持

- 🐛 **Bug 反馈**：[GitHub Issues](https://github.com/lfc1402046/rh-intel/issues)
- 💡 **功能建议**：[GitHub Discussions](https://github.com/lfc1402046/rh-intel/discussions)
- 📧 **邮件联系**：hi@example.com
- 📮 **在线表单**：[联系页](https://lfc1402046.github.io/rh-intel/contact.html)

## 📜 许可证

本项目采用 [MIT 协议](LICENSE)。

```
MIT License

Copyright (c) 2026 RH Intel Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND...
```

## 🙏 致谢

- 启发自 [Dunbar's Number](https://en.wikipedia.org/wiki/Dunbar%27s_number) 的人类社交网络研究
- 感谢所有贡献者和用户的反馈
- 受到 **Apple Design**、**Notion**、**Things 3** 等优秀产品的启发

---

<div align="center">

**[⬇️ 立即下载开始使用](https://lfc1402046.github.io/rh-intel/download.html)** · **[⭐ Star 支持我们](https://github.com/lfc1402046/rh-intel)**

Made with ❤️ · 本地优先 · 隐私至上

</div>
