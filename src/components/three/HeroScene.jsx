import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, PerformanceMonitor, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { createLetters, LETTER_HEIGHT } from '../../utils/letterGeometry';

/* ==========================================================================
   HERO 3D SCENE — the glossy white "I E E E" letter drop.

   You can tune the feel of the animation with the constants below:
   ========================================================================== */
const FOV = 38;
const GRAVITY = 46; //         higher = faster, snappier fall
const RESTITUTION = 0.22; //   bounciness — low, so each letter lands with one firm settle, not a toy bounce
const MIN_IMPACT = 2.6; //     below this landing speed the letter stops bouncing
const DELAYS = [0.1, 0.32, 0.54, 0.76]; // seconds before each letter is released — tight overlap reads as one fast, choreographed assembly
const DRIFT = 1.15; //         how far each letter swoops in sideways before converging on its final spot
const FINALE_DELAY = 0.12; //  pause after the last letter lands before the light-sweep finale plays

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

/* Camera + placement so the letters always fit: right half on desktop, top area on phones. */
function computeLayout(width, height, totalWidth) {
  const aspect = width / Math.max(height, 1);
  const split = aspect >= 1.15; // desktop/tablet-landscape: text on the left, letters on the right
  const tanHalf = Math.tan(((FOV / 2) * Math.PI) / 180);

  const widthFraction = split ? 0.52 : 0.9; // share of the screen width the letters occupy
  const D = (totalWidth * 1.08) / (widthFraction * 2 * tanHalf * aspect);

  const ndcX = split ? 0.34 : 0; //   horizontal centre (-1 left … +1 right)
  const ndcY = split ? -0.02 : 0.3; // vertical centre  (-1 bottom … +1 top)

  const camY = D * 0.2;
  const axis = Math.atan(-camY / D);
  const worldYAt = (ndc) => camY + D * Math.tan(Math.atan(ndc * tanHalf) + axis);

  const lift = worldYAt(ndcY) - LETTER_HEIGHT / 2;
  const dropY = Math.max(8, worldYAt(1.25) - lift + 1); // start above the top of the screen
  const x = ndcX * D * tanHalf * aspect;

  return { D, lift, dropY, x };
}

/* ------------------------------ Ground ------------------------------------
   A quiet accent-blue glow pool and two thin platform rings — just enough to
   ground the letters on the near-black stage without competing with them. */
function Ground({ layout, totalWidth }) {
  return (
    <group position={[layout.x, layout.lift, 0]}>
      {[0.9, 0.62, 0.36].map((scale, i) => (
        <mesh key={i} rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
          <circleGeometry args={[totalWidth * scale, 64]} />
          <meshBasicMaterial
            color="#2f6bff"
            transparent
            opacity={0.05 + i * 0.015}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.005, 0]}>
        <ringGeometry args={[totalWidth * 0.78, totalWidth * 0.783, 96]} />
        <meshBasicMaterial color="#6b9cff" transparent opacity={0.3} toneMapped={false} depthWrite={false} />
      </mesh>
      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={0.5}
        scale={totalWidth * 2.2}
        blur={2.6}
        far={7}
        resolution={512}
        color="#000000"
      />
    </group>
  );
}

/* --------------------------- Finishing flourish ---------------------------
   Once the last letter lands, a bright ring pulses outward from the centre and a
   soft diagonal sheen sweeps once across the letters — the kind of finishing touch
   a premium logo reveal has, instead of just stopping dead the moment physics ends. */
function Shockwave({ layout, settleTimeRef, timeRef, totalWidth }) {
  const ref = useRef(null);
  useFrame(() => {
    const m = ref.current;
    if (!m || settleTimeRef.current == null) return;
    const t = timeRef.current - settleTimeRef.current - FINALE_DELAY;
    const dur = 1.0;
    if (t < 0 || t > dur) {
      m.visible = false;
      return;
    }
    m.visible = true;
    const p = easeOutCubic(t / dur);
    const scale = THREE.MathUtils.lerp(0.5, totalWidth * 1.15, p);
    m.scale.setScalar(scale);
    m.material.opacity = (1 - p) * 0.5;
  });
  return (
    <mesh ref={ref} position={[layout.x, layout.lift + 0.02, 0]} rotation-x={-Math.PI / 2} visible={false}>
      <ringGeometry args={[0.93, 1, 72]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} toneMapped={false} depthWrite={false} />
    </mesh>
  );
}

function Sheen({ layout, settleTimeRef, timeRef, totalWidth }) {
  const ref = useRef(null);
  useFrame(() => {
    const m = ref.current;
    if (!m || settleTimeRef.current == null) return;
    const t = timeRef.current - settleTimeRef.current - FINALE_DELAY - 0.1;
    const dur = 0.85;
    if (t < 0 || t > dur) {
      m.visible = false;
      return;
    }
    m.visible = true;
    const p = t / dur;
    const x = THREE.MathUtils.lerp(-totalWidth * 0.75, totalWidth * 0.75, p);
    m.position.set(layout.x + x, layout.lift + LETTER_HEIGHT * 0.55, 0.45);
    m.material.opacity = Math.sin(p * Math.PI) * 0.6;
  });
  return (
    <mesh ref={ref} rotation-z={0.32} visible={false}>
      <planeGeometry args={[0.55, LETTER_HEIGHT * 1.35]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/* ------------------------------ One letter -------------------------------- */
const TILT = [
  { x: 0.5, y: 0.7, z: -0.55 },
  { x: -0.4, y: -0.6, z: 0.5 },
  { x: 0.45, y: 0.5, z: -0.45 },
  { x: -0.5, y: -0.7, z: 0.6 },
];

function Letter({ letter, index, dropY, timeRef, reducedMotion, onImpact, onSettled }) {
  const ref = useRef(null);
  const sim = useRef(null);
  const dropRef = useRef(dropY);
  dropRef.current = dropY;

  useEffect(() => {
    sim.current = {
      phase: reducedMotion ? 'done' : 'wait',
      y: reducedMotion ? 0 : dropRef.current,
      vy: 0,
      sq: 0, // squash amount
      sqv: 0,
      rz: 0, // extra wobble after impacts
      rzv: 0,
      idle: 0,
    };
    if (reducedMotion) onSettled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((frame, delta) => {
    const g = ref.current;
    const s = sim.current;
    if (!g || !s) return;

    const dt = Math.min(delta, 1 / 30);
    const t = timeRef.current;

    if (s.phase === 'wait') {
      if (t < DELAYS[index]) {
        g.visible = false;
        return;
      }
      s.phase = 'fall';
      s.y = dropRef.current;
      s.vy = -2;
      g.visible = true;
    }

    if (s.phase === 'fall') {
      s.vy -= GRAVITY * dt;
      s.y += s.vy * dt;

      if (s.y <= 0) {
        const impact = -s.vy;
        s.y = 0;
        if (impact > MIN_IMPACT) {
          s.vy = impact * RESTITUTION; // bounce!
          s.sqv -= impact * 0.06; // squash on impact
          s.rzv += (index % 2 ? 1 : -1) * impact * 0.03; // little wobble
          onImpact(letter.x, impact);
        } else {
          s.vy = 0;
          s.phase = 'done';
          onSettled();
        }
      }
    }

    // A stiffer spring than before: the squash snaps back quickly, which reads as a
    // solid, premium material landing rather than a soft, rubbery bounce.
    s.sqv += (-320 * s.sq - 16 * s.sqv) * dt;
    s.sq = THREE.MathUtils.clamp(s.sq + s.sqv * dt, -0.14, 0.14);
    s.rzv += (-70 * s.rz - 7 * s.rzv) * dt;
    s.rz += s.rzv * dt;

    if (s.phase === 'done' && !reducedMotion) s.idle += (1 - s.idle) * Math.min(1, dt * 1.5);
    const idle = Math.sin(frame.clock.elapsedTime * 0.7 + index * 1.1) * 0.05 * s.idle;

    // k runs from 1 (still at the top) to 0 (landed) — everything below eases out on k,
    // so the tilt, drift and spin all resolve to a clean, flat rest pose at the same moment.
    const k = Math.pow(THREE.MathUtils.clamp(s.y / dropRef.current, 0, 1), 0.55);
    const tilt = TILT[index % TILT.length];

    // Converging swoop: each letter drifts in sideways while falling and settles
    // exactly on its final spot — a choreographed assembly instead of a plain vertical drop.
    const driftDir = index % 2 === 0 ? -1 : 1;
    const driftX = driftDir * DRIFT * k;
    const driftZ = (index % 2 === 0 ? 1 : -1) * DRIFT * 0.4 * k;

    g.position.set(letter.x + driftX, s.y, driftZ);
    g.rotation.set(tilt.x * k, tilt.y * k + idle, tilt.z * k + s.rz);
    g.scale.set(1 - s.sq * 0.45, 1 + s.sq, 1 - s.sq * 0.45);
  });

  return (
    <group ref={ref} position={[letter.x, 0, 0]} visible={reducedMotion}>
      <mesh geometry={letter.geometry}>
        <meshPhysicalMaterial
          color="#ffffff"
          vertexColors
          metalness={0.1}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.7}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

/* All four letters. Re-mounted (via `key`) to replay the animation. */
function Drop({ letters, layout, timeRef, reducedMotion, onImpact, onAllSettled }) {
  const settled = useRef(0);

  useEffect(() => {
    timeRef.current = 0;
  }, [timeRef]);

  const handleSettled = useCallback(() => {
    settled.current += 1;
    if (settled.current >= letters.length) onAllSettled();
  }, [letters.length, onAllSettled]);

  return (
    <group position={[layout.x, layout.lift, 0]}>
      {letters.map((letter, i) => (
        <Letter
          key={i}
          letter={letter}
          index={i}
          dropY={layout.dropY}
          timeRef={timeRef}
          reducedMotion={reducedMotion}
          onImpact={onImpact}
          onSettled={handleSettled}
        />
      ))}
    </group>
  );
}

/* --------------------- Camera: fit, parallax, intro & shake ---------------- */
function CameraRig({ layout, timeRef, shakeRef, reducedMotion }) {
  const camera = useThree((s) => s.camera);
  const smooth = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const scale = layout.D / 10;
    const intro = reducedMotion ? 0 : 1 - easeOutCubic(Math.min(1, timeRef.current / 2.1));
    const D = layout.D + layout.D * 0.18 * intro; // slow cinematic push-in

    const follow = 1 - Math.exp(-3 * dt);
    const targetX = reducedMotion ? 0 : state.pointer.x * 0.5 * scale;
    const targetY = reducedMotion ? 0 : state.pointer.y * 0.25 * scale;
    smooth.current.x += (targetX - smooth.current.x) * follow;
    smooth.current.y += (targetY - smooth.current.y) * follow;

    shakeRef.current *= Math.exp(-7 * dt);
    const shake = shakeRef.current * scale;
    const time = state.clock.elapsedTime;

    camera.position.set(
      smooth.current.x + Math.sin(time * 47) * shake,
      D * 0.2 + smooth.current.y + Math.cos(time * 53) * shake,
      D
    );
    camera.lookAt(smooth.current.x * 0.25, 0, 0);
  });

  return null;
}

/* Brief white flash on the floor each time a letter hits. */
function ImpactFlash({ flash, layout }) {
  const ref = useRef(null);
  useFrame((_, delta) => {
    const light = ref.current;
    if (!light) return;
    light.intensity = flash.current.power * 60;
    light.position.set(flash.current.x + layout.x, layout.lift + 0.9, 3);
    flash.current.power *= Math.exp(-9 * Math.min(delta, 0.05));
  });
  return <pointLight ref={ref} color="#ffffff" distance={16} decay={2} intensity={0} />;
}

/* --------------------------------- Scene ----------------------------------- */
function Scene({ replayToken, reducedMotion, onAllSettled }) {
  const size = useThree((s) => s.size);
  const { letters, totalWidth } = useMemo(() => createLetters(), []);
  const layout = useMemo(
    () => computeLayout(size.width, size.height, totalWidth),
    [size.width, size.height, totalWidth]
  );

  const timeRef = useRef(0);
  const shakeRef = useRef(0);
  const flash = useRef({ x: 0, power: 0 });
  const settleTimeRef = useRef(null);

  useEffect(() => () => letters.forEach((l) => l.geometry.dispose()), [letters]);
  useEffect(() => {
    settleTimeRef.current = null;
  }, [replayToken]);

  // Our own clock so the animation pauses cleanly when the hero is off-screen.
  useFrame((_, delta) => {
    timeRef.current += Math.min(delta, 0.05);
  });

  const handleImpact = useCallback((x, impact) => {
    shakeRef.current = Math.min(0.22, shakeRef.current + impact * 0.006);
    flash.current.x = x;
    flash.current.power = Math.min(1, impact / 14);
  }, []);

  const handleAllSettled = useCallback(() => {
    settleTimeRef.current = timeRef.current; // marks the moment the finale should start
    onAllSettled();
  }, [onAllSettled]);

  return (
    <>
      <CameraRig layout={layout} timeRef={timeRef} shakeRef={shakeRef} reducedMotion={reducedMotion} />

      {/* Bright studio lighting with blue/cyan rim lights */}
      <ambientLight intensity={0.55} color="#b9cdfa" />
      <directionalLight position={[6, 10, 8]} intensity={3.2} color="#ffffff" />
      <pointLight position={[-10, layout.lift + 3, 5]} intensity={80} color="#3d7bff" distance={40} decay={2} />
      <pointLight position={[10, layout.lift + 2, -2]} intensity={60} color="#6b9cff" distance={40} decay={2} />
      <ImpactFlash flash={flash} layout={layout} />

      {/* Reflections for the glossy finish — built from light panels, no downloads */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#eaf2ff" position={[0, 2, 9]} scale={[22, 10, 1]} />
        <Lightformer form="rect" intensity={4.5} color="#ffffff" position={[0, 4.2, 9]} scale={[22, 1.6, 1]} />
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 8, 0]} rotation-x={Math.PI / 2} scale={[20, 8, 1]} />
        <Lightformer form="rect" intensity={3} color="#3d7bff" position={[-8, 1, 2]} rotation-y={Math.PI / 2} scale={[10, 5, 1]} />
        <Lightformer form="rect" intensity={3} color="#6b9cff" position={[8, 1, 2]} rotation-y={-Math.PI / 2} scale={[10, 5, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 4, -7]} scale={[16, 3, 1]} />
      </Environment>

      <Ground layout={layout} totalWidth={totalWidth} />

      {!reducedMotion && (
        <Sparkles
          count={30}
          scale={[totalWidth * 1.5, 7, 5]}
          position={[layout.x, layout.lift + 2.4, -1]}
          size={2.4}
          speed={0.2}
          opacity={0.55}
          color="#6b9cff"
        />
      )}

      <Drop
        key={replayToken}
        letters={letters}
        layout={layout}
        timeRef={timeRef}
        reducedMotion={reducedMotion}
        onImpact={handleImpact}
        onAllSettled={handleAllSettled}
      />

      {!reducedMotion && (
        <>
          <Shockwave layout={layout} settleTimeRef={settleTimeRef} timeRef={timeRef} totalWidth={totalWidth} />
          <Sheen layout={layout} settleTimeRef={settleTimeRef} timeRef={timeRef} totalWidth={totalWidth} />
        </>
      )}
    </>
  );
}

/* --------------------------------- Canvas ---------------------------------- */
export default function HeroScene({ replayToken, reducedMotion, active, onAllSettled }) {
  const [dpr, setDpr] = useState([1, 1.75]);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={dpr}
      camera={{ fov: FOV, near: 0.1, far: 140, position: [0, 3, 14] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      {/* If the device struggles, quietly lower the resolution. */}
      <PerformanceMonitor onDecline={() => setDpr([1, 1])} flipflops={2} />
      <Scene replayToken={replayToken} reducedMotion={reducedMotion} onAllSettled={onAllSettled} />
    </Canvas>
  );
}
