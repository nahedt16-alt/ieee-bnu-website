import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { handleAnchorClick } from '../utils/scroll';
import { hasWebGL } from '../utils/webgl';

// The 3D scene (three.js) is loaded in a separate chunk so the page text shows instantly.
const HeroScene = lazy(() => import('./three/HeroScene'));

/* If WebGL crashes for any reason we show the CSS fallback instead of a blank hero. */
class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('3D hero unavailable — showing the simple fallback.', error);
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* Simple CSS version of the letter drop (used when WebGL isn't available). */
function FallbackLetters({ animate }) {
  return (
    <div className={`hero-fallback ${animate ? 'is-animated' : ''}`} aria-hidden="true">
      {['I', 'E', 'E', 'E'].map((char, i) => (
        <span key={i} style={{ '--i': i }}>
          {char}
        </span>
      ))}
    </div>
  );
}

const rise = {
  hide: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero3D() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  const [webglOk] = useState(() => hasWebGL());
  const [failed, setFailed] = useState(!webglOk);
  const [token, setToken] = useState(0); // bump to replay
  const [landed, setLanded] = useState(false); // all letters have settled
  const [revealed, setRevealed] = useState(false); // text is shown
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  // Pause rendering when the hero is scrolled away or the tab is hidden (saves battery/GPU).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // The animation never blocks the page: text always appears, even if 3D is slow or fails.
  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return undefined;
    }
    const id = setTimeout(() => setRevealed(true), failed ? 2600 : 4500);
    return () => clearTimeout(id);
  }, [token, failed, reduced]);

  useEffect(() => {
    if (!landed) return undefined;
    const id = setTimeout(() => setRevealed(true), 350);
    return () => clearTimeout(id);
  }, [landed]);

  const handleSettled = useCallback(() => setLanded(true), []);

  const replay = () => {
    setLanded(false);
    setRevealed(reduced);
    setToken((t) => t + 1);
  };

  const showCanvas = !failed;

  return (
    <section id="home" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      {/* near-black stage: blueprint grid + a single faint accent glow */}
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-grid" />
        <span className="hero-glow" />
      </div>
      <div className="corner-frame" aria-hidden="true"><i /><i /><i /><i /></div>

      {/* 3D letters */}
      <div className="hero-canvas" aria-hidden="true">
        {showCanvas ? (
          <SceneBoundary fallback={<FallbackLetters animate />} onError={() => setFailed(true)}>
            <Suspense fallback={<div className="hero-loading" />}>
              <HeroScene
                replayToken={token}
                reducedMotion={reduced}
                active={inView && tabVisible}
                onAllSettled={handleSettled}
              />
            </Suspense>
          </SceneBoundary>
        ) : (
          <FallbackLetters key={token} animate={!reduced} />
        )}
      </div>

      {/* small vertical label, like the reference layout */}
      <div className="hero-side" aria-hidden="true">
        <span className="hero-side__line" />
        <span className="hero-side__text">Learn · Build · Connect</span>
      </div>

      {/* text that appears once the letters have landed */}
      <motion.div
        className="hero-copy"
        initial={false}
        animate={revealed ? 'show' : 'hide'}
        variants={{ show: { transition: { staggerChildren: 0.14 } }, hide: {} }}
        inert={!revealed}
      >
        <motion.h1 id="hero-title" variants={rise}>
          <span className="hero-title__main">IEEE BNU</span>
          <span className="hero-title__sub">Student Branch.</span>
        </motion.h1>
        <motion.p className="hero-tagline" variants={rise}>
          {siteConfig.tagline}
        </motion.p>
        <motion.p className="hero-blurb" variants={rise}>
          A student community for learning new skills, building projects and growing together.
        </motion.p>
        <motion.div variants={rise}>
          <a href="#about" className="btn btn-white btn-lg" onClick={handleAnchorClick('about')}>
            <span>Explore IEEE BNU</span>
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      {/* bottom-left scroll cue + replay */}
      <motion.a
        href="#about"
        className="hero-foot"
        aria-label="Scroll down to the About section"
        onClick={handleAnchorClick('about')}
        initial={false}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.8, delay: revealed ? 0.6 : 0 }}
        tabIndex={revealed ? 0 : -1}
      >
        <span className="hero-foot__line" aria-hidden="true" />
        <span>Scroll to explore</span>
      </motion.a>

      <button type="button" className="hero-replay" onClick={replay} aria-label="Replay the letter drop animation">
        <RotateCcw size={15} aria-hidden="true" />
        <span>Replay animation</span>
      </button>
    </section>
  );
}
