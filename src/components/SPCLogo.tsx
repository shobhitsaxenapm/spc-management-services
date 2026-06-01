import React from 'react';

interface SPCLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

export function SPCLogo({ className = '', showText = true, size = 'md', dark = false }: SPCLogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg', sub: 'text-[6px]', gap: 'gap-1.5', letterSpacing: '0.15em' },
    md: { icon: 36, text: 'text-xl', sub: 'text-[7px]', gap: 'gap-2', letterSpacing: '0.18em' },
    lg: { icon: 48, text: 'text-3xl', sub: 'text-[9px]', gap: 'gap-3', letterSpacing: '0.2em' },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Diamond dot pattern */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* The diamond is made of dots arranged in a rotated grid pattern */}
        {/* Row 1 (top) - 1 dot */}
        <circle cx="24" cy="4" r="2" fill="#7DD3E8" opacity="0.4" />
        {/* Row 2 - 3 dots */}
        <circle cx="18" cy="8.5" r="2" fill="#7DD3E8" opacity="0.45" />
        <circle cx="24" cy="8.5" r="2" fill="#6BCAE2" opacity="0.5" />
        <circle cx="30" cy="8.5" r="2" fill="#7DD3E8" opacity="0.45" />
        {/* Row 3 - 5 dots */}
        <circle cx="12" cy="13" r="2" fill="#6BCAE2" opacity="0.5" />
        <circle cx="18" cy="13" r="2" fill="#5AC0DC" opacity="0.6" />
        <circle cx="24" cy="13" r="2" fill="#4DB8D7" opacity="0.65" />
        <circle cx="30" cy="13" r="2" fill="#5AC0DC" opacity="0.6" />
        <circle cx="36" cy="13" r="2" fill="#6BCAE2" opacity="0.5" />
        {/* Row 4 - 7 dots */}
        <circle cx="6" cy="17.5" r="2" fill="#5AC0DC" opacity="0.55" />
        <circle cx="12" cy="17.5" r="2" fill="#4DB8D7" opacity="0.65" />
        <circle cx="18" cy="17.5" r="2" fill="#3FAFD1" opacity="0.75" />
        <circle cx="24" cy="17.5" r="2" fill="#32A6CB" opacity="0.8" />
        <circle cx="30" cy="17.5" r="2" fill="#3FAFD1" opacity="0.75" />
        <circle cx="36" cy="17.5" r="2" fill="#4DB8D7" opacity="0.65" />
        <circle cx="42" cy="17.5" r="2" fill="#5AC0DC" opacity="0.55" />
        {/* Row 5 (center) - 9 dots */}
        <circle cx="0" cy="22" r="2" fill="#4DB8D7" opacity="0.6" />
        <circle cx="6" cy="22" r="2" fill="#3FAFD1" opacity="0.7" />
        <circle cx="12" cy="22" r="2" fill="#32A6CB" opacity="0.8" />
        <circle cx="18" cy="22" r="2" fill="#259DC5" opacity="0.85" />
        <circle cx="24" cy="22" r="2" fill="#1A95BF" opacity="0.9" />
        <circle cx="30" cy="22" r="2" fill="#259DC5" opacity="0.85" />
        <circle cx="36" cy="22" r="2" fill="#32A6CB" opacity="0.8" />
        <circle cx="42" cy="22" r="2" fill="#3FAFD1" opacity="0.7" />
        <circle cx="48" cy="22" r="2" fill="#4DB8D7" opacity="0.6" />
        {/* Row 6 - 7 dots */}
        <circle cx="6" cy="26.5" r="2" fill="#259DC5" opacity="0.75" />
        <circle cx="12" cy="26.5" r="2" fill="#1A95BF" opacity="0.85" />
        <circle cx="18" cy="26.5" r="2" fill="#108DB9" opacity="0.9" />
        <circle cx="24" cy="26.5" r="2" fill="#0885B3" opacity="0.95" />
        <circle cx="30" cy="26.5" r="2" fill="#108DB9" opacity="0.9" />
        <circle cx="36" cy="26.5" r="2" fill="#1A95BF" opacity="0.85" />
        <circle cx="42" cy="26.5" r="2" fill="#259DC5" opacity="0.75" />
        {/* Row 7 - 5 dots */}
        <circle cx="12" cy="31" r="2" fill="#0885B3" opacity="0.9" />
        <circle cx="18" cy="31" r="2" fill="#037DAD" opacity="0.95" />
        <circle cx="24" cy="31" r="2" fill="#0075A7" opacity="1" />
        <circle cx="30" cy="31" r="2" fill="#037DAD" opacity="0.95" />
        <circle cx="36" cy="31" r="2" fill="#0885B3" opacity="0.9" />
        {/* Row 8 - 3 dots */}
        <circle cx="18" cy="35.5" r="2" fill="#0075A7" opacity="0.95" />
        <circle cx="24" cy="35.5" r="2" fill="#006D9F" opacity="1" />
        <circle cx="30" cy="35.5" r="2" fill="#0075A7" opacity="0.95" />
        {/* Row 9 (bottom) - 1 dot */}
        <circle cx="24" cy="40" r="2" fill="#006D9F" opacity="1" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${s.text} font-bold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>SPC</span>
          <span className={`${s.sub} font-semibold uppercase tracking-[${s.letterSpacing}] ${dark ? 'text-slate-400' : 'text-slate-400'} mt-0.5`}>Management</span>
        </div>
      )}
    </div>
  );
}
