import { useMemo, useState } from "react";
import ResultPage from "./components/ResultPage.jsx";
import Mascot from "./components/Mascot.jsx";
import { dimensions, questions } from "./data/questions.js";
import { scenarios, scenarioTypes } from "./data/scenarios.js";
import { getProfile, PERSONA_ORDER, HYBRID_NAMES } from "./data/personalityProfiles.js";

const DIMENSION_ORDER = ["start", "control", "cocreate", "audit", "outsource", "emotion"];
const SCALE_OPTIONS = [
  { value: 1, label: "完全不像我" },
  { value: 2, label: "有点不像" },
  { value: 3, label: "说不准" },
  { value: 4, label: "有点像我" },
  { value: 5, label: "太像我了" },
];

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

function createBalancedQuestionOrder(groupedQuestions) {
  const buckets = Object.fromEntries(
    DIMENSION_ORDER.map((dimension) => [dimension, shuffle(groupedQuestions[dimension])]),
  );
  let previousLastDimension = null;
  const rounds = Array.from({ length: 4 }, () => {
    const order = shuffle(DIMENSION_ORDER);
    if (previousLastDimension && order[0] === previousLastDimension) {
      const swapIndex = order.findIndex((dimension) => dimension !== previousLastDimension);
      [order[0], order[swapIndex]] = [order[swapIndex], order[0]];
    }
    previousLastDimension = order[order.length - 1];
    return order;
  });

  return rounds.flatMap((round) => round.map((dimension) => buckets[dimension].shift()));
}

function createSession() {
  validateQuestionBank();
  const sampledByDimension = Object.fromEntries(
    DIMENSION_ORDER.map((dimension) => {
      const group = questions.filter((question) => question.dimension === dimension);
      const reverseItems = shuffle(group.filter((question) => question.reverse));
      const normalItems = shuffle(group.filter((question) => !question.reverse));
      const reverseTake = Math.random() < 0.5 ? 1 : 2;
      return [
        dimension,
        shuffle([
          ...reverseItems.slice(0, reverseTake),
          ...normalItems.slice(0, 4 - reverseTake),
        ]),
      ];
    }),
  );
  return {
    scaleQuestions: createBalancedQuestionOrder(sampledByDimension),
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
    primaryPersonas,
    scenarioLeaders,
    consistent,
  };
}

function Shell({ page, setPage, children }) {
  return (
    <div className="mesh-bg min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <button className="text-left" onClick={() => setPage("home")}>
          <div className="text-sm font-black uppercase tracking-[0.26em] text-slate-500">AI Use ID Card</div>
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
    <section className="grid min-h-[calc(100vh-112px)] items-center gap-8 py-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <div className="mb-5 inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm">
          AI Use ID Card / AI 使用人格名片
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
          AI 使用人格测试
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-slate-700">
          你和 AI 的相处方式，可能比你想象中更有性格。
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          本测试不是心理诊断，而是一个关于 AI 互动风格的趣味测评。
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
            开始探索我的 AI 使用人格
          </button>
          <button
            className="rounded-2xl bg-white/75 px-7 py-4 text-base font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            onClick={() => setPage("about")}
          >
            了解测试规则
          </button>
        </div>
      </div>
      <div className="glass rounded-[2rem] p-5 shadow-glow">
        <div className="mb-4 px-1">
          <div className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">AI Creature Index</div>
          <h2 className="mt-1 text-2xl font-black text-slate-950">六个软乎乎的 AI 小角色</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PERSONA_ORDER.map((persona, index) => {
            const profile = getProfile(persona);
            return (
              <div
                className="rounded-3xl bg-white/72 p-3 shadow-sm"
                key={persona}
                style={{ transform: `translateY(${index % 2 === 0 ? "0" : "10px"})` }}
              >
                <Mascot persona={persona} className="rounded-2xl" />
                <div className="mt-3 text-sm font-black text-slate-950">{profile.englishName}</div>
                <div className="mt-1 text-xs font-bold text-slate-500">{profile.chineseName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScalePage({ session, answers, setAnswers, currentIndex, setCurrentIndex, onNext }) {
  const question = session.scaleQuestions[currentIndex];
  const answered = Object.keys(answers).length;
  const selected = answers[question.id];
  const progress = ((currentIndex + (selected ? 1 : 0)) / session.scaleQuestions.length) * 100;

  function chooseAnswer(value) {
    setAnswers((current) => ({ ...current, [question.id]: value }));
    window.setTimeout(() => {
      if (currentIndex < session.scaleQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onNext();
      }
    }, 180);
  }

  return (
    <section className="grid min-h-[calc(100vh-112px)] items-center py-4">
      <div>
        <PageTitle
          kicker="AI Energy Scan"
          title="正在收集你的 AI 互动能量"
          detail={`${currentIndex + 1} / ${session.scaleQuestions.length}`}
        />
        <div className="mt-4">
          <Progress value={progress} />
        </div>
        <article className="glass mt-6 rounded-[2rem] p-5 shadow-glow sm:p-8">
          <div className="mb-5 inline-flex rounded-full bg-white/72 px-4 py-2 text-sm font-black text-slate-600">
            正在收集你的 AI 互动能量：{currentIndex + 1} / {session.scaleQuestions.length}
          </div>
          <p className="min-h-[112px] text-2xl font-black leading-10 text-slate-950 sm:text-3xl">
            {question.text}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {SCALE_OPTIONS.map((option) => (
              <button
                className={`answer-ring min-h-[72px] rounded-3xl px-4 py-4 text-base font-black transition ${
                  selected === option.value
                    ? "bg-slate-950 text-white shadow-lg"
                    : "bg-white/78 text-slate-700 hover:-translate-y-0.5 hover:bg-white"
                }`}
                key={option.value}
                onClick={() => chooseAnswer(option.value)}
              >
                <span className="block text-2xl font-black">{option.value}</span>
                {option.label}
              </button>
            ))}
          </div>
        </article>
        <div className="mt-5 flex justify-between">
          <button
            className="rounded-2xl bg-white/75 px-5 py-3 font-black text-slate-600 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            上一题
          </button>
          <div className="rounded-2xl bg-white/65 px-5 py-3 text-sm font-bold text-slate-500">
            选择后自动进入下一题
          </div>
        </div>
      </div>
    </section>
  );
}

function ScenarioPage({ session, answers, setAnswers, currentIndex, setCurrentIndex, onBack, onFinish }) {
  const scenario = session.scenarioQuestions[currentIndex];
  const answered = Object.keys(answers).length;
  const selected = answers[scenario.id];
  const progress = ((currentIndex + (selected ? 1 : 0)) / session.scenarioQuestions.length) * 100;

  function chooseOption(key) {
    setAnswers((current) => ({ ...current, [scenario.id]: key }));
    window.setTimeout(() => {
      if (currentIndex < session.scenarioQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onFinish();
      }
    }, 180);
  }

  return (
    <section className="grid min-h-[calc(100vh-112px)] items-center py-4">
      <div>
        <PageTitle
          kicker="Scenario"
          title="AI 小剧场"
          detail={`${currentIndex + 1} / ${session.scenarioQuestions.length}`}
        />
        <p className="mt-3 text-base font-bold text-slate-500">下面是几个日常场景，选出你最可能的反应。</p>
        <div className="mt-4">
          <Progress value={progress} />
        </div>
        <article className="glass mt-6 rounded-[2rem] p-5 shadow-glow sm:p-8">
          <div className="mb-4 inline-flex rounded-full bg-white/72 px-4 py-2 text-sm font-black text-slate-600">
            AI 小剧场：{answered + (selected ? 0 : 1)} / {session.scenarioQuestions.length}
          </div>
          <h2 className="text-3xl font-black text-slate-950">{scenario.title}</h2>
          <p className="mt-4 text-base leading-8 text-slate-650">{scenario.text}</p>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {scenario.options.map((option) => (
              <button
                className={`rounded-[1.6rem] border p-4 text-left text-base font-bold leading-7 transition ${
                  selected === option.key
                    ? "border-slate-950 bg-slate-950 text-white shadow-lg"
                    : "border-white/80 bg-white/76 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-white"
                }`}
                key={option.key}
                onClick={() => chooseOption(option.key)}
              >
                <span className="mr-2 inline-grid h-8 w-8 place-items-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                  {option.key}
                </span>
                {option.text}
              </button>
            ))}
          </div>
        </article>
        <div className="mt-5 flex justify-between gap-3">
          <button
            className="rounded-2xl bg-white/75 px-5 py-3 font-black text-slate-600 shadow-sm transition hover:bg-white"
            onClick={() => {
              if (currentIndex === 0) {
                onBack();
              } else {
                setCurrentIndex(currentIndex - 1);
              }
            }}
          >
            上一题
          </button>
          <div className="rounded-2xl bg-white/65 px-5 py-3 text-sm font-bold text-slate-500">
            选择后自动进入下一步
          </div>
        </div>
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
            ["结果名片", "完成后生成一张 AI Use ID Card，可以保存为图片，也可以复制结果摘要。"],
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
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-200 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [session, setSession] = useState(null);
  const [scaleAnswers, setScaleAnswers] = useState({});
  const [scenarioAnswers, setScenarioAnswers] = useState({});
  const [scaleIndex, setScaleIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
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
      setScaleIndex(0);
      setScenarioIndex(0);
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
        <ScalePage
          answers={scaleAnswers}
          currentIndex={scaleIndex}
          onNext={() => {
            setScenarioIndex(0);
            setPage("scenario");
          }}
          session={session}
          setAnswers={setScaleAnswers}
          setCurrentIndex={setScaleIndex}
        />
      ) : null}
      {page === "scenario" && session ? (
        <ScenarioPage
          answers={scenarioAnswers}
          currentIndex={scenarioIndex}
          onBack={() => {
            setScaleIndex(session.scaleQuestions.length - 1);
            setPage("scale");
          }}
          onFinish={() => setPage("result")}
          session={session}
          setAnswers={setScenarioAnswers}
          setCurrentIndex={setScenarioIndex}
        />
      ) : null}
      {page === "result" && result ? <ResultPage onRestart={startTest} result={result} /> : null}
    </Shell>
  );
}
