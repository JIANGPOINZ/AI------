import { useEffect, useMemo, useState } from "react";
import ResultPage from "./components/ResultPage.jsx";
import Mascot from "./components/Mascot.jsx";
import { calculateResultV11, generateQuestionSetV11 } from "./data/questionBankV11.js";
import { getProfile, PERSONA_ORDER } from "./data/personalityProfiles.js";

const RESULT_STORAGE_KEY = "aiUseResultV11";

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
          AI Use ID Card / v1.1 自然情境题库
        </div>
        <h1 className="max-w-3xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
          AI 使用人格测试
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-slate-700">
          通过 20 个真实使用场景，看看你更习惯怎样和 AI 协作。
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          新版不再使用直白量表题，而是用两难选择和自然情境来判断四字母人格码。
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

function QuestionPage({ answers, currentIndex, onBack, onChoose, question, total }) {
  const selected = answers[currentIndex]?.optionId;
  const selectedOptionKey = selected ? `${question.id}-${selected}` : null;
  const progress = ((currentIndex + (selected ? 1 : 0)) / total) * 100;

  return (
    <section className="grid min-h-[calc(100vh-112px)] items-center py-4">
      <div>
        <PageTitle kicker={question.type === "dilemma" ? "Dilemma" : "Scenario"} title="AI 使用小剧场" detail={`${currentIndex + 1} / ${total}`} />
        <div className="mt-4">
          <Progress value={progress} />
        </div>
        <article className="glass mt-6 rounded-[2rem] p-5 shadow-glow sm:p-8" key={question.id}>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/72 px-4 py-2 text-sm font-black text-slate-600">{question.title}</span>
          </div>
          <p className="min-h-[92px] text-2xl font-black leading-10 text-slate-950 sm:text-3xl">{question.text}</p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {question.options.map((option) => {
              const optionKey = `${question.id}-${option.id}`;
              return (
                <button
                  className={`rounded-[1.6rem] border p-4 text-left text-base font-bold leading-7 transition ${
                    selectedOptionKey === optionKey
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg"
                      : "border-white/80 bg-white/76 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-white"
                  }`}
                  key={optionKey}
                  onClick={() => onChoose(question, option)}
                >
                  <span className="mr-2 inline-grid h-8 w-8 place-items-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                    {option.id}
                  </span>
                  {option.text}
                </button>
              );
            })}
          </div>
        </article>
        <div className="mt-5 flex justify-between gap-3">
          <button
            className="rounded-2xl bg-white/75 px-5 py-3 font-black text-slate-600 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            disabled={currentIndex === 0}
            onClick={onBack}
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

function About() {
  return (
    <section className="py-6">
      <div className="glass rounded-[2rem] p-6 shadow-glow sm:p-8">
        <PageTitle kicker="About" title="关于 v1.1 测试" detail="本测试仅用于理解 AI 使用偏好，不用于心理诊断。" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["题库结构", "后台题库共 40 道：16 道两难选择题 + 24 道自然情境题。"],
            ["抽题方式", "每次抽取 20 道，四个轴各抽 2 道两难题和 3 道自然情境题，并打乱顺序。"],
            ["计分方式", "四字母人格码只由 primaryScores 决定，secondarySignals 只用于补充解释。"],
            ["Hidden Mode", "共感力单独累计 emotionScore，只影响 Moon / Soft / Tool Mode。"],
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

export default function App() {
  const [page, setPage] = useState("home");
  const [questionSet, setQuestionSet] = useState([]);
  const [answerRecords, setAnswerRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  const result = useMemo(() => {
    const answeredCount = answerRecords.filter(Boolean).length;
    if (page !== "result" || answeredCount !== questionSet.length || questionSet.length === 0) return null;
    return calculateResultV11(answerRecords, questionSet);
  }, [answerRecords, page, questionSet]);

  useEffect(() => {
    if (!result) return;
    localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
  }, [result]);

  function startTest() {
    try {
      const nextQuestionSet = generateQuestionSetV11();
      setQuestionSet(nextQuestionSet);
      setAnswerRecords([]);
      setCurrentIndex(0);
      setError("");
      setPage("question");
    } catch (err) {
      setError(err.message);
      setPage("home");
    }
  }

  function chooseAnswer(question, option) {
    const record = {
      questionId: question.id,
      optionId: option.id,
      primaryScores: { ...option.primaryScores },
      secondarySignals: { ...option.secondarySignals },
      emotionScore: option.emotionScore || 0,
    };

    setAnswerRecords((current) => {
      const next = [...current];
      next[currentIndex] = record;
      return next;
    });

    window.setTimeout(() => {
      if (currentIndex < questionSet.length - 1) {
        setCurrentIndex((index) => index + 1);
      } else {
        setPage("result");
      }
    }, 180);
  }

  return (
    <Shell page={page} setPage={setPage}>
      {page === "home" ? <Home error={error} onStart={startTest} setPage={setPage} /> : null}
      {page === "about" ? <About /> : null}
      {page === "question" && questionSet[currentIndex] ? (
        <QuestionPage
          answers={answerRecords}
          currentIndex={currentIndex}
          onBack={() => setCurrentIndex((index) => Math.max(0, index - 1))}
          onChoose={chooseAnswer}
          question={questionSet[currentIndex]}
          total={questionSet.length}
        />
      ) : null}
      {page === "result" ? <ResultPage onRestart={startTest} result={result} /> : null}
    </Shell>
  );
}
