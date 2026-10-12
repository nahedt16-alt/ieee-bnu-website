/** Smoothly scrolls to a section by id (respects reduced-motion). */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  // Keep the URL hash in sync without jumping.
  if (window.history?.replaceState) {
    window.history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
  }
}

/** Click handler for <a href="#id"> links: smooth-scroll instead of jumping. */
export function handleAnchorClick(id, after) {
  return (event) => {
    event.preventDefault();
    scrollToSection(id);
    if (after) after();
  };
}
