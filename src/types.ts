export type SubscriptionPlanType = 'start' | 'pro' | 'premium' | 'free_credits' | 'expired' | 'monthly' | 'annual' | 'basico' | 'trial';

export interface User {
  id: string;
  name: string;
  email: string;
  escola?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface BNCCSkill {
  codigo: string;
  descricao: string;
}

export interface LessonPlanAula {
  numeroAula: number;
  objetivo: string;
  introducao: string;
  desenvolvimento: string;
  atividadePratica: string;
  tempoEstimado: string;
  sugestaoLudica: string;
}

export interface LessonPlan {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  // General Info
  escola?: string;
  professor?: string;
  turmaInfo?: string;
  
  // Mandatory 10 Sections
  titulo: string;
  objetivoGeral: string;
  habilidadesBNCC: BNCCSkill[];
  planejamentoSemanal: LessonPlanAula[];
  atividadeComplementar: string;
  avaliacao: {
    comoAvaliar: string;
    criterios: string[];
  };
  adaptacoesPedagogicas: {
    dificuldades: string;
    avancados: string;
  };
  materiaisNecessarios: string[];
  dicasProfessor: {
    engajamento: string;
    evitarDispersao: string;
  };
  resultadoEsperado: string;

  // Metadata provided
  inputParams: {
    serie: string;
    disciplina: string;
    tema: string;
    tempo: string;
    aulas_semana: string;
    metodologia?: string;
    observacoes?: string;
  };
}

export interface ActivitySheetQuestion {
  numero: number;
  enunciado: string;
  tipo: 'multipla_escolha' | 'dissertativa' | 'relacionar' | 'pratica';
  opcoes?: string[];
  linhaResposta?: boolean;
}

export interface ActivitySheet {
  titulo: string;
  subtitulo: string;
  disciplina: string;
  serie: string;
  instrucoes: string;
  questoes: ActivitySheetQuestion[];
  gabarito: {
    numero: number;
    respostaExplicada: string;
  }[];
}

export interface Presettopic {
  serie: string;
  disciplina: string;
  tema: string;
  tempo: string;
  aulas_semana: string;
  exemploHabilidade?: string;
}
