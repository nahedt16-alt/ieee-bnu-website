import { Cpu } from 'lucide-react';
import SafeImage from './SafeImage';
import { siteConfig } from '../../data/siteConfig';

/**
 * Brand mark. Shows your logo when `logo` is set in siteConfig.js,
 * otherwise a clean placeholder you can replace later.
 * (This is NOT the official IEEE logo.)
 */
export default function Logo({ showText = true, size = 44 }) {
  const placeholder = (
    <span className="logo-placeholder" style={{ width: size, height: size }} title="Logo placeholder">
      <Cpu size={Math.round(size * 0.5)} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );

  return (
    <span className="logo">
      <SafeImage
        src={siteConfig.logo}
        alt={`${siteConfig.name} logo`}
        className="logo-img"
        style={{ height: size, width: 'auto' }}
        fallback={placeholder}
      />
      {showText && (
        <span className="logo-text">
          <strong>{siteConfig.shortName}</strong>
          <small>Student Branch</small>
        </span>
      )}
    </span>
  );
}
