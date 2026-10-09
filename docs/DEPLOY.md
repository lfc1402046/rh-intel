# 完整部署指南 · DEPLOY.md

> 7 种部署方式 × 完整步骤 × 故障排查
> 适用 v0.1.0 MVP 版本（纯静态 + 单文件工具）

---

## 📋 部署前检查清单

| 项 | 检查方式 |
|---|---|
| ✅ 7 个 HTML 页面可访问 | `site/` 目录下 |
| ✅ tool/index.html 存在 | 从根 `index.html` 复制 |
| ✅ CSS / JS 资源完整 | `site/assets/` |
| ✅ sitemap.xml + robots.txt | SEO 必需 |
| ✅ .github/workflows/deploy.yml | 自动部署 |
| ⚠️ Formspree form ID | `site/contact.html` 替换 `YOUR_FORM_ID` |
| ⚠️ GitHub 用户名 | 替换所有 `lfc1402046` 占位符 |

---

## 方式 1 · GitHub Pages（推荐 · 已配置）

**优点**：免费、零运维、自动 HTTPS、与 GitHub 仓库天然集成
**限制**：纯静态（无后端）；国内访问较慢（可加 CDN 缓解）
**耗时**：10 分钟

### 步骤

#### 1.1 创建 GitHub 仓库

```bash
# 在 GitHub 网站创建仓库
# 仓库名: rh-intel
# 可见性: Public（Private 也支持但需要 GitHub Pro 才能用 Pages）
# 不要勾选 "Add a README file"（我们已有）
# 不要选择 .gitignore 模板
```

#### 1.2 推送代码

```bash
# 在项目根目录（D:/桌面文件/workbuddy/人际关系图谱/）
cd /d/桌面文件/workbuddy/人际关系图谱

# 初始化 Git（如果还没有）
git init

# 添加远程仓库（替换 lfc1402046 为你的 GitHub 用户名）
git remote add origin https://github.com/lfc1402046/rh-intel.git

# 配置提交身份（如果还没有）
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 首次提交
git add .
git commit -m "feat: MVP v0.1.0 - Apple style + 7 pages"

# 推送到 main 分支
git branch -M main
git push -u origin main
```

#### 1.3 启用 GitHub Pages

1. 进入仓库页面 → **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**（不是 main 分支）
3. 等待 30 秒，Actions 工作流会自动运行
4. 访问 `https://lfc1402046.github.io/rh-intel/` 验证

#### 1.4 （可选）配置自定义域名

**DNS 配置**（在域名服务商）：

| 类型 | 主机记录 | 记录值 |
|---|---|---|
| CNAME | @ 或 www | lfc1402046.github.io |

或在子域名：

| 类型 | 主机记录 | 记录值 |
|---|---|---|
| CNAME | rh | lfc1402046.github.io |

**仓库配置**：

1. 在仓库根目录创建 `CNAME` 文件（无后缀），内容：
   ```
   rh.example.com
   ```
2. Settings → Pages → **Custom domain** 输入域名 → Save
3. 勾选 **Enforce HTTPS**（DNS 生效后）

#### 1.5 故障排查

| 问题 | 原因 | 解决 |
|---|---|---|
| 部署失败"pages build and deployment" | 路径错误 | 确认 Actions 中 `path: './site'` |
| 404 Page Not Found | Source 选错 | 改为 "GitHub Actions" |
| CSS 404 | 绝对路径 | 改为相对路径 `assets/css/main.css` |
| 自定义域名 404 | DNS 未生效 | 等 24 小时；`dig rh.example.com` 验证 |
| 邮箱未收到 Formspree | 未验证 | 检查 spam 邮箱；登入 Formspree dashboard 查发件状态 |

---

## 方式 2 · Vercel（推荐海外 · 自动 CI/CD）

**优点**：全球 CDN、自动 HTTPS、Edge Functions（支持未来 BFF）、Git 集成
**限制**：海外节点，国内访问可能慢
**耗时**：5 分钟

### 步骤

#### 2.1 导入项目

1. 访问 https://vercel.com/new
2. 用 GitHub 账号登录
3. 选择 `rh-intel` 仓库 → Import

#### 2.2 配置构建设置

| 项 | 值 |
|---|---|
| Project Name | rh-intel |
| Framework Preset | Other |
| Root Directory | `./site` |
| Build Command | 留空（静态无需构建）|
| Output Directory | 留空（直接用 Root Directory）|

#### 2.3 部署

点击 **Deploy** → 等待 30 秒 → 自动分配域名 `rh-intel-xxx.vercel.app`

#### 2.4 （可选）自定义域名

1. Settings → Domains → Add
2. 输入域名（如 `rh.example.com`）
3. 按提示配置 DNS（CNAME 指向 `cname.vercel-dns.com`）

#### 2.5 自动部署

每次 `git push` 到 main → Vercel 自动构建 → 自动部署
预览部署：每个 PR 自动分配独立预览 URL

---

## 方式 3 · Netlify（推荐 · 拖拽部署）

**优点**：拖拽部署（无需 Git）、免费、Formspree 集成友好
**限制**：海外节点
**耗时**：3 分钟（最快）

### 步骤 3.1：拖拽部署

1. 访问 https://app.netlify.com/drop
2. **直接拖拽 `site/` 文件夹**到页面上
3. 30 秒后自动分配 `xxx.netlify.app` 域名

### 步骤 3.2：Git 集成（推荐）

1. 登录 Netlify → Add new site → Import an existing project
2. 选择 GitHub → 选择 `rh-intel` 仓库
3. 配置：
   - Base directory: `site`
   - Build command: 留空
   - Publish directory: `site`（或留空）
4. Deploy site

### 步骤 3.3：自定义域名

Domain settings → Add custom domain → 按提示配置

### 步骤 3.4：环境变量（未来 BFF 用）

Site settings → Environment variables → 添加

---

## 方式 4 · 腾讯云 EdgeOne Pages（推荐国内）

**优点**：国内访问极快、Edge Functions（支持 BFF）、自动 CDN
**限制**：需要腾讯云账号（实名认证）
**耗时**：10 分钟

### 步骤 4.1：创建项目

1. 访问 https://edgeone.ai/pages
2. 用腾讯云账号登录（如无则注册并实名）
3. 点击 **创建项目** → 选择 **静态站点**

### 步骤 4.2：导入仓库

1. 授权 GitHub 账号
2. 选择 `rh-intel` 仓库
3. 配置：
   - 项目名称：rh-intel
   - 框架：Other
   - 构建命令：留空
   - 输出目录：`site`
4. 点击 **开始部署**

### 步骤 4.3：访问

部署完成自动分配 `rh-intel.edgeone.app` 域名

### 步骤 4.4：自定义域名

1. 域名管理 → 添加域名
2. 按提示配置 DNS（CNAME 指向 `xxx.edgeone.app`）
3. 自动签发 SSL 证书

### 步骤 4.5：（未来）启用 Edge Functions

v1.5+ 需要 BFF 时：
1. 创建 `/functions` 目录
2. 写 Node.js 函数
3. 通过 `https://rh-intel.edgeone.app/api/xxx` 调用

---

## 方式 5 · 腾讯云 CloudBase 静态托管

**优点**：与 CloudBase 其他能力集成好（数据库、云函数）
**限制**：需实名；国内访问快
**耗时**：15 分钟

### 步骤

1. 访问 https://console.cloud.tencent.com/tcb
2. 创建环境（选择免费配额）
3. 进入环境 → 静态网站托管 → 上传文件
4. 或配置 CDN：从 GitHub 自动同步
5. 访问：`rh-intel-xxx.tcloudbaseapp.com`

---

## 方式 6 · Cloudflare Pages

**优点**：免费、全球 CDN、自动 HTTPS
**限制**：海外节点（但 Cloudflare 在国内有合作节点）
**耗时**：5 分钟

### 步骤

1. 访问 https://dash.cloudflare.com → Pages
2. Connect to Git → 选择 `rh-intel`
3. 配置：
   - Build command: 留空
   - Build output directory: `site`
4. Save and Deploy

---

## 方式 7 · 自建服务器（Nginx + CVM）

**优点**：完全可控、可后端
**限制**：需购买服务器、备案、运维
**耗时**：1-2 小时

### 步骤 7.1：购买腾讯云 CVM

- 地域：建议上海/广州
- 配置：1 核 1GB 即可（轻量应用服务器更便宜）
- 系统：Ubuntu 22.04 LTS
- 带宽：按需（3Mbps 起步）
- **必须备案**（中国大陆服务器）

### 步骤 7.2：安装 Nginx

```bash
# SSH 连接到服务器
ssh root@your-server-ip

# 更新包管理器
apt update && apt upgrade -y

# 安装 Nginx
apt install -y nginx

# 启动并设置开机自启
systemctl start nginx
systemctl enable nginx
```

### 步骤 7.3：配置 Nginx

```bash
# 创建配置文件
cat > /etc/nginx/sites-available/rh-intel <<'EOF'
server {
    listen 80;
    server_name rh.example.com;  # 替换为你的域名

    root /var/www/rh-intel/site;
    index index.html;

    # 启用 gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # 静态资源缓存
    location ~* \.(css|js|png|jpg|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback（如需）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "no-referrer-when-downgrade";
}
EOF

# 启用配置
ln -s /etc/nginx/sites-available/rh-intel /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 步骤 7.4：部署代码

```bash
# 在本地
scp -r site/ root@your-server-ip:/var/www/rh-intel/

# 或用 Git（推荐）
# 在服务器上：
cd /var/www/rh-intel
git clone https://github.com/lfc1402046/rh-intel.git .
```

### 步骤 7.5：SSL 证书

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 自动配置 HTTPS
certbot --nginx -d rh.example.com

# 自动续期
certbot renew --dry-run
```

### 步骤 7.6：CI/CD（可选）

```bash
# 在 GitHub repo 添加 deploy key
# 在服务器创建 .github/workflows/deploy.yml 的 SSH 版本
# 或用 Drone / Jenkins / GitLab CI
```

---

## 🔍 部署方式对比

| 维度 | GH Pages | Vercel | Netlify | EdgeOne | CloudBase | 自建 |
|---|---|---|---|---|---|---|
| **费用** | 免费 | 免费 | 免费 | 免费 | 免费/低价 | ¥20+/月 |
| **国内速度** | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **海外速度** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **配置难度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Edge Functions** | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **自动 HTTPS** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅（需配置） |
| **Git 集成** | ✅ | ✅ | ✅ | ✅ | 部分 | 自配 |
| **冷启动** | < 1s | < 1s | < 1s | < 1s | < 1s | 依赖配置 |
| **推荐度** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**推荐组合**：
- **纯海外用户** → Vercel
- **国内为主 + 海外兼顾** → EdgeOne Pages
- **演示/原型快速验证** → Netlify 拖拽
- **完整开源项目** → GitHub Pages

---

## 🛠️ 部署后配置清单

### 立即必做

- [ ] 测试 7 个页面均能访问
- [ ] 测试工具下载链接（`tool/index.html`）
- [ ] 测试联系表单（替换 Formspree form ID 后测试提交）
- [ ] Google Search Console 提交 sitemap
- [ ] 浏览器控制台无错误

### 24 小时内

- [ ] 配置访问分析（GA / 百度统计 / Plausible）
- [ ] 配置错误监控（Sentry / Cloudflare 错误日志）
- [ ] 在社交媒体分享初始版本

### 1 周内

- [ ] 根据用户反馈迭代
- [ ] 准备 v0.2.0 更新

---

## 📞 遇到问题？

1. **查看部署文档**（本文档）
2. **搜索 GitHub Issues**：https://github.com/lfc1402046/rh-intel/issues
3. **新建 Issue**：附上错误截图 + 部署方式 + 浏览器版本
4. **邮件联系**：hi@example.com
