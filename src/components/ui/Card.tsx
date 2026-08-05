import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassmorphism?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glassmorphism = false,
}) => {
  return (
    <div
      className={`rounded-3xl transition-all ${
        glassmorphism
          ? 'bg-white/80 backdrop-blur-md border border-white/60 shadow-xl shadow-blue-500/5'
          : 'bg-white border border-slate-100 shadow-xl shadow-slate-200/50'
      } ${className}`}
    >
      {children}
    </div>
  );
};
