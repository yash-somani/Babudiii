import { useState } from 'react';
import { proudCards } from '../data';

function ProudCard({ card, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`proud-card${isOpen ? ' proud-card--open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <div className="proud-card-header">
        <h3>{card.title}</h3>
        <span className={`proud-card-toggle${isOpen ? ' open' : ''}`} aria-hidden="true">
          +
        </span>
      </div>
      <div className="proud-card-body">
        <p>{card.description}</p>
      </div>
    </div>
  );
}

export default function ProudWall() {
  return (
    <section className="section" id="proud-wall">
      <div className="section-header">
        <h2>Why I'm proud of you</h2>
        <p>Tap any card to read more. Every one of these is real.</p>
      </div>

      <div className="proud-grid">
        {proudCards.map((card, index) => (
          <ProudCard card={card} index={index} key={index} />
        ))}
      </div>
    </section>
  );
}
