# 「AI 主动维护关系系统」设计 v1.0

> 把 RH Intel 从"被动工具"升级为"主动 AI 助手"
> 基于已部署的 EdgeOne Pages + 已规划的 BFF 架构
> 解决"用户懒得用"的根本问题——让 AI 替用户做日常维护

---

## 0. 产品定位转变

| 维度 | 当前（v0.1.0 工具） | 目标（v1.1 AI 助手） |
|---|---|---|
| **角色** | 工具：用户主动使用 | 助手：AI 主动推送 |
| **触发** | 用户打开应用 | 定时 + 事件触发 |
| **数据流** | 用户 → 应用 → 用户 | 数据 → AI → 推送 → 用户 |
| **核心 KPI** | DAU / 留存 | 主动提醒采纳率 / 关系健康度 |
| **商业模式** | 免费 + 增值 | **AI 主动维护成为付费核心** |

**关键洞察**：用户最大的痛点不是"工具不好用"，而是"懒得用"。AI 主动维护 = 把"打开应用"变成"被动接收"。

---

## 1. 系统总览

### 1.1 三大自动化能力

| 能力 | 说明 | 用户价值 |
|---|---|---|
| **定时扫描** | 每天/每周自动扫描所有联系人状态 | 不用记"我该联系谁" |
| **智能分析** | AI 分析每段关系亲疏 / 风险 / 时机 | 不用判断"该不该联系" |
| **主动推送** | Web / 邮件 / 微信 多通道送达 | 不用打开 App |

### 1.2 4 类主动推送场景

```
┌────────────────────────────────────────┐
│  9:00  每日扫描结果                        │
│  ─────                                  │
│  · 张三 已 45 天未联系（强度 4★）         │
│  · 明天李四生日                           │
│  · 待办：发方案给王五 还有 1 天            │
│  · AI 洞察：王五最近情绪波动，建议主动关心   │
└────────────────────────────────────────┘
```

---

## 2. 核心功能模块

### 2.1 关系扫描引擎

#### 扫描频率

| 模式 | 频率 | 适用 |
|---|---|---|
| **每日** | 每天 9:00 | 关系网大（> 50 人） |
| **每周** | 每周一 9:00 | 关系网中等（10-50 人） |
| **自定义** | 用户自选时间 | 灵活控制 |

#### 扫描内容

| 项 | 扫描规则 | 输出 |
|---|---|---|
| **冷淡关系** | 强度 ≥ 3★ 且 ≥ N 天无互动 | 名单 + 建议话术 |
| **即将到来日期** | 重要日期距今 ≤ 7 天 | 名单 + 提醒文案 |
| **待办到期** | 待办 due date ≤ 3 天 | 名单 + 优先级 |
| **互动频率** | 过去 30 天互动次数 < 3 | 名单 + 趋势图 |
| **关系衰减** | 强度持续下降（过去 90 天） | 名单 + 风险评估 |
| **AI 洞察** | 调用 LLM 分析异常情况 | 自然语言建议 |

#### 算法：关系衰减评分

```javascript
function calculateDecayScore(contact) {
  const daysSince = daysBetween(contact.lastInteractionAt, now)
  const expectedInterval = contact.avgIntervalDays || 30
  const ratio = daysSince / expectedInterval
  
  if (ratio <= 0.5) return { level: 'fresh', score: 1.0, color: 'green' }
  if (ratio <= 1.0) return { level: 'normal', score: 0.8, color: 'yellow' }
  if (ratio <= 2.0) return { level: 'warm', score: 0.5, color: 'orange' }
  if (ratio <= 3.0) return { level: 'cold', score: 0.3, color: 'red' }
  return { level: 'frozen', score: 0.1, color: 'gray' }
}
```

### 2.2 AI 分析引擎

#### 5 类分析任务

| 任务 | 输入 | 输出 | 频率 |
|---|---|---|---|
| **冷淡原因分析** | 联系人档案 + 互动历史 | 自然语言解释 + 建议 | 每日 |
| **话术生成** | 联系人 + 场景（破冰/升级/修复） | 3 种版本开场白 | 按需 |
| **生日/纪念日文案** | 联系人 + 关系 | 个性化祝福 | 提前 3 天 |
| **关系健康度评分** | 全量数据 | 0-100 分 + 雷达图 | 每周 |
| **月度总结** | 当月所有互动 | 自然语言摘要 | 每月 1 号 |

#### Prompt 模板

```javascript
const PROMPTS = {
  coldAnalysis: `你是一位人际关系顾问。基于以下信息分析：
【联系人】${contact.name}
【关系强度】${contact.strength}★
【最后互动】${contact.lastInteractionAt}（${daysSince}天前）
【平均互动频率】每 ${contact.avgIntervalDays} 天
【最近 3 次互动摘要】
${recentInteractions}

请输出（200 字内）：
1. 关系衰减的可能原因
2. 重新激活的优先级（高/中/低）
3. 建议的开场白方向（不超过 20 字）`,
  
  birthdayMessage: `为 ${contact.name}（${contact.relationType}）写一段生日祝福。
要求：
- 个性化（参考备注：${contact.notes}）
- ${contact.strength}★ 关系深度的语气
- 不超过 50 字
- 可发微信的版本`,
  
  monthlySummary: `本月与以下人有过互动：
${monthlyInteractionsList}

输出：
1. 本月关系动态总览（3 句话）
2. 3 个值得庆祝的进展
3. 3 个需要关注的趋势`
}
```

### 2.3 提醒推送系统

#### 三种通道

| 通道 | 优点 | 缺点 | 实现难度 |
|---|---|---|---|
| **Web Push** | 0 成本、即时、用户不需要额外操作 | 用户必须打开过网站 | ⭐⭐ |
| **邮件** | 触达率高、可包含丰富内容 | 用户可能不看 | ⭐⭐ |
| **微信公众号** | 国内最触达、可群发 | 需要公众号资质（需 1-2 周） | ⭐⭐⭐⭐ |
| **微信小程序** | 比公众号灵活 | 需要开发 | ⭐⭐⭐⭐⭐ |
| **短信** | 100% 触达 | 成本高（0.05 元/条） | ⭐⭐⭐ |

**推荐组合**（MVP 阶段）：
- 主通道：**Web Push**（最简单 + 0 成本）
- 备选：邮件（用 Resend 免费额度）
- 高级：微信公众号（v1.2 之后）

#### 推送时机

| 场景 | 触发条件 | 内容长度 |
|---|---|---|
| 冷淡提醒 | 每天 9:00 扫描发现 | 标题 + 1 行 |
| 生日提醒 | 提前 7 天 + 提前 1 天 | 标题 + 祝福语 |
| 待办提醒 | 到期前 3 天 / 1 天 / 当天 | 标题 + 任务 |
| AI 周报 | 每周一 9:00 | 完整周报（500 字） |
| AI 月报 | 每月 1 号 9:00 | 完整月报（1500 字） |

#### 推送智能聚合

避免骚扰：同一类型 24h 内最多推送 1 次；总推送每日 ≤ 5 条；用户可一键"静默 24h"。

### 2.4 用户配置中心

#### 设置项

| 项 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| 扫描频率 | 单选 | 每日 | 每日 / 每周 / 自定义 |
| 扫描时间 | 时间选择器 | 09:00 | 每天几点扫描 |
| Web Push | 开关 | 开启 | 浏览器通知 |
| 邮件推送 | 开关 | 关闭 | 邮件地址 |
| 微信公众号 | 开关 | 关闭 | 需绑定 |
| 静默时段 | 时间区间 | 22:00-08:00 | 不打扰 |
| 冷淡阈值 | 数字 | 30 天 | 超过 X 天提醒 |
| 生日提前 | 数字 | 7 天 | 提前 X 天提醒 |
| 排除名单 | 多选 | 空 | 哪些联系人不要提醒 |

---

## 3. 系统架构

### 3.1 数据流

```
┌─────────────┐    1. 触发扫描    ┌──────────────┐
│ 定时 Cron   │ ───────────────→ │  Edge Func   │
│ (EdgeOne)   │                  │  /api/scan   │
└─────────────┘                  └──────┬───────┘
                                        │
                                        │ 2. 拉取数据
                                        ▼
                                ┌──────────────┐
                                │  NoSQL DB    │
                                │  (CloudBase) │
                                └──────┬───────┘
                                        │
                                        │ 3. 调用 AI
                                        ▼
                                ┌──────────────┐
                                │  LLM API     │
                                │  (用户key)   │
                                └──────┬───────┘
                                        │
                                        │ 4. 生成提醒
                                        ▼
                                ┌──────────────┐
                                │  Push Queue  │
                                └──────┬───────┘
                                        │
                       ┌────────────────┼────────────────┐
                       ▼                ▼                ▼
                ┌──────────┐      ┌──────────┐      ┌──────────┐
                │ Web Push │      │  Email   │      │  WeChat  │
                └──────────┘      └──────────┘      └──────────┘
```

### 3.2 BFF API 设计

```
POST   /api/scan/trigger          手动触发扫描
GET    /api/scan/schedule         获取扫描计划
PUT    /api/scan/schedule         更新扫描计划
GET    /api/alerts                获取提醒列表（支持 ?type=&since=）
PUT    /api/alerts/:id            标记已读/操作
POST   /api/alerts/dismiss-all    全部已读
POST   /api/alerts/snooze         推迟 24h
GET    /api/settings/notifications 推送设置
PUT    /api/settings/notifications 推送设置
POST   /api/push/subscribe        订阅 Web Push
POST   /api/push/unsubscribe      取消订阅
```

### 3.3 数据结构

#### 扫描结果

```javascript
{
  scanId: 'uuid',
  userId: 'user_id',
  scanTime: '2026-10-09T09:00:00Z',
  
  results: {
    coldRelations: [
      {
        contactId: 'uuid',
        name: '张三',
        daysSince: 45,
        strength: 4,
        decayScore: 0.3,
        suggestedAction: '建议主动问候',
        aiInsight: '他最近可能忙于新项目'
      }
    ],
    upcomingDates: [
      {
        contactId: 'uuid',
        name: '李四',
        type: 'birthday',
        date: '2026-10-15',
        daysUntil: 6
      }
    ],
    expiringTodos: [
      {
        todoId: 'uuid',
        content: '发方案给王五',
        dueDate: '2026-10-10',
        daysUntil: 1,
        priority: 'high'
      }
    ],
    aiInsights: [
      {
        contactId: 'uuid',
        insight: '王五最近互动质量下降，可能需要深度交流',
        confidence: 0.85,
        suggestedScript: '...'
      }
    ]
  }
}
```

#### 提醒

```javascript
{
  id: 'alert_uuid',
  type: 'cold' | 'birthday' | 'todo' | 'insight' | 'weekly' | 'monthly',
  contactId: 'uuid',  // 可选
  title: '张三 已 45 天未联系',
  content: '他最近忙新项目，建议发一条问候。AI 推荐开场白：...',
  priority: 'high' | 'medium' | 'low',
  status: 'unread' | 'read' | 'snoozed' | 'dismissed',
  actions: [
    { type: 'view_contact', label: '查看档案' },
    { type: 'send_message', label: '发消息' },
    { type: 'snooze', label: '稍后提醒' },
    { type: 'dismiss', label: '知道了' }
  ],
  createdAt: '2026-10-09T09:00:00Z',
  expiresAt: '2026-10-10T09:00:00Z'
}
```

#### 用户配置

```javascript
{
  userId: 'user_id',
  scanSchedule: {
    frequency: 'daily',  // 'daily' | 'weekly' | 'custom'
    time: '09:00',       // HH:MM
    dayOfWeek: 1,        // 仅 weekly 时
    timezone: 'Asia/Shanghai',
    enabled: true
  },
  push: {
    web: {
      enabled: true,
      subscription: { /* Web Push 订阅对象 */ }
    },
    email: {
      enabled: false,
      address: ''
    },
    wechat: {
      enabled: false,
      openId: ''
    }
  },
  preferences: {
    coldThresholdDays: 30,
    birthdayReminderDays: 7,
    quietHours: { start: '22:00', end: '08:00' },
    excludedContactIds: []
  },
  ai: {
    enabled: true,
    userApiKey: 'sk-...',  // 用户自带 key
    model: 'gpt-4o-mini',
    temperature: 0.7
  }
}
```

---

## 4. UI 设计

### 4.1 新增页面

#### `/alerts` 提醒中心

```
┌────────────────────────────────────────┐
│ 🔔 提醒中心          [全部已读] [设置]   │
├────────────────────────────────────────┤
│                                        │
│ 今天 · 9:00 扫描结果                    │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ ❄️ 张三 已 45 天未联系              │   │
│ │ 强度 4★ · 建议主动问候              │   │
│ │ "他最近忙新项目..."                │   │
│ │ [查看档案] [发消息] [稍后] [×]     │   │
│ └──────────────────────────────────┘   │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ 🎂 李四 6 天后生日                  │   │
│ │ 12-15 · 周日                        │   │
│ │ [AI 写祝福] [加入提醒] [×]         │   │
│ └──────────────────────────────────┘   │
│                                        │
│ 历史（折叠）                            │
└────────────────────────────────────────┘
```

#### `/ai-settings` AI 配置

```
┌────────────────────────────────────────┐
│ ⚙️ AI 主动维护设置                       │
├────────────────────────────────────────┤
│                                        │
│ 扫描频率                                │
│ ◉ 每日  ◯ 每周  ◯ 自定义                │
│ 扫描时间 [09:00]                        │
│                                        │
│ 推送通道                                │
│ ☑ Web Push（浏览器通知）                │
│ ☐ 邮件（推荐用 Resend）                 │
│ ☐ 微信公众号                            │
│                                        │
│ 静默时段 [22:00] - [08:00]              │
│                                        │
│ 提醒阈值                                │
│ 冷淡阈值 [30] 天                        │
│ 生日提前 [7] 天                         │
│                                        │
│ AI 增强（高级）                          │
│ ☑ 启用 AI 智能分析                      │
│ API Key [sk-...              ]          │
│ 模型 [gpt-4o-mini ▼]                    │
│                                        │
│ [保存设置]                              │
└────────────────────────────────────────┘
```

### 4.2 首页增强

#### Header 新增通知铃铛

```
┌────────────────────────────────────────┐
│ 🟣 RH Intel   ...   🔔 3   ⭐  Star   │  ← 通知红点
└────────────────────────────────────────┘
```

#### 看板新增"今日 AI 建议"卡片

```
┌────────────────────────────────────────┐
│ 🤖 今日 AI 建议                  [→]   │
├────────────────────────────────────────┤
│ ❄️ 3 个关系已冷淡 30+ 天               │
│ 🎂 2 个生日即将到来                     │
│ ⏰ 1 个待办明天到期                     │
│ 💡 1 个 AI 洞察                         │
│ [查看全部 7 条提醒]                     │
└────────────────────────────────────────┘
```

### 4.3 Service Worker（Web Push 核心）

```javascript
// sw.js
self.addEventListener('push', event => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.content,
      icon: '/assets/images/icon-192.png',
      badge: '/assets/images/badge-72.png',
      data: { url: data.url, alertId: data.id },
      actions: [
        { action: 'view', title: '查看' },
        { action: 'dismiss', title: '知道了' }
      ]
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'view') {
    clients.openWindow(event.notification.data.url);
  }
});
```

---

## 5. 技术实现

### 5.1 EdgeOne Pages Edge Functions

#### 定时任务（每天 9:00 触发扫描）

```javascript
// functions/cron/scan.js
export default async function handler(request) {
  // 1. 查询所有启用扫描的用户
  // 2. 对每个用户：调用 scan 逻辑
  // 3. 生成提醒
  // 4. 推送到对应通道
  return new Response('OK');
}
```

#### scan 配置

```json
{
  "triggers": [
    {
      "type": "cron",
      "schedule": "0 9 * * *",
      "function": "scan"
    }
  ]
}
```

### 5.2 AI 调用（用户自带 key）

```javascript
// functions/lib/ai.js
async function analyzeWithAI(contact, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '你是一位人际关系顾问。' },
        { role: 'user', content: buildPrompt(contact) }
      ],
      temperature: 0.7
    })
  });
  return response.json();
}
```

### 5.3 Web Push 实现

```javascript
// 客户端订阅
const registration = await navigator.serviceWorker.register('/sw.js');
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: VAPID_PUBLIC_KEY
});

// 发送到服务端
await fetch('/api/push/subscribe', {
  method: 'POST',
  body: JSON.stringify(subscription)
});

// 服务端推送
import webpush from 'web-push';
webpush.setVapidDetails(MAILTO, VAPID_PUBLIC, VAPID_PRIVATE);
await webpush.sendNotification(subscription, JSON.stringify(payload));
```

### 5.4 邮件推送（Resend）

```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'RH Intel <alerts@rh-intel.app>',
  to: user.email,
  subject: `🔔 ${alert.title}`,
  html: renderAlertEmail(alert)
});
```

---

## 6. 实施路线图

### 阶段 1（MVP）：Web Push 主动通知
**目标**：让用户每天 9:00 收到 1 条浏览器通知，含 1-3 个建议  
**工期**：1-2 周  
**交付**：
- Edge Functions：定时任务 + 扫描逻辑
- 前端：Service Worker + 订阅 UI
- 数据库：用户配置 + 提醒表
- 提醒中心页面 `/alerts`

### 阶段 2：邮件推送 + 优化
**目标**：增加邮件通道 + 智能聚合去重  
**工期**：3-5 天  
**交付**：
- Resend 集成
- 邮件模板
- 静默时段智能判断
- 推送去重

### 阶段 3：微信公众号（可选）
**目标**：国内最触达的通道  
**工期**：1-2 周（需公众号资质）  
**交付**：
- 公众号菜单
- 模板消息
- 用户绑定流程

### 阶段 4：AI 深度增强
**目标**：让 AI 真正理解每段关系  
**工期**：2-4 周  
**交付**：
- 5 类 prompt 模板
- 关系健康度评分
- 月度自动报告
- 学习用户反馈

### 阶段 5：智能体化
**目标**：从"通知"升级为"对话式助手"  
**工期**：4+ 周  
**交付**：
- 主动询问"要不要主动联系张三？"
- 接受用户决策后自动生成话术
- 一键复制 → 微信发送

---

## 7. 风险与缓解

| 风险 | 影响 | 缓解 |
|---|---|---|
| **推送骚扰** | 用户卸载 / 关闭 | 智能聚合 + 静默时段 + 频率上限（≤5/天）|
| **数据隐私** | 用户不信任 | 用户自带 key + 端到端加密 + 透明政策 |
| **AI 误判** | 建议不准 | 显示置信度 + 用户反馈学习 + 快速"知道了"按钮 |
| **成本失控** | LLM API 费用 | 客户端调用 + 每日 ≤ 3 次 AI 调用 |
| **定时任务失败** | 漏推送 | 多区域冗余 + 健康检查 + 失败重试 |
| **公众号资质** | 卡 1-2 周 | 先做 Web Push + 邮件，公众号是后续增强 |

---

## 8. 关键指标

### 8.1 推送采纳率

| 指标 | 目标 | 计算 |
|---|---|---|
| 推送送达率 | ≥ 95% | 推送成功 / 总推送 |
| 提醒查看率 | ≥ 60% | 用户点击查看 / 总推送 |
| 行动转化率 | ≥ 20% | 用户采纳建议（发消息/做任务）/ 总推送 |
| 关闭推送率 | ≤ 5% | 用户关闭推送 / 总用户 |

### 8.2 关系健康度

| 指标 | 目标 |
|---|---|
| 平均关系强度 | ≥ 3.5★ |
| 冷淡关系占比 | ≤ 20% |
| 30 天无互动重要关系 | ≤ 10% |

---

## 9. 关键决策

### 9.1 必做（MVP）
- ✅ 定时扫描（EdgeOne Cron）
- ✅ Web Push 推送
- ✅ 冷淡 / 生日 / 待办 3 类基础提醒
- ✅ 提醒中心页面

### 9.2 推荐（阶段 2）
- 📧 邮件推送
- 🤖 AI 话术生成
- ⏰ 静默时段
- 📊 周报

### 9.3 可选（阶段 3+）
- 📱 微信公众号
- 📲 微信小程序
- 💬 智能对话助手
- 🎯 学习用户偏好

---

*文档结束。下一步可深挖方向：*
- *Web Push 完整技术实现（含 VAPID 密钥生成）*
- *5 类 Prompt 模板详细设计*
- *AI 关系健康度评分算法*
- *推送智能聚合算法*
- *公众号模板消息接入流程*
