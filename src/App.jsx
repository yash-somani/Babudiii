import { useEffect, useState } from 'react';
import './index.css';

import Hero from './components/Hero';
import PostExamMessages from './components/PostExamMessages';
import ProudWall from './components/ProudWall';
import MemoryLane from './components/MemoryLane';
import LetterSection from './components/LetterSection';
import MoodSupport from './components/MoodSupport';
import BreathingGuide from './components/BreathingGuide';
import Affirmations from './components/Affirmations';
import { easterEggMessage } from './data';

function App() {
  const [easterEggVisible, setEasterEggVisible] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Easter egg: triple-tap the heart
  const handleHeartClick = () => {
    const newCount = easterEggClicks + 1;
    if (newCount >= 3) {
      setEasterEggVisible(true);
      setEasterEggClicks(0);
    } else {
      setEasterEggClicks(newCount);
      // Reset after 2 seconds if they stop tapping
      setTimeout(() => setEasterEggClicks(0), 2000);
    }
  };

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#proud-wall" className="skip-link">
        Skip to main content
      </a>

      <div className="page-wrapper">
        <header>
          <Hero />
        </header>

        {/* Post-exam encouragement (only shows after an exam date) */}
        <PostExamMessages />

        <main id="main-content">
          <div className="section-divider" aria-hidden="true" />

          <div className="reveal">
            <ProudWall />
          </div>

          <div className="section-divider" aria-hidden="true" />

          <div className="reveal">
            <LetterSection />
          </div>

          <div className="section-divider" aria-hidden="true" />

          <div className="reveal">
            <MoodSupport />
          </div>

          <div className="section-divider" aria-hidden="true" />

          <div className="reveal">
            <BreathingGuide />
          </div>

          <div className="section-divider" aria-hidden="true" />

          <div className="reveal">
            <Affirmations />
          </div>

          <div className="section-divider" aria-hidden="true" />

          <div className="reveal">
            <MemoryLane />
          </div>
        </main>

        <footer className="site-footer">
          <p>
            Made with a whole lot of{' '}
            <button
              className="heart-btn"
              onClick={handleHeartClick}
              aria-label="A little heart for you"
            >
              <span className="heart">♥</span>
            </button>{' '}
            — just for you.
          </p>

          <p className="footer-tagline">
            Everything will be allright.
          </p>

          {/* Easter egg message */}
          {easterEggVisible && (
            <p className="easter-egg" aria-live="polite">
              {easterEggMessage}
            </p>
          )}

          {/* Gentle safety line */}
          <p className="safety-note">
            If things ever feel too heavy, please consider talking to someone you trust
            or a counselor — I'll always support you doing that. 💜
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
