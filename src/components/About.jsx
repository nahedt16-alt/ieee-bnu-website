import { motion } from 'framer-motion';
import { BookOpen, Compass, Network, Users, Wrench } from 'lucide-react';
import SectionHeading from './common/SectionHeading';

/* What students can do at IEEE BNU — edit the text here. */
const topics = [
  {
    icon: BookOpen,
    title: 'Learn new technical skills',
    text: 'Build practical skills that go beyond the classroom, one step at a time.',
  },
  {
    icon: Compass,
    title: 'Explore different engineering fields',
    text: 'From software to electronics and beyond — find the field that excites you.',
  },
  {
    icon: Wrench,
    title: 'Attend workshops and technical sessions',
    text: 'Get hands-on with tools and ideas in sessions led by the community.',
  },
  {
    icon: Users,
    title: 'Collaborate on projects',
    text: 'Team up, share ideas and turn them into working projects together.',
  },
  {
    icon: Network,
    title: 'Connect with students and mentors',
    text: 'Meet peers who share your curiosity and mentors who can guide you.',
  },
];

/* A small technical "readout" panel standing in for a photo — a grid, a node
   diagram and a status line, in the same spirit as the rest of the site. */
function TechPanel() {
  return (
    <div className="tech-panel" aria-hidden="true">
      <span className="grid-bg" />
      <svg className="tech-panel__nodes" viewBox="0 0 220 180" fill="none">
        <path d="M40 130 L95 70 L150 100 L190 46" stroke="var(--accent-line)" strokeWidth="1.5" />
        <circle cx="40" cy="130" r="4" fill="var(--accent-bright)" />
        <circle cx="95" cy="70" r="4" fill="var(--accent-bright)" />
        <circle cx="150" cy="100" r="5.5" fill="var(--accent)" className="tech-panel__pulse" />
        <circle cx="190" cy="46" r="4" fill="var(--accent-bright)" />
      </svg>
      <span className="tech-panel__word">IEEE</span>
      <span className="tech-panel__status">
        <i /> Student-run · est. community
      </span>
    </div>
  );
}

const fade = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0 },
};

export default function About() {
  return (
    <section id="about" className="section section--white about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__lead">
          <SectionHeading id="about-title" eyebrow="01 — About" title="More Than Just a Student Branch" />
          <p className="lead">
            IEEE is a global professional organization dedicated to advancing technology. It brings together
            students, engineers and researchers who believe in innovation, lifelong learning and collaboration.
          </p>
          <p>
            IEEE BNU Student Branch brings that spirit to our campus: a community where curiosity meets
            hands-on experience, and where every student can find a place to learn, build and grow.
          </p>
          <TechPanel />
        </div>

        <div className="about__list">
          <h3 className="about__subtitle">At IEEE BNU, students can</h3>
          <ul className="topics">
            {topics.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.li
                  key={t.title}
                  className="topic"
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="icon-tile topic__icon">
                    <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div className="topic__text">
                    <h4>{t.title}</h4>
                    <p>{t.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
