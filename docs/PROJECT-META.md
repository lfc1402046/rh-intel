# 项目元数据 · PROJECT-META

> 记录项目关键元信息，防止路径混乱

---

## 📍 权威路径定义（2026-10-12 锁定）

| 项 | 值 |
|---|---|
| **项目根目录（权威）** | `D:\桌面文件\workbuddy\人际关系图谱\` |
| **Git Bash 形式** | `/d/桌面文件/workbuddy/人际关系图谱` |
| **Node.js 形式** | `D:/桌面文件/workbuddy/人际关系图谱/` |
| **PowerShell 形式** | `D:\桌面文件\workbuddy\人际关系图谱\` |

**绝不再使用**：`D:\桌面文件\Program\Workbuddy\`（旧位置，已清空）

## 📜 路径变更历史

| 日期 | 事件 |
|---|---|
| 2026-10-09 ~ 10-12 上午 | 文件位于 `D:\桌面文件\Program\Workbuddy\人际关系图谱\`（workbuddy 升级后被系统搬到此处）|
| 2026-10-12 16:08 | 用户要求改回原位置 `D:\桌面文件\workbuddy\人际关系图谱\` |
| 2026-10-12 16:08+ | 权威路径锁定为 workbuddy，Program/Workbuddy 已清空 |

## 🔄 PWD 行为（Git Bash）

在 Git Bash 中，**所有 path 会自动解析**：
- 写 `D:/桌面文件/Program/Workbuddy/人际关系图谱/...` → 实际访问 `D:\桌面文件\workbuddy\人际关系图谱\...`（因为 PWD 已经是 workbuddy）
- 写 `D:/桌面文件/workbuddy/人际关系图谱/...` → 直接访问 workbuddy

**但为避免混淆，所有未来命令必须显式使用 workbuddy 路径。**

## 📋 项目关键信息

| 项 | 值 |
|---|---|
| 项目名 | RH Intel · 人际关系 · 情报中心 |
| 当前版本 | v0.1.0 (v34 已实施 Round 2 升级) |
| GitHub 仓库 | https://github.com/lfc1402046/rh-intel |
| 部署平台 | EdgeOne Pages（中国站）|
| 当前 commit | 待推送 e8a3092（fix try-catch 容错）|
| 测试套件 | 68/68 通过（零依赖）|

## 📁 关键目录

```
D:/桌面文件/workbuddy/人际关系图谱/
├── site/          ← 主站（部署到 EdgeOne）
├── tool/          ← 工具本体（单文件 65KB）
├── docs/          ← 架构/运营文档
├── test/          ← 测试套件
├── index.html     ← 工具本体（site/ 下的副本）
└── .workbuddy/
    └── memory/
        └── 2026-10-09.md   ← 项目级 memory
```

## ⚠️ 注意事项

1. **不要在命令中再出现 `D:\桌面文件\Program\Workbuddy\`**
2. **所有文件操作必须用 `D:/桌面文件/workbuddy/人际关系图谱/`**
3. **如果用户提到 Program/Workbuddy 应视为历史错误路径**
4. **如果发现 PWD 不在 workbuddy，立即报告用户**

---

*最后更新：2026-10-12 · v35 锁定*
