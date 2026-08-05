import React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'google';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeStyles = {
    sm: 'px-3 py-2 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-xs gap-2',
    lg: 'px-6 py-3.5 text-sm gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md shadow-blue-600/25 focus:ring-blue-500 hover:scale-[1.01]',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20 focus:ring-slate-800',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs hover:border-slate-300 focus:ring-blue-500',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-400',
    google:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm hover:border-slate-300 focus:ring-slate-300 hover:scale-[1.01]',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span className="inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};
