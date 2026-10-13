// Round 4 防回归：互动编辑 / 重要日期 banner / AI 建议 关键改动必须存在
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const file = path.join(root, 'site', 'index.html');
const html = fs.readFileSync(file, 'utf8');

function check(name, predicate, message) {
  test(name, () => { assert(predicate, message); });
}

// === 1. 互动编辑 ===
check('openEditInteraction 函数已定义', /function\s+openEditInteraction\s*\(/.test(html), '缺失 openEditInteraction()');
check('saveEditInteraction 函数已定义', /function\s+saveEditInteraction\s*\(/.test(html), '缺失 saveEditInteraction()');
check('互动编辑模态含 5 个输入', /editIntMethod[\s\S]*editIntTime[\s\S]*editIntSummary[\s\S]*editIntTopics[\s\S]*editIntMood/.test(html), '5 个编辑输入不全');
check('详情面板渲染有"编辑"按钮', /openEditInteraction\('\$\{c\.id\}'/.test(html), '详情面板没接 edit 按钮');
check('编辑保存触发 lastInteractionAt 重新计算', /i\.time\s*=\s*new Date\(time\)\.toISOString\(\)/.test(html), '编辑后未更新 time');

// === 2. 重要日期 banner ===
check('#upcomingBanner 容器存在', /id="upcomingBanner"/.test(html), '缺失 #upcomingBanner');
check('renderUpcomingBanner 函数已定义', /function\s+renderUpcomingBanner\s*\(/.test(html), '缺失 renderUpcomingBanner()');
check('dismissUpcomingBanner 函数已定义', /function\s+dismissUpcomingBanner\s*\(/.test(html), '缺失 dismissUpcomingBanner()');
check('banner 30 天范围判断', /diffDays\s*>\s*30/.test(html), 'banner 没设 30 天范围');
check('banner 跨年处理', /getFullYear\(\)\s*\+\s*1/.test(html), 'banner 没处理跨年');
check('renderAll() 调 banner', /renderAll[\s\S]{0,100}renderUpcomingBanner/.test(html), 'renderAll() 没调 banner');
check('.upcoming-banner CSS 存在', /\.upcoming-banner\s*\{/.test(html), '缺失 .upcoming-banner CSS');

// === 3. AI 建议（本地启发式） ===
check('renderAIRecommendations 函数已定义', /function\s+renderAIRecommendations\s*\(/.test(html), '缺失 renderAIRecommendations()');
check('renderAIInsightsSection 函数已定义', /function\s+renderAIInsightsSection\s*\(/.test(html), '缺失 renderAIInsightsSection()');
check('5 条 AI 规则：核心圈沉睡', /核心圈沉睡/.test(html), '缺失核心圈沉睡规则');
check('5 条 AI 规则：生日临近', /生日|纪念日.*临近/.test(html), '缺失生日临近规则');
check('5 条 AI 规则：互动升温', /互动升温|升温中/.test(html), '缺失互动升温规则');
check('5 条 AI 规则：未完成待办', /未完成待办|核心\/亲密朋友之间的承诺/.test(html), '缺失核心圈待办规则');
check('5 条 AI 规则：新添加零互动', /新添加但零互动|0 条互动记录/.test(html), '缺失破冰规则');
check('AI 卡片有 3 个优先级类', /priority-1/.test(html) && /priority-2/.test(html) && /priority-3/.test(html), '缺失 AI 优先级配色（priority-1/2/3）');
check('AI CSS 3 个优先级配色', /\.ai-rec\.priority-1\s*\{/.test(html) && /\.ai-rec\.priority-2\s*\{/.test(html) && /\.ai-rec\.priority-3\s*\{/.test(html), '缺失 .ai-rec.priority-N CSS');
check('AI 卡片带"0 上传"标识', /0 上传|0\s*上传/.test(html), '缺失隐私标识');
check('.ai-rec CSS 存在', /\.ai-rec\s*\{/.test(html), '缺失 .ai-rec CSS');

// === 4. 体积 + 自包含 ===
check('单文件仍 < 200KB', fs.statSync(file).size < 200 * 1024, '单文件过大（>200KB）');
check('AI 建议无外部 API 调用', !/fetch\s*\(\s*['"]https?:\/\/(?!lfc1402046)/.test(html), '检测到外部 API 调用');
