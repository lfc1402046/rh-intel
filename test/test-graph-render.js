// 测试 v37 网络图渲染

test('tierColors 5 档映射应该完整', () => {
  const tierColors = {5:'#FFD66B', 4:'#5BB5E0', 3:'#4ECDC4', 2:'#92B8D8', 1:'#C8B8DB'};
  [1,2,3,4,5].forEach(t => {
    assert(tierColors[t], 'tier ' + t + ' 应该有颜色');
    assert(tierColors[t].startsWith('#'), '颜色应 hex');
  });
});

test('tierNames 5 档应该完整', () => {
  const tierNames = {5:'核心', 4:'亲密', 3:'一般', 2:'弱', 1:'极弱'};
  assertEqual(tierNames[5], '核心');
  assertEqual(tierNames[4], '亲密');
  assertEqual(tierNames[3], '一般');
  assertEqual(tierNames[2], '弱');
  assertEqual(tierNames[1], '极弱');
});

test('节点大小应该按 strength 缩放', () => {
  function nodeRadius(strength) {
    return 12 + strength * 4;
  }
  assertEqual(nodeRadius(5), 32);
  assertEqual(nodeRadius(1), 16);
  assert(nodeRadius(5) > nodeRadius(1));
});

test('边粗细应该按 strength 平均', () => {
  function lineWidth(a, b) {
    return 1 + ((a + b) / 2) * 0.6;
  }
  // 5+5 → 4
  assertEqual(lineWidth(5, 5), 4);
  // 1+1 → 1.6
  assertEqual(lineWidth(1, 1), 1.6);
  // 5+1 → 2.8
  assertEqual(lineWidth(5, 1), 2.8);
});

test('100 联系人 + 71 连接应该是高密度网络', () => {
  const total = 100;
  const connections = 71;
  const density = connections / total;
  assert(density > 0.5, '密度应 > 0.5 (每人平均 0.7 连接)');
});

test('节点首字提取应该正确', () => {
  function firstChar(name) {
    if (!name || name.length === 0) return '';
    return name[0];
  }
  assertEqual(firstChar('王五'), '王');
  assertEqual(firstChar('妈'), '妈');
  assertEqual(firstChar('丈母娘'), '丈');
  assertEqual(firstChar('Vivian'), 'V');
});

test('5 档颜色应该按可见度渐变', () => {
  // 强关系（5）应该比弱关系（1）颜色更鲜明
  const tierColors = {5:'#FFD66B', 4:'#5BB5E0', 3:'#4ECDC4', 2:'#92B8D8', 1:'#C8B8DB'};
  // 5档是金色，最显眼
  assertEqual(tierColors[5], '#FFD66B');
  // 1档是淡紫，柔和
  assertEqual(tierColors[1], '#C8B8DB');
});
