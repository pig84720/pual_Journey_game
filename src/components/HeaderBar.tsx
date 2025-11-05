/**
 * 頂部導航列
 */

import { useGameStore } from '../store/useGameStore';

export function HeaderBar() {
  const { currentJourneyId, setJourney } = useGameStore();

  return (
    <header className="bg-brand-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo & Title */}
          <div>
            <h1 className="text-h1 font-serif font-bold">保羅宣道之旅時間線測驗</h1>
          </div>

          {/* 旅程切換 */}
          <nav role="navigation" aria-label="旅程選擇">
            <div className="flex gap-2 bg-brand-500/30 p-1 rounded-lg">
              <button
                onClick={() => setJourney('J1')}
                className={`
                  px-4 py-2 rounded-md text-body font-medium transition-all
                  ${currentJourneyId === 'J1'
                    ? 'bg-white text-brand-700 shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
                aria-current={currentJourneyId === 'J1' ? 'page' : undefined}
              >
                第一次傳道
              </button>
              <button
                onClick={() => setJourney('J2')}
                className={`
                  px-4 py-2 rounded-md text-body font-medium transition-all
                  ${currentJourneyId === 'J2'
                    ? 'bg-white text-brand-700 shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
                aria-current={currentJourneyId === 'J2' ? 'page' : undefined}
              >
                第二次傳道
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
