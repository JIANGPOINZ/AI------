import Mascot from "./Mascot.jsx";
import { getProfile } from "../data/personalityProfiles.js";

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
  secondaryScore,
  clarity,
  aiId,
  testDate,
}) {
  const guardian = display.guardianProfile || profile || display;
  const secondaryProfile = secondaryScore ? getProfile(secondaryScore.persona) : null;
  const colorProfile = guardian || display;

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

        <div className="mt-6 flex items-center justify-between gap-3 pt-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
          <span>{testDate}</span>
          <span>{clarity}</span>
        </div>
      </div>
    </section>
  );
}

