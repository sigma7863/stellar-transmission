import { gallerySignals } from "../../lib/content";

export default function SignalGallerySection() {
  return (
    <section className="content-section section-shell" data-section="gallery">
      <div className="content-section__intro" data-reveal>
        <p className="section-kicker">Signal Gallery</p>
        <h2>Fragments of a larger world, rendered without imported assets.</h2>
      </div>

      <div className="gallery-grid">
        {gallerySignals.map((signal) => (
          <article key={signal.label} className="signal-card" data-reveal>
            <div className="signal-card__noise" />
            <div className="signal-card__label">{signal.label}</div>
            <h3>{signal.title}</h3>
            <p>{signal.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
