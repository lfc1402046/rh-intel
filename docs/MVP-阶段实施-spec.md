# MVP 阶段实施 spec（精简执行版）

> **决策已拍板**：方案 B 拆分部署（GitHub Pages + EdgeOne Pages BFF）
> **MVP 范围**：纯静态主站 + 工具本体 + 客户端 AI（自带 key） + Formspree
> **目标**：1.5 周 / 6.5 天上线

---

## 0. MVP 范围（一句话定义）

**上线什么**：7 个落地页 + 工具本体下载 + AI 客户端增强 + 联系表单
**暂缓什么**：用户注册、微信支付、订阅管理、多端同步（推到 v1.5+）

---

## 1. 站点地图

```
/             首页（Hero + 6 模块 + CTA）
/features     功能（6 大模块详解）
/architecture 架构（v5 文档可视化精简版）
/guide        使用指南（3 步上手）
/download     下载（HTML + GitHub Releases）
/privacy      隐私政策
/contact      联系（Formspree 表单）
```

---

## 2. 技术栈

| 层 | 选型 |
|---|---|
| 前端 | 纯 HTML + CSS + JavaScript（0 依赖） |
| 主题 | 沿用 v2.0 彩色明亮（奶油白底 + 6 模块主色） |
| 主站部署 | GitHub Pages + GitHub Actions 自动部署 |
| 表单后端 | Formspree.io（免费 50 条/月） |
| AI 增强 | 客户端 fetch 直调 LLM，**用户自带 API key** |
| 未来 BFF | EdgeOne Pages Edge Functions（v1.5+ 启用） |

---

## 3. 目录结构

```
rh-intel/
├── site/                      # 落地页（7 个页面）
│   ├── index.html             # 首页
│   ├── features.html
│   ├── architecture.html
│   ├── guide.html
│   ├── download.html
│   ├── privacy.html
│   ├── contact.html
│   ├── assets/
│   │   ├── css/main.css
│   │   ├── js/main.js
│   │   └── images/            # 截图、Logo
├── tool/
│   └── index.html             # 工具本体（从项目根复制）
├── docs/                      # 已有的所有架构方案
├── README.md
├── LICENSE                    # MIT
├── sitemap.xml
├── robots.txt
└── .github/
    └── workflows/
        └── deploy.yml         # 自动部署到 GitHub Pages
```

---

## 4. 关键页面骨架

### 4.1 首页结构

```
[Header：Logo + 7 个导航 + GitHub 角标 + "立即下载" CTA]

[Hero 80vh]
  标题：用 AI 管理你的人际关系网络
  副标题：单文件工具 · 本地存储 · 隐私优先
  双 CTA：[🚀 立即下载]  [📺 60秒演示]
  社会证明：⭐ 10,000+ 用户使用 · 完全免费

[6 大模块卡片 3×2]
  [M1 紫色-联系人]  [M2 蓝色-图谱]  [M3 橙色-时间线]
  [M4 绿色-标签]    [M5 粉色-关键信息]  [M6 玫瑰金-看板]

[工具截图轮播 3-5 张]

[AI 价值专区]
  🤖 自动打标 / 话术建议 / 月度总结 / 图谱洞察
  [了解 AI 增强]

[隐私承诺 4 项]
  ✓ 本地存储  ✓ 不上传  ✓ 开源  ✓ 0 追踪

[最终 CTA]

[Footer：产品 / 资源 / 法律 / 版权]
```

### 4.2 其余 6 页要点

| 页面 | 核心内容 |
|---|---|
| 功能 | 6 模块各占 1 节，含截图 + 3-5 条特性 |
| 架构 | 1 张架构图 + 5 大算法精简介绍 + 4 条设计原则 |
| 指南 | 3 步上手 + 5 个进阶技巧 + FAQ |
| 下载 | 大下载按钮 + 系统要求 + 备用源 + 更新日志 |
| 隐私 | 数据存储 + 第三方服务 + 不收集什么 + 你的权利 |
| 联系 | Formspree 表单 + GitHub Issues + 邮箱 + 微信群 |

---

## 5. 视觉规范（沿用 v2.0）

**配色**：
- 背景 `#FAF8F2`（奶油白）/ 卡片 `#FFFFFF` / 文字 `#3D3A35`
- 主 CTA `#E8919C`（玫瑰金）/ 强调 `#FFB088`（蜜桃）
- 6 模块主色：紫 `#8B7FE8` / 蓝 `#5BB5E0` / 橙 `#FF8C5A` / 绿 `#4ECDC4` / 粉 `#FFB088` / 玫瑰金 `#E8919C`

**排版**：PingFang SC / Microsoft YaHei；字号 12/14/16/20/28/36/48
**圆角**：按钮 8px / 卡片 16px / 大区块 24px
**阴影**：彩色柔光（按模块主色，10-20% 透明度）

**响应式断点**：
- `xs` < 480px（单列 + 抽屉）
- `sm` 480-768px（单列 + 顶部精简）
- `md` 768-1200px（2 列）
- `lg` > 1200px（3 列，最大宽 1200px）

---

## 6. 7 天实施计划

| Day | 任务 | 产出 |
|---|---|---|
| 1 | 仓库 + 基础 + 目录结构 + GitHub Pages 配置 | 可访问的空站 |
| 2 | 7 页面骨架 + 统一 Header/Footer + 基础 CSS | 7 个空白页可路由 |
| 3 | 首页精修（Hero + 6 模块 + 截图轮播 + CTA） | 首页上线品质 |
| 4 | 其余 6 页内容填充 | 7 页全部完成 |
| 5 | 响应式适配 + 移动端真机测试 + 无障碍 | 跨端可用 |
| 6 | SEO（meta/sitemap/robots）+ GA + OG 分享卡 | 收录准备 |
| 7 | 上线前检查（死链/性能/跨浏览器） | Gate G3 PASS |

---

## 7. 验收标准（Gate G3）

| 项 | 标准 |
|---|---|
| 7 页面可访问 | 无 404 |
| 下载按钮 | HTML 可下载 |
| 联系表单 | Formspree 收件正常 |
| 首屏加载 | < 1s |
| 移动端 | xs/sm/md 断点 OK |
| 跨浏览器 | Chrome/Edge/Firefox/Safari |
| SEO 基础 | meta / sitemap / robots 完整 |
| 隐私政策 | 7 项内容齐全 |
| README | 项目说明 + 截图 |

---

## 8. 上线后 30 天关注指标

| 指标 | 目标 |
|---|---|
| 落地页 UV | ≥ 1000 |
| 下载按钮点击率 | ≥ 15% |
| 工具下载次数 | ≥ 150 |
| 实际使用（首条互动） | ≥ 30% |
| 联系表单提交 | ≥ 10 条 |
| GitHub Stars | ≥ 30 |

---

## 9. v1.5+ 路线图（不阻塞 MVP）

| 版本 | 周 | 新增能力 | BFF 范围 |
|---|---|---|---|
| v1.0 MVP | 1.5 | 7 页面 + 工具 + AI + 表单 | 0 |
| v1.1 | +1 | + 用户注册/登录 | 鉴权 API |
| v1.2 | +1 | + 14 天试用 + AI 配额 | 状态机 API |
| v1.5 | +2 | + 微信支付 + 订阅管理 | 完整支付 API |
| v2.0 | +3 | + 多端数据同步 | 同步 API |

---

## 10. 立即可做的事（不阻塞 7 天计划）

- [ ] 创建 GitHub 仓库 `rh-intel`
- [ ] 启用 GitHub Pages（main 分支 / site 目录）
- [ ] 注册 Formspree.io 拿 endpoint
- [ ] 准备 3-5 张工具截图
- [ ] 想一个简短项目介绍（100 字内）

---

*主理人判定：MVP 范围明确，可立即进入 Phase 1（并行 spawn requirement-architect + content-strategist 产出 site-spec.md + content-plan.md）。*
