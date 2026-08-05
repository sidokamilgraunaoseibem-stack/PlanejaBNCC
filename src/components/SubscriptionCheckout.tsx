import React, { useState } from 'react';
import {
  Check,
  Zap,
  ShieldCheck,
  CreditCard,
  QrCode,
  Sparkles,
  Lock,
  ArrowRight,
  Copy,
  CheckCircle2,
  AlertCircle,
  Star,
  Coins,
  Crown
} from 'lucide-react';
import { SubscriptionPlanType } from '../types';

interface SubscriptionCheckoutProps {
  currentPlanType: SubscriptionPlanType;
  userCredits: number;
  onActivateSubscription: (plan: 'start' | 'pro' | 'premium') => void;
  onStartTrial?: () => void;
  onClose?: () => void;
  onRefillCredits?: () => void;
}

export const SubscriptionCheckout: React.FC<SubscriptionCheckoutProps> = ({
  currentPlanType,
  userCredits,
  onActivateSubscription,
  onClose,
  onRefillCredits,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'start' | 'pro' | 'premium'>('pro');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Form mock state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const planDetails = {
    start: {
      name: 'START',
      price: 'R$ 14,90',
      period: '/mês',
      creditsLabel: '50 Créditos / mês',
      subtitle: 'Entrada prática com limite mensal',
      badge: 'Plano Inicial',
    },
    pro: {
      name: 'PRO',
      price: 'R$ 27,90',
      period: '/mês',
      creditsLabel: 'Gerações ILIMITADAS',
      subtitle: 'O plano perfeito e sem limites para professores atarefados',
      badge: '🔥 MAIS POPULAR',
    },
    premium: {
      name: 'PREMIUM',
      price: 'R$ 49,90',
      period: '/mês',
      creditsLabel: 'Gerações Ilimitadas + Prioridade',
      subtitle: 'Recursos avançados e planejamento mensal completo',
      badge: '🟣 PLANO PREMIUM',
    },
  };

  const handleOpenCheckout = (planKey: 'start' | 'pro' | 'premium') => {
    setSelectedPlan(planKey);
    setShowCheckoutModal(true);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        onActivateSubscription(selectedPlan);
        setShowCheckoutModal(false);
        setPaymentSuccess(false);
      }, 1800);
    }, 1500);
  };

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(
      '00020126580014br.gov.bcb.pix0136a1b2c3d4-planejador-bncc-pedagogico520400005303986540547.905802BR5925PLANEJADOR PEDAGOGICO BNCC6009SAO PAULO62070503***6304E2B1'
    );
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const activePlanName =
    currentPlanType === 'start'
      ? 'Plano START'
      : currentPlanType === 'pro'
      ? 'Plano PRO (Ilimitado)'
      : currentPlanType === 'premium'
      ? 'Plano PREMIUM (Completo)'
      : null;

  return (
    <div className="min-h-screen bg-slate-50/70 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 border border-blue-300 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider mb-3">
            <Coins className="w-4 h-4 text-blue-600 fill-blue-200" />
            <span>10 CRÉDITOS GRATUITOS PARA DEGUSTAÇÃO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
            Escolha o Plano Ideal para Sua Rotina
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Poupe mais de 10 horas por semana criando planejamentos e folhas de atividades com rigor BNCC instantâneo.
          </p>

          {/* Status Badge */}
          <div className="mt-5 inline-flex items-center space-x-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-2 text-xs font-semibold text-slate-800">
            {currentPlanType === 'free_credits' ? (
              <>
                <Coins className="w-4 h-4 text-amber-500 fill-amber-300" />
                <span>
                  Você possui <strong>{userCredits} / 10 créditos gratuitos</strong> disponíveis.
                </span>
              </>
            ) : activePlanName ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Sua assinatura <strong>{activePlanName}</strong> está ativa!
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Seus créditos acabaram! Escolha um plano abaixo para continuar.</span>
              </>
            )}
          </div>
        </div>

        {/* Welcome Free Credits Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 mb-12 text-white shadow-2xl border border-blue-500/30 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>BÔNUS DE ENTRADA</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                10 Créditos Gratuitos para Iniciar Agora
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                Cada atividade ou plano gerado consome 1 crédito. Teste todas as funções sem precisar colocar cartão. Quando precisar de mais, faça upgrade para o <strong className="text-amber-300">Plano PRO Ilimitado por R$ 27,90/mês</strong>.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-blue-400/30 p-5 rounded-2xl flex flex-col items-center justify-center text-center shrink-0 min-w-[240px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saldo Atual de Créditos</span>
              <div className="text-4xl font-black text-amber-400 my-1 flex items-center space-x-2">
                <Coins className="w-8 h-8 text-amber-400 fill-amber-400/20" />
                <span>{userCredits}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold mb-3">1 crédito = 1 atividade ou plano</span>
              {onRefillCredits && (
                <button
                  onClick={onRefillCredits}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 px-3 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  Recarregar 20 Créditos Grátis
                </button>
              )}
            </div>
          </div>
        </div>

        {/* PRICING CARDS GRID (3 PLANS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16 max-w-6xl mx-auto pt-4">
          
          {/* 1. PLANO START (R$ 14,90/mês) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-lg flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Entrada Básica
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1">PLANO START</h3>
              <p className="text-xs text-slate-500 font-semibold min-h-[36px] leading-relaxed">
                Entrada com limitação para quem gera poucos materiais por mês.
              </p>

              {/* Price */}
              <div className="my-6">
                <span className="text-4xl font-black text-slate-900">R$ 14,90</span>
                <span className="text-xs font-bold text-slate-500 ml-1">/mês</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenCheckout('start')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 px-4 rounded-2xl shadow-md text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer mb-6"
              >
                <span>Assinar START (R$ 14,90)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Features List */}
              <div className="border-t border-slate-100 pt-5">
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">Recursos do Start:</p>
                <ul className="space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-start space-x-2.5 font-bold text-slate-900">
                    <Coins className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>50 créditos por mês</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>1 crédito = 1 atividade</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Geração básica BNCC</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Download em PDF limpo</span>
                  </li>
                  <li className="flex items-start space-x-2.5 text-slate-400">
                    <span className="w-4 h-4 text-center shrink-0">✕</span>
                    <span>Sem histórico completo salvo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. PLANO PRO (R$ 27,90/mês) - DESTAQUE TEMA AZUL + AMBER */}
          <div className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 rounded-3xl border-2 border-amber-400 p-6 sm:p-7 shadow-2xl shadow-blue-900/40 text-white flex flex-col justify-between relative transform md:-translate-y-2 hover:scale-[1.01] transition-all z-10 pt-8 sm:pt-9">
            {/* Top Badge - Perfectly centered with no vertical overlap */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-[11px] py-1.5 px-4 rounded-full shadow-md flex items-center space-x-1.5 uppercase tracking-wider border border-amber-300">
              <Star className="w-3.5 h-3.5 fill-slate-950 shrink-0" />
              <span>🔥 MAIS POPULAR</span>
            </div>

            <div>
              <div className="mb-3 flex items-center flex-wrap gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Sem Limites
                </span>
                <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  Melhor Custo-Benefício
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">PLANO PRO</h3>
              <p className="text-xs text-blue-100 font-medium min-h-[36px] leading-relaxed">
                Gerações ilimitadas sem se preocupar com contagem de créditos. O favorito dos professores.
              </p>

              {/* Price */}
              <div className="my-5">
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl sm:text-5xl font-black text-amber-300">R$ 27,90</span>
                  <span className="text-xs sm:text-sm font-bold text-blue-200">/mês</span>
                </div>
                <p className="text-[11px] font-bold text-emerald-300 mt-1">✨ Gerações Ilimitadas • Acesso Completo</p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenCheckout('pro')}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black py-3.5 px-4 rounded-2xl shadow-xl shadow-amber-400/20 text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer mb-6 hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4 fill-slate-950 shrink-0" />
                <span className="truncate">QUERO O PLANO PRO (R$ 27,90)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              {/* Features List */}
              <div className="border-t border-blue-700/60 pt-5">
                <p className="text-[11px] font-black text-amber-300 uppercase tracking-wider mb-3">Tudo o que você ganha no PRO:</p>
                <ul className="space-y-3 text-xs sm:text-sm text-blue-100 font-semibold">
                  <li className="flex items-start space-x-2.5 text-white font-bold">
                    <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0 mt-0.5" />
                    <span>Gerações ILIMITADAS (Sem cota)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Atividades completas BNCC</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Planejamento semanal automatizado</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Histórico salvo na nuvem</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Download em PDF organizado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. PLANO PREMIUM (R$ 49,90/mês) - DESTAQUE ROXO LUXO */}
          <div className="bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 rounded-3xl border-2 border-purple-500/80 p-6 sm:p-7 shadow-xl shadow-purple-950/40 text-white flex flex-col justify-between relative hover:border-purple-400 transition-all pt-8 sm:pt-9">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-black text-[11px] py-1.5 px-4 rounded-full shadow-md flex items-center space-x-1.5 uppercase tracking-wider border border-purple-300/40">
              <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
              <span>👑 MÁXIMA PERFORMANCE</span>
            </div>

            <div>
              <div className="mb-3 flex items-center flex-wrap gap-2">
                <span className="bg-purple-500/20 text-purple-300 border border-purple-400/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1">
                  <span>🟣 PLANO PREMIUM</span>
                </span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                  Prioridade Turbo
                </span>
              </div>

              <h3 className="text-2xl font-black text-white mb-1">PLANO PREMIUM</h3>
              <p className="text-xs text-purple-200 font-medium min-h-[36px] leading-relaxed">
                Tudo do PRO com planejamento mensal completo e IA de alta velocidade.
              </p>

              {/* Price */}
              <div className="my-5">
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black text-purple-200">R$ 49,90</span>
                  <span className="text-xs font-bold text-purple-300 ml-1">/mês</span>
                </div>
                <p className="text-[11px] font-bold text-amber-300 mt-1">👑 Tudo do PRO + Planejamento Mensal</p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenCheckout('premium')}
                className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black py-3.5 px-4 rounded-2xl shadow-xl shadow-purple-600/30 text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer mb-6"
              >
                <Crown className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
                <span className="truncate">Assinar PREMIUM (R$ 49,90)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              {/* Features List */}
              <div className="border-t border-purple-800/60 pt-5">
                <p className="text-[11px] font-extrabold text-purple-300 uppercase tracking-wider mb-3">Benefícios Exclusivos Premium:</p>
                <ul className="space-y-3 text-xs text-purple-100 font-medium">
                  <li className="flex items-start space-x-2.5 font-bold text-white">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Tudo incluído no Plano PRO</span>
                  </li>
                  <li className="flex items-start space-x-2.5 font-bold text-amber-300">
                    <Crown className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0 mt-0.5" />
                    <span>Planejamento mensal completo</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Atividades mais avançadas e adaptadas</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Prioridade na geração (processamento turbo)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 stroke-[3]" />
                    <span>Atendimento VIP e suporte prioritário</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Guarantees section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Sem Fidelidade</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Cancele quando quiser sem complicações.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Pagamento Seguro</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">PIX instantâneo ou Cartão de Crédito.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Acesso Imediato</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Liberação automática do plano na hora.</p>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden my-8 border border-slate-200">
            {/* Modal Header */}
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-blue-300 tracking-wider">Checkout Seguro</span>
                <h3 className="font-extrabold text-base">
                  Assinar {planDetails[selectedPlan].name} ({planDetails[selectedPlan].price}/mês)
                </h3>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-blue-200 hover:text-white font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <span>PIX (Instantâneo)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Cartão de Crédito</span>
                </button>
              </div>

              {/* PIX Payment Details */}
              {paymentMethod === 'pix' && (
                <div className="text-center space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 inline-block">
                    <div className="w-44 h-44 bg-slate-900 rounded-xl mx-auto flex flex-col items-center justify-center p-3 text-blue-400">
                      <QrCode className="w-28 h-28" />
                      <span className="text-[10px] text-slate-300 font-mono mt-1">Escaneie para Pagar</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600 mb-2">
                      Valor da assinatura: <strong>{planDetails[selectedPlan].price}</strong>
                    </p>
                    <button
                      onClick={handleCopyPixCode}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 border border-slate-300 cursor-pointer"
                    >
                      {copiedPix ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedPix ? 'Código PIX Copiado!' : 'Copiar Código PIX Copia e Cola'}</span>
                    </button>
                  </div>

                  <form onSubmit={handleSimulatePayment} className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing || paymentSuccess}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      {isProcessing ? (
                        <span>Confirmando Pagamento...</span>
                      ) : paymentSuccess ? (
                        <span>Assinatura Ativada com Sucesso! 🎉</span>
                      ) : (
                        <span>Confirmar Pagamento PIX e Ativar Plano</span>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Credit Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">E-mail do Professor:</label>
                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="seu.email@escola.com.br"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nome no Cartão:</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Nome exatamente como impresso"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Número do Cartão:</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Validade (MM/AA):</label>
                      <input
                        type="text"
                        required
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        placeholder="12/28"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">CVC / CVV:</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-[11px] text-blue-900">
                    🔒 <strong>Cobrança Mensal:</strong> {planDetails[selectedPlan].price}/mês. Cancele quando quiser.
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || paymentSuccess}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Processando Assinatura...</span>
                    ) : paymentSuccess ? (
                      <span>Assinatura Ativada com Sucesso! 🎉</span>
                    ) : (
                      <span>Ativar Plano {planDetails[selectedPlan].name}</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
