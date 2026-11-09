import React from 'react';

interface UboteLogoProps {
  variant?: 'horizontal' | 'badge' | 'emblem' | 'stacked';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const UboteLogo: React.FC<UboteLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Dimension maps based on size
  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-5xl',
  };

  const subtitleSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  if (variant === 'badge') {
    return (
      <div
        className={`relative inline-flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-[#FAF8F5] border border-[#C5A869]/50 shadow-2xl shadow-black/40 group overflow-hidden ${className}`}
      >
        {/* Subtle luxury ambient gold glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A869]/10 via-transparent to-[#C5A869]/20 pointer-events-none" />
        <img
          src="/assets/ubote_logo_clean.png"
          alt="UBOTE Laser • Spa • Estética"
          className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain drop-shadow-sm group-hover:scale-102 transition-transform duration-500"
          loading="eager"
        />
      </div>
    );
  }

  if (variant === 'emblem') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/assets/ubote_emblem.png"
          alt="UBOTE Emblema Oficial"
          className={`${emblemSizes[size]} object-contain drop-shadow-md`}
          loading="eager"
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <div className="relative p-2 rounded-2xl bg-[#FAF8F5]/5 border border-[#C5A869]/30">
          <img
            src="/assets/ubote_emblem.png"
            alt="UBOTE"
            className={`${emblemSizes[size]} object-contain`}
          />
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-luxury font-bold tracking-widest text-white leading-none ${textSizes[size]}`}
          >
            UBOTE
          </span>
          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1 text-[#C5A869]">
              <span className="w-3 h-px bg-[#C5A869]/60"></span>
              <span
                className={`font-headline uppercase tracking-[0.22em] font-semibold ${subtitleSizes[size]}`}
              >
                Laser · Spa · Estética
              </span>
              <span className="w-3 h-px bg-[#C5A869]/60"></span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal Navbar Brand
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Queen Emblem with gentle gold halo */}
      <div className="relative shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#1A2636] to-[#0E1520] border border-[#C5A869]/50 shadow-md shadow-[#C5A869]/10 group-hover:border-[#C5A869] transition-all">
        <img
          src="/assets/ubote_emblem.png"
          alt="UBOTE Logo Oficial"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span className="font-luxury text-xl sm:text-2xl font-bold tracking-[0.16em] text-white group-hover:text-[#C5A869] transition-colors leading-none">
            UBOTE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] mb-0.5"></span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-px bg-[#C5A869]/60"></span>
            <span className="font-headline text-[9px] uppercase tracking-[0.18em] font-bold text-[#C5A869] leading-none whitespace-nowrap">
              Laser · Spa · Estética
            </span>
            <span className="w-2 h-px bg-[#C5A869]/60"></span>
          </div>
        )}
      </div>
    </div>
  );
};
