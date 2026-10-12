import { useEffect, useState } from 'react';

/**
 * <img> that never shows a broken-image icon.
 * If `src` is empty or fails to load, it renders `fallback` instead.
 */
export default function SafeImage({ src, alt = '', fallback = null, className = '', ...rest }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) return fallback;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
