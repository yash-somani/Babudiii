import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ item, onClose }) {
  const closeRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    // Focus the close button on open for accessibility
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!item) return null;

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || 'Memory viewer'}
    >
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Close memory viewer"
        ref={closeRef}
      >
        ✕
      </button>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <video controls autoPlay playsInline aria-label={item.alt || item.caption}>
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <img src={item.src} alt={item.alt || item.caption} />
        )}
        {item.caption && <div className="modal-caption">{item.caption}</div>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
