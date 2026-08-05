import React from 'react';
import { BookOpen, Sparkles, Library, Search, School, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '../types';
import { Logo } from './ui/Logo';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  activeTab: 'create' | 'view' | 'library' | 'bncc' | 'subscription' | 'profile';
  setActiveTab: (tab: 'create' | 'view' | 'library' | 'bncc' | 'subscription' | 'profile') => void;
  savedCount: number;
  hasNewPlanNotification?: boolean;
  escola: string;
  setEscola: (v: string) => void;
  professor: string;
  setProfessor: (v: string) => void;
  subscriptionPlan: 'basico' | 'pro' | 'premium' | 'trial' | 'monthly' | 'annual' | 'expired' | string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  activeTab,
  setActiveTab,
  savedCount,
  hasNewPlanNotification = false,
  escola,
  setEscola,
  professor,
  setProfessor,
  subscriptionPlan,
}) => {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('create')}>
            <Logo variant="horizontal" size="md" darkTheme={true} />
          </div>

          {/* Desktop Navigation Links (hidden on mobile, shown on md+) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-lg text-xs lg:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>Gerar Plano</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`relative flex items-center space-x-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-lg text-xs lg:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Library className="w-4 h-4" />
              <span>Meus Planos</span>
              {savedCount > 0 && (
                <span className="bg-slate-700 text-blue-400 text-xs px-1.5 py-0.5 rounded-full font-semibold">
                  {savedCount}
                </span>
              )}
              {hasNewPlanNotification && (
                <span className="flex items-center space-x-1 bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-md border border-emerald-200 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
                  <span>1 NOVO!</span>
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('bncc')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-lg text-xs lg:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'bncc'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>BNCC</span>
            </button>

            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-lg text-xs lg:text-sm font-black transition-all border cursor-pointer ${
                activeTab === 'subscription'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/20'
                  : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500 shadow-md shadow-blue-600/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
              <span>Assinatura</span>
              <span className="hidden xl:inline-block bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase">
                {subscriptionPlan === 'pro'
                  ? 'PRO'
                  : subscriptionPlan === 'premium'
                  ? 'PREMIUM'
                  : subscriptionPlan === 'start'
                  ? 'START'
                  : '10 Créditos'}
              </span>
            </button>
          </nav>

          {/* Right Profile / Cabeçalho Popover Trigger */}
          <div className="relative shrink-0 flex items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
              title="Configurações Rápidas"
            >
              ⚙️
            </button>

            {showSettings && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 z-50 text-slate-100">
                {/* User Account Info Section */}
                {user && (
                  <div className="pb-3 mb-3 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 truncate">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="truncate">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowSettings(false);
                        onLogout();
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1 text-xs font-semibold shrink-0"
                      title="Sair da conta"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Sair</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowSettings(false);
                    setActiveTab('profile');
                  }}
                  className="w-full text-left bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600/50 p-2.5 rounded-lg text-xs font-bold text-blue-200 flex items-center justify-between transition-colors mb-3 cursor-pointer"
                >
                  <span className="flex items-center space-x-1.5">
                    <UserIcon className="w-4 h-4 text-blue-400" />
                    <span>Ver Perfil Completo</span>
                  </span>
                  <span>→</span>
                </button>

                <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-1">
                    <School className="w-4 h-4" />
                    <span>Dados para o Cabeçalho</span>
                  </h4>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1 flex items-center space-x-1">
                      <UserIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Nome do(a) Professor(a):</span>
                    </label>
                    <input
                      type="text"
                      value={professor}
                      onChange={(e) => setProfessor(e.target.value)}
                      placeholder="Ex: Prof. Sidônio Silva"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1 flex items-center space-x-1">
                      <School className="w-3.5 h-3.5 text-blue-400" />
                      <span>Nome da Escola / Instituição:</span>
                    </label>
                    <input
                      type="text"
                      value={escola}
                      onChange={(e) => setEscola(e.target.value)}
                      placeholder="Ex: E.E. Professor João Alves"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Estes dados serão incluídos no cabeçalho impresso dos seus planos de aula e folhas de atividades.
                  </p>

                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-lg text-xs cursor-pointer shadow-md"
                  >
                    Salvar Dados
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Navigation Sub-Bar (Visible on mobile screens < md) */}
        <div className="md:hidden py-2 border-t border-slate-800/80">
          <div className="grid grid-cols-5 gap-1 w-full">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center justify-center space-x-1 px-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>Gerar</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`relative flex items-center justify-center space-x-1 px-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                activeTab === 'library'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Library className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Planos</span>
              {hasNewPlanNotification && (
                <span className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-black text-slate-950 animate-bounce ring-2 ring-slate-900 shadow-md">
                  !
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('bncc')}
              className={`flex items-center justify-center space-x-1 px-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                activeTab === 'bncc'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span>BNCC</span>
            </button>

            <button
              onClick={() => setActiveTab('subscription')}
              className={`flex items-center justify-center space-x-1 px-1 py-2 rounded-xl text-[11px] font-black transition-all border cursor-pointer truncate ${
                activeTab === 'subscription'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300 fill-current shrink-0" />
              <span>Grátis</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center justify-center space-x-1 px-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Perfil</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
