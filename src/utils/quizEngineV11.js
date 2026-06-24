// src/utils/quizEngineV11.js

import { dilemmaQuestions, scenarioQuestions } from "../data/questionBankV11";

/**
 * AI 使用人格测试 v1.1 规则：
 *
 * 1. primaryScores 只用于四字母人格码判定。
 * 2. secondarySignals 只用于结果页补充解释，不直接决定人格码。
 * 3. emotionScore 只用于 Hidden Mode / 共感力。
 * 4. 每次测试抽 20 道：
 *    - dilemma：每个轴抽 2 道，共 8 道
 *    - scenario：每个轴抽 3 道，共 12 道
 */

export const AXES = ["S/O", "C/F", "M/D", "A/R"];

export const LETTERS = ["S", "O", "C", "F", "M", "D", "A", "R"];

export const AXIS_META = {
  "S/O": {
    left: "S",
    right: "O",
    leftName: "Spark First",
    rightName: "Own First",
    leftChinese: "先让 AI 点火",
    rightChinese: "先自己想一步",
    energyName: "点火力"
  },
  "C/F": {
    left: "C",
    right: "F",
    leftName: "Command",
    rightName: "Flow",
    leftChinese: "我来控场",
    rightChinese: "顺着聊下去",
    energyName: "控场力"
  },
  "M/D": {
    left: "M",
    right: "D",
    leftName: "Merge",
    rightName: "Delegate",
    leftChinese: "一起共创",
    rightChinese: "交给 AI 做",
    energyName: "共创 / 代办"
  },
  "A/R": {
    left: "A",
    right: "R",
    leftName: "Audit",
    rightName: "Rely",
    leftChinese: "先查一下",
    rightChinese: "先用起来",
    energyName: "查错力"
  }
};

export const LETTER_META = {
  S: {
    name: "Spark First",
    chinese: "先让 AI 点火",
    description: "你更习惯让 AI 先帮你打开思路，降低任务的启动难度。"
  },
  O: {
    name: "Own First",
    chinese: "先自己想一步",
    description: "你更习惯先形成自己的想法，再让 AI 介入补充或整理。"
  },
  C: {
    name: "Command",
    chinese: "我来控场",
    description: "你更倾向明确告诉 AI 目标、格式、边界和修改方向。"
  },
  F: {
    name: "Flow",
    chinese: "顺着聊下去",
    description: "你更愿意顺着 AI 的回答继续探索，看看能不能发现新方向。"
  },
  M: {
    name: "Merge",
    chinese: "一起共创",
    description: "你更喜欢和 AI 多轮讨论、组合、打磨，让想法慢慢成型。"
  },
  D: {
    name: "Delegate",
    chinese: "交给 AI 做",
    description: "你更倾向让 AI 先处理任务、整理材料或生成可用版本。"
  },
  A: {
    name: "Audit",
    chinese: "先查一下",
    description: "你更习惯追问依据、漏洞、风险和反例，不轻易被流畅答案带走。"
  },
  R: {
    name: "Rely",
    chinese: "先用起来",
    description: "你更倾向先利用 AI 的答案推进任务，重要部分之后再检查。"
  }
};

export const HIDDEN_MODE_META = {
  moon: {
    key: "moon",
    name: "Moon Mode",
    chinese: "月亮模式",
    label: "Moon Mode｜月亮模式",
    description:
      "你的共感力较高。你不只是把 AI 当工具，也会让它帮你整理混乱、表达感受、缓冲压力，或者把模糊状态变成可以处理的问题。"
  },
  soft: {
    key: "soft",
    name: "Soft Mode",
    chinese: "软着陆模式",
    label: "Soft Mode｜软着陆模式",
    description:
      "你的共感力处在中间。你主要把 AI 用在任务推进上，但在压力、纠结或表达困难时，也会让 AI 帮自己慢慢落地。"
  },
  tool: {
    key: "tool",
    name: "Tool Mode",
    chinese: "工具模式",
    label: "Tool Mode｜工具模式",
    description:
      "你的共感力较低。你更倾向把 AI 当作效率工具，主要关心它能不能帮你完成任务、整理信息或产出结果。"
  }
};

function createEmptyLetterScores() {
  return {
    S: 0,
    O: 0,
    C: 0,
    F: 0,
    M: 0,
    D: 0,
    A: 0,
    R: 0
  };
}

function shuffleArray(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function groupByAxis(questions) {
  return questions.reduce((groups, question) => {
    const axis = question.primaryAxis;

    if (!groups[axis]) {
      groups[axis] = [];
    }

    groups[axis].push(question);
    return groups;
  }, {});
}

function pickRandomItems(items, count) {
  if (!Array.isArray(items)) {
    return [];
  }

  if (items.length <= count) {
    return shuffleArray(items);
  }

  return shuffleArray(items).slice(0, count);
}

function cloneQuestionWithShuffledOptions(question, shouldShuffleOptions = true) {
  return {
    ...question,
    options: shouldShuffleOptions ? shuffleArray(question.options) : [...question.options]
  };
}

function countEmotionQuestions(questions) {
  return questions.filter((question) => question.hasEmotionOption).length;
}

function hasThreeSameAxisInARow(questions) {
  for (let i = 0; i < questions.length - 2; i += 1) {
    const a = questions[i]?.primaryAxis;
    const b = questions[i + 1]?.primaryAxis;
    const c = questions[i + 2]?.primaryAxis;

    if (a && a === b && b === c) {
      return true;
    }
  }

  return false;
}

function shuffleQuestionsAvoidingAxisStreak(questions, maxAttempts = 80) {
  let best = shuffleArray(questions);

  for (let i = 0; i < maxAttempts; i += 1) {
    const candidate = shuffleArray(questions);

    if (!hasThreeSameAxisInARow(candidate)) {
      return candidate;
    }

    best = candidate;
  }

  return best;
}

/**
 * 尝试保证抽出的 scenario 题里，至少有 minEmotionCount 道含 emotion 选项。
 * 替换时优先在同一个 primaryAxis 内替换，避免破坏四个轴覆盖。
 */
function ensureMinimumEmotionScenarioQuestions(selectedScenarios, allScenarioGroups, minEmotionCount = 3) {
  let result = [...selectedScenarios];

  if (countEmotionQuestions(result) >= minEmotionCount) {
    return result;
  }

  const selectedIds = new Set(result.map((question) => question.id));

  for (const axis of AXES) {
    if (countEmotionQuestions(result) >= minEmotionCount) {
      break;
    }

    const candidates = (allScenarioGroups[axis] || []).filter(
      (question) => question.hasEmotionOption && !selectedIds.has(question.id)
    );

    if (candidates.length === 0) {
      continue;
    }

    const nonEmotionIndex = result.findIndex(
      (question) => question.primaryAxis === axis && !question.hasEmotionOption
    );

    if (nonEmotionIndex === -1) {
      continue;
    }

    const replacement = pickRandomItems(candidates, 1)[0];

    if (replacement) {
      selectedIds.delete(result[nonEmotionIndex].id);
      result[nonEmotionIndex] = replacement;
      selectedIds.add(replacement.id);
    }
  }

  return result;
}

/**
 * 生成 v1.1 测试题目。
 *
 * 返回 20 道题：
 * - 8 道 dilemma
 * - 12 道 scenario
 */
export function generateQuestionSetV11(options = {}) {
  const { shuffleOptions = true, minEmotionScenarioQuestions = 3 } = options;

  const dilemmaGroups = groupByAxis(dilemmaQuestions);
  const scenarioGroups = groupByAxis(scenarioQuestions);

  let selectedDilemmas = [];
  let selectedScenarios = [];

  for (const axis of AXES) {
    const dilemmaPool = dilemmaGroups[axis] || [];
    const scenarioPool = scenarioGroups[axis] || [];

    selectedDilemmas = selectedDilemmas.concat(pickRandomItems(dilemmaPool, 2));
    selectedScenarios = selectedScenarios.concat(pickRandomItems(scenarioPool, 3));
  }

  selectedScenarios = ensureMinimumEmotionScenarioQuestions(
    selectedScenarios,
    scenarioGroups,
    minEmotionScenarioQuestions
  );

  const combined = [...selectedDilemmas, ...selectedScenarios].map((question) =>
    cloneQuestionWithShuffledOptions(question, shuffleOptions)
  );

  return shuffleQuestionsAvoidingAxisStreak(combined);
}

/**
 * 根据题目 id 和选项 id 找到选项。
 */
function findSelectedOption(questions, questionId, optionId) {
  const question = questions.find((item) => item.id === questionId);

  if (!question) {
    return null;
  }

  const option = question.options.find((item) => item.id === optionId);

  if (!option) {
    return null;
  }

  return {
    question,
    option
  };
}

function addScores(target, scores = {}) {
  Object.entries(scores).forEach(([key, value]) => {
    if (typeof value !== "number") {
      return;
    }

    if (target[key] === undefined) {
      target[key] = 0;
    }

    target[key] += value;
  });
}

function getAxisWinner(axis, scores) {
  const meta = AXIS_META[axis];

  if (!meta) {
    return null;
  }

  const left = meta.left;
  const right = meta.right;
  const leftScore = scores[left] || 0;
  const rightScore = scores[right] || 0;
  const gap = Math.abs(leftScore - rightScore);

  let winner;

  if (axis === "S/O") {
    winner = leftScore > rightScore ? "S" : "O";
  } else if (axis === "C/F") {
    winner = leftScore > rightScore ? "C" : "F";
  } else if (axis === "M/D") {
    winner = leftScore >= rightScore ? "M" : "D";
  } else if (axis === "A/R") {
    winner = leftScore > rightScore ? "A" : "R";
  }

  return {
    axis,
    left,
    right,
    leftScore,
    rightScore,
    winner,
    loser: winner === left ? right : left,
    gap,
    strength: getStrengthLabel(gap),
    strengthKey: getStrengthKey(gap),
    meta,
    winnerMeta: LETTER_META[winner]
  };
}

function getStrengthKey(gap) {
  if (gap >= 4) {
    return "strong";
  }

  if (gap >= 2) {
    return "medium";
  }

  return "borderline";
}

function getStrengthLabel(gap) {
  if (gap >= 4) {
    return "倾向明显";
  }

  if (gap >= 2) {
    return "中等倾向";
  }

  return "边界倾向";
}

function calculateTypeCode(finalTypeScores) {
  const first = finalTypeScores.S > finalTypeScores.O ? "S" : "O";
  const second = finalTypeScores.C > finalTypeScores.F ? "C" : "F";
  const third = finalTypeScores.M >= finalTypeScores.D ? "M" : "D";
  const fourth = finalTypeScores.A > finalTypeScores.R ? "A" : "R";

  return `${first}${second}${third}${fourth}`;
}

/**
 * 根据实际抽出的题，计算本轮测试的 emotion 最高可能分。
 * 这样不同随机题组也能公平判断 Hidden Mode。
 */
function calculateMaxPossibleEmotionScore(questions) {
  return questions.reduce((sum, question) => {
    const maxForQuestion = Math.max(
      0,
      ...question.options.map((option) =>
        typeof option.emotionScore === "number" ? option.emotionScore : 0
      )
    );

    return sum + maxForQuestion;
  }, 0);
}

function calculateHiddenMode(emotionScore, maxPossibleEmotionScore) {
  const safeMax = maxPossibleEmotionScore > 0 ? maxPossibleEmotionScore : 1;
  const ratio = emotionScore / safeMax;

  if (ratio >= 0.65) {
    return {
      ...HIDDEN_MODE_META.moon,
      ratio,
      emotionScore,
      maxPossibleEmotionScore
    };
  }

  if (ratio >= 0.35) {
    return {
      ...HIDDEN_MODE_META.soft,
      ratio,
      emotionScore,
      maxPossibleEmotionScore
    };
  }

  return {
    ...HIDDEN_MODE_META.tool,
    ratio,
    emotionScore,
    maxPossibleEmotionScore
  };
}

function getTopSecondarySignals(secondarySignals, limit = 3) {
  return Object.entries(secondarySignals)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([letter, score]) => ({
      letter,
      score,
      meta: LETTER_META[letter]
    }));
}

/**
 * 计算 v1.1 结果。
 *
 * 参数：
 * questions：本次实际展示给用户的 20 道题
 * answers：用户答案数组，格式建议：
 * [
 *   { questionId: "B_SO_01", optionId: "A" },
 *   { questionId: "S_MD_02", optionId: "C" }
 * ]
 */
export function calculateResultV11(questions, answers) {
  const finalTypeScores = createEmptyLetterScores();
  const secondarySignals = createEmptyLetterScores();

  let emotionScore = 0;

  const answerDetails = [];

  answers.forEach((answer) => {
    const found = findSelectedOption(questions, answer.questionId, answer.optionId);

    if (!found) {
      return;
    }

    const { question, option } = found;

    addScores(finalTypeScores, option.primaryScores);
    addScores(secondarySignals, option.secondarySignals);

    if (typeof option.emotionScore === "number") {
      emotionScore += option.emotionScore;
    }

    answerDetails.push({
      questionId: question.id,
      questionTitle: question.title,
      questionType: question.type,
      primaryAxis: question.primaryAxis,
      optionId: option.id,
      optionText: option.text,
      primaryScores: option.primaryScores || {},
      secondarySignals: option.secondarySignals || {},
      emotionScore: option.emotionScore || 0
    });
  });

  const typeCode = calculateTypeCode(finalTypeScores);

  const axisResults = {
    "S/O": getAxisWinner("S/O", finalTypeScores),
    "C/F": getAxisWinner("C/F", finalTypeScores),
    "M/D": getAxisWinner("M/D", finalTypeScores),
    "A/R": getAxisWinner("A/R", finalTypeScores)
  };

  const maxPossibleEmotionScore = calculateMaxPossibleEmotionScore(questions);
  const hiddenMode = calculateHiddenMode(emotionScore, maxPossibleEmotionScore);

  const topSecondarySignals = getTopSecondarySignals(secondarySignals, 3);

  return {
    version: "v1.1",
    typeCode,
    finalTypeScores,
    secondarySignals,
    topSecondarySignals,
    emotionScore,
    maxPossibleEmotionScore,
    hiddenMode,
    axisResults,
    answerDetails
  };
}

/**
 * 可选：把原始结果转换成结果页更容易使用的 Type Decoder 数据。
 */
export function buildTypeDecoderCards(result) {
  if (!result?.axisResults) {
    return [];
  }

  return AXES.map((axis) => {
    const axisResult = result.axisResults[axis];
    const winner = axisResult.winner;
    const winnerMeta = LETTER_META[winner];

    return {
      axis,
      letter: winner,
      englishName: winnerMeta.name,
      chineseName: winnerMeta.chinese,
      description: winnerMeta.description,
      left: axisResult.left,
      right: axisResult.right,
      leftScore: axisResult.leftScore,
      rightScore: axisResult.rightScore,
      gap: axisResult.gap,
      strength: axisResult.strength,
      strengthKey: axisResult.strengthKey,
      isBorderline: axisResult.strengthKey === "borderline"
    };
  });
}

/**
 * 可选：生成名片上的短解释。
 * 这里先给一个通用版本，后续也可以按 16 种人格单独写文案。
 */
export function buildShortResultSummary(typeCode) {
  const letters = typeCode.split("");
  const parts = letters.map((letter) => LETTER_META[letter]?.chinese).filter(Boolean);

  return `你更像是“${parts.join(" × ")}”的 AI 使用者，会按照自己的节奏调度 AI。`;
}

/**
 * 调试用：检查题库数量和每个轴的数量。
 */
export function validateQuestionBankV11() {
  const dilemmaGroups = groupByAxis(dilemmaQuestions);
  const scenarioGroups = groupByAxis(scenarioQuestions);

  const report = {
    dilemmaTotal: dilemmaQuestions.length,
    scenarioTotal: scenarioQuestions.length,
    dilemmaByAxis: {},
    scenarioByAxis: {},
    emotionScenarioTotal: scenarioQuestions.filter((question) => question.hasEmotionOption).length
  };

  AXES.forEach((axis) => {
    report.dilemmaByAxis[axis] = dilemmaGroups[axis]?.length || 0;
    report.scenarioByAxis[axis] = scenarioGroups[axis]?.length || 0;
  });

  return report;
}