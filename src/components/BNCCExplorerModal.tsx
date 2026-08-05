import React, { useState } from 'react';
import { HABILIDADES_BNCC_POPULARES, HABILIDADES_BNCC_POPULARES as ALL_SKILLS } from '../data/bnccData';
import { Search, BookOpen, GraduationCap, Copy, Check, Sparkles, HelpCircle, Lightbulb, ArrowRight, Wand2, FileText } from 'lucide-react';

export const BNCCExplorerModal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('Todas');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const disciplines = ['Todas', ...Array.from(new Set(ALL_SKILLS.map((s) => s.disciplina)))];

  const filteredSkills = ALL_SKILLS.filter((skill) => {
    const matchesSearch =
      skill.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.etapa.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDisc = selectedDiscipline === 'Todas' || skill.disciplina === selectedDiscipline;

    return matchesSearch && matchesDisc;
  });

  const handleCopy = (code: string, desc: string) => {
    navigator.clipboard.writeText(`${code} - ${desc}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 border border-slate-700 text-center sm:text-left flex flex-col items-center sm:items-start">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1 text-blue-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Catálogo de Habilidades</span>
          </div>
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1 text-emerald-300 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mais de 1.000 Habilidades ({ALL_SKILLS.length.toLocaleString('pt-BR')} Cadastradas)</span>
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Consulta Rápida da BNCC</h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          Pesquise entre as <strong>{ALL_SKILLS.length.toLocaleString('pt-BR')} habilidades oficiais</strong> da Base Nacional Comum Curricular por código, área do conhecimento, ano escolar ou palavras-chave para fundamentar seus planos de aula.
        </p>
      </div>

      {/* Tutorial / Guia de Uso para o Professor Lead */}
      <div className="bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/60 rounded-2xl border border-blue-200/80 p-5 shadow-sm mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2.5 sm:space-y-0 space-x-0 sm:space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-sm font-extrabold text-slate-900 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span>Como Usar a Consulta BNCC no Seu Dia a Dia</span>
              <span className="bg-blue-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider">
                Passo a Passo
              </span>
            </h3>
            <p className="text-[11px] text-slate-600 font-medium mt-0.5">Siga estes 4 passos simples para agilizar o planejamento e garantir alinhamento com o MEC:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 mt-2">
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-4 shadow-md shadow-blue-600/25 border border-blue-500 hover:shadow-lg hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5 relative flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="flex items-center justify-between w-full mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-black flex items-center justify-center border border-white/30 shadow-xs">
                  1
                </span>
                <div className="p-1.5 rounded-lg bg-white/15 border border-white/20 text-cyan-200">
                  <Search className="w-4 h-4" />
                </div>
              </div>
              <h4 className="text-xs font-bold text-white mb-1.5 tracking-tight">Encontre a Habilidade</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed font-normal">
                Filtre por disciplina ou digite o assunto no campo de busca (ex: <i>"multiplicação"</i>, <i>"meio ambiente"</i> ou <i>"EF03MA06"</i>).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/15 w-full flex items-center justify-center sm:justify-start text-[10px] text-blue-200 font-semibold">
              <span>Passo 1 de 4</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-b from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-4 shadow-md shadow-blue-600/25 border border-blue-500 hover:shadow-lg hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5 relative flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="flex items-center justify-between w-full mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-black flex items-center justify-center border border-white/30 shadow-xs">
                  2
                </span>
                <div className="p-1.5 rounded-lg bg-white/15 border border-white/20 text-cyan-200">
                  <Copy className="w-4 h-4" />
                </div>
              </div>
              <h4 className="text-xs font-bold text-white mb-1.5 tracking-tight">Copie com 1 Clique</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed font-normal">
                Clique em <strong className="text-white">"Copiar Habilidade"</strong> no cartão. O código e a descrição oficial serão copiados na hora.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/15 w-full flex items-center justify-center sm:justify-start text-[10px] text-blue-200 font-semibold">
              <span>Passo 2 de 4</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-b from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-4 shadow-md shadow-blue-600/25 border border-blue-500 hover:shadow-lg hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5 relative flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="flex items-center justify-between w-full mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-black flex items-center justify-center border border-white/30 shadow-xs">
                  3
                </span>
                <div className="p-1.5 rounded-lg bg-white/15 border border-white/20 text-cyan-200">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <h4 className="text-xs font-bold text-white mb-1.5 tracking-tight">Cole no Gerador</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed font-normal">
                Navegue até a aba <strong className="text-white">"Gerar Plano"</strong> e cole a habilidade no campo de <strong className="text-white">Tema</strong> ou <strong className="text-white">Observações</strong>.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/15 w-full flex items-center justify-center sm:justify-start text-[10px] text-blue-200 font-semibold">
              <span>Passo 3 de 4</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-b from-blue-600 via-blue-600 to-indigo-700 text-white rounded-xl p-4 shadow-md shadow-blue-600/25 border border-blue-500 hover:shadow-lg hover:shadow-blue-600/35 transition-all hover:-translate-y-0.5 relative flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="flex items-center justify-between w-full mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-black flex items-center justify-center border border-white/30 shadow-xs">
                  4
                </span>
                <div className="p-1.5 rounded-lg bg-white/15 border border-white/20 text-amber-300">
                  <Wand2 className="w-4 h-4" />
                </div>
              </div>
              <h4 className="text-xs font-bold text-white mb-1.5 tracking-tight">Gere com IA Pedagógica</h4>
              <p className="text-[11px] text-blue-100 leading-relaxed font-normal">
                Nossa IA criará objetivos, metodologias ativas e avaliações 100% alinhadas ao código BNCC colado.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/15 w-full flex items-center justify-center sm:justify-start text-[10px] text-blue-200 font-semibold">
              <span>Passo 4 de 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o código (ex: EF02LP05), palavra-chave ou etapa..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={selectedDiscipline}
          onChange={(e) => setSelectedDiscipline(e.target.value)}
          className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 shrink-0"
        >
          {disciplines.map((d) => (
            <option key={d} value={d}>
              {d === 'Todas' ? 'Todas as Disciplinas' : d}
            </option>
          ))}
        </select>
      </div>

      {/* Results Header Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 mb-4 px-1">
        <span className="text-xs font-bold text-slate-600">
          Exibindo <span className="text-blue-600 font-black">{filteredSkills.length}</span> de <span className="text-slate-900 font-black">{ALL_SKILLS.length}</span> habilidades cadastradas
        </span>
        {searchTerm && (
          <button
            onClick={() => { setSearchTerm(''); setSelectedDiscipline('Todas'); }}
            className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 font-medium">Nenhuma habilidade encontrada para o termo pesquisado.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDiscipline('Todas'); }}
              className="mt-3 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
            >
              Ver Todas as Habilidades
            </button>
          </div>
        ) : (
          filteredSkills.map((sk) => (
            <div
              key={sk.codigo}
              className="bg-gradient-to-r from-blue-50/60 via-white to-white border-y border-r border-slate-200 border-l-4 border-l-blue-600 rounded-2xl p-4 sm:p-4.5 shadow-2xs hover:shadow-md hover:border-blue-400 hover:from-blue-50 transition-all flex flex-col sm:flex-row justify-between items-center sm:items-center text-center sm:text-left gap-3.5 group"
            >
              <div className="flex-1 flex flex-col items-center sm:items-start w-full">
                <div className="flex items-center justify-center sm:justify-start space-x-2.5 mb-1.5 flex-wrap gap-y-1 w-full">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs px-3 py-1 rounded-lg shadow-sm shadow-blue-600/30 tracking-wider">
                    {sk.codigo}
                  </span>
                  <span className="text-xs font-bold text-blue-900 bg-blue-100/80 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    {sk.disciplina} ({sk.etapa})
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800 mt-2 leading-relaxed">
                  {sk.descricao}
                </p>
              </div>

              <button
                onClick={() => handleCopy(sk.codigo, sk.descricao)}
                className={`w-full sm:w-auto justify-center text-xs font-bold px-4 py-2.5 sm:py-2 rounded-xl flex items-center space-x-1.5 transition-all shrink-0 cursor-pointer shadow-sm active:scale-95 ${
                  copiedCode === sk.codigo
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25 hover:shadow-blue-600/40'
                }`}
              >
                {copiedCode === sk.codigo ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Habilidade Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-blue-100" />
                    <span>Copiar Habilidade</span>
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
