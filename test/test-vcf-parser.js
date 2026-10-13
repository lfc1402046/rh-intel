// 测试 v42 VCF 解析器

function parseVCF(text) {
  const contacts = [];
  const blocks = text.split(/BEGIN:VCARD/i);
  let counter = 0;
  for (const block of blocks) {
    if (!block.includes('END:VCARD')) continue;
    const lines = block.split(/\r?\n/);
    let name = '';
    let displayName = '';
    const phones = [];
    let note = '';
    for (const line of lines) {
      const t = line.trim();
      if (t.startsWith('END:VCARD')) break;
      if (t.startsWith('N:') && !name) {
        const parts = t.substring(2).split(';');
        const last = parts[0] || parts[1] || '';
        const first = parts[1] || parts[0] || '';
        name = (last + first).trim();
      } else if (t.startsWith('FN:') && !displayName) {
        displayName = t.substring(3).trim();
      } else if (t.startsWith('TEL')) {
        const tel = t.split(':').pop().trim().replace(/[^\d+]/g, '');
        if (tel && !phones.includes(tel)) phones.push(tel);
      } else if (t.startsWith('NOTE')) {
        note += t.substring(5).replace(/^:/, '') + ' ';
      }
    }
    const finalName = (displayName || name || '未命名').trim();
    if (!phones.length && !finalName) continue;
    counter++;
    contacts.push({
      id: 'vcf_' + counter,
      name: finalName,
      phone: phones[0] || '',
      tags: ['VCF 导入'],
      strength: 2,
      notes: note.trim().substring(0, 100) || '从 VCF 导入',
      interactions: [],
      connections: []
    });
  }
  return contacts;
}

test('解析单联系人 VCF', () => {
  const vcf = 'BEGIN:VCARD\nVERSION:3.0\nFN:张三\nTEL:+8612345678\nEND:VCARD';
  const result = parseVCF(vcf);
  assertEqual(result.length, 1);
  assertEqual(result[0].name, '张三');
  assertEqual(result[0].phone, '+8612345678');
});

test('解析多联系人 VCF', () => {
  const vcf = `BEGIN:VCARD
FN:张三
TEL:+8612345678
END:VCARD
BEGIN:VCARD
FN:李四
TEL:+8612345999
END:VCARD`;
  const result = parseVCF(vcf);
  assertEqual(result.length, 2);
  assertEqual(result[0].name, '张三');
  assertEqual(result[1].name, '李四');
});

test('应该优先使用 FN（displayName）', () => {
  const vcf = 'BEGIN:VCARD\nN:张;三;;;\nFN:三哥\nTEL:1234\nEND:VCARD';
  const result = parseVCF(vcf);
  assertEqual(result[0].name, '三哥');
});

test('当 FN 缺失时使用 N 字段', () => {
  const vcf = 'BEGIN:VCARD\nN:张;三;;;\nTEL:1234\nEND:VCARD';
  const result = parseVCF(vcf);
  assertEqual(result[0].name, '张三');
});

test('多电话应该取第一个', () => {
  const vcf = 'BEGIN:VCARD\nFN:王五\nTEL:+8611111\nTEL:+8622222\nEND:VCARD';
  const result = parseVCF(vcf);
  assertEqual(result[0].phone, '+8611111');
});

test('空 VCF 应该返回空数组', () => {
  const result = parseVCF('');
  assertEqual(result.length, 0);
});

test('没有 END:VCARD 的块应该被忽略', () => {
  const vcf = 'BEGIN:VCARD\nFN:张三\nTEL:1234';
  const result = parseVCF(vcf);
  assertEqual(result.length, 0);
});

test('应该自动添加 VCF 导入 tag', () => {
  const vcf = 'BEGIN:VCARD\nFN:王五\nTEL:1234\nEND:VCARD';
  const result = parseVCF(vcf);
  assertEqual(result[0].tags[0], 'VCF 导入');
});

test('默认 strength 应该是 2', () => {
  const vcf = 'BEGIN:VCARD\nFN:王五\nTEL:1234\nEND:VCARD';
  const result = parseVCF(vcf);
  assertEqual(result[0].strength, 2);
});

test('应该去除电话中的非数字字符', () => {
  const vcf = 'BEGIN:VCARD\nFN:王五\nTEL:+86 138-0001-1234\nEND:VCARD';
  const result = parseVCF(vcf);
  assertEqual(result[0].phone, '+8613800011234');
});

test('真实 iPhone VCF 格式', () => {
  const vcf = `BEGIN:VCARD
VERSION:3.0
PRODID:-//Apple Inc.//iPhone OS 26.6.2//EN
N:监理总监;;;;
FN:监理总监
TEL;type=pref:+8613646080530
END:VCARD
BEGIN:VCARD
VERSION:3.0
N:张三;;;;
FN:张三
TEL;type=CELL:18868049756
END:VCARD`;
  const result = parseVCF(vcf);
  assertEqual(result.length, 2);
  assertEqual(result[0].name, '监理总监');
  assertEqual(result[0].phone, '+8613646080530');
  assertEqual(result[1].name, '张三');
  assertEqual(result[1].phone, '18868049756');
});

test('应该忽略 BEGIN:VCALENDAR 之类前缀', () => {
  const vcf = 'BEGIN:VCALENDAR\nBEGIN:VCARD\nFN:张三\nTEL:1234\nEND:VCARD\nEND:VCALENDAR';
  const result = parseVCF(vcf);
  assertEqual(result.length, 1);
  assertEqual(result[0].name, '张三');
});

test('空块（BEGIN:VCARD 紧接 BEGIN:VCARD）应该不崩溃', () => {
  const vcf = 'BEGIN:VCARD\nBEGIN:VCARD\nFN:张三\nTEL:1234\nEND:VCARD';
  const result = parseVCF(vcf);
  // 第一个块没有 END:VCARD → 跳过
  assertEqual(result.length, 1);
  assertEqual(result[0].name, '张三');
});
