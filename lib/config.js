// ============================================================
// ⚙️  EDITE SEUS DADOS AQUI — tudo que aparece no site vem deste objeto
// ============================================================
export const CONFIG = {
  nome: "Flavio Siqueira",
  cargo: "Desenvolvedor Full Stack PHP",
  local: "Curitiba, PR — Brasil",
  disponibilidade: "Remoto, híbrido ou presencial",
  email: "flaviofladon@gmail.com",
  whatsapp: "5541988811435", // formato: 55 + DDD + número
  linkedin: "https://www.linkedin.com/in/flavio-ssantiago/",
  github: "https://github.com/flaviofladon",
  anosExperiencia: 12,
  ingles: "[definir nível: básico / intermediário / avançado]",
  instituicao: "[nome da instituição]",
  curriculoPdf: "/curriculo-flavio-siqueira.pdf",

  resumo:
    "Desenvolvedor Full Stack com 12 anos de experiência em PHP e Laravel, entregando e-commerces, sistemas web e plataformas de conteúdo de ponta a ponta. Front-end em Vue.js 3, React e Next.js. Atua também com Python para automação, extração de dados e integração de recursos de IA em aplicações web. Histórico consistente em performance e SEO técnico, com sites entregues na faixa de 1 a 2,8 segundos de carregamento.",

  stack: [
    { grupo: "Back-end", itens: ["PHP", "Laravel", "Node.js", "APIs REST", "WordPress", "MySQL"] },
    { grupo: "Front-end", itens: ["JavaScript", "Vue.js 3", "React", "Next.js", "HTML5", "CSS3", "Tailwind", "Bootstrap", "Sass"] },
    { grupo: "IA e dados", itens: ["Python", "Integração de APIs de IA", "Web scraping", "Machine Learning (fundamentos)"] },
    { grupo: "Performance & SEO", itens: ["Core Web Vitals", "SEO técnico", "Tag Manager", "Search Console", "Analytics"] },
  ],

  experiencias: [
    {
      versao: "v2024.06 — atual",
      empresa: "Mukutu Consultoria e Desenvolvimento de Software",
      cargo: "Desenvolvedor Full Stack",
      periodo: "jun/2024 – atual · São Paulo, SP (Remoto)",
      atual: true,
      bullets: [
        "Desenvolve soluções digitais completas com Node.js, PHP e JavaScript, do levantamento de requisitos à entrega em produção.",
      ],
    },
    {
      versao: "v2019.08 – v2024.05",
      empresa: "Mercado Binário",
      cargo: "Desenvolvedor Full Stack",
      periodo: "ago/2019 – mai/2024 · Curitiba, PR",
      bullets: [
        "Desenvolveu e manteve e-commerces, sistemas e landing pages em PHP, Laravel e WordPress, com front-end em Vue.js 3, React e Next.js.",
        "Reduziu o tempo de carregamento das páginas para a faixa de 1 a 2,8 segundos por meio de otimização de código, imagens e assets.",
        "Construiu APIs REST em Laravel para integração entre sistemas e front-ends, e plugins WordPress sob medida por projeto.",
        "Executou SEO técnico avançado, sustentando o ranqueamento orgânico da carteira de projetos.",
      ],
    },
    {
      versao: "v2016.01 – v2019.07",
      empresa: "Hagens",
      cargo: "Desenvolvedor Full Stack",
      periodo: "jan/2016 – jul/2019 · São Paulo, SP (Remoto)",
      bullets: [
        "Desenvolveu aplicações web em PHP com front-end em JavaScript e Vue.js 3.",
        "Automatizou rotinas de extração de dados com Python, substituindo coletas manuais.",
        "Implementou testes funcionais automatizados com Selenium.",
      ],
    },
  ],

  experienciaAnterior:
    "Antes disso: Agente de TI / Desenvolvedor na Britânia (2012–2014) e Assistente Administrativo/TI - Web Designer na Prefeitura de Pinhais (2011–2012).",

  projetos: [
    { nome: "Athena Store", tipo: "E-commerce · Autopeças", desc: "Loja virtual de rodas esportivas e acessórios automotivos, no ar há mais de 4 anos.", url: "https://www.athenastore.com.br/" },
    { nome: "Eibach Store", tipo: "E-commerce · Autopeças", desc: "E-commerce especializado em molas e suspensão esportiva Eibach.", url: "https://www.eibachstore.com.br/" },
    { nome: "MWM Motores", tipo: "Institucional · Indústria", desc: "Site institucional de multinacional fabricante de motores diesel e geradores.", url: "https://mwm.com.br/" },
    { nome: "AGL Incorporadora", tipo: "Institucional · Engenharia civil", desc: "Site institucional de incorporadora e engenharia civil em Curitiba.", url: "https://agl.eng.br/" },
    { nome: "eNutri", tipo: "E-commerce · Saúde", desc: "E-commerce de nutrição clínica e suplementação, com marcas como Nestlé e Danone.", url: "https://enutri.com.br/" },
    { nome: "Bomba Certa", tipo: "App Android · Mobilidade", desc: "App que compara preços de combustível por geolocalização e traça rota até o posto.", url: "https://baixeagora.bombacerta.com.br/" },
  ],
};

// Prompt de sistema do assistente de IA — usa só os dados acima, nunca inventa
export function buildSystemPrompt() {
  const primeiroNome = CONFIG.nome.split(" ")[0];
  return `Você é o assistente virtual do portfólio de ${CONFIG.nome}, ${CONFIG.cargo} com ${CONFIG.anosExperiencia} anos de experiência.

SEU PAPEL: ajudar recrutadores e pessoas contratantes a entenderem a experiência, as habilidades e os projetos de ${primeiroNome}. Responda SEMPRE na terceira pessoa sobre ele (nunca finja ser ele, você é o assistente do portfólio). Seja direto, cordial e objetivo — respostas curtas (2 a 5 frases), sem enrolação. Responda em português do Brasil, a menos que a pessoa escreva em outro idioma, e nesse caso responda no idioma dela.

REGRAS IMPORTANTES:
- Use APENAS as informações abaixo. Nunca invente experiências, empresas, números, certificações ou pretensão salarial que não estejam listados.
- Se perguntarem algo que não está nas informações (disponibilidade exata de datas, pretensão salarial, dados pessoais), diga que não tem essa informação e sugira contato direto (WhatsApp ou e-mail, ambos disponíveis no site).
- Se a pergunta não tiver relação com a candidatura do Flavio, responda educadamente que seu papel aqui é falar sobre a experiência profissional dele, e redirecione.
- Incentive o recrutador a entrar em contato direto para os próximos passos.

DADOS REAIS DE ${CONFIG.nome.toUpperCase()}:

Resumo: ${CONFIG.resumo}

Localização: ${CONFIG.local}. Disponibilidade: ${CONFIG.disponibilidade}.
Idiomas: Português nativo, Inglês ${CONFIG.ingles}.
Formação: Bacharelado em Engenharia de Software, ${CONFIG.instituicao}, cursando.

Stack técnica:
${CONFIG.stack.map((s) => `- ${s.grupo}: ${s.itens.join(", ")}`).join("\n")}

Experiência profissional (mais recente primeiro):
${CONFIG.experiencias.map((e) => `- ${e.empresa} (${e.cargo}), ${e.periodo}. ${e.bullets.join(" ")}`).join("\n")}
${CONFIG.experienciaAnterior}

Projetos em produção (desenvolvidos do zero, sozinho):
${CONFIG.projetos.map((p) => `- ${p.nome} (${p.tipo}): ${p.desc} — ${p.url}`).join("\n")}

Contato: e-mail ${CONFIG.email}, WhatsApp disponível pelo botão de contato do site.`;
}
