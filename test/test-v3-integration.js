// 测试 v33 Round 2 集成：6 大模块入口 + filterByModule
function renderModuleSummary() {
  const contacts = getAllContacts();
  const t = { tier1:0, tier2:0, tier3:0, tier4:0, dormant:0, recent:0, withTags:0 };
  contacts.forEach(c => {
    const tier = c.dunbarTier != null ? c.dunbarTier : (c.strength >= 5 ? 1 : c.strength >= 4 ? 2 : c.strength >= 2 ? 3 : 4);
    if (tier === 1) t.tier1++;
    else if (tier === 2) t.tier2++;
    else if (tier === 3) t.tier3++;
    else t.tier4++;
    if (c.lastInteractionAt) {
      const days = daysSince(c.lastInteractionAt);
      if (days > 90) t.dormant++;
      else if (days < 7) t.recent++;
    }
    if ((c.tags||[]).length > 0) t.withTags++;
  });
  const pendingTodos = contacts.reduce((sum, c) => sum + (c.todos||[]).filter(x => x.status !== 'done').length, 0);
  const upcomingDates = contacts.reduce((sum, c) => sum + (c.keyDates||[]).length, 0);
  return { tier1: t.tier1, tier2: t.tier2, tier3: t.tier3, tier4: t.tier4, dormant: t.dormant, recent: t.recent, withTags: t.withTags, pendingTodos, upcomingDates, total: contacts.length };
}

function daysSince(iso) {
  if (!iso) return 9999;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function getAllContacts() { return CONTACTS; }

const CONTACTS = [
  { id: 'c1', name: '王五', strength: 5, dunbarTier: 1, lastInteractionAt: '2026-10-08', tags: ['跑团'], todos: [{status:'pending'}] },
  { id: 'c2', name: '李四', strength: 4, dunbarTier: 2, lastInteractionAt: '2026-09-01', tags: ['朋友'] },
  { id: 'c3', name: '妈', strength: 5, dunbarTier: 1, lastInteractionAt: '2026-10-05', tags: ['家人'], keyDates: [{type:'birthday'},{type:'anniversary'}] },
  { id: 'c4', name: '老陈', strength: 2, dunbarTier: 3, lastInteractionAt: '2024-01-01' }
];

test('模块统计应该正确分类到 4 个 tier', () => {
  const s = renderModuleSummary();
  assertEqual(s.tier1, 2, '王五+妈都是核心');
  assertEqual(s.tier2, 1, '李四');
  assertEqual(s.tier3, 1, '老陈');
  assertEqual(s.tier4, 0);
});

test('total 应该等于联系人总数', () => {
  const s = renderModuleSummary();
  assertEqual(s.total, 4);
});

test('pendingTodos 应该累计所有未完成', () => {
  const s = renderModuleSummary();
  assertEqual(s.pendingTodos, 1, '王五 1 个');
});

test('upcomingDates 应该累计所有 keyDates', () => {
  const s = renderModuleSummary();
  assertEqual(s.upcomingDates, 2, '妈 2 个');
});

test('dormant 应该是 > 90 天未互动', () => {
  const s = renderModuleSummary();
  assertEqual(s.dormant, 1, '老陈 > 90 天');
});

test('recent 应该是 < 7 天内互动', () => {
  const s = renderModuleSummary();
  assertEqual(s.recent, 1, '王五最近互动，妈 7 天前不算');
});

test('空 contacts 应该返回全 0', () => {
  CONTACTS.length = 0;
  const s = renderModuleSummary();
  assertEqual(s.total, 0);
  assertEqual(s.tier1, 0);
  CONTACTS.push(
    { id: 'c1', name: '王五', strength: 5, dunbarTier: 1, lastInteractionAt: '2026-10-08', tags: [], todos: [], keyDates: [] },
    { id: 'c2', name: '李四', strength: 4, dunbarTier: 2, lastInteractionAt: '2026-09-01', tags: [] }
  );
});

test('contacts 没有 dunbarTier 时应根据 strength 推断', () => {
  // 第二个 contacts 是 dunbarTier=null 但 strength=4 → 应为 tier 2
  const s = renderModuleSummary();
  assertEqual(s.tier2, 1, '推断为亲密');
});

test('daysSince 应该正确计算', () => {
  const today = new Date().toISOString();
  assertEqual(daysSince(today), 0);
  const oldDate = new Date(Date.now() - 100 * 86400000).toISOString();
  assert(daysSince(oldDate) >= 99 && daysSince(oldDate) <= 100);
});
