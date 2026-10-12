// 测试 v16 设计的健康度算法（decayScore）
function calcHealthScore(c) {
  const strengthScore = (c.strength / 5) * 100;
  const freqScore = c.frequency <= 7 ? 100 : c.frequency <= 30 ? 80 : c.frequency <= 90 ? 50 : 20;
  const recentScore = c.lastContact <= 7 ? 100 : c.lastContact <= 30 ? 80 : c.lastContact <= 90 ? 50 : 20;
  return Math.round(strengthScore * 0.4 + freqScore * 0.4 + recentScore * 0.2);
}

function healthLevel(score) {
  if (score >= 80) return 'good';
  if (score >= 50) return 'warn';
  return 'bad';
}

test('strength=5 + 1天前联系 + 7天1次 应该接近 100', () => {
  const c = { strength: 5, frequency: 7, lastContact: 1 };
  const score = calcHealthScore(c);
  assert(score >= 95);
  assertEqual(healthLevel(score), 'good');
});

test('strength=5 + 60天前 + 30天1次 应该 80-89（good 边缘）', () => {
  // strength=5 → 100, frequency=30 → 80, lastContact=60 → 50
  // = 100*0.4 + 80*0.4 + 50*0.2 = 82
  const c = { strength: 5, frequency: 30, lastContact: 60 };
  const score = calcHealthScore(c);
  assertEqual(score, 82);
  assertEqual(healthLevel(score), 'good');
});

test('strength=1 + 180天前 + 60天1次 应该是低分', () => {
  const c = { strength: 1, frequency: 60, lastContact: 180 };
  const score = calcHealthScore(c);
  assert(score < 50);
  assertEqual(healthLevel(score), 'bad');
});

test('频繁联系应该加分', () => {
  const frequent = calcHealthScore({ strength: 3, frequency: 3, lastContact: 1 });
  const rare = calcHealthScore({ strength: 3, frequency: 90, lastContact: 1 });
  assert(frequent > rare);
});

test('最近联系应该加分', () => {
  const recent = calcHealthScore({ strength: 3, frequency: 30, lastContact: 1 });
  const old = calcHealthScore({ strength: 3, frequency: 30, lastContact: 180 });
  assert(recent > old);
});

test('strength=0 应该低分不会负数', () => {
  const score = calcHealthScore({ strength: 0, frequency: 30, lastContact: 1 });
  assert(score >= 0);
});

test('边界：frequency=7 freqScore 100', () => {
  const score = calcHealthScore({ strength: 5, frequency: 7, lastContact: 30 });
  assertEqual(score, 96);
});

test('边界：frequency=8 freqScore 降档', () => {
  const score = calcHealthScore({ strength: 5, frequency: 8, lastContact: 30 });
  assertEqual(score, 88);
});

test('healthLevel 80+ = good', () => {
  assertEqual(healthLevel(80), 'good');
  assertEqual(healthLevel(100), 'good');
});

test('healthLevel 50-79 = warn', () => {
  assertEqual(healthLevel(50), 'warn');
  assertEqual(healthLevel(79), 'warn');
});

test('healthLevel <50 = bad', () => {
  assertEqual(healthLevel(49), 'bad');
  assertEqual(healthLevel(0), 'bad');
});

test('综合：完美维护的关系应 >= 90', () => {
  const c = { strength: 5, frequency: 3, lastContact: 1 };
  const score = calcHealthScore(c);
  assert(score >= 90);
});

test('综合：长期失联（strength=1）应 < 30', () => {
  // strength=1 → 20, frequency=180 → 20, lastContact=365 → 20
  // = 20*0.4 + 20*0.4 + 20*0.2 = 20
  const c = { strength: 1, frequency: 180, lastContact: 365 };
  const score = calcHealthScore(c);
  assert(score < 30);
});

test('综合：强度低+失联+互动少 = 30-50', () => {
  // strength=2 → 40, frequency=60 → 50, lastContact=120 → 20
  // = 40*0.4 + 50*0.4 + 20*0.2 = 16+20+4 = 40
  const c = { strength: 2, frequency: 60, lastContact: 120 };
  const score = calcHealthScore(c);
  assert(score >= 30 && score < 50);
});
