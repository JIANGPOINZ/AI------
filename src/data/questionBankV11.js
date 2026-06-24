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
export const scenarioQuestions = [];

export const questionBankV11 = {
  dilemmaQuestions,
  scenarioQuestions,
};

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

  answerRecords.forEach((record) => {
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
    answerRecords,
    questionCount: questionSet.length,
    title: typeCode,
    clarity: axisResults.some((axis) => axis.strength === "边界倾向") ? "中" : "高",
    pattern: "v1.1",
    profileKey: scores[0]?.persona || "均衡使用型",
  };
}
