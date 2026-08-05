import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonPlanForm } from './components/LessonPlanForm';
import { LessonPlanView } from './components/LessonPlanView';
import { SavedPlansLibrary } from './components/SavedPlansLibrary';
import { BNCCExplorerModal } from './components/BNCCExplorerModal';
import { ActivitySheetModal } from './components/ActivitySheetModal';
import { SubscriptionCheckout } from './components/SubscriptionCheckout';
import { AuthScreen } from './components/AuthScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { TrialExpiredModal } from './components/TrialExpiredModal';
import { LessonPlan, ActivitySheet, User, SubscriptionPlanType } from './types';
import { AlertCircle, Clock, Sparkles, Bell } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'view' | 'library' | 'bncc' | 'subscription' | 'profile'>('create');
  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<LessonPlan[]>([]);
  const [activitySheet, setActivitySheet] = useState<ActivitySheet | null>(null);
  const [hasNewPlanNotification, setHasNewPlanNotification] = useState<boolean>(false);
  const [latestGeneratedId, setLatestGeneratedId] = useState<string | null>(null);
  const [newPlanToast, setNewPlanToast] = useState<{ id: string; titulo: string } | null>(null);

  // Custom Tab Selector clearing notification when visiting library
  const handleSelectTab = (tab: 'create' | 'view' | 'library' | 'bncc' | 'subscription' | 'profile') => {
    if (tab === 'library') {
      setHasNewPlanNotification(false);
    }
    setActiveTab(tab);
  };

  // Authenticated User State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('bncc_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [isGeneratingActivity, setIsGeneratingActivity] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [escola, setEscola] = useState<string>(() => localStorage.getItem('bncc_escola') || '');
  const [professor, setProfessor] = useState<string>(() => {
    const savedProf = localStorage.getItem('bncc_professor');
    if (savedProf) return savedProf;
    const savedUser = localStorage.getItem('bncc_auth_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser).name || '';
      } catch {
        return '';
      }
    }
    return '';
  });

  // Handle successful login or registration
  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('bncc_auth_user', JSON.stringify(authenticatedUser));
    if (!professor) {
      setProfessor(authenticatedUser.name);
      localStorage.setItem('bncc_professor', authenticatedUser.name);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bncc_auth_user');
  };

  // Subscription & Credits state
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlanType>(() => {
    return (localStorage.getItem('bncc_subscription') as SubscriptionPlanType) || 'trial';
  });

  const [userCredits, setUserCredits] = useState<number>(() => {
    const savedCredits = localStorage.getItem('bncc_user_credits_v2');
    return savedCredits !== null ? parseInt(savedCredits, 10) : 10;
  });

  const [showTrialExpiredModal, setShowTrialExpiredModal] = useState<boolean>(false);

  // Auto trigger expired modal if user has 0 credits on trial or expired state
  useEffect(() => {
    if (subscriptionPlan === 'expired' || (subscriptionPlan === 'trial' && userCredits <= 0)) {
      setShowTrialExpiredModal(true);
    }
  }, [subscriptionPlan, userCredits]);

  // Save subscription and credits state to localStorage
  useEffect(() => {
    localStorage.setItem('bncc_subscription', subscriptionPlan);
    localStorage.setItem('bncc_user_credits_v2', userCredits.toString());
  }, [subscriptionPlan, userCredits]);

  // Load saved plans from localStorage on mount
  useEffect(() => {
    const loaded = localStorage.getItem('bncc_saved_plans');
    if (loaded) {
      try {
        setSavedPlans(JSON.parse(loaded));
      } catch (e) {
        console.error('Erro ao carregar planos salvos:', e);
      }
    }
  }, []);

  // Sync escola & professor to localStorage
  useEffect(() => {
    localStorage.setItem('bncc_escola', escola);
  }, [escola]);

  useEffect(() => {
    localStorage.setItem('bncc_professor', professor);
  }, [professor]);

  // Activate subscription handler
  const handleActivateSubscription = (plan: SubscriptionPlanType) => {
    setSubscriptionPlan(plan);
    if (plan === 'start') {
      setUserCredits(50);
    } else if (plan === 'pro' || plan === 'premium') {
      setUserCredits(9999);
    }
    setShowTrialExpiredModal(false);
    setActiveTab('create');
  };

  const handleStartTrial = () => {
    setSubscriptionPlan('trial');
    setUserCredits(10);
    setShowTrialExpiredModal(false);
    setActiveTab('create');
  };

  // Helper function to simulate credits for testing
  const handleSimulateCredits = (credits: number) => {
    if (credits <= 0) {
      setSubscriptionPlan('expired');
      setUserCredits(0);
      setShowTrialExpiredModal(true);
    } else {
      setSubscriptionPlan('trial');
      setUserCredits(credits);
      setShowTrialExpiredModal(false);
    }
  };

  // Add 20 free credits handler
  const handleAdd20Credits = () => {
    setUserCredits((prev) => prev + 20);
    if (subscriptionPlan === 'expired') {
      setSubscriptionPlan('trial');
    }
    setShowTrialExpiredModal(false);
  };

  // Save plans helper
  const handleSavePlan = (planToSave: LessonPlan) => {
    const updated = [planToSave, ...savedPlans.filter((p) => p.id !== planToSave.id)];
    setSavedPlans(updated);
    localStorage.setItem('bncc_saved_plans', JSON.stringify(updated));
  };

  const handleDeletePlan = (id: string) => {
    const updated = savedPlans.filter((p) => p.id !== id);
    setSavedPlans(updated);
    localStorage.setItem('bncc_saved_plans', JSON.stringify(updated));
  };

  // Helper to parse number of lessons from aulas_semana string (e.g. '4 aulas' -> 4)
  const parseAulasCount = (aulasStr: string): number => {
    if (!aulasStr) return 1;
    const match = aulasStr.match(/\d+/);
    if (match) {
      const val = parseInt(match[0], 10);
      return isNaN(val) || val <= 0 ? 1 : val;
    }
    return 1;
  };

  // Submit handler: Generate new plan
  const handleGeneratePlan = async (formData: {
    serie: string;
    disciplina: string;
    tema: string;
    tempo: string;
    aulas_semana: string;
    metodologia: string;
    observacoes: string;
    escola: string;
    professor: string;
  }) => {
    const creditsRequired = parseAulasCount(formData.aulas_semana);
    const isUnlimited = subscriptionPlan === 'pro' || subscriptionPlan === 'premium';

    // Check if user has available credits for the chosen number of lessons
    if (!isUnlimited && (subscriptionPlan === 'expired' || userCredits < creditsRequired)) {
      setShowTrialExpiredModal(true);
      setErrorMsg(
        `Você precisa de ${creditsRequired} crédito(s) para gerar um plano com ${formData.aulas_semana}, mas possui apenas ${userCredits} crédito(s) disponível(is). Assine um plano para continuar sem limites.`
      );
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao conectar com o servidor pedagógico.');
      }

      const generatedPlan: LessonPlan = await response.json();
      setCurrentPlan(generatedPlan);
      // Auto save to library
      handleSavePlan(generatedPlan);

      // Deduct credits equal to the number of lessons requested
      if (!isUnlimited) {
        setUserCredits((prev) => {
          const remaining = Math.max(0, prev - creditsRequired);
          if (remaining === 0) {
            setSubscriptionPlan('expired');
            setShowTrialExpiredModal(true);
          }
          return remaining;
        });
      }
      
      // Trigger notification indicator and toast alert on "Meus Planos" tab
      setHasNewPlanNotification(true);
      if (generatedPlan.id) {
        setLatestGeneratedId(generatedPlan.id);
      }
      setNewPlanToast({
        id: generatedPlan.id || String(Date.now()),
        titulo: generatedPlan.titulo || 'Plano de Aula BNCC',
      });

      setActiveTab('view');
    } catch (err: any) {
      console.error('Erro ao gerar plano:', err);
      const msg = err.message || '';
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')) {
        setErrorMsg('A cota de requisições da IA foi temporariamente atingida. O sistema acionou a geração de contingência.');
      } else {
        setErrorMsg(msg || 'Ocorreu um erro ao gerar o plano de aula. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Refine existing plan
  const handleRefinePlan = async (current: LessonPlan, instruction: string) => {
    setIsRefining(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/refine-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPlan: current, instruction }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Erro ao refinar planejamento.');
      }

      const updatedPlan: LessonPlan = await response.json();
      setCurrentPlan(updatedPlan);
      handleSavePlan(updatedPlan);
    } catch (err: any) {
      console.error('Erro ao refinar plano:', err);
      const msg = err.message || '';
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')) {
        setErrorMsg('A cota da IA foi atingida. O plano atual foi preservado.');
      } else {
        setErrorMsg(msg || 'Não foi possível refinar o plano.');
      }
    } finally {
      setIsRefining(false);
    }
  };

  // Generate Student Activity Sheet
  const handleGenerateActivitySheet = async (plan: LessonPlan) => {
    const isUnlimited = subscriptionPlan === 'pro' || subscriptionPlan === 'premium';
    if (!isUnlimited && (subscriptionPlan === 'expired' || userCredits < 1)) {
      setShowTrialExpiredModal(true);
      setErrorMsg('Você não possui créditos disponíveis para gerar esta folha de atividades. Assine um dos nossos planos para continuar gerando!');
      return;
    }

    setIsGeneratingActivity(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonPlan: plan }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Erro ao gerar folha de atividade.');
      }

      const sheetData: ActivitySheet = await response.json();
      setActivitySheet(sheetData);

      // Deduct 1 credit for activity sheet generation
      if (!isUnlimited) {
        setUserCredits((prev) => {
          const remaining = Math.max(0, prev - 1);
          if (remaining === 0) {
            setSubscriptionPlan('expired');
            setShowTrialExpiredModal(true);
          }
          return remaining;
        });
      }
    } catch (err: any) {
      console.error('Erro ao gerar atividade:', err);
      const msg = err.message || '';
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')) {
        setErrorMsg('A cota da IA foi atingida. Gerando atividade via sistema de contingência.');
      } else {
        setErrorMsg(msg || 'Erro ao gerar folha de atividade.');
      }
    } finally {
      setIsGeneratingActivity(false);
    }
  };

  if (!user) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-800 to-slate-100 text-slate-900 font-sans flex flex-col antialiased relative">
      {/* Background Ambient Decorative Light Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* Top Navbar */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        savedCount={savedPlans.length}
        hasNewPlanNotification={hasNewPlanNotification}
        escola={escola}
        setEscola={setEscola}
        professor={professor}
        setProfessor={setProfessor}
        subscriptionPlan={subscriptionPlan}
      />

      {/* Credits / Plan Notification Header Bar */}
      <div className={`text-xs py-2 px-4 border-b transition-colors ${
        subscriptionPlan === 'expired' || (subscriptionPlan === 'trial' && userCredits <= 0)
          ? 'bg-rose-950/90 text-rose-200 border-rose-800/80'
          : 'bg-slate-900 text-slate-300 border-slate-800'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center space-x-2">
            {subscriptionPlan === 'expired' || (subscriptionPlan === 'trial' && userCredits <= 0) ? (
              <Bell className="w-3.5 h-3.5 text-rose-400 animate-bounce shrink-0" />
            ) : (
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            )}
            <span>
              {subscriptionPlan === 'expired' || (subscriptionPlan === 'trial' && userCredits <= 0) ? (
                <>⚠️ Continue criando atividades alinhadas à BNCC em poucos segundos. Escolha um dos nossos planos e volte a gerar planejamentos, atividades e materiais sem interrupções.</>
              ) : subscriptionPlan === 'trial' ? (
                <>Degustação Gratuita Ativa: <strong>{userCredits} de 10 créditos disponíveis</strong> (1 crédito = 1 atividade/plano).</>
              ) : subscriptionPlan === 'start' ? (
                <>Plano START Ativo: <strong>{userCredits} créditos disponíveis</strong> este mês.</>
              ) : subscriptionPlan === 'pro' ? (
                <>Assinatura Ativa: <strong>🔥 PLANO PRO (Gerações ILIMITADAS BNCC)</strong></>
              ) : subscriptionPlan === 'premium' ? (
                <>Assinatura Ativa: <strong>🟣 PLANO PREMIUM (Ilimitado + Planejamento Mensal)</strong></>
              ) : (
                <>Seus créditos esgotaram. Escolha um plano para manter seu acesso às atividades.</>
              )}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                if (subscriptionPlan === 'expired' || userCredits <= 0) {
                  setShowTrialExpiredModal(true);
                } else {
                  setActiveTab('subscription');
                }
              }}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-[11px] px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-slate-950 fill-current" />
              <span>{subscriptionPlan === 'expired' || userCredits <= 0 ? 'Ver Planos e Assinar' : 'Ver Planos'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 pb-16">
        
        {/* Error Notification Banner */}
        {errorMsg && (
          <div className="max-w-4xl mx-auto px-4 pt-6">
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-center justify-between text-xs font-medium">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-red-600 hover:text-red-900 font-bold ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Form Generator */}
        {activeTab === 'create' && (
          <LessonPlanForm
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
            escola={escola}
            setEscola={setEscola}
            professor={professor}
            setProfessor={setProfessor}
            userCredits={userCredits}
            subscriptionPlan={subscriptionPlan}
          />
        )}

        {/* Tab 2: Lesson Plan View */}
        {activeTab === 'view' && currentPlan && (
          <LessonPlanView
            plan={currentPlan}
            onSavePlan={handleSavePlan}
            onGenerateActivitySheet={handleGenerateActivitySheet}
            onRefinePlan={handleRefinePlan}
            isRefining={isRefining}
            escola={escola}
            professor={professor}
          />
        )}

        {activeTab === 'view' && !currentPlan && (
          <div className="max-w-xl mx-auto my-16 text-center px-4">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-2">Nenhum plano em exibição</h3>
              <p className="text-xs text-slate-500 mb-6">
                Gere um novo plano no formulário ou selecione um plano salvo na sua biblioteca.
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Ir para o Gerador de Planos
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Saved Library */}
        {activeTab === 'library' && (
          <SavedPlansLibrary
            plans={savedPlans}
            onSelectPlan={(plan) => {
              setCurrentPlan(plan);
              setActiveTab('view');
            }}
            onDeletePlan={handleDeletePlan}
            hasNewPlanNotification={hasNewPlanNotification}
            latestGeneratedId={latestGeneratedId}
            onClearNotification={() => setHasNewPlanNotification(false)}
          />
        )}

        {/* Tab 4: BNCC Explorer */}
        {activeTab === 'bncc' && <BNCCExplorerModal />}

        {/* Tab 5: Subscription Checkout Page */}
        {activeTab === 'subscription' && (
          <SubscriptionCheckout
            currentPlanType={subscriptionPlan}
            userCredits={userCredits}
            onActivateSubscription={handleActivateSubscription}
            onStartTrial={handleStartTrial}
            onRefillCredits={handleAdd20Credits}
            onClose={() => setActiveTab('create')}
          />
        )}

        {/* Tab 6: Profile Screen Page */}
        {activeTab === 'profile' && (
          <ProfileScreen
            user={user}
            professor={professor}
            setProfessor={setProfessor}
            escola={escola}
            setEscola={setEscola}
            subscriptionPlan={subscriptionPlan}
            userCredits={userCredits}
            onLogout={handleLogout}
            onGoToSubscription={() => setActiveTab('subscription')}
          />
        )}

      </main>

      {/* Student Activity Sheet Modal */}
      {activitySheet && (
        <ActivitySheetModal
          sheet={activitySheet}
          onClose={() => setActivitySheet(null)}
          escola={escola}
          professor={professor}
        />
      )}

      {/* Toast Notification Popup when a New Plan is Generated */}
      {newPlanToast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] bg-slate-900 text-white p-4 rounded-2xl border border-emerald-500/60 shadow-2xl flex items-start justify-between space-x-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5 border border-emerald-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                <span>✨ Novo Plano Gerado e Salvo!</span>
              </h4>
              <p className="text-xs font-semibold text-slate-100 mt-0.5 line-clamp-1">
                "{newPlanToast.titulo}"
              </p>
              <p className="text-[11px] text-slate-300 mt-1">
                Notificação adicionada à sua aba <strong className="text-emerald-300 font-bold">Meus Planos</strong>.
              </p>
              <button
                onClick={() => {
                  handleSelectTab('library');
                  setNewPlanToast(null);
                }}
                className="mt-2 text-xs font-bold text-blue-300 hover:text-white underline cursor-pointer inline-flex items-center space-x-1"
              >
                <span>Ver na Aba Meus Planos</span>
                <span>→</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => setNewPlanToast(null)}
            className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer p-1"
            title="Fechar Notificação"
          >
            ✕
          </button>
        </div>
      )}

      {/* Trial Expired Notification Modal */}
      <TrialExpiredModal
        isOpen={showTrialExpiredModal}
        onClose={() => setShowTrialExpiredModal(false)}
        onGoToSubscription={() => setActiveTab('subscription')}
        userCredits={userCredits}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 text-center print:hidden">
        <div className="max-w-5xl mx-auto px-4">
          <p>© 2026 Planejador Pedagógico BNCC - Inteligência Artificial para Educação Básica Brasileira.</p>
        </div>
      </footer>
    </div>
  );
}

