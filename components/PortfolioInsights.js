"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { CONFIG } from "@/lib/config";

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!started) {
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    let animationFrame;

    const animate = (now) => {
      const progress = Math.min(
        (now - startTime) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setDisplayValue(
        Math.round(value * eased)
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [started, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function PortfolioInsights() {
  const totalTechnologies = useMemo(() => {
    return CONFIG.stack.reduce(
      (total, group) =>
        total + group.itens.length,
      0
    );
  }, []);

  const maxStackCount = useMemo(() => {
    return Math.max(
      ...CONFIG.stack.map(
        (group) => group.itens.length
      ),
      1
    );
  }, []);

  const projectGroups = useMemo(() => {
    const groups = {};

    CONFIG.projetos.forEach((project) => {
      const category =
        project.tipo
          ?.split("·")[0]
          ?.trim() || "Outros";

      groups[category] =
        (groups[category] || 0) + 1;
    });

    return Object.entries(groups).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, []);

  const totalProjects = CONFIG.projetos.length;

  const donutBackground = useMemo(() => {
    const palette = [
      "var(--signal)",
      "var(--rust-bright)",
      "var(--moss-bright)",
      "var(--paper)",
      "var(--muted)",
    ];

    if (!totalProjects) {
      return "var(--ink-softer)";
    }

    let cursor = 0;

    const parts = projectGroups.map(
      (group, index) => {
        const start =
          (cursor / totalProjects) * 360;

        cursor += group.value;

        const end =
          (cursor / totalProjects) * 360;

        return `${palette[index % palette.length]} ${start}deg ${end}deg`;
      }
    );

    return `conic-gradient(${parts.join(
      ", "
    )})`;
  }, [projectGroups, totalProjects]);

  return (
    <section
      id="dados"
      className="insights-section"
    >
      <div className="wrap">
        <div className="section-head">
          <span className="section-num">
            02.5
          </span>

          <h2>
            Perfil em números
          </h2>
        </div>

        <p className="insights-intro">
          Indicadores calculados diretamente a
          partir das experiências, tecnologias e
          projetos cadastrados neste portfólio.
        </p>

        <div className="metrics-grid">
          <article className="metric-card">
            <span className="metric-label mono">
              EXPERIÊNCIA
            </span>

            <strong className="metric-number">
              <AnimatedNumber
                value={
                  CONFIG.anosExperiencia
                }
              />
            </strong>

            <span className="metric-description">
              anos de experiência
            </span>
          </article>

          <article className="metric-card">
            <span className="metric-label mono">
              PROJETOS
            </span>

            <strong className="metric-number">
              <AnimatedNumber
                value={totalProjects}
              />
            </strong>

            <span className="metric-description">
              projetos destacados
            </span>
          </article>

          <article className="metric-card">
            <span className="metric-label mono">
              TECNOLOGIAS
            </span>

            <strong className="metric-number">
              <AnimatedNumber
                value={totalTechnologies}
              />
            </strong>

            <span className="metric-description">
              tecnologias listadas
            </span>
          </article>

          <article className="metric-card">
            <span className="metric-label mono">
              ÁREAS
            </span>

            <strong className="metric-number">
              <AnimatedNumber
                value={
                  CONFIG.stack.length
                }
              />
            </strong>

            <span className="metric-description">
              grupos técnicos
            </span>
          </article>
        </div>

        <div className="charts-grid">
          <article className="chart-card">
            <div className="chart-heading">
              <div>
                <span className="chart-kicker mono">
                  STACK
                </span>

                <h3>
                  Tecnologias por área
                </h3>
              </div>

              <span className="chart-total mono">
                {totalTechnologies} itens
              </span>
            </div>

            <div className="stack-chart">
              {CONFIG.stack.map(
                (group) => {
                  const count =
                    group.itens.length;

                  const width =
                    (count /
                      maxStackCount) *
                    100;

                  return (
                    <div
                      className="stack-chart-row"
                      key={group.grupo}
                    >
                      <div className="stack-chart-meta">
                        <span>
                          {group.grupo}
                        </span>

                        <strong>
                          {count}
                        </strong>
                      </div>

                      <div className="chart-track">
                        <span
                          className="chart-bar"
                          style={{
                            "--bar-width": `${width}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <p className="chart-note">
              O tamanho das barras representa
              apenas a quantidade de tecnologias
              cadastradas em cada grupo — não um
              percentual subjetivo de domínio.
            </p>
          </article>

          <article className="chart-card">
            <div className="chart-heading">
              <div>
                <span className="chart-kicker mono">
                  PORTFÓLIO
                </span>

                <h3>
                  Projetos por categoria
                </h3>
              </div>
            </div>

            <div className="project-chart-layout">
              <div
                className="donut-chart"
                style={{
                  background:
                    donutBackground,
                }}
                role="img"
                aria-label={`Distribuição dos ${totalProjects} projetos do portfólio`}
              >
                <div className="donut-center">
                  <strong>
                    {totalProjects}
                  </strong>

                  <span>
                    projetos
                  </span>
                </div>
              </div>

              <div className="donut-legend">
                {projectGroups.map(
                  (group, index) => (
                    <div
                      className="legend-row"
                      key={group.name}
                    >
                      <span
                        className={`legend-dot legend-${index}`}
                      />

                      <span className="legend-name">
                        {group.name}
                      </span>

                      <strong>
                        {group.value}
                      </strong>
                    </div>
                  )
                )}
              </div>
            </div>

            <p className="chart-note">
              Distribuição calculada
              automaticamente pelo campo
              <code> tipo </code>
              de cada projeto.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}