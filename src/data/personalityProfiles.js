export const personalityProfiles = {
  start: {
    typeId: "start",
    displayName: "Spark Starter",
    cnName: "灵感启动型",
    image: "/mascots/spark-starter.png",
    avatarImage: "/mascots/optimized/spark-starter-avatar.png",
    heroImage: "/mascots/optimized/spark-starter-hero.png",
    taglineEn: "You use AI to light up the first step.",
    taglineCn: "你习惯让 AI 帮你从空白中找到第一个入口。",
    keywords: ["启动思路", "打开空白", "快速进入状态"],
    strength: "你很擅长借助 AI 找到任务的第一个入口，不容易一直卡在空白里。",
    risk: "需要注意的是，AI 给出的第一版框架不一定就是最适合你的方向。",
    strategy: "可以先让 AI 提供多个入口，再由你自己设定判断标准。",
    prompt: "我现在不知道怎么开始。请先给我 5 个可能方向，并说明每个方向适合什么情况。"
  },
  control: {
    typeId: "control",
    displayName: "Prompt Commander",
    cnName: "指令指挥型",
    image: "/mascots/prompt-commander.png",
    avatarImage: "/mascots/optimized/prompt-commander-avatar.png",
    heroImage: "/mascots/optimized/prompt-commander-hero.png",
    taglineEn: "You know what you want, and AI follows your lead.",
    taglineCn: "你更像一个指挥者，会清楚告诉 AI 做什么、怎么做、不要做什么。",
    keywords: ["明确指令", "控制输出", "保留主导权"],
    strength: "你能清楚地向 AI 表达目标、格式、限制和风格要求，不容易被 AI 带偏。",
    risk: "如果控制太强，可能会错过 AI 自由发散带来的意外灵感。",
    strategy: "可以先让 AI 自由发散一轮，再用你的标准进行筛选和收束。",
    prompt: "请严格按照以下要求完成：目标是____，风格是____，不要出现____，结构分为____。"
  },
  cocreate: {
    typeId: "cocreate",
    displayName: "Co-Creator",
    cnName: "共创协作型",
    image: "/mascots/co-creator.png",
    avatarImage: "/mascots/optimized/co-creator-avatar.png",
    heroImage: "/mascots/optimized/co-creator-hero.png",
    taglineEn: "You think with AI, not just ask AI.",
    taglineCn: "你不是只向 AI 要答案，而是和 AI 一起把想法聊出来。",
    keywords: ["多轮对话", "脑暴", "共同生成"],
    strength: "你擅长通过追问、修改和重组，让 AI 成为创意搭子。",
    risk: "脑洞太多时容易越聊越散，最后难以收束。",
    strategy: "每次发散后，要求 AI 按可行性、独特性和完成难度排序。",
    prompt: "请先给我 10 个大胆方向，再按可行性、独特性和完成难度排序，推荐最值得继续打磨的 2 个。"
  },
  audit: {
    typeId: "audit",
    displayName: "Critical Auditor",
    cnName: "批判审计型",
    image: "/mascots/critical-auditor.png",
    avatarImage: "/mascots/optimized/critical-auditor-avatar.png",
    heroImage: "/mascots/optimized/critical-auditor-hero.png",
    taglineEn: "You trust AI, but you verify.",
    taglineCn: "你不会因为 AI 说得流畅就轻易相信，而是会追问依据、风险和漏洞。",
    keywords: ["核查依据", "寻找漏洞", "风险意识"],
    strength: "你能意识到 AI 可能出错，会主动检查答案的可靠性。",
    risk: "如果一直停在审查阶段，可能会降低推进速度。",
    strategy: "可以先审查关键结论，再把低风险部分交给 AI 快速执行。",
    prompt: "请检查你刚才的回答：哪些地方可能不准确？需要哪些证据支持？有没有反例？"
  },
  outsource: {
    typeId: "outsource",
    displayName: "Task Delegator",
    cnName: "任务外包型",
    image: "/mascots/task-delegator.png",
    avatarImage: "/mascots/optimized/task-delegator-avatar.png",
    heroImage: "/mascots/optimized/task-delegator-hero.png",
    taglineEn: "You know what to hand over to AI.",
    taglineCn: "你擅长把重复性、中间性的任务交给 AI，提高效率。",
    keywords: ["整理归纳", "节省时间", "执行助手"],
    strength: "你很会把整理、归纳、润色、排版等任务交给 AI 处理。",
    risk: "AI 帮你完成材料，不代表你已经真正理解内容。",
    strategy: "让 AI 做初步整理后，你需要进行最后一轮判断和修改。",
    prompt: "请把以下内容整理成清晰表格，并标出重点、遗漏信息和下一步行动。"
  },
  emotion: {
    typeId: "emotion",
    displayName: "Emotion Reflector",
    cnName: "情绪镜像型",
    image: "/mascots/emotion-reflector.png",
    avatarImage: "/mascots/optimized/emotion-reflector-avatar.png",
    heroImage: "/mascots/optimized/emotion-reflector-hero.png",
    taglineEn: "You use AI to reflect what you feel.",
    taglineCn: "你会借助 AI 把说不清的感受整理成更清楚的问题。",
    keywords: ["情绪整理", "自我复盘", "表达感受"],
    strength: "你能借助 AI 把模糊的情绪、压力和纠结整理成具体问题。",
    risk: "AI 可以帮助整理情绪，但不能替代真实关系和现实行动。",
    strategy: "先让 AI 帮你命名情绪，再拆解出一个现实中可以做的小行动。",
    prompt: "我现在感觉很乱。请不要急着给建议，先帮我区分：我在担心什么、我真正需要什么、我现在能做的第一步是什么。"
  }
};

export const ENERGY_LABELS = {
  start: "点火力",
  control: "控场力",
  cocreate: "共创力",
  audit: "查错力",
  outsource: "代办力",
  emotion: "共感力",
};

export const PERSONA_ORDER = [
  "灵感启动型",
  "指挥官型",
  "共创搭子型",
  "怀疑审计型",
  "效率外包型",
  "情绪镜像型",
];

const HIGH_THRESHOLD = 60;

const PROFILE_META = {
  start: {
    persona: "灵感启动型",
    key: "spark",
    code: "SS",
    mascot: "Spark Starter 角色图",
    colors: { bg: "from-amber-100 via-white to-cyan-100", accent: "#f59e0b", dark: "#4a2f04", soft: "#fff7d6" },
  },
  control: {
    persona: "指挥官型",
    key: "commander",
    code: "PC",
    mascot: "Prompt Commander 角色图",
    colors: { bg: "from-orange-100 via-white to-sky-100", accent: "#fb923c", dark: "#3b2412", soft: "#ffedd5" },
  },
  cocreate: {
    persona: "共创搭子型",
    key: "creator",
    code: "CC",
    mascot: "Co-Creator 角色图",
    colors: { bg: "from-fuchsia-100 via-white to-cyan-100", accent: "#a855f7", dark: "#351a54", soft: "#f5e8ff" },
  },
  audit: {
    persona: "怀疑审计型",
    key: "auditor",
    code: "CA",
    mascot: "Critical Auditor 角色图",
    colors: { bg: "from-slate-100 via-white to-emerald-100", accent: "#0f766e", dark: "#132f2b", soft: "#dff7ef" },
  },
  outsource: {
    persona: "效率外包型",
    key: "delegator",
    code: "TD",
    mascot: "Task Delegator 角色图",
    colors: { bg: "from-lime-100 via-white to-amber-100", accent: "#65a30d", dark: "#26350c", soft: "#ecfccb" },
  },
  emotion: {
    persona: "情绪镜像型",
    key: "reflector",
    code: "ER",
    mascot: "Emotion Reflector 角色图",
    colors: { bg: "from-indigo-100 via-white to-cyan-100", accent: "#38bdf8", dark: "#17324d", soft: "#e0f7ff" },
  },
};

export const PERSONALITY_CODE_RESULTS = {
  SCMA: {
    englishName: "Creative Director",
    chineseName: "灵感导演",
    portrait: "你既能点燃想法，也能把混乱灵感排成一场有节奏的演出。",
    catchphrase: "先发散，再让我来定调。",
    risk: "容易同时想要创意和控制，导致别人跟不上你的节奏。",
    prompt: "请先给我 8 个创意方向，再按目标、受众和执行难度筛成 2 个最值得推进的版本。",
  },
  SCMR: {
    englishName: "Idea Magician",
    chineseName: "点子魔术师",
    portrait: "你很会把空白变成惊喜，AI 对你来说像一顶会冒点子的帽子。",
    catchphrase: "再来一个更妙的版本。",
    risk: "灵感来得太快时，可能会忽略事实核查和落地成本。",
    prompt: "请给我 10 个脑洞方案，每个都附一个最小可执行版本和一个需要核查的风险点。",
  },
  SCDA: {
    englishName: "Workflow Director",
    chineseName: "流程导演",
    portrait: "你擅长把 AI 变成高效片场，创意、任务和质量标准都有位置。",
    catchphrase: "把想法拆成流程，马上开拍。",
    risk: "容易把事情推进得很快，但留给探索和感受的空间偏少。",
    prompt: "请把这个目标拆成流程表：输入、步骤、产出、检查点和需要我亲自确认的部分。",
  },
  SCDR: {
    englishName: "Fast Operator",
    chineseName: "快速操盘手",
    portrait: "你启动快、指令清楚，也很愿意让 AI 先把事情跑起来。",
    catchphrase: "先给我一版能用的。",
    risk: "速度很快时，容易默认第一版已经足够好。",
    prompt: "请先生成一个可用初稿，再列出 5 个我必须人工检查的地方。",
  },
  SFMA: {
    englishName: "Chaos Curator",
    chineseName: "脑洞策展人",
    portrait: "你能在一堆松散想法里挑出有趣的线索，并把它们摆成展览。",
    catchphrase: "别急着收，先看看还有什么可能。",
    risk: "越聊越丰富时，可能迟迟不进入执行。",
    prompt: "请陪我发散 12 个方向，然后按新鲜感、可行性和风险做一次策展式筛选。",
  },
  SFMR: {
    englishName: "Idea Surfer",
    chineseName: "灵感冲浪手",
    portrait: "你喜欢踩着 AI 的回答往前滑，享受不断出现的新方向。",
    catchphrase: "顺着这个感觉继续往下聊。",
    risk: "容易被好玩的想法带远，忘记原来的目标。",
    prompt: "请每轮只扩展 3 个方向，并在最后提醒我：哪个最贴近原始目标。",
  },
  SFDA: {
    englishName: "Risky Launcher",
    chineseName: "冒险启动器",
    portrait: "你很会启动任务，也愿意快速外包，但有时会先冲再补检查。",
    catchphrase: "先动起来，路上再修。",
    risk: "可能把未经确认的内容太快交给 AI 执行。",
    prompt: "请快速列出执行清单，同时用醒目标记哪些步骤风险最高、必须先确认。",
  },
  SFDR: {
    englishName: "Lazy Genius",
    chineseName: "偷懒天才",
    portrait: "你很懂得让 AI 帮自己省力，也常能用最少动作撬开任务。",
    catchphrase: "有没有更省事的办法？",
    risk: "省力很有效，但可能让你跳过必要的理解和复盘。",
    prompt: "请用最省力的方式帮我完成第一版，并列出我不能偷懒的 3 个检查点。",
  },
  OCMA: {
    englishName: "Prompt Architect",
    chineseName: "提示词建筑师",
    portrait: "你不急着从空白起飞，更擅长搭好结构，让 AI 在清晰框架里发挥。",
    catchphrase: "先把规则和结构搭好。",
    risk: "结构感很强时，可能会压住意外灵感。",
    prompt: "请基于我的目标设计一套提示词框架，包含角色、任务、限制、输出格式和评估标准。",
  },
  OCMR: {
    englishName: "Creative Pilot",
    chineseName: "创意飞行员",
    portrait: "你像驾驶员一样掌控方向，同时愿意和 AI 一起飞出新路线。",
    catchphrase: "方向我来定，路线可以一起试。",
    risk: "如果只追求表达顺畅，可能会忽略关键证据。",
    prompt: "请在我设定的方向内，提供 5 条不同创意路线，并说明每条路线的适用场景。",
  },
  OCDA: {
    englishName: "Quality Controller",
    chineseName: "质量管控官",
    portrait: "你很适合把 AI 纳入工作流，但会守住标准和检查关。",
    catchphrase: "可以交给 AI，但最后我要验收。",
    risk: "检查标准太多时，可能让小任务也变得很重。",
    prompt: "请完成这项任务，并附上自检表：准确性、完整性、格式、风险和待确认信息。",
  },
  OCDR: {
    englishName: "Task Captain",
    chineseName: "任务队长",
    portrait: "你很清楚什么该交给 AI，也知道如何把任务指挥到终点。",
    catchphrase: "按我的路线，直接执行。",
    risk: "容易过度追求效率，错过更有创造性的解法。",
    prompt: "请按以下步骤执行，不要扩展范围；完成后给我一份简短复核清单。",
  },
  OFMA: {
    englishName: "Reflective Maker",
    chineseName: "反思制造者",
    portrait: "你不急着命令 AI，而是通过讨论和审视，把想法慢慢做成形。",
    catchphrase: "我们先想清楚，再做出来。",
    risk: "反思很多时，可能行动启动偏慢。",
    prompt: "请先帮我澄清目标和风险，再一起生成 3 个稳妥但有创意的方案。",
  },
  OFMR: {
    englishName: "Daydream Builder",
    chineseName: "白日梦建造师",
    portrait: "你会把模糊感受和想象交给 AI，一点点搭成可表达的东西。",
    catchphrase: "我还说不清，但感觉在这里。",
    risk: "容易停留在氛围和可能性里，缺少收束动作。",
    prompt: "请先帮我把这个模糊想法描述清楚，再整理成一个可以开始的小计划。",
  },
  OFDA: {
    englishName: "Careful Helper",
    chineseName: "谨慎助手派",
    portrait: "你使用 AI 时不冒进，愿意让它帮忙，但会先确认边界和风险。",
    catchphrase: "可以帮我，但先别乱来。",
    risk: "过度谨慎时，AI 的效率优势会被削弱。",
    prompt: "请先判断这个任务哪些部分适合交给 AI，哪些必须由我确认，再开始整理。",
  },
  OFDR: {
    englishName: "Soft Delegator",
    chineseName: "温和外包家",
    portrait: "你把 AI 当作低压力助手，适合处理琐碎任务和降低负担。",
    catchphrase: "帮我轻轻整理一下就好。",
    risk: "太温和地外包，可能导致目标和标准不够清楚。",
    prompt: "请用低压力的方式帮我整理这件事：先列重点，再给一个不费力的下一步。",
  },
};

const HIDDEN_MODES = {
  high: {
    key: "high",
    englishName: "Moon Mode",
    chineseName: "月亮模式",
    label: "Moon Mode｜月亮模式",
    shortLabel: "经常聊情绪",
    description: "你会明显借 AI 接住情绪、整理压力和说不清的感受。",
  },
  medium: {
    key: "medium",
    englishName: "Soft Mode",
    chineseName: "软着陆模式",
    label: "Soft Mode｜软着陆模式",
    shortLabel: "偶尔缓解压力",
    description: "你偶尔会让 AI 帮自己缓冲压力、整理心情，但仍主要围绕任务推进。",
  },
  low: {
    key: "low",
    englishName: "Tool Mode",
    chineseName: "工具模式",
    label: "Tool Mode｜工具模式",
    shortLabel: "很少聊情绪",
    description: "你更倾向把 AI 当作工具和执行助手，很少让它参与情绪整理。",
  },
};

function createProfile(typeId) {
  const profile = personalityProfiles[typeId];
  const meta = PROFILE_META[typeId];

  return {
    ...profile,
    ...meta,
    energyName: ENERGY_LABELS[typeId],
    legacyCnName: profile.cnName,
    englishName: profile.displayName,
    chineseName: ENERGY_LABELS[typeId],
    englishLine: profile.taglineEn,
    chineseLine: profile.taglineCn,
    tags: profile.keywords,
    scenes: profile.strength,
    pitfall: profile.risk,
  };
}

const PROFILES_BY_TYPE = Object.fromEntries(
  Object.keys(personalityProfiles).map((typeId) => [typeId, createProfile(typeId)]),
);

export const PERSONA_PROFILES = Object.fromEntries(
  Object.entries(PROFILE_META).map(([typeId, meta]) => [meta.persona, PROFILES_BY_TYPE[typeId]]),
);

export const SPECIAL_PROFILES = {
  balanced: {
    key: "balanced",
    code: "AIMX",
    englishName: "Mixed Signal",
    chineseName: "混合信号体",
    mascot: "多模式切换的轻量 AI 控制台",
    englishLine: "You switch modes depending on the task.",
    chineseLine: "你的 AI 使用方式会根据场景自动切换，不固定在单一路线。",
    tags: ["多模式", "场景切换", "弹性使用"],
    prompt: "First identify the best AI collaboration mode for this task, then help me proceed in that mode.",
    colors: { bg: "from-cyan-100 via-white to-violet-100", accent: "#14b8a6", dark: "#123a3a", soft: "#dcfbf5" },
  },
  weak: {
    key: "emerging",
    code: "AIXP",
    englishName: "Pattern Explorer",
    chineseName: "模式探索员",
    mascot: "正在校准的星图界面",
    englishLine: "Your AI use pattern is still taking shape.",
    chineseLine: "你的 AI 使用方式还在成形，适合继续尝试不同协作模式。",
    tags: ["探索中", "尝试模式", "尚未定型"],
    prompt: "Show me three ways to use AI for this task: fast execution, co-thinking, and strict review.",
    colors: { bg: "from-slate-100 via-white to-cyan-100", accent: "#64748b", dark: "#1f2937", soft: "#eef2f7" },
  },
};

export const HYBRID_NAMES = Object.fromEntries(
  Object.entries(PERSONALITY_CODE_RESULTS).map(([code, profile]) => [code, profile.englishName]),
);

function getScore(scores, dimension) {
  return scores.find((score) => score.dimension === dimension) || { dimension, percent: 0 };
}

function isHigh(score) {
  return score.percent >= HIGH_THRESHOLD;
}

function getHiddenMode(emotionScore) {
  if (emotionScore.percent >= 70) return HIDDEN_MODES.high;
  if (emotionScore.percent >= 40) return HIDDEN_MODES.medium;
  return HIDDEN_MODES.low;
}

function getEnergy(score) {
  return {
    dimension: score.dimension,
    name: ENERGY_LABELS[score.dimension] || score.name,
    percent: score.percent,
    description: personalityProfiles[score.dimension]?.strength || "这是你和 AI 协作时最明显的能量。",
  };
}

export function getProfile(persona) {
  return PERSONA_PROFILES[persona] || PROFILES_BY_TYPE[persona] || SPECIAL_PROFILES.balanced;
}

export function getEnergyName(personaOrDimension) {
  const profile = getProfile(personaOrDimension);
  return profile.energyName || ENERGY_LABELS[personaOrDimension] || personaOrDimension;
}

export function formatPersonaName(persona) {
  return getEnergyName(persona);
}

export function getResultDisplay(result) {
  const scores = result.scores || [];
  const start = getScore(scores, "start");
  const control = getScore(scores, "control");
  const cocreate = getScore(scores, "cocreate");
  const audit = getScore(scores, "audit");
  const outsource = getScore(scores, "outsource");
  const emotion = getScore(scores, "emotion");

  const code = [
    isHigh(start) ? "S" : "O",
    isHigh(control) ? "C" : "F",
    cocreate.percent >= outsource.percent ? "M" : "D",
    isHigh(audit) ? "A" : "R",
  ].join("");

  const ranked = [...scores].sort((a, b) => b.percent - a.percent);
  const primaryEnergy = getEnergy(ranked[0] || start);
  const secondaryEnergy = getEnergy(ranked[1] || control);
  const hiddenMode = getHiddenMode(emotion);
  const guardian = getProfile(ranked[0]?.persona || result.profileKey);
  const codeProfile = PERSONALITY_CODE_RESULTS[code] || PERSONALITY_CODE_RESULTS.OFDR;

  return {
    ...guardian,
    ...codeProfile,
    code,
    personalityCode: code,
    englishLine: codeProfile.portrait,
    chineseLine: codeProfile.portrait,
    tags: [primaryEnergy.name, secondaryEnergy.name, hiddenMode.chineseName],
    hiddenMode,
    primaryEnergy,
    secondaryEnergy,
    guardianProfile: guardian,
  };
}







