import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import ResultShareCard from "./ResultShareCard.jsx";
import { getEnergyName, getProfile, getResultDisplay } from "../data/personalityProfiles.js";

const TYPE_DECODER = [
  {
    S: {
      english: "Spark First",
      chinese: "先让 AI 点火",
      detail: "你更倾向遇到任务时先让 AI 打开思路。",
      strength: "启动快，不容易卡在空白里。",
      reminder: "不要让 AI 的第一版框架直接决定你的最终方向。",
    },
    O: {
      english: "Own First",
      chinese: "先自己想一步",
      detail: "你更倾向先形成自己的想法，再让 AI 介入。",
      strength: "更能保留自己的判断和表达。",
      reminder: "任务太大时，不必等完全想清楚才使用 AI。",
    },
  },
  {
    C: {
      english: "Command",
      chinese: "我来控场",
      detail: "你会给 AI 明确的要求、格式、限制和修改方向。",
      strength: "主导感强，不容易被 AI 带跑。",
      reminder: "控制太强时，可能会错过 AI 自由发散出的意外角度。",
    },
    F: {
      english: "Flow",
      chinese: "顺着聊下去",
      detail: "你更愿意顺着 AI 的回答继续探索。",
      strength: "容易发现意外方向，适合开放式探索。",
      reminder: "容易越聊越散，最后需要主动收束。",
    },
  },
  {
    M: {
      english: "Merge",
      chinese: "一起共创",
      detail: "你更喜欢和 AI 多轮讨论、融合想法、反复打磨。",
      strength: "适合创意、选题、内容策划和方案生成。",
      reminder: "共创容易产生太多方向，记得让 AI 帮你排序。",
    },
    D: {
      english: "Delegate",
      chinese: "交给 AI 做",
      detail: "你更倾向把整理、归纳、初稿、排版等任务交给 AI。",
      strength: "效率高，能快速减少重复劳动。",
      reminder: "AI 完成了材料，不等于你已经真正理解内容。",
    },
  },
  {
    A: {
      english: "Audit",
      chinese: "先查一下",
      detail: "你会追问 AI 的依据、漏洞、风险和反例。",
      strength: "不容易被 AI 的流畅表达误导。",
      reminder: "过度审查会拖慢推进，低风险任务可以适当放手。",
    },
    R: {
      english: "Rely",
      chinese: "先用起来",
      detail: "你更容易先采纳 AI 给出的完整答案。",
      strength: "推进速度快，适合时间紧或低风险任务。",
      reminder: "重要问题仍然需要核查来源和判断依据。",
    },
  },
];

function padScore(value, length) {
  return String(Math.round(value || 0)).padStart(length, "0");
}

function createAiId(display, primaryScore, secondaryScore) {
  const code = (display.personalityCode || display.code || "AIXP").toUpperCase();
  return `${code}-${padScore(primaryScore?.percent, 3)}-${padScore(secondaryScore?.percent, 2)}`;
}

function todayLabel() {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function EnergyEvidence({ scores }) {
  const sortedScores = [...scores].sort((a, b) => b.percent - a.percent);

  return (
    <section className="glass rounded-[2rem] p-5 shadow-glow sm:p-6">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">Energy Evidence</div>
      <h2 className="mt-2 text-3xl font-black text-slate-950">你的六维能量分数</h2>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
        这些分数是人格码的依据：越高，说明你越常用这种方式和 AI 协作。
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {sortedScores.map((score, index) => (
          <article className={`rounded-[1.5rem] bg-white/72 p-4 shadow-sm ${index === 0 ? "ring-2 ring-cyan-200/70" : ""}`} key={score.dimension}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-black text-slate-950">{getEnergyName(score.persona)}</div>
                <div className="mt-1 text-xs font-bold text-slate-500">{index === 0 ? "Main Energy" : index === 1 ? "Sub Energy" : "Energy"}</div>
              </div>
              <div className="text-4xl font-black leading-none text-slate-900">{score.percent}</div>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/90">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-200"
                style={{ width: `${Math.max(0, Math.min(100, score.percent))}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function TypeDecoder({ code }) {
  const letters = code.split("");

  return (
    <section className="glass rounded-[2rem] p-5 shadow-glow sm:p-6">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">Type Decoder</div>
      <h2 className="mt-2 text-3xl font-black text-slate-950">为什么你是 {code}？</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {letters.map((letter, index) => {
          const item = TYPE_DECODER[index][letter];
          return (
            <article className="rounded-[1.6rem] bg-white/72 p-4 shadow-sm" key={`${letter}-${index}`}>
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/88 text-3xl font-black text-slate-800 shadow-sm">
                  {letter}
                </div>
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.12em] text-slate-500">{item.english}</div>
                  <h3 className="mt-1 text-lg font-black text-slate-950">{item.chinese}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-700">{item.detail}</p>
              <div className="mt-3 rounded-2xl bg-cyan-50/70 p-3 text-sm leading-6 text-slate-700">
                <span className="font-black text-cyan-700">优势：</span>{item.strength}
              </div>
              <div className="mt-2 rounded-2xl bg-amber-50/75 p-3 text-sm leading-6 text-slate-700">
                <span className="font-black text-amber-700">提醒：</span>{item.reminder}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function UserManual({ display }) {
  return (
    <section className="glass rounded-[2rem] p-5 shadow-glow sm:p-6">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">User Manual</div>
      <h2 className="mt-2 text-3xl font-black text-slate-950">你的 AI 使用说明书</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <article className="rounded-[1.6rem] bg-white/72 p-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">适合怎样使用 AI</div>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-700">{display.chineseLine}</p>
        </article>
        <article className="rounded-[1.6rem] bg-white/72 p-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">最容易踩的坑</div>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-700">{display.risk}</p>
        </article>
        <article className="rounded-[1.6rem] bg-white/72 p-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">推荐 Prompt</div>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-700">{display.prompt}</p>
        </article>
      </div>
    </section>
  );
}

export default function ResultPage({ result, onRestart }) {
  const cardRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const display = useMemo(() => getResultDisplay(result), [result]);
  const profile = display.guardianProfile || getProfile(result.profileKey);
  const ranked = [...result.scores].sort((a, b) => b.percent - a.percent);
  const primaryScore = ranked[0];
  const secondaryScore = ranked[1];
  const testDate = todayLabel();
  const aiId = createAiId(display, primaryScore, secondaryScore);

  const summary = [
    `AI 使用人格码：${display.personalityCode}`,
    `结果称号：${display.englishName}｜${display.chineseName}`,
    `一句话画像：${display.chineseLine}`,
    `主能量：${display.primaryEnergy.name} ${primaryScore.percent}`,
    `副能量：${display.secondaryEnergy.name} ${secondaryScore.percent}`,
    `隐藏模式：${display.hiddenMode.label}（${display.hiddenMode.description}）`,
    `典型口头禅：${display.catchphrase}`,
    `推荐 Prompt：${display.prompt}`,
  ].join("\n");

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
  }

  async function saveCard() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#f7f8ff",
      });
      const link = document.createElement("a");
      link.download = `ai-use-id-card-${aiId}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl py-4">
      <div className="mb-6">
        <div className="text-xs font-black uppercase tracking-[0.28em] text-cyan-700">AI Use ID Card</div>
        <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">你的 AI 使用人格名片</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          先记住人格码、角色和中文称号，再看它们各自代表什么。
        </p>
      </div>

      <div className="grid gap-6">
        <ResultShareCard
          aiId={aiId}
          cardRef={cardRef}
          clarity={result.clarity}
          display={display}
          primaryScore={primaryScore}
          profile={profile}
          secondaryScore={secondaryScore}
          testDate={testDate}
        />
        <EnergyEvidence scores={result.scores} />
        <TypeDecoder code={display.personalityCode} />
        <UserManual display={display} />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            className="rounded-2xl bg-slate-950 px-6 py-4 font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800"
            onClick={saveCard}
          >
            {saving ? "正在生成图片..." : "保存我的 AI 人格名片"}
          </button>
          <button
            className="rounded-2xl bg-white/80 px-6 py-4 font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            onClick={copySummary}
          >
            复制结果摘要
          </button>
          <button className="rounded-2xl bg-white/65 px-6 py-4 font-black text-slate-600 shadow-sm hover:bg-white" onClick={onRestart}>
            重新测试
          </button>
        </div>
      </div>
    </section>
  );
}

