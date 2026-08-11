import { CONFIG } from "@/lib/config";

export default function Timeline() {
  return (
    <section id="experiencia">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num mono">03</span>
          <h2>Linha do tempo</h2>
        </div>
        <div className="timeline">
          {CONFIG.experiencias.map((e) => (
            <div className={`tl-item ${e.atual ? "current" : ""}`} key={e.versao}>
              <div className="tl-dot"></div>
              <div className="tl-version mono">{e.versao}</div>
              <h3>
                {e.empresa} — {e.cargo}
              </h3>
              <div className="tl-meta">{e.periodo}</div>
              <ul className="tl-bullets">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="tl-more mono">// {CONFIG.experienciaAnterior}</p>
      </div>
    </section>
  );
}
