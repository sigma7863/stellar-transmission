# Stellar Transmission

Stellar Transmission is a one-page futuristic showcase site built with Bun, Vite, React, TypeScript, Three.js, and GSAP.

The visual direction is a near-future orbital interface: cold light, scanline panels, motion-driven sections, and a code-generated 3D hero scene without imported image or model assets.

## Stack

- Bun
- Vite
- React
- TypeScript
- Three.js
- GSAP

## Features

- Full-screen Three.js hero scene with stars, orbital rings, route lines, and pointer-based parallax
- GSAP-driven intro motion, scroll reveals, card hover transitions, and final seal animation
- Responsive one-page layout for desktop-first viewing with mobile support
- Reduced motion handling
- WebGL fallback state for unsupported environments

## Getting Started

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun dev
```

Open:

```text
http://localhost:5173/
```

## Build

Create a production build:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Project Structure

```text
src/
  components/
    SceneCanvas.tsx
    sections/
  lib/
    content.ts
    motion.ts
  App.tsx
  index.css
  main.tsx
```

## Notes

- The site is intentionally asset-light and relies on code-generated visuals.
- The Three.js bundle builds successfully, though it may still trigger Vite's chunk size warning depending on dependency versions.
