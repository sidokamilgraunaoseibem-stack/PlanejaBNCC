import React, { useState } from 'react';
import { LessonPlan } from '../types';
import {
  Library,
  Search,
  Trash2,
  ExternalLink,
  Calendar,
  BookOpen,
  GraduationCap,
  FileDown,
  Printer,
  Sparkles,
} from 'lucide-react';

interface SavedPlansLibraryProps {
  plans: LessonPlan[];
  onSelectPlan: (plan: LessonPlan) => void;
  onDeletePlan: (id: string) => void;
  hasNewPlanNotification?: boolean;
  latestGeneratedId?: string | null;
  onClearNotification?: () => void;
}

export const SavedPlansLibrary: React.FC<SavedPlansLibraryProps> = ({
  plans,
  onSelectPlan,
  onDeletePlan,
  hasNewPlanNotification = false,
  latestGeneratedId = null,
  onClearNotification,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Todas');

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.inputParams?.tema?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.inputParams?.disciplina?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      selectedSubject === 'Todas' || plan.inputParams?.disciplina === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  const subjectsList = ['Todas', ...Array.from(new Set(plans.map((p) => p.inputParams?.disciplina).filter(Boolean)))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
            <Library className="w-6 h-6 text-blue-300" />
            <span className="text-white">Biblioteca de Planos de Aula</span>
          </h1>
          <p className="text-xs text-blue-100/90 mt-1">
            {plans.length} {plans.length === 1 ? 'planejamento salvo' : 'planejamentos salvos'} na sua coleção local
          </p>
        </div>
      </div>

      {/* New Plan Notification Alert Banner */}
      {hasNewPlanNotification && (
        <div className="mb-6 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-indigo-500/20 border border-emerald-400/50 text-emerald-100 rounded-2xl p-4 flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-400 text-slate-950 rounded-xl font-black shrink-0 text-xs shadow-md">
              ✨ NOVO
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center space-x-1.5">
                <span>Você tem um novo plano de aula gerado!</span>
              </h4>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                O seu planejamento foi salvo automaticamente e está em destaque na sua biblioteca.
              </p>
            </div>
          </div>
          {onClearNotification && (
            <button
              onClick={onClearNotification}
              className="text-xs font-bold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-900 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ml-2 border border-slate-700"
            >
              Entendido ✕
            </button>
          )}
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por título, assunto ou disciplina..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
        >
          {subjectsList.map((sub) => (
            <option key={sub} value={sub}>
              {sub === 'Todas' ? 'Todas as Disciplinas' : sub}
            </option>
          ))}
        </select>
      </div>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-12 text-center">
          <Library className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Nenhum planejamento encontrado</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            {plans.length === 0
              ? 'Você ainda não salvou nenhum plano de aula. Gere um novo planejamento no formulário para salvar na sua biblioteca!'
              : 'Nenhum resultado corresponde à sua pesquisa.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((p) => {
            const isLatest = p.id === latestGeneratedId;
            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group relative ${
                  isLatest
                    ? 'border-emerald-400 ring-2 ring-emerald-400/30 bg-gradient-to-b from-emerald-50/40 to-white'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {p.inputParams?.disciplina}
                      </span>
                      {isLatest && (
                        <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          ✨ NOVO
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString('pt-BR') : ''}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {p.titulo}
                  </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {p.objetivoGeral}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{p.inputParams?.serie}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{p.planejamentoSemanal?.length || 3} aulas planejadas</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectPlan(p)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Abrir Plano</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => p.id && onDeletePlan(p.id)}
                  className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Excluir Plano"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        </div>
      )}

    </div>
  );
};
