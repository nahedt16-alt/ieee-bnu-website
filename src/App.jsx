import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import About from './components/About';
import JoinCTA from './components/JoinCTA';
import TechnicalFlowchart from './components/TechnicalFlowchart';
import Workshops from './components/Workshops';
import HighBoard from './components/HighBoard';
import Footer from './components/Footer';

export default function App() {
  return (
    // "user" = Framer Motion skips movement animations for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero3D />
        <About />
        <JoinCTA />
        <TechnicalFlowchart />
        <Workshops />
        <HighBoard />
      </main>
      <Footer />
    </MotionConfig>
  );
}
