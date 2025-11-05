/**
 * 慶祝動畫 Overlay（全對時觸發）
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '../store/useGameStore';

export function CelebrateOverlay() {
  const { showCelebration, dismissCelebration } = useGameStore();

  useEffect(() => {
    if (showCelebration) {
      // 拉炮動畫
      const duration = 2500;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      // 自動關閉
      const timeout = setTimeout(() => {
        dismissCelebration();
      }, 2500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [showCelebration, dismissCelebration]);

  if (!showCelebration) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-brand-700/20 backdrop-blur-sm z-[9998]
               flex items-center justify-center"
      onClick={dismissCelebration}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-white rounded-card shadow-card-hover p-8 max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[64px] mb-4">🎉</div>
        <h2 className="text-display font-serif text-brand-700 mb-2">恭喜全對！</h2>
        <p className="text-h3 text-on/80">
          您已完整掌握此傳道之旅
        </p>

        <button
          onClick={dismissCelebration}
          className="mt-6 px-6 py-3 rounded-lg bg-brand-500 text-white font-semibold
                   hover:bg-brand-700 active:scale-95 transition-all"
        >
          太棒了
        </button>
      </motion.div>
    </motion.div>
  );
}
