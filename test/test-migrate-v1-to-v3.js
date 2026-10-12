// 测试 v31 核心函数：migrateV1toV3
function migrateV1toV3(contact) {
  if (!contact) return null;
  if (contact.dunbarTier !== undefined && contact.dunbarTier !== null) return contact;
  let lastInteractionAt = '';
  let interactionCount = 0;
  if (contact.interactions && contact.interactions.length > 0) {
    interactionCount = contact.interactions.length;
    const sorted = [...contact.interactions].sort((a, b) => new Date(b.time || b.date || 0) - new Date(a.time || a.date || 0));
    lastInteractionAt = sorted[0].time || sorted[0].date || '';
  }
  const dunbarTier = contact.strength >= 5 ? 1 : contact.strength >= 4 ? 2 : contact.strength >= 2 ? 3 : 4;
  return {
    ...contact,
    nickname: contact.nickname || '',
    avatar: contact.avatar || '',
    gender: contact.gender || '',
    ageRange: contact.ageRange || '',
    email: contact.email || '',
    company: contact.company || '',
    position: contact.position || '',
    hometown: contact.hometown || '',
    currentCity: contact.currentCity || '',
    metAt: contact.metAt || '',
    metScene: contact.metScene || '',
    introducedBy: contact.introducedBy || '',
    dunbarTier: dunbarTier,
    valueTier: contact.valueTier || 'maintain',
    familiarity: contact.familiarity || 'familiar',
    trustLevel: contact.trustLevel || contact.strength || 3,
    emotionalTendency: contact.emotionalTendency || '',
    customAttrs: contact.customAttrs || [],
    lastInteractionAt: contact.lastInteractionAt || lastInteractionAt,
    interactionCount: contact.interactionCount || interactionCount,
    avgIntervalDays: contact.avgIntervalDays || 0,
    keyDates: contact.keyDates || [],
    todos: contact.todos || [],
    preferences: contact.preferences || { likes: [], dislikes: [], gifts: [] },
    sensitivityTopics: contact.sensitivityTopics || []
  };
}

test('strength=5 应该推断 dunbarTier=1', () => {
  const c = migrateV1toV3({ strength: 5 });
  assertEqual(c.dunbarTier, 1);
});
test('strength=4 应该推断 dunbarTier=2', () => {
  const c = migrateV1toV3({ strength: 4 });
  assertEqual(c.dunbarTier, 2);
});
test('strength=3 应该推断 dunbarTier=3', () => {
  const c = migrateV1toV3({ strength: 3 });
  assertEqual(c.dunbarTier, 3);
});
test('strength=2 应该推断 dunbarTier=3', () => {
  const c = migrateV1toV3({ strength: 2 });
  assertEqual(c.dunbarTier, 3);
});
test('strength=1 应该推断 dunbarTier=4', () => {
  const c = migrateV1toV3({ strength: 1 });
  assertEqual(c.dunbarTier, 4);
});
test('strength=0 边界应该推断 dunbarTier=4', () => {
  const c = migrateV1toV3({ strength: 0 });
  assertEqual(c.dunbarTier, 4);
});
test('strength 缺失应该推断 dunbarTier=4', () => {
  const c = migrateV1toV3({ name: 'test' });
  assertEqual(c.dunbarTier, 4);
});
test('已迁移对象应该原样返回', () => {
  const c = { name: '王五', dunbarTier: 1, valueTier: 'core' };
  const result = migrateV1toV3(c);
  assertEqual(result.dunbarTier, 1);
  assertEqual(result.valueTier, 'core');
});
test('空值应该返回 null', () => {
  assertEqual(migrateV1toV3(null), null);
  assertEqual(migrateV1toV3(undefined), null);
});
test('v0.1 字段应该保留', () => {
  const c = migrateV1toV3({ id: 'c001', name: '王五', strength: 5 });
  assertEqual(c.id, 'c001');
  assertEqual(c.name, '王五');
  assertEqual(c.strength, 5);
});
test('interactions 应该被保留', () => {
  const interactions = [{ id: 'i1', time: '2026-10-08', summary: 'test1' }];
  const c = migrateV1toV3({ strength: 3, interactions });
  assertDeepEqual(c.interactions, interactions);
  assertEqual(c.interactionCount, 1);
});
test('lastInteractionAt 应该是最新时间', () => {
  const interactions = [
    { time: '2026-10-01' },
    { time: '2026-10-08' },
    { time: '2026-10-05' }
  ];
  const c = migrateV1toV3({ strength: 3, interactions });
  assertEqual(c.lastInteractionAt, '2026-10-08');
});
test('trustLevel 缺失时应该使用 strength', () => {
  const c = migrateV1toV3({ strength: 4 });
  assertEqual(c.trustLevel, 4);
});
test('trustLevel 已设置时应该保留', () => {
  const c = migrateV1toV3({ strength: 3, trustLevel: 5 });
  assertEqual(c.trustLevel, 5);
});
test('v3.0 字段已存在时不应该覆盖', () => {
  const c = migrateV1toV3({
    strength: 3,
    nickname: '五哥',
    company: 'AI 创业公司',
    keyDates: [{ type: 'birthday', date: '1989-09-12' }]
  });
  assertEqual(c.nickname, '五哥');
  assertEqual(c.company, 'AI 创业公司');
  assertEqual(c.keyDates[0].type, 'birthday');
});
test('valueTier 缺失时应该默认为 maintain', () => {
  const c = migrateV1toV3({ strength: 3 });
  assertEqual(c.valueTier, 'maintain');
});
test('keyDates 缺失时应该默认为空数组', () => {
  const c = migrateV1toV3({ strength: 3 });
  assertDeepEqual(c.keyDates, []);
});
test('todos 缺失时应该默认为空数组', () => {
  const c = migrateV1toV3({ strength: 3 });
  assertDeepEqual(c.todos, []);
});
test('preferences 缺失时应该默认为空对象', () => {
  const c = migrateV1toV3({ strength: 3 });
  assertDeepEqual(c.preferences, { likes: [], dislikes: [], gifts: [] });
});
test('complete v0.1 contact 应该正确迁移', () => {
  const v0 = {
    id: 'c001',
    name: '王五',
    wechat: 'wuwu',
    phone: '138-0001',
    tags: ['跑团', '挚友'],
    strength: 5,
    notes: '8年老友',
    interactions: [{ id: 'i1', time: '2026-10-08', summary: 'x' }],
    connections: [],
    createdAt: '2024-01-15T10:00:00Z'
  };
  const v3 = migrateV1toV3(v0);
  assertEqual(v3.id, 'c001');
  assertEqual(v3.dunbarTier, 1);
  assertEqual(v3.lastInteractionAt, '2026-10-08');
  assertEqual(v3.interactionCount, 1);
  assertEqual(v3.notes, '8年老友');
  assertEqual(v3.wechat, 'wuwu');
  assertEqual(v3.phone, '138-0001');
});
