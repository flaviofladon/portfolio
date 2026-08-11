import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/config";

// Modelo usado no chat do portfólio.
// gpt-5-mini é rápido e econômico para perguntas objetivas.
const MODEL = "gpt-5-mini";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Mensagens inválidas." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY não configurada no ambiente.");

      return Response.json(
        {
          error:
            "Chat indisponível: chave de API não configurada no servidor.",
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    // Limita o histórico enviado para economizar tokens
    // em conversas mais longas.
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
        { error: "Nenhuma mensagem válida encontrada." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: MODEL,

      instructions: buildSystemPrompt(),

      input: trimmed,

      max_output_tokens: 500,

      // Não precisamos armazenar as respostas na OpenAI
      // para esse chat do portfólio.
      store: false,
    });

    const reply = response.output_text?.trim();

    return Response.json({
      reply:
        reply ||
        "Não consegui gerar uma resposta agora. Tente reformular a pergunta.",
    });
  } catch (err) {
    console.error("Erro no /api/chat com OpenAI:", err);

    return Response.json(
      {
        error:
          "Não foi possível obter resposta agora. Tente novamente em instantes.",
      },
      { status: 500 }
    );
  }
}