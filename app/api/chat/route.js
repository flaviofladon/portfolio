import { buildSystemPrompt } from "@/lib/config";

// Modelo usado no chat do site. Haiku é rápido e barato — ideal para
// responder perguntas objetivas de recrutadores. Troque para
// "claude-sonnet-5" se quiser respostas mais elaboradas (custa mais por chamada).
const MODEL = "claude-haiku-4-5-20251001";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Mensagens inválidas." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY não configurada no ambiente.");
      return Response.json(
        { error: "Chat indisponível: chave de API não configurada no servidor." },
        { status: 500 }
      );
    }

    // Limita o histórico enviado (economiza tokens em conversas longas)
    const trimmed = messages.slice(-16);

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: buildSystemPrompt(),
        messages: trimmed,
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Erro da API Anthropic:", anthropicRes.status, errText);
      return Response.json(
        { error: "Não foi possível obter resposta agora. Tente novamente em instantes." },
        { status: 502 }
      );
    }

    const data = await anthropicRes.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json({
      reply: reply || "Não consegui gerar uma resposta agora. Tente reformular a pergunta.",
    });
  } catch (err) {
    console.error("Erro no /api/chat:", err);
    return Response.json({ error: "Erro interno ao processar a mensagem." }, { status: 500 });
  }
}
