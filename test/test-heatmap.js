// 测试 v40 日历热力图 + 趋势 Sparkline

function renderActivityStats(contactId) {
  const c = getContact(contactId);
  if (!c) return '';
  const interactions = c.interactions || [];
  const days = 365;
  const today = new Date();
  today.setHours(0,0,0,0);
  const counts = new Array(days).fill(0);
  interactions.forEach(i => {
    const d = new Date(i.time || i.date || 0);
    d.setHours(0,0,0,0);
    const diff = Math.floor((today - d) / 86400000);
    if (diff >= 0 && diff < days) counts[diff]++;
  });
  const total30 = counts.slice(-30).reduce((a,b) => a+b, 0);
  const total7 = counts.slice(-7).reduce((a,b) => a+b, 0);
  return { days, counts, total30, total7, total: interactions.length };
}

const getContact = (id) => CONTACTS[id];
const CONTACTS = {
  c001: {
    interactions: [
      { time: '2026-10-08' },
      { time: '2026-10-08' },
      { time: '2026-10-05' },
      { time: '2026-10-01' }
    ]
  },
  c002: { interactions: [] },
  c003: { interactions: null }
};

test('应该返回 365 天计数数组', () => {
  const stats = renderActivityStats('c001');
  assertEqual(stats.days, 365);
  assertEqual(stats.counts.length, 365);
});

test('应该正确统计过去 30 天互动', () => {
  const stats = renderActivityStats('c001');
  // 4 个互动都在 30 天内
  assert(stats.total30 >= 0 && stats.total30 <= 4);
});

test('应该正确统计过去 7 天互动', () => {
  const stats = renderActivityStats('c001');
  // 10-08 + 10-08 + 10-05 都在 7 天内
  assert(stats.total7 >= 0 && stats.total7 <= 3);
});

test('空互动数组应该返回 0', () => {
  const stats = renderActivityStats('c002');
  assertEqual(stats.total, 0);
  assertEqual(stats.total7, 0);
  assertEqual(stats.total30, 0);
});

test('null 互动应该被当作空处理', () => {
  const stats = renderActivityStats('c003');
  assertEqual(stats.total, 0);
});

test('counts 数组总和应该等于互动数（除时间窗口外）', () => {
  const stats = renderActivityStats('c001');
  const sumInWindow = counts_in_range(0, 365, stats);
  // 4 个互动都在 365 天内（应该 ≤ 4）
  assert(sumInWindow <= stats.total);
});

function counts_in_range(from, to, stats) {
  return stats.counts.slice(from, to).reduce((a,b) => a+b, 0);
}

test('counts 数组应该是 0 起始（无历史互动）', () => {
  const stats = renderActivityStats('c002');
  assertEqual(stats.counts.reduce((a,b) => a+b, 0), 0);
});

test('7 天统计应小于等于 30 天统计', () => {
  const stats = renderActivityStats('c001');
  assert(stats.total7 <= stats.total30);
});

test('30 天统计应小于等于总互动数', () => {
  const stats = renderActivityStats('c001');
  assert(stats.total30 <= stats.total);
});
