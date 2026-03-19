import { featureCards } from "../../lib/content";

export default function SystemsSection() {
  return (
    <section className="content-section section-shell" data-section="systems">
      <div className="content-section__intro" data-reveal>
        <p className="section-kicker">Core Systems</p>
        <h2>Three modules coordinate the atmosphere of the experience.</h2>
      </div>

      <div className="systems-grid">
        {featureCards.map((card) => (
          <article key={card.index} className="system-card" data-system-card data-reveal>
            <div className="system-card__glow" data-system-glow />
            <div className="system-card__border" data-system-border />
            <span className="system-card__index">{card.index}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <small>{card.metrics}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
