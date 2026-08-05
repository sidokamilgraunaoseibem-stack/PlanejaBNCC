import { Presettopic } from '../types';
import { HABILIDADES_BNCC_EXPANDIDAS } from './bnccSkillsData';

export const SERIES_OPCOES = [
  'Educação Infantil (0 a 1 ano e 6 meses - Bebês)',
  'Educação Infantil (1 ano e 7 meses a 3 anos - Crianças bem pequenas)',
  'Educação Infantil (4 a 5 anos - Crianças pequenas)',
  '1º Ano - Ensino Fundamental I',
  '2º Ano - Ensino Fundamental I',
  '3º Ano - Ensino Fundamental I',
  '4º Ano - Ensino Fundamental I',
  '5º Ano - Ensino Fundamental I',
  '6º Ano - Ensino Fundamental II',
  '7º Ano - Ensino Fundamental II',
  '8º Ano - Ensino Fundamental II',
  '9º Ano - Ensino Fundamental II',
  '1º Ano - Ensino Médio',
  '2º Ano - Ensino Médio',
  '3º Ano - Ensino Médio',
  'EJA - Educação de Jovens e Adultos'
];

export type EtapaEscolar = 'infantil' | 'fundamental_1' | 'fundamental_2' | 'ensino_medio';

export function getEtapaFromSerie(serie: string): EtapaEscolar {
  if (serie.includes('Educação Infantil') || serie.includes('Bebês') || serie.includes('Crianças')) {
    return 'infantil';
  }
  if (
    serie.includes('1º Ano - Ensino Fundamental I') ||
    serie.includes('2º Ano - Ensino Fundamental I') ||
    serie.includes('3º Ano - Ensino Fundamental I') ||
    serie.includes('4º Ano - Ensino Fundamental I') ||
    serie.includes('5º Ano - Ensino Fundamental I')
  ) {
    return 'fundamental_1';
  }
  if (
    serie.includes('6º Ano - Ensino Fundamental II') ||
    serie.includes('7º Ano - Ensino Fundamental II') ||
    serie.includes('8º Ano - Ensino Fundamental II') ||
    serie.includes('9º Ano - Ensino Fundamental II')
  ) {
    return 'fundamental_2';
  }
  return 'ensino_medio';
}

export function getEtapaNomeFormatado(etapa: EtapaEscolar): string {
  switch (etapa) {
    case 'infantil':
      return 'Educação Infantil (0 a 5 anos)';
    case 'fundamental_1':
      return 'Ensino Fundamental I (1º ao 5º ano)';
    case 'fundamental_2':
      return 'Ensino Fundamental II (6º ao 9º ano)';
    case 'ensino_medio':
      return 'Ensino Médio (1º ao 3º ano)';
  }
}

export const DISCIPLINAS_POR_ETAPA: Record<EtapaEscolar, string[]> = {
  infantil: [
    'Educação Infantil (Campos de Experiência)',
    'Linguagem e Expressão',
    'Corpo, Gestos e Movimentos',
    'Traços, Sons, Cores e Formas',
    'Escuta, Fala, Pensamento e Imaginação',
    'Espaços, Tempos, Quantidades e Transformações'
  ],
  fundamental_1: [
    'Língua Portuguesa',
    'Matemática',
    'Ciências da Natureza',
    'História',
    'Geografia',
    'Arte',
    'Educação Física',
    'Língua Inglesa',
    'Ensino Religioso'
  ],
  fundamental_2: [
    'Língua Portuguesa',
    'Matemática',
    'Ciências da Natureza',
    'História',
    'Geografia',
    'Arte',
    'Educação Física',
    'Língua Inglesa',
    'Ensino Religioso'
  ],
  ensino_medio: [
    'Língua Portuguesa',
    'Matemática',
    'Biologia',
    'Física',
    'Química',
    'História',
    'Geografia',
    'Filosofia',
    'Sociologia',
    'Língua Inglesa',
    'Arte',
    'Educação Física'
  ]
};

export const DISCIPLINAS_OPCOES = [
  'Língua Portuguesa',
  'Matemática',
  'Biologia',
  'Física',
  'Química',
  'História',
  'Geografia',
  'Filosofia',
  'Sociologia',
  'Ciências da Natureza',
  'Língua Inglesa',
  'Arte',
  'Educação Física',
  'Ensino Religioso',
  'Educação Infantil (Campos de Experiência)'
];

export const TEMAS_POR_ETAPA_E_DISCIPLINA: Record<EtapaEscolar, Record<string, string[]>> = {
  ensino_medio: {
    'Língua Portuguesa': [
      'Análise do Discurso, Argumentação e Redação Estilo ENEM',
      'Literatura Brasileira: Do Romantismo ao Modernismo Contemporâneo',
      'Sintaxe Avançada: Período Composto, Crase e Regência Verbal',
      'Variedades Linguísticas, Preconceito Linguístico e Semiótica Digital',
      'Análise Crítica de Mídias, Fake News e Pós-Verdade'
    ],
    'Matemática': [
      'Análise Combinatória, Probabilidade e Estatística no ENEM',
      'Funções Exponenciais, Logarítmicas e Aplicações Financeiras',
      'Geometria Analítica no Plano Cartesiano e Vetores',
      'Geometria Espacial: Cálculo de Superfícies e Volumes de Sólidos',
      'Trigonometria no Círculo Trigonométrico e Funções Periódicas'
    ],
    'Biologia': [
      'Genética Mendeliana, Engenharia Genética e Edição de DNA (CRISPR)',
      'Evolução Biológica, Seleção Natural e Cladogramas',
      'Ecologia, Biomas Brasileiros e Mudanças Climáticas Globais',
      'Bioquímica Celular: Fotossíntese, Respiração Celular e Síntese Proteica',
      'Fisiologia Humana Comparada e Imunologia Moderna'
    ],
    'Física': [
      'Mecânica Newtoniana: Leis do Movimento e Conservação da Energia',
      'Termodinâmica, Máquinas Térmicas e Entropia',
      'Eletromagnetismo, Indução Magnética e Circuitos Elétricos',
      'Ondulatória, Acústica, Difração e Óptica Geométrica',
      'Introdução à Física Moderna: Efeito Fotoelétrico e Relatividade'
    ],
    'Química': [
      'Estequiometria, Cálculos Reacionais e Soluções (mol/L)',
      'Química Orgânica: Funções, Isomeria e Reações de Polímeros',
      'Termoquímica, Cinética Química e Equilíbrio Químico (Kc e Kp)',
      'Eletroquímica: Pilhas, Baterias e Processos de Eletrólise',
      'Ligações Químicas, Geometria Molecular e Interações Intermoleculares'
    ],
    'História': [
      'Brasil Império e República: Da Proclamação à Era Vargas',
      'Conflitos Globais do Século XX: Guerras Mundiais, Nazifascismo e Guerra Fria',
      'Ditadura Civil-Militar no Brasil e o Processo de Redemocratização',
      'Imperialismo no Século XIX, Partilha da África e da Ásia',
      'História das Lutas Sociais, Direitos Humanos e Movimentos Negros'
    ],
    'Geografia': [
      'Geopolítica Contemporânea, Blocos Econômicos e Globalização',
      'Agronegócio, Questão Agrária e Impactos Ambientais no Brasil',
      'Urbanização Mundial, Megacidades e Segregação Socioespacial',
      'Geografia Física: Tectônica de Placas, Climatologia e Recursos Hídricos',
      'Matrizes Energéticas Mundiais e Transição Ecológica'
    ],
    'Filosofia': [
      'Ética e Filosofia Política: De Platão a Hannah Arendt',
      'Epistemologia e Método Científico: Empirismo vs. Racionalismo',
      'Filosofia da Tecnologia, Inteligência Artificial e Pós-Humanismo',
      'Conceitos de Liberdade, Justiça e Direitos Fundamentais'
    ],
    'Sociologia': [
      'Teorias Sociológicas Clássicas: Marx, Durkheim e Weber',
      'Estratificação Social, Desigualdade e Mobilidade no Brasil',
      'Mundo do Trabalho, Precarização, Automação e Uberização',
      'Movimentos Sociais Contemporâneos e Cidadania Ativa'
    ],
    'Língua Inglesa': [
      'Leitura Instrumental de Textos Acadêmicos e Jornalísticos',
      'Análise de Recursos Argumentativos e Conectores Lógicos',
      'Expressões Idiomáticas e Comunicação Corporativa Global'
    ],
    'Arte': [
      'Vanguardas Europeias, Arte Moderna Brasileira e Arte Contemporânea',
      'Linguagens Audiovisuais, Cinema e Produção Cultural Digital'
    ],
    'Educação Física': [
      'Análise Crítica do Esporte Espetáculo, Mídia e Saúde Corporal',
      'Práticas Corporais de Aventura e Condicionamento Físico Consciente'
    ]
  },
  fundamental_2: {
    'Língua Portuguesa': [
      'Análise Crítica do Gênero Notícia, Reportagem e Fake News',
      'Elementos da Narrativa: Enredo, Personagens, Foco Narrativo e Espaço',
      'Morfossintaxe: Classes de Palavras, Sujeito e Predicado',
      'Figuras de Linguagem: Metáfora, Ironia e Personificação',
      'Produção de Cartas de Leitor, Crônicas e Parágrafos Argumentativos'
    ],
    'Matemática': [
      'Operações com Números Racionais, Frações, Decimais e Porcentagem',
      'Equações e Inequações do 1º Grau com Problemas do Cotidiano',
      'Geometria: Cálculo de Área de Polígonos, Perímetro e Ângulos',
      'Teorema de Pitágoras e Razões Trigonométricas Simples',
      'Estatística: Coleta de Dados, Média, Moda, Mediana e Gráficos'
    ],
    'Ciências da Natureza': [
      'Sistemas do Corpo Humano: Digestório, Respiratório e Circulatório',
      'Cadeias e Teias Alimentares, Fotossíntese e Decomposição',
      'Estrutura da Matéria: Átomos, Moléculas e Misturas',
      'Fenômenos Ondulatórios, Som, Luz e Eletricidade Básica',
      'Placas Tectônicas, Vulcões, Terremotos e Camadas da Terra'
    ],
    'História': [
      'Origens da Humanidade, Pré-História e Primeiras Civilizações',
      'Antiguidade Clássica: Grécia Antiga, Roma e Feudalismo Medieval',
      'Grandes Navegações, Colonização da América e Sistema Açucareiro',
      'Revolução Industrial, Iluminismo e Independência do Brasil',
      'Primeira Guerra Mundial, Revolução Russa e Crise de 1929'
    ],
    'Geografia': [
      'Orientação no Espaço: Coordenadas Geográficas, Fuso Horário e Cartografia',
      'Relevo, Clima, Vegetação e Biomas Brasileiros',
      'Formação Territorial e Regionalização do Brasil pelo IBGE',
      'Dinâmica Populacional, Migrações e Processo de Urbanização',
      'Continentes e Geopolítica das Américas, Europa, Ásia e África'
    ],
    'Língua Inglesa': [
      'Interpretação de Textos Curtos e Vocabulário do Cotidiano',
      'Estruturas Gramaticais: Verbo To Be, Simple Present e Past Continuous',
      'Comunicação Oral Básica e Apresentações Pessoais'
    ],
    'Arte': [
      'História da Arte Brasileira, Folclore e Manifestações Culturais',
      'Teatro de Improvisação, Elementos Visuais e Música Regional'
    ],
    'Educação Física': [
      'Esportes Coletivos e Individuais: Regras, Táticas e Fair Play',
      'Lutas do Contexto Comunitário e Danças Urbanas'
    ],
    'Ensino Religioso': [
      'Símbolos, Ritos e Tradições Religiosas na Sociedade',
      'Valores Éticos, Diálogo Inter-religioso e Direitos Humanos'
    ]
  },
  fundamental_1: {
    'Língua Portuguesa': [
      'Alfabetização: Consciência Fonológica, Rimas e Trava-Línguas',
      'Leitura e Produção de Pequenos Textos Narrativos e Poemas',
      'Ortografia Prática: Encontros Vocálicos e Consonantais',
      'Gêneros Instrucionais: Receitas, Regras de Jogos e Bilhetes',
      'Pontuação Básica: Ponto Final, Interrogação e Exclamação'
    ],
    'Matemática': [
      'Números e Quantidades: Contagem e Sistema Decimal',
      'Adição e Subtração com Material Dourado e Problemas Práticos',
      'Introdução à Multiplicação e Divisão em Situações do Cotidiano',
      'Geometria Plana e Espacial: Reconhecimento de Formas',
      'Medidas de Tempo, Comprimento, Massa e Sistema Monetário'
    ],
    'Ciências da Natureza': [
      'Partes do Corpo Humano, Sentidos e Hábitos de Higiene',
      'Ciclo da Água, Estados Físicos e Conservação Ambiental',
      'Seres Vivos e Inanimados: Animais, Plantas e Hábitats',
      'Dia e Noite, Estações do Ano e a Importância do Sol'
    ],
    'História': [
      'Minha História, Minha Família e Minha Árvore Genealógica',
      'A Escola, A Comunidade e Regras de Convivência Social',
      'Tradições Culturais, Festas Populares e Memória do Bairro',
      'Povos Indígenas e Matriz Africana na Formação da Comunidade'
    ],
    'Geografia': [
      'Meu Lugar no Mundo: Casa, Rua, Bairro e Pontos de Referência',
      'Paisagem Natural vs. Paisagem Modificada pelo Homem',
      'Trabalho no Campo (Rural) e Trabalho na Cidade (Urbano)',
      'Representação do Espaço, Desenho de Mapas e Pontos Cardeais'
    ],
    'Arte': [
      'Desenho, Pintura, Colagem e Elementos Básicos da Arte Visual',
      'Cantigas de Roda, Brincadeiras Sonoras e Ritmo'
    ],
    'Educação Física': [
      'Brincadeiras e Jogos Populares do Contexto Comunitário',
      'Ginástica Geral, Equilíbrio e Coordenação Motora'
    ],
    'Língua Inglesa': [
      'Saudações Básicas, Cores, Números e Animais em Inglês'
    ],
    'Ensino Religioso': [
      'Respeito às Diferenças, Empatia e Convivência Harmoniosa'
    ]
  },
  infantil: {
    'Educação Infantil (Campos de Experiência)': [
      'O Eu, o Outro e o Nós: Autonomia, Empatia e Convivência em Grupo',
      'Corpo, Gestos e Movimentos: Brincadeiras Motoras, Dança e Equilíbrio',
      'Traços, Sons, Cores e Formas: Pintura, Escultura e Rítmobiologia',
      'Escuta, Fala, Pensamento e Imaginação: Contação de Histórias e Rodas de Conversa',
      'Espaços, Tempos, Quantidades e Transformações: Exploração Sensorial e Objetos'
    ],
    'Linguagem e Expressão': [
      'Contação de Histórias com Foches, Rimas e Músicas Infantis',
      'Expressão de Sentimentos por Gestos, Fala e Desenhos'
    ],
    'Corpo, Gestos e Movimentos': [
      'Atividades de Circuito Motor, Equilíbrio, Salto e Coordenação',
      'Jogos de Imitação de Animais e Ritmos Corporais'
    ],
    'Traços, Sons, Cores e Formas': [
      'Modelagem com Massinha, Pintura a Dedo e Colagem Texturizada',
      'Exploração de Sons com Instrumentos Musicais Simples'
    ],
    'Escuta, Fala, Pensamento e Imaginação': [
      'Rodas de Conversa, Reconto de Histórias e Ampliação Vocabular'
    ],
    'Espaços, Tempos, Quantidades e Transformações': [
      'Classificação de Objetos por Cor, Tamanho e Textura',
      'Exploração da Natureza, Água, Terra e Sensações'
    ]
  }
};

export const TEMAS_POR_DISCIPLINA: Record<string, string[]> = TEMAS_POR_ETAPA_E_DISCIPLINA.ensino_medio;

export const METODOLOGIAS_OPCOES = [
  // Metodologias Ativas e Inovadoras
  'Metodologias Ativas e Sala de Aula Invertida (Flipped Classroom)',
  'Gamificação e Jogos Pedagógicos (Game-Based Learning)',
  'Aprendizagem Baseada em Problemas (PBL / ABP)',
  'Aprendizagem Baseada em Projetos (ABProj / Project-Based)',
  'Aprendizagem Baseada em Desafios (Challenge-Based Learning)',
  'Cultura Maker e Abordagem STEAM (Ciência, Tecnologia, Engenharia, Artes e Matemática)',
  'Rotação por Estações de Aprendizagem (Ensino Híbrido)',
  'Aprendizagem Baseada em Investigação (Inquiry-Based Learning)',
  'Instrução por Pares (Peer Instruction / Aprendizagem entre Pares)',
  'Design Thinking Aplicado à Educação',

  // Metodologias Cooperativas, Colaborativas e Sociais
  'Aprendizagem Cooperativa e Colaborativa em Grupos',
  'Estudo de Caso e Resolução de Situações-Problema Reais',
  'Debates Estruturados e Júri Simulado',
  'Rodas de Conversa, Roda de Leitura e Círculos Restaurativos',
  'Seminários Integrativos e Metodologia World Café',
  'Estudo do Meio e Aulas de Campo / Excursões Pedagógicas',

  // Abordagens Clássicas, Inclusivas e da Educação Infantil
  'Metodologia Montessori (Autonomia e Material Concreto)',
  'Abordagem Reggio Emilia (Criança Protagonista e Multilinguagens)',
  'Abordagem Pikler (Autonomia, Cuidado e Movimento Livre)',
  'Pedagogia Freinet (Trabalho, Aula-Passeio e Livro da Vida)',
  'Pedagogia Waldorf (Desenvolvimento Integral, Arte e Ritmo)',
  'Desenho Universal para a Aprendizagem (DUA - Inclusão AEE)',
  'Contação de Histórias, Sequência Didática e Teatro Pedagógico',
  'Jogos Simbólicos, Psicomotricidade e Brincadeiras Dirigidas',

  // Metodologias Reflexivas e Cognitivas
  'Rotinas de Pensamento Visível (Harvard Project Zero)',
  'Mapas Conceituais e Mapeamento Mental (Mind Mapping)',
  'Aprendizagem Socioemocional (SEL) e Atividades Reflexivas',
  'Metacognição, Autoavaliação e Diários de Bordo',
  'Aprendizagem Significativa (Ausubel)',

  // Metodologias Expositivas e Práticas
  'Aula Expositiva Dialogada e Interativa',
  'Sequência Didática Estruturada (Zabala)',
  'Ensino Direto com Modelagem e Prática Guiada',
  'Oficinas Temáticas e Laboratórios Práticos Mão na Massa',
  'Leitura Dramatizada e Análise Crítica de Mídias'
];

export const SUGESTOES_TEMAS_PRESETS: Presettopic[] = [
  // Ensino Médio
  {
    serie: '1º Ano - Ensino Médio',
    disciplina: 'Biologia',
    tema: 'Evolução Biológica, Seleção Natural e Genética Populacional',
    tempo: '1 hora e 40 minutos',
    aulas_semana: '2 aulas',
    exemploHabilidade: 'EM13CNT201'
  },
  {
    serie: '2º Ano - Ensino Médio',
    disciplina: 'Física',
    tema: 'Termodinâmica, Máquinas Térmicas e Fontes de Energia',
    tempo: '1 hora e 40 minutos',
    aulas_semana: '2 aulas',
    exemploHabilidade: 'EM13CNT301'
  },
  {
    serie: '3º Ano - Ensino Médio',
    disciplina: 'Língua Portuguesa',
    tema: 'Análise do Discurso, Argumentação e Redação Estilo ENEM',
    tempo: '1 hora e 40 minutos',
    aulas_semana: '3 aulas',
    exemploHabilidade: 'EM13LGG101'
  },

  // Ensino Fundamental II
  {
    serie: '6º Ano - Ensino Fundamental II',
    disciplina: 'História',
    tema: 'As Origens da Humanidade e a Revolução Neolítica',
    tempo: '50 minutos',
    aulas_semana: '3 aulas',
    exemploHabilidade: 'EF06HI03'
  },
  {
    serie: '7º Ano - Ensino Fundamental II',
    disciplina: 'Geografia',
    tema: 'Formação Territorial do Brasil e Regionalização do IBGE',
    tempo: '50 minutos',
    aulas_semana: '3 aulas',
    exemploHabilidade: 'EF07GE01'
  },
  {
    serie: '8º Ano - Ensino Fundamental II',
    disciplina: 'Matemática',
    tema: 'Equações do 1º Grau e Resolução de Problemas do Cotidiano',
    tempo: '50 minutos',
    aulas_semana: '4 aulas',
    exemploHabilidade: 'EF08MA07'
  },
  {
    serie: '9º Ano - Ensino Fundamental II',
    disciplina: 'Língua Portuguesa',
    tema: 'Análise Crítica do Gênero Textual Notícia e Fake News na Internet',
    tempo: '50 minutos',
    aulas_semana: '3 aulas',
    exemploHabilidade: 'EF09LP01'
  },

  // Ensino Fundamental I
  {
    serie: '2º Ano - Ensino Fundamental I',
    disciplina: 'Língua Portuguesa',
    tema: 'Gênero Textual Trava-Línguas e Rimas (Consciência Fonológica)',
    tempo: '50 minutos',
    aulas_semana: '3 aulas',
    exemploHabilidade: 'EF02LP05'
  },
  {
    serie: '3º Ano - Ensino Fundamental I',
    disciplina: 'Matemática',
    tema: 'Introdução à Multiplicação e Noção de Grupos Iguais',
    tempo: '50 minutos',
    aulas_semana: '4 aulas',
    exemploHabilidade: 'EF03MA06'
  },
  {
    serie: '5º Ano - Ensino Fundamental I',
    disciplina: 'Ciências da Natureza',
    tema: 'Ciclo da Água e Estados Físicos da Matéria na Natureza',
    tempo: '50 minutos',
    aulas_semana: '2 aulas',
    exemploHabilidade: 'EF05CI02'
  },

  // Educação Infantil
  {
    serie: 'Educação Infantil (4 a 5 anos - Crianças pequenas)',
    disciplina: 'Educação Infantil (Campos de Experiência)',
    tema: 'O Eu, o Outro e o Nós: Autonomia, Empatia e Convivência em Grupo',
    tempo: '40 minutos',
    aulas_semana: '5 aulas',
    exemploHabilidade: 'EI03EO01'
  }
];

export interface BNCCSkillSample {
  codigo: string;
  disciplina: string;
  etapa: string;
  descricao: string;
}

export const HABILIDADES_BNCC_POPULARES: BNCCSkillSample[] = HABILIDADES_BNCC_EXPANDIDAS;
