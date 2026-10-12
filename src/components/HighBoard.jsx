import { GraduationCap, User } from 'lucide-react';
import SectionHeading from './common/SectionHeading';
import SafeImage from './common/SafeImage';
import SocialIcon from './common/SocialIcon';
import { highBoard } from '../data/highBoard';

const LINK_LABELS = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  github: 'GitHub',
  website: 'Website',
  email: 'Email',
};

const toHref = (key, value) =>
  key === 'email' && !value.startsWith('mailto:') ? `mailto:${value}` : value;

/* Placeholder shown until a photo is added. */
function PhotoPlaceholder() {
  return (
    <span className="pc__placeholder" aria-hidden="true">
      <User strokeWidth={1.2} />
    </span>
  );
}

/* One profile card. Tilts toward the mouse on desktop. */
function ProfileCard({ person, size }) {
  const links = Object.entries(person.links || {}).filter(([, value]) => value);

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(px - 0.5) * 9}deg`);
    el.style.setProperty('--rx', `${(0.5 - py) * 7}deg`);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };

  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  const isFaculty = person.tier === 'faculty';

  return (
    <article className={`pc pc--${size} pc--${person.tier}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <span className="pc__border" aria-hidden="true" />
      <div className="pc__inner">
        <div className="pc__photo">
          <SafeImage src={person.image} alt={`Photo of ${person.name}`} fallback={<PhotoPlaceholder />} />
          <span className="pc__shade" aria-hidden="true" />
        </div>

        <div className="pc__body">
          <span className="pc__position">
            {isFaculty && <GraduationCap size={15} aria-hidden="true" />}
            {person.position}
          </span>
          <h3 className="pc__name">{person.name}</h3>

          {links.length > 0 && (
            <ul className="pc__links" aria-label={`${person.name} links`}>
              {links.map(([key, value]) => (
                <li key={key}>
                  <a
                    href={toHref(key, value)}
                    target={key === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={`${person.name} on ${LINK_LABELS[key] || key}`}
                    title={LINK_LABELS[key] || key}
                  >
                    <SocialIcon id={key} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export default function HighBoard() {
  const tier = (name) => highBoard.filter((p) => p.tier === name);

  return (
    <section id="board" className="section section--blue board" aria-labelledby="board-title">
      <span className="grid-bg" aria-hidden="true" />
      <div className="corner-frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container">
        <SectionHeading
          id="board-title"
          eyebrow="05 — High Board"
          title="High Board"
          intro="The people who lead the branch and guide its direction."
          align="center"
        />

        <div className="board-stage">
          <span className="board-spine" aria-hidden="true" />

          <div className="board-tier board-tier--chairman">
            {tier('chairman').map((p) => (
              <ProfileCard key={p.id} person={p} size="xl" />
            ))}
          </div>

          <div className="board-tier board-tier--vice">
            {tier('vice').map((p) => (
              <ProfileCard key={p.id} person={p} size="lg" />
            ))}
          </div>

          <div className="board-tier board-tier--core">
            {tier('core').map((p) => (
              <ProfileCard key={p.id} person={p} size="md" />
            ))}
          </div>

          <div className="board-tier board-tier--faculty">
            <h3 className="board-tier__label">Supervision and mentorship</h3>
            <div className="board-tier__row">
              {tier('faculty').map((p) => (
                <ProfileCard key={p.id} person={p} size="wide" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
