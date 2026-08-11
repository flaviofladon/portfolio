"use client";
import { CONFIG } from "@/lib/config";

export default function Nav({ onOpenChat }) {
  return (
    <nav>
      <div className="wrap">
        <div className="brand">
          <span className="dot"></span> {CONFIG.nome}
        </div>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#stack">Stack</a>
          <a href="#experiencia">Experiência</a>
          <a href="#projetos">Projetos</a>
          <button className="cta-nav" onClick={onOpenChat}>
            💬 Falar com o assistente
          </button>
        </div>
      </div>
    </nav>
  );
}
