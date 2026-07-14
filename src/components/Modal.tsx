import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, images, currentIndex, onIndexChange }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
          break;
        case 'ArrowRight':
          onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
          break;
      }
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-scrim fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/85"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div
        className="modal-frame relative max-w-5xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-sm text-light/70 hover:text-light transition-colors"
          aria-label="Close"
        >
          Close · Esc
        </button>

        <img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="modal-image w-full max-h-[85vh] object-contain bg-ink"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-ink/60 text-light hover:bg-ink/80 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-ink/60 text-light hover:bg-ink/80 transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs tracking-wider bg-ink/70 text-light px-3 py-1">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
