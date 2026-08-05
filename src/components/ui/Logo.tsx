import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = 'w-10 h-10', size }) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="calendarGradient" x1="20" y1="20" x2="180" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0077FF" />
          <stop offset="100%" stopColor="#0044CC" />
        </linearGradient>

        <linearGradient id="bookGradient" x1="30" y1="110" x2="170" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#0033B3" />
        </linearGradient>

        <linearGradient id="greenBadge" x1="115" y1="55" x2="155" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="pencilGradient" x1="130" y1="80" x2="175" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0088FF" />
          <stop offset="100%" stopColor="#002288" />
        </linearGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0055FF" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#softShadow)">
        {/* Calendar Body Base */}
        <rect x="42" y="32" width="116" height="100" rx="20" fill="url(#calendarGradient)" />

        {/* 3 Calendar Binder Rings */}
        <rect x="62" y="20" width="10" height="24" rx="5" fill="#0055FF" stroke="#FFFFFF" strokeWidth="3" />
        <rect x="95" y="20" width="10" height="24" rx="5" fill="#0055FF" stroke="#FFFFFF" strokeWidth="3" />
        <rect x="128" y="20" width="10" height="24" rx="5" fill="#0055FF" stroke="#FFFFFF" strokeWidth="3" />

        {/* Calendar Inner White Sheet */}
        <rect x="52" y="48" width="96" height="74" rx="12" fill="#FFFFFF" />

        {/* Bullet items on left of sheet */}
        <circle cx="68" cy="65" r="4" fill="#0066FF" />
        <rect x="78" y="62" width="28" height="6" rx="3" fill="#0066FF" />

        <circle cx="68" cy="81" r="4" fill="#0066FF" />
        <rect x="78" y="78" width="28" height="6" rx="3" fill="#0066FF" />

        <circle cx="68" cy="97" r="4" fill="#0066FF" />
        <rect x="78" y="94" width="28" height="6" rx="3" fill="#0066FF" />

        {/* Green Checkmark Badge on right of sheet */}
        <rect x="114" y="58" width="26" height="26" rx="7" fill="url(#greenBadge)" />
        <path d="M120 71L124 75L134 65" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Open Book Wings at bottom */}
        {/* Left Page */}
        <path
          d="M26 142 C 60 128, 92 138, 100 152 C 100 152, 100 178, 100 178 C 92 162, 60 152, 26 166 Z"
          fill="url(#bookGradient)"
          stroke="#0044CC"
          strokeWidth="2"
        />
        <path
          d="M30 144 C 62 131, 92 140, 98 152"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Right Page */}
        <path
          d="M174 142 C 140 128, 108 138, 100 152 C 100 152, 100 178, 100 178 C 108 162, 140 152, 174 166 Z"
          fill="url(#bookGradient)"
          stroke="#0044CC"
          strokeWidth="2"
        />
        <path
          d="M170 144 C 138 131, 108 140, 102 152"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Spine line */}
        <path d="M100 138 L100 178" stroke="#002288" strokeWidth="3" strokeLinecap="round" />

        {/* Pencil writing on right page */}
        <g transform="translate(15, -5)">
          <path
            d="M142 108 L168 82 C 170 80, 174 80, 176 82 L178 84 C 180 86, 180 90, 178 92 L152 118 L138 122 Z"
            fill="url(#pencilGradient)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <path d="M138 122 L145 115" stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="138,122 142,118 140,116" fill="#001144" />
        </g>
      </g>
    </svg>
  );
};

interface LogoProps {
  variant?: 'icon-only' | 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkTheme?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  darkTheme = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 72,
  };

  const currentSize = iconSizes[size];

  if (variant === 'icon-only') {
    return <LogoIcon size={currentSize} className={className} />;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <LogoIcon size={currentSize * 1.5} className="mb-2" />
        <div className="flex flex-col items-center">
          <span className={`font-black text-2xl sm:text-3xl tracking-tight leading-none ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
            Planejador
          </span>
          <div className="flex items-center space-x-1 mt-0.5">
            <span className="font-black text-3xl sm:text-4xl text-blue-600 tracking-tight leading-none">
              BNCC
            </span>
            <span className="text-emerald-500 font-extrabold text-xl leading-none">
              ✨
            </span>
          </div>
          <p className="text-xs font-bold mt-1.5 space-x-1">
            <span className={darkTheme ? 'text-slate-200' : 'text-slate-800'}>Planeje.</span>{' '}
            <span className="text-blue-600">Organize.</span>{' '}
            <span className="text-emerald-600">Inspire.</span>
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <div className={`h-px w-6 ${darkTheme ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <span className={`text-[10px] uppercase font-bold tracking-wider ${darkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
              Planejamentos alinhados à BNCC
            </span>
            <div className={`h-px w-6 ${darkTheme ? 'bg-slate-700' : 'bg-slate-200'}`} />
          </div>
        </div>
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className={`flex items-center space-x-3.5 ${className}`}>
      <LogoIcon size={currentSize} className="shrink-0" />
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5 leading-none">
          <span className={`font-black text-lg sm:text-xl tracking-tight ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
            Planejador
          </span>
          <span className="font-black text-lg sm:text-xl text-blue-600 tracking-tight">
            BNCC
          </span>
          <span className="text-emerald-500 text-xs font-extrabold ml-0.5">
            ✨
          </span>
        </div>
        <p className="hidden xs:flex text-[10px] sm:text-[11px] font-bold mt-1 items-center space-x-1 leading-none shrink-0">
          <span className={darkTheme ? 'text-slate-300' : 'text-slate-700'}>Planeje.</span>
          <span className="text-blue-500">Organize.</span>
          <span className="text-emerald-500">Inspire.</span>
        </p>
      </div>
    </div>
  );
};
