import React, { useState } from 'react';
import { User, SubscriptionPlanType } from '../types';
import {
  User as UserIcon,
  School,
  Mail,
  ShieldCheck,
  Sparkles,
  LogOut,
  CheckCircle2,
  Save,
  CreditCard,
  Coins,
  Crown,
} from 'lucide-react';

interface ProfileScreenProps {
  user: User | null;
  professor: string;
  setProfessor: (v: string) => void;
  escola: string;
  setEscola: (v: string) => void;
  subscriptionPlan: SubscriptionPlanType;
  userCredits: number;
  onLogout: () => void;
  onGoToSubscription: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  professor,
  setProfessor,
  escola,
  setEscola,
  subscriptionPlan,
  userCredits,
  onLogout,
  onGoToSubscription,
}) => {
  const [tempProfessor, setTempProfessor] = useState(professor || user?.name || '');
  const [tempEscola, setTempEscola] = useState(escola || user?.escola || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfessor(tempProfessor);
    setEscola(tempEscola);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const getPlanBadge = () => {
    if (subscriptionPlan === 'pro') {
      return (
        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
          🔥 Plano PRO (Ilimitado)
        </span>
      );
    }
    if (subscriptionPlan === 'premium') {
      return (
        <span className="bg-purple-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase flex items-center space-x-1">
          <Crown className="w-3 h-3" />
          <span>Plano PREMIUM</span>
        </span>
      );
    }
    if (subscriptionPlan === 'start') {
      return (
        <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
          Plano START (50 Créditos)
        </span>
      );
    }
    return (
      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
        10 Créditos Grátis
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      {/* Centered Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 border border-slate-700 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border-2 border-blue-500 flex items-center justify-center text-blue-400 mb-4 shadow-lg">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-2xl object-cover" />
          ) : (
            <UserIcon className="w-8 h-8 text-blue-400" />
          )}
        </div>

        <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1 text-blue-300 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Perfil do Docente Autenticado</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {user?.name || professor || 'Professor(a)'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center space-x-1.5 justify-center">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <span>{user?.email || 'professor@escola.edu.br'}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Form Settings */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
          <div className="flex items-center space-x-2 pb-4 mb-6 border-b border-slate-100">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <h2 className="text-lg font-black text-slate-900">Dados do Perfil e Cabeçalho</h2>
          </div>

          {savedSuccess && (
            <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 flex items-center space-x-2 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dados atualizados com sucesso!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div>
              <label className="block text-xs font-extrabold text-slate-900 mb-2 flex items-center space-x-2">
                <UserIcon className="w-4 h-4 text-blue-600" />
                <span>Nome Completo do(a) Professor(a):</span>
              </label>
              <input
                type="text"
                value={tempProfessor}
                onChange={(e) => setTempProfessor(e.target.value)}
                placeholder="Ex: Prof. Sidônio Silva"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1">Este nome será exibido nos documentos em PDF gerados.</p>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-900 mb-2 flex items-center space-x-2">
                <School className="w-4 h-4 text-blue-600" />
                <span>Escola / Instituição de Ensino:</span>
              </label>
              <input
                type="text"
                value={tempEscola}
                onChange={(e) => setTempEscola(e.target.value)}
                placeholder="Ex: E.E. Professor João Alves"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-1">Nome da escola para o cabeçalho dos planejamentos.</p>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-900 mb-2 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>E-mail de Acesso (Login):</span>
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 font-medium cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 text-xs transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações do Perfil</span>
            </button>
          </form>
        </div>

        {/* Right Column: Subscription Status & Account Actions */}
        <div className="md:col-span-5 space-y-6">
          {/* Subscription Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <h3 className="font-extrabold text-sm text-white">Status da Assinatura</h3>
                </div>
                {getPlanBadge()}
              </div>

              <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Plano Atual:</span>
                  <span className="text-amber-300 font-extrabold">
                    {subscriptionPlan === 'pro'
                      ? 'PLANO PRO (R$ 27,90/mês)'
                      : subscriptionPlan === 'premium'
                      ? 'PLANO PREMIUM (R$ 49,90/mês)'
                      : subscriptionPlan === 'start'
                      ? 'PLANO START (R$ 14,90/mês)'
                      : 'Degustação Gratuita'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Saldo de Créditos:</span>
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>
                      {subscriptionPlan === 'pro' || subscriptionPlan === 'premium'
                        ? 'Gerações Ilimitadas ✨'
                        : `${userCredits} créditos disponíveis`}
                    </span>
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
                No Plano PRO (R$ 27,90), você ganha gerações ilimitadas sem se preocupar com créditos e com acesso a todas as atividades BNCC.
              </p>
            </div>

            <button
              onClick={onGoToSubscription}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3 px-4 rounded-xl shadow-md text-xs transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Gerenciar Plano de Assinatura</span>
            </button>
          </div>

          {/* Account Logout Box */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 text-center flex flex-col items-center">
            <h4 className="text-xs font-extrabold text-slate-900 mb-1">Encerrar Sessão</h4>
            <p className="text-[11px] text-slate-500 mb-4">
              Deseja sair da sua conta neste dispositivo?
            </p>
            <button
              onClick={onLogout}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-extrabold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
