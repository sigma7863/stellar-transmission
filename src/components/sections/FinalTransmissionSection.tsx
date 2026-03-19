export default function FinalTransmissionSection() {
  return (
    <section className="final-section section-shell" data-section="final">
      <div className="final-section__copy" data-reveal>
        <p className="section-kicker">Final Transmission</p>
        <h2>Collapse the noise. Leave a single bright command.</h2>
        <p>
          The closing sequence narrows every layer into one destination signal:
          controlled light, fixed type, and a clear terminal pulse.
        </p>
      </div>

      <div className="final-section__seal" data-final-seal data-reveal>
        <div className="final-section__seal-core" />
        <span>Transmit</span>
      </div>
    </section>
  );
}
