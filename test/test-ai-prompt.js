// 测试 v18/v28/v29 集成的 AI prompt 模板
function buildChatPrompt(contact, scenario) {
  const safeTopics = (contact.safeTopics || []).join('、');
  const doNotMention = (contact.doNotMention || []).join('、');
  const prompt = '你是社交助手。档案：' + JSON.stringify(contact, null, 2) + '场景：' + scenario.context + '要求：1. 仅使用 safeTopics(' + safeTopics + ') 2. 不要提 doNotMention(' + doNotMention + ') 3. 语气匹配 voiceTone(' + contact.voiceTone + ')';
  return prompt;
}

const CRISIS_PATTERNS = [
  { regex: /撑不下去|没意思|不想活|自杀|了结/, severity: 'urgent', type: '自伤' },
  { regex: /打了我|家暴|虐待/, severity: 'urgent', type: '暴力' },
  { regex: /每天睡不着|崩溃|抑郁/, severity: 'professional', type: '心理' },
  { regex: /离婚|分手.*该不该/, severity: 'pause', type: '决策' }
];

function detectCrisis(text) {
  const issues = [];
  CRISIS_PATTERNS.forEach(p => { if (p.regex.test(text)) issues.push(p); });
  return issues;
}

test('prompt 应该包含档案信息', () => {
  const c = { name: '王五', safeTopics: ['AI', '跑步'], doNotMention: ['岳父'], voiceTone: '温暖' };
  const prompt = buildChatPrompt(c, { context: '5天没联系' });
  assert(prompt.includes('王五'));
  assert(prompt.includes('AI'));
});

test('prompt 应该列出 safeTopics', () => {
  const c = { name: 'A', safeTopics: ['X', 'Y'], doNotMention: [], voiceTone: 't' };
  const prompt = buildChatPrompt(c, { context: 'x' });
  assert(prompt.includes('X'));
  assert(prompt.includes('Y'));
});

test('prompt 应该列出 doNotMention', () => {
  const c = { name: 'A', safeTopics: [], doNotMention: ['敏感话题1', '敏感话题2'], voiceTone: 't' };
  const prompt = buildChatPrompt(c, { context: 'x' });
  assert(prompt.includes('敏感话题1'));
  assert(prompt.includes('敏感话题2'));
});

test('prompt 缺失字段应该不报错', () => {
  const c = { name: 'A' };
  const prompt = buildChatPrompt(c, { context: 'x' });
  assert(prompt.length > 0);
});

test('检测自伤信号', () => {
  const issues = detectCrisis('我撑不下去了');
  assertEqual(issues.length, 1);
  assertEqual(issues[0].severity, 'urgent');
  assertEqual(issues[0].type, '自伤');
});

test('检测家暴信号', () => {
  const issues = detectCrisis('他打了我');
  assertEqual(issues.length, 1);
  assertEqual(issues[0].type, '暴力');
});

test('检测心理问题信号', () => {
  const issues = detectCrisis('我每天睡不着');
  assertEqual(issues.length, 1);
  assertEqual(issues[0].severity, 'professional');
});

test('检测重大决策信号', () => {
  const issues = detectCrisis('该不该离婚');
  assertEqual(issues.length, 1);
  assertEqual(issues[0].severity, 'pause');
});

test('正常对话不应该触发危机检测', () => {
  const issues = detectCrisis('今天天气真好');
  assertEqual(issues.length, 0);
});

test('多关键词应该返回多个 issues', () => {
  const issues = detectCrisis('我撑不下去了，他打了我');
  assertEqual(issues.length, 2);
});
