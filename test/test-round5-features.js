// Round 5 防回归：CSV 导出 + 标签管理
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const file = path.join(root, 'site', 'index.html');
const html = fs.readFileSync(file, 'utf8');

function check(name, predicate, message) {
  test(name, () => { assert(predicate, message); });
}

// === 1. CSV 导出 ===
check('openExportModal 函数已定义', /function\s+openExportModal\s*\(/.test(html), '缺失 openExportModal()');
check('doExportCSV 函数已定义', /function\s+doExportCSV\s*\(/.test(html), '缺失 doExportCSV()');
check('doExportJSON 函数已定义', /function\s+doExportJSON\s*\(/.test(html), '缺失 doExportJSON()');
check('CSV 表头含 姓名/微信/电话', /姓名/.test(html) && /微信/.test(html) && /电话/.test(html), 'CSV 表头基础字段缺失');
check('CSV 表头含 邓巴圈层', /邓巴圈层/.test(html), '缺邓巴圈层字段');
check('CSV 表头含 重要日期/待办', /重要日期/.test(html) && /待办/.test(html), '缺重要日期/待办字段');
check('CSV 表头含 备注/创建时间', /备注/.test(html) && /创建时间/.test(html), '缺备注/创建时间字段');
check('UTF-8 BOM (Excel 兼容)', /\\uFEFF/.test(html), '缺 UTF-8 BOM \\uFEFF');
check('CSV MIME type', /text\/csv/.test(html), 'CSV MIME type 错');
check('CSV 字段转义函数 esc 存在', /esc\s*=\s*\(v\)/.test(html), '缺 esc 转义函数');
check('CSV 双引号转义逻辑', html.indexOf('replace(/"/g,') >= 0 && html.indexOf('""') >= 0, 'CSV 双引号转义缺失');
check('CSV download .csv 扩展名', /a\.download.*\.csv/.test(html), 'CSV 扩展名缺失');

// === 2. 标签管理 ===
check('#tagMgrBtn 入口存在', /id="tagMgrBtn"/.test(html), '缺 #tagMgrBtn');
check('openTagManager 函数已定义', /function\s+openTagManager\s*\(/.test(html), '缺失 openTagManager()');
check('renameTag 函数已定义', /function\s+renameTag\s*\(/.test(html), '缺失 renameTag()');
check('mergeTag 函数已定义', /function\s+mergeTag\s*\(/.test(html), '缺失 mergeTag()');
check('deleteTag 函数已定义', /function\s+deleteTag\s*\(/.test(html), '缺失 deleteTag()');
check('renameTagPrompt 函数已定义', /function\s+renameTagPrompt\s*\(/.test(html), '缺失 renameTagPrompt()');
check('mergeTagPrompt 函数已定义', /function\s+mergeTagPrompt\s*\(/.test(html), '缺失 mergeTagPrompt()');
check('标签管理显示联系人计数', openTagManagerHasCount(), '标签管理未显示计数');
check('合并去重逻辑（目标已存在则只删源）', /includes\(targetTag\)/.test(html), '合并去重逻辑缺失');
check('escapeHtml helper', /function\s+escapeHtml/.test(html), '缺 escapeHtml');
check('escapeAttr helper', /function\s+escapeAttr/.test(html), '缺 escapeAttr');
check('.tag-mgr-row CSS 存在', /\.tag-mgr-row\s*\{/.test(html), '缺 .tag-mgr-row CSS');
check('.tag-mgr-btn CSS 存在', /\.tag-mgr-btn\s*\{/.test(html), '缺 .tag-mgr-btn CSS');
check('.export-option CSS 存在', /\.export-option\s*\{/.test(html), '缺 .export-option CSS');

// === 3. 体积 ===
check('单文件 < 200KB', fs.statSync(file).size < 200 * 1024, '单文件过大');

function openTagManagerHasCount() {
  const idx = html.indexOf('function openTagManager');
  if (idx < 0) return false;
  const body = html.slice(idx, idx + 4000);
  return /人/.test(body) && /tagMap\[t\]/.test(body);
}
