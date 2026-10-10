# 真实截图替换指南 · REPLACE-SCREENSHOTS.md

> 5 个 SVG 占位图（screenshot-1 ~ 5）的真实截图替换方法
> 预计工时：1-2 小时（截图）+ 30 分钟（处理 + 上传）

---

## 0. 当前状态

| 文件 | 大小 | 状态 |
|---|---|---|
| `site/assets/images/screenshot-1.svg` | 7.7 KB | ⚠️ 模拟"情报看板" |
| `site/assets/images/screenshot-2.svg` | 6.5 KB | ⚠️ 模拟"关系图谱" |
| `site/assets/images/screenshot-3.svg` | 12.6 KB | ⚠️ 模拟"互动时间线" |
| `site/assets/images/screenshot-4.svg` | 6.8 KB | ⚠️ 模拟"AI 话术建议" |
| `site/assets/images/screenshot-5.svg` | 8.9 KB | ⚠️ 模拟"关键信息" |

**当前是 SVG 模拟版（手绘 UI 元素）**，不是真实工具截图。
**建议**：用工具本体实际跑一遍，截图后替换。

---

## 1. 截图准备（前置条件）

### 1.1 准备工具本体数据

1. 打开 `index.html`（工具本体）
2. 点击右上角 **📥 导入** 按钮
3. 选择 `tool/sample-data-v1-compatible.json`（18 个联系人）
4. 确认导入成功提示
5. 工具会自动渲染所有数据

### 1.2 工具的浏览器要求

- **推荐**：Chrome 90+ / Edge 90+（最佳 SVG + 字体渲染）
- **次选**：Firefox / Safari
- 视窗大小：**1280 × 800**（标准）或 **1920 × 1080**（高清）
- 设备像素比：1x（避免 Retina 模糊）

### 1.3 截图工具

- **macOS**：`Cmd + Shift + 4`（选区截图）
- **Windows**：`Win + Shift + S`（Snip & Sketch）
- **第三方**：CleanShot X / ShareX / Monosnap
- **浏览器 DevTools**：`F12` → `Cmd+Shift+P` → "Capture full size screenshot"（推荐，得到最干净 PNG）

---

## 2. 5 张截图的具体截法

### 📸 screenshot-1：情报看板

**进入路径**：默认首页 → 看板 Tab

**截图前准备**：
- 确保所有模块已加载（绿色/黄色/红色卡片都可见）
- 关闭"导入"等弹窗
- 滚动到顶部

**截取区域**：`1280 × 720`（仅看板部分，不要滚动条）
**文件命名**：`screenshot-1.png`
**上传位置**：`site/assets/images/screenshot-1.png`（替换 SVG）

### 📸 screenshot-2：关系图谱

**进入路径**：图谱 Tab

**截图前准备**：
- 等待 0.5s 让 Canvas 完成渲染
- 节点应显示圆形 + 边线
- 不要拖拽节点（保持默认布局）

**截取区域**：`1280 × 720`（图谱区）
**文件命名**：`screenshot-2.png`
**上传位置**：`site/assets/images/screenshot-2.png`

### 📸 screenshot-3：互动时间线

**进入路径**：时间线 Tab

**截图前准备**：
- 看到时间轴 + 雷达图 + 列表
- 时间线区域有明显的事件条目

**截取区域**：`1280 × 720`（包含热力图 + 雷达 + 列表）
**文件命名**：`screenshot-3.png`
**上传位置**：`site/assets/images/screenshot-3.png`

### 📸 screenshot-4：AI 话术建议

**进入路径**：AI 增强 → 话术生成

**截图前准备**：
- 必须先配置 LLM API key（OpenAI / Claude / DeepSeek）
- 触发一次 AI 生成
- 截图 3 版本的开场白 + 预期反应

**截取区域**：`1280 × 720`（含 3 版本开场白）
**文件命名**：`screenshot-4.png`
**上传位置**：`site/assets/images/screenshot-4.png`

### 📸 screenshot-5：关键信息

**进入路径**：关键信息 Tab

**截图前准备**：
- 看到重要日期倒计时
- 待办列表有 3-5 项
- 偏好记录可见

**截取区域**：`1280 × 720`（含日期 + 待办 + 偏好）
**文件命名**：`screenshot-5.png`
**上传位置**：`site/assets/images/screenshot-5.png`

---

## 3. 截图后处理（推荐但非必需）

### 3.1 优化（推荐用 macOS Preview / Windows Photos / Figma）

1. **裁剪**：精确到内容区域（去白边）
2. **阴影**：轻微的内阴影（让"截屏"感消失）
3. **圆角**：8-12px（与网站风格统一）
4. **边框**：1px `rgba(0,0,0,0.06)` 阴影
5. **导出**：PNG 格式，1280×720 或 1920×1080

### 3.2 文件压缩（减小体积）

```bash
# macOS (ImageOptim / Squoosh.app)
# 或在线工具 https://squoosh.app

# CLI (ImageMagick)
convert screenshot-1.png -strip -quality 85 -resize 1280x screenshot-1.jpg
```

**目标**：单张 < 200KB（5 张总 < 1MB）

---

## 4. 替换 SVG 文件

### 4.1 文件命名

保持原文件名，只改后缀：

| 旧（SVG） | 新（PNG） |
|---|---|
| `screenshot-1.svg` | `screenshot-1.png` |
| `screenshot-2.svg` | `screenshot-2.png` |
| `screenshot-3.svg` | `screenshot-3.png` |
| `screenshot-4.svg` | `screenshot-4.png` |
| `screenshot-5.svg` | `screenshot-5.png` |

### 4.2 路径位置

```
site/assets/images/
├── screenshot-1.png  ← 真实截图
├── screenshot-2.png
├── screenshot-3.png
├── screenshot-4.png
├── screenshot-5.png
├── screenshot-1.svg  ← 删除（或保留作为备份）
...
```

### 4.3 删除原 SVG

```bash
cd site/assets/images/
rm screenshot-*.svg
```

### 4.4 验证（不需要改 HTML）

`index.html` 引用方式：
```html
<img src="assets/images/screenshot-1.svg" ...>
```

→ 改为 PNG 后，**浏览器会根据扩展名自动选择**。但建议**显式修改 HTML 引用**（更明确）：

```html
<!-- 改前 -->
<img src="assets/images/screenshot-1.svg" alt="...">

<!-- 改后 -->
<img src="assets/images/screenshot-1.png" alt="...">
```

可以用批量替换：

```bash
# 在 site/ 目录下执行
find . -name "*.html" -exec sed -i 's/screenshot-\([0-9]\)\.svg/screenshot-\1.png/g' {} \;
```

---

## 5. 重新部署

```bash
# 提交到 Git
git add site/assets/images/
git commit -m "feat: replace SVG mockups with real tool screenshots"
git push origin main

# 重新部署到 EdgeOne Pages
# (通过 MCP deploy_folder 工具)
```

---

## 6. 截图质量检查清单

| 检查项 | 通过标准 |
|---|---|
| ✓ 截图清晰，无模糊 | 像素级无锯齿 |
| ✓ 内容真实 | 真实数据，非示例文本 |
| ✓ 包含真实功能点 | 工具各模块的 UI 都可见 |
| ✓ 视觉一致 | 与网站 Apple 风格相符（浅色 + 圆角 + 留白）|
| ✓ 隐私脱敏 | 不包含真实姓名 / 电话 / 邮箱（如演示用） |
| ✓ 文件大小 | 单张 < 200KB |

---

## 7. 替代方案：保留 SVG 占位

如果短期内没有真实截图，可以：

### 7.1 在 carousel 上添加"DEMO"水印

修改 `index.html` carousel 部分：

```html
<div class="carousel">
  <span class="demo-badge">DEMO 模拟 · 待替换</span>
  <div class="carousel-track">
    ...
  </div>
</div>
```

CSS：
```css
.demo-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(232, 137, 137, 0.9);
  color: white;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  z-index: 10;
}
```

### 7.2 改进 SVG 本身

把现有 SVG 的"模拟感"做得更精致（虽然仍非真实）：

- 添加光影渐变
- 模拟 hover 状态
- 显示真实数据格式
- 加入中文界面文字（目前是英文占位）

---

## 8. 立即操作（用户能做的）

1. **下载 sample-data-v1-compatible.json**（已就绪）
2. **打开工具本体**（index.html）
3. **导入数据**（点击 📥 按钮）
4. **浏览各 Tab**（看板、图谱、时间线等）
5. **截图**（按上面的 5 个步骤）
6. **替换文件**（按步骤 4）
7. **推送 + 部署**

---

*文档结束。截图替换是让产品从"看起来专业"变成"实际专业"的关键一步。*
