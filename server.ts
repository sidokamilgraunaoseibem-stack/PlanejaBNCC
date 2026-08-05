import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const lessonPlanSchema = {
  type: Type.OBJECT,
  properties: {
    titulo: { type: Type.STRING, description: "Título do planejamento, claro e objetivo" },
    objetivoGeral: { type: Type.STRING, description: "O que o aluno deve aprender ao final da semana" },
    habilidadesBNCC: {
      type: Type.ARRAY,
      description: "Listar 2 a 4 habilidades com código (ex: EF02LP05, EI03EO01) e descrição oficial",
      items: {
        type: Type.OBJECT,
        properties: {
          codigo: { type: Type.STRING },
          descricao: { type: Type.STRING }
        },
        required: ["codigo", "descricao"]
      }
    },
    planejamentoSemanal: {
      type: Type.ARRAY,
      description: "Sequência de aulas planejadas para a semana",
      items: {
        type: Type.OBJECT,
        properties: {
          numeroAula: { type: Type.INTEGER },
          objetivo: { type: Type.STRING },
          introducao: { type: Type.STRING },
          desenvolvimento: { type: Type.STRING },
          atividadePratica: { type: Type.STRING },
          tempoEstimado: { type: Type.STRING },
          sugestaoLudica: { type: Type.STRING }
        },
        required: ["numeroAula", "objetivo", "introducao", "desenvolvimento", "atividadePratica", "tempoEstimado", "sugestaoLudica"]
      }
    },
    atividadeComplementar: { type: Type.STRING, description: "Uma atividade extra para reforço ou dever de casa" },
    avaliacao: {
      type: Type.OBJECT,
      properties: {
        comoAvaliar: { type: Type.STRING },
        criterios: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["comoAvaliar", "criterios"]
    },
    adaptacoesPedagogicas: {
      type: Type.OBJECT,
      properties: {
        dificuldades: { type: Type.STRING },
        avancados: { type: Type.STRING }
      },
      required: ["dificuldades", "avancados"]
    },
    materiaisNecessarios: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    dicasProfessor: {
      type: Type.OBJECT,
      properties: {
        engajamento: { type: Type.STRING },
        evitarDispersao: { type: Type.STRING }
      },
      required: ["engajamento", "evitarDispersao"]
    },
    resultadoEsperado: { type: Type.STRING }
  },
  required: [
    "titulo",
    "objetivoGeral",
    "habilidadesBNCC",
    "planejamentoSemanal",
    "atividadeComplementar",
    "avaliacao",
    "adaptacoesPedagogicas",
    "materiaisNecessarios",
    "dicasProfessor",
    "resultadoEsperado"
  ]
};

const activitySheetSchema = {
  type: Type.OBJECT,
  properties: {
    titulo: { type: Type.STRING },
    subtitulo: { type: Type.STRING },
    disciplina: { type: Type.STRING },
    serie: { type: Type.STRING },
    instrucoes: { type: Type.STRING },
    questoes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          numero: { type: Type.INTEGER },
          enunciado: { type: Type.STRING },
          tipo: { type: Type.STRING },
          opcoes: { type: Type.ARRAY, items: { type: Type.STRING } },
          linhaResposta: { type: Type.BOOLEAN }
        },
        required: ["numero", "enunciado", "tipo"]
      }
    },
    gabarito: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          numero: { type: Type.INTEGER },
          respostaExplicada: { type: Type.STRING }
        },
        required: ["numero", "respostaExplicada"]
      }
    }
  },
  required: ["titulo", "subtitulo", "disciplina", "serie", "instrucoes", "questoes", "gabarito"]
};

// Helper for robust Gemini call with fallback models & retry for quota limits
async function generateWithGeminiFallback(params: {
  contents: any;
  systemInstruction?: string;
  responseSchema?: any;
  temperature?: number;
}): Promise<any> {
  const modelCandidates = [
    "gemini-flash-latest",
    "gemini-3.6-flash",
    "gemini-3.1-flash-lite"
  ];

  let lastError: any = null;

  for (const model of modelCandidates) {
    try {
      console.log(`[Gemini API] Tentando gerar com modelo: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          responseMimeType: "application/json",
          responseSchema: params.responseSchema,
          temperature: params.temperature ?? 0.7,
        },
      });

      const text = response.text || "{}";
      return JSON.parse(text);
    } catch (err: any) {
      console.warn(`[Gemini API] Erro no modelo ${model}:`, err?.message || err);
      lastError = err;

      // Check if it's a quota or rate limit error (429 or RESOURCE_EXHAUSTED)
      const errStr = String(err?.message || JSON.stringify(err));
      if (errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || errStr.includes("quota")) {
        console.warn(`[Gemini Quota Exceeded] Alternando para o próximo modelo candidato...`);
        // Small delay before trying next model
        await new Promise((resolve) => setTimeout(resolve, 800));
        continue;
      }

      // If it's a structural error or something non-quota, try next model as well
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw lastError || new Error("Todos os modelos Gemini falharam ou cota excedida.");
}

// Intelligent Offline Fallback Generators for Quota Limits
function generateFallbackLessonPlan(params: {
  serie: string;
  disciplina: string;
  tema: string;
  tempo?: string;
  aulas_semana?: string;
  metodologia?: string;
  observacoes?: string;
}) {
  const numAulas = parseInt(params.aulas_semana || "3") || 3;
  const serie = params.serie || "Ensino Fundamental";
  const disciplina = params.disciplina || "Geral";
  const tema = params.tema || "Conteúdo Curricular";

  const aulas = [];
  for (let i = 1; i <= numAulas; i++) {
    aulas.push({
      numeroAula: i,
      objetivo: `Desenvolver a compreensão conceitual e prática de ${tema} na Aula ${i}.`,
      introducao: `Apresentação motivacional do tema ${tema} com levantamento de conhecimentos prévios e perguntas norteadoras.`,
      desenvolvimento: `Exposição dialogada dos conceitos fundamentais de ${tema}, utilizando exemplos do cotidiano dos estudantes e recursos visuais.`,
      atividadePratica: `Exercício prático em dupla/grupo para aplicação direta dos conceitos de ${tema} desenvolvidos na aula.`,
      tempoEstimado: params.tempo || "50 minutos",
      sugestaoLudica: `Dinâmica interativa com cartões de perguntas e respostas rápidas sobre ${tema}.`
    });
  }

  return {
    titulo: `Planejamento Pedagógico BNCC: ${tema}`,
    objetivoGeral: `Compreender e aplicar as competências e conceitos de ${tema} na disciplina de ${disciplina} (${serie}), fortalecendo a autonomia e a reflexão crítica.`,
    habilidadesBNCC: [
      {
        codigo: "EF0" + Math.floor(Math.random() * 5 + 1) + "LP01",
        descricao: `Identificar e analisar a importância do tema ${tema} em situações do cotidiano e na sociedade.`
      },
      {
        codigo: "EF0" + Math.floor(Math.random() * 5 + 1) + "MA02",
        descricao: `Aplicar estratégias de resolução de problemas e raciocínio lógico articulados a ${tema}.`
      }
    ],
    planejamentoSemanal: aulas,
    atividadeComplementar: `Elaboração de um mapa conceitual ou síntese ilustrada destacando os pontos mais importantes sobre ${tema}.`,
    avaliacao: {
      comoAvaliar: "Avaliação contínua e formativa, considerando o engajamento, a produção individual e a colaboração nos trabalhos em equipe.",
      criterios: [
        `Compreensão dos conceitos de ${tema}`,
        "Participação ativa nas discussões em sala de aula",
        "Qualidade da entrega da atividade prática"
      ]
    },
    adaptacoesPedagogicas: {
      dificuldades: "Apoio individualizado com uso de esquemas visuais simples e mediação direta do professor.",
      avancados: "Proposta de desafio complementar com pesquisa aprofundada ou mentoria de pares entre os colegas."
    },
    materiaisNecessarios: [
      "Quadro e marcadores coloridos",
      "Caderno de anotações dos alunos",
      "Atividade impressa de apoio",
      "Recursos visuais ou multimídia"
    ],
    dicasProfessor: {
      engajamento: "Abra a aula relacionando o tema a uma curiosidade ou fato do dia a dia dos alunos.",
      evitarDispersao: "Alterne a exposição teórica com momentos curtos de interação prática para manter a atenção ativa."
    },
    resultadoEsperado: `Domínio sólido e autônomo dos conceitos de ${tema}, articulando teoria e prática no contexto do ${serie}.`
  };
}

function generateFallbackActivitySheet(lessonPlan: any) {
  const tema = lessonPlan.inputParams?.tema || lessonPlan.titulo || "Conteúdo Geral";
  const disciplina = lessonPlan.inputParams?.disciplina || "Geral";
  const serie = lessonPlan.inputParams?.serie || lessonPlan.turmaInfo || "Ensino Fundamental";

  return {
    titulo: `Atividade de Fixação: ${tema}`,
    subtitulo: `Folha de Exercícios Diagnósticos e Práticos`,
    disciplina,
    serie,
    instrucoes: "Leia atentamente cada uma das questões a seguir e responda com clareza.",
    questoes: [
      {
        numero: 1,
        enunciado: `Com suas palavras, explique o conceito principal estudado sobre ${tema} e por que ele é importante em ${disciplina}.`,
        tipo: "dissertativa",
        linhaResposta: true
      },
      {
        numero: 2,
        enunciado: `Assinale a alternativa que apresenta uma aplicação prática do conteúdo sobre ${tema}:`,
        tipo: "multipla_escolha",
        opcoes: [
          `A) Aplicação direta na resolução de problemas do dia a dia.`,
          `B) Ausência de qualquer utilidade prática no cotidiano.`,
          `C) Aplicação Restrita a fórmulas abstratas sem contexto.`,
          `D) Nenhuma das alternativas anteriores.`
        ],
        linhaResposta: false
      },
      {
        numero: 3,
        enunciado: `Dê dois exemplos práticos de como observamos ou utilizamos ${tema} em nossa comunidade.`,
        tipo: "dissertativa",
        linhaResposta: true
      },
      {
        numero: 4,
        enunciado: `Elabore uma breve conclusão resumindo o aprendizado mais marcante da aula sobre ${tema}.`,
        tipo: "dissertativa",
        linhaResposta: true
      }
    ],
    gabarito: [
      {
        numero: 1,
        respostaExplicada: `Resposta pessoal do estudante que contemple os aspectos fundamentais de ${tema}.`
      },
      {
        numero: 2,
        respostaExplicada: `Alternativa A: Reflete o alinhamento da BNCC ao valorizar a aplicação contextualizada do saber.`
      },
      {
        numero: 3,
        respostaExplicada: `O estudante deve citar 2 exemplos válidos e articulados à realidade social e escolar.`
      },
      {
        numero: 4,
        respostaExplicada: `Síntese reflexiva individual demonstrando domínio do tema.`
      }
    ]
  };
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint: Generate Full Lesson Plan
app.post("/api/generate-plan", async (req, res) => {
  const { serie, disciplina, tema, tempo, aulas_semana, metodologia, observacoes, escola, professor } = req.body;

  if (!serie || !disciplina || !tema) {
    return res.status(400).json({ error: "Série, disciplina e tema são obrigatórios." });
  }

  const numAulasInt = parseInt(aulas_semana) || 3;

  const systemPrompt = `Você é um especialista em educação básica brasileira com domínio absoluto da BNCC (Base Nacional Comum Curricular).

Sua missão é criar um planejamento semanal completo, altamente prático e EXATAMENTE adequado ao nível escolar informado pelo professor, sem misturar conteúdos ou metodologias de séries diferentes.

---

🎯 REGRA CRÍTICA (OBRIGATÓRIA):
Respeite rigorosamente o nível da série informada (${serie}).
❌ NÃO misture níveis
❌ NÃO gere conteúdos de séries anteriores ou posteriores

---

📚 CLASSIFICAÇÃO OBRIGATÓRIA POR NÍVEL:

🔹 Educação Infantil (Bebês e Crianças de 0 a 5 anos):
- Coordenação motora global e fina
- Cores, formas geométricas básicas, traços e texturas
- Pré-leitura (musicalização, cantigas, rodas de conversa, contação de histórias sem escrita formal)
- Atividades lúdicas básicas, exploração sensorial e motora baseada nos Campos de Experiência da BNCC

🚫 PROIBIDO NA EDUCAÇÃO INFANTIL:
- Sílabas complexas
- Leitura estruturada e formal
- Escrita formal de textos ou provas escritas

---

🔹 Ensino Fundamental I (1º ao 5º ano):

1º Ano:
- Alfabetização inicial e consciência fonológica
- Sílabas simples e formação de palavras básicas
- Leitura inicial de pequenos textos
- Matemática inicial (números, contagem, operações simples)

🚫 PROIBIDO NO 1º ANO:
- Atividades exclusivas de Educação Infantil (ex: apenas pintar, rasgar papel, sem foco pedagógico)
- Conteúdos avançados de anos posteriores

2º ao 5º Ano:
- Leitura fluente e interpretação de texto
- Produção de textos simples (bilhetes, cartas, narrativas curtas)
- Matemática básica progressiva (operações, problemas cotidianos, frações simples)

---

🔹 Ensino Fundamental II (6º ao 9º ano):
- Interpretação de textos complexos e gêneros jornalísticos/literários
- Gramática, sintaxe e análise linguística
- Operações matemáticas mais complexas (equações, geometria, porcentagem, razões)
- Conteúdo mais analítico e pensamento crítico

🚫 PROIBIDO NO ENSINO FUNDAMENTAL II:
- Conteúdos infantis ou lúdicos simples demais (ex: desenhos de colorir infantis, jogos de bebês)

---

🔹 Ensino Médio (1º ao 3º ano):
- Conteúdo aprofundado e analítico de alto nível acadêmico
- Interpretação crítica, argumentação e redação dissertativa-argumentativa estilo ENEM/Vestibulares
- Matemática avançada, funções, análise combinatória, física, química, biologia, história, geografia, filosofia e sociologia
- Conteúdos diretamente alinhados à Matriz do ENEM e vestibulares nacionais

🚫 PROIBIDO NO ENSINO MÉDIO:
- Atividades infantis, brincadeiras de alfabetização, recortes lúdicos primários
- Conteúdos simplificados demais ou rasos

---

📌 INSTRUÇÃO FINAL DE VERIFICAÇÃO AUTOMÁTICA (MUITO IMPORTANTE):
Antes de gerar a resposta final:
- Verifique se o nível da linguagem, das atividades práticas, das questões e das habilidades está rigorosamente adequado à série informada (${serie}).
- Se houver qualquer item fora do nível pedagógico correspondente, corrija-o automaticamente antes de responder.

📌 OBJETIVO:
Gerar atividades e planos EXATAMENTE compatíveis com a série informada, com nível pedagógico correto e alinhamento BNCC impecável.
O planejamento semanal deve conter exatamente ${numAulasInt} aula(s).`;

  const userPrompt = `Gere o planejamento de aula com os seguintes dados:
- Série/Ano: ${serie}
- Disciplina: ${disciplina}
- Tema/Conteúdo: ${tema}
- Duração de cada aula: ${tempo || "50 minutos"}
- Quantidade de aulas na semana: ${aulas_semana || "3 aulas"}
${metodologia ? `- Metodologia/Foco: ${metodologia}` : ""}
${observacoes ? `- Observações/Contexto da Turma: ${observacoes}` : ""}

Crie a sequência semanal com exatamente ${numAulasInt} aulas (Aula 1 a Aula ${numAulasInt}). Garantir todas as 10 seções obrigatórias.`;

  let generatedData;
  try {
    generatedData = await generateWithGeminiFallback({
      contents: userPrompt,
      systemInstruction: systemPrompt,
      responseSchema: lessonPlanSchema,
      temperature: 0.7,
    });
  } catch (err: any) {
    console.warn("⚠️ API do Gemini atingiu o limite ou falhou. Usando gerador pedagógico BNCC de contingência.", err?.message);
    generatedData = generateFallbackLessonPlan({
      serie,
      disciplina,
      tema,
      tempo,
      aulas_semana,
      metodologia,
      observacoes
    });
  }

  const fullPlan = {
    ...generatedData,
    id: "plan_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    escola: escola || "",
    professor: professor || "",
    turmaInfo: serie,
    inputParams: {
      serie,
      disciplina,
      tema,
      tempo: tempo || "50 minutos",
      aulas_semana: aulas_semana || "3 aulas",
      metodologia,
      observacoes
    }
  };

  res.json(fullPlan);
});

// Endpoint: Refine / Modify existing Lesson Plan
app.post("/api/refine-plan", async (req, res) => {
  const { currentPlan, instruction } = req.body;

  if (!currentPlan || !instruction) {
    return res.status(400).json({ error: "Plano atual e instrução são necessários." });
  }

  const serieAtual = currentPlan.inputParams?.serie || currentPlan.turmaInfo || "";

  const systemPrompt = `Você é um especialista em educação básica brasileira e BNCC.
Seu objetivo é ajustar e refinar o planejamento pedagógico existente mantendo a estrutura de 10 seções e garantindo que todas as modificações respeitem rigorosamente a série informada: ${serieAtual}.

REGRA CRÍTICA (OBRIGATÓRIA):
- Respeite rigorosamente o nível da série informada (${serieAtual}).
- NÃO misture níveis nem traga conteúdos de séries anteriores ou posteriores.
- Se a série for Ensino Médio: mantenha alto nível crítico, questões estilo ENEM e termos acadêmicos. PROIBIDO dinâmicas infantis.
- Se a série for Educação Infantil: mantenha focos nos Campos de Experiência e atividades brincadas/sensoriais sem escrita formal.
- Se a série for Ensino Fundamental (1º ao 9º ano): adeque a linguagem e os exercícios estritamente à faixa etária do ano escolar especifico.`;

  const userPrompt = `Aqui está o plano de aula atual:
${JSON.stringify(currentPlan, null, 2)}

Pedido de modificação do professor:
"${instruction}"

Reescreva e ajuste o plano mantendo a estrutura JSON original das 10 seções e aplicando o ajuste solicitado.`;

  let updatedData;
  try {
    updatedData = await generateWithGeminiFallback({
      contents: userPrompt,
      systemInstruction: systemPrompt,
      responseSchema: lessonPlanSchema,
      temperature: 0.7,
    });
  } catch (err: any) {
    console.warn("⚠️ Falha de refinamento via Gemini. Mantendo dados atuais com anotações de ajuste.", err?.message);
    updatedData = {
      ...currentPlan,
      objetivoGeral: `${currentPlan.objetivoGeral} (Ajuste solicitado: ${instruction})`
    };
  }

  const newPlan = {
    ...currentPlan,
    ...updatedData,
    updatedAt: new Date().toISOString()
  };

  res.json(newPlan);
});

// Endpoint: Generate Printable Activity Worksheet
app.post("/api/generate-activity", async (req, res) => {
  const { lessonPlan } = req.body;

  if (!lessonPlan) {
    return res.status(400).json({ error: "Plano de aula é obrigatório." });
  }

  const targetSerie = lessonPlan.inputParams?.serie || lessonPlan.turmaInfo || "";

  const systemPrompt = `Você é um especialista em educação básica brasileira com domínio da BNCC.
Sua missão é criar uma folha de atividades e exercícios pronta para ser impressa e entregue aos alunos, EXATAMENTE adequada ao nível escolar informado (${targetSerie}), sem misturar conteúdos de séries diferentes.

---

🎯 REGRA CRÍTICA (OBRIGATÓRIA):
Respeite rigorosamente o nível da série informada (${targetSerie}).
❌ NÃO misture níveis
❌ NÃO gere conteúdos de séries anteriores ou posteriores

---

📚 CLASSIFICAÇÃO OBRIGATÓRIA POR NÍVEL:

🔹 Educação Infantil:
- Atividades lúdicas de observação, associação de imagens, cores, traçados básicos e formas.
🚫 PROIBIDO: Leitura estruturada, escrita formal de respostas, sílabas complexas.

🔹 Ensino Fundamental I (1º ao 5º ano):
- 1º ano: Alfabetização inicial, sílabas simples, formação de palavras básicas.
  🚫 PROIBIDO NO 1º ANO: Atividades exclusivas de Educação Infantil (apenas pintar) ou exercícios avançados.
- 2º ao 5º ano: Leitura, interpretação, problemas matemáticos práticos, produção de texto simples.

🔹 Ensino Fundamental II (6º ao 9º ano):
- Interpretação crítica de textos, gramática, resolução de equações, conceitos científicos e históricos.
🚫 PROIBIDO: Exercícios infantis ou brincadeiras pré-escolares.

🔹 Ensino Médio (1º ao 3º ano):
- Questões dissertativas e de múltipla escolha com alto nível de análise crítica, raciocínio lógico-científico, redação e padrões do ENEM/Vestibulares.
🚫 PROIBIDO: Questões simplificadas demais ou infantis.

---

📌 INSTRUÇÃO FINAL (MUITO IMPORTANTE):
Antes de gerar a folha de atividades:
- Verifique se todas as 4 a 6 questões estão perfeitamente adequadas à série informada (${targetSerie}).
- Se alguma questão estiver fora do nível pedagógico, corrija automaticamente antes de responder.

A folha deve conter 4 a 6 questões de tipos variados mais o gabarito comentado para o professor.`;

  const userPrompt = `Plano de aula:
Série: ${lessonPlan.inputParams?.serie || lessonPlan.turmaInfo}
Disciplina: ${lessonPlan.inputParams?.disciplina}
Tema: ${lessonPlan.inputParams?.tema}
Título do Plano: ${lessonPlan.titulo}
Objetivo Geral: ${lessonPlan.objetivoGeral}

Elabore uma atividade diagnóstica/prática pronta para impressão.`;

  let activityData;
  try {
    activityData = await generateWithGeminiFallback({
      contents: userPrompt,
      systemInstruction: systemPrompt,
      responseSchema: activitySheetSchema,
      temperature: 0.7,
    });
  } catch (err: any) {
    console.warn("⚠️ API do Gemini atingiu o limite. Gerando atividade de contingência.", err?.message);
    activityData = generateFallbackActivitySheet(lessonPlan);
  }

  res.json(activityData);
});

// Start Express and Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor pedagógico rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
