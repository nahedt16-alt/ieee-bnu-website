import SafeImage from './SafeImage';
import { siteConfig } from '../../data/siteConfig';

/* High-precision technical insignia inspired by IEEE's diamond emblem */
function IEEEEmblem({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 21 12 12 22 3 12" />
      <path d="M12 6v12" />
      <path d="M8.5 9.5l3.5-3.5 3.5 3.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Brand mark. Shows your logo when `logo` is set in siteConfig.js,
 * otherwise a clean placeholder you can replace later.
 */
export default function Logo({ showText = true, size = 44 }) {
  const placeholder = (
    <span className="logo-placeholder" style={{ width: size, height: size }} title="IEEE BNU Logo">
      <IEEEEmblem size={Math.round(size * 0.55)} />
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
