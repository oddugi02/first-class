/** Detailed top-down / ¾-view food SVGs for recognizable plating */

interface FoodIllustrationProps {
  id: string;
  className?: string;
}

export function FoodIllustration({ id, className = 'h-[72px] w-[108px]' }: FoodIllustrationProps) {
  return (
    <svg
      viewBox="0 0 108 72"
      className={className}
      aria-hidden
      role="img"
    >
      <FoodArt id={id} />
    </svg>
  );
}

function FoodArt({ id }: { id: string }) {
  switch (id) {
    case 'app-korean':
      return (
        <>
          <ellipse cx="54" cy="58" rx="38" ry="10" fill="#E8E4DC" stroke="#C4A35A" strokeWidth="0.8" />
          <path d="M 22 48 Q 54 38 86 48 L 82 54 Q 54 62 26 54 Z" fill="#F5E6C8" stroke="#D4B87A" strokeWidth="0.6" />
          <ellipse cx="54" cy="46" rx="28" ry="8" fill="#EDD9A8" />
          <path d="M 38 44 Q 42 36 48 40 Q 52 34 58 42 Q 64 36 70 44" fill="#C8863A" stroke="#A66B2A" strokeWidth="0.5" />
          <circle cx="48" cy="40" r="4" fill="#E8C878" />
          <circle cx="62" cy="42" r="3.5" fill="#D4A84A" />
          <path d="M 50 32 L 52 28 L 56 30 Z" fill="#6B8E4E" />
        </>
      );
    case 'app-western':
      return (
        <>
          <ellipse cx="54" cy="58" rx="40" ry="10" fill="#F0EEEA" stroke="#C4A35A" strokeWidth="0.8" />
          <ellipse cx="54" cy="48" rx="32" ry="14" fill="#FAFAF8" stroke="#DDD" strokeWidth="0.5" />
          <ellipse cx="54" cy="44" rx="14" ry="10" fill="#1a1a1a" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r = 8 + (i % 3);
            return (
              <circle
                key={i}
                cx={54 + Math.cos(a) * r * 0.9}
                cy={44 + Math.sin(a) * r * 0.55}
                r="1.2"
                fill="#333"
              />
            );
          })}
          <path d="M 28 50 L 38 38 L 42 52 Z" fill="#E85D4A" stroke="#C44A3A" strokeWidth="0.5" />
          <path d="M 66 50 L 76 38 L 80 52 Z" fill="#E85D4A" stroke="#C44A3A" strokeWidth="0.5" />
          <circle cx="38" cy="52" r="2" fill="#F5F5F5" opacity="0.6" />
        </>
      );
    case 'main-korean':
      return (
        <>
          <ellipse cx="54" cy="60" rx="36" ry="9" fill="#2A2A2A" stroke="#C4A35A" strokeWidth="0.8" />
          <path d="M 24 50 Q 54 42 84 50 L 80 56 Q 54 64 28 56 Z" fill="#3D3D3D" stroke="#555" strokeWidth="0.6" />
          <ellipse cx="54" cy="48" rx="30" ry="10" fill="#F5F0E6" />
          <ellipse cx="54" cy="46" rx="22" ry="7" fill="#8B4518" opacity="0.85" />
          <circle cx="42" cy="44" r="5" fill="#F5E050" stroke="#E6C200" strokeWidth="0.4" />
          <path d="M 48 40 L 52 36 L 56 40 L 54 44 Z" fill="#E85D4A" />
          <path d="M 58 42 L 62 38 L 66 44" stroke="#6B8E4E" strokeWidth="2" fill="none" />
          <path d="M 36 46 L 40 42 L 44 48" stroke="#E85D4A" strokeWidth="1.5" fill="none" />
          <circle cx="64" cy="46" r="3" fill="#FF6B6B" />
        </>
      );
    case 'main-western':
      return (
        <>
          <ellipse cx="54" cy="60" rx="38" ry="9" fill="#E8E4DC" stroke="#C4A35A" strokeWidth="0.8" />
          <rect x="28" y="44" width="52" height="14" rx="3" fill="#2A2A2A" />
          <path d="M 30 48 L 78 48 L 76 54 L 32 54 Z" fill="#6B3A2A" />
          <path d="M 32 50 L 74 50" stroke="#8B5A3C" strokeWidth="0.8" />
          <path d="M 34 52 L 72 52" stroke="#A66B4A" strokeWidth="0.6" />
          <ellipse cx="54" cy="50" rx="18" ry="5" fill="#7A4028" />
          <path d="M 78 42 L 82 36 L 84 44 Z" fill="#4A6741" />
          <circle cx="82" cy="38" r="2" fill="#5C8A4E" />
        </>
      );
    case 'dessert-korean':
      return (
        <>
          <ellipse cx="54" cy="58" rx="36" ry="9" fill="#F5F3EF" stroke="#C4A35A" strokeWidth="0.8" />
          <rect x="30" y="42" width="14" height="12" rx="2" fill="#F8B4C4" stroke="#E89BB0" strokeWidth="0.4" />
          <rect x="48" y="40" width="12" height="14" rx="2" fill="#F4D58D" stroke="#D4B050" strokeWidth="0.4" />
          <rect x="64" y="42" width="14" height="12" rx="2" fill="#A8D8F0" stroke="#7BB8E0" strokeWidth="0.4" />
          <circle cx="38" cy="48" r="3" fill="#E8A0BF" />
          <circle cx="54" cy="46" r="3" fill="#F0C878" />
          <ellipse cx="68" cy="48" rx="8" ry="5" fill="#8B2500" opacity="0.7" />
        </>
      );
    case 'dessert-western':
      return (
        <>
          <ellipse cx="54" cy="58" rx="38" ry="9" fill="#F5F3EF" stroke="#C4A35A" strokeWidth="0.8" />
          <rect x="26" y="40" width="36" height="16" rx="2" fill="#F5E6C8" stroke="#D4C4A0" strokeWidth="0.5" />
          <path d="M 30 44 L 34 52 L 38 44 Z" fill="#F0D890" />
          <path d="M 42 42 L 46 50 L 50 42 Z" fill="#E8C878" />
          <path d="M 54 44 L 58 52 Z" fill="#F5E6B0" />
          <circle cx="72" cy="46" r="10" fill="#C5E8C5" stroke="#8BC48B" strokeWidth="0.5" />
          <circle cx="72" cy="44" r="6" fill="#E8F5E8" />
          <ellipse cx="72" cy="48" rx="5" ry="3" fill="#98D898" />
        </>
      );
    case 'snack-ramen':
      return (
        <>
          <ellipse cx="54" cy="60" rx="32" ry="8" fill="#F0EEEA" stroke="#C4A35A" strokeWidth="0.6" />
          <ellipse cx="54" cy="48" rx="28" ry="18" fill="#FAFAF8" stroke="#DDD" strokeWidth="1" />
          <ellipse cx="54" cy="50" rx="24" ry="12" fill="#C44A3A" />
          <ellipse cx="54" cy="48" rx="20" ry="10" fill="#E85D4A" />
          <path d="M 38 46 Q 42 38 46 44" stroke="#F5E050" strokeWidth="2" fill="none" />
          <circle cx="48" cy="42" r="5" fill="#F5E050" stroke="#E6C200" strokeWidth="0.5" />
          <path d="M 52 40 L 58 36 L 62 42" stroke="#6B8E4E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="58" cy="52" rx="14" ry="4" fill="#F5E6B8" opacity="0.5" />
        </>
      );
    case 'snack-noodle':
      return (
        <>
          <ellipse cx="54" cy="60" rx="34" ry="8" fill="#F0EEEA" stroke="#C4A35A" strokeWidth="0.6" />
          <ellipse cx="54" cy="48" rx="30" ry="16" fill="#FAFAF8" stroke="#DDD" strokeWidth="1" />
          <ellipse cx="54" cy="50" rx="26" ry="12" fill="#3D2914" />
          <path d="M 32 48 Q 40 44 48 50 Q 56 46 64 48 Q 72 44 76 50" stroke="#5C3D1E" strokeWidth="2" fill="none" />
          <path d="M 34 52 Q 54 48 74 52" stroke="#4A2F14" strokeWidth="1.5" fill="none" />
          <circle cx="44" cy="50" r="3" fill="#2A1A0A" />
          <circle cx="64" cy="50" r="3" fill="#2A1A0A" />
        </>
      );
    case 'snack-cookie':
      return (
        <>
          <ellipse cx="54" cy="58" rx="36" ry="9" fill="#F5F3EF" stroke="#C4A35A" strokeWidth="0.6" />
          <circle cx="38" cy="46" r="12" fill="#C68B59" stroke="#8B5A3C" strokeWidth="0.5" />
          <circle cx="38" cy="46" r="9" fill="#D4A574" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={34 + i * 2} cy={42 + (i % 2) * 4} r="1.5" fill="#5C3D20" />
          ))}
          <circle cx="54" cy="48" r="11" fill="#B87A48" stroke="#8B5A3C" strokeWidth="0.5" />
          <circle cx="70" cy="46" r="12" fill="#C68B59" stroke="#8B5A3C" strokeWidth="0.5" />
          <circle cx="70" cy="46" r="8" fill="#D4A574" />
        </>
      );
    case 'snack-jerky':
      return (
        <>
          <ellipse cx="54" cy="58" rx="38" ry="9" fill="#8B6914" stroke="#C4A35A" strokeWidth="0.6" />
          <rect x="28" y="42" width="52" height="14" rx="2" fill="#A67C3D" opacity="0.6" />
          <rect x="32" y="46" width="22" height="5" rx="1" fill="#5C3D20" />
          <rect x="36" y="52" width="18" height="4" rx="1" fill="#4A2F14" />
          <rect x="56" y="48" width="20" height="5" rx="1" fill="#5C3D20" />
          <circle cx="72" cy="50" r="6" fill="#F5F0E6" stroke="#DDD" strokeWidth="0.4" />
          <circle cx="76" cy="48" r="5" fill="#F0E8D8" stroke="#CCC" strokeWidth="0.3" />
        </>
      );
    default:
      return <rect x="30" y="30" width="48" height="24" rx="4" fill="#EEE" />;
  }
}

/** Clean empty plate after the guest has finished */
export function EmptyPlateIllustration({ className = 'h-[72px] w-[108px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 108 72" className={className} aria-hidden role="img">
      <ellipse cx="54" cy="58" rx="40" ry="10" fill="#E8E4DC" stroke="#C4A35A" strokeWidth="0.8" />
      <ellipse cx="54" cy="50" rx="32" ry="12" fill="#FAFAF8" stroke="#E0DDD6" strokeWidth="0.6" />
      <ellipse cx="54" cy="50" rx="26" ry="9" fill="#F5F3EF" />
      <path
        d="M 38 48 Q 54 52 70 48"
        stroke="#E8E4DC"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <ellipse cx="54" cy="50" rx="18" ry="5" fill="none" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="2 2" />
    </svg>
  );
}
