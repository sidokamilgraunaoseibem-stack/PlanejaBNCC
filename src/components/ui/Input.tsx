import React, { useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  helperText,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={inputType}
          className={`w-full bg-slate-50 border rounded-xl py-2.5 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
            Icon ? 'pl-10' : 'pl-3.5'
          } ${isPassword ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 hover:border-slate-300 focus:border-blue-600'
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors p-0.5 focus:outline-none cursor-pointer"
            title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-red-500 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
