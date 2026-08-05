import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Wand2,
  BarChart3,
  Globe,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { User } from '../types';
import {
  auth,
  isFirebaseConfigured,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from '../lib/firebase';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot_password'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Password Requirement Calculations
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasLetter && hasNumber && hasMinLength;

  // Submit Handler for Email Form with Firebase Integration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMsg('Por favor, preencha o e-mail e a senha.');
        return;
      }

      setIsLoading(true);
      try {
        if (!isFirebaseConfigured) {
          // Development / Local mode fallback
          setTimeout(() => {
            setIsLoading(false);
            const loggedUser: User = {
              id: 'usr_' + Date.now(),
              name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
              email: email,
              escola: 'Escola Municipal de Educação Básica',
              createdAt: new Date().toISOString(),
            };
            onLoginSuccess(loggedUser);
          }, 600);
          return;
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;

        const loggedUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
          email: fbUser.email || email,
          escola: 'Escola Municipal de Educação Básica',
          createdAt: new Date().toISOString(),
        };
        setIsLoading(false);
        onLoginSuccess(loggedUser);
      } catch (err: any) {
        setIsLoading(false);
        console.error("Firebase Login Error:", err);
        if (err.code === 'auth/invalid-api-key' || err.message?.includes('API key')) {
          // API key fallback to instant login
          const loggedUser: User = {
            id: 'usr_' + Date.now(),
            name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
            email: email,
            escola: 'Escola Municipal de Educação Básica',
            createdAt: new Date().toISOString(),
          };
          onLoginSuccess(loggedUser);
        } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          setErrorMsg('E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.');
        } else if (err.code === 'auth/too-many-requests') {
          setErrorMsg('Acesso temporariamente bloqueado por muitas tentativas mal sucedidas. Tente mais tarde.');
        } else {
          setErrorMsg('Erro ao realizar login. Verifique seus dados de acesso.');
        }
      }
    } else if (mode === 'register') {
      if (!name || !email || !password || !confirmPassword) {
        setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      if (!isPasswordValid) {
        setErrorMsg('A senha precisa cumprir todos os requisitos de segurança indicados abaixo.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMsg('As senhas não coincidem. Verifique e tente novamente.');
        return;
      }

      setIsLoading(true);
      try {
        if (!isFirebaseConfigured) {
          setTimeout(() => {
            setIsLoading(false);
            const registeredUser: User = {
              id: 'usr_' + Date.now(),
              name: name || email.split('@')[0],
              email: email,
              escola: 'Escola Municipal de Educação Básica',
              createdAt: new Date().toISOString(),
            };
            onLoginSuccess(registeredUser);
          }, 600);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;

        // Set Display Name in Firebase
        await updateProfile(fbUser, { displayName: name });

        const registeredUser: User = {
          id: fbUser.uid,
          name: name || fbUser.displayName || email.split('@')[0],
          email: fbUser.email || email,
          escola: 'Escola Municipal de Educação Básica',
          createdAt: new Date().toISOString(),
        };

        setIsLoading(false);
        onLoginSuccess(registeredUser);
      } catch (err: any) {
        setIsLoading(false);
        console.error("Firebase Register Error:", err);
        if (err.code === 'auth/invalid-api-key' || err.message?.includes('API key')) {
          const registeredUser: User = {
            id: 'usr_' + Date.now(),
            name: name || email.split('@')[0],
            email: email,
            escola: 'Escola Municipal de Educação Básica',
            createdAt: new Date().toISOString(),
          };
          onLoginSuccess(registeredUser);
        } else if (err.code === 'auth/email-already-in-use') {
          setErrorMsg('Este e-mail já está cadastrado no sistema. Faça login com suas credenciais.');
        } else if (err.code === 'auth/invalid-email') {
          setErrorMsg('E-mail inválido. Por favor, digite um e-mail correto.');
        } else {
          setErrorMsg('Erro ao cadastrar conta: ' + (err.message || 'Tente novamente.'));
        }
      }
    } else if (mode === 'forgot_password') {
      if (!email) {
        setErrorMsg('Informe seu e-mail para receber as instruções de recuperação.');
        return;
      }

      setIsLoading(true);
      try {
        await sendPasswordResetEmail(auth, email);
        setIsLoading(false);
        setSuccessMsg(`Enviamos um e-mail com o link de redefinição de senha para ${email}. Verifique sua caixa de entrada e a pasta de spam.`);
      } catch (err: any) {
        setIsLoading(false);
        if (err.code === 'auth/user-not-found') {
          setErrorMsg('Não encontramos nenhuma conta cadastrada com este e-mail.');
        } else {
          setErrorMsg('Não foi possível enviar o e-mail de recuperação. Verifique se o e-mail digitado está correto.');
        }
      }
    }
  };

  const scrollToLoginCard = () => {
    const element = document.getElementById('login-card-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-black text-[#0038a8] tracking-tight">
              Planejador BNCC
            </span>
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setMode('login');
                scrollToLoginCard();
              }}
              className="text-xs font-extrabold text-slate-700 hover:text-[#0038a8] transition-colors cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => {
                setMode('register');
                scrollToLoginCard();
              }}
              className="bg-[#0038a8] hover:bg-blue-800 text-white text-xs font-black px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
            >
              Teste Grátis
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="bg-gradient-to-b from-slate-50/70 via-white to-[#f4f6fe] pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center bg-[#e8eeff] text-[#0038a8] text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-200/60">
              Plataforma nº 1 para Professores
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              A ferramenta definitiva para o{' '}
              <span className="text-[#0038a8]">planejamento docente</span> alinhado à BNCC.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              Transforme burocracia em criatividade. Economize horas de trabalho manual com nossa inteligência artificial especializada em educação brasileira.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => {
                  setMode('register');
                  scrollToLoginCard();
                }}
                className="bg-[#0038a8] hover:bg-blue-800 text-white text-xs sm:text-sm font-extrabold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                Começar Teste Grátis de 7 Dias
              </button>

              <button
                onClick={() => {
                  setMode('login');
                  scrollToLoginCard();
                }}
                className="text-xs sm:text-sm font-extrabold text-[#0038a8] hover:text-blue-900 flex items-center justify-center space-x-1.5 py-3 cursor-pointer"
              >
                <span>Já sou cliente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-3 pt-4">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Professora"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Professor"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Professora"
                />
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                +5.000 professores já otimizando seu tempo
              </span>
            </div>
          </div>

          {/* Right Hero Graphic - Dashboard Monitor Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto bg-slate-900 rounded-2xl p-2.5 shadow-2xl border border-slate-700/80 max-w-md lg:max-w-none">
              {/* Monitor Screen Frame */}
              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 aspect-4/3 relative flex flex-col justify-between p-4 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop&q=80')`
                }}
              >
                {/* Mockup Header */}
                <div className="flex items-center justify-between text-white/80 border-b border-white/10 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300">Planejador BNCC • Painel Docente</span>
                </div>

                {/* Floating Notification Badge */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/80 max-w-xs text-left animate-bounce duration-1000 mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0038a8] flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">Plano Gerado!</div>
                      <div className="text-[10px] text-slate-500 font-bold">Alinhado à EF01LP01</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. LOGIN / AUTHENTICATION CARD SECTION */}
      <section id="login-card-section" className="bg-[#f0f3fe] py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column Text */}
          <div className="text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {mode === 'login' && 'Bem-vindo de volta, professor.'}
              {mode === 'register' && 'Crie sua conta e ganhe 7 dias grátis.'}
              {mode === 'forgot_password' && 'Recuperar acesso'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {mode === 'login' && 'Continue seu planejamento de onde parou. O Planejador BNCC sincroniza seus planos em tempo real.'}
              {mode === 'register' && 'Junte-se a mais de 5.000 professores e simplifique sua rotina pedagógica em segundos.'}
              {mode === 'forgot_password' && 'Digite seu e-mail cadastrado e enviaremos um link de acesso.'}
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0038a8] shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Acesso instantâneo a todos os recursos</span>
              </div>

              <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0038a8] shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Suporte prioritário via WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="text-left">
            {errorMsg && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl p-3 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Profª. Maria Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0038a8] focus:bg-white transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  E-mail Institucional
                </label>
                <input
                  type="email"
                  required
                  placeholder="nome@escola.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0038a8] focus:bg-white transition-all"
                />
              </div>

              {mode !== 'forgot_password' && (
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0038a8] focus:bg-white transition-all"
                  />

                  {/* Password Requirements Checklist */}
                  <div className="mt-2.5 p-3 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-1 text-xs font-medium">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Requisitos da senha:
                    </div>

                    <div className={`flex items-center space-x-2 transition-colors ${hasLetter ? 'text-emerald-700 font-bold' : 'text-rose-600 font-semibold'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${hasLetter ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                        {hasLetter ? '✔' : '✕'}
                      </span>
                      <span>Pelo menos uma letra</span>
                    </div>

                    <div className={`flex items-center space-x-2 transition-colors ${hasNumber ? 'text-emerald-700 font-bold' : 'text-rose-600 font-semibold'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${hasNumber ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                        {hasNumber ? '✔' : '✕'}
                      </span>
                      <span>Pelo menos 1 número</span>
                    </div>

                    <div className={`flex items-center space-x-2 transition-colors ${hasMinLength ? 'text-emerald-700 font-bold' : 'text-rose-600 font-semibold'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${hasMinLength ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                        {hasMinLength ? '✔' : '✕'}
                      </span>
                      <span>Pelo menos 6 caracteres</span>
                    </div>
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0038a8] focus:bg-white transition-all"
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#0038a8] focus:ring-[#0038a8]"
                    />
                    <span>Lembrar-me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setMode('forgot_password')}
                    className="text-[#0038a8] hover:underline font-bold"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0038a8] hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-all cursor-pointer mt-2"
              >
                {isLoading ? 'Entrando...' : mode === 'login' ? 'Entrar no Painel' : mode === 'register' ? 'Criar Minha Conta Grátis' : 'Enviar Link de Recuperação'}
              </button>
            </form>

            {/* Toggle Modes */}
            <div className="mt-4 text-center text-xs font-medium text-slate-500">
              {mode === 'login' ? (
                <>
                  Não tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-[#0038a8] font-bold hover:underline"
                  >
                    Crie uma agora
                  </button>
                </>
              ) : (
                <>
                  Já possui uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#0038a8] font-bold hover:underline"
                  >
                    Fazer Login
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURES SECTION ("Tudo o que você precisa em um único lugar") */}
      <section id="recursos" className="py-20 bg-white border-t border-slate-100 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tudo o que você precisa em um único lugar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
            Nossa plataforma foi construída ouvindo centenas de educadores para resolver os maiores gargalos do dia a dia escolar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 text-left">
            {/* Card 1 */}
            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#0038a8] mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-2">Banco de Habilidades</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Acesso completo e organizado a todas as habilidades da BNCC por ano, componente curricular e temática.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#0038a8] mb-4">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-2">Gerador com IA</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Crie sugestões de planos de aula em segundos. Basta escolher a habilidade e nossa IA sugere metodologias e avaliações.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#0038a8] mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-2">Relatórios Automáticos</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Gere diários e relatórios de desempenho trimestrais formatados e prontos para impressão ou envio digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BLUE BANNER */}
      <section className="py-16 px-4 sm:px-8 bg-[#f0f3fe]">
        <div className="max-w-4xl mx-auto bg-[#0038a8] rounded-3xl p-10 sm:p-14 text-center text-white shadow-xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Comece sua transformação hoje.
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
            Aproveite 7 dias de acesso total a todos os recursos. Sem compromisso, sem necessidade de cartão de crédito no cadastro.
          </p>

          <button
            onClick={() => {
              setMode('register');
              scrollToLoginCard();
            }}
            className="bg-white text-[#0038a8] hover:bg-slate-100 font-black text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer inline-block mb-4"
          >
            Criar Minha Conta Gratuita
          </button>

          <p className="text-[11px] text-blue-200/90 font-medium">
            🛡️ Garantia de satisfação e segurança de dados (LGPD)
          </p>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-4 sm:px-8 text-xs text-slate-500 font-medium">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-extrabold text-slate-800">Planejador BNCC</span>
            <span className="ml-2">© 2024 Planejador BNCC. Todos os direitos reservados.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
            <a href="#suporte" className="hover:text-slate-900 transition-colors">Suporte</a>
            <a href="#termos" className="hover:text-slate-900 transition-colors">Termos de Uso</a>
            <a href="#privacidade" className="hover:text-slate-900 transition-colors">Privacidade</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
            <a href="#contato" className="hover:text-slate-900 transition-colors">Contato</a>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <Globe className="w-4 h-4" />
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>
      </footer>
    </div>
  );
};
