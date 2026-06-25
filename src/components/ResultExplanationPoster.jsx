import Mascot from "./Mascot.jsx";

const SINGLE_LETTER_DECODER = {
  S: {
    english: "Spark First",
    chinese: "先让 AI 点火",
    reason: "你在多个启动场景中更常选择让 AI 先打开思路，因此系统判断你更偏向 S｜Spark First。",
    advantage: "启动快，不容易卡在空白里。",
    reminder: "不要让 AI 的第一版框架直接决定你的最终方向。",
  },
  O: {
    english: "Own First",
    chinese: "先自己想一步",
    reason: "你在多个启动场景中更常选择先形成自己的想法，再让 AI 介入，因此系统判断你更偏向 O｜Own First。",
    advantage: "更能保留自己的判断和表达。",
    reminder: "任务太大时，不必等完全想清楚才使用 AI。",
  },
  C: {
    english: "Command",
    chinese: "我来控场",
    reason: "你在多个协作场景中更常给 AI 明确要求、格式和限制，因此系统判断你更偏向 C｜Command。",
    advantage: "主导感强，不容易被 AI 带跑。",
    reminder: "控制太强时，可能会错过 AI 自由发散出的意外角度。",
  },
  F: {
    english: "Flow",
    chinese: "顺着聊下去",
    reason: "你在多个协作场景中更愿意顺着 AI 的回答继续探索，因此系统判断你更偏向 F｜Flow。",
    advantage: "容易发现意外方向，适合开放式探索。",
    reminder: "容易越聊越散，最后需要主动收束。",
  },
  M: {
    english: "Merge",
    chinese: "一起共创",
    reason: "你在多个创作和推进场景中更常选择和 AI 多轮讨论、融合想法、反复打磨，因此系统判断你更偏向 M｜Merge。",
    advantage: "适合创意、选题、内容策划和方案生成。",
    reminder: "共创容易产生太多方向，记得让 AI 帮你排序。",
  },
  D: {
    english: "Delegate",
    chinese: "交给 AI 做",
    reason: "你在多个任务场景中更常选择让 AI 承担整理、归纳、初稿或执行工作，因此系统判断你更偏向 D｜Delegate。",
    advantage: "效率高，能快速减少重复劳动。",
    reminder: "AI 完成了材料，不等于你已经真正理解内容。",
  },
  A: {
    english: "Audit",
    chinese: "先查一下",
    reason: "你在多个判断场景中更常追问依据、漏洞、风险和反例，因此系统判断你更偏向 A｜Audit。",
    advantage: "不容易被 AI 的流畅表达误导。",
    reminder: "过度审查会拖慢推进，低风险任务可以适当放手。",
  },
  R: {
    english: "Rely",
    chinese: "先用起来",
    reason: "你在多个判断场景中更常先采纳 AI 给出的完整答案并推进，因此系统判断你更偏向 R｜Rely。",
    advantage: "推进速度快，适合时间紧或低风险任务。",
    reminder: "重要问题仍然需要核查来源和判断依据。",
  },
};

const DECODER_ACCENTS = ["#38bdf8", "#fb923c", "#a855f7", "#10b981"];

function getEnergyScore(scores, dimension) {
  return scores.find((score) => score.dimension === dimension)?.percent || 0;
}

function getGapStrength(gap) {
  if (gap >= 4) return "倾向明显";
  if (gap >= 2) return "中等倾向";
  return "边界倾向";
}

function buildFallbackAxisResults(code, scores) {
  const start = getEnergyScore(scores, "start");
  const control = getEnergyScore(scores, "control");
  const cocreate = getEnergyScore(scores, "cocreate");
  const outsource = getEnergyScore(scores, "outsource");
  const audit = getEnergyScore(scores, "audit");
  const items = [
    { axis: "S/O", left: "S", right: "O", leftScore: start, rightScore: 100 - start, selected: code[0] },
    { axis: "C/F", left: "C", right: "F", leftScore: control, rightScore: 100 - control, selected: code[1] },
    { axis: "M/D", left: "M", right: "D", leftScore: cocreate, rightScore: outsource, selected: code[2] },
    { axis: "A/R", left: "A", right: "R", leftScore: audit, rightScore: 100 - audit, selected: code[3] },
  ];
  return items.map((item) => {
    const gap = Math.abs(item.leftScore - item.rightScore);
    return { ...item, gap, strength: getGapStrength(gap) };
  });
}

function getAxisResults(result, code) {
  return result.axisResults?.length ? result.axisResults : buildFallbackAxisResults(code, result.scores || []);
}

function AxisBar({ axisResult, accent }) {
  const total = Math.max(1, axisResult.leftScore + axisResult.rightScore);
  const leftWidth = Math.round((axisResult.leftScore / total) * 100);
  const rightWidth = Math.round((axisResult.rightScore / total) * 100);

  return (
    <div className="mt-4">
      <div className="mb-2 grid grid-cols-2 text-[22px] font-black text-slate-500">
        <span className={axisResult.selected === axisResult.left ? "text-slate-950" : "text-slate-400"}>{axisResult.left} {axisResult.leftScore}</span>
        <span className={`text-right ${axisResult.selected === axisResult.right ? "text-slate-950" : "text-slate-400"}`}>{axisResult.right} {axisResult.rightScore}</span>
      </div>
      <div className="flex h-4 overflow-hidden rounded-full bg-white shadow-inner">
        <div style={{ width: `${leftWidth}%`, background: axisResult.selected === axisResult.left ? accent : "#cbd5e1" }} />
        <div style={{ width: `${rightWidth}%`, background: axisResult.selected === axisResult.right ? accent : "#cbd5e1" }} />
      </div>
    </div>
  );
}

function DecoderPosterCard({ axisResult, index }) {
  const item = SINGLE_LETTER_DECODER[axisResult.selected];
  const accent = DECODER_ACCENTS[index];

  return (
    <article className="rounded-[34px] border border-white/90 bg-white/76 p-7 shadow-sm">
      <div className="flex items-start gap-5">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-[26px] bg-white text-[54px] font-black shadow-sm" style={{ color: accent }}>
          {axisResult.selected}
        </div>
        <div className="min-w-0">
          <div className="text-[20px] font-black uppercase tracking-[0.14em] text-slate-400">{item.english}</div>
          <h3 className="mt-1 text-[32px] font-black leading-tight text-slate-950">{item.chinese}</h3>
          <div className="mt-3 inline-flex rounded-full bg-white/80 px-4 py-2 text-[18px] font-black text-slate-600 shadow-sm">
            {axisResult.axis} 分差 {axisResult.gap}｜{axisResult.strength}
          </div>
        </div>
      </div>
      <AxisBar accent={accent} axisResult={axisResult} />
      <div className="mt-6 grid gap-4 text-[22px] font-bold leading-9 text-slate-700">
        <p><span className="font-black text-cyan-700">为什么：</span>{item.reason}</p>
        <p><span className="font-black text-emerald-700">优势：</span>{item.advantage}</p>
        <p><span className="font-black text-amber-700">提醒：</span>{item.reminder}</p>
      </div>
    </article>
  );
}

export default function ResultExplanationPoster({ display, profile, result, aiId, testDate }) {
  const guardian = display.guardianProfile || profile || display;
  const colorProfile = guardian || display;
  const axisResults = getAxisResults(result, display.personalityCode);
  const emotionScore = result.scores?.find((score) => score.dimension === "emotion")?.percent || 0;

  return (
    <section className={`w-[1080px] overflow-hidden bg-gradient-to-br ${colorProfile.colors.bg} p-10 text-slate-900`}>
      <div className="rounded-[44px] border border-white/85 bg-white/60 p-9 shadow-glow backdrop-blur-xl">
        <div className="flex items-start justify-between gap-8">
          <div>
            <div className="text-[22px] font-black uppercase tracking-[0.28em] text-slate-500">AI USE REPORT</div>
            <h1 className="mt-4 text-[58px] font-black leading-tight text-slate-950">AI 使用人格解码报告</h1>
            <div className="mt-4 text-[20px] font-black uppercase tracking-[0.16em] text-slate-400">{aiId} · {testDate}</div>
          </div>
          <div className="grid h-40 w-40 shrink-0 place-items-center rounded-[36px] bg-white/70 p-3 shadow-sm">
            <Mascot frameless profile={guardian} imageClassName="scale-125" variant="hero" />
          </div>
        </div>

        <div className="mt-9 rounded-[36px] bg-white/72 p-8 shadow-sm">
          <div className="text-[118px] font-black leading-none tracking-[0.16em] text-slate-800 drop-shadow-sm">{display.personalityCode}</div>
          <h2 className="mt-5 text-[48px] font-black leading-tight" style={{ color: colorProfile.colors.dark }}>{display.chineseName}</h2>
          <div className="mt-2 text-[22px] font-black uppercase tracking-[0.16em] text-slate-500">{display.englishName}</div>
          <p className="mt-5 text-[28px] font-bold leading-11 text-slate-700">{display.chineseLine}</p>
        </div>

        <div className="mt-9">
          <div className="text-[22px] font-black uppercase tracking-[0.24em] text-cyan-700">Type Decoder</div>
          <h2 className="mt-3 text-[42px] font-black text-slate-950">为什么你是 {display.personalityCode}？</h2>
          <div className="mt-6 grid gap-5">
            {axisResults.map((axisResult, index) => (
              <DecoderPosterCard axisResult={axisResult} index={index} key={axisResult.axis} />
            ))}
          </div>
        </div>

        <div className="mt-9 rounded-[34px] border border-white/90 bg-white/72 p-7 shadow-sm">
          <div className="text-[20px] font-black uppercase tracking-[0.22em] text-violet-700">Hidden Mode</div>
          <div className="mt-4 flex items-center justify-between gap-8">
            <div>
              <h2 className="text-[34px] font-black text-slate-950">{display.hiddenMode.label}</h2>
              <p className="mt-3 text-[24px] font-bold leading-9 text-slate-700">{display.hiddenMode.description}</p>
            </div>
            <div className="rounded-[28px] bg-white/84 px-7 py-5 text-center shadow-sm">
              <div className="text-[18px] font-black uppercase tracking-[0.18em] text-slate-400">共感力</div>
              <div className="mt-1 text-[56px] font-black leading-none text-slate-900">{emotionScore}</div>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-5">
          <div className="text-[22px] font-black uppercase tracking-[0.24em] text-cyan-700">User Manual</div>
          {[
            ["适合怎样使用 AI", display.chineseLine],
            ["容易踩的坑", display.risk],
            ["一个改进建议", display.prompt],
          ].map(([title, body]) => (
            <div className="rounded-[30px] bg-white/72 p-6 text-[23px] font-bold leading-9 text-slate-700 shadow-sm" key={title}>
              <div className="mb-2 text-[18px] font-black uppercase tracking-[0.16em] text-slate-500">{title}</div>
              {body}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
