import { CONFIG } from "@/lib/config";

export default function About() {
  return (
    <section id="sobre">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <div className="section-head">
              <span className="section-num mono">01</span>
              <h2>Sobre</h2>
            </div>
            <div className="about-text">
              <p>{CONFIG.resumo}</p>
            </div>
          </div>
          <div className="facts">
            <div className="fact-row">
              <span className="k">LOCAL</span>
              <span className="v">{CONFIG.local}</span>
            </div>
            <div className="fact-row">
              <span className="k">EXPERIÊNCIA</span>
              <span className="v">{CONFIG.anosExperiencia} anos</span>
            </div>
            <div className="fact-row">
              <span className="k">MODELO</span>
              <span className="v">{CONFIG.disponibilidade}</span>
            </div>
            <div className="fact-row">
              <span className="k">FORMAÇÃO</span>
              <span className="v">Eng. de Software (cursando)</span>
            </div>
            <div className="fact-row">
              <span className="k">IDIOMAS</span>
              <span className="v">PT nativo · EN {CONFIG.ingles}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
