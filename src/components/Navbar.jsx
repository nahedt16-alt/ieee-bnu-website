import { useEffect, useState } from 'react';
import Logo from './common/Logo';
import { navLinks } from '../data/siteConfig';
import { useActiveSection } from '../hooks/useActiveSection';
import { handleAnchorClick } from '../utils/scroll';

const ids = navLinks.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    try {
      localStorage.removeItem('ieee_theme');
    } catch {
      // ignore
    }
  }, []);

  // Transparent over the hero → blurred glass once you scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock page scroll, close with Escape, close if the window grows.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="navbar__inner container">
        <a href="#home" className="navbar__brand" aria-label="IEEE BNU — back to top" onClick={handleAnchorClick('home', close)}>
          <Logo size={40} />
        </a>

        <nav className="navbar__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${link.highlight ? 'nav-link--join' : ''} ${active === link.id ? 'is-active' : ''}`}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={handleAnchorClick(link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} inert={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{ '--i': i }}
              className={`mobile-link ${link.highlight ? 'mobile-link--join' : ''} ${active === link.id ? 'is-active' : ''}`}
              onClick={handleAnchorClick(link.id, close)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
