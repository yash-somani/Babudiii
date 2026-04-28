import { useState } from 'react';
import { letters } from '../data';

const TABS = ['beforeExam', 'whenLost'];

export default function LetterSection() {
  const [activeTab, setActiveTab] = useState('beforeExam');
  const currentLetter = letters[activeTab];

  return (
    <section className="section" id="letters" aria-label="Personal letters">
      <div className="section-header">
        <h2>Open when you need to…</h2>
        <p>These words are here whenever you need them.</p>
      </div>

      <div className="letter-tabs" role="tablist" aria-label="Letter categories">
        {TABS.map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={`letter-panel-${key}`}
            className={`letter-tab${activeTab === key ? ' active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {letters[key].tab}
          </button>
        ))}
      </div>

      <div
        className="letter-card"
        key={activeTab}
        id={`letter-panel-${activeTab}`}
        role="tabpanel"
        aria-label={currentLetter.tab}
      >
        {currentLetter.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  );
}
