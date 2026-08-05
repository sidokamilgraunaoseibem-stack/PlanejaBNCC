import React, { useState } from 'react';
import { LessonPlan } from '../types';
import {
  Printer,
  FileDown,
  FileText,
  Save,
  Wand2,
  Check,
  Calendar,
  Clock,
  BookOpen,
  Target,
  Brain,
  Puzzle,
  Award,
  RefreshCw,
  Package,
  HelpCircle,
  TrendingUp,
  Edit3,
  Copy,
  ChevronRight,
  School,
  User,
  Sparkles,
  Loader2,
  Layers
} from 'lucide-react';

interface LessonPlanViewProps {
  plan: LessonPlan;
  onSavePlan: (plan: LessonPlan) => void;
  onGenerateActivitySheet: (plan: LessonPlan) => void;
  onRefinePlan: (currentPlan: LessonPlan, instruction: string) => Promise<void>;
  isRefining: boolean;
  escola: string;
  professor: string;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({
  plan,
  onSavePlan,
  onGenerateActivitySheet,
  onRefinePlan,
  isRefining,
  escola,
  professor,
}) => {
  const [activeTabAula, setActiveTabAula] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedPlan, setEditedPlan] = useState<LessonPlan>(plan);
  const [refinePrompt, setRefinePrompt] = useState<string>('');
  const [showRefineBox, setShowRefineBox] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    setEditedPlan(plan);
  }, [plan]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>${editedPlan.titulo}</title>
    <style>
      body { font-family: 'Calibri', 'Arial', sans-serif; margin: 30px; color: #1e293b; line-height: 1.6; }
      h1 { color: #047857; font-size: 22pt; border-bottom: 2px solid #047857; padding-bottom: 8px; }
      h2 { color: #0f766e; font-size: 16pt; margin-top: 20px; border-bottom: 1px solid #e2e8f0; }
      .meta { background-color: #f8fafc; padding: 12px; border: 1px solid #cbd5e1; margin-bottom: 20px; }
      .badge { background-color: #d1fae5; color: #065f46; font-weight: bold; padding: 2px 8px; border-radius: 4px; }
      .aula-box { border: 1px solid #cbd5e1; padding: 12px; margin-bottom: 12px; background-color: #fafafa; }
    </style>
    </head><body>`;

    const footer = "</body></html>";

    const content = `
      <div class="meta">
        <p><strong>Escola:</strong> ${editedPlan.escola || escola || '____________________'}</p>
        <p><strong>Professor(a):</strong> ${editedPlan.professor || professor || '____________________'}</p>
        <p><strong>Série/Turma:</strong> ${editedPlan.inputParams?.serie || editedPlan.turmaInfo}</p>
        <p><strong>Disciplina:</strong> ${editedPlan.inputParams?.disciplina}</p>
        <p><strong>Tema/Conteúdo:</strong> ${editedPlan.inputParams?.tema}</p>
        <p><strong>Carga Horária:</strong> ${editedPlan.inputParams?.aulas_semana} de ${editedPlan.inputParams?.tempo}</p>
      </div>

      <h1>📌 ${editedPlan.titulo}</h1>

      <h2>🎯 Objetivo Geral</h2>
      <p>${editedPlan.objetivoGeral}</p>

      <h2>🧠 Habilidades da BNCC</h2>
      <ul>
        ${editedPlan.habilidadesBNCC.map(h => `<li><span class="badge">${h.codigo}</span> - ${h.descricao}</li>`).join('')}
      </ul>

      <h2>📅 Planejamento Semanal de Aulas</h2>
      ${editedPlan.planejamentoSemanal.map(a => `
        <div class="aula-box">
          <h3>🔹 Aula ${a.numeroAula}: Tempo Estimado (${a.tempoEstimado})</h3>
          <p><strong>Objetivo da aula:</strong> ${a.objetivo}</p>
          <p><strong>Introdução:</strong> ${a.introducao}</p>
          <p><strong>Desenvolvimento:</strong> ${a.desenvolvimento}</p>
          <p><strong>Atividade Prática:</strong> ${a.atividadePratica}</p>
          <p><strong>Sugestão Lúdica:</strong> ${a.sugestaoLudica}</p>
        </div>
      `).join('')}

      <h2>🧩 Atividade Complementar</h2>
      <p>${editedPlan.atividadeComplementar}</p>

      <h2>📊 Avaliação Contínua</h2>
      <p><strong>Como avaliar:</strong> ${editedPlan.avaliacao.comoAvaliar}</p>
      <p><strong>Critérios de Avaliação:</strong></p>
      <ul>
        ${editedPlan.avaliacao.criterios.map(c => `<li>${c}</li>`).join('')}
      </ul>

      <h2>🔄 Adaptações Pedagógicas & Inclusão</h2>
      <p><strong>Para alunos com dificuldade / AEE:</strong> ${editedPlan.adaptacoesPedagogicas.dificuldades}</p>
      <p><strong>Para alunos com ritmo avançado:</strong> ${editedPlan.adaptacoesPedagogicas.avancados}</p>

      <h2>🧰 Materiais & Recursos Necessários</h2>
      <ul>
        ${editedPlan.materiaisNecessarios.map(m => `<li>${m}</li>`).join('')}
      </ul>

      <h2>💡 Dicas Práticas para o Professor</h2>
      <p><strong>Engajamento da Turma:</strong> ${editedPlan.dicasProfessor.engajamento}</p>
      <p><strong>Evitar Dispersão:</strong> ${editedPlan.dicasProfessor.evitarDispersao}</p>

      <h2>📈 Resultado Esperado</h2>
      <p>${editedPlan.resultadoEsperado}</p>
    `;

    const blob = new Blob([header + content + footer], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Plano_de_Aula_${editedPlan.inputParams?.disciplina}_${editedPlan.titulo.replace(/[^a-z0-9]/gi, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyText = () => {
    const text = `📌 PLANO DE AULA: ${editedPlan.titulo}
Série: ${editedPlan.inputParams?.serie} | Disciplina: ${editedPlan.inputParams?.disciplina}
Professor(a): ${editedPlan.professor || professor} | Escola: ${editedPlan.escola || escola}

🎯 OBJETIVO GERAL:
${editedPlan.objetivoGeral}

🧠 HABILIDADES BNCC:
${editedPlan.habilidadesBNCC.map(h => `- ${h.codigo}: ${h.descricao}`).join('\n')}

📅 PLANEJAMENTO SEMANAL:
${editedPlan.planejamentoSemanal.map(a => `
🔹 Aula ${a.numeroAula} (${a.tempoEstimado})
- Objetivo: ${a.objetivo}
- Introdução: ${a.introducao}
- Desenvolvimento: ${a.desenvolvimento}
- Atividade Prática: ${a.atividadePratica}
- Sugestão Lúdica: ${a.sugestaoLudica}
`).join('\n')}

🧩 ATIVIDADE COMPLEMENTAR:
${editedPlan.atividadeComplementar}

📊 AVALIAÇÃO:
${editedPlan.avaliacao.comoAvaliar}
Critérios:
${editedPlan.avaliacao.criterios.map(c => `- ${c}`).join('\n')}

🔄 ADAPTAÇÕES PEDAGÓGICAS:
- Dificuldades: ${editedPlan.adaptacoesPedagogicas.dificuldades}
- Avançados: ${editedPlan.adaptacoesPedagogicas.avancados}

🧰 MATERIAIS NECESSÁRIOS:
${editedPlan.materiaisNecessarios.map(m => `- ${m}`).join('\n')}

💡 DICAS PARA O PROFESSOR:
- Engajamento: ${editedPlan.dicasProfessor.engajamento}
- Evitar dispersão: ${editedPlan.dicasProfessor.evitarDispersao}

📈 RESULTADO ESPERADO:
${editedPlan.resultadoEsperado}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToLibrary = () => {
    onSavePlan(editedPlan);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinePrompt.trim() || isRefining) return;
    await onRefinePlan(editedPlan, refinePrompt);
    setRefinePrompt('');
    setShowRefineBox(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center space-x-1">
            <Check className="w-3.5 h-3.5" />
            <span>Planejamento Gerado</span>
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Aulas: {editedPlan.planejamentoSemanal?.length || 3}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>

          <button
            onClick={handleExportWord}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>Word (.doc)</span>
          </button>

          <button
            onClick={() => onGenerateActivitySheet(editedPlan)}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Gerar Atividade de Aluno</span>
          </button>

          <button
            onClick={() => setShowRefineBox(!showRefineBox)}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
          >
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>Refinar com IA</span>
          </button>

          <button
            onClick={handleSaveToLibrary}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>{savedSuccess ? 'Salvo!' : 'Salvar'}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
          >
            <Copy className="w-4 h-4 text-slate-400" />
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-1.5 border text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
              isEditing
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Concluir Edição' : 'Editar Texto'}</span>
          </button>

        </div>
      </div>

      {/* Refine Popover Box */}
      {showRefineBox && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 mb-6 text-white shadow-2xl animate-fade-in print:hidden">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
              <Wand2 className="w-4 h-4" />
              <span>Ajustar ou Personalizar este Plano com Inteligência Artificial</span>
            </h4>
            <button onClick={() => setShowRefineBox(false)} className="text-slate-400 hover:text-white text-xs">
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Digite abaixo o que você deseja mudar (Ex: "Torne a atividade da Aula 2 em grupo", "Substitua os materiais por recicláveis", "Adicione foco em tecnologia").
          </p>
          <form onSubmit={handleRefineSubmit} className="flex gap-2">
            <input
              type="text"
              required
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              placeholder="Ex: Refaça a aula 1 com jogos lúdicos em dupla..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isRefining}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1 shrink-0"
            >
              {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Aplicar Ajuste</span>}
            </button>
          </form>
        </div>
      )}

      {/* PRINTABLE LESSON PLAN DOCUMENT */}
      <div id="printable-area" className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 text-slate-800 print:shadow-none print:border-none print:p-0 overflow-hidden">
        
        {/* Formal School Header */}
        <div className="border-b-2 border-emerald-700 pb-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Planejamento Pedagógico Semanal - BNCC
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedPlan.titulo}
                    onChange={(e) => setEditedPlan({ ...editedPlan, titulo: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-1 text-2xl font-bold"
                  />
                ) : (
                  editedPlan.titulo
                )}
              </h1>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs space-y-1 min-w-[240px]">
              <div className="flex items-center space-x-1.5 text-slate-700">
                <School className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Escola:</span>
                <span className="truncate">{editedPlan.escola || escola || 'Não especificada'}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-700">
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Docente:</span>
                <span className="truncate">{editedPlan.professor || professor || 'Não especificado'}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Turma/Série:</span>
                <span>{editedPlan.inputParams?.serie || editedPlan.turmaInfo}</span>
              </div>
            </div>
          </div>

          {/* Key Meta Badges */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold">
              Componente: {editedPlan.inputParams?.disciplina}
            </span>
            <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-medium">
              Tema: {editedPlan.inputParams?.tema}
            </span>
            <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-medium">
              Carga Horária: {editedPlan.inputParams?.aulas_semana} ({editedPlan.inputParams?.tempo})
            </span>
            {editedPlan.inputParams?.metodologia && (
              <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-medium">
                Metodologia: {editedPlan.inputParams?.metodologia}
              </span>
            )}
          </div>
        </div>

        {/* MANDATORY SECTION 1: Objetivo Geral */}
        <div className="mb-8 bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>🎯 Objetivo Geral de Aprendizagem</span>
          </h2>
          {isEditing ? (
            <textarea
              rows={3}
              value={editedPlan.objetivoGeral}
              onChange={(e) => setEditedPlan({ ...editedPlan, objetivoGeral: e.target.value })}
              className="w-full border border-slate-300 rounded-xl p-2 text-sm"
            />
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {editedPlan.objetivoGeral}
            </p>
          )}
        </div>

        {/* MANDATORY SECTION 2: Habilidades BNCC */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center space-x-2">
            <Brain className="w-4 h-4 text-emerald-600" />
            <span>🧠 Habilidades BNCC Alinhadas</span>
          </h2>

          <div className="space-y-2.5">
            {editedPlan.habilidadesBNCC.map((hab, idx) => (
              <div key={idx} className="flex items-start space-x-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-3 text-xs">
                <span className="bg-emerald-600 text-white font-extrabold px-2.5 py-1 rounded-lg shrink-0 tracking-wide">
                  {hab.codigo}
                </span>
                <p className="text-slate-700 leading-relaxed pt-0.5">
                  {hab.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MANDATORY SECTION 3: Planejamento Semanal (Aulas) */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-2 shrink-0">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>📅 PLANEJAMENTO SEMANAL DE AULAS</span>
            </h2>

            {/* Class Tab Selector (Interactive on screen) */}
            <div className="flex items-center flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl max-w-full print:hidden">
              {editedPlan.planejamentoSemanal.map((aula) => (
                <button
                  key={aula.numeroAula}
                  onClick={() => setActiveTabAula(aula.numeroAula)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeTabAula === aula.numeroAula
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Aula {aula.numeroAula}
                </button>
              ))}
              <button
                onClick={() => setActiveTabAula(0)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTabAula === 0
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                Ver Todas
              </button>
            </div>
          </div>

          {/* Lessons List Rendering */}
          <div className="space-y-6">
            {editedPlan.planejamentoSemanal
              .filter((aula) => activeTabAula === 0 || activeTabAula === aula.numeroAula)
              .map((aula, index) => (
                <div
                  key={aula.numeroAula || index}
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                        {aula.numeroAula}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">
                        Aula {aula.numeroAula}: {aula.objetivo}
                      </h3>
                    </div>
                    <span className="inline-flex items-center space-x-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{aula.tempoEstimado}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-emerald-800 uppercase tracking-wider mb-1">
                        🔹 Introdução & Sensibilização:
                      </h4>
                      <p className="text-slate-700 leading-relaxed">{aula.introducao}</p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-emerald-800 uppercase tracking-wider mb-1">
                        🔹 Desenvolvimento (Passo a Passo):
                      </h4>
                      <p className="text-slate-700 leading-relaxed">{aula.desenvolvimento}</p>
                    </div>

                    <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
                      <h4 className="font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <Puzzle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Atividade Prática (Mão na Massa):</span>
                      </h4>
                      <p className="text-slate-800 leading-relaxed font-medium">{aula.atividadePratica}</p>
                    </div>

                    <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-100">
                      <h4 className="font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Sugestão Lúdica / Recurso Ativo:</span>
                      </h4>
                      <p className="text-slate-800 leading-relaxed">{aula.sugestaoLudica}</p>
                    </div>

                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* MANDATORY SECTION 4: Atividade Complementar */}
        <div className="mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-2">
            <Puzzle className="w-4 h-4 text-emerald-600" />
            <span>🧩 Atividade Complementar (Reforço / Dever de Casa)</span>
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {editedPlan.atividadeComplementar}
          </p>
        </div>

        {/* MANDATORY SECTION 5 & 6 Grid: Avaliação e Adaptações Pedagógicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Avaliacao */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>📊 Avaliação Contínua</span>
            </h2>
            <p className="text-xs text-slate-700 mb-3 font-medium">
              {editedPlan.avaliacao.comoAvaliar}
            </p>
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Critérios de Avaliação:
            </h4>
            <ul className="space-y-1">
              {editedPlan.avaliacao.criterios.map((crit, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Adaptacoes Pedagogicas */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-emerald-600" />
              <span>🔄 Adaptações Pedagógicas & Inclusão</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">
                  • Para Alunos com Dificuldade / Inclusão (AEE):
                </span>
                <p className="text-slate-700 pl-3 leading-relaxed">
                  {editedPlan.adaptacoesPedagogicas.dificuldades}
                </p>
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">
                  • Para Alunos com Ritmo Avançado:
                </span>
                <p className="text-slate-700 pl-3 leading-relaxed">
                  {editedPlan.adaptacoesPedagogicas.avancados}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* MANDATORY SECTION 7 & 8 Grid: Materiais Necessarios e Dicas do Professor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Materiais */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-2">
              <Package className="w-4 h-4 text-emerald-600" />
              <span>🧰 Materiais & Recursos Necessários</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
              {editedPlan.materiaisNecessarios.map((mat, idx) => (
                <li key={idx} className="flex items-center space-x-1.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dicas do Professor */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>💡 Dicas Práticas para o Professor</span>
            </h2>
            <div className="space-y-2 text-xs">
              <p className="text-slate-700">
                <strong className="text-slate-900">Engajamento da Turma:</strong> {editedPlan.dicasProfessor.engajamento}
              </p>
              <p className="text-slate-700">
                <strong className="text-slate-900">Evitar Dispersão:</strong> {editedPlan.dicasProfessor.evitarDispersao}
              </p>
            </div>
          </div>

        </div>

        {/* MANDATORY SECTION 9: Resultado Esperado */}
        <div className="bg-emerald-900 text-white rounded-2xl p-5 border border-emerald-800 shadow-md">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>📈 Resultado Esperado de Aprendizagem</span>
          </h2>
          <p className="text-xs text-emerald-50 leading-relaxed font-medium">
            {editedPlan.resultadoEsperado}
          </p>
        </div>

        {/* Footer Signature line for printing */}
        <div className="mt-12 pt-8 border-t border-slate-200 hidden print:grid grid-cols-2 gap-8 text-center text-xs text-slate-500">
          <div>
            <div className="border-b border-slate-400 mb-1 h-8" />
            <span>Assinatura do(a) Professor(a)</span>
          </div>
          <div>
            <div className="border-b border-slate-400 mb-1 h-8" />
            <span>Coordenação Pedagógica / Direção</span>
          </div>
        </div>

      </div>
    </div>
  );
};
