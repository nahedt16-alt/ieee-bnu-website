import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, CircuitBoard, Code, Cpu, Maximize2, Minimize2, User } from 'lucide-react';
import SectionHeading from './common/SectionHeading';
import SafeImage from './common/SafeImage';
import { technicalTeam } from '../data/technicalTeam';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ICONS = { cpu: Cpu, code: Code, circuit: CircuitBoard };
const CORNER = 16; // radius of the rounded corners on the connecting lines
const EASE = [0.22, 1, 0.36, 1];

/* Dedicated high-tech photo frame for team leads (Khattab, Moataz, Nayef). */
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
              <User size={36} strokeWidth={1.5} aria-hidden="true" />
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
      </div>
    </div>
  );
}

/* One clickable node. Clicking the header expands/collapses its panel. */
function FlowNode({ id, nodeRef, variant, icon, label, description, person, open, onToggle, hintOpen, hintClosed }) {
  const Icon = ICONS[icon] || Cpu;
  const panelId = `${id}-panel`;

  return (
    <div ref={nodeRef} className={`fc-node fc-node--${variant} ${open ? 'is-open' : 'is-idle'}`}>
      <button type="button" className="fc-node__head" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span className="icon-tile fc-node__icon">
          <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <span className="fc-node__title">
          <span className="fc-node__label">{label}</span>
          <span className="fc-node__hint">{open ? hintOpen : hintClosed}</span>
        </span>
        {person && (
          <span className="fc-node__preview-avatar" title={person.name} aria-hidden="true">
            <SafeImage src={person.image} alt="" fallback={<User size={13} strokeWidth={1.8} />} />
          </span>
        )}
        <ChevronDown className="fc-node__chevron" size={20} aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${label} details`}
            className="fc-node__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="fc-node__panel-inner">
              {description && <p className="fc-node__desc">{description}</p>}
              <TechPhotoFrame person={person} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TechnicalFlowchart() {
  const { root, branches } = technicalTeam;
  const stacked = useMediaQuery('(max-width: 640px)'); // phone layout: branches stack vertically

  const [open, setOpen] = useState({}); // { technical: true, software: true, ... }
  const [edges, setEdges] = useState([]); // connecting lines, measured from the real node positions

  const boxRef = useRef(null);
  const nodeEls = useRef({});
  const live = useRef({ rootOpen: false, stacked: false });
  live.current = { rootOpen: !!open[root.id], stacked };

  const rootOpen = !!open[root.id];
  const allIds = [root.id, ...branches.map((b) => b.id)];
  const allOpen = allIds.every((id) => open[id]);

  /* ---- measure nodes and build the SVG paths ---- */
  const measure = useCallback(() => {
    const box = boxRef.current;
    const rootEl = nodeEls.current[root.id];
    if (!box || !rootEl || !live.current.rootOpen) {
      setEdges((prev) => (prev.length ? [] : prev));
      return;
    }

    const c = box.getBoundingClientRect();
    const r = rootEl.getBoundingClientRect();
    const next = [];

    branches.forEach((b) => {
      const el = nodeEls.current[b.id];
      if (!el) return;
      const n = el.getBoundingClientRect();
      let sx, sy, ex, ey, d;

      if (live.current.stacked) {
        // Phone: a vertical "bus" on the left, with a branch line into each node.
        sx = r.left - c.left + 24;
        sy = r.bottom - c.top;
        ex = n.left - c.left;
        ey = n.top - c.top + 34;
        d = `M ${sx} ${sy} V ${ey - CORNER} Q ${sx} ${ey} ${sx + CORNER} ${ey} H ${ex}`;
      } else {
        // Desktop/tablet: down from the root, across, and down into each branch.
        sx = r.left - c.left + r.width / 2;
        sy = r.bottom - c.top;
        ex = n.left - c.left + n.width / 2;
        ey = n.top - c.top;
        const my = sy + (ey - sy) / 2;
        const dir = Math.sign(ex - sx);
        d =
          Math.abs(ex - sx) < 2
            ? `M ${sx} ${sy} V ${ey}`
            : `M ${sx} ${sy} V ${my - CORNER} Q ${sx} ${my} ${sx + dir * CORNER} ${my} H ${ex - dir * CORNER} Q ${ex} ${my} ${ex} ${my + CORNER} V ${ey}`;
      }

      const round = (v) => Math.round(v * 2) / 2;
      next.push({ id: b.id, d: d.replace(/-?\d+(\.\d+)?/g, (m) => String(round(parseFloat(m)))), sx: round(sx), sy: round(sy), ex: round(ex), ey: round(ey) });
    });

    setEdges((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
  }, [root.id, branches]);

  // While things are animating open/closed, re-measure every frame so lines glue to the nodes.
  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = () => {
      measure();
      if (performance.now() - start < 1000) raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [open, stacked, measure]);

  // Also re-measure when the layout changes for any other reason (resize, fonts loading…).
  useEffect(() => {
    const box = boxRef.current;
    window.addEventListener('resize', measure);
    let ro;
    if (box && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(box);
    }
    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [measure]);

  /* ---- interactions ---- */
  const toggleRoot = () => setOpen((prev) => (prev[root.id] ? {} : { [root.id]: true })); // closing the root collapses everything
  const toggleBranch = (id) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleAll = () =>
    setOpen(allOpen ? {} : Object.fromEntries(allIds.map((id) => [id, true])));

  return (
    <section id="technical" className="section section--ice technical" aria-labelledby="technical-title">
      <div className="technical__bg" aria-hidden="true" />
      <div className="container">
        <div className="technical__top">
          <SectionHeading
            id="technical-title"
            eyebrow="03 — Technical Team"
            title="Technical Team"
            intro="Select the TECHNICAL node to see how the team branches out. Every node opens to show who leads it."
          />
          <button type="button" className="btn btn-outline btn-sm" onClick={toggleAll}>
            {allOpen ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}
            <span>{allOpen ? 'Collapse all' : 'Expand all'}</span>
          </button>
        </div>

        <div className="fc-board">
        <div className={`fc ${stacked ? 'fc--stacked' : ''}`} ref={boxRef}>
          {/* animated connecting lines */}
          <svg className="fc-lines" aria-hidden="true" focusable="false">
            <AnimatePresence>
              {edges.map((e) => (
                <motion.g key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <path d={e.d} className="fc-line-track" />
                  <motion.path
                    d={e.d}
                    className="fc-line"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                  />
                  <circle cx={e.sx} cy={e.sy} r="4" className="fc-via" />
                  <circle cx={e.ex} cy={e.ey} r="4.5" className="fc-via" />
                  <circle r="3.5" className="fc-pulse">
                    <animateMotion dur="2.8s" repeatCount="indefinite" path={e.d} />
                  </circle>
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>

          {/* main node */}
          <div className="fc-root">
            <FlowNode
              id={root.id}
              variant="root"
              icon={root.icon}
              label={root.label}
              description={root.description}
              person={root.lead}
              open={rootOpen}
              onToggle={toggleRoot}
              hintClosed="Expand"
              hintOpen="Collapse"
              nodeRef={(el) => {
                nodeEls.current[root.id] = el;
              }}
            />
          </div>

          {/* branches, revealed when the root is open */}
          <AnimatePresence initial={false}>
            {rootOpen && (
              <motion.div
                className="fc-branches-wrap"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="fc-branches">
                  {branches.map((b) => (
                    <FlowNode
                      key={b.id}
                      id={b.id}
                      variant="branch"
                      icon={b.icon}
                      label={b.label}
                      description={b.description}
                      person={b.head}
                      open={!!open[b.id]}
                      onToggle={() => toggleBranch(b.id)}
                      hintClosed="Show head"
                      hintOpen="Hide head"
                      nodeRef={(el) => {
                        nodeEls.current[b.id] = el;
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
}
