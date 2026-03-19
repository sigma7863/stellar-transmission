import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type SceneCanvasProps = {
  reducedMotion: boolean;
};

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
};

export default function SceneCanvas({ reducedMotion }: SceneCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    if (!supportsWebGL()) {
      setWebglReady(false);
      return;
    }

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020817, 0.08);

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.15, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x89d0ff, 0.7);
    const point = new THREE.PointLight(0x2ed8ff, 4.2, 18, 2);
    point.position.set(2.6, 1.8, 2.4);
    const accent = new THREE.PointLight(0xffcc7a, 2.2, 12, 2);
    accent.position.set(-2.4, -1.2, 2.8);
    scene.add(ambient, point, accent);

    const starCount = window.innerWidth < 768 ? 900 : 1800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i += 1) {
      const stride = i * 3;
      starPositions[stride] = (Math.random() - 0.5) * 18;
      starPositions[stride + 1] = (Math.random() - 0.5) * 12;
      starPositions[stride + 2] = (Math.random() - 0.5) * 18;
      starSizes[i] = Math.random() * 1.6 + 0.2;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xc9f1ff,
      size: reducedMotion ? 0.012 : 0.016,
      transparent: true,
      opacity: 0.88,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x2ed8ff,
      transparent: true,
      opacity: 0.24,
      wireframe: true,
    });
    const ringOne = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.028, 16, 180), ringMaterial);
    ringOne.rotation.x = Math.PI / 2.6;
    ringOne.rotation.y = Math.PI / 6;
    scene.add(ringOne);

    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.018, 16, 180),
      ringMaterial.clone(),
    );
    (ringTwo.material as THREE.MeshBasicMaterial).opacity = 0.16;
    ringTwo.rotation.x = Math.PI / 2.1;
    ringTwo.rotation.z = Math.PI / 8;
    scene.add(ringTwo);

    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0x64c9ff,
        emissive: 0x0e7ab6,
        emissiveIntensity: 0.6,
        metalness: 0.2,
        roughness: 0.18,
        transparent: true,
        opacity: 0.14,
        wireframe: true,
      }),
    );
    globe.position.y = 0.12;
    scene.add(globe);

    const pathGeometry = new THREE.BufferGeometry();
    const pathPoints = [];
    for (let i = -12; i <= 12; i += 1) {
      pathPoints.push(new THREE.Vector3(i * 0.35, Math.sin(i * 0.22) * 0.18, -4 + i * 0.12));
    }
    pathGeometry.setFromPoints(pathPoints);
    const pathLine = new THREE.Line(
      pathGeometry,
      new THREE.LineBasicMaterial({ color: 0xffcc7a, transparent: true, opacity: 0.72 }),
    );
    pathLine.position.y = -1.2;
    scene.add(pathLine);

    const streakCount = 28;
    const streaks = new THREE.Group();
    for (let i = 0; i < streakCount; i += 1) {
      const streak = new THREE.Mesh(
        new THREE.PlaneGeometry(0.02, Math.random() * 1.2 + 0.8),
        new THREE.MeshBasicMaterial({
          color: i % 3 === 0 ? 0xffcc7a : 0x2ed8ff,
          transparent: true,
          opacity: 0.18,
          side: THREE.DoubleSide,
        }),
      );
      streak.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, -3 - Math.random() * 4);
      streak.rotation.z = Math.random() * Math.PI;
      streaks.add(streak);
    }
    scene.add(streaks);

    const clock = new THREE.Clock();
    let frameId = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onResize = () => {
      if (!mountRef.current) {
        return;
      }
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const motionScale = reducedMotion ? 0.22 : 1;

      stars.rotation.y = elapsed * 0.035 * motionScale;
      stars.rotation.x = elapsed * 0.01 * motionScale;
      ringOne.rotation.z = elapsed * 0.18 * motionScale;
      ringTwo.rotation.z = -elapsed * 0.1 * motionScale;
      globe.rotation.y = elapsed * 0.22 * motionScale;
      globe.rotation.x = Math.sin(elapsed * 0.5) * 0.08 * motionScale;
      streaks.position.z = (elapsed * 0.8 * motionScale) % 3;

      const targetX = pointerRef.current.x * 0.32;
      const targetY = pointerRef.current.y * 0.18;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += ((targetY + 0.15) - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeChild(renderer.domElement);

      starGeometry.dispose();
      starMaterial.dispose();
      ringOne.geometry.dispose();
      ringTwo.geometry.dispose();
      (ringTwo.material as THREE.Material).dispose();
      (ringOne.material as THREE.Material).dispose();
      globe.geometry.dispose();
      (globe.material as THREE.Material).dispose();
      pathGeometry.dispose();
      (pathLine.material as THREE.Material).dispose();
      streaks.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [reducedMotion]);

  if (!webglReady) {
    return (
      <div className="scene-fallback">
        <div className="scene-fallback__ring" />
        <div className="scene-fallback__copy">
          <span>VISUAL CHANNEL</span>
          <strong>Static orbit fallback active</strong>
        </div>
      </div>
    );
  }

  return <div ref={mountRef} className="scene-canvas" aria-hidden="true" />;
}
