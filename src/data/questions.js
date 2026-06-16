export const dimensions = {
  start: {
    name: "AI启动度",
    personality: "灵感启动型",
    description: "测量用户是否习惯用 AI 启动思考、降低空白感、打开任务入口。"
  },
  control: {
    name: "指挥控制度",
    personality: "指挥官型",
    description: "测量用户是否能明确控制 AI 的输出方向、格式、边界和最终判断权。"
  },
  cocreate: {
    name: "共创循环度",
    personality: "共创搭子型",
    description: "测量用户是否把 AI 当作可以多轮讨论、发散、修正和共同生成想法的对象。"
  },
  audit: {
    name: "信任审计度",
    personality: "怀疑审计型",
    description: "测量用户是否会核查 AI、要求依据、寻找反例，并意识到 AI 可能出错。"
  },
  outsource: {
    name: "任务外包度",
    personality: "效率外包型",
    description: "测量用户是否愿意把整理、归纳、润色、初稿、计划等任务交给 AI 完成。"
  },
  emotion: {
    name: "情绪投射度",
    personality: "情绪镜像型",
    description: "测量用户是否会把 AI 当作情绪回应、压力整理、自我理解的对象。"
  }
};

export const questions = [
  {
    id: "A1",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "遇到一个新任务时，我经常会先问 AI 该怎么开始。",
    reverse: false,
    rationale: "测量用户是否存在“先问 AI”的启动习惯，是灵感启动型的核心表现。"
  },
  {
    id: "A2",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "如果不先问 AI，我有时会觉得任务很难进入状态。",
    reverse: false,
    rationale: "测量空白焦虑，判断用户是否把 AI 当作任务启动器。"
  },
  {
    id: "A3",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "AI 给出的第一版思路，常常会影响我后续的方向。",
    reverse: false,
    rationale: "测量 AI 对用户思考路径和方向选择的影响。"
  },
  {
    id: "A4",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "我会用 AI 帮我把模糊的问题变成具体问题。",
    reverse: false,
    rationale: "测量 AI 是否承担了问题定义和问题澄清的作用。"
  },
  {
    id: "A5",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "当我不知道从哪里下手时，AI 能让我更快开始行动。",
    reverse: false,
    rationale: "测量 AI 是否能降低用户的行动门槛。"
  },
  {
    id: "A6",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "我经常先让 AI 给一个大概框架，再自己慢慢调整。",
    reverse: false,
    rationale: "测量用户是否依赖 AI 提供初始框架。"
  },
  {
    id: "A7",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "我通常会先自己想清楚，再让 AI 帮我补充或修改。",
    reverse: true,
    rationale: "反向题，用来区分“先自我思考”与“先 AI 启动”。"
  },
  {
    id: "A8",
    dimension: "start",
    dimensionName: "AI启动度",
    text: "即使没有 AI，我也能比较顺利地开始大多数任务。",
    reverse: true,
    rationale: "反向题，用来判断用户是否对 AI 启动存在依赖。"
  },

  {
    id: "B1",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "我使用 AI 时，通常会给出明确的格式、字数、风格或限制。",
    reverse: false,
    rationale: "测量用户指令是否清晰，是指挥官型的核心表现。"
  },
  {
    id: "B2",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "如果 AI 的回答偏离我的想法，我会立刻要求它修改。",
    reverse: false,
    rationale: "测量用户是否会主动纠偏，而不是被动接受 AI 输出。"
  },
  {
    id: "B3",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "我更希望 AI 按照我的设想执行，而不是替我决定方向。",
    reverse: false,
    rationale: "测量用户是否保留最终主导权。"
  },
  {
    id: "B4",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "我会明确告诉 AI 哪些内容必须保留，哪些内容不能出现。",
    reverse: false,
    rationale: "测量用户是否能设定清楚的输出边界。"
  },
  {
    id: "B5",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "我经常会要求 AI 按照我给出的模板或结构来完成任务。",
    reverse: false,
    rationale: "测量用户对输出形式和任务结构的控制能力。"
  },
  {
    id: "B6",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "我会根据自己的判断筛选 AI 的回答，而不是全部接受。",
    reverse: false,
    rationale: "测量用户是否保留选择权和二次判断。"
  },
  {
    id: "B7",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "AI 给出一个完整方案后，我通常会直接顺着它做。",
    reverse: true,
    rationale: "反向题，用来识别用户是否容易被 AI 带走。"
  },
  {
    id: "B8",
    dimension: "control",
    dimensionName: "指挥控制度",
    text: "我很少修改 AI 给出的结果，通常觉得它已经够用了。",
    reverse: true,
    rationale: "反向题，用来测量用户是否缺少主动控制和二次加工。"
  },

  {
    id: "C1",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "我经常和 AI 进行多轮讨论，而不是只问一次。",
    reverse: false,
    rationale: "测量用户是否具有多轮互动倾向。"
  },
  {
    id: "C2",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "我喜欢让 AI 提供多个版本，再从中筛选和组合。",
    reverse: false,
    rationale: "测量用户是否把 AI 用作脑暴和方案池。"
  },
  {
    id: "C3",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "AI 的回答经常会激发我新的想法。",
    reverse: false,
    rationale: "测量 AI 是否在用户创意过程中发挥灵感触发作用。"
  },
  {
    id: "C4",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "我会不断追问 AI，让它换角度、换风格或继续发散。",
    reverse: false,
    rationale: "测量用户在人机共创中的迭代能力。"
  },
  {
    id: "C5",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "我经常把自己的想法和 AI 的回答混合在一起形成新方案。",
    reverse: false,
    rationale: "测量人机共创中的融合程度。"
  },
  {
    id: "C6",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "我喜欢把 AI 当作一个可以陪我 brainstorm 的对象。",
    reverse: false,
    rationale: "测量用户是否把 AI 感知为创意搭子。"
  },
  {
    id: "C7",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "我通常只需要 AI 给我一个最终答案，不太想反复讨论。",
    reverse: true,
    rationale: "反向题，用来区分共创型用户和一次性答案型用户。"
  },
  {
    id: "C8",
    dimension: "cocreate",
    dimensionName: "共创循环度",
    text: "如果 AI 第一次回答不理想，我一般不会继续追问。",
    reverse: true,
    rationale: "反向题，用来判断用户是否缺少循环互动倾向。"
  },

  {
    id: "D1",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "对于事实、文献、数据类回答，我会要求 AI 给出依据或核查方法。",
    reverse: false,
    rationale: "测量用户是否具有事实核查意识。"
  },
  {
    id: "D2",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "我会让 AI 指出自己回答中的漏洞、风险或反例。",
    reverse: false,
    rationale: "测量用户是否会主动要求 AI 进行自我反驳和风险提示。"
  },
  {
    id: "D3",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "如果不同 AI 给出不同答案，我会继续比较，而不是直接相信其中一个。",
    reverse: false,
    rationale: "测量用户是否具有多源比较意识。"
  },
  {
    id: "D4",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "我经常会问 AI：“你确定吗？”或“这个说法可靠吗？”",
    reverse: false,
    rationale: "测量用户对 AI 权威感和流畅表达的警惕程度。"
  },
  {
    id: "D5",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "我会区分 AI 的“表达流畅”和“内容可靠”是两回事。",
    reverse: false,
    rationale: "测量用户是否理解 AI 回答存在语言幻觉风险。"
  },
  {
    id: "D6",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "在重要问题上，我不会只依靠 AI 的回答做决定。",
    reverse: false,
    rationale: "测量用户是否保留决策责任和风险意识。"
  },
  {
    id: "D7",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "只要 AI 说得有条理，我一般就会相信它。",
    reverse: true,
    rationale: "反向题，用来测量用户是否容易被流畅表达说服。"
  },
  {
    id: "D8",
    dimension: "audit",
    dimensionName: "信任审计度",
    text: "我很少怀疑 AI 的回答，因为它通常看起来很专业。",
    reverse: true,
    rationale: "反向题，用来测量用户是否存在盲目信任倾向。"
  },

  {
    id: "E1",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "我愿意把整理、归纳、润色、排版等任务交给 AI 完成。",
    reverse: false,
    rationale: "测量基础任务外包倾向。"
  },
  {
    id: "E2",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "我经常让 AI 先生成初稿，再由我修改。",
    reverse: false,
    rationale: "测量用户是否习惯把初稿生产交给 AI。"
  },
  {
    id: "E3",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "我认为 AI 很适合承担“中间劳动”，比如发散、拆解、压缩和重组。",
    reverse: false,
    rationale: "测量用户是否把 AI 当作工作流中的中间层。"
  },
  {
    id: "E4",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "我使用 AI 最主要的原因之一是节省时间。",
    reverse: false,
    rationale: "测量用户使用 AI 的效率动机。"
  },
  {
    id: "E5",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "遇到重复性、格式性任务时，我会优先想到让 AI 帮忙。",
    reverse: false,
    rationale: "测量用户是否倾向于把低创造性任务交给 AI。"
  },
  {
    id: "E6",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "我会把 AI 当作一个可以快速执行任务的助手。",
    reverse: false,
    rationale: "测量用户对 AI 的工具化和执行助手定位。"
  },
  {
    id: "E7",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "我只在完全不会做的时候才会使用 AI。",
    reverse: true,
    rationale: "反向题，用来区分“备用工具型使用”和“日常外包型使用”。"
  },
  {
    id: "E8",
    dimension: "outsource",
    dimensionName: "任务外包度",
    text: "即使 AI 能节省时间，我也更习惯自己完成大部分整理工作。",
    reverse: true,
    rationale: "反向题，用来测量用户的任务外包意愿是否较低。"
  },

  {
    id: "F1",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "当我焦虑、纠结或没动力时，我会向 AI 表达自己的状态。",
    reverse: false,
    rationale: "测量用户是否会向 AI 表达情绪。"
  },
  {
    id: "F2",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "AI 有时能帮我把混乱的情绪整理成具体问题。",
    reverse: false,
    rationale: "测量 AI 是否被用户当作情绪镜子。"
  },
  {
    id: "F3",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "AI 的回应有时会让我产生“被理解”的感觉。",
    reverse: false,
    rationale: "测量用户在 AI 互动中的被理解感。"
  },
  {
    id: "F4",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "我会让 AI 帮我分析自己为什么会纠结、焦虑或逃避。",
    reverse: false,
    rationale: "测量用户是否借助 AI 进行自我解释。"
  },
  {
    id: "F5",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "当我不知道如何表达感受时，我会让 AI 帮我把它说清楚。",
    reverse: false,
    rationale: "测量 AI 是否参与用户的情绪语言组织。"
  },
  {
    id: "F6",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "我有时会把 AI 当作一个安全的倾诉对象。",
    reverse: false,
    rationale: "测量用户是否把 AI 视为低风险表达空间。"
  },
  {
    id: "F7",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "我几乎不会和 AI 聊非任务性的内容。",
    reverse: true,
    rationale: "反向题，用来区分工具型使用和情绪型使用。"
  },
  {
    id: "F8",
    dimension: "emotion",
    dimensionName: "情绪投射度",
    text: "我不太会向 AI 表达个人情绪，因为我觉得它只是工具。",
    reverse: true,
    rationale: "反向题，用来测量用户是否拒绝向 AI 进行情绪投射。"
  }
];