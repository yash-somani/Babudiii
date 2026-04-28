import { useState, useCallback } from 'react';
import { affirmations, getRandomAffirmation } from '../data';

export default function Affirmations() {
  const [current, setCurrent] = useState(null);
  const [pinned, setPinned] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const handleTap = useCallback(() => {
    // Avoid repeating the same affirmation consecutively
    let next;
    do {
      next = getRandomAffirmation(affirmations);
    } while (next === current && affirmations.length > 1);

    setCurrent(next);
    setAnimKey((k) => k + 1);
  }, [current]);

  const handlePin = () => {
    if (pinned === current) {
      setPinned(null);
    } else {
      setPinned(current);
    }
  };

  return (
    <section className="section" id="affirmations">
      <div className="section-header">
        <h2>Gentle reminders</h2>
        <p>Tap the button for a reminder.</p>
      </div>

      {/* Interactive generator */}
      <div className="affirmation-generator">
        <div className="affirmation-display" key={animKey}>
          {pinned ? (
            <p className="affirmation-text affirmation-text--pinned">
              <span className="pin-icon" aria-label="Pinned">📌</span>
              {pinned}
            </p>
          ) : current ? (
            <p className="affirmation-text">{current}</p>
          ) : (
            <p className="affirmation-text affirmation-text--placeholder">
              Tap below when you need a gentle reminder…
            </p>
          )}
        </div>

        <div className="affirmation-actions">
          <button className="affirmation-tap-btn" onClick={handleTap}>
            ✨ Tap for a reminder
          </button>
          {current && (
            <button
              className={`affirmation-pin-btn${pinned === current ? ' pinned' : ''}`}
              onClick={handlePin}
            >
              {pinned === current ? 'Unpin' : 'Pin this'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
