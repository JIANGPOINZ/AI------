import { useMemo, useState } from "react";
import { dimensions, questions } from "./data/questions.js";
import { scenarios, scenarioTypes } from "./data/scenarios.js";

const DIMENSION_ORDER = ["start", "control", "cocreate", "audit", "outsource", "emotion"];
const SCALE_OPTIONS = [
  { value: 1, label: "非常不同意" },
  { value: 2, label: "比较不同意" },
  { value: 3, label: "一般" },
  { value: 4, label: "比较同意" },
  { value: 5, label: "非常同意" },
];

const PERSONA_PROFILES = {
  "灵感启动型": {
    line: "你擅长让 AI 帮你推开第一扇门，把模糊任务变成可进入的开场。",
    ask: "“我现在有一个任务，但不知道怎么开始，你先帮我列几个切入方向。”",
    scenes: "选题、写作开头、学习入门、方案初探、从空白到第一版框架。",
    pitfall: "容易被第一版思路带走，过早收窄自己的判断空间。",
    strategy: "让 AI 先给方向，再主动要求它补充反方向、替代路径和选择标准。",
    prompt: "请先给我 5 个不同切入方向，每个方向说明适合什么情况、可能的问题，以及我下一步该如何验证。",
  },
  "指挥官型": {
    line: "你习惯掌握目标、边界和最终判断权，把 AI 当成高执行力助手。",
    ask: "“请严格按我的格式、语气、限制和评价标准完成，不要自行扩展。”",
    scenes: "成稿打磨、汇报材料、结构化输出、流程设计、需要明确标准的任务。",
    pitfall: "指令很清楚时效率很高，但可能错过 AI 带来的意外想法。",
    strategy: "先用清晰指令拿到可控结果，再单独开一轮让 AI 提供突破性替代方案。",
    prompt: "请按以下目标、限制、格式输出。完成后再列出 3 个你认为可以优化但我没有要求的点。",
  },
  "共创搭子型": {
    line: "你把 AI 当作可以来回打磨想法的伙伴，擅长在对话中生成新方案。",
    ask: "“我们一起推演几版，先发散，再筛选，再继续改。”",
    scenes: "创意策划、表达打磨、产品点子、内容方向、需要多轮迭代的任务。",
    pitfall: "容易聊得很丰富，但迟迟不收敛到可执行版本。",
    strategy: "每轮共创后都设一个收束动作：保留、删除、合并或下一步。",
    prompt: "请和我进行 3 轮共创：第一轮发散，第二轮质疑和组合，第三轮收敛成可执行版本。",
  },
  "怀疑审计型": {
    line: "你会主动检查 AI 的可靠性，关注证据、漏洞、反例和风险。",
    ask: "“这个回答哪里可能不准确？依据是什么？有哪些反例或需要核查的地方？”",
    scenes: "事实核查、资料整理、决策辅助、风险评估、重要文本发布前检查。",
    pitfall: "审计意识很强，但可能让启动速度变慢，或难以进入创作状态。",
    strategy: "把任务拆成先生成、后审计两段，避免一开始就被风险检查拖住。",
    prompt: "请先给出方案，再用审计视角列出事实风险、逻辑漏洞、遗漏变量和我应该核查的资料。",
  },
  "效率外包型": {
    line: "你很会把重复、整理、归纳和初稿任务交给 AI，释放自己的注意力。",
    ask: "“请直接整理成清单、表格、摘要或可用初稿。”",
    scenes: "资料归纳、会议纪要、改写润色、计划拆解、格式化和重复性任务。",
    pitfall: "容易为了省时间而跳过二次判断，让输出看似可用但不够贴合真实目标。",
    strategy: "把 AI 当作第一轮执行者，但保留最后一轮人工检查和重点改写。",
    prompt: "请先快速完成一个可用版本，并在最后标出你不确定、需要我确认或最值得人工修改的地方。",
  },
  "情绪镜像型": {
    line: "你会用 AI 帮自己整理压力、表达感受，并把情绪转化成可理解的问题。",
    ask: "“我现在有点乱，请先帮我理清我可能在焦虑什么，再拆成能处理的小步骤。”",
    scenes: "压力整理、人际表达、自我复盘、拖延卡住、需要把感受说清楚的时候。",
    pitfall: "AI 的回应可能很顺耳，但不等于真实关系和现实问题已经解决。",
    strategy: "先让 AI 命名感受，再让它帮你区分情绪、事实和下一步行动。",
    prompt: "请先复述你理解到的情绪，再区分事实、猜测和行动项，最后给我一个今天能完成的小步骤。",
  },
  "均衡使用型": {
    line: "你对 AI 的使用方式比较灵活，会根据任务在启动、控制、共创、审计、外包和情绪整理之间切换。",
    ask: "“请先判断这个任务更适合哪种协作方式，再按最合适的方式帮我推进。”",
    scenes: "跨类型任务、复杂项目、学习和工作混合场景、需要阶段性切换策略的任务。",
    pitfall: "灵活性高，但有时不容易形成一个特别稳定的高效习惯。",
    strategy: "进入任务前先选模式：启动、执行、共创、审计或整理情绪。",
    prompt: "请先判断我这个任务适合哪种 AI 协作模式，并说明原因，然后按该模式给出下一步。",
  },
  "AI 使用人格未显著": {
    line: "你目前没有特别突出的 AI 使用人格，可能仍在探索适合自己的协作方式。",
    ask: "“请给我几种不同使用方式，我想比较哪一种更适合我。”",
    scenes: "刚开始尝试 AI、任务类型变化大、尚未形成固定使用习惯的阶段。",
    pitfall: "可能每次都从零尝试，难以积累稳定的高效流程。",
    strategy: "先从一个低风险任务开始，记录哪类提示词最能帮到你。",
    prompt: "请给我 3 种不同协作方式：快速执行、一起讨论、严格审计。每种都示范一版。",
  },
};

const HYBRID_NAMES = {
  "共创搭子型+指挥官型": "创意导演型",
  "指挥官型+共创搭子型": "创意导演型",
  "灵感启动型+共创搭子型": "灵感共振型",
  "共创搭子型+灵感启动型": "灵感共振型",
  "怀疑审计型+指挥官型": "理性掌控型",
  "指挥官型+怀疑审计型": "理性掌控型",
  "效率外包型+指挥官型": "高效调度型",
  "指挥官型+效率外包型": "高效调度型",
  "情绪镜像型+灵感启动型": "自我整理型",
  "灵感启动型+情绪镜像型": "自我整理型",
};

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function validateQuestionBank() {
  if (!Array.isArray(questions) || questions.length !== 48) {
    throw new Error("量表题库必须恰好包含 48 道题。");
  }
  if (!Array.isArray(scenarios) || scenarios.length !== 12) {
    throw new Error("情境题库必须恰好包含 12 道题。");
  }
  for (const dimension of DIMENSION_ORDER) {
    const group = questions.filter((question) => question.dimension === dimension);
    const reverseCount = group.filter((question) => question.reverse).length;
    if (group.length !== 8) {
      throw new Error(`${dimensions[dimension]?.name || dimension} 必须恰好包含 8 道量表题。`);
    }
    if (reverseCount !== 2) {
      throw new Error(`${dimensions[dimension]?.name || dimension} 必须恰好包含 2 道反向题。`);
    }
  }
  scenarios.forEach((scenario) => {
    if (!Array.isArray(scenario.options) || scenario.options.length !== 6) {
      throw new Error(`${scenario.id} 必须包含 6 个情境选项。`);
    }
    const keys = scenario.options.map((option) => option.key).join("");
    if (keys !== "ABCDEF") {
      throw new Error(`${scenario.id} 的情境选项必须按 A-F 排列。`);
    }
  });
}

function createSession() {
  validateQuestionBank();
  const sampledQuestions = DIMENSION_ORDER.flatMap((dimension) => {
    const group = questions.filter((question) => question.dimension === dimension);
    const reverseItems = shuffle(group.filter((question) => question.reverse));
    const normalItems = shuffle(group.filter((question) => !question.reverse));
    const reverseTake = Math.random() < 0.5 ? 1 : 2;
    return shuffle([
      ...reverseItems.slice(0, reverseTake),
      ...normalItems.slice(0, 4 - reverseTake),
    ]);
  });
  return {
    scaleQuestions: shuffle(sampledQuestions),
    scenarioQuestions: shuffle(scenarios).slice(0, 3),
  };
}

function calculateResult(scaleAnswers, scenarioAnswers, session) {
  const rawByDimension = Object.fromEntries(DIMENSION_ORDER.map((dimension) => [dimension, 0]));
  session.scaleQuestions.forEach((question) => {
    const value = scaleAnswers[question.id];
    rawByDimension[question.dimension] += question.reverse ? 6 - value : value;
  });
  const scores = DIMENSION_ORDER.map((dimension) => ({
    dimension,
    name: dimensions[dimension].name,
    persona: dimensions[dimension].personality,
    raw: rawByDimension[dimension],
    percent: Math.round(((rawByDimension[dimension] - 4) / 16) * 100),
  })).sort((a, b) => b.percent - a.percent);

  const top = scores[0];
  const second = scores[1];
  const third = scores[2];
  const lowest = scores[scores.length - 1];
  const belowFifty = scores.filter((score) => score.percent < 50).length;
  const spread = top.percent - lowest.percent;

  let pattern = "single";
  let title = top.persona;
  let clarity = "高";
  let primaryPersonas = [top.persona];

  if (top.percent < 55 && belowFifty >= 4) {
    pattern = "weak";
    title = "AI 使用人格未显著";
    clarity = "低";
    primaryPersonas = [];
  } else if (top.percent >= 70 && top.percent - second.percent >= 15) {
    pattern = "single";
    title = top.persona;
    clarity = "高";
    primaryPersonas = [top.persona];
  } else if (top.percent >= 70 && second.percent >= 60 && top.percent - second.percent >= 9 && top.percent - second.percent <= 14) {
    pattern = "primarySecondary";
    title = `主副型：${top.persona} + ${second.persona}`;
    clarity = "中";
    primaryPersonas = [top.persona, second.persona];
  } else if (top.percent >= 65 && second.percent >= 65 && third.percent >= 65 && top.percent - third.percent <= 12) {
    pattern = "triple";
    title = `三重复合型：${top.persona} + ${second.persona} + ${third.persona}`;
    clarity = "混合型明显";
    primaryPersonas = [top.persona, second.persona, third.persona];
  } else if (top.percent >= 65 && second.percent >= 65 && top.percent - second.percent <= 8) {
    pattern = "dual";
    const hybridName = HYBRID_NAMES[`${top.persona}+${second.persona}`] || "双核心混合型";
    title = `${hybridName}：${top.persona} + ${second.persona}`;
    clarity = "混合型明显";
    primaryPersonas = [top.persona, second.persona];
  } else if (scores.every((score) => score.percent >= 40 && score.percent <= 69) || (spread <= 25 && top.percent < 75)) {
    pattern = "balanced";
    title = "均衡使用型";
    clarity = "中低";
    primaryPersonas = [];
  } else {
    pattern = "balanced";
    title = "均衡使用型";
    clarity = "中低";
    primaryPersonas = [];
  }

  const scenarioCounts = {};
  Object.values(scenarioAnswers).forEach((key) => {
    const persona = scenarioTypes[key];
    scenarioCounts[persona] = (scenarioCounts[persona] || 0) + 1;
  });
  const scenarioLeaders = Object.entries(scenarioCounts)
    .sort((a, b) => b[1] - a[1])
    .filter((entry, _, list) => entry[1] === list[0]?.[1])
    .map(([persona]) => persona);
  const consistent = primaryPersonas.some((persona) => scenarioLeaders.includes(persona));

  return {
    scores,
    title,
    clarity,
    pattern,
    profileKey: primaryPersonas[0] || title,
    scenarioLeaders,
    consistent,
  };
}

function Shell({ page, setPage, children }) {
  return (
    <div className="mesh-bg min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <button className="text-left" onClick={() => setPage("home")}>
          <div className="text-sm font-black uppercase tracking-[0.26em] text-slate-500">AI Persona Lab</div>
          <div className="text-xl font-black text-slate-950">AI 使用人格测试</div>
        </button>
        <nav className="flex rounded-full bg-white/70 p-1 text-sm font-bold text-slate-600 shadow-sm">
          {[
            ["home", "首页"],
            ["about", "关于"],
          ].map(([key, label]) => (
            <button
              className={`rounded-full px-4 py-2 transition ${page === key ? "bg-slate-950 text-white" : "hover:bg-white"}`}
              key={key}
              onClick={() => setPage(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">{children}</main>
    </div>
  );
}

function Home({ onStart, setPage, error }) {
  return (
    <section className="grid min-h-[calc(100vh-112px)] items-center gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <div className="mb-5 inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm">
          24 道量表题 + 3 道情境题
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
          测测你和 AI 协作时的隐藏人格
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650">
          它不是严肃诊断，更像一面互动镜子：看看你更常把 AI 当作灵感开关、执行助手、共创搭子，还是审计员和情绪整理伙伴。
        </p>
        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-bold text-red-700">
            {error}
          </div>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            className="rounded-2xl bg-slate-950 px-7 py-4 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800"
            onClick={onStart}
          >
            开始测试
          </button>
          <button
            className="rounded-2xl bg-white/75 px-7 py-4 text-base font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            onClick={() => setPage("about")}
          >
            了解规则
          </button>
        </div>
      </div>
      <div className="glass rounded-[2rem] p-5 shadow-glow">
        <div className="grid gap-3 sm:grid-cols-2">
          {DIMENSION_ORDER.map((dimension) => (
            <div className="rounded-3xl bg-white/80 p-5 shadow-sm" key={dimension}>
              <div className="mb-3 h-2 w-14 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
              <div className="text-lg font-black text-slate-950">{dimensions[dimension].personality}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{dimensions[dimension].name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScalePage({ session, answers, setAnswers, onNext }) {
  const answered = Object.keys(answers).length;
  const canContinue = answered === session.scaleQuestions.length;
  return (
    <section className="py-4">
      <PageTitle kicker="第一部分" title="量表答题" detail={`${answered}/${session.scaleQuestions.length} 已完成`} />
      <Progress value={(answered / session.scaleQuestions.length) * 100} />
      <div className="mt-6 grid gap-4">
        {session.scaleQuestions.map((question, index) => (
          <article className="glass rounded-3xl p-5 shadow-sm" key={question.id}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-black text-white">{index + 1}</span>
              <span className="rounded-full bg-white/75 px-3 py-1 text-sm font-bold text-slate-600">{question.dimensionName}</span>
            </div>
            <p className="text-lg font-black leading-8 text-slate-950">{question.text}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-5">
              {SCALE_OPTIONS.map((option) => (
                <button
                  className={`answer-ring rounded-2xl px-3 py-3 text-sm font-bold transition ${
                    answers[question.id] === option.value
                      ? "bg-slate-950 text-white shadow-lg"
                      : "bg-white/75 text-slate-700 hover:-translate-y-0.5 hover:bg-white"
                  }`}
                  key={option.value}
                  onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))}
                >
                  <span className="block text-lg font-black">{option.value}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
      <StickyAction canContinue={canContinue} label="进入情境题" onClick={onNext} />
    </section>
  );
}

function ScenarioPage({ session, answers, setAnswers, onBack, onFinish }) {
  const answered = Object.keys(answers).length;
  const canContinue = answered === session.scenarioQuestions.length;
  return (
    <section className="py-4">
      <PageTitle kicker="第二部分" title="情境选择" detail={`${answered}/${session.scenarioQuestions.length} 已完成`} />
      <Progress value={(answered / session.scenarioQuestions.length) * 100} />
      <div className="mt-6 grid gap-5">
        {session.scenarioQuestions.map((scenario) => (
          <article className="glass rounded-3xl p-5 shadow-sm" key={scenario.id}>
            <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-700">{scenario.id}</div>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{scenario.title}</h2>
            <p className="mt-3 text-base leading-8 text-slate-650">{scenario.text}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {scenario.options.map((option) => (
                <button
                  className={`rounded-3xl p-4 text-left transition ${
                    answers[scenario.id] === option.key
                      ? "bg-slate-950 text-white shadow-lg"
                      : "bg-white/75 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-white"
                  }`}
                  key={option.key}
                  onClick={() => setAnswers((current) => ({ ...current, [scenario.id]: option.key }))}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-400 text-sm font-black text-slate-950">
                      {option.key}
                    </span>
                    <span className="text-sm font-black">{option.type}</span>
                  </div>
                  <div className="text-sm leading-6">{option.text}</div>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="sticky bottom-4 mt-8 flex justify-between gap-3 rounded-3xl bg-white/82 p-3 shadow-glow backdrop-blur">
        <button className="rounded-2xl px-5 py-3 font-black text-slate-600 hover:bg-slate-100" onClick={onBack}>
          返回量表
        </button>
        <button
          className={`rounded-2xl px-6 py-3 font-black text-white transition ${
            canContinue ? "bg-slate-950 hover:bg-slate-800" : "cursor-not-allowed bg-slate-300"
          }`}
          disabled={!canContinue}
          onClick={onFinish}
        >
          查看结果
        </button>
      </div>
    </section>
  );
}

function ResultPage({ result, onRestart }) {
  const profile = PERSONA_PROFILES[result.profileKey] || PERSONA_PROFILES["均衡使用型"];
  const ordered = [...result.scores].sort((a, b) => DIMENSION_ORDER.indexOf(a.dimension) - DIMENSION_ORDER.indexOf(b.dimension));
  const summary = [
    `AI 使用人格测试结果：${result.title}`,
    `结果清晰度：${result.clarity}`,
    `六维得分：${ordered.map((score) => `${score.persona} ${score.percent}`).join("；")}`,
    `情境题倾向：${result.scenarioLeaders.join("、") || "未选择"}`,
  ].join("\n");

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
  }

  return (
    <section className="py-4">
      <div className="glass overflow-hidden rounded-[2rem] shadow-glow">
        <div className="bg-slate-950 px-6 py-8 text-white sm:px-8">
          <div className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">Result</div>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">{result.title}</h1>
          <div className="mt-5 inline-flex rounded-full bg-white/12 px-4 py-2 text-sm font-black">
            结果清晰度：{result.clarity}
          </div>
        </div>
        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <RadarChart scores={ordered} />
          <div className="grid gap-3">
            {ordered.map((score) => (
              <div className="rounded-3xl bg-white/80 p-4 shadow-sm" key={score.dimension}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-black text-slate-950">{score.persona}</div>
                    <div className="text-sm text-slate-500">{score.name}</div>
                  </div>
                  <div className="text-2xl font-black text-slate-950">{score.percent}</div>
                </div>
                <Progress value={score.percent} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="glass rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">情境题倾向</h2>
          <p className="mt-3 text-lg font-black text-cyan-800">
            {result.scenarioLeaders.join("、") || "未形成明显倾向"}
          </p>
          <p className="mt-3 leading-7 text-slate-650">
            {result.consistent ? "结果一致性较高" : "你可能在不同场景下切换 AI 使用方式"}
          </p>
        </article>
        <article className="glass rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">人格卡片</h2>
          <InfoGrid profile={profile} />
        </article>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="rounded-2xl bg-slate-950 px-6 py-4 font-black text-white shadow-glow hover:bg-slate-800" onClick={onRestart}>
          重新测试
        </button>
        <button className="rounded-2xl bg-white/80 px-6 py-4 font-black text-slate-800 shadow-sm hover:bg-white" onClick={copySummary}>
          复制结果摘要
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-6">
      <div className="glass rounded-[2rem] p-6 shadow-glow sm:p-8">
        <PageTitle kicker="About" title="关于测试" detail="本测试仅用于理解 AI 使用偏好，不用于心理诊断。" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["抽题方式", "每次从固定题库中抽取 24 道量表题，六个维度各 4 道，并保证每个维度含 1-2 道反向题。"],
            ["计分方式", "量表题按 1-5 分计分，反向题使用 6 - 原始分，每个维度转换为百分制。"],
            ["情境题", "每次随机抽取 3 道，只用于补充说明，不参与主分判定。"],
            ["结果解释", "系统会根据最高分、第二高分、差距和整体分布判断单一主型、混合型、均衡型或未显著型。"],
          ].map(([title, text]) => (
            <div className="rounded-3xl bg-white/75 p-5 shadow-sm" key={title}>
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-650">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageTitle({ kicker, title, detail }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">{kicker}</div>
        <h1 className="mt-2 text-4xl font-black text-slate-950">{title}</h1>
      </div>
      <div className="rounded-full bg-white/75 px-4 py-2 text-sm font-black text-slate-600 shadow-sm">{detail}</div>
    </div>
  );
}

function Progress({ value }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-white/80">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-300 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function StickyAction({ canContinue, label, onClick }) {
  return (
    <div className="sticky bottom-4 mt-8 flex justify-end rounded-3xl bg-white/82 p-3 shadow-glow backdrop-blur">
      <button
        className={`rounded-2xl px-6 py-3 font-black text-white transition ${
          canContinue ? "bg-slate-950 hover:bg-slate-800" : "cursor-not-allowed bg-slate-300"
        }`}
        disabled={!canContinue}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

function RadarChart({ scores }) {
  const center = 150;
  const radius = 104;
  const points = scores.map((score, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / scores.length;
    const distance = radius * (score.percent / 100);
    return {
      ...score,
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
      lx: center + Math.cos(angle) * (radius + 30),
      ly: center + Math.sin(angle) * (radius + 30),
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");
  const rings = [25, 50, 75, 100];

  return (
    <div className="rounded-3xl bg-white/80 p-4 shadow-sm">
      <svg className="h-auto w-full" viewBox="0 0 300 300" role="img" aria-label="六维人格雷达图">
        {rings.map((ring) => {
          const ringPoints = scores
            .map((_, index) => {
              const angle = -Math.PI / 2 + (index * Math.PI * 2) / scores.length;
              const distance = radius * (ring / 100);
              return `${center + Math.cos(angle) * distance},${center + Math.sin(angle) * distance}`;
            })
            .join(" ");
          return <polygon fill="none" key={ring} points={ringPoints} stroke="rgba(15,23,42,0.12)" strokeWidth="1" />;
        })}
        {points.map((point) => (
          <line key={point.dimension} stroke="rgba(15,23,42,0.12)" strokeWidth="1" x1={center} x2={point.lx} y1={center} y2={point.ly} />
        ))}
        <polygon fill="rgba(34,211,238,0.28)" points={polygon} stroke="#0f172a" strokeLinejoin="round" strokeWidth="3" />
        {points.map((point) => (
          <g key={point.dimension}>
            <circle cx={point.x} cy={point.y} fill="#0f172a" r="4" />
            <text fill="#334155" fontSize="11" fontWeight="800" textAnchor="middle" x={point.lx} y={point.ly}>
              {point.persona.replace("型", "")}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function InfoGrid({ profile }) {
  return (
    <div className="mt-4 grid gap-3">
      {[
        ["一句话画像", profile.line],
        ["典型提问方式", profile.ask],
        ["适合使用 AI 的场景", profile.scenes],
        ["容易踩的坑", profile.pitfall],
        ["推荐使用策略", profile.strategy],
        ["专属 Prompt 建议", profile.prompt],
      ].map(([title, text]) => (
        <div className="rounded-2xl bg-white/75 p-4" key={title}>
          <div className="text-sm font-black text-cyan-700">{title}</div>
          <div className="mt-2 leading-7 text-slate-700">{text}</div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [session, setSession] = useState(null);
  const [scaleAnswers, setScaleAnswers] = useState({});
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [error, setError] = useState("");

  const result = useMemo(() => {
    if (!session || page !== "result") return null;
    return calculateResult(scaleAnswers, scenarioAnswers, session);
  }, [page, scaleAnswers, scenarioAnswers, session]);

  function startTest() {
    try {
      const nextSession = createSession();
      setSession(nextSession);
      setScaleAnswers({});
      setScenarioAnswers({});
      setError("");
      setPage("scale");
    } catch (err) {
      setError(err.message);
      setPage("home");
    }
  }

  return (
    <Shell page={page} setPage={setPage}>
      {page === "home" ? <Home error={error} onStart={startTest} setPage={setPage} /> : null}
      {page === "about" ? <About /> : null}
      {page === "scale" && session ? (
        <ScalePage answers={scaleAnswers} onNext={() => setPage("scenario")} session={session} setAnswers={setScaleAnswers} />
      ) : null}
      {page === "scenario" && session ? (
        <ScenarioPage
          answers={scenarioAnswers}
          onBack={() => setPage("scale")}
          onFinish={() => setPage("result")}
          session={session}
          setAnswers={setScenarioAnswers}
        />
      ) : null}
      {page === "result" && result ? <ResultPage onRestart={startTest} result={result} /> : null}
    </Shell>
  );
}
