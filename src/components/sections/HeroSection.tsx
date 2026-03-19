type HeroSectionProps = {
  reducedMotion: boolean;
};

export default function HeroSection({ reducedMotion }: HeroSectionProps) {
  return (
    <section className="hero section-shell">
      <div className="hero__content">
        <p className="section-kicker" data-kicker>
          Orbital Interface 01
        </p>
        <h1 className="hero__title">
          <span data-hero-title>Stellar</span>
          <span data-hero-title>Transmission</span>
        </h1>
        <p className="hero__copy" data-hero-copy>
          A one-page navigation ritual built with Three.js and GSAP. Cold light,
          precise motion, and a controlled descent through a fictional command
          interface.
        </p>
        <div className="hero__chips">
          <span data-hero-chip>Three.js Scene</span>
          <span data-hero-chip>GSAP Scroll Logic</span>
          <span data-hero-chip>Responsive TypeScript Build</span>
        </div>
      </div>

      <aside className="hero__panel panel" data-hero-panel>
        <div className="panel__header">
          <span>Telemetry</span>
          <span>{reducedMotion ? "Reduced Motion" : "Live Motion"}</span>
        </div>
        <div className="panel__grid">
          <div>
            <small>Trajectory</small>
            <strong>Helios Arc</strong>
          </div>
          <div>
            <small>Velocity</small>
            <strong>0.84 c</strong>
          </div>
          <div>
            <small>Signal Gain</small>
            <strong>+27 dB</strong>
          </div>
          <div>
            <small>Frame Sync</small>
            <strong>Stabilized</strong>
          </div>
        </div>
        <div className="panel__scan" />
      </aside>
    </section>
  );
}
