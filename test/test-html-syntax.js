// 回归测试：防止 HTML 内联脚本语法错误导致整页白屏
// 背景：v44 曾因 drawGraph() 中 const grad 重复声明，导致主脚本块 SyntaxError，
//       表现为"顶栏显示、联系人区全白"。函数级单元测试无法发现，必须整体语法校验。
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const filesToCheck = [
  path.join(root, 'site', 'index.html'),
  path.join(root, 'tool', 'index.html'),
];

function extractScripts(html) {
  const scripts = [];
  const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) scripts.push(m[1]);
  return scripts;
}

function relOf(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

filesToCheck.forEach((file) => {
  const rel = relOf(file);

  test(rel + ' 内联脚本全部通过语法校验', () => {
    const html = fs.readFileSync(file, 'utf8');
    const scripts = extractScripts(html);
    assert(scripts.length > 0, rel + ' 应当至少包含一个 <script> 块');
    scripts.forEach((code, i) => {
      try {
        new vm.Script(code, { filename: rel + '#script' + (i + 1) });
      } catch (e) {
        throw new Error('脚本块 #' + (i + 1) + ' 语法错误: ' + e.message);
      }
    });
  });

  test(rel + ' 关键标签成对平衡', () => {
    const html = fs.readFileSync(file, 'utf8');
    assertEqual((html.match(/<script\b/g) || []).length, (html.match(/<\/script>/g) || []).length, 'script 开闭标签数量应一致');
    assertEqual((html.match(/<div\b/g) || []).length, (html.match(/<\/div>/g) || []).length, 'div 开闭标签数量应一致');
  });
});

test('site/index.html 与 tool/index.html 保持同步', () => {
  const a = fs.readFileSync(path.join(root, 'site', 'index.html'), 'utf8');
  const b = fs.readFileSync(path.join(root, 'tool', 'index.html'), 'utf8');
  assert(a === b, '两份 index.html 内容应当完全一致（site/ 是部署副本）');
});
