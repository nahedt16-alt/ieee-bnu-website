import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Clock, Plus, X } from 'lucide-react';
import SectionHeading from './common/SectionHeading';
import SafeImage from './common/SafeImage';
import WorkshopVisual from './WorkshopVisual';
import { showComingSoonCard, workshops } from '../data/workshops';

/* ------------------------------- Modal ------------------------------------ */
function WorkshopModal({ workshop, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = `workshop-${workshop.id}-title`;

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      // keep keyboard focus inside the dialog
      const focusable = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const hasDetails = workshop.details && workshop.details.length > 0;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal__close" onClick={onClose} aria-label="Close workshop details">
          <X size={20} aria-hidden="true" />
        </button>

        <div className="modal__visual">
          {workshop.image ? (
            <SafeImage
              src={workshop.image}
              alt=""
              fallback={<WorkshopVisual visual={workshop.visual} category={workshop.category} />}
            />
          ) : (
            <WorkshopVisual visual={workshop.visual} category={workshop.category} />
          )}
        </div>

        <div className="modal__body">
          <span className="badge">{workshop.category}</span>
          <h3 id={titleId}>{workshop.title}</h3>
          <p>{workshop.description}</p>

          {hasDetails ? (
            workshop.details.map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <p className="modal__soon">
              <Clock size={18} aria-hidden="true" />
              Workshop details coming soon.
            </p>
          )}

          <div className="modal__actions">
            {workshop.link && (
              <a className="btn btn-glow" href={workshop.link} target="_blank" rel="noopener noreferrer">
                <span>Open workshop link</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------- Section ---------------------------------- */
export default function Workshops() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(workshops.map((w) => w.category))], []);
  const visible = filter === 'All' ? workshops : workshops.filter((w) => w.category === filter);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="workshops" className="section section--white workshops" aria-labelledby="workshops-title">
      <div className="container">
        <SectionHeading
          id="workshops-title"
          eyebrow="04 — Workshops"
          title="Workshops"
          intro="Hands-on sessions where ideas turn into something you can build, test and show."
        />

        {/* Filter chips only appear once you have more than one category. */}
        {categories.length > 2 && (
          <div className="chips" role="group" aria-label="Filter workshops by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip ${filter === cat ? 'is-active' : ''}`}
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="ws-list">
          {visible.map((w) => (
            <article className="ws-row" key={w.id}>
              <div className="ws-row__visual">
                <span className="grid-bg" aria-hidden="true" />
                <div className="ws-row__art">
                  {w.image ? (
                    <SafeImage src={w.image} alt="" fallback={<WorkshopVisual visual={w.visual} category={w.category} />} />
                  ) : (
                    <WorkshopVisual visual={w.visual} category={w.category} />
                  )}
                </div>
              </div>
              <div className="ws-row__body">
                <span className="badge">{w.category}</span>
                <h3>{w.title}</h3>
                <p>{w.description}</p>
                <button type="button" className="btn btn-glow" onClick={() => setSelected(w)}>
                  <span>Learn More</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}

          {showComingSoonCard && filter === 'All' && (
            <div className="ws-row ws-row--soon">
              <Plus size={28} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>More workshops coming soon</h3>
                <p>New sessions will appear here as soon as they are announced.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rendered in <body> so the popup is never clipped by page animations */}
      {createPortal(
        <AnimatePresence>{selected && <WorkshopModal key={selected.id} workshop={selected} onClose={close} />}</AnimatePresence>,
        document.body
      )}
    </section>
  );
}
