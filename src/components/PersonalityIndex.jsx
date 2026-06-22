import Mascot from "./Mascot.jsx";
import { PERSONA_ORDER, getProfile } from "../data/personalityProfiles.js";

export default function PersonalityIndex({ activePersonas = [] }) {
  return (
    <aside className="glass rounded-[2rem] p-4 shadow-glow lg:sticky lg:top-5">
      <div className="mb-4 px-1">
        <div className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">AI Creature Index</div>
        <h2 className="mt-1 text-2xl font-black text-slate-950">AI 能量图鉴</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
        {PERSONA_ORDER.map((persona) => {
          const profile = getProfile(persona);
          const active = activePersonas.includes(persona);
          return (
            <div
              className={`min-w-[142px] rounded-3xl border bg-white/78 p-3 transition ${
                active
                  ? "border-slate-950 shadow-lg"
                  : "border-white/70 opacity-45 grayscale-[0.35]"
              }`}
              key={persona}
            >
              <Mascot persona={persona} className="rounded-2xl" />
              <div className="mt-3 text-sm font-black leading-tight text-slate-950">{profile.energyName}</div>
              <div className="mt-1 text-xs font-bold text-slate-500">{profile.englishName}</div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

