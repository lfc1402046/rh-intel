# RH Intel 测试套件

零依赖 Node.js 测试。覆盖核心业务逻辑（v31 / v27 / v28 / v29 集成）。

## 运行

```bash
node test/run-all.js
```

## 测试套件（4 个 / 59 个用例）

### test-migrate-v1-to-v3.js（v31 核心）
- 20 个测试覆盖 v0.1 → v3.0 字段映射
- 验证 dunbarTier 自动推断（5/4/3-2/1/0 边界）
- 验证 v3.0 字段已存在时不覆盖
- 验证空值、null、缺失字段处理

### test-decay-score.js（v16 设计的健康度算法）
- 15 个测试覆盖 3 维度加权评分
- 验证边界（frequency=7/8 降档）
- 验证 healthLevel 3 档（good/warn/bad）
- 验证综合场景（完美/长期失联/中等）

### test-ai-prompt.js（v18/v28/v29 集成）
- 10 个测试覆盖 prompt 模板 + crisis 检测
- 验证 safeTopics / doNotMention 注入
- 验证 4 类危机信号（自伤/家暴/心理/决策）

### test-edge-cases.js
- 14 个测试覆盖边界情况
- 空对象、极大值、负值、emoji、超长字符串等

## 集成到 CI

`.github/workflows/test.yml` 在每次 push / PR 时自动运行。

## 设计原则

1. **零依赖** —— 只用 Node.js 内置 API，无需 `npm install`
2. **自写 assertion** —— 不依赖 expect/chai/jest
3. **可移植** —— 测试函数从源文件复制，独立运行
4. **覆盖核心** —— 关注算法和数据迁移，不测试 UI

## 添加新测试

```bash
# 创建 test/test-<feature>.js
# 在文件内使用 test() 注册用例
# 跑全部：node test/run-all.js
```

测试文件必须以 `test-` 开头、`.js` 结尾才会被自动加载。
