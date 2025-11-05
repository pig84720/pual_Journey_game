/**
 * Toast 通知元件
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useEffect } from 'react';

export function Toast() {
  const { toast, dismissToast } = useGameStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, dismissToast]);

  const typeStyles = {
    info: 'bg-brand-500 text-white',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div
            className={`
              ${typeStyles[toast.type]}
              px-6 py-4 rounded-lg shadow-card-hover
              flex items-center gap-3 min-w-[240px]
            `}
            role="alert"
            aria-live="polite"
          >
            <span className="text-body font-medium flex-1">{toast.message}</span>
            <button
              onClick={dismissToast}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30
                       flex items-center justify-center transition-colors"
              aria-label="關閉通知"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
