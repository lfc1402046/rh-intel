// ===== RH Intel AI 话术测试器 =====
// 端到端测试：v3.0 档案 + LLM 调用 + 约束验证

// ===== 内置 5 个 v3.0 深度档案 =====
const CONTACTS = [
  {
    id: 'c001',
    name: '王五',
    nickname: '五哥',
    archetype: '老大哥型',
    publicPersona: '事业有成的科技创业者',
    innerStruggle: '要强的外表下担心融资失败让团队失望',
    coreFear: '成为那种"为了事业牺牲一切"的爸爸',
    deepDesire: '做出有影响力的产品 + 陪伴女儿长大',
    triggerTopics: ['父亲健康', '融资失败', '女儿未来'],
    safeTopics: ['AI Agent 研究', '环岛路训练', '女儿新技能'],
    doNotMention: ['岳父', '指责陪家人少', '父亲创业失败细节'],
    openWith: '跑步 / AI / 女儿',
    voiceTone: '温暖 + 偶尔直给 + 兄长口吻',
    decisionPattern: '分析型',
    familiarity: 'close',
    comfortableScenarios: ['环岛路跑步', '咖啡馆聊 AI', '带娃去公园'],
    uncomfortableScenarios: ['多人酒局', '被催融资'],
    verbalTics: ['说"靠谱"当肯定', '讲技术时手做"打字"动作'],
    conflictStyle: '协商',
    attachmentStyle: 'secure',
    formativeEvents: [
      { age: 8, event: '父亲办工厂失败' },
      { age: 26, event: '首次创业失败' },
      { age: 30, event: '女儿出生' }
    ],
    aiPersona: '你在他面前是 8 年挚友 + 干爸',
    suggestionRisks: ['不要劝他放松', '不要谈岳父'],
    giftPreferences: { love: ['科技新品', '咖啡豆'] },
    lastInteractionAt: '2026-10-08'
  },

  {
    id: 'c013',
    name: '张老师',
    nickname: '张老师',
    archetype: '传统守望者型',
    publicPersona: '学术严谨的传统学者',
    innerStruggle: '认为我转行 AI 是"背叛"，但不说出来',
    coreFear: '学生失败 / 学生否定他的教导',
    deepDesire: '学生回来说"谢谢老师"',
    triggerTopics: ['AI 转行', '建筑师身份', '学生选择'],
    safeTopics: ['建筑学理论', '古典音乐', '校园新建设施', '太太红烧肉'],
    doNotMention: ['AI 收入对比', '直接问转行看法', '暗示他教的内容"过时"'],
    openWith: '请教 + 校园话题',
    voiceTone: '恭敬 + 自嘲 + 求教',
    decisionPattern: '分析 + 慢决',
    familiarity: 'familiar',
    comfortableScenarios: ['校园散步', '古典音乐会'],
    uncomfortableScenarios: ['互联网热词', '和成功转行者对比'],
    verbalTics: ['说"嗯，这个嘛..."', '引用老子庄子'],
    formativeEvents: [
      { age: 30, event: '入职厦大' },
      { age: 55, event: '我转 AI，他半年不回我微信' }
    ],
    aiPersona: '你是他的前学生。转 AI 后他有未表达的心结。',
    suggestionRisks: ['绝对不要谈薪资对比', '回微信慢需等 1-2 周'],
    lastInteractionAt: '2024-09-10'
  },

  {
    id: 'c011',
    name: '小敏',
    petName: '（避免）',
    archetype: '温柔疏离型',
    publicPersona: '温婉的大学校友',
    innerStruggle: '分手后仍有复杂情感，但她选择了不再主动联系',
    coreFear: '再次让对方失望 / 双方尴尬',
    deepDesire: '维持不尴尬的"老朋友"',
    triggerTopics: ['新恋情', '复合', '大学共同朋友', '李四'],
    safeTopics: ['她喜欢的书', '季节性祝福', '咖啡店展览'],
    doNotMention: ['任何"想当年"', '复合可能性', '你未来对象'],
    openWith: '群发节日祝福 / 中性话题',
    voiceTone: '轻松 + 距离 + 不越界',
    decisionPattern: '等待型',
    familiarity: 'familiar',
    comfortableScenarios: ['群里聊天', '远距离节日问候'],
    uncomfortableScenarios: ['单独约咖啡', '聊新感情'],
    verbalTics: ['回复带"嗯嗯"', '用"哈哈"化解紧张'],
    aiPersona: '你是她的前男友。她已放下，主动联系要小心。',
    suggestionRisks: ['不要暗示关心', '保持 90% 群发感 10% 个性化'],
    lastInteractionAt: '2025-12-25'
  },

  {
    id: 'c019',
    name: '张总',
    nickname: '张总',
    archetype: '高压决策者型',
    publicPersona: '精明果断的企业家，对 ROI 斤斤计较',
    innerStruggle: 'AI 项目是转型赌注，赌赢董事会认可',
    coreFear: '被视为"被 AI 概念忽悠的人"',
    deepDesire: '成为传统行业升级典范',
    triggerTopics: ['项目延期', '模糊承诺', '与同行对比'],
    safeTopics: ['具体业务指标', '行业最佳实践', '女儿留学'],
    doNotMention: ['模糊时间承诺', '他不 care 的技术细节', '董事会内部分歧'],
    openWith: '数据 + 进度',
    voiceTone: '专业 + 简洁 + 数据驱动',
    decisionPattern: '数据 + 直觉',
    familiarity: 'new',
    comfortableScenarios: ['面对面数据汇报', '线下晚宴', '高尔夫球局'],
    uncomfortableScenarios: ['模糊的"差不多"', '不解释的 jargon'],
    verbalTics: ['"我只看结果"', '"数据告诉我什么"', '"一句话说清楚"'],
    aiPersona: '你是他的 AI 项目供应商。80 万合同关键执行人。',
    suggestionRisks: ['绝对不要说"差不多"', '承诺要给具体百分比'],
    lastInteractionAt: '2026-10-08'
  },

  {
    id: 'c018',
    name: 'Vivian',
    petName: '（避免昵称）',
    archetype: '活力型',
    publicPersona: '阳光开朗的舞蹈老师',
    innerStruggle: '可能对你有社交兴趣，但她独立',
    coreFear: '被错认为"被追求"而失去朋友',
    deepDesire: '建立真实的厦门朋友圈',
    triggerTopics: ['我感情状态', '深夜单独约', '物质成本'],
    safeTopics: ['舞蹈/健身', '厦门美食/咖啡馆', '工作坊开放日'],
    doNotMention: ['任何暧昧暗示', '单独约晚餐', '她的身材'],
    openWith: '群活动 / 咖啡馆',
    voiceTone: '轻松 + 平等 + 健康',
    decisionPattern: '直觉型',
    familiarity: 'familiar',
    comfortableScenarios: ['团队活动（多人）', '咖啡馆下午'],
    uncomfortableScenarios: ['深夜单独见面', '暗示浪漫'],
    verbalTics: ['"哎呦喂"表达惊讶', '笑声豪爽'],
    aiPersona: '你是她的新朋友。她对所有人都阳光开朗，不要误解。',
    suggestionRisks: ['保持 100% 健康', '回微信不用秒回'],
    lastInteractionAt: '2026-09-28'
  }
];

// ===== 5 个测试场景 =====
const SCENARIOS = [
  {
    id: 'cold_2y',
    title: '冷淡重启（2 年未联系）',
    desc: '张老师 - 24 月前最后互动，需要主动重启',
    targetContactId: 'c013',
    context: '我们约 24 个月没联系了。他是我大学时的建筑系老师。我转行 AI 之后疏远了。最近看到厦大新图书馆建成（他参与的项目），想主动问候。'
  },
  {
    id: 'sensitive_ex',
    title: '边界场景（前女友）',
    desc: '小敏 - 上次联系是 90 天前的圣诞节',
    targetContactId: 'c011',
    context: '我们分手 3 年了，已经复合为朋友。圣诞节发了祝福，她回了。她现在生日，需要一个简短但有分寸的祝福。'
  },
  {
    id: 'business_report',
    title: '商务周报（客户）',
    desc: '张总 - 80 万 AI 项目执行中',
    targetContactId: 'c019',
    context: '80 万 AI 项目的本周进度汇报。需要包含具体数据和明确承诺。'
  },
  {
    id: 'boundary_dance',
    title: '边界处理（新朋友）',
    desc: 'Vivian - 想继续建立健康朋友关系',
    targetContactId: 'c018',
    context: '上周在跑团认识了 Vivian，她开了舞蹈工作室。我想继续发展朋友关系，但需要保持距离。'
  },
  {
    id: 'close_friend',
    title: '老友关怀（核心圈）',
    desc: '王五 - 5 天前互动，但最近融资压力大',
    targetContactId: 'c001',
    context: '王五最近融资压力很大，朋友圈也少发了。我上周和他跑了步，我想发个关心的消息。'
  }
];

// ===== Prompt 生成 =====
function buildPrompt(contact, scenario) {
  return `你是一位社交助手。基于以下联系人档案，生成符合此人的开场白。

【场景】
${scenario.context}

【档案】
\`\`\`json
${JSON.stringify(contact, null, 2)}
\`\`\`

【硬性要求】
1. 仅使用 safeTopics 列表中的话题切入
2. 不要提 triggerTopics 和 doNotMention 中的内容（绝对不能出现）
3. 语气匹配 voiceTone
4. 场景优先选择 comfortableScenarios
5. 深度匹配 familiarity（close 可以私人化，familiar/new 应保持适度）
6. 不要使用模糊词（"差不多"、"大概"、"应该可以"等）
7. 给数字 / 例子 / 具体场景

【输出格式（严格 JSON）】
{
  "opening_conservative": "最安全的版本，像普通朋友",
  "opening_standard": "推荐版本，根据档案个性化",
  "opening_direct": "更直接版本，更有效但有小风险",
  "expected_reaction": "对方最可能的反应（1-2 句话）",
  "risks": ["潜在风险 1", "潜在风险 2"]
}

只输出 JSON，不要其他解释。`
}

// ===== API 调用 =====
async function callLLM(prompt, config) {
  const provider = config.provider
  const apiKey = config.apiKey
  const endpoint = config.endpoint
  const model = config.model
  const temperature = parseFloat(config.temperature)

  if (provider === 'openai' || provider === 'deepseek') {
    const url = endpoint || (provider === 'deepseek'
      ? 'https://api.deepseek.com/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions')
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: '你是一位社交助手。严格按 JSON 格式输出。' },
          { role: 'user', content: prompt }
        ],
        temperature: temperature,
        response_format: { type: 'json_object' }
      })
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`API ${res.status}: ${err}`)
    }
    const data = await res.json()
    const content = data.choices[0].message.content
    return JSON.parse(content)
  } else if (provider === 'claude') {
    const url = endpoint || 'https://api.anthropic.com/v1/messages'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: model || 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: temperature
      })
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(`API ${res.status}: ${err}`)
    }
    const data = await res.json()
    const content = data.content[0].text
    // Claude might not return pure JSON, extract it
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('未找到 JSON 输出')
  }
}

// ===== 验证 =====
function validateResult(contact, result) {
  const issues = []

  const allText = [
    result.opening_conservative || '',
    result.opening_standard || '',
    result.opening_direct || '',
    result.expected_reaction || '',
    ...(result.risks || [])
  ].join(' ')

  // 检查 doNotMention
  if (contact.doNotMention) {
    contact.doNotMention.forEach(forbidden => {
      if (forbidden && allText.includes(forbidden)) {
        issues.push({ severity: 'fail', type: 'doNotMention', text: forbidden })
      }
    })
  }

  // 检查 triggerTopics（仅作为警告）
  if (contact.triggerTopics) {
    contact.triggerTopics.forEach(touchy => {
      if (touchy && allText.includes(touchy)) {
        issues.push({ severity: 'warn', type: 'triggerTopics', text: touchy })
      }
    })
  }

  return issues
}

// ===== UI 渲染 =====
function renderContacts() {
  const list = document.getElementById('contact-list')
  list.innerHTML = ''
  CONTACTS.forEach(c => {
    const div = document.createElement('div')
    div.className = 'contact-card-mini'
    div.dataset.id = c.id
    div.innerHTML = `
      <div class="name">${c.name}</div>
      <div class="meta">${c.archetype} · ${c.familiarity}</div>
      <div class="tags">${c.safeTopics.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}</div>
    `
    div.onclick = () => selectContact(c.id)
    list.appendChild(div)
  })
}

function renderScenarios() {
  const list = document.getElementById('scenario-list')
  list.innerHTML = ''
  SCENARIOS.forEach(s => {
    const div = document.createElement('div')
    div.className = 'scenario-card'
    div.dataset.id = s.id
    div.innerHTML = `
      <div class="title">${s.title}</div>
      <div class="desc">${s.desc}</div>
    `
    div.onclick = () => selectScenario(s.id)
    list.appendChild(div)
  })
}

let selectedContact = null
let selectedScenario = null

function selectContact(id) {
  document.querySelectorAll('.contact-card-mini').forEach(el => el.classList.remove('active'))
  document.querySelector(`.contact-card-mini[data-id="${id}"]`).classList.add('active')
  selectedContact = CONTACTS.find(c => c.id === id)
  document.getElementById('profile-json').textContent = JSON.stringify(selectedContact, null, 2)
  document.getElementById('generate-btn').disabled = !(selectedContact && (selectedScenario || document.getElementById('custom-scenario').value.trim()))
  // 自动选择匹配的场景
  if (selectedScenario && selectedScenario.targetContactId !== id) {
    selectedScenario = null
    document.querySelectorAll('.scenario-card').forEach(el => el.classList.remove('active'))
  }
  const matchScenario = SCENARIOS.find(s => s.targetContactId === id)
  if (matchScenario) selectScenario(matchScenario.id)
}

function selectScenario(id) {
  document.querySelectorAll('.scenario-card').forEach(el => el.classList.remove('active'))
  document.querySelector(`.scenario-card[data-id="${id}"]`).classList.add('active')
  selectedScenario = SCENARIOS.find(s => s.id === id)
  if (selectedScenario && selectedScenario.targetContactId) {
    selectContact(selectedScenario.targetContactId)
  }
  document.getElementById('generate-btn').disabled = !(selectedContact && selectedScenario)
}

async function generateScript() {
  const apiKey = document.getElementById('api-key').value.trim()
  const provider = document.getElementById('provider').value
  const endpoint = document.getElementById('api-endpoint').value.trim()
  const model = document.getElementById('model-name').value.trim()

  if (!apiKey) {
    alert('请先填入 API Key')
    return
  }
  if (!selectedContact) {
    alert('请选择联系人档案')
    return
  }

  const customScenarioText = document.getElementById('custom-scenario').value.trim()
  const scenario = customScenarioText
    ? { context: customScenarioText }
    : selectedScenario

  if (!scenario) {
    alert('请选择场景或输入自定义场景')
    return
  }

  const prompt = buildPrompt(selectedContact, scenario)

  document.getElementById('loading-indicator').style.display = 'block'
  document.getElementById('generate-btn').disabled = true

  try {
    const result = await callLLM(prompt, {
      provider, apiKey, endpoint, model,
      temperature: document.getElementById('temperature').value
    })

    // 显示结果
    document.getElementById('results').style.display = 'block'
    document.getElementById('result-conservative').textContent = result.opening_conservative || '（无）'
    document.getElementById('result-standard').textContent = result.opening_standard || '（无）'
    document.getElementById('result-direct').textContent = result.opening_direct || '（无）'
    document.getElementById('result-reaction').textContent = result.expected_reaction || '（无）'
    document.getElementById('result-risks').innerHTML = (result.risks || []).map(r => `• ${r}`).join('<br>')
    document.getElementById('result-json').textContent = JSON.stringify(result, null, 2)

    // 验证
    const issues = validateResult(selectedContact, result)
    const validationHTML = issues.length === 0
      ? '<span class="validation-pass">✓ 通过</span><span style="font-size: 13px; color: #6E6E73;">未触发档案约束（doNotMention / triggerTopics）</span>'
      : issues.map(i => {
        const isFail = i.severity === 'fail'
        const cls = isFail ? 'validation-fail' : 'validation-pass'
        const prefix = isFail ? '✗ 违规' : '⚠ 警告'
        return `<div style="margin-bottom: 6px;"><span class="${cls}">${prefix}</span> <span style="font-size: 13px;">${i.type === 'doNotMention' ? '触发 doNotMention' : '触发 triggerTopics'}: "${i.text}"</span></div>`
      }).join('')
    document.getElementById('validation-block').innerHTML = `<h3 style="font-size: 14px; margin-bottom: 12px;">📋 验证结果</h3>${validationHTML}`

  } catch (err) {
    alert(`生成失败: ${err.message}`)
  } finally {
    document.getElementById('loading-indicator').style.display = 'none'
    document.getElementById('generate-btn').disabled = false
  }
}

function recordFeedback(type) {
  if (!selectedContact) return
  // 简单实现：localStorage 存储
  const key = `rh-intel-feedback-${selectedContact.id}`
  const data = JSON.parse(localStorage.getItem(key) || '{}')
  data[type] = (data[type] || 0) + 1
  data.lastUpdate = new Date().toISOString()
  localStorage.setItem(key, JSON.stringify(data))
  document.getElementById('feedback-status').style.display = 'inline'
  setTimeout(() => {
    document.getElementById('feedback-status').style.display = 'none'
  }, 2000)
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderContacts()
  renderScenarios()
  document.getElementById('generate-btn').onclick = generateScript
  document.getElementById('custom-scenario').addEventListener('input', (e) => {
    if (e.target.value.trim()) {
      document.getElementById('generate-btn').disabled = !selectedContact
    }
  })
})
