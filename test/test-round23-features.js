// Round 2-3 防回归：洞察 Tab + 时间线 2.0 + Apple 风格关键改动都必须在 HTML 中存在
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const file = path.join(root, 'site', 'index.html');
const html = fs.readFileSync(file, 'utf8');

function check(name, predicate, message) {
  test(name, () => { assert(predicate, message); });
}

// === 1. 洞察 Tab 入口 ===
check('顶部第三个 Tab 🧠 洞察 存在', /data-tab="insight"[^>]*>.*?🧠\s*洞察/.test(html), '缺失 data-tab="insight"');
check('#insightView 容器存在', /id="insightView"/.test(html), '缺失 #insightView');
check('#insightContent 容器存在', /id="insightContent"/.test(html), '缺失 #insightContent');
check('renderInsight 函数已定义', /function\s+renderInsight\s*\(/.test(html), '缺失 renderInsight()');
check('healthCard helper 已定义', /function\s+healthCard\s*\(/.test(html), '缺失 healthCard()');

// === 2. 详情面板 v3 新模块 ===
check('详情面板有"关系定位"区', /关系定位/.test(html), '缺失关系定位区');
check('详情面板有"邓巴圈层"徽章样式', /\.dunbar-badge\s*\{/.test(html), '缺失 .dunbar-badge');
check('详情面板有"重要日期"区', /重要日期/.test(html), '缺失重要日期区');
check('详情面板有"待办"区', /todo-list/.test(html), '缺失 todo-list');
check('toggleTodoHandler 已定义', /function\s+toggleTodoHandler\s*\(/.test(html), '缺失 toggleTodoHandler');
check('deleteTodoHandler 已定义', /function\s+deleteTodoHandler\s*\(/.test(html), '缺失 deleteTodoHandler');
check('倒计时逻辑（diffDays）存在', /diffDays/.test(html), '缺失 diffDays 倒计时');
check('关键日期徽章样式存在', /\.keydate-badge\s*\{/.test(html), '缺失 .keydate-badge');

// === 3. 时间线 2.0 ===
check('时间线周期切换按钮样式存在', /\.tl-range-btn\s*\{/.test(html), '缺失 .tl-range-btn');
check('方式分色逻辑存在', /methodColors/.test(html), '缺失 methodColors');
check('月度聚合逻辑存在', /monthBars|monthKeys/.test(html), '缺失月度聚合');
check('Round 2.0 标识', /Round 2\.0/.test(html), '缺失 Round 2.0 注释');

// === 4. Apple 风格统一 ===
check('Apple 风字体栈', /-apple-system, BlinkMacSystemFont/.test(html), '缺失 Apple 字体栈');
check('Apple 缓动函数', /ease-standard/.test(html), '缺失 ease-standard');
check('大圆角 token --radius-xl', /--radius-xl:\s*18px/.test(html), '缺失 --radius-xl: 18px');

// === 5. 体积 + 性能 ===
check('单文件仍 < 200KB（自包含）', fs.statSync(file).size < 200 * 1024, '单文件过大，可能引入了外部依赖');
