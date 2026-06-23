import Mascot from "./Mascot.jsx";
import { getProfile } from "../data/personalityProfiles.js";

function MainEnergyCard({ score, energy, accent }) {
  return (
    <div
      className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/90 via-white/72 to-white/48 p-5 shadow-lg"
      style={{ boxShadow: `0 20px 48px ${accent}24` }}
    >
      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Main Energy</div>
      <div className="mt-3 flex items-end justify-between gap-5">
        <div className="min-w-0">
          <div className="text-3xl font-black leading-tight text-slate-950">{energy?.name || "主能量"}</div>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{energy?.description || "这是你和 AI 协作时最明显的能量。"}</p>
        </div>
        <div className="text-6xl font-black leading-none text-slate-900">{score ? score.percent : "--"}</div>
      </div>
    </div>
  );
}

function SubEnergyPill({ score, energy }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[1.4rem] bg-white/62 px-4 py-3 shadow-sm">
      <div className="text-sm font-black text-slate-700">
        <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">Sub Energy</span>
        {energy?.name || "副能量"}
      </div>
      <div className="text-3xl font-black leading-none text-slate-800">{score ? score.percent : "--"}</div>
    </div>
  );
}

function StackedMascot({ guardian, secondaryProfile }) {
  const showSecondary = secondaryProfile && secondaryProfile.key !== guardian.key;

  return (
    <div className="relative mx-auto -mt-1 w-full max-w-[430px] py-2">
      {showSecondary ? (
        <div className="absolute right-4 top-6 z-0 w-[34%] rotate-6 rounded-[1.8rem] bg-white/52 p-2 opacity-75 shadow-lg blur-[0.1px] sm:right-8">
          <Mascot frameless profile={secondaryProfile} imageClassName="scale-110" variant="hero" />
        </div>
      ) : null}

      <Mascot
        frameless
        profile={guardian}
        className="relative z-10 mx-auto w-[68%] min-w-[260px] max-w-[380px]"
        imageClassName="scale-125 drop-shadow-[0_26px_38px_rgba(84,94,124,0.18)]"
        variant="hero"
      />
    </div>
  );
}

export default function ResultShareCard({
  cardRef,
  display,
  profile,
  primaryScore,
  secondaryScore,
  clarity,
  aiId,
  testDate,
}) {
  const guardian = display.guardianProfile || profile || display;
  const secondaryProfile = secondaryScore ? getProfile(secondaryScore.persona) : null;
  const colorProfile = guardian || display;
  const prompt = display.prompt || guardian.prompt;

  return (
    <section
      className={`relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2.6rem] bg-gradient-to-br ${colorProfile.colors.bg} p-4 shadow-glow sm:p-5`}
      ref={cardRef}
    >
      <div className="absolute left-[-18%] top-[-10%] h-56 w-56 rounded-full bg-white/50 blur-2xl" />
      <div className="absolute bottom-[-18%] right-[-16%] h-72 w-72 rounded-full bg-white/44 blur-2xl" />
      <div className="id-card-paper relative rounded-[2.25rem] border border-white/80 bg-white/58 px-5 py-6 text-center backdrop-blur-xl sm:px-7 sm:py-7">
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">AI USE ID CARD</div>
        <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">{aiId}</div>

        <div className="type-code-soft mx-auto mt-5 select-none text-center">
          {display.personalityCode}
        </div>

        <StackedMascot guardian={guardian} secondaryProfile={secondaryProfile} />

        <h1 className="mt-2 text-[32px] font-black leading-tight text-slate-950 sm:text-[38px]" style={{ color: colorProfile.colors.dark }}>
          {display.chineseName}
        </h1>
        <div className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-slate-500">{display.englishName}</div>
        <p className="mx-auto mt-4 max-w-[450px] text-lg font-bold leading-8 text-slate-700 sm:text-xl">{display.chineseLine}</p>

        <div className="mt-6 grid gap-3 text-left">
          <MainEnergyCard accent={colorProfile.colors.accent} energy={display.primaryEnergy} score={primaryScore} />
          <SubEnergyPill energy={display.secondaryEnergy} score={secondaryScore} />
          <div className="rounded-[1.4rem] bg-white/58 px-4 py-3 text-left shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Hidden Mode</span>
              <span className="rounded-full bg-white/72 px-2.5 py-1 text-xs font-black text-slate-600">{display.hiddenMode.shortLabel}</span>
            </div>
            <div className="mt-1 text-sm font-black text-slate-800">{display.hiddenMode.label}</div>
            <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{display.hiddenMode.description}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 text-left">
          <div className="rounded-[1.6rem] bg-white/66 p-4">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Typical Line / 典型口头禅</div>
            <p className="mt-2 text-sm font-black leading-6 text-slate-800">“{display.catchphrase}”</p>
          </div>
          <div className="rounded-[1.6rem] bg-white/66 p-4">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Recommended Prompt</div>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{prompt}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 pt-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
          <span>{testDate}</span>
          <span>{clarity}</span>
        </div>
      </div>
    </section>
  );
}

