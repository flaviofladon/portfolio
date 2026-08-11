import OpenAI from "openai";
import { CONFIG, buildSystemPrompt } from "@/lib/config";

// Modelo usado quando a OpenAI estiver disponível.
const MODEL = "gpt-5-mini";

/**
 * Normaliza texto para facilitar a identificação de palavras-chave.
 */
function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Retorna a última mensagem enviada pelo visitante.
 */
function getLastUserMessage(messages = []) {
  const message = [...messages]
    .reverse()
    .find(
      (item) =>
        item &&
        item.role === "user" &&
        typeof item.content === "string"
    );

  return message?.content?.trim() || "";
}

/**
 * URL direta para o WhatsApp.
 */
function getWhatsappUrl() {
  const message =
    "Olá Flavio! Vim pelo seu portfólio e gostaria de conversar sobre uma oportunidade.";

  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Verifica se existe alguma das palavras no texto.
 */
function hasAny(text, words = []) {
  return words.some((word) => text.includes(normalizeText(word)));
}

/**
 * Assistente local.
 *
 * Não usa OpenAI e não gera nenhum custo.
 * Ele responde somente com informações que já existem no CONFIG.
 */
function buildFallbackReply(messages = []) {
  const originalQuestion = getLastUserMessage(messages);
  const question = normalizeText(originalQuestion);
  const primeiroNome = CONFIG.nome.split(" ")[0];

  /*
   * Contato / contratação
   */
  if (
    hasAny(question, [
      "contato",
      "whatsapp",
      "telefone",
      "email",
      "e-mail",
      "falar com",
      "contratar",
      "contratacao",
      "oportunidade",
      "entrevista",
    ])
  ) {
    return `Você pode falar diretamente com ${primeiroNome} pelo WhatsApp ou pelo e-mail ${CONFIG.email}. Os links de contato também estão disponíveis no rodapé do portfólio.`;
  }

  /*
   * Disponibilidade / localização
   */
  if (
    hasAny(question, [
      "onde mora",
      "localizacao",
      "curitiba",
      "remoto",
      "presencial",
      "hibrido",
      "disponibilidade",
      "trabalhar remoto",
    ])
  ) {
    return `${CONFIG.nome} está em ${CONFIG.local}. A disponibilidade informada no portfólio é para trabalho ${CONFIG.disponibilidade.toLowerCase()}.`;
  }

  /*
   * Tempo de experiência
   */
  if (
    hasAny(question, [
      "anos de experiencia",
      "tempo de experiencia",
      "quanto tempo",
      "experiencia profissional",
      "experiencia",
    ])
  ) {
    return `${CONFIG.nome} possui ${CONFIG.anosExperiencia} anos de experiência profissional. Sua atuação inclui desenvolvimento Full Stack, PHP, Laravel, WordPress, JavaScript, React, Next.js, Vue.js, Node.js e outras tecnologias web.`;
  }

  /*
   * WordPress
   */
  if (hasAny(question, ["wordpress", "plugin", "plugins", "tema wordpress"])) {
    return `${primeiroNome} possui experiência com WordPress, incluindo desenvolvimento e manutenção de sites, e-commerces e plugins personalizados. Também trabalha com PHP, APIs e integrações em projetos WordPress.`;
  }

  /*
   * PHP / Laravel / backend
   */
  if (
    hasAny(question, [
      "php",
      "laravel",
      "backend",
      "back-end",
      "api",
      "apis",
      "node",
      "node.js",
    ])
  ) {
    return `${primeiroNome} possui experiência em back-end com PHP, Laravel, Node.js, APIs REST, WordPress e MySQL. Na Mercado Binário, por exemplo, construiu APIs REST em Laravel e plugins WordPress sob medida para diferentes projetos.`;
  }

  /*
   * Frontend
   */
  if (
    hasAny(question, [
      "frontend",
      "front-end",
      "react",
      "next",
      "next.js",
      "vue",
      "vue.js",
      "javascript",
      "css",
      "html",
      "tailwind",
    ])
  ) {
    return `No front-end, ${primeiroNome} trabalha com JavaScript, Vue.js 3, React, Next.js, HTML5, CSS3, Tailwind, Bootstrap e Sass. Essa experiência inclui e-commerces, sistemas web, landing pages e sites institucionais.`;
  }

  /*
   * IA / Python / dados
   */
  if (
    hasAny(question, [
      "inteligencia artificial",
      "ia",
      "python",
      "machine learning",
      "scraping",
      "automacao",
      "dados",
    ])
  ) {
    return `${primeiroNome} utiliza Python para automação e extração de dados e possui experiência com integração de APIs de IA em aplicações web. Também possui fundamentos de Machine Learning e experiência com web scraping.`;
  }

  /*
   * SEO / performance
   */
  if (
    hasAny(question, [
      "seo",
      "performance",
      "velocidade",
      "core web vitals",
      "analytics",
      "search console",
    ])
  ) {
    return `${primeiroNome} também atua com performance e SEO técnico. Entre os resultados registrados no portfólio estão páginas com carregamento na faixa de 1 a 2,8 segundos, além de experiência com Core Web Vitals, Search Console, Analytics e Tag Manager.`;
  }

  /*
   * Projetos
   */
  if (
    hasAny(question, [
      "projeto",
      "projetos",
      "portfolio",
      "portfólio",
      "sites",
      "trabalhos",
      "cases",
    ])
  ) {
    const projetos = CONFIG.projetos
      .map((project) => project.nome)
      .join(", ");

    return `${primeiroNome} possui projetos em produção como ${projetos}. Você pode acessar os projetos diretamente pela seção de portfólio do site.`;
  }

  /*
   * Bomba Certa
   */
  if (hasAny(question, ["bomba certa", "combustivel", "android", "aplicativo"])) {
    const project = CONFIG.projetos.find(
      (item) => normalizeText(item.nome) === "bomba certa"
    );

    if (project) {
      return `${project.nome} é um ${project.tipo}. ${project.desc}`;
    }
  }

  /*
   * Empresas / experiências específicas
   */
  const experience = CONFIG.experiencias.find((item) => {
    const company = normalizeText(item.empresa);

    const relevantWords = company
      .split(/\s+/)
      .filter((word) => word.length >= 5);

    return relevantWords.some((word) => question.includes(word));
  });

  if (experience) {
    return `${primeiroNome} trabalhou como ${experience.cargo} na ${experience.empresa}, no período de ${experience.periodo}. ${experience.bullets.join(
      " "
    )}`;
  }

  /*
   * Formação
   */
  if (
    hasAny(question, [
      "formacao",
      "faculdade",
      "graduacao",
      "engenharia de software",
      "estudo",
    ])
  ) {
    const hasInstitution =
      CONFIG.instituicao &&
      !CONFIG.instituicao.includes("[") &&
      !CONFIG.instituicao.includes("definir");

    if (hasInstitution) {
      return `${primeiroNome} possui formação em Engenharia de Software pela ${CONFIG.instituicao}.`;
    }

    return `O portfólio informa formação em Engenharia de Software. Para detalhes adicionais sobre a instituição, recomendo falar diretamente com ${primeiroNome}.`;
  }

  /*
   * Inglês
   */
  if (hasAny(question, ["ingles", "inglês", "idioma", "english"])) {
    const hasEnglishLevel =
      CONFIG.ingles &&
      !CONFIG.ingles.includes("[") &&
      !CONFIG.ingles.includes("definir");

    if (hasEnglishLevel) {
      return `O nível de inglês informado no portfólio é ${CONFIG.ingles}.`;
    }

    return `O nível de inglês ainda não está detalhado no portfólio. Para essa informação, você pode falar diretamente com ${primeiroNome}.`;
  }

  /*
   * Pretensão salarial
   */
  if (
    hasAny(question, [
      "salario",
      "salário",
      "pretensao salarial",
      "pretensão salarial",
      "valor",
      "remuneracao",
    ])
  ) {
    return `A pretensão salarial não está informada no portfólio. Para conversar sobre remuneração e condições da oportunidade, o ideal é entrar em contato diretamente com ${primeiroNome}.`;
  }

  /*
   * Fallback genérico.
   */
  return `Estou operando em modo básico no momento. Posso responder perguntas sobre a experiência profissional de ${primeiroNome}, tecnologias, projetos, WordPress, PHP, Laravel, React, Next.js, Python, SEO e disponibilidade. Se preferir, você também pode falar diretamente com ele pelo WhatsApp.`;
}

/**
 * Retorno do modo fallback.
 *
 * Continua retornando HTTP 200 para que o frontend não interprete
 * a indisponibilidade da OpenAI como erro do chat.
 */
function fallbackResponse(messages, reason = "fallback") {
  return Response.json({
    reply: buildFallbackReply(messages),
    fallback: true,
    mode: "basic",
    reason,
    whatsappUrl: getWhatsappUrl(),
  });
}

export async function POST(request) {
  let messages = [];

  try {
    const body = await request.json();

    messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        {
          error: "Mensagens inválidas.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Se nem houver chave configurada, usa o assistente local.
     */
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.warn(
        "OPENAI_API_KEY não configurada. Usando fallback local."
      );

      return fallbackResponse(messages, "missing_api_key");
    }

    /*
     * Remove mensagens inválidas e limita o histórico.
     */
    const trimmed = messages
      .slice(-16)
      .filter(
        (message) =>
          message &&
          ["user", "assistant"].includes(message.role) &&
          typeof message.content === "string"
      )
      .map((message) => ({
        role: message.role,
        content: message.content,
      }));

    if (trimmed.length === 0) {
      return Response.json(
        {
          error: "Nenhuma mensagem válida encontrada.",
        },
        {
          status: 400,
        }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    /*
     * Tenta primeiro a OpenAI.
     */
    const response = await openai.responses.create({
      model: MODEL,
      instructions: buildSystemPrompt(),
      input: trimmed,
      max_output_tokens: 500,
      store: false,
    });

    const reply = response.output_text?.trim();

    /*
     * Caso raro em que a API respondeu mas não trouxe texto.
     */
    if (!reply) {
      console.warn(
        "OpenAI não retornou texto. Ativando fallback local."
      );

      return fallbackResponse(messages, "empty_openai_response");
    }

    /*
     * Funcionamento normal com IA.
     */
    return Response.json({
      reply,
      fallback: false,
      mode: "openai",
    });
  } catch (err) {
    /*
     * Pode ser:
     * - falta de créditos
     * - rate limit
     * - problema de rede
     * - indisponibilidade da API
     * - problema de autenticação
     * - outro erro externo
     *
     * Nenhum desses erros precisa quebrar o chat para o visitante.
     */
    console.error("Erro no /api/chat com OpenAI:", {
      status: err?.status,
      code: err?.code,
      type: err?.type,
      message: err?.message,
    });

    return fallbackResponse(messages, "openai_unavailable");
  }
}