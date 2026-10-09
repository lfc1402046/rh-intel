# 上线前检查清单 · LAUNCH-CHECKLIST.md

> Gate G3 · 每一项必须 PASS，否则不得发布
> 适用 v0.1.0 MVP

---

## ✅ A. 基础功能（必须 PASS）

### A1. 页面可访问性

- [ ] `/` 首页加载 < 1s（Lighthouse 测）
- [ ] `/features.html` 可访问
- [ ] `/architecture.html` 可访问
- [ ] `/guide.html` 可访问
- [ ] `/download.html` 可访问
- [ ] `/privacy.html` 可访问
- [ ] `/contact.html` 可访问
- [ ] `/tool/index.html` 可访问（或下载到本地）

### A2. 工具下载

- [ ] `tool/index.html` 文件可下载
- [ ] 文件大小在合理范围（~31KB）
- [ ] 双击在浏览器打开后能正常使用
- [ ] 数据 localStorage 正常存储
- [ ] 导出/导入 JSON 正常

### A3. 表单与外部集成

- [ ] 联系表单可提交（替换 Formspree form ID 后必须测试）
- [ ] GitHub 仓库链接可访问
- [ ] GitHub Stars 链接可访问

---

## ✅ B. 视觉与交互（必须 PASS）

### B1. 苹果风格设计一致性

- [ ] 全站使用统一字体栈（系统字体）
- [ ] 主色为 `#0071E3`（苹果蓝）
- [ ] 6 模块色作为锚点保留
- [ ] 圆角规范（6/12/18/24px）
- [ ] 阴影规范（极淡 rgba 0.04-0.10）

### B2. 响应式（必测 3 个断点）

**PC (1440px 宽)**：
- [ ] 顶部导航完整水平显示
- [ ] 6 模块卡片 3 列
- [ ] AI 专区 3 列
- [ ] 隐私 4 列

**平板 (768px 宽)**：
- [ ] 顶部导航精简仍可显示
- [ ] 6 模块卡片 2 列
- [ ] AI 专区 2 列
- [ ] 隐私 2 列

**手机 (375px 宽)**：
- [ ] 顶部导航变为汉堡菜单
- [ ] 6 模块卡片 1 列
- [ ] AI 专区 1 列
- [ ] 隐私 1 列
- [ ] 所有按钮可点（≥ 44×44px）

### B3. 交互

- [ ] Hero CTA 按钮 hover 有上浮 + 阴影变化
- [ ] 模块卡片 hover 有上浮 + 顶部色条延展
- [ ] 截图轮播可手动切换（左右箭头 + 点圆点）
- [ ] 截图轮播 5 秒自动播放
- [ ] AI 卡片 hover 有背景变化
- [ ] 详情链接平滑滚动到锚点
- [ ] 模态框（如有）Esc 可关闭

### B4. 减弱动画（无障碍）

- [ ] 在系统设置启用"减少动画"后，所有过渡消失
- [ ] Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" 后验证

---

## ✅ C. 性能（必须 PASS）

### C1. Lighthouse 评分（目标）

- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 95

**检测方法**：
```
Chrome → F12 → Lighthouse → 选择 "Navigation" + "Mobile" → Analyze
```

### C2. 资源大小

- [ ] HTML 总大小 < 100KB
- [ ] CSS 总大小 < 50KB
- [ ] JS 总大小 < 20KB
- [ ] 单页总资源（不含截图）< 200KB
- [ ] 首屏加载 < 1s（4G）

### C3. 关键指标

- [ ] First Contentful Paint (FCP) < 1s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Total Blocking Time (TBT) < 200ms

### C4. 跨浏览器测试

- [ ] Chrome 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版（macOS/iOS）
- [ ] Edge 最新版
- [ ] 移动浏览器（iOS Safari / Android Chrome）

---

## ✅ D. SEO（必须 PASS）

### D1. Meta 标签

每页都有且唯一：
- [ ] `<title>` 长度 ≤ 60 字符
- [ ] `<meta name="description">` 长度 ≤ 160 字符
- [ ] `<meta name="keywords">` 合理
- [ ] `<meta name="robots" content="index, follow">`
- [ ] Open Graph（og:title, og:description, og:image, og:type, og:url）
- [ ] Twitter Card
- [ ] favicon

### D2. 结构化数据

- [ ] 首页有 JSON-LD `SoftwareApplication`
- [ ] 通过 Google Rich Results Test（https://search.google.com/test/rich-results）

### D3. 可索引性

- [ ] `robots.txt` 不阻止主站
- [ ] 工具本体（`/tool/index.html`）被 `robots.txt` 阻止（不应该被搜索引擎索引，因为是用户本地用）
- [ ] `sitemap.xml` 列出所有 7 个页面
- [ ] sitemap 已提交到 Google Search Console
- [ ] sitemap 已提交到百度站长平台

### D4. 内容质量

- [ ] 每页 H1 唯一
- [ ] 标题层级合理（H1→H2→H3 不跳级）
- [ ] 图片 alt 文本完整
- [ ] 内部链接有效（无 404）
- [ ] 文字内容可被搜索引擎抓取（不藏在 JS 后）

---

## ✅ E. 安全（必须 PASS）

### E1. HTTPS

- [ ] 已启用 HTTPS
- [ ] HTTP 自动跳转 HTTPS
- [ ] HSTS 头（推荐）

### E2. HTTP 头

- [ ] `X-Frame-Options: SAMEORIGIN`（防点击劫持）
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Content-Security-Policy`（可选，推荐）

### E3. 依赖与漏洞

- [ ] 无第三方 JS 依赖（除可选的 Formspree / GA）
- [ ] 无已知漏洞（用 https://snyk.io 检查）
- [ ] 无内嵌用户输入的 XSS 风险

### E4. 隐私

- [ ] 隐私政策完整（7 项内容）
- [ ] 联系表单明确告知会通过 Formspree 发送
- [ ] AI 增强明确告知用户自带 key，不上传服务器
- [ ] 无 cookie（除可选的 GA）
- [ ] 无第三方追踪

---

## ✅ F. 内容质量（必须 PASS）

### F1. 文案

- [ ] 首页 Hero 有冲击力（标题 + 副标题 + CTA）
- [ ] 6 模块价值描述清晰（每模块 1 句话价值 + 3 条特性）
- [ ] 隐私承诺 4 项明确
- [ ] FAQ 8 个问题答案准确
- [ ] 无拼写错误（用 https://www.grammarly.com 或类似工具检查）

### F2. 链接

- [ ] 所有内部链接有效
- [ ] 所有外部链接带 `target="_blank" rel="noopener"`
- [ ] GitHub 链接指向正确仓库
- [ ] 邮箱地址正确（`mailto:`）

### F3. 截图与素材

- [ ] 5 个核心界面截图（情报看板 / 关系图谱 / 时间线 / AI / 关键信息）
- [ ] 截图分辨率 ≥ 1280×720
- [ ] 截图带边框与标注
- [ ] Logo + favicon 完成

---

## ✅ G. 部署（必须 PASS）

### G1. GitHub 配置

- [ ] 仓库为 Public
- [ ] 仓库 README 完整
- [ ] LICENSE 文件（MIT）
- [ ] .github/workflows/deploy.yml 存在
- [ ] main 分支是默认分支

### G2. GitHub Pages 设置

- [ ] Settings → Pages → Source = "GitHub Actions"
- [ ] 首次部署成功
- [ ] 访问 `https://lfc1402046.github.io/rh-intel/` 正常

### G3. 自动化部署

- [ ] 推送一次 commit 触发 Actions
- [ ] Actions 步骤全部成功
- [ ] 部署完成后 30 秒内看到更新

### G4. 自定义域名（可选）

- [ ] CNAME 文件存在
- [ ] DNS CNAME 记录配置正确
- [ ] SSL 证书自动签发
- [ ] 强制 HTTPS 启用

---

## ✅ H. 监控（推荐）

- [ ] 接入访问分析（GA / 百度统计 / Plausible）
- [ ] 接入错误监控（Sentry / Cloudflare Analytics）
- [ ] 配置 uptime 监控（UptimeRobot / Better Uptime）
- [ ] GitHub Issues 模板准备好
- [ ] 邮件通知设置（GitHub → 5 个 events）

---

## ✅ I. 上线推广（推荐）

- [ ] 在社交媒体发布（V2EX / 即刻 / Twitter / 微博 / 小红书）
- [ ] 在相关社区分享（GitHub Trending / ProductHunt / IndieHackers）
- [ ] 准备 1 张社交媒体配图（1200×630）
- [ ] 撰写发布说明（150-300 字）
- [ ] 设置 GitHub repo topics（rh-intel, contact-management, ...）

---

## 📋 测试场景示例

### 场景 1：访客首次访问

```
1. 打开首页 → 看到 Hero "用 AI 管理你的人际关系网络"
2. 浏览 6 模块卡片
3. 看截图轮播 5 屏
4. 看 AI 玻璃专区
5. 看隐私 4 项
6. 点击 "立即下载" → 跳到下载页
7. 下载按钮 → 获取 tool/index.html
8. 双击打开工具 → 添加 3 个联系人
```

**预期**：全过程 < 5 分钟，无错误，用户体验流畅

### 场景 2：用户寻找联系方式

```
1. 点击 "联系" → 跳到联系页
2. 看到 Formspree 表单
3. 看到 GitHub / 邮箱 / 微信 三种方式
4. 填表提交 → 收到邮件通知
```

**预期**：表单提交成功，1 分钟内收到确认

### 场景 3：用户在移动端访问

```
1. 用手机浏览器打开
2. 看到汉堡菜单
3. 点开菜单 → 看到 6 个导航
4. 切换到功能页 → 1 列布局
5. 返回首页 → 流畅滚动
```

**预期**：所有交互可点，文字可读，无横向滚动

---

## 🚨 FAIL 处理

如果任意一项 FAIL：

1. **记录问题**：截图 + 错误信息 + 复现步骤
2. **评估影响**：阻塞发布 / 可延后
3. **修复**：根据问题类型分配给对应人员
4. **回归测试**：重新跑整个清单
5. **不通过 Gate 不发布**：避免把问题暴露给用户

---

## 📊 上线后 7 天观察

| 指标 | 目标 | 监测方式 |
|---|---|---|
| 落地页 PV | ≥ 100 | GA / 百度统计 |
| 工具下载次数 | ≥ 30 | GitHub Releases / 自部署后端 |
| 跳出率 | < 60% | GA |
| 平均停留时间 | > 60s | GA |
| 联系表单提交 | ≥ 3 | Formspree Dashboard |
| GitHub Stars | ≥ 10 | GitHub |
| Lighthouse Performance | ≥ 90 | PageSpeed Insights |

---

*清单结束。任何 FAIL 项必须在发布前修复。*
