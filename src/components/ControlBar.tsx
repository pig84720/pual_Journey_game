/**
 * 控制列元件（對答案、顯示答案、重置等）
 */

import { useGameStore } from '../store/useGameStore';

export function ControlBar() {
  const {
    checkAnswers,
    showCorrectAnswer,
    resetJourney,
    instantCheck,
    setInstantCheck,
  } = useGameStore();

  const handleShowAnswer = () => {
    if (confirm('確定要顯示參考答案嗎？')) {
      showCorrectAnswer();
    }
  };

  const handleReset = () => {
    if (confirm('確定要重置當前旅程嗎？所有已放置的卡片都會被移除。')) {
      resetJourney();
    }
  };

  return (
    <div className="bg-white border-t border-brand-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* 主要操作 */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={checkAnswers}
            className="px-6 py-3 rounded-lg bg-brand-500 text-white font-semibold
                     hover:bg-brand-700 active:scale-95 transition-all
                     shadow-md hover:shadow-lg"
            aria-label="檢查答案"
          >
            對答案
          </button>

          <button
            onClick={handleShowAnswer}
            className="px-6 py-3 rounded-lg bg-accent-600 text-white font-semibold
                     hover:bg-accent-400 active:scale-95 transition-all"
            aria-label="顯示參考答案"
          >
            顯示答案
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg bg-on/10 text-on font-semibold
                     hover:bg-on/20 active:scale-95 transition-all"
            aria-label="重置"
          >
            重置
          </button>
        </div>

        {/* 立即檢核切換 */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={instantCheck}
              onChange={(e) => setInstantCheck(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-brand-500
                       text-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            <span className="text-body text-on">立即檢核模式</span>
          </label>
        </div>
      </div>
    </div>
  );
}
