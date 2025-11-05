/**
 * 結果面板元件（顯示正確/錯誤摘要）
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useState } from 'react';

export function ResultPanel() {
  const { checkResult } = useGameStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!checkResult) return null;

  const { correctCount, totalCount } = checkResult;
  const wrongCount = totalCount - correctCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 right-6 bg-white rounded-card shadow-card-hover border-2 border-brand-500
               p-4 z-40 max-w-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-h3 font-semibold text-brand-700 mb-2">檢核結果</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-success text-h2">✓</span>
              <span className="text-body">
                正確：<strong className="text-success">{correctCount}</strong> / {totalCount}
              </span>
            </div>

            {wrongCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-error text-h2">✗</span>
                <span className="text-body">
                  錯誤：<strong className="text-error">{wrongCount}</strong>
                </span>
              </div>
            )}
          </div>

          {wrongCount > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-caption text-brand-500 hover:text-brand-700 underline"
            >
              {isExpanded ? '收起詳情' : '查看詳情'}
            </button>
          )}
        </div>

        <button
          onClick={() => useGameStore.setState({ checkResult: null })}
          className="w-6 h-6 rounded-full bg-on/10 hover:bg-on/20
                   flex items-center justify-center text-on/60 transition-colors"
          aria-label="關閉結果面板"
        >
          ×
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && wrongCount > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-brand-100 overflow-hidden"
          >
            <p className="text-caption text-on/60 mb-2">錯誤位置已在 Timeline 標示紅框</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
