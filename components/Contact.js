import { CONFIG } from "@/lib/config";

export default function Contact() {
  const waHref = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
    "Olá Flavio! Vi seu portfólio e gostaria de conversar sobre uma oportunidade."
  )}`;

  return (
    <>
      <section id="contato">
        <div className="wrap">
          <div className="contact-band">
            <h2>Vamos conversar sobre a próxima vaga?</h2>
            <div className="contact-actions">
              <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer">
                📱 WhatsApp
              </a>
              <a className="btn btn-ghost" href={`mailto:${CONFIG.email}`}>
                ✉️ E-mail
              </a>
              <a className="btn btn-ghost" href={CONFIG.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="btn btn-ghost" href={CONFIG.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p className="mono">
          {CONFIG.nome} · {CONFIG.local} · 2026
        </p>
      </footer>
    </>
  );
}
