import React from 'react';
import { ActivitySheet } from '../types';
import { Printer, FileDown, Copy, X, Check, HelpCircle, FileText, School, User } from 'lucide-react';

interface ActivitySheetModalProps {
  activitySheet: ActivitySheet;
  onClose: () => void;
  escola: string;
  professor: string;
}

export const ActivitySheetModal: React.FC<ActivitySheetModalProps> = ({
  activitySheet,
  onClose,
  escola,
  professor,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showAnswerKey, setShowAnswerKey] = React.useState(true);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>${activitySheet.titulo}</title>
    <style>
      body { font-family: 'Calibri', 'Arial', sans-serif; margin: 30px; color: #1e293b; line-height: 1.5; }
      .header-box { border: 2px solid #047857; padding: 12px; margin-bottom: 20px; }
      h1 { color: #047857; text-align: center; font-size: 18pt; margin-bottom: 4px; }
      .q-box { margin-bottom: 16px; page-break-inside: avoid; }
      .gabarito { margin-top: 30px; border-top: 2px dashed #047857; padding-top: 15px; }
    </style>
    </head><body>`;

    const footer = "</body></html>";

    const content = `
      <div class="header-box">
        <p><strong>Escola:</strong> ${escola || '________________________________________________'}</p>
        <p><strong>Nome do Aluno(a):</strong> ___________________________________ <strong>Data:</strong> ____/____/2026</p>
        <p><strong>Série:</strong> ${activitySheet.serie} &nbsp;|&nbsp; <strong>Disciplina:</strong> ${activitySheet.disciplina} &nbsp;|&nbsp; <strong>Prof:</strong> ${professor || '_________________'}</p>
      </div>

      <h1>${activitySheet.titulo}</h1>
      <p style="text-align:center; color:#475569; font-style:italic;">${activitySheet.subtitulo}</p>
      
      <p><strong>Orientações:</strong> ${activitySheet.instrucoes}</p>
      <hr/>

      ${activitySheet.questoes.map(q => `
        <div class="q-box">
          <p><strong>Questão ${q.numero})</strong> ${q.enunciado}</p>
          ${q.opcoes ? `<ul>${q.opcoes.map(opt => `<li style="list-style:none;">( &nbsp; ) ${opt}</li>`).join('')}</ul>` : ''}
          ${q.linhaResposta ? `<p style="color:#cbd5e1;">__________________________________________________________________________________________<br/>__________________________________________________________________________________________</p>` : ''}
        </div>
      `).join('')}

      <div class="gabarito">
        <h2>Gabarito Comentado (Uso do Professor)</h2>
        ${activitySheet.gabarito.map(g => `<p><strong>Q${g.numero}:</strong> ${g.respostaExplicada}</p>`).join('')}
      </div>
    `;

    const blob = new Blob([header + content + footer], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Atividade_${activitySheet.disciplina}_${activitySheet.titulo.replace(/[^a-z0-9]/gi, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = () => {
    const text = `FOLHA DE ATIVIDADES DE APRENDIZAGEM
Escola: ${escola || ''}
Nome do Aluno(a): __________________________________ Data: ____/____/2026
Série: ${activitySheet.serie} | Disciplina: ${activitySheet.disciplina} | Prof: ${professor || ''}

${activitySheet.titulo}
${activitySheet.subtitulo}

Instruções: ${activitySheet.instrucoes}

${activitySheet.questoes.map(q => `
Questão ${q.numero}) ${q.enunciado}
${q.opcoes ? q.opcoes.map(o => `(  ) ${o}`).join('\n') : ''}
`).join('\n')}

--- GABARITO ---
${activitySheet.gabarito.map(g => `Q${g.numero}: ${g.respostaExplicada}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base">Folha de Atividades Práticas para Impressão</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleExportWord}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span>Word</span>
            </button>

            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{showAnswerKey ? 'Ocultar Gabarito' : 'Exibir Gabarito'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content - Printable */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800" id="printable-activity-sheet">
          
          {/* Student Header */}
          <div className="border-2 border-slate-800 rounded-2xl p-4 text-xs space-y-2 bg-slate-50">
            <div className="flex justify-between border-b border-slate-300 pb-2">
              <span className="font-bold">Escola: {escola || '________________________________________________'}</span>
              <span className="font-bold">Data: ____/____/2026</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Nome do Aluno(a): __________________________________________________</span>
              <span className="font-bold">Turma: {activitySheet.serie}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-1 text-slate-600">
              <span>Componente: <strong>{activitySheet.disciplina}</strong></span>
              <span>Professor(a): <strong>{professor || '____________________'}</strong></span>
            </div>
          </div>

          {/* Activity Title */}
          <div className="text-center py-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {activitySheet.titulo}
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {activitySheet.subtitulo}
            </p>
          </div>

          {/* Instructions Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 font-medium">
            <strong>📌 Orientações para a atividade:</strong> {activitySheet.instrucoes}
          </div>

          {/* Questions */}
          <div className="space-y-6 pt-2">
            {activitySheet.questoes.map((q) => (
              <div key={q.numero} className="border-b border-slate-200 pb-4">
                <p className="text-sm font-bold text-slate-900 mb-2">
                  Questão {q.numero}) {q.enunciado}
                </p>

                {/* Multiple Choice Options */}
                {q.opcoes && q.opcoes.length > 0 && (
                  <div className="space-y-1.5 pl-4 text-xs">
                    {q.opcoes.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center space-x-2">
                        <span className="w-4 h-4 border border-slate-400 rounded-sm shrink-0" />
                        <span className="text-slate-700">{opt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Written Response Lines */}
                {q.linhaResposta && (
                  <div className="mt-3 space-y-2">
                    <div className="border-b border-slate-300 h-4" />
                    <div className="border-b border-slate-300 h-4" />
                    <div className="border-b border-slate-300 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Teacher Answer Key */}
          {showAnswerKey && (
            <div className="mt-8 pt-6 border-t-2 border-dashed border-emerald-600">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs">
                <h4 className="font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Gabarito Comentado (Exclusivo para Orientação do Professor)</span>
                </h4>
                <div className="space-y-2">
                  {activitySheet.gabarito.map((gab) => (
                    <div key={gab.numero} className="text-slate-800">
                      <strong className="text-slate-950">Questão {gab.numero}:</strong> {gab.respostaExplicada}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
