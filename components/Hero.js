"use client";
import { CONFIG } from "@/lib/config";

export default function Hero({ onOpenChat }) {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="eyebrow">
          ● Disponível para novas oportunidades — {CONFIG.disponibilidade}
        </div>
        <h1 className="name">{CONFIG.nome}</h1>
        <p className="role">
          <strong>{CONFIG.cargo}</strong> · {CONFIG.anosExperiencia} anos entregando sistemas
          que continuam no ar — de e-commerces a plataformas industriais.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onOpenChat}>
            💬 Perguntar ao assistente de IA
          </button>
          <a className="btn btn-ghost" href={CONFIG.curriculoPdf} download>
            ↓ Baixar currículo (PDF)
          </a>
        </div>
        <div className="status-strip">
          <div className="label mono">
            PROJETOS EM PRODUÇÃO — TODOS DESENVOLVIDOS DO ZERO
          </div>
          <div className="pills">
            {CONFIG.projetos.map((p) => (
              <a key={p.nome} className="pill" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="led"></span>
                <b>{p.nome}</b> — {p.tipo}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
