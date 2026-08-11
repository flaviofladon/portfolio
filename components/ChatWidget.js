"use client";
import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";

const SUGESTOES = [
  "Quais tecnologias ele domina?",
  "Já trabalhou com e-commerce?",
  "Como falar com ele diretamente?",
  "Tem experiência com IA?",
];

export default function ChatWidget({ open, onOpen, onClose }) {
  const [messages, setMessages] = useState([]); // {role, content}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bodyRef = useRef(null);
  const textareaRef = useRef(null);
  const primeiroNome = CONFIG.nome.split(" ")[0];

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Oi! 👋 Posso te contar sobre a experiência, o stack e os projetos do ${primeiroNome}. O que você quer saber?`,
        },
      ]);
    }
    if (open) textareaRef.current?.focus();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  async function send(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Falha ao obter resposta.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(
        "Não consegui me conectar agora. Tente novamente em alguns segundos, ou fale direto pelo WhatsApp/e-mail no rodapé do site."
      );
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  if (!open) {
    return (
      <button id="chat-launcher" onClick={onOpen}>
        <span className="pulse"></span> Falar com o assistente
      </button>
    );
  }

  return (
    <div className="chat-panel">
      <div className="chat-head">
        <div className="av">FS</div>
        <div className="ti">
          <div className="n">Assistente do {primeiroNome}</div>
          <div className="s">
            <span className="led"></span> responde na hora, com base no currículo real
          </div>
        </div>
        <button onClick={onClose} aria-label="Fechar">
          ✕
        </button>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div className={`msg ${m.role === "user" ? "user" : "bot"}`} key={i}>
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {error && <div className="msg err">{error}</div>}
      </div>

      {messages.length <= 1 && (
        <div className="chips">
          {SUGESTOES.map((q) => (
            <span className="chip" key={q} onClick={() => send(q)}>
              {q}
            </span>
          ))}
        </div>
      )}

      <div className="chat-input">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder={`Pergunte sobre a experiência do ${primeiroNome}…`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => send(input)} disabled={loading} aria-label="Enviar">
          ➤
        </button>
      </div>
    </div>
  );
}
