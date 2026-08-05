import React from 'react';
import { Sparkles, Coins, Check, ArrowRight, ShieldCheck, X, Star, Crown } from 'lucide-react';

interface TrialExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSubscription: () => void;
  userCredits: number;
}

export const TrialExpiredModal: React.FC<TrialExpiredModalProps> = ({
  isOpen,
  onClose,
  onGoToSubscription,
  userCredits,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative text-left">
        {/* Decorative Top Accent Bar */}
        <div className="h-2.5 bg-gradient-to-r from-blue-600 via-amber-400 to-indigo-600 shrink-0" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body - Scrollable */}
        <div className="p-4 sm:p-7 space-y-4 sm:space-y-5 overflow-y-auto custom-scrollbar">
          {/* Header Icon & Title */}
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mx-auto shadow-xs">
              <Coins className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce fill-amber-300" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 fill-amber-600" />
                <span>Limite de Créditos Atingido</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Seus 10 Créditos Gratuitos Acabaram! ⚡
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
              Você já usou seus 10 créditos iniciais. Para continuar gerando planejamentos e atividades completas alinhadas à BNCC sem limite, assine um de nossos planos.
            </p>
          </div>

          {/* Quick Plan Highlights */}
          <div className="space-y-2 sm:space-y-2.5">
            {/* PLANO START */}
            <div
              onClick={() => {
                onGoToSubscription();
                onClose();
              }}
              className="p-3 sm:p-3.5 border border-slate-200 hover:border-blue-500 rounded-2xl bg-slate-50 hover:bg-blue-50/50 transition-all cursor-pointer flex items-center justify-between gap-2"
            >
              <div>
                <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-500 uppercase">PLANO START</span>
                <div className="text-xs sm:text-sm font-black text-slate-900">R$ 14,90 /mês</div>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block">50 créditos por mês • Geração básica BNCC</span>
              </div>
              <span className="text-xs font-bold text-blue-600 shrink-0">Ver plano →</span>
            </div>

            {/* PLANO PRO (RECOMMENDED) */}
            <div
              onClick={() => {
                onGoToSubscription();
                onClose();
              }}
              className="p-3.5 sm:p-4 border-2 border-amber-400 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                  🔥 MAIS POPULAR
                </span>
                <div className="text-sm sm:text-base font-black text-amber-300">PLANO PRO — R$ 27,90 /mês</div>
                <span className="text-[10px] sm:text-[11px] text-blue-100 font-bold block mt-0.5">✨ Gerações ILIMITADAS • Atividades & Semanal</span>
              </div>
              <div className="relative z-10 bg-amber-400 text-slate-950 px-3 py-1.5 sm:p-2 rounded-xl shrink-0 font-black text-xs self-end sm:self-auto">
                QUERO PRO
              </div>
            </div>

            {/* PLANO PREMIUM */}
            <div
              onClick={() => {
                onGoToSubscription();
                onClose();
              }}
              className="p-3 sm:p-3.5 border border-purple-200 hover:border-purple-500 rounded-2xl bg-purple-50/50 transition-all cursor-pointer flex items-center justify-between gap-2"
            >
              <div>
                <span className="text-[9px] sm:text-[10px] font-extrabold text-purple-700 uppercase flex items-center space-x-1">
                  <Crown className="w-3 h-3 text-purple-600" />
                  <span>PLANO PREMIUM</span>
                </span>
                <div className="text-xs sm:text-sm font-black text-purple-950">R$ 49,90 /mês</div>
                <span className="text-[10px] sm:text-[11px] text-purple-800 font-medium block">Tudo do PRO + Planejamento Mensal & Prioridade</span>
              </div>
              <span className="text-xs font-bold text-purple-700 shrink-0">Ver plano →</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-1 space-y-1">
            <button
              type="button"
              onClick={() => {
                onGoToSubscription();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 hover:from-blue-600 hover:to-indigo-800 text-white font-black text-xs sm:text-sm py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2 group hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
              <span className="truncate">Assinar Plano e Desbloquear Acesso</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-slate-500 hover:text-slate-800 font-semibold text-xs py-1.5 transition-colors cursor-pointer text-center"
            >
              Lembrar-me mais tarde
            </button>
          </div>

          {/* Security note */}
          <div className="flex items-center justify-center space-x-1 text-[10px] sm:text-[11px] text-slate-400 font-medium pt-1 border-t border-slate-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-center">Pagamento 100% seguro via PIX ou Cartão de Crédito</span>
          </div>
        </div>
      </div>
    </div>
  );
};
