/** Consistent section title block used by every section. `eyebrow` is the
    small monospace label above the heading, e.g. "01 — ABOUT". */
export default function SectionHeading({ id, eyebrow, title, intro, align = 'left' }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
