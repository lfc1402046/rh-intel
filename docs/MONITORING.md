# 监控与运维方案 · MONITORING.md

> 上线后监控策略、错误追踪、可用性监测、应急响应

---

## 📊 监控矩阵总览

| 类别 | 工具 | 优先级 | 实施难度 |
|---|---|---|---|
| **访问分析** | Plausible / Google Analytics / 百度统计 | P0 | ⭐ |
| **错误追踪** | Sentry / Cloudflare Analytics | P1 | ⭐⭐ |
| **可用性** | UptimeRobot / Better Uptime | P0 | ⭐ |
| **性能** | Lighthouse CI / PageSpeed Insights | P1 | ⭐⭐ |
| **SEO** | Google Search Console / 百度站长 | P1 | ⭐ |
| **反馈** | GitHub Issues / Discussions | P0 | ⭐ |
| **状态页** | Statuspage / Upptime | P2 | ⭐⭐ |

---

## 1. 访问分析

### 1.1 推荐：Plausible（隐私友好）

**优点**：不开 cookie、不追踪个人、GDPR 合规、轻量（< 1KB）

```html
<!-- 在 site/index.html 等所有页面的 </body> 前加入 -->
<script defer data-domain="rh.example.com" src="https://plausible.io/js/script.js"></script>
```

**价格**：免费 30 天 trial / $9/月（自托管免费）

### 1.2 国内推荐：百度统计

```html
<!-- 百度统计代码（示例） -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?YOUR_SITE_ID";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

### 1.3 自托管：Umami（推荐技术用户）

```bash
# 部署到 Vercel / Netlify
# 数据自己掌控，完全免费
# 配置步骤：https://umami.is/docs/getting-started
```

### 1.4 关键指标

| 指标 | 目标 | 警报阈值 |
|---|---|---|
| 日 PV | 100 → 1000+ | < 50 |
| 日 UV | 50 → 500+ | < 30 |
| 跳出率 | < 60% | > 80% |
| 平均停留 | > 60s | < 30s |
| 工具下载率 | ≥ 15% | < 5% |

---

## 2. 错误追踪

### 2.1 推荐：Sentry

**为什么需要**：
- 自动捕获 JS 错误（即使在工具本体 HTML）
- 提供 stack trace + 用户上下文
- 支持 Source Map（生产代码反混淆）
- 免费 5K events/月

**接入步骤**：

```html
<!-- Sentry SDK 接入 -->
<script src="https://browser.sentry-cdn.com/7.100.0/bundle.min.js" crossorigin="anonymous"></script>
<script>
  Sentry.init({
    dsn: 'YOUR_DSN_HERE',
    environment: 'production',
    release: 'rh-intel@0.1.0',
    
    // 性能监控
    tracesSampleRate: 0.1,  // 10% 采样
    
    // 隐私：不上传 PII
    beforeSend(event) {
      if (event.user) {
        delete event.user.ip_address;
        delete event.user.email;
      }
      return event;
    },
    
    // 忽略已知的浏览器警告
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
    ]
  });
</script>
```

### 2.2 替代方案

| 工具 | 优点 | 缺点 |
|---|---|---|
| **Sentry** | 功能强、社区大 | 免费额度有限 |
| **Cloudflare Analytics** | CDN 集成、零配置 | 仅错误率，无详细堆栈 |
| **LogRocket** | 录屏错误回放 | 贵（$99/月） |
| **Rollbar** | 实时告警 | UI 复杂 |
| **Bugsnag** | 稳定性强 | 贵（$29/月） |

### 2.3 自建：用 GitHub Issues 自动上报

```javascript
// 工具本体的 JS 错误处理
window.addEventListener('error', (event) => {
  // 上报到 GitHub Issue（用 API）
  fetch('https://api.github.com/repos/username/rh-intel/issues', {
    method: 'POST',
    headers: {
      'Authorization': 'token GITHUB_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: `[Auto] ${event.message}`,
      body: `File: ${event.filename}\nLine: ${event.lineno}\nBrowser: ${navigator.userAgent}`,
      labels: ['bug', 'auto-report']
    })
  });
});
```

---

## 3. 可用性监控

### 3.1 推荐：UptimeRobot（免费 50 个监控）

**配置步骤**：
1. 访问 https://uptimerobot.com 注册
2. Add New Monitor
3. Monitor Type: HTTP(s)
4. Friendly Name: RH Intel 主站
5. URL: https://rh.example.com/
6. Monitoring Interval: 5 minutes
7. Alert Contacts: 邮箱 / Slack / Telegram

**关键监控项**：

| 检查项 | URL | 频率 |
|---|---|---|
| 主站首页 | https://rh.example.com/ | 5 分钟 |
| 下载页 | https://rh.example.com/download.html | 15 分钟 |
| 工具本体 | https://rh.example.com/tool/index.html | 15 分钟 |
| sitemap | https://rh.example.com/sitemap.xml | 1 小时 |

### 3.2 替代方案

| 工具 | 免费额度 | 特点 |
|---|---|---|
| **UptimeRobot** | 50 个 / 5 分钟 | 老牌、稳定 |
| **Better Uptime** | 5 个 / 3 分钟 | 现代 UI + Statuspage |
| **StatusCake** | 10 个 / 5 分钟 | 中文支持好 |
| **阿里云监控** | 5 个 / 1 分钟 | 国内稳定 |

### 3.3 自建：用 GitHub Actions 定时 ping

```yaml
# .github/workflows/uptime.yml
name: Uptime Check

on:
  schedule:
    - cron: '*/5 * * * *'  # 每 5 分钟

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping main site
        run: |
          STATUS=$(curl -o /dev/null -s -w "%{http_code}" https://username.github.io/rh-intel/)
          if [ $STATUS -ne 200 ]; then
            echo "Site down! Status: $STATUS"
            # 触发 GitHub Issue
            curl -X POST -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
              -d '{"title":"[Auto] Site down","body":"Status: '"$STATUS"'"}' \
              https://api.github.com/repos/username/rh-intel/issues
          fi
```

---

## 4. 性能监控

### 4.1 Lighthouse CI（每次部署前自动测）

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [ main ]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun --upload.target=temporary-public-storage || exit 1
```

### 4.2 关键指标监控

| 指标 | 目标 | 监测工具 |
|---|---|---|
| **FCP** (First Contentful Paint) | < 1.0s | Lighthouse / PageSpeed Insights |
| **LCP** (Largest Contentful Paint) | < 2.5s | Lighthouse / WebPageTest |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| **TBT** (Total Blocking Time) | < 200ms | Lighthouse |
| **TTI** (Time to Interactive) | < 3s | Lighthouse |
| **Speed Index** | < 3s | Lighthouse |

### 4.3 真实用户监控（RUM）

```javascript
// 简单的 RUM 实现
window.addEventListener('load', () => {
  const timing = performance.getEntriesByType('navigation')[0];
  
  // 上报到 Sentry 或自建后端
  Sentry.captureMessage('page_load', {
    extra: {
      fcp: timing.domContentLoadedEventEnd,
      load: timing.loadEventEnd,
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      ttfb: timing.responseStart - timing.requestStart
    }
  });
});
```

---

## 5. SEO 监控

### 5.1 Google Search Console（必做）

1. 访问 https://search.google.com/search-console
2. 添加资源（域名或 URL 前缀）
3. 验证（DNS TXT 记录 或 HTML 文件）
4. 提交 sitemap：https://rh.example.com/sitemap.xml
5. 监控：覆盖率 / 体验 / 增强 / 安全

### 5.2 百度站长平台（国内必做）

1. 访问 https://ziyuan.baidu.com
2. 添加站点
3. 验证（HTML 文件或 CNAME）
4. 提交 sitemap：https://rh.example.com/sitemap.xml
5. 监控：抓取 / 收录 / 流量

### 5.3 关键词监控

| 关键词 | 当前排名 | 目标 |
|---|---|---|
| 人际关系管理 | 待查 | Top 50 |
| 联系人管理工具 | 待查 | Top 30 |
| 关系图谱 | 待查 | Top 50 |
| 本地 CRM | 待查 | Top 30 |
| 人脉管理 | 待查 | Top 50 |

**追踪工具**：
- 百度站长 → 关键词工具
- Google Search Console → 性能
- 第三方：Ahrefs / 5118

---

## 6. 反馈与沟通

### 6.1 GitHub Issues 模板

在仓库创建：

**`.github/ISSUE_TEMPLATE/bug.yml`**：

```yaml
name: Bug Report
description: 报告一个 Bug
title: "[Bug] "
labels: ["bug"]
body:
  - type: input
    id: browser
    attributes:
      label: 浏览器与版本
      placeholder: Chrome 120 / Safari 17 / ...
  
  - type: input
    id: os
    attributes:
      label: 操作系统
      placeholder: Windows 11 / macOS 14 / ...
  
  - type: dropdown
    id: page
    attributes:
      label: 出错页面
      options:
        - 首页
        - 功能
        - 架构
        - 指南
        - 下载
        - 隐私
        - 联系
        - 工具本体
  
  - type: textarea
    id: steps
    attributes:
      label: 复现步骤
      placeholder: |
        1. 打开 ...
        2. 点击 ...
        3. 看到 ...
  
  - type: textarea
    id: expected
    attributes:
      label: 预期行为
  
  - type: textarea
    id: actual
    attributes:
      label: 实际行为
```

### 6.2 GitHub Discussions 启用

1. Settings → General → Features → ✓ Discussions
2. 创建分类：💡 Ideas / 🙏 Q&A / 📣 Announcements / 🙌 Show and tell
3. 欢迎模板：自动出现在新 Discussion

### 6.3 邮件渠道

- **主要**：`hi@example.com`（联系表）
- **紧急**：hi+urgent@example.com（自动过滤到紧急列表）

### 6.4 响应 SLA

| 渠道 | 首次响应 | 解决时间 |
|---|---|---|
| GitHub Issues | 48 小时 | 14 天 |
| 联系表单 | 24 小时 | 7 天 |
| 紧急邮件 | 4 小时 | 24 小时 |

---

## 7. 应急响应

### 7.1 应急等级

| 等级 | 触发 | 响应 |
|---|---|---|
| **P0** 严重 | 站点完全无法访问 | 1 小时内处理 |
| **P1** 严重 | 主要功能不可用 | 4 小时内处理 |
| **P2** 中等 | UI 错误、性能问题 | 24 小时内处理 |
| **P3** 轻微 | 文案错误、样式小问题 | 7 天内迭代 |

### 7.2 回滚流程

```bash
# 在 GitHub 上：
# 1. 进入 Actions → 选择上次成功的部署 → 找到 commit
# 2. git revert HEAD → git push → 触发重新部署

# 或在 GitHub 仓库 → Commits → 找到上次成功的 commit
# 点击 "Revert" → 创建 PR → 合并 → 自动回滚

# 在 Vercel / Netlify：
# Deployments → 找到上次成功的部署 → "Promote to Production"
```

### 7.3 状态页（推荐 Better Uptime 内置）

域名：`status.rh.example.com`

- 主站状态：operational
- API 状态：operational
- 最近事件：自动汇总

### 7.4 事故复盘模板

**Post-mortem 模板**：

```markdown
## 事故复盘 [YYYY-MM-DD HH:MM]

### 概要
- 持续时间：30 分钟
- 影响：所有用户
- 原因：配置文件错误

### 时间线
- HH:MM 报警触发
- HH:MM 工程师响应
- HH:MM 修复完成
- HH:MM 服务恢复

### 根因
[详细原因分析]

### 改进项
- [ ] 添加部署前 lint 检查
- [ ] 配置自动回滚
- [ ] 优化报警阈值
```

---

## 8. 备份策略

### 8.1 代码备份

- **GitHub 仓库**：主代码仓库（已有）
- **本地**：开发者本地 checkout
- **GitHub Releases**：每个版本打 tag，作为不可变快照

```bash
# 打 tag 并推送
git tag -a v0.1.0 -m "MVP 首发版本"
git push origin v0.1.0

# GitHub Actions 自动构建 release
```

### 8.2 数据备份

工具数据在用户本地，**我们不存储**。但：
- 用户工具的"导出 JSON"功能就是他们的备份
- 建议在文档中强调"定期导出"
- 未来 v1.5+ 加云端同步时，服务端需 3-2-1 备份策略

### 8.3 配置备份

```bash
# GitHub Secrets 配置
# Settings → Secrets and variables → Actions

# 每个密钥都记录在 1Password / Bitwarden 等
# 团队成员通过密钥管理工具访问
```

---

## 9. 成本估算

### 9.1 MVP 阶段（首年）

| 项目 | 成本 |
|---|---|
| GitHub Pages | 免费 |
| Formspree（50 条/月） | 免费 |
| 域名（.com） | $10/年 ≈ ¥70 |
| Google Analytics | 免费 |
| **合计** | **¥70/年** |

### 9.2 增长阶段（PV 1 万+/天）

| 项目 | 成本 |
|---|---|
| Vercel Pro | $20/月 = ¥150/月 |
| Sentry 团队版 | $26/月 = ¥195/月 |
| Plausible | $9/月 = ¥70/月 |
| UptimeRobot Pro | $7/月 = ¥50/月 |
| **合计** | **¥465/月 ≈ ¥5580/年** |

### 9.3 规模化（PV 10 万+/天）

| 项目 | 成本 |
|---|---|
| Cloudflare Pro | $20/月 = ¥150/月 |
| Sentry Business | $80/月 = ¥600/月 |
| Plausible | $19/月 = ¥140/月 |
| 国内 CDN（EdgeOne / CloudBase） | ¥500/月 |
| **合计** | **¥1390/月 ≈ ¥16680/年** |

---

## 10. 监控仪表盘示例

### 推荐结构

```
┌─────────────────────────────────────────────┐
│ 实时  │ 在线用户: 23  今日 PV: 1,247 今日 UV: 856 │
├─────────────────────────────────────────────┤
│ 错误  │ 24h 内错误: 0  7 天错误率: 0.02%         │
├─────────────────────────────────────────────┤
│ 性能  │ LCP: 1.2s  FCP: 0.8s  CLS: 0.05          │
├─────────────────────────────────────────────┤
│ SEO   │ 收录页面: 7/7  关键词: 23                │
├─────────────────────────────────────────────┤
│ 收入  │ 试用注册: 0  付费用户: 0  月收入: ¥0     │
└─────────────────────────────────────────────┘
```

### 推荐工具

- **Grafana + Prometheus**（自托管，免费）
- **Datadog**（云托管，$15/月起）
- **New Relic**（云托管，免费 100GB/月）
- **Sentry Dashboards**（错误追踪，免费）

---

## 📞 紧急联系

| 角色 | 联系 |
|---|---|
| 主要开发者 | hi@example.com |
| GitHub Issues | https://github.com/username/rh-intel/issues |
| Status Page | status.rh.example.com |

---

*监控方案根据实际数据每季度 review 一次。*
