import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 2800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  const border =
    type === 'error'
      ? 'border-destructive'
      : type === 'info'
        ? 'border-jade'
        : 'border-brass';

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 max-w-sm border ${border} bg-card px-4 py-3 shadow-sm animate-toast-in`}
      role="status"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground">{message}</span>
        <button
          type="button"
          onClick={onHide}
          className="text-muted-foreground hover:text-foreground text-sm leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
