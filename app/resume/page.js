import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { getSiteUrl } from "@/lib/site";
import styles from "./resume.module.css";

const FULL_NAME = "Flavio Santiago Siqueira";

export const metadata = {
  title: `Currículo ATS | ${FULL_NAME} | Full Stack Developer`,
  description:
    "Currículo profissional de Flavio Santiago Siqueira: Full Stack Developer com experiência em PHP, Laravel, JavaScript, React, Next.js, Node.js, WordPress, Python, APIs REST, MySQL, QA e SEO técnico.",
  alternates: {
    canonical: "/resume",
  },
};

function renderJsonLd() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteUrl}/resume`,
    name: `Currículo profissional de ${FULL_NAME}`,
    description: CONFIG.resumo,
    mainEntity: {
      "@type": "Person",
      name: FULL_NAME,
      alternateName: CONFIG.nome,
      jobTitle: "Full Stack Developer",
      description: CONFIG.resumo,
      email: `mailto:${CONFIG.email}`,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Curitiba",
        addressRegion: "PR",
        addressCountry: "BR",
      },
      sameAs: [CONFIG.linkedin, CONFIG.github],
      knowsAbout: CONFIG.stack.flatMap((group) => group.itens),
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: CONFIG.instituicao,
      },
    },
  };

  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd() }}
      />

      <main className={styles.page}>
        <div className={styles.topbar}>
          <Link href="/" className={styles.backLink}>
            ← Voltar ao portfólio
          </Link>

          <div className={styles.downloads}>
            <a
              href={CONFIG.curriculoPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              Currículo PDF
            </a>

            <a href="/curriculo-flavio-siqueira-ats.docx">
              Currículo ATS (.docx)
            </a>
          </div>
        </div>

        <article className={styles.resume}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>CURRÍCULO / ATS FRIENDLY</p>

            <h1>{FULL_NAME}</h1>

            <p className={styles.title}>
              Full Stack Developer | Desenvolvedor Full Stack
            </p>

            <p className={styles.keywords}>
              PHP · Laravel · JavaScript · React · Next.js · Vue.js · Node.js ·
              WordPress · Python · REST APIs · MySQL · Git · Selenium
            </p>

            <address className={styles.contact}>
              <span>Curitiba, PR, Brasil</span>
              <span>Remoto, híbrido ou presencial</span>

              <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>

              <a
                href={`https://wa.me/${CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                +55 41 98881-1435
              </a>

              <a
                href={CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

              <a
                href={CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </address>
          </header>

          <section className={styles.section}>
            <h2>Resumo profissional</h2>
            <p>{CONFIG.resumo}</p>
          </section>

          <section className={styles.section}>
            <h2>Competências técnicas</h2>

            {CONFIG.stack.map((group) => (
              <p key={group.grupo}>
                <strong>{group.grupo}:</strong> {group.itens.join(", ")}
              </p>
            ))}

            <p>
              <strong>QA e testes:</strong> testes funcionais, Selenium,
              validação de responsividade, compatibilidade entre navegadores,
              correção de bugs e suporte a entregas em produção.
            </p>

            <p>
              <strong>Cloud e ferramentas:</strong> Git, Google Cloud Platform
              (GCP), Google Analytics, Google Search Console e Google Tag
              Manager.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Experiência profissional</h2>

            {CONFIG.experiencias.map((experience) => (
              <article className={styles.job} key={experience.empresa}>
                <h3>
                  {experience.empresa} — {experience.cargo}
                </h3>

                <p className={styles.meta}>{experience.periodo}</p>

                <ul>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}

            <div className={styles.previous}>
              <h3>Experiência anterior</h3>
              <p>{CONFIG.experienciaAnterior}</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Projetos selecionados</h2>

            <div className={styles.projects}>
              {CONFIG.projetos.map((project) => (
                <article key={project.nome} className={styles.project}>
                  <h3>{project.nome}</h3>
                  <p className={styles.meta}>{project.tipo}</p>
                  <p>{project.desc}</p>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.url}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Formação</h2>

            <p>
              <strong>{CONFIG.formacao}</strong>
              <br />
              {CONFIG.instituicao}
            </p>
          </section>

          <section className={styles.section}>
            <h2>Idiomas</h2>

            <p>
              Português nativo
              <br />
              Inglês {CONFIG.ingles}
            </p>
          </section>

          <section className={styles.section}>
            <h2>Termos profissionais relacionados</h2>

            <p className={styles.terms}>
              Full Stack Developer · Desenvolvedor Full Stack · PHP Developer ·
              Laravel Developer · WordPress Developer · Front-end Developer ·
              Back-end Developer · React Developer · Next.js Developer · Web
              Developer · API Integration · Software Engineering · QA Web ·
              Technical SEO
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
