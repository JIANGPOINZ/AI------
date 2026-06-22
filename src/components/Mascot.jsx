import { PERSONA_ORDER, getProfile } from "../data/personalityProfiles.js";

function getMascotSource(profile, variant) {
  if (variant === "hero") return profile.heroImage || profile.image;
  if (variant === "full") return profile.image || profile.heroImage || profile.avatarImage;
  return profile.avatarImage || profile.heroImage || profile.image;
}

function MascotImage({ profile, variant, className = "" }) {
  return (
    <img
      alt={profile.mascot || profile.englishName}
      className={`h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.18)] ${className}`}
      decoding="async"
      draggable="false"
      loading={variant === "hero" ? "eager" : "lazy"}
      src={getMascotSource(profile, variant)}
    />
  );
}

function MascotCluster() {
  return (
    <div className="relative grid h-full w-full grid-cols-3 place-items-center gap-1 p-3 sm:gap-2 sm:p-4">
      {PERSONA_ORDER.map((persona, index) => {
        const profile = getProfile(persona);
        return (
          <div
            className="relative aspect-square w-full rounded-2xl bg-white/55 p-1 shadow-sm"
            key={persona}
            style={{ transform: `translateY(${index % 2 === 0 ? "4px" : "-4px"})` }}
          >
            <MascotImage profile={profile} variant="avatar" />
          </div>
        );
      })}
    </div>
  );
}

export default function Mascot({ persona, profile, className = "", imageClassName = "", variant = "avatar", frameless = false }) {
  const resolvedProfile = profile || getProfile(persona);
  const hasImage = Boolean(getMascotSource(resolvedProfile, variant));

  if (frameless) {
    return (
      <div className={`relative aspect-square ${className}`}>
        <div
          className="absolute inset-x-8 bottom-8 h-20 rounded-full blur-2xl"
          style={{ background: `${resolvedProfile.colors.accent}36` }}
        />
        <div
          className="absolute inset-6 rounded-full opacity-70 blur-3xl"
          style={{ background: `radial-gradient(circle, ${resolvedProfile.colors.accent}30 0, rgba(255,255,255,0) 66%)` }}
        />
        <div className="relative flex h-full w-full items-center justify-center p-0">
          {hasImage ? <MascotImage className={imageClassName} profile={resolvedProfile} variant={variant} /> : <MascotCluster />}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br ${resolvedProfile.colors.bg} ${className}`}
      style={{ boxShadow: `0 22px 60px ${resolvedProfile.colors.accent}26` }}
    >
      <div
        className="absolute inset-0 opacity-85"
        style={{
          background: `radial-gradient(circle at 50% 46%, ${resolvedProfile.colors.accent}33 0, transparent 34%), radial-gradient(circle at 20% 18%, rgba(255,255,255,0.92) 0, transparent 30%), radial-gradient(circle at 84% 78%, rgba(255,255,255,0.8) 0, transparent 26%)`,
        }}
      />
      <div className="absolute inset-x-8 bottom-5 h-10 rounded-full bg-slate-900/10 blur-xl" />
      <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-4">
        {hasImage ? <MascotImage className={imageClassName} profile={resolvedProfile} variant={variant} /> : <MascotCluster />}
      </div>
    </div>
  );
}

