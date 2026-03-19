export type FeatureCard = {
  index: string;
  title: string;
  body: string;
  metrics: string;
};

export type GallerySignal = {
  label: string;
  title: string;
  body: string;
};

export const featureCards: FeatureCard[] = [
  {
    index: "01",
    title: "Navigation Layer",
    body: "A cinematic approach channel that makes each scroll step feel like a controlled orbit insertion.",
    metrics: "Parallax / HUD / Drift",
  },
  {
    index: "02",
    title: "Signal Mesh",
    body: "Panels react like instrumentation consoles, with motion tuned to feel mechanical rather than decorative.",
    metrics: "Hover / Sweep / Pulse",
  },
  {
    index: "03",
    title: "Terminal Finish",
    body: "The final transmission compresses all light and type into a single focused destination cue.",
    metrics: "Focus / Collapse / Release",
  },
];

export const gallerySignals: GallerySignal[] = [
  {
    label: "Signal A",
    title: "Vector Bloom",
    body: "A scanline fragment where geometry pulses against a cold navigation grid.",
  },
  {
    label: "Signal B",
    title: "Quiet Orbit",
    body: "Minimal type and slow drift create tension without losing forward motion.",
  },
  {
    label: "Signal C",
    title: "Atmospheric Entry",
    body: "Layered gradients and streaks simulate descent into a controlled data storm.",
  },
  {
    label: "Signal D",
    title: "Last Beacon",
    body: "The closing frame reduces the interface to one bright command and one clear path.",
  },
];
