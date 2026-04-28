import { useState } from 'react';
import { moodContent } from '../data';

const MOODS = ['anxious', 'sad', 'blank'];

export default function MoodSupport() {
  const [selectedMood, setSelectedMood] = useState(null);
  const content = selectedMood ? moodContent[selectedMood] : null;

  return (
    <section className="section" id="mood-support">
      <div className="section-header">
        <h2>How are you feeling right now?</h2>
        <p>It's okay. Pick whatever fits, no judgement here.</p>
      </div>

      <div className="mood-buttons">
        {MOODS.map((mood) => (
          <button
            key={mood}
            className={`mood-btn${selectedMood === mood ? ' active' : ''}`}
            onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
          >
            <span className="mood-emoji">{moodContent[mood].emoji}</span>
            <span className="mood-label">{moodContent[mood].label}</span>
          </button>
        ))}
      </div>

      {content && (
        <div className="mood-response" key={selectedMood}>
          <div className="mood-message-card">
            <p>{content.message}</p>
          </div>

          <div className="mood-affirmations">
            <h3>Some words for right now:</h3>
            <ul>
              {content.affirmations.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
