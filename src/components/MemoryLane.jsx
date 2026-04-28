import { useState } from 'react';
import { memories } from '../data';
import Modal from './Modal';

export default function MemoryLane() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="section" id="memory-lane" aria-label="Our memories together">
      <div className="section-header">
        <h2>Our little moments</h2>
        <p>Tap any memory to see it up close.</p>
      </div>

      <div className="memory-grid" role="list">
        {memories.map((item, index) => (
          <div
            className="memory-thumb"
            key={index}
            onClick={() => setActiveItem(item)}
            role="listitem"
            tabIndex={0}
            aria-label={`View memory: ${item.alt || item.caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveItem(item);
              }
            }}
          >
            {item.type === 'video' ? (
              <>
                <video src={item.src} muted preload="metadata" aria-label={item.alt || item.caption} />
                <div className="play-badge" aria-hidden="true" />
              </>
            ) : (
              <img src={item.src} alt={item.alt || item.caption} loading="lazy" />
            )}
            <div className="memory-thumb-overlay" aria-hidden="true">
              <span className="memory-thumb-caption">{item.caption}</span>
            </div>
          </div>
        ))}
      </div>

      {activeItem && (
        <Modal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
}
