import { useEffect, useState } from 'react';
import { ArrowUpRight, Info } from 'lucide-react';
import { JOIN_FORM_URL, isJoinFormConfigured } from '../data/siteConfig';

/**
 * Opens the registration form (JOIN_FORM_URL in src/data/siteConfig.js)
 * in a new tab. While the link is still the placeholder, it shows a short
 * helpful note instead of opening a broken page.
 */
export default function JoinButton({
  children = 'Join Our Community',
  className = 'btn btn-glow',
  showIcon = true,
}) {
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (!hint) return undefined;
    const id = setTimeout(() => setHint(false), 5000);
    return () => clearTimeout(id);
  }, [hint]);

  if (isJoinFormConfigured) {
    return (
      <a className={className} href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
        {showIcon && <ArrowUpRight size={18} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <span className="join-wrap">
      <button type="button" className={className} onClick={() => setHint(true)}>
        <span>{children}</span>
        {showIcon && <ArrowUpRight size={18} aria-hidden="true" />}
      </button>
      {hint && (
        <span className="join-hint" role="status">
          <Info size={16} aria-hidden="true" />
          The registration link hasn't been added yet. Set JOIN_FORM_URL in src/data/siteConfig.js.
        </span>
      )}
    </span>
  );
}
