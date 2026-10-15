import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircuitBoard, Code2, Cpu } from 'lucide-react';
import SectionHeading from './common/SectionHeading';
import SafeImage from './common/SafeImage';
import SocialIcon from './common/SocialIcon';
import { technicalTeam } from '../data/technicalTeam';

const ICON_MAP = { cpu: Cpu, code: Code2, circuit: CircuitBoard };
const EASE = [0.22, 1, 0.36, 1];

/* ---- High-tech photo frame with optional LinkedIn button ---- */
function TechPhotoFrame({ person }) {
  return (
    <div className="fc-frame">
      <div className="fc-frame__corner fc-frame__corner--tl" aria-hidden="true" />
      <div className="fc-frame__corner fc-frame__corner--tr" aria-hidden="true" />
      <div className="fc-frame__corner fc-frame__corner--bl" aria-hidden="true" />
      <div className="fc-frame__corner fc-frame__corner--br" aria-hidden="true" />

      <div className="fc-frame__viewport">
        <SafeImage
          src={person.image}
          alt={`Photo of ${person.name}`}
          fallback={
            <div className="fc-frame__placeholder">
              <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4.2" />
                <path d="M4 21v-1.8a6.5 6.5 0 0 1 13 0V21" />
                <circle cx="12" cy="12" r="10.5" strokeDasharray="3 3.5" opacity="0.35" />
              </svg>
              <span className="fc-frame__hint">Photo Frame</span>
            </div>
          }
        />
        <span className="fc-frame__scan" aria-hidden="true" />
        <span className="fc-frame__status" title="Active lead">
          <span className="fc-frame__dot" aria-hidden="true" />
          <span>Active</span>
        </span>
      </div>

      <div className="fc-frame__info">
        <span className="fc-frame__role">{person.role}</span>
        <strong className="fc-frame__name">{person.name}</strong>
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="fc-frame__linkedin"
            aria-label={`${person.name} on LinkedIn`}
            title="LinkedIn"
          >
            <SocialIcon id="linkedin" size={15} />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

/* ---- Individual slide card ---- */
function SlideCard({ item, isRoot, lead }) {
  const Icon = ICON_MAP[item.icon] || Cpu;
  const person = isRoot ? lead : item.head;

  return (
    <div className={`ts-card ${isRoot ? 'ts-card--root' : 'ts-card--branch'}`}>
      <span className="ts-card__bar" aria-hidden="true" />

      <div className="ts-card__head">
        <span className="ts-card__icon-tile">
          <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <div className="ts-card__labels">
          <span className="ts-card__label">{item.label}</span>
          <span className="ts-card__desc">{item.description}</span>
        </div>
      </div>

      {person && <TechPhotoFrame person={person} />}
    </div>
  );
}

/* ---- Dot indicators ---- */
function Dots({ count, active, onDot }) {
  return (
    <div className="ts-dots" role="tablist" aria-label="Slide navigation">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Slide ${i + 1}`}
          className={`ts-dot ${i === active ? 'is-active' : ''}`}
          onClick={() => onDot(i)}
        />
      ))}
    </div>
  );
}

/* ================================================================
   Main component
   ================================================================ */
export default function TechnicalFlowchart() {
  const { root, branches } = technicalTeam;

  // Slides: root first, then branches
  const slides = [
    { ...root, isRoot: true, lead: root.lead },
    ...branches.map((b) => ({ ...b, isRoot: false })),
  ];

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(0); // +1 = right-to-left, -1 = left-to-right

  // Drag / swipe state
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const goTo = (idx) => {
    if (idx === active) return;
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(slides.length - 1, active + 1));

  /* Touch/pointer drag for the outer wrapper */
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
    isDragging.current = true;
  };
  const onPointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const dx = (dragStartX.current ?? 0) - endX;
    if (Math.abs(dx) > 48) dx > 0 ? next() : prev();
  };

  /* Keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.35, ease: EASE } }),
  };

  return (
    <section id="technical" className="section section--ice technical" aria-labelledby="technical-title">
      <div className="technical__bg" aria-hidden="true" />
      <div className="container">
        <div className="technical__top">
          <SectionHeading
            id="technical-title"
            eyebrow="03 — Technical Team"
            title="Technical Team"
            intro="Swipe or drag to explore the technical leads — hardware, software, and the head who connects them."
          />
        </div>

        {/* Slider shell */}
        <div className="fc-board ts-shell">

          {/* Slide counter */}
          <div className="ts-counter" aria-live="polite" aria-atomic="true">
            <span className="ts-counter__cur">{String(active + 1).padStart(2, '0')}</span>
            <span className="ts-counter__sep">/</span>
            <span className="ts-counter__total">{String(slides.length).padStart(2, '0')}</span>
          </div>

          {/* ── Peek viewport: clips to show ~80% active + peek of neighbour ── */}
          <div
            className="ts-peek-wrap"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchEnd={onPointerUp}
            style={{ touchAction: 'pan-y' }}
          >
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="ts-slide"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next();
                  else if (info.offset.x > 60) prev();
                }}
              >
                <SlideCard item={slides[active]} isRoot={slides[active].isRoot} lead={slides[active].lead} />
              </motion.div>
            </AnimatePresence>

            {/* Peek ghost — the edge of the next/prev card showing behind */}
            {active < slides.length - 1 && (
              <div className="ts-peek ts-peek--right" aria-hidden="true">
                <SlideCard item={slides[active + 1]} isRoot={slides[active + 1].isRoot} lead={slides[active + 1].lead} />
              </div>
            )}
            {active > 0 && (
              <div className="ts-peek ts-peek--left" aria-hidden="true">
                <SlideCard item={slides[active - 1]} isRoot={slides[active - 1].isRoot} lead={slides[active - 1].lead} />
              </div>
            )}
          </div>

          {/* Prev / Next arrows */}
          <button
            type="button"
            className="ts-arrow ts-arrow--prev"
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="ts-arrow ts-arrow--next"
            onClick={next}
            disabled={active === slides.length - 1}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot nav */}
          <Dots count={slides.length} active={active} onDot={goTo} />
        </div>
      </div>
    </section>
  );
}
