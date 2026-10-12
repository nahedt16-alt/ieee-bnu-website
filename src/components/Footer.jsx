import { Mail, MapPin } from 'lucide-react';
import Logo from './common/Logo';
import SocialIcon from './common/SocialIcon';
import { navLinks, siteConfig } from '../data/siteConfig';
import { handleAnchorClick } from '../utils/scroll';

export default function Footer() {
  const { contactEmail, university, socialLinks } = siteConfig;

  return (
    <footer className="footer">
      <div className="footer__mark" aria-hidden="true">IEEE BNU</div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo size={48} />
          <p className="footer__tagline">{siteConfig.tagline}</p>

          <ul className="footer__social" aria-label="Social media">
            {socialLinks.map((s) => (
              <li key={s.id}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                    <SocialIcon id={s.id} />
                  </a>
                ) : (
                  <span
                    className="is-placeholder"
                    role="img"
                    aria-label={`${s.label} link not added yet`}
                    title={`${s.label}: add the link in src/data/siteConfig.js`}
                  >
                    <SocialIcon id={s.id} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3>Explore</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={handleAnchorClick(link.id)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3>Contact</h3>
          <ul className="footer__contact">
            <li>
              <Mail size={16} aria-hidden="true" />
              {contactEmail ? (
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              ) : (
                <span className="is-placeholder-text">[CONTACT EMAIL]</span>
              )}
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>
                {university.name}
                <br />
                {university.faculty}
                <br />
                {university.location}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
