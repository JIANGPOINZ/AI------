import { useMemo, useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import ResultShareCard from "./ResultShareCard.jsx";
import { getEnergyName, getProfile, getResultDisplay } from "../data/personalityProfiles.js";

const SINGLE_LETTER_DECODER = {
  S: {
    english: "Spark First",
    chinese: "先让 AI 点火",
    dimension: "start",
    reason: "你的点火力较高，说明你更习惯遇到任务时先让 AI 打开思路。",
    advantage: "启动快，不容易卡在空白里。",
    reminder: "不要让 AI 的第一版框架直接决定你的最终方向。",
  },
  O: {
    english: "Own First",
    chinese: "先自己想一步",
    dimension: "start",
    reason: "你的点火力不算高，说明你更倾向先形成自己的想法，再让 AI 介入。",
    advantage: "更能保留自己的判断和表达。",
    reminder: "任务太大时，不必等完全想清楚才使用 AI。",
  },
  C: {
    english: "Command",
    chinese: "我来控场",
    dimension: "control",
    reason: "你的控场力较高，说明你会给 AI 明确的要求、格式、限制和修改方向。",
    advantage: "主导感强，不容易被 AI 带跑。",
    reminder: "控制太强时，可能会错过 AI 自由发散出的意外角度。",
  },
  F: {
    english: "Flow",
    chinese: "顺着聊下去",
    dimension: "control",
    reason: "你的控场力不算高，说明你更愿意顺着 AI 的回答继续探索。",
    advantage: "容易发现意外方向，适合开放式探索。",
    reminder: "容易越聊越散，最后需要主动收束。",
  },
  A: {
    english: "Audit",
    chinese: "先查一下",
    dimension: "audit",
    reason: "你的查错力较高，说明你会追问 AI 的依据、漏洞、风险和反例。",
    advantage: "不容易被 AI 的流畅表达误导。",
    reminder: "过度审查会拖慢推进，低风险任务可以适当放手。",
  },
  R: {
    english: "Rely",
    chinese: "先用起来",
    dimension: "audit",
    reason: "你的查错力不算高，说明你更容易先采纳 AI 给出的完整答案。",
    advantage: "推进速度快，适合时间紧或低风险任务。",
    reminder: "重要问题仍然需要核查来源和判断依据。",
  },
};

const MERGE_DELEGATE_DECODER = {
  M: {
    english: "Merge",
    chinese: "一起共创",
    reason: "你的共创力高于或接近高于代办力，说明你更喜欢和 AI 多轮讨论、融合想法、反复打磨，而不是只让它代办。",
    advantage: "适合创意、选题、内容策划和方案生成。",
    reminder: "共创容易产生太多方向，记得让 AI 帮你排序。",
  },
  D: {
    english: "Delegate",
    chinese: "交给 AI 做",
    reason: "你的代办力高于共创力，说明你更倾向把整理、归纳、初稿、排版等任务交给 AI。",
    advantage: "效率高，能快速减少重复劳动。",
    reminder: "AI 完成了材料，不等于你已经真正理解内容。",
  },
};

const DECODER_ACCENTS = ["#38bdf8", "#fb923c", "#a855f7", "#10b981"];
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


function isMobileSaveTarget() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 768;
}

function getExportPixelRatio(node) {
  const rect = node.getBoundingClientRect();
  const longSide = Math.max(rect.width, rect.height, 1);
  const maxLongSide = isMobileSaveTarget() ? 2200 : 3200;
  const maxRatio = isMobileSaveTarget() ? 1.5 : 2;
  return Math.max(1, Math.min(maxRatio, maxLongSide / longSide));
}

function dataUrlToBlob(dataUrl) {
  const [header, payload] = dataUrl.split(",");
  const mime = header.match(/data:(.*?);base64/)?.[1] || "image/png";
  const binary = globalThis.atob(payload);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new globalThis.Blob([bytes], { type: mime });
}

async function waitForCardAssets(node) {
  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
      }
      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    }),
  );
  if (document.fonts?.ready) await document.fonts.ready.catch(() => undefined);
  await new Promise((resolve) => globalThis.requestAnimationFrame(resolve));
}

async function createCardBlob(node) {
  const options = {
    cacheBust: false,
    pixelRatio: getExportPixelRatio(node),
    backgroundColor: "#f7f8ff",
  };
  const blob = await toBlob(node, options);
  if (blob) return blob;
  const dataUrl = await toPng(node, options);
  return dataUrlToBlob(dataUrl);
}

function downloadBlob(blob, filename) {
  const url = globalThis.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => globalThis.URL.revokeObjectURL(url), 30000);
}

function getDecoderScore(scores, dimension) {
  return scores.find((score) => score.dimension === dimension || score.persona === dimension) || { dimension, persona: dimension, percent: 0 };
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value || 0)));
}

function getSingleScoreStrength(score) {
  if (score >= 70) return "倾向明显";
  if (score >= 55) return "中等倾向";
  if (score >= 45) return "边界倾向";
  return "反向倾向明显";
}

function getMergeDelegateStrength(diff) {
  if (diff >= 15) return "明显偏 M";
  if (diff >= 5) return "中等偏 M";
  if (diff >= -4) return "M/D 接近，场景切换明显";
  return "偏 D";
}

function EnergyMeter({ label, score, accent, selected = true }) {
  const percent = clampPercent(score);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-xs font-black text-slate-500">
        <span>{label}</span>
        <span className={selected ? "text-slate-900" : "text-slate-400"}>{percent}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/80 shadow-inner">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${percent}%`,
            background: selected ? `linear-gradient(90deg, ${accent}, #f9c7e8)` : "#cbd5e1",
          }}
        />
      </div>
    </div>
  );
}

function DecoderTextBlock({ label, children, tone }) {
  const colorClass = tone === "warm" ? "text-amber-700" : tone === "green" ? "text-emerald-700" : "text-cyan-700";

  return (
    <div className="border-t border-white/75 pt-3">
      <div className={`text-[11px] font-black uppercase tracking-[0.16em] ${colorClass}`}>{label}</div>
      <p className="mt-1 text-sm font-bold leading-6 text-slate-700">{children}</p>
    </div>
  );
}

function SingleLetterCard({ letter, index, scores }) {
  const item = SINGLE_LETTER_DECODER[letter];
  const score = getDecoderScore(scores, item.dimension);
  const percent = clampPercent(score.percent);
  const strength = getSingleScoreStrength(percent);
  const isBoundary = strength === "边界倾向";
  const accent = DECODER_ACCENTS[index];

  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-white/85 bg-white/72 p-4 shadow-sm ring-1 ring-white/70 sm:p-5">
      <div className="absolute right-4 top-4 h-16 w-16 rounded-full opacity-20 blur-xl" style={{ background: accent }} />
      <div className="relative flex items-start gap-3">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.25rem] bg-white text-4xl font-black shadow-sm"
          style={{ color: accent, boxShadow: `0 16px 32px ${accent}1f` }}
        >
          {letter}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{item.english}</div>
          <h3 className="mt-1 text-xl font-black leading-tight text-slate-950">{item.chinese}</h3>
          <div className="mt-2 inline-flex rounded-full bg-white/72 px-3 py-1 text-xs font-black text-slate-600 shadow-sm">{strength}</div>
        </div>
      </div>

      <div className="relative mt-5">
        <EnergyMeter accent={accent} label={getEnergyName(item.dimension)} score={percent} />
      </div>

      {isBoundary ? (
        <p className="mt-3 rounded-2xl bg-white/70 px-3 py-2 text-xs font-black leading-5 text-slate-500">
          你的这个字母不是绝对倾向，更可能会随任务场景变化。
        </p>
      ) : null}

      <div className="mt-4 grid gap-3">
        <DecoderTextBlock label="为什么是这个字母">{item.reason}</DecoderTextBlock>
        <DecoderTextBlock label="优势" tone="green">{item.advantage}</DecoderTextBlock>
        <DecoderTextBlock label="提醒" tone="warm">{item.reminder}</DecoderTextBlock>
      </div>
    </article>
  );
}

function MergeDelegateCard({ letter, index, scores }) {
  const item = MERGE_DELEGATE_DECODER[letter];
  const cocreate = getDecoderScore(scores, "cocreate");
  const outsource = getDecoderScore(scores, "outsource");
  const cocreatePercent = clampPercent(cocreate.percent);
  const outsourcePercent = clampPercent(outsource.percent);
  const diff = cocreatePercent - outsourcePercent;
  const strength = getMergeDelegateStrength(diff);
  const isBoundary = diff >= -4 && diff <= 4;
  const accent = DECODER_ACCENTS[index];

  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-white/85 bg-white/72 p-4 shadow-sm ring-1 ring-white/70 sm:p-5">
      <div className="absolute right-4 top-4 h-16 w-16 rounded-full opacity-20 blur-xl" style={{ background: accent }} />
      <div className="relative flex items-start gap-3">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.25rem] bg-white text-4xl font-black shadow-sm"
          style={{ color: accent, boxShadow: `0 16px 32px ${accent}1f` }}
        >
          {letter}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{item.english}</div>
          <h3 className="mt-1 text-xl font-black leading-tight text-slate-950">{item.chinese}</h3>
          <div className="mt-2 inline-flex rounded-full bg-white/72 px-3 py-1 text-xs font-black text-slate-600 shadow-sm">{strength}</div>
        </div>
      </div>

      <div className="relative mt-5 grid gap-3">
        <EnergyMeter accent={accent} label="共创力" score={cocreatePercent} selected={letter === "M"} />
        <EnergyMeter accent={accent} label="代办力" score={outsourcePercent} selected={letter === "D"} />
      </div>

      {isBoundary ? (
        <p className="mt-3 rounded-2xl bg-white/70 px-3 py-2 text-xs font-black leading-5 text-slate-500">
          你的这个字母不是绝对倾向，更可能会随任务场景变化。
        </p>
      ) : null}

      <div className="mt-4 grid gap-3">
        <DecoderTextBlock label="为什么是这个字母">{item.reason}</DecoderTextBlock>
        <DecoderTextBlock label="优势" tone="green">{item.advantage}</DecoderTextBlock>
        <DecoderTextBlock label="提醒" tone="warm">{item.reminder}</DecoderTextBlock>
      </div>
    </article>
  );
}

function FullScoresToggle({ scores }) {
  const [open, setOpen] = useState(false);
  const sortedScores = [...scores].sort((a, b) => b.percent - a.percent);

  return (
    <div className="mt-5 rounded-[1.5rem] border border-white/80 bg-white/45 p-3">
      <button
        className="flex w-full items-center justify-between gap-3 rounded-[1.2rem] bg-white/70 px-4 py-3 text-left text-sm font-black text-slate-700 shadow-sm transition hover:bg-white"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>查看完整六维分数</span>
        <span className="text-xs text-slate-400">{open ? "收起" : "展开"}</span>
      </button>
      {open ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {sortedScores.map((score) => (
            <div className="rounded-2xl bg-white/70 px-3 py-3 shadow-sm" key={score.dimension}>
              <EnergyMeter accent="#7dd3fc" label={getEnergyName(score.dimension)} score={score.percent} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TypeDecoder({ code, scores }) {
  const letters = code.split("");

  return (
    <section className="glass rounded-[2rem] p-5 shadow-glow sm:p-6">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">Type Decoder</div>
      <h2 className="mt-2 text-3xl font-black text-slate-950">为什么你是 {code}？</h2>
      <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-500">
        四个字母不是标签堆叠，而是由点火力、控场力、共创力与代办力的比较、查错力共同推出来的使用倾向。
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {letters.map((letter, index) => (
          index === 2 ? (
            <MergeDelegateCard index={index} key={`${letter}-${index}`} letter={letter} scores={scores} />
          ) : (
            <SingleLetterCard index={index} key={`${letter}-${index}`} letter={letter} scores={scores} />
          )
        ))}
      </div>
      <FullScoresToggle scores={scores} />
    </section>
  );
}

function HiddenMode({ mode, score }) {
  const percent = clampPercent(score?.percent);

  return (
    <section className="glass rounded-[2rem] p-5 shadow-glow sm:p-6">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">Hidden Mode</div>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-950">Moon Mode / Soft Mode / Tool Mode</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-500">共感力不进入四字母人格码，但会影响你把 AI 当作情绪缓冲、陪伴整理，还是纯工具来使用。</p>
        </div>
        <div className="w-full rounded-[1.5rem] bg-white/70 p-4 shadow-sm sm:max-w-xs">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">共感力</div>
              <div className="mt-1 text-lg font-black text-slate-950">{mode.label}</div>
            </div>
            <div className="text-4xl font-black leading-none text-slate-900">{percent}</div>
          </div>
          <div className="mt-3">
            <EnergyMeter accent="#8b5cf6" label={mode.shortLabel} score={percent} />
          </div>
        </div>
      </div>
      <p className="mt-4 rounded-[1.5rem] bg-white/58 px-4 py-3 text-sm font-bold leading-6 text-slate-700 shadow-sm">{mode.description}</p>
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
  const [saveMessage, setSaveMessage] = useState("");
  const [mobileShareFile, setMobileShareFile] = useState(null);
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

  async function shareGeneratedCard() {
    if (!mobileShareFile || !navigator.canShare?.({ files: [mobileShareFile] })) return;
    try {
      await navigator.share({
        files: [mobileShareFile],
        title: "AI \u4f7f\u7528\u4eba\u683c\u540d\u7247",
        text: "\u4fdd\u5b58\u6216\u5206\u4eab\u6211\u7684 AI \u4f7f\u7528\u4eba\u683c\u540d\u7247\u3002",
      });
      setMobileShareFile(null);
      setSaveMessage("\u5df2\u6253\u5f00\u624b\u673a\u4fdd\u5b58/\u5206\u4eab\u9762\u677f\uff0c\u53ef\u4ee5\u4fdd\u5b58\u5230\u76f8\u518c\u6216\u53d1\u9001\u7ed9\u670b\u53cb\u3002");
    } catch (error) {
      if (error?.name === "AbortError") {
        setSaveMessage("\u5df2\u53d6\u6d88\u4fdd\u5b58\u3002\u8bf7\u518d\u6b21\u70b9\u51fb\u4fdd\u5b58\u5230\u624b\u673a/\u76f8\u518c\u3002");
      } else {
        setSaveMessage("\u624b\u673a\u4fdd\u5b58\u9762\u677f\u6253\u5f00\u5931\u8d25\u3002\u8bf7\u6362 Safari / Chrome \u91cd\u8bd5\u3002");
      }
    }
  }

  async function saveCard() {
    if (!cardRef.current || saving) return;
    const filename = `ai-use-id-card-${aiId}.png`;
    setSaving(true);
    setMobileShareFile(null);
    setSaveMessage("\u6b63\u5728\u6574\u7406\u56fe\u7247\u8d44\u6e90...");
    try {
      await waitForCardAssets(cardRef.current);
      const blob = await createCardBlob(cardRef.current);

      if (isMobileSaveTarget() && typeof globalThis.File === "function") {
        const file = new globalThis.File([blob], filename, { type: "image/png" });
        if (navigator.canShare?.({ files: [file] })) {
          setMobileShareFile(file);
          setSaveMessage("\u56fe\u7247\u5df2\u751f\u6210\u3002\u624b\u673a\u7aef\u8bf7\u518d\u70b9\u4e00\u6b21\u201c\u4fdd\u5b58\u5230\u624b\u673a/\u76f8\u518c\u201d\u3002");
          return;
        }
      }

      downloadBlob(blob, filename);
      setSaveMessage(isMobileSaveTarget() ? "\u5982\u679c\u624b\u673a\u6ca1\u6709\u81ea\u52a8\u4fdd\u5b58\uff0c\u8bf7\u5728\u6d4f\u89c8\u5668\u4e0b\u8f7d\u5217\u8868\u4e2d\u67e5\u770b\uff0c\u6216\u6362 Safari / Chrome \u91cd\u8bd5\u3002" : "\u56fe\u7247\u5df2\u751f\u6210\uff0c\u6d4f\u89c8\u5668\u4f1a\u81ea\u52a8\u4e0b\u8f7d PNG \u6587\u4ef6\u3002");
    } catch {
      setSaveMessage("\u56fe\u7247\u751f\u6210\u5931\u8d25\u3002\u8bf7\u5237\u65b0\u9875\u9762\u540e\u91cd\u8bd5\uff0c\u6216\u6362 Safari / Chrome \u6253\u5f00\u3002");
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
          profile={profile}
          secondaryScore={secondaryScore}
          testDate={testDate}
        />
        <TypeDecoder code={display.personalityCode} scores={result.scores} />
        <HiddenMode mode={display.hiddenMode} score={getDecoderScore(result.scores, "emotion")} />
        <UserManual display={display} />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            className="rounded-2xl bg-slate-950 px-6 py-4 font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
            disabled={saving}
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
        {mobileShareFile ? (
          <div className="flex justify-center">
            <button
              className="rounded-2xl bg-white/90 px-6 py-4 font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              onClick={shareGeneratedCard}
            >
              {"\u4fdd\u5b58\u5230\u624b\u673a/\u76f8\u518c"}
            </button>
          </div>
        ) : null}
        {saveMessage ? <p className="text-center text-sm font-bold leading-6 text-slate-500" role="status">{saveMessage}</p> : null}
      </div>
    </section>
  );
}

