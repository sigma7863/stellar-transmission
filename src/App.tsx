import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ApproachSection from "./components/sections/ApproachSection";
import FinalTransmissionSection from "./components/sections/FinalTransmissionSection";
import HeroSection from "./components/sections/HeroSection";
import SignalGallerySection from "./components/sections/SignalGallerySection";
import SystemsSection from "./components/sections/SystemsSection";
import { setupPageMotion } from "./lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SceneCanvas = lazy(() => import("./components/SceneCanvas"));

const getReducedMotionPreference = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(getReducedMotionPreference);
  const [isCompactViewport, setIsCompactViewport] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const viewportMedia = window.matchMedia("(max-width: 720px)");

    const updateReducedMotion = () => setReducedMotion(media.matches);
    const updateViewport = () => setIsCompactViewport(viewportMedia.matches);

    updateReducedMotion();
    updateViewport();

    media.addEventListener("change", updateReducedMotion);
    viewportMedia.addEventListener("change", updateViewport);

    return () => {
      media.removeEventListener("change", updateReducedMotion);
      viewportMedia.removeEventListener("change", updateViewport);
    };
  }, []);

  useGSAP(
    () => {
      if (!rootRef.current) {
        return;
      }
      return setupPageMotion(rootRef.current, reducedMotion);
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  const rootClassName = useMemo(
    () =>
      ["app-shell", reducedMotion ? "is-reduced-motion" : "", isCompactViewport ? "is-compact" : ""]
        .filter(Boolean)
        .join(" "),
    [isCompactViewport, reducedMotion],
  );

  return (
    <div ref={rootRef} className={rootClassName}>
      <div className="app-shell__backdrop" />
      <div className="app-shell__grid" />
      <div className="app-shell__noise" />

      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__dot" />
          <span>STELLAR TRANSMISSION</span>
        </div>
        <div className="topbar__status">
          <span>{reducedMotion ? "MOTION SAFE" : "LIVE ORBIT"}</span>
          <span>{isCompactViewport ? "COMPACT" : "DESKTOP"}</span>
        </div>
      </header>

      <main>
        <section className="hero-shell">
          <Suspense fallback={<div className="scene-loading" aria-hidden="true" />}>
            <SceneCanvas reducedMotion={reducedMotion} />
          </Suspense>
          <HeroSection reducedMotion={reducedMotion} />
        </section>

        <ApproachSection />
        <SystemsSection />
        <SignalGallerySection />
        <FinalTransmissionSection />
      </main>
    </div>
  );
}
