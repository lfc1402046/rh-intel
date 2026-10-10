# RH Intel · 人际关系 · 情报中心

<div align="center">

**用 AI 管理你的人际关系网络**

*单文件工具 · 本地存储 · 隐私优先 · 完全免费 · 开箱即用*

[🌐 在线访问](https://rh-intel-fjbpwr6z.edgeone.cool/) · [⬇️ 下载工具](https://rh-intel-fjbpwr6z.edgeone.cool/download.html) · [📖 使用指南](https://username.github.io/rh-intel/guide.html) · [⭐ Star](https://github.com/username/rh-intel)

</div>

---

## ✨ 三步上手

```bash
# 1. 下载 tool/index.html（51KB 单文件）
# 2. 双击在浏览器打开
# 3. 立即看到 8 位预装示例联系人 — 开始使用！
```

**首次打开自动预装示例数据**，你立即看到完整的"情报中心"功能：
- 6 大模块（联系人、图谱、时间线、标签、关键信息、看板）
- 8 位真实感联系人（王五、李四、妈、爸、张总、孙八、周教练、林医生）
- 7 条互动记录 + 6 对预设关系连接
- 一键清空数据 / 导入你自己的 JSON

## 🎯 六大功能模块

| 模块 | 简介 |
|---|---|
| 👤 **联系人档案** | 每个人的完整画像（30+ 字段 + Markdown 备注 + 自定义键值）|
| 🕸️ **关系图谱** | 可视化你的关系网络，支持力导向 / 子图聚焦 / 多种布局 |
| 📅 **互动时间线** | 记录每一次相遇，7 指标雷达 + 日历热力图 + 季度复盘 |
| 🏷️ **标签圈子** | 多维标签体系，自动识别你的社交圈子 |
| 🔔 **关键信息** | 生日提醒 / 待办承诺 / 偏好禁忌 / 敏感话题 |
| 📊 **情报看板** | 5 秒看清今天该做什么 + 邓巴分布 + 趋势洞察 |

## 🛠️ 技术栈

**主站（`site/` 目录）**：
- 纯 HTML + CSS + JavaScript（**0 依赖**）
- Apple-inspired Design System（系统字体 + 巨留白 + 玻璃拟态）
- 响应式 3 断点（1068 / 734 / 480）
- 12 个页面（含 AI 测试 / 资源池 / 功能演示 / 404）
- 5 个 SVG 截图占位 + 2 份样本数据

**工具本体（`tool/index.html`）**：
- 单文件 51KB
- localStorage 本地存储
- Canvas 2D（关系图谱）
- LLM 客户端调用（用户自带 key）
- **首次打开自动预装 8 位示例数据**（开箱即用）

## 📁 目录结构

```
rh-intel/
├── site/                    # 主站（部署到 EdgeOne Pages）
│   ├── index.html           # 首页
│   ├── features.html        # 功能页
│   ├── architecture.html    # 架构页
│   ├── guide.html           # 使用指南
│   ├── download.html        # 下载页
│   ├── privacy.html         # 隐私政策
│   ├── contact.html         # 联系页
│   ├── ai-test.html         # AI 话术测试器（v3.0 档案）
│   ├── feature-demo.html    # 功能演示（导入+引导）
│   ├── resource-pool.html   # 人脉资源池（v1.2 预览）
│   ├── 404.html             # 错误页
│   ├── tool/
│   │   ├── index.html       # 工具本体（51KB，预装示例）
│   │   ├── sample-data.json          # v3.0 完整样本
│   │   ├── sample-data-v1-compatible.json  # v0.1 兼容版
│   │   ├── contacts-deep.json        # 5 个深度档案
│   │   └── sample-data-preview.html  # 样本数据预览
│   ├── assets/
│   │   ├── css/main.css     # 苹果风格统一样式
│   │   ├── js/main.js       # 共用脚本（含 Back to Top + 错误处理）
│   │   ├── js/ai-test.js    # AI 话术测试逻辑
│   │   ├── js/back-to-top.js
│   │   └── images/           # 5 个 SVG 截图
│   ├── docs/                # 文档
│   ├── sitemap.xml
│   └── robots.txt
├── docs/                    # 架构/运营/设计文档（8+ 份）
│   ├── 架构方案.md
│   ├── 架构方案-v2.md
│   ├── 架构方案-v3.md
│   ├── 架构方案-v4.md
│   ├── 架构方案-v5.md
│   ├── 付费模式设计.md
│   ├── MVP-阶段实施-spec.md
│   ├── DEPLOY.md
│   ├── LAUNCH-CHECKLIST.md
│   ├── MONITORING.md
│   ├── site-spec.md
│   ├── content-plan.md
│   ├── design-spec.md
│   ├── 矛盾解决-GitHub-Pages-vs-付费.md
│   ├── AI-主动维护系统设计.md
│   ├── 人物档案-深度设计.md
│   └── REPLACE-SCREENSHOTS.md
├── .github/
│   └── workflows/deploy.yml  # GitHub Pages 自动部署
└── README.md
```

## 🚀 部署状态

- **在线访问**：https://rh-intel-fjbpwr6z.edgeone.cool/（中国站 · EdgeOne Pages）
- **GitHub 仓库**：https://github.com/username/rh-intel
- **自动部署**：每次 `git push` → GitHub Actions / EdgeOne 自动同步

## 💡 隐私承诺

- ✅ **本地存储** — 数据存在你的浏览器，不上任何服务器
- ✅ **不上传** — 我们看不到你的联系人信息
- ✅ **完全开源** — 每行代码可审查
- ✅ **0 追踪** — 无第三方追踪脚本，无广告，无 cookie（除可选的 GA）

## 🧪 预览功能（v1.1 / v1.2）

| 页面 | 功能 | 状态 |
|---|---|---|
| `/ai-test.html` | AI 话术测试器（v3.0 深度档案 + 5 个真实场景）| 预览 |
| `/feature-demo.html` | 快速导入 + 新手引导 | 预览 |
| `/resource-pool.html` | 人脉资源池（多维标签 + 可视化网络）| 预览 |

## 🤝 贡献

欢迎贡献！请按以下步骤：

1. **Fork** 仓库
2. **创建** 分支 (`git checkout -b feature/AmazingFeature`)
3. **提交** 改动 (`git commit -m 'feat: add amazing feature'`)
4. **推送** 分支 (`git push origin feature/AmazingFeature`)
5. **发起** Pull Request

## 📜 许可证

本项目采用 [MIT 协议](LICENSE)。

---

<div align="center">

**🎊 v0.1.0 MVP 已上线 · 立即下载体验！**

Made with ❤️ in 厦门 · 本地优先 · 隐私至上

</div>
