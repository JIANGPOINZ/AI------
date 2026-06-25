import { useMemo, useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import ResultExplanationPoster from "./ResultExplanationPoster.jsx";
import ResultShareCard from "./ResultShareCard.jsx";
import { getEnergyName, getProfile, getResultDisplay } from "../data/personalityProfiles.js";
const RESULT_STORAGE_KEY = "aiUseResultV11";

function readSavedResult() {
  try {
    const savedResult = globalThis.localStorage?.getItem(RESULT_STORAGE_KEY);
    return savedResult ? JSON.parse(savedResult) : null;
  } catch {
    return null;
  }
}

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

function getGapStrength(gap) {
  if (gap >= 4) return "倾向明显";
  if (gap >= 2) return "中等倾向";
  return "边界倾向";
}

function buildFallbackAxisResults(code, scores) {
  const start = getDecoderScore(scores, "start").percent;
  const control = getDecoderScore(scores, "control").percent;
  const cocreate = getDecoderScore(scores, "cocreate").percent;
  const outsource = getDecoderScore(scores, "outsource").percent;
  const audit = getDecoderScore(scores, "audit").percent;
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

function getAxisResultsForDecoder(result, code) {
  return result.axisResults?.length ? result.axisResults : buildFallbackAxisResults(code, result.scores || []);
}

function AxisScoreMeter({ axisResult, accent }) {
  const total = Math.max(1, axisResult.leftScore + axisResult.rightScore);
  const leftWidth = Math.round((axisResult.leftScore / total) * 100);
  const rightWidth = Math.round((axisResult.rightScore / total) * 100);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 text-xs font-black text-slate-500">
        <div className={axisResult.selected === axisResult.left ? "text-slate-900" : "text-slate-400"}>
          {axisResult.left} {axisResult.leftScore}
        </div>
        <div className={`text-right ${axisResult.selected === axisResult.right ? "text-slate-900" : "text-slate-400"}`}>
          {axisResult.right} {axisResult.rightScore}
        </div>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-white/80 shadow-inner">
        <div className="h-full" style={{ width: `${leftWidth}%`, background: axisResult.selected === axisResult.left ? accent : "#cbd5e1" }} />
        <div className="h-full" style={{ width: `${rightWidth}%`, background: axisResult.selected === axisResult.right ? accent : "#cbd5e1" }} />
      </div>
    </div>
  );
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

function DecoderCard({ axisResult, index }) {
  const letter = axisResult.selected;
  const item = SINGLE_LETTER_DECODER[letter] || MERGE_DELEGATE_DECODER[letter];
  const accent = DECODER_ACCENTS[index];
  const isBoundary = axisResult.strength === "边界倾向";

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
          <div className="mt-2 inline-flex rounded-full bg-white/72 px-3 py-1 text-xs font-black text-slate-600 shadow-sm">
            {axisResult.axis} 分差 {axisResult.gap}｜{axisResult.strength}
          </div>
        </div>
      </div>

      <div className="relative mt-5">
        <AxisScoreMeter accent={accent} axisResult={axisResult} />
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

function TypeDecoder({ code, result }) {
  const axisResults = getAxisResultsForDecoder(result, code);

  return (
    <section className="glass rounded-[2rem] p-5 shadow-glow sm:p-6">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">Type Decoder</div>
      <h2 className="mt-2 text-3xl font-black text-slate-950">为什么你是 {code}？</h2>
      <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-slate-500">
        四个字母来自 v1.1 的 primaryScores：每张卡展示对应轴两端分数、分差强度，以及整体倾向解释。
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {axisResults.map((axisResult, index) => (
          <DecoderCard axisResult={axisResult} index={index} key={axisResult.axis} />
        ))}
      </div>
      <FullScoresToggle scores={result.scores || []} />
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

function ResultPageContent({ result, onRestart }) {
  const cardRef = useRef(null);
  const posterRef = useRef(null);
  const [savingTarget, setSavingTarget] = useState("");
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

  async function saveExport(target, node, filename) {
    if (!node || savingTarget) return;
    setSavingTarget(target);
    setMobileShareFile(null);
    setSaveMessage("正在整理图片资源...");
    try {
      await waitForCardAssets(node);
      const blob = await createCardBlob(node);

      if (isMobileSaveTarget() && typeof globalThis.File === "function") {
        const file = new globalThis.File([blob], filename, { type: "image/png" });
        if (navigator.canShare?.({ files: [file] })) {
          setMobileShareFile(file);
          setSaveMessage("图片已生成。手机端请再点一次“保存到手机/相册”。");
          return;
        }
      }

      downloadBlob(blob, filename);
      setSaveMessage(isMobileSaveTarget() ? "如果手机没有自动保存，请在浏览器下载列表中查看，或换 Safari / Chrome 重试。" : "图片已生成，浏览器会自动下载 PNG 文件。");
    } catch {
      setSaveMessage("图片生成失败。请刷新页面后重试，或换 Safari / Chrome 打开。");
    } finally {
      setSavingTarget("");
    }
  }

  function saveCard() {
    return saveExport("card", cardRef.current, `ai-use-id-card-${aiId}.png`);
  }

  function savePoster() {
    return saveExport("poster", posterRef.current, `ai-use-report-${aiId}.png`);
  }
  return (
    <section className="result-page mx-auto max-w-5xl py-4">
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
          clarity={result.clarity}
          display={display}
          profile={profile}
          secondaryScore={secondaryScore}
          testDate={testDate}
        />
        <TypeDecoder code={display.personalityCode} result={result} />
        <HiddenMode mode={display.hiddenMode} score={getDecoderScore(result.scores, "emotion")} />
        <UserManual display={display} />
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            className="rounded-2xl bg-slate-950 px-6 py-4 font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
            disabled={Boolean(savingTarget)}
            onClick={saveCard}
          >
            {savingTarget === "card" ? "正在生成名片..." : "保存名片"}
          </button>
          <button
            className="rounded-2xl bg-cyan-500 px-6 py-4 font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-cyan-600 disabled:cursor-wait disabled:opacity-70"
            disabled={Boolean(savingTarget)}
            onClick={savePoster}
          >
            {savingTarget === "poster" ? "正在生成完整解码图..." : "保存完整解码图"}
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
        <div className="export-only pointer-events-none absolute left-[-9999px] top-0" aria-hidden="true">
          <div className="w-[1080px] bg-[#f7f8ff] px-[260px] py-[48px]">
            <ResultShareCard
              aiId={aiId}
              cardRef={cardRef}
              clarity={result.clarity}
              display={display}
              profile={profile}
              secondaryScore={secondaryScore}
              testDate={testDate}
            />
          </div>
          <div ref={posterRef}>
            <ResultExplanationPoster
              aiId={aiId}
              display={display}
              profile={profile}
              result={result}
              testDate={testDate}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default function ResultPage({ result: currentResult, onRestart }) {
  const savedResult = readSavedResult();
  const result = currentResult || savedResult;

  if (!result) {
    return (
      <section className="result-page mx-auto max-w-5xl py-16">
        <div className="glass rounded-[2rem] p-6 text-center shadow-glow sm:p-8">
          <p className="text-lg font-black text-slate-800">还没有测试结果，请先完成测试。</p>
          <button
            className="mt-6 rounded-2xl bg-slate-950 px-7 py-4 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800"
            onClick={onRestart}
            type="button"
          >
            开始测试
          </button>
        </div>
      </section>
    );
  }

  return <ResultPageContent onRestart={onRestart} result={result} />;
}