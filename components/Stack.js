import { CONFIG } from "@/lib/config";

export default function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <div className="section-head">
          <span className="section-num mono">02</span>
          <h2>Stack técnica</h2>
        </div>
        <div className="stack-groups">
          {CONFIG.stack.map((s) => (
            <div className="stack-card" key={s.grupo}>
              <span className="k mono">{s.grupo}</span>
              <div className="tags">
                {s.itens.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
