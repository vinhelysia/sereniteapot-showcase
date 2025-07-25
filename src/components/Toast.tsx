import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-primary',
    error: 'bg-destructive', 
    info: 'bg-secondary'
  }[type];

  return (
    <div className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-4 rounded-lg shadow-modal z-50 animate-slide-up transition-smooth`}>
      <div className="flex items-center gap-3">
        <span className="font-medium">{message}</span>
        <button 
          onClick={onHide}
          className="text-white/80 hover:text-white transition-smooth"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;