import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SectionMotionConfig = {
  selector: string;
  y?: number;
  scrub?: boolean;
};

export const setupPageMotion = (
  root: HTMLElement,
  reducedMotion: boolean,
): (() => void) => {
  if (reducedMotion) {
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTimeline
    .from("[data-kicker]", { y: 24, opacity: 0, duration: 0.7 })
    .from(
      "[data-hero-title]",
      { y: 48, opacity: 0, duration: 1.1, stagger: 0.08 },
      "-=0.35",
    )
    .from(
      "[data-hero-copy]",
      { y: 28, opacity: 0, duration: 0.8 },
      "-=0.55",
    )
    .from(
      "[data-hero-chip]",
      { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 },
      "-=0.4",
    )
    .from(
      "[data-hero-panel]",
      { x: 40, opacity: 0, duration: 0.9 },
      "-=0.75",
    );

  const sectionConfigs: SectionMotionConfig[] = [
    { selector: "[data-section='approach']", y: 80, scrub: true },
    { selector: "[data-section='systems']", y: 72 },
    { selector: "[data-section='gallery']", y: 72 },
    { selector: "[data-section='final']", y: 48 },
  ];

  sectionConfigs.forEach(({ selector, y, scrub }) => {
    const element = root.querySelector<HTMLElement>(selector);
    if (!element) {
      return;
    }

    gsap.fromTo(
      element.querySelectorAll("[data-reveal]"),
      { y: y ?? 56, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 78%",
          end: scrub ? "bottom center" : undefined,
          scrub: scrub ? 0.8 : false,
        },
      },
    );
  });

  const cleanupCallbacks: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>("[data-system-card]").forEach((card) => {
    const glow = card.querySelector<HTMLElement>("[data-system-glow]");
    const border = card.querySelector<HTMLElement>("[data-system-border]");

    const enter = () =>
      gsap
        .timeline({ defaults: { duration: 0.35, ease: "power2.out" } })
        .to(card, { y: -8, boxShadow: "0 24px 70px rgba(41, 171, 226, 0.22)" }, 0)
        .to(glow, { opacity: 1, scale: 1.08 }, 0)
        .to(border, { opacity: 1 }, 0);

    const leave = () =>
      gsap
        .timeline({ defaults: { duration: 0.35, ease: "power2.out" } })
        .to(card, { y: 0, boxShadow: "0 16px 40px rgba(5, 19, 40, 0.12)" }, 0)
        .to(glow, { opacity: 0.45, scale: 1 }, 0)
        .to(border, { opacity: 0.42 }, 0);

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    cleanupCallbacks.push(() => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    });
  });

  const finalSeal = root.querySelector<HTMLElement>("[data-final-seal]");
  if (finalSeal) {
    gsap.fromTo(
      finalSeal,
      { scale: 0.82, opacity: 0.4, rotate: -12 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: {
          trigger: finalSeal,
          start: "top 85%",
        },
      },
    );
  }

  return () => {
    cleanupCallbacks.forEach((callback) => callback());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
};
