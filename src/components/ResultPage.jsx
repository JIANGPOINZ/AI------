import { useMemo, useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
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

