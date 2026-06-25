// src/data/questionBankV11.js

// AI 使用人格测试 v1.1 题库
// 规则：
// 1. primaryScores 只用于四字母人格码判定。
// 2. secondarySignals 只用于结果页补充解释，不直接决定人格码。
// 3. emotionScore 只用于 Hidden Mode / 共感力。
// 4. primaryAxis 只能是 "S/O"、"C/F"、"M/D"、"A/R"。

export const dilemmaQuestions = [
  // =========================
  // S / O 轴：先让 AI 点火 vs 先自己想一步
  // =========================

  {
    id: "B_SO_01",
    type: "dilemma",
    primaryAxis: "S/O",
    title: "面对空白任务",
    text: "你要开始一个完全没头绪的任务，第一步更像是？",
    options: [
      {
        id: "A",
        text: "先问 AI：“这个可以从哪些方向开始？”",
        primaryScores: { S: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先自己想出一点方向，再让 AI 帮你补充。",
        primaryScores: { O: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_SO_02",
    type: "dilemma",
    primaryAxis: "S/O",
    title: "不知道怎么开头",
    text: "当你卡在开头时，你更希望 AI 做什么？",
    options: [
      {
        id: "A",
        text: "先给我几个入口，让我别停在空白里。",
        primaryScores: { S: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "等我把自己的想法说清楚后，再帮我整理。",
        primaryScores: { O: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_SO_03",
    type: "dilemma",
    primaryAxis: "S/O",
    title: "新任务出现时",
    text: "面对一个新任务，你更常见的状态是？",
    options: [
      {
        id: "A",
        text: "我会先让 AI 帮我把任务拆开，找到起点。",
        primaryScores: { S: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "我会先自己判断这个任务大概应该怎么做。",
        primaryScores: { O: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_SO_04",
    type: "dilemma",
    primaryAxis: "S/O",
    title: "AI 的第一版思路",
    text: "你更接近哪一种？",
    options: [
      {
        id: "A",
        text: "AI 的第一版方向常常能帮我打开局面。",
        primaryScores: { S: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "AI 的第一版方向最好建立在我已有想法上。",
        primaryScores: { O: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  // =========================
  // C / F 轴：我来控场 vs 顺着聊下去
  // =========================

  {
    id: "B_CF_01",
    type: "dilemma",
    primaryAxis: "C/F",
    title: "AI 回答跑偏",
    text: "AI 回答得不差，但明显偏离了你原本的方向。你更可能？",
    options: [
      {
        id: "A",
        text: "直接告诉它哪里偏了，让它回到我的要求。",
        primaryScores: { C: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先顺着这个方向看一看，也许会有新东西。",
        primaryScores: { F: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_CF_02",
    type: "dilemma",
    primaryAxis: "C/F",
    title: "AI 提出新角度",
    text: "AI 提出了一个你没想到的新角度，你会更倾向于？",
    options: [
      {
        id: "A",
        text: "先判断它是否符合我的目标和边界。",
        primaryScores: { C: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先让它继续展开，看看能不能带出更多可能。",
        primaryScores: { F: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_CF_03",
    type: "dilemma",
    primaryAxis: "C/F",
    title: "修改 AI 输出",
    text: "当你觉得 AI 写得“不太对”时，你更像？",
    options: [
      {
        id: "A",
        text: "明确指出要改哪里、保留哪里、删掉哪里。",
        primaryScores: { C: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "继续和它聊，让它多试几种可能的版本。",
        primaryScores: { F: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_CF_04",
    type: "dilemma",
    primaryAxis: "C/F",
    title: "和 AI 对话时",
    text: "你更希望对话过程像？",
    options: [
      {
        id: "A",
        text: "我设定方向，AI 按我的框架推进。",
        primaryScores: { C: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "我们边聊边发现方向，不一定一开始就定死。",
        primaryScores: { F: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  // =========================
  // M / D 轴：一起共创 vs 交给 AI 做
  // =========================

  {
    id: "B_MD_01",
    type: "dilemma",
    primaryAxis: "M/D",
    title: "使用 AI 时的期待",
    text: "你更希望 AI 像？",
    options: [
      {
        id: "A",
        text: "一个能陪我一起打磨想法的搭子。",
        primaryScores: { M: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "一个能帮我快速处理任务的助手。",
        primaryScores: { D: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_MD_02",
    type: "dilemma",
    primaryAxis: "M/D",
    title: "得到 AI 初稿后",
    text: "AI 给了你一版初稿，你更常做的是？",
    options: [
      {
        id: "A",
        text: "继续追问、改写、组合，让它慢慢变成我的版本。",
        primaryScores: { M: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先拿到一个可用结果，再由我自己做最后处理。",
        primaryScores: { D: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_MD_03",
    type: "dilemma",
    primaryAxis: "M/D",
    title: "面对复杂任务",
    text: "面对一个复杂任务，你更想让 AI？",
    options: [
      {
        id: "A",
        text: "和我一起讨论，逐步把思路变清楚。",
        primaryScores: { M: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先把材料、步骤或初稿整理出来。",
        primaryScores: { D: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_MD_04",
    type: "dilemma",
    primaryAxis: "M/D",
    title: "你最享受的 AI 使用方式",
    text: "你更有满足感的是？",
    options: [
      {
        id: "A",
        text: "和 AI 一轮轮碰撞后，出现了我没想到的新方案。",
        primaryScores: { M: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "AI 很快帮我完成了一件原本很费时间的事。",
        primaryScores: { D: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  // =========================
  // A / R 轴：先查一下 vs 先用起来
  // =========================

  {
    id: "B_AR_01",
    type: "dilemma",
    primaryAxis: "A/R",
    title: "完整答案出现后",
    text: "AI 给了一个完整、流畅的答案，你下一步更像？",
    options: [
      {
        id: "A",
        text: "先追问它的依据、漏洞或可能不准确的地方。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先拿来推进，重要部分之后再检查。",
        primaryScores: { R: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_AR_02",
    type: "dilemma",
    primaryAxis: "A/R",
    title: "答案看起来很有道理",
    text: "当 AI 的回答很有条理，但你隐约不放心时，你会？",
    options: [
      {
        id: "A",
        text: "继续问：“这个判断有什么依据或反例？”",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先用起来，后面发现问题再调整。",
        primaryScores: { R: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_AR_03",
    type: "dilemma",
    primaryAxis: "A/R",
    title: "不同 AI 给出不同建议",
    text: "两个 AI 给了不同建议，你更可能？",
    options: [
      {
        id: "A",
        text: "让它们分别说明理由，再比较哪个更可靠。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先选一个更顺手的方向推进，不在一开始纠结太久。",
        primaryScores: { R: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "B_AR_04",
    type: "dilemma",
    primaryAxis: "A/R",
    title: "时间和准确性的取舍",
    text: "如果任务时间有限，你更接近？",
    options: [
      {
        id: "A",
        text: "哪怕慢一点，也要先确认关键信息靠不靠谱。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先完成一个可用版本，再视情况补查。",
        primaryScores: { R: 2 },
        secondarySignals: {},
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  }
];

const TYPE_KEYS = ["S", "O", "C", "F", "M", "D", "A", "R"];
const AXIS_PAIRS = {
  "S/O": ["S", "O"],
  "C/F": ["C", "F"],
  "M/D": ["M", "D"],
  "A/R": ["A", "R"],
};

function shuffle(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function groupByAxis(items) {
  return items.reduce((groups, item) => {
    groups[item.primaryAxis] = groups[item.primaryAxis] || [];
    groups[item.primaryAxis].push(item);
    return groups;
  }, {});
}

function cloneQuestionWithShuffledOptions(item) {
  return {
    ...item,
    options: shuffle(item.options).map((choice) => ({
      ...choice,
      primaryScores: { ...choice.primaryScores },
      secondarySignals: { ...choice.secondarySignals },
    })),
  };
}

function sampleByAxis(items, countPerAxis) {
  const groups = groupByAxis(items);
  return Object.keys(AXIS_PAIRS).flatMap((axis) => shuffle(groups[axis] || []).slice(0, countPerAxis));
}

function hasThreeSameAxisInARow(items) {
  return items.some((item, index) => index >= 2 && item.primaryAxis === items[index - 1].primaryAxis && item.primaryAxis === items[index - 2].primaryAxis);
}

function shuffleAvoidingAxisRuns(items) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const shuffled = shuffle(items);
    if (!hasThreeSameAxisInARow(shuffled)) return shuffled;
  }
  return shuffle(items);
}

export function generateQuestionSetV11() {
  const selectedDilemmas = sampleByAxis(dilemmaQuestions, 2);
  const selectedScenarios = sampleByAxis(scenarioQuestions, 3);
  return shuffleAvoidingAxisRuns([...selectedDilemmas, ...selectedScenarios]).map(cloneQuestionWithShuffledOptions);
}

function emptyTypeScores() {
  return Object.fromEntries(TYPE_KEYS.map((key) => [key, 0]));
}

function addScores(target, scores) {
  Object.entries(scores || {}).forEach(([key, value]) => {
    target[key] = (target[key] || 0) + value;
  });
}

function percent(part, total) {
  if (!total) return 50;
  return Math.round((part / total) * 100);
}

function axisStrength(gap) {
  if (gap >= 4) return "倾向明显";
  if (gap >= 2) return "中等倾向";
  return "边界倾向";
}

function createAxisResult(axis, finalTypeScores) {
  const [left, right] = AXIS_PAIRS[axis];
  const leftScore = finalTypeScores[left] || 0;
  const rightScore = finalTypeScores[right] || 0;
  const selected = axis === "M/D" ? (leftScore >= rightScore ? left : right) : (leftScore > rightScore ? left : right);
  const gap = Math.abs(leftScore - rightScore);
  return { axis, left, right, leftScore, rightScore, selected, gap, strength: axisStrength(gap) };
}

export function calculateResultV11(answerRecords, questionSet) {
  const finalTypeScores = emptyTypeScores();
  const secondarySignals = emptyTypeScores();
  let emotionScore = 0;

  const validAnswerRecords = answerRecords.filter((record) => record?.primaryScores && record?.secondarySignals);

  validAnswerRecords.forEach((record) => {
    addScores(finalTypeScores, record.primaryScores);
    addScores(secondarySignals, record.secondarySignals);
    emotionScore += record.emotionScore || 0;
  });

  const axisResults = Object.keys(AXIS_PAIRS).map((axis) => createAxisResult(axis, finalTypeScores));
  const typeCode = axisResults.map((item) => item.selected).join("");
  const maxPossibleEmotionScore = questionSet.reduce((sum, item) => sum + Math.max(0, ...item.options.map((choice) => choice.emotionScore || 0)), 0);
  const emotionRatio = maxPossibleEmotionScore ? emotionScore / maxPossibleEmotionScore : 0;
  const soTotal = finalTypeScores.S + finalTypeScores.O;
  const cfTotal = finalTypeScores.C + finalTypeScores.F;
  const mdTotal = finalTypeScores.M + finalTypeScores.D;
  const arTotal = finalTypeScores.A + finalTypeScores.R;

  const scores = [
    { dimension: "start", name: "AI启动度", persona: "灵感启动型", raw: finalTypeScores.S, percent: percent(finalTypeScores.S, soTotal) },
    { dimension: "control", name: "指挥控制度", persona: "指挥官型", raw: finalTypeScores.C, percent: percent(finalTypeScores.C, cfTotal) },
    { dimension: "cocreate", name: "共创循环度", persona: "共创搭子型", raw: finalTypeScores.M, percent: percent(finalTypeScores.M, mdTotal) },
    { dimension: "audit", name: "信任审计度", persona: "怀疑审计型", raw: finalTypeScores.A, percent: percent(finalTypeScores.A, arTotal) },
    { dimension: "outsource", name: "任务外包度", persona: "效率外包型", raw: finalTypeScores.D, percent: percent(finalTypeScores.D, mdTotal) },
    { dimension: "emotion", name: "情绪投射度", persona: "情绪镜像型", raw: emotionScore, percent: Math.round(emotionRatio * 100) },
  ].sort((a, b) => b.percent - a.percent);

  return {
    version: "1.1",
    scores,
    typeCode,
    finalTypeScores,
    secondarySignals,
    emotionScore,
    maxPossibleEmotionScore,
    emotionRatio,
    axisResults,
    answerRecords: validAnswerRecords,
    questionCount: questionSet.length,
    title: typeCode,
    clarity: axisResults.some((axis) => axis.strength === "边界倾向") ? "中" : "高",
    pattern: "v1.1",
    profileKey: scores[0]?.persona || "均衡使用型",
  };
}
export const scenarioQuestions = [
  // =========================
  // S / O 主覆盖：启动方式
  // =========================

  {
    id: "S_SO_01",
    type: "scenario",
    primaryAxis: "S/O",
    title: "面对空白任务",
    text: "你要开始一件完全没头绪的事，打开 AI 后，你第一步更可能是？",
    options: [
      {
        id: "A",
        text: "让 AI 先给几个可以开始的方向。",
        primaryScores: { S: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先自己写下一点模糊想法，再让 AI 帮你扩展。",
        primaryScores: { O: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "先告诉 AI 你的目标、限制和想要的格式。",
        primaryScores: { O: 1 },
        secondarySignals: { C: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "直接让 AI 生成一个能用的初版。",
        primaryScores: { S: 1 },
        secondarySignals: { D: 2, R: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 先帮你拆成几个马上能做的小步骤。",
        primaryScores: { S: 1 },
        secondarySignals: { D: 1 },
        emotionScore: 1
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_SO_02",
    type: "scenario",
    primaryAxis: "S/O",
    title: "不知道怎么开头",
    text: "你要写一段内容，但一直卡在开头。你更可能怎么做？",
    options: [
      {
        id: "A",
        text: "让 AI 先给 5 个不同开头，你从里面挑。",
        primaryScores: { S: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "先自己写一个很粗糙的开头，再让 AI 改。",
        primaryScores: { O: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "先让 AI 问你几个问题，帮你把想法问出来。",
        primaryScores: { S: 1 },
        secondarySignals: { M: 1 },
        emotionScore: 1
      },
      {
        id: "D",
        text: "先列出你想表达的重点，再让 AI 组织语言。",
        primaryScores: { O: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 直接写一版完整开头，能用就先往下推进。",
        primaryScores: { S: 1 },
        secondarySignals: { D: 2, R: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_SO_03",
    type: "scenario",
    primaryAxis: "S/O",
    title: "接到一个陌生任务",
    text: "你突然要做一件以前没做过的事，比如策划活动、做页面、写方案。你更可能？",
    options: [
      {
        id: "A",
        text: "先问 AI：“这个任务通常分哪几步？”",
        primaryScores: { S: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "先自己判断大概方向，再让 AI 检查有没有遗漏。",
        primaryScores: { O: 2 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让 AI 给几个不同路线，你再决定走哪条。",
        primaryScores: { S: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "先把你的目的和资源说清楚，再让 AI 提建议。",
        primaryScores: { O: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 先帮你判断这件事最难的地方是什么。",
        primaryScores: { S: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_SO_04",
    type: "scenario",
    primaryAxis: "S/O",
    title: "任务太大，不知道从哪里切",
    text: "一个任务看起来很大，你有点被压住了。你会？",
    options: [
      {
        id: "A",
        text: "让 AI 把它拆成“今天能做的第一步”。",
        primaryScores: { S: 2 },
        secondarySignals: {},
        emotionScore: 1
      },
      {
        id: "B",
        text: "先自己圈出最重要的部分，再让 AI 帮你细化。",
        primaryScores: { O: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让 AI 直接给一个完整执行清单。",
        primaryScores: { S: 1 },
        secondarySignals: { D: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "先问 AI：“如果时间有限，应该优先做什么？”",
        primaryScores: { S: 2 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "先把自己已经知道的东西写出来，再让 AI 补空缺。",
        primaryScores: { O: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_SO_05",
    type: "scenario",
    primaryAxis: "S/O",
    title: "突然有一个灵感",
    text: "你突然想到一个点子，但它还很散。你会怎么和 AI 说？",
    options: [
      {
        id: "A",
        text: "“我有个模糊点子，你帮我发散一下。”",
        primaryScores: { S: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "“我先说我的想法，你帮我判断它能不能成立。”",
        primaryScores: { O: 2 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "“你先给我几个类似方向，我看看有没有参考。”",
        primaryScores: { S: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "“我想要这种感觉，你帮我变成具体方案。”",
        primaryScores: { O: 1 },
        secondarySignals: { M: 2 },
        emotionScore: 1
      },
      {
        id: "E",
        text: "“先帮我做一个最低可行版本。”",
        primaryScores: { S: 1 },
        secondarySignals: { D: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_SO_06",
    type: "scenario",
    primaryAxis: "S/O",
    title: "准备学习新东西",
    text: "你想学一个新工具或新知识，第一步更像是？",
    options: [
      {
        id: "A",
        text: "让 AI 给你一条从零开始的学习路线。",
        primaryScores: { S: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "先自己查一点，再让 AI 帮你整理成学习计划。",
        primaryScores: { O: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让 AI 先问你现在的基础，再定制路线。",
        primaryScores: { O: 1 },
        secondarySignals: { M: 1, C: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "让 AI 直接安排每天要做什么。",
        primaryScores: { S: 1 },
        secondarySignals: { D: 2 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 先提醒你最容易踩的坑。",
        primaryScores: { S: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  // =========================
  // C / F 主覆盖：控制方式
  // =========================

  {
    id: "S_CF_01",
    type: "scenario",
    primaryAxis: "C/F",
    title: "AI 回答跑偏",
    text: "AI 回答得不差，但明显和你原本想要的方向不一样。你会？",
    options: [
      {
        id: "A",
        text: "直接指出哪里偏了，让它按原要求重写。",
        primaryScores: { C: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "顺着它的新方向再问几句，看看有没有意外收获。",
        primaryScores: { F: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它比较“你的方向”和“它的方向”哪个更适合。",
        primaryScores: { F: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "把两个方向合在一起，让它生成一个折中版。",
        primaryScores: { F: 1 },
        secondarySignals: { M: 2 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "重新补充背景和限制，让它再理解一次需求。",
        primaryScores: { C: 2 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_CF_02",
    type: "scenario",
    primaryAxis: "C/F",
    title: "输出风格不像你",
    text: "AI 写出来的东西意思没错，但“不像你”。你会？",
    options: [
      {
        id: "A",
        text: "明确告诉它哪些句子不像你，让它逐句改。",
        primaryScores: { C: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "让它给 3 种不同语气版本，你再挑。",
        primaryScores: { F: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "给它几句你自己的表达，让它模仿。",
        primaryScores: { C: 2 },
        secondarySignals: { O: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "觉得意思能用就行，不太纠结语气。",
        primaryScores: { F: 1 },
        secondarySignals: { D: 1, R: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "先让它帮你判断：“这版为什么不像我想表达的感觉？”",
        primaryScores: { F: 1 },
        secondarySignals: { A: 1 },
        emotionScore: 1
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_CF_03",
    type: "scenario",
    primaryAxis: "C/F",
    title: "AI 给了一个新角度",
    text: "AI 提出一个你没想到的新角度，你的反应更可能是？",
    options: [
      {
        id: "A",
        text: "先判断它有没有偏离原目标。",
        primaryScores: { C: 2 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "让它继续展开这个新角度。",
        primaryScores: { F: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它把新角度压缩成一个可执行方案。",
        primaryScores: { F: 1 },
        secondarySignals: { D: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "让它说明这个新角度比原方向好在哪里。",
        primaryScores: { F: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "把新角度收进你的原框架里。",
        primaryScores: { C: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_CF_04",
    type: "scenario",
    primaryAxis: "C/F",
    title: "AI 太啰嗦",
    text: "AI 回答太长、太散，但里面可能有有用内容。你会？",
    options: [
      {
        id: "A",
        text: "要求它按你给的结构重新整理。",
        primaryScores: { C: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "先让它保留所有想法，再慢慢筛。",
        primaryScores: { F: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它只留下最重要的三点。",
        primaryScores: { C: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "继续追问其中一个有意思的小点。",
        primaryScores: { F: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让它告诉你哪些内容最不确定。",
        primaryScores: { C: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_CF_05",
    type: "scenario",
    primaryAxis: "C/F",
    title: "讨论记录总结",
    text: "你把一段群聊或讨论记录丢给 AI，让它帮忙总结。你更可能怎么要求？",
    options: [
      {
        id: "A",
        text: "“按背景、问题、结论、待办四栏整理。”",
        primaryScores: { C: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "“先看看里面有哪些潜在方向。”",
        primaryScores: { F: 2 },
        secondarySignals: { S: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "“不要直接下结论，先把不同观点分开。”",
        primaryScores: { C: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "“帮我提炼出最有意思的几个点。”",
        primaryScores: { F: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "“整理成能直接发给大家的版本。”",
        primaryScores: { C: 1 },
        secondarySignals: { D: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_CF_06",
    type: "scenario",
    primaryAxis: "C/F",
    title: "AI 一直没理解你",
    text: "你发现 AI 连续几次都没理解你的意思。你会？",
    options: [
      {
        id: "A",
        text: "重写提示词，把目标、限制和例子说清楚。",
        primaryScores: { C: 2 },
        secondarySignals: { O: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "让 AI 先复述你的需求，看看它哪里理解错了。",
        primaryScores: { C: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "换一种问法，看看能不能绕出新理解。",
        primaryScores: { F: 2 },
        secondarySignals: { S: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "让它反问你几个澄清问题，帮你把说不清的地方讲出来。",
        primaryScores: { F: 1 },
        secondarySignals: { M: 1, A: 1 },
        emotionScore: 1
      },
      {
        id: "E",
        text: "先让它做一版，再根据结果继续改。",
        primaryScores: { F: 1 },
        secondarySignals: { R: 1, M: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  // =========================
  // M / D 主覆盖：产出使用方式
  // =========================

  {
    id: "S_MD_01",
    type: "scenario",
    primaryAxis: "M/D",
    title: "想做一个创意作品",
    text: "你想做一个小作品，比如海报、视频、网页、文案或活动点子。你会？",
    options: [
      {
        id: "A",
        text: "和 AI 来回讨论风格、感觉和方向。",
        primaryScores: { M: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "让 AI 直接给一套完整方案。",
        primaryScores: { D: 2 },
        secondarySignals: { S: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "先让 AI 给很多点子，再自己拼成一个。",
        primaryScores: { M: 2 },
        secondarySignals: { S: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "让 AI 按固定格式生成标题、结构和文案。",
        primaryScores: { D: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 先判断哪些创意太普通。",
        primaryScores: { M: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_MD_02",
    type: "scenario",
    primaryAxis: "M/D",
    title: "AI 生成了一版初稿",
    text: "AI 给了你一版初稿，你更可能怎么处理？",
    options: [
      {
        id: "A",
        text: "继续让它改几轮，直到更接近你真正想表达的感觉。",
        primaryScores: { M: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 1
      },
      {
        id: "B",
        text: "先拿到可用版本，自己再做最后加工。",
        primaryScores: { D: 2 },
        secondarySignals: { R: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它解释这版的结构为什么这样安排。",
        primaryScores: { M: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "让它生成另外两版，混合出更好的版本。",
        primaryScores: { M: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "直接让它补齐细节、格式和排版。",
        primaryScores: { D: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_MD_03",
    type: "scenario",
    primaryAxis: "M/D",
    title: "处理大量资料",
    text: "你有很多截图、笔记、链接或聊天记录。你会？",
    options: [
      {
        id: "A",
        text: "让 AI 先整理成表格和重点清单。",
        primaryScores: { D: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "先和 AI 讨论这些资料可能说明什么。",
        primaryScores: { M: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让 AI 帮你把资料分组，再一起判断哪些有用。",
        primaryScores: { M: 1, D: 1 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "直接让 AI 生成一版报告框架。",
        primaryScores: { D: 2 },
        secondarySignals: { S: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 标出信息之间可能矛盾的地方。",
        primaryScores: { M: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_MD_04",
    type: "scenario",
    primaryAxis: "M/D",
    title: "重复又琐碎的任务",
    text: "你有一堆重复性任务，比如整理格式、改标题、归类材料。你会？",
    options: [
      {
        id: "A",
        text: "直接交给 AI 批量处理。",
        primaryScores: { D: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先制定规则，再让 AI 按规则执行。",
        primaryScores: { D: 1 },
        secondarySignals: { C: 2 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "边看 AI 处理结果，边调整规则。",
        primaryScores: { M: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "让 AI 先处理一小部分，你确认后再继续。",
        primaryScores: { M: 1, D: 1 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "如果不影响质量，就让 AI 尽快完成。",
        primaryScores: { D: 2 },
        secondarySignals: { R: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_MD_05",
    type: "scenario",
    primaryAxis: "M/D",
    title: "做一个方案",
    text: "你要做一个方案，但还不确定重点。你会？",
    options: [
      {
        id: "A",
        text: "和 AI 讨论几轮，先弄清楚你到底想让这个方案传达什么。",
        primaryScores: { M: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 1
      },
      {
        id: "B",
        text: "让 AI 先生成一个完整方案框架。",
        primaryScores: { D: 2 },
        secondarySignals: { S: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "先让 AI 给 3 个版本，再比较哪个更适合。",
        primaryScores: { M: 1, D: 1 },
        secondarySignals: { A: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "你先定目标和结构，让 AI 填充内容。",
        primaryScores: { D: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 先指出这个方案最可能被质疑的地方。",
        primaryScores: { M: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_MD_06",
    type: "scenario",
    primaryAxis: "M/D",
    title: "越聊越多",
    text: "你本来只想问一个小问题，结果聊出了很多新方向。你会？",
    options: [
      {
        id: "A",
        text: "继续聊，说不定能出现更有意思的点。",
        primaryScores: { M: 2 },
        secondarySignals: { F: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "让 AI 把这些方向整理成清单。",
        primaryScores: { D: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让 AI 帮你筛出最值得继续做的方向。",
        primaryScores: { M: 1 },
        secondarySignals: { A: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "让 AI 直接把这些内容整理成初稿。",
        primaryScores: { D: 2 },
        secondarySignals: { R: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让 AI 帮你把这些新方向重新收回来，看看你真正想保留什么。",
        primaryScores: { M: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 1
      }
    ],
    hasEmotionOption: true
  },

  // =========================
  // A / R 主覆盖：信任方式
  // =========================

  {
    id: "S_AR_01",
    type: "scenario",
    primaryAxis: "A/R",
    title: "AI 给了完整答案",
    text: "AI 给了一个完整、流畅、看起来很有道理的答案。你下一步更可能？",
    options: [
      {
        id: "A",
        text: "先追问它哪些地方可能不准确。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先保存下来，后面需要时直接改着用。",
        primaryScores: { R: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它给出判断依据或参考来源。",
        primaryScores: { A: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "先用它推进任务，重要部分再回头查。",
        primaryScores: { R: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "让它换个角度再解释一遍，看是否一致。",
        primaryScores: { A: 1 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_AR_02",
    type: "scenario",
    primaryAxis: "A/R",
    title: "用于重要选择",
    text: "你要把 AI 的建议用于一个比较重要的选择。你会？",
    options: [
      {
        id: "A",
        text: "让它列出支持和反对的理由。",
        primaryScores: { A: 2 },
        secondarySignals: { M: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "先采用最顺眼的建议，再根据结果调整。",
        primaryScores: { R: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它反驳你最想选的那个方案。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 1
      },
      {
        id: "D",
        text: "让它直接给推荐顺序和执行步骤。",
        primaryScores: { R: 1 },
        secondarySignals: { D: 2 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "先让它列判断标准，而不是替你决定。",
        primaryScores: { A: 1 },
        secondarySignals: { C: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_AR_03",
    type: "scenario",
    primaryAxis: "A/R",
    title: "不同 AI 说法不一样",
    text: "你问了两个 AI，它们给了不同答案。你会？",
    options: [
      {
        id: "A",
        text: "让它们分别说明依据，再比较。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "选一个更完整、更能马上用的答案。",
        primaryScores: { R: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "把两个答案合并成一个更丰富的版本。",
        primaryScores: { R: 1 },
        secondarySignals: { M: 2 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "重新明确问题，再问一轮。",
        primaryScores: { A: 1 },
        secondarySignals: { C: 2 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "看哪个答案更启发你，然后顺着继续聊。",
        primaryScores: { R: 1 },
        secondarySignals: { F: 2 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_AR_04",
    type: "scenario",
    primaryAxis: "A/R",
    title: "答案漂亮但有点虚",
    text: "AI 生成的方案看起来很漂亮，但你担心它只是“说得好听”。你会？",
    options: [
      {
        id: "A",
        text: "让它把方案拆成能验证的步骤。",
        primaryScores: { A: 2 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      },
      {
        id: "B",
        text: "先拿来展示或推进，之后再根据反馈改。",
        primaryScores: { R: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它指出这套方案最容易让人不踏实的地方。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 1
      },
      {
        id: "D",
        text: "让它改得更具体、更可执行。",
        primaryScores: { R: 1 },
        secondarySignals: { C: 1, D: 1 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "继续让它发散，也许能变成更好的创意。",
        primaryScores: { R: 1 },
        secondarySignals: { F: 1, M: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: true
  },

  {
    id: "S_AR_05",
    type: "scenario",
    primaryAxis: "A/R",
    title: "引用事实或数据",
    text: "AI 给了你一个事实、数据或案例，你会？",
    options: [
      {
        id: "A",
        text: "要求它说明来源，或者告诉你怎么核查。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先暂时放进草稿，之后统一检查。",
        primaryScores: { R: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让它给出多个可能来源，自己再筛。",
        primaryScores: { A: 2 },
        secondarySignals: { O: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "如果只是辅助说明，就先用着。",
        primaryScores: { R: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "E",
        text: "让它换一种不依赖具体数据的表达。",
        primaryScores: { A: 1 },
        secondarySignals: { C: 1 },
        emotionScore: 0
      }
    ],
    hasEmotionOption: false
  },

  {
    id: "S_AR_06",
    type: "scenario",
    primaryAxis: "A/R",
    title: "时间紧但信息不确定",
    text: "你快要交东西了，但 AI 给的信息你不完全确定。你会？",
    options: [
      {
        id: "A",
        text: "先检查关键部分，哪怕牺牲一点完成度。",
        primaryScores: { A: 2 },
        secondarySignals: {},
        emotionScore: 0
      },
      {
        id: "B",
        text: "先交一个可用版本，之后有机会再补查。",
        primaryScores: { R: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "C",
        text: "让 AI 标出哪些内容最需要核实。",
        primaryScores: { A: 2 },
        secondarySignals: { D: 1 },
        emotionScore: 0
      },
      {
        id: "D",
        text: "把不确定内容改成更保守的说法。",
        primaryScores: { A: 1 },
        secondarySignals: { C: 2 },
        emotionScore: 0
      },
      {
        id: "E",
        text: "如果风险不大，就先推进，避免自己一直陷在纠结里。",
        primaryScores: { R: 2 },
        secondarySignals: {},
        emotionScore: 1
      }
    ],
    hasEmotionOption: true
  }
];

export const questionBankV11 = {
  dilemmaQuestions,
  scenarioQuestions
};
