'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

interface ToastContextType {
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast>({
    message: '',
    type: 'success',
    visible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast.visible && (
        <div
          className={`fixed left-50 right-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-all duration-300
            ${toast.type === 'success' ? 'bg-[#008c99]' : 'bg-red-600'}`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
};
