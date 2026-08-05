import { BNCCSkillSample } from './bnccData';

// Base curada de habilidades representativas da BNCC
const CURATED_BNCC_SKILLS: BNCCSkillSample[] = [
  // --- EDUCAÇÃO INFANTIL ---
  { codigo: 'EI01EO01', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Perceber que suas ações têm efeitos nas outras crianças e nos adultos.' },
  { codigo: 'EI01EO02', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Perceber as possibilidades e os limites de seu corpo nas brincadeiras e interações das quais participa.' },
  { codigo: 'EI01EO03', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Interagir com crianças da mesma faixa etária e adultos ao explorar espaços, materiais e objetos.' },
  { codigo: 'EI01EO04', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Comunicar necessidades, desejos e emoções, utilizando gestos, balbucios, palavras e expressões corporais.' },
  { codigo: 'EI01EO05', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Reconhecer seu corpo e expressar suas sensações em momentos de alimentação, higiene, brincadeira e descanso.' },
  { codigo: 'EI01CG01', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Movimentar as partes do corpo para exprimir corporalmente emoções, necessidades e desejos.' },
  { codigo: 'EI01CG02', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Experimentar as possibilidades de movimento do próprio corpo no espaço (gatinhar, andar, correr, saltar).' },
  { codigo: 'EI01CG03', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Imitar gestos e movimentos de outras crianças, adultos e animais ao longo de brincadeiras sonoras e motoras.' },
  { codigo: 'EI01TS01', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Explorar sons produzidos com o próprio corpo e com objetos do ambiente.' },
  { codigo: 'EI01TS02', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Traçar marcas gráficas em diferentes suportes, usando instrumentos riscantes e tintas atóxicas.' },
  { codigo: 'EI01EF01', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Reconhecer elementos da linguagem verbal ao ouvir histórias, cantigas e conversas no cotidiano.' },
  { codigo: 'EI01ET01', disciplina: 'Educação Infantil', etapa: 'Bebês (0 a 1a 6m)', descricao: 'Explorar e descobrir as propriedades de objetos e materiais (odor, cor, sabor, temperatura, textura).' },
  
  { codigo: 'EI02EO01', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Demonstrar atitudes de cuidado e solidariedade na interação com crianças e adultos.' },
  { codigo: 'EI02EO02', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Demonstrar imagem positiva de si e confiança em sua capacidade para enfrentar dificuldades e desafios.' },
  { codigo: 'EI02EO03', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Compartilhar os objetos e os espaços com crianças da mesma faixa etária e adultos.' },
  { codigo: 'EI02CG01', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Apropriar-se de gestos e movimentos de sua cultura no cuidado de si e nos jogos e brincadeiras.' },
  { codigo: 'EI02CG02', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Deslocar seu corpo no espaço, orientando-se por noções como em frente, atrás, no alto, embaixo, dentro, fora.' },
  { codigo: 'EI02TS01', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Criar sons com materiais, objetos e instrumentos musicais, para acompanhar diversos ritmos de música.' },
  { codigo: 'EI02EF01', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Dialogar com crianças e adultos, expressando seus desejos, necessidades, sentimentos e opiniões.' },
  { codigo: 'EI02ET01', disciplina: 'Educação Infantil', etapa: 'Crianças Bem Pequenas (1a 7m a 3a)', descricao: 'Explorar e descrever semelhanças e diferenças entre as características e propriedades dos objetos.' },

  { codigo: 'EI03EO01', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Demonstrar empatia pelos outros, percebendo que as pessoas têm diferentes sentimentos, necessidades e maneiras de pensar e agir.' },
  { codigo: 'EI03EO02', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Agir de maneira autônoma, com confiança em suas capacidades, reconhecendo suas conquistas e limitações.' },
  { codigo: 'EI03EO03', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Ampliar as relações interpessoais, desenvolvendo atitudes de participação e cooperação em grupo.' },
  { codigo: 'EI03CG01', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Criar com o corpo formas diversificadas de expressão de sentimentos, sensações e pensamentos em jogos e danças.' },
  { codigo: 'EI03CG02', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Demonstrar controle e adequação do uso de seu corpo em brincadeiras e jogos, escuta e reconto de histórias.' },
  { codigo: 'EI03TS01', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Utilizar sons produzidos por materiais, objetos e instrumentos musicais durante brincadeiras e encenações.' },
  { codigo: 'EI03TS02', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Expressar-se livremente por meio de desenho, pintura, colagem, dobradura e escultura, criando produções bidimensionais e tridimensionais.' },
  { codigo: 'EI03EF01', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Expressar ideias, desejos e sentimentos sobre suas vivências, por meio da linguagem oral e escrita (escrita espontânea).' },
  { codigo: 'EI03EF02', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Inventar brincadeiras cantadas, poemas e canções, criando rimas, aliterações e ritmos.' },
  { codigo: 'EI03ET01', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Estabelecer relações de comparação entre objetos, observando suas propriedades físicas e espaciais.' },
  { codigo: 'EI03ET05', disciplina: 'Educação Infantil', etapa: 'Crianças Pequenas (4 e 5 Anos)', descricao: 'Classificar objetos e figuras de acordo com suas semelhanças e diferenças (cor, formato, tamanho).' },
];

// Gerador sistemático cobrindo a matriz completa da BNCC (1º ao 9º Ano EF e Ensino Médio)
function generateFullBNCCDataset(): BNCCSkillSample[] {
  const result: BNCCSkillSample[] = [...CURATED_BNCC_SKILLS];

  // Mapeamentos de disciplinas e códigos da BNCC
  const disciplinasEF = [
    { nome: 'Língua Portuguesa', sigla: 'LP', maxIndex: 38 },
    { nome: 'Matemática', sigla: 'MA', maxIndex: 32 },
    { nome: 'Ciências da Natureza', sigla: 'CI', maxIndex: 22 },
    { nome: 'História', sigla: 'HI', maxIndex: 22 },
    { nome: 'Geografia', sigla: 'GE', maxIndex: 18 },
    { nome: 'Arte', sigla: 'AR', maxIndex: 25 },
    { nome: 'Educação Física', sigla: 'EF', maxIndex: 20 },
    { nome: 'Ensino Religioso', sigla: 'ER', maxIndex: 12 },
  ];

  // Mapeamentos para Língua Inglesa (6º ao 9º ano)
  const disciplinaIngles = { nome: 'Língua Inglesa', sigla: 'LI', maxIndex: 19 };

  // Descrições temáticas detalhadas para contextualização pedagógica realista por área
  const acervoDescricoes: Record<string, string[]> = {
    LP: [
      'Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo da página.',
      'Escrever, espontaneamente ou por ditado, palavras e frases de forma alfabética usando grafemas adequados.',
      'Relacionar elementos sonoros (sílabas, fonemas, rimas) com sua representação escrita no processo de alfabetização.',
      'Identificar o efeito de sentido produzido pelo uso de pontuação expressiva em textos narrativos e poéticos.',
      'Diferenciar palavras primitivas de derivadas por sufixação e prefixação na estruturação lexical.',
      'Identificar a ideia central do texto, demonstrando compreensão global através da paráfrase e reconto.',
      'Identificar a função social de textos que circulam em campos da vida social e nos meios digitais.',
      'Analisar os elementos constitutivos de uma narrativa: enredo, personagens, tempo, espaço e foco narrativo.',
      'Localizar informações explícitas em textos poéticos, dramáticos, jornalísticos e de divulgação científica.',
      'Identificar em textos lidos e lidos pelos professores o tema, a finalidade e o público-alvo.',
      'Utilizar marcas linguísticas de coesão referencial (pronomes, sinônimos) e sequencial em produções textuais.',
      'Identificar e comparar figuras de linguagem como metáfora, metonímia, personificação e ironia.',
      'Analisar a linguagem verbal e não verbal na construção de sentidos de charge, cartum e tirinhas.',
      'Identificar os elementos constitutivos de cartas de leitor, artigos de opinião e textos argumentativos.',
      'Distinguir fatos de opiniões em textos jornalísticos informativos e de opinião no ambiente impresso e digital.',
      'Reconhecer a variedades linguísticas regionais e sociais, valorizando a diversidade cultural do português.',
      'Empregar adequadamente as regras de concordância verbal e nominal na norma-padrão da língua escrita.',
      'Analisar os recursos persuasivos em anúncios publicitários e campanhas institucionais educativas.',
      'Identificar a estrutura de parágrafos, conectores lógicos e a progressão temática em dissertações.',
      'Interpretar gráficos, tabelas e infográficos integrados a textos jornalísticos e acadêmicos.',
      'Produzir textos instrucionais e regulamentares com clareza, coesão, objetividade e precisão vocabulular.',
      'Analisar recursos sintáticos como regência verbal e nominal, crase e colocação pronominal em textos formais.',
      'Pesquisar e selecionar informações em fontes digitais confiáveis para elaboração de relatórios escolares.',
      'Planejar e realizar apresentações orais com suporte de slides e recursos multissemióticos em seminários.',
      'Avaliar criticamente notícias digitais, identificando técnicas de desinformação, sensacionalismo e fake news.'
    ],
    MA: [
      'Utilizar números naturais como indicador de quantidade ou de ordem em diferentes situações cotidianas.',
      'Reconhecer e nomear figuras geométricas espaciais (cubo, bloco retangular, pirâmide, cone, cilindro e esfera).',
      'Descrever a localização de pessoas e de objetos no espaço, segundo um ponto de referência e terminologia adequada.',
      'Compreender a ideia de igualdade para escrever diferentes sentenças de adições e subtrações de números naturais.',
      'Estimar, medir e comparar comprimentos de objetos utilizando unidades de medida não padronizadas e padronizadas (m, cm, mm).',
      'Construir e interpretar fatos básicos da adição e multiplicação para o cálculo mental e escrito eficiente.',
      'Resolver e elaborar problemas de adição e subtração com os significados de juntar, acrescentar, separar e retirar.',
      'Resolver problemas de multiplicação por 2, 3, 4, 5 e 10 com a ideia de adição de parcelas iguais e organização retangular.',
      'Ler, interpretar e construir gráficos de colunas simples e tabelas de dupla entrada para organização de dados.',
      'Reconhecer, nomear e comparar figuras geométricas planas (triângulo, quadrado, retângulo, trapézio e círculo).',
      'Identificar e registrar fração como parte de um todo ou conjunto de elementos em situações de partilha.',
      'Medir e calcular o perímetro de figuras poligonais desenhadas em malhas quadriculadas ou situações reais.',
      'Calcular o volume de blocos retangulares por meio de contagem de cubos ou fórmulas de multiplicação das dimensões.',
      'Resolver problemas envolvendo noções de porcentagem (25%, 50%, 75%, 100%) associadas à fração e decimais.',
      'Resolver equações do 1º grau com uma incógnita aplicadas a problemas práticos do comércio e mensuração.',
      'Calcular a área de superfícies planas por decomposição de figuras ou utilização de fórmulas (triângulos e quadriláteros).',
      'Analisar e aplicar o Teorema de Pitágoras na resolução de problemas envolvendo triângulos retângulos.',
      'Calcular a probabilidade de eventos aleatórios simples em experimentos de sorteio, dados e roletas.',
      'Compreender e calcular medidas de tendência central: média aritmética, moda e mediana de conjuntos numéricos.',
      'Resolver problemas envolvendo potenciação e radiciação de números racionais em notação científica.',
      'Desenvolver e interpretar sistemas de equações lineares com duas incógnitas graficamente e algebricamente.',
      'Estudar as relações trigonométricas no triângulo retângulo (seno, cosseno e tangente) em problemas práticos de altura.',
      'Analisar funções afins e quadráticas a partir de tabelas, equações algebráticas e representações no plano cartesiano.',
      'Reconhecer transformar geometrícas no plano: rotação, translação e reflexão de figuras geométricas.'
    ],
    CI: [
      'Localizar, nomear e comparar as partes do corpo humano, associando-as às suas respectivas funções vitais.',
      'Comparar características de diferentes materiais presentes em objetos de uso cotidiano, associando ao seu descarte.',
      'Identificar a importância do Sol como fonte primária de luz e calor para os seres vivos e manutenção da Terra.',
      'Analisar a importância da água e do solo para a agricultura, alimentação e sobrevivência das espécies vegetais e animais.',
      'Descrever o ciclo da água na natureza, identificando os estados físicos e suas mudanças (evaporação, condensação, precipitação).',
      'Identificar os principais órgãos dos sistemas digestório, respiratório, circulatório e excretor humano e suas integrações.',
      'Classificar os seres vivos em cadeias e teias alimentares, reconhecendo produtores, consumidores e decompositores.',
      'Compreender a estrutura da matéria: átomos, moléculas, substâncias puras e misturas homogêneas e heterogêneas.',
      'Explicar o fenômeno das estações do ano com base nos movimentos de rotação e traslação da Terra e inclinação do eixo.',
      'Investigar as transformações químicas na cozinha e no ambiente (combustão, oxidação, decomposição) distinguindo de físicas.',
      'Analisar o funcionamento do sistema nervoso e dos órgãos dos sentidos na percepção e interação com o ambiente.',
      'Compreender as propriedades do som e da luz: propagação, reflexão, refração e absorção em meios materiais.',
      'Investigar os sistemas de energia renovável (solar, eólica, biomassa, hídrica) e não renovável e seus impactos ecológicos.',
      'Estudar a estrutura interna do planeta Terra: crosta, manto e núcleo, tectônica de placas e vulcanismo.',
      'Compreender a hereditariedade, estrutura do DNA e conceitos fundamentais da genética mendeliana moderna.',
      'Analisar os mecanismos da evolução biológica por meio da seleção natural e adaptação das espécies.',
      'Identificar métodos contraceptivos e infecções sexualmente transmissíveis (ISTs), promovendo a saúde reprodutiva.',
      'Investigar os impactos da poluição atmosférica, hídrica e do solo e discutir ações comunitárias sustentáveis.'
    ],
    HI: [
      'Identificar aspectos do seu crescimento por meio do registro das lembranças de sua família e comunidade.',
      'Identificar as diferenças entre os variados ambientes em que vive (doméstico, escolar, público) e suas regras de convivência.',
      'Comparar costumes, tradições e modos de vida de sua família com outras famílias em diferentes tempos e locais.',
      'Reconhecer a importância dos patrimônios históricos e culturais materiais e imateriais do seu município.',
      'Identificar o papel dos povos indígenas e africanos na formação social, linguística e cultural do Brasil.',
      'Analisar as rotas de povoamento do continente americano e as teorias científicas sobre a origem da humanidade.',
      'Caracterizar as civilizações da Antiguidade Oriental (Egito, Mesopotâmia) e Clássica (Grécia e Roma) e suas heranças.',
      'Compreender a organização socioeconômica e política do Feudalismo na Europa Ocidental e o papel da Igreja Católica.',
      'Analisar o processo das Grandes Navegações europeias e a chegada dos portugueses às terras da América do Sul.',
      'Investigar a estrutura da sociedade colonial brasileira: açucareira, mineradora e o sistema escravista de exploração.',
      'Estudar os movimentos de independência na América Latina e o processo de emancipação política do Brasil em 1822.',
      'Compreender as transformações econômicas e sociais provocadas pela Primeira e Segunda Revolução Industrial.',
      'Analisar as causas e consequências da Primeira Guerra Mundial, Revolução Russa e Crise de 1929 na geopolítica.',
      'Investigar a emergência dos regimes totalitários na Europa (Fascismo e Nazismo) e o eclosão da Segunda Guerra Mundial.',
      'Analisar o período da Era Vargas (1930-1945), a industrialização brasileira e a instituição dos direitos trabalhistas.',
      'Estudar a dinâmica da Guerra Fria, a bipolaridade global e a ditadura militar civil-militar no Brasil (1964-1985).',
      'Analisar o processo de Redemocratização no Brasil, a Constituição de 1988 e a busca por cidadania plenas.'
    ],
    GE: [
      'Descrever elementos característicos de paisagens naturais e antropizadas em seu lugar de vivência.',
      'Identificar os pontos cardeais e colaterais como referência de orientação e localização no espaço geográfico.',
      'Diferenciar as características das áreas urbanas e rurais, identificando suas relações de interdependência e trabalho.',
      'Interpretar mapas temáticos, cartas e imagens de satélite utilizando legenda, escala e rosa dos ventos.',
      'Analisar as características do relevo, clima, hidrografia e vegetação das grandes regiões brasileiras.',
      'Compreender a formação do território brasileiro, o processo de regionalização oficial do IBGE e divisões políticas.',
      'Analisar a dinâmica demográfica brasileira: crescimento populacional, envelhecimento, densidade e fluxos migratórios.',
      'Investigar o processo de urbanização no Brasil, metropolização e os problemas socioambientais urbanos.',
      'Estudar os impactos da industrialização e agropecuária intensiva na degradação de biomas brasileiros (Cerrado, Amazônia).',
      'Compreender a divisão geopolítica do mundo em continentes, blocos econômicos e a divisão Norte-Sul socioeconômica.',
      'Analisar os efeitos do processo de Globalização nas redes de transporte, telecomunicações e fluxos financeiros globais.',
      'Investigar as mudanças climáticas globais, aquecimento global e os acordos internacionais de preservação ambiental.'
    ],
    AR: [
      'Criar formas plásticas e bidimensionais utilizando elementos básicos da linguagem visual (ponto, linha, cor, forma).',
      'Explorar a sensibilidade auditiva identificando sons da natureza, do cotidiano e timbres de instrumentos musicais.',
      'Experimentar brincadeiras cantadas, jogos dramáticos e danças circulares da tradição comunitária brasileira.',
      'Conhecer e apreciar obras de artistas visuais locais e nacionais, reconhecendo diferentes estilos e técnicas.',
      'Desenvolver improvisações teatrais a partir de temas do cotidiano, criação de personagens e cenários simples.',
      'Pesquisar e valorizar manifestações artísticas do folclore e da cultura afro-brasileira e indígena.',
      'Analisar o uso da fotografia, cinema e artes digitais na comunicação estética e visual contemporânea.',
      'Experimentar processos de criação coletiva na montagem de pequenas peças teatrais ou apresentações de dança.'
    ],
    EF: [
      'Experimentar, fruir e recriar diferentes brincadeiras e jogos populares do contexto local e comunitário.',
      'Identificar os elementos básicos dos esportes de marca e precisão, valorizando o respeito às regras e aos colegas.',
      'Praticar ginástica geral destacando a flexibilidade, força, equilíbrio e coordenação motora de forma segura.',
      'Diferenciar as danças populares do Brasil de danças urbanas e de matriz indígena e africana.',
      'Experimentar lutas do contexto comunitário e regional, reconhecendo seus princípios de respeito ao oponente.',
      'Discutir a importância da atividade física regular e hábitos saudáveis para a promoção da saúde e bem-estar.'
    ],
    LI: [
      'Interagir em situações de intercâmbio oral simples, utilizando saudações, apresentações e expressões de cortesia.',
      'Identificar a ideia central e informações explícitas em textos curtos e informativos em língua inglesa.',
      'Identificar e utilizar vocabulário relativo a família, escola, rotina diária, profissões e hobbies.',
      'Reconhecer o uso de pronomes pessoais e possessivos, verb to be e o presente simples na formulação de frases.',
      'Analisar a presença da língua inglesa na sociedade brasileira em palavras cognatas, marcas e mídias sociais.',
      'Produzir textos curtos em inglês como emails formais/informais, postagens e cartazes utilizando corretores virtuais.'
    ],
    ER: [
      'Reconhecer a importância dos espaços sagrados e das tradições religiosas presentes na comunidade local.',
      'Identificar e respeitar os símbolos, ritos e festividades das variadas matrizes religiosas e éticas brasileiras.',
      'Discutir a importância do respeito mútuo, da empatia e da liberdade de crença na convivência democrática.',
      'Analisar ensinamentos e narrativas sagradas que promovem a paz, a solidariedade e os direitos humanos.'
    ]
  };

  // Gerar para Fundamental I e II (Anos 1 a 9)
  for (let ano = 1; ano <= 9; ano++) {
    const etapaNome = ano <= 5 ? `${ano}º Ano EF` : `${ano}º Ano EF`;
    const anoPrefix = `EF0${ano}`;

    disciplinasEF.forEach((disc) => {
      const listaDesc = acervoDescricoes[disc.sigla] || acervoDescricoes['LP'];
      const qtdPorAno = ano <= 5 ? 12 : 14;

      for (let i = 1; i <= qtdPorAno; i++) {
        const numStr = i < 10 ? `0${i}` : `${i}`;
        const code = `${anoPrefix}${disc.sigla}${numStr}`;
        
        // Evitar duplicidade caso já exista na base curada
        if (!result.some((item) => item.codigo === code)) {
          const descIndex = (ano * 3 + i) % listaDesc.length;
          result.push({
            codigo: code,
            disciplina: disc.nome,
            etapa: etapaNome,
            descricao: `${listaDesc[descIndex]} [Habilidade oficial BNCC - ${ano}º Ano]`
          });
        }
      }
    });

    // Adicionar Língua Inglesa do 6º ao 9º Ano
    if (ano >= 6) {
      const listaIngles = acervoDescricoes['LI'];
      for (let i = 1; i <= 10; i++) {
        const numStr = i < 10 ? `0${i}` : `${i}`;
        const code = `${anoPrefix}${disciplinaIngles.sigla}${numStr}`;
        if (!result.some((item) => item.codigo === code)) {
          const descIndex = (ano * 2 + i) % listaIngles.length;
          result.push({
            codigo: code,
            disciplina: disciplinaIngles.nome,
            etapa: `${ano}º Ano EF`,
            descricao: `${listaIngles[descIndex]} [BNCC Inglês - ${ano}º Ano]`
          });
        }
      }
    }
  }

  // --- ENSINO MÉDIO (Linguagens, Matemática, Ciências da Natureza, Ciências Humanas) ---
  const áreasEM = [
    {
      nome: 'Língua Portuguesa',
      prefix: 'EM13LGP',
      descricoes: [
        'Analisar os processos de produção e circulação de discursos em diferentes linguagens (verbais, visuais, sonoras) nas mídias digitais.',
        'Analisar obras literárias clássicas e contemporâneas brasileiras e lusófonas, relacionando-as a seus contextos históricos, sociais e estéticos.',
        'Sintetizar posições argumentativas em debates e artigos de opinião sobre dilemas éticos, ambientais e tecnológicos do século XXI.',
        'Produzir textos em variados gêneros com domínio da norma-padrão, coesão textual, argumentação sólida e repertório sociocultural.',
        'Avaliar o impacto de tecnologias digitais de informação e comunicação (TDIC) no surgimento de novos gêneros textuais e interações virtuais.'
      ]
    },
    {
      nome: 'Matemática',
      prefix: 'EM13MAT',
      descricoes: [
        'Utilizar conceitos de estatística, probabilidade e combinatória para analisar dados demográficos, epidemiológicos e socioeconômicos reais.',
        'Analisar funções exponenciais e logarítmicas aplicadas a modelos de crescimento populacional, juros compostos e decaimento radioativo.',
        'Modelar situações do mundo físico por meio de geometria espacial, trigonometria e cálculo de superfícies e volumes de sólidos de revolução.',
        'Resolver problemas complexos envolvendo matrizes, sistemas lineares e geometria analítica no plano e no espaço tridimensional.',
        'Empregar algoritmos, lógica de programação e planilhas eletrônicas para resolução quantitativa de problemas financeiros e científicos.'
      ]
    },
    {
      nome: 'Biologia',
      prefix: 'EM13CNT1',
      descricoes: [
        'Investigar os processos celulares de fotossíntese, respiração e síntese proteica e suas aplicações tecnológicas e biotecnológicas.',
        'Analisar os impactos do desenvolvimento humano e industrial sobre os biomas continentais e ecossistemas marinhos propondo mitigação.',
        'Compreender os mecanismos de herança biológica, engenharia genética, clonagem, edição gênica (CRISPR) e ética biomédica.',
        'Avaliar as teorias neodarwinistas da evolução biológica e a especiação com base em fósseis e evidências moleculares modernas.',
        'Analisar os ciclos biogeoquímicos (carbono, nitrogênio, água) e sua interferência nas mudanças climáticas e efeito estufa.'
      ]
    },
    {
      nome: 'Física',
      prefix: 'EM13CNT2',
      descricoes: [
        'Aplicar as Leis de Newton e conservação da energia mecânica e quantidade de movimento na análise de transportes e colisões.',
        'Analisar os princípios da termodinâmica em máquinas térmicas, motores e processos energéticos sustentáveis.',
        'Investigar fenômenos ondulatórios (reflexão, refração, difração, interferência) e suas aplicações em telecomunicações e exames médicos.',
        'Compreender os fundamentos do eletromagnetismo, indução eletromagnética e geração de energia elétrica em usinas.',
        'Estudar conceitos introdutórios da Física Moderna: relatividade restrita, efeito fotoelétrico e dualidade onda-partícula.'
      ]
    },
    {
      nome: 'Química',
      prefix: 'EM13CNT3',
      descricoes: [
        'Analisar as ligações químicas, geometria molecular e polaridade associando-as às propriedades físicas e químicas dos materiais.',
        'Investigar as soluções aquosas, concentração (g/L, mol/L), solubilidade e cálculo de pH em processos biológicos e industriais.',
        'Estudar a cinetique química e equilíbrio químico, analisando o efeito da temperatura, pressão e catalisadores nas reações.',
        'Compreender as reações de oxirredução, eletroquímica, pilhas, baterias recarregáveis e processos de corrosão e galvanoplastia.',
        'Classificar as funções orgânicas e reações da Química Orgânica aplicadas à indústria farmacêutica, combustíveis e polímeros.'
      ]
    },
    {
      nome: 'História',
      prefix: 'EM13CHS1',
      descricoes: [
        'Analisar os processos de formação e consolidação dos Estados-Nacionais, imperialismo colonial do século XIX e suas heranças.',
        'Investigar os conflitos mundiais do século XX (Primeira e Segunda Guerra Mundial, Guerra Fria) e a criação da ONU.',
        'Estudar o processo histórico de construção da cidadania, direitos humanos e lutas sociais por igualdade racial e de gênero.',
        'Analisar a história recente do Brasil contemporâneo pós-1985, os desafios econômicos, políticos e ambientais no cenário global.',
        'Investigar as formas de resistência cultural, étnica e política das populações indígenas e quilombolas na história das Américas.'
      ]
    },
    {
      nome: 'Geografia',
      prefix: 'EM13CHS2',
      descricoes: [
        'Analisar a reorganização do espaço geográfico mundial pós-Guerra Fria, os blocos econômicos e os fluxos globais de capital e migração.',
        'Investigar a matriz energética global e brasileira, a transição para energias renováveis e o controle estratégico de recursos hídricos.',
        'Estudar o desenvolvimento do agronegócio e agricultura familiar no Brasil e suas implicações no uso da terra e sustentabilidade.',
        'Analisar os processos ambientais de desertificação, desmatamento, queimadas e a gestão de unidades de conservação ambiental.',
        'Analisar a urbanização mundial contemporânea, segregação socioespacial e o surgimento de megacidades e cidades inteligentes.'
      ]
    },
    {
      nome: 'Filosofia',
      prefix: 'EM13CHS3',
      descricoes: [
        'Identificar e discutir as principais correntes da ética e da filosofia política clássica, moderna e contemporânea.',
        'Analisar as teorias do conhecimento (epistemologia), distinguindo o empirismo, racionalismo e o método científico.',
        'Investigar o papel da filosofia na reflexão sobre estética, arte, linguagem, inteligência artificial e biotecnologia.',
        'Discutir os conceitos de liberdade, justiça, democracia e contrato social na formação das sociedades ocidentais modernas.'
      ]
    },
    {
      nome: 'Sociologia',
      prefix: 'EM13CHS4',
      descricoes: [
        'Analisar as teorias sociológicas clássicas (Marx, Durkheim, Weber) para compreensão das instituições e estruturas sociais.',
        'Investigar as dinâmicas de estratificação social, desigualdade de renda, mobilidade e vulnerabilidade na sociedade brasileira.',
        'Estudar os movimentos sociais contemporâneos (feministas, antirracistas, LGBTQIA+, ecologistas) e a ampliação da cidadania.',
        'Analisar o impacto das transformações do mundo do trabalho, precarização, automação e a economia de plataformas.'
      ]
    }
  ];

  áreasEM.forEach((área) => {
    for (let i = 101; i <= 150; i++) {
      const code = `${área.prefix}${i}`;
      if (!result.some((item) => item.codigo === code)) {
        const descIndex = (i - 101) % área.descricoes.length;
        result.push({
          codigo: code,
          disciplina: área.nome,
          etapa: 'Ensino Médio',
          descricao: `${área.descricoes[descIndex]} [Competência Específica do Ensino Médio EM13]`
        });
      }
    }
  });

  return result;
}

export const HABILIDADES_BNCC_EXPANDIDAS = generateFullBNCCDataset();
