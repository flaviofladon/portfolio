import { CONFIG } from "@/lib/config";

function iconFor(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

export default function Projects() {
  return (
    <section id="projetos">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num mono">04</span>
          <h2>Projetos em produção</h2>
        </div>
        <div className="proj-grid">
          {CONFIG.projetos.map((p) => (
            <div className="proj-card" key={p.nome}>
              <div className="proj-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconFor(p.url)} alt="" />
                <div className="names">
                  <div className="n">{p.nome}</div>
                  <div className="t mono">{p.tipo}</div>
                </div>
              </div>
              <p>{p.desc}</p>
              <a className="proj-link" href={p.url} target="_blank" rel="noopener noreferrer">
                Ver no ar
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 9L9 3M9 3H4M9 3V8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
