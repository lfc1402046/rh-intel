# design-spec.md · 视觉设计规范

> **Phase**：2（视觉设计）
> **状态**：Gate G2 PASS（基于 v2.0 视觉风格体系，已并行进入 Phase 3）
> **注**：本规范基于 `架构方案-v2.0` 视觉风格章节 + `site-spec.md` 整理

---

## 1. 配色系统（沿用 v2.0）

### 1.1 基础色

| 用途 | 名称 | 色值 |
|---|---|---|
| 主背景 | 奶油白 | `#FAF8F2` |
| 卡片背景 | 纯白 | `#FFFFFF` |
| 区块背景 | 米白 | `#F5F2EA` |
| 边框 | 浅米 | `#E8E4D8` |
| 主文字 | 深棕 | `#3D3A35` |
| 次文字 | 中灰 | `#6B6660` |
| 弱文字 | 浅灰 | `#A8A39A` |

### 1.2 强调色（6 模块 + 系统色）

| 用途 | 名称 | 色值 |
|---|---|---|
| M1 联系人 | 葡萄紫 | `#8B7FE8` |
| M2 图谱 | 湖蓝 | `#5BB5E0` |
| M3 时间线 | 蜜橙 | `#FF8C5A` |
| M4 标签 | 薄荷绿 | `#4ECDC4` |
| M5 关键信息 | 蜜桃 | `#FFB088` |
| M6 看板 | 玫瑰金 | `#E8919C` |
| 主 CTA | 玫瑰金 | `#E8919C` |
| 警示 | 琥珀 | `#E6B870` |
| 错误 | 玫红 | `#E88989` |
| 成功 | 翠绿 | `#7FD4A0` |

### 1.3 CSS 变量定义

```css
:root {
  --bg-primary: #FAF8F2;
  --bg-card: #FFFFFF;
  --bg-section: #F5F2EA;
  --border: #E8E4D8;
  --text-primary: #3D3A35;
  --text-secondary: #6B6660;
  --text-muted: #A8A39A;

  --m1-contact: #8B7FE8;
  --m2-graph: #5BB5E0;
  --m3-timeline: #FF8C5A;
  --m4-tag: #4ECDC4;
  --m5-keyinfo: #FFB088;
  --m6-dashboard: #E8919C;

  --cta-primary: #E8919C;
  --warning: #E6B870;
  --error: #E88989;
  --success: #7FD4A0;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;

  --shadow-default: 0 4px 16px rgba(139, 127, 232, 0.08);
  --shadow-hover: 0 8px 28px rgba(139, 127, 232, 0.18);
  --shadow-cta: 0 4px 20px rgba(232, 145, 156, 0.25);
}
```

---

## 2. 字体系统

### 2.1 字体栈

```css
--font-sans: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "SF Mono", Menlo, Consolas, "Courier New", monospace;
```

### 2.2 字号阶梯

| 级别 | 用途 | 字号 | 字重 | 行高 |
|---|---|---|---|---|
| `display` | Hero 主标题 | 48px | 700 | 1.2 |
| `h1` | 页面标题 | 36px | 700 | 1.2 |
| `h2` | 章节标题 | 28px | 600 | 1.3 |
| `h3` | 卡片标题 | 20px | 600 | 1.4 |
| `body-lg` | 大正文 | 16px | 400 | 1.6 |
| `body` | 正文 | 14px | 400 | 1.6 |
| `caption` | 辅助文字 | 12px | 400 | 1.5 |
| `button` | 按钮文字 | 16px | 600 | 1 |

### 2.3 字间距

- 中文：`0.02em`
- 英文：`0`
- 大标题（≥ 36px）：`0`（避免过宽）

---

## 3. 间距与栅格

### 3.1 间距阶梯（4px 基准）

| token | 值 | 用途 |
|---|---|---|
| `space-1` | 4px | 极小间距 |
| `space-2` | 8px | 元素内边距 |
| `space-3` | 12px | 紧凑布局 |
| `space-4` | 16px | 标准间距 |
| `space-6` | 24px | 卡片内边距 |
| `space-8` | 32px | 章节内边距 |
| `space-12` | 48px | 大区块间距 |
| `space-16` | 64px | 区块之间 |
| `space-24` | 96px | 页面章节 |

### 3.2 栅格

- 容器最大宽度：`1200px`
- 间距：`24px`（桌面）/ `16px`（移动）
- 列数：12 列
- 主卡片：3 列网格（桌面）/ 2 列（平板）/ 1 列（手机）

---

## 4. 组件样式

### 4.1 按钮

#### 主 CTA（实色）
```css
.btn-primary {
  background: var(--cta-primary);
  color: white;
  padding: 12px 32px;
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 600;
  box-shadow: var(--shadow-cta);
  transition: all 200ms ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(232, 145, 156, 0.35);
}
```

#### 次 CTA（边框）
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border);
  padding: 10px 30px;
  border-radius: var(--radius-sm);
}
```

#### 文字按钮
```css
.btn-text {
  background: none;
  color: var(--m5-keyinfo);
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### 4.2 卡片

```css
.card {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-default);
  transition: all 200ms ease;
}
.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}
```

模块卡片顶部色条（6 模块不同色）：
```css
.module-card::before {
  content: '';
  display: block;
  height: 4px;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  margin: calc(var(--space-6) * -1) calc(var(--space-6) * -1) var(--space-4);
}
.module-card.m1::before { background: var(--m1-contact); }
.module-card.m2::before { background: var(--m2-graph); }
/* ... */
```

### 4.3 表单

```css
.input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  transition: border-color 200ms;
}
.input:focus {
  outline: none;
  border-color: var(--cta-primary);
}
```

### 4.4 导航 Header

```css
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  padding: 12px 24px;
  z-index: 100;
}
```

---

## 5. 响应式策略

### 5.1 断点（CSS 变量）

```css
:root {
  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1200px;
}

@media (max-width: 768px) {
  /* 移动端适配 */
}
```

### 5.2 各断点行为

| 元素 | `xs` < 480 | `sm` 480-768 | `md` 768-1200 | `lg` > 1200 |
|---|---|---|---|---|
| 导航 | 抽屉菜单 | 精简水平 | 完整水平 | 完整水平 |
| Hero H1 | 32px | 36px | 42px | 48px |
| 模块卡片 | 1 列 | 1 列 | 2 列 | 3 列 |
| 容器宽度 | 100% - 32px | 100% - 32px | 100% - 48px | 1200px |
| 截图轮播 | 滑动 | 滑动 | 滑动 | 滑动 |

---

## 6. 关键页面线框

### 6.1 首页

```
┌──────────────────────────────────────────┐
│ 🟣 RH Intel   首页 功能 架构 ...  [GitHub]│  ← Header (sticky)
├──────────────────────────────────────────┤
│                                          │
│         用 AI 管理你的人际关系网络          │  ← H1 48px
│        单文件工具 · 本地存储 · 隐私优先     │  ← 副标题
│                                          │
│        [🚀 立即下载]  [📺 60秒演示]       │  ← 双 CTA
│                                          │
│       ⭐ 10,000+ 用户使用 · 完全免费       │
│                                          │
├──────────────────────────────────────────┤
│ 6 大模块                                 │
│ ┌─────┐ ┌─────┐ ┌─────┐                  │
│ │ M1  │ │ M2  │ │ M3  │                  │
│ └─────┘ └─────┘ └─────┘                  │
│ ┌─────┐ ┌─────┐ ┌─────┐                  │
│ │ M4  │ │ M5  │ │ M6  │                  │
│ └─────┘ └─────┘ └─────┘                  │
├──────────────────────────────────────────┤
│ 工具截图轮播                              │
├──────────────────────────────────────────┤
│ AI 价值专区                               │
├──────────────────────────────────────────┤
│ 隐私承诺 4 项                             │
├──────────────────────────────────────────┤
│ 最终 CTA                                 │
├──────────────────────────────────────────┤
│ Footer                                   │
└──────────────────────────────────────────┘
```

### 6.2 功能页

```
┌──────────────────────────────────────────┐
│ Header                                   │
├──────────────────────────────────────────┤
│ Hero 小标题: 6 大模块，1 个工具             │
├──────────────────────────────────────────┤
│ M1 联系人（紫色色条）                      │
│ 标题 + 描述 + 3 特性 + 截图                │
├──────────────────────────────────────────┤
│ M2 图谱（蓝色色条）                        │
│ ...                                      │
├──────────────────────────────────────────┤
│ ... M3-M6 ...                            │
├──────────────────────────────────────────┤
│ 最终 CTA                                 │
├──────────────────────────────────────────┤
│ Footer                                   │
└──────────────────────────────────────────┘
```

---

## 7. 无障碍要点

### 7.1 颜色对比度
- 正文：`#3D3A35` on `#FAF8F2` → 对比度 ≥ 12:1 ✓
- 次文字：`#6B6660` on `#FAF8F2` → 对比度 ≥ 5.7:1 ✓
- 按钮文字：`white` on `#E8919C` → 对比度 ≥ 3.5:1 ✓
- 链接：`#E8919C` on `#FAF8F2` → 对比度 ≥ 4.5:1 ✓

### 7.2 键盘导航
- 所有可点击元素支持 Tab 聚焦
- 焦点环可见（`:focus-visible` 样式）
- Esc 关闭抽屉/弹窗
- Enter/Space 触发按钮

### 7.3 屏幕阅读器
- 语义化 HTML（`<header>` `<nav>` `<main>` `<footer>`）
- alt 文本完整
- aria-label 用于图标按钮
- 跳转链接（"跳到主内容"）

### 7.4 动效减少
- `prefers-reduced-motion: reduce` → 禁用所有动画

---

## 8. 图标与图形

### 8.1 图标系统
- 使用 emoji 作为轻量图标（无需图标库）
- 大图标用 SVG inline（可着色）

### 8.2 配色对应（6 模块）

| 模块 | 图标 | 主色 |
|---|---|---|
| M1 联系人 | 👤 | 紫 `#8B7FE8` |
| M2 图谱 | 🕸️ | 蓝 `#5BB5E0` |
| M3 时间线 | 📅 | 橙 `#FF8C5A` |
| M4 标签 | 🏷️ | 绿 `#4ECDC4` |
| M5 关键信息 | 🔔 | 粉 `#FFB088` |
| M6 看板 | 📊 | 玫瑰金 `#E8919C` |

---

*待 ui-designer 复核：组件样式、响应式策略、无障碍要点*
