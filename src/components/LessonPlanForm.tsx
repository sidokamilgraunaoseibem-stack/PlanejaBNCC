import React, { useState, useEffect } from 'react';
import {
  SERIES_OPCOES,
  DISCIPLINAS_POR_ETAPA,
  TEMAS_POR_ETAPA_E_DISCIPLINA,
  METODOLOGIAS_OPCOES,
  getEtapaFromSerie,
  getEtapaNomeFormatado,
  EtapaEscolar,
} from '../data/bnccData';
import { Presettopic, SubscriptionPlanType } from '../types';
import {
  Sparkles,
  Clock,
  Calendar,
  BookOpen,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  Loader2,
  Wand2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowRight,
  FileCheck2,
  ListChecks,
  Coins,
} from 'lucide-react';

interface LessonPlanFormProps {
  onSubmit: (formData: {
    serie: string;
    disciplina: string;
    tema: string;
    tempo: string;
    aulas_semana: string;
    metodologia: string;
    observacoes: string;
    escola: string;
    professor: string;
  }) => void;
  isLoading: boolean;
  escola: string;
  setEscola: (v: string) => void;
  professor: string;
  setProfessor: (v: string) => void;
  userCredits?: number;
  subscriptionPlan?: SubscriptionPlanType;
}

const parseAulasCount = (aulasStr: string): number => {
  if (!aulasStr) return 1;
  const match = aulasStr.match(/\d+/);
  if (match) {
    const val = parseInt(match[0], 10);
    return isNaN(val) || val <= 0 ? 1 : val;
  }
  return 1;
};

export const LessonPlanForm: React.FC<LessonPlanFormProps> = ({
  onSubmit,
  isLoading,
  escola,
  setEscola,
  professor,
  setProfessor,
  userCredits = 10,
  subscriptionPlan = 'trial',
}) => {
  const [serie, setSerie] = useState('1º Ano - Ensino Médio');
  const [disciplina, setDisciplina] = useState('Biologia');
  const [tema, setTema] = useState('Evolução Biológica, Seleção Natural e Genética');
  const [tempo, setTempo] = useState('50 minutos');
  const [aulasSemana, setAulasSemana] = useState('3 aulas');
  const [metodologia, setMetodologia] = useState('Gamificação e Jogos Pedagógicos (Game-Based Learning)');
  const [observacoes, setObservacoes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [loadingStep, setLoadingStep] = useState(0);

  // Derive stage from current selected series
  const etapa: EtapaEscolar = getEtapaFromSerie(serie);
  const disciplinasDisponiveis = DISCIPLINAS_POR_ETAPA[etapa] || [];
  const temasDisponiveis = TEMAS_POR_ETAPA_E_DISCIPLINA[etapa]?.[disciplina] || [];

  useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2200);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle series change with strict stage segregation
  const handleSerieChange = (novaSerie: string) => {
    setSerie(novaSerie);
    const novaEtapa = getEtapaFromSerie(novaSerie);
    const novasDisciplinas = DISCIPLINAS_POR_ETAPA[novaEtapa];

    let novaDisciplina = disciplina;
    if (!novasDisciplinas.includes(disciplina)) {
      novaDisciplina = novasDisciplinas[0];
      setDisciplina(novaDisciplina);
    }

    const novosTemas = TEMAS_POR_ETAPA_E_DISCIPLINA[novaEtapa]?.[novaDisciplina] || [];
    if (novosTemas.length > 0) {
      setTema(novosTemas[0]);
    }
  };

  // Handle discipline change
  const handleDisciplinaChange = (novaDisciplina: string) => {
    setDisciplina(novaDisciplina);
    const novosTemas = TEMAS_POR_ETAPA_E_DISCIPLINA[etapa]?.[novaDisciplina] || [];
    if (novosTemas.length > 0) {
      setTema(novosTemas[0]);
    }
  };

  const handleApplyPreset = (preset: Presettopic) => {
    setSerie(preset.serie);
    const novaEtapa = getEtapaFromSerie(preset.serie);
    const novasDisciplinas = DISCIPLINAS_POR_ETAPA[novaEtapa];
    if (novasDisciplinas.includes(preset.disciplina)) {
      setDisciplina(preset.disciplina);
    } else {
      setDisciplina(novasDisciplinas[0]);
    }
    setTema(preset.tema);
    setTempo(preset.tempo);
    setAulasSemana(preset.aulas_semana);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema.trim()) return;

    onSubmit({
      serie,
      disciplina,
      tema,
      tempo,
      aulas_semana: aulasSemana,
      metodologia,
      observacoes,
      escola,
      professor,
    });
  };

  const loadingMessages = [
    'Mapeando Habilidades oficiais BNCC para ' + disciplina + '...',
    'Estruturando sequência didática e atividades de aula...',
    'Alinhando objetivos pedagógicos e critérios de avaliação...',
    'Finalizando planejamento em PDF pronto para aplicar!'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* 1. SEÇÃO EXPLICATIVA COMPACTA: PASSO A PASSO */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 sm:p-4 shadow-md border border-blue-200 mb-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-800 mb-2.5">
          <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
          <span>Como funciona em 3 passos simples:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="bg-blue-50/80 border border-blue-100 px-3 py-2 rounded-xl flex items-center justify-center sm:justify-start space-x-2 text-center sm:text-left">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-[10px] shrink-0">1</span>
            <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Escolha a Série & Matéria</span>
          </div>

          <div className="bg-indigo-50/80 border border-indigo-100 px-3 py-2 rounded-xl flex items-center justify-center sm:justify-start space-x-2 text-center sm:text-left">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-[10px] shrink-0">2</span>
            <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Defina o Tema da Aula</span>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-100 px-3 py-2 rounded-xl flex items-center justify-center sm:justify-start space-x-2 text-center sm:text-left">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-[10px] shrink-0">3</span>
            <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Gerar Plano com BNCC</span>
          </div>
        </div>
      </div>

      {/* 2. FORMULÁRIO DIRETO E LIMPO */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-5 sm:p-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 pb-4 mb-6 border-b border-slate-100 text-center sm:text-left">
          <div className="flex items-center space-x-2 justify-center">
            <div className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">Preencha os dados do seu plano</h2>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            {getEtapaNomeFormatado(etapa).split('(')[0].trim()}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Grid Principal: Série e Disciplina */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Série */}
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-2 flex items-center justify-center sm:justify-start space-x-2 text-center sm:text-left">
                <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                <span>1. Ano Escolar / Série:</span>
              </label>
              <select
                value={serie}
                onChange={(e) => handleSerieChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-center sm:text-left"
              >
                <optgroup label="🎓 Ensino Médio (1º ao 3º Ano)">
                  {SERIES_OPCOES.filter((s) => s.includes('Ensino Médio') || s.includes('EJA')).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🎒 Ensino Fundamental II (6º ao 9º Ano)">
                  {SERIES_OPCOES.filter((s) => s.includes('Ensino Fundamental II')).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="✏️ Ensino Fundamental I (1º ao 5º Ano)">
                  {SERIES_OPCOES.filter((s) => s.includes('Ensino Fundamental I')).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🎨 Educação Infantil (0 a 5 anos)">
                  {SERIES_OPCOES.filter((s) => s.includes('Educação Infantil')).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Disciplina */}
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-2 flex items-center justify-center sm:justify-start space-x-2 text-center sm:text-left">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                <span>2. Matéria / Disciplina:</span>
              </label>
              <select
                value={disciplina}
                onChange={(e) => handleDisciplinaChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm sm:text-base text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-center sm:text-left"
              >
                {disciplinasDisponiveis.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Tema / Conteúdo da Aula */}
          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-2 flex items-center justify-center sm:justify-start space-x-2 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>3. Tema ou Conteúdo da Aula:</span>
            </label>
            <input
              type="text"
              required
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ex: Introdução à Fotossíntese e Cadeia Alimentar"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all text-center sm:text-left"
            />
            
            {/* Chips de Temas Específicos da Disciplina */}
            {temasDisponiveis.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5 items-center justify-center sm:justify-start">
                <span className="text-[11px] font-bold text-slate-500 mr-1 w-full sm:w-auto text-center sm:text-left">Tópicos recomendados:</span>
                {temasDisponiveis.slice(0, 4).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTema(item)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-semibold ${
                      tema === item
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Aulas na Semana (Desconto direto em Créditos) */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-2.5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <span>4. Aulas na Semana:</span>
              </div>
              <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300/80 flex items-center space-x-1 shadow-sm">
                <Coins className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
                <span>
                  {subscriptionPlan === 'pro' || subscriptionPlan === 'premium'
                    ? '✨ Plano Ilimitado'
                    : `Consome ${parseAulasCount(aulasSemana)} crédito(s)`}
                </span>
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {['1 aula', '2 aulas', '3 aulas', '4 aulas', '5 aulas', '6 aulas'].map((option) => {
                const count = parseAulasCount(option);
                const isSelected = aulasSemana === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAulasSemana(option)}
                    className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-0.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-300'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-blue-400 hover:bg-blue-50/60'
                    }`}
                  >
                    <span className="font-extrabold">{option}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-500 font-medium'}`}>
                      -{count} {count === 1 ? 'crédito' : 'créditos'}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] font-medium text-slate-500 mt-2 text-center sm:text-left">
              ⚡ 1 aula = 1 crédito consumido. Ao selecionar {parseAulasCount(aulasSemana)} {parseAulasCount(aulasSemana) === 1 ? 'aula' : 'aulas'}, {parseAulasCount(aulasSemana)} {parseAulasCount(aulasSemana) === 1 ? 'crédito será descontado' : 'créditos serão descontados'} dos seus {userCredits} disponíveis.
            </p>
          </div>

          {/* Toggle de Configurações Adicionais (Opcionais) */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1.5 focus:outline-none cursor-pointer py-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvanced ? 'Ocultar Opções Adicionais' : '+ Personalizar Duração, Metodologia ou Escola (Opcional)'}</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAdvanced && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duração de Cada Aula:
                  </label>
                  <select
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    <option value="45 minutos">45 minutos</option>
                    <option value="50 minutos">50 minutos</option>
                    <option value="1 hora">1 hora</option>
                    <option value="1h40min">1h40min (Aula Dupla)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Metodologia:
                  </label>
                  <select
                    value={metodologia}
                    onChange={(e) => setMetodologia(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    {METODOLOGIAS_OPCOES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome do Professor (Opcional):
                  </label>
                  <input
                    type="text"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                    placeholder="Ex: Prof. Carlos Silva"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome da Escola (Opcional):
                  </label>
                  <input
                    type="text"
                    value={escola}
                    onChange={(e) => setEscola(e.target.value)}
                    placeholder="Ex: Escola Estadual Machado de Assis"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botão de Ação Principal */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white shadow-xl transition-all flex flex-col items-center justify-center cursor-pointer ${
                isLoading
                  ? 'bg-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] shadow-blue-600/30'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-300" />
                  <span>Gerando Planejamento ({parseAulasCount(aulasSemana)} {parseAulasCount(aulasSemana) === 1 ? 'aula' : 'aulas'})...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span>GERAR PLANEJAMENTO DE {parseAulasCount(aulasSemana)} {parseAulasCount(aulasSemana) === 1 ? 'AULA' : 'AULAS'}</span>
                  </div>
                  {subscriptionPlan !== 'pro' && subscriptionPlan !== 'premium' && (
                    <span className="text-xs font-semibold text-blue-100 mt-1 flex items-center space-x-1">
                      <Coins className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>
                        Consome {parseAulasCount(aulasSemana)} {parseAulasCount(aulasSemana) === 1 ? 'crédito' : 'créditos'} dos seus {userCredits} disponíveis
                      </span>
                    </span>
                  )}
                </div>
              )}
            </button>
          </div>

        </form>

        {/* Feedback de Progresso Limpo e Direto ao Gerar */}
        {isLoading && (
          <div className="mt-6 bg-slate-900 text-white rounded-2xl p-6 border border-blue-800/50 shadow-2xl animate-fade-in text-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30 mb-2">
                <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
              </div>
              <h4 className="text-base font-extrabold text-slate-100">Criando Seu Plano de Aula...</h4>
              <p className="text-xs text-slate-400 mt-0.5">Alinhando os códigos oficiais da BNCC para {disciplina}</p>
            </div>

            <div className="max-w-md mx-auto space-y-2 text-left bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {loadingMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-2.5 text-xs transition-opacity duration-300 ${
                    idx <= loadingStep ? 'opacity-100 text-slate-200' : 'opacity-30 text-slate-500'
                  }`}
                >
                  {idx < loadingStep ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : idx === loadingStep ? (
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                  )}
                  <span className="font-medium">{msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
