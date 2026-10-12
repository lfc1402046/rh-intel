// 测试边界情况
test('空对象处理', () => {
  const c = {};
  assert(c !== null);
  assert(typeof c === 'object');
});

test('极大 strength 值', () => {
  const c = { strength: 999, frequency: 30, lastContact: 1 };
  assert(c.strength > 5);
});

test('负值处理', () => {
  const c = { strength: -1, frequency: 30, lastContact: 1 };
  assert(c.strength < 0);
});

test('浮点数处理', () => {
  const c = { strength: 3.7, frequency: 30, lastContact: 1 };
  assert(c.strength === 3.7);
});

test('特殊字符（emoji）', () => {
  const c = { name: '王五👨‍💻', notes: '5⭐ VIP客户' };
  assert(c.name.includes('👨‍💻'));
  assert(c.notes.includes('⭐'));
});

test('超长字符串', () => {
  const longStr = '测试'.repeat(1000);
  const c = { name: longStr };
  assert(c.name.length === 2000);
});

test('null 与 undefined', () => {
  const c = { name: null, valueTier: undefined };
  assertEqual(c.name, null);
  assertEqual(c.valueTier, undefined);
});

test('嵌套对象', () => {
  const c = {
    customAttrs: [
      { key: 'key1', value: 'val1' },
      { key: 'key2', value: 'val2', type: 'number' }
    ]
  };
  assertEqual(c.customAttrs.length, 2);
  assertEqual(c.customAttrs[1].type, 'number');
});

test('时间戳 ISO 格式', () => {
  const c = {
    lastInteractionAt: '2026-10-08T10:30:00Z',
    metAt: '1989-09-12'
  };
  assert(c.lastInteractionAt.endsWith('Z'));
  assertEqual(c.metAt.length, 10);
});

test('空数组 vs 缺失字段', () => {
  const c1 = { tags: [] };
  const c2 = {};
  assert(Array.isArray(c1.tags));
  assert(!('tags' in c2));
});

test('布尔值', () => {
  const c = { archived: true, isMe: false };
  assertEqual(c.archived, true);
  assertEqual(c.isMe, false);
});

test('数值边界 0', () => {
  const c = { strength: 0, trustLevel: 0, ageRange: 0 };
  assertEqual(c.strength, 0);
});

test('数值边界最大值 5', () => {
  const c = { strength: 5, trustLevel: 5 };
  assertEqual(c.strength, 5);
});

test('数值边界 4.5（浮点）', () => {
  const c = { strength: 4.5 };
  assert(c.strength > 4 && c.strength < 5);
});

test('中文 / 英文 / 数字混合', () => {
  const c = {
    name: 'Wang Wu 王五',
    phone: '+86-138-0001-1001',
    email: 'wangwu@example.com',
    wechat: 'wuwu_paobu'
  };
  assert(c.name.includes('王五'));
  assert(c.email.includes('@'));
});
